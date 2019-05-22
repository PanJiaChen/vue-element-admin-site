<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div v-if="isHome" class="home-codefund" id="codefund"></div>

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>

    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <div slot="top" :class="{'load-success':loadSuccess}">
        <div v-if="!isHome&&!isCN" id="codefund" :key="$route.path"></div>

        <a
          href="https://coding.net/?utm_source=panjiachen"
          target="_blank"
          v-if="isCN"
          @click="clickCoding('sidebar')"
          style="display: block;"
        >
          <img
            style="width:280px;display: block;margin: 10px auto!important;"
            src="https://wpimg.wallstcn.com/d8332dc1-ec6c-47bc-9d5d-8cabb1afe417.png"
          >
        </a>
      </div>
      <slot name="sidebar-bottom" slot="bottom"/>
    </Sidebar>

    <div class="custom-layout" v-if="$page.frontmatter.layout">
      <component :is="$page.frontmatter.layout"/>
    </div>

    <Home v-else-if="$page.frontmatter.home"/>

    <Page v-else :sidebar-items="sidebarItems">
      <slot name="page-top" slot="top"/>
      <slot name="page-bottom" slot="bottom"/>
    </Page>

    <SWUpdatePopup :updateEvent="swUpdateEvent"/>
  </div>
</template>

<script>
import Vue from 'vue'
import nprogress from 'nprogress'
import Home from './Home.vue'
import Navbar from '@default-theme/Navbar.vue'
import Page from '@default-theme/Page.vue'
import Sidebar from '@default-theme/Sidebar.vue'
import SWUpdatePopup from '@default-theme/SWUpdatePopup.vue'
import { resolveSidebarItems } from '@default-theme/util'
import { getCodefund, loadGitter } from './utils'

export default {
  components: { Home, Page, Sidebar, Navbar, SWUpdatePopup },
  data() {
    return {
      isSidebarOpen: false,
      swUpdateEvent: null,
      loadSuccess: true
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$isServer) return
        if (this.isCN && !this.isHome) return
        const { path } = val
        if (this.isHome) {
          getCodefund('bottom-bar')
        } else {
          getCodefund()
        }
      },
      immediate: true
    }
  },
  computed: {
    isHome() {
      const page = this.$page
      const { path } = page
      if (path === '/zh/' || path === '/') {
        return true
      }
      return false
    },
    isCN() {
      return this.$lang === 'zh-CN'
    },
    shouldShowNavbar() {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar() {
      const { frontmatter } = this.$page
      return (
        !frontmatter.layout &&
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      )
    },
    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$route,
        this.$site,
        this.$localePath
      )
    },
    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },
  mounted() {
    loadGitter()
    window.addEventListener('scroll', this.onScroll)
    // configure progress bar
    nprogress.configure({ showSpinner: false })
    this.$router.beforeEach((to, from, next) => {
      if (to.path !== from.path && !Vue.component(to.name)) {
        nprogress.start()
      }
      next()
    })
    this.$router.afterEach(() => {
      nprogress.done()
      this.isSidebarOpen = false
    })
    this.$on('sw-updated', this.onSWUpdated)
  },
  methods: {
    clickCoding(tag) {
      ga('send', 'click', 'e.coding', 'Action', tag)
    },
    loadError(oError) {
      this.loadSuccess = false
    },
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },
    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },
    onSWUpdated(e) {
      this.swUpdateEvent = e
    }
  }
}
</script>

<style src="prismjs/themes/prism-tomorrow.css"></style>
<style src="@default-theme/styles/theme.styl" lang="stylus"></style>

<style>
.cf-wrapper {
  z-index: 101 !important;
}
.cf-wrapper a {
  display: block;
}
.sidebar .sidebar-links {
  padding-top: 10px;
}
</style>
