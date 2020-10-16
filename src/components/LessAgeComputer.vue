
<template>
  <div>
    <h2>{{people.birthDay}}</h2>
    <h3>LessTime:{{lesstime}}</h3>
  </div>
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
  setup(props, ctx) {
    let lesstime = Date.now() - new Date(props.people.birthDay).getTime();

    return {
      lesstime,
      timer: null
    };
  },
  mounted() {
    this.increaseTime();
  },
  destroyed() {
    this.timer = null;
  },
  methods: {
    increaseTime() {
      this.timer = setInterval(() => {
        this.lesstime = Date.now() - new Date(this.people.birthDay).getTime();
      }, 1);
    }
  }
};
</script>