<template>
    <section class="thread-card-toolbar">
        <span class="toolbar-share">
          <i class="icon-toolbar-share"></i>{{threadInfo.share_num}}
        </span>
        <span class="toolbar-reply">
          <i class="icon-toolbar-reply"></i>{{threadInfo.reply_num}}
        </span>
        <span class="toolbar-atmosphere">
          <i class="atmosphere-up icon-toolbar-atmosphere-up"></i>
          <span class="atmosphere-num">{{threadInfo.agree_num || (threadInfo.agree && threadInfo.agree.agree_num)}}</span>
          <i class="atmosphere-down icon-toolbar-atmosphere-down"></i>
        </span>
      </section>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    threadInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    // threadInfo () {
    //   return this.$props.threadInfo
    // }
  },

  methods: {
    open (link) {}
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.thread-card-toolbar {
  height: 45px;
  font-size: 0;
  position: relative;
  padding: 10px 0;
  color: $default-font-color;

  .toolbar-share {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    i {
      // background: $placeholder-background;
      height: 25px;
      width: 25px;
      display: inline-block;
      vertical-align: top;
      margin-right: 5px;
      background-size: contain;
    }
  }
  .toolbar-reply {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    margin-left: 20px;
    i {
      // background: $placeholder-background;
      height: 25px;
      width: 25px;
      display: inline-block;
      vertical-align: top;
      margin-right: 5px;
      background-size: contain;
    }
  }
  .toolbar-atmosphere {
    float: right;
    height: 25px;
    
    .atmosphere-up {
      // background: $placeholder-background;
      height: 25px;
      width: 25px;
      display: inline-block;
      vertical-align: top;
      background-size: contain;
    }
    .atmosphere-num {
      height: 25px;
      line-height: 25px;
      width: 25px;
      font-size: 14px;
      display: inline-block;
      vertical-align: top;
      margin: 0 10px;
      text-align: center;
    }
    .atmosphere-down {
      // background: $placeholder-background;
      height: 25px;
      width: 25px;
      display: inline-block;
      vertical-align: top;
      background-size: contain;
    }
  }
}
</style>