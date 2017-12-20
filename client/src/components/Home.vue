<template>
  <div>
    <div class="md-layout md-gutter md-alignment-center-center">
      <div class="md-layout-item md-medium-size-25 md-small-size-50 md-xsmall-size-50" v-for="item in items" :key="item">
        <md-card>
          <md-card-media>
            <md-ripple>
              <img    src="https://vuematerial.io/assets/examples/card-image-1.jpg" alt="People">
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
export default {
  name: 'main',
  props: ['authenticated'],
  data () {
    return {
      menuVisible: false,
      items: [1, 2, 3, 4, 5, 6, 7] // TODO: remove with real data
    }
  }
}
</script>

<style>
.md-card {
  margin: 15px 0;
}

</style>
