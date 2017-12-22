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
    <div md-layout>
      <div class="md-layout-item md-medium-size-33 md-small-size-100">
        <h3>Boards</h3>
        <md-card md-with-hover v-on:click.native="showDialog()" class="board-card">
          <md-ripple>
            <md-card-content>
              <div class="board">
                <md-button class="md-icon-button">
                  <md-icon>add</md-icon>
                </md-button>
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
            <md-button>Create</md-button>
          </md-card>
        </form>
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
    }
  },
  mounted () {
    console.log('mounted')
    return api.get('/api/user/profile').then((data) => console.log(data)).catch((err) => console.error(err))
  }
}
</script>

<style lang="scss" scoped>
.profile {
  padding-left: 5%;
  padding-right: 5%;
  margin: 0 auto;
}
.board-card {
  border-radius: 5%;
  height: 250px;
  width: 250px;
}
.board:hover {
  -moz-transform: scale(1.05);
  -webkit-transform: scale(1.05);
  transform: scale(1.05);
  cursor: pointer;
}
.board {
  height: 235px;
  width: 100%;
  border-radius: 5%
}
.md-icon-button {
  position: relative;
  top: 85px;
  left: 85px;
  background-color: pink;
  color: white;
}
.user-picture {
  width: 175px;
  border-radius: 50%;
}
.md-display-1 {
  margin-left: 1rem;
  color: black;
}
</style>