<template>
  <p v-html="test">
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
