import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieComp from '../views/MovieComp.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/movie/:id',
     name: 'movie detail',
    component: MovieComp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
