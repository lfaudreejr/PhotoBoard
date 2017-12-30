<template>
  <router-view :authenticated="authenticated"></router-view>
</template>

<script>
import Profile from './Profile'
import Board from './Board'
export default {
  name: 'Dashboard',
  props: ['authenticated'],
  components: { Profile, Board }
}
</script>

<style scoped>

</style>
