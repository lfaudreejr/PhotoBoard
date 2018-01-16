<template>
  <div>
    <md-list class="md-double-line">
      <span class="subheading text-center">Comments</span>
      <md-button v-if="authenticated" @click="showSaveCommentModal(true)" class="md-primary">Add Comment</md-button>
      <div v-if="currentComments">
        <md-list-item v-for="c in currentComments" :key="c._id">
          <md-avatar>
            <img :src="c.commentorPicture">
          </md-avatar>
          <div class="md-list-item-text">
            <span>{{c.comment}}</span>
          </div>
          <md-button v-if="currentUser === c.commentor"  class="md-icon-button md-accent" @click="showDeleteCommentConfirm(true)">
            <md-icon>delete</md-icon>
          </md-button>
              <!-- Delete Confirm Modal -->
          <md-dialog-confirm
            :md-active.sync="showDeleteCommentModalControl"
            md-title="Are you sure?"
            md-content="Deleting a comment is permanent."
            md-confirm-text="Delete"
            md-cancel-text="Cancel"
            @md-cancel="showDeleteCommentConfirm(false)"
            @md-confirm="deleteComment(c)"
          ></md-dialog-confirm>
        </md-list-item>
      </div>
    </md-list>

    <!-- Add comment Dialog -->
    <md-dialog :md-active.sync="saveCommentModalControl">
      <md-dialog-title>Add a new comment.</md-dialog-title>
      <md-dialog-content>
        <form>
          <md-field>
            <label>Enter Comment</label>
            <md-input v-model="comment"></md-input>
          </md-field>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="saveComment()">Save</md-button>
        <md-button class="md-primary" @click="showSaveCommentModal(false)">Cancel</md-button>
      </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import * as user from '../core/user-funcs.js'

export default {
  name: 'comments',
  props: [ 'pin', 'comments', 'authenticated' ],
  data () {
    return {
      comment: null,
      saveCommentModalControl: false,
      showDeleteCommentModalControl: false
    }
  },
  computed: {
    userPicture () {
      const profile = JSON.parse(localStorage.getItem('profile'))
      return profile.picture
    },
    currentPin () {
      return this.pin
    },
    currentComments () {
      return this.comments
    },
    currentUser () {
      return user.currentUser()
    }
  },
  methods: {
    saveComment () {
      user.addCommentToPin(
        this.pin._id,
        {
          comment: this.comment,
          commentor: user.currentUser(),
          commentorPicture: this.userPicture
        }
      )
      .then((data) => user.dataEmitter.emit('commentChange', data))
      .catch((err) => console.error(err))

      this.showSaveCommentModal(false)
    },
    deleteComment (c) {
      user.deleteCommentsFromPin(this.pin._id, c._id)
        .then((data) => user.dataEmitter.emit('commentChange', data.data))
        .catch((err) => console.error(err))
    },
    showSaveCommentModal (bool) {
      this.saveCommentModalControl = bool
      this.comment = null
    },
    showDeleteCommentConfirm (bool) {
      this.showDeleteCommentModalControl = bool
    }
  }
}
</script>
