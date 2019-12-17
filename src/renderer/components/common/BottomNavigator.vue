<template>
    <div>
        <!-- <transition :name="viewAnimate"> -->
        <transition>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <section class="navigator-wrapper">
            <router-link 
                class="navigator-wrapper-item index"
                to="/home"
            >
                <i class="icon-navigator-home"></i>
                <span>首页</span>
            </router-link>
            <router-link 
                class="navigator-wrapper-item forum"
                to="/forum"
            >
                <i class="icon-navigator-enter-forum"></i>
                <span>进吧</span>
            </router-link>
            <router-link 
                class="navigator-wrapper-item post"
                to="/post"
            >
                <i></i>
            </router-link>
            <router-link 
                class="navigator-wrapper-item message"
                to="/message"
            >
                <i class="icon-navigator-message"></i>
                <span>消息</span>
            </router-link>
            <router-link 
                class="navigator-wrapper-item user-center"
                to="/userCenter"
            >
                <i class="icon-navigator-user-center"></i>
                <span>我的</span>
            </router-link>
        </section>
    </div>
</template>

<script>
export default {
  data () {
    return {
    //   viewAnimate: 'slide-left'
    }
  },
  name: 'BottomNavigator'
// components: { SystemInformation },
// methods: {
//   open (link) {
//     this.$electron.shell.openExternal(link)
//   }
// }
}
</script>

<style lang="scss" scoped>
@import '@/assets/theme.scss';  
.navigator-wrapper {
    height: 55px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    font-size: 0;
    background: $theme-background;
    box-shadow: 0px -1px 10px -1px $shadow-color;

    &-item {
        position: relative;
        width: 20%;
        display: inline-block;
        height: 100%;
        text-align: center;
        vertical-align: top;

        i {
            display: block;
            width: 20px;
            height: 20px;
            margin: 10px auto 0;
        }
        span {
            font-size: 10px;
            line-height: 20px;
            color: $title-font-color;
        }
    }

    .index {}
    .forum {}
    .message {}
    .user-center {}
    .post {
        // background: #ddd;
        position: relative;
        overflow: inherit;
        i {
            position: absolute;
            top: -20px;
            left: 50%;
            margin-left: -25px;
            width: 50px;
            height: 50px;
            transform:rotate(45deg);
            border-radius: 20px;
            box-shadow: 0px 0px 5px $placeholder-background;
            background-color: $button-blue-color;
            font-size: 20px;
            color: $font-light-color;
            line-height: 50px;
            text-align: center;
        }
    }
}
</style>
