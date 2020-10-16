<template>
  <div>
    <div>
      <textarea
        name="origincode"
        v-model="data.origincode"
        cols="3"
        rows="4"
        class="codebox"
      ></textarea>
      <textarea
        name="diffcode"
        v-model="data.diffcode"
        cols="3"
        rows="4"
        class="codebox"
      ></textarea>
      <button @click="reload">重新生成</button>
    </div>
    <div>
      {{ data.diffres }}
      <div v-html="editorcode" class="editorbox"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import Stringdiff, { Diffs } from "/@/Services/Diff";
export default {
  data() {
    return {};
  },
  setup(props, ctx) {
    let data = reactive({
      origincode: "abc",
      diffcode: "acd",
      diffres: [],
    });

    let editorcode = ref("");

    function reload() {
      let diffresult = Stringdiff(data.origincode, data.diffcode);
      console.log(diffresult);
      data.diffres = diffresult;
      rerender(diffresult);
    }

    function rerender(a) {
      for (
        var b = [], c = /&/g, d = /</g, e = />/g, f = /\n/g, g = 0;
        g < a.length;
        g++
      ) {
        var h = a[g][0],
          l = a[g][1]
            .replace(c, "&amp;")
            .replace(d, "&lt;")
            .replace(e, "&gt;")
            .replace(f, "<br>");
        switch (h) {
          case 1:
            b[g] = '<ins style="background:#e6ffe6;">' + l + "</ins>";
            break;
          case -1:
            b[g] = '<del style="background:#ffe6e6;">' + l + "</del>";
            break;
          case 0:
            b[g] = "<span>" + l + "</span>";
        }
      }
      editorcode.value = b.join("");
    }

    onMounted(() => {
      reload();
    });

    return {
      data,
      reload,
      editorcode,
    };
  },
};
</script>

<style scoped>
.codebox {
  color: #4fc08d;
}
.editorbox {
  white-space: pre-wrap;
}
</style>