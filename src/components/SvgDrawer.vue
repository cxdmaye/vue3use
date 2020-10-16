<template>
  <div>
    <div class="title">Width:{{width}} Height:{{height}}</div>
    <input type="range" v-model="width" />
    <input type="range" v-model="height" />
    Rate:
    <input type="range" v-model="rate" max="10" />

    <div>
      Color:
      <input type="range" v-model="colorOpt.h" max="360" />
      <input type="range" v-model="colorOpt.s" />
      <input type="range" v-model="colorOpt.l" />
      {{color}}
    </div>
    <div>
      <button @click="startpmd">Start</button>
      <button @click="endpmd">End</button>
    </div>
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="1000"
        height="1000"
        class="svgbox"
        shape-rendering="optimizeSpeed"
      >
        <rect
          x="0"
          y="0"
          :width="svgOpt.width"
          :height="svgOpt.height"
          rx="0"
          ry="0"
          :fill="color"
        />
        <rect
          :x="svgOpt.width*1"
          y="0"
          :width="svgOpt.width"
          :height="svgOpt.height"
          rx="0"
          ry="0"
          :fill="color"
        />
        <rect
          :x="svgOpt.width*2"
          y="0"
          :width="svgOpt.width"
          :height="svgOpt.height"
          rx="0"
          ry="0"
          :fill="color"
        />
        <rect
          :x="svgOpt.width*3"
          y="0"
          :width="svgOpt.width"
          :height="svgOpt.height"
          rx="0"
          ry="0"
          :fill="color"
        />
      </svg>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, watch, ref, reactive, onMounted } from "vue";
import OptDataInfo from "./OptDataInfo.vue";
import Color from "./../Hook/Color";

export default {
  setup(props, ctx) {
    let rate = ref(1);
    let width = ref(30);
    let height = ref(10);

    let svgOpt = computed(() => {
      return {
        width: width.value * rate.value,
        height: height.value * rate.value,
      };
    });

    let { colorOpt, color } = Color();

    let random = () => {
      height.value = Math.random() * 100;
      colorOpt.h = Math.random() * 360;
      colorOpt.s = Math.random() * 100;
      colorOpt.l = Math.random() * 100;
    };

    let timer = undefined;
    let waiting = computed(() => {
      return Math.random() * 100;
    });
    let bonce = () => {
      timer = setTimeout(() => {
        random();
        bonce();
      }, 50);
    };

    onMounted(() => {
      bonce();
    });

    let startpmd = () => {
      if (!timer) {
        bonce();
      }
    };

    let endpmd = () => {
      clearInterval(timer);
      timer = undefined;
    };

    return {
      rate,
      width,
      height,
      svgOpt,
      colorOpt,
      color,
      startpmd,
      endpmd,
    };
  },
  methods: {},
};
</script>
<style>
.svgbox {
  transition: all 1s;
}
rect {
  transition: height 0.05s;
}
</style>