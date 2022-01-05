/*
 * @Author: zhangzhenfei
 * @Date: 2021-12-06 16:05:13
 * @LastEditTime: 2021-12-17 11:10:33
 * @LastEditors: zhangzhenfei
 * @Description: 用户模块
 * @FilePath: /sadais-admin/src/typings/modules/user.ts
 */

import { IRole } from '@/typings/modules/role'

export interface IUser {
  /**
   * 手机账号
   */
  account: string
  /**
   * 生日
   */
  birthDay: string

  /**
   * 创建时间
   */
  createDate: string
  /**
   * 设备系统
   */
  deviceSystem: string
  /**
   * id
   */
  id: string
  /**
   * 用户名称
   */
  name: string
  /**
   * 	角色
   */
  roles: IRole[]
  /**
   * 是否启用
   */
  isEnable: number
  /**
   * 用户密码
   */
  password: string

  /**
   * 用户确认密码
   */
  confirmPassword: string
}

export const DefaultUser: IUser = {
  account: '',
  birthDay: '',
  createDate: '',
  deviceSystem: '',
  id: '',
  name: '',
  roles: [],
  isEnable: 1,
  password: '',
  confirmPassword: ''
}
