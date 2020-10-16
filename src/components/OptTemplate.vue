<template>
  <h1>
    <div
      v-for="(t,index) in templates"
      :key="index"
      :class="value==t?'current template':'template'"
      @click="selectThis(t)"
    >Template: {{t}}</div>
  </h1>
</template>
<script lang="ts">
import { computed } from "vue";

export default {
  props: {
    templates: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: Number
    }
  },
  setup(props) {},
  methods: {
    selectThis(data) {
      this.$emit("input", data);
    }
  }
};
</script>
<style>
.template {
  width: 200px;
  height: 50px;
}
.template.current {
  border: 1px solid red;
}
</style>