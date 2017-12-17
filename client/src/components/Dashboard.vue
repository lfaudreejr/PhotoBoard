<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary" md-elevation="0">
        <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">PhotoBoard</span>
        <div class="md-toolbar-section-end">
          <md-button @click="logout">Sign Out</md-button>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span>Navigation</span>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button md-dense" @click="toggleMenu">
              <md-icon>keyboard_arrow_left</md-icon>
            </md-button>
          </div>
        </md-toolbar>

        <md-list>
          <md-list-item to='/'>
            <md-icon>move_to_inbox</md-icon>
            <span class="md-list-item-text">Inbox</span>
          </md-list-item>

          <md-list-item to='/'>
            <md-icon>send</md-icon>
            <span class="md-list-item-text">Sent Mail</span>
          </md-list-item>

          <md-list-item to='/'>
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>

          <md-list-item to='/'>
            <md-icon>error</md-icon>
            <span class="md-list-item-text">Spam</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view :authenticated='authenticated'></router-view>
      </md-app-content>
    </md-app>
  </div>

</template>

<script>
import {logout, authNotifier, authenticated} from '../authentication/AuthService.js'
export default {
  name: 'main',
  data () {
    authNotifier.on('authChange', authState => {
      this.authenticated = authState.authenticated
    })
    return {
      menuVisible: false,
      authenticated
    }
  },
  methods: {
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    },
    logout
  }
}
</script>

<style>
.md-app {
  min-height: 1080px;
  border: 1px solid rgba(#000, .12);
}
.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}
</style>
