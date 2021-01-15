<template>
  <div>
    <span v-for="(tag, id) in article.tags" :key="id">
      <NuxtLink :to="`/tag/${tags[tag].slug}`">
        <span
          class="truncate uppercase text-green-500 tracking-wider font-medium text-ss pr-2 py-1  mr-2 mb-2 transition-colors duration-300 ease-linear"
        >
          {{ tags[tag].name }}
        </span>
      </NuxtLink>

    </span>
  </div>
</template>

<script>
export default {
  name: 'ArticleTail',
  props: {
    article: {
      type: Object,
      required: true
    },
    tags: {
      type: Object,
      required: true
    }
  }

}
</script>

<style>

</style>
