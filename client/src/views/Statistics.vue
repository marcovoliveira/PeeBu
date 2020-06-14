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
            <v-data-table id="table1" :headers="headers" :items="transactions" :search="search"></v-data-table>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="14">
            <v-card-title>Top transactions</v-card-title>
            <v-card-text>
              <v-card outlined>
                <v-card-title style="color:#8b0000;">Top 5 Expenses</v-card-title>
                <v-simple-table id="tableExpense">
                  <template>
                    <thead>
                      <tr>
                        <th id="Id" class="text-left">Id</th>
                        <th id="Entity" class="text-left">Entity</th>
                        <th id="Amount" class="text-left">Amount</th>
                        <th id="Type" class="text-left">Type</th>
                        <th id="Source" class="text-left">Source</th>
                        <th id="Date" class="text-left">Date</th>
                        <th id="Category" class="text-left">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in topExpense" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.entity }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.source }}</td>
                        <td>{{ (new Date(item.createdAt)).toUTCString() }}</td>
                        <td>
                          <span v-if="item.category == 'Choose a category...'">None</span>
                          <span v-else>{{item.category}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-card-text>
            <v-card-text>
              <v-card outlined>
                <v-card-title style="color:#013220;">Top 3 Incomes</v-card-title>
                <v-simple-table id="tableIncome">
                  <template>
                    <thead>
                      <tr>
                        <th id="Id" class="text-left">Id</th>
                        <th id="Entity" class="text-left">Entity</th>
                        <th id="Amount" class="text-left">Amount</th>
                        <th id="Type" class="text-left">Type</th>
                        <th id="Source" class="text-left">Source</th>
                        <th id="Date" class="text-left">Date</th>
                        <th id="Category" class="text-left">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in topIncome" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ item.entity }}</td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.source }}</td>
                        <td>{{ (new Date(item.createdAt)).toUTCString() }}</td>
                        <td>
                          <span v-if="item.category == 'Choose a category...'">None</span>
                          <span v-else>{{item.category}}</span>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-card-text>
          </v-card>
        </v-col>
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
          value: "entity"
        },
        { text: "Amount", value: "amount" },
        { text: "Type", value: "type" },
        {
          text: "Source",
          value: "source"
        },
        {
          text: "Date",
          value: "createdAt"
        },
        {
          text: "Category",
          value: "category"
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
    filterCategory(obj) {
      if (obj.category === "Choose a category...") {
        return false;
      }
      return true;
    },
    filterDebit(obj) {
      if (obj.type === "credit" || obj.type === "invoice"  || obj.category === "Choose a category...") {
        return false;
      }
      return true;
    },
    filterCredit(obj) {
      if (obj.type === "debit" || obj.category === "Choose a category...") {
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
    },
    topExpense() {
      let arrayDebit = this.$store.getters.transactionList.filter(
        this.filterDebit
      );

      arrayDebit.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

      return arrayDebit.slice(0, 5);
    },
    topIncome() {
      let arrayCredit = this.$store.getters.transactionList.filter(
        this.filterCredit
      );

      arrayCredit.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount));

      return arrayCredit.slice(0, 3);
    }
  },
  watch: {}
};
</script>
