import { interpreter, copyChangedEnvironmentVariables, enterNewBlock } from '../../../src/bvm/interpreter'
import { Environment } from '../../../src/bvm/environment'
import { actualValueOf } from '../../../src/bvm/validator'

describe('interpreter.js', () => {
  // //////////////////////////////////////////////////////////////////////
  // LOOPS AND CONDITIONALS TESTS
  // //////////////////////////////////////////////////////////////////////
  it('test ending while loop with else fail', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'while false',
      'else',
      'var t'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Incorrect end to \'while\' block'
    )
  })
  it('test not closing while loop', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'while false',
      'var x',
      'var t'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Incorrect end to \'while\' block'
    )
  })
  it('test not closing if block', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'if false',
      'var x',
      'var t'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Incorrect end to \'if\' block'
    )
  })
  it('test setting old variables new values each time a new environment is exited', () => {
    let envStack = [new Environment({ scope: {
      'oink': 'oink',
      'oink2': 'sploink'
    },
    functions: {} }), new Environment({ scope: {
      'oink': 'sploink',
      'oink2': 'oink',
      'oink3': 'fdsfasd'
    },
    functions: {} })]
    copyChangedEnvironmentVariables(envStack, 1)
    expect(JSON.stringify(envStack[0])).to.eql('{"scope":{"oink":"sploink","oink2":"oink"},"functions":{}}')
  })
  it('test cloning an Environment object', () => {
    let envStack = [new Environment({ scope: {
      'oink': 'oink',
      'oink2': 'sploink'
    },
    functions: {} })]
    enterNewBlock(envStack, 0)
    expect(JSON.stringify(envStack[1])).to.eql('{"scope":{"oink":"oink","oink2":"sploink"},"functions":{}}')
  })
  it('while loop single run good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var y 1',
      'while x',
      'set y 2',
      'set x false',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('y', envStack[0])).to.eql(2)
    expect(actualValueOf('x', envStack[0])).to.eql('false')
  })
  it('while loop double run good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var x2 true',
      'var y 1',
      'while x',
      'set x x2',
      'not x2 x2',
      'add y y y',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('y', envStack[0])).to.eql(4)
    expect(actualValueOf('x', envStack[0])).to.eql(false)
  })
  it('if statement entered good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var y 1',
      'if x',
      'add y y y',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('y', envStack[0])).to.eql(2)
  })
  it('if statement skipped good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x false',
      'var y 1',
      'if x',
      'add y y y',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('y', envStack[0])).to.eql(1)
  })
  it('else statement entered good', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x false',
      'var y 1',
      'if x',
      'add y y y',
      'else',
      'add y 2 y',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('y', envStack[0])).to.eql(3)
  })
  it('scoping in single block doesnt carry over to parent block', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var y 1',
      'if x',
      'var z 2',
      'end',
      'print z'
    ]
    expect(() => interpreter(code, envStack)).to.throw(
      'Cannot print z because it has not been assigned a value'
    )
  })
  it('changing variable in single block does carry over to parent block', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var y 1',
      'var z 1',
      'if x',
      'set z 2',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('z', envStack[0])).to.eql(2)
  })
  it('nested if else works correctly', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var y false',
      'if x',
      'if y',
      'set y true',
      'else',
      'set x false',
      'end',
      'end'
    ]
    interpreter(code, envStack)
    expect(actualValueOf('y', envStack[0])).to.eql('false')
    expect(actualValueOf('x', envStack[0])).to.eql('false')
  })
})
