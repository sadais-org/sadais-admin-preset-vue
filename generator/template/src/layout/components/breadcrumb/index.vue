<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-16 10:50:38
 * @LastEditTime: 2022-01-05 10:23:41
 * @LastEditors: zhangzhenfei
 * @Description: 面包屑
 * @FilePath: /sadais-admin-preset-vue/generator/template/src/layout/components/breadcrumb/index.vue
-->

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
        <a v-if="item.path" @click.prevent="handleLink(item)">{{
          item.name
        }}</a>
        <span v-else>{{ item.name }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import { IResource } from '@/typings/modules/resource'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Breadcrumb'
})
export default class extends Vue {
  private get breadcrumbs() {
    const breadcrumbs = [
      { path: this.$route.fullPath, name: this.$route?.meta?.title }
    ]
    if (this.$route.meta?.parent) {
      this.buildBreadcrumb(this.$route.meta?.parent, breadcrumbs)
    }
    return breadcrumbs
  }

  private buildBreadcrumb(resource: IResource, breadcrumbs: any[] = []) {
    breadcrumbs.unshift({
      path: resource.componentPath ? resource.fullPath : '',
      name: resource.resName
    })
    if (resource.parent) {
      this.buildBreadcrumb(resource.parent, breadcrumbs)
    }
  }

  private handleLink(item: any) {
    const { path } = item
    this.$router.push(path).catch(err => {
      console.warn(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
