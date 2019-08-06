import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const Base = resolve >= require(['@/pages/base.vue'], resolve)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'base',
      component: Base
    }
  ]
})
