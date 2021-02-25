<template>
  <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium hover:font-semibold border border-${color}-100 hover:border-transparent bg-white hover:bg-${color}-100 text-${color}-800 truncate ${ to ? 'uppercase' : ''}`">
    <NuxtLink v-if="!!to" :to="to">
      {{ capitalize(name) }}
    </NuxtLink>
    <span v-else>{{ capitalize(name) }}</span>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    to: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    color () {
      return this.to ? 'purple' : 'blue'
    }
  }

}
</script>

<style>

</style>
