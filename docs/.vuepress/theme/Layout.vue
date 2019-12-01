<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div v-if="isHome||isDonate" class="home-codefund" id="codefund"></div>

    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar"/>

    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>
    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <div slot="top" :class="{'load-success':loadSuccess}">
        <div v-if="!isHome" id="codefund" :key="$route.path"></div>
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

        const { path } = val

        if (this.isHome || this.isDonate) {
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
</style>


<style>
#cf[data-template][data-theme='dark'],
#cf[data-template][data-theme='dark'] *,
#cf[data-template][data-theme='light'],
#cf[data-template][data-theme='light'] * {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}

#cf[data-template][data-theme='dark'] a,
#cf[data-template][data-theme='light'] a {
  box-shadow: none;
}

#cf[data-template][data-theme='dark'] .cf-impression,
#cf[data-template][data-theme='light'] .cf-impression {
  visibility: hidden;
  width: 0;
  height: 0;
  border-style: none;
}

div#cf[data-template='responsive_footer'][data-theme='dark'] {
  font-family: Helvetica Neue, Helvetica, Arial;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-height: 75px;
  padding: 10px;
  background-color: hsla(0, 0%, 100%, 0.7);
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 1.5;
}

div#cf[data-template='responsive_footer'][data-theme='dark'] a {
  text-decoration: none;
}

div#cf[data-template='responsive_footer'][data-theme='dark'] a.cf-img-wrapper {
  margin-right: 10px;
  line-height: 0;
}

div#cf[data-template='responsive_footer'][data-theme='dark']
  a.cf-img-wrapper
  img {
  width: 55px;
  height: 55px;
}

div#cf[data-template='responsive_footer'][data-theme='dark'] a.cf-text {
  color: rgba(0, 0, 0, 0.7);
}

div#cf[data-template='responsive_footer'][data-theme='dark'] a.cf-text strong {
  color: #000;
}

div#cf[data-template='responsive_footer'][data-theme='dark']
  button[data-behavior='close'] {
  flex: 1 1;
  color: #000;
  background-color: transparent;
  padding: 2px 6px 4px;
  font-size: 1rem;
  margin-right: 20px;
  border: none;
  cursor: pointer;
}

div#cf[data-template='responsive_footer'][data-theme='light'] {
  font-family: Helvetica Neue, Helvetica, Arial;
  font-size: 0.9rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  max-height: 75px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 1.5;
}

div#cf[data-template='responsive_footer'][data-theme='light'] a {
  text-decoration: none;
}

div#cf[data-template='responsive_footer'][data-theme='light'] a.cf-img-wrapper {
  margin-right: 10px;
  flex: 0 0 60px;
}

div#cf[data-template='responsive_footer'][data-theme='light']
  a.cf-img-wrapper
  img {
  width: 55px;
  height: 55px;
}

div#cf[data-template='responsive_footer'][data-theme='light'] a.cf-text {
  color: hsla(0, 0%, 100%, 0.7);
}

div#cf[data-template='responsive_footer'][data-theme='light'] a.cf-text strong {
  color: #fff;
}

div#cf[data-template='responsive_footer'][data-theme='light']
  button[data-behavior='close'] {
  color: #fff;
  background-color: transparent;
  padding: 2px 6px 4px;
  font-size: 1rem;
  margin-right: 20px;
  border: none;
  cursor: pointer;
}

div#cf[data-template='bottom-bar'] span.cf-wrapper {
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 5000;
  padding: 10px 20px 12px;
  width: 100%;
  border-color: currentcolor transparent transparent;
  border-top: 1px solid transparent;
  line-height: 1.5;
  display: flex;
  justify-content: space-between;
  text-align: left;
}

div#cf[data-template='bottom-bar'] span.cf-wrapper a.cf-text {
  text-decoration: none;
  box-shadow: none;
  font-size: 14px;
}

div#cf[data-template='bottom-bar'] span.cf-wrapper a.cf-text:before {
  margin-right: 4px;
  padding: 2px 6px;
  border-radius: 3px;
  content: 'Ad';
}

div#cf[data-template='bottom-bar'] span.cf-wrapper a.cf-text span.cf-cta {
  text-decoration: underline;
}

div#cf[data-template='bottom-bar'] span.cf-wrapper div.cf-footer {
  font-size: 11px;
  line-height: 22px;
  text-decoration: none;
  box-shadow: none;
}

div#cf[data-template='bottom-bar'] span.cf-wrapper div.cf-footer span.cf-close {
  cursor: pointer;
}

div#cf[data-template='bottom-bar']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by {
  text-decoration: none;
}

div#cf[data-template='bottom-bar'][data-theme='dark'] span.cf-wrapper {
  border-color: #bfbfbf;
  background-color: #eee;
}

div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  a.cf-text {
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  a.cf-text:before {
  background-color: #4caf50;
  color: #fff;
}

div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  div.cf-footer,
div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  div.cf-footer
  span.cf-close {
  color: rgba(0, 0, 0, 0.5);
}

div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  div.cf-footer
  span.cf-close:hover {
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by {
  color: rgba(0, 0, 0, 0.5);
}

div#cf[data-template='bottom-bar'][data-theme='dark']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by:hover {
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='bottom-bar'][data-theme='light'] span.cf-wrapper {
  border-color: #bfbfbf;
  background-color: #eee;
}

div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  a.cf-text {
  color: rgba(0, 0, 0, 0.6);
}

div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  a.cf-text:before {
  background-color: #4caf50;
  color: #fff;
}

div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  div.cf-footer,
div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  div.cf-footer
  span.cf-close {
  color: rgba(0, 0, 0, 0.5);
}

div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  div.cf-footer
  span.cf-close:hover {
  color: rgba(0, 0, 0, 0.6);
}

div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by {
  color: rgba(0, 0, 0, 0.5);
}

div#cf[data-template='bottom-bar'][data-theme='light']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by:hover {
  color: rgba(0, 0, 0, 0.6);
}

