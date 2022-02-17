<template>
  <nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto pr-2 sm:pr-6 lg:pr-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="flex-1 justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <NuxtLink to="/" :class="this.$nuxt.$route.path === '/' ? classActive : classInactive">
                Home
              </NuxtLink>
              <NuxtLink to="/about" :class="this.$nuxt.$route.path === '/about' ? classActive : classInactive">
                About
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    Mobile menu, toggle classes based on menu state.

    Menu open: "block", Menu closed: "hidden"
  -->
    <div class="block sm:hidden">
      <div class="px-2 pb-3 space-y-1">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <NuxtLink to="/" :class="this.$nuxt.$route.path === '/' ? classActive : classInactive">
          Home
        </NuxtLink>
        <NuxtLink to="/about" :class="this.$nuxt.$route.path === '/about' ? classActive : classInactive">
          About
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      classActive: 'bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium',
      classInactive: 'text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'

    }
  }

}
</script>

<style>

</style>
