
<template>
  <div>
    <Tab :tablist="tablist" @change="SwitchTab" />
    <div>
      <component :is="currenttab" />
    </div>
  </div>
</template>

<script lang="ts">
// component 的 v-model有问题

import { onMounted, ref, Ref } from "vue";
import SvgDrawer from "/@/components/SvgDrawer.vue";
import Parent from "/@view/props/Parent.vue";
import Cut from "/@view/cut/Cut.vue";
import Code from "/@view/code/Code.vue";
import Click from "/@view/click/Click.vue";
import Tab from "/@/components/Tab.vue";
export default {
  components: {
    SvgDrawer,
    Cut,
    Code,
    Click,
    Tab,
    Parent,
  },
  data: () => {
    return {
      msg: "Helloworld",
    };
  },
  mounted() {
    console.log(this.$refs);
  },
  setup(props) {
    const tablist = ["code", "cut", "svgDrawer", "parent", "click"];
    let currenttab = ref(tablist[0]);

    const SwitchTab = (tab: string) => {
      currenttab.value = tab;
    };
    return {
      onMounted: onMounted(() => {
        console.log(123);
      }),
      SwitchTab,
      tablist,
      currenttab,
    };
  },
};
</script>

<style>
h1 {
  color: #4fc08d;
}
.flex {
  display: flex;
}
</style>
