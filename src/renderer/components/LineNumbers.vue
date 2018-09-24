<template>
  <p v-html="test" style="max-height: calc(100vh - 51px)">
  </p>
</template>

<script>
export default {
  computed: {
    test: function () {
      let lineNumbers = ''
      for (let i = 0; i < this.$store.getters.numberOfLines; i++) {
        lineNumbers += i + 1 + '<br />'
      }
      return lineNumbers
    }
  }
}
</script>

<style>
</style>
