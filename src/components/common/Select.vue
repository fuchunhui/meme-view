<template>
  <select class="meme-select" @change="selectedChange">
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
  emit('update:model-value', _value);
  emit('change', _value);
};
</script>

<style lang="less">
.meme-select {
  // min-width: 98px;
  // height: 32px;
  // background-color: #FFFFFF;
  // border: 1px solid #D9D9D9;
  // border-radius: 4px;
  // font-size: 12px;
  // cursor: pointer;
  // user-select: none;
  // vertical-align: middle;

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

  &[u~="primary"] {
    background-color: #4B98F8;
    border-color: transparent;
    color: #FFFFFF;
    &:hover {
      background-color: #388AFA;
      border-color: #388AFA;
    }
    &.disabled,
    &.disabled:hover {
      background-color: #F6F6F6;
      border-color: #4B98F8;
      color: #4B98F8;
    }
  }

  &[u~="grey"] {
    background-color: #F6F6F6;
    color: #666666;

    &:hover {
      background-color: #F0F0F0;
    }
    &:active {
      background-color: #ECECEC;
    }

    &.disabled,
    &.disabled:hover {
      background-color: #F6F6F6;
      opacity: .4;
    }
  }
}
</style>
