<script setup lang="ts">
import {toRefs, Ref, ref, onMounted} from 'vue';
import Property from '../components/Property.vue';
import {MemeButton} from './common';
import {Story} from '../types';
// import {CanvasTextAlign} from ''

const props = defineProps<{
  story: Story
}>();

const emit = defineEmits(['change']);

const localStory: Ref<Story> = toRefs(props).story;
const canvasRef = ref<HTMLCanvasElement | null>(null);
const text = ref('测试文本');


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
  ctx.font = font; // TODO 处理
  ctx.fillStyle = color;
  ctx.textAlign = align as CanvasTextAlign;
  ctx.textBaseline = 'top';
  ctx.fillText(text.value, x, y, max || canvas.width);
};

setTimeout(() => { // test
  localStory.value.x += 15;
  localStory.value.color = 'green';

  renderImage();
}, 3000);

const renderDragLayer = () => {
  // canvas.addEventListener('click', (event: Event) => {
  //   console.log(event);
  // });
  // div 拖拽事件 
  // x, y等变化更新localStory
  // watch story 然后重新renderImage
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
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
    overflow: hidden;
  }
  &-canvas {
    border: 1px solid #dddee4;
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