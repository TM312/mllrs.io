<template>
  <div class="m-8">
    <SectionArticles :articles="articles" class="mb-8" />
    <SectionTags :tags="tags" />
  </div>
</template>

<script>
export default {
  layout: 'main',
  async asyncData ({ $content, params }) {
    const articles = await $content('articles', params.slug)
      .only(['title', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
    const tags = await $content('tags', params.slug)
      .only(['name', 'description', 'img', 'slug'])
      .sortBy('createdAt', 'asc')
      .fetch()
    return {
      articles,
      tags
    }
  }
}
</script>
