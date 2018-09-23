<template>
  <div>
    <v-btn @click="run" color="success"><v-icon light>play_circle_filled</v-icon></v-btn>
    <v-btn color="error"><v-icon light>stop</v-icon></v-btn>
    <v-btn color="warning"><v-icon light>clear</v-icon></v-btn>
    <v-btn color="blue-grey"><v-icon light>cloud_upload</v-icon></v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    run: function () {
      this.$store.commit('editFileContents', this.$store.getters.code)
    }
  }
}
</script>

<style>
</style>
