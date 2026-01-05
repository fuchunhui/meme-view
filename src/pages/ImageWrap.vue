
<template>
  <div class="image-wrap">
    <side
      :current="current"
      :catalog-list="catalogList"
      @change="imageChange"
    />
    <container
      v-if="current"
      :story="story"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch, type Ref, onMounted, provide} from 'vue';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import type {
  Story,
  Catalog,
  CatalogItem,
  OPTION,
} from '../types';
import Api from '../api';

const catalogList: Ref<Catalog[]> = ref([]);
const current = ref('');

let story: Ref<Story> = ref({
  mid: '',
  name: '',
  feature: '',
  type: '',
  image: '',
  children: [],
});

const getCatalog = async () => {
  const res = await Api.getCatalog({});
  catalogList.value = res;
};

const imageChange = ({type, child}: {type: string; child: CatalogItem}) => {
  if (current.value !== child.mid) {
    current.value = child.mid as string;
  }
};

watch(current, () => {
  getImageData(current.value);
});

const getImageData = (mid: string) => {
  Api.openImage({
    mid
  }).then(res => {
    story.value = res;
  });
};

// const createImage = async (value: Story, cancelCreate: () => void) => {
//   const res = await Api.createImage(value).catch(response => {
//     alert(response.message);
//   });
//   if (res) {
//     await getCatalog();
//     current.value = res.mid;
//   } else {
//     cancelCreate();
//   }
// };

const commands = ref([]);
const paths = ref<OPTION[]>(); // TODO 待处理
provide('commands', commands);
provide('paths', paths);

const getConfig = async () => {
  const {commands: _commands, paths: _paths} = await Api.getConfig({});
  commands.value = _commands;
  paths.value = ['SVG', 'PNG', 'DB', 'RANDOM'].map((item: string) => {
    return {
      label: item,
      value: item
    };
  });
};

onMounted(() => {
  getCatalog();
  getConfig();
});

</script>

<style lang="less">
@import url('src/assets/css/mixins.less');
@width: 180px;

.image-wrap {
  width: 100%;
  height: 100%;
  display: flex;

  .side {
    min-width: @width;
    width: @width;
    background: #FFFFFF;
    flex-shrink: 0;
  }
  .container,
  .gif-container {
    flex: 1;
    width: calc(100% - @width);
    padding: 0 6px;
  }
}
</style>