<template>
  <div>
    <h2>{{title}}</h2>
    <div v-for="(item,i) in optiondata" :key="i" class="testbox">
      {{item.title}}
      <input v-model="item.title" />
      <div v-if="template==1">{{item.urls}}</div>
      <button @click="swap(i,i-1)" v-if="i!=0&&i<optiondata.length">向上</button>
      <button @click="swap(i,i+1)" v-if="i<optiondata.length-1">向下</button>
      <button @click="del(i)" v-if="optiondata.length>1">删除</button>
    </div>
    <button @click="addNew">添加</button>
  </div>
</template>
<script lang="ts">
import { computed } from "vue";

export default {
  props: {
    template: {
      type: Number
    },
    optiondata: {
      type: Array
    },
    title: {
      type: String
    }
  },
  setup(props) {},
  methods: {
    addNew() {
      this.optiondata.push({
        urls: "121",
        title: "123"
      });
    },
    swap(start, end) {
      let a = this.optiondata[start];
      this.optiondata[start] = this.optiondata[end];
      this.optiondata[end] = a;
    },
    del(target) {
      this.optiondata.splice(target, 1);
    }
  }
};
</script>
<style>
.testbox {
  width: 300px;
  height: 150px;
  border: 1px solid red;
}
</style>