<script setup lang="ts">
import {toRefs, inject} from 'vue';
import {MemeInput, MemeSelect} from './common';
import type {FillImage} from '../types/image';
import type {OPTION} from '../types';

const props = defineProps<FillImage>();

const emit = defineEmits(['change']);

const injectText = inject('text');
const injectUpdateText: () => void = inject('updateText') as () => void;
const injectPaths = inject('paths') as OPTION[];

const {width, height, ipath} = toRefs(props);

const changeValue = (value: string, type: string) => {
  const param: Record<string, string | number> = {
    width: width.value,
    height: height.value,
    ipath: ipath.value
  };
  param[type] = ['ipath'].includes(type) ? value : parseInt(value);
  emit('change', param);
};
</script>

<template>
  <div class="property">
    <meme-input class="property-text" :value="injectText" @update:model-value="injectUpdateText"/>
    <meme-input class="property-size" :value="width" @update:model-value="changeValue($event, 'width')"/>
    <meme-input class="property-size" :value="height" @update:model-value="changeValue($event, 'height')"/>
    <meme-select
      class="property-path"
      :options="injectPaths"
      :selected="ipath"
      @update:model-value="changeValue($event, 'ipath')"
    />
  </div>
</template>

<style lang="less">
.property {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;

  &-size,
  &-path,
  &-text {
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #DDDEE4;
    margin-right: 10px;
  }

  &-size {
    width: 60px;
  }
  &-path {
    width: 100px;
  }
  &-text {
    width: 120px;
  }
}
</style>
