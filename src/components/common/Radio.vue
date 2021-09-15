<script setup lang="ts">
defineProps<{
  label: string;
  name: string;
  value: string;
  checked: boolean;
}>();

const emit = defineEmits(['toggle']);

const changeValue = (value: string) => {
  emit('toggle', value);
};
</script>

<template>
  <label class="meme-radio">
    <input
      class="meme-radio-input"
      type="radio"
      :name="name"
      :value="value"
      :checked="checked"
      @change="changeValue(value)"
    >
    <span class="meme-radio-label">{{ label }}</span>
  </label>
</template>

<style lang="less">
.meme-radio {
  display: flex;
  align-items: center;
  height: 16px;
  line-height: 16px;
  cursor: pointer;
  &-input {
    width: 16px;
    height: 100%;
    margin: 0;
    cursor: inherit;
  }
  &-label {
    height: 100%;
    margin-left: 4px;
    color: #3f3f3f;
    font-size: 12px;
  }
}
</style>