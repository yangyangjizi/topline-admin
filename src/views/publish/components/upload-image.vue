<template>
  <div>
    <div class="box-wrap" @click="handleShowMediaBox">
      <p>点击选择图片</p>
      <i
        v-if="!value"
        style="margin-top:20px;
    font-size: 90px;
    color: #eee;"
        class="iconfont iconfenxiang"
      ></i>
      <!-- 这是给用户看到的这个已经选好的当前封面 -->
      <img v-else width="120" :src="value" alt="" />
    </div>

    <!-- 对话框 -->
    <el-dialog title="素材" :visible.sync="dialogVisible" width="30%">
      <el-tabs value="first">
        <el-tab-pane label="上传图片" name="first">
          <el-upload
            class="avtar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
            name="image"
            :on-success="handleUploadSuccess"
            :show-file-list="false"
          >
            <!-- 上传成功，要预览  -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="媒体库" name="second">媒体库</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  // value就是cover.images[索引]的图片
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      imageUrl: null
    }
  },
  created () {

  },
  methods: {
    handleShowMediaBox () {
      // 需要有一个弹框，在弹框中展示图片素材，用户可以点击切换图片的选中状态，点击确定，我们拿到所选的图片链接，将数据给谁
      this.dialogVisible = true
    },
    handleUploadSuccess (res) {
      // 上传成功，预览图片
      this.imageUrl = res.data.url
    },
    handleOk () {
      this.$emit('input', this.imageUrl) // 将数据同步到绑定的数据中
      this.dialogVisible = false // 隐藏对话框
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style lang='less' scoped>
.box-wrap {
  width: 150px;
  height: 150px;
  border: 1px solid #eee;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
