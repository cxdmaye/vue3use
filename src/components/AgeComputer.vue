<template>
  <h1>{{age}}</h1>
</template>
<script lang="ts">
import { computed } from "vue";

export default {
  props: {
    people: {
      type: Object,
      default: () => {
        return { birthDay: "0001/01/01" };
      }
    }
  },
  setup(props) {
    var age = computed(() => {
      return (
        (new Date().getTime() - new Date(props.people.birthDay).getTime()) /
        (60 * 60 * 24 * 365 * 1000)
      );
    });
    return {
      age
    };
  }
};
</script>
