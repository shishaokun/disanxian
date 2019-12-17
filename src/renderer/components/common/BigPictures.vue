<template>
  <article class="big-pictures">
  </article>
</template>

<script>
import RichText from '@/components/common/RichText'

export default {
  name: 'BigPictures',
  props: {
    pictureList: {
      type: Array,
      default () {
        return []
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
.big-pictures {
  font-size: 0;
}
</style>
