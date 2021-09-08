<template>
  <h1>{{ msg }}</h1>

  <!-- <button type="button" @click="count++">count is: {{ count }}</button> -->
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// import {Story} from '../types/images';

interface Story {
  mid: string;
  title: string;
}

export default defineComponent({
  setup() {
    const s: Story = {
      r: 123
    };
    console.log(s);
  }
});

</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
