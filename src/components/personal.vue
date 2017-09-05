<template>
<div class='personal'>
    <imgInputer v-model='img'>
    </imgInputer>
    <button @click='send'>123</button>
    </div>
</template>

<script>
import imgInputer from '../base/img-inputer'
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      img: ''
    }
  },
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    send() {
      if (this.loginInfo && this.loginInfo.user) {
        let url = `/api/users/${this.loginInfo.user._id}`
        let formData = new FormData()
        formData.append('avatar', this.img)
        axios.patch(url, formData, {
          headers: {'Authorization': `auth ${this.loginInfo.token}`}
        }).then(res => {
          res = res.data
          if (res.code === 0) {
            console.log(res)
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        console.log('登陆后修改')
      }
    }
  },
  components: {
    imgInputer
  }
}

</script>


<style lang='scss'>
.personal{
    display: flex;
    justify-content: center;
    margin: 0px 140px 0px 140px;
}

</style>
