<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <VeeForm @submit="register" class="card card-form">
        <h1 class="text-center">Register</h1>

        <AppFormField v-model="form.name" label="Name" name="name" rules="required" />
        <AppFormField v-model="form.username" label="Username" name="username" rules="required" />
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

        <div class="form-group">
          <label for="avatar"
            >Avatar
            <div v-if="avatarPreview">
              <img :src="avatarPreview" alt="" class="avatar-xlarge" />
            </div>
          </label>
          <VeeField
            name="avatar"
            v-show="!avatarPreview"
            id="avatar"
            type="file"
            class="form-input"
            @change="handleImageUpload"
            accept="image/*"
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-blue btn-block">Register</button>
        </div>
      </VeeForm>
      <div class="text-center push-top">
        <button class="btn-red btn-xsmall" @click="registerWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign up with Google
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import AppFormField from '../AppFormField.vue'
export default {
  data() {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        password: '',
        avatar: '',
        avatarPreview: null,
      },
    }
  },
  methods: {
    async register() {
      await this.$store.dispatch('auth/registerUserWithEmailAndPassword', this.form)
      this.$router.push('/')
    },
    async registerWithGoogle() {
      await this.$store.dispatch('auth/signInWithGoogle')
      this.$router.push('/')
    },
    handleImageUpload(e) {
      this.form.avatar = e.target.files[0]
      const reader = new FileReader()
      reader.onload = event => {
        this.avatarPreview = event.target.result
      }
      reader.readAsDataURL(this.form.avatar)
    },
  },
  created() {
    this.$emit('ready')
  },
  components: { AppFormField },
}
</script>
