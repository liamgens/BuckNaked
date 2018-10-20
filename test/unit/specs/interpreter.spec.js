import { interpreter } from '../../../src/bvm/interpreter'
import { Environment } from '../../../src/bvm/environment'

describe('interpreter.js', () => {
  it('declare variable and then replace it with addition', () => {
    let envStack = [new Environment({ scope: {}, functions: {} })]
    let code = ['var x 1', 'add x 1 x']
    interpreter(code, envStack)
    expect(envStack[0].getVariable('x')).to.eql(2)
  })
})
