import Vue from 'vue'
import Router from 'vue-router'
import Landing from '@/components/Landing'
import Dashboard from '@/components/Dashboard'
import Callback from '@/components/Callback'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    }
  ]
})
