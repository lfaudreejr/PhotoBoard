<template>
  <div class="spinner">
    <md-progress-bar md-mode="indeterminate" class="md-accent"></md-progress-bar>
  </div>
</template>

<script>
import { handleLogin } from '../authentication/AuthService.js'
export default {
  name: 'callback',
  data () {
    handleLogin()
    return {}
  }
}
</script>
