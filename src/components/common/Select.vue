<template>
  <select class="meme-select" name="select" @change="selectedChange">
    <option
      v-for="item in options"
      :key="item.value"
      class="meme-option"
      :value="item.value"
      :selected="selected === item.value"
    >
      {{ item.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
interface OPTION {
  label: string;
  value: string;
}

defineProps<{
  options: OPTION[],
  selected: string
}>();

const emit = defineEmits(['change', 'update:model-value']);

const selectedChange = (event: Event) => {
  const _value = (event.target as HTMLInputElement).value;
  (event.target as HTMLInputElement).blur();
  emit('update:model-value', _value);
  emit('change', _value);
};
</script>

<style lang="less">
.meme-select {
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: 1px solid transparent;
  color: #666;
  font-size: 12px;
  text-indent: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;

  &:hover {
    border-color: #4B98F8;
    color: #4B98F8;
  }

  &.disabled {
    &,
    &:hover {
      border-color: #DDDEE4;
      color: rgba(102, 102, 102, 0.4);
      opacity: 1;
      cursor: default;
    }
  }
}
</style>
