<!--
 * @Author: zhangzhenfei
 * @Date: 2021-09-09 09:19:31
 * @LastEditTime: 2021-12-16 09:54:14
 * @LastEditors: zhangzhenfei
 * @Description: 设置页面
 * @FilePath: /sadais-admin/src/layout/components/settings/index.vue
-->

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">系统主题设置</h3>

      <el-form label-position="top" label-width="120px">
        <el-form-item label="侧边栏风格">
          <el-radio-group v-model="sidebarStyle">
            <el-radio-button label="default">默认</el-radio-button>
            <el-radio-button label="group">分组</el-radio-button>
            <el-radio-button label="double-column">双栏</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'Settings',
  components: {}
})
export default class extends Vue {
  get sidebarStyle() {
    return SettingsModule.sidebarStyle
  }

  set sidebarStyle(sidebarStyle) {
    SettingsModule.CHANGE_SIDEBAR_STYLE(sidebarStyle)
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
    color: rgba(0, 0, 0, 0.85);
  }
}
</style>
