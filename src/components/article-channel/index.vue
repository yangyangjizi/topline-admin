<template>
  <el-select clearable :value="value" @change="$emit('input', $event)">
    <el-option
      v-for="item in channels"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/channels'
        })
        this.channels = data.channels
      } catch (err) {
        this.$message.error('加载频道列表失败', err)
      }
    },
    handleChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
