<script setup lang="ts">
import {toRefs, type Ref, ref, onMounted, watch, computed} from 'vue';
import TextProperty from '../components/TextProperty.vue';
import ImageProperty from '../components/ImageProperty.vue';
import DragOverlay from './DragOverlay.vue';
import {MemeButton, MemeFileUpload, MemeInput} from './common';
import {
  fillText,
  drawLayer,
  LINE_HEIGHT,
  RANK,
  breakLines
} from '../utils/canvas';
import {getExt} from '../utils/file';
import {download} from '../utils/download';
import type {
  Story,
  BaseFile,
  FillText,
  FillImage,
  TextPropertyValue,
  ImagePropertyValue,
  DragLayer,
  DragMovePayload,
} from '../types';
import {useRoute} from 'vue-router';

import { ELEMENT_TYPE, STORY_TYPE } from '../utils/constant';

const props = defineProps<{
  story: Story
}>();

const emit = defineEmits(['change', 'create', 'create-layer', 'delete-layer', 'reorder-layer', 'update-name']);

const localStory: Ref<Story> = toRefs(props).story;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const createStatus = ref(false);
const imageInfo = ref<{
  name: string;
  image: string;
  layerType: string;
} | null>(null);

const pickStatus = ref(false);
const showLayer = ref(false);
const layerRef = ref<HTMLCanvasElement | null>(null);
const pickEid = ref<string | null>(null);
const showActions = ref(false);

const text = ref('金馆长');
const updateText = (value: string) => {
  text.value = value;
  renderImage();
};

const width = ref(0);
const height = ref(0);

const changeLayerProperty = (value: TextPropertyValue | ImagePropertyValue) => {
  const target = localStory.value.children.find(child => {
    const eid = (child.options as FillText | FillImage).eid;
    return eid === value.eid;
  });

  if (!target) {
    return;
  }

  if (target.type === ELEMENT_TYPE.TEXT && 'content' in value) {
    Object.assign(target.options as FillText, value);
  } else if (target.type === ELEMENT_TYPE.IMAGE && 'ipath' in value) {
    Object.assign(target.options as FillImage, value);
  } else {
    return;
  }

  emit('change', localStory.value);
};

const extType = computed(() => {
  return getExt(localStory.value.image);
});

const localName = computed(() => {
  return `[${localStory.value.type}] ${localStory.value.name}.${extType.value} ${width.value} * ${height.value}`;
});

const img = new Image();

const makeCanvas = () => {
  img.onload = async () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    width.value = canvas.width;
    height.value = canvas.height;

    renderImage();
  };

  img.onerror = () => {
    console.error('图片加载失败');
  };

  img.src = localStory.value.image;
};

const renderImage = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0);

  // TODO
  // let content = text.value;
  // 什么时候处理 content 内容和自定义的文本呢

  localStory.value.children.forEach(({type, options}) => {
    if (type === ELEMENT_TYPE.TEXT) {
      fillText(ctx, canvas.width, options as FillText);
    } else if (type === ELEMENT_TYPE.IMAGE) {
      // Image rendering logic to be implemented
    }
  })
};

const measureCtx = typeof document !== 'undefined'
  ? document.createElement('canvas').getContext('2d')
  : null;

const getAlignOffset = (align: string, maxWidth: number) => {
  const map: Record<string, number> = {
    'start': 0,
    'center': Math.floor(maxWidth / 2),
    'end': maxWidth,
  };
  return map[align] ?? 0;
};

const getTextHeight = (options: FillText, maxWidth: number) => {
  if (!maxWidth || !measureCtx) {
    return options.size * LINE_HEIGHT;
  }

  measureCtx.font = options.font ? `${options.size}px ${options.font}` : `${options.size}px sans-serif`;
  const lines = breakLines(options.content || '', maxWidth, measureCtx);
  const lineCount = Math.max(lines.length, 1);
  return lineCount * options.size * LINE_HEIGHT;
};

