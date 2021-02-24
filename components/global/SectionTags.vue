<template>
  <div>
    <p class="mb-4 font-semibold text-xl uppercase">
      Tags
    </p>
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
