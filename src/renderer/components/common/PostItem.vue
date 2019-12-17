<template>
  <div class="post-item">
    <router-link 
      class="post-item-author"
      :to="'/userProfile/' + author.portrait"
    >
      <img
        :src="author.portrait_url"
        class="post-item-author-avatar"
      />
      <section class="post-item-author-detail">
        <p class="user-name">{{author.name_show}}</p>
        <p class="post-time">第{{postItem.floor_num}}楼 | {{formateTime}}</p>
      </section>
      <section class="post-item-author-zan">
        <i class="icon-atmosphere-up"></i>
        <span class="num">{{postItem.agree.agree_num}}</span>
        <i class="icon-atmosphere-down"></i>
      </section>
    </router-link>
    <section class="post-item-content">
      <RichText 
        :isFirstPost="0"
        :threadInfo="postItem"
      />
    </section>
    <section 
      class="post-item-reply"
      v-if="postItem.sub_post_list.length > 0"
    >
      <LzlItem 
        v-for="(item, index) in postItem.sub_post_list" 
        v-bind:lzlPost="item"
        v-bind:key="item.pid + '-' + index"
      />
      <div 
        v-if="postItem.reply_num > 2 || (postItem.reply_num > 0 && postItem.reply_num < 3 && postItem.sub_post_list.length !== postItem.reply_num)"
        class="post-item-reply-more"
      >查看全部{{postItem.reply_num}}条评论</div>
    </section>
  </div>
</template>

<script>
import RichText from '@/components/common/RichText'
import LzlItem from '@/components/common/LzlItem'
import {
  postTime
} from '@/utils/filters.js'
export default {
  name: 'PostItem',
  props: {
    postItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    RichText,
    LzlItem
  },
  methods: {
    open (link) {
    }
  },
  computed: {
    author () {
      return this.$props.postItem.author
    },
    formateTime () {
      return postTime(this.$props.postItem.time)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';
.post-item {
    padding: 13px 17px;
    border-bottom: 1px solid $border-color;
    &-author {
      font-size: 0;
      color: $default-font-color;
      overflow: hidden;
      display: block;
      &-avatar {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        float: left;
        vertical-align: top;
      }
      &-detail {
        height: 40px;
        float: left;
        margin-left: 10px;
        vertical-align: top;
        .user-name {
          font-size: 14px;
          height: 25px;
          line-height: 25px;
        }
        .post-time {
          font-size: 12px;
          height: 15px;
          line-height: 15px;
          color: $tips-font-color;
        }
      }
      &-zan {
        font-size: 0;
        float: right;
        height: 30px;

        .icon-atmosphere-up, .num, .icon-atmosphere-down {
          height: 20px;
          width: 20px;
          margin-top: 5px;
          vertical-align: top;
          display: inline-block;
          // background: $placeholder-background;
        }
        .num {
          // background: none;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          margin: 0 8px;
        }
        .icon-atmosphere-down {
          margin-right: 0;
          // background: $placeholder-background;
        }
      }
    }
    &-content {
      margin-left: 50px;
      margin-top: 10px;
      overflow: hidden;
      position: relative;
      font-size: 0;
    }
    &-reply {
      margin-left: 50px;
      margin-top: 10px;
      overflow: hidden;
      position: relative;
      background: $theme-background-hr;
      padding: 5px 8px;
      &-more {
        font-size: 14px;
        line-height: 30px;
        height: 30px;
        color: $tips-font-color;
      }
    }
}
</style>
