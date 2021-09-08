<template>
  <input
    :class="[
      'meme-input',
      {
        'disabled': disabled
      }
    ]"
    :title="title"
    :value="modelValue"
    @blur="blur"
    @keyup.enter="$event.target.blur()" 
  >
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Input',

  props: {
    modelValue: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  emits: ['update:modelValue', 'blur'],

  setup(props: any, {emit}: any) {
    const changeValue = (event: InputEvent) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };
    const blur = (event: InputEvent) => {
      changeValue(event);
      emit('blur');
    };
    return {
      changeValue,
      blur
    };
  }
});
</script>

<style lang="less">
.meme-input {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid transparent;
  text-indent: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
