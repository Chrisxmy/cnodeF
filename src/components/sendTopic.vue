    <template>
  <div class='artical'>
    <header>
      <span class='icon-pencil'></span>
      <span>写文章</span>
      <span @click='send'>发布</span>
    </header>
    <div id="editor">
      <div>
        <img-inputer v-model='img'></img-inputer>
      </div>
      <input contenteditable="true" placeholder="请输入标题" v-model='title'></input>
      <mavon-editor style="height: 100%"  @imgAdd="$imgAdd" @change='change'  
      :toolbars = "{
      bold: true, 
      italic: true, 
      header: true, 
      underline: true, 
      strikethrough: true, 
      mark: true, 
      superscript: true, 
      subscript: true, 
      quote: true, 
      ol: true,
      ul: true, 
      link: true, 
      code: true, 
      table: true, 
      fullscreen: true, 
      readmodel: true, 
      htmlcode: true, 
      help: true,
      undo: true, 
      redo: true, 
      trash: true, // 清空
      save: true, // 保存（触发events中的save事件
      navigation: true, // 导航目录
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      /* 2.2.1 */
      subfield: true, // 单双栏模式
      preview: true, // 预览
      }"
      ></mavon-editor>
    </div>
  </div>
</template>
    <script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { mapState } from 'vuex'
import imgInputer from '@/base/img-inputer'

export default {
  name: 'editor',
  data() {
    return {
      value: '',
      title: '',
      img: ''
    }
  },
  computed: {
    ...mapState({
      loginInfo: state => state.loginInfo.loginInfo
    })
  },
  methods: {
    change(value, render) {
      this.value = render
    },
    $imgAdd(pos, $file) {
      console.log(pos, $file)
    },
    send() {
      if (this.loginInfo && this.loginInfo.user) {
        let url = `/api/topic`
        let params = {
          userId: this.loginInfo.user._id,
          title: this.title,
          content: this.value,
          time: Date.now(),
          titleImg: this.img
        }
        let formData = new FormData()
        for (var key in params) {
          formData.append(key, params[key])
        }
        this.axios.post(url, formData, {
          headers: { 'Authorization': `auth ${this.loginInfo.token}` }
        }).then(res => {
          res = res.data
          if (res.code === 0) {
            console.log(res)
          }
        }).catch(e => {
          console.log(e)
        })
      } else {
        console.log('登陆后发帖')
      }
    }
  },
  components: {
    mavonEditor,
    imgInputer
  }
}
</script>
    <style lang='scss'>
.artical {
  header {
    padding: 10px 0;
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
    span {
      display: inline-block;
      box-sizing: border-box;
    }
    span:nth-of-type(1) {
      width: 20%;
      padding: 0 20px;
    }
    span:nth-of-type(2) {
      width: 65%
    }
    span:nth-of-type(3) {
      border: 1px solid #333;
      padding: 8px 15px;
      border-radius: 6px;
      opacity: 0.6;
      cursor: pointer;
      transition: .4s;
      &:hover {
        border-color: #1892ed;
        color: #1892ed;
      }
    }
  }
  #editor {
    margin: auto;
    width: 70%;
    height: 580px;
    input {
      outline: none;
      font-size: 30px;
      margin: 5px 0;
      background: #eee
    }
  }
}
</style>
