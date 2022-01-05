import store from 'store'

import expirePlugin from 'store/plugins/expire'
store.addPlugin(expirePlugin)

const appName = process.env.VUE_APP_NAME

// 持久化存储用户侧边栏配置
const SIDEBAR_STYLE = appName + '-sidebarStyle'
export const getSidebarStyle = () => store.get(SIDEBAR_STYLE) || 'default'
export const setSidebarStyle = (sidebarStyle: string) =>
  store.set(SIDEBAR_STYLE, sidebarStyle)

export default store
