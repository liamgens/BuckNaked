import { syntax } from '../../../src/bvm/syntax'

describe('syntax.js', () => {
  it('should throw an error when there are no arguments', () => {
    expect(() => syntax([])).to.throw('Instruction not found.')
  })
  it('should throw an error when there are too little arguments', () => {
    expect(() => syntax(['add', 1, 5])).to.throw('Expected 3 args but got 2')
  })
  it('should throw an argument when there are too many arguments', () => {
    expect(() => syntax(['sub', 34, -92, 23, 'd'])).to.throw(
      'Expected 3 args but got 4'
    )
  })
  it('should throw an error when the instruction does not exist', () => {
    expect(() => syntax(['spaget', 55, 2, 'd'])).to.throw(
      'Instruction not found.'
    )
  })
  it('should return an object containing the instruction and the arguments', () => {
    expect(syntax(['add', -9, 200, 'd'])).to.eql({
      inst: 'add',
      args: [-9, 200, 'd']
    })
  })
})
