<template>
    <div>
        <div id="base">
            <div class="side">
                <Sidebar></Sidebar>
            </div>
            <div class="content-outter">
                <div class="content">
                    <div class="lang-change">
                        <!--  -->
                       <div class="dropdown-box" @mouseenter="show = true" @mouseleave="show = false"  :class="{'active-drop':show}">
                            <a class="drop-a"><img :src="flagImg[$i18n.locale]" alt="geetest" class="flag"></a> 
                            <div class="dropdown" :class="{'dropdown-show': show}">
                                <div @click="changeLange('zh')" class="lang-item">
                                    <img src="../assets/img/flag-cn.png" alt="chinese" class="flag">  <span>简体中文</span>
                                </div> 
                                <div @click="changeLange('en')" class="lang-item"> 
                                    <img src="../assets/img/flag-en.png" alt="English" class="flag"> <span>English</span>
                                </div>   
                            </div>
                       </div>
                    </div>
                    <router-view ></router-view>
                </div>
                 <p class="copyright">Copyright © 2019 GEETEST</p>
            </div>
            
        </div>
       
    </div>
</template>

<script>
 import {mapState} from 'vuex'
 import {auth} from "api/auth";
 import Cookies from 'js-cookie'
 import store from 'store';
 import Sidebar from 'components/sidebar'
 import {updateLocal} from '@/lang'
 import { getLang } from 'api/auth';
 import flag_zh from '@/assets/img/flag-cn.png'
 import flag_en from '@/assets/img/flag-en.png'
 
    export default{
        data(){
            return{
                'normal-width' :'420px',
                flagImg: {
                    en: flag_en,
                    zh: flag_zh
                },
                show:false

            }
        },
        computed: {
        },
        methods:{
            changeLange(lang){
                updateLocal(lang);
                this.$store.commit('setGtlang', lang);
                getLang({language: lang}).then(res =>{
                    this.show = false;
                })

            }
        },
        components:{
            Sidebar
        },
        created(){
            auth().then(res=>{
                if(res.data.status == 1){
                    Cookies.set('auth_email', res.data.data._id);
                    return
                }
                else {
                // todo 暂时隐藏 强制跳转
                   //this.$router.push({ path: '/login' })
                }
            })
        },
    }

</script>
<style rel="stylesheet/less" lang="less">
    .card {
        width: 290px;
    }
    #base{
        width: 100%;
        position: relative;
    }
    .side {
        width: 420px;
        display: inline-flex;
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 22;
    }
    .content-outter{
        width: 100%;
        height: 100%;
        position: relative;
    }
    .content {
        padding-left: 420px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        @height:40px;
        min-height:100vh;
        padding-bottom: 40px;
        flex-direction: column;
    }
    .lang-change{
        width: 100%;
        text-align: right;
        position: fixed;
        top:40px;
        right: 32px;
        .flag{
            width: 20px;
            vertical-align: middle;
            margin-right: 14px;
        }
        .drop-a{
            cursor: pointer;
            position: relative;
            width: 62px;
            display: inline-block;
            text-align: left;
            color: #3B426B;
            border-radius: 3px;
            padding: 8px;
        }
        .active-drop{
            background-color: #EDF1F8;
            border-radius: 3px;
            transition: all .3s ease-in-out;
        }

        .drop-a:after{
            content: '';
            position: absolute;
            top: 16px;
            right: 0px;
            width: 16px;
            height: 8px;
            background: url(../assets/img/dropdown.svg) no-repeat;
        }
        .dropdown-box{
            display: inline-block;
            position: relative;
            cursor: pointer;
            .dropdown{
                opacity: 0;
                text-align: left;
                opacity: 0;
                position: absolute;
                top: 45px;
                pointer-events:none;
                right: 0px;
                width: 120px;
                background-color: #FFFFFF;
                box-shadow: 0 -1px 2px 0 rgba(225,231,255,0.3), 0 4px 8px 0 rgba(133,138,180,0.32);
                padding: 8px;
                font-size: 13px;
                font-weight: 500;
                letter-spacing: 0.5px;
                color: #3B426B;
                transition: all .3s ease-in-out;
                -webkit-transform: perspective(1400px) rotateX(-15deg);
                transform: perspective(1400px) rotateX(-15deg);
                border-radius: 3px;
            }
            .lang-item{
                height: 34px;
                line-height: 34px;
                padding: 0 8px;
                cursor: pointer;
                &:hover{
                    background: #EDF1F8;
                    border-radius: 3px;
                }
            }
            .dropdown::after{
                content: '';
                position: absolute;
                z-index: -1;
                top: -5px;
                right: 20px;
                pointer-events: none;
                width: 20px;
                height: 20px;
                background: #fff;
                transform: rotate(48deg);
                box-shadow: -3px -3px 7px -2px rgba(133, 138, 180, 0.18);
                border-radius: 4px
            }
            .dropdown:before{
                content:'';
                position: absolute;
                background: transparent;
                height: 20px;
                width: 120px;
                top:-20px;
                left: 0;

            }
        }
        .dropdown.dropdown-show{
            opacity: 1;
            transform: rotateX(0);
            pointer-events: auto;
        }
    }
    .copyright {
        @left :420px;
        position: absolute;
        left: @left;
        bottom: 22px;
        color: #002059;
        opacity: .2;
        text-align: center;
        width: calc(~'100% - @{left}');
    }
    @media screen and (max-width: 1000px) {
        .side{
            display: none;
        }
        .content {
            padding-left: 0;
            width: 100%;
        }
        .copyright {
            left:0;
            width: 100%;
        }
    }
    .input-field {
        position: relative;
        margin-bottom: 18px;
    }
    .eye-icon {
        position: absolute;
        top: 34px;
        right: 0;
        line-height: 44px;
        height: 44px;
        text-align: center;
        z-index: 2;
        width: 40px;
        font-size: 14px;
        color: #93A2BB;
    }
    .hide-opcity {
        opacity: .3;
    }
    .geetest-btn{
        background: linear-gradient(180deg, #648CFF 0%, #4172FA 100%);
        border: 1px solid rgba(51,100,237,0.35);
        border-radius: 3px;
        box-shadow: inset 0 -2px 0 0 #3262E6, 0 3px 4px 0 rgba(44,71,146,0.32);
        padding: 14px 30px;
        width: 100%;
        cursor: pointer;
        height: 48px;
        font-weight: 500;
        transition: all .2s;
        display: inline-block;
        font-size: 13px;
        text-align: center;
        color: white;
        i{
            transition: all .4s cubic-bezier(.175,.885,.32,1.275);
            position: relative;
            left: 0;
        }

    }
    .geetest-btn:hover{
        transform: scale(1.0) translateY(-2px);
        box-shadow: 0 8px 20px 0 rgba(44,71,146,.4);
        color: white!important;
        i{
            left: 2px;
            transition: left .3s cubic-bezier(.175,.885,.32,1.275);
        }
    }

</style>
