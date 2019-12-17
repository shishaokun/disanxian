<template>
  <article class="lzl-item">
    <span class="author-name">{{lzlPost.name_show}}：</span>
    <RichText 
      :isFirstPost="0"
      :threadInfo="lzlPost"
      class="lzl-content"
    />
  </article>
</template>

<script>
import RichText from '@/components/common/RichText'

export default {
  name: 'LzlItem',
  props: {
    lzlPost: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  components: {
    RichText
  },
  computed: {
  },

  methods: {
    open (link) {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.lzl-item {
  font-size: 0;
  .author-name {
    font-size: 15px;
    display: inline;
    color: $link-default-color;
    vertical-align: top;
    line-height: 30px;
  }
  .lzl-content {
    font-size: 15px;
    display: inline;
    vertical-align: top;
    line-height: 30px;
  }
}
</style>
