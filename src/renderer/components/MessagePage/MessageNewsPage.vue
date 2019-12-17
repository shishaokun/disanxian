<template>
  <div id="news" class="news">
    <section class="news-tab">
        <div class="news-tab-item">
            <i class="news-tab-item-icon at"></i>
            <span class="news-tab-item-txt">@我的</span>
            <i class="news-tab-item-tips"></i>
        </div>
        <div class="news-tab-item">
            <i class="news-tab-item-icon zan"></i>
            <span class="news-tab-item-txt">点赞</span>
            <i class="news-tab-item-tips"></i>
        </div>
    </section>
    <section class="news-content">
      <NewsThread />
      <NewsThread />
      <NewsThread />
      <NewsThread />
      <NewsThread />
    </section>
  </div>
</template>

<script>
import NewsThread from '@/components/MessagePage/NewsThread'
export default {
  data () {
    return {
      title: '贴吧 Lite'
    }
  },
  name: 'MessageNewsPage',
  components: {
    NewsThread
  }
  // methods: {
  //   open (link) {
  //     // this.$electron.shell.openExternal(link)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss'; 
.news {
  &-tab {
    padding: 17px 17px 0;
    display: block;
    overflow: hidden;
    position: relative;
    height: 145px;

    &-item {
      height: 40px;
      width: 100%;
      font-size: 0;
      display: block;
      position: relative;
      margin-bottom: 30px;

      &-icon {
        width: 40px;
        height: 40px;
        display: inline-block;
        vertical-align: top;
        background: $placeholder-background;
        &.at {}
        &.zan {}
      }
      &-txt {
        display: inline-block;
        vertical-align: top;
        font-size: 16px;
        line-height: 40px;
        margin-left: 10px;
      }
      &-tips {
        display: block;
        background: $placeholder-background;
        width: 20px;
        height: 20px;
        margin-top: 10px;
        float: right;
      }
    }
  }
  &-content {
    background: $placeholder-background-light;
    overflow: hidden;
  }
}
</style>
