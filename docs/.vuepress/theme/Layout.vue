<template>
  <Layout>
    <template slot="sidebar-top">
      <div id="codefund_ad"></div>
    </template>
  </Layout>
</template>

<script>
import Layout from "@default-theme/Layout.vue";

export default {
  components: { Layout },
  mounted() {
    const codefundId = 'c010d89c-46a8-4e3a-abf0-86b8a02874e4';
    const script = document.createElement("script");
    script.src = "https://codesponsor.io/scripts/" + codefundId + "/embed.js";
    document.body.appendChild(script);
  }
};

</script>

<style>
#cf_ad .cf-text{
  display: inline!important;
}
</style>
