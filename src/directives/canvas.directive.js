import { EventBus } from '../renderer/main.js'

function inserted (el) {
  const canvas = el
  canvas.width = 256
  canvas.height = 256

  const ctx = canvas.getContext('2d')

  function clear () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  function drawFillRect (x, y, width, height, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, width, height)
  }

  function drawOutlineRect (x, y, width, height, color) {
    ctx.strokeStyle = color
    ctx.strokeRect(x, y, width, height)
  }

  function drawText (x, y, color, text) {
    ctx.fillStyle = color
    ctx.font = '12px serif'
    ctx.fillText(text, x, y)
  }

  EventBus.$on('gfxClear', function () {
    clear()
  })

  EventBus.$on('gfxNOP', () => {})

  EventBus.$on('gfxFillRect', function (x, y, width, height, color) {
    drawFillRect(x, y, width, height, color)
  })

  EventBus.$on('gfxOutlineRect', function (x, y, width, height, color) {
    drawOutlineRect(x, y, width, height, color)
  })

  EventBus.$on('gfxText', function (x, y, color, text) {
    drawText(x, y, color, text)
  })
}

export default {
  inserted
}
