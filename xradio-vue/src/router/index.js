import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'

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
      return import(/* webpackChunkName: "about" */ '../views/about.vue')
    }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: function () {
      return import(/* webpackChunkName: "favorites" */ '../views/favorites.vue')
    }
  },
  {
    path: '/searchHub',
    name: 'searchHub',
    component: function () {
      return import(/* webpackChunkName: "search" */ '../views/searchHub.vue')
    }
  },
  {
    path: '/search/:mode/:q',
    name: 'search',
    component: function () {
      return import(/* webpackChunkName: "search" */ '../views/search.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  saveScrollPosition: false,
  base: process.env.BASE_URL,
  routes
})

export default router
