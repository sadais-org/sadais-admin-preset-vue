<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-06 09:33:28
 * @LastEditTime: 2022-01-04 09:33:55
 * @LastEditors: zhangzhenfei
 * @Description: 用户管理
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/order/index.vue
-->

<template>
  <div class="scroll-container">
    <!-- 主容器 -->
    <div class="main-panel-container" v-loading="loading">
      订单表格，状态：{{ statusMap[currentStatus] }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QueryBase, { IQueryBase } from '@/mixins/query-base'
import { getViewName } from '@/utils/common'

// @ts-ignore
const TAG_NAME = getViewName(__filename)

@Component({
  name: TAG_NAME
})
export default class Home extends Mixins(QueryBase) implements IQueryBase {
  loading = false
  expand = false

  get currentStatus() {
    return this.$route.query.status || 'all'
  }

  get statusMap() {
    return ['待发货', '待收货']
  }

  async handleQuery(
    resetCondition: boolean = false, // 是否重置查询条件
    resetPagination: boolean = false // 是否重置分页
  ) {
    console.log(resetCondition, resetPagination)
  }
}
</script>
