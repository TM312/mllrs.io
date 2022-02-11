<template>
  <div>
    <div
      :class="showDetails ? 'border-2 border-indigo-100' : ''"
      class="sm:rounded-lg px-4 sm:p-6"
    >
      <p class="text-xl font-semibold text-indigo-800">About this series</p>
      <transition name="box">
        <div v-if="showDetails"
          class="prose prose-xs mt-1 text-sm text-gray-500 text-justify small overflow-auto max-h-128"
        >
          <nuxt-content :document="series" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoBoxSeries",
  props: {
    series: {
      type: Object,
      required: false,
    },
    showDetails: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style>
.box-enter-active,
.box-leave-active {
  transition: opacity 1.5s;
  transition: max-height 1.5s ease-in-out;
  max-height: 1000px;
}
.box-enter,
.box-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
