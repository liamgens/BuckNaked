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
      <v-btn id="uploadButton" color="blue-grey" @click="upload" slot="activator">
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

    <input type="file" id="fileToLoad" @change="load" hidden>
  
  </div>
</template>

<script>
import { saveToFile } from '../../bvm/utils.js'

export default {
  methods: {
    run: function () {
      this.$store.commit('editFileContents', this.$store.getters.code)
    },
    clear: function () {
      this.$store.commit('editFileContents', '')
    },
    save: function (filename) {
      saveToFile(this.$store.getters.code, filename)
    },
    load: function (event) {
      let files = event.target.files
      let reader = new FileReader()
      reader.readAsText(files[0], 'UTF-8')
      reader.onload = file => {
        this.$store.commit('editCode', file.target.result)
      }
      document.getElementById('fileToLoad').value = ''
    },
    upload: function () {
      document.getElementById('fileToLoad').click()
    }
  }
}
</script>

<style>
</style>
