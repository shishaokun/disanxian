<template>
    <router-link 
        :to="'/forum/' + forum.forum_name" 
        class="forum-detail-card"
    >
        <img 
            class="forum-detail-card-avatar"
            :src="forum.forum_avatar"/>
        <section class="forum-detail-card-info">
            <h1 class="forum-detail-card-info-name">
                {{forum.forum_name}} <i class="forum-detail-card-info-level"></i>
            </h1>
            <p class="forum-detail-card-info-tips">{{forum.forum_detail || '暂无更多消息~'}}</p>
        </section>
    </router-link>
</template>

<script>
export default {
  props: {
    forum: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  name: 'ForumDetailCard',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';
.forum-detail-card {
    height: 50px;
    display: block;
    width: 100%;
    position: relative;
    font-size: 0;
    margin: 18px auto 0;

    &-avatar {
        width: 44px;
        height: 44px;
        margin-top: 3px;
        background: $placeholder-background;
        border: 2px solid $img-border-color;
        border-radius: 15px;
        display: inline-block;
        vertical-align: top;
    }
    &-info {
        position: relative;
        border-top: none;
        height: 50px;
        display: block;
        text-align: left;
        margin-top: -50px;
        margin-left: 60px;
        
        &-name {
            font-size: 16px;
            color: $default-font-color;
            line-height: 30px;
            .forum-detail-card-info-level {
                background: $placeholder-background;
                width: 5px;
                height: 5px;
            }
        }
        &-tips {
            font-size: 12px;
            line-height: 15px;
            color: $default-font-color;
            display: block;
        }
    }
}
</style>
