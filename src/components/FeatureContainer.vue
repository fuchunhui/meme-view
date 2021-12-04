<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import Property from '../components/Property.vue';
import {MemeButton} from './common';
import {
  fillText,
  drawLayer,
  LINE_HEIGHT,
  RANK
} from '../utils/canvas';
import {download} from '../utils/download';
import {Feature, ExtensionText, PropertyValue} from '../types';

const props = defineProps<{
  feature: Feature
}>();

const emit = defineEmits(['change']);

const localFeature: Ref<Feature> = toRefs(props).feature;

const canvasRef = ref<HTMLCanvasElement | null>(null);
const areaRef = ref<HTMLElement | null>(null);
const dragRef = ref<HTMLElement | null>(null);

const pickStatus = ref(false);
const showLayer = ref(false);
const layerRef = ref<HTMLCanvasElement | null>(null);

const STORY_TEXT = '金馆长';
const text = ref('金馆长');
const updateText = (value: string) => {
  text.value = value;
  renderImage();
};
provide('text', text);
provide('updateText', updateText);

const width = ref(0);
const height = ref(0);

const isText = computed(() => {
  return localFeature.value.type === 'TEXT';
});

const size = computed(() => {
  if (isText.value) {
    const fontSize = localFeature.value.et?.font.match(/(\d{1,3})px/) || ['', '32'];
    return Number(fontSize[1]);
  }
  return 0;
});

const type = computed(() => {
  const base64 = localFeature.value.story.image;
  const parts = base64.split(';base64,');
  const type = parts[0].match(/[a-z]+$/g)?.[0] || 'png';
  return type;
});

// TODO 目前只考虑TEXT类型
const localTitle = computed(() => {
  return `${localFeature.value.story.title}.${type.value}`
    + ` ${width.value} * ${height.value} (${textProperty.value.x}, ${textProperty.value.y})`;
});

// TODO 检查下，当IMAGE类型下，这个计算属性的内容是什么，是否还有用。
const textProperty = computed(() => {
  return localFeature.value.et as ExtensionText;
});

// TODO 
// 暂时只考虑TEXT场景，候补补充Image再调整
const offsetWidth = computed(() => {
  if (isText.value) {
    const max = textProperty.value.max || width.value;
    const alignMap: Record<string, number> = {
      'start': 0,
      'center': Math.floor(max / 2),
      'end': max,
    };
    return alignMap[textProperty.value.align];
  }
  return 0;
});

const textPropertyChange = (value: PropertyValue) => {
  const {max, size, color, align, direction} = value;
  (localFeature.value.et as ExtensionText).max = max;
  (localFeature.value.et as ExtensionText).font = `${size}px sans-serif`; // 统一默认字体，均使用sans-serif
  (localFeature.value.et as ExtensionText).color = color;
  (localFeature.value.et as ExtensionText).align = align;
  (localFeature.value.et as ExtensionText).direction = direction;
};

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
    if (isText.value) {
      renderDragLayer();
    }
  };

  img.onerror = err => {
    console.error(err);
  };

  img.src = localFeature.value.story.image;
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
  ctx.save();

  fillText(ctx, canvas.width, STORY_TEXT, localFeature.value.story);
  // TODO 补充图片和文字的内容。
  // !!!!! 写着里，把文字的画法，加上。
  // ！！！！
};

const renderDragLayer = () => {
  if (isText.value) {
    const {x, y, max} = textProperty.value;
    const dragEle = dragRef.value as HTMLElement;
    dragEle.style.width = `${max}px`;
    dragEle.style.height = `${size.value * LINE_HEIGHT}px`;
    dragEle.style.top = `${y - size.value + 2}px`;
    dragEle.style.left = `${x - offsetWidth.value}px`;
  }
};

// TODO
// const renderDragLay1er = () => {
//   // 获取四个值x y width height

//   let x = 0;
//   let y = 0;
//   let width = 0;
//   let height = 0;

//   if (isText.value) {
//     // TEXT
//     const {x: _x, y: _y, max} = localFeature.value.;
//     x = _x;
//     y = _y;
//     width = max;
//     height = size.value * LINE_HEIGHT;
//   } else {
//     // IMAGE
//   }

//   // const {x, y, max} = localFeature.value.story;
//   const dragEle = dragRef.value as HTMLElement;
//   dragEle.style.width = `${width}px`;
//   dragEle.style.height = `${height}px`;
//   dragEle.style.top = `${y - size.value + 2}px`;
//   dragEle.style.left = `${x - offsetWidth.value}px`;
// };

// TODO 跟踪内容的变化，是否有影响。
watch(localFeature, (nv, ov) => {
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

const locationChange = (x: number, y: number) => {
  textProperty.value.x = x;
  textProperty.value.y = y;
};

const mouseup = () => {
  if (!canDrag) {
    return;
  }
  canDrag = false;
};

const _download = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const fileName = `imeme_${localFeature.value.story.title}_${text.value}`;
  download(canvas, type.value, fileName);
};

const updateData = () => {
  // TODO 如何提交这里的数据内容
  // emit('change', localFeature.value);

  // TEXT
  const {mid, type, et} = localFeature.value
  emit('change', {
    mid: localFeature.value.mid,
    type: localFeature.value.type,
    options: localFeature.value.et
  });
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
  localFeature.value.story.color = color;
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
      <meme-button label="下载" u="primary" @click="_download"/>
    </div>
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
      v-if="isText"
      :max="textProperty.max"
      :color="textProperty.color"
      :size="size"
      :align="textProperty.align"
      :direction="textProperty.direction"
      @change="textPropertyChange"
      @pick="pick"
    />
    <footer class="container-footer">
      <meme-button label="更新" u="primary" @click="updateData"/>
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
  &-canvas {
    border: thin dashed #333;
  }
  &-wraper {
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
