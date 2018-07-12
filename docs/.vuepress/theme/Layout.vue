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
import Layout from "@default-theme/Layout.vue";

export default {
  components: { Layout },
  data() {
    return {
      loadSuccess: true
    };
  },
  watch: {
    "$route.path": {
      handler: function(val, oldVal) {
        const path = val;
        if (path === "/zh/" || path === "/") return;
        this.addFundScript();
      },
      immediate: true
    }
  },
  methods: {
    addFundScript() {
      if (this.$isServer) return;
      const codefundId = "c010d89c-46a8-4e3a-abf0-86b8a02874e4";
      const script = window.document.createElement("script");
      script.onerror = this.loadError;
      script.src = "https://codefund.io/scripts/" + codefundId + "/embed.js";
      document.body.appendChild(script);
    },
    loadError(oError) {
      this.loadSuccess = false;
    }
  }
};
</script>

<style>
#cf_ad .cf-text {
  display: inline !important;
}
.load-success {
  min-height: 130px;
}
</style>
