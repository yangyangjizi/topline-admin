<template>
  <!--
   el-menu组件
    default-active设置默认激活的项
   open。colse 当菜单展开和首期的时候会被触发
   background-color 菜单栏背景色
   text-color 菜单栏默认文本颜色
   active-text-color 激活时候的字体文件颜色

   el-submennu
   index用来区分不同的导航项目，可以用作路由导航路径，必须唯一，否则会出现惨淡冲突
  -->

  <el-menu
    default-active="2"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true"
  >
    <el-menu-item index="/">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>内容管理</span>
      </template>
      <el-menu-item index="/publish">
        <i class="el-icon-menu"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="el-icon-menu"></i>
        <span slot="title">内容列表</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/comment">
      <i class="iconfont iconfenxiang"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/media">
      <i class="iconfont iconbianji"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/fans">
          <i class="el-icon-menu"></i>
          <span slot="title">图文数据</span>
        </el-menu-item>
        <el-menu-item index="2-2">
          <i class="el-icon-menu"></i>
          <span slot="title">粉丝概况</span>
        </el-menu-item>
        <el-menu-item index="2-3">
          <i class="el-icon-menu"></i>
          <span slot="title">粉丝画像</span>
        </el-menu-item>
        <el-menu-item index="2-4">
          <i class="el-icon-menu"></i>
          <span slot="title">粉丝列表</span>
        </el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>账户管理</span>
      </template>
    </el-submenu> -->
    <el-menu-item index="/account">
      <i class="iconfont iconbianji"></i>
      <span slot="title">账户管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  data () {
    return {}
  },
  created () { },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang= "less" scoped>
.iconfont {
  margin-right: 5px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>
