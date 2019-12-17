<template>
  <header class="header-navigator">
    <section
      v-for="(tab, index) in tabList"
      :class="'header-navigator-item ' + tab.hoverClass"
      :key="index"
    >
      <i class="hover"></i>
      <span>{{tab.tabName}}</span>
    </section>
    <slot></slot>
  </header>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  name: 'HeaderNavigator',
  methods: {
    open (link) {
    }
  },
  computed: {
    hoverClass (tab) {
      return tab.isHover ? 'hover' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.header-navigator {
  color: $title-font-color;
  font-weight: 600;
  padding: 0 17px;
  position: fixed;
  top: 0;
  left: 0;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid $border-color;
  z-index: 2;
  background: $theme-background;
  width: 100%;
  font-size: 0;
  overflow: hidden;

  .header-navigator-item {
    display: inline-block;
    position: relative;
    vertical-align: top;
    text-align: center;

    span {
      padding: 0 10px;
      line-height: 45px;
      display: block;
      font-size: 17px;
      font-weight: bold;
      width: 70px;
      color: $tips-font-color;
    }
    i {
      display: none;
    }
    &.hover {
      i {
        display: block;
        height: 10px;
        background: $title-hover;
        width: 60px;
        border-radius: 5px;
        margin: 30px auto 0;
      }
      span {
        font-size: 25px;
        margin-top: -40px;
        font-weight: bolder;
        color: $title-font-color;
      }
    }
  }
}
</style>
