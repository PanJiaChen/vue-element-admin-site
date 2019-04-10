<template>
  <a
    href="https://e.coding.net/?utm_source=panjiachen"
    target="_blank"
    @click="clickCoding('readme')"
    style="display: block;"
  >
    <img src="https://wpimg.wallstcn.com/6d9dfe00-f253-446b-9e0c-436f94284f63.png">
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
