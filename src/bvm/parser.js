export const parse = line => {
  let stripped = line.replace(/(^\s+|\s+$)/g, '')

  let tracking = true
  let inString = false
  let currentArg = ''
  let args = []

  for (let i = 0; i < stripped.length; i++) {
    let currentChar = stripped.charAt(i)

    if (tracking && !inString && currentChar === ' ') {
      tracking = false
      currentArg = ''
      continue
    } else if (currentChar !== ' ') {
      tracking = true
    }

    if (tracking) {
      currentArg += currentChar
      if (currentChar === '"') {
        inString = !inString
      }

      if (i === stripped.length - 1) {
        args.push(currentArg)
      } else if (stripped.charAt(i + 1) === ' ' && !inString) {
        args.push(currentArg)
      }
    }
  }
  return args
}

export const functionParse = (line, name) => {
  return ['fnParse', name, line]
}
