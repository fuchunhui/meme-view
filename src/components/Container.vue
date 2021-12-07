<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import Property from '../components/Property.vue';
import {MemeButton, MemeFileUpload} from './common';
import {
  fillText,
  drawLayer,
  LINE_HEIGHT,
  getFontSize,
  RANK
} from '../utils/canvas';
import {getExt} from '../utils/file';
import {download} from '../utils/download';
import {Story, PropertyValue, BaseFile} from '../types';

const props = defineProps<{
  story: Story
}>();

const emit = defineEmits(['change', 'create', 'replace']);

const localStory: Ref<Story> = toRefs(props).story;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const areaRef = ref<HTMLElement | null>(null);
const dragRef = ref<HTMLElement | null>(null);
const updateStatus = ref(true);
const noImage = ref(true);
let backStory: Story | null = null;

const pickStatus = ref(false);
const showLayer = ref(false);
const layerRef = ref<HTMLCanvasElement | null>(null);

const text = ref('金馆长');
const updateText = (value: string) => {
  text.value = value;
  renderImage();
};
provide('text', text);
provide('updateText', updateText);

const width = ref(0);
const height = ref(0);

const locationChange = (x: number, y: number) => {
  localStory.value.x = x;
  localStory.value.y = y;
};

const propertyChange = (value: PropertyValue) => {
  const {max, size, color, align, direction} = value;
  localStory.value.max = max;
  localStory.value.font = `${size}px sans-serif`; // 统一默认字体，均使用sans-serif
  localStory.value.color = color;
  localStory.value.align = align;
  localStory.value.direction = direction;
};

const size = computed(() => {
  return getFontSize(localStory.value.font);
});

const type = computed(() => {
  return getExt(localStory.value.image);
});

const localTitle = computed(() => {
  return `${localStory.value.title}.${type.value}`
    + ` ${width.value} * ${height.value} (${localStory.value.x}, ${localStory.value.y})`;
});

const offsetWidth = computed(() => {
  const max = localStory.value.max || width.value;
  const alignMap: Record<string, number> = {
    'start': 0,
    'center': Math.floor(max / 2),
    'end': max,
  };
  return alignMap[localStory.value.align];
});

const img = new Image();

const makeCanvas = () => {
  img.onload = async () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    width.value = canvas.width;
    height.value = canvas.height;

    renderAreaLayer();
    renderImage();
    renderDragLayer();
  };

  img.onerror = err => {
    console.error(err);
  };

  img.src = localStory.value.image;
};

const renderAreaLayer = () => {
  const ele = areaRef.value as HTMLElement;
  ele.style.width = `${width.value}px`;
  ele.style.height = `${height.value}px`;
};

const renderImage = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0);

  fillText(ctx, canvas.width, text.value, localStory.value);
};

const renderDragLayer = () => {
  const {x, y, max} = localStory.value;
  const dragEle = dragRef.value as HTMLElement;
  dragEle.style.width = `${max}px`;
  dragEle.style.height = `${size.value * LINE_HEIGHT}px`;
  dragEle.style.top = `${y - size.value + 2}px`;
  dragEle.style.left = `${x - offsetWidth.value}px`;
};

watch(localStory, (nv, ov) => {
  if (nv.mid !== ov.mid) {
    makeCanvas();
  } else {
    renderImage();
    renderDragLayer();
  }
}, {deep: true});

let cx = 0;
let cy = 0;
const buffer = 20;
let canDrag = false;

const mousedown = (event: MouseEvent) => {
  canDrag = true;
  const {clientX, clientY} = event;
  cx = clientX;
  cy = clientY;
};

