<script setup lang="ts">
import {toRefs} from 'vue';
import {MemeInput, MemeSelect} from './common';
import DiceButton from './block/DiceButton.vue';
import PickerButton from './block/PickerButton.vue';
import type {FillText, TextPropertyValue} from '../types/image';

const props = defineProps<FillText>();
const emit = defineEmits(['change', 'pick']);

const {max, size, font, color, align, direction, blur, degree, stroke, swidth, content} = toRefs(props);

// 具体哪些值可以支持，后续确认和调整
const fontOptions = [
  { label: 'Sans Serif', value: 'sans-serif' },
  { label: 'Serif', value: 'serif' },
  { label: 'Monospace', value: 'monospace' },
  { label: 'Cursive', value: 'cursive' },
  { label: 'Fantasy', value: 'fantasy' }
]

const alignOptions = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' }
];

const directionOptions = [
  { label: 'Up', value: 'up' },
  { label: 'Center', value: 'center' },
  { label: 'Down', value: 'down' }
];

const changeValue = (value: string, type: string) => {
  const param = {
    eid: props.eid,
    max: max.value,
    size: size.value,
    font: font.value,
    color: color.value,
    align: align.value,
    direction: direction.value,
    blur: blur.value,
    degree: degree.value,
    stroke: stroke.value,
    swidth: swidth.value,
    content: content.value
  } as TextPropertyValue & Record<string, string | number>;
  const isStringField = ['color', 'align', 'direction', 'stroke', 'font', 'content'].includes(type);
  (param as Record<string, string | number>)[type] = isStringField ? value : parseInt(value);
  emit('change', param as TextPropertyValue);
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
  <div class="property text-property">
    <slot></slot>
    <meme-input
      class="property-content"
      title="content"
      placeholder="附加文本"
      :value="content"
      @update:model-value="changeValue($event, 'content')"
    />
    <meme-input
      class="property-max"
      title="max"
      :value="max"
      @update:model-value="changeValue($event, 'max')"
    />
    <meme-input
      class="property-size"
      title="size"
      :value="size"
      @update:model-value="changeValue($event, 'size')"
    />
    <meme-select
      class="property-font"
      :options="fontOptions"
      :selected="font"
      @update:model-value="changeValue($event, 'font')"
    />
    <meme-input
      class="property-color"
      title="color"
      :value="color"
      @update:model-value="changeValue($event, 'color')"
    />
    <dice-button :color="color" @click="changeColor('color')"/>
    <picker-button :color="color" @click="pickColor"/>
    <meme-input
      class="property-color"
      title="stroke"
      :value="stroke"
      @update:model-value="changeValue($event, 'stroke')"
    />
    <dice-button :color="stroke" @click="changeColor('stroke')"/>
    <meme-input
      class="property-swidth"
      :value="swidth"
      title="swidth"
      @update:model-value="changeValue($event, 'swidth')"
    />
    <meme-select
      class="property-align"
      :options="alignOptions"
      :selected="align"
      @update:model-value="changeValue($event, 'align')"
    />
    <meme-select
      class="property-direction"
      :options="directionOptions"
      :selected="direction"
      @update:model-value="changeValue($event, 'direction')"
    />
    <meme-input
      class="property-degree"
      title="degree"
      :value="degree"
      @update:model-value="changeValue($event, 'degree')"
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

  &-max,
  &-size,
  &-color,
  &-text,
  &-degree,
  &-swidth,
  &-content,
  &-path,
  &-font,
  &-align,
  &-direction {
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
  &-color,
  &-path,
  &-font {
    width: 100px;
  }
  &-align,
  &-direction {
    width: 60px;
  }
  &-text,
  &-content {
    width: 120px;
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
}
</style>
