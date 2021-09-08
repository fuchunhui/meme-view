<template>
  <button
    :class="[
      'meme-button',
      {
        'disabled': disabled
      }]"
  >
    {{ localLabel }}
  </button>
</template>

<script lang="ts">
import {defineComponent, toRefs} from 'vue';

export default defineComponent({
  name: 'Button',

  props: {
    label: {
      type: String,
      default: '提交'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const {label} = toRefs(props);
    return {
      localLabel: label
    };
  }
});
</script>

<style lang="less">
.meme-button {
  min-width: 98px;
  height: 32px;
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;

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
