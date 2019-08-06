import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
import {loginApi} from 'api/login'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {},
    state: {
        email: Cookies.get('auth_email'),
        GtLang: Cookies.get('language')
    },
    getters: {
        email: state => state.email
    },
    mutations: {
        setGtlang(state, data){
            state.GtLang = data;
        }
    },
    actions: {
        Login({commit}, userInfo){
            return new Promise((resolve, reject) =>{
                loginApi(userInfo).then(
                    res => {
                        Cookies.set('auth_email', userInfo.email)
                    }
                ).catch(error=>{
                    reject(error)
                })
            })
        }
    }
})

export default store