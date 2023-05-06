<script lang="ts" setup>
import HeroIconMailOpen from "../assets/images/HeroIconMailOpen.vue";
import LogoGithub from "../assets/images/LogoGithub.vue";
import LogoLinkedIn from "../assets/images/LogoLinkedIn.vue";
import LogoTwitter from "../assets/images/LogoTwitter.vue";

const yearToday = new Date().getFullYear();
</script>

<template>
  <footer
    class="flex items-end justify-between py-6 rounded-t-lg">
    <div class="flex flex-col gap-4">
      <div class="flex items-end gap-4">
        <a aria-label="GitHub"
          class="text-gray-400 transition duration-200 ease-in-out hover:text-gray-100"
          target="_blank" href="https://github.com/TM312">
          <LogoGithub />
        </a><a aria-label="Twitter" target="_blank"
          class="text-gray-400 transition duration-200 ease-in-out hover:text-gray-100"
          href="https://twitter.com/thmsmllrs">
        <LogoTwitter />
      </a><a aria-label="Linkedin" target="_blank"
        class="text-gray-400 transition duration-200 ease-in-out hover:text-gray-100"
        href="https://www.linkedin.com/in/thomas-m%C3%B6llers-78bb79b9/">
          <LogoLinkedIn />
        </a>
      </div>
      <!-- <div class="flex flex-col">
        <span class="text-xs font-normal text-gray-400"
          ><Address></span
        ><span class="text-xs font-normal text-gray-400">Singapore, SG</span>
      </div> -->
    </div>
    <div
      class="text-sm font-semibold text-sky-500 hover:text-sky-400">
      <a href="mailto:tm@protonmail.ch"
        class="flex items-center gap-2">
        <span>Work with me</span>
        <span>
          <HeroIconMailOpen />
        </span>
      </a>
    </div>
    <button class="text-sm text-gray-400 hover:text-gray-100">
      <a href="/about/">©
      {{yearToday}} Dr. Thomas Moellers</a>
      </button>
  </footer>
</template>