<template>
  <div class="my-24 grid grid-cols-4 gap-4" v-if="typeof tags === 'object' && tags !== null">
    <div class="flex col-span-3 items-center gap-2">
      <span v-for="(tag, id) in articleTags" :key="id">
        <Badge
          :to="`/tags/${tags[tag].slug}`"
          :name="tags[tag].name"
          class="mb-2"
        />
      </span>
    </div>
    <div class="place-self-end self-start">
      <LikeCounter class="hidden lg:flex" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleTags",
  props: {
    articleTags: {
      type: Array,
      required: true,
    },
    tags: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>