div#cf[data-template='bottom-bar'][data-theme='blue'] span.cf-wrapper {
  border-color: #1c1565;
  background-color: #2c6ac7;
}

div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  a.cf-text {
  color: #fff;
}

div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  a.cf-text:before {
  background-color: #1c1565;
  color: #fff;
}

div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  div.cf-footer,
div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  div.cf-footer
  span.cf-close {
  color: hsla(0, 0%, 100%, 0.5);
}

div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  div.cf-footer
  span.cf-close:hover {
  color: #fff;
}

div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by {
  color: hsla(0, 0%, 100%, 0.5);
}

div#cf[data-template='bottom-bar'][data-theme='blue']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by:hover {
  color: #fff;
}

@media only screen and (min-width: 480px) and (max-width: 859px) {
  div#cf[data-template='bottom-bar'] a.cf-text {
    font-size: 14px;
    margin-right: 0;
  }

  div#cf[data-template='bottom-bar'] div.cf-footer {
    display: none;
  }
}

@media only screen and (min-width: 320px) and (max-width: 479px) {
  div#cf[data-template='bottom-bar'] a.cf-text {
    font-size: 12px;
    margin-right: 0;
  }

  div#cf[data-template='bottom-bar'] div.cf-footer {
    display: none;
  }
}

div#cf[data-template='centered'][data-theme='dark'] a {
  box-shadow: none !important;
}

div#cf[data-template='centered'][data-theme='dark'] div.cf-wrapper {
  max-width: 330px;
  display: block;
  padding: 15px;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='centered'][data-theme='dark']
  div.cf-wrapper
  div.cf-header {
  font-size: 12px;
  display: block;
  margin-bottom: 8px;
  color: hsla(0, 0%, 100%, 0.8);
}

div#cf[data-template='centered'][data-theme='dark']
  div.cf-wrapper
  div.cf-header:after,
div#cf[data-template='centered'][data-theme='dark']
  div.cf-wrapper
  div.cf-header:before {
  content: '-';
  margin: 0 0.5em;
  opacity: 0.5;
}

div#cf[data-template='centered'][data-theme='dark'] div.cf-wrapper a.cf-text {
  color: #fff;
  text-decoration: none;
}

div#cf[data-template='centered'][data-theme='dark']
  div.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: hsla(0, 0%, 100%, 0.6);
  text-decoration: none;
  text-align: center;
}

div#cf[data-template='centered'][data-theme='light'] a {
  box-shadow: none !important;
}

div#cf[data-template='centered'][data-theme='light'] div.cf-wrapper {
  max-width: 330px;
  display: block;
  padding: 15px;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='centered'][data-theme='light']
  div.cf-wrapper
  div.cf-header {
  font-size: 12px;
  color: #678;
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='centered'][data-theme='light']
  div.cf-wrapper
  div.cf-header:after,
div#cf[data-template='centered'][data-theme='light']
  div.cf-wrapper
  div.cf-header:before {
  content: '-';
  margin: 0 0.5em;
  opacity: 0.5;
}

div#cf[data-template='centered'][data-theme='light'] div.cf-wrapper a.cf-text {
  color: #333;
  text-decoration: none;
}

div#cf[data-template='centered'][data-theme='light']
  div.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: #678;
  text-decoration: none;
  text-align: center;
}

div#cf[data-template='default'][data-theme='dark'] {
  margin: 0 auto;
  max-width: 330px;
  border: none;
  background-color: rgba(0, 0, 0, 0.05);
}

div#cf[data-template='default'][data-theme='dark'] span.cf-wrapper {
  border-radius: 4px;
  display: block;
  padding: 15px;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
}

div#cf[data-template='default'][data-theme='dark'] span.cf-wrapper a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='default'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper {
  float: left;
  margin-right: 15px;
}

div#cf[data-template='default'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper
  img.cf-img {
  vertical-align: middle;
  border-style: none;
  max-width: 130px;
  position: relative;
}

div#cf[data-template='default'][data-theme='dark']
  span.cf-wrapper
  span.cf-text {
  color: hsla(0, 0%, 100%, 0.7);
}

div#cf[data-template='default'][data-theme='dark']
  span.cf-wrapper
  span.cf-text
  strong {
  color: #fff;
}

div#cf[data-template='default'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 12px;
  display: block;
  color: hsla(0, 0%, 100%, 0.7);
}

div#cf[data-template='default'][data-theme='light'] {
  margin: 0 auto;
  max-width: 330px;
}

div#cf[data-template='default'][data-theme='light'] span.cf-wrapper {
  border-radius: 4px;
  display: block;
  padding: 15px;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  background-color: rgba(0, 0, 0, 0.05);
  font-family: Helvetica, Arial, sans-serif;
}

div#cf[data-template='default'][data-theme='light'] span.cf-wrapper a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='default'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper {
  float: left;
  margin-right: 15px;
}

