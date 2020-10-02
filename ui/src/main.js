import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import FamilyView from "@/views/FamilyView.vue"
import LoginView from "@/views/LoginView.vue"
import DBService from "@/services/DBService.js";

// Initialize icon library
library.add(faUser, faLock)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Add vue router
Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/' },
  {
    path: '/',
    component: LoginView,
    name: 'login'

  },
  {
    path: '/family',
    component: FamilyView,
    name: 'family',
    beforeEnter: function (_to, _from, next) {
      if(DBService.store.loggedIn) next()
      else next("/")
    }
  }
]
const router = new VueRouter(
  {
    routes
  }
)

Vue.config.productionTip = false
Vue.prototype.$dbservice = DBService
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
