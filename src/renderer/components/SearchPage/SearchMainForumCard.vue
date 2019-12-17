<template>
    <router-link 
        :to="'/forum/' + forum.forum_name" 
        class="forum-detail-card"
    >
        <img 
            class="forum-detail-card-avatar"
            :src="forum.forum_avatar"/>
        <section class="forum-detail-card-info">
            <h1 class="forum-detail-card-info-name">{{forum.forum_name}}</h1>
            <p class="forum-detail-card-info-tips">{{forum.slogan || ''}}</p>
            <p class="forum-detail-card-info-tips">关注 {{forum.concern_num}}  | 贴子 {{forum.post_num}} </p>
        </section>
        <span class="forum-follow">关注</span>
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
  name: 'SearchMainForumCard',
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
    height: 60px;
    display: block;
    width: 100%;
    position: relative;
    font-size: 0;
    margin: 0 auto;

    &-avatar {
        width: 60px;
        height: 60px;
        background: $placeholder-background;
        border: 2px solid $img-border-color;
        border-radius: 25px;
        display: inline-block;
        vertical-align: top;
    }
    &-info {
        position: relative;
        border-top: none;
        height: 60px;
        display: block;
        text-align: left;
        margin-top: -60px;
        margin-left: 70px;
        
        &-name {
            font-size: 18px;
            color: $default-font-color;
            line-height: 25px;
            height: 25px;
            color: $link-default-color;
        }
        &-tips {
            font-size: 12px;
            line-height: 15px;
            height: 15px;
            color: $default-font-color;
            display: block;
        }
    }
    .forum-follow {
        position: absolute;
        width: 50px;
        height: 25px;
        line-height: 25px;
        background: $button-blue-color;
        color: $button-white-color;
        top: 15px;
        right: 0;
        font-size: 13px;
        text-align: center;
    }
}
</style>
