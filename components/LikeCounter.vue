<template>
  <div class="flex justify-center flex-col">
    <div class="flex items-center mt-4 text-gray-500">
      <p v-if="$fetchState.pending" class="ml-1">
        Retrieving like levels...
      </p>
    </div>

    <button v-if="!$fetchState.error" type="button" class="w-20 inline-flex px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="addLikesOnInterval">
      <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" :fill="storedUserLikes > 0 ? 'red' : 'none'" viewBox="0 0 24 24" :troke="storedUserLikes > 0 ? 'red' : 'currentColor'"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
      {{ initialLikes }} <span v-if="likesMaxed">max</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'LikeCounter',
  data () {
    return {
      initialLikes: null,
      timeoutInterval: null,
      likeClicks: 0
    }
  },
  async fetch () {
    const { data } = await this.$axios.get(`/.netlify/functions/fetch_likes?slug=${this.$route.params.slug}`)
    this.initialLikes = data.likes
  },
  computed: {
    likesMaxed () {
      return this.storedUserLikes >= 10
    },
    storedUserLikes () {
      return this.$store.state.storedUserLikes
    }
  },
  mounted () {
    this.$store.commit('initializeUserLikes', this.$route.params.slug)
  },
  fetchOnServer: false,
  methods: {
    addLikesOnInterval () {
      if (this.storedUserLikes < 10) {
        if (this.timeoutInterval) {
          clearTimeout(this.timeoutInterval)
        }

        // if (this.isSoundEnabled) {
        //   this.audio = new Audio(require('@/assets/sounds/zap.mp3'))
        //   this.audio.play()
        // }
        this.$store.commit('incrementUserLikes', this.$route.params.slug)
        this.likeClicks++
        this.initialLikes++
        this.timeoutInterval = setTimeout(() => {
          this.sendLikesToDB(this.likeClicks)
          this.likeClicks = 0
        }, 1000)
      // } else if (this.isSoundEnabled) {
      //   this.capacityAudio = new Audio(require('@/assets/sounds/capacity.mp3'))
      //   this.capacityAudio.play()
      }
    },
    async sendLikesToDB (likesToSend) {
      await this.$axios.post(`/.netlify/functions/register_like?slug=${this.$route.params.slug}&likesToSend=${likesToSend}`)
    }
  }
}
</script>
