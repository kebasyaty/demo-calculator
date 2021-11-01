// Libraries
import Vuex from "vuex";

// Modules
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

// Utilities
import { createLocalVue } from "@vue/test-utils";

describe("Vuex.Store", () => {
  const localVue = createLocalVue();
  let store;

  beforeEach(() => {
    localVue.use(Vuex);
    store = new Vuex.Store({
      state,
      mutations,
      actions,
    });
  });

  // State
  // -----------------------------------------------------------------------------------------------
  it("state.message", () => {
    expect(store.state.message).toBe("");
  });

  it("state.showAlerts", () => {
    expect(store.state.showAlerts).toBe(false);
  });

  it("state.showExtraButtons", () => {
    expect(store.state.showExtraButtons).toBe(false);
  });

  // Mutations
  // -----------------------------------------------------------------------------------------------
  it("mutations.setMessage", () => {
    const msg = "New message!";
    store.commit("setMessage", msg);
    expect(store.state.message).toBe(msg);
  });

  it("mutations.setShowAlerts", () => {
    store.commit("setShowAlerts", true);
    expect(store.state.showAlerts).toBe(true);
  });

  it("mutations.setShowExtraButtons", () => {
    store.commit("setShowExtraButtons", true);
    expect(store.state.showExtraButtons).toBe(true);
  });

  // Actions
  // -----------------------------------------------------------------------------------------------
  it("actions.showMessage", () => {
    const msg = "New message!";
    store.dispatch("showMessage", msg);
    expect(store.state.message).toBe(msg);
    expect(store.state.showAlerts).toBe(true);
  });
});
