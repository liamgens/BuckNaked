import { getType } from '../../../src/bvm/types'

describe('validator.js', () => {
  it('should return \'num\' when passed in a numerical value', () => {
    let expected = ['100', '1004.1']
    for (let i = 0; i < expected.length; i++) {
      expect(getType(expected[i])).eql('num')
    }
  })
  it('should return \'string\' when passed in a string value', () => {
    let expected = ['"farmer McNaBB"', '"RIP Dave Coulier"', '""']
    for (let i = 0; i < expected.length; i++) {
      expect(getType(expected[i])).eql('string')
    }
  })
  it('should return \'name\' when passed in a name value', () => {
    let expected = ['farmerMcNaBB', 'slickRick']
    for (let i = 0; i < expected.length; i++) {
      expect(getType(expected[i])).eql('name')
    }
  })
  it('should return \'bool\' when passed in a bool value', () => {
    let expected = ['false', 'true']
    for (let i = 0; i < expected.length; i++) {
      expect(getType(expected[i])).eql('bool')
    }
  })
  it('should throw an error if an empty string is passed in', () => {
    let empty = ''
    expect(() => { getType(empty) }).throw('Cannot get the type of an empty string')
  })
})
