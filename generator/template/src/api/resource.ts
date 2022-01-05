/*
 * @Author: zhangzhenfei
 * @Date: 2021-11-29 16:29:45
 * @LastEditTime: 2021-12-07 10:13:03
 * @LastEditors: zhangzhenfei
 * @Description: 资源接口
 * @FilePath: /sadais-admin/src/api/resource.ts
 */
import request from '@/utils/request'
import { IResource } from '@/typings/modules/resource'

/**
 * 分页获取列表记录
 * @param params 参数
 * @returns 列表记录
 */
export async function apiQueryList(params: ListSearchCondition) {
  const url = '/artisan/v1/resource/findpagelist'
  const { data } = await request.post<HttpResponse<ListResult<IResource>>>(
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
  const url = '/artisan/v1/resource/findlistbylevel'
  const params: any = {}
  if (level !== -1) {
    params.level = level
  }
  const { data } = await request.get<HttpResponse<IResource[]>>(url, { params })
  return data
}

/**
 * 创建/更新
 * @param {Object} params 对象信息
 */
export async function apiSaveOrUpdate(params: IResource) {
  const { data } = await request.post<HttpResponse>(
    '/artisan/v1/resource/saveorupdate',
    params
  )
  return data
}

/**
 * 删除
 * @param {Object} ids id信息
 */
export async function apiDelete(ids: string[]) {
  const { data } = await request.post<HttpResponse>(
    '/artisan/v1/resource/del',
    {
      ids
    }
  )
  return data
}

/**
 * 获取信息
 * @param {Object} id 记录id
 */
export async function apiGetById(id: string) {
  const { data } = await request.get<HttpResponse<IResource>>(
    '/artisan/v1/resource/getbyid',
    {
      params: {
        id
      }
    }
  )
  return data
}
