import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/googlemaps";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { apolloProvider } from "./vue-apollo";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount("#app");
