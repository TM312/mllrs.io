import Vue from 'vue'

Vue.mixin({
  methods: {
    formatDate (date, short = false) {
      const monthFormat = short ? 'short' : 'long'
      const options = { year: 'numeric', month: monthFormat, day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
})
