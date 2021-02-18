<template>
  <div>
    <div class="border-b border-gray-200">
      <h3 class="text-lg leading-6 font-semibold text-gray-900">
        {{ capitalize(title) }}
      </h3>
      <p class="mt-2 text-gray-800">
        {{ description }}
      </p>
    </div>
    <dl class="mt-3 space-y-10 md:space-y-6">
      <div>
        <dt class="text-lg leading-6 font-semibold text-indigo-700">
          Key Monetization
        </dt>
        <dd class="mt-2 text-base text-gray-800">
          {{ keyMonetization }}
        </dd>
      </div>

      <div>
        <dt class="text-lg leading-6 font-semibold text-indigo-700">
          Apple's Role
        </dt>
        <dd class="mt-2 text-base text-gray-800">
          {{ applesRole }}
        </dd>
      </div>
    </dl>
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
