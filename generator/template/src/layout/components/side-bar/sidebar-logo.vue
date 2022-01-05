<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-15 10:27:21
 * @LastEditTime: 2021-12-18 10:37:55
 * @LastEditors: zhangzhenfei
 * @Description: 
 * @FilePath: /sadais-admin/src/layout/components/side-bar/sidebar-logo.vue
-->

<template>
  <div
    class="sidebar-logo-container"
    :class="[{ collapse: collapse }, sidebarStyle]"
  >
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="@/assets/img/logo.png" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/img/logo.png" class="sidebar-logo" />
        <h1 class="sidebar-title">
          {{ title }}
        </h1>
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'SidebarLogo'
})
export default class extends Vue {
  @Prop({ required: true }) private collapse!: boolean
  private title = 'Sadais Admin'

  private get sidebarStyle() {
    return SettingsModule.sidebarStyle
  }
}
</script>

<style lang="scss" scoped>
// 渐变动画
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}
.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: $nav-height;
  text-align: center;
  overflow: hidden;
  & .sidebar-logo-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      margin-right: 12px;
    }
    & .sidebar-title {
      display: inline-block;
      margin: 0;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      line-height: 1;
    }
  }
  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }

  &.double-column {
    .sidebar-logo {
      width: 20px;
      height: 20px;
      margin-right: 6px;
    }
    .sidebar-title {
      color: #ffffff;
    }
  }
}
</style>
