const stripWhitespace = text => text.replace(/(^\s+|\s+$)/g, '')
const splitArgs = args => args.split(/[ ,]+/)
export const parse = line => {
  let args = splitArgs(stripWhitespace(line))

  // Replace [ '' ] with an empty array []
  if (args.length === 1 && args[0] === '') {
    args = []
  }

  return args
}
