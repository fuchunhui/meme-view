<script setup lang="ts">
import {Ref, toRefs} from 'vue';
import {Catalog, CatalogItem} from '../types';

const props = defineProps<{
  catalogList: Catalog[];
  current: string;
}>();

const emit = defineEmits(['change']);

const catalogList: Ref<Catalog[]> = toRefs(props).catalogList;

const showCell = (type: string, child: CatalogItem) => {
  emit('change', {type, child});
};
</script>

<template>
  <div class="side">
    <template v-for="item in catalogList" :key="item.id">
      <div class="side-content">
        <p class="side-content-title">
          {{ item.text }}
        </p>
        <div
          v-for="child in item.children"
          :key="child.mid"
          :class="{
            'side-content-cell': true,
            'side-content-cell-active': current === child.mid
          }"
          @click="showCell(item.type, child)"
        >
          {{ child.title }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="less">
.side {
  width: 100%;
  height: 100%;
  border-right: 1px solid #dddee4;
  overflow-y: auto;
  user-select: none;

  &-content {
    border-top: 1px solid #dddee4;
    &-title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding-left: 8px;
      background: #fff;
      box-shadow: 0 2px 3px 0 rgb(0 0 0 / 10%);
      color: #3f3f3f;
      font-size: 12px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-cell {
      width: 100%;
      height: 32px;
      line-height: 32px;
      padding-left: 10px;
      color: #3f3f3f;
      cursor: pointer;
      &-active,
      &:hover {
        background: #edf4fe;
        color: #4B98F8;
      }
    }
  }
}
</style>