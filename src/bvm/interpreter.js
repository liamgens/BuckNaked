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
    currentEnv = env.length - 1
    if (!code[i].replace(/\s/g, '').length <= 0) {
      try {
        let args = parse(code[i])
        if (args[0] === 'fn') {
          if (buildingFunction) {
            throw new Error('A function cannot be declared inside of a function declaration')
          } else {
            buildingFunction = true
            functionName = execute(validate(syntax(parse(code[i])), env[0]), env[0])
            let fun = {
              code: [],
              params: args.slice(2)
            }
            env[0].addFunction(functionName, fun)
          }
        } else if (args[0] === 'call' && !buildingFunction) {
          call(code, functionName, env, i, currentEnv, args)
        } else if ((args[0] === 'while' || args[0] === 'if') && !buildingFunction) {
          console.log(env[currentEnv])
          i = conditional(code, env, i, currentEnv, args)
          currentEnv = currentEnv + 1
        } else if ((args[0] === 'end' || args[0] === 'else') && !buildingFunction) {
          i = elseAndEnd(code, env, i, currentEnv, args)
        } else {
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

const conditional = (code, env, i, currentEnv, args) => {
  let enterLoop = execute(validate(syntax(parse(code[i])), env[currentEnv]), env[currentEnv])
  if (enterLoop === 'true' || enterLoop === true) {
    // conditional evaluates to true
    currentEnv = enterNewBlock(env, currentEnv)
    if (args[0] === 'while') {
      env[currentEnv].returnLine = i
    }
    return i
  } else {
    // conditional evaluates to false
    return findEndOfBlock(code, env, i, currentEnv, args[0])
  }
}

export const enterNewBlock = (env, currentEnv) => {
  env.push(new Environment(env[currentEnv]))
  return currentEnv + 1
}

const findEndOfBlock = (code, env, i, currentEnv, type) => {
  for (let x = i + 1; x < code.length; ++x) {
    let argsInner = parse(code[x])
    if (argsInner[0] === 'else') {
      if (type === 'while') {
        throw new Error('Incorrect end to \'while\' block')
      } else {
        currentEnv = enterNewBlock(env, currentEnv)
        return x
      }
    } else if (argsInner[0] === 'end' || code[x] === 'end') {
      return x
    }
  }
  throw new Error(`Incorrect end to '${type}' block`)
}

// --currenEnv after calling this in main method
const elseAndEnd = (code, env, i, currentEnv, args) => {
  if (env[currentEnv].returnLine !== undefined) {
    if (args[0] === 'else') {
      throw new Error('Incorrect end to \'while\' block')
    } else {
      i = env[currentEnv].returnLine - 1
    }
  } else {
    if (args[0] === 'else') {
      i = findEndOfBlock(code, env, i, currentEnv, 'while')
    }
  }
  copyChangedEnvironmentVariables(env, currentEnv)
  return i
}

export const copyChangedEnvironmentVariables = (env, currentEnv) => {
  let current = env[currentEnv].scope
  let last = env[currentEnv - 1].scope
  for (var key in last) {
    last[key] = current[key]
  }
  env.pop()
}
