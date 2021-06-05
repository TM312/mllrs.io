<template>
    <div>
        <img :src="article.img" :alt="article.alt" class="h-64 rounded" />
        <div class="mt-16 -mb-3">
            <span class="mr-2">
                {{ formatDate(article.createdAt) }}
            </span>
            <span
                v-if="
                    !!article.updatedAt &&
                    formatDate(article.createdAt) !==
                        formatDate(article.updatedAt)
                "
                class="mx-2 text-gray-500"
                >•</span
            >
            <span
                v-if="
                    !!article.updatedAt &&
                    formatDate(article.createdAt) !==
                        formatDate(article.updatedAt)
                "
                class="mx-2 text-gray-500"
            >
                <i>edited: </i>{{ formatDate(article.updatedAt) }}
            </span>
        </div>

        <div class="mt-24">
            <div
                class="block uppercase text-base text-center text-indigo-600 font-semibold tracking-wide uppercase"
            >
                {{ !!series ? capitalize(series[article.series].name) : "" }}
            </div>
            <div
                class="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl"
            >
                {{ capitalize(article.title) }}
            </div>
            <p
                v-if="article.description"
                class="mt-8 text-xl text-center text-gray-500 leading-8"
            >
                {{ article.description }}
            </p>
        </div>

        <InfoBoxSeries :series="series" />
    </div>
</template>

<script>
    export default {
        name: "ArticleHead",
        props: {
            article: {
                type: Object,
                required: true,
            },
            series: {
                type: Object,
                required: false,
                default: null,
            },
        },
    };
</script>

<style>
</style>
