import request from '@/utils/request'
import { IUser } from '@/typings/modules/user'
/**
 * 分页获取列表记录
 * @param params 参数
 * @returns 列表记录
 */
export async function apiQueryList(
  params: ListSearchCondition
): Promise<HttpResponse<ListResult<IUser>>> {
  const url = '/artisan/v1/useraccount/findpagelist'
  const { data } = await request.post(url, params)
  return data
}

/**
 * 创建/更新
 * @param {Object} user 对象信息
 */
export async function apiSaveOrUpdate(user: IUser) {
  const { data } = await request.post<HttpResponse>(
    '/artisan/v1/useraccount/saveorupdate',
    {
      ...user,
      roles: user.roles.map(item => item.id)
    }
  )
  return data
}

/**
 * 删除
 * @param {Object} ids id信息
 */
export async function apiDelete(ids: string[]) {
  const { data } = await request.post<HttpResponse>(
    '/artisan/v1/useraccount/del',
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
  const { data } = await request.get<HttpResponse<IUser>>(
    '/artisan/v1/useraccount/getbyid',
    {
      params: {
        id
      }
    }
  )
  return data
}

export const login = async (params: any) => {
  const { data } = await request.get<HttpResponse>(
    '/artisan/v1/useraccount/login',
    { params }
  )
  return data
}

/**
 * 为用户分配角色
 * @param accountId 账号ID
 * @param roleIds 角色IDs
 * @returns
 */
export async function apiDisRoles(accountId: string, roleIds: string[]) {
  const { data } = await request.post<HttpResponse<any>>(
    '/artisan/v1/useraccount/disrole',
    {
      accountId,
      roleIds
    }
  )
  return data
}
