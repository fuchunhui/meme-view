<script setup lang="ts">
import {toRefs} from 'vue';
import {MemeInput} from './common';

const props = defineProps<{
  max: number,
  size: number,
  color: string
}>();

const emit = defineEmits(['change']);

const {max, size, color} = toRefs(props);

const changeValue = (value: string, type: string) => {
  // TODO 增加校验逻辑，保证数据的合法性
  const param: {[key: string]: string | number} = {
    max: max.value,
    size: size.value,
    color: color.value
  };
  param[type] = type === 'color' ? value : parseInt(value);

  emit('change', param);
};

</script>

<template>
  <div class="property">
    <meme-input class="property-max" :value="max" @update:modelValue="changeValue($event, 'max')"/>
    <meme-input class="property-size" :value="size" @update:modelValue="changeValue($event, 'size')"/>
    <meme-input class="property-color" :value="color" @update:modelValue="changeValue($event, 'color')"/>
  </div>
</template>

<style lang="less">
.property {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;

  &-max,
  &-size,
  &-color {
    width: 100px;
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #DDDEE4;
    margin-right: 10px;
  }
}
</style>
