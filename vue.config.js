const pjson = require("./package.json");
const PACKAGE_VERSION = "'" + pjson.version + "'";
const Timestamp = new Date().getTime();
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/Store",
  outputDir: "Store",
  devServer: {
    proxy: {
      "/cart-server": {
        target: "https://s.intella.co/",
        changeOrigin: true,
      },
    },
  },
  pages: {
    index: {
      // entry for the page
      entry: "src/main.js",
    },
  },
  configureWebpack: {
    output: {
      filename: `[name].${PACKAGE_VERSION}.${Timestamp}.js`,
      chunkFilename: `[name].${PACKAGE_VERSION}.${Timestamp}.js`,
    },
  },
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true,
    },
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
});
