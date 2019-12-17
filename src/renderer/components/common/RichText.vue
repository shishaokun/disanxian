<template>
  <section 
    class="thread-info-wrapper"
  >
    <template 
      class="thread-info-content-video"
      v-if="isVideo"
    >
      <video
        class="video-item"
        :src="videoInfo.video_url"
        loop
        autoplay
        :poster="videoInfo.thumbnail_url"
        :preload="videoInfo.video_url"
        style="width: 100%;"
      ></video>
    </template>
    <section 
      v-else
      :class="'rich-text-content ' + (isFirstPost ? '' : 'wrapper-inline')"
    >
      <header 
        class="thread-info-title"
        v-if="isFirstPost && threadInfo.title !== '' && threadInfo.title !== '无标题贴'"
        v-html="threadInfo.title"
      ></header>
      <article 
        :class="'rich-text-content ' + (isFirstPost ? '' : 'wrapper-inline')"
      >
        <section 
          class="thread-info-content-share" 
          v-if="isFirstPost && +threadInfo.is_share_thread !== 0"
        >分享贴</section>
        <template 
          class="thread-info-content-normal"
          v-else
          v-for="(item, key) in threadInfo.content"
        >
          <!-- not br/ -->
          <div 
            v-if="+item.type === 0 && item.text !=='<br/>'"
            class="content-text"
            v-html="item.text"
            :key="key"
          ></div>
          <!-- text -->
          <div 
            v-else-if="+item.type === 1 && !item.link"
            class="content-text" 
            v-html="item.text"
            :key="key"
          ></div>
          <!-- link || 话题-->
          <a 
            v-else-if="(+item.type === 1 || +item.type === 18) && item.link"
            class="content-link" 
            :key="key"
            :href="item.link"
          >{{item.text}}</a>
          <!-- emoji -->
          <img 
            v-else-if="+item.type === 2"
            class="content-emoji" 
            :src="item.src" 
            :key="key"
            lazy-load 
            />
          <!-- img -->
          <div 
            v-else-if="+item.type === 3 || +item.type === 20"
            class="content-img"
            :key="key"
          >
            <img
              class="preview-img" 
              :bind-tid="threadInfo.id"
              :bind-staticImg="item.static_img || ''"
              :src="item.big_pic || item.src"
            />
          </div>
          <div
            v-else-if="+item.type === 4 || +item.type === 5"
            :key="key"
            class="content-text" 
            v-html="item.text"
          ></div>
          <!-- voice -->
          <div 
            v-else-if="+item.type === 10"
            :key="key"
            class="content-voice"
          >
            <span>voice</span>
          </div>
          <!-- smart app -->
          <div
            v-else-if="+item.type === 21"
            :key="key"
            class="content-smartapp"
          ></div>
          <div 
            v-else
            :key="key"
            class="content-text" 
            v-html="item.text"
          ></div>
        </template>
      </article>
    </section>
  </section>
</template>

<script>
export default {
  props: {
    threadInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    isFirstPost: {
      type: Number,
      default () {
        return 0
      }
    }
  },
  name: 'RichText',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  },
  computed: {
    isVideo () {
      let threadInfo = this.$props.threadInfo
      return threadInfo.is_flash && threadInfo.video_info
    },
    videoInfo () {
      let threadInfo = this.$props.threadInfo
      return threadInfo.is_flash && threadInfo.video_info
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss'; 
.thread-info-wrapper { 
  a {
    color: $link-default-color;
  }
  .wrapper-inline {
    display: inline;
  }
  .thread-info-title {
    font-size: 17px;
    font-weight: bolder;
    line-height: 25px;
    margin: 10px 0;
  }
  .rich-text {
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

    &-video {
      font-size: 0;
      .video-item {

      }
    }
  }
}
</style>
