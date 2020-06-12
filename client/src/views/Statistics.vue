<template>
  <div class="more">
    <v-container fluid>
      <v-card-title>Statistics</v-card-title>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>
              Categorised transactions
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="transactions" :search="search"></v-data-table>
          </v-card>
        </v-col>
        <v-col>Top Transactions</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  data() {
    return {
      api: "",
      search: "",
      typeSnack: "Success",
      snackbar: false,
      textSnack: "",
      headers: [
        { text: "Id", align: "start", value: "id" },
        {
          text: "Entity",
          value: "entity",
        },
        { text: "Amount", value: "amount" },
        { text: "Type", value: "type" },
        {
          text: "Source",
          value: "source",
        },
        {
          text: "Date",
          value: "createdAt",
        },
        {
          text: "Category",
          value: "category",
        }
      ]
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
    filterCategory(obj){
        if(obj.category === 'Choose a category...'){
            return false; 
        }
        return true;
    }
  },
  mounted() {
    this.api = this.$store.getters.api;
  },
  computed: {
    transactions() {
      return this.$store.getters.transactionList.filter(this.filterCategory);
    }
  },
  watch: {}
};
</script>
