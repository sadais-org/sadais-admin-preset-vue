/*
 * @Author: zhangzhenfei
 * @Date: 2021-03-10 18:55:17
 * @LastEditTime: 2021-12-15 17:56:41
 * @LastEditors: zhangzhenfei
 * @Description: 常用公用方法
 * @FilePath: /sadais-admin/src/utils/common.ts
 */

import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'

/**
 * 将对象序列化成url字符串
 * @param  {Object} obj={} 参数对象
 * @param  {Boolean} encodeURI=true 对象值使用编码
 * @param  {String} preConnectChat=? url前连接字符串，如果为空则不连接
 * @return {String} 转换之后的url参数
 */
export function objToUrl(
  obj: any = {},
  encodeURI = true,
  preConnectChat = '?'
) {
  const result = Object.keys(obj).map(prop => {
    const value = encodeURI ? encodeURIComponent(obj[prop]) : obj[prop]
    return `${prop}=${value}`
  })
  return result.length ? preConnectChat + result.join('&') : ''
}

/**
 * 将url字符串解析成对象
 * @param  {String} str='' 带url参数的地址
 * @param  {Boolean} decodeURI=true 使用解码
 * @return {Object} 转换之后的url参数
 */
export function urlToObj(str = '', decodeURI = true) {
  const strSplits = str.split('?')
  const query = strSplits.length === 2 ? strSplits[1] : str
  const params = query.split('&')
  const result = params.reduce((obj: any, param) => {
    const paramObj = param.split('=')
    const name = paramObj[0]
    const value = paramObj[1] || ''
    obj[name] = decodeURI ? decodeURIComponent(value) : value
    return obj
  }, {})
  return result || {}
}

/**
 * 对 Object Params Props 进行decode
 * @param {Object} params={} params
 * @return {Object} 转换之后的params
 */
export function decodeParams(params: any = {}) {
  const convertObject: any = {}
  for (const paramObject of Object.keys(params)) {
    convertObject[paramObject] = decodeURIComponent(params[paramObject])
  }
  return convertObject
}

/**
 * 动态导入
 * @param context reqquire的上下文
 * @param excludeIndex 是否排除index
 * @returns 导入的文件
 */
export function dynamicImport(
  context: __WebpackModuleApi.RequireContext,
  excludeIndex = true
) {
  const importFileMap: { [key: string]: any } = {}
  for (const key of context.keys()) {
    const keyArray = key.split('/')
    keyArray.shift() // 移除
    const name = keyArray
      .join('.')
      .replace(/\.js$/g, '')
      .replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
    if (excludeIndex && name === 'index') continue // 排除index文件
    const importContext = context(key)
    if (importContext) {
      importFileMap[name] = importContext.default || importContext
    }
  }
  return importFileMap
}

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

export const getViewName = (filePath: string) => {
  const filepath = filePath.split('.vue')[0].replace('src/views/', '')
  return upperFirst(camelCase(filepath))
}
