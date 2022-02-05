<template>
  <AppHead>
    <title>Vue.js 3 Master Class Forum powered by Vite</title>
    <meta name="description" content="An awesome Vue.js 3 powered forum!" />

    <!-- Social -->
    <meta property="og:title" content="Vue.js 3 Master Class Forum" />
    <meta property="og:description" content="An Awesome Vue.js 3 powered forum!" />
    <meta
      property="og:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />

    <!-- Twitter -->
    <meta name="twitter:title" content="Vue.js 3 Master Class Forum" />
    <meta name="twitter:description" content="An Awesome Vue.js 3 powered forum!" />
    <meta
      name="twitter:image"
      content="https://vueschool.io/media/f007f6057444d9a7f567163391d2b366/vuejs-3-master-class-not-transparent.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
  </AppHead>
  <the-nav-bar />
  <div class="container">
    <router-view
      v-show="showPage"
      @ready="onPageReady"
      :key="`${$route.path}${JSON.stringify($route.query)}`"
    />
    <AppSpinner v-show="!showPage" class="spinner" />
  </div>
  <AppNotifications />
</template>

<script>
import AppNotifications from '@/components/AppNotifications.vue'
import TheNavBar from './components/TheNavBar.vue'
import { mapActions } from 'vuex'
import NProgress from 'nprogress'
export default {
  name: 'App',
  components: { TheNavBar, AppNotifications },
  data() {
    return {
      showPage: false,
    }
  },
  methods: {
    ...mapActions('auth', ['fetchAuthUser']),
    onPageReady() {
      this.showPage = true
      NProgress.done()
    },
  },
  created() {
    this.fetchAuthUser()
    NProgress.configure({
      speed: 200,
      showSpinner: false,
    })
    this.$router.beforeEach(() => {
      this.showPage = false
      NProgress.start()
    })
  },
}
</script>

<style>
@import 'assets/style.css';
@import 'nprogress/nprogress.css';
.spinner {
  margin-top: 15px;
}
#nprogress .bar {
  background: #57ad8d !important;
}
</style>
