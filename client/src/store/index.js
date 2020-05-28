import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
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
