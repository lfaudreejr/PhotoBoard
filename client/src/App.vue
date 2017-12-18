<template>
  <div id="app">
    <navbar :authenticated='authenticated'></navbar>
    <router-view :authenticated='authenticated'></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import {authenticated, authNotifier} from './authentication/AuthService.js'
export default {
  name: 'app',
  components: {
    Navbar
  },
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      authenticated
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 500px;
}
</style>
