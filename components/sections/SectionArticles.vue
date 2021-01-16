<template>
  <div>
    <h1 class="font-bold text-4xl">
      Articles
    </h1>
    <ul>
      <li
        v-for="article of articles"
        :key="article.slug"
      >
        <NuxtLink
          :to="`/article/${article.slug}`"
        >
          <p class="text-gray-800 font-medium hover:text-purple-800">
            {{ article.title }}
          </p>
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
