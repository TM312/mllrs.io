export const state = () => ({
  storedUserLikes: 1
})

export const mutations = {
  initializeUserLikes (state, slug) {
    const storedLikes = Math.abs(Number(localStorage.getItem(slug)))

    if (storedLikes) {
      storedLikes >= 10 ? state.storedUserLikes = 10 : state.storedUserLikes = storedLikes
    } else {
      localStorage.setItem(slug, 1)
      state.storedUserLikes = 1
    }
  },
  incrementUserLikes (state, slug) {
    state.storedUserLikes = state.storedUserLikes + 1
    localStorage.setItem(slug, state.storedUserLikes)
  }
}
