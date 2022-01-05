<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-06 09:33:33
 * @LastEditTime: 2022-01-04 09:34:21
 * @LastEditors: zhangzhenfei
 * @Description: 用户新增/编辑
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/system/user/edit.vue
-->

<template>
  <div class="scroll-container" v-keep-scroll v-loading="loading">
    <navbar :title="$route.query.id ? '编辑用户' : '新增用户'" />
    <div class="pi-scroll">
      <el-form
        class="edit-form"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-suffix="："
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <template v-if="!$route.query.id">
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="用户密码"
            />
          </el-form-item>
          <el-form-item
            v-if="form.password"
            label="确认密码"
            prop="confirmPassword"
          >
            <el-input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入用户密码"
            />
          </el-form-item>
        </template>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.isEnable" size="mini">
            <el-radio-button :label="1">是</el-radio-button>
            <el-radio-button :label="0">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色">
          <div style="height: 520px">
            <roles-table v-model="form.roles"></roles-table>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <form-footer class="pi-pd-lr-12">
      <el-button type="primary" @click="handleSubmitForm('form')">
        {{ form.id ? '更新' : '添加' }}
      </el-button>
    </form-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { IUser, DefaultUser } from '@/typings/modules/user'
import { apiGetById, apiSaveOrUpdate } from '@/api/user'
import RolesTable from './components/roles-table/index.vue'
import cloneDeep from 'lodash/cloneDeep'
import { getViewName } from '@/utils/common'

// @ts-ignore
const TAG_NAME = getViewName(__filename)
const DEFAULT_META = {
  hide: false,
  cache: true
}

@Component({
  name: TAG_NAME,
  components: {
    RolesTable
  }
})
export default class extends Vue {
  private loading: boolean = false

  private form: IUser = cloneDeep(DefaultUser)

  private meta: { [key: string]: any } = { ...DEFAULT_META }

  private get rules() {
    const rules: any = {
      account: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
    }
    if (!this.$route.query.id) {
      rules.password = [
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ]
      rules.confirmPassword = [
        {
          required: true,
          message: '确认密码不能为空',
          trigger: 'blur'
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            if (value === this.form.password) {
              callback()
            } else {
              callback(new Error('两次输入的密码不一致'))
            }
          }
        }
      ]
    }
    return rules
  }

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

  handleNaviBack() {
    this.$router.back()
  }

  handleSubmitForm(formName: string) {
    const form = this.$refs[formName] as Form
    form.validate(async valid => {
      if (!valid) return
      const {
        head: { ret = this.$consts.RET_CODE.FAIL, msg = '更新失败' }
      } = await apiSaveOrUpdate(this.form)
      if (ret !== this.$consts.RET_CODE.SUCCESS) {
        return this.$notify.error({
          title: '错误',
          message: msg
        })
      }
      this.$notify({
        title: '成功',
        message: this.form.id ? '更新成功' : '创建成功',
        type: 'success'
      })
      setTimeout(() => {
        this.handleNaviBack()
      }, 200)
    })
  }
}
</script>
