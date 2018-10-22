import store from '../../src/renderer/store/index'
const instructions = require('./instructions')

export const execute = ({ inst, args }, env) => {
  let expr = instructions[inst].expr
  // If the instruction has a destination
  if ('dest' in instructions[inst]) {
    let dest = eval(instructions[inst].dest)
    // Check that the dest variable exists in the scope
    env.getVariable(dest)
    env.setVariable(dest, eval(expr))
  } else {
    eval(expr)
  }
}

/* eslint-disable no-unused-vars */
export const sysout = output => {
  store.commit('appendOutput', output)
}
/* eslint-enable no-unused-vars */
