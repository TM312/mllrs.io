<template>
  <div>
    <h3 class="mb-4 font-bold text-2xl uppercase">
      Tags
    </h3>
    <span
      v-for="tag of tags"
      :key="tag.slug"
      class="mr-2"
    >
      <Badge
        :to="`/tag/${tag.slug}`"
        :name="tag.name"
        class="mb-1.5"
      />
    </span>
  </div>
</template>

<script>
export default {
  name: 'SectionTags',
  props: {
    tags: {
      type: [Array, Object],
      required: true
    }
  }

}
</script>

<style>

</style>
