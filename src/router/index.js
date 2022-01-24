import Home from '@/components/pages/Home'
import ThreadShow from '@/components/pages/ThreadShow'
import ThreadCreate from '@/components/pages/ThreadCreate'
import ThreadEdit from '@/components/pages/ThreadEdit'
import NotFound from '@/components/pages/NotFound'
import Forum from '@/components/pages/Forum'
import Category from '@/components/pages/Category'
import Register from '@/components/pages/Register'
import SignIn from '@/components/pages/SignIn'
import { createRouter, createWebHistory } from 'vue-router'
import Profile from '@/components/pages/Profile'
import { findById } from '@/helpers'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile,
    meta: { toTop: true, smoothScroll: true, requiresAuth: true }
  },
  {
    path: '/me/edit',
    name: 'ProfileEdit',
    component: Profile,
    props: { edit: true },
    meta: { requiresAuth: true }
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: Category,
    props: true
  },
  {
    path: '/forum/:id',
    name: 'Forum',
    component: Forum,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'ThreadShow',
    component: ThreadShow,
    props: true,
    async beforeEnter(to, from, next) {
      await store.dispatch('fetchThread', { id: to.params.id })
      // check if thread exists
      const threadExists = findById(store.state.threads, to.params.id)
      // if it exists continue
      if (threadExists) {
        return next()
      } else {
        next({
          name: 'NotFound',
          // preserve current path and remove the first char to avoid the target URL starting with `//`
          params: { pathMatch: to.path.substring(1).split('/') },
          // preserve existing query and hash if any
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/forum/:forumId/thread/create',
    name: 'ThreadCreate',
    component: ThreadCreate,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/thread/:id/edit',
    name: 'ThreadEdit',
    component: ThreadEdit,
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: { requiresGuest: true }
  },
  {
    path: '/logout',
    name: 'SignOut'
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    const scroll = {}
    if (to.meta.toTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
router.beforeEach(async (to, from) => {
  await store.dispatch('initAuthentication')
  console.log(`🚦 navigating to ${to.name} from ${from.name}`)
  store.dispatch('unsubscribeAllSnapshots')
  if (to.meta.requiresAuth && !store.state.authId) {
    return { name: 'SignIn', query: { redirectTo: to.path } }
  }
  if (to.meta.requiresGuest && store.state.authId) {
    return { name: 'Home' }
  }
})
export default router
