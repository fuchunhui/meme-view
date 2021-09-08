<script setup lang="ts">
import Side from '../components/Side.vue';
import Container from '../components/Container.vue';
</script>

<template>
<div class="image-wrap">
  <side/>
  <!-- <container/> -->
</div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.image-wrap {
  width: 100%;
  height: 100%;
  .flex-center();

  .side {
    width: 240px;
    background: cyan;
  }
  .container {
    flex: 1;
  }
}
</style>