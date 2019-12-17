<template>
  <div id="search" class="search-wrapper">
    <section class="search-input">
      <input 
        class="input-wrapper"
        type="text"
        v-model="query"
        placeholder=""
        @input="handleInput"
      />
      <i class="icon-search"></i>
      <span
        class="cancle-search"
        v-on:click="back"
      >取消</span>
    </section>
    <section
      class="search-history"
      v-if="!searchSuggest.length && !searchInfoMap"
    >
      <section
        v-if="searchHistory.length > 0"
        class="history-wrapper"
      >
        <p
          v-for="(history, index) in formateSearchHistory"
          :key="index"
          class="history-item"
        >
          <i class="icon-history"></i>
          <span class="history-text">{{history}}</span>
          <i 
            class="icon-delete delete-history"
            v-on:click="deleteHistory"
          ></i>
        </p>
        <p
          class="all-history"
          v-if="showAllButton"
          v-on:click="showAll"
        >全部搜索记录</p>
        <p 
          class="delete-all-history"
          v-if="showDeleteButton"
        >清空搜索记录</p>
      </section>
      <section 
        s-if="hotSearch"
        class="hot-search-wrapper"
      >
        <p class="hot-search-title">贴吧热搜<span class="tips">（搜索热点，小时更新）</span></p>
        <section 
          v-for="(hot, index) in hotSearch"
          :key="index"
          class="hot-search-item"
        >
          <header class="hot-search-item-title">
            <i 
              class="icon-hot"
              :style="'background-image:url(' + hot.title.icon + ')'"
            ></i>
            <span class="hot-title">{{hot.title.name}}</span>
            <span class="tips">{{hot.title.num}}</span>
          </header>
          <section class="hot-search-item-list">
            <span 
              v-for="(item, index) in hot.list"
              :key="index"
              class="hot-word"
              :style="'color:#' + item.color"
            >{{item.display_query}}</span>
          </section>
        </section>
      </section>
    </section>
    <section
      class="search-suggest"
      v-if="searchSuggest && searchSuggest.length"
    >
      <p
        class="suggest-item"
        v-for="(suggest ,index) in searchSuggest"
        :key="index"
        v-html="getSuggestItem(suggest, query)"
        v-on:click="goSearchInfo(suggest)"
      ></p>
    </section>
    <section
      class="search-info "
      v-if="searchInfoMap"
    >
      <template
        v-for="(cardInfo, index) in searchInfo.all"
      >
        <section 
          :key="index"
          class="search-info-card card-forum"
          v-if="cardInfo.cardStyle === 'forum'"
        >
          <SearchMainForumCard 
            :forum="cardInfo.data.exactMatch | getForumInfo"
          />
          <section 
            class="search-info-card-wrapper"
          >
            <section 
              class="search-info-card-fuzzyMatch"
              :style="'width:' + (150 * cardInfo.data.fuzzyMatch.length) + 'px'"
              s-if="cardInfo.data.fuzzyMatch"
            >
              <SearchForumCard 
                v-for="(forum, index) in cardInfo.data.fuzzyMatch"
                :key="index"
                :forum="forum"
              />
            </section>
          </section>
        </section>
        <section 
          :key="index"
          class="search-info-card card-thread"
          v-if="cardInfo.cardStyle === 'thread'"
        >
          <ThreadCard
            :threadInfo="cardInfo.data|formateThread"
            :fr="'search'"
          />
        </section>
      </template>
    </section>
  </div>
</template>

