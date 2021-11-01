// Libraries
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

// Modules
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions.js";

// Components
import popupAlerts from "@/components/PopupAlerts.vue";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("PopupAlerts.vue", () => {
  const localVue = createLocalVue();
  let vuetify;
  let store;

  beforeEach(() => {
    Vue.use(Vuetify);
    document.body.setAttribute("data-app", true);
    vuetify = new Vuetify();
    //
    localVue.use(Vuex);
    store = new Vuex.Store({
      state,
      mutations,
      actions,
    });
  });

  it("component name", () => {
    const wrapper = shallowMount(popupAlerts, {
      localVue,
      vuetify,
      store,
    });
    expect(wrapper.vm.$options.name).toBe("PopupAlerts");
  });

  it("computed...", () => {
    const wrapper = shallowMount(popupAlerts, {
      localVue,
      vuetify,
      store,
    });
    //
    wrapper.vm.cmpShowAlerts = true;
    expect(wrapper.vm.cmpShowAlerts).toBe(true);
    expect(wrapper.vm.$store.state.showAlerts).toBe(true);
  });
});
