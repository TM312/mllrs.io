<template>
    <div class="container mx-auto px-4 md:px-24 lg:px-40 my-8">
        <!-- <pre>{{ article }}</pre> -->
        <ArticleHead :article="article" :series="series" class="mb-10">
            <br />
        </ArticleHead>

        <!-- content from markdown -->
        <div
            :class="`${
                article.toc.length > 0
                    ? 'grid grid-cols-1 xl:grid-cols-3 gap-10'
                    : ''
            }`"
        >
            <!-- <div :class="`mx-auto ${article.toc.length > 0 ? 'col-span-1 lg:col-span-2 order-last lg:order-first': ''}`"> -->
            <section
                class="block"
                :class="
                    article.toc.length > 0
                        ? 'col-span-1 xl:col-span-2 mt-0 order-last xl:order-first'
                        : 'col-span-1 xl:col-span-3'
                "
            >
                <article
                    class="prose lg:prose-xl text-justify"
                    :class="article.toc.length > 0 ? '' : 'mx-auto'"
                >
                    <nuxt-content ref="nuxtContent" :document="article" />
                </article>

                <article-tags v-if="article.tags" :tags="tags" :article-tags="article.tags" />
            </section>
            <aside v-if="article.toc.length > 0">
                    <info-box-series
                        id="infoboxSeries"
                        class="
                            mt-16
                        "
                        v-if="series && article"
                        :series="series[article.series]"
                        :show-details="infoboxSeriesShown"
                        @mouseover.native="infoboxSeriesShown = true"
                        @mouseleave.native="infoboxSeriesShown = false"
                    >
                    </info-box-series>
                <div class="sticky top-16">
                    <h2
                        class="
                            text-xl
                            font-semibold
                            text-grey-300
                            xl:mt-9
                            tracking-wider
                        "
                    >
                        Table of contents
                    </h2>

                    <nav class="mt-4">
                        <ul>
                            <li
                                v-for="link of article.toc"
                                :key="link.id"
                                :class="{
                                    'pl-4': link.depth === 3,
                                }"
                                class="font-semibold toc-list"
                                @click="currentlyActiveToc = link.id"
                            >
                                <NuxtLink
                                    :class="{
                                        'text-indigo-500 hover:text-indigo-600':
                                            link.id === currentlyActiveToc,
                                        'text-grey-300 hover:gray-700':
                                            link.id !== currentlyActiveToc,
                                    }"
                                    role="button"
                                    class="
                                        transition-colors
                                        duration-75
                                        text-base
                                        mb-2
                                        block
                                    "
                                    :to="`#${link.id}`"
                                >
                                    {{ link.text }}
                                </NuxtLink>
                            </li>
                        </ul>
                        <ArticleTail
                            :article="article"
                            :tags="tags"
                            class="mt-8"
                        >
                            <br />
                        </ArticleTail>
                    </nav>
                </div>
                <!-- <TOC v-if="article.toc.length > 0" ref="toc" :toc="article.toc" class="my-5 text-lg" @currentlyActiveToc="currentlyActiveToc=$event" /> -->
            </aside>
        </div>
    </div>
</template>

<script>
    import Prism from "~/plugins/prism";

    export default {
        layout: "main",
        transition: "home",
        async asyncData({ $content, params }) {
            const article = await $content("articles", params.slug).fetch();
            const tagsList = await $content("tags")
                .where({ name: { $containsAny: article.tags } })
                .only(["name", "slug"])
                .fetch();
            const tags = tagsList.length > 0 
                ? await Object.assign(
                    {},
                    ...tagsList.map((s) => ({ [s.name]: s }))
                ): null;

            const seriesList = await $content("series")
                .where({ slug: { $containsAny: article.series } })
                .fetch();

            // https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
            const series =
                seriesList.length > 0
                    ? await Object.assign(
                          {},
                          ...seriesList.map((s) => ({ [s.slug]: s }))
                      )
                    : null;

            return {
                article,
                tags,
                series,
            };
        },
        data() {
            return {
                currentlyActiveToc: "",
                infoboxSeriesShown: false,
                observer: null,
                observerOptions: {
                    root: this.$refs.nuxtContent,
                    threshold: 0.3,
                },
            };
        },

        head() {
            return {
                title: this.article.title,
                meta: [
                    {
                        hid: "description",
                        name: "description",
                        content: this.article.description,
                    },
                    // Open Graph
                    {
                        hid: "og:title",
                        property: "og:title",
                        content: this.article.title,
                    },
                    {
                        hid: "og:description",
                        property: "og:description",
                        content: this.article.description,
                    },
                    // Twitter Card
                    {
                        hid: "twitter:title",
                        name: "twitter:title",
                        content: this.article.title,
                    },
                    {
                        hid: "twitter:description",
                        name: "twitter:description",
                        content: this.article.description,
                    },
                ],
            };
        },

        mounted() {
            Prism.highlightAll();

            // The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
            // detecting when an element scrolls into our viewpor
            // var infoboxSeries = document.getElementById("infoboxSeries");
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute("id");
                    if (entry.isIntersecting) {
                        this.currentlyActiveToc = id;

                        // if (
                        //     this.article.triggerInfobox &&
                        //     id == this.article.triggerInfobox
                        // ) {
                        //     // Add the fadeIn class:
                        //     if (this.infoboxSeriesShown) {
                        //         infoboxSeries.classList.add(
                        //             "motion-safe:animate-fadeOut"
                        //         );
                        //         this.infoboxSeriesShown = false;
                        //     }
                        //     // } else {
                        //     //     infoboxSeries.classList.add(
                        //     //         "motion-safe:animate-fadeIn"
                        //     //     );
                        //     //     this.infoboxSeriesShown = true;
                        //     // }
                        // } else {
                        //     element.classList.remove("motion-safe:animate-*");
                        // }
                    }
                });
            }, this.observerOptions);

            // Track all sections that have an `id` applied
            document
                .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
                .forEach((section) => {
                    this.observer.observe(section);
                });
        },
        beforeDestroy() {
            this.observer.disconnect();
        },
    };
</script>