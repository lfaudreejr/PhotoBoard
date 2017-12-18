<template>
  <md-toolbar class="md-primary md-dense" md-elevation="1">
    <md-button class="md-icon-button" to='/'><md-icon>camera</md-icon></md-button>
    <h3 class="md-title" style="flex: 1">
      <span>PhotoBoard</span>
    </h3>
    <md-button v-if="!authenticated" @click="login()">Sign In</md-button>
    <md-button v-if="authenticated">Profile</md-button>
    <md-button v-if="authenticated" @click="logout()">Sign Out</md-button>
  </md-toolbar>
</template>

<script>
import {login, logout} from '../authentication/AuthService.js'

export default {
  name: 'navbar',
  props: ['authenticated'],
  data () {
    return {}
  },
  methods: {
    login,
    logout
  }
}
</script>
