<template>
  <md-toolbar class="md-primary main-header" md-elevation="1">
    <md-button class="md-icon-button" to='/'><md-icon >photo_camera</md-icon></md-button>
    <div style="flex: 1">
      <span class="md-xsmall-hide md-title">PhotoBoard</span>
    </div>

    <md-button @click="gotoProfile()" v-if="authenticated">Profile</md-button>

    <md-button v-if="!authenticated" @click="login()">Sign In</md-button>
    <md-button v-if="authenticated" @click="logout()">Sign Out</md-button>
  </md-toolbar>
</template>

<script>
import * as auth from '../authentication/AuthService.js'

export default {
  name: 'navbar',
  props: ['authenticated'],
  methods: {
    login: auth.login,
    logout: auth.logout,
    gotoProfile () {
      this.$router.push({name: 'Profile', params: { id: auth.getUserProfile().id }})
    }
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
