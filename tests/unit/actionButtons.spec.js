// Libraries
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

// Modules
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions.js";

// Components
import actionButtons from "@/components/ActionButtons.vue";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("ActionButtons.vue", () => {
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
    // props
    const btnContentColor = {};
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    // wrapper
    const wrapper = shallowMount(actionButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnContentColor,
        btnColor,
        btnAction,
        toColorClass,
      },
    });
    //
    expect(wrapper.vm.$options.name).toBe("ActionButtons");
  });

  it("props...", () => {
    // props
    const btnContentColor = {};
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    // wrapper
    const wrapper = shallowMount(actionButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnContentColor,
        btnColor,
        btnAction,
        toColorClass,
      },
    });
    //
    expect(wrapper.props("btnContentColor")).toEqual(btnContentColor);
    expect(wrapper.props("btnColor")).toEqual(btnColor);
    expect(wrapper.props("btnAction")).toEqual(btnAction);
    expect(wrapper.props("toColorClass")).toEqual(toColorClass);
  });

  it("data...", () => {
    // props
    const btnContentColor = {};
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    // data
    const widthColBtn0 = 64;
    const buttons = [
      {
        action: "all-clear",
        text: "AC",
        type: "extra",
      },
      {
        action: "backspace",
        icon: "backspace-outline",
        type: "extra",
      },
      {
        action: "show-btn-extra",
        icon: "dots-grid",
        type: "extra",
      },
      {
        action: "division",
        icon: "division",
        type: "action",
      },
      { action: "7", text: "7", type: "number" },
      { action: "8", text: "8", type: "number" },
      { action: "9", text: "9", type: "number" },
      {
        action: "multiplication",
        icon: "close",
        type: "action",
      },
      { action: "4", text: "4", type: "number" },
      { action: "5", text: "5", type: "number" },
      { action: "6", text: "6", type: "number" },
      {
        action: "minus",
        icon: "minus",
        type: "action",
      },
      { action: "1", text: "1", type: "number" },
      { action: "2", text: "2", type: "number" },
      { action: "3", text: "3", type: "number" },
      {
        action: "plus",
        icon: "plus",
        type: "action",
      },
      { action: "0", text: "0", type: "number" },
      { action: "comma", text: ",", type: "number" },
      {
        action: "equal",
        icon: "equal",
        type: "action",
      },
    ];
    // wrapper
    const wrapper = shallowMount(actionButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnContentColor,
        btnColor,
        btnAction,
        toColorClass,
      },
    });
    //
    expect(wrapper.vm.widthColBtn0).toBe(widthColBtn0);
    expect(wrapper.vm.buttons).toMatchObject(buttons);
  });

  it("methods...", () => {
    // props
    const btnContentColor = {};
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    // wrapper
    const wrapper = shallowMount(actionButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnContentColor,
        btnColor,
        btnAction,
        toColorClass,
      },
    });
    //
    expect(wrapper.vm.widthColBtn0).toBe(64);
    expect(wrapper.vm.getWidthBtn0()).toBe(undefined);
  });
});
