import Vue from 'vue'
import App from './App.vue'

// 先找文件，没有就找目录
// 如果没有目录，优先加载目录中的 index文件
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
