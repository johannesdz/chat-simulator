import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
// import Simulator from '@/views/Simulator.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/simulator',
    name: 'Simulator',
    component: () => import(/* webpackChunkName: "simulator" */ '@/views/Simulator.vue')
    // component: Simulator
  },
  {
    path: '/year',
    name: 'Year',
    component: () => import(/* webpackChunkName: "year" */ '@/views/examples/Year.vue')
    // component: Simulator
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
