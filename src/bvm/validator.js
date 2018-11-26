import { getType, convertType } from './types'

const instructions = require('./instructions')
const destFirst = ['var', 'set', 'else']
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

export const actualValueOf = (arg, env) => {
  var actualValue = arg
  if (getType(arg) === 'name') {
    try {
      actualValue = env.getVariable(arg)
    } catch (err) {}
  }
  return actualValue
}

const getPrintArgs = (inst, args, env) => {
  if (!('dest' in instructions[inst]) && !('name' in instructions[inst])) {
    for (var i = 0; i < args.length; i++) {
      if (instructions[inst].arg_types[i] === 'string' || instructions[inst].arg_types[i] === 'any') {
        args[i] = actualValueOf(args[i], env)
        if (getType(args[i]) === 'name') {
          throw new Error(`Cannot print ${args[i]} because it has not been assigned a value`)
        }
        if ((getType(args[i]) === 'string') && (args[i].charAt(0) === '"' && args[i].charAt(args[i].length - 1) === '"')) {
          args[i] = args[i].slice(1, args[i].length - 1)
        }
      }
    }
  }
}

export const validate = ({ inst, args }, env) => {
  if (inst === 'fn' || inst === 'fnParse') {
    return { inst, args }
  }
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
  } else if (inst === 'while' || inst === 'if') {
    args[0] = actualValueOf(args[0], env)
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
  getPrintArgs(inst, args, env)

  for (let i = 0; i < args.length; i++) {
    args[i] = convertType(args[i])
  }
  return { inst, args }
}
