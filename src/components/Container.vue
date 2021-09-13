<script setup lang="ts">
import {toRefs, Ref, ref, onMounted, watch} from 'vue';
import Property from '../components/Property.vue';
import {MemeButton} from './common';
import {Story} from '../types';

const props = defineProps<{
  story: Story
}>();

const emit = defineEmits(['change']);

const localStory: Ref<Story> = toRefs(props).story;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const areaRef = ref<HTMLElement | null>(null);
const dragRef = ref<HTMLElement | null>(null);
const text = ref('测试文本');
const width = ref(0);
const height = ref(0);

const add = () => {
  console.log('你说更新就更新');
};

const update = () => {
  // TODO 保证不过多发送数据，只在数据变化的执行
  emit('change', localStory.value);
};

// const propertyChange = () => {
//   console.log('propertyChange');
// };

const img = new Image();

const makeCanvas = () => {
  img.onload = async () => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    console.log('width: ', canvas.width, canvas.height);

    width.value = canvas.width;
    height.value = canvas.height;

    renderImage();
    renderDragLayer();
  };

  img.onerror = err => {
    console.error(err);
  };

  img.src = localStory.value.image;
};

const renderImage = () => {
  const canvas = canvasRef.value as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0);

  const {x, y, font, color, align, max} = localStory.value;
  console.log('renderImage: ', x, y);
  ctx.font = font; // TODO 处理
  ctx.fillStyle = color;
  ctx.textAlign = align as CanvasTextAlign;
  ctx.textBaseline = 'top';
  ctx.fillText(text.value, x, y, max || canvas.width);
};

watch(localStory, (nv, ov) => {
  console.log('update story: ', nv);
  renderImage();
}, {deep: true});

const renderDragLayer = () => {
  const ele = areaRef.value as HTMLElement;
  ele.style.width = `${width.value}px`;
  ele.style.height = `${height.value}px`;

  const {x, y, font, color, max} = localStory.value;
  const dragEle = dragRef.value as HTMLElement;
  const fontSize = font.match(/(\d{1,3})px/) || ['', '32'];

  dragEle.style.width = `${max || 100}px`;
  dragEle.style.height = `${Number(fontSize[1]) * 1 || 40}px`;
  dragEle.style.top = `${y}px`;
  dragEle.style.left = `${x}px`;
  dragEle.style.borderColor = color || '#FF0000';
};

const updateStory = (x: number, y: number) => {
  localStory.value.x = x;
  localStory.value.y = y;
};

let cx = 0;
let cy = 0;
const buffer = 10;
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
  let x = ele.offsetLeft + clientX - cx;
  let y = ele.offsetTop + clientY - cy;

  const {width: dragWidth, height: dragHeight} = ele.getBoundingClientRect();

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

  ele.style.top = `${y}px`;
  ele.style.left = `${x}px`;

  updateStory(x, y);
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
    <property/>
    <footer class="container-footer">
      <meme-button label="更新" u="primary" @click="update"/>
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
    height: 40px; // TODO 长宽初始化
    border: 1px solid red;
    user-select: none;
    cursor: move;
  }
  &-footer {
    height: 58px;
    .flex-center();

    .meme-button {
      width: 130px;
    }
  }
  .property {
    height: 100px;
    flex-shrink: 0;
    background: rgb(153, 153, 131);
  }
}
</style>