<template>
  <v-card>
    <v-card-title>
      Transactions
      <v-spacer></v-spacer>
      <v-expansion-panels hover>
      <v-expansion-panel>
      <v-expansion-panel-header>Filters</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-text-field
              v-model="entity"
              label="Entity"
              outlined
            ></v-text-field>
                <v-spacer></v-spacer>
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
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="dates" no-title scrollable range>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-expansion-panels>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="transactions"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        entity: '',
        dates: [],
        datesSorted: [],
        menu: false,
        results: [],
        transactions: [],
        headers: [
          { text: 'Id', align: 'start',  value: 'id' },
          { text: 'Entity', value: 'entity',},
          { text: 'Amount', value: 'amount' },
          { text: 'Type', value: 'type' },
          { text: 'Source', value: 'source' },
          { text: 'Date', value: 'createdAt' },
        ],
      }
    },
     mounted () {
     this.axios.get("https://5e5d229a97d2ea00147971d0.mockapi.io/sq/transactions").then((response) => {
        this.results = response.data;
        this.transactions = response.data;
      })
    },
    computed: {
        dateRangeText () {
        return this.datesSorted.join(' ~ ')
      },
    },
    watch: {
      entity: function(val) {
        this.transactions =  this.results.filter(function(transaction) {
          return transaction.entity.includes(val);
        })
      },
      dates: function() {
        this.datesSorted = this.dates.slice().sort(function(a,b){return new Date(a).getTime() - new Date(b).getTime()});
        console.log(this.datesSorted);
        this.transactions =  this.results.filter((item) => {
          return new Date(item.createdAt).getTime() >= new Date(this.datesSorted[0]).getTime() &&
           new Date(item.createdAt).getTime() <= new Date(this.datesSorted[1]).getTime();
        
        })
      }
    }
  }
</script>