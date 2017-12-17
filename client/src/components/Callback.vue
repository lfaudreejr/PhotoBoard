<template>
  <div class="spinner">
    <!-- <img src="../../assets/loading.gif" alt="loading"/> -->
    <h3>Loading...</h3>
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
