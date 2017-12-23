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
    <div class="md-layout md-gutter md-alignment-top-center">
      <div class="md-layout-item md-medium-size-30 md-small-size-100">
        <h3>Add new board</h3>
          <md-card md-with-hover v-on:click.native="showDialog()" class="board-card">
            <md-ripple>
              <md-card-content>
                <div class="board">
                  <md-button class="md-icon-button board-button">
                    <md-icon>add</md-icon>
                  </md-button>
                </div>
              </md-card-content>
            </md-ripple>
          </md-card>
      </div>
      <div v-if="boards" class="md-layout-item md-medium-size-30  md-small-size-100" v-for="board in boards" :key="board.title">
        <h3>{{board.title}}</h3>
        <md-card md-with-hover v-on:click.native="gotoBoard(board.title)" class="board-card">
          <md-ripple>
            <md-card-content>
              <div class="board">
                <div class="blank-board"></div>
              </div>
            </md-card-content>
          </md-ripple>
        </md-card>
      </div>
    </div>

    <!--  MODAL for Creating a Board -->
    <md-dialog :md-active.sync="showDialogProp" class="dialog">
      <div>
        <md-dialog-title>Create Board</md-dialog-title>

        <md-field md-clearable>
          <label for="board-name">Board name</label>
          <md-input name="board-name" id="board-name" v-model="modal.boardName"></md-input>
        </md-field>

        <md-divider></md-divider>
        <md-dialog-actions>
          <md-button @click="showDialog(),modal.boardName=''">Cancel</md-button>
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
      showDialogProp: false,
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
    }
  },
  methods: {
    showDialog () {
      this.showDialogProp = !this.showDialogProp
    },
    createBoard () {
      api.post('/api/boards', {title: this.modal.boardName, owner: api.getId()}).then((data) => {
        this.$router.push(this.modal.boardName)
      }).catch((err) => {
        console.error(err)
      })
    },
    gotoBoard (boardName) {
      console.log(boardName)
      this.$router.push({name: 'Board', params: { board: boardName }})
    }
  },
  mounted () {
    console.log('mounted')
    api.get('/api/user/profile')
    .then((data) => {
      console.log(data)
      this.boards = data.data
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
