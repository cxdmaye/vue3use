<template>
  <div>
    <h1 ref="copyRef">31231231231313{{ msg }}</h1>
    <div ref="pasteRef">{{ initialContent }}</div>
    {{ x }}
    <button @click="counter">Counter</button>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";
import Click from "./../../Hook/Click";
import ClipboardService from "./../../Services/ClipBorad";

export default {
  data() {
    return {
      msg: "dasdds",
    };
  },
  setup(props) {
    let { counter, x } = Click();
    // let abc = ClipboardService.getInstance("123");
    return {
      counter,
      x,
    };
  },
};
</script>
