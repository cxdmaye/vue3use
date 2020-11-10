<template>
  <div class="tabbox">
    <div
      v-for="tab in tablist"
      :key="tab"
      :class="{ tabitem: true, current: tab === currenttab }"
      @click="SwitchTab(tab)"
    >
      {{ tab }}
    </div>
  </div>
</template>
<script lang="ts">
import { computed, watch, ref, reactive, onMounted } from "vue";

export default {
  props: {
    tablist: {
      type: Array,
      default: [],
    },
    currenttab: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    let { tablist } = props;
    let currenttab = ref(props.currenttab || tablist[0]);
    console.log(props.currenttab);
    const SwitchTab = (tab) => {
      currenttab.value = tab;
      emit("change", tab);
    };
    return {
      currenttab,
      tablist,
      SwitchTab,
    };
  },
};
</script>
<style scoped>
.tabbox {
  display: flex;
  border-bottom: 1px solid #4fc08d;
}
.tabitem {
  width: 100px;
  font-size: 20px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  color: #000;
}
.tabitem.current {
  background: #4fc08d;
  color: #fff;
}
</style>