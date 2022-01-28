<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import Property from '../components/Property.vue';
import FeatureProperty from '../components/FeatureProperty.vue';
import {MemeButton} from './common';
import {
  fillText,
  drawLayer,
  getFontSize,
  LINE_HEIGHT,
  RANK
} from '../utils/canvas';
import {getExt} from '../utils/file';
import {download} from '../utils/download';
import {
  Feature,
  ExtensionText,
  ExtensionImage,
  PropertyValue,
  ImagePropertyValue
} from '../types';
import Api from '../api';

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
const imageBase64 = ref('');
const updateText = (value: string) => {
  text.value = value;
  if (isText.value) {
    renderImage();
  } else {
    Api.getMaterialBase64({
      ipath: imageProperty.value.ipath,
      value
    }).then(res => {
      imageBase64.value = res;
      if (res) {
        extImg.src = res;
      } else {
        renderImage();
      }
    });
  }
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
    return getFontSize(localFeature.value.et?.font as string);
  }
  return 0;
});

const type = computed(() => {
  return getExt(localFeature.value.story.image);
});

const localTitle = computed(() => {
  const property = isText.value ? textProperty.value : imageProperty.value;
  return `${localFeature.value.story.title}.${type.value}`
    + ` ${width.value} * ${height.value} (${property.x}, ${property.y})`;
});

const textProperty = computed(() => {
  return localFeature.value.et as ExtensionText;
});

const imageProperty = computed(() => {
  return localFeature.value.ei as ExtensionImage;
});

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

const imageTextOption = computed(() => {
  const {font, color, direction, blur, degree} = localFeature.value.story;
  const {x, y, width} = imageProperty.value;
  const options = {
    x: x + width / 2,
    y: y + getFontSize(font),
    max: width,
    font,
    color,
    align: 'center',
    direction,
    blur,
    degree
  };
  return options;
});

const textPropertyChange = (value: PropertyValue) => {
  const {max, size, color, align, direction, blur, degree} = value;
  (localFeature.value.et as ExtensionText).max = max;
  (localFeature.value.et as ExtensionText).font = `${size}px sans-serif`;
  (localFeature.value.et as ExtensionText).color = color;
  (localFeature.value.et as ExtensionText).align = align;
  (localFeature.value.et as ExtensionText).direction = direction;
  (localFeature.value.et as ExtensionText).blur = blur;
  (localFeature.value.et as ExtensionText).degree = degree;
};

const extImg = new Image();
extImg.onerror = err => {
  console.error(err);
};
extImg.onload = () => {
  renderImage();
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
    renderDragLayer();
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

  if (isText.value || (!isText.value && !imageBase64.value)) {
    const options = isText.value ? textProperty.value : imageTextOption.value;
    ctx.restore();
    fillText(ctx, canvas.width, text.value, options);
  } else {
    const {x, y, width, height} = imageProperty.value;
    ctx.drawImage(extImg, x, y, width, height);
  }
};

const renderDragLayer = () => {
  let _width = 0;
  let _height = 0;
  let _top = 0;
  let _left = 0;

  if (isText.value) {
    const {x, y, max} = textProperty.value;
    _width = max;
    _height = size.value * LINE_HEIGHT;
    _top = y - size.value + 2;
    _left = x - offsetWidth.value;
  } else {
    const {x, y, width, height} = imageProperty.value;
    _width = width;
    _height = height;
    _top = y;
    _left = x;
  }

  const dragEle = dragRef.value as HTMLElement;
  dragEle.style.width = `${_width}px`;
  dragEle.style.height = `${_height}px`;
  dragEle.style.top = `${_top}px`;
  dragEle.style.left = `${_left}px`;
};

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

  locationChange(x, y);
};

const locationChange = (x: number, y: number) => {
  if (isText.value) {
    textProperty.value.x = x + offsetWidth.value;
    textProperty.value.y = y + size.value - 2;
  } else {
    imageProperty.value.x = x;
    imageProperty.value.y = y;
  }
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
  const {mid, type, et, ei} = localFeature.value;
  emit('change', {
    mid,
    type,
    options: isText.value ? et : ei
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
  (localFeature.value.et as ExtensionText).color = color;
  showLayer.value = false;
  pickStatus.value = false;
};

const cornerRef = ref<HTMLElement | null>(null);
let corx = 0;
let cory = 0;
let cornerDrag = false;

const cornerMouseDown = (event: MouseEvent) => {
  cornerDrag = true;
  const {clientX, clientY} = event;
  corx = clientX;
  cory = clientY;
};

const cornerMouseMove = (event: MouseEvent) => {
  if (!cornerDrag) {
    return;
  }

  const {clientX, clientY} = event;

  const areaEle = areaRef.value as HTMLElement;
  const {x, y, width: areaWidth, height: areaHeight} = areaEle.getBoundingClientRect();

  if (clientX < x || clientY < y || clientX > x + areaWidth || clientY > y + areaHeight) {
    cornerDrag = false;
    return;
  }

  const offX = clientX - corx;
  const offY = clientY - cory;

  const {width, height} = imageProperty.value;
  const dragEle = dragRef.value as HTMLElement;
  dragEle.style.width = `${width + offX}px`;
  dragEle.style.height = `${height + offY}px`;
};

const cornerMouseUp = (event: MouseEvent) => {
  if (!cornerDrag) {
    return;
  }

  cornerDrag = false;

  const {clientX, clientY} = event;
  const x = clientX - corx;
  const y = clientY - cory;

  const {width, height} = imageProperty.value;
  imageProperty.value.width = width + x;
  imageProperty.value.height = height + y;
};

const imagePropertyChange = (value: ImagePropertyValue) => {
  const {width, height, ipath} = value;
  (localFeature.value.ei as ExtensionImage).width = width;
  (localFeature.value.ei as ExtensionImage).height = height;
  (localFeature.value.ei as ExtensionImage).ipath = ipath;
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
    <div
      class="container-wraper"
      @mousemove="cornerMouseMove"
      @mouseup="cornerMouseUp"
    >
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
        <div
          class="container-drag"
          ref="dragRef"
          @mousedown="mousedown"
        >
          <div
            v-if="!isText"
            ref="cornerRef"
            class="container-drag-corner"
            @mousedown.stop.prevent="cornerMouseDown"
          />
        </div>
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
      :blur="textProperty.blur"
      :degree="textProperty.degree"
      @change="textPropertyChange"
      @pick="pick"
    />
    <feature-property
      v-else
      :width="imageProperty.width"
      :height="imageProperty.height"
      :ipath="imageProperty.ipath"
      @change="imagePropertyChange"
    />
    <footer class="container-footer">
      <meme-button label="更新" u="primary" @click="updateData"/>
    </footer>
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');
@length: 8px;

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
  &-drag-corner {
    position: absolute;
    background: white;
    border: 1px solid #0099ff;
    width: @length;
    height: @length;
    bottom: calc(-@length / 2);
    right: calc(-@length / 2);
    border-radius: 100%;
    cursor: se-resize;
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
  .property,
  .feature-property {
    height: 50px;
    flex-shrink: 0;
    background: #FFFFFF;
    border-top: 1px solid #DDDEE4;
  }
}
</style>
