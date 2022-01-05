declare enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE'
}

declare interface HttpResponseHead {
  method: HttpMethod
  msg: string
  param: any
  requestId: string
  ret: number
  timestamp: string
  uri: string
}

declare interface HttpResponse<T = any> {
  data: T
  head: HttpResponseHead
}

/**
 * 列表查询条件
 */
declare interface ListSearchCondition {
  /**
   * 当前页码
   */
  pageNo: number
  /**
   * 每页大小
   */
  pageSize: number
  /**
   * 查询时间
   */
  date?: string[]
  /**
   * 开始时间
   */
  startDate?: string
  /**
   * 结束时间
   */
  endDate?: string
  /**
   * 查询参数
   */
  searchValue?: object
  /**
   * 其余扩展属性
   */
  [key: string]: any
}

/**
 * 列表结果
 */
declare interface ListResult<T = any> {
  result: T[]
  pageNo: number
  pageSize: number
  totalCount: number
}
