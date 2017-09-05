<template>
  <div class='dialog'>
    <div class='login'>
      <span class='close icon-cross' @click='$router.go(-1)'></span>
      <div class='logo'><img src='../common/img/logo.png'></div>
      <div class='select'>
        <span @click='change(1)' :class='{active:active}'>登陆</span>
        <span @click='change(2)' :class='{active:!active}'>注册</span>
        <div :class='line' class='line'></div>
      </div>
      <form>
        <input type='text' v-model='userName' class='username' placeholder="用户名" >
        <input type='password' v-model='pwd' placeholder="密码">
        <input type='password' v-model='pwd2' placeholder="确认密码" v-show='!active'>
      </form>
      <sxButton v-show='active' @click.native='login' size='normal'>登陆</sxButton>
      <sxButton v-show='!active' @click.native='sign' size='normal'>注册</sxButton>
    </div>
    <div class='mask'></div>
  </div>
</template>
<script>
import sxButton from './sxButton'
import { _login, _sign } from '../api/index'
import Toast from '../base/toast.js'
import axios from 'axios'
export default {
  data() {
    return {
      line: 'line-left',
      active: true,
      userName: '',
      pwd: '',
      pwd2: ''
    }
  },
  computed: {
  },
  methods: {
    sign() {
      let params = {
        username: this.userName,
        password: this.pwd
      }
      let url = '/api/users'
      axios.post(url, params).then(res => {
        console.log(res)
        if (res) res = res.data
        if (res.code === 0) {
          Toast('注册成功')
        } else {
          Toast(res.msg)
        }
      }).catch(e => {
        console.log(e)
      })
    },
    login() {
      let params = {
        password: this.pwd,
        username: this.userName
      }
      let url = '/api/login'
      axios.post(url, params).then(res => {
        if (res) res = res.data
        console.log(res)
        if (res.code === 0) {
          this.$store.dispatch('getLoginInfo', res.data)
          Toast('登陆成功')
          setTimeout(() => {
            this.$router.push({
              name: 'app'
            })
          }, 500)
        } else {
          Toast(res.msg)
        }
      }).catch(e => {
        Toast(e)
      })
    },
    change(idx) {
      switch (idx) {
        case 1:
          this.line = 'line-left'
          this.active = true
          this.btnName = '登陆'
          break
        case 2:
          this.line = 'line-right'
          this.active = false
          break
      }
    }
  },
  components: {
    sxButton
  }
}
</script>
<style lang='scss' scoped>
@import '../common/sass/theme.scss';
@import '../common/sass/mixin.scss';
.dialog {
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 30;
    background: #fff;
    text-align: center;
    height: 460px;
    width: 300px;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 40px;
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 14px;
      display: inline-block;
      text-align: center;
      color: #333;
      cursor: pointer;
      &:hover {
        transform: rotate(360deg);
        transition: 1s;
      }
    }
    .logo {
      margin-bottom: 42px;
    }
    .select {
      display: flex;
      justify-content: space-around;
      font-size: 20px;
      position: relative;
      .active {
        color: #15afff;
        transition: .5s;
      }
      span {
        display: inline-block;
        cursor: pointer;
      }
      .line {
        position: absolute;
        left: 0;
        bottom: -8px;
        height: 2px;
        width: 50%;
        background: #15afff;
        transition: .5s;
      }
      .line-left {
        transform: translateX(0);
      }
      .line-right {
        transform: translateX(100%);
      }
    }
    form {
      margin-top: 50px;
      input {
        width: 200px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid #b9c7dd;
        background: #f5f7fa;
        padding-left: 20px;
        margin-bottom: 10px;
        font-size: 12px;
        transition: .4s;
        &:focus{
          border-color:#1892ed;
          box-shadow: 0px 0px 1px #1892ed;
        }
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    filter: blur(10px);
    background-color: #15afff;
    opacity: 0.6;
    z-index: 20;
  }
}
</style>

