<!--
Graphics Module

To use this module, call gfx events using the global event bus (see main.js for that)
gfxClear: Clears the graphical window
gfxFillRect(x, y, width, height, color): Draws a filled rectangle at (x, y) with size (width, height)
gfxOutlineRect(x, y, width, height, color): Draws a rectangle outline at (x, y) with size (width, height)
gfxText(x, y, color, text): Draws some text at (x, y)

Color arguments should be supplied as a string like so: 'rgb(128, 128, 128)' or 'red'
-->

<template>
  <div id="graphicsPanel" class="text-xs-center">
    <!-- Custom canvas, defined in canvas.directive.js -->
    <canvas v-canvas></canvas>
  </div>
</template>

<script>
import canvas from '../../directives/canvas.directive.js'

export default {
  directives: {
    canvas
  }
}
</script>

<style>
canvas {
  background: black;
  width: 256px;
  height: 256px;
}
</style>
