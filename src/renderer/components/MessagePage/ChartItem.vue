<template>
  <section id="chart-item" class="chart-item">
    <img 
        src="https://tb1.bdstatic.com/tb/%E7%A0%B4%E4%BA%A7%E5%A7%90%E5%A6%B9.jpg" 
        class="chart-item-avatar"
    />
    <section class="chart-item-info">
        <p class="chart-item-info-title">贴吧公众号</p>
        <p class="chart-item-info-des">啦啦啦啦啦啦啦啦啦啦啦啦啦阿拉蕾</p>
        <span class="chart-item-info-notice"></span>
    </section>
  </section>
</template>

<script>
export default {
  data () {
    return {
      title: '贴吧 Lite'
    }
  },
  name: 'ChartItem'
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss'; 
.chart-item {
  border-bottom: 1px solid $border-color;
  overflow: hidden;
  font-size: 0;
  padding: 10px 0;
  position: relative;

  &-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
  }
  &-info {
      display: block;
      height: 40px;
      margin: -40px 0 0 50px;
      &-title {
          height: 25px;
          line-height: 25px;
          font-size: 15px;
      }
      &-des {
          height: 15px;
          line-height: 15px;
          font-size: 12px;
      }
      &-notice {
          position: absolute;
          top: 15px;
          right: 0;
          width: 30px;
          height: 30px;
          background: $placeholder-background;
      }
  }
}
</style>
