---
title: Useful Plugins For Nuxt
description: A Collection Of Useful Nuxt Plugins
series: building_blocks
repository: https://github.com/TM312/building_blocks/tree/master/nuxt-useful-plugins

img: article/hello.png
alt: header image
tags:
  - nuxtjs

---



Their composable architecture is one of the key strength of modern JS frameworks like Nuxt or React. In Nuxt, components comprising HTML, JS, and CSS can be developed as reusable building blocks.

In a similar fashion JS code can be reused across different components by adding a global mixin as a <a class="font-bold text-purple-600" href="https://nuxtjs.org/docs/2.x/directory-structure/plugins/" target="_blank">Nuxt plugin</a> to the code base.

This article is intended to serve as a growing list of plugins I have found useful across different projects. In the following, I give a quick recap on how to integrate custom plugins into your Nuxt project. You can jump directly to individual plugins using the table below.


## Recap

1. Create a plugin as in the form of a global mixin in the plugins directory

```js[formatDate.js]
import Vue from 'vue'

Vue.mixin({
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
})
```

2. Add the plugin to nuxt.config.js using its file name (the ending, .js can be omitted)

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

3. Use the plugin like any other JS in your component.
<small class="text-gray-500">Before creating a plugin, pay attention to the naming to avoid conflicts, as it will be globally accessible.</small>

```vue{4}[FooComponent.vue]
<template>
  <div>
    <b>Name:</b> {{ user.name }}<br>
    <b>Email:</b> {{ user.email }}<br>
    <b>Registered On:</b> {{ formatDate(user.registered_on) }}
  </div>

</template>
<script>
export default {
    name: 'FoorComponent',
    props: {
      taxAuditor: {
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
      return string.toLowerCase().split('_').join(' ').replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
    }
    // capitalize(string) {
    //  return string.toLowerCase().replaceAll("_", " ").replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase())
    },
  }
})
```

### Format Datetime Object To Human Readable Format
```js[formatDate.js]
import Vue from 'vue'

Vue.mixin({
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
})
```
<small>You may extend this plugin to support different date formats depending on the user location by providing the respective arguments.</small>


### Sleep

```js[sleep.js]
import Vue from 'vue'

Vue.mixin({
  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
  }
})
```
<small>Call sleep as an asynchronous function, like <code class="bg-gray-800 text-gray-100 rounded p-1">await this.sleep(2500)</code></small>



I hope you found this article useful and enjoyed your time.
