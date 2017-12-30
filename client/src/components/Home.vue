<template>
  <div>
    <div v-masonry transition-duration='0.3s' item-selector='.home-tile' v-if="pins">
      <div v-masonry-tile class="home-tile" v-for="pin in pins" :key="pin._id">
        <md-card>
          <!-- <md-card-media-cover md-text-scrim> -->
            <md-card-media>
              <img :src="pin.url" :alt="pin.description">
            </md-card-media>

            <md-card-area>
              <md-card-actions v-if="authenticated">
                <md-button v-if="currentUser !== pin.saved_by" class="md-icon-button" @click="updateClickedPin(pin), showSavePinDialog(true)">
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

export default {
  name: 'main',
  props: ['authenticated', 'currentUser'],
  data () {
    return {
      menuVisible: false,
      savePinDialogControl: false,
      createABoardToAddPinControl: false,
      clickedPin: false,
      pins: {},
      currentBoards: null,
      createBoardTitle: null
    }
  },
  methods: {
    loadPins () {
      user.getAllPins()
      .then((data) => {
        this.pins = data.data
      })
      .catch((err) => console.error(err))
    },
    loadUserBoards () {
      user.getUserBoards()
      .then((data) => {
        this.currentBoards = data.data
      })
      .catch((err) => console.error(err))
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
        saved_by: user.currentUser()
      }
      const board = {
        _id: boardId
      }
      user.addPinToUserBoard(pin, board)
      .then((data) => {
        this.$router.replace(`/${user.getUserProfile()}/dashboard/${data.data.value.title}`)
      })
      .catch((err) => console.error(err))
    },
    toggleCreateABoardDialog (method) {
      this.createABoardToAddPinControl = method
    },
    createABoardToAddPin (boardName) {
      user.createABoard({
        title: boardName,
        owner: user.currentUser()
      }).then((data) => {
        this.savePinToBoard(data.data._id)
      })
    },
    gotoPin (pin) {
      this.$router.replace(`/pins/${pin._id}`)
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.loadPins()
      if (user.currentUser()) {
        user.getUserBoards().then((data) => {
          this.currentBoards = data.data
        }).catch((err) => console.error(err))
      }
    })
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
