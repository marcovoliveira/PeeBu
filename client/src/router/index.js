import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '../views/About.vue'
import Transactions from '../views/Transactions.vue'
import More from '../views/More.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Transactions
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions
  },
  {
    path: '/more',
    name: 'more',
    component: More
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
