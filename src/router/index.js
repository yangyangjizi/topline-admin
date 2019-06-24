import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',

    //   // 在整个项目中，模块路径中的@表示的是src目录
    //   // 无论你在哪个模块中，@都可以直接定位到src
    //   // 此处省略了index.vue 加载一个目录可以默认加载他的index.js,index.vue,index.json ...
    //   component: () => import('@/views/home/index.vue')
    // },
    {
      // layout显示到App跟组建的路由出口
      // name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        // 所有的children路由都显示到父路由的router-view中
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    }
  ]
})
