import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "./globalstyle.css";
import VueKonva from "vue-konva";

Vue.use(VueKonva);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount("#app");
