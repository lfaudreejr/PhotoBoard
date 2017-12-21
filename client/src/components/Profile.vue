<template>
  <div class="profile">
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-70">
        <p class="md-display-1">{{username}}</p>
      </div>
      <div class="md-layout-item">
        <img class="user-picture" :src="picture">
      </div>
    </div>
    <div md-layout>
      <div class="md-layout-item md-medium-size-33 md-small-size-100">
        <h3>Boards</h3>
        <md-card md-with-hover>
          <md-ripple>
            <md-card-content>
              <div class="board">
                <md-button class="md-icon-button" disabled>
                  <md-icon>add</md-icon>
                </md-button>
              </div>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  name: 'profile',
  data () {
    return {}
  },
  computed: {
    username () {
      return JSON.parse(localStorage.getItem('profile')).name
    },
    picture () {
      return JSON.parse(localStorage.getItem('profile')).picture
    }
  },
  mounted () {
    console.log('mounted')
    return api.get('/api/user').then((data) => console.log(data)).catch((err) => console.error(err))
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding-left: 2em;
  padding-right: 2em;
  margin: 0 auto;
}
.md-card {
  border-radius: 5%;
  height: 265px;
}
.board:hover {
  -moz-transform: scale(1.05);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  cursor: pointer;
}
.board {
  height: 235px;
  width: 100%;
  border-radius: 5%
}
.md-icon-button {
  position: relative;
  top: 40%;
  left: 40%;
  background-color: pink;
  color: white;
}
.user-picture {
  width: 175px;
  border-radius: 50%;
}
.md-display-1 {
  margin-left: 1rem;
  color: black;
}
</style>
