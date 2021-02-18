<template>
  <div class="mx-auto md:container px-12 lg:px-48 xl:px-75 py-48">
    <SectionArticles v-if="typeof articles === 'object' && articles !== null" :articles="articles" class="mb-8" />
    <SectionTags v-if="typeof tags === 'object' && tags !== null" :tags="tags" />
  </div>
</template>

<script>
export default {
  layout: 'main',
  transition: 'home',
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'createdAt', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags', params.slug)
      .only(['name', 'slug'])
      .sortBy('name', 'asc')
      .fetch()
    return {
      articles,
      tags
    }
  }
}
</script>
<style scoped>
  .home-enter-active, .home-leave-active { transition: opacity .3s; }
  .home-enter, .home-leave-active { opacity: 0; }
</style>
