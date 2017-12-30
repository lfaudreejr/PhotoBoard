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
      <md-dialog-content>
        <!-- show create a board if for saving pin dialog -->
        <div>
          <md-button @click="toggleCreateABoardDialog(true)">Create Board</md-button>
        </div>
        <!-- show users boards -->
        <div v-if="currentBoards" v-for="board in currentBoards" :key="board._id">
          <md-button @click="savePinToBoard(board._id)">{{board.title}}</md-button>
        </div>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showSavePinModal(false)">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
    <!-- create board dialog -->
    <md-dialog :md-active.sync="showCreateBoardDialogControl">
      <md-dialog-title>Create Board</md-dialog-title>
      <md-dialog-content>
        <md-field md-clearable>
          <label for="board-name">Board name</label>
          <md-input name="board-name" v-model="createBoardTitle"></md-input>
        </md-field>
        <md-dialog-actions>
          <md-button v-on:click.native="toggleCreateABoardDialog(false)">Cancel</md-button>
          <md-button v-on:click.native="createABoardToAddPin(createBoardTitle)">Create</md-button>
        </md-dialog-actions>
      </md-dialog-content>
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
      savePinModalControl: false,
      showCreateBoardDialogControl: false,
      confirmDeletePinControl: false,
      createBoardTitle: null,
      currentBoards: null
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
    showConfirmDeletePinModal (method) {
      this.confirmDeletePinControl = method
    },
    toggleCreateABoardDialog (method) {
      this.showCreateBoardDialogControl = method
    },
    savePinToBoard (boardId) {
      const pin = {
        url: this.pin.url,
        description: this.pin.description,
        uploaded_by: this.pin.uploaded_by,
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
    createABoardToAddPin (title) {
      user.createABoard({
        title: title,
        owner: user.currentUser()
      }).then((data) => {
        this.savePinToBoard(data.data._id)
      })
    }
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
    if (user.currentUser()) {
      user.getUserBoards().then((data) => {
        this.currentBoards = data.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.md-layout-item {
  margin: 0 auto;
}
</style>
