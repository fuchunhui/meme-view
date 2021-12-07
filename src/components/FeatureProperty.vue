<script setup lang="ts">
import {toRefs, inject} from 'vue';
import {MemeInput, MemeRadio} from './common';

const props = defineProps<{
  width: number,
  height: number,
  ipath: string
}>();

const emit = defineEmits(['change']);

const injectTtext = inject('text');
const injectUpdateText: () => void = inject('updateText') as () => void;

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
    <meme-input class="property-size" :value="width" @update:model-value="changeValue($event, 'width')"/>
    <meme-input class="property-size" :value="height" @update:model-value="changeValue($event, 'height')"/>

    <!-- <meme-radio label="start" name="align" value="start" :checked="align === 'start'" @toggle="changeValue($event, 'align')"/>
    <meme-radio label="center" name="align" value="center" :checked="align === 'center'" @toggle="changeValue($event, 'align')"/>
    <meme-radio
      class="property-end"
      label="end"
      name="align"
      value="end"
      :checked="align === 'end'"
      @toggle="changeValue($event, 'align')"
    /> -->
    <meme-input class="property-text" :value="injectTtext" @update:model-value="injectUpdateText"/>
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
  &-text {
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #DDDEE4;
    margin-right: 10px;
  }

  &-size {
    width: 60px;
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
