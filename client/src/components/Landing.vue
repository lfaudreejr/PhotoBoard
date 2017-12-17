<template>
  <div>
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <h3 class="md-title">PhotoBoard</h3>
      </div>
    </md-toolbar>
    <div class="jumbo pt-5">
      <div class="logo">p</div>
      <h1 class="md-display-3">PhotoBoard</h1>
      <p class="md-subheading">~ A Pinterest Clone ~</p>
      <md-button class="md-raised md-primary" @click="login">Sign In</md-button>
    </div>
    <div class="md-layout md-gutter pt-5">
      <div class="md-layout-item">
        <h3>Add something</h3>
      </div>
      <div class="md-layout-item">
        <h3>Add something</h3>
      </div>
      <div class="md-layout-item">
        <h3>Add something</h3>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '../authentication/AuthService.js'
export default {
  name: 'main',
  data () {
    return {
    }
  },
  methods: {
    login
  }
}
</script>

<style>
.jumbo {
  height: 350px;
}
.pt-5 {
  padding-top: 5vh;
}
</style>
