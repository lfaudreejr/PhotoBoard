// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import {VueMasonryPlugin} from 'vue-masonry'
import 'vue-material/dist/vue-material.min.css'
import './assets/scss/main.scss'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.css'

Vue.use(VueMaterial)
Vue.use(VueMasonryPlugin)
Vue.use(vue2Dropzone)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
