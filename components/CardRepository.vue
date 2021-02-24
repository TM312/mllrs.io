<template>
  <div>
    <div v-if="!!repository" class="uppercase text-gray-800 tracking-wider font-bold text-ss pr-2 py-1">
      <span>Repository:
      </span>
      <a :href="repository">Here</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardRepository',
  props: {
    repository: {
      type: String,
      required: false,
      default: null
    }
  }

}
</script>

<style>

</style>
