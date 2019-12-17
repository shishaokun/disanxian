<template>
    <router-link 
        :to="'/forum/' + forum.forum_name" 
        class="forum-detail-card"
    >
        <img 
            class="forum-detail-card-avatar"
            :src="forum.avatar"/>
        <section class="forum-detail-card-info">
            <h1 class="forum-detail-card-info-name">{{forum.forum_name}}</h1>
            <p class="forum-detail-card-info-tips">关注 {{forum.concern_num}}</p>
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
  name: 'SearchForumCard',
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
    // height: 30px;
    display: inline-block;
    width: 150px;
    position: relative;
    font-size: 0;
    padding: 10px 10px 10px 0;

    &-avatar {
        width: 40px;
        height: 40px;
        background: $placeholder-background;
        border: 2px solid $img-border-color;
        border-radius: 15px;
        display: inline-block;
        vertical-align: top;
    }
    &-info {
        position: relative;
        border-top: none;
        height: 40px;
        display: block;
        text-align: left;
        margin-top: -40px;
        margin-left: 50px;
        
        &-name {
            font-size: 14px;
            color: $default-font-color;
            line-height: 20px;
            height: 20px;
            overflow: hidden;
            @include word-ellipsis(1);
        }
        &-tips {
            font-size: 12px;
            line-height: 15px;
            height: 15px;
            color: $default-font-color;
            display: block;
        }
    }
}
</style>
