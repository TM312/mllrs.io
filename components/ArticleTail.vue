<template>
  <div>
    <!-- <span class="uppercase text-gray-800 tracking-wider font-bold text-ss pr-2 py-1">Tags: </span> -->
    <span v-if="typeof tags === 'object' && tags !== null">
      <span v-for="(tag, id) in article.tags" :key="id" class="mr-2">
        <Badge
          :to="`/tag/${tags[tag].slug}`"
          :name="tags[tag].name"
          class="mb-2"
        />
      </span>
    </span>

    <CardRepository :repository="article.repository" class="mt-4 lg:mt-8" />

    <LikeCounter class="hidden lg:flex mt-8 lg:mt-12" />
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
