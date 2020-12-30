import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // todo
  // {
  //   path: '/members',
  //   name: 'Members',
  //   component: () => import(/* webpackChunkName: "members" */ '../views/Members.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
