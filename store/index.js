import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from '@/services/api.service'
import SetCookieParser from 'set-cookie-parser'
import axios from 'axios'

function parseSetCookies(cookies = []) {
  return cookies.map((cookie) => SetCookieParser(cookie))
}

Vue.use(Vuex)

export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }, { app }) {
    /**
     * With useInterceptors = true "Cannot set headers after they are sent to the client" is shown in the browser when trying to refresh for the second time.
     * With useInterceptors = false it works perfectly when refreshing.
     *
     * Interceptors seems to provide a different behaviour and looks like SSR does not wait for it to end, while using promise/await does look like
     * it correctly waits for fetching the headers from the response, setting them as cookies using the cookie-universal.
     */
    const useInterceptors = true

    if (useInterceptors) {
      console.info('Handling cookies on interceptors...')
      axios.interceptors.response.use(
        (res) => {
          console.info('response.headers from nuxtServerInit', res.headers, res)

          const setCookies = res.headers['set-cookie']

          if (setCookies) {
            const parsedSetCookies = parseSetCookies(setCookies)
            const newCookies = []
            // Logger.info('after parsing set cookies')
            parsedSetCookies.forEach((cookie) => {
              const cookieItem = cookie[0]
              // Have an object with cookie options only
              const cookieOptions = { ...cookieItem }
              delete cookieOptions.name
              delete cookieOptions.value
              newCookies.push({
                name: cookieItem.name,
                value: cookieItem.value,
                opts: cookieOptions,
              })
            })

            console.info('newCookies', newCookies)

            app.$cookiz.setAll(newCookies)
          }

          return res
        },
        function (error) {
          return Promise.reject(error)
        }
      )
    }

    const response = await ApiService.bootstrap()

    if (!useInterceptors) {
      console.info('Handling cookies outside of interceptors...')
      const setCookies = response.headers['set-cookie']

      if (setCookies) {
        const parsedSetCookies = parseSetCookies(setCookies)
        const newCookies = []
        // Logger.info('after parsing set cookies')
        parsedSetCookies.forEach((cookie) => {
          const cookieItem = cookie[0]
          // Have an object with cookie options only
          const cookieOptions = { ...cookieItem }
          delete cookieOptions.name
          delete cookieOptions.value
          newCookies.push({
            name: cookieItem.name,
            value: cookieItem.value,
            opts: cookieOptions,
          })
        })

        console.info('newCookies', newCookies)

        app.$cookiz.setAll(newCookies)
      }
    }
  },
}
