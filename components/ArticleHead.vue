<template>
  <div>
    <img
      :src="article.img"
      :alt="article.alt"
      class="h-64 rounded"
    >
    <div class="mt-16 -mb-3 flex text-md">
      <span class="mr-2">
        {{ formatDate(article.createdAt) }}
      </span>
      <span v-if="!!article.updatedAt && formatDate(article.createdAt) !== formatDate(article.updatedAt)" class="mx-2 text-gray-500">•</span>
      <span v-if="!!article.updatedAt && formatDate(article.createdAt) !== formatDate(article.updatedAt)" class="mx-2 text-gray-500">
        <i>edited: </i>{{ formatDate(article.updatedAt) }}
      </span>
      <!-- <span v-if="!!article.series" class="mx-2 text-gray-500">•</span>
        <span v-if="!!article.series" class="mx-2 text-gray-500">
          {{ series[article.series].name }}
        </span> -->
    </div>

    <div class="mt-24">
      <div v-if="!!series && series[article.series].name" class="block uppercase text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
        {{ capitalize(series[article.series].name) }}
      </div>
      <span v-if="!!article && article.title" class="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
        {{ capitalize(article.title) }}
        <span /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleHead',
  props: {
    article: {
      type: Object,
      required: true
    },
    series: {
      type: Object,
      required: false,
      default: null
    }
  }

}
</script>

<style>

</style>
