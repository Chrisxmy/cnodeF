<template>
    <div>
        <ul class='nav'>
            <li>
                <span>全部</span>
            </li>
            <li>
                <span>HTML</span>
            </li>
            <li>
                <span>CSS</span>
            </li>
            <li>
                <span>JavaScript</span>
            </li>
        </ul>
        <ul class='cardList' v-if='topics && topics.length'>
            <router-link :to="{name: 'topicDetail', query:{topic:item._id}}" v-for='(item, index) in topics' tag='li' :key='index'>
                <div class='person'>
                    <span class='photo'>
                        <img src='../common/img/photo.png'>
                    </span>
                    <span class='name' v-if='item.creator.name'>{{item.creator.name}}</span>
                </div>
                <h3 style='font-size:16px'>{{item.title}}</h3>
                <p v-html='item.content'>
                </p>
                <div class='icon'>
                    <span class='eye'>
                        <span class='icon-yanjing'></span>12</span>
                    <span class='replay'>
                        <span class='icon-qipao'></span>{{item.replyLists.length}}</span>
                    <span class='time'>
                        <span class='icon-time'></span>{{item.time | formatTime}}</span>
                </div>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    topics: {
      type: Array
    }
  }
}
</script>



<style lang='scss' scoped>
@import '../common/sass/theme.scss';
@import '../common/sass/mixin.scss';
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
.cardList {
    li {
        cursor: pointer;
        background: #fff;
        padding: 20px 20px 5px 20px;
        font-size: 16px;
        display: block;
        border-radius: 6px;
        box-shadow: 0 0 10px #ccc;
        margin-bottom: 15px;
        &:hover {
            box-shadow: 0 0 8px #999;
            transition: .6s;
            transform: scale(1.005)
        }
        .from {
            color: #999;
            display: inline-block;
            margin-bottom: 16px;
        }
        .person {
            .photo {
                display: inline-block;
                vertical-align: middle;
                img {
                    height: 25px;
                    width: 25px;
                }
            }
            .name {
                display: inline-block;
                vertical-align: middle;
                font-size: 12px;
            }
        }
        h3 {
            font-size: $font-size-large-x;
            color: #1892ed;
            line-height: 52px;
        }
        p {
            color: $color-text;
            font-size: 16px;
            line-height: 24px;
            @include ellipsis($line: 3)
        }
        .icon {
            font-size: 0;
            margin: 12px 0 5px 0;
            span {
                display: inline-block;
                vertical-align: bottom;
                font-size: 12px;
                color: #b9c7dd;
                span {
                    margin-right: 5px;
                    display: inline-block;
                    vertical-align: bottom;
                    color: #b9c7dd;
                }
            }
            span+span {
                margin-left: 20px;
            }
        }
    }
}
</style>