const dragLayers = computed<DragLayer[]>(() => {
  const canvasWidth = width.value;
  const canvasHeight = height.value;

  if (!canvasWidth || !canvasHeight) {
    return [];
  }

  return localStory.value.children.map((child, index) => {
    if (child.type === ELEMENT_TYPE.TEXT) {
      const options = child.options as FillText;
      const layerWidth = options.max || canvasWidth;
      const alignOffset = getAlignOffset(options.align || 'start', layerWidth);
      const layerHeight = getTextHeight(options, layerWidth);

      return {
        id: options.eid || `text-${index}`,
        x: options.x - alignOffset,
        y: options.y - options.size + 2,
        width: layerWidth,
        height: layerHeight,
        alignOffset,
        size: options.size,
        type: child.type,
      };
    }

    if (child.type === ELEMENT_TYPE.IMAGE) {
      const options = child.options as FillImage;
      return {
        id: options.eid || `image-${index}`,
        x: options.x,
        y: options.y,
        width: options.width,
        height: options.height,
        alignOffset: 0,
        size: 0,
        type: child.type,
      };
    }

    return null;
  }).filter((item): item is DragLayer => Boolean(item));
});

const updateLayerPosition = (id: string, left: number, top: number) => {
  const target = localStory.value.children.find((child, index) => {
    const eid = (child.options as FillText | FillImage).eid;
    return eid ? eid === id : `${index}` === id;
  });

  if (!target) {
    return;
  }

  if (target.type === ELEMENT_TYPE.TEXT) {
    const options = target.options as FillText;
    const layerWidth = options.max || width.value;
    const alignOffset = getAlignOffset(options.align || 'start', layerWidth);
    options.x = Math.round(left + alignOffset);
    options.y = Math.round(top + options.size - 2);
  } else if (target.type === ELEMENT_TYPE.IMAGE) {
    const options = target.options as FillImage;
    options.x = Math.round(left);
    options.y = Math.round(top);
  }
};

const handleDragStart = ({id, x, y}: DragMovePayload) => {
  updateLayerPosition(id, x, y);
};

const handleDragMove = ({id, x, y}: DragMovePayload) => {
  updateLayerPosition(id, x, y);
};

const handleDragEnd = ({id, x, y}: DragMovePayload) => {
  updateLayerPosition(id, x, y);
  emit('change', localStory.value);
};

watch(() => localStory.value.mid, () => {
  makeCanvas();
});

watch(() => localStory.value.image, () => {
  makeCanvas();
});

watch(() => localStory.value.children, () => {
  renderImage();
}, {deep: true});

const _download = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const fileName = `imeme_${localStory.value.name}_${text.value}`;
  download(canvas, extType.value, fileName);
};

const startCreate = () => {
  createStatus.value = true;
};

const cancelCreate = () => {
  createStatus.value = false;
  imageInfo.value = null;
};

const updateData = () => {
  if (imageInfo.value) {
    emit('create', imageInfo.value, cancelCreate);
  }
};

const fileChange = ({name, base64}: BaseFile) => {
  imageInfo.value = {
    name: name.slice(0, name.lastIndexOf('.')) || name,
    image: base64,
    layerType: ELEMENT_TYPE.TEXT,
  };
};

const pick = (eid: string) => {
  pickEid.value = eid;
  pickStatus.value = true;
};

const toggleActions = () => {
  showActions.value = !showActions.value;
};

const moveLayer = (direction: 'up' | 'down', eid: string | undefined) => {
  if (!localStory.value.mid || !eid) {
    return;
  }
  emit('reorder-layer', { mid: localStory.value.mid, eid, direction });
};

const _drawLayer = (x: number, y: number) => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const targetCanvas = layerRef.value as HTMLCanvasElement;
  drawLayer(canvas, targetCanvas, x, y);
};

const pickMousemove = async (event: MouseEvent) => {
  if (!pickStatus.value) {
    return false;
  }
  const {offsetX, offsetY} = event;
  if (offsetX < 0 || offsetY < 0) {
    return;
  }

  showLayer.value = true;
  _drawLayer(offsetX, offsetY);
};

