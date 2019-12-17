<template>
  <div id="post">
      <div class="post">
            <router-link 
                class="navigator-wrapper-item post"
                to="/"
            >post
            </router-link>
      </div>
  </div>
</template>

<script>
//   import BottomNavigator from '@/components/common/BottomNavigator'
export default {
  data () {
    return {
      title: '贴吧 Lite'
    }
  },
  name: 'PostPage'
}
</script>

<style>

</style>
