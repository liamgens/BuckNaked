<template>
  <div id="outputPanel">
    <h3>Output</h3>
    <p>{{ output }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    output () {
      return this.$store.getters.fileContents
    }
  }
}
</script>

<style>
#outputPanel {
  white-space: pre-wrap;
}
</style>
