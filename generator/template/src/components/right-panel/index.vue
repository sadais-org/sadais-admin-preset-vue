<template>
  <div ref="rightPanel" :class="{ show: show }" class="rightPanel-container">
    <div class="rightPanel-background" />
    <div class="rightPanel">
      <div class="rightPanel-items">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { addClass, removeClass } from '@/utils/common'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'RightPanel'
})
export default class extends Vue {
  @Prop({ default: false }) private clickNotClose!: boolean
  @Prop({ default: 250 }) private buttonTop!: number

  private get show() {
    return SettingsModule.showSettings
  }

  @Watch('show')
  private onShowChange(value: boolean) {
    if (value && !this.clickNotClose) {
      this.addEventClick()
    }
    if (value) {
      addClass(document.body, 'showRightPanel')
    } else {
      removeClass(document.body, 'showRightPanel')
    }
  }
  mounted() {
    this.insertToBody()
  }
  beforeDestroy() {
    const elx = this.$refs.rightPanel as Element
    elx.remove()
  }
  private addEventClick() {
    window.addEventListener('click', this.closeSidebar)
  }
  private closeSidebar(ev: MouseEvent) {
    const parent = (ev.target as HTMLElement).closest('.rightPanel')
    if (!parent) {
      SettingsModule.CHANGE_SHOW_SETTING(false)
      window.removeEventListener('click', this.closeSidebar)
    }
  }
  private insertToBody() {
    const elx = this.$refs.rightPanel as Element
    const body = document.querySelector('body')
    if (body) {
      body.insertBefore(elx, body.firstChild)
    }
  }
}
</script>

<style lang="scss">
.showRightPanel {
  position: relative;
  overflow: hidden;
}
</style>

<style lang="scss" scoped>
.rightPanel-background {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}
.rightPanel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 40000;
  width: 100%;
  max-width: 260px;
  height: 100vh;
  background: #ffffff;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
  transform: translate(100%);
}
.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
  .rightPanel-background {
    z-index: 20000;
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  .rightPanel {
    transform: translate(0);
  }
}
</style>
