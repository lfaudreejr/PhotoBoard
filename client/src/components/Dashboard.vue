<template>
  <md-content>
    <div class="md-layout md-alignment-center">
      <div class="md-layout-item md-medium-size-33 md-small-size-50 md-xsmall-size-100" v-for="item in items" :key="item">
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
  </md-content>
</template>

<script>
export default {
  name: 'main',
  props: ['authenticated'],
  data () {
    return {
      menuVisible: false,
      items: [1, 2, 3, 4, 5] // TODO: remove with real data
    }
  }
}
</script>

<style>
.md-card {
  justify-content: space-around;
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}

</style>
