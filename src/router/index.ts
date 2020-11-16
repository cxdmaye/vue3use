import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

import Parent from "@view/props/Parent.vue";
import Cut from "@view/cut/Cut.vue";
import App from "@/App.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "app", component: App },
  { path: "/parent", name: "parent", component: Parent },
  { path: "/cut", name: "cut", component: Cut },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
