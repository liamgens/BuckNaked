<template>
  <div class="text-xs-center">
    <v-tooltip bottom>
      <v-btn @click="run" color="success" slot="activator">
        <v-icon light>play_circle_filled</v-icon>
      </v-btn>
      <span>Execute Code</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn color="error" slot="activator" disabled>
        <v-icon light>stop</v-icon>
      </v-btn>
      <span>Stop Execution</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn @click="clear" color="warning" slot="activator">
        <v-icon light>clear</v-icon>
      </v-btn>
      <span>Clear Console Output</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn color="blue-grey" @click="load" slot="activator">
        <v-icon light>cloud_upload</v-icon>
      </v-btn>
      <span>Upload File</span>
    </v-tooltip>
    <v-tooltip bottom>
      <v-btn @click="save" color="warning" slot="activator">
        <v-icon light>save</v-icon>
      </v-btn>
      <span>Saves Editor Content</span>
    </v-tooltip>
  </div>
</template>

<script>
import { saveToFile, loadFile } from '../../bvm/utils.js'

export default {
  methods: {
    run: function () {
      this.$store.commit('editFileContents', this.$store.getters.code)
    },
    clear: function () {
      this.$store.commit('editFileContents', '')
    },
    save: function () {
      saveToFile(this.$store.getters.code)
    },
    load: function () {
      this.$store.commit('editCode', loadFile('/Users/lrg/Developer/BuckNaked/yourCode.buck'))
    }
  }
}
</script>

<style>
</style>
