<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>发布文章</span>
      <div>
        <el-button type="success" @click="handlePublish(false)">发布</el-button>
        <el-button type="primary" @click="handlePublish(true)"
          >存入草稿</el-button
        >
      </div>
    </div>
    <el-row>
      <el-col :span="16">
        <!-- 表单 -->
        <el-form ref="form" :model="articleForm" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <!-- bidirectional data binding（双向数据绑定） -->
            <quill-editor
              v-model="articleForm.content"
              ref="myQuillEditor"
              :options="editorOption"
            >
            </quill-editor>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="articleForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
            <!-- 格局不同的type遍历显示上传图片组件 -->
            <template v-if="articleForm.cover.type > 0">
              <el-row>
                <el-col :span="6" v-for="n in articleForm.cover.type" :key="n">
                  <UploadImage
                    v-model="articleForm.cover.images[n - 1]"
                  ></UploadImage>
                </el-col>
              </el-row>
            </template>
          </el-form-item>
          <el-form-item label="频道">
            <!--
              v-model="articleForm.channel_id" 相当于
              v-bind:value="articleForm.channel_id"
                绑定一个名字叫 value 的数据给子组件
              v-on:input="articleForm.channel_id = $event"
                默认监听子组件的 input 自定义事件，事件发生以后，将事件参数赋值给你绑定的数据
             -->
            <article-channel v-model="articleForm.channel_id"></article-channel>
            <!--
              在组件上 v-model
                数据会影响视图
                视图也会影响数据
             -->
            <!-- <el-select v-model="articleForm.channel_id" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select> -->
          </el-form-item>
        </el-form>
        <!-- /表单 -->
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import UploadImage from './components/upload-image'
import ArticleChannel from '@/components/article-channel'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './quill.user.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor,
    UploadImage
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        channel_id: '', // 频道
        cover: { // 封面
          type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        }
      },
      editorOption: {}, // 富文本编辑器配置选项
      editLoading: false,
      publishLoading: false,
      formDirty: false
    }
  },

  // 监事实例中的数据成员，发生变化，就会调用处理函数，也可以实现发表文章页面的细节处理，修改页面上点击发表文章页面会变化
  // watch: {
  //   // 监事实例中的$router，当发生变化时，就会执行处理函数
  //   '$route' (to, from) {
  //     console.log(to, from)

  //     // 从编辑到发布，由于时一个组件，路由会缓存，不会重新创建。所以在这里重新创建一个
  //     // 对于当前这个组件来说，如果你是从编辑过来的，则将表单清空
  //     if (from.name === 'publish-edit') {
  //       this.articleForm = {
  //         title: '', // 标题
  //         content: '', // 内容
  //         channel_id: '', // 频道
  //         cover: { // 封面
  //           type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
  //           images: []
  //         }
  //       }
  //     }
  //   }
  // },
  created () {
    if (this.$route.name === 'publish-edit') {
      this.loadArticle()
    }
  },
  methods: {
    async loadArticle () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: `/articles/${this.$route.params.id}`
        })
        this.articleForm = data
      } catch (err) {
        console.log(err)
        this.$message.error('获取文章失败')
      }
    },
    async handlePublish (draft) {
      try {
        if (this.$route.name === 'publish') {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '发布成功'
          })
          // 发布成功后清空表单
          this.articleForm = { title: '', content: '', channel_id: '' }
        } else {
          // 执行编辑操作
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.articleForm
          })
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      } catch (err) {
        this.$message.error('操作失败', err)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.publish-card {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
