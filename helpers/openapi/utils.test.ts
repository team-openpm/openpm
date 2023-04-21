import {commonPrefix} from './utils'

describe('commonPrefix', () => {
  it('returns the common prefix from a set of paths', () => {
    expect(
      commonPrefix(['/api/dogs', '/api/dogs/breeds', '/api/cats', '/api/cats/breeds']),
    ).toEqual('/api/')
  })

  it('returns the common prefix', () => {
    expect(commonPrefix(['/dogs/show', '/dogs'])).toEqual('')
  })

  it('returns the common prefix', () => {
    expect(commonPrefix(['/pets', '/pets/{petId}'])).toEqual('')
  })

  it('returns / if there is no common prefix', () => {
    expect(commonPrefix(['/dogs', '/cats'])).toEqual('/')
  })
})
