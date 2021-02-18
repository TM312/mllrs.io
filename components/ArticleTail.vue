<template>
  <div>
    <CardRepository :repository="article.repository" />
    <span class="uppercase text-gray-800 tracking-wider font-bold text-ss pr-2 py-1">Tags: </span>
    <span v-for="(tag, id) in article.tags" :key="id" class="mr-2">
      <Badge
        :to="`/tag/${tags[tag].slug}`"
        :name="tags[tag].name"
      />
    </span>
    <div v-if="article.repository" class="uppercase text-gray-800 tracking-wider font-bold text-ss pr-2 py-1">
      <span>Repository:
      </span>
      <a :href="article.repository">Here
      </a>
    </div>
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
