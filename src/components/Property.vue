<script setup lang="ts">
import {toRefs, ref, watch} from 'vue';
import {MemeInput} from './common';

const props = defineProps<{
  max: number,
  size: number,
  color: string
}>();

const emit = defineEmits(['change']);

const {max, size, color} = toRefs(props);
console.log('property: ', max.value, size.value, color.value);

const maxValue = ref(max.value + '');
const sizeValue = ref(size.value + '');
const colorValue = ref(color.value);

watch([maxValue, sizeValue, colorValue], (nv, ov) => {
  console.log(nv, ov);
  // TODO 增加校验逻辑，保证数据的合法性
  emit('change', {
    max: maxValue.value,
    size: sizeValue.value,
    color: colorValue.value
  });
});

</script>

<template>
  <div class="property">
    <meme-input class="property-max" v-model="maxValue"/>
    <meme-input class="property-size" v-model="sizeValue"/>
    <meme-input class="property-color" v-model="colorValue"/>
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