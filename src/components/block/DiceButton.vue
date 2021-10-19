<script setup lang="ts">
import {computed} from 'vue';
import {MemeButton} from '../common';

const props = defineProps({
  color: {
    type: String,
    default: '#FF0000'
  }
});

const emit = defineEmits(['click']);

const localColor = computed(() => {
  return ['transparent', '#FFFFFF'].includes(props.color) ? 'gray' : props.color;
});

const change = () => {
  emit('click');
};
</script>

<template>
  <meme-button
    class="dice-button"
    u="icon"
    @click="change"
  >
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32">
      <title>dice</title>
      <path :fill="localColor" d="M27 6h-16c-2.75 0-5 2.25-5 5v16c0 2.75 2.25 5 5 5h16c2.75 0 5-2.25 5-5v-16c0-2.75-2.25-5-5-5zM13 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM13 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM19 22c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 28c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25 16c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM25.899 4c-0.467-2.275-2.491-4-4.899-4h-16c-2.75 0-5 2.25-5 5v16c0 2.408 1.725 4.432 4 4.899v-19.899c0-1.1 0.9-2 2-2h19.899z"/>
    </svg>
  </meme-button>
</template>

<style lang="less">
.dice-button {
  position: relative;
  padding: 0;
  svg {
    position: relative;
    top: 1px;
  }
}
</style>
