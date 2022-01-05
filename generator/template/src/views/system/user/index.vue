<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-06 09:33:28
 * @LastEditTime: 2022-01-04 09:34:26
 * @LastEditors: zhangzhenfei
 * @Description: 用户管理
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/system/user/index.vue
-->

<template>
  <div class="scroll-container" v-keep-scroll>
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
        <el-button
          v-if="$auth('edit')"
          class="split"
          v-waves
          @click="handleEdit"
        >
          新增
        </el-button>
      </template>
    </query-condition>
    <!-- 主容器 -->
    <div class="main-panel-container" v-loading="loading">
      <el-table
        :data="searchResult.result"
        row-key="id"
        border
        default-expand-all
      >
        <el-table-column type="index" width="40" align="center" />
        <el-table-column prop="account" label="账号" sortable width="120" />
        <el-table-column prop="name" label="姓名" sortable width="120" />
        <el-table-column prop="role" label="角色">
          <template slot-scope="{ row }">
            {{ row.roles.map(item => item.roleName).join('，') }}
          </template>
        </el-table-column>
        <el-table-column prop="isEnable" label="是否可用">
          <template slot-scope="{ row }">
            {{ row.isEnable === 0 ? '已禁用' : '已启用' }}
          </template>
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template slot-scope="{ row }">
            <div class="operate-button">
              <el-button
                v-if="$auth('edit')"
                v-waves
                type="text"
                @click="handleEdit(row)"
              >
                编辑
              </el-button>
              <el-button
                v-if="$auth('distribute-role')"
                v-waves
                type="text"
                @click="handleDistributeRole(row)"
              >
                分配角色
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
      ></pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QueryBase, { IQueryBase } from '@/mixins/query-base'
import { apiQueryList, apiDelete } from '@/api/user'
import { IUser } from '@/typings/modules/user'
import {
  DefaultPagination,
  DefaultSearchCondition,
  DefaultListResult
} from '@/typings'
import { getViewName } from '@/utils/common'

// @ts-ignore
const TAG_NAME = getViewName(__filename)

@Component({
  name: TAG_NAME
})
export default class Home extends Mixins(QueryBase) implements IQueryBase {
  loading = false
  expand = false
  form: ListSearchCondition = { ...DefaultSearchCondition }
  searchResult: ListResult<IUser> = { ...DefaultListResult }

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
    console.log(
      TAG_NAME,
      `进行分页查询，是否重置条件：${resetCondition}，是否重置分页：${resetPagination}，查询条件`,
      this.form
    )
    if (this.form.date?.length) {
      this.form.startDate = this.form.date[0]
      this.form.endDate = this.form.date[1]
    }
    const {
      data,
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiQueryList(this.form)
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.searchResult = data
  }

  async handleDelete(row: IUser) {
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

  handleEdit(row?: IUser) {
    this.$router.push({
      path: '/system/user/edit',
      query: row
        ? {
            id: row.id
          }
        : {}
    })
  }

  handleDistributeRole(row: IUser) {
    this.$router.push({
      path: '/system/user/distribute-role',
      query: {
        id: row.id
      }
    })
  }
}
</script>
