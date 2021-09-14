<script setup lang="ts">
import {reactive, ref, watch} from 'vue';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import {Story} from '../types';
import Api from '../api';

const curMid = ref('');
const curType = ref('');
let story: Story = reactive({
  mid: '',
  title: '测试说明',
  feature: '测试字段',
  image: '',
  x: 20,
  y: 40,
  max: 125,
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

const getImageData = (mid: string, type: string) => {
  Api.openImage({
    mid,
    type
  }).then(res => {
    story = reactive(res); // TODO 如何复制更新
  });
};

watch([curMid, curType], () => {
  getImageData(curMid.value, curType.value);
});

const storyChange = (value: Story) => {
  console.log('story change value: ', value);
};
</script>

<template>
  <div class="image-wrap">
    <side @change="imageChange"/>
    <!-- <container :story="story" @change="storyChange"/> -->
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