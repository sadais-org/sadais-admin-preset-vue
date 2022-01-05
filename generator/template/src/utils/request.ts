import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import consts from '@/consts'
import { getToken } from '@/utils/auth'
import { UserModule } from '@/store/modules/user'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: false, // 开启跨域身份凭证
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    [consts.AGENT_KEY]: consts.AGENT_VALUE
  },
  timeout: 60000 // request timeout
})

// Request interceptors
service.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const token = getToken()
    if (!config.headers) {
      config.headers = {}
    }
    config.headers[consts.TOKEN_KEY] = token || ''
    config.headers[consts.AGENT_KEY] = consts.AGENT_VALUE
    return config

    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  async (response: AxiosResponse<HttpResponse>) => {
    const res = response.data
    const { head: { ret = -1 } = {} } = res
    if (ret === consts.TOKEN_EXPIRED || ret === consts.TOKEN_UNDEFINED) {
      UserModule.logout(true)
    }
    return response
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

export default service
