<template>
  <section
    :class="'forum-header ' + headerHeight"
  >
    <div 
      id="forum-header-wrapper"
      class="forum-header-wrapper"
      :style="backgroudTheme"
    >
      <section
        class="forum-header-wrapper-navigator"
        :style="originOpacity"
      >
        <span 
          class="icon-back icon-back-light"
          v-on:click="back"
        ></span>
        <!-- <span class="icon-notice"></span> -->
        <router-link
          to="/search"
          class="icon-search"
        ></router-link>
      </section>

      <section class="forum-header-wrapper-info">
        <img
          :src="forumInfo.portrait_url"
          class="forum-header-wrapper-info-avatar"
        />
        <section
          class="forum-header-wrapper-info-detail"
        >
          <p class="forum-name">{{forumInfo.name}}</p>
          <section class="forum-detail">
            <span class="forum-detail-follow">关注 {{memberNum}}</span>
            <span class="forum-detail-thread">贴子 {{postNum}}</span>
          </section>
        </section>
        <span
          class="forum-header-info-follow"
          v-on:click="follow"
        >关注</span>
      </section>
      <section class="forum-header-wrapper-top">
        <section
          class="top-thread-wrapper"
          :v-on:mousedown="hotThreadTouchStart"
          :v-on:mouseup="hotThreadTouchEnd"
          :v-on:mousemove="hotThreadTouchMove"
          :v-on:touchstart="hotThreadTouchStart"
          :v-on:touchend="hotThreadTouchEnd"
          :v-on:touchmove="hotThreadTouchMove"
        >
          <section
            tag="section"
            class="top-thread-wrapper-scroll"
            :style="'width:' + 100 * topCount + '%'"
            
          >
            <template
              v-for="(threadList, index) in topThreadList"
            >
              <section
                class="top-thread-list"
                :key="index"
                :style="'width:' + 100 / topCount + '%'"
              >
                <template
                  v-for="(thread) in threadList"
                >
                  <HotThreadItem
                    :threadInfo="thread"
                    :key="thread.id"
                    :isSingle="threadList.length === 1"
                  />
                
                </template>
              </section>
            </template>
          </section>
        </section>
        <div class="forum-header-wrapper-top-control">
          <span 
            class="control-bar"
            :style="'width:' + 15 * topCount + 'px'"
          >
            <i 
              class="control-bar-item"
            ></i>
          </span>
        </div>
      </section>
    </div>
    <section
      class="forum-header-wrapper-navigator fixed"
      :style="fixedOpacity"
    >
      <p class="forum-name">{{forumInfo.name}}</p>
      <span 
        class="icon-back icon-back-normal"
        v-on:click="back"
      ></span>
      <router-link
        to="/search"
        class="icon-search"
      ></router-link>
      <!-- <span class="icon-notice"></span> -->
    </section>
    <section 
      :class="'forum-header-thread-tab ' + tabStyle"
    >
      <section class="tab-wrapper">
        <span class="tab-item hover">全部</span>
        <span class="tab-item">精华</span>
      </section>
    </section>
  </section>
</template>

