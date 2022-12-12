import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import detectMobile from "./utils/detectMobile";
import scriptInjector from "./utils/scriptInjector";

const vuePropertySetter = (app, name, instance) => {
  app.provide(name, instance);
  app.config.globalProperties[name] = instance;
};
const injector = {
  install(app) {
    vuePropertySetter(app, "injectScript", scriptInjector);
    vuePropertySetter(app, "detectMobile", detectMobile);
  },
};
const app = createApp(App);
app.use(injector);
app.use(store);
app.use(router);
app.mount("#app");
