<template>
  <article class="container mx-auto px-48 my-8">
    <!-- <pre>{{ article }}</pre> -->
    <ArticleHead :article="article" :series="series" class="mb-4">
      <br>
    </ArticleHead>

    <TOC :toc="article.toc" class="my-4" />

    <!-- content from markdown -->
    <nuxt-content :document="article" />
    <ArticleTail :article="article" :tags="tags" class="my-4">
      <br>
    </ArticleTail>
  </article>
</template>
<script>
import Prism from '~/plugins/prism'

export default {
  layout: 'main',
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
    const series = await Object.assign({}, ...seriesList.map(s => ({ [s.name]: s })))

    return {
      article,
      tags,
      series
    }
  },
  mounted () {
    Prism.highlightAll()
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
  }
}
</script>
<style>
.nuxt-content p {
  margin-bottom: 20px;
  font-size: 16px;
  padding-top: 16px;
}
.nuxt-content h1 {
  font-weight: bold;
  font-size: 36px;
  padding-top: 36px;
}

.nuxt-content h2 {
  font-weight: bold;
  font-size: 28px;
  padding-top: 28px;
}
.nuxt-content h3 {
  font-weight: bold;
  font-size: 22px;
  padding-top: 22px;
}
.nuxt-content li {
  font-weight: bold;
  font-size: 22px;
  padding-top: 22px;
}
.icon.icon-link {
  background-image: url('~assets/svg/icon-hashtag.svg');
  display: inline-block;
  width: 20px;
  height: 20px;
  background-size: 20px 20px;
}
</style>
