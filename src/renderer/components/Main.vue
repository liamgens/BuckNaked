<template>
  <v-layout row>
    <v-flex xs6>
      <Editor></Editor>
    </v-flex>
    <v-flex xs6>
      <v-layout column>
        <v-flex xs12>
          <Graphics></Graphics>
        </v-flex>
        <v-flex xs12>
          <Toolbar></Toolbar>
        </v-flex>
        <v-flex xs12>
          <Output></Output>
        </v-flex>
      </v-layout>
    </v-flex>
      <v-snackbar
        v-model="snackbar"
        :right="true"
        :top="true">

        {{ achievement + " unlocked!" }}

        <v-btn
          color="pink"
          flat
          @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
  </v-layout>
  
</template>

<script>
  import Editor from './Editor.vue'
  import Output from './Output.vue'
  import Graphics from './Graphics.vue'
  import Toolbar from './Toolbar.vue'

  export default {
    data () {
      return {
        snackbar: false,
        achievement: 'asdf'
      }
    },
    name: 'buck-naked',
    components: {
      Editor,
      Output,
      Graphics,
      Toolbar
    }
  }
</script>
