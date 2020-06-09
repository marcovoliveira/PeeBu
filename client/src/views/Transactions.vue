<template>
  <div class="home">
    <v-container>
      <v-card-title>
        Transactions
        
        <v-spacer></v-spacer>
        <v-btn @click="getTransactions()" right small class="ma-2" title="Refresh data from api" outlined fab color="grey">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-expansion-panels hover>
          <v-expansion-panel>
            <v-expansion-panel-header>Filters</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-text-field v-model="entity" label="Entity" clearable outlined></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-text-field v-model="source" label="Source" clearable outlined></v-text-field>
                </v-col>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-select
                    v-model="filterCategory"
                    :items="categories"
                    label="Categories"
                    clearable
                    outlined
                  ></v-select>
                </v-col>
                <v-col class="d-flex" cols="6" sm="3">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateRangeText"
                        label="Filter by dates"
                        readonly
                        clearable
                        @click:clear="dates = [] "
                        v-on="on"
                        outlined
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dates" no-title scrollable range>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Id, ammount, type..."
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="transactions" :search="search">
        <template v-slot:item.category="props">
          <v-edit-dialog
            :return-value.sync="props.item.category"
            large
            persistent
            @save="save"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.category }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update Category</div>
            </template>
            <template v-slot:input>
              <v-select
                v-model="props.item.category"
                :items="categories"
                filled
                label="Category"
                autofocus
              ></v-select>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
      <v-snackbar v-model="category" :timeout="6000" :color="categoryColor">
        {{ categoryText }}
        <v-btn text @click="category = false">Close</v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Transactions",
  data() {
    return {
      category: false,
      categoryColor: "",
      categoryText: "",
      filterCategory: "",
      search: "",
      source: "",
      entity: "",
      dates: [],
      menu: false,
      results: [],
      categories: [
        "Choose a category...",
        "Food",
        "Education",
        "Health",
        "Household",
        "Entertainment",
        "Transportation",
        "Vet"
      ],
      headers: [
        { text: "Id", align: "start", value: "id" },
        {
          text: "Entity",
          value: "entity",
          filter: value => {
            if (!this.entity) return true;
            return value.toLowerCase().includes(this.entity.toLowerCase());
          }
        },
        { text: "Amount", value: "amount" },
        { text: "Type", value: "type" },
        {
          text: "Source",
          value: "source",
          filter: value => {
            if (!this.source) return true;
            return value.toLowerCase().includes(this.source.toLowerCase());
          }
        },
        {
          text: "Date",
          value: "createdAt",
          filter: value => {
            if (!this.dates[0] || !this.dates[1]) return true;
            this.dates = this.dates.sort().filter(function(a, b) {
              return (
                new Date(a).getTime() -
                new Date(b).getTime() -
                new Date(b).getTime()
              );
            });
            return (
              new Date(value).getTime() >= new Date(this.dates[0]).getTime() &&
              new Date(value).getTime() <= new Date(this.dates[1]).getTime()
            );
          }
        },
        {
          text: "Category",
          value: "category",
          filter: value => {
            if (!this.filterCategory) return true;
            return value === this.filterCategory;
          }
        }
      ]
    };
  },
  methods: {
    save() {
      this.$store.commit("addTransactions", this.transactions);
      this.category = true;
      this.categoryColor = "success";
      this.categoryText = "Data saved";
    },
    cancel() {
      this.category = true;
      this.categoryColor = "error";
      this.categoryText = "Canceled";
    },
    open() {
      this.category = true;
      this.categoryColor = "info";
      this.categoryText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    getTransactions() {
      const store = this.$store;
      console.log("Get transactions");
      this.axios.get(store.getters.api).then(response => {
        response.data.forEach(element => {
          element.category = this.categories[0];
        });
        store.commit("addTransactions", response.data);
      }).catch((error) =>  {
        this.category = true;
        this.categoryColor = "error";
        this.categoryText = "Refresh failed: " + error.message;
      });
    },
  },
  mounted() {
    const store = this.$store;
    console.log(store.getters.transactionList);
    if (store.getters.transactionList < 1) {
      this.getTransactions();
    }
  },
  computed: {
    transactions() {
      return this.$store.getters.transactionList;
    },
    dateRangeText: {
      get() {
        return this.dates.join(" ~ ");
      },
      set(value) {
        this.value = value;
      }
    }
  },
  watch: {}
};
</script>
