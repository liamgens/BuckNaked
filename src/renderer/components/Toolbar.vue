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

    <!-- JANK BUTTONS-->
    <div>
      <input type="file" id="fileToSave" @change="onFileChange">
    </div>
    <div>
      <input type="file" id="fileToLoad" @change="onFileChange">
    </div>
    <!-- JANK BUTTONS-->
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
    save: function (theFilename) {
      saveToFile(this.$store.getters.code, theFilename)
    },
    load: function (theFilename) {
      this.$store.commit('editCode', loadFile(theFilename))
    },

    // HELPER FUNCTION
    // MAY TAKE AWAY NEED FOR SAVE AND LOAD FUNCTION
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files
      console.log(files.value)
      if (files.id === 'fileToSave') {
        saveToFile(this.$store.getters.code, files.value)
      }
      if (files.id === 'fileToLoad') {
        this.$store.commit('editCode', loadFile(files.value))
      }
    }
  }
}
</script>

<style>
</style>
