<script setup lang="ts">
import { ref } from 'vue';
import Api from '../api';

const catalogList = ref([]);

const getCatalog = () => {
  const list = [
    {
      id: 'meme_common',
      text: 'common',
      children: [
        {
          mid: 'meme_1630929517998',
          title: 'happy'
        },
        {
          mid: 'meme_1630929517999',
          title: 'fans'
        },
        {
          mid: 'meme_1630929518000',
          title: 'weekly1'
        }
      ]
    },
    {
      id: 'meme_mid',
      text: 'autumn',
      children: [
        {
          mid: 'meme_1630929518006',
          title: 'new life'
        },
        {
          mid: 'meme_1630929518007',
          title: 'happy chicken'
        },
        {
          mid: 'meme_1630929518008',
          title: 'moon cake'
        }
      ]
    }
  ];
  setTimeout(() => {
    catalogList.value = list;
  }, 2000);

  // Api.getCatalog().then(res => {
  //   console.log('catalog: ', res);
  // });
};

const showCell = child => {
  console.log({...child});
};

getCatalog();
</script>

<template>
  <div class="side">
    <template v-for="(item, index) in catalogList" :key="item.id">
      <div class="side-content">
        <p>{{ item.text }}</p>
        <div
          v-for="child in item.children"
          :key="child.id"
          class="side-content-cell"
          @click="showCell(child)"
        >{{ child.title }}</div>
      </div>
    </template>
  </div>
</template>

<style lang="less">
.side {
  width: 100%;
  height: 100%;
}
</style>