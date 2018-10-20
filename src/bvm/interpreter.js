import { parse } from './parser'
import { syntax } from './syntax'
import { validate } from './validator'
import { execute } from './executor'

export const interpreter = (code, env) => {
  for (let i = 0; i < code.length; i++) {
    execute(validate(syntax(parse(code[i]))), env[0])
  }
}
