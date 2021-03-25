import Vue from 'vue'
import App from './App.vue'
import router from "./router"
//import VueSwiper from "./vue-awesome-swiper"
//import 'swiper/dist/css/swiper.css'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
require('./assets/css/base.css')
