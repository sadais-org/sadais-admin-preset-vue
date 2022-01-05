<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-14 15:00:37
 * @LastEditTime: 2021-12-17 11:22:04
 * @LastEditors: zhangzhenfei
 * @Description: 角色表格
 * @FilePath: /sadais-admin/src/views/system/user/components/roles-table/index.vue
-->

<template>
  <div class="scroll-container">
    <div class="pi-scroll" v-loading="loading">
      <el-table
        ref="roleTable"
        v-keep-scroll
        :data="searchResult.result"
        height="100%"
        row-key="id"
        border
        highlight-current-row
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" :reserve-selection="true" width="55">
        </el-table-column>
        <el-table-column prop="roleName" label="角色"> </el-table-column>
        <el-table-column
          prop="isEnable"
          label="是否可用"
          width="80"
          align="center"
        >
          <template slot-scope="{ row }">
            {{ row.isEnable === 1 ? '已启用' : '已禁用' }}
          </template>
        </el-table-column>
        <el-table-column prop="roleExplain" label="描述" min-width="200">
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :pageNo.sync="searchResult.pageNo"
      :pageSize.sync="searchResult.pageSize"
      :total="searchResult.totalCount"
      @pagination="handleQuery"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, ModelSync } from 'vue-property-decorator'
import { apiQueryList } from '@/api/role'
import { IRole } from '@/typings/modules/role'
import { DefaultListResult } from '@/typings'
import cloneDeep from 'lodash/cloneDeep'
import { Table } from 'element-ui'

const TAG_NAME = 'DistributeRole'

const DEFAULT_RESULT: ListResult<IRole> = { ...DefaultListResult }

@Component({
  name: TAG_NAME,
  components: {}
})
export default class extends Vue {
  @ModelSync('value', 'change', { type: Array, default: () => [] })
  syncedChecked!: IRole[]

  loading = false

  searchResult = cloneDeep(DEFAULT_RESULT)

  created() {
    this.handleQuery()
  }

  async handleQuery() {
    const {
      data,
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiQueryList({
      pageNo: this.searchResult.pageNo,
      pageSize: this.searchResult.pageSize
    })
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.searchResult = data
    if (this.syncedChecked.length) {
      const table = this.$refs.roleTable as Table
      this.syncedChecked.forEach(item => {
        table.toggleRowSelection(item)
      })
    }
  }

  handleSelectionChange(selection: IRole[]) {
    this.syncedChecked = selection
  }
}
</script>
