<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item :to="'Transactions'" link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'Statistics'" link>
          <v-list-item-action>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Statistics</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="'Settings'" link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      Balance: {{balance}} €
    </v-app-bar>
    <router-view />

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
//import About from '../views/About.vue'
export default {
  data: () => ({
    drawer: null,
    title: "PeeBu"
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    balance() {
      let sum = this.$store.getters.transactionList.reduce(function(
        prevVal,
        elem
      ) {
        if (elem.type == "debit") {
          return prevVal - parseFloat(elem.amount);
        }
        return prevVal + parseFloat(elem.amount);
      },
      0);
      return Number.parseFloat(sum).toFixed(2);
    }
  }
};
</script> 