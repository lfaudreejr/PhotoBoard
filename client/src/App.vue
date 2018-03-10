<template>
  <div id="app">
    <navbar :authenticated='authenticated'></navbar>
    <div v-if="loading">
      <md-progress-bar md-mode="indeterminate" class="md-accent"></md-progress-bar>
    </div>
    <router-view :authenticated='authenticated' :isAdmin="isAdmin"></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import {authenticated, authNotifier, isAdmin} from './authentication/AuthService.js'

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
      isAdmin,
      loading: false
    }
  },
  methods: {
    beforeRouteRender (to, from, next) {
      this.loading = true
      next()
    },
    afterRouteRender () {
      this.loading = false
    }
  },
  created () {
    this.$router.beforeEach(this.beforeRouteRender)
    this.$router.afterEach(this.afterRouteRender)
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
