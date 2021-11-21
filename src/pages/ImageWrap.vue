<script setup lang="ts">
import {ref, watch, Ref, onMounted, provide} from 'vue';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import {Story, Catalog} from '../types';
import Api from '../api';

const catalogList: Ref<Catalog[]> = ref([]);
const current = ref('');
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

const getCatalog = async () => {
  const res = await Api.getCatalog({});
  catalogList.value = res;
};

const imageChange = ({type, mid}: {type: string; mid: string}) => {
  if (current.value !== mid) {
    current.value = mid;
    curType.value = type;
  }
};

watch([current, curType], () => {
  getImageData(current.value, curType.value);
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
  const params = {...value, image: ''};
  Api.saveImage(params);
};

const replace = (value: Story) => {
  story.value = value;
};

const createImage = async (value: Story) => {
  const res = await Api.createImage(value);

  await getCatalog();
  current.value = res.mid;
};

const commands = ref([]);
provide('commands', commands);

const getCommands = async () => {
  const res = await Api.getCommands({});
  commands.value = res;
};

onMounted(() => {
  getCatalog();
  getCommands();
});

</script>

<template>
  <div class="image-wrap">
    <side
      :current="current"
      :catalog-list="catalogList"
      @change="imageChange"
    />
    <container
      v-if="story.image && story.mid"
      :story="story"
      @change="storyChange"
      @replace="replace"
      @create="createImage"
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