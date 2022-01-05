<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-06 09:33:28
 * @LastEditTime: 2022-01-04 09:34:12
 * @LastEditors: zhangzhenfei
 * @Description: 用户管理
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/system/role/index.vue
-->

<template>
  <div class="scroll-container">
    <!-- 查询条件 -->
    <query-condition :expand.sync="expand">
      <!-- 条件区域 -->
      <template v-slot:default>
        <el-form :inline="true" :model="form">
          <el-form-item label="日期：">
            <el-date-picker
              v-model="form.date"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </template>
      <!-- 查询按钮区域 -->
      <template v-slot:btns>
        <el-button v-waves type="primary" @click="handleQuery(false, true)">
          查询
        </el-button>
        <el-button v-waves type="line" plain @click="handleQuery(true, false)">
          重置
        </el-button>
        <el-button class="split" v-waves> 新增 </el-button>
      </template>
    </query-condition>
    <!-- 主容器 -->
    <div class="scroll-container" style="flex-direction: row">
      <div class="scroll-container main-panel-container" v-loading="loading">
        <el-table
          v-keep-scroll
          ref="roleTable"
          :data="searchResult.result"
          height="100%"
          row-key="id"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column type="index" width="40" align="center" />
          <el-table-column label="角色">
            <template slot-scope="{ row }">
              <div class="pi-align-center">
                <div>角色名：{{ row.roleName }}</div>
              </div>
              <div>描述：{{ row.roleExplain || '-' }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="isEnable" label="是否可用">
            <template slot-scope="{ row }">
              {{ row.isEnable === 0 ? '已禁用' : '已启用' }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120"
            fixed="right"
            align="center"
          >
            <template slot-scope="{ row }">
              <div class="operate-button">
                <el-button v-waves type="text" @click="handleEdit(row)">
                  编辑
                </el-button>
                <el-button
                  v-waves
                  type="text"
                  @click="handleDelete(row)"
                  style="color: #e02020"
                >
                  删除
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          :pageNo.sync="form.pageNo"
          :pageSize.sync="form.pageSize"
          :total="searchResult.totalCount"
          @pagination="handleQuery(false, false)"
        />
      </div>
      <resource-tree :role="currentRow" @save="handleQuery"></resource-tree>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QueryBase, { IQueryBase } from '@/mixins/query-base'
import { apiQueryList, apiDelete } from '@/api/role'
import { IRole, DefaultRole } from '@/typings/modules/role'
import {
  DefaultPagination,
  DefaultSearchCondition,
  DefaultListResult
} from '@/typings'
import ResourceTree from './components/resources-tree/index.vue'
import { Table } from 'element-ui'
import { getViewName } from '@/utils/common'

// @ts-ignore
const TAG_NAME = getViewName(__filename)

@Component({
  name: TAG_NAME,
  components: {
    ResourceTree
  }
})
export default class Home extends Mixins(QueryBase) implements IQueryBase {
  loading = false
  expand = false
  form: ListSearchCondition = { ...DefaultSearchCondition }
  searchResult: ListResult<IRole> = { ...DefaultListResult }

  roles: any[] = []

  currentRow: IRole = { ...DefaultRole }

  async handleQuery(
    resetCondition: boolean = false, // 是否重置查询条件
    resetPagination: boolean = false // 是否重置分页
  ) {
    if (resetCondition) {
      this.form = { ...DefaultSearchCondition }
    }
    if (resetPagination) {
      this.form = {
        ...this.form,
        ...DefaultPagination
      }
    }
    if (this.form.date?.length) {
      this.form.startDate = this.form.date[0]
      this.form.endDate = this.form.date[1]
    }
    console.log(
      TAG_NAME,
      `进行分页查询，是否重置条件：${resetCondition}，是否重置分页：${resetPagination}，查询条件`,
      this.form
    )
    const {
      data,
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiQueryList(this.form)
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.searchResult = data
    if (data.result.length) {
      const table = this.$refs.roleTable as Table
      table.setCurrentRow(this.currentRow.id ? this.currentRow : data.result[0])
    }
  }

  async handleDelete(row: IRole) {
    await this.$confirm('将永久删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    const {
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '删除失败' } = {}
    } = await apiDelete([row.id])
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.handleQuery()
    this.$notify.success('删除成功')
  }

  handleEdit(row: IRole) {
    this.$router.push({
      path: '/system/role/edit',
      query: {
        id: row.id
      }
    })
  }

  handleNewSub(row: IRole) {
    this.$router.push({
      path: '/system/role/edit',
      query: {
        pId: row.id
      }
    })
  }

  handleCurrentChange(currentRow: IRole) {
    this.currentRow = currentRow
  }
}
</script>
