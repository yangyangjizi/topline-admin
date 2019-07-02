import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
// 加载封装的获取信息的函数模块
import {
  getUser
} from '@/utils/auth'
Vue.use(Router)

const router = new Router({
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
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        {
          name: 'comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        {
          name: 'account',
          path: '/account',
          component: () => import('@/views/account')
        },
        {
          name: 'media',
          path: '/media',
          component: () => import('@/views/media')
        },
        {
          name: 'fans',
          path: '/fans',
          component: () => import('@/views/fans')
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

// 全局前置守卫，当你访问路由页面的时候，会先进入到这里、
// to 是要去哪儿的相关参数，  from 是来自哪里的相关数据。 next， 是允许通过的方法
router.beforeEach((to, from, next) => {
  // 路由导航前，开启进度条
  nprogress.start()
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser()
  if (to.path !== '/login') {
    // 如果是非登陆页面  跳转到登录页面 --》登录了允许通过
    if (!userInfo) {
      if (from.path === '/login') {
        nprogress.done()
      }
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    // 登录页面 -没有登录，允许通过，
    if (!userInfo) {
      next()
    } else {
      // 登录了，不允许通过
      next({
        name: 'home '
      })
      window.location.reload()
    }
  }
})

router.afterEach((to, from) => {
  // 路由导航完成，结束进度条
  nprogress.done()
})
export default router
