<!--
 * @Author: zhangzhenfei
 * @Date: 2021-11-29 16:26:43
 * @LastEditTime: 2022-01-04 09:34:08
 * @LastEditors: zhangzhenfei
 * @Description: 资源管理
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/system/resource/index.vue
-->

<template>
  <div class="scroll-container" v-keep-scroll>
    <!-- 查询条件 -->
    <query-condition :expand.sync="expand">
      <!-- 查询按钮区域 -->
      <template v-slot:btns>
        <el-button v-waves type="primary" @click="handleQuery">
          查询
        </el-button>
        <el-button class="split" v-waves @click="handleNew"> 新增 </el-button>
      </template>
    </query-condition>
    <!-- 主容器 -->
    <div class="main-panel-container" v-loading="loading">
      <el-table
        :data="resources"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'resourceDtoList' }"
      >
        <el-table-column prop="resName" label="名称" />
        <el-table-column prop="icon" label="图标" width="60" align="center">
          <template slot-scope="{ row }">
            <svg-icon v-if="row.icon" slot="prefix" :icon-class="row.icon" />
            <div v-else>-</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="80" align="center">
          <template slot-scope="{ row }">
            {{ row.type === 0 ? '菜单' : '按钮' }}
          </template>
        </el-table-column>
        <el-table-column prop="fullPath" label="路由" />
        <el-table-column prop="componentPath" label="组件路径" />
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.level !== 0" class="operate-button">
              <el-button v-waves type="text" @click="handleEdit(row)">
                编辑
              </el-button>
              <el-button v-waves type="text" @click="handleNewSub(row)">
                新增下级资源
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import QueryBase, { IQueryBase } from '@/mixins/query-base'
import { apiQueryByLevel, apiDelete } from '@/api/resource'
import { IResource } from '@/typings/modules/resource'
import { getViewName } from '@/utils/common'

// @ts-ignore
const TAG_NAME = getViewName(__filename)

@Component({
  name: TAG_NAME
})
export default class Home extends Mixins(QueryBase) implements IQueryBase {
  loading = false
  resources: IResource[] = []

  expand = false

  form = {
    date: []
  }

  async handleQuery() {
    const {
      data,
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiQueryByLevel(0)
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.resources = data
  }

  async handleDelete(row: IResource) {
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

  handleNew() {
    const rootId = this.resources[0].id
    this.$router.push({
      path: '/system/resource/add',
      query: {
        pId: rootId
      }
    })
  }

  handleEdit(row: IResource) {
    this.$router.push({
      path: '/system/resource/edit',
      query: {
        id: row.id
      }
    })
  }

  handleNewSub(row: IResource) {
    this.$router.push({
      path: '/system/resource/add',
      query: {
        pId: row.id
      }
    })
  }
}
</script>
