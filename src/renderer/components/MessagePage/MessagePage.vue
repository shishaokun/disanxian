<template>
  <section id="message" class="message">
    <section class="message-navigator">
      <router-link 
        class="message-navigator-tab message" :class="current"
        to="/message/news"
      >消息</router-link>
      <router-link 
        class="message-navigator-tab chart" :class="current"
        to="/message/chart"
      >聊天</router-link>
      <router-link 
        class="message-navigator-tab notice" :class="current"
        to="/message/notice"
      >通知</router-link>
    </section>
    <section class="message-content">
      <router-view></router-view>
    </section>
  </section>
</template>

<script>
//   import BottomNavigator from '@/components/common/BottomNavigator'
export default {
  data () {
    return {
      title: '贴吧 Lite',
      current: this.$route.name
    }
  },
  name: 'MessagePage'
  // components: { BottomNavigator }
  // methods: {
  //   open (link) {
  //     // this.$electron.shell.openExternal(link)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss'; 
.message {
  width: 100%;

  &-navigator {
    height: 40px;
    width: 100%;
    text-align: center;
    font-size: 0;
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid $border-color;
    background: $theme-background;
    z-index: 1;

    &-tab {
      font-size: 16px;
      height: 40px;
      width: 40px;
      line-height: 40px;
      vertical-align: top;
      color: $default-font-color;
      margin: 0 10px;
      display: inline-block;

      &.router-link-active {
        font-size: 17px;
        color: $title-font-color;
        border-bottom: 2px solid $title-font-color;
      }
    }
  }
  &-content {
    margin-top: 40px;
  }
}
</style>
