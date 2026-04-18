<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import Api from '../api';
import {MemeButton, MemeInput} from '../components/common';
import type {BaseFile, StaticCatalogItem, StaticItemMeta, StaticItemView} from '../types';
import {useRoute, useRouter} from 'vue-router';

const route = useRoute();
const router = useRouter();

const catalogList = ref<StaticCatalogItem[]>([]);
const currentMid = ref('');
const items = ref<StaticItemView[]>([]);
const isLoadingCatalog = ref(false);
const isLoadingItems = ref(false);
const isCreating = ref(false);
const isAppending = ref(false);
const deletingId = ref<number | null>(null);

const createForm = ref({
  name: '',
  feature: '',
});
const createFiles = ref<BaseFile[]>([]);
const appendFiles = ref<BaseFile[]>([]);

const currentCollection = computed(() => {
  return catalogList.value.find(item => item.mid === currentMid.value) || null;
});

const isButterMode = computed(() => route.path.startsWith('/butter'));

const pageTitle = computed(() => {
  return isButterMode.value ? 'Butter Static Center' : 'Static Center';
});

const createPayloadImages = (files: BaseFile[]) => files.map(item => item.base64);

const resetCreateForm = () => {
  createForm.value = {
    name: '',
    feature: '',
  };
  createFiles.value = [];
};

const resetAppendFiles = () => {
  appendFiles.value = [];
};

const toast = (message: string) => {
  window.alert(message);
};

const getCatalog = async () => {
  if (!Api.getStaticCatalog) return;
  isLoadingCatalog.value = true;
  try {
    const data = await Api.getStaticCatalog({});
    catalogList.value = data || [];
    if (!catalogList.value.length) {
      currentMid.value = '';
      items.value = [];
      return;
    }

    const exists = catalogList.value.some(item => item.mid === currentMid.value);
    if (!exists) {
      currentMid.value = catalogList.value[0]?.mid || '';
    }
  } catch (err: any) {
    toast(err?.message || '获取 static 列表失败');
  } finally {
    isLoadingCatalog.value = false;
  }
};

const getItemImage = async (id: number) => {
  if (!Api.getStaticItemImage) return '';
  const data = await Api.getStaticItemImage({id});
  return data?.image || '';
};

const getItems = async (mid: string) => {
  if (!mid || !Api.getStaticItems) {
    items.value = [];
    return;
  }

  isLoadingItems.value = true;
  try {
    const data = await Api.getStaticItems({mid}) as StaticItemMeta[];
    items.value = (data || []).map(item => ({
      ...item,
      image: '',
      loading: true,
    }));

    await Promise.all(items.value.map(async item => {
      try {
        item.image = await getItemImage(item.id);
      } catch (err) {
        item.image = '';
      } finally {
        item.loading = false;
      }
    }));
  } catch (err: any) {
    items.value = [];
    toast(err?.message || '获取 static 图片失败');
  } finally {
    isLoadingItems.value = false;
  }
};

watch(currentMid, mid => {
  if (mid) {
    getItems(mid);
  } else {
    items.value = [];
  }
});

const selectCollection = (mid: string) => {
  if (mid === currentMid.value) {
    return;
  }
  currentMid.value = mid;
};

const ensureUniqueByName = (list: BaseFile[], file: BaseFile) => {
  return !list.some(item => item.name === file.name && item.base64 === file.base64);
};

