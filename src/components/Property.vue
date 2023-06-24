<script setup lang="ts">
import {toRefs, inject} from 'vue';
import {MemeInput, MemeRadio} from './common';
import DiceButton from './block/DiceButton.vue';
import PickerButton from './block/PickerButton.vue';

const props = defineProps<{
  max: number,
  size: number,
  color: string,
  align: string,
  direction: string,
  blur: number,
  degree: number,
  stroke: string,
  swidth: number
}>();

const emit = defineEmits(['change', 'pick']);

const injectText = inject('text');
const injectUpdateText: () => void = inject('updateText') as () => void;

const {max, size, color, align, direction, blur, degree, stroke, swidth} = toRefs(props);

const changeValue = (value: string, type: string) => {
  // TODO 增加校验逻辑，保证数据的合法性
  const param: {[key: string]: string | number} = {
    max: max.value,
    size: size.value,
    color: color.value,
    align: align.value,
    direction: direction.value,
    blur: blur.value,
    degree: degree.value,
    stroke: stroke.value,
    swidth: swidth.value
  };
  param[type] = ['color', 'align', 'direction'].includes(type) ? value : parseInt(value);
  emit('change', param);
};

const changeColor = (key: string) => {
  const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  changeValue(color, key);
};

const pickColor = () => {
  emit('pick');
};
</script>

<template>
  <div class="property">
    <meme-input class="property-max" :value="max" @update:model-value="changeValue($event, 'max')"/>
    <meme-input class="property-size" :value="size" @update:model-value="changeValue($event, 'size')"/>
    <meme-input class="property-color" :value="color" @update:model-value="changeValue($event, 'color')"/>
    <dice-button :color="color" @click="changeColor('color')"/>
    <picker-button :color="color" @click="pickColor"/>
    <meme-input class="property-color" :value="stroke" @update:model-value="changeValue($event, 'stroke')"/>
    <dice-button :color="stroke" @click="changeColor('stroke')"/>
    <meme-input class="property-swidth" :value="swidth" @update:model-value="changeValue($event, 'swidth')"/>
    <meme-radio label="start" name="align" value="start" :checked="align === 'start'" @toggle="changeValue($event, 'align')"/>
    <meme-radio label="center" name="align" value="center" :checked="align === 'center'" @toggle="changeValue($event, 'align')"/>
    <meme-radio
      class="property-end"
      label="end"
      name="align"
      value="end"
      :checked="align === 'end'"
      @toggle="changeValue($event, 'align')"
    />
    <meme-input
      class="property-text"
      :value="injectText"
      @update:model-value="injectUpdateText"
    />
    <meme-radio
      label="up"
      name="direction"
      value="up"
      :checked="direction === 'up'"
      @toggle="changeValue($event, 'direction')"
    />
    <meme-radio
      label="center"
      name="direction"
      value="center"
      :checked="direction === 'center'"
      @toggle="changeValue($event, 'direction')"
    />
    <meme-radio
      label="down"
      name="direction"
      value="down"
      :checked="direction === 'down'"
      @toggle="changeValue($event, 'direction')"
    />
    <meme-input class="property-degree" :value="degree" @update:model-value="changeValue($event, 'degree')"/>
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
  &-color,
  &-text,
  &-degree,
  &-swidth {
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #DDDEE4;
    margin-right: 10px;
  }
  &-max,
  &-size,
  &-degree,
  &-swidth {
    width: 60px;
  }
  &-color{
    width: 100px;
  }
  &-text {
    width: 120px;
  }
  .meme-radio {
    margin-right: 8px;
  }
  .property-color {
    margin-right: 2px;
  }
  .dice-button {
    margin-right: 8px;
  }
  .picker-button {
    margin-right: 10px;
  }
  .meme-radio.property-end {
    margin-right: 10px;
  }
}
</style>
