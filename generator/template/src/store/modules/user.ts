import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import { login } from '@/api/user'
import store from '@/store'
import consts from '@/consts'

import {
  setToken,
  setUserInfo,
  setRoles,
  getUserInfo,
  removeToken,
  removeUserInfo,
  removeRoles,
  setResources,
  removeResources,
  getResources
} from '@/utils/auth'
import { Message } from 'element-ui'
import { IUser } from '@/typings/modules/user'
import { IResource } from '@/typings/modules/resource'

@Module({ dynamic: true, store, name: 'user', namespaced: true })
class User extends VuexModule {
  userInfo: IUser = getUserInfo()
  resouces: IResource[] = getResources()

  @Mutation
  public CHANGE_STATE(payload: { [key in string]: any }) {
    const keys = Object.keys(payload)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: any = this
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        _this[key] = payload[key]
      }
    }
  }

  @Action({ rawError: true })
  public async login(userInfo: {
    username: string
    password: string
    captcha: string
    timestamp: number
  }) {
    const { username, password, captcha, timestamp } = userInfo

    const response = await login({
      account: username.trim(),
      password,
      type: 'account',
      captcha,
      timestamp
    })

    const {
      data,
      head: { ret = consts.RET_CODE.FAIL, msg = '登录失败' } = {}
    } = response
    if (data && ret === consts.RET_CODE.SUCCESS) {
      const {
        accesstoken,
        subjectModel: {
          authority: { role, resource },
          userInfoDto
        },
        timeOut
      } = data
      this.CHANGE_STATE({ userInfo: userInfoDto })
      this.CHANGE_STATE({ resources: resource })
      setToken(accesstoken, timeOut)
      setUserInfo(userInfoDto)
      setRoles(role)
      setResources(resource)
      return data
    } else {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject('login failed')
    }
  }

  @Action({ rawError: true })
  public async logout(stopTask: boolean = false) {
    removeRoles()
    removeToken()
    removeUserInfo()
    removeResources()

    // 页面重定向登录页
    const pathname = window.location.pathname
    if (pathname !== '/login' && pathname !== '/') {
      location.href = '/login?redirect=' + encodeURIComponent(location.href)
    } else {
      location.href = '/login'
    }

    if (stopTask) {
      throw new Error('user logout')
    }
  }
}

export const UserModule = getModule(User)
