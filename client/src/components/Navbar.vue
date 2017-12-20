<template>
  <md-toolbar class="md-primary main-header" md-elevation="1">
    <md-button class="md-icon-button" to='/'><md-icon >photo_camera</md-icon></md-button>
    <div style="flex: 1">
      <span class="md-xsmall-hide md-title">PhotoBoard</span>
    </div>

    <md-button to='/profile' v-if="authenticated">Profile</md-button>

    <md-button v-if="!authenticated" @click="login()">Sign In</md-button>
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

<style scoped>
.main-header {
  margin: auto;
  max-width: 100%;
  position: fixed;
  top: 0;
  right: 0;
}
.md-title {
  letter-spacing: .04em;
}
</style>
