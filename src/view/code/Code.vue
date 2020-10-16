<template>
  <div>
    <div class="flex">
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
      <div class="diffbox">
        <div v-for="(code, index) in data.diffres" :key="index">{{ code }}</div>
      </div>
    </div>
    <div class="btnbox">
      <button @click="reload">重新生成</button>
      <div>
        渲染模式<span>{{ mode }}</span>
        <span>
          CSS:<input
            type="radio"
            name="123"
            value="css"
            :checked="mode == 'css'"
            @click="SwitchMode('css')"
          />
        </span>

        <span>
          javascript:<input
            type="radio"
            name="123"
            value="js"
            @click="SwitchMode('js')"
            :checked="mode == 'js'"
          />
        </span>
      </div>
      <div>
        对比模式<span>{{
          comparemode == "inline" ? "行内对比" : "左右对比"
        }}</span>
        <span>
          行内对比:<input
            type="radio"
            name="comparemode"
            value="inline"
            :checked="comparemode == 'inline'"
            @click="SwitchCompMode('inline')"
          />
        </span>

        <span>
          左右对比:<input
            type="radio"
            name="comparemode"
            value="sidebyside"
            @click="SwitchCompMode('sidebyside')"
            :checked="comparemode == 'sidebyside'"
          />
        </span>
      </div>
    </div>
    <div>
      <template v-if="comparemode == 'inline'">
        <div v-html="editorcode" class="editorbox"></div>
      </template>

      <template v-else>
        <div class="flex">
          <div v-html="code.left" class="editorbox"></div>
          <div v-html="code.right" class="editorbox"></div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
const ColorREG = /[rR][gG][Bb][Aa]?[\(]((2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?(0\.\d{1,2}|1|0)?[\)]{1}|#[0-9a-fA-F]{3,6}/;

import { computed, onMounted, reactive, ref } from "vue";
import Stringdiff, { Diffs } from "/@/Services/Diff";
export default {
  data() {
    return {};
  },
  setup(props, ctx) {
    let data = reactive({
      origincode: `<style scoped>
.codebox {
  width: 300px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 4px;
  margin-left: 20px;
}
.editorbox {
  white-space: pre-wrap;
}
</style>`,
      diffcode: `<style scoped>
.codebox {
  width: 300px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 4px;
  margin-left: 20px;
}
.editorbox {
  white-space: pre-wrap;
}
</style>`,
      diffres: [],
    });

    let editorcode = ref("");
    let mode = ref("css");
    let comparemode = ref("inline");

    let code = reactive({
      left: "",
      right: "",
    });

    function reload() {
      let diffresult = Stringdiff(data.origincode, data.diffcode);
      console.log(diffresult);
      data.diffres = diffresult;
      rerender();
    }

    function rerender() {
      if (comparemode.value == "inline") {
        editorcode.value = getInlineCode(data.diffres);
      } else {
        let [a1, a2] = getSideBySideCOde(data.diffres);
        code.left = a1;
        code.right = a2;
      }
    }

    function getSideBySideCOde(a: any) {
      for (
        var left = [],
          right = [],
          c = /&/g,
          d = /</g,
          e = />/g,
          f = /\n/g,
          g = 0;
        g < a.length;
        g++
      ) {
        var h = a[g][0],
          l = a[g][1]
            .replace(c, "&amp;")
            .replace(d, "&lt;")
            .replace(e, "&gt;")
            .replace(f, "<br>");
        l = rendermode(l);
        switch (h) {
          case 1:
            right[g] = '<ins class="insert">' + l + "</ins>";
            break;
          case -1:
            left[g] = '<del class="insert">' + l + "</del>";
            break;
          case 0:
            left[g] = "<span>" + l + "</span>";
            right[g] = "<span>" + l + "</span>";
        }
      }
      return [left.join(""), right.join("")];
    }

    function getInlineCode(a: any) {
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
        l = rendermode(l);
        switch (h) {
          case 1:
            b[g] = '<ins class="insert">' + l + "</ins>";
            break;
          case -1:
            b[g] = '<del class="insert">' + l + "</del>";
            break;
          case 0:
            b[g] = "<span>" + l + "</span>";
        }
      }
      return b.join("");
    }

    function rendermode(str: string) {
      if (mode.value == "css") {
        // let index = str.indexOf("#000");
        let res = str.match(ColorREG);
        if (res) {
          let color = res[0];
          let index = res.index;
          str =
            str.substr(0, index) +
            `<span class='colorbox' style='background:${color}'></span>` +
            str.substr(index);
        }

        return str;
      } else {
        return str;
      }
    }

    function SwitchMode(str: string) {
      mode.value = str;
    }

    function SwitchCompMode(str: string) {
      comparemode.value = str;
      console.log("对比模式", str);
      rerender();
    }

    onMounted(() => {
      reload();
    });

    return {
      data,
      comparemode,
      mode,
      reload,
      SwitchCompMode,
      SwitchMode,
      editorcode,
      code,
    };
  },
};
</script>

<style scoped>
.codebox,
.diffbox {
  width: 300px;
  height: 200px;
  border: 1px solid #000;
  border-radius: 4px;
  margin-left: 20px;
}
.editorbox {
  white-space: pre-wrap;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 20px;
  background: rgba(30, 30, 30, 1);
  color: rgb(156, 220, 254);
}
.btnbox {
  padding: 10px;
}
</style>

<style >
.insert {
  background: #e6ffe6;
}
.del {
  background: #ffe6e6;
}
.colorbox {
  display: inline-block;
  width: 10px;
  height: 10px;
}
</style>