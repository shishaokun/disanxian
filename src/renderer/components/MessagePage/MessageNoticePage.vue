<template>
  <div id="notice" class="notice">
    <section class="notice-content">
        notice
    </section>
  </div>
</template>

<script>
//   import BottomNavigator from '@/components/common/BottomNavigator'
export default {
  data () {
    return {
      title: '贴吧 Lite'
    }
  },
  name: 'MessageNoticePage'
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
.notice {
  &-navigator {
    &-tab {}
    &-hover {}
  }
}
</style>
