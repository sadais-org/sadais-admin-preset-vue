<!--
 * @Author: zhangzhenfei
 * @Date: 2021-12-15 10:26:00
 * @LastEditTime: 2021-12-21 11:29:59
 * @LastEditors: zhangzhenfei
 * @Description: 侧边栏
 * @FilePath: /sadais-admin/src/layout/components/side-bar/index.vue
-->

<template>
  <div
    class="sidebar-container"
    :class="[{ collapse: isCollapse }, sidebarStyle]"
  >
    <sidebar-logo
      v-if="sidebarStyle !== 'double-column'"
      :collapse="isCollapse"
    />
    <!-- 默认布局 -->
    <el-scrollbar
      v-if="sidebarStyle === 'default'"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :default-active="getCurrentPath"
        :collapse="isCollapse"
        :text-color="variables.menuText"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        router
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.id"
          :item="route"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
    <!-- 分组布局 -->
    <el-scrollbar
      v-else-if="sidebarStyle === 'group'"
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :default-active="getCurrentPath"
        :collapse="isCollapse"
        :active-text-color="menuActiveTextColor"
        :unique-opened="false"
        :collapse-transition="false"
        router
        mode="vertical"
      >
        <el-menu-item-group v-for="route in routes" :key="route.id">
          <div v-if="!isCollapse" slot="title" class="pi-text-nowrap">
            {{ route.meta.title }}
          </div>
          <sidebar-item
            v-for="subRoute in route.children"
            :key="subRoute.id"
            :item="subRoute"
            :is-collapse="isCollapse"
          />
        </el-menu-item-group>
      </el-menu>
    </el-scrollbar>
    <!-- 双栏布局 -->
    <div v-else-if="sidebarStyle === 'double-column'" class="pi-flex pi-h-100P">
      <!-- 左侧一级菜单 -->
      <div class="frist-menu">
        <sidebar-logo :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            :default-active="getFristLavelPath"
            :collapse="isCollapse"
            active-text-color="#ffffff"
            :unique-opened="false"
            :collapse-transition="false"
            mode="vertical"
          >
            <el-menu-item
              v-for="route in routes"
              :key="route.id"
              :index="route.fullPath"
              @click="handleFristMenuClick(route)"
            >
              <svg-icon v-if="route.meta.icon" :icon-class="route.meta.icon" />
              <span slot="title">{{ route.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </div>

      <!-- 右侧当前一级菜单下的二级菜单 -->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          class="second-menu"
          v-if="!isCollapse"
          :default-active="getCurrentPath"
          :collapse="isCollapse"
          :active-text-color="menuActiveTextColor"
          :unique-opened="false"
          :collapse-transition="false"
          router
          mode="vertical"
        >
          <sidebar-item
            v-for="route in currentSecondRoutes"
            :key="route.id"
            :item="route"
            :is-collapse="isCollapse"
          />
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
import { RouteConfig } from 'vue-router'
import { IResource } from '@/typings/modules/resource'
import SidebarItem from './sidebar-item.vue'
import SidebarLogo from './sidebar-logo.vue'
import variables from '@/assets/styles/variables.scss'
import { SettingsModule } from '@/store/modules/settings'

function getRouteChildren(route: IResource) {
  return route?.resourceDtoList?.filter(item => {
    const meta = item.meta ? JSON.parse(item.meta) : {}
    return item.type === 0 && !meta.hide
  })
}

function getDeepChildren(route: IResource): IResource {
  const children = route?.resourceDtoList?.filter(item => {
    const meta = item.meta ? JSON.parse(item.meta) : {}
    return item.type === 0 && !meta.hide
  })
  const target = children[0]
  if (target && target.resourceDtoList?.length) {
    return getDeepChildren(target)
  } else {
    return target
  }
}

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo
  }
})
export default class extends Vue {
  get getCurrentPath() {
    return this.$route.fullPath
  }

