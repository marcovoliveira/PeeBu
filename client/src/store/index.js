import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    api: 'https://5e5d229a97d2ea00147971d0.mockapi.io/sq/transactions',
    transactions: []
  },
  mutations: {
    addTransactions(state, transactions) {
      state.transactions = transactions;
    },
    addApi(state, api){
      state.api = api;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    transactionList: state => {
      return state.transactions
    },
    api: state => {
      return state.api
    }
  }
})
