<template>
  <section id="pb" class="thread-wrapper">
    <NavigationBar 
      fr="pb"
    />
    <section 
      class="thread-info" 
      v-if="threadDetail && threadDetail.thread"
    >
      <section class="thread-info-author">
        <img 
          :src="'https://gss0.bdstatic.com/6LZ1dD3d1sgCo2Kml5_Y_D3/sys/portrait/item/' + author.portrait"
          class="thread-info-author-avatar"
        />
        <section class="thread-info-author-right">
          <p class="thread-info-author-name">{{author.name_show}}</p>
          <p class="thread-info-author-time">{{threadInfo.formateTime}}</p>
        </section>
        <span class="thread-info-author-follow">关注</span>
      </section>
      <RichText
        :threadInfo="threadInfo"
        :isFirstPost="1"
      />
      <ToolBar 
        :threadInfo="threadDetail.thread"
      />
    </section>
    <section
      v-else-if="threadDetail && threadDetail.error"
      class="thread-info-error"
    >
      <div class="error-img"></div>
      <p class="error-tips">{{threadDetail.error}}</p>
    </section>
    <section 
      class="thread-post" 
      id="thread-post"
      v-if="threadDetail && threadDetail.thread"
    >
      <section class="thread-post-tab">
        <span class="tab-all">全部回复</span>
        <span class="tab-lz">只看楼主</span>
        <span class="tab-sort">正序></span>
      </section>
      <section class="thread-post-list">
        <PostItem
          v-for="(item, index) in post" 
          v-bind:postItem="item"
          v-bind:key="item.id + '-' + index"
        />
      </section>
    </section>
  </section>
</template>

<script>
import NavigationBar from '@/components/common/NavigationBar'
import ToolBar from '@/components/common/ToolBar'
import RichText from '@/components/common/RichText'
import PostItem from '@/components/common/PostItem'
import {
  postTime
} from '@/utils/filters'
import {
  mapState
} from 'vuex'
export default {
  name: 'ThreadPage',
  components: {
    NavigationBar,
    ToolBar,
    PostItem,
    RichText
  },
  beforeCreate () {
    // thismapState.initData()
  },
  created () {
    this.initData()
    // console.log('thread-router', this.$router)
  },
  computed: {
    ...mapState('Base/thread', {
      threadDetail (state) {
        // console.log(state.threadMap[this.tid])
        return state.threadMap[this.tid]
      }
    }),
    postList () {
      return this.threadDetail && this.threadDetail.postList
    },
    post () {
      return this.threadDetail && this.threadDetail.postList.slice(1)
    },
    threadInfo () {
      let thread = this.postList && this.postList[0]
      thread.formateTime = postTime(thread.time)
      thread.video_info = this.threadDetail.thread.video_info
      // console.log(thread)
      return thread
    },
    author () {
      // console.log(this.threadInfo.author)
      return this.threadInfo && this.threadInfo.author
    },
    forum () {
      return this.threadDetail && this.threadDetail.forum
    }
  },
  methods: {
    initData () {
      let tid = this.$route.params.tid
      // tid = 6098672983
      this.tid = tid
      this.$store.dispatch('Base/thread/threadInfo', {
        tid: tid
      }).then((data) => {
        // console.log('initData', data)
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.thread-wrapper {
  background: $theme-background-hr;
  .thread-info {
    margin-top: 42px;
    overflow: hidden;
    padding: 17px 17px 0;
    background: $theme-background;
    &-author {
      font-size: 0;
      position: relative;
      overflow: hidden;

      &-avatar {
        height: 30px;
        width: 30px;
        border-radius: 15px;
        vertical-align: top;
        float: left;
      }
      &-right {
        float: left;
        display: block;
        margin-left: 10px;
      }
      &-name {
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        font-weight: bolder;
      }
      &-time {
        height: 10px;
        line-height: 10px;
        font-size: 10px;
        color: $default-font-color;
      }
      &-follow {
        position: absolute;
        top: 2px;
        right: 0;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border-radius: 4px;
        width: 50px;
        font-size: 12px;
        color: $font-light-color;
        background: $button-blue-color;
      }
    }
    &-title {
      font-size: 17px;
      font-weight: bolder;
      line-height: 25px;
      margin: 10px 0;
    }
    &-content {
      font-size: 0;
      &-share {}
      // &-normal {
      .content-text, .content-link {
        line-height: 28px;
        display: inline;
        vertical-align: top;
        font-size: 17px;
      }
      .content-link {
        color: $link-default-color;
      }
      .content-img {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        .preview-img {
          width: 100%;
          display: block;
          overflow: hidden;
        }
      }
      .content-emoji {
        display: inline-block;
        vertical-align: top;
        height: 20px;
        width: 20px;
        margin-top: 4px;
      }
      .content-voice {}
      .content-smartapp {}
    }
    // }
    &-toolbar {
      padding: 17px;
      .toolbar-item {
        &.share {}
        &.reply {}
        &.zan {}
      }
    }
  }
  .thread-info-error {
    margin-top: 42px;
    overflow: hidden;
    padding: 17px 17px 0;
    background: $theme-background;
    .error-img {
      background: url('/static/images/pic_emotion_pb_none@3x.png') no-repeat center;
      background-size: contain;
      display: block;
      height: 200px;
      width: 100%;
      margin-top: 50px;
    }
    .error-tips {
      font-size: 18px;
      text-align: center;
      margin-top: 20px;
    }
  }
  .thread-post {
    margin-top: 5px;
    background: $theme-background;
    .thread-post-tab {
      font-size: 14px;
      padding: 0 17px;
      box-shadow: 1px 0 10px 1px $shadow-color;
      .tab-all, .tab-lz, .tab-sort {
        display: inline-block;
        line-height: 40px;
        height: 40px;
        padding: 0 10px;
      }
      .tab-lz {
      }
      .tab-sort {
        float: right;
        padding-right: 0;
      }
    }
    .thread-post-list {
      margin-bottom: 20px;
    }
  }
}
</style>
