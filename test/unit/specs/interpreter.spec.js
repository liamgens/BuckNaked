import { interpreter } from '../../../src/bvm/interpreter'
import { Environment } from '../../../src/bvm/environment'

describe('interpreter.js', () => {
  it('test add good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'add x 1 x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(2)
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
    interpreter(code, envStack)
    console.log(envStack[0].scope)
  })
})
