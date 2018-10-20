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

  it('should throw an error if the first argument in a var or set command is not a name', () => {
    let instSet = {
      inst: 'var',
      args: ['1.5', 'false']
    }
    expect(function () { typecheck(instSet, {}) }).throw('var operation requires a destination')
  })

  it('should validate a normal var, or set instruction with no issues', () => {
    let instSet1 = {
      inst: 'var',
      args: ['JebBushHasHighCholesterol', 'false']
    }
    let instSet4 = {
      inst: 'var',
      args: ['JebBushHasHighCholesterol']
    }
    let instSet2 = {
      inst: 'set',
      args: ['JebBushHasHighCholesterol', 'false']
    }
    let instSet3 = {
      inst: 'var',
      args: ['JebBushHasHighCholesterol', null]
    }
    typecheck(instSet1, {})
    typecheck(instSet2, {})
    typecheck(instSet3, {})
    typecheck(instSet4, {})
  })

  it('should throw an error if an add instruction does not have a destination as its final argument', () => {
    let instSet1 = {
      inst: 'add',
      args: ['1', '2', 'false']
    }

    expect(function () { typecheck(instSet1, {}) }).throw('add operation requires a destination')
  })

  it('should throw an error if a destination is a keyword', () => {
    let instSet1 = {
      inst: 'add',
      args: ['1', '2', 'div']
    }
    let instSet2 = {
      inst: 'var',
      args: ['add']
    }

    expect(function () { typecheck(instSet1, {}) }).throw('Variable naming error: div is a keyword')
    expect(function () { typecheck(instSet2, {}) }).throw('Variable naming error: add is a keyword')
  })

  it('should throw an error if an instruction tries to divide by 0', () => {
    let instSet1 = {
      inst: 'div',
      args: ['0', '0', 'di']
    }

    expect(function () { typecheck(instSet1, {}) }).throw('Divide by zero error')
  })
})
