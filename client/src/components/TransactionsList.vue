<template>
  <v-card>
    <v-card-title>
      Transactions
      <v-spacer></v-spacer>
      <v-expansion-panels hover>
      <v-expansion-panel>
      <v-expansion-panel-header>Filters</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="entity"
              label="Entity"
              outlined
            ></v-text-field>
          </v-col>
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


    watch: {
      entity: function(val) {
        this.transactions =  this.results.filter(function(transaction) {
          return transaction.entity.includes(val);
        })
        }
      }
    }
</script>