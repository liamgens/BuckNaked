const instructions = require('./instructions')

export const syntax = args => {
  if (args.length > 0 && args[0] in instructions) {
    let inst = args[0]

    // Add an extra argument if var has no value to initialize to
    if (inst === 'var' && args.length === 2) {
      args.push(null)
    }

    let instSet = {
      inst: inst,
      args: args.slice(1)
    }

    let expected = instructions[inst].arg_count
    let actual = instSet.args.length

    if (expected === actual) {
      return instSet
    }

    throw new Error(`Expected ${expected} args but got ${actual}`)
  }
  throw new Error('Instruction not found.')
}
