import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import FontAwesome from '@/plugins/FontAwesome.js'
import ClickOutsideDirective from '@/plugins/ClickOutsideDirective'
import PageScrollDirective from './plugins/PageScrollDirective'
import Vue3Pagination from './plugins/Vue3Pagination'
import VeeValidatePlugin from './plugins/VeeValidatePlugin'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.use(FontAwesome)
forumApp.use(ClickOutsideDirective)
forumApp.use(PageScrollDirective)
forumApp.use(Vue3Pagination)
forumApp.use(VeeValidatePlugin)

const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName =
    baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  forumApp.component(baseComponentName, baseComponentConfig)
})

forumApp.mount('#app')
