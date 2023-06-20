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
  FeatureText,
  FeatureImage,
  OPTION,
  Additional
} from '../types';
import Api from '../api';
import { FEATURE_TYPE } from '../config/constant';

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
  blur: 0,
  senior: 0,
  degree: 0
});

let feature: Ref<Feature> = ref({
  mid: '',
  feature: '',
  type: '',
  story
});

let additional: Ref<Additional> = ref({
  mid: '',
  text: ''
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
      if (res.senior === 2) { // ADDITIONAL 类型
        Api.getAdditional({
          mid
        }).then(response => {
          additional.value = response
        });
      }
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

const createImage = async (value: Story, cancelCreate: () => void) => {
  const res = await Api.createImage(value).catch(response => {
    alert(response.message);
  });
  if (res) {
    await getCatalog();
    current.value = res.mid;
  } else {
    cancelCreate();
  }
};

const commands = ref([]);
const paths = ref<OPTION[]>();
provide('commands', commands);
provide('paths', paths);

const getConfig = async () => {
  const {commands: _commands, paths: _paths} = await Api.getConfig({});
  commands.value = _commands;
  paths.value = _paths.map((item: string) => {
    return {
      label: item,
      value: item
    };
  });
};

const showContainer = computed(() => {
  return ['STORY', 'SERIES', 'SPECIAL'].includes(curType.value);
});

const featureChange = ({mid, type, options}: FeatureText | FeatureImage) => {
  if ([FEATURE_TYPE.TEXT, FEATURE_TYPE.REPEAT].includes(type)) {
    Api.saveImage(options);
  } else {
    Api.saveFeatureImage({
      mid,
      type,
      ...options
    });
  }
};

const updateImage = (value: Story) => {
  Api.updateImage(value);
};

onMounted(() => {
  getCatalog();
  getConfig();
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
      :additional="additional"
      @change="storyChange"
      @replace="replace"
      @create="createImage"
      @update="updateImage"
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
  .container {
    flex: 1;
    width: calc(100% - @width);
    padding: 0 6px;
  }
}
</style>