const pickMouseleave = () => {
  if (!pickStatus.value) {
    return false;
  }
  showLayer.value = false;
};

const hexConvert = (imageData: ImageData) => {
  const hex = (num: number) => num.toString(16).padStart(2, '0');
  const {0: r = 0, 1: g = 0, 2: b = 0, 3: a = 0} = imageData.data;
  return `#${hex(r)}${hex(g)}${hex(b)}${hex(a)}`.toUpperCase();
};

const computedData = (x: number, y: number) => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  const imageData = ctx.getImageData(x, y, 1, 1);
  return hexConvert(imageData);
};

const pickColor = (event: MouseEvent) => {
  if (!pickStatus.value) {
    return false;
  }

  const {offsetX, offsetY} = event;
  if (offsetX < 0 || offsetY < 0) {
    return;
  }

  const color = computedData(offsetX, offsetY);
  const target = localStory.value.children.find(child => {
    if (child.type !== ELEMENT_TYPE.TEXT) {
      return false;
    }
    const eid = (child.options as FillText).eid;
    return pickEid.value ? eid === pickEid.value : true;
  });

  if (target) {
    (target.options as FillText).color = color;
    emit('change', localStory.value);
  }

  showLayer.value = false;
  pickStatus.value = false;
  pickEid.value = null;
};

const createLayer = (type: string) => {
  if (!localStory.value.mid) {
    return;
  }
  emit('create-layer', { mid: localStory.value.mid, type });
};

const deleteLayer = (eid: string | undefined) => {
  if (!localStory.value.mid || !eid) {
    return;
  }
  emit('delete-layer', { mid: localStory.value.mid, eid });
};

const route = useRoute();
const canEdit = computed(() => {
  return route.path.includes('/edit');
});

const changeName = (value: string) => {
  if (value === localStory.value.name) {
    return;
  }
  localStory.value.name = value;
  emit('update-name', localStory.value);
};

onMounted(() => {
  makeCanvas();
});

</script>

