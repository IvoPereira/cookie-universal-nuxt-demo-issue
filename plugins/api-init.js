import ApiService from '@/services/api.service'

export default ({ app }) => {
  const cookieManager = app.$cookiz

  ApiService.init(cookieManager)
}
