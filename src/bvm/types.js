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
