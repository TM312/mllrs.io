<template>
  <!-- <div class="bg-gray-200 overflow-hidden rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div>
        <h1 class="text-xl font-bold text-grey-900">
          Content
        </h1>
        <ul class="list-decimal px-4 py-1">
          <li v-for="heading in toc" :key="heading.id" :class="heading.depth === 2 ? 'font-semibold text-blue-700' : 'pl-2 font-medium text-blue-00'">
            <NuxtLink :to="`#${heading.id}`">
              {{ heading.text }}
            </NuxtLink>
            {{ heading }}
          </li>
        </ul>
      </div>
    </div>
  </div> -->
  <h1>Hello</h1>
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
