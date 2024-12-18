<script setup lang="ts">
import {toRefs, inject} from 'vue';
import {MemeInput, MemeSelect} from './common';
import type {OPTION} from '../types';

const props = defineProps<{
  width: number,
  height: number,
  ipath: string,
}>();

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
  <div class="feature-property">
    <meme-input class="feature-property-size" :value="width" @update:model-value="changeValue($event, 'width')"/>
    <meme-input class="feature-property-size" :value="height" @update:model-value="changeValue($event, 'height')"/>
    <meme-select
      class="feature-property-path"
      :options="injectPaths"
      :selected="ipath"
      @update:model-value="changeValue($event, 'ipath')"
    />
    <meme-input class="feature-property-text" :value="injectText" @update:model-value="injectUpdateText"/>
  </div>
</template>

<style lang="less">
.feature-property {
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
  .meme-radio {
    margin-right: 8px;
  }
  .meme-radio.property-end {
    margin-right: 10px;
  }
}
</style>
