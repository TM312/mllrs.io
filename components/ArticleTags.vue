<template>
    <div class="my-24" v-if="typeof tags === 'object' && tags !== null">
        <span v-for="(tag, id) in articleTags" :key="id" class="mr-2">
            <Badge
                :to="`/tag/${tags[tag].slug}`"
                :name="tags[tag].name"
                class="mb-2"
            />
        </span>
    </div>
</template>

<script>
    export default {
        name: "ArticleTags",
        props: {
            articleTags: {
                type: Array,
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
