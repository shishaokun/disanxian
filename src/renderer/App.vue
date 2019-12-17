<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view
        class="app-view"
      />
    </keep-alive>
    <router-view
      v-else
      class="app-view"
    />
  </div>
</template>

<script>
  import ClientMiddleware from '@/middlewares/clientMiddleware'
  export default {
    name: 'App',
    data () {
      return {
        transitionName: ''
      }
    },
    // beforeCreate () {
    //   console.log('beforeCreate')
    // },
    beforeCreate () {
      ClientMiddleware(this)
    },
    created () {
      this.initData()
    },
    // beforeMount () {
    //   console.log('beforeMount')
    // },
    // mounted () {
    //   console.log('mounted')
    // },
    methods: {
      initData () {
        this.$store.dispatch('Base/userInfo/getUserInfo', {
        }).then((data) => {
          // console.log('initData', data)
        }).catch((error) => {
          console.log('onRejected function called: ', error)
        })
      }
    // },
    // watch: {
    //   '$route': (to, from) => {
    //     console.log(to)
    //     console.log(from)
    //     // const toDepth = routeDeep.indexOf(to.path)
    //     // const fromDepth = routeDeep.indexOf(from.path)
    //     // this.$data.transitionName = 'fold-left'
    //   }
    }
  }
</script>

<style>
  /* CSS */
  @import './assets/reset.scss';
</style>
