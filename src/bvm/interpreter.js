import { parse } from './parser'
import { syntax } from './syntax'
import { validate } from './validator'
import { execute, sysout } from './executor'

export const interpreter = (code, env) => {
  for (let i = 0; i < code.length; i++) {
    if (!code[i].replace(/\s/g, '').length <= 0) {
      try {
        execute(validate(syntax(parse(code[i])), env[0]), env[0])
      } catch (error) {
        sysout(`Error on line ${i + 1}: ${error.message}`)
        throw error
      }
    }
  }
}
