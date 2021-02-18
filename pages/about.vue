<template>
  <div class="mx-auto md:container px-12 lg:px-48 xl:px-75 py-48">
    Hi, I'm Thomas. I write about building and launching web applications and more broadly innovation.
    <br>
    <small class="mt-8">This blog is built with Nuxt leveraging the Nuxt-Content plugin.</small>
  </div>
</template>

<script>
export default {
  layout: 'main',
  transitions: 'home'

}
</script>

<style>
.home-enter-active, .home-leave-active { transition: opacity .3s; }
.home-enter, .home-leave-active { opacity: 0; }

</style>
