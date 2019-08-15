<template>
  <div>
    <div id="login">
      <input type="text" v-model="user_name">
      <input type="password" placeholder="请输入密码" v-model="password">
    </div>
    <div id="submit">
      <button v-on:click="loginSubmit">登录</button>
    </div>
  </div>
</template>

<script>
  import {loginApi} from "../api/login";
    export default {
        name: 'Login',
        data() {
            return {
                user_name: '',
                password: ''
            }
        },
        methods: {
            loginSubmit() {
                let post_data = {
                    'user_name': this.user_name,
                    'password': this.password
                }
                loginApi(post_data).then(res=>{
                    if(res.data.status === 1){
                      alert('用户'+this.user_name+'登录成功');
                    }else{
                      alert('登录失败');
                    }
                }, error => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
 #login {
  width: 300px;
}
</style>
