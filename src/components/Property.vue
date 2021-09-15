<script setup lang="ts">
import {computed, toRefs} from 'vue';
import {MemeInput, MemeRadio} from './common';

const props = defineProps<{
  max: number,
  size: number,
  color: string,
  align: string
}>();

const emit = defineEmits(['change']);

const {max, size, color, align} = toRefs(props);

const alignValue = computed(() => {
  return align.value === 'start';
});

const changeValue = (value: string, type: string) => {
  // TODO 增加校验逻辑，保证数据的合法性
  const param: {[key: string]: string | number} = {
    max: max.value,
    size: size.value,
    color: color.value,
    align: align.value
  };
  param[type] = ['color', 'align'].includes(type) ? value : parseInt(value);
  emit('change', param);
};

</script>

<template>
  <div class="property">
    <meme-input class="property-max" :value="max" @update:modelValue="changeValue($event, 'max')"/>
    <meme-input class="property-size" :value="size" @update:modelValue="changeValue($event, 'size')"/>
    <meme-input class="property-color" :value="color" @update:modelValue="changeValue($event, 'color')"/>
    <meme-radio label="start" name="align" value="start" :checked="alignValue" @toggle="changeValue($event, 'align')"/>
    <meme-radio label="end" name="align" value="end" :checked="!alignValue" @toggle="changeValue($event, 'align')"/>
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
  .meme-radio {
    margin-right: 8px;
  }
}
</style>
