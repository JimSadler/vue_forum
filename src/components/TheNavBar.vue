<template>
  <header class="header" id="header">
    <router-link :to="{ name: 'Home' }" class="logo">
      <img src="../assets/svg/vueschool-logo.svg" alt="Vue School Homepage" />
    </router-link>

    <!-- <div class="btn-hamburger" @click="mobileNavMenu = !mobileNavMenu"> -->
    <!-- use .btn-humburger-active to open the menu -->
    <!-- <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div> -->

    <!-- use .navbar-open to open nav -->
    <nav class="navbar">
      <ul>
        <li v-if="authUser" class="navbar-user">
          <router-link :to="{ name: 'Profile' }">
            <img
              class="avatar-small"
              :src="authUser.avatar"
              :alt="`${authUser.name} profile picture`"
            />
            <span>
              {{ authUser.name }}
            </span>
          </router-link>

          <!-- dropdown menu -->
          <!-- add class "active-drop" to show the dropdown -->
          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{ name: 'Profile' }"
                  >View profile</router-link
                >
              </li>
              <li class="dropdown-menu-item">
                <a>
                  Sign Out
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <a>Sign In</a>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <a>Register</a>
        </li>
        <li v-if="authUser" class="navbar-mobile-item">
          <a>View Profile</a>
        </li>
        <li v-if="authUser" class="navbar-mobile-item">
          <a> Sign Out</a>
        </li>
      </ul>

      <!--      <ul>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="index.html">Home</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="category.html">Category</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="forum.html">Forum</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="thread.html">Thread</a>-->
      <!--        </li>-->
      <!--        &lt;!&ndash; Show these option only on mobile&ndash;&gt;-->
      <!--        <li class="navbar-item mobile-only">-->
      <!--          <a href="profile.html">My Profile</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item mobile-only">-->
      <!--          <a href="#">Logout</a>-->
      <!--        </li>-->
      <!--      </ul>-->
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      userDropdownOpen: false,
      mobileNavMenu: false
    }
  },
  computed: {
    ...mapGetters(['authUser'])
  }

  //   created () {
  //     this.$router.beforeEach((to, from) => {
  //       this.mobileNavMenu = false
  //     })
  //   }
}
</script>

<style scoped>
header > a.logo {
  width: 100%;
}
</style>
