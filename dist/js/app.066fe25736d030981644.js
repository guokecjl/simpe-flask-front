webpackJsonp([4],{"1DrD":function(n,e){},NHnr:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("7+uW"),o={render:function(){var n=this.$createElement,e=this._self._c||n;return e("div",{attrs:{id:"app"}},[this.isRouteAlive?e("router-view"):this._e()],1)},staticRenderFns:[]};var r=t("VU/8")({name:"App",provide:function(){return{reload:this.reload}},data:function(){return{isRouteAlive:!0}},methods:{reload:function(){this.isRouteAlive=!1,this.$nextTick(function(){this.isRouteAlive=!0})}},components:{}},o,!1,function(n){t("1DrD")},null,null).exports,u=t("/ocq");i.a.use(u.a);var c=[{path:"/",component:function(n){return t.e(2).then(function(){var e=[t("mFi9")];n.apply(null,e)}.bind(this)).catch(t.oe)},children:[{path:"/login",name:"login",component:function(n){return t.e(0).then(function(){var e=[t("Luci")];n.apply(null,e)}.bind(this)).catch(t.oe)}},{path:"/register",name:"register",component:function(n){return t.e(1).then(function(){var e=[t("1cHr")];n.apply(null,e)}.bind(this)).catch(t.oe)}}]}],a=new u.a({mode:"history",routes:c});i.a.config.productionTip=!1,new i.a({el:"#app",router:a,components:{App:r},template:"<App/>"})}},["NHnr"]);