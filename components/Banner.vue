<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="fixed bottom-44 inset-x-0 pb-2 sm:pb-5">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-indigo-50 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-indigo-400">
              <!-- Heroicon name: outline/speakerphone -->
              <svg
                class="h-6 w-6 text-purple-900"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>

            </span>
            <div class="ml-4 font-medium text-purple-900">
              <span class="md:hidden">
                A solid start, but still under construction!
              </span>
              <span class="hidden md:inline">
                I recently launched this blog. Over the coming weeks, I am going add articles on developing and robust deployment of web apps. A couple of technical issues, such as resolving image assets, are still under construction.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'

}
</script>

<style>

</style>
