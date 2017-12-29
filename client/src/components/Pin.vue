<template>
  <div class="md-layout md-gutter">
    <div class="md-layout-item md-size-50 md-xsmall-size-100 md-alignment-top-space-around">
      <md-card v-if="pin">
        <md-card-media>
          <img :src='pin.url' :alt="pin.description"/>
        </md-card-media>
        <md-card-area>
          <md-card-content>
            {{pin.description}}
          </md-card-content>
          <!-- show if current pin owner -->
          <md-card-actions v-if="currentUser === pin.saved_by">
            <md-button class="md-icon-button" @click="deletePinFromBoard(pin._id)">
              <md-icon>delete</md-icon>
            </md-button>
            <md-button class="md-icon-button" @click.native="showEditPinModal(true)">
              <md-icon>edit</md-icon>
            </md-button>
          </md-card-actions>
          <!-- Show if not the current pin owner -->
          <md-card-actions v-if="authenticated && currentUser !== pin.saved_by">
            <md-button class="md-icon-button" @click="showSavePinModal(true)">
              <md-icon>bookmark</md-icon>
            </md-button>
          </md-card-actions>
        </md-card-area>
      </md-card>
    </div>
    <!-- show modal to edit pin -->
    <md-dialog :md-active.sync="editPinModalControl" class="dialog">
      <md-dialog-title>Edit Pin</md-dialog-title>
      <md-dialog-actions>
        <md-button @click="showEditPinModal(false)">Cancel</md-button>
        <md-button @click="submitEdit()">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- show modal to add pin to user board if not already -->
    <md-dialog :md-active.sync="savePinModalControl" class="dialog">
      <md-dialog-title>Select a board to save pin to.</md-dialog-title>
      <md-dialog-actions>
        <md-button @click="showSavePinModal(false)">Cancel</md-button>
        <md-button @click="submitSave()">Submit</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import * as user from '../core/user-funcs.js'

export default {
  name: 'pin',
  props: ['authenticated'],
  data () {
    return {
      pin: null,
      editPinModalControl: false,
      savePinModalControl: false
    }
  },
  methods: {
    deletePinFromBoard (_id) {
      user.deleteAPinFromABoard(_id)
      .then((data) => {
        this.$router.replace('/')
      })
      .catch((err) => console.error(err))
    },
    showEditPinModal (method) {
      this.editPinModalControl = method
    },
    showSavePinModal (method) {
      this.savePinModalControl = method
    },
    savePin () {}, // TODO:
    showBoards () {} // TODO:
  },
  computed: {
    currentUser () {
      return user.currentUser()
    }
  },
  mounted () {
    user.getAPinById(this.$route.params.id)
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
