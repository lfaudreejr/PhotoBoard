import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Board from '@/components/Board'
import FourOhFour from '@/components/FourOhFour'
import Pin from '@/components/Pin'

import * as auth from '../authentication/AuthService'

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
      path: '/pins/:id',
      name: 'Pin',
      component: Pin
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/:id/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: (to, from, next) => {
        let profile = auth.getUserProfile()
        if (profile.id !== to.params.id) {
          next('/')
        }
        next()
      },
      children: [
        {
          path: 'profile',
          name: 'Profile',
          component: Profile
        },
        {
          path: ':board',
          name: 'Board',
          component: Board
        }
      ]
    },
    {
      path: '**',
      name: 'FourOhFour',
      component: FourOhFour
    }
  ]
})
