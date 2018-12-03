<template>
  <div>
    <div id="editorPanel">
      <textarea id="editor" v-model="codeDisplay" contenteditable onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'    '+v.substring(e);this.selectionStart=this.selectionEnd=s+4;return false;}"></textarea>
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
    codeDisplay: {
      get () {
        return this.$store.getters.code
      },
      set (value) {
        this.$store.commit('editCode', value)
      }
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
  font-family: "Courier New", Courier, monospace;
  font-size: 16px;
}

#editorPanel {
  height: calc(100vh - 35px);
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
  font-size: 16px;
}
</style>