div#cf[data-template='default'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper
  img.cf-img {
  vertical-align: middle;
  border-style: none;
  max-width: 130px;
  position: relative;
}

div#cf[data-template='default'][data-theme='light']
  span.cf-wrapper
  span.cf-text {
  color: #333;
}

div#cf[data-template='default'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 12px;
  display: block;
  color: #777;
}

div#cf[data-template='docsify'][data-theme='dark'] {
  margin: 0 auto;
  max-width: 330px;
}

div#cf[data-template='docsify'][data-theme='dark'] div.cf-wrapper {
  display: block;
  padding: 15px;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
}

div#cf[data-template='docsify'][data-theme='dark'] div.cf-wrapper a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='docsify'][data-theme='dark'] div.cf-wrapper div.clearfix {
  overflow: auto;
}

div#cf[data-template='docsify'][data-theme='dark']
  div.cf-wrapper
  div.clearfix:after {
  content: '';
  clear: both;
  display: table;
}

div#cf[data-template='docsify'][data-theme='dark']
  div.cf-wrapper
  div.clearfix
  span.cf-img-wrapper {
  float: left;
  margin-right: 15px;
}

div#cf[data-template='docsify'][data-theme='dark']
  div.cf-wrapper
  div.clearfix
  span.cf-img-wrapper
  img.cf-img {
  vertical-align: middle;
  border-style: none;
  max-width: 65px;
  position: relative;
}

div#cf[data-template='docsify'][data-theme='dark']
  div.cf-wrapper
  div.clearfix
  span.cf-text {
  color: hsla(0, 0%, 100%, 0.7);
}

div#cf[data-template='docsify'][data-theme='dark']
  div.cf-wrapper
  div.clearfix
  span.cf-text
  strong {
  color: #fff;
}

div#cf[data-template='docsify'][data-theme='dark']
  div.cf-wrapper
  a.cf-powered-by {
  margin-top: 8px;
  background-color: hsla(0, 0%, 100%, 0.05);
  text-align: center;
  display: block;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 2.2;
  padding: 10px auto;
  text-transform: uppercase;
  color: hsla(0, 0%, 100%, 0.7);
}

div#cf[data-template='docsify'][data-theme='light'] {
  margin: 0 auto;
  max-width: 330px;
}

div#cf[data-template='docsify'][data-theme='light'] div.cf-wrapper {
  display: block;
  padding: 15px;
  overflow: hidden;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
}

div#cf[data-template='docsify'][data-theme='light'] div.cf-wrapper a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='docsify'][data-theme='light']
  div.cf-wrapper
  div.clearfix {
  overflow: auto;
}

div#cf[data-template='docsify'][data-theme='light']
  div.cf-wrapper
  div.clearfix:after {
  content: '';
  clear: both;
  display: table;
}

div#cf[data-template='docsify'][data-theme='light']
  div.cf-wrapper
  div.clearfix
  span.cf-img-wrapper {
  float: left;
  margin-right: 15px;
}

div#cf[data-template='docsify'][data-theme='light']
  div.cf-wrapper
  div.clearfix
  span.cf-img-wrapper
  img.cf-img {
  vertical-align: middle;
  border-style: none;
  max-width: 65px;
  position: relative;
}

div#cf[data-template='docsify'][data-theme='light']
  div.cf-wrapper
  div.clearfix
  span.cf-text {
  color: #333;
}

div#cf[data-template='docsify'][data-theme='light']
  div.cf-wrapper
  a.cf-powered-by {
  margin-top: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  text-align: center;
  display: block;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 2.2;
  padding: 10px auto;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='horizontal'] span.cf-wrapper {
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.5;
  display: block;
  padding: 12px 11px;
  text-align: left;
  margin: 12px 0;
}

div#cf[data-template='horizontal'] span.cf-wrapper a.cf-text {
  text-decoration: none;
}

div#cf[data-template='horizontal'] span.cf-wrapper a.cf-text:before {
  margin-right: 4px;
  padding: 2px 6px;
  border-radius: 3px;
  content: 'Ad';
}

div#cf[data-template='horizontal'] span.cf-wrapper a.cf-text span.cf-cta {
  text-decoration: underline;
}

div#cf[data-template='horizontal'] span.cf-wrapper a.cf-powered-by {
  text-decoration: none;
  float: right;
  font-size: 11px;
  line-height: 22px;
}

div#cf[data-template='horizontal'] span.cf-wrapper a.cf-powered-by:hover {
  text-decoration: underline;
  cursor: pointer;
}

div#cf[data-template='horizontal'][data-theme='dark'] span.cf-wrapper {
  background-color: hsla(0, 0%, 100%, 0.2);
}

div#cf[data-template='horizontal'][data-theme='dark']
  span.cf-wrapper
  a.cf-text {
  color: hsla(0, 0%, 100%, 0.7);
}

div#cf[data-template='horizontal'][data-theme='dark']
  span.cf-wrapper
  a.cf-text:before {
  background-color: #4caf50;
  color: #fff;
}

div#cf[data-template='horizontal'][data-theme='dark']
  span.cf-wrapper
  a.cf-text
  span.cf-cta {
  color: #fff;
}

div#cf[data-template='horizontal'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  color: hsla(0, 0%, 100%, 0.5);
}

div#cf[data-template='horizontal'][data-theme='light'] span.cf-wrapper {
  background-color: #f8f8f8;
}

