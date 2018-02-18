<template>
  <div class="profile">
    <div v-if="loading">
      <md-progress-bar md-mode="query" class="md-accent"></md-progress-bar>
    </div>

    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-70">
        <p class="md-display-1">{{title}}</p>
      </div>
    </div>

    <div v-masonry transition-duration='0.3s' item-selector='.tile'>

      <CreatePin :board="board"></CreatePin>

      <div v-masonry-tile class="tile" v-for="pin in boardPins" :key="pin._id">
        <md-card>
          <!-- <md-card-media-cover md-text-scrim> -->
            <md-card-media>
              <img :src='pin.url' :alt="pin.description"/>
            </md-card-media>
            <md-card-area>
              <md-card-actions>
                <md-button class="md-icon-button md-accent" @click="showConfirmDeletePinModal(true)">
                  <md-icon>delete</md-icon>
                </md-button>
              <!-- Show modal to confirm delete of pin -->
                <md-dialog-confirm
                :md-active.sync="confirmDeletePinControl"
                md-title="Confirm"
                md-content="Are you sure you want to delete this pin?"
                md-confirm-text="Delete"
                md-cancel-text="Cancel"
                @md-cancel="showConfirmDeletePinModal(false)"
                @md-confirm="deletePinFromBoard(pin._id)"
                />
                <md-button class="md-icon-button" @click.native="gotoPin(pin)">
                  <md-icon>pageview</md-icon>
                </md-button>
              </md-card-actions>
            </md-card-area>
          <!-- </md-card-media-cover> -->
        </md-card>
      </div>

    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import CreatePin from '@/components/CreatePin'
import * as user from '../core/user-funcs.js'

export default {
  name: 'board',
  props: {
    currentUser: {
      type: Object
    }
  },
  components: {
    CreatePin
  },
  data () {
    user.dataEmitter.on('pinSaved', this.fetchData)
    return {
      loading: false,
      showDialogProp: false,
      confirmDeletePinControl: false,
      title: this.$route.params.board,
      board: {
        pins: null
      },
      modal: {
        url: null,
        description: null
      }
    }
  },
  computed: {
    boardPins () {
      return this.board.pins
    }
  },
  methods: {
    showDialog (method) {
      this.showDialogProp = method
    },
    showConfirmDeletePinModal (method) {
      this.confirmDeletePinControl = method
    },
    gotoPin (pin) {
      this.$router.replace(`/pins/${pin._id}`)
    },
    getPins () {
      return user.getUserPinsForBoard(this.$route.params.board)
    },
    deletePinFromBoard (_id) {
      this.loading = true
      user.deleteAPinFromABoard(_id)
      .then((data) => {
        this.getPins()
        .then((data) => {
          this.loading = false
          this.board = data.data
        })
        .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
    },
    fetchData () {
      this.loading = true
      this.getPins()
      .then((data) => {
        this.board = data.data
        this.loading = false
      })
      .catch((err) => console.error(err))
    }
  },
  created () {
    this.fetchData()
  },
  updated () {
    this.$redrawVueMasonry()
  },
  watch: {
    '$route': 'fetchData'
  }
}
</script>

<style scoped>
.dialog {
  padding: 15px;
}
</style>
