<script setup lang="ts">
import {toRefs, Ref} from 'vue';
import Property from '../components/Property.vue';
import {MemeButton} from './common';
import {Story} from '../types';

const props = defineProps<{
  story: Story
}>();
const emit = defineEmits(['change']);

const localStory: Ref<Story> = toRefs(props).story;

console.log('container: ', localStory.value);

const update = () => {
  // TODO 保证不过多发送数据，只在数据变化的执行
  emit('change', localStory.value);
};

const propertyChange = () => {
  console.log('propertyChange');
};

</script>

<template>
  <div class="container">
    <div class="container-content">
      <div class="container-header">
        header
      </div>
      <div class="container-wraper">
        <div class="container-image">
          image
        </div>
        <!-- <div class="container-area">
          text todo change layout
        </div> -->
      </div>
      <footer class="container-footer">
        <MemeButton label="更新" u="primary" @click="update"/>
      </footer>
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
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
  }
  &-header {
    flex-shrink: 0;
    height: 46px;
    margin: 0 -1px 6px;
    background-color: #fff;
    border: 1px solid #dddee4;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
  }
  &-wraper {
    position: relative;
    flex: 1;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
  }
  &-image {
    height: 100%;
    border: 1px solid #dddee4;
  }
  &-area {
    position: absolute;
    top: 10px;
    right: 10px;
    bottom: 10px;
    left: 10px;
  }
  &-footer {
    height: 58px;
    .flex-center();

    .meme-button {
      width: 130px;
    }
  }
  .property {
    width: 240px;
    background: rgb(153, 153, 131);
  }
}
</style>