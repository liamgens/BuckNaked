import { interpreter, copyChangedEnvironmentVariables, enterNewBlock, getRanCommands } from '../../../src/bvm/interpreter'
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
  })

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

  // //////////////////////////////////////////////////////////////////////
  // GETTING COMMANDS RAN TESTS
  // //////////////////////////////////////////////////////////////////////
  it('getting ran commands works with no errors', () => {
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
      'end',
      'var z 1',
      'add z z z'
    ]
    let expected = [
      'var x true',
      'var y false',
      'if true',
      'if false',
      'else',
      'set x false',
      'end',
      'end',
      'var z 1',
      'add 1 1 z'
    ]
    interpreter(code, envStack)
    let returnedCode = getRanCommands()
    console.log(returnedCode)
    for (var i = 0; i < code.length; ++i) {
      expect(expected[i]).to.eql(returnedCode[i])
    }
  })
  it('getting ran commands works with error', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = [
      'var x true',
      'var y false',
      'if x',
      'div 0 0 x',
      'if y',
      'set y true',
      'else',
      'set x false',
      'end',
      'end'
    ]
    let expected = [
      'var x true',
      'var y false',
      'if true'
    ]
    try {
      interpreter(code, envStack)
    } catch (e) {}
    let returnedCode = getRanCommands()
    console.log(returnedCode)
    for (var i = 0; i < code.length; ++i) {
      expect(expected[i]).to.eql(returnedCode[i])
    }
  })
})