<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        <template v-if="canEdit">
          <meme-input class="container-title-label" :value="localStory.name" @update:model-value="changeName($event)"/>
        </template>
        <template v-else>
          {{ localName }}
        </template>
      </div>
      <meme-button v-if="createStatus" label="保存新故事" u="primary" @click="updateData"/>
      <meme-button v-if="createStatus" label="取消新建" u="primary" @click="cancelCreate"/>
      <meme-button v-else label="新建故事" u="primary" @click="startCreate"/>
      <meme-button label="下载" u="primary" @click="_download"/>
    </div>
    <div
      class="container-wall"
      v-if="createStatus"
    >
      <meme-file-upload @change="fileChange"/>
    </div>
    <template v-else>
      <div class="container-wraper">
        <canvas
          ref="canvasRef"
          :class="{
            'container-canvas': true,
            'container-pointer': pickStatus
          }"
          @mousemove="pickMousemove"
          @mouseleave="pickMouseleave"
          @click="pickColor"
        />
        <drag-overlay
          v-if="!pickStatus && width && height"
          class="container-overlay"
          :layers="dragLayers"
          :bounds="{ width, height }"
          :offset="{ top: 10, left: 10 }"
          @drag-start="handleDragStart"
          @drag-move="handleDragMove"
          @drag-end="handleDragEnd"
        />
        <canvas
          v-show="pickStatus && showLayer"
          ref="layerRef"
          class="container-layer"
          :style="{
            borderRadius: `${RANK}px`
          }"
          :width="RANK"
          :height="RANK"
        />
      </div>
      <template v-for="(child, index) in localStory.children" :key="index">
        <image-property
          v-if="child.type === ELEMENT_TYPE.IMAGE"
          v-bind="child.options as FillImage"
          @change="changeLayerProperty"
        >
          <meme-input
            class="property-text"
            :key="index"
            title="text"
            :value="text"
            @update:model-value="updateText"
          />
            <div
              v-if="showActions"
              class="property-actions"
            >
              <button
                class="icon-button"
                type="button"
                @click="moveLayer('up', (child.options as FillImage).eid)"
                :title="'上移'"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 5l6 6H6z" />
                </svg>
              </button>
              <button
                class="icon-button"
                type="button"
                @click="moveLayer('down', (child.options as FillImage).eid)"
                :title="'下移'"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 19l-6-6h12z" />
                </svg>
              </button>
                <button
                  class="icon-button danger"
                  type="button"
                  @click="deleteLayer((child.options as FillImage).eid)"
                  :title="'删除图层'"
                >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" />
                </svg>
              </button>
            </div>
        </image-property>
        <text-property
          v-else
          :key="index"
          v-bind="child.options as FillText"
          @change="changeLayerProperty"
          @pick="() => pick((child.options as FillText).eid)"
        >
          <meme-input
            class="property-text"
            title="text"
            :value="text"
            @update:model-value="updateText"
          />
            <div
              v-if="showActions"
              class="property-actions"
            >
              <button
                class="icon-button"
                type="button"
                @click="moveLayer('up', (child.options as FillText).eid)"
                :title="'上移'"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 5l6 6H6z" />
                </svg>
              </button>
              <button
                class="icon-button"
                type="button"
                @click="moveLayer('down', (child.options as FillText).eid)"
                :title="'下移'"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 19l-6-6h12z" />
                </svg>
              </button>
                <button
                  class="icon-button danger"
                  type="button"
                  @click="deleteLayer((child.options as FillText).eid)"
                  :title="'删除图层'"
                >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M16 9v9H8V9h8m-1.5-4h-5l-1 1H6v2h12V6h-2.5l-1-1z" />
                </svg>
              </button>
            </div>
        </text-property>
      </template>
    </template>
    <footer class="container-footer">
      <meme-button class="container-footer-label" label="添加文本层" u="primary" @click="() => createLayer(ELEMENT_TYPE.TEXT)"/>
      <meme-button class="container-footer-label" label="添加图片层" u="primary" @click="() => createLayer(ELEMENT_TYPE.IMAGE)"/>
      <meme-button :label="showActions ? '隐藏操作区' : '显示操作区'" u="primary" @click="toggleActions"/>
    </footer>
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.container {
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;

  &-header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 46px;
    margin: 0 -1px 6px;
    padding-right: 10px;
    background-color: #fff;
    border: 1px solid #dddee4;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
    .meme-button {
      width: 80px;
      min-width: 80px;
      margin-left: 10px;
    }
  }
  &-title {
    width: calc(100% - 90px);
    height: calc(100% - 10px);
    padding-left: 10px;
    font-size: 16px;
    color: #3f3f3f;
    font-weight: 500;
    &-label {
      width: 200px;
      height: 100%;
    }
  }
  &-wraper,
  &-wall {
    position: relative;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  &-overlay {
    border: thin solid gray;
  }
  &-pointer {
    cursor: pointer;
  }
  &-layer {
    position: absolute;
  }
  &-footer {
    height: 64px;
    min-height: 64px;
    .flex-center();

    .meme-button {
      width: 130px;
    }
    &-label {
      margin-right: 12px;
    }
  }
  .property {
    height: 50px;
    flex-shrink: 0;
    background: #FFFFFF;
    border-top: 1px solid #DDDEE4;
  }
  .property-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-right: 10px;
  }

  .icon-button {
    width: 32px;
    height: 32px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition: background-color 0.2s ease, border-color 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
      fill: #555;
    }

    &:hover {
      background: #f5f7fa;
      border-color: #cfd3dc;
    }
  }

  .icon-button.danger {
    border-color: #f2b4b4;
    svg {
      fill: #d9534f;
    }
    &:hover {
      background: #fdecec;
      border-color: #e7a2a2;
    }
  }
}
</style>
