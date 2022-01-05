<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-06 09:33:28
 * @LastEditTime: 2022-01-04 09:34:17
 * @LastEditors: zhangzhenfei
 * @Description: 用户管理
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/system/user/distribute-role.vue
-->

<template>
  <div class="scroll-container" v-loading="loading">
    <navbar title="分配角色" />
    <div class="main-panel-container">
      <roles-table v-model="form.roles"></roles-table>
    </div>
    <form-footer class="" height="auto">
      <div class="pi-w-100P pi-h-100P pi-pd-lr-12 pi-pd-tb-16 pi-align-end">
        <div class="pi-flex-sub pi-fz-16 pi-fw-500">
          <div>用户名：{{ form.name }}</div>
          <div class="pi-mg-top-12" style="min-height: 30px">
            角色：<el-tag v-for="role in form.roles" :key="role.id">{{
              role.roleName
            }}</el-tag>
          </div>
        </div>
        <el-button type="primary" @click="handleSave()"> 保存 </el-button>
      </div>
    </form-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { apiGetById, apiDisRoles } from '@/api/user'

import { DefaultUser, IUser } from '@/typings/modules/user'
import cloneDeep from 'lodash/cloneDeep'
import RolesTable from './components/roles-table/index.vue'
import { getViewName } from '@/utils/common'

// @ts-ignore
const TAG_NAME = getViewName(__filename)

@Component({
  name: TAG_NAME,
  components: {
    RolesTable
  }
})
export default class extends Vue {
  loading = false

  form: IUser = cloneDeep(DefaultUser)

  created() {
    const { id } = this.$route.query
    id && (this.form.id = id as string)
    if (!id) return
    this.init()
  }

  async init() {
    const {
      data,
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取数据失败' }
    } = await apiGetById(this.form.id)
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error({
        title: '错误',
        message: msg
      })
    }
    this.form = data
  }

  async handleSave() {
    if (!this.form.id) return
    const {
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiDisRoles(
      this.form.id,
      this.form.roles.map(item => item.id)
    )
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.$emit('save')
    this.$notify.success('用户角色分配成功')
    this.$router.go(-1)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tag + .el-tag {
  margin-left: 10px;
}
</style>
