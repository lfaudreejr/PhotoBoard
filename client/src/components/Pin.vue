<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50 md-xsmall-size-100 md-alignment-top-space-around">
      <md-card v-if="pin">
        <md-card-media>
          <img :src='pin.url' :alt="pin.description"/>
        </md-card-media>
        <md-card-area>
          <md-card-actions>
            <md-button class="md-icon-button" @click="deletePinFromBoard(pin._id)">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click.native="editPin(pin)">
              <md-icon>edit</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card>
    </div>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  name: 'pin',
  data () {
    return {
      pin: null
    }
  },
  methods: {
    deletePinFromBoard () {}, // TODO:
    editPin () {} // TODO:
  },
  mounted () {
    api.get(`/api/pins/${this.$route.params.id}`)
    .then((data) => {
      this.pin = data.data
    })
    .catch((err) => console.error(err))
  }
}
</script>

<style lang="scss" scoped>
.md-layout-item {
  margin: 0 auto;
}
</style>
