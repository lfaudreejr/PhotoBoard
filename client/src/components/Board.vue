<template>
  <div class="profile">

    <div class="md-layout md-gutter md-alignment-left-center">
      <div class="md-layout-item md-size-70">
        <p class="md-display-1">{{title}}</p>
      </div>
    </div>

    <div class="md-layout">
      <div class="md-layout-item md-medium-size-33 md-small-size-100">
        <span class="md-subheading">Add pin</span>
        <md-card md-with-hover class="board-card" v-on:click.native="showDialog()">
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
    </div>

    <div v-if="board">
      {{board}}
      <div class="md-layout md-gutter md-alignment-center-center md-primary">
        <div class="md-layout-item" v-for="pin in board.pins" :key="pin">
          {{pin}}
        </div>
      </div>
    </div>

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
          <md-button @click="showDialog(),modal.boardName=''">Cancel</md-button>
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
      board: null,
      modal: {
        url: null,
        description: null
      }
    }
  },
  methods: {
    showDialog () {
      this.showDialogProp = !this.showDialogProp
    },
    addPinToBoard () {}
  },
  mounted () {
    api.get(`/api/boards/${this.$route.params.board}`)
    .then((data) => {
      console.log(data)
      this.board = data.data
    })
    .catch((err) => console.error(err))
  }
}
</script>

<style scoped>
.dialog {
  padding: 15px;
}
</style>
