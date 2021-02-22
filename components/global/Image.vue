<template>
  <img :src="dynamicImage" :alt="imageAlt" class="mt-1 mb-3 rounded">
</template>

<script>
export default {
  name: 'Image',
  props: {
    file: {
      type: String,
      required: true
    },
    postName: {
      type: String,
      required: true
    },
    imageAlt: {
      type: String,
      default: ''
    }
  },
  computed: {
    dynamicImage () {
      return require(`~/assets/images/${this.postName}/${this.file}`)
    }
  }
}
</script>
