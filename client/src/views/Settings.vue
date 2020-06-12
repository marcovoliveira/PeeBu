<template>
  <div class="more">
    <v-container fluid>
      <v-card-title>Settings</v-card-title>
      <v-col cols="12" sm="6">
        <v-text-field id="apiText" v-model="api" label="API" clearable outlined></v-text-field>
        <v-btn @click="updateApi()">Update</v-btn>
        <v-snackbar v-model="snackbar">
          {{ textSnack }}
          <v-btn :color="typeSnack" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Transactions",
  data() {
    return {
      api: "",
      typeSnack: "Success",
      snackbar: false,
      textSnack: ""
    };
  },
  methods: {
    updateApi() {
      try {
        this.textSnack = "Api url updated!";
        this.typeSnack = "success";
        this.$store.commit("addApi", this.api);
      } catch (e) {
        this.textSnack = e;
        this.typeSnack = "error";
      }
      this.snackbar = true;
    },
  },
  mounted() {
    this.api = this.$store.getters.api;
  },
  computed: {},
  watch: {}
};
</script>
