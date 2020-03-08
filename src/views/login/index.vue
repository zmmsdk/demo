
<template>
  <div class="login">
    <!-- 导航栏 -->
    <van-nav-bar class="page-navbar" title="注册/登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 表单 -->
    <ValidationObserver ref="form">
      <ValidationProvider name="手机号" rules="required|mobile">
        <van-field v-model="user.mobile" type="tel" maxlength="11" placeholder="请输入手机号">
          <van-icon slot="left-icon" class-prefix="icon" name="shouji"></van-icon>
        </van-field>
      </ValidationProvider>

      <ValidationProvider name="验证码" rules="required|code">
        <van-field
          ref="codeField"
          v-model="user.code"
          type="tel"
          maxlength="6"
          placeholder="请输入验证码"
        >
          <van-icon slot="left-icon" class-prefix="icon" name="mima"></van-icon>
          <van-button
            slot="button"
            size="small"
            :type="isSending ? 'default' : 'primary'"
            :disabled="isSending"
            @click="onSendCode"
          >
            <!-- CountDown 倒计时  -->
            <van-count-down
              ref="countDown"
              v-if="isSending"
              :time="1000 * 60"
              format="ss s"
              :auto-start="false"
              @finish="isSending = false"
            />
            <!-- /CountDown 倒计时 -->
            <span v-else>获取验证码</span>
          </van-button>
        </van-field>
      </ValidationProvider>
    </ValidationObserver>

    <!-- /表单 -->

    <!-- 登录按钮 -->
    <div class="login-btn-box">
      <van-button color="#6db4fb" type="info" @click="onLogin">登录</van-button>
    </div>
    <!-- /登录按钮 -->

  </div>
</template>

<script>
import { login, sendSmsCode } from '@/api/user'
import { validate } from 'vee-validate'

export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isSending: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  methods: {
    async onLogin () {
      // 表单验证
      const isValid = await this.$validateForm(this.$refs.form)
      if (!isValid) {
        return
      }
      // 登陆中提示
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const res = await login(this.user)
        console.log(res)
        // 点击登录将token数据存储到容器
        // res.data.data => { token: 'xxx', refresh_token: 'xxx' }
        this.$store.commit('setUser', res.data.data)

        this.$store.dispatch('updateProfile')

        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')

        // 跳转到首页
        const redirect = this.$route.query.redirect || '/'
        this.$router.replace(redirect)
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    // 使用async   await  执行验证
    // 发送验证码点击事件
    async onSendCode () {
      const { mobile } = this.user
      // 校验手机号码是否有效
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号码'
      })
      // 如果验证失败使用轻提示
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }

      // 显示倒计时
      this.isSending = true

      // 让验证码输入框聚焦
      this.$refs['codeField'].focus()

      // 开始倒计时
      this.$nextTick(() => {
        this.$refs.countDown.start()
      })

      // 发送短信
      try {
        await sendSmsCode(mobile)
      } catch (err) {
        console.log('发送失败', err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.login {
  .login-btn-box {
    padding: 20px;
    .van-button {
      width: 100%;
    }
  }
  .van-cell {
    align-items: center;
  }
}
</style>
