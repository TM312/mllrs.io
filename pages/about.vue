<template>
    <div class="flex justify-start max-w-7xl mx-auto py-48">
        <p class="text-lg text-grey-900">
            My personal blog about programming and other interesting things.
        </p>

        <div class="mt-12">
            <small class="text-grey-500"
                >Built with Nuxt, FaunaDB, and Netlify.</small
            >
        </div>
    </div>
</template>

<script>
    export default {
        layout: "main",
        transitions: "home",
    };
</script>

<style>
    .home-enter-active,
    .home-leave-active {
        transition: opacity 0.3s;
    }
    .home-enter,
    .home-leave-active {
        opacity: 0;
    }
</style>
