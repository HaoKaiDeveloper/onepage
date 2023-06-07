import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import VueGtag from "vue-gtag";
import vuetify from "./plugins/vuetify";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);

let gaId = localStorage.getItem("storeInfo");

if (gaId) {
  gaId = JSON.parse(gaId).ga;
  app.use(VueGtag, {
    config: { id: gaId },
  });
}

app.use(router).use(store).use(i18n).use(vuetify).use(ElementPlus).mount("#app");
