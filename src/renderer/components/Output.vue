<template>
  <div>
    <p>{{ output }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    output () {
      return this.$store.getters.fileContents
    }
  }
}
</script>

<style>
</style>
