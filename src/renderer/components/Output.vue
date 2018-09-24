<template>
  <div id="outputPanel">
    <h3>Output</h3>
    <div id="outputText">{{ output }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    output () {
      let fileContents = this.$store.getters.fileContents.split('\n')
      let output = ''
      for (var i = 0; i < fileContents.length; i++) {
        // Remove whitespace to check for an empty or blank line
        if (!fileContents[i].replace(/\s/g, '').length <= 0) {
          output += '> ' + fileContents[i] + '\n'
        }
      }
      return output
    }
  }
}
</script>

<style>
#outputPanel {
  white-space: pre-wrap;
  height: calc(100vh - 328px);
}
#outputText {
  background-color: #808080;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  padding: 5px;
}
</style>
