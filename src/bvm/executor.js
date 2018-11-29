import store from '../../src/renderer/store/index'
import { EventBus } from '../renderer/main.js'
const instructions = require('./instructions')

/* eslint-disable no-unused-vars */
export const sysout = output => {
  store.commit('appendOutput', output)
}
/* eslint-enable no-unused-vars */
export const execute = ({ inst, args }, env) => {
  let eventBus = EventBus
  eventBus.$emit('gfxNOP')

  let expr = instructions[inst].expr

  // If the instruction has a destination
  if ('dest' in instructions[inst]) {
    let dest = eval(instructions[inst].dest)
    // Check that the dest variable exists in the scope
    env.getVariable(dest)
    env.setVariable(dest, eval(expr))
  } else if (inst === 'fn' || inst === 'while' || inst === 'if') {
    return eval(expr)
  } else {
    eval(expr)
  }
}

export const plotAxes = (eventBus) => {
  for (let i = 0; i < 256; i++) {
    eventBus.$emit('gfxFillRect', i, 128, 1, 1, 'white')
  }
  for (let i = 0; i < 256; i++) {
    eventBus.$emit('gfxFillRect', 128, i, 1, 1, 'aquamarine')
  }
}