div#cf[data-template='horizontal'][data-theme='light']
  span.cf-wrapper
  a.cf-text {
  color: rgba(0, 0, 0, 0.6);
}

div#cf[data-template='horizontal'][data-theme='light']
  span.cf-wrapper
  a.cf-text:before {
  background-color: #4caf50;
  color: #fff;
}

div#cf[data-template='horizontal'][data-theme='light']
  span.cf-wrapper
  a.cf-text
  span.cf-cta {
  color: #2c6ac7;
}

div#cf[data-template='horizontal'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  color: rgba(0, 0, 0, 0.5);
}

@media screen and (max-width: 859px) {
  div#cf[data-template='horizontal'] a.cf-powered-by {
    display: none;
  }
}

div#cf[data-template='image-centered'][data-theme='dark'] {
  max-width: 280px;
  margin: 0 auto;
  border: none;
  background-color: rgba(0, 0, 0, 0.05);
}

div#cf[data-template='image-centered'][data-theme='dark'] a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='image-centered'][data-theme='dark'] span.cf-wrapper {
  display: block;
  padding: 15px;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='image-centered'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper {
  display: block;
  text-align: center;
  margin-bottom: 8px;
}

div#cf[data-template='image-centered'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper
  img.cf-img {
  max-width: 130px;
  position: relative;
  margin: 0 auto;
}

div#cf[data-template='image-centered'][data-theme='dark']
  span.cf-wrapper
  span.cf-text {
  color: hsla(0, 0%, 100%, 0.8);
}

div#cf[data-template='image-centered'][data-theme='dark']
  span.cf-wrapper
  span.cf-text
  strong {
  color: #fff;
}

div#cf[data-template='image-centered'][data-theme='dark']
  span.cf-wrapper
  span.cf-text
  span.cf-cta {
  text-decoration: underline;
}

div#cf[data-template='image-centered'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: hsla(0, 0%, 100%, 0.7);
  text-align: center;
}

div#cf[data-template='image-centered'][data-theme='light'] {
  max-width: 280px;
  margin: 0 auto;
  border: none;
  background-color: hsla(0, 0%, 100%, 0.9);
}

div#cf[data-template='image-centered'][data-theme='light'] a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='image-centered'][data-theme='light'] span.cf-wrapper {
  display: block;
  padding: 15px;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='image-centered'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper {
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='image-centered'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper
  img.cf-img {
  max-width: 130px;
  position: relative;
  margin: 0 auto;
}

div#cf[data-template='image-centered'][data-theme='light']
  span.cf-wrapper
  span.cf-text {
  color: rgba(0, 0, 0, 0.6);
}

div#cf[data-template='image-centered'][data-theme='light']
  span.cf-wrapper
  span.cf-text
  strong {
  color: #111;
}

div#cf[data-template='image-centered'][data-theme='light']
  span.cf-wrapper
  span.cf-text
  span.cf-cta {
  text-decoration: underline;
  color: #2c6ac7;
}

div#cf[data-template='image-centered'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
}

div#cf[data-template='image-only'][data-theme='dark'] {
  max-width: 280px;
  margin: 0 auto;
}

div#cf[data-template='image-only'][data-theme='dark'] span.cf-wrapper {
  display: block;
  padding: 15px;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='image-only'][data-theme='dark'] span.cf-wrapper a {
  box-shadow: none !important;
}

div#cf[data-template='image-only'][data-theme='dark']
  span.cf-wrapper
  div.cf-header {
  font-size: 12px;
  color: hsla(0, 0%, 100%, 0.6);
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='image-only'][data-theme='dark']
  span.cf-wrapper
  div.cf-header:after,
div#cf[data-template='image-only'][data-theme='dark']
  span.cf-wrapper
  div.cf-header:before {
  content: '-';
  margin: 0 0.5em;
  opacity: 0.5;
}

div#cf[data-template='image-only'][data-theme='dark']
  span.cf-wrapper
  a.cf-img-wrapper {
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='image-only'][data-theme='dark']
  span.cf-wrapper
  a.cf-img-wrapper
  img.cf-img {
  width: 150px;
  height: 150px;
  position: relative;
  margin: 0 auto;
}

div#cf[data-template='image-only'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: hsla(0, 0%, 100%, 0.6);
  text-decoration: none;
  text-align: center;
}

div#cf[data-template='image-only'][data-theme='light'] {
  max-width: 280px;
  margin: 0 auto;
}

div#cf[data-template='image-only'][data-theme='light'] span.cf-wrapper {
  display: block;
  padding: 15px;
  font-size: 14px;
  line-height: 1.4;
  text-align: center;
  font-family: Helvetica, Arial, sans-serif;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='image-only'][data-theme='light'] span.cf-wrapper a {
  box-shadow: none !important;
}

div#cf[data-template='image-only'][data-theme='light']
  span.cf-wrapper
  div.cf-header {
  font-size: 12px;
  color: #678;
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='image-only'][data-theme='light']
  span.cf-wrapper
  div.cf-header:after,
div#cf[data-template='image-only'][data-theme='light']
  span.cf-wrapper
  div.cf-header:before {
  content: '-';
  margin: 0 0.5em;
  opacity: 0.5;
}

