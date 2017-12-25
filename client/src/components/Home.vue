<template>
  <div>
    <div v-masonry transition-duration='0.3s' item-selector='.home-tile' v-if="pins">
      <div v-masonry-tile class="home-tile" v-for="pin in pins" :key="pin._id">
        <md-card md-with-hover>
          <md-card-media>
            <md-ripple>
              <img :src="pin.url" alt="pin.description">
            </md-ripple>
          </md-card-media>

          <md-card-actions>
            <md-button class="md-icon-button">
              <md-icon>favorite</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>bookmark</md-icon>
            </md-button>

            <md-button class="md-icon-button">
              <md-icon>share</md-icon>
            </md-button>
          </md-card-actions>
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
      // items: [1, 2, 3, 4, 5, 6, 7] // TODO: remove with real data
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
    }
  },
  mounted: function () {
    this.loadPins()
    this.$redrawVueMasonry()
  }
}
</script>

<style>
.md-card {
  margin: 5px 0;
}
</style>
