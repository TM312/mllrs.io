<template>
  <div
    class="grid max-w-2xl grid-cols-1 mx-auto gap-y-6 lg:gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
    <article v-for="project in projects" :key="project.id"
      class="max-w-xl">
      <div class="">
        <video ref="video2" muted loop @mouseenter="playVideo"
          @mouseleave="pauseVideo" class="object-cover w-full h-48 rounded-lg"
          :src="project.imageUrl" type="video/mp4" />
      </div>
      <!-- <img :src="vid.src" alt=""
          class="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[3/2]" /> -->
      <div class="relative mt-2">
        <p class="mt-5 text-xs text-gray-500"
          v-text="project.date" />
        <h3
          class="font-semibold leading-6 text-gray-200 text-md group-hover:text-gray-100 hover:underline decoration-2 decoration-sky-500">
          <a :href="project.href" target="blank"
            v-text="project.title" />
        </h3>
        <p
          class="mt-2 text-sm leading-6 text-gray-400 line-clamp-3">
          {{ project.description }}</p>
      </div>
      <!-- <div class="flex flex-wrap items-center gap-2 mt-2">
          <span v-for="category, i in project.categories" :key="i"  class="text-xs relative z-10 rounded-full bg-gray-800 py-1 px-2.5 font-medium text-gray-300">{{
            category }}</span>
        </div> -->
    </article>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import pantari from "../assets/videos/pantari.mp4"
import businessmodelnavigator from "../assets/videos/businessmodelnavigator.mp4"

function playVideo() {
  if (!!pantari) {
    pantari.value.play();
  }
}

function pauseVideo() {
  if (!!pantari.value) {
    pantari.value.pause();
  }
}
// // const imageUrl = new URL('/src/assets/images/logo.svg', import.meta.url)
// function getImgUrl(vidName: string) {
//   // return new URL(`../assets/videos/${vidName}`, import.meta.url).href
//   return new URL('/public/pantari-img.png', import.meta.url).href
// }



// onMounted(() => {
//   document.addEventListener('keypress', (event) => {
//     var name = event.key;
//     var code = event.code;
//     // Alert the key name and key code on keydown
//     alert(`Key pressed ${name} \r\n Key code value: ${code}`);
//     keypress.value = name
//   }, false);
// })


const projects = [
  {
    id: 1,
    title: 'Pantari.io',
    href: 'https://pantari.io',
    description:
      'A webapp for businesses to manage their waiting queues. Customers can register from their phones and get real-time updates on status and waiting times.',
    imageUrl: pantari,
    date: '2022',
    datetime: '2020-03-16',
    // categories: ['Vue', 'TypeScript', 'SQL', 'Supabase', 'TailwindCSS'],
  },
  {
    id: 2,
    title: 'Superpowers',
    href: 'https://github.com/TM312/superpowers',
    description:
      'A PoC for a composable API that executes sequences of function based on the request input. The API is designed as a modular set of serverless functions and therefore easily extensible.',
    imageUrl: pantari,
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
    imageUrl: pantari,
    date: '2020',
    // categories: ['Supabase'],
  },
  {
    id: 4,
    title: 'BusinessModelNavigator.com',
    href: 'https://businessmodelnavigator.com',
    description:
      'An educational webtool to stimulate corporate ideation processes. After gaining initial traction we sold it to the Swiss innovation consultancy BMI Lab.',
    imageUrl: businessmodelnavigator,
    date: '2018',
    // categories: ['Supabase'],
  },

]
</script>