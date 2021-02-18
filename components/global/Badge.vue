<template>
  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-purple-600 hover:border-transparent bg-white hover:bg-purple-100 text-purple-800 truncate uppercase">
    <NuxtLink v-if="!!name" :to="to">
      {{ capitalize(name) }}
    </NuxtLink>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    to: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }

}
</script>

<style>

</style>
