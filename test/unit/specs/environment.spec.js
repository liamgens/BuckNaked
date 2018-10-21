import { Environment } from '../../../src/bvm/environment'

describe('environment.js', () => {
  it('addVariable should correctly add a new variable to the scope', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addVariable('spaget', 7)
    expect(env.scope['spaget']).to.eql(7)
    expect(env.scope['spaget']).to.not.eql('micropenis')
  })
  it('addVariable should throw an error if the variable already exists', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addVariable('slickRick', 7)
    expect(() => env.addVariable('slickRick', 'piss')).to.throw(
      'Variable slickRick is already defined.'
    )
  })
  it('addVariable should throw an error if the variable is a function', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.functions['yoda'] = ['add x y z', 'sub 1 2 d']
    expect(() => env.addVariable('yoda', 69)).to.throw(
      'Variable yoda is already defined as a function.'
    )
  })
  it('setVariable should correctly update a variable in the the scope', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addVariable('frogger')
    expect(env.scope['frogger']).to.be.null
    env.setVariable('frogger', 'dead')
    expect(env.scope['frogger']).to.eql('dead')
    expect(env.scope['frogger']).to.be.not.null
  })
  it('setVariable should throw an error if the variable does not exist in the scope', () => {
    let env = new Environment({ scope: {}, functions: {} })
    expect(() => env.setVariable('foo', 'bar')).to.throw(
      'Variable foo not recognized.'
    )
  })
  it('getVariable should correctly return the variable from the scope', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addVariable('x', 100)
    expect(env.getVariable('x')).to.eql(100)
  })
  it('getVarible should throw an error if the variable does not exist in the scope', () => {
    let env = new Environment({ scope: {}, functions: {} })
    expect(() => env.getVariable('rogerDodger')).to.throw(
      'Variable rogerDodger not recognized.'
    )
  })
  it('addFunction should correctly add a function to the functions scope', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addFunction('fun1', ['add 1 2 d', 'mod x y z'])
    expect(env.functions['fun1']).to.eql(['add 1 2 d', 'mod x y z'])
  })
  it('addFunction should throw an error if the function already exists', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addFunction('red', ['add 1 2 d', 'mod x y z'])
    expect(() => env.addFunction('red', ['sub 45 45 d'])).to.throw(
      'Function red already exists.'
    )
  })
  it('addFunction should throw an error if the function name is already a variable', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addVariable('mitch', 'teasdf   nnis')
    expect(() => env.addFunction('mitch', ['sub 45 45 d'])).to.throw(
      'Variable mitch already exists.'
    )
  })
  it('getFunction should correctly return the function code', () => {
    let env = new Environment({ scope: {}, functions: {} })
    env.addFunction('suckMeOff', ['mul 1 1 c'])
    expect(env.getFunction('suckMeOff')).to.eql(['mul 1 1 c'])
  })
  it('getFunction should throw an error if the function does not exist', () => {
    let env = new Environment({ scope: {}, functions: {} })
    expect(() => env.getFunction('smallChild')).to.throw(
      'Function smallChild not recognized.'
    )
  })
})
