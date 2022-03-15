
<template>
    <div
        class="
            relative
            bg-gray-50
            pt-16
            pb-20
            px-4
            sm:px-6
            lg:pt-24
            lg:pb-28
            lg:px-8
        "
    >
        <div class="absolute inset-0">
            <div class="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div class="relative max-w-7xl mx-auto">
            <div class="text-center">
                <h2
                    class="
                        text-3xl
                        tracking-tight
                        font-extrabold
                        text-gray-900
                        sm:text-4xl
                    "
                >
                    {{ tag.name }}
                </h2>
                <p class="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                    {{ tag.description }}
                </p>
            </div>
            <div
                class="
                    mt-12
                    max-w-lg
                    mx-auto
                    grid
                    gap-5
                    lg:grid-cols-3
                    lg:max-w-none
                "
            >
                <div
                    v-for="article in articles"
                    :key="article.slug"
                    class="
                        flex flex-col
                        rounded-lg
                        shadow
                        hover:shadow-lg
                        overflow-hidden
                    "
                >
                    <!-- <div class="flex-shrink-0">
                        <img
                            class="h-48 w-full object-cover"
                            :src="article.img"
                            :alt="article.alt"
                        />
                    </div> -->
                    <div
                        class="
                            flex-1
                            bg-white
                            p-6
                            flex flex-col
                            justify-between
                        "
                    >
                        <div class="flex-1">
                            <p class="text-sm font-medium">
                                <NuxtLink
                                    v-if="article.series"
                                    :to="`/series/${article.series}`"
                                    class="hover:underline text-indigo-600 uppercase"
                                >
                                    {{ article.series }}
                                </NuxtLink>
                                <span v-else class="text-indigo-900"
                                    >Single Article</span
                                >
                            </p>
                            <NuxtLink
                                :to="`/articles/${article.slug}`"
                                class="block mt-2"
                            >
                                <p class="text-xl font-semibold text-gray-900">
                                    {{ article.title }}
                                </p>
                                <p class="mt-3 text-base text-gray-500">
                                    {{ article.description }}
                                </p>
                            </NuxtLink>
                        </div>
                        <div class="mt-6 flex items-center">
                            <div>
                                <div
                                    class="flex space-x-1 text-sm text-gray-500"
                                >
                                    <time
                                        :datetime="
                                            formatDate(article.updatedAt, true)
                                        "
                                    >
                                        {{
                                            formatDate(article.updatedAt, true)
                                        }}
                                    </time>
                                    <span aria-hidden="true"> &middot; </span>
                                    <span>
                                        {{ article.readingTime }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: "main",
        transition: "home",
        async asyncData({ $content, params }) {
            const tags = await $content("tags")
                .where({ slug: { $contains: params.tag } })
                .limit(1)
                .fetch();
            const tag = tags.length > 0 ? tags[0] : {};
            const articles = await $content("articles", params.slug)
                .only([
                    "title",
                    "description",
                    "series",
                    "updatedAt",
                    "readingTime",
                    "tags",
                    "img",
                    "slug",
                ])
                .where({ tags: { $contains: tag.name } })
                .sortBy("createdAt", "asc")
                .fetch();
            return {
                articles,
                tag,
            };
        },
    };
</script>
