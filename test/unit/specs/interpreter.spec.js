import { interpreter } from '../../../src/bvm/interpreter'
import { Environment } from '../../../src/bvm/environment'

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
})
