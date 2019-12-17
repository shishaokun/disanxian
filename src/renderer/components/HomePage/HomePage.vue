<template>
  <div id="recommend" class="recommend">
    <HeaderNavigator
      :tabList="tabList"
    />
    <SearchBox
      class="search-box"
    />
    <section 
      class="recommend-content"
      id="recommend-content"
    >
      <ThreadCard 
        v-for="(item, index) in tagThreadMap[currentTag]" 
        :threadInfo="item"
        :key="item.tid + '-' + index"
        :fr="'home'"
      />
      <ThreadCard />
    </section>
  </div>
</template>

<script>
import HeaderNavigator from '@/components/common/HeaderNavigator'
import ThreadCard from '@/components/common/ThreadCard'
import SearchBox from '@/components/common/SearchBox'
import {
  mapState
} from 'vuex'
export default {
  name: 'HomePage',
  components: {
    ThreadCard,
    HeaderNavigator,
    SearchBox
  },
  beforeCreate () {
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapState('Home/recommend', [
      'tagList',
      'tagThreadMap',
      'hasMore',
      'currentTag'
    ]),
    showLoading () {
      return 1
    },
    tabList () {
      let tabList = []
      this.tagList.forEach(tab => {
        let tabName = Object.keys(tab)[0]
        let tabItem = {
          'tabName': tab[tabName],
          'tabInfo': tabName,
          'isHover': tabName === 'recom',
          'hoverClass': tabName === 'recom' ? 'hover' : ''
        }
        tabList.push(tabItem)
      })
      return tabList
    }
  },
  methods: {
    initData () {
      this.$store.dispatch('Home/recommend/getRecommend', {
        tag: 'recom'
      }).then((data) => {
        // console.log('initData', data)
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
      // console.log(this.$data)
      // this.state = this.$data.count;
      // console.log(this.state)
    },
    open (link) {
      // this.$electron.shell.openExternal(link)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.recommend {
  .search-box {
    margin: 60px 17px 20px;
    background: $theme-background;
  }
  &-header {
    color: $title-font-color;
    font-weight: 600;
    padding: 5px 17px 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 45px;
    width: 100%;
    line-height: 45px;
    border-bottom: 1px solid $border-color;
    z-index: 1;
    background: $theme-background;

    span {
      position: absolute;
      top: 0;
      left: 22px;
      display: block;
      font-size: 25px;
      z-index: 1;
    }
    .hover {
      position: absolute;
      top: 27px;
      left: 17px;
      height: 10px;
      background: $title-hover;
      width: 60px;
      border-radius: 5px;
    }
    .icon-search {
      background: $placeholder-background;
      width: 30px;
      height: 30px;
      float: right;
    }
  }
  &-content {
    background: $theme-background-hr;
    margin: 0 0 55px;
  }
}
</style>
