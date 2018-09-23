<template>
  <div>
    <v-btn @click="run" color="success"><v-icon light>play_circle_filled</v-icon></v-btn>
    <v-btn color="error"><v-icon light>stop</v-icon></v-btn>
    <textarea v-model="code" id="editor"></textarea>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data: function () {
    return {
      code: ''
    }
  },
  methods: {
    ...mapMutations([
      'editFileContents'
    ]),
    run: function () {
      this.editFileContents(this.code)
    }
  }
}
</script>

<style>
textarea {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 95vh;
  background-color:#808080;
  outline: none;
  padding: 5px;
  white-space: pre;
  overflow-x: scroll;
}
</style>
