<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import {Story} from '../types';
import i from './i';

const mid = ref('');
const story: Story = reactive({
  mid: 'meme_1234567890',
  title: '测试说明',
  feature: '测试字段',
  image: i,
  x: 20,
  y: 40,
  max: 200,
  font: '32px sans-serif',
  color: '#FFFFFF',
  align: 'start'
});

const imageChange = (value: string) => {
  if (mid.value !== value) {
    mid.value = value;
  }
};

const getImageData = (mid: string) => {
  console.log(mid);
  return '';
};

watch(mid, (nv, ov) => {
  console.log(`new: ${nv}, old: ${ov}`);
  getImageData(nv);
});

const storyChange = (value: Story) => {
  console.log('story change value: ', value);
};

// console.log(story);
</script>

<template>
  <div class="image-wrap">
    <side @change="imageChange"/>
    <container :story="story" @change="storyChange"/>
    <!-- <container v-if="story.image && story.mid"/> -->
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.image-wrap {
  width: 100%;
  height: 100%;
  display: flex;

  .side {
    min-width: 200px;
    width: 200px;
    background: #FFFFFF;
    flex-shrink: 0;
  }
  .container {
    flex: 1;
    width: calc(100% - 200px);
    padding: 0 6px;
  }
}
</style>