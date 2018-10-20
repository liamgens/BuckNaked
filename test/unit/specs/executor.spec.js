import { execute } from '../../../src/bvm/executor'
import { Environment } from '../../../src/bvm/environment'

describe('executor.js', () => {
  it('add should be correctly evaluated', () => {
    let env = new Environment({ scope: { a: null }, functions: {} })
    execute({ inst: 'add', args: [0, 70000000, 'a'] }, env)
    expect(env.getVariable('a')).to.eql(70000000)
  })
  it('sub should be correctly evaluated', () => {
    let env = new Environment({ scope: { d: 'jeeberson' }, functions: {} })
    execute({ inst: 'sub', args: [-9234, -234, 'd'] }, env)
    expect(env.getVariable('d')).to.eql(-9000)
  })
  it('div should be correctly evaluated', () => {
    let env = new Environment({ scope: {}, functions: {} })
    execute({ inst: 'var', args: ['b', null] }, env)
    expect(env.getVariable('b')).to.be.null
    execute({ inst: 'div', args: [20, 4, 'b'] }, env)
    expect(env.getVariable('b')).to.eql(5)
  })
  it('mul should be correctly evaluated', () => {
    let env = new Environment({ scope: { test: 'oldVal' }, functions: {} })
    execute({ inst: 'set', args: ['test', 'newVal'] }, env)
    expect(env.getVariable('test')).to.eql('newVal')
    execute({ inst: 'mul', args: [100, -45, 'test'] }, env)
    expect(env.getVariable('test')).to.eql(-4500)
  })
  it('mod should be correctly evaluated', () => {
    let env = new Environment({ scope: { a: null }, functions: {} })
    execute({ inst: 'mod', args: [90, 7, 'a'] }, env)
    expect(env.getVariable('a')).to.eql(6)
  })
  it('var should be correctly evaluated', () => {
    let env = new Environment({ scope: { b: true }, functions: {} })
    execute({ inst: 'var', args: ['a', null] }, env)
    expect(env.getVariable('a')).to.be.null
    execute({ inst: 'var', args: ['c', false] }, env)
    expect(env.getVariable('c')).to.be.false
  })
  it('set should be correctly evaluated', () => {
    let env = new Environment({ scope: { piss: '1000' }, functions: {} })
    execute({ inst: 'set', args: ['piss', -345] }, env)
    expect(env.getVariable('piss')).to.eql(-345)
  })
})
