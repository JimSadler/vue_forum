<template>
  <div class="text-center" style="margin-bottom: 15px">
    <button class="btn-green btn-xsmall" @click.prevent="getRandomImage">Random Avatar</button>
    <br />
    <small style="opacity: 0.5">Powered by <a href="https://pixabay.com">Pixabay</a></small>
  </div>
</template>
<script>
import { arrayRandom } from '@/helpers'
export default {
  methods: {
    async getRandomImage() {
      const searchTerms = [
        // 'cats',
        // 'dogs',
        'abstract',
        // 'cars',
        'mountains',
        'beach',
        'landscape',
        'code',
        'space',
        'jazz',
        'guitar',
        'music',
        'star wars',
        'star trek',
      ]
      const randomWord = arrayRandom(searchTerms)
      const res = await fetch(
        `https://pixabay.com/api/?key=25542908-10c0e2e77e560baada5bea814&q=${randomWord}`
      )
      const data = await res.json()
      const randomImage = arrayRandom(data.hits)
      this.$emit('hit', randomImage.webformatURL)
    },
  },
}
</script>
