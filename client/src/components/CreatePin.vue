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

    <!--  MODAL for Creating a Pin via img link -->
    <md-dialog
      :md-active.sync="showLinkModalProp"
      class="dialog">
      <div>
        <md-dialog-content>
          <md-field md-clearable>
            <label for="pin-uri">Enter Image Url</label>
            <md-input
              name="pin-uri"
              @input="$v.linkModal.url.$touch()"
              v-model="linkModal.url"/>
          </md-field>
          <md-field>
            <label for="pin-description">Enter a description</label>
            <md-textarea
              name="pin-description"
              v-model="linkModal.description"
            ></md-textarea>
          </md-field>

          <md-divider></md-divider>
          <md-dialog-actions>
            <!-- <md-button
              @click="showDropModal(true), showLinkModal(false)"
            >
              Upload An Image
            </md-button> -->
            <md-button
              class="md-primary"
              @click="showLinkModal(false)"
              >
              Cancel
            </md-button>
            <md-button
              :disabled="$v.linkModal.url.$invalid"
              class="md-primary"
              @click="createPinByLink()"
              >
              Save Pin
            </md-button>
          </md-dialog-actions>
        </md-dialog-content>
      </div>
    </md-dialog>
    <!--  MODAL for Creating a Pin via img file drop -->
    <!-- <md-dialog
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

        <md-dialog-actions>
          <md-button
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
      </md-dialog-content>
    </md-dialog> -->
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone'
import { required, url } from 'vuelidate/lib/validators'
import * as user from '../core/user-funcs.js'
import * as auth from '../authentication/AuthService.js'

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
  validations: {
    linkModal: {
      url: {
        required,
        url
      }
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
        uploaded_by: auth.getUserProfile().id,
        saved_by: auth.getUserProfile().id
      }
      const board = {
        _id: this.board._id
      }
      this.clearModal()
      user.addPinToUserBoard(pin, board)
      .then((data) => {
        user.dataEmitter.emit('pinSaved')
      })
      .catch((err) => console.error(err))
    },
    createPinByUpload () {
      this.showDropModal(false)
    },
    clearModal () {
      this.linkModal.url = ''
      this.linkModal.description = ''
      this.linkModal.boardName = ''
    }
  }
}
</script>

<style>

</style>
