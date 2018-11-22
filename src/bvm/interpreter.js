import { parse, functionParse } from './parser'
import { syntax } from './syntax'
import { validate, actualValueOf } from './validator'
import { execute, sysout } from './executor'
import { Environment } from './environment.js'
import { getType } from './types.js'

export const interpreter = (code, env, currentEnv = 0) => {
  let buildingFunction = false
  let functionName = ''
  var returnVal
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
              params: args.slice(2)
            }
            env[0].addFunction(functionName, fun)
          }
        } 
        // Call logic
        else if (args[0] === 'call') {
          call(code, functionName, env, i, currentEnv, args)
        } 
        // normal execution logic
        else {
          [buildingFunction, returnVal] = doExecutes(buildingFunction, code, functionName, env, i, currentEnv, args)
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
  return returnVal
}

const call = (code, functionName, env, i, currentEnv, args) => {
  env.push(new Environment({ scope: {}, functions: {} }))
  currentEnv = currentEnv + 1
  let currentFunction = env[0].getFunction(args[1])
  let argsToSet = currentFunction.dest === undefined ? args.slice(2) : args.slice(2, args.length - 1)
  let dest = currentFunction.dest === undefined ? undefined : args[args.length - 1]
  let paramsToSet = currentFunction.params
  if (argsToSet.length !== paramsToSet.length) {
    console.log(args.slice(2, args.length).length)
    console.log(paramsToSet.length)
    throw new Error(`Incorrect number of parameters for function ${args[1]}`)
  }
  for (let x = 0; x < argsToSet.length; x++) {
    env[currentEnv].addVariable(paramsToSet[x], actualValueOf(argsToSet[x], env[currentEnv - 1]))
  }
  let destVal = interpreter(currentFunction.code, env, currentEnv)
  currentEnv = currentEnv - 1
  env.pop()
  if (destVal !== undefined && dest !== undefined) {
    env[currentEnv].setVariable(dest, destVal)
  }
}

const doExecutes = (buildingFunction, code, functionName, env, i, currentEnv, args) => {
  if (buildingFunction) {
    if (args[0] === 'return') {
      if (args.length > 1) {
        if (args.length > 2) {
          throw new Error('a function can only return one value')
        } else {
          let actualVal = actualValueOf(args[1], env[currentEnv])
          env[currentEnv].getFunction(functionName, env[currentEnv]).dest = actualVal
        }
      }
      execute(validate(syntax(functionParse(code[i], functionName)), env[currentEnv]), env[currentEnv])
      return [false]
    } else {
      execute(validate(syntax(functionParse(code[i], functionName)), env[currentEnv]), env[currentEnv])
      return [true]
    }
  } else {
    if (args[0] === 'return') {
      if (currentEnv === 0) {
        throw new Error('\'return\' statement cannot be used outside of a function')
      } else {
        let actualVal = args[1] === undefined ? undefined : actualValueOf(args[1], env[currentEnv])
        if (actualVal !== undefined && getType(actualVal) === 'name') throw new Error(`Variable ${actualVal} not defined`)
        return [false, actualVal]
      }
    }
    execute(validate(syntax(parse(code[i])), env[currentEnv]), env[currentEnv])
    return [false]
  }
}
