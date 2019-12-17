<template>
    <router-link
      class="thread-card" 
      v-if="threadInfo && author"
      :to="'/thread/' + threadInfo.tid"
    >
      <router-link
        class="thread-card-author"
        :to="'/userProfile/' + userPortrait"
      >
        <img 
          class="thread-card-author-avatar"
          :src="userPortraitUrl"
        />
        <section 
          class="thread-card-author-frs-wrapper"
          v-if="!isFrs"
        >
          <span
            class="thread-card-author-name"
          >{{userName}}</span>
         <i class="thread-card-author-feedback icon-feedback-close"></i>
        </section>
        <section 
          class="thread-card-author-home-wrapper"
          v-if="isFrs"
        >
          <span
            class="thread-card-author-name"
          >{{userName}}</span>
         <span class="thread-card-post-time">{{postTime}}</span>
        </section>
      </router-link >
      <section class="thread-card-content">
        <header 
          :class="'thread-card-content-title' + (noTitle ? 'no-title' : '')"
        >{{threadInfo.title}}</header>
        <article class="thread-card-content-wrapper">
          <section 
            :class="'thread-card-content-abstract ' + (noTitle ? 'no-title' : '') + (noAbstract ? 'no-abstract' : '')">{{threadInfo.abstract}}</section>
          <section class="thread-card-content-media">
            <!-- 视频 -->
            <article
              class="media-video"
              v-if="videoInfo">
              <div 
                class="media-video-preview" 
                :style="'background-image:url(' + videoInfo.cover + ')'"
              >
                <i class="icon-video"></i>
                <span class="media-video-detail">{{videoInfo.duration}} | 播放 {{videoInfo.playCount}}</span>
              </div>
            </article>
            <!-- 单图 -->
            <article
              class="media-single-image"
              v-else-if="isSingleImage">
              <div 
                class="media-single-image-item"
                :style="'background-image:url(' + singleImg + ')'"
              ></div>
            </article>
            <!-- 多图 -->
            <article
              class="media-more-image"
              v-else-if="isMoreImage">
              <span 
                v-for="(pic, index) in pics" 
                :key = "threadInfo.tid + '-' + index"
                :style="'background-image:url(' + (pic.url || pic.big_pic) + ')'"
                class="media-more-image-item"
              >
                <span
                  v-if="index === 2 && pics_num > 3"
                  class="media-more-image-item-last-num"
                >
                <i class="icon-card-image"></i>{{pics_num - 3}}图
                </span>
              </span>
            </article>
            <!-- 直播 -->
            <article
              class="media-live"
              v-else-if="isLive">
              live
            </article>
          </section>
        </article>
      </section>
      <ToolBar 
        :threadInfo="threadInfo"
      />
    </router-link>
</template>

