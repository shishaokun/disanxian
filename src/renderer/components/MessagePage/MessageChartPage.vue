<template>
  <div id="chart" class="chart">
    <ChartItem />
  </div>
</template>

<script>
import ChartItem from '@/components/MessagePage/ChartItem'
export default {
  data () {
    return {
      title: '贴吧 Lite'
    }
  },
  name: 'MessageChartPage',
  components: {
    ChartItem
  }
  // methods: {
  //   open (link) {
  //     // this.$electron.shell.openExternal(link)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss'; 
.chart {
  padding: 0 17px;
}
</style>
