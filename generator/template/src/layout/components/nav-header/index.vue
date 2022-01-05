<template>
  <div class="header pi-align-center">
    <hamburger :is-active="!sidebarExpand" @toggle="handleToggleActive" />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    <div class="pi-flex-sub">
      <slot>
        <div class="pi-justify-end pi-align-center pi-pd-right-12">
          <el-dropdown v-if="userInfo" trigger="click">
            <div class="pi-align-center pi-cursor-pointer">
              <img
                src="@/assets/img/common/common_ic_touxiangl.png"
                alt=""
                class="pi-width-24 pi-mg-right-12"
              />
              <div class="pi-mg-right-6">{{ userInfo.name }}</div>
              <i class="el-icon-caret-bottom" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="handleShowSetting">
                <span style="display: block"> 主题设置 </span>
              </el-dropdown-item>

              <el-dropdown-item @click.native="handleLogout">
                <span style="display: block"> 退出登录 </span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Hamburger from '../hamburger/index.vue'
import Breadcrumb from '../breadcrumb/index.vue'
import { AppModule } from '@/store/modules/app'
import { UserModule } from '@/store/modules/user'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'NavHeader',
  components: {
    Hamburger,
    Breadcrumb
  }
})
export default class extends Vue {
  private get sidebarExpand() {
    return AppModule.sidebarExpand
  }

  private handleToggleActive() {
    AppModule.CHANGE_STATE({
      sidebarExpand: !this.sidebarExpand
    })
  }

  private get userInfo() {
    return UserModule.userInfo
  }

  private handleShowSetting() {
    SettingsModule.CHANGE_SHOW_SETTING(true)
  }

  private handleLogout() {
    UserModule.logout()
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: $nav-height;
  z-index: 999;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(50, 64, 77, 0.2);
}
</style>
