<template>
    <router-link 
      class="search-box"
      to="/search?query=d"
    >
      <i class="search-box-icon icon-search"></i>
      <span class="search-box-tips">大家都在搜</span>
    </router-link>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  name: 'SearchBox',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.search-box {
    border: 1px solid $border-color;
    height: 30px;
    display: block;
    margin: 10px 17px;
    border-radius: 5px;
    display: block;
    position: relative;
    font-size: 0;
    box-shadow: 0px 0px 5px 0px $shadow-color;

    &-icon {
      width: 28px;
      height: 28px;
      display: inline-block;
      margin-left: 10px;
    }
    &-tips {
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      vertical-align: top;
      color: $tips-font-color;
      display: inline-block;
      margin-left: 10px;
    }
}
</style>
