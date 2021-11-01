// Libraries
import Vue from "vue";
import Vuetify from "vuetify";

// Components
import calculationScreen from "@/components/CalculationScreen.vue";

// Utilities
import { shallowMount } from "@vue/test-utils";

describe("CalculationScreen.vue", () => {
  let vuetify;

  beforeEach(() => {
    Vue.use(Vuetify);
    document.body.setAttribute("data-app", true);
    vuetify = new Vuetify();
  });

  it("component name", () => {
    // wrapper
    const wrapper = shallowMount(calculationScreen, {
      vuetify,
      propsData: { screenBuffer: [], isEmptyScreen: true, screenTextColor: [] },
    });
    expect(wrapper.vm.$options.name).toBe("CalculationScreen");
  });

  it("props...", () => {
    // props
    const screenBuffer = [
      "(",
      "1000000",
      ",",
      "2",
      "&divide;",
      "1",
      "&times;",
      "1",
      "&minus;",
      "1",
      ")",
      "&plus;",
      "1",
      ",",
      "2",
    ];
    const isEmptyScreen = true;
    const screenTextColor = [
      "grey--text text--lighten-1",
      "grey--text text--darken-4",
    ];
    // wrapper
    const wrapper = shallowMount(calculationScreen, {
      vuetify,
      propsData: { screenBuffer, isEmptyScreen, screenTextColor },
    });
    //
    expect(wrapper.props("screenBuffer")).toEqual(screenBuffer);
    expect(wrapper.props("isEmptyScreen")).toEqual(isEmptyScreen);
    expect(wrapper.props("screenTextColor")).toEqual(screenTextColor);
    //
    const displayResult = wrapper.find("td.calc-screen--display-result");
    expect(displayResult.text()).toBe("(1.000.000,2÷1×1−1)+1,2");
  });

  it("methods...", () => {
    // wrapper
    const wrapper = shallowMount(calculationScreen, {
      vuetify,
      propsData: { screenBuffer: [], isEmptyScreen: true, screenTextColor: [] },
    });
    // humanizeNumber()
    expect(wrapper.vm.humanizeNumber("0")).toBe("0");
    expect(wrapper.vm.humanizeNumber("0,01")).toBe("0,01");
    expect(wrapper.vm.humanizeNumber("0,001")).toBe("0,001");
    expect(wrapper.vm.humanizeNumber("0,000.1")).toBe("0,000.1");
    expect(wrapper.vm.humanizeNumber("0,000.01")).toBe("0,000.01");
    expect(wrapper.vm.humanizeNumber("0,000.001")).toBe("0,000.001");
    expect(wrapper.vm.humanizeNumber("0,000.000.1")).toBe("0,000.000.1");
    expect(wrapper.vm.humanizeNumber("1")).toBe("1");
    expect(wrapper.vm.humanizeNumber("1,1")).toBe("1,1");
    expect(wrapper.vm.humanizeNumber("1,01")).toBe("1,01");
    expect(wrapper.vm.humanizeNumber("1,001")).toBe("1,001");
    expect(wrapper.vm.humanizeNumber("1,000.1")).toBe("1,000.1");
    expect(wrapper.vm.humanizeNumber("1,000.01")).toBe("1,000.01");
    expect(wrapper.vm.humanizeNumber("1,000.001")).toBe("1,000.001");
    expect(wrapper.vm.humanizeNumber("1,000.000.1")).toBe("1,000.000.1");
    expect(wrapper.vm.humanizeNumber("10")).toBe("10");
    expect(wrapper.vm.humanizeNumber("10,1")).toBe("10,1");
    expect(wrapper.vm.humanizeNumber("10,01")).toBe("10,01");
    expect(wrapper.vm.humanizeNumber("10,001")).toBe("10,001");
    expect(wrapper.vm.humanizeNumber("10,000.1")).toBe("10,000.1");
    expect(wrapper.vm.humanizeNumber("10,000.01")).toBe("10,000.01");
    expect(wrapper.vm.humanizeNumber("10,000.001")).toBe("10,000.001");
    expect(wrapper.vm.humanizeNumber("10,000.000.1")).toBe("10,000.000.1");
    expect(wrapper.vm.humanizeNumber("100")).toBe("100");
    expect(wrapper.vm.humanizeNumber("100,1")).toBe("100,1");
    expect(wrapper.vm.humanizeNumber("100,01")).toBe("100,01");
    expect(wrapper.vm.humanizeNumber("100,001")).toBe("100,001");
    expect(wrapper.vm.humanizeNumber("100,000.1")).toBe("100,000.1");
    expect(wrapper.vm.humanizeNumber("100,000.01")).toBe("100,000.01");
    expect(wrapper.vm.humanizeNumber("100,000.001")).toBe("100,000.001");
    expect(wrapper.vm.humanizeNumber("100,000.000.1")).toBe("100,000.000.1");
    expect(wrapper.vm.humanizeNumber("1.000")).toBe("1.000");
    expect(wrapper.vm.humanizeNumber("1.000,1")).toBe("1.000,1");
    expect(wrapper.vm.humanizeNumber("1.000,01")).toBe("1.000,01");
    expect(wrapper.vm.humanizeNumber("1.000,001")).toBe("1.000,001");
    expect(wrapper.vm.humanizeNumber("1.000,000.1")).toBe("1.000,000.1");
    expect(wrapper.vm.humanizeNumber("1.000,000.01")).toBe("1.000,000.01");
    expect(wrapper.vm.humanizeNumber("1.000,000.001")).toBe("1.000,000.001");
    expect(wrapper.vm.humanizeNumber("1.000,000.000.1")).toBe(
      "1.000,000.000.1"
    );
    expect(wrapper.vm.humanizeNumber("10.000")).toBe("10.000");
    expect(wrapper.vm.humanizeNumber("10.000,1")).toBe("10.000,1");
    expect(wrapper.vm.humanizeNumber("10.000,01")).toBe("10.000,01");
    expect(wrapper.vm.humanizeNumber("10.000,001")).toBe("10.000,001");
    expect(wrapper.vm.humanizeNumber("10.000,000.1")).toBe("10.000,000.1");
    expect(wrapper.vm.humanizeNumber("10.000,000.01")).toBe("10.000,000.01");
    expect(wrapper.vm.humanizeNumber("10.000,000.001")).toBe("10.000,000.001");
    expect(wrapper.vm.humanizeNumber("10.000,000.000.1")).toBe(
      "10.000,000.000.1"
    );
    expect(wrapper.vm.humanizeNumber("100.000")).toBe("100.000");
    expect(wrapper.vm.humanizeNumber("100.000,1")).toBe("100.000,1");
    expect(wrapper.vm.humanizeNumber("100.000,01")).toBe("100.000,01");
    expect(wrapper.vm.humanizeNumber("100.000,001")).toBe("100.000,001");
    expect(wrapper.vm.humanizeNumber("100.000,000.1")).toBe("100.000,000.1");
    expect(wrapper.vm.humanizeNumber("100.000,000.01")).toBe("100.000,000.01");
    expect(wrapper.vm.humanizeNumber("100.000,000.001")).toBe(
      "100.000,000.001"
    );
    expect(wrapper.vm.humanizeNumber("100.000,000.000.1")).toBe(
      "100.000,000.000.1"
    );
    expect(wrapper.vm.humanizeNumber("1.000.000")).toBe("1.000.000");
    expect(wrapper.vm.humanizeNumber("1.000.000,1")).toBe("1.000.000,1");
    expect(wrapper.vm.humanizeNumber("1.000.000,01")).toBe("1.000.000,01");
    expect(wrapper.vm.humanizeNumber("1.000.000,001")).toBe("1.000.000,001");
    expect(wrapper.vm.humanizeNumber("1.000.000,000.1")).toBe(
      "1.000.000,000.1"
    );
    expect(wrapper.vm.humanizeNumber("1.000.000,000.01")).toBe(
      "1.000.000,000.01"
    );
    expect(wrapper.vm.humanizeNumber("1.000.000,000.001")).toBe(
      "1.000.000,000.001"
    );
    expect(wrapper.vm.humanizeNumber("1.000.000,000.000.1")).toBe(
      "1.000.000,000.000.1"
    );
  });
});
