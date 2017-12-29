<template>
  <div class="profile">

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
                <md-button class="md-icon-button" @click="deletePinFromBoard(pin._id)">
                  <md-icon>delete</md-icon>
                </md-button>
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
import * as api from '../api'

export default {
  name: 'board',
  data () {
    return {
      showDialogProp: false,
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
    addPinToBoard () {
      this.showDialog(false)
      api.post('/api/pins/add', {
        pin: {
          url: this.modal.url,
          description: this.modal.description,
          uploaded_by: api.getId(),
          saved_by: api.getId()
        },
        board: {
          _id: this.board._id
        }
      })
      .then((data) => {
        this.modal.url = null
        this.modal.description = null
        this.getPins()
      })
      .catch((err) => console.error(err))
    },
    gotoPin (pin) {
      this.$router.replace(`/pins/${pin._id}`)
    },
    getPins () {
      api.get(`/api/boards/${this.$route.params.board}`)
      .then((data) => {
        this.board = data.data
      })
      .catch((err) => console.error(err))
    },
    deletePinFromBoard (_id) {
      api.destroy(`/api/pins/${_id}`)
      .then((data) => {
        this.getPins()
      })
      .catch((err) => console.error(err))
    }
  },
  mounted () {
    this.getPins()
  },
  updated () {
    this.$redrawVueMasonry()
  }
}
</script>

<style scoped>
.dialog {
  padding: 15px;
}
</style>