div#cf[data-template='image-only'][data-theme='light']
  span.cf-wrapper
  a.cf-img-wrapper {
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='image-only'][data-theme='light']
  span.cf-wrapper
  a.cf-img-wrapper
  img.cf-img {
  width: 150px;
  height: 150px;
  position: relative;
  margin: 0 auto;
}

div#cf[data-template='image-only'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: #678;
  text-decoration: none;
  text-align: center;
}

div#cf[data-template='media'] {
  margin: 0 auto;
}

div#cf[data-template='media'] span.cf-wrapper {
  display: flex;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}

div#cf[data-template='media'] span.cf-wrapper a {
  text-decoration: none;
}

div#cf[data-template='media'] span.cf-wrapper a.cf-img-wrapper {
  flex: 0 0 60px;
}

div#cf[data-template='media'] span.cf-wrapper a.cf-img-wrapper img.cf-img {
  border-radius: 5px;
  position: relative;
}

div#cf[data-template='media'] span.cf-wrapper a.cf-text {
  font-weight: 350;
  letter-spacing: 0.5px;
}

div#cf[data-template='media'] span.cf-wrapper a.cf-text strong {
  font-weight: 700;
  display: block;
  font-weight: 500;
  letter-spacing: -0.1px;
  margin-bottom: 2px;
}

div#cf[data-template='media'] span.cf-wrapper a.cf-text span.cf-link {
  text-decoration: underline;
  font-weight: 400;
}

div#cf[data-template='media'] span.cf-wrapper a.cf-powered-by {
  display: block;
  font-size: 11px;
  margin-top: 5px;
  font-weight: 350;
}

div#cf[data-template='media'][data-theme='dark'] span.cf-wrapper a.cf-text {
  color: hsla(0, 0%, 100%, 0.8);
}

div#cf[data-template='media'][data-theme='dark']
  span.cf-wrapper
  a.cf-text
  span.cf-link,
div#cf[data-template='media'][data-theme='dark']
  span.cf-wrapper
  a.cf-text
  strong {
  color: #fff;
}

div#cf[data-template='media'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  color: hsla(0, 0%, 100%, 0.5);
}

div#cf[data-template='media'][data-theme='light'] span.cf-wrapper a.cf-text,
div#cf[data-template='media'][data-theme='light']
  span.cf-wrapper
  a.cf-text
  strong {
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='media'][data-theme='light']
  span.cf-wrapper
  a.cf-text
  span.cf-link {
  color: #2c6ac7;
}

div#cf[data-template='media'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  color: rgba(0, 0, 0, 0.5);
}

div#cf[data-template='rectangle-narrow'][data-theme='dark'] {
  margin: 0 auto;
  max-width: 330px;
  border: none;
  background-color: rgba(0, 0, 0, 0.05);
}

div#cf[data-template='rectangle-narrow'][data-theme='dark'] a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='rectangle-narrow'][data-theme='dark'] span.cf-wrapper {
  border-radius: 0;
  display: block;
  padding: 14px 10px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
}

div#cf[data-template='rectangle-narrow'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper {
  float: left;
  margin-right: 15px;
}

div#cf[data-template='rectangle-narrow'][data-theme='dark']
  span.cf-wrapper
  img.cf-img {
  vertical-align: middle;
  border-style: none;
  max-width: 130px;
  position: relative;
}

div#cf[data-template='rectangle-narrow'][data-theme='dark']
  span.cf-wrapper
  span.cf-text {
  color: hsla(0, 0%, 100%, 0.8);
  text-decoration: none;
}

div#cf[data-template='rectangle-narrow'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 12px;
  display: block;
  color: #777;
}

div#cf[data-template='rectangle-narrow'][data-theme='light'] {
  margin: 0 auto;
  max-width: 330px;
  border: none;
  background-color: rgba(0, 0, 0, 0.05);
}

div#cf[data-template='rectangle-narrow'][data-theme='light'] a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='rectangle-narrow'][data-theme='light'] span.cf-wrapper {
  border-radius: 0;
  display: block;
  padding: 14px 10px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
}

div#cf[data-template='rectangle-narrow'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper {
  float: left;
  margin-right: 15px;
}

div#cf[data-template='rectangle-narrow'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper
  img.cf-img {
  vertical-align: middle;
  border-style: none;
  max-width: 130px;
  position: relative;
}

div#cf[data-template='rectangle-narrow'][data-theme='light']
  span.cf-wrapper
  span.cf-text {
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='rectangle-narrow'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 5px;
  font-size: 11px;
  display: block;
  color: #777;
}

div#cf[data-template='smart-bar'] {
  position: fixed;
  top: -80px;
  right: 0;
  left: 0;
  z-index: 999999;
  margin: 0 auto;
  background-color: #2c6ac7;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.25);
  font-weight: 300;
  letter-spacing: 1px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transition: top 0.25s ease-in-out;
}

div#cf[data-template='smart-bar'] a.cf-wrapper {
  display: flex;
  box-sizing: border-box;
  padding: 14px 20px;
  text-align: left;
  text-decoration: none;
  justify-content: space-between;
}

div#cf[data-template='smart-bar'] a.cf-wrapper:hover {
  background: #2c6ac7;
}

div#cf[data-template='smart-bar'] a.cf-wrapper:hover span.cf-cta {
  background-color: #1c1565;
  color: #fff;
}

div#cf[data-template='smart-bar'] a.cf-wrapper:hover span.cf-text {
  color: #fff;
}

