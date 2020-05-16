<template>
  <v-card>
    <v-card-title>
      Transactions
      <v-spacer></v-spacer>
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
      :items="results"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        results: [],
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
      })
    }
  }
</script>