export class Environment {
  constructor (parentEnv) {
    this.scope = parentEnv.scope
    this.functions = parentEnv.functions
  }
  getScope () {
    return this.scope
  }
  getFunctions () {
    return this.functions
  }
  addVariable (name, value) {
    if (value === undefined) {
      value = null
    }
    if (name in this.scope) {
      throw new Error(`Variable ${name} is already defined.`)
    } else if (name in this.functions) {
      throw new Error(`Variable ${name} is already defined as a function.`)
    }
    this.scope[name] = value
  }
  setVariable (name, value) {
    if (name in this.scope) {
      this.scope[name] = value
    } else {
      throw new Error(`Variable ${name} not recognized.`)
    }
  }
  getVariable (name) {
    if (name in this.scope) {
      return this.scope[name]
    }
    throw new Error(`Variable ${name} not recognized.`)
  }
  addFunction (name, fn) {
    if (name in this.functions) {
      throw new Error(`Function ${name} already exists.`)
    } else if (name in this.scope) {
      throw new Error(`Variable ${name} already exists.`)
    }
    this.functions[name] = fn
  }
  getFunction (name) {
    if (name in this.functions) {
      return this.functions[name]
    }
    throw new Error(`Function ${name} not recognized.`)
  }
  updateFunction (name, code) {
    if (name in this.functions) {
      this.functions[name].code = this.functions[name].code.concat([code])
    }
  }
}
