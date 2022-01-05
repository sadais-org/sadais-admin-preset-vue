import { IResource } from '@/typings/modules/resource'
import { IRole } from '@/typings/modules/role'
import { IUser } from '@/typings/modules/user'
import storage from '@/utils/storage'

const appName = process.env.VUE_APP_NAME

const TOKEN = `${appName}-Token`
const ROLES = `${appName}-Roles`
const USER_INFO = `${appName}-UserInfo`
const RESOURCES = `${appName}-Resource`

export function getToken() {
  const token = storage.get(TOKEN)
  return token || ''
}

export function setToken(token: string, expireDate: number) {
  // @ts-ignore
  const result = storage.set(TOKEN, token, expireDate)
  return result
}

export function removeToken() {
  const result = storage.remove(TOKEN)
  return result
}

export function getRoles(): IRole[] {
  const roles = storage.get(ROLES)
  return roles || []
}

export function setRoles(roles: IRole[]) {
  const result = storage.set(ROLES, roles)
  return result
}

export function removeRoles() {
  const result = storage.remove(ROLES)
  return result
}

export function getUserInfo(): IUser {
  const userInfo = storage.get(USER_INFO)
  return userInfo
}

export function setUserInfo(userInfo: IUser) {
  const result = storage.set(USER_INFO, userInfo)
  return result
}

export function removeUserInfo() {
  const result = storage.remove(USER_INFO)
  return result
}

export function getResources(): IResource[] {
  const resources = storage.get(RESOURCES)
  return resources
}

export function setResources(resource: IResource) {
  const result = storage.set(RESOURCES, resource)
  return result
}

export function removeResources() {
  const result = storage.remove(RESOURCES)
  return result
}
