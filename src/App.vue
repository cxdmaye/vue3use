
<template>
  <div>
    <div class="routebox">
      <div
        :class="{pageroute:true,current:currentPage==page}"
        v-for="(page,i) in pageList"
        :key="i"
        @click="ChangePage(page)"
      >{{page}}</div>
    </div>
    <div v-if="currentPage=='miniPage'">
      <div v-for="(item,index) in pageinfo" :key="index">
        <div>title:{{item.title}}</div>
        <div>
          <OptTemplate
            :value="item.template"
            :templates="item.templatetype"
            @input="(a)=>{item.template=a}"
          ></OptTemplate>
        </div>
        <div>
          <OptInfo
            :templates="item.templatetype"
            :template="item.template"
            :title="item.settingtitle"
            :info="item.options"
          ></OptInfo>
        </div>
        <div class="hovertest">
          <div class="innertext">
            <span>测试文字测试文字测文字测文字测</span>
          </div>
          <div class="hovertext">遮罩</div>
        </div>
        <input type="text" v-model="test" @change="log('change')" @input="log('input')" />
      </div>
    </div>
    <div v-if="currentPage=='normal'">
      <div style="display:flex;">
        <div class="box" style="background:red;"></div>
        <div class="box" style="background:red;"></div>
        <div class="box" style="background:red;"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, computed, ref } from "vue";
import AgeComputer from "./components/AgeComputer.vue";
import LessAgeComputer from "./components/LessAgeComputer.vue";
import OptTemplate from "./components/OptTemplate.vue";
import OptInfo from "./components/OptInfo.vue";
// component 的 v-model有问题

/** 模块属性 */
interface PageInfo {
  /** 模块名称 */
  title: string;
  /** 支持的模板格式 */
  templatetype: number[];
  template: number;
  /** 设置的标题 */
  settingtitle: string;
  options: PageOptions[];
}

/** 模块配置属性 */
interface PageOptions {
  /** 字段类型 */
  type: "videos" | "imgs";
  /** 字段表头 */
  title: string;
  /** 字段数据 */
  data: OptionData[];
}

/** 模块配置数据 */
interface OptionData {
  urls: string;
  title: string;
  optiontype: number;
}

var dataList = [];

export default {
  components: {
    OptTemplate,
    OptInfo
    // AgeComputer,
    // LessAgeComputer
  },
  // data: () => ({ count: 0 }),
  setup() {
    var pageinfo: PageInfo[] = [
      {
        title: "学员作品",
        templatetype: [1, 2],
        template: 1,
        settingtitle: "学员作品设置",
        options: [
          {
            type: "imgs",
            title: "内容设置",
            data: [
              {
                urls: "dsdsds",
                title: "2323",
                optiontype: 1
              }
            ]
          },
          {
            type: "videos",
            title: "视频设置",
            data: []
          }
        ]
      }
    ];
    let pageList = ["miniPage", "normal"];
    return {
      pageinfo,
      test: "",
      pageList,
      currentPage: pageList[0]
    };
  },
  methods: {
    log(msg) {
      console.log(msg, this.test);
    },
    ChangePage(page) {
      this.currentPage = page;
    }
  }
};
</script>

<style scoped>
h1 {
  color: #4fc08d;
}

h1,
p {
  font-family: Arial, Helvetica, sans-serif;
}
.p1 {
  color: red;
  font-size: 30px;
  transition: all 0.5s;
}
.p1:hover {
  color: #4fc08d;
}

.hovertest {
  width: 200px;
  overflow: hidden;
  display: flex;
  position: relative;
}
.hovertest .innertext {
  width: calc(100% + 36px);
  position: relative;
  transition: all 0.3s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hovertest .innertext span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}

.hovertest .hovertext {
  transition: all 0s ease;
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 36px;
  opacity: 0;
  position: absolute;
  right: 0;
}

.hovertest:hover {
  background: rgba(237, 239, 243, 0.5);
}
.hovertest:hover .innertext {
  width: 100%;
}
.hovertest:hover .hovertext {
  -webkit-transform: scale(1);
  transform: scale(1);
  opacity: 1;
}
.routebox {
  display: flex;
  border-bottom: 1px solid #4fc08d;
}
.pageroute {
  width: 150px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  transition: all 0.5;
  border-bottom: 0px solid #4fc08d;
}
.pageroute.current {
  border-bottom: 2px solid #4fc08d;
}
.box {
  width: 100px;
  height: 100px;
}
</style>
