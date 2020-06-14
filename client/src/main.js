import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueAxios from 'vue-axios'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'
import darkUnica from "highcharts/themes/dark-unica";
import exporting from "highcharts/modules/exporting";

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
darkUnica(Highcharts)
exporting(Highcharts)
Vue.use(HighchartsVue)


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
