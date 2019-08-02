'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  build: {
      // sitEnv: require('./sit.env'),
      prodEnv: require('./prod.env'),
      index: path.resolve(__dirname, '../dist/index.html'),
      assetsRoot: path.resolve(__dirname, '../dist'),
      assetsSubDirectory: '',
      assetsPublicPath: '/static/', //生产环境assetsPublicPath: '/'
      staticPath:'./', //生产环境 staticPath:''
      productionSourceMap: true,
      productionGzip: false,
      productionGzipExtensions: ['js', 'css'],
      bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
      env: require('./dev.env'),
      port: 8080,
      autoOpenBrowser: true,
      assetsSubDirectory: 'static',
      assetsPublicPath: '/',
      staticPath:'/static/',
      proxyTable: {},
      cssSourceMap: false
  }
}

