/*
 * @Author: zhangzhenfei
 * @Date: 2021-12-17 11:01:15
 * @LastEditTime: 2021-12-17 12:19:20
 * @LastEditors: zhangzhenfei
 * @Description: 全局默认变量
 * @FilePath: /sadais-admin/src/typings/index.ts
 */

export const DefaultPagination = Object.freeze({
  pageNo: 1,
  pageSize: 10
})

/**
 * 默认的查询条件
 */
export const DefaultSearchCondition: ListSearchCondition = Object.freeze({
  ...DefaultPagination,
  date: [],
  startDate: '',
  endDate: '',
  searchValue: {}
})

/**
 * 默认的列表结果
 */
export const DefaultListResult: ListResult = Object.freeze({
  ...DefaultPagination,
  totalCount: 0,
  result: []
})
