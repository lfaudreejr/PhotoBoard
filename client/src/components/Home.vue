<template>
  <div>
    <div v-masonry transition-duration='0.3s' item-selector='.home-tile' v-if="pins">
      <div v-masonry-tile class="home-tile" v-for="pin in pins" :key="pin._id">
        <md-card md-with-hover>
          <md-card-media-cover md-text-scrim>
            <md-card-media>
              <img :src="pin.url" alt="pin.description">
            </md-card-media>

            <md-card-area>
              <md-card-actions>
                <md-button class="md-icon-button" @click="savePin(pin)">
                  <md-icon>bookmark</md-icon>
                </md-button>
                <md-button class="md-icon-button" @click.native="gotoPin(pin)">
                  <md-icon>pageview</md-icon>
                </md-button>
              </md-card-actions>
            </md-card-area>
          </md-card-media-cover>
        </md-card>
    </div>
  </div>

  </div>
</template>

<script>
import * as api from '../api'

export default {
  name: 'main',
  props: ['authenticated'],
  data () {
    return {
      menuVisible: false,
      pins: null
    }
  },
  methods: {
    loadPins () {
      api.get('/api/pins/all')
      .then((data) => {
        this.pins = data.data
      })
      .catch((err) => console.error(err))
    },
    savePin () {}, // TODO:
    gotoPin (pin) {
      console.log(pin)
      this.$router.push(`/pins/${pin._id}`)
    } // TODO:
  },
  mounted: function () {
    this.loadPins()
  },
  updated () {
    this.$redrawVueMasonry()
  }
}
</script>

<style>
.md-card {
  margin: 5px 0;
}
</style>
