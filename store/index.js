import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('app/bootstrap')
  },
}
