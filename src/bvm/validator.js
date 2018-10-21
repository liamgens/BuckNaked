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
  if (dest.charAt(0).toLowerCase() === dest.charAt(0).toUpperCase()) {
    throw new Error('Variable names must start with a letter')
  }
}

const checkForDivByZero = (inst, args, env) => {
  if (
    (inst === 'div' || inst === 'mod') &&
    (actualValueOf(args[1], env) === '0' ||
    actualValueOf(args[1], env) === 0
    )
  ) {
    throw new Error('Divide by zero error')
  }
}

const actualValueOf = (arg, env) => {
  var actualValue = arg
  if (getType(arg) === 'name') {
    try {
      actualValue = env.getVariable(arg)
    } catch (err) {}
  }

  return actualValue
}

export const validate = ({ inst, args }, env) => {
  checkForDivByZero(inst, args, env)
  if ('dest' in instructions[inst]) {
    validateDest(eval(instructions[inst].dest), inst)
  }
  if ('name' in instructions[inst]) {
    validateDest(eval(instructions[inst].name), inst)
  }
  if (destFirst.includes(inst)) {
    if (args.length > 1) {
      args[1] = actualValueOf(args[1], env)
    }
  } else {
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
    for (let i = 0; i < argsWithoutDest.length; i++) {
      args[i] = actualValueOf(args[i], env)
    }
  }
  if (inst === 'print') {
    args[0] = actualValueOf(args[0], env)
    if (getType(args[0]) === 'name') {
      throw new Error(`Cannot print ${args[0]} because it has not been assigned a value`)
    }
    if ((getType(args[0]) === 'string') && (args[0].charAt(0) === '"' && args[0].charAt(args[0].length - 1) === '"')) {
      args[0] = args[0].slice(1, args[0].length - 1)
    }
  }
  for (let i = 0; i < args.length; i++) {
    args[i] = convertType(args[i])
  }
  return { inst, args }
}
