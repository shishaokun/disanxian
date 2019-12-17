<template>
  <div id="navigation-bar" class="navigation-bar">
    <span
      class="icon-back icon-back-normal"
      v-on:click="back"
    ></span>
    <slot>
      <span class="icon-more"></span>
    </slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
    //   viewAnimate: 'slide-left'
    }
  },
  name: 'NavigationBar',
  // components: { SystemInformation },
  methods: {
    back () {
      // console.log(this.$route.matched)
      // if (this.$route.matched.length === 1) {
      //   this.$router.replace('/home')
      // } else {
      this.$router.back()
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.navigation-bar {
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 17px;
  width: 100%;
  box-shadow: 0px 1px 4px 0 $shadow-color;
  z-index: 1;
  background: $theme-background;

  .icon-back {
    position: absolute;
    left: 17px;
    top: 10px;
    width: 20px;
    height: 20px;
    // background: $placeholder-background;
  }
  .icon-more {
    position: absolute;
    right: 17px;
    top: 5px;
    width: 30px;
    height: 30px;
    // background: $placeholder-background;
  }
}
</style>
