<template>
  <div>
    <div id="editorPanel">
      <textarea v-model="code" id="editor" contenteditable></textarea>
    </div>
    <div id="lineNumberPanel">
      <LineNumbers style="text-align: right;"></LineNumbers>
    </div>
  </div>
</template>

<script>
import LineNumbers from './LineNumbers.vue'

export default {
  components: {
    LineNumbers
  },
  computed: {
    code: {
      get () {
        return this.$store.state.code
      },
      set (value) {
        this.$store.commit('editCode', value)
      }
    },
    test: function () {
      let lineNumbers = ''
      for (let i = 0; i < this.$store.getters.numberOfLines; i++) {
        lineNumbers += i + 1 + '<br />'
      }
      return lineNumbers
    }
  },
  mounted: function () {
    var s1 = document.getElementById('editor')
    var s2 = document.getElementById('lineNumberPanel')
    function selectScroll1 (e) { s2.scrollTop = s1.scrollTop }
    function selectScroll2 (e) { s1.scrollTop = s2.scrollTop }

    s1.addEventListener('scroll', selectScroll1, false)
    s2.addEventListener('scroll', selectScroll2, false)
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
  padding-left: 37px;
  padding-top: 5px;
  white-space: pre;
  overflow-x: scroll;
}

#editorPanel {
  height: calc(100vh - 30px);
  width: calc(50vw - 30px);
}

#lineNumberPanel {
  position: absolute;
  top: 21px;
  left: 16px;
  color: #ffa500;
  overflow-y: scroll;
  text-align: right;
  display: block;
  width: 30px;
  overflow: hidden;
}
</style>
