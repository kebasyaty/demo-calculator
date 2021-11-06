<template>
  <v-app>
    <v-main>
      <v-container class="pa-6">
        <!-- CALCULATION SCREEN -->
        <CalculationScreen
          :screenBuffer="screenBuffer"
          :isEmptyScreen="isEmptyScreen"
          :screenTextColor="screenTextColor"
        />
        <!-- BUTTONS -->
        <ActionButtons
          :btnContentColor="btnContentColor"
          :btnColor="btnColor"
          :btnAction="btnAction"
          :toColorClass="toColorClass"
        />
      </v-container>
    </v-main>

    <!-- ALERTS -->
    <PopupAlerts />

    <!-- MORE ACTION BUTTONS -->
    <AdditionalActioButtons
      :btnColor="btnColor"
      :btnAction="btnAction"
      :toColorClass="toColorClass"
      :btnContentColor="btnContentColor"
      :configColorsTheme="configColorsTheme"
    />
  </v-app>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import CalculationScreen from "@/components/CalculationScreen.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import PopupAlerts from "@/components/PopupAlerts.vue";
import AdditionalActioButtons from "@/components/AdditionalActioButtons.vue";

export default {
  name: "App",

  components: {
    CalculationScreen,
    ActionButtons,
    PopupAlerts,
    AdditionalActioButtons,
  },

  data: () => ({
    screenBuffer: ["0"],
    isEmptyScreen: true,
    screenTextColor: [],
    btnColor: {},
    btnContentColor: {},
  }),

  methods: {
    ...mapMutations(["setShowExtraButtons"]),
    ...mapActions(["showMessage"]),
    // from "orange lighten-4" to "orange--tex,t text--lighten-4"
    toColorClass(colorName) {
      if (colorName === undefined) return "";
      let names = colorName.split(" ");
      for (let idx = 0; idx < names.length; idx++) {
        if (idx) {
          names[1] = "text--" + names[1];
        } else {
          names[0] += "--text";
        }
      }
      return names.join(" ");
    },
    // Set the calculator screen to the default state.
    fullScreenCleaning() {
      this.screenBuffer = ["0"];
      this.isEmptyScreen = true;
    },
    // Define actions for calculator buttons.
    btnAction(action) {
      if (action === "show-btn-extra") {
        this.setShowExtraButtons(true);
        return;
      }
      if (this.isEmptyScreen) {
        this.screenBuffer = [];
        this.isEmptyScreen = false;
      }

      switch (action) {
        case "all-clear":
          this.fullScreenCleaning();
          break;
        case "backspace":
          this.screenBuffer.pop();
          if (this.screenBuffer.length === 0) {
            this.fullScreenCleaning();
          }
          break;
        case "division":
          this.screenBuffer.push("&divide;");
          break;
        case "7":
          this.screenBuffer.push("7");
          break;
        case "8":
          this.screenBuffer.push("8");
          break;
        case "9":
          this.screenBuffer.push("9");
          break;
        case "multiplication":
          this.screenBuffer.push("&times;");
          break;
        case "4":
          this.screenBuffer.push("4");
          break;
        case "5":
          this.screenBuffer.push("5");
          break;
        case "6":
          this.screenBuffer.push("6");
          break;
        case "minus":
          this.screenBuffer.push("&minus;");
          break;
        case "1":
          this.screenBuffer.push("1");
          break;
        case "2":
          this.screenBuffer.push("2");
          break;
        case "3":
          this.screenBuffer.push("3");
          break;
        case "plus":
          this.screenBuffer.push("&plus;");
          break;
        case "0":
          this.screenBuffer.push("0");
          break;
        case "comma":
          this.screenBuffer.push(",");
          break;
        case "left-parenthesis":
          this.screenBuffer.push("(");
          this.setShowExtraButtons(false);
          break;
        case "right-parenthesis":
          this.screenBuffer.push(")");
          this.setShowExtraButtons(false);
          break;
        case "equal":
          if (this.screenBuffer.length === 0) {
            this.fullScreenCleaning();
            return;
          }
          this.screenBuffer = this.getResultCalculation(this.screenBuffer);
          break;
      }
    },
    // Get the calculation result.
    getResultCalculation(screenBuffer) {
      let currResult = "";
      // Interpretation of symbols.
      let valTmp = JSON.parse(JSON.stringify(screenBuffer))
        .join("")
        .replace(/(&divide;|&times;|&minus;|&plus;|,)/gi, (match) => {
          switch (match) {
            case "&divide;":
              return "/";
            case "&times;":
              return "*";
            case "&minus;":
              return "-";
            case "&plus;":
              return "+";
            case ",":
              return ".";
          }
        });
      // Error - Nearby standing signs of arithmetic operations.
      if (/[/*\-+.]{2,}/g.test(valTmp)) {
        this.showMessage("Invalid arithmetic expression.");
        return screenBuffer;
      }
      // Error - Division by zero.
      if (valTmp.includes("/0")) {
        this.showMessage("Cannot divide by zero.");
        return screenBuffer;
      }
      // Calculation with rounding.
      try {
        currResult = Math.round(eval(valTmp) * 100) / 100;
      } catch (err) {
        this.showMessage("Invalid arithmetic expression.");
        return screenBuffer;
      }
      // Error - If the result is infinity.
      if (!isFinite(currResult)) {
        this.showMessage("The result is infinity.");
        return screenBuffer;
      }
      // Return result.
      return currResult
        .toString()
        .replace(".", ",")
        .split("")
        .map((item) => (item === "-" ? "&minus;" : item));
    },
    // Define button and text colors for a theme.
    configColorsTheme() {
      if (this.$vuetify.theme.dark) {
        this.screenTextColor = [
          "grey--text text--darken-3",
          "grey--text text--lighten-5",
        ];
        this.btnColor = {
          number: "grey darken-4",
          action: "orange darken-3",
          extra: "blue-grey darken-3",
        };
        this.btnContentColor = {
          number: "white",
          action: "white",
          extra: "white",
        };
      } else {
        this.screenTextColor = [
          "grey--text text--lighten-1",
          "grey--text text--darken-4",
        ];
        this.btnColor = {
          number: "grey lighten-4",
          action: "orange lighten-3",
          extra: "blue-grey lighten-3",
        };
        this.btnContentColor = {
          number: "grey darken-2",
          action: "orange darken-4",
          extra: "blue-grey darken-3",
        };
      }
    },
    // Detect current device theme.
    detectDeviceTheme() {
      return new Promise((resolve, reject) => {
        // Use current device theme.
        // Support for iOS 13+ and Android 9+.
        // https://www.npmjs.com/package/cordova-plugin-theme-detection
        try {
          this.$onDeviceReady()
            .then(() => {
              window.cordova.plugins.ThemeDetection.isAvailable(
                (success_1) => {
                  if (!success_1.value) {
                    // By default.
                    resolve();
                  }
                  window.cordova.plugins.ThemeDetection.isDarkModeEnabled(
                    (success_2) => {
                      this.$vuetify.theme.dark = success_2.value;
                      resolve();
                    },
                    (error_1) => {
                      reject(error_1.message);
                    }
                  );
                },
                (error_2) => {
                  reject(error_2.message);
                }
              );
            })
            .catch((error) => {
              window.console.log(error);
            });
        } catch (error_3) {
          reject(error_3.message);
        }
      });
    },
  },

  created() {
    this.detectDeviceTheme()
      .then(() => {
        this.configColorsTheme();
      })
      .catch((error) => {
        window.console.log(error);
        // By default.
        this.configColorsTheme();
      });
  },
};
</script>
