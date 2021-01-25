import ApiService from '@/services/api.service'

export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  // This is automatically run in `src/state/store.js` when the app
  // starts, along with any other actions named `init` in other modules.
  async bootstrap() {
    console.info('bootstraping app')

    try {
      const res = await ApiService.bootstrap()

      console.warn('Received headers in BOOTSTRAP', res.headers['set-cookie'])
    } catch (err) {
      console.warn(err)
    }
  },
}
