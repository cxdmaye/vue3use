<template>
  <div>
    <input type="text" v-model="message" />
    <h1>{{ message }}</h1>
    <div style="display: flex; width: 800px; overflow-x: scroll">
      <div v-for="(item, i) in listdata.list" :key="i" class="imgbox">
        <img :src="item.images[0]" alt="" />
      </div>
    </div>
    <Son :message="message">
      <h1>哈哈哈哈</h1>
      <template v-slot:son1>123</template>
    </Son>
  </div>
</template>
<script lang="ts">
import Son from "./Son.vue";
import { ref, onMounted, reactive } from "vue";
import axios from "axios";
// import * as testesmodule from "testesmodule";
export default {
  components: {
    Son,
  },
  setup(props) {
    var message = ref("12");
    let list = [];
    var listdata = reactive({ list });

    onMounted(async () => {
      let { data } = await axios.get(
        "https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/10"
      );
      console.log(data);
      listdata.list = data.data;

      //   console.log(testesmodule.test());
      console.log(131312312);
    });

    return {
      message,
      listdata,
      onMounted,
    };
  },
};
</script>
<style >
.imgbox img {
  width: 150px;
  height: 200px;
}
</style>