div#cf[data-template='smart-bar'] a.cf-wrapper span.cf-smartbar-left {
  display: flex;
  align-items: center;
}

div#cf[data-template='smart-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-img-wrapper {
  line-height: 0;
}

div#cf[data-template='smart-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-img-wrapper
  img {
  margin-right: 20px;
  width: 100px;
  height: 40px;
}

div#cf[data-template='smart-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-text {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
}

div#cf[data-template='smart-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-text
  strong {
  font-weight: 400;
}

div#cf[data-template='smart-bar'] a.cf-wrapper span.cf-smartbar-right {
  display: flex;
  align-items: center;
}

div#cf[data-template='smart-bar']
  a.cf-wrapper
  span.cf-smartbar-right
  span.cf-cta {
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #fff;
  color: #2c6ac7;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 1px;
  line-height: 1;
  font-weight: 600;
  font-size: 12px;
}

div#cf[data-template='smart-bar'] div.cf-footer {
  position: absolute;
  right: 20px;
  bottom: 5px;
  border-top: 0;
  border-top-left-radius: 3px;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  font-weight: 300;
  font-size: 8px;
}

div#cf[data-template='smart-bar'] div.cf-footer span.cf-close {
  color: #fff;
  cursor: pointer;
}

div#cf[data-template='smart-bar'] div.cf-footer span.cf-close:hover {
  color: #fff;
}

div#cf[data-template='smart-bar'] div.cf-footer a.cf-powered-by {
  color: #fff;
  font-size: 8px;
  text-decoration: none;
}

div#cf[data-template='smart-bar'] div.cf-footer a.cf-powered-by:hover {
  color: #fff;
}

@media only screen and (min-width: 480px) and (max-width: 759px) {
  div#cf[data-template='smart-bar'] a span.cf-text {
    font-size: 14px;
    margin-right: 0;
  }

  div#cf[data-template='smart-bar'] .cf-smartbar-right {
    display: none;
  }
}

@media only screen and (min-width: 320px) and (max-width: 479px) {
  div#cf[data-template='smart-bar'] a span.cf-text {
    font-size: 12px;
    margin-right: 0;
  }

  div#cf[data-template='smart-bar'] span.cf-smartbar-right {
    display: none;
  }

  div#cf[data-template='smart-bar'] span.cf-img-wrapper img {
    margin-right: 10px;
    width: 80px;
  }
}

@media only screen and (min-width: 320px) and (max-width: 648px) {
  div#cf[data-template='smart-bar'] {
    top: -196px;
  }
}

ins#cf[data-template='sponsored-text'][data-theme='dark'] {
  text-decoration: none !important;
  color: #aaa;
  line-height: 1.7;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
}

ins#cf[data-template='sponsored-text'][data-theme='dark'] span.cf-wrapper a {
  color: #3498db;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none !important;
  box-shadow: none !important;
}

ins#cf[data-template='sponsored-text'][data-theme='dark'] span.cf-wrapper .img,
ins#cf[data-template='sponsored-text'][data-theme='dark'] span.cf-wrapper svg {
  vertical-align: middle;
  position: relative;
}

ins#cf[data-template='sponsored-text'][data-theme='dark']
  span.cf-wrapper
  a.cf-cta
  b {
  text-decoration: underline;
}

ins#cf[data-template='sponsored-text'][data-theme='dark'] a.cf-powered-by {
  color: #6c757e;
  font-size: 12px;
  text-decoration: none !important;
  position: relative;
  display: inline-block;
}

ins#cf[data-template='sponsored-text'][data-theme='dark']
  a.cf-powered-by
  .tooltiptext {
  visibility: hidden;
  width: 140px;
  color: #ccc;
  text-align: center;
  padding: 0;
  position: absolute;
  left: 4px;
  z-index: 1;
}

ins#cf[data-template='sponsored-text'][data-theme='dark']
  a.cf-powered-by:hover
  .tooltiptext {
  visibility: visible !important;
}

ins#cf[data-template='sponsored-text'][data-theme='light'] {
  text-decoration: none !important;
  color: #6c757e;
  line-height: 1.7;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
}

ins#cf[data-template='sponsored-text'][data-theme='light'] .cf-wrapper a {
  color: #3498db;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none !important;
  box-shadow: none !important;
}

ins#cf[data-template='sponsored-text'][data-theme='light'] .cf-wrapper img,
ins#cf[data-template='sponsored-text'][data-theme='light'] .cf-wrapper svg {
  vertical-align: middle;
  position: relative;
}

ins#cf[data-template='sponsored-text'][data-theme='light']
  .cf-wrapper
  .cf-cta
  b {
  text-decoration: underline;
}

ins#cf[data-template='sponsored-text'][data-theme='light'] a.cf-powered-by {
  color: #aaa;
  text-decoration: none !important;
  position: relative;
  display: inline-block;
  font-size: 12px;
}

ins#cf[data-template='sponsored-text'][data-theme='light']
  a.cf-powered-by
  .tooltiptext {
  visibility: hidden;
  width: 140px;
  color: #aaa;
  text-align: center;
  padding: 5px 0;
  position: absolute;
  top: -4px;
  left: 4px;
  z-index: 1;
}

ins#cf[data-template='sponsored-text'][data-theme='light']
  a.cf-powered-by:hover
  .tooltiptext {
  visibility: visible !important;
}

