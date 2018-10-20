export const getType = arg => {
  if (arg === '') {
    throw new Error('Cannot get the type of an empty string')
  }
  if (!isNaN(arg)) {
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
  if (!isNaN(arg)) {
    return Number(arg)
  } else if (arg.valueOf() === 'true') {
    return true
  } else if (arg.valueOf() === 'false') {
    return false
  } else if (arg.charAt(0) === '"' && arg.charAt(arg.length - 1) === '"') {
    return arg.slice(1, arg.length - 1)
  } else {
    return arg
  }
}
