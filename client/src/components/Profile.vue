<template>
  <div class="profile">
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-size-70">
        <p class="md-display-1">{{username}}</p>
      </div>
      <div class="md-layout-item">
        <img class="user-picture" :src="picture">
      </div>
    </div>

    <div v-masonry transition-duration='0.3s' item-selector='.tile'>

      <div v-masonry-tile md-with-hover class="tile">
          <md-card md-with-hover v-on:click.native="showDialog()" class="board-card">
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

      <div v-if="userBoards" v-masonry-tile md-with-hover class="tile" v-for="board in userBoards" :key="board.title">
        <md-card md-with-hover class="board">
          <md-ripple v-on:click.native="gotoBoard(board.title)">
            <md-card-header>
              <span class="md-subhead">{{board.title}}</span>
            </md-card-header>
            <md-card-content>
              <div v-masonry item-selector='.inner-tile'>
                <div v-masonry-tile class="inner-tile" v-for="pin in board.pins" :key="pin._id">
                  <img :src="pin.url"/>
                </div>
              </div>
            </md-card-content>
          </md-ripple>
          <md-button @click="openBoardEditModal()">edit</md-button>
        </md-card>
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
          <md-button @click="showCreateBoardDialog(),modal.boardName=''">Cancel</md-button>
          <md-button @click="createBoard()">Create</md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>
  </div>
</template>

<script>
import * as api from '../api'

export default {
  name: 'profile',
  data () {
    return {
      showCreateBoardDialogProp: false,
      modal: {
        boardName: ''
      },
      boards: null
    }
  },
  computed: {
    username () {
      return JSON.parse(localStorage.getItem('profile')).name
    },
    picture () {
      return JSON.parse(localStorage.getItem('profile')).picture
    },
    userBoards () {
      return this.boards
    }
  },
  methods: {
    showCreateBoardDialog () {
      this.showCreateBoardDialogProp = !this.showCreateBoardDialogProp
    },
    openBoardEditModal () {}, // TODO:
    createBoard () {
      api.post('/api/boards', {title: this.modal.boardName, owner: api.getId()}).then((data) => {
        this.$router.push(this.modal.boardName)
      }).catch((err) => {
        console.error(err)
      })
    },
    gotoBoard (boardName) {
      this.$router.push({name: 'Board', params: { board: boardName }})
    },
    getBoards () {
      return api.get('/api/user/profile')
    },
    getPins () {
      if (this.boards) {
        let newBoardsArray = []
        this.boards.forEach(board => {
          newBoardsArray.push(api.get(`/api/boards/${board.title}`))
        })
        Promise.all(newBoardsArray)
        .then((data) => {
          let newBoards = data.map((newData) => {
            return newData.data
          })
          this.boards = newBoards
        })
        .catch((err) => console.error(err))
      }
    }
  },
  mounted () {
    this.getBoards()
    .then((data) => {
      this.boards = data.data
      this.getPins()
    })
    .catch((err) => console.error(err))
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
</style>
