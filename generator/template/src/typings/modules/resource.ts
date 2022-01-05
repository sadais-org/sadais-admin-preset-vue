/*
 * @Author: zhangzhenfei
 * @Date: 2021-12-03 09:41:01
 * @LastEditTime: 2022-01-04 14:29:46
 * @LastEditors: zhangzhenfei
 * @Description: 资源模型
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/typings/modules/resource.ts
 */

/**
 * 资源模型
 */
 export interface IResource {
  /**
   * 组件路径
   */
  componentPath: string
  /**
   * 创建时间
   */
  createDate?: string
  /**
   * 菜单图标
   */
  icon: string
  /**
   * ID值
   */
  id: string
  /**
   * 层级
   */
  level: number
  /**
   * 父节点ID
   */
  pId: string
  /**
   * 访问路径
   */
  path: string
  /**
   * 访问全路径
   */
  fullPath: string
  /**
   * 项目编号
   */
  projectCode: string
  /**
   * 项目ID
   */
  projectId: string
  /**
   * 项目名称
   */
  projectName: string
  /**
   * 资源编码
   */
  resCode: string
  /**
   * 资源名称
   */
  resName: string
  /**
   * 子资源
   */
  resourceDtoList: IResource[]
  /**
   * 排序
   */
  sort: number
  /**
   * 标题
   */
  title: string
  /**
   * 资源类型 0菜单 1按钮
   */
  type: number
  /**
   * 接口地址
   */
  url: string
  /**
   * 扩展字段
   */
  meta?: string
  /**
   * 父级节点
   */
  parent?: IResource
}

export const DefaultResource: IResource = {
  level: 0,
  icon: '',
  pId: '',
  sort: 1,
  title: '',
  type: 0,
  url: '',
  path: '',
  fullPath: '',
  resName: '',
  projectCode: '',
  resourceDtoList: [],
  componentPath: '',
  resCode: '',
  id: '',
  projectName: '',
  projectId: '',
  createDate: '',
  meta: ''
}
