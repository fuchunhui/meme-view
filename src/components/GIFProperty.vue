<script setup lang="ts">
import {toRefs, inject} from 'vue';
import {MemeInput, MemeRadio} from './common';
import DiceButton from './block/DiceButton.vue';
import PickerButton from './block/PickerButton.vue';

const props = defineProps<{
  max: number,
  size: number,
  color: string,
  stroke: string,
  swidth: number,
  align: string,
  direction: string,
  frame: string
}>();

const emit = defineEmits(['change', 'pick']);

const injectText = inject('text');
const injectUpdateText: () => void = inject('updateText') as () => void;

const {max, size, color, stroke, swidth, align, direction, frame} = toRefs(props);

const changeValue = (value: string, type: string) => {
  const param: {[key: string]: string | number} = {
    max: max.value,
    size: size.value,
    color: color.value,
    stroke: stroke.value,
    swidth: swidth.value,
    align: align.value,
    direction: direction.value,
    frame: frame.value
  };
  param[type] = ['color', 'align', 'direction'].includes(type) ? value : parseInt(value);
  emit('change', param);
};

const changeColor = () => {
  const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
  changeValue(color, 'color');
};

const pickColor = () => {
  emit('pick');
};
</script>

<template>
  <div class="gif-property">
    <meme-input class="gif-property-max" :value="max" @update:model-value="changeValue($event, 'max')"/>
    <meme-input class="gif-property-size" :value="size" @update:model-value="changeValue($event, 'size')"/>
    <meme-input class="gif-property-color" :value="color" @update:model-value="changeValue($event, 'color')"/>
    <dice-button :color="color" @click="changeColor"/>
    <picker-button :color="color" @click="pickColor"/>
    <meme-radio label="start" name="align" value="start" :checked="align === 'start'" @toggle="changeValue($event, 'align')"/>
    <meme-radio label="center" name="align" value="center" :checked="align === 'center'" @toggle="changeValue($event, 'align')"/>
    <meme-radio
      class="gif-property-end"
      label="end"
      name="align"
      value="end"
      :checked="align === 'end'"
      @toggle="changeValue($event, 'align')"
    />
    <meme-input
      class="gif-property-text"
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
  </div>
</template>

<style lang="less">
.gif-property {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 10px;

  &-max,
  &-size,
  &-color,
  &-text {
    height: 30px;
    background: #FFFFFF;
    border: 1px solid #DDDEE4;
    margin-right: 10px;
  }
  &-max,
  &-size {
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
  .gif-property-color {
    margin-right: 2px;
  }
  .dice-button {
    margin-right: 8px;
  }
  .picker-button {
    margin-right: 10px;
  }
  .meme-radio.gif-property-end {
    margin-right: 10px;
  }
}
</style>
