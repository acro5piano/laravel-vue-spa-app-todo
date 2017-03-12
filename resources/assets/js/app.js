import Vue from 'vue'
import VueRouter from 'vue-router'

import { http } from './services/http.js'

require('./bootstrap')

Vue.prototype.$http = http
Vue.use(VueRouter)

Vue.component('navbar', require('./components/Navbar.vue'))

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: require('./components/Welcome.vue') },
    { path: '/login', component: require('./components/Login.vue') },
    { path: '/about', component: require('./components/About.vue') },
  ]
})

const app = new Vue({
  router,
  created () {
    http.init()
    this.getCurrentUser()
  },
  data () {
    return {
      user: {}
    }
  },
  methods: {
    getCurrentUser () {
      this.$http.get('me', res => {
        this.user = res.data.user
      })
    }
  }
}).$mount('#app')
