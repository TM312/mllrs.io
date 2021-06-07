<template>
    <div class="px-4 sm:p-6">
        <p class="text-xl font-semibold text-grey-600">About this series</p>
        <div
            class="prose prose-xs mt-2 text-sm text-grey-300 text-justify small"
        >
            <nuxt-content :document="series" />
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
        },
    };
</script>

<style>
</style>
