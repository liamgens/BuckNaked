import { getType } from './types'

const instructions = require('./instructions')
const destFirst = ['var', 'set']

export const getArgTypes = (args, env) => {
  let types = []
  for (var i = 0; i < args.length; i++) {
    let arg = args[i]
    let type = getType(arg)
    if (type === 'name') {
      types.push(getNamedValueType(arg, env))
    } else {
      types.push(type)
    }
  }
  return types
}

export const getNamedValueType = (arg, env) => {
  var type = 'name'
  try {
    type = getType(env.getVariable(arg))
  } catch (err) {
  }
  return type
}

export const validateDest = (dest, inst) => {
  if (getType(dest) !== 'name') {
    throw new Error(`${inst} operation requires a destination as the last argument`)
  }
}

export const typecheck = ({inst, args}, env) => {
  // Must add checking for making sure variables are defined
  if (destFirst.includes(inst)) {
    if (getType(args[0]) !== 'name') {
      throw new Error('First argument for set and var operations should be a destination')
    }
  } else {
    let argsWithoutDest = []
    for (let i = 0; i < args.length - 1; i++) {
      argsWithoutDest.push(args[i])
    }
    let types = getArgTypes(argsWithoutDest, env)
    for (var i = 0; i < types.length; i++) {
      if (types[i] !== instructions[inst].arg_types[i] && instructions[inst].arg_types[i] !== 'any') {
        throw new Error('Operation and operand types did not match')
      }
    }
  }
}
