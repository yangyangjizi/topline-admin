<template>
  <div class="login-wrap">
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png" alt />
      </div>
      <!-- 配置校验规则 rules 规则对象配置到el-form上 prop 校验字段配置到el-form-item上 。 js触发验证 ，ref， this.$refs['refs名字']。validate（valid =>{}）方法来调用实现-->
      <el-form class="form-content" ref="form" :model="form" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
            <el-input v-model="form.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :offset="1" :span="9">
            <!-- <el-button @click="handleSendCode">获取验证码</el-button> -->
            <el-button @click="handleSendCode" :disabled="!!codeTimer">{{
              codeTimer ? `剩余${codeTimeSeconds}秒` : '获取验证码'
            }}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox
            class="agree-checkbox"
            v-model="form.agree"
          ></el-checkbox>
          <span class="agree-text">
            我已阅读并同意
            <a href="#">用户协议</a>和
            <a href="#">隐私条款</a>
          </span>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-login" type="primary" @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'//  引入极验 jsSDX文件，通过window.initGeetest使用z这个插件
const initCodeTimeSeconds = 10
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        agree: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          // { len: 11, message: '请输入正确的手机号', trigger: 'blur' }
          { pattern: /\d{11}/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          // { len: 6, message: '验证码错误', trigger: 'blur' }
          { pattern: /\d{6}/, message: '验证码错误', trigger: 'blur' }
        ],
        agree: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      },
      // 处理倒计时定时器和倒计时事件
      codeTimer: null,
      codeTimeSeconds: initCodeTimeSeconds
    }
  },
  created () { },
  methods: {
    handleLogin () {
      // 使用form组件的 validate方法来触发校验，获取校验的结果状态，valid是布尔值，为false不发送请求，即return，为true时调用发送请求
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单通过验证提交请求 调用下面的发送请求
        this.submitLogin()
      })
    },
    submitLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      })
        .then(res => {
          const userInfo = res.data.data
          window.localStorage.setItem('user_info', JSON.stringify(userInfo))
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({
            name: 'home'
          })
        })
        .catch((e) => {
          this.$message.error('登录失败，手机号或验证码错误')
        })
    },
    handleSendCode () {
      // 验证手机号是否有效
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        // 验证通过，初始化显示验证码
        this.showGeetest()
      })
    },
    showGeetest () {
      const { mobile } = this.form
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({
          // 以下配置参数来自服务器SDX
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind'
        }, captchaObj => {
          captchaObj.onReady(() => {
            // 验证码ready之后才能调用verify方法显示验证码 弹出验证码内容框
            captchaObj.verify()
          }).onSuccess(() => {
            const {
              geetest_challenge: challenge,
              geetest_seccode: seccode,
              geetest_validate: validate } =
              captchaObj.getValidate()

            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              // 发送短信成功，开始倒计时
              this.codeCountDown()
            })
          }).onError(function () {

          })
          // 在这里注册的“发送验证码”按钮的点击事件，然后验证用户是否输入手机号以及手机号是否正确，有没有问题
        })
      })
    },

    // 验证码倒计时
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        this.codeTimeSeconds--
        if (this.codeTimeSeconds <= 0) {
          // 清除定时器
          window.clearInterval(this.codeTimer)
          // 让倒计时的时间回归到初始状态
          this.codeTimeSeconds = initCodeTimeSeconds
          // 将存储定时器引用的变量重新赋值为null
          this.codeTimer = null
        }
      }, 1000)
    }

  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background: url('./login_bg.jpg');
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-head {
    display: flax;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    .btn-login {
      width: 100%;
    }
    .agree-checkbox {
      margin-right: 10px;
    }
    .agree-text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>
