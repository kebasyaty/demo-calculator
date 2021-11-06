// Libraries
import Vue from "vue";
import Vuex from "vuex";
import Vuetify from "vuetify";

// Modules
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions.js";

// Components
import App from "@/App.vue";

// Utilities
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";

describe("App.vue", () => {
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
    //
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
  });

  it("component name", () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    expect(wrapper.vm.$options.name).toBe("App");
  });

  it("component list", () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    const keyList = Object.keys(wrapper.vm.$options.components);
    expect(keyList.includes("CalculationScreen")).toBe(true);
    expect(keyList.includes("ActionButtons")).toBe(true);
    expect(keyList.includes("PopupAlerts")).toBe(true);
    expect(keyList.includes("AdditionalActioButtons")).toBe(true);
  });

  it("data...", () => {
    // data
    const screenBuffer = ["0"];
    const isEmptyScreen = true;
    const screenTextColor = [];
    const btnColor = {};
    const btnContentColor = {};
    // wrapper
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    expect(wrapper.vm.screenBuffer).toMatchObject(screenBuffer);
    expect(wrapper.vm.isEmptyScreen).toBe(isEmptyScreen);
    expect(wrapper.vm.screenTextColor).toMatchObject(screenTextColor);
    expect(wrapper.vm.btnColor).toMatchObject(btnColor);
    expect(wrapper.vm.btnContentColor).toMatchObject(btnContentColor);
  });

  it("methods...", () => {
    const wrapper = shallowMount(App, {
      localVue,
      vuetify,
      store,
    });
    // toColorClass()
    expect(wrapper.vm.toColorClass("red")).toBe("red--text");
    expect(wrapper.vm.toColorClass("red lighten-5")).toBe(
      "red--text text--lighten-5"
    );
    expect(wrapper.vm.toColorClass("blue-grey")).toBe("blue-grey--text");
    expect(wrapper.vm.toColorClass("blue-grey lighten-5")).toBe(
      "blue-grey--text text--lighten-5"
    );
    // fullScreenCleaning()
    wrapper.vm.screenBuffer = ["1+1"];
    wrapper.vm.isEmptyScreen = false;
    expect(wrapper.vm.screenBuffer).toMatchObject(["1+1"]);
    expect(wrapper.vm.isEmptyScreen).toBe(false);
    wrapper.vm.fullScreenCleaning();
    expect(wrapper.vm.screenBuffer).toMatchObject(["0"]);
    expect(wrapper.vm.isEmptyScreen).toBe(true);
    // configColorsTheme()
    wrapper.vm.configColorsTheme();
    expect(wrapper.vm.screenTextColor).toMatchObject([
      "grey--text text--lighten-1",
      "grey--text text--darken-4",
    ]);
    expect(wrapper.vm.btnColor).toMatchObject({
      number: "grey lighten-4",
      action: "orange lighten-3",
      extra: "blue-grey lighten-3",
    });
    expect(wrapper.vm.btnContentColor).toMatchObject({
      number: "grey darken-2",
      action: "orange darken-4",
      extra: "blue-grey darken-3",
    });
    wrapper.vm.$vuetify.theme.dark = true;
    wrapper.vm.configColorsTheme();
    expect(wrapper.vm.screenTextColor).toMatchObject([
      "grey--text text--darken-3",
      "grey--text text--lighten-5",
    ]);
    expect(wrapper.vm.btnColor).toMatchObject({
      number: "grey darken-4",
      action: "orange darken-3",
      extra: "blue-grey darken-3",
    });
    expect(wrapper.vm.btnContentColor).toMatchObject({
      number: "white",
      action: "white",
      extra: "white",
    });
    // btnAction() - This method is testing in the section `clicking buttons`
  });

  it("clicking buttons", () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    const btnDivision = wrapper.find(".btn-action-division");
    btnDivision.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["&divide;"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn7 = wrapper.find(".btn-action-7");
    btn7.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["7"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn8 = wrapper.find(".btn-action-8");
    btn8.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["8"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn9 = wrapper.find(".btn-action-9");
    btn9.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["9"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btnMultiplication = wrapper.find(".btn-action-multiplication");
    btnMultiplication.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["&times;"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn4 = wrapper.find(".btn-action-4");
    btn4.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["4"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn5 = wrapper.find(".btn-action-5");
    btn5.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["5"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn6 = wrapper.find(".btn-action-6");
    btn6.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["6"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btnMinus = wrapper.find(".btn-action-minus");
    btnMinus.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["&minus;"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn1 = wrapper.find(".btn-action-1");
    btn1.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["1"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn2 = wrapper.find(".btn-action-2");
    btn2.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["2"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn3 = wrapper.find(".btn-action-3");
    btn3.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["3"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btnPlus = wrapper.find(".btn-action-plus");
    btnPlus.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["&plus;"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btn0 = wrapper.find(".btn-action-0");
    btn0.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["0"]);
    //
    wrapper.vm.fullScreenCleaning();
    const btnСomma = wrapper.find(".btn-action-comma");
    btnСomma.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject([","]);
  });

  it("clicking buttons `(` and `)`", (done) => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    const showBtnExtra = wrapper.find(".btn-action-show-btn-extra");
    //
    showBtnExtra.trigger("click");
    wrapper.vm.$nextTick(() => {
      wrapper.vm.fullScreenCleaning();
      const btnLeftParenthesis = wrapper.find(".btn-action-left-parenthesis");
      btnLeftParenthesis.trigger("click");
      expect(wrapper.vm.screenBuffer).toMatchObject(["("]);
      done();
    });
    //
    showBtnExtra.trigger("click");
    wrapper.vm.$nextTick(() => {
      wrapper.vm.fullScreenCleaning();
      const btnRightParenthesis = wrapper.find(".btn-action-right-parenthesis");
      btnRightParenthesis.trigger("click");
      expect(wrapper.vm.screenBuffer).toMatchObject([")"]);
      done();
    });
  });

  it("clicking button`equal` - on screen > default", () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    wrapper.vm.fullScreenCleaning();
    const btnEqual = wrapper.find(".btn-action-equal");
    btnEqual.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["0"]);
  });

  it("clicking button`equal` - on screen > 1+1", () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    wrapper.vm.fullScreenCleaning();
    //
    const btn1 = wrapper.find(".btn-action-1");
    btn1.trigger("click");
    //
    const btnPlus = wrapper.find(".btn-action-plus");
    btnPlus.trigger("click");
    //
    btn1.trigger("click");
    //
    const btnEqual = wrapper.find(".btn-action-equal");
    btnEqual.trigger("click");
    expect(wrapper.vm.screenBuffer).toMatchObject(["2"]);
  });

  it("method - getResultCalculation()", () => {
    const wrapper = mount(App, {
      localVue,
      vuetify,
      store,
    });
    //
    // Default state
    // ---------------------------------------------------------------------------------------------
    let screenBuffer = ["0"];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject(["0"]);

    // 1 + 1
    // ---------------------------------------------------------------------------------------------
    screenBuffer = ["1", "&plus;", "1"];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject(["2"]);

    // ERRORS
    // ---------------------------------------------------------------------------------------------
    // Division by zero
    screenBuffer = ["2", "&divide;", "0"];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject(
      screenBuffer
    );
    expect(store.state.message).toBe("Cannot divide by zero.");
    expect(store.state.showAlerts).toBe(true);
    const btnCloseAlerts = wrapper.find(".btn-close-alerts");
    btnCloseAlerts.trigger("click");
    expect(store.state.showAlerts).toBe(false);
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject(
      screenBuffer
    );

    // CELSIUS TO FAHRENHEIT.
    // ---------------------------------------------------------------------------------------------
    // 0C = 32F
    screenBuffer = [
      "(",
      "0",
      "&times;",
      "9",
      "&divide;",
      "5",
      ")",
      "&plus;",
      "32",
    ];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject([
      "3",
      "2",
    ]);
    // 32C = 89,6F
    screenBuffer = [
      "(",
      "3",
      "2",
      "&times;",
      "9",
      "&divide;",
      "5",
      ")",
      "&plus;",
      "32",
    ];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject([
      "8",
      "9",
      ",",
      "6",
    ]);
    //
    // FAHRENHEIT TO CELSIUS
    // 32F = 0C
    screenBuffer = [
      "(",
      "32",
      "&minus;",
      "32",
      ")",
      "&times;",
      "9",
      "&divide;",
      "5",
    ];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject(["0"]);
    // 0F = -17,78C
    screenBuffer = [
      "(",
      "0",
      "&minus;",
      "32",
      ")",
      "&times;",
      "5",
      "&divide;",
      "9",
    ];
    expect(wrapper.vm.getResultCalculation(screenBuffer)).toMatchObject([
      "&minus;",
      "1",
      "7",
      ",",
      "7",
      "8",
    ]);
  });
});
