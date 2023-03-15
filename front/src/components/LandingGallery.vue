<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/line-clamp'),
    ],
  }
  ```
-->

<template>
  <div class="mx-auto max-w-7xl ">
    <p class="text-xl text-red-500">keypress: {{ keypress }}</p>

    <div class="grid max-w-2xl grid-cols-1 mx-auto gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none xl:grid-cols-2">
      <article v-for="project in projects" :key="project.id" class="flex flex-col items-start justify-between"
        :class="`xl:col-span-${project.cols}`">
        <div class="relative w-full">
          <img :src="project.imageUrl" alt=""
            class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
          <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div class="max-w-xl">
          <div class="mt-5 text-xs">
            <time :datetime="project.datetime" class="text-gray-500">{{ project.date }}</time>
          </div>
          <div class="relative group">
            <h3 class="font-semibold leading-6 text-gray-100 text-md group-hover:text-gray-300">
              <a :href="project.href">
                <span class="absolute inset-0" />
                {{ project.title }}
              </a>
            </h3>
            <p class="mt-2 text-sm leading-6 text-gray-400 line-clamp-3">{{ project.description }}</p>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 mt-2">
          <span v-for="category, i in project.categories" :key="i"  class="text-xs relative z-10 rounded-full bg-gray-800 py-1 px-2.5 font-medium text-gray-300">{{
            category }}</span>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

onMounted(() => {
  document.addEventListener('keypress', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    keypress.value = name
  }, false);
})


const keypress = ref<null | string>(null)

const projects = [
  {
    id: 1,
    cols: 1,
    title: 'Pantari',
    href: 'https://pantari.io',
    description:
      'A webapp for businesses to manage their waiting queues.',
    imageUrl:
      '@assets/project-assets/pantari-img.png',
    date: '2022',
    datetime: '2020-03-16',
    // categories: ['Vue', 'TypeScript', 'SQL', 'Supabase', 'TailwindCSS'],
  },
  {
    id: 2,
    cols: 1,
    title: 'BusinessModelNavigator.com',
    href: 'https://businessmodelnavigator.com',
    description:
      'An educational webtool to stimulate corporate ideation processes. Sold to the Swiss innovation consultancy BMI Lab.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: '2018',
    datetime: '2020-03-16',
    // categories: ['Supabase'],
  },
  {
    id: 3,
    cols: 2,
    title: 'Document classification at leading financial institution',
    href: 'https://pantari.io',
    description:
      'A webapp for businesses to manage their waiting queues.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    // categories: ['Supabase'],
  },
  {
    id: 4,
    cols: 2,
    title: 'Tax automation',
    href: '#',
    description:
      'A web tool to automate VAT calculations and track sales for Amazon sellers. Gathered business requirements through collaborations with VAT experts and sellers. Designed micro-service architecture and implemented all product features.',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    // categories: ['Supabase'],
  },
  // More projects...
]
</script>