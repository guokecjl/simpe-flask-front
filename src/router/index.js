import Vue from 'vue'
import Router from 'vue-router'
import Base from '@/pages/base.vue'
import Login from '@/pages/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Base,
      children: [
        {
          path: '/login',
          name: 'login_url',
          component: Login
        }
      ]
    }
  ]
})
