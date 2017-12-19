<template>
  <div>
    <h1>Profile</h1>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  mounted () {
    console.log('mounted')
    return api.getSecuredAccessPoint()
  }
}
</script>

<style lang="scss" scoped>

</style>
