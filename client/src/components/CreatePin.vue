<template>
  <div>
    <div v-masonry-tile class="tile">
      <md-card
        md-with-hover
        class="board-card"
        v-on:click.native="showLinkModal(true)"
        >
        <md-ripple>
          <md-card-header>
            <span class="md-subhead">Add pin to {{board.title}}</span>
          </md-card-header>
          <md-card-content>
            <md-button class="md-icon-button board-button">
              <md-icon>add</md-icon>
            </md-button>
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>

    <!--  MODAL for Creating a Pin -->
    <md-dialog
      :md-active.sync="showLinkModalProp"
      class="dialog">
      <div>
        <md-dialog-content>
          <md-field md-clearable>
            <label for="pin-uri">Enter Image Url</label>
            <md-input
              :disabled="fileAdded"
              name="pin-uri"
              v-model="linkModal.url"/>
          </md-field>
          <md-field>
            <label for="pin-description">Enter a description</label>
            <md-textarea
              name="pin-description"
              v-model="linkModal.description"
            ></md-textarea>
          </md-field>
        </md-dialog-content>

        <md-divider></md-divider>
        <md-dialog-actions>
          <md-button
            class="md-accent"
            @click="showDropModal(true), showLinkModal(false)"
          >
            Upload An Image
          </md-button>
          <md-button
            class="md-primary"
            @click="showLinkModal(false)"
            >
            Cancel
          </md-button>
          <md-button
            class="md-primary"
            @click="createPinByLink()"
            >
            Save Pin
          </md-button>
        </md-dialog-actions>
      </div>
    </md-dialog>

    <md-dialog
      :md-active.sync="showDropModalProp"
      class="modal">
      <md-dialog-content>
        <vue-dropzone
          ref="myVueDropzone"
          id="dropzone"
          :options="dropzoneOptions"
          @vdropzone-file-added="vfileAdded"
          >
        </vue-dropzone>
      </md-dialog-content>
        <md-dialog-actions>
          <md-button
            class="md-accent"
            @click="showDropModal(false), showLinkModal(true)"
          >
            Link Image
          </md-button>
          <md-button
            class="md-primary"
            @click="showDropModal(false)"
          >
            Cancel
          </md-button>
          <md-button
            class="md-primary"
            @click="createPinByUpload()"
          >
            Save Pin
          </md-button>
        </md-dialog-actions>
    </md-dialog>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import * as user from '../core/user-funcs.js'

export default {
  name: 'CreatePin',
  components: {
    vueDropzone: vue2Dropzone
  },
  props: {
    board: {
      type: Object
    }
  },
  data () {
    return {
      linkModal: {
        url: '',
        description: '',
        boardName: ''
      },
      showLinkModalProp: false,
      showDropModalProp: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        // thumbnailWidth: 200,
        resizeMimeType: 'image/jpeg',
        maxFilesize: 0.5,
        addRemoveLinks: true,
        headers: { 'My-Awesome-Header': 'header value' },
        accept (file, done) {
          console.log(file)
          done()
        }
      },
      fileAdded: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    showLinkModal (method) {
      this.showLinkModalProp = method
    },
    showDropModal (method) {
      this.showDropModalProp = method
    },
    loadedFile () {
      return this.$refs.myVueDropzone.getAcceptedFiles()
    },
    vfileAdded (file) {
      this.fileAdded = true
      // window.toastr.info('', 'Event : vdropzone-file-added')
    },
    createPinByLink () {
      this.showLinkModal(false)
      const pin = {
        url: this.linkModal.url,
        description: this.linkModal.description,
        uploaded_by: user.currentUser(),
        saved_by: user.currentUser()
      }
      const board = {
        _id: this.board._id
      }
      user.addPinToUserBoard(pin, board)
      .then((data) => {
        this.linkModal.url = null
        this.linkModal.description = null
        user.dataEmitter.emit('pinSaved')
      })
      .catch((err) => console.error(err))
    },
    createPinByUpload () {
      this.showDropModal(false)
    }
  }
}
</script>

<style>

</style>
