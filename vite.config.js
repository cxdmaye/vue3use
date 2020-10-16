const path = require("path");

console.log(123);

module.exports = {
  base: "/",
  optimizeDeps: {
    auto: false, // FIXME: 默认值 undefined 会引发 package.json 未找到错误
  },
  port: 3008,
  alias: {
    "/@/": path.resolve(process.cwd(), "src/"),
    "/@view/": path.resolve(process.cwd(), "src/view/"),
  },
  optimizeDeps: {},
  proxy: {},
};
