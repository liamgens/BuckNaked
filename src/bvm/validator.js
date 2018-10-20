import { getType } from './types'

const instructions = require('./instructions')

export const getArgTypes = args => {
  let types = []
  for (var i = 0; i < args.length; i++) {
    let arg = args[i]
    let type = getType(arg)
    if (type === 'name') {
      types.push(getNamedValue(arg))
    } else {
      types.push(type)
    }
  }
  return types
}

export const getNamedValue = arg => {
  // TODO retrieve saved variables
  return 'name'
}

export const typecheck = ({inst, args}) => {
  // Must add checking for making sure variables are defined
  let argsWithoutDest = []
  for (let i = 0; i < args.length - 1; i++) {
    argsWithoutDest.push(args[i])
  }
  let types = getArgTypes(argsWithoutDest)
  for (var i = 0; i < types.length; i++) {
    if (types[i] !== instructions[inst].arg_types[i]) {
      throw new Error('Operation and operand types did not match')
    }
  }
}
