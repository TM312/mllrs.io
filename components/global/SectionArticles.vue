<template>
  <div>
    <ul>
      <li
        v-for="article of articles"
        :key="article.slug"
        class="mb-1.5"
      >
        <NuxtLink
          :to="`/article/${article.slug}`"
        >
          <span v-if="!!article && article.title" class="text-gray-800 font-semibold hover:text-purple-800 text-lg">
            {{ capitalize(article.title) }}
          </span>
          <span class="text-gray-500 font-medium text-lg">
            | {{ formatDate(article.createdAt) }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SectionArticles',
  props: {
    articles: {
      type: [Object, Array],
      required: true
    }
  }

}
</script>

<style>

</style>
