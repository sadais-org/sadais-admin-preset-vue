import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators'
import store from '@/store'
import { Route } from 'vue-router'
import { IResource } from '@/typings/modules/resource'

interface IAppState {
  sidebarExpand: boolean
  cachedViews: string[]
  menus: IResource[]
}

@Module({ dynamic: true, store, name: 'app', namespaced: true })
class App extends VuexModule implements IAppState {
  public sidebarExpand = true
  public cachedViews: string[] = []
  public menus: IResource[] = []

  @Mutation
  public CHANGE_STATE(payload: { [key in string]: any }) {
    const keys = Object.keys(payload)
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this: any = this
    for (const key of keys) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        _this[key] = payload[key]
      }
    }
  }

  @Action
  public addCachedView(view: Route) {
    if (view.meta?.cache === false) return
    const hasCached = this.cachedViews.filter(i => i === view.name).length > 0
    if (view.name && !hasCached) {
      const views = [...this.cachedViews, view.name]
      this.CHANGE_STATE({
        cachedViews: views
      })
    }
  }
}

export const AppModule = getModule(App)
