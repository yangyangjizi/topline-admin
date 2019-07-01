<template>
  <el-card>
    <div slot="header">
      <span>评论管理</span>
    </div>
    <el-table :data="articles">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column
        label="总评论数"
        prop="total_comment_count"
      ></el-table-column>
      <el-table-column
        label="评论粉丝数"
        prop="fans_comment_count"
      ></el-table-column>
      <el-table-column label="允许评论">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.disabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleComment',
  data () {
    return {
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment'
          }
        })
        // 手动造一个数据disabled，用来控制每一行的switch开关的启用状态,在修改状态时发送请求时禁止再次点击
        data.results.forEach(item => {
          item.disabled = false
        })
        this.articles = data.results
      } catch (err) {
        console.log1(err)
        this.$message.error('加载文章列表失败')
      }
    },
    async handleChangeStatus (item) {
      try {
        // 禁用当前行的switch开关
        item.disabled = true
        // 请求修改
        await this.$http({
          method: 'PUT',
          url: '/comments/status',
          params: {
            article_id: item.id.toString() // 注意：数据id转为字符串。超过了安全范围，转为字符串可以成功
          },
          data: {
            allow_comment: item.comment_status
          }
        })
        // JSON.parse('adsds')  可以用来出错实现评论修改后自动又修改回来
        this.$message({
          type: 'success',
          message: `${item.comment_status ? '启用' : '禁用'}评论状态成功`
        })
      } catch (err) {
        console.log(err)
        this.$message.error('修改评论状态失败')

        // 评论状态修改失败，让客户端的评论状态回到原来的状态
        item.comment_status = !item.comment_status
      }
      // 此时在启用当前行switch的点击状态
      item.disabled = false
    }
  }
}
</script>

<style lang='less' scoped>
</style>
