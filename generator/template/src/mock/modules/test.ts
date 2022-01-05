export default {
  path: '/api/test',
  disable: false,
  timeout: false, // 是否模拟超时
  // 模板语法：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
  data: {
    'head': { ret: 0 },
    'data|20': [
      {
        'name': '@cword(4,6)',
        'age|20-40': 0,
        'codeid': /^\d{5,10}$/
      }
    ]
  }
}
