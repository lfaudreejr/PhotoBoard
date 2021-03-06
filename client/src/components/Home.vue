<template>
  <div>
    <div v-if="loading">
      <md-progress-bar md-mode="query" class="md-accent"></md-progress-bar>
    </div>
    <div v-masonry transition-duration='0.3s' item-selector='.home-tile' v-if="pins" class="masonry-container">
      <div v-masonry-tile class="home-tile" v-for="(pin, index) in pins" :key="index">
        <md-card>
          <!-- <md-card-media-cover md-text-scrim> -->
            <md-card-media>
              <img :src="pin.url" :alt="pin.description">
            </md-card-media>

            <md-card-area>
              <md-card-actions>
                <md-button v-if="authenticated && currentUser.id !== pin.saved_by" class="md-icon-button" @click="updateClickedPin(pin), showSavePinDialog(true)">
                  <md-icon>bookmark</md-icon>
                </md-button>

              <!-- pin card actions -->
                <md-button class="md-icon-button" @click.native="gotoPin(pin)">
                  <md-icon>pageview</md-icon>
                </md-button>
              </md-card-actions>
            </md-card-area>
          <!-- </md-card-media-cover> -->
        </md-card>

      </div>
    </div>
    <!-- show modal to add pin to user board if not already -->
    <md-dialog :md-active.sync="savePinDialogControl" class="dialog">
      <md-dialog-title>Select a board to save pin to.</md-dialog-title>
      <md-dialog-content>
      <!-- show create a board if for saving pin dialog -->
        <div>
          <md-button @click="toggleCreateABoardDialog(true)">Create     Board</md-button>
        </div>
        <!-- show users boards -->
        <div v-if="currentBoards" v-for="board in currentBoards"    :key="board._id">
          <md-button @click="savePinToBoard(board._id)">{{board.title}}   </md-button>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showSavePinDialog(false)">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- create board dialog -->
    <md-dialog :md-active.sync="createABoardToAddPinControl">
      <md-dialog-title>Create Board</md-dialog-title>
      <md-dialog-content>
        <md-field md-clearable>
          <label for="board-name">Board name</label>
          <md-input name="board-name" v-model="createBoardTitle"></md-input>
        </md-field>
        <md-dialog-actions>
          <md-button v-on:click.native="toggleCreateABoardDialog(false)   ">Cancel</md-button>
          <md-button v-on:click.native="createABoardToAddPin(createBoardTitle)">Create</md-button>
        </md-dialog-actions>
      </md-dialog-content>
    </md-dialog>
  </div>
</template>

<script>
import * as user from '../core/user-funcs.js'
import * as auth from '../authentication/AuthService.js'

export default {
  name: 'main',
  props: ['authenticated'],
  data () {
    return {
      loading: false,
      menuVisible: false,
      savePinDialogControl: false,
      createABoardToAddPinControl: false,
      clickedPin: false,
      pins: {},
      currentBoards: null,
      createBoardTitle: null
    }
  },
  computed: {
    currentUser () {
      return auth.getUserProfile()
    }
  },
  methods: {
    loadPins () {
      return user.getAllPins()
    },
    updateClickedPin (pin) {
      this.clickedPin = pin
    },
    getCurrentClickedPin () {
      return this.clickedPin
    },
    showSavePinDialog (method) {
      this.savePinDialogControl = method
    },
    savePinToBoard (boardId) {
      const clicked = this.getCurrentClickedPin()
      const pin = {
        url: clicked.url,
        description: clicked.description,
        uploaded_by: clicked.uploaded_by,
        saved_by: auth.getUserProfile().id
      }
      const board = {
        _id: boardId
      }
      user.addPinToUserBoard(pin, board)
      .then((data) => {
        this.$router.replace(`/${auth.getUserProfile().nickname}/dashboard/${data.data.value.title}`)
      })
      .catch((err) => console.error(err))
    },
    toggleCreateABoardDialog (method) {
      this.createABoardToAddPinControl = method
    },
    createABoardToAddPin (boardName) {
      this.loading = true
      user.createABoard({
        title: boardName,
        owner: auth.getUserProfile().id
      }).then((data) => {
        this.loading = false
        this.savePinToBoard(data.data._id)
      })
    },
    gotoPin (pin) {
      this.$router.replace(`/pins/${pin._id}`)
    },
    fetchData () {
      this.loading = true
      this.loadPins()
      .then((data) => {
        this.pins = data.data
        setTimeout(() => {
          if (auth.getUserProfile().id) {
            user.getUserBoards().then((data) => {
              this.currentBoards = data.data
            }).catch((err) => console.error(err))
          }
        }, 2000)
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

<style>
.md-card {
  margin: 5px 0;
}
.masonry-container {
  width: 85%;
  margin: 0 auto;
}
</style>
