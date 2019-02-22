<template>
  <a
    href="https://e.coding.net/?utm_source=panjiachen"
    target="_blank"
    @click="clickCoding('readme')"
    style="display: block;"
  >
    <img src="https://wpimg.wallstcn.com/51f387d0-58a8-4145-afb2-bd9b6c97e97c.png">
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
