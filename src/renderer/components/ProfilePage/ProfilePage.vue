<template>
  <div id="user-center">
    <div class="user-center">
      ProfilePage
    </div>
    <button
      v-on:click="back"
    >
    back
    </button>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  name: 'ProfilePage',
  components: {
  },
  created () {
    this.initData()
  },
  computed: {
    ...mapState('Base/profile', [
      'profileInfo'
    ])
  },
  methods: {
    back () {
      this.$router.back()
    },
    initData () {
      console.log(this.$route.params)
      let portraitId = this.$route.params.portrait
      this.$store.dispatch('Base/profile/getProfileInfo', {
        id: portraitId
      }).then((data) => {
      }).catch((error) => {
        console.log('onRejected function called: ', error)
      })
    }
  }
}
</script>

<style>

</style>