<script>
import ThreadCard from '@/components/common/ThreadCard'
import SearchMainForumCard from '@/components/SearchPage/SearchMainForumCard'
import SearchForumCard from '@/components/SearchPage/SearchForumCard'
import {
  formateMidea
} from '@/utils/tools'
import {
  mapState
} from 'vuex'
// const _ = require('lodash')
export default {
  name: 'SearchPage',
  created () {
    this.initData()
  },
  components: {
    ThreadCard,
    SearchMainForumCard,
    SearchForumCard
  },
  data () {
    return {
      triggerAll: false,
      query: ''
    }
  },
  computed: {
    ...mapState('Search/searchInfo', [
      'searchHistory',
      'hotSearch',
      'searchInfo',
      'searchSuggest'
    ]),
    formateSearchHistory () {
      return this.showAllButton ? this.searchHistory.slice(0, 3) : this.searchHistory
    },
    showAllButton () {
      return this.searchHistory.length > 3 && !this.$data.triggerAll
    },
    showDeleteButton () {
      return this.searchHistory.length <= 3 || (this.searchHistory.length > 3 && this.$data.triggerAll)
    },
    searchInfoMap () {
      return Object.keys(this.searchInfo).length && Object.keys(this.searchInfo.all).length ? this.searchInfo.all : null
    }
  },
  filters: {
    getForumInfo: (forum) => {
      return {
        ...forum,
        forum_avatar: forum.avatar
      }
      // console.log(forum)
      // return {
      //   forum_name: ,
      //   forum_avatar: ,
      //   forum_detail:
      // }
    },
    formateThread (data) {
      return formateMidea(data)
    }
  },
  methods: {
    initData () {
      this.getHotSearch()
      this.getSearchHistory()
      // this.setSearchHistory('33')
    },
    back () {
      this.$router.back()
    },
    deleteHistory (e) {
    },
    showAll () {
      this.$data.triggerAll = true
    },
    handleInput (event) {
      const value = event.target.value.trim()
      this.$data.query = value
      if (value) {
        this.setSuggest()
        this.clearSearchInfo()
      } else {
        this.clearSuggest()
        this.clearSearchInfo()
      }
    },
    goSearchInfo (query) {
      this.$store.dispatch('Search/searchInfo/getSearchInfo', {
        word: query
      }).then((data) => {
        this.$data.query = query
        this.clearSuggest()
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    getSuggestItem: (suggest, query) => {
      // console.log(query, suggest)
      return suggest.replace(query, '<span style="display:inline-block;color:rgb(220, 70, 70)">' + query + '</span>')
    },
    setSuggest () {
      this.$store.dispatch('Search/searchInfo/getSearchSuggest', {
        query: this.$data.query
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    clearSuggest () {
      this.$store.dispatch('Search/searchInfo/clearSearchSuggest', {
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    clearSearchInfo () {
      this.$store.dispatch('Search/searchInfo/clearSearchInfo', {
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    getHotSearch () {
      this.$store.dispatch('Search/searchInfo/getHotSearch', {
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    getSearchHistory () {
      this.$store.dispatch('Search/searchInfo/getSearchHistory', {
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    },
    setSearchHistory (query) {
      this.$store.dispatch('Search/searchInfo/setSearchHistory', {
        query: query
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.search-wrapper {
  padding-top: 40px;
  background: $theme-background-hr;

  .search-input {
    font-size: 0;
    padding: 5px 17px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom: 1px solid $shadow-color;
    background: $theme-background;
    z-index: 1;

    .input-wrapper {
      line-height: 30px;
      height: 30px;
      width: 100%;
      font-size: 15px;
      display: block;
      padding: 0 50px 0 30px;
      border: none;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0); 
      -webkit-user-select: none;
      -moz-user-focus: none;
      -moz-user-select: none;
      -webkit-appearance:none;
      outline: none;

    }
    .icon-search {
      position: absolute;
      width: 20px;
      height: 20px;
      left: 20px;
      top: 10px;
    }
    .cancle-search {
      position: absolute;
      right: 17px;
      top: 5px;
      color: $link-default-color;
      font-size: 16px;
      line-height: 30px;
      height: 30px;
      width: 40px;
      text-align: right;
    }
  }
  .search-history {
    position: relative;
    overflow: hidden;
    .history-wrapper {
      background: $theme-background;
      .history-item {
        height: 50px;
        line-height: 50px;
        padding: 10px 17px;
        font-size: 0;
        position: relative;
        .history-text {
          display: block;
          font-size: 14px;
          line-height: 30px;
          height: 30px;
          padding: 0 40px 0 35px;
          width: 100%;
          overflow: hidden;
          @include word-ellipsis(1);
        }
        .icon-history {
          height: 30px;
          width: 30px;
          display: block;
          position: absolute;
          top: 10px;
          left: 17px;
        }
        .delete-history {
          height: 20px;
          width: 20px;
          display: block;
          position: absolute;
          top: 15px;
          right: 17px;
        }
      }
      .all-history, .delete-all-history {
        text-align: center;
        color: $tips-font-color;
        font-size: 13px;
        line-height: 50px;
        height: 50px;
      }
    }
    .hot-search-wrapper {
      margin-top: 5px;
      background: $theme-background;
      padding: 0 17px;

      .hot-search-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        font-size: 15px;
        .tips {
          color: $tips-font-color;
          font-size: 13px;
        }
      }
      .hot-search-item {
        padding-bottom: 20px;
        &-title {
          font-size: 0;
          .icon-hot {
            display: inline-block;
            height: 20px;
            width: 20px;
            vertical-align: top;
            background-size: contain;
            margin-top: 5px;
          }
          .hot-title {
            display: inline-block;
            font-size: 15px;
            height: 30px;
            line-height: 30px;
            vertical-align: top;
            margin-left: 5px;
          }
          .tips {
            display: inline-block;
            color: $tips-font-color;
            font-size: 13px;
            height: 30px;
            line-height: 30px;
            vertical-align: top;
            margin-left: 5px;
          }
        }
        &-list {
          font-size: 0;
          margin-top: 10px;
          .hot-word {
            display: inline-block;
            padding: 5px 10px;
            line-height: 20px;
            height: 30px;
            border-radius: 15px;
            background: $theme-background-hr;
            margin: 5px;
            font-size: 12px;
          }
        }
      }
    }
  }
  .search-suggest {
    background: $theme-background;
    .suggest-item {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      padding: 0 17px;
      border-bottom: 1px solid $border-color;
      
    }
  }
  .search-info {
    
    overflow: hidden;
    position: relative;
    
    .search-info-card {
      background: $theme-background;
      &-wrapper {
        overflow-x: scroll;
        width: 100%;
        padding-top: 10px;
      }
      &-fuzzyMatch {
        
      }
    }
    .card-forum {
      padding: 10px 17px;
      overflow: hidden;
      position: relative;
      font-size: 0;
    }
    .card-thread {
      overflow: hidden;
      position: relative;
      margin-top: 5px;
    }
  }
}
</style>
