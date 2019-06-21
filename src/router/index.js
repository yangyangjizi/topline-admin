import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',

      // 在整个项目中，模块路径中的@表示的是src目录
      // 无论你在哪个模块中，@都可以直接定位到src
      // 此处省略了index.vue 加载一个目录可以默认加载他的index.js,index.vue,index.json ...
      component: () => import('@/views/home/index.vue')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
