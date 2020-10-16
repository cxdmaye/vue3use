<template>
  <div>
    <h1>优惠券页面</h1>
    <div>
      <h2>已添加的优惠券</h2>
      <div class="cutlist">
        <div v-for="item in cutarr" :key="item.id" @click="selectThis(item)">
          <div>类型：{{ item.type }}</div>
          <div>门槛：{{ item.threshold }}</div>
          <div>优惠：{{ item.price }}</div>
        </div>
      </div>
      <div class="currentcur">
        <div>
          类型:
          <select v-model="curentCut.type">
            <option value="classtime">按课时</option>
            <option value="lessonLen">满科减</option>
            <option value="price">按金额</option>
            <option value="free">无门槛</option>
          </select>
        </div>
        <div>门槛：<input type="number" v-model="curentCut.threshold" /></div>
        <div>优惠：<input type="number" v-model="curentCut.price" /></div>
        <button @click="addCut">添加门槛</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, reactive, ref } from "vue";
import { CutObject } from "./../../Services/Cut";

export default {
  setup(props) {
    /** 已添加的所有的优惠券数组 */
    let emptylist = [];
    let cutarr: CutObject[] = reactive(emptylist);
    /** 当前优惠券 */
    let curentCut: CutObject = reactive({
      type: "price",
    });

    const addCut = () => {
      curentCut.id = Math.random() * 100;
      cutarr.push({ ...curentCut });
    };

    const selectThis = (cur: CutObject) => {
      Object.assign(curentCut, cur);
    };

    return {
      cutarr,
      curentCut,
      addCut,
      selectThis,
    };
  },
};
</script>
