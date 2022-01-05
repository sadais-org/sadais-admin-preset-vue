<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          autocomplete="on"
          clearable
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          autocomplete="on"
          clearable
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>
      <el-form-item prop="captcha">
        <div class="pi-height-40 pi-flex-row pi-justify-between">
          <el-input
            placeholder="请输入验证码"
            style="width: 203px"
            v-model="loginForm.captcha"
            clearable
            @keyup.enter.native="handleLogin"
          ></el-input>
          <img
            :src="graphicVerificationUrl"
            alt=""
            class="code-pic pi-width-100 pi-height-40 pi-bg-gray pi-radius-4"
            @click.stop="handleResetGraphicVerificationCode"
          />
        </div>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Login',
  components: {}
})
export default class extends Vue {
  private validateUsername = (rule: any, value: string, callback: Function) => {
    callback()
  }
  private validatePassword = (rule: any, value: string, callback: Function) => {
    callback()
  }
  private loginForm = {
    username: '',
    password: '',
    captcha: '',
    timestamp: 0
  }
  private loginRules = {
    username: [{ validator: this.validateUsername, trigger: 'blur' }],
    password: [{ validator: this.validatePassword, trigger: 'blur' }],
    captcha: [{ required: true, message: '验证码不能为空', trigger: 'change' }]
  }
  private passwordType = 'password'
  private loading = false
  private showDialog = false
  private redirect?: string
  private otherQuery: Dictionary<string> = {}

  // 图片验证码URL
  private graphicVerificationUrl: string = ''

  mounted() {
    this.handleResetGraphicVerificationCode()
    if (this.loginForm.username === '') {
      ;(this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      ;(this.$refs.password as Input).focus()
    }
  }

  private showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => {
      ;(this.$refs.password as Input).focus()
    })
  }

  private handleLogin() {
    const form = this.$refs.loginForm as ElForm
    form.validate(async (valid: boolean) => {
      if (!valid) return
      try {
        this.loading = true
        const result = await UserModule.login(this.loginForm)
        if (!result) return
        const redirect = this.$route.query.redirect as string
        setTimeout(() => {
          location.href = redirect || '/'
        }, 200)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 200)
      }
    })
  }

  private handleResetGraphicVerificationCode() {
    this.loginForm.captcha = ''
    this.loginForm.timestamp = new Date().getTime()
    this.graphicVerificationUrl = `${process.env.VUE_APP_BASE_API}/artisan/v1/sms/getcaptcha?phone=${this.loginForm.timestamp}`
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #ffffff;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 26px;
      font-weight: bold;
      text-align: center;
      color: $primary-color;
    }

    .set-language {
      position: absolute;
      top: 3px;
      right: 0;
      font-size: 18px;
      color: #ffffff;
      cursor: pointer;
    }
  }

  .show-pwd {
    position: absolute;
    top: 7px;
    right: 10px;
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
