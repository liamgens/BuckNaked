import { interpreter } from '../../../src/bvm/interpreter'
import { Environment } from '../../../src/bvm/environment'
import { actualValueOf } from '../../../src/bvm/validator'

// eslint-disable spaced-comment
describe('interpreter.js', () => {
  it('test add good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y x', 'add y 1 y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(2)
  })
  it('test mul good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var tinyTeen',
      'set tinyTeen 9',
      'var richie',
      'mul tinyTeen -8 richie'
    ]
    interpreter(code, envStack)
    expect(envStack[0].getVariable('richie')).to.eql(-72)
  })
  it('test mul long', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var tinyTeen',
      'set tinyTeen 9',
      'var richie',
      'mul tinyTeen -8 richie',
      'var bustyRedhead -1',
      'var BBW 10',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW'
    ]
    interpreter(code, envStack)
    expect(envStack[0].getVariable('richie')).to.eql(-72)
    expect(envStack[0].getVariable('BBW'))
  })
  it('test sub good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var u 8', 'var x', 'sub u -1 x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(9)
  })
  it('test div good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var op1 45', 'var op2 9', 'var result', 'div op1 op2 result']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('result')).to.eql(5)
  })
  it('test add bad', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x seven', 'add x x x']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
  })
  it('test mul bad', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var red true', 'mul red 8 red']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
  })
  it('test sub bad', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var penis "ayybb"', 'sub penis "piss" penis']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
  })
  it('test div bad', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var fig 23', 'div fig "0" fig']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
  })
  it('test math div by zero', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var fig 23',
      'sub fig 23 fig',
      'div fig 0 fig'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Divide by zero error'
    )
  })
  it('test var bad names', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var 2b3'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Variable names must start with a letter'
    )
  })
  it('test no keyword variables', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var set'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Variable naming error: set is a keyword'
    )
  })
  it('test no destination', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'set 51 oink'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'set operation requires a destination'
    )
  })
  // //////////////////////////////////////////////////////////////////////
  // BOOLEAN ALGEBRA TESTS
  // //////////////////////////////////////////////////////////////////////

  it('test and good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y false', 'and y x y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(false)
  })
  it('test and good long', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y true', 'and y x y', 'and y y y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(true)
  })
  it('test and operation throws error for wrong types and then error for wrong number of args', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'and y x y', 'and y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
    code = ['and y x true y', 'and y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Expected 3 args but got 4'
    )
  })
  it('test or good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y false', 'or y x y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(true)
  })
  it('test but good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y false', 'but y x y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(true)
  })
  it('test or good long', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x false', 'var y false', 'or y x y', 'or y y y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(false)
  })
  it('test or operation throws error for wrong types and then error for wrong number of args', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'or y x y', 'or y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
    code = ['or y x true y', 'or y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Expected 3 args but got 4'
    )
  })
  it('test not good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y', 'not x y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(false)
  })
  it('test not good long', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y true', 'not y x', 'not x y']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('y')).to.eql(true)
  })
  it('test not operation throws error for wrong types and then error for wrong number of args', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'not y y', 'and y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
    code = ['not y x y', 'and y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Expected 2 args but got 3'
    )
  })
<<<<<<< HEAD
  it('test leq good true', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'leq x y x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(true)
  })
  it('test leq good false', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'leq y x x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(false)
  })
  it('test leq operation throws error for wrong types and then error for wrong number of args', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y 2', 'leq x y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
    code = ['leq x y', 'and y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Expected 3 args but got 2'
    )
  })
  it('test geq good false', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'geq x y x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(false)
  })
  it('test geq good true', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'geq y x x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(true)
  })
  it('test geq operation throws error for wrong types and then error for wrong number of args', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y 2', 'geq x y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Operation and operand types did not match'
    )
    code = ['geq x y', 'and y y y']
    expect(() => interpreter(code, envStack)).to.throw(
      'Expected 3 args but got 2'
    )
  })
  it('test equals good false', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 2', 'equals x y x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(false)
  })
  it('test equals good true', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'var y 1', 'equals y x x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(true)
  })
  it('test geq good true string', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x "oink"', 'var y "oink"', 'equals x y x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(true)
  })
  it('test geq good true boolean', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'var y true', 'equals y x x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(true)
=======
  // //////////////////////////////////////////////////////////////////////
  // FUNCTIONS TESTS
  // //////////////////////////////////////////////////////////////////////

  it('test declaring function inside function throws error', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'fn y', 'fn y', 'return']
    expect(() => interpreter(code, envStack)).to.throw(
      'A function cannot be declared inside of a function declaration'
    )
  })
  it('test declaring function bad EOF', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'fn y', 'var x']
    expect(() => interpreter(code, envStack)).to.throw(
      'Error: End of file reached while still in function declaration'
    )
  })
  it('test declaring function good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x true', 'fn y',
      'var tinyTeen',
      'set tinyTeen 9',
      'var richie',
      'mul tinyTeen -8 richie',
      'var bustyRedhead -1',
      'var BBW 10',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'return']
    interpreter(code, envStack)
    expect(envStack[0].getFunction('y').code).to.eql([
      'var tinyTeen',
      'set tinyTeen 9',
      'var richie',
      'mul tinyTeen -8 richie',
      'var bustyRedhead -1',
      'var BBW 10',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'mul bustyRedhead BBW BBW',
      'return'
    ])
  })
  it('test call good, return value', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return x',
      'var t',
      'call y 1 2 t',
      'var q t'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('q', envStack[0])).to.eql(3)
  })
  it('test call good, no return value', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return',
      'var t',
      'call y 1 2'
    ]
    interpreter(code, envStack)
  })
  it('test putting return command outside of a function throws error', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return',
      'var t',
      'call y 1 2',
      'return'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      '\'return\' statement cannot be used outside of a function'
    )
  })
  it('test putting return command outside of a function throws error', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return',
      'var t',
      'call y 1 2',
      'return'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      '\'return\' statement cannot be used outside of a function'
    )
  })
  it('test putting return command outside of a function throws error', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return',
      'var t',
      'call y 1 2',
      'return'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      '\'return\' statement cannot be used outside of a function'
    )
  })
  it('test putting return command with more than one arguments bad', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return x y',
      'var t',
      'call y 1 2'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'a function can only return one value'
    )
  })
  it('test calling function with incorrect amount of parameters', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['fn y x z',
      'add x z x',
      'return x',
      'var t',
      'call y 1 2 41 "oink"'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Incorrect number of parameters for function y'
    )
>>>>>>> Functions#15
  })
})
