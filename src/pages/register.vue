<template>
    <div>
        <div id='register'>
            <div class="loginBox">
                <div class="loginBoxCenter">
                    <p><label for="username">用户名：</label></p>
                    <p><input type="text" class="loginInput" v-model="user_name" placeholder="请输入邮箱/手机号"/></p>
                    <p><label for="password">密码：</label></p>
                    <p><input class="loginInput" type="password" v-model="password" placeholder="请输入密码"/></p>
                    <p><label for="re_password">密码：</label></p>
                    <p><input class="loginInput" type="password" v-model="re_password" placeholder="请再次输入密码"/></p>
                </div>
                <div class="loginBoxButtons">
                    <button class="loginBtn" v-on:click="registerSubmit">注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {registerApi} from '../api/register'
export default {
    name: 'Register',
    data(){
        return {
            user_name: '',
            password: '',
            re_password: ''
        }
    },
    methods: {
        registerSubmit(){
            if(this.password != this.re_password){
                alert('两次密码不一致')
            }
            let post_data = {
                user_name: this.user_name,
                password: this.password,
                re_password: this.re_password
            }
            registerApi(post_data).then(res=>{
                let data = res.data
                if(data.status === 1){
                    alert('注册成功')
                }else{
                    alert('注册失败')
                }
            }, error=>{
                console.log(error);
                alert('注册出错')
            })
        }
    }
}
</script>


<style rel="stylesheet/less" lang="less">
#register {
    background-color: #B5DEF2;
    margin: 140px 0 140px auto;
    .loginBox{
        background-color: #F0F4F6;
        border: 1px solid #BfD6E1;
        border-radius: 5px;
        color: #444;
        font: 14px 'Microsoft YaHei', '微软雅黑';
        margin: 0 auto;
        width: 388px;
        .loginBoxCenter{
            border-bottom: 1px solid #DDE0E8;
            padding: 24px;
            p{
                margin-bottom: 10px;
                text-align: left
            }
            .loginInput{
                border: 1px solid #D2D9dC;
                border-radius: 2px;
                color: #444;
                font: 12px 'Microsoft YaHei', '微软雅黑';
                padding: 8px 14px;
                margin-bottom: 8px;
                width: 310px;
                :focus{
                    border: 1px solid #B7D4EA;
                    box-shadow: 0 0 8px #B7D4EA;
                }
            }
        }
        .loginBoxButtons{
            border-top: 0px solid #FFF;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            line-height: 28px;
            overflow: hidden;
            padding: 20px 24px;
            vertical-align: center;
            filter: alpha(Opacity=80);
            -moz-opacity: 0.5;
            opacity: 0.5;
            .loginBtn{
                background-image: -moz-linear-gradient(to bottom, blue, #85CFEE);
                border: 1px solid #98CCE7;
                border-radius: 20px;
                box-shadow: inset rgba(255, 255, 255, 0.6) 0 1px 1px, rgba(0, 0, 0, 0.1) 0 1px 1px;
                color: #444;
                cursor: pointer;
                font: bold 13px Arial;
                padding: 10px 50px;
            }
        }
    }
}
</style>