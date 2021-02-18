<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 v-if="!!title" class="text-lg leading-6 font-medium bg-indigo-700">
        {{ capitalize(title) }}
      </h3>
      <p class="mt-1 text-gray-500">
        {{ description }}
      </p>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Key Monetization
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ keyMonetization }}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Apple's Role
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ applesRole }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTable',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    keyMonetization: {
      type: String,
      required: true
    },
    applesRole: {
      type: String,
      required: true
    }

  }

}
</script>

<style>

</style>
