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
      <div class="md-layout-item md-medium-size-15 md-small-size-100">
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
      <div v-if="profile.boards" class="md-layout-item md-medium-size-15  md-small-size-100" v-for="board in profile.boards" :key="board.name">
        <h3>{{board.name}}</h3>
        <md-card md-with-hover v-on:click.native="gotoBoard(board.name)" class="board-card">
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
    <md-dialog :md-active.sync="showDialogProp">
      <div>
        <form class="md-layout-row">
          <md-card class="md-flex-50 md-flex-small-100">
            <md-card-header>
              <div class="md-title">Create Board</div>
            </md-card-header>

            <md-divider></md-divider>

            <md-card-content>
              <div class="md-layout-row md-layout-wrap md-gutter">
                <div class="md-flex md-flex-small-100">
                  <md-field>
                    <label for="board-name">Board name</label>
                    <md-input name="board-name" id="board-name" v-model="modal.boardName"></md-input>
                  </md-field>
                </div>
              </div>
            </md-card-content>

            <md-divider></md-divider>

            <md-button @click="showDialog(), modal.boardName=''">Cancel</md-button>
            <md-button @click="createBoard()">Create</md-button>
          </md-card>
        </form>
      </div>
    </md-dialog>
    {{profile}}
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
      profile: {
        boards: null
      }
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
      api.post('/api/boards', {name: this.modal.boardName, user: api.getProfile()}).then((data) => {
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
    return api.get('/api/user/profile')
    .then((data) => {
      this.profile = data.data
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
  color: black;
}
.blank-board {
  background-color: pink;
  height: 95%;
  width: 100%;
  border-radius: 5%;
}
</style>
