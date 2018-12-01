<template>
  <v-layout column>
    <v-flex xs12>
      <v-toolbar fixed>
        <router-link id="backButton" to="/">
          <v-tooltip bottom>
            <v-btn flat icon color="blue" slot="activator">
              <v-icon light>navigate_before</v-icon>
            </v-btn>
            <span>Back to Editor</span>
          </v-tooltip>
        </router-link>
        <v-toolbar-title>Achievements</v-toolbar-title>
      </v-toolbar>
    </v-flex>
    <v-flex xs12 id="progressBar">
      <v-progress-circular
        :rotate="360"
        :size="170"
        :width="15"
        :value="percentage"
        color="blue"
      >
        <h1>{{ Math.round(percentage) }}%</h1>
      </v-progress-circular>
    </v-flex>
    <v-flex xs12>
      <v-list>
         <v-list-tile
            v-for="item in achievements"
            :key="item.title"
          >
            <v-list-tile-action>
              <v-icon v-if="item.locked" color="red">lock</v-icon>
              <v-icon v-else-if="!item.locked" color="green">lock_open</v-icon>
            </v-list-tile-action>


            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-if="!item.locked">Description: {{ item.description }}</v-list-tile-sub-title>
              <v-list-tile-sub-title v-else-if="item.locked">Description: Locked</v-list-tile-sub-title>
            </v-list-tile-content>

            <v-spacer></v-spacer>

            {{item.points}}
            
          </v-list-tile>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    total: function () {
      let total = 0
      for (let i = 0; i < this.achievements.length; i++) {
        total += this.achievements[i].points
      }
      return total
    },
    unlocked: function () {
      let unlocked = 0
      for (let i = 0; i < this.achievements.length; i++) {
        if (this.achievements[i].locked === false) {
          unlocked += this.achievements[i].points
        }
      }
      return unlocked
    },
    percentage: function () {
      return (this.unlocked / this.total) * 100
    },
    achievements: function () {
      let list = []
      let json = JSON.parse(localStorage.getItem('achievements'))
      for (const [key, value] of Object.entries(json)) {
        console.log(key, value)
        list.push({ locked: value.locked, title: key, description: value.description, points: value.points })
      }
      return list
    }
  }
}
</script>


<style>
#backButton {
  color: rgba(0, 0, 0, 0);
}
#progressBar {
  margin-top: 80px;
  margin-bottom: 30px;
  text-align: center;
}
</style>