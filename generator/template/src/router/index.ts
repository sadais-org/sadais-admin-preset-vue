import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import NProgress from 'nprogress'
import Layout from '@/layout/index.vue'
import { AppModule } from '@/store/modules/app'
import { DefaultResource, IResource } from '@/typings/modules/resource'
import camelCase from 'lodash/camelCase'
import upperFirst from 'lodash/upperFirst'
import { getToken } from '@/utils/auth'
import { UserModule } from '@/store/modules/user'

export const loadView = (componentPath: string) => {
  return (resolve: any) =>
    require([`@/views/${componentPath}.vue`], module => {
      resolve(module)
    })
}

/**
 * 将路由转换为可用的路由
 * @param routers 资源路由
 * @returns 构建路由
 */
export const buildRouters = (resource: IResource) => {
  return resource.resourceDtoList.reduce(
    (pre: RouteConfig[], cur: IResource) => {
      const isQueryPath = cur.path.indexOf('?') === 0
      const componentPath = cur.componentPath

      if (componentPath && !isQueryPath) {
        const name = upperFirst(camelCase(componentPath)).trim()
        // 获取挂在此路由下的所有权限
        const auths = cur.resourceDtoList.map(
          (subRes: IResource) => subRes.path
        )
        // 构建mate
        const meta = cur.meta ? JSON.parse(cur.meta) : {}
        meta.title = cur.resName
        meta.auths = auths
        meta.cacheName = upperFirst(camelCase(componentPath)).trim()
        meta.parent = cur.parent = {
          ...resource,
          resourceDtoList: []
        }

        pre.push({
          name,
          path: cur.fullPath,
          component: loadView(componentPath),
          meta
        })
      }

      pre.push(...buildRouters(cur))
      return pre
    },
    []
  )
}

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  }
]

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

let hasAddAsyncRouter = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    next()
    return
  }
  const token = getToken()
  if (!token) {
    UserModule.logout()
  }
  if (!hasAddAsyncRouter) {
    hasAddAsyncRouter = true
    const rootRouter = {
      ...DefaultResource,
      resourceDtoList: UserModule.resouces
    }
    const asyncRouters = buildRouters(rootRouter)
    console.log('构建动态路由', asyncRouters)
    AppModule.CHANGE_STATE({ menus: rootRouter.resourceDtoList })

    router.addRoute({
      path: '/',
      component: Layout,
      children: asyncRouters
    })

    // @ts-ignore
    next({ ...to, replace: true })
  } else {
    AppModule.addCachedView(to)
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
