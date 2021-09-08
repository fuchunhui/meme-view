<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import Side from '../components/Side.vue';
// import Container from '../components/Container.vue';
import {Story} from '../types';

const mid = ref('');
const story: Story = reactive({
  mid: '',
  title: '',
  feature: '',
  image: '',
  x: 0,
  y: 0,
  max: 0,
  font: '',
  color: '',
  align: ''
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

console.log(story);
</script>

<template>
  <div class="image-wrap">
    {{ story }}
    <side @change="imageChange"/>
    <!-- <container/> -->
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.image-wrap {
  width: 100%;
  height: 100%;
  .flex-center();

  .side {
    width: 200px;
    background: #FFFFFF;
  }
  .container {
    flex: 1;
  }
}
</style>