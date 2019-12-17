<template>
  <div id="user-center">
      <div class="user-center">
        ErrorPage {{portrait}}
      </div>
      <button
        v-on:click="back"
      >
      back
      </button>
  </div>
</template>

<script>
  export default {
    computed: {
      portrait () {
        return this.$route.params.portrait
      }
    },
    name: 'ErrorPage',
    // components: { BottomNavigator }
    methods: {
      back () {
        // this.$router.back()
        this.$router.push('/home')
      }
    }
  }
</script>

<style>

</style>
