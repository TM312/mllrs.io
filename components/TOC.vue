<template>
  <div>
    <h1 class="text-xl font-bold">
      Content
    </h1>
    <ul>
      <li v-for="heading in toc" :key="heading.id">
        <NuxtLink :to="`#${heading.id}`">
          {{ heading.text }}
        </NuxtLink>
      </li>
    </ul>
    {{ toc }}
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
