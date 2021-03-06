import { validate, getArgTypes } from '../../../src/bvm/validator'
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
    let env = new Environment({ scope: {}, functions: {} })
    env.addVariable('string1', '"SlickRick"')
    env.addVariable('string2', '"SlackRack"')
    env.addVariable('num1', '69.420')
    env.addVariable('BrendanIsHandsome', 'false')
    let actual = getArgTypes(
      ['string1', 'string2', 'num1', 'BrendanIsHandsome'],
      env
    )
    for (let i = 0; i < expected.length; i++) {
      expect(actual[i]).eql(expected[i])
    }
  })

  it("should return 'name' when a name that has not been assigned yet is passed in", () => {
    let expected = ['name', 'name']
    let env = new Environment({ scope: {}, functions: {} })
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
    expect(function () {
      validate(instSet, {})
    }).throw('Operation and operand types did not match')
  })

  it('should throw an error when operand types do not match operator types', () => {
    let instSet = {
      inst: 'add',
      args: ['1.5', 'false', 'dest']
    }
    expect(function () {
      validate(instSet, {})
    }).throw('Operation and operand types did not match')
  })

  it('should throw an error when operand types do not match operator types', () => {
    let instSet = {
      inst: 'add',
      args: ['1.5', 'false', 'dest']
    }
    expect(function () {
      validate(instSet, {})
    }).throw('Operation and operand types did not match')
  })

  it('should throw an error if the first argument in a var or set command is not a name', () => {
    let instSet = {
      inst: 'var',
      args: ['1.5', 'false']
    }
    expect(function () {
      validate(instSet, {})
    }).throw('var operation requires a destination')
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
    let instSet5 = {
      inst: 'add',
      args: ['x', 1, 'x']
    }
    let env = new Environment({ scope: { }, functions: { } })
    env.addVariable('x', '7')
    validate(instSet1, {})
    validate(instSet2, {})
    validate(instSet3, {})
    validate(instSet4, {})
    expect(validate(instSet5, env)).eql(instSet5)
  })

  it('should throw an error if an add instruction does not have a destination as its final argument', () => {
    let instSet1 = {
      inst: 'add',
      args: ['1', '2', 'false']
    }

    expect(function () {
      validate(instSet1, {})
    }).throw('add operation requires a destination')
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

    expect(function () {
      validate(instSet1, {})
    }).throw('Variable naming error: div is a keyword')
    expect(function () {
      validate(instSet2, {})
    }).throw('Variable naming error: add is a keyword')
  })

  it('should throw an error if an instruction tries to divide by 0', () => {
    let instSet1 = {
      inst: 'div',
      args: ['0', '0', 'di']
    }

    expect(function () {
      validate(instSet1, {})
    }).throw('Divide by zero error')
  })

  it('should return the original input if successful', () => {
    let instSet1 = {
      inst: 'div',
      args: ['0', '1', 'di']
    }
    let returnedInstSet = validate(instSet1, { scope: {}, functions: {} })
    expect(returnedInstSet).eql(instSet1)
  })

  it('should throw an error if a variable with a name not beginning with a letter is declared', () => {
    let instSet1 = {
      inst: 'var',
      args: ['0fdsa']
    }

    expect(function () {
      validate(instSet1, { scope: {}, functions: {} })
    }).throw('Variable names must start with a letter')
  })

  it('should throw an error if a user tries to print a name that has not been assigned yet', () => {
    let instSet1 = {
      inst: 'print',
      args: ['fdsa']
    }

    expect(function () {
      validate(instSet1, { scope: {}, functions: {} })
    }).throw('Cannot print fdsa because it has not been assigned a value')
  })
})
