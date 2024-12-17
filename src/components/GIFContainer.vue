<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import GifProperty from '../components/GIFProperty.vue';
import {MemeButton, MemeFileUpload, MemeInput} from './common';
import {
  fillGIFText,
  drawLayer,
  LINE_HEIGHT,
  getFontSize,
  RANK
} from '../utils/canvas';
import {getExt} from '../utils/file';
import {GIF, GIFValue, BaseFile} from '../types';
import {useRoute} from 'vue-router';

const props = defineProps<{
  gif: GIF
}>();

const emit = defineEmits(['change', 'create', 'replace', 'update']);

const localGIF: Ref<GIF> = toRefs(props).gif;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const areaRef = ref<HTMLElement | null>(null);
const dragRef = ref<HTMLElement | null>(null);
const updateStatus = ref(true);
const noImage = ref(true);
let backGIF: GIF | null = null;

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
  localGIF.value.x = x;
  localGIF.value.y = y;
};

const propertyChange = (value: GIFValue) => {
  const {max, size, color, align, direction, stroke, swidth, frame} = value;
  localGIF.value.max = max;
  localGIF.value.font = `${size}px sans-serif`; // 统一默认字体，均使用sans-serif
  localGIF.value.color = color;
  localGIF.value.stroke = stroke;
  localGIF.value.swidth = swidth;
  localGIF.value.align = align;
  localGIF.value.direction = direction;
  localGIF.value.frame = frame;
};

const size = computed(() => {
  return getFontSize(localGIF.value.font);
});

const type = computed(() => {
  return getExt(localGIF.value.image);
});

const localTitle = computed(() => {
  return `${localGIF.value.title}.${type.value}`
    + ` ${width.value} * ${height.value} (${localGIF.value.x}, ${localGIF.value.y})`;
});

const offsetWidth = computed(() => {
  const max = localGIF.value.max || width.value;
  const alignMap: Record<string, number> = {
    'start': 0,
    'center': Math.floor(max / 2),
    'end': max,
  };
  return alignMap[localGIF.value.align];
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

  img.src = localGIF.value.image;
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

  fillGIFText(ctx, canvas.width, text.value, localGIF.value);
};

const renderDragLayer = () => {
  const {x, y, max} = localGIF.value;
  const dragEle = dragRef.value as HTMLElement;
  dragEle.style.width = `${max}px`;
  dragEle.style.height = `${size.value * LINE_HEIGHT}px`;
  dragEle.style.top = `${y - size.value + 2}px`;
  dragEle.style.left = `${x - offsetWidth.value}px`;
};

watch(localGIF, (nv, ov) => {
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

    if (backGIF) {
      updateImage(backGIF as GIF);
      backGIF = null;
    } else {
      makeCanvas();
    }
  }
};

const cancelCreate = () => {
  if (backGIF) {
    updateImage(backGIF as GIF);
    backGIF = null;
  }
};

const updateData = () => {
  if (updateStatus.value) {
    emit('change', localGIF.value);
  } else {
    if (!noImage.value) {
      emit('create', localGIF.value, cancelCreate);
      updateStatus.value = true;
      noImage.value = true;
    }
  }
};

const fileChange = ({name, base64}: BaseFile) => {
  noImage.value = false;

  const {mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame} = localGIF.value;
  backGIF = {
    mid, title, image, x, y, max, font, color, stroke, swidth, align, direction, frame
  };

  const ntitle = name.slice(0, name.lastIndexOf('.'));
  updateImage({
    mid: `meme_${new Date().getTime()}`,
    title: ntitle,
    image: base64,
    x: 60,
    y: 60,
    max: 100,
    font: '32px sans-serif',
    color: '#FF0000',
    stroke: 'transparent',
    swidth: 1,
    align: 'start',
    direction: 'down',
    frame: 'NORMAL'
  });
};

const updateImage = (value: GIF) => {
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
  localGIF.value.color = color;
  showLayer.value = false;
  pickStatus.value = false;
};

const route = useRoute();
const canEdit = computed(() => {
  return route.path.includes('/edit');
});

const changeTitle = (value: string) => {
  if (value === localGIF.value.title) {
    return;
  }
  localGIF.value.title = value;
  emit('update', localGIF.value);
};

onMounted(() => {
  makeCanvas();
});

</script>

<template>
  <div class="gif-container">
    <div class="gif-container-header">
      <div class="gif-container-title">
        <template v-if="canEdit">
          <meme-input class="gif-container-title-label" :value="localGIF.title" @update:model-value="changeTitle($event)"/>
        </template>
        <template v-else>
          {{ localTitle }}
        </template>
      </div>
      <meme-button :label="updateStatus ? '添加' : '取消添加'" u="primary" @click="toggleAdd"/>
    </div>
    <div
      class="gif-container-wall"
      v-if="!updateStatus && noImage"
    >
      <meme-file-upload @change="fileChange"/>
    </div>
    <template v-else>
      <div class="gif-container-wraper">
        <canvas
          ref="canvasRef"
          :class="{
            'gif-container-canvas': true,
            'gif-container-pointer': pickStatus
          }"
          @mousemove="pickMousemove"
          @mouseleave="pickMouseleave"
          @click="pickColor"
        />
        <div
          v-show="!pickStatus"
          class="gif-container-area"
          ref="areaRef"
          @mousemove="mousemove"
          @mouseup="mouseup"
        >
          <div class="gif-container-drag" ref="dragRef" @mousedown="mousedown"/>
        </div>
        <canvas
          v-show="pickStatus && showLayer"
          ref="layerRef"
          class="gif-container-layer"
          :style="{
            borderRadius: `${RANK}px`
          }"
          :width="RANK"
          :height="RANK"
        />
      </div>
      <gif-property
        :max="localGIF.max"
        :color="localGIF.color"
        :stroke="localGIF.stroke"
        :swidth="localGIF.swidth"
        :size="size"
        :align="localGIF.align"
        :direction="localGIF.direction"
        :frame="localGIF.frame"
        @change="propertyChange"
        @pick="pick"
      />
    </template>
    <footer class="gif-container-footer">
      <meme-button :label="updateStatus ? '更新' : '确认'" u="primary" @click="updateData"/>
    </footer>
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.gif-container {
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
  &-area {
    position: absolute;
    top: 10px;
    border: thin solid gray;
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
  .gif-property {
    height: 50px;
    flex-shrink: 0;
    background: #FFFFFF;
    border-top: 1px solid #DDDEE4;
  }
}
</style>
