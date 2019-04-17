<template>
  <a
    href="https://coding.net/?utm_source=panjiachen"
    target="_blank"
    @click="clickCoding('readme')"
    style="display: block;"
  >
    <img src="https://wpimg.wallstcn.com/abc834ad-3dcd-4f58-943b-00098bb5f0dd.png">
  </a>
</template>

<script>
export default {
  methods: {
    clickCoding(tag) {
      ga('send', 'click', 'e.coding', 'Action', tag)
    }
  }
}
</script>
