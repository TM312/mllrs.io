---
title: Useful Plugins For Nuxt
description: A Collection Of Useful Nuxt Plugins
series: building_blocks
repository: https://github.com/TM312/building_blocks/tree/master/nuxt-useful-plugins

published: true
img: hello.png
alt: header image
tags:
  - nuxtjs

---



Their composable architecture is one of the key strength of modern JS frameworks like Nuxt or React. In Nuxt, components comprising HTML, JS, and CSS can be developed as reusable building blocks.

In a similar fashion JS code can be reused across different components by adding a global mixin as a <a class="font-bold text-purple-600" href="https://nuxtjs.org/docs/2.x/directory-structure/plugins/" target="_blank">Nuxt plugin</a> to the code base.

This article is intended to serve as a growing list of plugins I have found useful across different projects. In the following, I give a quick recap on how to integrate custom plugins into your Nuxt project. You can jump directly to individual plugins using the table below.


## Recap

1. __Create a plugin as in the form of a global mixin in the plugins directory__

```js[formatDate.js]
import Vue from 'vue'

Vue.mixin({
  methods: {
    formatDate(date, short=false) {
      const options = {
          year: 'numeric',
          month: short ? 'long' : 'short',
          day: 'numeric'
    }
      return new Date(date)
        .toLocaleDateString('en', options)
    }
  }
})
```

2. __Add the plugin to nuxt.config.js using its file name__

```js[nuxt.config.js]
export default {
  // ...
  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/formatDate'
  ],
  // ...
}
```

3. __Use the plugin like any other JS in your component.__

*Before creating a plugin, pay attention to the naming to avoid conflicts, as it will be globally accessible.*

```vue{4}[FooComponent.vue]
<template>
  <div>
    <b>Name:</b> {{ user.name }}<br>
    <b>Registered On:</b>
    {{ formatDate(user.lastSeen) }}
  </div>

</template>
<script>
export default {
    name: 'FooComponent',
    props: {
      user: {
        type: Object,
        required: true
      }
  }
}
</script>
```


## List of Plugins


### Capitalize String

```js[capitalize.js]
import Vue from 'vue'

Vue.mixin({
  methods: {
    capitalize (string) {
      return string.toLowerCase()
        .split('_')
        .join(' ')
        .replace(
            /(^\w{1})|(\s{1}\w{1})/g,
            match => match.toUpperCase()
        )
    }
  }
})
```

### Human readable formatting of Date object

```js[formatDate.js]
import Vue from 'vue'

Vue.mixin({
  methods: {
    formatDate(date, short=false) {
      const options = {
          year: 'numeric',
          month: short ? 'long' : 'short',
          day: 'numeric'
    }
      return new Date(date)
        .toLocaleDateString('en', options)
    }
  }
})
```
*You may extend this plugin to support different date formats depending on the user location by providing the respective arguments.*


### Sleep

```js[sleep.js]
import Vue from 'vue'

Vue.mixin({
    methods: {
        sleep(ms) {
            return new Promise(
                resolve => setTimeout(resolve, ms)
        )
    },
  }
})
```
*Call sleep as an asynchronous function, like `await this.sleep(2500)`*



I hope you found this article useful and enjoyed your time.
