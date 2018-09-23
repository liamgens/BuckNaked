<template>
  <div>
    <v-app dark>
      <v-container fluid>
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
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  import Editor from './components/Editor.vue'
  import Output from './components/Output.vue'
  import Graphics from './components/Graphics.vue'
  import Toolbar from './components/Toolbar.vue'

  export default {
    name: 'buck-naked',
    components: {
      Editor,
      Output,
      Graphics,
      Toolbar
    }
  }
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
</style>
