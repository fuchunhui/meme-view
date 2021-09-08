<template>
  <div
    class="meme-loading"
    v-show="localShow"
  >
    <div class="meme-loading-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="41"
        height="41"
        viewBox="0 0 32 32"
        class="meme-loading-spinner"
      >
        <path d="M32 16a15.832 15.832 0 0 0-4.864-11.137 15.717 15.717 0 0 0-5.156-3.302A15.512 15.512 0 0 0 15.999.5 15.335 15.335 0 0 0 5.216 5.216a15.23 15.23 0 0 0-3.193 4.994A15.027 15.027 0 0 0 1 16a14.92 14.92 0 0 0 1.254 5.694A14.84 14.84 0 0 0 5.57 26.43a14.708 14.708 0 0 0 4.832 3.085A14.534 14.534 0 0 0 16 30.5c1.897-.04 3.78-.455 5.502-1.216a14.346 14.346 0 0 0 4.574-3.208 14.213 14.213 0 0 0 2.977-4.67c.407-1.046.684-2.137.829-3.244a2 2 0 0 0 2.111-2.163H32zm-3.178 5.311c-.733 1.663-1.796 3.169-3.099 4.412s-2.844 2.225-4.508 2.868A13.536 13.536 0 0 1 16 29.5a13.328 13.328 0 0 1-9.369-4.131 13.246 13.246 0 0 1-2.76-4.346 13.048 13.048 0 0 1 .231-9.952c.683-1.541 1.672-2.937 2.883-4.088s2.642-2.058 4.184-2.652a12.539 12.539 0 0 1 9.568.231c1.48.658 2.82 1.609 3.926 2.774s1.975 2.54 2.543 4.021c.57 1.481.837 3.064.794 4.641h.007a2 2 0 0 0 1.777 2.155 13.829 13.829 0 0 1-.962 3.156z"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, toRefs, watch, ref} from 'vue';

const MIN = 500;
const INTERVAL = 300;

export default defineComponent({
  name: 'Loading',

  props: {
    show: {
      type: Boolean,
      default: true
    },
    min: {
      type: Number,
      default: MIN
    },
    interval: {
      type: Number,
      default: INTERVAL
    }
  },

  created() {
    this.showChange(this.show);
  },
  setup(props: any) {
    const {show, interval, min} = toRefs(props);
    const localShow = ref(show.value);
    let timer: number | undefined = undefined;
    let start = 0;

    const hide = () => {
      const now = new Date().getTime();
      const duration = now - start;
      if (duration > min.value) {
        localShow.value = false;
      } else {
        setTimeout(() => {
          localShow.value = false;
        }, Math.max(min.value - duration, 0));
      }
    };

    const showChange = (value: boolean) => {
      if (value) {
        if (interval.value === 0) {
          localShow.value = true;
          start = new Date().getTime();
        } else {
          timer = window.setTimeout(() => {
            localShow.value = true;
            start = new Date().getTime();  
          }, interval.value);
        }
      } else {
        clearTimeout(timer);
        hide();
      }
    };

    watch(show, () => {
      showChange(show.value);
    });
    return {
      localShow,
      showChange
    };
  }
});
</script>

<style lang="less">
.meme-loading {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  z-index: 999;
  &-wrap {
    position: relative;
    background: rgba(0, 0, 0, 0.4);
    width: 60px;
    height: 60px;
    border-radius: 6px;
    margin: auto;
  }
  &-spinner {
    position: relative;
    top: 10px;
    fill: #FFFFFF;
    animation: circle 1s infinite linear;
  }

  @keyframes circle {
    0% {
      transform:rotate(0deg);
    }
    100% {
      transform:rotate(360deg);
    }
  }
}
</style>
