/*
vuex ：集中式状态数据管理
我们把不好进行组件通信交互的组件数据放到这里
使用从这里使用
修改也从这里修改
这里的数据和任何组件都无关的
这里的数据，任何组件都可以访问和修改
而且这里的数据也是响应式的，数据改变也会影响组件的视图更新
*/
import Vue from 'vue'
import Vuex from 'vuex'
import {
  getUser,
  saveUser
} from '@/utils/auth'
Vue.use(Vuex)
const store = new Vuex.Store({
  // state 中的数据可以被任何组件的访问
  // 在组件中直接this.$store.state.xxx 进行访问
  // 修改也从这里修改
  // 做法：在store中定义mutation修改state状态
  // mutations就好比容器的methods
  // 说白了就是：在store中定义一个mutation来修改state状态
  // 在组件中调用mutation函数完成对状态的修改

  state: {
    user: getUser() || {} // user的初始数据来在于本地存储
  },
  // mutation 函数默认接收一个参数state，也就是说容器的state
  // 我们可以在这里通过state.xxx = xxx来完成容器状态的修改
  mutations: {
    changeUser (state, user) {
      // 将参数user合并到state.user中，说白就是对象拷贝
      Object.assign(state.user, user)

      // 加程序中的最新的用户信息重新写入本地存储，防止刷新得到旧的信息

      saveUser(state.user)
    }
  }
})
export default store
