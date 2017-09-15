<template>
  <div class="index">
    <header>
      <div class='log'></div>
      <router-link :to="{name: 'sendTopic'}" class='write' tag='div'>
        <span class='icon-pencil'></span>
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
    <div class='content'>
      <div class='aside-left'>
        <transition name='fade' mode='out-in'>
          <router-view :topics='topics'></router-view>
        </transition>
        <pagination :total="total" :display='display' :current-page='current' @pagechange="getAllTopics" v-if='pageShow'></pagination>
      </div>
      <router-link :to="{name: 'personal'}" class='aside-right' v-if='userInfo' tag='div'>
        <img :src='userInfo.avatar'>
        <span class='name'>{{userInfo.name}}</span>
        </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import pagination from '../base/pagination'
import Toast from '../base/toast.js'
export default {
  data() {
    return {
      userInfo: '',
      topics: [],
      show: true,
      total: 1,
      display: 5,
      current: 1,
      pageShow: true
    }
  },
  watch: {
    '$route'(path) {
      path.name === 'topicDetail' ? this.pageShow = false : this.pageShow = true
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
        this.axios.get(url, {
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
    getAllTopics(pageNumber = 1, pageSize = 5) {
      --pageNumber
      this.$loading.show()
      let url = `/api/topic?pageNumber=${pageNumber}&pageSize=${pageSize}`
      this.axios.get(url).then(res => {
        if (res) res = res.data
        if (res.code === 0) {
          this.topics = res.topics
          this.total = res.count
          setTimeout(() => {
            this.$loading.hide()
            Toast('数据接收成功')
          }, 500)
        }
      })
    }
  },
  created() {
    this.getUserInfo()
    this.getAllTopics()
  },
  components: {
    pagination
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import '../common/sass/theme.scss';
@import '../common/sass/mixin.scss';
.index {
  header {
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    background: $color-background;
    min-height: 50px;
    padding: 0 140px;
    box-shadow: 0px 1px 1px #ccc;
    z-index: 888;
    .log {
      background: url('../common/img/logo.png') no-repeat;
      background-position: center;
      height: 50px;
      width: 100px;
    }
    .write {
      padding-top: 20px;
      span {
        font-size: 24px;
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
    margin: 65px 140px 0px 140px;
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
      min-width: 200px;
      height: 200px;
      box-sizing: border-box;
      padding: 20px;
      text-align: center;
      img{
        display: inline-block;
        height:60px;
        width:60px;
        border-radius: 50%;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .4s
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
}
</style>
