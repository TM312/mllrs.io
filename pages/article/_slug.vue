<template>
  <article class="container mx-auto px-4 md:px-24 lg:px-40 my-8">
    <!-- <pre>{{ article }}</pre> -->
    <ArticleHead :article="article" :series="series" class="mb-10 ">
      <br>
    </ArticleHead>

    <!-- content from markdown -->
    <div :class="`${article.toc.length > 0 ? 'grid grid-cols-3 gap-2' : ''}`">
      <div :class="`mx-auto prose lg:prose-md text-justify ${article.toc.length > 0 ? 'col-span-3 lg:col-span-2 order-last lg:order-first': ''}`">
        <nuxt-content ref="nuxtContent" :document="article" />
      </div>
      <aside v-if="article.toc.length > 0" class="col-span-3 lg:col-span-1 lg:flex lg:flex-col">
        <div class="sticky top-16 pl-6">
          <h2
            class="text-xl font-semibold text-grey-300 lg:mt-9 tracking-wider"
          >
            Table of contents
          </h2>
          <nav class="mt-4">
            <ul>
              <li
                v-for="link of article.toc"
                :key="link.id"
                :class="{
                  'pl-4': link.depth === 3
                }"
                class="font-semibold toc-list"
                @click="currentlyActiveToc = link.id"
              >
                <NuxtLink
                  :class="{
                    'text-indigo-500 hover:text-indigo-600':
                      link.id === currentlyActiveToc,
                    'text-grey-300 hover:gray-700': link.id !== currentlyActiveToc
                  }"
                  role="button"
                  class="transition-colors duration-75 text-base mb-2 block"
                  :to="`#${link.id}`"
                >
                  {{ link.text }}
                </NuxtLink>
              </li>
            </ul>
            <ArticleTail :article="article" :tags="tags" class="my-4">
              <br>
            </ArticleTail>
          </nav>
        </div>
      <!-- <TOC v-if="article.toc.length > 0" ref="toc" :toc="article.toc" class="my-5 text-lg" @currentlyActiveToc="currentlyActiveToc=$event" /> -->
      </aside>
    </div>
  </article>
</template>
<script>
import Prism from '~/plugins/prism'

export default {
  layout: 'main',
  transition: 'home',
  async asyncData ({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()
    const tagsList = await $content('tags')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.tags } })
      .fetch()
    const tags = await Object.assign({}, ...tagsList.map(s => ({ [s.name]: s })))

    const seriesList = await $content('series')
      .only(['name', 'slug'])
      .where({ name: { $containsAny: article.series } })
      .fetch()

    // https://stackoverflow.com/questions/5515310/is-there-a-standard-function-to-check-for-null-undefined-or-blank-variables-in
    const series = seriesList.length > 0 ? await Object.assign({}, ...seriesList.map(s => ({ [s.name]: s }))) : null

    return {
      article,
      tags,
      series
    }
  },
  data () {
    return {
      currentlyActiveToc: '',
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0.3
      }
    }
  },

  head () {
    return {
      title: this.article.title,
      meta: [
        { hid: 'description', name: 'description', content: this.article.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        { hid: 'og:description', property: 'og:description', content: this.article.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.article.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.article.description }
      ]
    }
  },

  mounted () {
    Prism.highlightAll()

    // The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.
    // detecting when an element scrolls into our viewpor
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('id')
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id
        }
      })
    }, this.observerOptions)

    // Track all sections that have an `id` applied
    document
      .querySelectorAll('.nuxt-content h2[id], .nuxt-content h3[id]')
      .forEach((section) => {
        this.observer.observe(section)
      })
  },
  beforeDestroy () {
    this.observer.disconnect()
  }
}
</script>
<style>
  .home-enter-active, .home-leave-active { transition: opacity .3s; }
  .home-enter, .home-leave-active { opacity: 0; }

</style>