<script>
import HotThreadItem from '@/components/ForumPage/HotThreadItem'
import {
  numFormat
} from '@/utils/filters'
export default {
  name: 'ForumHeader',
  components: {
    HotThreadItem
  },
  data () {
    return {
      opacity: 1,
      istabFixed: 0
    }
  },
  props: {
    forumInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    topThreadList: {
      type: Array,
      default () {
        return []
      }
    },
    topCount: {
      type: Number,
      default () {
        return 0
      }
    },
    bannnerOpacity: {
      type: Number,
      default () {
        return 1
      }
    }
  },
  mounted () {
    window.document.addEventListener('scroll', this.handleScroll, true)
  },
  computed: {
    backgroudTheme () {
      if (!this.$props.forumInfo.theme_color) {
        return 'background: #2B80FF'
      }
      let themes = this.$props.forumInfo.theme_color
      let theme = themes.day
      let background = 'background:' + (theme.common_color || '2B80FF') + '; background-color:#' + theme.common_color +
      ';background: linear-gradient(to right,#' + theme.light_color + ',#' + theme.dark_color + ')'
      return background
    },
    memberNum () {
      // console.log(this.$props.forumInfo)
      return this.$props.forumInfo && numFormat(this.$props.forumInfo.member_num)
    },
    postNum () {
      return this.$props.forumInfo && numFormat(this.$props.forumInfo.post_num)
    },
    originOpacity () {
      let opacity = this.$data.opacity
      return 'opacity:' + (opacity < 1 ? '0' : '1') + (opacity <= 0 ? ';display: none;' : '')
    },
    fixedOpacity () {
      let opacity = this.$data.opacity
      return 'opacity:' + (1 - opacity) + (opacity <= 0 ? ';position:relative' : '')
    },
    tabStyle () {
      let istabFixed = this.$data.istabFixed
      let opacity = this.$data.opacity
      return opacity === 0 ? istabFixed === 0 ? 'tab-change' : 'tab-change tab-fixed' : ''
    },
    headerHeight () {
      let istabFixed = this.$data.istabFixed
      return istabFixed === 0 ? '' : 'fixed-header'
    }
  },
  methods: {
    scrollHeight () {
      return 195
    },
    back () {
      // console.log(this.$route.matched)
      // console.log(this.$router.history)
      // if (this.$route.matched.length === 1) {
      //   this.$router.replace('/home')
      // } else {
      this.$router.back()
      // }
    },
    follow () {},
    hotThreadTouchMove (e) {
      console.log('move')
    },
    hotThreadTouchStart () {
      console.log('start')
    },
    hotThreadTouchEnd () {
      console.log('end')
    },
    handleScroll (e) {
      let scrollHeight = this.scrollHeight()
      let scrollTop = e.target.scrollTop
      let present = 1 - (scrollTop / scrollHeight)
      this.$data.opacity = present > 0 ? present : 0
      this.$data.istabFixed = scrollTop > 245 ? 1 : 0
      // this.$store.commit('Base/likeForum/BANNER_OPACITY', {
      //   bannnerOpacity: present
      // })
      // this.$store.dispatch('Base/likeForum/setBannerOpacity', {
      //   bannnerOpacity: present
      // }).then((data) => {
      //   // console.log('initData', data)
      // }).catch((error) => {
      //   console.log('onRejected function called: ', error)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';
.forum-header {
  width: 100%;
  position: relative;
  z-index: 1;

  &.fixed-header {
    padding-bottom: 40px;
  }
  &-wrapper-navigator {
    padding: 10px 17px;
    font-size: 0;
    overflow: hidden;
    opacity: 1;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: $theme-background;
      z-index: 1;
      opacity: 0;

      .forum-name {
        // position: absolute;
        // left: 0;
        // top: 0;
        width: 100%;
        height: 30px;
        text-align: center;
        color: $title-font-color;
        font-size: 17px;
        line-height: 30px;
      }
       .icon-back, .icon-search, .icon-notice {
        display: inline-block;
        height: 25px;
        width: 25px;
        // background-color: $placeholder-background;
        vertical-align: top;
        margin-top: -30px;
        background-size: contain;
      }
    }
   
    .icon-search {
      float: right;
    }
    .icon-notice {
      float: right;
      margin-right: 10px;
    }
  }
  &-wrapper {
    padding: 0 0 40px;
    margin-bottom: 55px;
    position: relative;
    
    &-navigator {
      padding: 10px 17px;
      font-size: 0;
      overflow: hidden;
      opacity: 1;

      .icon-back, .icon-search, .icon-notice {
        display: inline-block;
        height: 25px;
        width: 25px;
        // background-color: $placeholder-background;
        vertical-align: top;
        background-size: contain;
      }
      .icon-search {
        float: right;
      }
      .icon-notice {
        float: right;
        margin-right: 10px;
      }
    }
    &-info {
      font-size: 0;
      position: relative;
      padding: 0 17px;
      color: $title-font-color-light;
      margin-top: 50px;
      overflow: hidden;

      &-avatar {
        height: 50px;
        width: 50px;
        border: 2px solid $img-border-color;
        border-radius: 40%;
        display: inline-block;
        vertical-align: top;
      }
      &-detail {
        display: inline-block;
        vertical-align: top;
        margin-left: 10px;
        .forum-name {
          font-size: 17px;
          font-weight: bolder;
          line-height: 30px;
        }
        .forum-detail {
          font-size: 0;
          line-height: 20px;
          &-follow, &-thread {
            font-size: 12px;
            display: inline-block;
            vertical-align: middle;
          }
          &-thread {
            margin-left: 20px;
          }
        }
      }
      &-follow {
        font-size: 12px;
        background: $button-white-color;
        color: $default-font-color;
        line-height: 20px;
        border-radius: 3px;
        width: 50px;
        text-align: center;
        position: absolute;
        top: 15px;
        right: 17px;
      }
    }
    &-top {
      position: absolute;
      bottom: -45px;
      left: 17px;
      right: 17px;
      height: 75px;

      .top-thread-wrapper {
        box-shadow: 0px 0px 10px 0px $theme-background-boxshaw;
        border-radius: 5px;
        height: 60px;
        width: 100%;
        overflow: hidden;

        &-scroll {
          height: 60px;
          overflow-y: hidden;

          .top-thread-list {
            border-radius: 5px;
            background: $theme-background;
            height: 59px;
            overflow: hidden;
            width: 50%;
            display: inline-block;
          }
        }
      }
      &-control {
        height: 15px;
        text-align: center;
        overflow: hidden;

        .control-bar {
          height: 2px;
          width: 15px;
          margin: 8px auto;
          background: $swipper-background;
          display: block;
          position: relative;
          border-radius: 1px;
          overflow: hidden;

          &-item {
            display: block;
            width: 15px;
            height: 2px;
            border-radius: 1px;
            background: $swipper-item;
          }
        }
        // background: $placeholder-background;
      }
    }
  }
  &-thread-tab {
    font-size: 0;
    background: $theme-background;
    z-index: 1;
    // border-radius: 8px;
    border-radius: 8px 8px 0 0 / 8px 8px 0 0;
    &.tab-fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
    }
    &.tab-change {
      border-radius: 0;
      box-shadow: 0 0 10px -3px $theme-background-boxshaw;
    }

    .tab-wrapper {
      height: 40px;
      line-height: 40px;
      padding: 0 17px;
      border-bottom: 1px solid $border-color;
      
      .tab-item {
        font-size: 13px;
        height: 40px;
        line-height: 40px;
        display: inline-block;
        vertical-align: top;
        width: 60px;
        text-align: left;

        &.hover {
          font-size: 16px;
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
