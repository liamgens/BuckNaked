<template>
  <div id="outputPanel">
    <div id="outputText">{{ output }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    output () {
      return this.$store.getters.output
    }
  }
}
</script>

<style>
#outputPanel {
  white-space: pre-wrap;
  height: calc(100vh - 345px);
}
#outputText {
  background-color: #808080;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 100%;
  width: 100%;
  padding: 5px;
}
</style>
