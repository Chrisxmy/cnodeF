<template>
  <div class="index">
    <header>
      <div class='log'></div>
      <router-link :to="{name: 'sendTopic'}" class='write' tag='div'>
        <span class='icon-penail'></span>
      </router-link>
      <div class='login' v-if='!userInfo'>
        <router-link :to="{name: 'login'}">登陆</router-link>
        <span>|</span>
        <router-link :to="{name: 'login'}">注册</router-link>
      </div>
      <span @click='loginOut' v-if='userInfo'>登出</span>
      <ul class='iconList' v-if='userInfo'>
        <li>
          <span class='icon-photo'></span>
        </li>
        <li>
          <span class='icon-lingsheng'></span>
        </li>
        <li>
          <span class='icon-setting'></span>
        </li>
      </ul>
    </header>
    <div class='content' >
      <div class='aside-left'>
      <router-view :topics='topics'></router-view>
      </div>
      <div class='aside-right'>
        <span class='name'></span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      userInfo: '',
      topics: [],
      show: true
    }
  },
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    getUserInfo() {
      if (this.loginInfo && this.loginInfo.user) {
        let url = `/api/users/${this.loginInfo.user._id}`
        axios.get(url, {
          headers: { 'Authorization': `auth ${this.loginInfo.token}` }
        }).then(res => {
          res = res.data
          if (res.code === 0) {
            this.userInfo = res.user
            console.log(this.userInfo)
          }
        }).catch(e => {
        })
      }
    },
    loginOut() {
      this.$store.dispatch('getLoginInfo', '')
      this.userInfo = ''
    },
    getAllTopics() {
      let url = '/api/topic'
      axios.get(url).then(res => {
        if (res) res = res.data
        if (res.code === 0) {
          this.topics = res.topics
          console.log(this.topics)
        }
      })
    }
  },
  created() {
    this.getUserInfo()
    this.getAllTopics()
    console.log(1)
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '../common/sass/theme.scss';
@import '../common/sass/mixin.scss';
.index {
  header {
    display: flex;
    justify-content: space-between;
    background: $color-background;
    min-height: 50px;
    padding: 0 140px;
    box-shadow: 0px 1px 1px #ccc;
    margin-bottom: 15px;
    .log {
      background: url('../common/img/logo.png') no-repeat;
      background-position: center;
      height: 50px;
      width: 100px;
    }
    .write{
      padding-top: 20px;
      span{
          font-size:24px;
      }
    }
    .login {
      display: inline-block;
      font-size: 0;
      padding-top: 25px;
      span {
        font-size: 16px;
        color: #e5e5e5;
      }
      a {
        margin: 0 10px;
        font-size: 16px;
        color: $color-text;
        display: inline-block;
        cursor: pointer;
      }
    }
    .iconList {
      display: flex;
      padding: 15px 0 0 0;
      li {
        cursor: pointer;
        padding: 8px;
        font-size: 20px;
      }
    }
  }
  .content {
    margin: 0 140px;
    display: flex;
    justify-content: space-between;
    .aside-left {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 750px;
      margin-right: 10px;
      background: #eee;
      .nav {
        padding: 18px;
        margin-bottom: 15px;
        padding-left: 20px;
        background: $color-background;
        box-shadow: 0 0 10px #ccc;
        border-radius: 6px;
        font-size: 18px;
        display: flex;
        li {
          display: inline-block;
          text-align: center;
          padding: 3px 8px;
          cursor: pointer;
          color: #1892ed;
          &.router-link-active {
            background: linear-gradient(to right, #69cfff, #15cfff, #1892ed);
            border-radius: 14px;
            color: #fff;
            transition: .5s;
          }
        }
        li+li {
          margin-left: 40px;
        }
      }
    }
    .aside-right {
      background: $color-background;
      min-width: 240px;
      height: 200px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter,
  .fade-leave-to/* .fade-leave-active in below version 2.1.8 */
  {
    opacity: 0
  }
  .fade-enter-active, .fade-leave-active {
  transition: all .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100%)
}
}
</style>
