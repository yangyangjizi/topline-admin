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

import 'nprogress/nprogress.css'

// import 'at.alicdn.com/t/font_1255078_eh0cf0wtptw.css'

import axios from 'axios'
import {
  getUser,
  removeUser
} from '@/utils/auth'
import JSONbig from 'json-bigint'

import store from './store'
// 配置axios的基础路径
// 发送请求的时候就不需要每次都写http://xxxx
// 在发请求的时候就直接写axios({ url: '/authprizations'}) 246810
// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/' // 局域网使用网址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 在线版

/**
 * 如何解决后端返回数据中的数字超出安全整数范围问题？
 * axios 预留的自定义处理后端返回的原始数据
 * 可以理解成也是一个响应拦截器，这个比较特殊
 * 这里的 data 是后端返回的未经处理的原始数据
 * axios 默认使用 JONS.parse 去转换原始数据，如果其中有超出安全整数范围的数据就有问题了
 * 所以我们在这里可以手动处理这个原始数据
 *   npm i json-biginit
 *   JSONbig.parse(原始json格式字符串)
 */
axios.defaults.transformResponse = [function (data) {
  // console.log('transformResponse => ', data)
  // return data

  // 这里使用 JSONbig.parse 转换原始数据
  // 类似于 JSON.parse
  // 但是它会处理其中超出安全整数范围的整数问题。
  // 严谨一点，如果 data 不是 json 格式字符串就会报错
  try {
    // 如果是 json 格式字符串，那就转换并返回给后续使用
    return JSONbig.parse(data)
  } catch (err) {
    // 报错就意味着 data 不是 json 格式字符串，这里就直接原样返回给后续使用
    return data
  }
}]

/*
Axios请求拦截器：axios发出去的请求会线经过这里
config 是本次请求的相关配置对象

*/
axios.interceptors.request.use(config => {
  const user = getUser()
  // 如果有user数据则往本次请求中添加用户token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // return config 是允许请求发送的开关
  // 我们可以在这之前进行一些业务逻辑操作
  return config
}, error => {
  return Promise.reject(error)
})
// Axios响应拦截器，axios收到的响应会先经过这里
axios.interceptors.response.use(response => {
  // response 就是响应结果对象
  // 这里将response原样返回，那么你发请求的地方收到的就是response
  // 我们可以控制请求收到的响应数据格式
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, error => {
  console.dir(error) // 此处可以检测到所有位置的错误，可以省略再别处写代码
  if (error.response.status === 401) {
    removeUser()
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

Vue.use(ElementUI)

// 所有组件都是Vue的实例，我们可以把一些需要在组件中频繁使用的成员放到prototype中
// 给Vue 原型对象扩展成员的时候，最好加一个$ 前缀，避免和组件内部的数据成员冲突
// 几乎所有的组件都要去发送请求，这样配置玩以后了，我们以后就可以直接用他来发送请求了
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  store, // 将store配置到Vue根实例中，然后所有的组件都可以通过this.$store来访问容器中的数据了
  render: h => h(App)
}).$mount('#app')
