<template>
  <div id="enter-forum" class="enter-forum">
    <HeaderNavigator
      :tabList="tabList"
    >
      <span
        class="icon-sign"
        v-on:click="sign"
      ></span>
    </HeaderNavigator>
    <SearchBox
      class="search-box"
    />
    <section
      class="recent-forum"
      v-if="recentForum && recentForum.length"
    >
      <header class="recent-forum-title">最近逛的吧</header>
      <i 
        class="recent-forum-hide icon-hide "
        v-on:click="handdleRecentShow"
      ></i>
      <article
        class="recent-forum-list"
        v-if="recentShow"
      >
        <div
          class="recent-forum-list-wrapper"
          :style="'width:' + getForumWidth + 'px'"
        >
          <ForumCard 
            v-for="(forum, index) in recentForum"
            :key="forum.id + '-' + index"
            :forum="forum"
          />
        </div>
      </article>
    </section>
    <section class="follow-forum">
      <header class="follow-forum-title">关注的吧</header>
      <span class="follow-forum-rank">等级顺序</span>
      <article class="follow-forum-list">
        <div class="follow-forum-list-wrapper">
          <ForumDetailCard 
            v-for="(forum, index) in forumList"
            :key="forum.forum_id + '-' + index"
            :forum="forum"
          />
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import SearchBox from '@/components/common/SearchBox'
import ForumCard from '@/components/common/ForumCard'
import ForumDetailCard from '@/components/common/ForumDetailCard'
import HeaderNavigator from '@/components/common/HeaderNavigator'
import {
  mapState
} from 'vuex'
export default {
  name: 'EnterForumPage',
  components: {
    SearchBox,
    ForumCard,
    ForumDetailCard,
    HeaderNavigator
  },
  computed: {
    ...mapState('Base/likeForum', {
      'forumList': 'forumList',
      'recentForum': 'recentForum',
      'recentShow': 'recentShow'
    }),
    tabList () {
      return [{
        'tabName': '关注',
        'tabInfo': 'follow',
        'isHover': true,
        'hoverClass': 'hover'
      }, {
        'tabName': '推荐',
        'tabInfo': 'recommend',
        'isHover': false,
        'hoverClass': ''
      }]
    },
    getForumWidth () {
      return 118 * this.recentForum.length + 9
    }
  },
  created () {
    this.initData()
  },
  methods: {
    open (link) {
      // this.$electron.shell.openExternal(link)
    },
    sign () {
      console.log('sign')
    },
    initData () {
      // 获取关注的吧
      this.$store.dispatch('Base/likeForum/getLikeForum', {
      }).then((data) => {
        // console.log('initData', data)
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
      // 获取是否显示常逛的吧
      this.$store.dispatch('Base/likeForum/getRecentShow', {
      }).then((data) => {}).catch((error) => {
        console.log('onRejected function called: ', error)
      })
      // 获取常逛的吧
      this.$store.dispatch('Base/likeForum/getRecentForum', {
      }).then((data) => {
        // console.log('initData', data)
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    handdleRecentShow () {
      // 获取常逛的吧
      console.log(this.recentShow)
      this.$store.dispatch('Base/likeForum/setRecentShow', {
        recentShow: !this.recentShow
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
.enter-forum {
  padding-top: 45px;
  .icon-sign {
    position: absolute;
    top: 10px;
    right: 17px;
    height: 30px;
    width: 30px;
  }
  .search-box {
    margin-bottom: 20px;
  }
  .recent-forum {
    margin: 10px auto 0;
    position: relative;

    &-title {
      font-size: 18px;
      font-weight: 600;
      display: block;
      margin: 0 17px;
    }
    &-hide {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 0;
      right: 17px;
    }
    &-list {
      padding: 10px 0;
      font-size: 0;
      width: 100%;
      height: 160px;
      overflow: hidden;
      overflow-x: scroll;

      &-wrapper {
        display: block;
        height: 140px;
        width: 100%;

        &:first-child {
          margin-left: 17px;
        }
      }
    }
  }
  .follow-forum {
    margin: 10px auto 0;
    position: relative;
    &-title {
      font-size: 18px;
      font-weight: 600;
      display: block;
      margin: 0 17px;
    }
    &-rank {
      width: 70px;
      height: 20px;
      position: absolute;
      font-size: 13px;
      text-align: right;
      top: 0;
      right: 17px;
      color: $tips-font-color;
    }
    &-list {
      margin: 0 17px;
      font-size: 0;
      // width: 100%;
      overflow: hidden;
      position: relative;

      &-wrapper {
        display: block;

      }
    }
  }
}
</style>
