<template>
  <div>
    <h1>{{ message }}</h1>
    <h1>{{ msg }}</h1>
    <slot />
    
    <slot name="son1"></slot>
  </div>
</template>
<script lang="ts">
import { computed, ref } from "vue";

export default {
  props: {
    message: {
      type: String,
      default: () => {
        return "abc";
      },
    },
  },
  setup(props) {
    var msg = computed(() => props.message);
    return {
      msg,
    };
  },
};
</script>
