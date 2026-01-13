<script setup lang="ts">
import {toRefs, inject} from 'vue';
import {MemeInput, MemeSelect} from './common';
import type {FillImage, ImagePropertyValue} from '../types/image';
import type {OPTION} from '../types';

const props = defineProps<FillImage>();
const emit = defineEmits(['change']);

const injectPaths = inject('paths') as OPTION[];
const {width, height, ipath} = toRefs(props);

const changeValue = (value: string, type: string) => {
  const param: ImagePropertyValue = {
    eid: props.eid,
    width: width.value,
    height: height.value,
    ipath: ipath.value
  };
  
  if (type === 'ipath') {
    param.ipath = value;
  } else if (type === 'width') {
    param.width = parseInt(value);
  } else if (type === 'height') {
    param.height = parseInt(value);
  }
  
  emit('change', param);
};
</script>

<template>
  <div class="property image-property">
    <slot></slot>
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
