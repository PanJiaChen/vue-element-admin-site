<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >

    <div v-if="isHome||isDonate" id="codefund" class="home-codefund" />

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <div slot="top" :class="{'load-success':loadSuccess}">
        <div v-if="!isHome" id="codefund" :key="$route.path" />
      </div>
      <slot slot="bottom" name="sidebar-bottom" />
    </Sidebar>

    <div v-if="$page.frontmatter.layout" class="custom-layout">
      <component :is="$page.frontmatter.layout" />
    </div>

    <Home v-else-if="$page.frontmatter.home" />

    <Page v-else :sidebar-items="sidebarItems">
      <slot slot="top" name="page-top" />
      <slot slot="bottom" name="page-bottom" />
    </Page>

    <SWUpdatePopup :update-event="swUpdateEvent" />
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
import Swal from 'sweetalert2'
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
  computed: {
    isHome() {
      const page = this.$page
      const { path } = page
      if (path === '/zh/' || path === '/') {
        return true
      }
      return false
    },
    isDonate() {
      const page = this.$page
      const { path } = page
      return path.includes('donate')
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
  watch: {
    $route: {
      handler: function(val, oldVal) {
        if (this.$isServer) return

        if (this.isHome || this.isDonate) {
          getCodefund('bottom-bar')
        } else {
          getCodefund()
        }
      },
      immediate: true
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

    this.checkAdBlock()
  },
  methods: {
    checkLang() {
      var lang = navigator.language || navigator.userLanguage // 常规浏览器语言和IE浏览器
      lang = lang.substr(0, 2) // 截取lang前2位字符
      if (lang === 'zh') {
        return 'cn'
      } else {
        return 'en'
      }
    },
    adBlockDetected() {
      const cn =
        '检测到你使用了例如：AdBlock之类的广告屏蔽插件，请将本项目加入白名单中。因为广告收入对于一个开源项目来说真的很重要。拜托了🙏'
      const en =
        'It is detected that you have used an ad blocking plug-in such as AdBlock, etc. to replace this item and add it to the whitelist. Because advertising revenue is really important for an open source project. Please, 🙏'

      Swal.fire({
        title: this.checkLang() === 'cn' ? cn : en,
        width: 600,
        padding: '3em',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        backdrop: `
            rgba(0,0,123,0.4)
            url("${this.$withBase('/nyan-cat.gif')}")
            left top
            no-repeat`
      })

      this.sendGa(true)
    },
    adBlockNotDetected() {
      this.sendGa(false)
    },
    checkAdBlock() {
      import('blockadblock').then(() => {
        const blockAdBlock = window.blockAdBlock
        if (typeof blockAdBlock === 'undefined') {
          this.adBlockDetected()
        } else {
          blockAdBlock.onDetected(this.adBlockDetected)
          blockAdBlock.onNotDetected(this.adBlockNotDetected)
        }
      })
    },
    sendGa(tag) {
      window.ga &&
        window.ga('send', 'event', {
          eventCategory: 'adblock',
          eventAction: tag
        })
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

<style src="prismjs/themes/prism-tomorrow.css">
</style>
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

.load-success {
  position: sticky;
  top: 0px;
  background: #fff;
}
.swal2-title {
  font-size: 20px !important;
  text-align: left !important;
  line-height: 30px !important;
}
</style>
