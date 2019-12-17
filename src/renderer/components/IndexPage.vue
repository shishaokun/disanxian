<template>
  <div id="index">
      <BottomNavigator />
  </div>
</template>

<script>
  import BottomNavigator from '@/components/common/BottomNavigator'
  export default {
    // data () {
    //   return {
    //     userInfo: null
    //   }
    // },
    name: 'IndexPage',
    components: {
      BottomNavigator
    },
    // activated () {
    //   console.log('indexPage-activated')
    // },
    // beforeCreate () {
    //   console.log('indexPage-beforeCreate')
    // },
    created () {
      this.initData()
    },
    // beforeMount () {
    //   console.log('indexPage-beforeMount')
    // },
    // mounted () {
    //   console.log('indexPage-mounted')
    // },
    methods: {
      initData () {
        // this.$store.dispatch('Base/userInfo/getUserInfo', {
        // }).then((data) => {
        //   // console.log('initData', data)
        // }).catch((error) => {
        //   console.log('onRejected function called: ', error)
        // })
      }
    }
  }
</script>

<style>

</style>
