<template>
  <div>
    <h2>{{title}}</h2>
    <div v-for="(item,i) in info" :key="i">
      {{item.title}}
      <div>
        <OptDataInfo :title="item.title" :template="template" :optiondata="item.data" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, watch, ref, reactive } from "vue";
import OptDataInfo from "./OptDataInfo.vue";
export default {
  components: {
    OptDataInfo
  },
  props: {
    template: {
      type: Number
    },
    title: {
      type: String
    },
    info: {
      type: Array
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