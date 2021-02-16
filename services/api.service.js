import axios from 'axios'
import { API_URL } from '@/common/config'
/* import SetCookieParser from 'set-cookie-parser'

function parseSetCookies(cookies = []) {
  return cookies.map((cookie) => SetCookieParser(cookie))
}
*/

const ApiService = {
  init() {
    axios.defaults.baseURL = API_URL
    axios.defaults.headers.get.Accept = 'application/json'
    axios.defaults.headers.post.Accept = 'application/json'

    axios.interceptors.request.use(
      (request) => {
        console.info(
          '➖ [REQUESTING] ',
          request.method.toUpperCase(),
          request.url
        )
        request.withCredentials = true
        return request
      },
      (error) => {
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
