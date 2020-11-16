const path = require("path");

console.log(123);

const pathAliasMap = {
  "@/": "/src/",
  "@view": "/src/view",
};

module.exports = {
  base: "/",
  optimizeDeps: {
    auto: false, // FIXME: 默认值 undefined 会引发 package.json 未找到错误
  },
  port: 3008,
  proxy: {},
  resolvers: [
    {
      alias(path: string) {
        for (const [slug, res] of Object.entries(pathAliasMap)) {
          if (path.startsWith(slug)) {
            return path.replace(slug, res);
          }
        }
      },
    },
  ],
};
