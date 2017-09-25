jest.mock('./isMatch')

import isMatch from './isMatch' // eslint-disable-line import/first
import isMatchAction from './isMatchAction' // eslint-disable-line import/first

describe('isMatchAction', () => {
  it('should invoke the isMatch with a full action if predicate is a function, otherwise with action.type', () => {
    const predicate = (a) => a.type === 'a'
    const action = { type: 'a' }
    isMatchAction(predicate, action)
    expect(isMatch.mock.calls[0][1]).toEqual(action)

    isMatchAction('a', action)
    expect(isMatch.mock.calls[1][1]).toEqual(action.type)
  })
})
