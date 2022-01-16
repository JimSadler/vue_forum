<template>
  <div class="col-full push-top">
    <form @submit.prevent="save">
      <!-- <div class="form-group">
        <label for="thread_title">Title:</label>
        <input type="text" id="thread_title" class="form-input" name="title" />
      </div> -->

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea
          v-model="postCopy.text"
          id="thread_content"
          class="form-input"
          name="content"
          rows="8"
          cols="140"
        ></textarea>
      </div>

      <div class="form-actions btn-group">
        <button class="btn btn-blue" type="submit" name="Publish">
          {{ post.id ? 'Update Post' : 'Submit Post' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    post: { type: Object, default: () => ({ text: null }) }
  },
  data() {
    return {
      postCopy: { ...this.post }
    }
  },
  methods: {
    save() {
      this.$emit('save', { post: this.postCopy }) // access under eventData.post
      this.postCopy.text = ''
    }
  }
}
</script>

<style></style>
