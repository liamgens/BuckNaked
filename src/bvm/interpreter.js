import { parse, functionParse } from './parser'
import { syntax } from './syntax'
import { validate } from './validator'
import { execute, sysout } from './executor'

export const interpreter = (code, env) => {
  let buildingFunction = false
  let functionName = ''
  for (let i = 0; i < code.length; i++) {
    if (!code[i].replace(/\s/g, '').length <= 0) {
      try {
        let args = parse(code[i])
        if (args[0] === 'fn') {
          if (buildingFunction) {
            throw new Error('A function cannot be declared inside of a function declaration')
          } else {
            buildingFunction = true
            functionName = execute(validate(syntax(parse(code[i])), env[0]), env[0])
            console.log(functionName)
            let fun = {
              code: [],
              params: args.slice(1)
            }
            env[0].addFunction(functionName, fun)
          }
        } else if (args[0] === 'return') {
          if (buildingFunction) {
            buildingFunction = false
          } else {
            throw new Error('\'return\' statement cannot be used outside of a function')
          }
        } else {
          if (buildingFunction) {
            execute(validate(syntax(functionParse(code[i], functionName)), env[0]), env[0])
          } else {
            execute(validate(syntax(parse(code[i])), env[0]), env[0])
          }
        }
      } catch (error) {
        sysout(`Error on line ${i + 1}: ${error.message}`)
        throw error
      }
    }
  }
  if (buildingFunction) {
    throw new Error('Error: End of file reached while still in function declaration')
  }
}
