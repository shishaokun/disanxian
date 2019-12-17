<template>
  <div id="forum" class="forum-wrapper">
    <ForumHeader 
      :forumInfo="forumInfo"
      :topThreadList="topThreadList"
      :topCount="topCount"
      :bannnerOpacity="bannnerOpacity"
    />
    <section class="thread-list-fliter">
      <span class="name">筛选条件</span>
      <section
        class="fliter-wrapper"
      >
        <span
          v-for="(value, index) in threadFilter"
          :key="index"
          class="fliter-item"
          :v-data-type="value.sort_type"
        >{{value.tab_name}}</span>
      </section>
    </section>
    <section>
      <ThreadCard
        v-for="(item, index) in threadList" 
        :threadInfo="item"
        :key="item.id + '-' + index"
        :fr="'frs'"
      />
    </section>
  </div>
</template>

<script>
// import {
//   postTime
// } from '@/utils/filters'
import {
  mapState
} from 'vuex'
import ForumHeader from '@/components/ForumPage/ForumHeader'
import ThreadCard from '@/components/common/ThreadCard'
export default {
  name: 'ForumPage',
  components: {
    ForumHeader,
    ThreadCard
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapState('Base/forum', {
      forumDetail (state) {
        return state.forumMap[this.forumName]
      },
      'bannnerOpacity': 'bannnerOpacity'
    }),
    forumInfo () {
      return this.forumDetail && this.forumDetail.forumInfo
    },
    page () {
      return this.forumDetail && this.forumDetail.page
    },
    threadList () {
      return this.forumDetail && this.forumDetail.threadList
    },
    topThreadList () {
      return this.forumDetail && this.forumDetail.topThread.topThreadList
    },
    topCount () {
      return this.forumDetail && this.forumDetail.topThread.topCount
    },
    threadFilter () {
      return this.forumDetail && this.forumDetail.threadFilter
    }
  },
  methods: {
    initData () {
      let forumName = this.$route.params.forumName
      // console.log(this.$route.params)
      this.forumName = forumName
      this.$store.dispatch('Base/forum/forumInfo', {
        'kw': forumName,
        'pnum': 1,
        // 回复时间 => 0、发贴时间 => 1
        'sort_type': 0,
        'res_num': 25,
        // 来源
        'obj_source': '',
        // 首次进入参数，用于统计
        'open_source': ''
        // 是否是精华帖
        // 'lm': 4
      }).then((data) => {
        this.setRecentForum()
        // console.log('initData', data)
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    setRecentForum () {
      this.$store.dispatch('Base/forum/setRecentForum', {
        forum: this.forumInfo
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
.forum-wrapper {
  background: $theme-background-hr;
  .thread-list-fliter {
    background: $theme-background;
    font-size: 0;
    padding: 0 17px;
    height: 30px;
    position: relative;
    .name {
      line-height: 30px;
      height: 30px;
      display: block;
      font-size: 12px;
    }
    .fliter-wrapper {
      position: absolute;
      top: 0;
      right: 17px;
      font-size: 12px;
      line-height: 30px;
      height: 30px;
      overflow: hidden;
      .fliter-item {
        display: block;
      }
    }
  }
}
</style>
