import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
} from 'vue-router'

const Home = () => import('@/pages/Home.vue')
const User = () => import('@/pages/user/User.vue')
const Profile = () => import('@/pages/user/Profile.vue')
const AddReminder = () => import('@/pages/user/AddReminder.vue')
const ReminderList = () => import('@/pages/user/ReminderList.vue')
const ReminderDetail = () => import('@/pages/user/ReminderDetail.vue')
const Login = () => import('@/pages/guest/Login.vue')
const Signup = () => import('@/pages/guest/Signup.vue')
const Statistics = () => import('@/pages/user/Statistics.vue')

const routes = [
  { path: '/', component: Home },
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
      { path: '/', component: Statistics },
      { path: 'profile', component: Profile },
      { path: 'addReminder', component: AddReminder },
      { path: 'reminderList', component: ReminderList },
      { path: ':reminderId', component: ReminderDetail },
    ],
  },
  {
    path: '/auth',
    component: Home,

    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: (location?: string | false | void) => void
    ) => {
      const isLoggedIn = !!localStorage.getItem('accessToken')

      if (isLoggedIn) {
        next('/dashboard')
      } else if (to.path === '/auth') {
        next('/auth/login')
      } else {
        next()
      }
    },
    children: [
      { path: 'login', component: Login },
      { path: 'signup', component: Signup },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
