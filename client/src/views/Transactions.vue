<template>
  <div class="home">
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
              clearable
              outlined
            ></v-text-field>
            <v-text-field
              class="ps-3"
              v-model="source"
              label="Source"
              clearable
              outlined
            ></v-text-field>
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
                  class="ps-3"
                  v-model="dateRangeText"
                  label="Filter by dates"
                  prepend-icon="event"
                  readonly
                  clearable
                  @click:clear="dates = [] "
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
  </div>
</template>
<script>
export default {
    name: 'Transactions',
    data () {
      return {
        search: '',
        source: '',
        entity: '',
        dates: [],
        menu: false,
        results: [],
        headers: [
          { text: 'Id', align: 'start',  value: 'id' },
          { text: 'Entity', value: 'entity',
            filter: value => {
              if (!this.entity) return true
              return value.toLowerCase().includes(this.entity.toLowerCase());
           }
          },
          { text: 'Amount', value: 'amount' },
          { text: 'Type', value: 'type' },
          { text: 'Source', value: 'source', 
            filter: value => {
              if (!this.source) return true
              return value.toLowerCase().includes(this.source.toLowerCase());
           }
          },
          { text: 'Date', value: 'createdAt',  filter: value => {
              if (!this.dates[0] || !this.dates[1]) return true
              this.dates = this.dates.sort().filter(function(a, b){return new Date(a).getTime() - new Date(b).getTime() - new Date(b).getTime()});
              return new Date(value).getTime() >= new Date(this.dates[0]).getTime() && new Date(value).getTime() <= new Date(this.dates[1]).getTime();
           } 
          },
        ],
      }
    },
    mounted() {
      const store = this.$store; 
      console.log(store.getters.transactionList);
      if(store.getters.transactionList < 1){
        console.log("Get transactions")
        this.axios.get("https://5e5d229a97d2ea00147971d0.mockapi.io/sq/transactions").then((response) => {
          store.commit('addTransactions', response.data)
          
        })
      }         
    },
    computed: {
      transactions() {
        return this.$store.getters.transactionList 
      },
      dateRangeText: {
        get()
        {
          return this.dates.join(' ~ ')
        },
        set(value)
        {
          this.value = value
        }
      },
    },
    watch: {
    }
  }
</script>
