import { parse } from '../../../src/bvm/parser'

describe('parser.js', () => {
  it('should remove all whitespace and add each argument to an array of strings', () => {
    expect(parse('   test    2  ')).eql(['test', '2'])
  })
  it('should return an empty array when there is only whitespace', () => {
    expect(parse('               ')).eql([])
  })
  it('should return an empty array when there is an empty string', () => {
    expect(parse('')).eql([])
  })
})
