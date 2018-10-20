// const maths = ['add', 'sub', 'mul', 'div', 'mod']
// const bools = ['and', 'or']
const instructions = require('./instructions')

export const getArgTypes = args => {
  let types = []
  for (var i = 0; i < args.length; i++) {
    let arg = args[i]
    if (!isNaN(arg)) {
      types.push('num')
    } else if (arg.valueOf() === 'true' || arg.valueOf() === 'false') {
      types.push('bool')
    } else if (arg.charAt(0) === '"' && arg.charAt(arg.length - 1) === '"') {
      types.push('string')
    } else {
      types.push(getNamedValue(arg))
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
  let types = getArgTypes(args)
  for (var i = 0; i < types.length; i++) {
    if (types[i] !== instructions[inst].arg_types[i]) {
      throw new Error('Operation and operand types did not match')
    }
  }
}
