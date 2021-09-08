<script setup lang="ts">
import {ref, watch} from 'vue';
import Side from '../components/Side.vue';
// import Container from '../components/Container.vue';
import {Story} from '../types';

// const props = defineProps({
//   foo: String
// });

interface TT {
  mid: string;
  title: string;
  feature: string;
  image: string;
  x: number;
  y: number;
  max: number;
  font: string;
  color: string;
  align: string;
}

const mid = ref('');
const story: Story = {
  t: 123
};

const imageChange = value => {
  if (mid.value !== value) {
    mid.value = value;
  }
};

const getImageData = mid => {
  return '';
};

watch(mid, (nv, ov) => {
  console.log(`new: ${nv}, old: ${ov}`);
  getImageData(nv);
});

console.log(story);
</script>

<script lang="ts">
// defineComponent
</script>

<template>
<div class="image-wrap">
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