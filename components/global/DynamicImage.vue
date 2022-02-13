<template>
    <div>
        <img :src="imgSrc()" :alt="alt" class="rounded-lg shadow-lg" />
        <figcaption class="font-sans text-gray-500 text-sm">
            <slot></slot>
        </figcaption>
    </div>
</template>

<script>
    export default {
        name: "DynamicImage",
        props: {
            filename: {
                type: String,
                required: true,
            },
            articleSlug: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                required: true,
            },
        },
        methods: {
            imgSrc() {
                try {
                    return require(`~/assets/images/${this.articleSlug}/${this.filename}`);
                } catch (error) {
                    return null;
                }
            },
        },
    };
</script>

<style>
</style>
