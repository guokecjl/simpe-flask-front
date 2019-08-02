'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.1.161:8089"',
  APP_ORIGIN: ""
})
