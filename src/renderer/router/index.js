import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '@/components/IndexPage'
import HomePage from '@/components/HomePage/HomePage'
import UserCenterPage from '@/components/UserCenterPage/UserCenterPage'
import EnterForumPage from '@/components/EnterForumPage/EnterForumPage'

import MessagePage from '@/components/MessagePage/MessagePage'
import MessageNewsPage from '@/components/MessagePage/MessageNewsPage'
import MessageChartPage from '@/components/MessagePage/MessageChartPage'
import MessageNoticePage from '@/components/MessagePage/MessageNoticePage'

import PostPage from '@/components/PostPage/PostPage'

import ForumPage from '@/components/ForumPage/ForumPage'

import ThreadPage from '@/components/ThreadPage/ThreadPage'

import SearchPage from '@/components/SearchPage/SearchPage'

import LoginPage from '@/components/LoginPage/LoginPage'

import ProfilePage from '@/components/ProfilePage/ProfilePage'

import errorPage from '@/components/errorPage/errorPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage,
      // todo 上线前修改
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: HomePage,
          name: 'HomePage',
          meta: {
            keepAlive: true,
            isBack: false
          }
        },
        {
          path: 'forum',
          component: EnterForumPage,
          name: 'EnterForumPage',
          meta: {
            keepAlive: true,
            isBack: false,
            needLogin: true
          }
        },
        {
          path: 'message',
          component: MessagePage,
          name: 'MessagePage',
          redirect: '/message/news',
          children: [
            {
              path: 'news',
              component: MessageNewsPage,
              name: 'MessageNewsPage',
              meta: {
                keepAlive: true,
                isBack: false,
                needLogin: true
              }
            },
            {
              path: 'chart',
              component: MessageChartPage,
              name: 'MessageChartPage',
              meta: {
                keepAlive: true,
                isBack: false,
                needLogin: true
              }
            },
            {
              path: 'notice',
              component: MessageNoticePage,
              name: 'MessageNoticePage',
              meta: {
                keepAlive: true,
                isBack: false,
                needLogin: true
              }
            }
          ]
        },
        {
          path: 'userCenter',
          component: UserCenterPage,
          name: 'UserCenterPage',
          meta: {
            keepAlive: true,
            isBack: false,
            needLogin: true
          }
        }
      ]
    },
    {
      path: '/post',
      name: 'PostPage',
      component: PostPage,
      meta: {
        keepAlive: true,
        isBack: false,
        needLogin: true
      }
    },
    {
      path: '/forum/:forumName',
      name: 'ForumPage',
      // redirect: '/home',
      component: ForumPage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/thread/:tid',
      name: 'ThreadPage',
      // redirect: '/home',
      component: ThreadPage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/search',
      name: 'SearchPage',
      // redirect: '/home',
      component: SearchPage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      // redirect: '/home',
      component: LoginPage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/userProfile/:portrait',
      name: 'ProfilePage',
      component: ProfilePage,
      meta: {
        keepAlive: false
      }
    },
    {
      // 会匹配所有路径
      path: '*',
      name: 'errorPage',
      component: errorPage,
      meta: {
        keepAlive: false
      }
    }
  ],
  // mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
