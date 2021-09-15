<script setup lang="ts">
import {ref, watch, Ref} from 'vue';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import {Story} from '../types';
import Api from '../api';

const curMid = ref('');
const curType = ref('');
let story: Ref<Story> = ref({
  mid: '',
  title: '',
  feature: '',
  image: '',
  x: 0,
  y: 0,
  max: 100,
  font: '32px sans-serif',
  color: '#FFFFFF',
  align: 'start'
});

const imageChange = ({type, mid}: {type: string; mid: string}) => {
  if (curMid.value !== mid) {
    curMid.value = mid;
    curType.value = type;
  }
};

watch([curMid, curType], () => {
  getImageData(curMid.value, curType.value);
});

const getImageData = (mid: string, type: string) => {
  Api.openImage({
    mid,
    type
  }).then(res => {
    story.value = res;
  });
};

const storyChange = (value: Story) => {
  console.log('story change value: ', {...value});
  const params = {...value, image: ''};
  Api.saveImage(params).then(res => {
    console.log('save: ', res);
  });
};
</script>

<template>
  <div class="image-wrap">
    <side @change="imageChange"/>
    <container
      v-if="story.image && story.mid"
      :story="story"
      @change="storyChange"
    />
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