<template>
  <div class="profile">

    <div class="md-layout md-gutter md-alignment-left-center">
      <div class="md-layout-item md-size-70">
        <p class="md-display-1">{{title}}</p>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-medium-size-33 md-small-size-100">
        <span class="md-subheading">Add pin</span>
        <md-card md-with-hover class="board-card">
          <md-ripple>
            <md-card-content>
              <div class="board">
                <md-button class="md-icon-button board-button">
                  <md-icon>add</md-icon>
                </md-button>
              </div>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
    </div>

    <div v-if="board">
      {{board}}
      <div class="md-layout md-gutter md-alignment-center-center md-primary">
        <div class="md-layout-item" v-for="pin in board.pins" :key="pin">
          {{pin}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  name: 'board',
  data () {
    return {
      title: this.$route.params.board,
      board: null
    }
  },
  mounted () {
    api.get(`/api/boards/${this.$route.params.board}`)
    .then((data) => {
      console.log(data.data)
      this.board = data.data[0]
    })
    .catch((err) => console.error(err))
  }
}
</script>

<style scoped>

</style>
