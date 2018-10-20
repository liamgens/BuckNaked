import { getType, convertType } from './types'

const instructions = require('./instructions')
const destFirst = ['var', 'set']
// const keywords = ['var', ]

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
  } catch (err) {}
  return type
}

export const validateDest = (dest, inst) => {
  if (getType(dest) !== 'name') {
    throw new Error(`${inst} operation requires a destination`)
  }
  if (dest in instructions || dest === 'true' || dest === 'false') {
    throw new Error(`Variable naming error: ${dest} is a keyword`)
  }
}

const checkForDivByZero = (inst, args, env) => {
  if (
    (inst === 'div' || inst === 'mod') &&
    getVariableActualValue(args[1], env) === '0'
  ) {
    throw new Error('Divide by zero error')
  }
}

const getVariableActualValue = (arg, env) => {
  var value = arg
  try {
    value = getType(env.getVariable(arg))
  } catch (err) {}
  return value
}

export const validate = ({ inst, args }, env) => {
  checkForDivByZero(inst, args, env)
  if (destFirst.includes(inst)) {
    validateDest(args[0], inst)
  } else {
    validateDest(args[args.length - 1], inst)
    let argsWithoutDest = []
    for (let i = 0; i < args.length - 1; i++) {
      argsWithoutDest.push(args[i])
    }
    let types = getArgTypes(argsWithoutDest, env)
    for (var i = 0; i < types.length; i++) {
      if (
        types[i] !== instructions[inst].arg_types[i] &&
        instructions[inst].arg_types[i] !== 'any'
      ) {
        throw new Error('Operation and operand types did not match')
      }
    }
  }

  for (let i = 0; i < args.length; i++) {
    args[i] = convertType(args[i])
  }

  return { inst, args }
}
