import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

const Base = resolve => require(['@/pages/base.vue'], resolve);
const Login = resolve => require(['@/pages/login.vue'], resolve);

const route = [
  {
    path: '/',
    component: Base,
    children: [
      {
        path: '/login',
        name: 'login',
        component: Login
      }
    ]
  }
]
export default new Router({
    mode: 'history',
    routes: route,
})
