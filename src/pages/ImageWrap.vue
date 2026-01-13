
<template>
  <div class="image-wrap">
    <side
      :current="current"
      :catalog-list="catalogList"
      @change="imageChange"
    />
    <container
      v-if="story.image"
      :story="story"
      @change="changeImage"
      @create="createImage"
      @update-name="updateName"
      @create-layer="createLayer"
      @delete-layer="deleteLayer"
      @reorder-layer="reorderLayer"
    />
  </div>
</template>

<script setup lang="ts">
import {ref, watch, type Ref, onMounted, provide} from 'vue';
import {useRoute, useRouter} from 'vue-router';
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
import type {
  Story,
  Catalog,
  CatalogItem,
  OPTION,
} from '../types';
import Api from '../api';
import { ELEMENT_TYPE } from '../utils/constant';

const catalogList: Ref<Catalog[]> = ref([]);
const current = ref('');
const route = useRoute();
const router = useRouter();

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

const resolveBasePath = () => {
  const isButter = route.path.includes('/butter');
  const isEdit = route.path.includes('/edit');
  let base = isButter ? '/butter' : '/story';
  if (isEdit) {
    base += '/edit';
  }
  return base;
};

const imageChange = ({child}: {type: string; child: CatalogItem}) => {
  const base = resolveBasePath();
  const mid = child.mid as string;
  router.replace({path: `${base}/${mid}`});
};

watch(current, mid => {
  if (mid) {
    getImageData(mid);
  }
});

watch(() => route.params.mid, mid => {
  if (typeof mid === 'string') {
    current.value = mid;
  }
});

const getImageData = (mid: string) => {
  Api.openImage({
    mid
  }).then(res => {
    story.value = res;
  });
};

const changeImage = async (value: Story) => {
  if (!value?.children?.length) return;

  try {
    await Promise.all(value.children.map(child => {
      return Api.updateImage({
        eid: (child.options as any).eid,
        type: child.type,
        options: child.options
      });
    }));
  } catch (err: any) {
    console.error('update layer fail', err);
    window.alert(err?.message || '更新失败');
  }
};

const createImage = async (options: Record<string, string>, cancelCreate?: () => void) => {
  if (!options?.name || !options?.image) {
    window.alert('缺少必要的故事信息');
    return;
  }

  try {
    const res = await Api.createImage(options);
    const mid = res?.mid || res?.data?.mid;

    if (!mid) {
      window.alert(res?.message || '创建失败');
      return;
    }

    await getCatalog();
    current.value = mid;
    await getImageData(mid);
    cancelCreate?.();
  } catch (err: any) {
    console.error('create image fail', err);
    window.alert(err?.message || '创建失败');
  }
};

const updateName = async (value: Story) => {
  if (!value?.mid || !value?.name) {
    return;
  }

  await Api.updateName({ mid: value.mid, name: value.name });
}

const createLayer = async ({mid, type}: {mid: string; type: string}) => {
  const targetMid = mid || current.value;
  if (!targetMid) {
    return;
  }

  await Api.createLayer({mid: targetMid, type: type || ELEMENT_TYPE.TEXT});
  getImageData(targetMid);
};

const deleteLayer = async ({mid, eid}: {mid: string; eid: string}) => {
  const targetMid = mid || current.value;
  if (!targetMid || !eid) {
    return;
  }

  await Api.deleteLayer({mid: targetMid, eid});
  getImageData(targetMid);
};

const reorderLayer = async ({mid, eid, direction}: {mid: string; eid: string; direction: 'up' | 'down'}) => {
  const targetMid = mid || current.value;
  if (!targetMid || !eid) {
    return;
  }

  await Api.reorderLayer({mid: targetMid, eid, direction});
  getImageData(targetMid);
};

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
  const mid = route.params.mid as string;
  if (mid) {
    current.value = mid;
  }
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