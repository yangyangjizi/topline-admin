import Vue from 'vue'
import App from './App.vue'

// 完整引入Element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式文件，最好在 element之后，可以自定义修改内置的样式
import './styles/index.less'
// 先找文件，没有就找目录  import 都在前面引入，中间不能有别的，规则定的
// 如果没有目录，优先加载目录中的 index文件
import router from './router'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
