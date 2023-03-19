<template>
  <div class="mx-auto max-w-7xl ">
    <div
      class="grid max-w-2xl grid-cols-1 mx-auto gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none xl:grid-cols-2">
      <article v-for="project in projects" :key="project.id"
        class="flex flex-col items-start">
        <div class="relative w-full">
          <!-- <img v-if="project.imageUrl !== ''" :src="imageUrl" alt=""
            class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]" />
             -->
          <div
            class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
        </div>
        <div class="max-w-xl">
          <p class="mt-5 text-xs text-gray-500"
            v-text="project.date" />
          <div class="relative mt-2 group">
            <h3
              class="font-semibold leading-6 text-gray-200 text-md group-hover:text-gray-100 hover:underline decoration-2 decoration-sky-500">
              <a :href="project.href" target="blank"
                v-text="project.title" />
            </h3>
            <p
              class="mt-2 text-sm leading-6 text-gray-400 line-clamp-3">
              {{ project.description }}</p>
          </div>
        </div>
        <!-- <div class="flex flex-wrap items-center gap-2 mt-2">
          <span v-for="category, i in project.categories" :key="i"  class="text-xs relative z-10 rounded-full bg-gray-800 py-1 px-2.5 font-medium text-gray-300">{{
            category }}</span>
        </div> -->
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// // const imageUrl = new URL('/src/assets/images/logo.svg', import.meta.url)
// function getImgUrl(vidName: string) {
//   // return new URL(`../assets/videos/${vidName}`, import.meta.url).href
//   return new URL('/public/pantari-img.png', import.meta.url).href
// }



onMounted(() => {
  document.addEventListener('keypress', (event) => {
    var name = event.key;
    var code = event.code;
    // Alert the key name and key code on keydown
    alert(`Key pressed ${name} \r\n Key code value: ${code}`);
    keypress.value = name
  }, false);
})


const d = ref<null | string>(null)

const projects = [
  {
    id: 1,
    title: 'Pantari.io',
    href: 'https://pantari.io',
    description:
      'A webapp for businesses to manage their waiting queues. It ',
    // imageUrl: getImgUrl('pantari-img.png'),
    date: '2022',
    datetime: '2020-03-16',
    // categories: ['Vue', 'TypeScript', 'SQL', 'Supabase', 'TailwindCSS'],
  },
  {
    id: 2,
    title: 'Superpowers',
    href: 'https://github.com/TM312/superpowers',
    description:
      'A PoC for a composable API that executes different function sequences depending on the input. The API is designed as a set of serverless functions and therefore modular and extensible.',
    imageUrl:
      '',
    date: '2021',
    datetime: '2021',
    // categories: ['Supabase'],
  },
  {
    id: 3,
    title: 'Vat automation',
    href: 'https://github.com/TM312/vat_automation',
    description:
      'A web tool to automate VAT calculations and track sales for Amazon sellers. To cater the tool to user needs I collaborated with a leading Dutch VAT advisory and Amazon sellers.',
    imageUrl:
      '',
    date: '2020',
    // categories: ['Supabase'],
  },
  {
    id: 4,
    title: 'BusinessModelNavigator.com',
    href: 'https://businessmodelnavigator.com',
    description:
      'An educational webtool to stimulate corporate ideation processes. Sold to the Swiss innovation consultancy BMI Lab.',
    imageUrl:
      '',
    date: '2018',
    // categories: ['Supabase'],
  },

]
</script>