const mousemove = (event: MouseEvent) => {
  if (!canDrag) {
    return;
  }

  const {clientX, clientY} = event;
  const ele = dragRef.value as HTMLElement;

  const {width: dragWidth, height: dragHeight} = ele.getBoundingClientRect();
  let x = ele.offsetLeft + clientX - cx;
  let y = ele.offsetTop + clientY - cy;

  if (x < -buffer || y < -buffer
    || x > width.value - dragWidth + buffer
    || y > height.value - dragHeight + buffer) {
    canDrag = false;
  } else {
    cx = clientX;
    cy = clientY;
  }

  x = Math.max(Math.min(x, width.value - dragWidth + buffer), -buffer);
  y = Math.max(Math.min(y, height.value - dragHeight + buffer), -buffer);

  // 调节浮层x, y的位置，与canvas中保持一致
  x += offsetWidth.value;
  y += size.value - 2;

  locationChange(x, y);
};

const mouseup = () => {
  if (!canDrag) {
    return;
  }
  canDrag = false;
};

const toggleAdd = () => {
  if (updateStatus.value) {
    updateStatus.value = false;
  } else {
    updateStatus.value = true;
    noImage.value = true;

    if (backStory) {
      updateImage(backStory as Story);
      backStory = null;
    } else {
      makeCanvas();
    }
  }
};

const _download = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const fileName = `imeme_${localStory.value.title}_${text.value}`;
  download(canvas, type.value, fileName);
};

const updateData = () => {
  // TODO 保证不过多发送数据，只在数据变化的执行 目前点击就同步
  if (updateStatus.value) {
    emit('change', localStory.value);
  } else {
    if (!noImage.value) {
      emit('create', localStory.value);
      updateStatus.value = true;
      noImage.value = true;
    }
  }
};

const fileChange = ({name, base64}: BaseFile) => {
  noImage.value = false;

  const {mid, title, feature, image, x, y, max, font, color, align, direction, senior} = localStory.value;
  backStory = {
    mid, title, feature, image, x, y, max, font, color, align, direction, senior
  };

  const ntitle = name.slice(0, name.lastIndexOf('.'));
  updateImage({
    mid: `meme_${new Date().getTime()}`,
    title: ntitle,
    feature: ntitle,
    image: base64,
    x: 60,
    y: 60,
    max: 100,
    font: '32px sans-serif',
    color: '#FF0000',
    align: 'start',
    direction: 'down',
    senior: 0
  });
};

const updateImage = (value: Story) => {
  emit('replace', value);
};

const pick = () => {
  pickStatus.value = true;
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
  const {0: r, 1: g, 2: b, 3: a} = imageData.data;
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
  localStory.value.color = color;
  showLayer.value = false;
  pickStatus.value = false;
};

onMounted(() => {
  makeCanvas();
});

</script>

<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        {{ localTitle }}
      </div>
      <meme-button :label="updateStatus ? '添加' : '取消添加'" u="primary" @click="toggleAdd"/>
      <meme-button label="下载" u="primary" @click="_download"/>
    </div>
    <div
      class="container-wall"
      v-if="!updateStatus && noImage"
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
        <div
          v-show="!pickStatus"
          class="container-area"
          ref="areaRef"
          @mousemove="mousemove"
          @mouseup="mouseup"
        >
          <div class="container-drag" ref="dragRef" @mousedown="mousedown"/>
        </div>
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
      <property
        :max="localStory.max"
        :color="localStory.color"
        :size="size"
        :align="localStory.align"
        :direction="localStory.direction"
        @change="propertyChange"
        @pick="pick"
      />
    </template>
    <footer class="container-footer">
      <meme-button :label="updateStatus ? '更新' : '确认'" u="primary" @click="updateData"/>
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
    padding-left: 10px;
    font-size: 16px;
    color: #3f3f3f;
    font-weight: 500;
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
  &-area {
    position: absolute;
    top: 10px;
  }
  &-drag {
    position: absolute;
    top: 0;
    width: 100px;
    height: 32px;
    user-select: none;
    cursor: move;
    border: 1px solid red;
  }
  &-pointer {
    cursor: pointer;
  }
  &-layer {
    position: absolute;
  }
  &-footer {
    height: 64px;
    .flex-center();

    .meme-button {
      width: 130px;
    }
  }
  .property {
    height: 50px;
    flex-shrink: 0;
    background: #FFFFFF;
    border-top: 1px solid #DDDEE4;
  }
}
</style>
