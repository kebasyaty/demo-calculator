<template>
  <v-snackbar app centered v-model="cmpShowAlerts" vertical timeout="-1">
    <span class="text-subtitle-1 v-snackbar--props-message">{{ message }}</span>
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="setShowAlerts(false)">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "PopupAlerts",

  computed: {
    ...mapState(["message", "showAlerts"]),
    //
    cmpShowAlerts: {
      get: function () {
        return this.showAlerts;
      },
      set: function (newVal) {
        this.setShowAlerts(newVal);
      },
    },
  },

  methods: {
    ...mapMutations(["setShowAlerts"]),
  },
};
</script>
