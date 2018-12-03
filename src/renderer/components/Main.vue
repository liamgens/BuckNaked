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
    <router-link id="achievements" to="/achievements">
      <v-snackbar
        v-model="snackbar"
        :top="true"
        :timeout="5000"
        :auto-height="true"
        >
          {{ achievementText }} 
        <v-btn
          color="blue"
          flat
          @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </router-link>
  </v-layout>
  
</template>

<script>
  import Editor from './Editor.vue'
  import Output from './Output.vue'
  import Graphics from './Graphics.vue'
  import Toolbar from './Toolbar.vue'
  import { EventBus } from '../main.js'

  export default {
    data () {
      return {
        snackbar: false,
        achievements: []
      }
    },
    created () {
      EventBus.$on('unlockAchievement', achievements => {
        this.achievements = achievements
        this.snackbar = true
      })
    },
    computed: {
      achievementText: function () {
        let text = 'Achievement'
        if (this.achievements.length > 1) {
          text += 's'
        }
        return text + ' ' + this.achievements.join(', ') + ' unlocked!'
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
