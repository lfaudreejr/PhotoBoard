<template>
  <div class="profile">
    <div v-if="loading">
      <md-progress-bar md-mode="query" class="md-accent"></md-progress-bar>
    </div>
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-medium-size-70 md-small-size-75 md-xsmall-size-85">
        <p class="md-display-1">{{username}}</p>
      </div>
      <div class="md-layout-item md-medium-size-30 md-small-size-25 md-xsmall-size-15">
        <img class="user-picture" :src="picture">
      </div>
    </div>

    <div v-masonry transition-duration='0.3s' item-selector='.tile' class="masonry-container">

      <div v-masonry-tile class="tile">
          <md-card md-with-hover v-on:click.native="showCreateBoardDialog(true)" class="board-card">
            <md-card-header>
              <span class="md-subhead">Add new board</span>
            </md-card-header>
            <md-ripple>
              <md-card-content>
                <md-button class="md-icon-button board-button">
                  <md-icon>add</md-icon>
                </md-button>
              </md-card-content>
            </md-ripple>
          </md-card>
      </div>

      <div v-if="userBoards" v-masonry-tile class="tile" v-for="board in userBoards" :key="board._id">
        <md-card md-with-hover class="board">
          <md-ripple v-on:click.native="gotoBoard(board.title)">
            <md-card-header>
              <span class="md-subhead">{{board.title}}</span>
            </md-card-header>
            <md-card-content>
              <div v-masonry
                transition-duration='0.3s'
                item-selector='.inner-tile'  class="masonry-container">
                <div v-masonry-tile
                  class="inner-tile"
                  v-for="pin in board.pins" :key="pin._id">
                  <img :src="pin.url"/>
                </div>
              </div>
            </md-card-content>
          </md-ripple>
          <md-button @click="openBoardEditModal(true), setEditBoard(board)">edit</md-button>
          <md-button class="md-accent" @click="openDeleteConfirmModal(true), setDeletingBoard(board)">Delete</md-button>
        </md-card>
        <!-- Confirm Delete Board MODAL -->
        <md-dialog-confirm
          :md-active.sync="openDeleteDialogProp"
          md-title="Are you sure?"
          md-content="Deleting a board and it's pins is permanent."
          md-confirm-text="Delete"
          md-cancel-text="Cancel"
          @md-cancel="openDeleteConfirmModal(false)"
          @md-confirm="confirmDelete()"
        ></md-dialog-confirm>
      </div>

    </div>

    <!--  MODAL for Creating a Board -->
    <md-dialog :md-active.sync="showCreateBoardDialogProp" class="dialog">
      <div>
        <md-dialog-title>Create Board</md-dialog-title>

        <md-field md-clearable>
          <label for="board-name">Board name</label>
          <md-input name="board-name" id="board-name" v-model="modal.boardName"></md-input>
        </md-field>

        <md-divider></md-divider>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showCreateBoardDialog(false),modal.boardName=''">Cancel</md-button>
          <md-button class="md-primary" @click="createBoard()">Create</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>

    <!-- MODAL for Editing a Board -->
    <md-dialog :md-active.sync="showEditBoardDialogProp" class="dialog">
      <md-dialog-title>Edit board</md-dialog-title>
      <md-dialog-content>
        <md-field md-clearable>
          <label for="new-title">Title</label>
          <md-input name="new-title" v-model="newBoardTitle"></md-input>
        </md-field>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="openBoardEditModal(false)">Cancel</md-button>
        <md-button class="md-primary" @click="submitBoardEdit()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

<script>
import * as user from '../core/user-funcs.js'
import * as auth from '../authentication/AuthService.js'

export default {
  name: 'profile',
  props: ['authenticated', 'isAdmin'],
  data () {
    return {
      loading: false,
      showCreateBoardDialogProp: false,
      showEditBoardDialogProp: false,
      openDeleteDialogProp: false,
      modal: {
        boardName: ''
      },
      boards: null,
      newBoardTitle: null,
      editingBoard: null,
      deletingBoard: null
    }
  },
  computed: {
    username () {
      return auth.getUserProfile().nickname
    },
    picture () {
      return auth.getUserProfile().picture
    },
    userBoards () {
      return this.boards
    }
  },
  methods: {
    showCreateBoardDialog (method) {
      this.showCreateBoardDialogProp = method
    },
    openBoardEditModal (method) {
      this.showEditBoardDialogProp = method
    },
    openDeleteConfirmModal (method) {
      this.openDeleteDialogProp = method
    },
    setEditBoard (board) {
      this.editingBoard = board
    },
    setDeletingBoard (board) {
      this.deletingBoard = board
    },
    confirmDelete () {
      this.loading = true

      user.deleteABoard(this.deletingBoard._id)
      .then((data) => {
        this.getPins()
        .then((data) => {
          this.loading = false
          this.boards = data
          this.editingBoard = null
          this.deletingBoard = null
        })
        .catch((err) => console.error(err))
        this.openBoardEditModal(false)
      })
      .catch((err) => console.error(err))
    },
    createBoard () {
      user.createABoard({title: this.modal.boardName, owner: auth.getUserProfile().id})
      .then((data) => {
        this.$router.push(this.modal.boardName)
      }).catch((err) => {
        console.error(err)
      })
    },
    submitBoardEdit () {
      this.loading = true
      user.updateABoard(this.editingBoard.title, { title: this.newBoardTitle }).then((data) => {
        this.getPins().then((data) => {
          this.loading = false
          this.boards = data
        })
        .catch((err) => console.error(err))
        this.openBoardEditModal(false)
      })
      .catch((err) => console.error(err))
      this.newBoardTitle = null
    },
    gotoBoard (boardName) {
      this.$router.push({name: 'Board', params: { board: boardName }})
    },
    getBoards () {
      return user.getUserBoards()
    },
    getPins () {
      const pins = user.getUserPins()
      return pins.then((data) => {
        let newData = data.map(board => {
          if (board.pins.length - 1 > 5) {
            board.pins = board.pins.slice(0, 5)
          }
          return board
        })
        return newData
      }).catch(err => console.error(err))
    },
    fetchData () {
      this.loading = true
      this.getPins().then(data => {
        this.boards = data
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.error(err)
      })
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

<style lang="scss" scoped>
.user-picture {
  width: 175px;
  border-radius: 50%;
}
.md-display-1 {
  margin-left: 1rem;
}
.dialog {
  padding: 15px;
}
.masonry-container {
  width: 90%;
  margin: 0 auto;
}
</style>
