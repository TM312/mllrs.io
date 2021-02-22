export const state = () => ({
  storedUserVoltage: 1
})

export const mutations = {
  initializeVoltage (state, slug) {
    const storedVolts = Math.abs(Number(localStorage.getItem(slug)))

    if (storedVolts) {
      storedVolts >= 12 ? state.storedUserVoltage = 12 : state.storedUserVoltage = storedVolts
    } else {
      localStorage.setItem(slug, 1)
      state.storedUserVoltage = 1
    }
  },
  incrementVoltage (state, slug) {
    state.storedUserVoltage = state.storedUserVoltage + 1
    localStorage.setItem(slug, state.storedUserVoltage)
  }
}
