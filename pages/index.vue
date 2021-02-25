<template>
  <div class="mx-auto md:container px-12 lg:px-48 xl:px-75 py-48">
    <SectionArticles v-if="typeof articles === 'object' && articles !== null" :articles="articles" class="mb-16" />
    <SectionTags v-if="typeof tags === 'object' && tags !== null" :tags="tags" />
    <Banner />
  </div>
</template>

<script>
export default {
  layout: 'main',
  transition: 'home',
  async asyncData ({ $content }) {
    const articles = await $content('articles')
      .only(['title', 'createdAt', 'slug', 'published'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags')
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
