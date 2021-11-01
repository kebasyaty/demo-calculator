<template>
  <v-row align="center" justify="center">
    <template v-for="(button, index) in buttons">
      <v-col
        :cols="button.text !== '0' ? 3 : 6"
        class="text-center"
        :key="index"
        :ref="`colBtn${button.action}`"
      >
        <v-btn
          v-if="button.text !== '0'"
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

        <!-- Zero button -->
        <v-btn
          v-else
          rounded
          large
          depressed
          :width="widthColBtn0"
          height="64"
          :color="btnColor[button.type]"
          @click="btnAction(button.action)"
          :class="`zero-button btn-action-${button.action}`"
        >
          <span
            v-if="button.text !== undefined"
            class="text-h5 zero-button--text"
            v-text="button.text"
            :class="toColorClass(btnContentColor[button.type])"
          ></span>
        </v-btn>
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  name: "ActionButtons",

  props: {
    btnContentColor: {
      type: Object,
      require: true,
    },
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
  },

  data: () => ({
    widthColBtn0: 0,
    buttons: [
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
    ],
  }),

  methods: {
    // Detect width of button `zero`.
    getWidthBtn0() {
      this.widthColBtn0 = this.$refs.colBtn7[0].clientWidth + 64;
    },
  },

  mounted() {
    // Detect size of button `zero`.
    this.getWidthBtn0();
    window.addEventListener("resize", () => {
      this.getWidthBtn0();
    });
  },
};
</script>

<style scoped>
.zero-button--text {
  position: absolute;
  left: 0;
  margin-left: 5px;
}
</style>
