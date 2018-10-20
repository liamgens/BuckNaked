import { typecheck, getArgTypes } from '../../../src/bvm/validator'
import { Environment } from '../../../src/bvm/environment'

describe('validator.js', () => {
  it('should return an array with three num types', () => {
    let expected = ['num', 'num', 'num']
    let actual = getArgTypes(['1.20', '1.0', '1004.1'], {})
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).eql(expected[i])
    }
  })

  it('should return a set containing only bool type', () => {
    let expected = ['bool', 'bool', 'bool']
    let actual = getArgTypes(['true', 'false', 'false'], {})
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).eql(expected[i])
    }
  })

  it('should return a set containing only string type', () => {
    let expected = ['string', 'string', 'string']
    let actual = getArgTypes(['"oink"', '"spoughite"', '"Farmer McNabb"'], {})
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).eql(expected[i])
    }
  })

  it('getArgTypes should return a set of the types of the values of the variables passed in', () => {
    let expected = ['string', 'string', 'num', 'bool']
    let env = new Environment({ scope: { }, functions: { } })
    env.addVariable('string1', '"SlickRick"')
    env.addVariable('string2', '"SlackRack"')
    env.addVariable('num1', '69.420')
    env.addVariable('BrendanIsHandsome', 'false')
    let actual = getArgTypes(['string1', 'string2', 'num1', 'BrendanIsHandsome'], env)
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).eql(expected[i])
    }
  })

  it('should return \'name\' when a name that has not been assigned yet is passed in', () => {
    let expected = ['name', 'name']
    let env = new Environment({ scope: { }, functions: { } })
    let actual = getArgTypes(['string1', 'string2'], env)
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).eql(expected[i])
    }
  })

  it('should throw an error when operands for math operations are different types', () => {
    let instSet = {
      inst: 'add',
      args: ['1.5', 'false', 'dest']
    }
    expect(function () { typecheck(instSet, {}) }).throw('Operation and operand types did not match')
  })

  it('should throw an error when operand types do not match operator types', () => {
    let instSet = {
      inst: 'add',
      args: ['1.5', 'false', 'dest']
    }
    expect(function () { typecheck(instSet, {}) }).throw('Operation and operand types did not match')
  })

  it('should throw an error when operand types do not match operator types', () => {
    let instSet = {
      inst: 'add',
      args: ['1.5', 'false', 'dest']
    }
    expect(function () { typecheck(instSet, {}) }).throw('Operation and operand types did not match')
  })
})
