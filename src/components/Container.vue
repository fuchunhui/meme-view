<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch, computed, provide} from 'vue';
import Property from '../components/Property.vue';
import {MemeButton} from './common';
import {Story, PropertyValue} from '../types';

const props = defineProps<{
  story: Story
}>();

const emit = defineEmits(['change']);

const localStory: Ref<Story> = toRefs(props).story;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const areaRef = ref<HTMLElement | null>(null);
const dragRef = ref<HTMLElement | null>(null);

const text = ref('金馆长');
const updateText = (value: string) => {
  text.value = value;
  renderImage();
};
provide('text', text);
provide('updateText', updateText);

const width = ref(0);
const height = ref(0);

const add = () => {
  console.log('你说更新就更新');
};

const updateData = () => {
  // TODO 保证不过多发送数据，只在数据变化的执行
  emit('change', localStory.value);
};

const locationChange = (x: number, y: number) => {
  localStory.value.x = x;
  localStory.value.y = y;
};

const propertyChange = (value: PropertyValue) => {
  const {max, size, color, align} = value;
  localStory.value.max = max;
  localStory.value.font = `${size}px sans-serif`; // 统一默认字体，均使用sans-serif
  localStory.value.color = color;
  localStory.value.align = align;
};

const size = computed(() => {
  const fontSize = localStory.value.font.match(/(\d{1,3})px/) || ['', '32'];
  return Number(fontSize[1]) * 1; // 默认行高1倍，也可以选择1.5
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

  const {x, y, font, color, align, max} = localStory.value;
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = align as CanvasTextAlign;
  ctx.fillText(text.value, x, y, max || canvas.width);
};

const renderDragLayer = () => {
  const {x, y, max, align} = localStory.value;
  const dragEle = dragRef.value as HTMLElement;
  dragEle.style.width = `${max}px`;
  dragEle.style.height = `${size.value}px`;
  dragEle.style.top = `${y - size.value + 2}px`;
  dragEle.style.left = align === 'start' ? `${x}px` : `${x - max}px`;
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

  // 调节x, y的位置，与canvas中保持一致
  const {align, max} = localStory.value;
  x += (align === 'end' ? max : 0);
  y += size.value - 2;

  locationChange(x, y);
};

const mouseup = () => {
  if (!canDrag) {
    return;
  }
  canDrag = false;
};

onMounted(() => {
  makeCanvas();
});

</script>

<template>
  <div class="container">
    <div class="container-header">
      <div class="container-title">
        {{ localStory.title }}
      </div>
      <meme-button label="添加" u="primary" @click="add"/>
    </div>
    <div class="container-wraper">
      <canvas class="container-canvas" ref="canvasRef"/>
      <div
        class="container-area"
        ref="areaRef"
        @mousemove="mousemove"
        @mouseup="mouseup"
      >
        <div class="container-drag" ref="dragRef" @mousedown="mousedown"/>
      </div>
    </div>
    <property
      :max="localStory.max"
      :color="localStory.color"
      :size="size"
      :align="localStory.align"
      @change="propertyChange"
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
    background-color: #fff;
    border: 1px solid #dddee4;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
    .meme-button {
      width: 80px;
      min-width: 80px;
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