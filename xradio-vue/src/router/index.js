import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: function () {
      return import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
    }
  },
  {
    path: '/searchHub',
    name: 'searchHub',
    component: function () {
      return import(/* webpackChunkName: "search" */ '../views/SearchHub.vue')
    }
  },
  {
    path: '/search/:mode/:q',
    name: 'search',
    component: function () {
      return import(/* webpackChunkName: "search" */ '../views/Search.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
