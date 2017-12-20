import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import Profile from '@/components/Profile'
import FourOhFour from '@/components/FourOhFour'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
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
    },
    {
      path: '**',
      name: 'FourOhFour',
      component: FourOhFour
    }
  ]
})
