import axios from 'axios'
import { API_URL } from '@/common/config'
import SetCookieParser from 'set-cookie-parser'

const ApiService = {
  init(cookieManager) {
    axios.defaults.baseURL = API_URL
    axios.defaults.headers.get.Accept = 'application/json'
    axios.defaults.headers.post.Accept = 'application/json'

    axios.interceptors.request.use(
      (request) => {
        request.withCredentials = true
        return request
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    axios.interceptors.response.use(
      (res) => {
        const parsedSetCookies = SetCookieParser.parse(res)

        console.info('Logging PARSED SET COOKIES...', parsedSetCookies)

        parsedSetCookies.forEach((cookie) => {
          // Have an object with cookie options only
          const cookieOptions = { ...cookie }
          delete cookieOptions.name
          delete cookieOptions.value

          console.info(
            'Now setting cookies: ',
            cookie.name,
            cookie.value,
            cookieOptions
          )
          cookieManager.set(cookie.name, cookie.value, cookieOptions)
        })

        return res
      },
      function (error) {
        return Promise.reject(error)
      }
    )
  },
  async bootstrap() {
    return await ApiService.post('give-me-cookies', {})
  },
  get(resource) {
    return axios.get(`${resource}`).catch((error) => {
      throw new Error(`[AB] ApiService ${error}`)
    })
  },

  post(resource, params, config) {
    return axios.post(`${resource}`, params, config)
  },

  patch(resource, params, config) {
    return axios.patch(`${resource}`, params, config)
  },

  put(resource, params) {
    return axios.put(`${resource}`, params)
  },

  delete(resource) {
    return axios.delete(resource)
  },
}

export default ApiService
