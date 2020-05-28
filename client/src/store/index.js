import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    transactions: []
  },
  mutations: {
    addTransactions(state, transactions) {
      state.transactions = transactions;
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    transactionList: state => {
      return state.transactions
    }
  }
})
