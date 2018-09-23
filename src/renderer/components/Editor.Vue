<template>
  <div id="editorPanel">
    <textarea v-model="code" id="editor"></textarea>
  </div>
</template>

<script>
export default {
  computed: {
    code: {
      get () {
        return this.$store.state.code
      },
      set (value) {
        this.$store.commit('editCode', value)
      }
    }
  }
}
</script>

<style>
#editor {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #808080;
  outline: none;
  padding: 5px;
  white-space: pre;
  overflow-x: scroll;
}

#editorPanel {
  height: 92vh;
  padding: 10px;
}
</style>
