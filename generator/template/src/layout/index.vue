<template>
  <div class="layout" :class="sidebarStyle">
    <div class="content">
      <div class="left" :style="{ width: sideBarWidth }">
        <sidebar />
      </div>
      <div class="right">
        <nav-header />
        <app-main />
      </div>
    </div>
    <right-panel>
      <settings />
    </right-panel>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import NavHeader from './components/nav-header/index.vue'
import Sidebar from './components/side-bar/index.vue'
import Settings from './components/settings/index.vue'
import AppMain from './app-main.vue'
import { AppModule } from '@/store/modules/app'
import { SettingsModule } from '@/store/modules/settings'
import variables from '@/assets/styles/variables.scss'

@Component({
  name: 'Layout',
  components: {
    NavHeader,
    Sidebar,
    Settings,
    AppMain
  }
})
export default class extends Vue {
  private get sidebarExpand() {
    return AppModule.sidebarExpand
  }

  private get sidebarStyle() {
    return SettingsModule.sidebarStyle
  }

  private get sideBarWidth() {
    return this.sidebarExpand
      ? variables.sideBarWidth
      : variables.sideBarWidthShort
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  &.default,
  &.double-column {
    .app-main {
      padding-left: 12px;
    }
  }
}
.content {
  flex: 1;
  display: flex;
  height: 100%;
}
.left {
  width: $side-bar-width;
  position: relative;
  transition: width 0.3s;
  height: 100%;
  overflow: hidden auto;
  transform: translateZ(0);
}
.right {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
