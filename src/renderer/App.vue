<template>
  <div id="app">
    <v-app dark>
      <v-container fluid>
        <v-layout row>
          <v-flex xs6>
            Code Editor Component Here
          </v-flex>
          <v-flex xs6>
            <v-layout column>
              <v-flex xs12>
                Graphics View Component Here
              </v-flex>
              <v-flex xs12>
                Console Output Component Here
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'buck-naked'
  }
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
/* Global CSS */
</style>
