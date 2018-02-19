<template>
  <router-view :authenticated="authenticated" :isAdmin="isAdmin" ></router-view>
</template>

<script>
import Profile from './Profile'
import Board from './Board'
export default {
  name: 'Dashboard',
  props: ['authenticated', 'isAdmin'],
  components: { Profile, Board }
}
</script>

<style scoped>

</style>
