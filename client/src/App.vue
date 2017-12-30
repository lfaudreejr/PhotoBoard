<template>
  <div id="app">
    <navbar :authenticated='authenticated'></navbar>
    <router-view :authenticated='authenticated' :currentUser="currentUser"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import {authenticated, authNotifier, currentUser} from './authentication/AuthService.js'

export default {
  name: 'app',
  components: {
    Navbar
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    authNotifier.on('profileChange', authState => {
      this.currentUser = authState.currentUser
    })
    return {
      authenticated,
      currentUser
    }
  }
}
</script>

<style>
#app {
  font-family: Roboto Mono, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 70px;
  min-height: 500px;
  padding: 25px;
}
</style>
