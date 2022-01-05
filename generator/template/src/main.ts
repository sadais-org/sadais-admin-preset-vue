import Vue, { DirectiveOptions } from 'vue'
import App from './App.vue'

import './registerServiceWorker'

import router from './router'
import store from './store'

import Consts from './consts'

import '@/mock'
Vue.config.productionTip = false

Vue.prototype.$consts = Consts

/**
 * 判断权限
 * auth: 判断auth是否在页面auths中
 */
Vue.prototype.$auth = function (auth: string) {
  return this.$route?.meta?.auths?.includes(auth)
}

// 定制element-ui样式为size: 'small'
// 其中引入element-ui的定义在vue.config.js中
import Loading from 'element-ui'
Vue.use(Loading)

Vue.prototype.$ELEMENT = { size: 'small' }

// @ts-ignore
import VueKeepScrollPlugin from '@/plugins/vue-keep-scroll/index'
Vue.use(VueKeepScrollPlugin)

// 样式引入
import 'normalize.css'
import 'nprogress/nprogress.css'
import '@/assets/styles/index.scss'

// 注册全局指令
import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key])
})

// svg icon
import './assets/icons'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
