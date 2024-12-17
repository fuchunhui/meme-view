import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('counter', () => {
  const currentPath = ref('');

  const setPath = (path: string) => {
    currentPath.value = path;
  };

  return {
    currentPath,
    setPath
  };
});
