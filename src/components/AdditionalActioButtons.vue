<template>
  <v-bottom-sheet v-model="cmpShowExtraButtons">
    <v-sheet class="text-center">
      <v-btn
        class="mt-6"
        text
        color="red"
        @click="cmpShowExtraButtons = !cmpShowExtraButtons"
      >
        close
      </v-btn>

      <div class="mt-3">
        <v-row align="center" justify="center">
          <v-col
            v-for="(button, index) in extraButtons"
            cols="3"
            class="text-center"
            :key="index"
            :ref="`colBtn${button.action}`"
          >
            <v-btn
              fab
              large
              depressed
              :color="btnColor[button.type]"
              @click="btnAction(button.action)"
              :class="`btn-action-${button.action}`"
            >
              <!-- Text -->
              <span
                v-if="button.text !== undefined"
                class="text-h5"
                v-text="button.text"
                :class="toColorClass(btnContentColor[button.type])"
              ></span>
              <!-- Icon -->
              <v-icon v-else :color="btnContentColor[button.type]">{{
                `mdi-${button.icon}`
              }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <!-- Theme switcher (light | dark) -->
      <div class="pb-3">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-switch
            inset
            hide-details
            v-model="$vuetify.theme.dark"
            append-icon="mdi-moon-waxing-crescent"
            prepend-icon="mdi-weather-sunny"
            @change="configColorsTheme()"
            class="theme-switcher"
          ></v-switch>
          <v-spacer></v-spacer>
        </v-card-actions>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AdditionalActioButtons",

  props: {
    btnColor: {
      type: Object,
      require: true,
    },
    btnAction: {
      type: Function,
      require: true,
    },
    toColorClass: {
      type: Function,
      require: true,
    },
    btnContentColor: {
      type: Object,
      require: true,
    },
    configColorsTheme: {
      type: Function,
      require: true,
    },
  },

  data() {
    return {
      extraButtons: [
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
      ],
    };
  },

  computed: {
    ...mapState(["showExtraButtons"]),
    //
    cmpShowExtraButtons: {
      get: function () {
        return this.showExtraButtons;
      },
      set: function (newVal) {
        this.setShowExtraButtons(newVal);
      },
    },
  },

  methods: {
    ...mapMutations(["setShowExtraButtons"]),
  },
};
</script>

<style>
.theme-switcher > .v-input__prepend-outer {
  margin-right: 22px !important;
}
.theme-switcher > .v-input__append-outer {
  margin-left: 0 !important;
}
</style>
