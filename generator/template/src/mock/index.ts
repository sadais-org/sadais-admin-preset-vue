import MockAdpater from 'axios-mock-adapter'
import request from '@/utils/request'
import Mock from 'mockjs'
import modules from './modules'

if (process.env.VUE_APP_MOCK === 'true') {
  const mock = new MockAdpater(request)

  for (const module of modules) {
    if (!module.disable) {
      const adapter = mock.onAny(module.path)
      if (module.timeout) {
        adapter.timeout()
      } else {
        adapter.reply(config => {
          let template = module.data
          if (
            Object.prototype.toString.call(module.data) === '[object Function]'
          ) {
            template = module.data(config.data || config.params)
          }
          const mockData = Mock.mock(template)
          return [200, mockData]
        })
      }
    }
  }
  mock.onAny().passThrough()
}