div#cf[data-template='square'] {
  max-width: 255px;
  background-color: #fafafa;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  display: block;
  line-height: 1.5;
  margin: 0 auto 20px;
  overflow: hidden;
  text-align: center;
}

div#cf[data-template='square'] a {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='square'] span.cf-wrapper {
  display: block;
  padding: 0;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 350;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='square'] span.cf-wrapper span.cf-img-wrapper {
  display: block;
  line-height: 1;
  margin-bottom: 8px;
  border-bottom: 1px solid #fafafa;
}

div#cf[data-template='square'] span.cf-wrapper span.cf-img-wrapper img {
  vertical-align: middle;
  border-style: none;
  width: 100%;
  position: relative;
}

div#cf[data-template='square'] span.cf-wrapper span.cf-text {
  display: block;
  padding: 0 1em 1em;
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='square'] span.cf-wrapper span.cf-text span.cf-cta {
  color: #2c6ac7;
  text-decoration: underline;
}

div#cf[data-template='square'] span.cf-wrapper div.cf-footer {
  background-color: rgba(0, 0, 0, 0.05);
  text-align: center;
  display: block;
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 2.2;
  padding: 10px auto;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.8);
}

div#cf[data-template='square'] span.cf-wrapper div.cf-footer a.cf-powered-by {
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

div#cf[data-template='square']
  span.cf-wrapper
  div.cf-footer
  a.cf-powered-by:hover {
  color: #000;
}

div#cf[data-template='square'] span.cf-wrapper div.cf-footer span.cf-close {
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
}

div#cf[data-template='square']
  span.cf-wrapper
  div.cf-footer
  span.cf-close:hover {
  color: #000;
}

div#cf[data-template='sticky-box'] {
  background: hsla(0, 0%, 100%, 0.98);
  border-radius: 3px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 12px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  font-family: Helvetica, Arial, sans-serif;
  padding: 10px;
  position: fixed;
  width: 360px;
  z-index: 999 !important;
  -webkit-animation: fadein 0.85s;
  animation: fadein 0.85s;
  text-align: left;
}

div#cf[data-template='sticky-box'] a {
  text-decoration: none;
  color: #06c;
}

div#cf[data-template='sticky-box'] a:hover .cf-headline {
  text-decoration: underline;
  -webkit-text-decoration-style: dotted;
  text-decoration-style: dotted;
}

div#cf[data-template='sticky-box'] a.cf-powered-by {
  background: #ccc;
  border-radius: 2px 0 0 2px;
  bottom: 57px;
  color: #333;
  display: block;
  font-size: 11px;
  font-weight: thin;
  left: -19px;
  padding: 2px 0;
  position: absolute;
  text-align: center;
  text-decoration: none;
  width: 18px;
}

div#cf[data-template='sticky-box'] a.cf-powered-by:hover {
  background: #333;
  color: #ccc;
  text-decoration: none;
}

div#cf[data-template='sticky-box'] a.cf-sponsored-by {
  margin: 0;
  padding: 0;
  width: 100%;
}

div#cf[data-template='sticky-box'] a.cf-sponsored-by img.cf-img {
  float: left;
  margin: 0 10px 0 0;
  width: 55px;
  height: 55px;
}

div#cf[data-template='sticky-box']
  a.cf-sponsored-by
  span.cf-text
  strong.cf-headline {
  display: block;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
}

div#cf[data-template='sticky-box'] a.cf-sponsored-by span.cf-text span.cf-body {
  color: #414141;
  display: block;
  font-size: 13px;
  line-height: 1.35;
  max-width: 350px;
}

div#cf[data-template='sticky-box']
  a.cf-sponsored-by
  span.cf-text
  span.cf-body:hover {
  color: #111;
}

div#cf[data-template='sticky-box']
  a.cf-sponsored-by
  span.cf-text
  span.cf-body
  span.cf-link {
  color: #06c;
  font-size: 13px;
  line-height: 1.35;
  text-decoration: underline;
}

div#cf[data-template='sticky-box'] [data-behavior='close'] {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  display: block;
  float: right;
  font-size: 12px;
  font-weight: 700;
  height: 18px;
  line-height: 150%;
  position: absolute;
  right: 7px;
  text-align: center;
  text-decoration: none;
  top: 7px;
  width: 18px;
}

div#cf[data-template='sticky-box'] [data-behavior='close']:hover {
  background: rgba(0, 0, 0, 0.3);
  color: hsla(0, 0%, 100%, 0.8);
}

div#cf[data-template='text'][data-theme='dark'] {
  color: #77838f;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 22px;
}

div#cf[data-template='text'][data-theme='dark'],
div#cf[data-template='text'][data-theme='dark'] * {
  text-decoration: none !important;
  box-shadow: none !important;
}

div#cf[data-template='text'][data-theme='dark'] a.cf-cta {
  color: #3498db;
}

div#cf[data-template='text'][data-theme='light'] {
  color: #77838f;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 13px;
  line-height: 22px;
}

div#cf[data-template='text'][data-theme='light'],
div#cf[data-template='text'][data-theme='light'] * {
  text-decoration: none !important;
  box-shadow: none !important;
}

div#cf[data-template='text'][data-theme='light'] a.cf-cta {
  color: #3498db;
}

div#cf[data-template='top-bar'] {
  position: relative;
  z-index: 999999;
  margin: 0 auto;
  background-color: #2c6ac7;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.25);
  font-weight: 300;
  letter-spacing: 1px;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

