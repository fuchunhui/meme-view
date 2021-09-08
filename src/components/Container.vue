<script setup lang="ts">
import Property from '../components/Property.vue';
</script>

<template>
  <div class="container">
    containers
    <div class="container-content">

    </div>
    <property/>
  </div>
</template>

<style lang="less">
@import url('src/assets/css/mixins.less');

.container {
  width: 100%;
  height: 100%;
  .flex-center();

  .container-content {
    flex: 1;
  }
  .property {
    width: 280px;
    background: rgb(153, 153, 131);
  }
}
</style>