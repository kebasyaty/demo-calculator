import Vue from "vue";
import App from "@/App.vue";
import vuetify from "@/plugins/vuetify";
import store from "@/store";

// Global Config.
// https://vuejs.org/v2/api/index.html
if (process.env.NODE_ENV === "production") {
  Vue.config.productionTip = false;
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true;
}

// Add $deviceReady property to Vue instance
// Usage example:
/*
this.$onDeviceReady()
  .then(() => {
    window.cordova.plugins. ...
  })
  .catch((error) => {
    window.console.log(error);
  });
*/
Vue.prototype.$onDeviceReady = function () {
  return new Promise((resolve, reject) => {
    try {
      window.document.addEventListener(
        "deviceready",
        () => resolve(true),
        false
      );
    } catch (error) {
      reject(error);
    }
  });
};

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
