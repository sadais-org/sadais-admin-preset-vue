/*
 * @Author: zhangzhenfei
 * @Date: 2021-11-29 16:29:45
 * @LastEditTime: 2021-12-10 16:49:44
 * @LastEditors: zhangzhenfei
 * @Description: 资源接口
 * @FilePath: /sadais-admin/src/api/role.ts
 */
import request from '@/utils/request'
import { IRole } from '@/typings/modules/role'

/**
 * 分页获取列表记录
 * @param params 参数
 * @returns 列表记录
 */
export async function apiQueryList(params: ListSearchCondition) {
  const url = '/artisan/v1/role/findpagelist'
  const { data } = await request.post<HttpResponse<ListResult<IRole>>>(
    url,
    params
  )
  return data
}

/**
 * 根据level获取树形记录
 * @param level 层级
 * @returns 树形记录
 */
export async function apiQueryByLevel(level: number = -1) {
  const url = '/artisan/v1/role/findlistbylevel'
  const params: any = {}
  if (level !== -1) {
    params.level = level
  }
  const { data } = await request.get<HttpResponse<IRole[]>>(url, { params })
  return data
}

/**
 * 创建/更新
 * @param {Object} params 对象信息
 */
export async function apiSaveOrUpdate(params: IRole) {
  const { data } = await request.post<HttpResponse>(
    '/artisan/v1/role/saveorupdate',
    params
  )
  return data
}

/**
 * 删除
 * @param {Object} ids id信息
 */
export async function apiDelete(ids: string[]) {
  const { data } = await request.post<HttpResponse>('/artisan/v1/role/del', {
    ids
  })
  return data
}

/**
 * 获取信息
 * @param {Object} id 记录id
 */
export async function apiGetById(id: string) {
  const { data } = await request.get<HttpResponse<IRole>>(
    '/artisan/v1/role/getbyid',
    {
      params: {
        id
      }
    }
  )
  return data
}

/**
 * 为角色分配资源
 * @param roleId 角色ID
 * @param resourceIds 资源IDs
 * @returns
 */
export async function apiDisResource(roleId: string, resourceIds: string[]) {
  const { data } = await request.post<HttpResponse<any>>(
    '/artisan/v1/role/disresource',
    {
      roleId,
      resourceIds
    }
  )
  return data
}
