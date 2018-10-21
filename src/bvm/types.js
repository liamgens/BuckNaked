export const getType = arg => {
  if (arg === '') {
    throw new Error('Cannot get the type of an empty string')
  }
  if (typeof arg === 'boolean') {
    return 'bool'
  } else if (!isNaN(arg)) {
    return 'num'
  } else if (arg.valueOf() === 'true' || arg.valueOf() === 'false') {
    return 'bool'
  } else if (arg.charAt(0) === '"' && arg.charAt(arg.length - 1) === '"') {
    return 'string'
  } else {
    return 'name'
  }
}

export const convertType = arg => {
  if (arg === '') {
    throw new Error('Cannot get the type of an empty string')
  }
  if (typeof arg === 'boolean') {
    return arg
  } else if (!isNaN(arg)) {
    return Number(arg)
  } else {
    return arg
  }
}
