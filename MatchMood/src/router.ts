import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'

import Page1 from './pages/Page1.vue'
import User from './pages/user/User.vue'

const routes = [
  { path: '/', component: Page1 },
  {
    path: '/user',
    component: User,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ) => {
      console.log(to, from)
      return true
    },
    children: [
      { path: '/', component: User },
      { path: 'profile', component: User },
      { path: 'addReminder', component: User },
      { path: ':reminderId', component: User },
    ],
  },
  {
    path: '/auth',
    component: User,
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ) => {
      console.log(to, from)
      return true
    },
    children: [
      { path: '/login', component: User },
      { path: '/signup', component: User },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
