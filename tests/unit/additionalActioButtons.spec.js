// Libraries
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

// Modules
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions.js";

// Components
import additionalActioButtons from "@/components/AdditionalActioButtons.vue";

// Utilities
import { createLocalVue, shallowMount } from "@vue/test-utils";

describe("AdditionalActioButtons.vue", () => {
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
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    const btnContentColor = {};
    const configColorsTheme = () => undefined;
    // wrapper
    const wrapper = shallowMount(additionalActioButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnColor,
        btnAction,
        toColorClass,
        btnContentColor,
        configColorsTheme,
      },
    });
    //
    expect(wrapper.vm.$options.name).toBe("AdditionalActioButtons");
  });

  it("props...", () => {
    // props
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    const btnContentColor = {};
    const configColorsTheme = () => undefined;
    // wrapper
    const wrapper = shallowMount(additionalActioButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnColor,
        btnAction,
        toColorClass,
        btnContentColor,
        configColorsTheme,
      },
    });
    //
    expect(wrapper.props("btnColor")).toEqual(btnColor);
    expect(wrapper.props("btnAction")).toEqual(btnAction);
    expect(wrapper.props("toColorClass")).toEqual(toColorClass);
    expect(wrapper.props("btnContentColor")).toEqual(btnContentColor);
    expect(wrapper.props("configColorsTheme")).toEqual(configColorsTheme);
  });

  it("data...", () => {
    // props
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    const btnContentColor = {};
    const configColorsTheme = () => undefined;
    // data
    const extraButtons = [
      {
        action: "left-parenthesis",
        text: "(",
        type: "extra",
      },
      {
        action: "right-parenthesis",
        text: ")",
        type: "extra",
      },
    ];
    // wrapper
    const wrapper = shallowMount(additionalActioButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnColor,
        btnAction,
        toColorClass,
        btnContentColor,
        configColorsTheme,
      },
    });
    //
    expect(wrapper.vm.extraButtons).toEqual(extraButtons);
  });

  it("computed...", () => {
    // props
    const btnColor = {};
    const btnAction = () => undefined;
    const toColorClass = () => undefined;
    const btnContentColor = {};
    const configColorsTheme = () => undefined;
    // wrapper
    const wrapper = shallowMount(additionalActioButtons, {
      localVue,
      vuetify,
      store,
      propsData: {
        btnColor,
        btnAction,
        toColorClass,
        btnContentColor,
        configColorsTheme,
      },
    });
    //
    wrapper.vm.cmpShowExtraButtons = true;
    expect(wrapper.vm.cmpShowExtraButtons).toBe(true);
    expect(wrapper.vm.$store.state.showExtraButtons).toBe(true);
  });
});
