(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{3013:function(t,e,n){var content=n(4471);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(84).default)("17b10f90",content,!0,{sourceMap:!1})},4470:function(t,e,n){"use strict";n(3013)},4471:function(t,e,n){var o=n(83),r=n(239),d=n(4472);e=o(!1);var l=r(d);e.push([t.i,'.extension[data-v-4db03e38]{position:fixed;bottom:0;left:0;z-index:1000;width:100%;height:180px;cursor:pointer;display:none}.extension[data-v-4db03e38]:before{display:flex;width:100%;position:absolute;bottom:0;z-index:0;height:148px;z-index:-1;content:"";background-color:#fff}.extension .link[data-v-4db03e38]{width:100%;height:100%;color:#000;background-repeat:no-repeat;background-image:url('+l+");background-position:bottom;background-size:auto 180px;image-rendering:-webkit-optimize-contrast}.extension .link .price[data-v-4db03e38]{margin-left:5px;margin-right:5px;color:#007fff}.extension .link .description[data-v-4db03e38],.extension .link .title[data-v-4db03e38]{font-size:26px;padding-top:50px;box-sizing:border-box;width:960px;margin:0 auto;padding-left:22px}.extension .link .description[data-v-4db03e38]{color:rgba(0,0,0,.7);font-size:13px;padding-top:8px}.extension .ion-close[data-v-4db03e38]{position:absolute;top:35px;right:0;padding:10px;font-size:16px;color:#bbb}.extension .ion-close[data-v-4db03e38]:hover{color:#999}.books[data-v-4db03e38]{display:none;left:15px;right:15px;position:fixed;bottom:15px;z-index:900}.books.book--mobile[data-v-4db03e38]{bottom:55px}.books .book-inner[data-v-4db03e38]{width:100%;height:50px;padding-left:15px;padding-right:15px;display:flex;justify-content:center;align-items:center;background:#fd4243;box-sizing:border-box;border-radius:2px;background:linear-gradient(108deg,#f87554,#f0232f);background:-webkit-linear-gradient(-12deg,#f87554,#f0232f)}.books .book-inner .icon[data-v-4db03e38]{width:38px}.books .book-inner .icon img[data-v-4db03e38]{width:100%;display:block}.books .book-inner .title[data-v-4db03e38]{flex-grow:1;padding-left:15px;color:#fff;font-size:15px}.books .book-inner .btn-get[data-v-4db03e38]{padding-left:15px;padding-right:15px;height:26px;line-height:26px;border-radius:2px;border:1px solid #fff;color:#fff}@media (max-width:960px){.books[data-v-4db03e38]{display:block}}@media (min-width:960px){.extension[data-v-4db03e38]{display:block}}",""]),t.exports=e},4472:function(t,e,n){t.exports=n.p+"img/extension.c9aff10.png"},4594:function(t,e,n){"use strict";n.r(e);n(16),n(14),n(10),n(4),n(12),n(85),n(193),n(40);var o=n(0),r=n(7),d=n(3),l=n(64),c=n(162);function x(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?x(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):x(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v="https://juejin.cn/extension/?utm_source=standalone&utm_medium=Pop-ups2&utm_campaign=extension_promotion",h=["gettingStarted","pin"],m=r.default.extend({data:function(){return{extLink:v,timer:null,visibleForRoute:!0,visibleExtension:!1}},computed:f(f({},Object(l.mapGetters)({logined:d.LOGINED})),{},{isFromExtension:function(){var t,e;return(null===(e=null===(t=this.$route)||void 0===t?void 0:t.query)||void 0===e?void 0:e.utm_source)===c.g}}),watch:{$route:function(t){h.indexOf(t.name)>-1?this.visibleForRoute=!1:this.visibleForRoute=!0}},mounted:function(){this.visibleExtension=this.checkVisibility(),this.visibleExtension&&this.loopGetExtensionState()},beforeDestroy:function(){var t;clearInterval(null!==(t=this.timer)&&void 0!==t?t:-1)},methods:{checkVisibility:function(){return!localStorage.getItem("hideExtension")&&!this.extensionInstalled()&&!this.isFromExtension},extensionInstalled:function(){var t,e;return void 0!==(null!==(e=(null!==(t=null===document||void 0===document?void 0:document.cookie)&&void 0!==t?t:"").split(";"))&&void 0!==e?e:[]).find((function(t){return"_jj_ext=1"===t.trim()}))},linkExtension:function(){var t=this;setTimeout((function(){t.hideExtension()}),3e3),window.open(v,"_blank")},hideExtension:function(){var t;window.localStorage.setItem("hideExtension","true"),this.visibleExtension=!1,window.clearInterval(null!==(t=this.timer)&&void 0!==t?t:-1)},loopGetExtensionState:function(){var t=this;this.timer=window.setInterval((function(){var e;t.checkVisibility()||(t.visibleExtension=!1,clearInterval(null!==(e=t.timer)&&void 0!==e?e:-1))}),5e3)}}}),k=(n(4470),n(35)),component=Object(k.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visibleExtension&&t.visibleForRoute?n("div",{staticClass:"recommend-box"},[n("div",{staticClass:"extension",on:{click:t.linkExtension}},[t._m(0),t._v(" "),n("div",{staticClass:"ion-close",on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.hideExtension(e)}}})])]):t._e()}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"link",attrs:{"data-growing-container":"true","data-growing-title":"掘金插件"}},[e("div",{staticClass:"title"},[this._v("稀土掘金浏览器插件——你的一站式工作台")]),this._v(" "),e("div",{staticClass:"description"},[this._v("\n        多内容聚合浏览、多引擎快捷搜索、多工具便捷提效、多模式随心畅享，你想要的，这里都有。\n      ")])])}],!1,null,"4db03e38",null);e.default=component.exports}}]);