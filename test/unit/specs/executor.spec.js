import { execute } from '../../../src/bvm/executor'
import { Environment } from '../../../src/bvm/environment'

describe('executor.js', () => {
  it('should just work', () => {
    let env = new Environment({ scope: { b: null }, functions: {} })
    execute({ inst: 'div', args: [1, 0, 'b'] }, env)
  })
})
