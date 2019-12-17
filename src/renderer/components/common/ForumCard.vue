<template>
    <router-link 
        :to="'/forum/' + forum.name" 
        class="forum-card"
    >
        <section 
            class="forum-card-banner"
            :style="forumBg"
        ></section>
        <!-- <i class="forum-card-news">...</i> -->
        <section class="forum-card-info">
            <img 
                class="forum-card-info-avatar"
                :src="forum.avatar"
            />
            <h1 class="forum-card-info-name">{{forum.name}}</h1>
            <span class="forum-card-info-follow">关注 {{MemberNum}}</span>
        </section>
    </router-link>
</template>

<script>
import {
  numFormat
} from '@/utils/filters.js'
export default {
  props: {
    forum: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  name: 'ForumCard',
  computed: {
    MemberNum () {
      return numFormat(this.$props.forum.member_num)
    },
    forumBg () {
      if (!this.$props.forum.theme_color) {
        return ''
      }
      let themes = this.$props.forum.theme_color
      let theme = themes.day
      let background = 'background:' + (theme.common_color || '2B80FF') + '; background-color:#' + theme.common_color +
      ';background: linear-gradient(to right,#' + theme.light_color + ',#' + theme.dark_color + ')'
      return background
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';
.forum-card {
  height: 140px;
  display: inline-block;
  margin-right: 8px;
  width: 110px;
  position: relative;
  
  &-banner {
    width: 100%;
    background: $forum-banner-background;
    height: 60px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &-news {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 14px;
    display: block;
    color: $font-light-color;
    background: $notice-background;
    border-radius: 7px;
    font-size: 14px;
    line-height: 7px;
    text-align: center;
    font-weight: 900;
  }
  &-info {
    position: relative;
    border-top: none;
    height: 80px;
    box-shadow: 0 5px 10px 0 $shadow-color;

    &-avatar {
      position: absolute;
      top: -25px;
      left: 30px;
      width: 45px;
      height: 45px;
      background: $placeholder-background;
      border: 2px solid $img-border-color;
      border-radius: 15px;
    }
    &-name {
      font-size: 14px;
      color: $default-font-color;
      padding-top: 25px;
      line-height: 20px;
      text-align: center;
    }
    &-follow {
      font-size: 10px;
      line-height: 15px;
      color: $default-font-color;
      text-align: center;
      display: block;
    }
  }
}
</style>
