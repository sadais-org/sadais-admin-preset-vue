const ctx = require.context('./', false, /\.[tj]s$/)
const keys = ctx.keys()

const mockDatas = keys
  .map((path: string) => {
    const items = path.replace(/\.[tj]s$/, '').split('/')
    items.shift()
    const name = items[0]
    if (name !== 'index') {
      const obj = ctx(path)
      return obj.default || obj
    }
    return null
  })
  .filter(i => !!i)

export default mockDatas
