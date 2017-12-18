import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Callback from '@/components/Callback'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
