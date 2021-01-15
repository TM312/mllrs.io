<template>
  <div>
    <h1 class="font-bold text-4xl">
      Posts
    </h1>
    <ul>
      <li
        v-for="article of articles"
        :key="article.slug"
      >
        <NuxtLink
          :to="`/article/${article.slug}`"
        >
          {{ article.title }}
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
