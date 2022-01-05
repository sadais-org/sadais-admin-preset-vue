module.exports = (api, options, rootOptions) => {

  // 添加脚本
  api.extendPackage({
    scripts: {
      'dev': 'vue-cli-service serve --mode dev',
      'lint': 'vue-cli-service lint',
      'build:uat': 'vue-cli-service build --mode uat',
      'build:prod': 'vue-cli-service build --mode prod'
    }
  });

  // 添加依赖
  const dependencies = {
    '@sadais/piui-console': '^0.0.5',
    'axios': '^0.24.0',
    'clipboard': '^2.0.8',
    'element-ui': '^2.15.6',
    'lodash': '^4.17.21',
    'normalize.css': '^8.0.1',
    'nprogress': '0.2.0',
    'path-to-regexp': '^6.2.0',
  };

  api.extendPackage({
    dependencies,
    devDependencies: {
      '@types/lodash': '^4.14.177',
      '@types/node': '^14.18.0',
      '@types/nprogress': '^0.2.0',
      '@types/path-to-regexp': '^1.7.0',
      '@types/store': '^2.0.2',
      'eslint-config-tpconfig': '^0.x',
      'eslint-plugin-vue': '^7.0.0-0',
      'style-resources-loader': '^1.3.2',
      'postcss': '^8.3.3',
      'stylelint': '^14.0.1',
      '@trscd/stylelint-config-tpconfig': '^1.1.0',
      'stylelint-webpack-plugin': '^2.3.1',
      'babel-plugin-transform-remove-console': '^6.9.4',
      'unplugin-vue-components': '^0.17.9',
      'axios-mock-adapter': '^1.20.0',
      'store': '^2.0.12',
      'vuex-module-decorators': '^1.2.0',
      'mockjs': '^1.1.0',
    },
  });



  api.postProcessFiles((files) => {
    delete files['src/views/Home.vue'];
  })




  // 创建模板
  api.render('./template', options);


};