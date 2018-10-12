<template>
  <Layout>
    <template slot="sidebar-top">
      <div :class="{'load-success':loadSuccess}">
        <div id="codefund_ad" :key="$route.path"></div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'

export default {
  components: { Layout },
  data() {
    return {
      loadSuccess: true,
      hasLoaded: false
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        const { path } = val
        if (path === '/zh/' || path === '/') return
        if (!this.hasLoaded) {
          this.addFundScript()
        } else {
          window._codefund && window._codefund.serve()
        }
      },
      immediate: true
    }
  },
  methods: {
    addFundScript() {
      if (this.$isServer) return
      const codefundId = this.isGitee()
        ? 'c0e8a6c2-6717-402f-aea7-bfdcaaaf2329'
        : 'c010d89c-46a8-4e3a-abf0-86b8a02874e4'
      const script = window.document.createElement('script')
      script.onerror = this.loadError
      script.src = 'https://codefund.io/scripts/' + codefundId + '/embed.js'
      document.body.appendChild(script)
      this.hasLoaded = true
    },
    isGitee() {
      const origin = window.location.origin
      if (origin.includes('gitee.io')) {
        return true
      }
      return false
    },

    loadError(oError) {
      this.loadSuccess = false
    }
  }
}
</script>

<style>
#cf_ad .cf-text {
  display: inline !important;
}
.load-success {
  min-height: 130px;
}
</style>
