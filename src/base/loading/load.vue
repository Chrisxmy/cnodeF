<template>
    <div class="loading-box" v-show="show">
            <div class="wrap">
                <div class="outer"></div>
            </div>
            <div class="text">{{text}}</div>
    </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    text: {
      type: String,
      default: '正在加载中...'
    }
  }
}
</script>

<style scoped lang='scss'>
.wrap {
    position: absolute;
    width: 50px;
    height: 50px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
}

.outer {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(./icon-spin-s.png) no-repeat;
    background-size: 50px 50px;
    animation: spin 800ms infinite linear;
}

@keyframes spin {
    0% {
        transform: rotate(360deg);
    }
    100% {
        transform: rotate(0deg);
    }
}
</style>