const readFiles = async (fileList: FileList | File[]) => {
  const files = Array.from(fileList || []);
  const imageFiles = files.filter(file => /^image\//.test(file.type));
  if (!imageFiles.length) {
    toast('请选择图片文件');
    return [];
  }

  return Promise.all(imageFiles.map(file => {
    return new Promise<BaseFile>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        resolve({
          name: file.name,
          base64: event.target?.result as string,
        });
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  }));
};

const handleInputFiles = async (event: Event, mode: 'create' | 'append') => {
  const target = event.target as HTMLInputElement;
  const fileList = target.files;
  if (!fileList?.length) {
    return;
  }

  try {
    const nextFiles = await readFiles(fileList);
    if (mode === 'create') {
      createFiles.value = nextFiles.filter(file => ensureUniqueByName(createFiles.value, file)).concat(createFiles.value);
    } else {
      appendFiles.value = nextFiles.filter(file => ensureUniqueByName(appendFiles.value, file)).concat(appendFiles.value);
    }
  } catch (err: any) {
    toast(err?.message || '读取文件失败');
  } finally {
    target.value = '';
  }
};

const removeQueuedFile = (mode: 'create' | 'append', name: string) => {
  if (mode === 'create') {
    createFiles.value = createFiles.value.filter(item => item.name !== name);
  } else {
    appendFiles.value = appendFiles.value.filter(item => item.name !== name);
  }
};

const createCollection = async () => {
  if (!Api.createStaticCollection) return;
  if (!createForm.value.name.trim()) {
    toast('请输入命令名');
    return;
  }
  if (!createFiles.value.length) {
    toast('请至少上传一张图片');
    return;
  }

  isCreating.value = true;
  try {
    const data = await Api.createStaticCollection({
      name: createForm.value.name.trim(),
      feature: createForm.value.feature.trim(),
      images: createPayloadImages(createFiles.value),
    });
    await getCatalog();
    currentMid.value = data?.mid || currentMid.value;
    resetCreateForm();
  } catch (err: any) {
    toast(err?.message || '创建 static 命令失败');
  } finally {
    isCreating.value = false;
  }
};

const appendToCollection = async () => {
  if (!Api.addStaticItems) return;
  if (!currentMid.value) {
    toast('请先选择一个 static 命令');
    return;
  }
  if (!appendFiles.value.length) {
    toast('请先选择要追加的图片');
    return;
  }

  isAppending.value = true;
  try {
    await Api.addStaticItems({
      mid: currentMid.value,
      images: createPayloadImages(appendFiles.value),
    });
    resetAppendFiles();
    await Promise.all([getCatalog(), getItems(currentMid.value)]);
  } catch (err: any) {
    toast(err?.message || '追加图片失败');
  } finally {
    isAppending.value = false;
  }
};

const deleteItem = async (id: number) => {
  if (!Api.deleteStaticItem || deletingId.value) {
    return;
  }
  const confirmed = window.confirm('确认删除这张静态表情吗？');
  if (!confirmed) {
    return;
  }

  deletingId.value = id;
  try {
    await Api.deleteStaticItem({id});
    await Promise.all([getCatalog(), getItems(currentMid.value)]);
  } catch (err: any) {
    toast(err?.message || '删除失败');
  } finally {
    deletingId.value = null;
  }
};

const goToStoryEditor = () => {
  router.push(isButterMode.value ? '/butter/edit' : '/story/edit');
};

onMounted(() => {
  getCatalog();
});
</script>

<template>
  <div class="material-center">
    <aside class="material-center__sidebar">
      <div class="material-center__sidebar-head">
        <div>
          <h1 class="material-center__title">{{ pageTitle }}</h1>
          <p class="material-center__desc">管理静态表情命令与图片集合</p>
        </div>
        <meme-button u="grey" label="模板编辑" @click="goToStoryEditor"/>
      </div>

      <div class="material-center__panel">
        <div class="material-center__panel-title">新建 Static 命令</div>
        <div class="material-center__form-row">
          <label>命令名</label>
          <div class="material-center__input-wrap">
            <meme-input :model-value="createForm.name" @update:model-value="createForm.name = String($event)"/>
          </div>
        </div>
        <div class="material-center__form-row">
          <label>特征词</label>
          <div class="material-center__input-wrap">
            <meme-input :model-value="createForm.feature" @update:model-value="createForm.feature = String($event)"/>
          </div>
        </div>
        <div class="material-center__upload-wrap">
          <label class="material-center__upload-button">
            <input type="file" multiple accept="image/*" @change="handleInputFiles($event, 'create')">
            <span>选择图片</span>
          </label>
          <span class="material-center__tips">支持多选，直接创建命令并写入图片集合</span>
        </div>
        <div v-if="createFiles.length" class="material-center__queue">
          <div class="material-center__queue-title">待创建图片 {{ createFiles.length }}</div>
          <div class="material-center__queue-list">
            <div v-for="file in createFiles" :key="file.name" class="material-center__queue-item">
              <span>{{ file.name }}</span>
              <button type="button" @click="removeQueuedFile('create', file.name)">移除</button>
            </div>
          </div>
        </div>
        <meme-button u="primary" :disabled="isCreating" label="创建命令" @click="createCollection"/>
      </div>

      <div class="material-center__panel material-center__catalog-panel">
        <div class="material-center__panel-title">
          <span>命令列表</span>
          <span class="material-center__muted">{{ isLoadingCatalog ? '加载中' : `${catalogList.length} 项` }}</span>
        </div>
        <div class="material-center__catalog-list">
          <button
            v-for="item in catalogList"
            :key="item.mid"
            type="button"
            :class="['material-center__catalog-item', {'material-center__catalog-item--active': item.mid === currentMid}]"
            @click="selectCollection(item.mid)"
          >
            <div class="material-center__catalog-name">{{ item.name }}</div>
            <div class="material-center__catalog-meta">{{ item.count }} 张</div>
            <div v-if="item.feature" class="material-center__catalog-feature">{{ item.feature }}</div>
          </button>
          <div v-if="!catalogList.length && !isLoadingCatalog" class="material-center__empty">
            还没有 static 命令
          </div>
        </div>
      </div>
    </aside>

    <main class="material-center__content">
      <div class="material-center__content-head">
        <div>
          <h2>{{ currentCollection?.name || '请选择一个命令' }}</h2>
          <p>{{ currentCollection?.feature || '选中左侧命令后，可在这里追加图片并管理已上传内容' }}</p>
        </div>
        <div v-if="currentCollection" class="material-center__content-count">{{ currentCollection.count }} 张</div>
      </div>

      <div v-if="currentCollection" class="material-center__append-box">
        <div class="material-center__append-top">
          <label class="material-center__upload-button">
            <input type="file" multiple accept="image/*" @change="handleInputFiles($event, 'append')">
            <span>追加图片</span>
          </label>
          <meme-button u="primary" :disabled="isAppending || !appendFiles.length" label="确认追加" @click="appendToCollection"/>
        </div>
        <div v-if="appendFiles.length" class="material-center__queue">
          <div class="material-center__queue-title">待追加图片 {{ appendFiles.length }}</div>
          <div class="material-center__queue-list">
            <div v-for="file in appendFiles" :key="file.name" class="material-center__queue-item">
              <span>{{ file.name }}</span>
              <button type="button" @click="removeQueuedFile('append', file.name)">移除</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="currentCollection" class="material-center__grid-wrap">
        <div v-if="isLoadingItems" class="material-center__empty">图片加载中...</div>
        <div v-else-if="!items.length" class="material-center__empty">这个命令下还没有图片</div>
        <div v-else class="material-center__grid">
          <article v-for="item in items" :key="item.id" class="material-center__card">
            <div class="material-center__thumb">
              <div v-if="item.loading" class="material-center__thumb-placeholder">加载中...</div>
              <img v-else-if="item.image" :src="item.image" :alt="item.hash">
              <div v-else class="material-center__thumb-placeholder">图片缺失</div>
            </div>
            <div class="material-center__card-body">
              <div class="material-center__card-hash">{{ item.hash }}.{{ item.ext }}</div>
              <div class="material-center__card-time">{{ item.created_at || '未知时间' }}</div>
              <div class="material-center__card-actions">
                <meme-button u="grey" :disabled="deletingId === item.id" label="删除" @click="deleteItem(item.id)"/>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div v-else class="material-center__blank">
        <div class="material-center__blank-title">选择一个 static 命令开始管理</div>
        <div class="material-center__blank-desc">左侧可创建新命令，右侧查看与维护图片集合</div>
      </div>
    </main>
  </div>
</template>

<style lang="less">
.material-center {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 320px 1fr;
  background:
    linear-gradient(180deg, rgba(250, 252, 255, 0.98), rgba(242, 246, 252, 0.98)),
    radial-gradient(circle at top left, rgba(75, 152, 248, 0.12), transparent 30%);

  &__sidebar {
    height: 100%;
    padding: 18px;
    border-right: 1px solid #d8dfeb;
    overflow-y: auto;
    background: rgba(255, 255, 255, 0.78);
    backdrop-filter: blur(12px);
  }

  &__sidebar-head,
  &__content-head,
  &__append-top,
  &__panel-title,
  &__queue-item,
  &__card-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  &__title {
    font-size: 22px;
    line-height: 1.2;
    color: #1d2b43;
  }

  &__desc {
    margin-top: 6px;
    color: #6b7890;
    line-height: 1.5;
  }

  &__panel {
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #dce5f3;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.92);
    box-shadow: 0 10px 30px rgba(42, 61, 95, 0.06);
  }

  &__catalog-panel {
    padding-bottom: 8px;
  }

  &__panel-title {
    margin-bottom: 12px;
    font-size: 14px;
    font-weight: 600;
    color: #29364d;
  }

  &__muted {
    font-size: 12px;
    color: #8a96aa;
    font-weight: 400;
  }

  &__form-row {
    margin-bottom: 10px;

    label {
      display: block;
      margin-bottom: 6px;
      color: #5b6881;
    }
  }

  &__input-wrap {
    height: 34px;
    border: 1px solid #d8dfeb;
    border-radius: 8px;
    background: #fff;
  }

  &__upload-wrap {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 14px 0 12px;
  }

  &__upload-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 34px;
    border-radius: 8px;
    background: #1f7aff;
    color: #fff;
    cursor: pointer;
    overflow: hidden;

    input {
      position: absolute;
      inset: 0;
      opacity: 0;
      cursor: pointer;
    }
  }

  &__tips {
    color: #7a879b;
    line-height: 1.5;
  }

  &__queue {
    margin-bottom: 12px;
    padding: 10px;
    border-radius: 10px;
    background: #f4f8fd;
  }

  &__queue-title {
    margin-bottom: 8px;
    color: #31435f;
    font-weight: 600;
  }

  &__queue-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 180px;
    overflow-y: auto;
  }

  &__queue-item {
    padding: 8px 10px;
    border-radius: 8px;
    background: #fff;
    color: #54627a;

    span {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    button {
      border: none;
      background: transparent;
      color: #d34a4a;
      cursor: pointer;
    }
  }

  &__catalog-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: calc(100vh - 380px);
    overflow-y: auto;
  }

  &__catalog-item {
    width: 100%;
    padding: 12px;
    border: 1px solid #dce5f3;
    border-radius: 12px;
    background: #fff;
    text-align: left;
    cursor: pointer;
    transition: .18s ease;

    &:hover,
    &--active {
      border-color: #4b98f8;
      box-shadow: 0 10px 22px rgba(75, 152, 248, 0.14);
      transform: translateY(-1px);
    }
  }

  &__catalog-name {
    font-size: 14px;
    font-weight: 600;
    color: #22324b;
  }

  &__catalog-meta,
  &__catalog-feature {
    margin-top: 4px;
    color: #71809a;
    line-height: 1.5;
  }

  &__content {
    height: 100%;
    padding: 24px;
    overflow-y: auto;
  }

  &__content-head {
    margin-bottom: 18px;

    h2 {
      font-size: 24px;
      color: #1d2b43;
    }

    p {
      margin-top: 6px;
      color: #6e7b92;
    }
  }

  &__content-count {
    padding: 10px 14px;
    border-radius: 999px;
    background: #eff5ff;
    color: #2f67c7;
    font-weight: 600;
  }

  &__append-box,
  &__grid-wrap,
  &__blank {
    padding: 18px;
    border: 1px solid #dce5f3;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 14px 38px rgba(42, 61, 95, 0.06);
  }

  &__grid-wrap {
    margin-top: 18px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }

  &__card {
    overflow: hidden;
    border: 1px solid #e1e8f2;
    border-radius: 16px;
    background: #fff;
  }

  &__thumb {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
    background:
      linear-gradient(135deg, rgba(234, 241, 252, 0.85), rgba(248, 250, 254, 0.95));

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__thumb-placeholder {
    color: #8592a7;
  }

  &__card-body {
    padding: 12px;
  }

  &__card-hash {
    color: #263750;
    font-weight: 600;
    word-break: break-all;
  }

  &__card-time {
    margin-top: 6px;
    color: #8693a8;
  }

  &__card-actions {
    margin-top: 12px;
  }

  &__empty,
  &__blank {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 220px;
    color: #7d8aa0;
    text-align: center;
  }

  &__blank-title {
    font-size: 20px;
    color: #22324b;
    font-weight: 600;
  }

  &__blank-desc {
    margin-top: 8px;
  }
}

@media (max-width: 960px) {
  .material-center {
    grid-template-columns: 1fr;

    &__sidebar {
      height: auto;
      border-right: none;
      border-bottom: 1px solid #d8dfeb;
    }

    &__catalog-list {
      max-height: none;
    }

    &__content {
      padding: 16px;
    }
  }
}
</style>
