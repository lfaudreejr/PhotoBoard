<template>
  <router-view></router-view>
</template>

<script>
import Profile from './Profile'
import Board from './Board'
export default {
  name: 'Dashboard',
  components: { Profile, Board }
}
</script>

<style scoped>

</style>
