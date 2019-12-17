<template>
  <!-- <router-link
    :to="'/thread/' + threadInfo.id"
    :class="'hot-thread-item ' + singleClass"
  >
    <span class="hot-thread-item-tag">{{threadInfo.topType}}</span>
    <p class="hot-thread-item-title">{{threadInfo.title}}</p>
  </router-link> -->
  <section
    :class="'hot-thread-item ' + singleClass"
    v-on:click="goToThread"
  >
    <span class="hot-thread-item-tag">{{threadInfo.topType}}</span>
    <p class="hot-thread-item-title">{{threadInfo.title}}</p>
  </section>
</template>

<script>
// import ForumHeader from '@/components/ForumPage/ForumHeader'

export default {
  name: 'HotThreadItem',
  components: {},
  props: {
    threadInfo: {
      type: Object,
      default () {
        return {}
      }
    },
    isSingle: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  computed: {
    singleClass () {
      return this.$props.isSingle ? 'single-item ' : ''
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    goToThread () {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';
.hot-thread-item {
  font-size: 0;
  line-height: 30px;
  height: 30px;
  padding: 0 20px;
  border-bottom: 1px solid $border-color;
  overflow: hidden;
  position: relative;
  display: block;
  color: $default-font-color;

  &-tag {
    position: absolute;
    top: 0;
    left: 20px;
    font-size: 12px;
    vertical-align: top;
    line-height: 30px;
    height: 30px;
  }
  &-title {
    font-size: 12px;
    margin-left: 40px;
    line-height: 30px;
    height: 30px;
    @include word-ellipsis(1);
  }
  &.single-item {
    line-height: 30px;
    height: 30px;
    border-bottom: none;
    margin: 15px 0;
    display: block;
  }
}
</style>
