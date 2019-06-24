<template>
  <el-row class="app-header" :gutter="20">
    <el-col :span="10">江苏传智播客科技股份有限公司</el-col>
    <el-col :span="5" :offset="5">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img width="30" :src="userInfo.photo" alt="" />
          {{ userInfo.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户设置</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
// import { removeUser, getUser } from '@/utils/auth'
export default {
  name: 'AppHeader.vue',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {}
}
</script>

<style lang='less' scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}
.el-dropdown-link{
  display: flex;
  align-items:center;
  cursor: pointer;
  color:#409EFF;
  img{
    border-radius:50%;
  }
}
.el-icon-arrow-down{
  font-size:12px;
}
</style>
