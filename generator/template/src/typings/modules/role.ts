/*
 * @Author: zhangzhenfei
 * @Date: 2021-12-03 09:41:01
 * @LastEditTime: 2021-12-17 11:21:05
 * @LastEditors: zhangzhenfei
 * @Description: 资源模型
 * @FilePath: /sadais-admin/src/typings/modules/role.ts
 */

import { IResource } from './resource'

/**
 * 角色模型
 */
export interface IRole {
  /**
   * ID值
   */
  id: string
  /**
   * 创建时间
   */
  createDate?: string
  /**
   * 是否启用
   */
  isEnable: number
  /**
   * 项目名称
   */
  projectName: string
  /**
   * 子资源
   */
  resourceList: IResource[]
  /**
   * 角色编码
   */
  roleCode: string
  /**
   * 角色说明
   */
  roleExplain: string
  /**
   * 角色名称
   */
  roleName: string
}

export const DefaultRole: IRole = {
  id: '',
  createDate: '',
  isEnable: 0,
  roleName: '',
  roleExplain: '',
  roleCode: '',
  projectName: '',
  resourceList: []
}
