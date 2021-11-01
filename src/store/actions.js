export default {
  showMessage({ commit }, msg) {
    commit("setMessage", msg);
    commit("setShowAlerts", true);
  },
};
