<template>
  <body>
    <div class="htmleaf-container">
      <div id="wrapper" class="login-page">
        <div id="login_form" ref="login_form_1" class="form" >
          <form class="register-form" v-show="!isShow">
            <input type="text" placeholder="用户名" v-model="r_user_name"/>
            <input type="password" placeholder="密码" v-model="r_password" />
            <input type="password" placeholder="重复密码" v-model="r_re_password"/>
            <button @click="registerSubmit">创建账户</button>
            <p class="message">已经有了一个账户? <a href="#" @click="changeModel">立刻登录</a></p>
          </form>
          <form class="login-form" v-show="isShow">
            <input type="text" placeholder="用户名" v-model="user_name"/>
            <input type="password" placeholder="密码" v-model="password"/>
            <button @click="loginSubmit">登　录</button>
            <p class="message">还没有账户? <a href="#" @click="changeModel">立刻创建</a></p>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
  import {loginApi} from "../api/login";
  import {registerApi} from '../api/register'
  import { setTimeout } from 'timers';
    export default {
        name: 'Login',
        data() {
          return {
              user_name: '',
              password: '',
              isShow: true,
              shake: false,
              r_user_name: '',  
              r_password: '',
              r_re_password: ''
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
                    this.shakeFunc()
                    alert(res.data.err_msg);
                  }
              }, error => {
                this.shakeFunc();
              })
          },
          registerSubmit(){
            if(this.r_password !== this.r_re_password){
              alert('两次输入密码不一致');
            }
            let post_data = {
              user_name: this.r_user_name,
              password: this.r_password,
              re_password: this.r_re_password
            }
            registerApi(post_data).then(res=>{
                let data = res.data
                if(data.status === 1){
                    alert('注册成功');
                }else{
                    this.shakeFunc();
                    alert(res.data.err_msg);
                }
              }, error=>{
                this.shakeFunc();
            })
          },
          changeModel(){
            this.isShow = !this.isShow;
          },
          shakeFunc(){
            var tmp_data = this;
            tmp_data.$refs.login_form_1.classList.add('shake_effect');
            setTimeout(function(){
              tmp_data.$refs.login_form_1.classList.remove('shake_effect');
            }, 1000);
          }
        }
    }
</script>

<style rel="stylesheet/less" lang="less">
    .login-page {
		  width: 360px;
		  padding: 8% 0 0;
      margin: auto;
      margin-top: 30px;
		}
		.form {
		  position: relative;
		  z-index: 1;
		  background: #FFFFFF;
		  max-width: 360px;
		  margin: 0 auto 100px;
		  padding: 45px;
		  text-align: center;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
      input {
        font-family: "Roboto", sans-serif;
        outline: 0;
        background: #f2f2f2;
        width: 100%;
        border: 0;
        margin: 0 0 15px;
        padding: 15px;
        box-sizing: border-box;
        font-size: 14px;
      }
      button {
        font-family: "Microsoft YaHei","Roboto", sans-serif;
        text-transform: uppercase;
        outline: 0;
        background: #5581fd;
        width: 100%;
        border: 0;
        padding: 15px;
        color: #FFFFFF;
        font-size: 14px;
        -webkit-transition: all 0.3 ease;
        transition: all 0.3 ease;
        cursor: pointer;
        :hover,:active,:focus {
          background: #43A047;
        }
      }
      .message {
        margin: 15px 0 0;
        color: #b3b3b3;
        font-size: 12px;
        a {
          color: #5581fd;
          text-decoration: none;
        }
      }
		}
		body {
		  background:white; /* fallback for old browsers */
		  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
		  background: -moz-linear-gradient(right, #76b852, #8DC26F);
		  background: -o-linear-gradient(right, #76b852, #8DC26F);
		  font-family: "Roboto", sans-serif;
		  -webkit-font-smoothing: antialiased;
		  -moz-osx-font-smoothing: grayscale;      
		}
		.shake_effect{
		 	-webkit-animation-name: shake;
  			animation-name: shake;
  			-webkit-animation-duration: 1s;
  			animation-duration: 1s;
		}
		@-webkit-keyframes shake {
		  from, to {
		    -webkit-transform: translate3d(0, 0, 0);
		    transform: translate3d(0, 0, 0);
		  }

		  10%, 30%, 50%, 70%, 90% {
		    -webkit-transform: translate3d(-10px, 0, 0);
		    transform: translate3d(-10px, 0, 0);
		  }

		  20%, 40%, 60%, 80% {
		    -webkit-transform: translate3d(10px, 0, 0);
		    transform: translate3d(10px, 0, 0);
		  }
		}

		@keyframes shake {
		  from, to {
		    -webkit-transform: translate3d(0, 0, 0);
		    transform: translate3d(0, 0, 0);
		  }

		  10%, 30%, 50%, 70%, 90% {
		    -webkit-transform: translate3d(-10px, 0, 0);
		    transform: translate3d(-10px, 0, 0);
		  }

		  20%, 40%, 60%, 80% {
		    -webkit-transform: translate3d(10px, 0, 0);
		    transform: translate3d(10px, 0, 0);
		  }
		}
		p.center{
			color: #fff;font-family: "Microsoft YaHei";
		}
</style>

