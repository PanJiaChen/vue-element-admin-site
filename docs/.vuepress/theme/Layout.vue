<template>
  <Layout>
    <template slot="sidebar-top">
      <div style="min-height:146px;">
        <div id="codefund_ad" :key="$route.path"></div>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@default-theme/Layout.vue";

export default {
  components: { Layout },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    '$route.path': {
      handler: function(val, oldVal) {
        const path = val
        if(path==='/zh/'||path==='/') return
        this.addFundScript()
      },
      immediate: true
    }
  },
  methods: {
    addFundScript() {
      const codefundId = 'c010d89c-46a8-4e3a-abf0-86b8a02874e4'
      const script = document.createElement('script')
      script.src = 'https://codesponsor.io/scripts/' + codefundId + '/embed.js'
      document.body.appendChild(script)
    }
  }
}
</script>

<style>
#cf_ad .cf-text{
  display: inline!important;
}
</style>
