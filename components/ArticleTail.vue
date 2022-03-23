<template>
    <div>
        <!-- <span class="uppercase text-gray-800 tracking-wider font-bold text-ss pr-2 py-1">Tags: </span> -->

        <CardRepository
            v-if="article.repository"
            :repository="article.repository"
            class="mt-4 lg:mt-8"
        />

    </div>
</template>

<script>
    export default {
        name: "ArticleTail",
        props: {
            article: {
                type: Object,
                required: true,
            },
            tags: {
                type: Object,
                required: true,
            },
        },
    };
</script>

<style>
</style>
