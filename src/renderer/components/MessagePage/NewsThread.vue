<template>
  <div id="news-thread" class="news-thread">
    <section class="news-thread-author">
      <img 
        src="https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/b4b8e5a4a7e8b49de8b49de59083e59cb0e4b889e9b29c2c2a?t=1440125871" 
        class="news-thread-author-avatar"
      />
      <section class="news-thread-author-info">
        <p class="news-thread-author-info-name">地三鲜工作室</p>
        <p class="news-thread-author-info-date">01-22</p>
      </section>
    </section>
    <section class="news-thread-content">
      <p class="news-thread-content-detail">哈哈哈哈哈</p>
      <article class="news-thread-content-forward">sdfsdfsdfsdf</article>
    </section>
    <section class="news-thread-detail">
      <span class="news-thread-detail-forum">地三鲜工作室吧</span>
      <span class="news-thread-detail-reply">
        <i class="icon-reply"></i>回复
      </span>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: '贴吧 Lite'
    }
  },
  name: 'NewsThread'
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss'; 
.news-thread {
  margin-top: 5px;
  background: $theme-background;
  overflow: hidden;
  &-author {
    padding: 17px 17px 0;
    &-avatar {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      display: block;
    }
    &-info {
      height: 35px;
      margin-left: 10px;
      display: block;
      margin: -35px 0 0 45px;
      color: $default-font-color;

      &-name {
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: 16px;
      }
      &-date {
        display: block;
        height: 15px;
        line-height: 15px;
        font-size: 10px;
      }
    }
  }
  &-content {
    padding: 10px 17px 0;

    &-detail {
      font-size: 17px;
      line-height: 30px;
    }
    &-forward {
      background: $placeholder-background-light;
      border: 1px solid $border-color;
      font-size: 17px;
      line-height: 30px;
      padding: 17px 10px;
      color: $default-font-color;
    }
  }
  &-detail {
    height: 50px;
    font-size: 0;
    padding: 0 17px;
    &-forum{
      font-size: 12px;
      height: 50px;
      line-height: 50px;
      vertical-align: top;
    }
    &-reply {
      font-size: 12px;
      height: 50px;
      line-height: 50px;
      vertical-align: top;
      float: right;

      .icon-reply {
        background: $placeholder-background;
        height: 20px;
        width: 20px;
        display: inline-block;
        vertical-align: top;
        margin: 15px 10px 0 0;
      }
    }
  }
}
</style>
