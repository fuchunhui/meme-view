<template>
  <input
    ref="input"
    :class="[
      'meme-input',
      {
        'disabled': disabled
      }
    ]"
    :title="title"
    :value="modelValue"
    @blur="blur"
    @keyup.enter="input?.blur()" 
  >
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

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
    const input = ref<HTMLInputElement | null>(null);
    const changeValue = (event: KeyboardEvent | FocusEvent) => {
      emit('update:modelValue', (event.target as HTMLInputElement).value);
    };
    const blur = (event: KeyboardEvent | FocusEvent) => {
      changeValue(event);
      emit('blur');
    };
    return {
      input,
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
