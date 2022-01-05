const req = require.context('../../assets/icons/svg', false, /\.svg$/)
const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys()

const re = /\.\/(.*)\.svg/

const icons = requireAll(req).map((i) => {
  // @ts-ignore
  return i.match(re)[1]
})

export default icons
