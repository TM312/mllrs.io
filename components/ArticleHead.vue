<template>
  <div>
    <img
      :src="article.img"
      :alt="article.alt"
      class="h-64 rounded"
    >
    <div class="mt-16 -mb-3 flex text-sm">
      <p class="mr-2">
        {{ formatDate(article.createdAt) }}
      </p>
      <span v-if="!!article.updatedAt && article.createdAt !== article.updatedAt" class="mx-2 text-gray-500">•</span>
      <span v-if="!!article.updatedAt && article.createdAt !== article.updatedAt" class="mx-2 text-gray-500">
        <i>edited: </i>{{ formatDate(article.createdAt) }}
      </span>
      <!-- <span v-if="!!article.series" class="mx-2 text-gray-500">•</span>
        <span v-if="!!article.series" class="mx-2 text-gray-500">
          {{ series[article.series].name }}
        </span> -->
    </div>

    <div class="mt-24">
      <div v-if="!!article.series" class="block uppercase text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
        {{ series[article.series].name }}
      </div>
      <h1 class="text-5xl text-center font-bold">
        {{ article.title }}
      </h1>

      <!-- <h6 v-if="!!article.series" class="text-indigo-500">
        <NuxtLink :to="`/series/${series[article.series].slug}`">
          <span
            class="truncate uppercase text-green-500 tracking-wider font-medium text-ss px-2 py-1  mr-2 mb-2 transition-colors duration-300 ease-linear"
          >
            {{ series[article.series].name }}
          </span>
        </NuxtLink>
      </h6> -->
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
      required: true
    }
  }

}
</script>

<style>

</style>
