<script setup lang="ts">
// 素材管理中心
// 物料库
// 视图列表，可编辑的名字，删除，可调整的图片，可新增

import {onMounted} from 'vue';
import Api from '../api';

const getCatalog = () => {
  if (!Api.getMaterialCatalog) return;
  Api.getMaterialCatalog({
    type: 'DB'.toLowerCase()
  }).then(() => {
    // Catalog loaded
  });
};

onMounted(() => {
  getCatalog();
});
</script>

<template>
  <div class="material-center">
    什么都没有的荒原
  </div>
</template>

<style>
.material-center {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
}
</style>