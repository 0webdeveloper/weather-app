(function(){"use strict";var t={4191:function(t,e,a){var i=a(7195),n=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"container"},[t.isLoad?e("div",[e("h1",[t._v("Идет загрузка .....")])]):e("div",[e("h1",[t._v("Виджет погоды")])]),e("div",{staticClass:"container-cards"},t._l(t.get_weather,(function(t){return e("widget",{key:t.id,attrs:{city:t}})})),1)])])},r=[],s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"weather-card"},[e("img",{staticClass:"gear-menu",attrs:{src:a(8814),alt:""},on:{click:t.showSettings}}),e("h2",{staticClass:"weather-card__title"},[t._v(t._s(t.city.name)+", "+t._s(t.city.country))]),e("div",{staticClass:"weather-card__body"},[e("img",{staticClass:"weather-body__icon",attrs:{src:"http://openweathermap.org/img/wn/"+t.city.icon+"@4x.png",alt:""}}),e("p",{staticClass:"weather-body__temp"},[t._v(t._s(Math.round(t.city.temp))+"°C")])]),e("p",{staticClass:"weather-body__feels-like"},[t._v(" Feels like "),e("b",[t._v(t._s(t.city.feels_like)+"°C")])]),e("p",{staticClass:"weather-body__status"},[t._v(t._s(t.city.description))]),e("p",{},[t._v("Humidity - "),e("b",[t._v(t._s(t.city.humidity))])]),e("p",[t._v("Wind speed - "),e("b",[t._v(t._s(t.city.wind))])]),e("transition",{attrs:{name:"slide-fade"}},[t.isVisible?e("card-settings",{staticClass:"card-settings",on:{delete_card:t.delete_card,closeSetting:t.showSettings}}):t._e()],1)],1)},o=[],c=function(){var t=this,e=t._self._c;return e("div",{staticClass:"settings"},[e("div",{staticClass:"settings__header"},[e("h4",[t._v("Settings")]),e("svg",{staticClass:"settings__close",attrs:{fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg","aria-hidden":"true"},on:{click:function(e){return t.$emit("closeSetting")}}},[e("path",{attrs:{d:"M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"}})])]),t._l(t.listData,(function(i,n){return e("sortable",{key:i.id,attrs:{index:n,"drag-direction":"vertical","replace-direction":"vertical"},on:{sortend:function(e){return t.sortend(e,t.listData)}},model:{value:t.dragData,callback:function(e){t.dragData=e},expression:"dragData"}},[e("img",{staticClass:"settings__bars",attrs:{src:a(2164),alt:""}}),e("p",[t._v(t._s(i.name))]),e("img",{staticClass:"settings__trash",attrs:{src:a(1149),alt:""},on:{click:function(e){return t.delete_card(i.id,n)}}})])})),e("transition",{attrs:{name:"fade"}},[3!=t.watch_city_length?e("div",{staticClass:"settings__footer"},[e("p",[t._v("Add location:")]),e("widget-input")],1):t._e()])],2)},l=[],d=a(2380),h=a.n(d),u=function(){var t=this,e=t._self._c;return e("div",{staticClass:"widget-input-wrap"},[e("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.city_name,expression:"city_name",modifiers:{trim:!0}}],staticClass:"weather-input",attrs:{type:"text"},domProps:{value:t.city_name},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.send_new_city.apply(null,arguments)},input:function(e){e.target.composing||(t.city_name=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),e("img",{staticClass:"enter-btn",attrs:{src:a(8999),alt:""},on:{click:t.send_new_city}})])},_=[],p={name:"Widget-input",data(){return{city_name:""}},methods:{send_new_city(t){""!==this.city_name&&(this.$store.dispatch("weather/set_new_city",this.city_name),this.city_name="")}}},f=p,m=a(1001),w=(0,m.Z)(f,u,_,!1,null,"6eeb3d2e",null),g=w.exports,y=a(408),v={components:{Sortable:h(),WidgetInput:g},data(){return{dragData:{}}},computed:{...(0,y.Se)({listData:"weather/get_weather",watch_city_length:"weather/watch_city_length"})},methods:{sortend(t,e){const{oldIndex:a,newIndex:i}=t;this.rearrange(e,a,i)},rearrange(t,e,a){e>a?(t.splice(a,0,t[e]),t.splice(e+1,1),this.$store.commit("weather/reorder_city",t)):(t.splice(a+1,0,t[e]),t.splice(e,1),this.$store.commit("weather/reorder_city",t))},delete_card(t,e){this.listData.splice(e,1),this.$emit("delete_card",t)}}},b=v,C=(0,m.Z)(b,c,l,!1,null,null,null),k=C.exports,x={name:"Widget",data(){return{isVisible:!1}},components:{CardSettings:k},props:{city:{type:Object}},methods:{showSettings(){this.isVisible=!this.isVisible},delete_card(t){this.$store.commit("weather/remove_city",t)}}},S=x,O=(0,m.Z)(S,s,o,!1,null,"83a7e4ba",null),L=O.exports,$={name:"App",components:{Widget:L},computed:{...(0,y.rn)({isLoad:t=>t.weather.isLoad}),...(0,y.Se)({get_weather:"weather/get_weather"})},methods:{...(0,y.nv)({fetch_forecast:"weather/fetch_forecast",fetch_coords:"weather/fetch_coords"})},async mounted(){await this.fetch_coords(),await this.fetch_forecast()}},j=$,D=(0,m.Z)(j,n,r,!1,null,null,null),Z=D.exports;a(7658);const P=()=>({api_key:"4cb2a06b3d6eddb795aac575a32260c4",weather:JSON.parse(localStorage.getItem("weather")||"[]"),isLoad:!1,coords:[]}),I={watch_city_length(t){return t.weather.length},get_weather(t){return t.weather}},N={setLoading(t,e){t.isLoad=e},set_forecast(t,e){const a=()=>{const t=Date.now().toString(36),e=Math.random().toString(36).substring(2);return t+e},i={id:a(),name:e.name,temp:e.main.temp,wind:e.wind.speed,country:e.sys.country,feels_like:e.main.feels_like,icon:e.weather[0].icon,description:e.weather[0].description,humidity:e.main.humidity};t.weather.length<3&&(t.weather.push(i),localStorage.setItem("weather",JSON.stringify(t.weather)))},reorder_city(t,e){localStorage.setItem("weather",JSON.stringify(e))},remove_city(t,e){t.weather=t.weather.filter((t=>t.id!==e)),localStorage.setItem("weather",JSON.stringify(t.weather))},set_coords(t,e){t.coords=e.loc.split(",")}},W={async fetch_coords({commit:t}){const e=await fetch("https://ipinfo.io/json?token=59ff531672e11e"),a=await e.json();t("set_coords",await a)},async fetch_forecast({state:t,commit:e}){try{if(e("setLoading",!0),!t.weather.length){const a=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t.coords[0]}&lon=${t.coords[1]}&units=metric&appid=${t.api_key}`),i=await a.json();e("set_forecast",await i)}}catch(a){console.error(a)}finally{e("setLoading",!1)}},async set_new_city({state:t,commit:e},a){try{const i=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&units=metric&appid=${t.api_key}`),n=await i.json();let r=n.name;const s=e=>t.weather.find((t=>t.name===e)),o=s(r);o||404==n.cod||e("set_forecast",n)}catch(i){console.log(i)}finally{e("setLoading",!1)}}};var J={namespaced:!0,state:P,getters:I,mutations:N,actions:W};i.ZP.use(y.ZP);var M=new y.ZP.Store({modules:{weather:J}});i.ZP.config.productionTip=!1,new i.ZP({store:M,render:t=>t(Z)}).$mount("#app")},2164:function(t,e,a){t.exports=a.p+"img/Bars4.dbd478f7.svg"},8999:function(t,e,a){t.exports=a.p+"img/enter.60f6b373.svg"},8814:function(t,e,a){t.exports=a.p+"img/gear.85bf86d0.svg"},1149:function(t,e,a){t.exports=a.p+"img/trash.3eb72038.svg"}},e={};function a(i){var n=e[i];if(void 0!==n)return n.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,a),r.exports}a.m=t,function(){var t=[];a.O=function(e,i,n,r){if(!i){var s=1/0;for(d=0;d<t.length;d++){i=t[d][0],n=t[d][1],r=t[d][2];for(var o=!0,c=0;c<i.length;c++)(!1&r||s>=r)&&Object.keys(a.O).every((function(t){return a.O[t](i[c])}))?i.splice(c--,1):(o=!1,r<s&&(s=r));if(o){t.splice(d--,1);var l=n();void 0!==l&&(e=l)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[i,n,r]}}(),function(){a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,{a:e}),e}}(),function(){a.d=function(t,e){for(var i in e)a.o(e,i)&&!a.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){a.p=""}(),function(){var t={143:0};a.O.j=function(e){return 0===t[e]};var e=function(e,i){var n,r,s=i[0],o=i[1],c=i[2],l=0;if(s.some((function(e){return 0!==t[e]}))){for(n in o)a.o(o,n)&&(a.m[n]=o[n]);if(c)var d=c(a)}for(e&&e(i);l<s.length;l++)r=s[l],a.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return a.O(d)},i=self["webpackChunkweather_app"]=self["webpackChunkweather_app"]||[];i.forEach(e.bind(null,0)),i.push=e.bind(null,i.push.bind(i))}();var i=a.O(void 0,[998],(function(){return a(4191)}));i=a.O(i)})();
//# sourceMappingURL=app.4627080d.js.map