  get getFristLavelPath() {
    return this.getCurrentPath.slice(0, this.getCurrentPath.indexOf('/', 1))
  }

  get sidebarStyle() {
    return SettingsModule.sidebarStyle
  }

  get routes(): RouteConfig[] {
    return this.buildRoutes(AppModule.menus)
  }

  get menuActiveTextColor() {
    return variables.primaryColor
  }
  get variables() {
    return variables
  }

  get isCollapse() {
    return !AppModule.sidebarExpand
  }

  get currentSecondRoutes() {
    const currentFirstRoute = this.routes.find(
      route => route.meta?.fullPath === this.getFristLavelPath
    )
    return currentFirstRoute?.children
  }

  buildRoutes(routes: IResource[] = []): RouteConfig[] {
    return routes.map(route => {
      const meta = route.meta ? JSON.parse(route.meta) : {}
      meta.id = route.id
      meta.icon = route.icon
      meta.title = route.resName
      meta.fullPath = route.fullPath
      const rebuildRoute: RouteConfig = {
        ...route,
        meta
      }
      const children = this.buildRoutes(getRouteChildren(route))
      if (children?.length) {
        rebuildRoute.children = children
      }
      return rebuildRoute
    })
  }

  handleFristMenuClick(route: IResource) {
    const firstChildRoute = getDeepChildren(route)
    console.log(firstChildRoute)
    if (!firstChildRoute) return
    this.$router.push({
      path: firstChildRoute.fullPath
    })
  }
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  display: flex;
  flex-direction: column;
  height: 100%;

  ::v-deep .svg-icon {
    margin-right: 8px;
  }

  ::v-deep .el-scrollbar {
    height: 100%;
    flex: 1;
    .el-scrollbar__view {
      height: 100%;
    }
  }

  ::v-deep .horizontal-collapse-transition {
    transform: translateZ(0);
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  ::v-deep .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  ::v-deep .el-scrollbar {
    height: 100%;
    flex: 1;
  }

  ::v-deep .el-menu {
    border: none;
    .el-submenu.is-active .el-submenu__icon-arrow {
      color: $primary-color;
    }
    .el-icon-arrow-down:before {
      content: '\e790';
      font-size: 14px;
    }
    .el-menu-item-group {
      border-bottom: 1px solid #e2e2e2;
    }
  }

  &.default {
    ::v-deep .el-menu-item {
      position: relative;
      &.is-active,
      &:hover {
        background: rgba($primary-color, 0.1);
      }
      &.is-active {
        &::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 4px;
          height: 50px;
          background: $primary-color;
        }
      }
    }
  }

  &.group {
    background: $body-bg;
    ::v-deep .sidebar-logo-container {
      background: transparent;
    }
    ::v-deep .el-menu {
      background: transparent;
      padding: 0 10px;
      &.el-menu--collapse {
        padding: 0;
      }
      .el-menu-item-group {
        font-weight: 500;
        padding: 12px 0;
      }
      .el-menu-item,
      .el-submenu__title {
        border-radius: 4px;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        margin: 6px 0;

        &.is-active {
          color: $primary-color;
          background: rgba($primary-color, 0.1);
        }
      }
    }
    &.collapse {
      ::v-deep .el-menu {
        .el-menu-item-group {
          padding: 0;
        }
        .el-menu-item-group__title {
          padding: 0;
        }
      }
    }
  }

  .frist-menu {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #2e2b40;
    ::v-deep .el-menu {
      background: transparent;
      .el-menu-item {
        color: #ffffff;
        &.is-active,
        &:hover {
          background: $primary-color;
        }
      }
    }
  }
  .second-menu {
    padding-top: 6px;
    ::v-deep .el-menu-item {
      min-width: 125px;
      &.is-active,
      &:hover {
        background: rgba($primary-color, 0.1);
      }
    }
    ::v-deep .el-submenu__icon-arrow {
      right: 4px;
    }
  }
}
</style>
