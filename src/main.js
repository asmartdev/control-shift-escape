import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { applyPolyfills, defineCustomElements } from "alli/loader";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/alli-\w*/];

applyPolyfills().then(() => {
  defineCustomElements();
});

library.add(faGithub);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
