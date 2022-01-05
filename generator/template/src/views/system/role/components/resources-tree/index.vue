<!--
 * @Author: zhangzhenfei
 * @Date: 2021-11-29 16:26:43
 * @LastEditTime: 2021-12-21 11:21:16
 * @LastEditors: zhangzhenfei
 * @Description: 资源管理
 * @FilePath: /sadais-admin/src/views/system/role/components/resources-tree/index.vue
-->

<template>
  <div class="resource-container pi-flex-column pi-h-100P pi-pd-left-12">
    <div
      class="scroll-container"
      style="border: 1px solid #ebeef5; overflow: hidden"
    >
      <div class="resource-header pi-h-40 pi-align-center pi-pd-12">
        <div class="pi-fz-12 pi-fw-500 pi-pd-left-6">资源分配</div>
      </div>
      <div class="scroll-container pi-pd-tb-12" v-keep-scroll>
        <el-tree
          ref="resourceTree"
          :data="resources"
          show-checkbox
          node-key="id"
          default-expand-all
          check-on-click-node
          :expand-on-click-node="false"
          :props="{
            children: 'resourceDtoList',
            label: 'resName'
          }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </div>
    <div class="pi-justify-center pi-pd-top-16">
      <el-button type="primary" @click="handleSave"> 保存 </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { apiQueryByLevel } from '@/api/resource'
import { IResource } from '@/typings/modules/resource'
import { apiDisResource } from '@/api/role'
import { IRole, DefaultRole } from '@/typings/modules/role'
import { Tree } from 'element-ui'

const TAG_NAME = 'ResourceTree'

@Component({
  name: TAG_NAME
})
export default class extends Vue {
  @Prop({ type: Object, default: { ...DefaultRole }, required: false })
  private role!: IRole

  loading = false
  resources: IResource[] = []

  checkedKeys: string[] = []

  @Watch('role.id')
  private handleRoleChange() {
    const tree = this.$refs.resourceTree as Tree
    tree.setCheckedKeys([]) // 清空选中
    this.checkedKeys = this.role.resourceList.map(res => {
      tree.setChecked(res.id, true, false)
      return res.id
    })
  }

  created() {
    this.handleQuery()
  }

  async handleQuery() {
    const {
      data,
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiQueryByLevel(1)
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.resources = data
  }

  handleCheckChange(
    node: any,
    checked: { checkedKeys: string[]; halfCheckedKeys: string[] }
  ) {
    this.checkedKeys = [...checked.checkedKeys, ...checked.halfCheckedKeys]
    console.log(TAG_NAME, '资源勾选改变', this.checkedKeys)
  }

  async handleSave() {
    if (!this.role.id) return
    const {
      head: { ret = this.$consts.RET_CODE.FAIL, msg = '获取列表失败' } = {}
    } = await apiDisResource(this.role.id, this.checkedKeys)
    if (ret !== this.$consts.RET_CODE.SUCCESS) {
      return this.$notify.error(msg)
    }
    this.$emit('save')
    this.$notify.success('角色资源分配成功')
  }
}
</script>

<style lang="scss" scoped>
.resource-container {
  padding: 12px;
  padding-left: 0;
  background: #ffffff;
  width: 400px;
  .resource-header {
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>
