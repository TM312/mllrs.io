<template>
  <div>
    <h3 class="mb-4 font-bold text-2xl uppercase">
      Tags
    </h3>
    <ul>
      <li
        v-for="tag of tags"
        :key="tag.slug"
      >
        <NuxtLink :to="`/tag/${tag.slug}`" class="">
          <p
            class="truncate uppercase text-green-500 tracking-wider font-medium text-ss pr-2 py-1  mr-2 mb-2 transition-colors duration-300 ease-linear"
          >
            {{ tag.name }}
          </p>
        </NuxtLink>
      </li>
    </ul>
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
