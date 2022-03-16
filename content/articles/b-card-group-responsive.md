---
title: Bootrap-Vue Responsive Card Deck
description: Make Bootstrap-Vues Card Decks responsive without custom CSS
createdAt: 2021-01-11T00:01:00.000Z
updatedAt: 2021-01-11T00:01:00.000Z
series: building-blocks
repository: https://github.com/TM312/building_blocks/tree/master/responsive-b-card-group

published: true
img: /article/hello.png
alt: THIS IS THE ALT
tags:
  - NuxtJS
---

<a class="font-bold text-purple-600" href="https://bootstrap-vue.org/" target="_blank"> Bootstrap-Vue (BV) </a> is a solid choice when building MVPs in Vue or Nuxt. Like it’s originator <a class="font-bold text-purple-600" href="https://getbootstrap.com/" target="_blank">Bootstrap</a> it comes with many pre-styled components. Beyond that BV relies on Javascript to provide additional functionality.

BV’s <a href="https://bootstrap-vue.org/docs/components/card" target="_blank">`b-card`</a> component, a `div` with some minimal styling and predefined formatting, is commonly used when aiming to provide the preview of a feature, page, or other objects.

As it lies in the nature of a preview, most often you may need not just one, but multiple cards. For this use case there exists the `b-card-group` component, which is wrapped around a set of cards. Adding the props <i>deck</i>, provides sets of equal width and height. This is useful when you know the number of needed cards in advance, this number is ideally below 5 and responsive design is not a major concern. Often, however, this does not apply because user objects are fetched dynamically.

A similar but dynamically adaptive and responsive result can be achieved without custom CSS by combining the `b-row`, `b-col`, `b-card`components.

<figure>

```vue[FooComponent.vue]
<template>
<b-row cols="1" cols-lg="2" cols-xl="4">
    <b-col v-for="item in items" :key="item.id" class="py-3">
        <b-card class="h-100" :title="item.title">
            <b-card-text>{{ item.text }}</b-card-text>
        </b-card>
    </b-col>
</b-row>
</template>

<script>
export default {
  name: 'FooComponent',
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
```

  <figcaption>The number of cards displayed per row can be adjusted by changing the column values per size in the `b-row` component.</figcaption>

</figure>

That’s it already and I hope it has been helpful.
