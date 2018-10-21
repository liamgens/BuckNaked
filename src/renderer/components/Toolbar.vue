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
      <v-btn color="blue-grey" slot="activator" disabled>
        <v-icon light>cloud_upload</v-icon>
      </v-btn>
      <span>Upload File</span>
    </v-tooltip>
  </div>
</template>

<script>
import { interpreter } from '../../bvm/interpreter'
import { Environment } from '../../bvm/environment'
import { EventBus } from '../main.js'

export default {
  methods: {
    run: function () {
      this.$store.commit('clearOutput')
      EventBus.$emit('gfxClear')
      this.$store.commit('editFileContents', this.$store.getters.code)
      interpreter(this.$store.getters.codeAsArray, [new Environment({scope: {}, functions: {}})])
    },
    clear: function () {
      this.$store.commit('clearOutput')
      EventBus.$emit('gfxClear')
    }
  }
}
</script>

<style>
</style>
