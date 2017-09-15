<<template>
<div class='topicDetail'>
  <div class='topicContent' v-if='topicDetail && topicDetail.title'>
    <div class='title'>
      <h2>{{topicDetail.title}}</h2>
      <p>编辑于{{topicDetail.time | formatTime}}  作者{{topicDetail.creator.name}}</p>
      <img :src='topicDetail.titleImg'>
    </div>
    <div class='artical' v-html='topicDetail.content'></div>
  </div>
     <div class='replyList'>
      <div class='reply'>
        <input type='text' placeholder='请写下回复' v-model='replies' @blur='onblur' @focus='onfocus' v-focus>
        <transition  name='fade'>
        <sxButton size='small' @click.native='reply'  backcolor='blue' v-if='show'></sxButton>
        </transition>
      </div>
      <ul class='list'>
        <li v-if='replyList && replyList.length' v-for='item in replyList'>
          <div class='header'>
            <span><img src='../common/img/photo.png' height='25px' width='25px'> {{item.replyer.name}}</span>
            <time>xxxxx</time>
          </div>
          <div class='content'>{{item.content}}</div>
        </li>
      </ul>
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import sxButton from '@/components/sxButton'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      topicDetail: {},
      replies: '',
      replyList: [],
      show: true
    }
  },
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    onblur() {
      this.show = false
    },
    onfocus() {
      this.show = true
    },
    getTopicDetail(id) {
      let url = `/api/topic/${id}`
      axios.get(url).then(res => {
        res = res.data
        if (res.code === 0) {
          this.topicDetail = res.topic
          this.replyList = res.topic.replyLists
        }
      })
    },
    reply() {
      this.show = true
      let url = `/api/topic/${this.topicId}/reply`
      let params = {
        userId: this.loginInfo.user._id,
        content: this.replies
      }
      axios.post(url, params).then(res => {
        res = res.data
        if (res.code === 0) {
          this.replyList = res.topic.replyLists
          this.show = false
        }
      })
    }
  },
  created() {
    this.topicId = this.$route.query.topic
    this.getTopicDetail(this.topicId)
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  },
  components: {
    sxButton
  }
}
</script>

<style lang='scss' scoped>
.topicDetail {
  display: flex;
  flex-direction: column;
  .topicContent {
    background: #fff;
    border-radius: 6px;
    color: #262626;
    margin-bottom: 10px;
    .title {
      padding: 10px 20px;
      border-bottom: 1px solid #eee;
      h2 {
        line-height: 1.5;
        font-size: 24px;
      }
      p {
        color: #999;
        font-size: 12px;
        margin-bottom:20px;
      }
      img{
        width:100px;
        height: 100px;
      }
    }
    .artical {
      padding: 20px;
      line-height: 1.2
    }
  }
  .replyList {
    background: #fff;
    border-radius: 6px;
    .reply {
      padding: 20px;
      display: flex;
      align-items: center;
      input[type='text'] {
        background: #eee;
        border-radius: 20px;
        flex: 1;
        padding: 0.5em 0 0.5em 1.5em;
        margin-right: 5px;
      }
    }
    .list {
      li {
        display: block;
        border-top: 1px dashed #ccc;
        padding: 20px;
        .header {
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
            img {
              vertical-align: middle;
            }
          }
        }
        .content {
          line-height: 1.2;
          padding: 20px 0;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0)
  }
}
</style>