div#cf[data-template='top-bar'] a.cf-wrapper {
  display: flex;
  box-sizing: border-box;
  padding: 14px 20px;
  text-align: left;
  text-decoration: none;
  justify-content: space-between;
}

div#cf[data-template='top-bar'] a.cf-wrapper:hover {
  background: #2c6ac7;
}

div#cf[data-template='top-bar'] a.cf-wrapper:hover .cf-cta {
  background-color: #1c1565;
  color: #fff;
}

div#cf[data-template='top-bar'] a.cf-wrapper:hover .cf-text {
  color: #fff;
}

div#cf[data-template='top-bar'] a.cf-wrapper span.cf-smartbar-left {
  display: flex;
  align-items: center;
}

div#cf[data-template='top-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-img-wrapper {
  line-height: 0;
}

div#cf[data-template='top-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-img-wrapper
  img {
  margin-right: 20px;
  width: 100px;
  height: 40px;
}

div#cf[data-template='top-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-text {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
}

div#cf[data-template='top-bar']
  a.cf-wrapper
  span.cf-smartbar-left
  span.cf-text
  strong {
  font-weight: 400;
}

div#cf[data-template='top-bar'] a.cf-wrapper span.cf-smartbar-right {
  display: flex;
  align-items: center;
}

div#cf[data-template='top-bar'] a.cf-wrapper span.cf-smartbar-right .cf-cta {
  box-sizing: border-box;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: #fff;
  color: #2c6ac7;
  text-transform: uppercase;
  white-space: nowrap;
  letter-spacing: 1px;
  line-height: 1;
  font-weight: 600;
  font-size: 12px;
}

div#cf[data-template='top-bar'] div.cf-footer {
  position: absolute;
  right: 20px;
  bottom: 5px;
  border-top: 0;
  border-top-left-radius: 3px;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  font-weight: 300;
  font-size: 8px;
}

div#cf[data-template='top-bar'] div.cf-footer span.cf-close {
  color: #fff;
  cursor: pointer;
}

div#cf[data-template='top-bar'] div.cf-footer span.cf-close:hover {
  color: #fff;
}

div#cf[data-template='top-bar'] div.cf-footer a.cf-powered-by {
  color: #fff;
  font-size: 8px;
  text-decoration: none;
}

div#cf[data-template='top-bar'] div.cf-footer a.cf-powered-by:hover {
  color: #fff;
}

@media only screen and (min-width: 480px) and (max-width: 759px) {
  div#cf[data-template='top-bar'] a .cf-text {
    font-size: 14px;
    margin-right: 0;
  }

  div#cf[data-template='top-bar'] .cf-smartbar-right {
    display: none;
  }
}

@media only screen and (min-width: 320px) and (max-width: 479px) {
  div#cf[data-template='top-bar'] a .cf-text {
    font-size: 12px;
    margin-right: 0;
  }

  div#cf[data-template='top-bar'] .cf-smartbar-right {
    display: none;
  }

  div#cf[data-template='top-bar'] .cf-img-wrapper img {
    margin-right: 10px;
    width: 80px;
  }
}

div#cf[data-template='vertical'][data-theme='dark'] {
  width: 125px;
  margin: 0 auto;
  border: none;
  background-color: transparent;
}

div#cf[data-template='vertical'][data-theme='dark'] span.cf-wrapper {
  display: block;
  padding: 0;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 350;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  a.cf-sponsored-by {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper {
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  span.cf-img-wrapper
  img {
  width: 125px;
  height: 125px;
  position: relative;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  span.cf-text {
  color: hsla(0, 0%, 100%, 0.8);
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  span.cf-text
  strong {
  color: #fff;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  span.cf-text
  span.cf-cta {
  text-decoration: underline;
  color: #fff;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 10px;
  font-size: 11px;
  display: block;
  color: hsla(0, 0%, 100%, 0.6);
  text-align: left;
  text-decoration: none;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by:hover {
  text-decoration: underline !important;
}

div#cf[data-template='vertical'][data-theme='dark']
  span.cf-wrapper
  a.cf-powered-by
  img {
  position: fixed;
  left: -1000px;
  top: -1000px;
}

div#cf[data-template='vertical'][data-theme='light'] {
  width: 125px;
  margin: 0 auto;
  border: none;
  background-color: transparent;
}

div#cf[data-template='vertical'][data-theme='light'] span.cf-wrapper {
  display: block;
  padding: 0;
  font-size: 14px;
  line-height: 1.4;
  text-align: left;
  font-family: Helvetica, Arial, sans-serif;
  font-weight: 350;
  margin-left: auto;
  margin-right: auto;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  a.cf-sponsored-by {
  box-shadow: none !important;
  text-decoration: none;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper {
  display: block;
  margin-bottom: 8px;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  span.cf-img-wrapper
  img {
  width: 125px;
  height: 125px;
  position: relative;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  span.cf-text {
  color: #3e3e3e;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  span.cf-text
  span.cf-cta {
  text-decoration: underline;
  color: #2c6ac7;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by {
  margin-top: 10px;
  font-size: 11px;
  display: block;
  color: #aaa;
  text-decoration: none;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by:hover {
  color: #888;
  text-decoration: underline !important;
}

div#cf[data-template='vertical'][data-theme='light']
  span.cf-wrapper
  a.cf-powered-by
  img {
  position: fixed;
  left: -1000px;
  top: -1000px;
}
</style>
