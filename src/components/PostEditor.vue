<template>
  <div class="col-full push-top">
    <VeeForm @submit="save" :key="formKey">
      <!-- <div class="form-group">
        <label for="thread_title">Title:</label>
        <input type="text" id="thread_title" class="form-input" name="title" />
      </div> -->
      <AppFormField
        as="textarea"
        name="text"
        rules="required"
        rows="10"
        cols="30"
        v-model="postCopy.text"
      />

      <div class="form-actions btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">
          {{ post.id ? 'Update Post' : 'Submit Post' }}
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<script>
import AppFormField from './AppFormField.vue'
export default {
  props: {
    post: { type: Object, default: () => ({ text: null }) },
  },
  data() {
    return {
      postCopy: { ...this.post },
      formKey: Math.random(),
    }
  },
  methods: {
    save() {
      this.$emit('save', { post: this.postCopy }) // access under eventData.post
      this.postCopy.text = ''
      this.formKey = Math.random()
    },
  },
  components: { AppFormField },
}
</script>

<style></style>
