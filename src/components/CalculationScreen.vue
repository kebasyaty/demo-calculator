<template>
  <v-row>
    <v-col cols="12" class="pa-4">
      <table class="calc-screen">
        <tr>
          <td
            align="right"
            valign="bottom"
            width="100%"
            height="150"
            :class="`text-h4 calc-screen--display-result ${
              isEmptyScreen ? screenTextColor[0] : screenTextColor[1]
            }`"
            v-html="humanizeNumber(screenBuffer.join(''))"
          ></td>
        </tr>
      </table>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "CalculationScreen",

  props: {
    screenBuffer: {
      type: Array,
      required: true,
    },
    isEmptyScreen: {
      type: Boolean,
      required: true,
    },
    screenTextColor: {
      type: Array,
      require: true,
    },
  },

  methods: {
    // from "1000000" to "1.000.000"
    humanizeNumber(mathExpressionText) {
      return mathExpressionText.replace(/(\d+)/g, (n) => {
        var d = ".";
        var s = ",";
        n = n.split(".");
        n[0] = n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + d);
        return n.join(s);
      });
    },
  },
};
</script>

<style scoped>
table.calc-screen {
  width: 100%;
  margin-left: -4px;
}
table.calc-screen td {
  word-break: break-all;
}
</style>
