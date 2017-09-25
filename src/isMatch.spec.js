import isMatch from './isMatch'

describe('isMatch', () => {
  it('should support RegExp', () => {
    expect(isMatch(/\d/, 1)).toBe(true)
    expect(isMatch(/\d/, 'a')).toBe(false)
  })
  it('should support String', () => {
    expect(isMatch('a', 'a')).toBe(true)
    expect(isMatch('a', 'b')).toBe(false)
  })
  it('should support Array', () => {
    expect(isMatch(['a', 'b'], 'a')).toBe(true)
    expect(isMatch(['a', 'b'], 'c')).toBe(false)
  })
  it('should support Function', () => {
    const predicate = (a) => a === 'a'
    expect(isMatch(predicate, 'a')).toBe(true)
    expect(isMatch(predicate, 'c')).toBe(false)

    const predicateSpy = jest.fn()
    isMatch(predicateSpy, 'a')
    expect(predicateSpy.mock.calls[0]).toEqual(['a'])
  })
})
