<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <VeeForm @submit="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <AppFormField
          v-model="form.email"
          label="Email"
          name="email"
          rules="required|email"
          type="email"
        />
        <AppFormField
          v-model="form.password"
          label="Password"
          name="password"
          rules="required|min:8"
        />

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{ name: 'Register' }">Create an account?</router-link>
        </div>
      </VeeForm>

      <div class="push-top text-center">
        <button class="btn-red btn-xsmall" @click="signInWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async signIn() {
      try {
        await this.$store.dispatch('auth/signInWithEmailAndPassword', { ...this.form })
        this.successRedirect()
      } catch (error) {
        alert(error.message)
      }
    },
    async signInWithGoogle() {
      await this.$store.dispatch('auth/signInWithGoogle')
      this.successRedirect()
    },
    successRedirect() {
      const redirectTo = this.$route.query.redirectTo || { name: 'Home' }
      this.$router.push(redirectTo)
    },
  },
  created() {
    this.$emit('ready')
  },
}
</script>
