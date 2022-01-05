export interface ICONSTS {
  NAME: string // 支撑后台名称
  AGENT_KEY: string
  AGENT_VALUE: string
  TOKEN_KEY: string
  TOKEN_EXPIRED: number
  TOKEN_UNDEFINED: number
  API_LOGIN: string
  RET_CODE: {
    SUCCESS: number
    FAIL: number
    TOKEN_UNDEFINED: number
    TOKEN_EXPIRED: number
  } // 返回RET状态码解析
  // 第一页
  FIRST_PAGENO: number
  // 最大页码
  MAX_PAGESIZE: number
}

const appName = process.env.VUE_APP_NAME || 'Sadais-Admin'

const consts: ICONSTS = {
  NAME: appName,
  AGENT_KEY: 'sadais-agent',
  AGENT_VALUE: `${appName}/1.0/PLATFORM/${appName}///`,
  TOKEN_KEY: 'jwttoken',
  TOKEN_EXPIRED: 2,
  TOKEN_UNDEFINED: 3,
  API_LOGIN: '',
  RET_CODE: {
    SUCCESS: 0,
    FAIL: 1,
    TOKEN_UNDEFINED: 19,
    TOKEN_EXPIRED: 2
  }, // 返回RET状态码解析
  FIRST_PAGENO: 1,
  MAX_PAGESIZE: 999
}

export default consts
