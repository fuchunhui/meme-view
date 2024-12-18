<script setup lang="ts">
console.log('NODE_ENV', import.meta.env.NODE_ENV)
console.log('VITE_APP_DOMAIN', import.meta.env.VITE_APP_DOMAIN)
</script>

<template>
  <router-view/>
</template>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  color: #2c3e50f3;
  background: #ebedf3;
}
</style>
