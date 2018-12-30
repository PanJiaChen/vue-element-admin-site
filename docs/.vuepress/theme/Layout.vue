<template>
  <Layout>
    <template slot="sidebar-top">
      <div :class="{'load-success':loadSuccess}">
        <div id="codefund" :key="$route.path"></div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'
import axios from 'axios'

export default {
  components: { Layout },
  data() {
    return {
      loadSuccess: true
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        const { path } = val
        if (path === '/zh/' || path === '/') return
        this.getCodefund()
      },
      immediate: true
    }
  },
  methods: {
    getCodefund() {
      if (this.$isServer) return
      const codefundId = this.isGitee() ? '79' : '116'
      axios
        .get(`https://api.codefund.app/properties/${codefundId}/funder.html`)
        .then(function(response) {
          document.getElementById('codefund').innerHTML = response.data
        })
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
