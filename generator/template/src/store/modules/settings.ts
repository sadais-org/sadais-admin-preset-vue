import { VuexModule, Module, Mutation, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { getSidebarStyle, setSidebarStyle } from '@/utils/storage'

export interface ISettingsState {
  showSettings: boolean // 是否显示设置面板
  sidebarStyle: string // 侧边栏样式
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements ISettingsState {
  public showSettings = false
  public sidebarStyle = getSidebarStyle() // 'default' | 'group' | 'double-column'

  @Mutation
  public CHANGE_SHOW_SETTING(payload: boolean) {
    this.showSettings = payload
  }

  @Mutation
  public CHANGE_SIDEBAR_STYLE(payload: string) {
    this.sidebarStyle = payload
    setSidebarStyle(payload)
  }
}

export const SettingsModule = getModule(Settings)
