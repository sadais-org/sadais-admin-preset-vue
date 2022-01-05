<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-02 11:21:16
 * @LastEditTime: 2022-01-04 09:34:00
 * @LastEditors: zhangzhenfei
 * @Description: 
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/views/system/resource/edit.vue
-->

<template>
  <div class="scroll-container" v-keep-scroll v-loading="loading">
    <navbar :title="$route.query.id ? '编辑资源' : '新增资源'" />
    <div class="pi-scroll">
      <el-form
        class="edit-form"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        label-suffix="："
      >
        <el-divider content-position="left">基础设置</el-divider>
        <el-form-item label="资源类型" prop="type">
          <el-radio-group v-model="form.type" size="mini" style="width: 178px">
            <el-radio-button :label="0">菜单</el-radio-button>
            <el-radio-button :label="1">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="form.type === 0" label="菜单图标" prop="icon">
          <el-popover
            placement="bottom-start"
            trigger="click"
            width="450"
            @show="$refs['iconSelect'].reset()"
          >
            <icon-select ref="iconSelect" @selected="form.icon = $event" />
            <el-input
              slot="reference"
              v-model="form.icon"
              placeholder="点击选择图标"
              readonly
              clearable
            >
              <svg-icon
                v-if="form.icon"
                slot="prefix"
                :icon-class="form.icon"
                class="el-input__icon"
                style="height: 32px; width: 16px"
              />
              <i v-else slot="prefix" class="el-icon-search el-input__icon" />
            </el-input>
          </el-popover>
        </el-form-item>
        <el-form-item label="名称" prop="resName">
          <el-input v-model="form.resName" placeholder="名称" />
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input v-model="form.path" placeholder="路由地址" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="sort">
          <el-input-number
            v-model.number="form.sort"
            :min="0"
            :max="999"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="组件路径" prop="componentPath">
          <el-input v-model="form.componentPath" placeholder="组件路径" />
        </el-form-item>
        <div class="tip">提示：请填写前端工程【@/views】下的路径</div>
        <el-divider content-position="left">扩展设置</el-divider>
        <el-form-item label="是否隐藏">
          <el-radio-group v-model="meta.hide" size="mini">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type === 0" label="是否缓存">
          <el-radio-group v-model="meta.cache" size="mini">
            <el-radio-button :label="true">是</el-radio-button>
            <el-radio-button :label="false">否</el-radio-button>
          </el-radio-group>
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
import { IResource, DefaultResource } from '@/typings/modules/resource'
import { apiGetById, apiSaveOrUpdate } from '@/api/resource'
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
  components: {}
})
export default class extends Vue {
  private loading: boolean = false

  private form: IResource = cloneDeep(DefaultResource)

  private meta: { [key: string]: any } = { ...DEFAULT_META }

  private get rules() {
    return {
      name: [{ required: true, message: '名称不能为空', trigger: 'change' }]
    }
  }

  created() {
    const { id, pId } = this.$route.query
    id && (this.form.id = id as string)
    pId && (this.form.pId = pId as string)
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
    data.meta && (this.meta = { ...this.meta, ...JSON.parse(data.meta) })
  }

  handleNaviBack() {
    this.$router.back()
  }

  handleSubmitForm(formName: string) {
    const form = this.$refs[formName] as Form
    form.validate(async valid => {
      if (!valid) return
      if (this.form.type === 1) {
        // 按钮类型不需要设置图标，不需要缓存
        this.form.icon = ''
        this.meta.cache = false
      }
      this.form.meta = JSON.stringify(this.meta)
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
