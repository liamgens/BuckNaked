import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import Achievements from '../components/Achievements'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/achievements',
    component: Achievements
  }
]

export default new Router({
  routes
})
