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

      <div v-masonry-tile class="tile">
        <md-card md-with-hover class="board-card" v-on:click.native="showDialog(true)">
          <md-ripple>
            <md-card-header>
              <span class="md-subhead">Add new pin</span>
            </md-card-header>
            <md-card-content>
              <md-button class="md-icon-button board-button">
                <md-icon>add</md-icon>
              </md-button>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>

      <div v-masonry-tile class="tile" v-for="pin in boardPins" :key="pin._id">
        <md-card>
          <!-- <md-card-media-cover md-text-scrim> -->
            <md-card-media>
              <img :src='pin.url' :alt="pin.description"/>
            </md-card-media>
            <md-card-area>
              <md-card-actions>
                <md-button class="md-icon-button" @click="showConfirmDeletePinModal(true)">
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

        <!--  MODAL for Creating a Pin -->
    <md-dialog :md-active.sync="showDialogProp" class="dialog">
      <div>
        <md-dialog-title>Add Pin</md-dialog-title>

        <md-field md-clearable>
          <label for="pin-uri">Enter Url</label>
          <md-input name="pin-uri" v-model="modal.url"/>
        </md-field>
        <md-field>
          <label for="pin-description">Enter a description</label>
          <md-textarea name="pin-description" v-model="modal.description"></md-textarea>
        </md-field>

        <md-divider></md-divider>
        <md-dialog-actions>
          <md-button @click="showDialog(false),modal.boardName=''">Cancel</md-button>
          <md-button @click="addPinToBoard()">Create</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import * as user from '../core/user-funcs.js'

export default {
  name: 'board',
  data () {
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
    addPinToBoard () {
      this.showDialog(false)
      this.loading = true
      const pin = {
        url: this.modal.url,
        description: this.modal.description,
        uploaded_by: user.currentUser(),
        saved_by: user.currentUser()
      }
      const board = {
        _id: this.board._id
      }
      user.addPinToUserBoard(pin, board)
      .then((data) => {
        this.modal.url = null
        this.modal.description = null
        this.getPins()
        .then((data) => {
          this.loading = false
          this.board = data.data
        })
        .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
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
