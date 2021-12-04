<script setup lang="ts">
import {ref, watch, Ref, onMounted, provide, computed} from 'vue';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import FeatureContainer from '../components/FeatureContainer.vue';
import {
  Story,
  Catalog,
  CatalogItem,
  Feature,
  FeatureText
} from '../types';
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
  align: 'start',
  direction: 'down',
  senior: 0
});

let feature: Ref<Feature> = ref({
  mid: '',
  feature: '',
  type: '',
  story
});

const getCatalog = async () => {
  const res = await Api.getCatalog({});
  catalogList.value = res;
};

const imageChange = ({type, child}: {type: string; child: CatalogItem}) => {
  if (current.value !== child.mid) {
    current.value = child.mid as string;
    curType.value = type;
  }
};

watch([current, curType], () => {
  getImageData(current.value, curType.value);
});

const getImageData = (mid: string, type: string) => {
  if (showContainer.value) {
    Api.openImage({
      mid,
      type
    }).then(res => {
      story.value = res;
    });
  } else {
    Api.getFeatureImage({
      mid
    }).then(res => {
      feature.value = res;
    });
  }
};

const storyChange = (value: Story) => {
  const params = {...value, image: ''};
  Api.saveImage(params);
};

const replace = (value: Story) => {
  story.value = value;
};

const createImage = async (value: Story) => {
  const res = await Api.createImage(value).catch(response => {
    alert(response.message);
  });

  await getCatalog();
  current.value = res.mid;
};

const commands = ref([]);
provide('commands', commands);

const getCommands = async () => {
  const res = await Api.getCommands({});
  commands.value = res;
};

const showContainer = computed(() => {
  return ['STORY', 'SERIES', 'SPECIAL'].includes(curType.value);
});

const featureChange = ({mid, type, options}: FeatureText) => {
  console.log('更新feature 数据', mid, type, options);
  if (type === 'TEXT') {
    Api.saveImage(options);
  }
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
      v-if="showContainer && story.image && story.mid"
      :story="story"
      @change="storyChange"
      @replace="replace"
      @create="createImage"
    />
    <feature-container
      v-if="curType === 'FEATURE' && feature.mid"
      :feature="feature"
      @change="featureChange"
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