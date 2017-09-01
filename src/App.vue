<template>
  <div id="app">
    <transition :name="getAnimateStyle" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      animating: 'trans'
    }
  },
  computed: {
    getAnimateStyle() {
      let pathName = this.$route.name
      if (pathName === 'cardList' || pathName === 'login') {
        return this.animating
      } else {
        return 'fade'
      }
    }
  }
}
</script>

<style scoped>
.trans-enter-active,
.trans-leave-active {
  transition: all .3s;
}

.trans-enter,
.trans-leave-to
{
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .3s;
}

.fade-enter,
.fade-leave-to
{
  opacity: 0;
  transform: translateX(-100%)
}
</style>
