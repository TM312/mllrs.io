<template>
  <div>
    <h1 class="text-xl font-bold">
      Content
    </h1>
    <ol class="list-decimal">
      <li v-for="heading in toc" :key="heading.id">
        <NuxtLink :to="`#${heading.id}`">
          {{ heading.text }}
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'TOC',
  props: {
    toc: {
      type: [Array, Object],
      required: true
    }
  }

}
</script>

<style>

</style>