<script>
import ToolBar from '@/components/common/ToolBar'
import {
  playDuration,
  numFormat,
  postTime
} from '@/utils/filters.js'
import {
  getUserPortraitUrl,
  getUserPortrait,
  getUserName
} from '@/utils/tools.js'
export default {
  name: 'ThreadCard',
  components: {
    ToolBar
  },
  props: {
    threadInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    fr: {
      type: String,
      default () {
        return ''
      }
    }
  },
  computed: {
    author () {
      // console.log(this.$props.threadInfo)
      return this.$props.threadInfo.author || this.$props.threadInfo.user
    },
    noTitle () {
      return !this.$props.threadInfo.title
    },
    noAbstract () {
      return !this.$props.threadInfo.abstract
    },
    isSingleImage () {
      if (this.isFrs) {
        return this.$props.threadInfo.media.length === 1
      } else if (this.isHome) {
        return this.$props.threadInfo.new_cover_img && this.$props.threadInfo.new_cover_img.length === 1
      }
    },
    isMoreImage () {
      return this.$props.threadInfo.new_cover_img && this.$props.threadInfo.new_cover_img.length > 1
    },
    isLive () {
      return this.$props.threadInfo.isLive
    },
    videoInfo () {
      let threadInfo = this.$props.threadInfo
      let videoInfo
      if (this.isFrs) {
        videoInfo = threadInfo.video && threadInfo.video.length && threadInfo.video[0].videoInfo
        return !videoInfo ? null : {
          duration: playDuration(videoInfo.video_duration || 0),
          playCount: numFormat(+videoInfo.play_num || 0),
          cover: videoInfo.thumbnail_url
        }
      } else {
        videoInfo = threadInfo.media && threadInfo.media.video
        return !videoInfo ? null : {
          duration: playDuration(videoInfo.video_duration),
          playCount: numFormat(+videoInfo.play_num || 0),
          cover: threadInfo.new_cover_img && threadInfo.new_cover_img[0].url
        }
      }
    },
    pics () {
      return this.$props.threadInfo.new_cover_img.slice(0, 3)
    },
    pics_num () {
      return this.$props.threadInfo.new_cover_img.length
    },
    userPortraitUrl () {
      return getUserPortraitUrl(this.author.portrait_url || this.author.portrait)
    },
    userPortrait () {
      return getUserPortrait(this.author.portrait || this.author.portrait_url)
    },
    userName () {
      return getUserName(this.author)
    },
    isFrs () {
      return this.$props.fr === 'frs'
    },
    isHome () {
      return this.$props.fr === 'home'
    },
    postTime () {
      return postTime(this.$props.threadInfo.last_time_int)
    },
    singleImg () {
      if (this.isFrs) {
        return this.$props.threadInfo.media[0].big_pic
      } else {
        return this.$props.threadInfo.new_cover_img[0].url
      }
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
.thread-card {
  margin-bottom: 5px;
  padding: 10px 17px 0;
  background: $theme-background;
  display: block;

  &-author {
    font-size: 0;
    position: relative;
    display: block;

    &-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: inline-block;
      vertical-align: top;
    }
    &-frs-wrapper {
      height: 35px;
      line-height: 35px;
      display: inline-block;
    }
    &-name {
      height: 35px;
      line-height: 35px;
      font-size: 15px;
      font-weight: 700;
      border-radius: 50%;
      display: inline-block;
      vertical-align: top;
      margin-left: 10px;
      color: $default-font-color;
    }
    &-feedback {
      position: absolute;
      top: 7px;
      right: 0;
      width: 20px;
      height: 20px;
      // background: $placeholder-background;
    }
    &-home-wrapper {
      height: 35px;
      line-height: 35px;
      display: inline-block;
      margin-left: 10px;
      .thread-card-author-name {
        display: block;
        height: 20px;
        line-height: 20px;
        margin-left: 0;
      }
      .thread-card-post-time {
        display: block;
        height: 15px;
        line-height: 15px;
        font-size: 11px;
        color: $tips-font-color;
      }
    }
  }

  &-content {
    margin: 10px 0 0;
    color: $default-font-color;

    &-title {
      line-height: 25px;
      font-size: 14px;
      width: 100%;
      @include word-ellipsis(2);
      overflow: hidden;
      
      &.no-title {
        display: none;
      }
    }
    &-wrapper {
      width: 100%;
    }
    &-abstract {
      width: 100%;
      line-height: 25px;
      overflow: hidden;
      font-size: 14px;
      @include word-ellipsis(3);
      
      &.no-title {
      }
      &.no-abstract {
        display: none;
      }
    }
    &-media {
      .media-single-image {
        padding: 5px 0;
        &-item {
          width: 100%;
          height: 200px;
          background-repeat: no-repeat;
          background-color: $placeholder-background-light;
          background-size: cover;
        }
      }
      .media-more-image {
        width: 100%;
        display: flex;

        &-item {
          width: 33.3%;
          height: 100px;
          margin-right: 5px;
          display: inline-flex;
          background-repeat: no-repeat;
          background-color: $placeholder-background-light;
          background-size: cover;
          position: relative;

          &:nth-child(3) {
            margin-right: 0;
          }

          &-last-num {
            font-size: 10px;
            display: inline-block;
            border-radius: 10px;
            padding: 0 10px;
            position: absolute;
            bottom: 5px;
            right: 5px;
            color: $title-font-color-light;
            background-color: $theme-background-boxshaw;
            line-height: 20px;

            .icon-card-image {
              // background: $placeholder-background-light;
              height: 10px;
              width: 10px;
              display: inline-block;
              vertical-align: top;
              margin: 5px 5px 0 0;
            }
          }
          
        }
        
      }
      .media-video {
        background: #000;
        position: relative;
        .icon-video {
          position: absolute;
          height: 40px;
          width: 40px;
          top: 50%;
          left: 50%;
          margin-left: -20px;
          margin-top: -20px;
          // background: $placeholder-background;
        }
        &-preview {
          width: 100%;
          height: 200px;
          background-repeat: no-repeat;
          background-color: $placeholder-background-light;
          background-size: cover;
        }
        &-detail {
          line-height: 25px;
          display: inline-block;
          font-size: 12px;
          border-radius: 12px;
          padding: 0 10px;
          position: absolute;
          bottom: 5px;
          right: 5px;
          color: $title-font-color-light;
          background-color: $theme-background-boxshaw;
        }
      }
      .media-live {}
    }
  }
}
</style>
