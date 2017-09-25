
import middleware from './index'

describe('redux-rollbar-telemetry-middleware', () => {
  let rollbarMock
  let store
  let next

  const dispatch = (action, options) => middleware(rollbarMock, options)(store)(next)(action)

  beforeEach(() => {
    rollbarMock = {
      captureEvent: jest.fn(),
    }
    store = {}
    next = jest.fn()
  })

  describe('options', () => {
    describe('pattern', () => {
      it('should filter the action.type using the pattern', () => {
        dispatch({ type: 'SOME_ACTION' }, { pattern: ['SOME_ACTION'] })
        dispatch({ type: 'SOME_ACTION_1' }, { pattern: ['SOME_ACTION'] })
        expect(rollbarMock.captureEvent.mock.calls.length).toBe(1)
      })
      it('should not filter the actions by default', () => {
        dispatch({ type: 'SOME_ACTION' })
        dispatch({ type: 'SOME_ACTION_1' })
        expect(rollbarMock.captureEvent.mock.calls.length).toBe(2)
      })
      it('should filter the whole action using the pattern', () => {
        const options = {
          pattern: action => action.type.indexOf('SOME_ACTION') !== -1,
        }
        dispatch({ type: 'SOME_ACTION_1'}, options)
        dispatch({ type: 'SOME_ACTION'}, options)
        dispatch({ type: 'ANOTHER_ACTION'}, options)
        dispatch({ type: 'ANOTHER_ACTION'}, options)
        expect(rollbarMock.captureEvent.mock.calls.length).toBe(2)
      })
      it('should pass to the next middlewares all the actions', () => {
        const options = {
          pattern: 'SOME_ACTION'
        }
        dispatch({ type: 'SOME_ACTION' }, options)
        dispatch({ type: 'ANOTHER_ACTION' }, options)
        expect(next.mock.calls.length).toBe(2)
      })
    })
    describe('errorLogType', () => {
      it('should send errorLogType to captureEvent, if action has error property', () => {
        dispatch({ type: 'SOME_ACTION', error: {}}, { errorLogType: 'errorType' })
        expect(rollbarMock.captureEvent.mock.calls[0][1]).toBe('errorType')
      })
      it('should send default value to captureEvent', () => {
        dispatch({ type: 'SOME_ACTION', error: {}})
        expect(rollbarMock.captureEvent.mock.calls[0][1]).toBeDefined()
      })
    })
    describe('defaultLogType', () => {
      it('should send defaultLogType to captureEvent, if action has not error property', () => {
        dispatch({ type: 'SOME_ACTION' }, { defaultLogType: 'defaultLogType' })
        expect(rollbarMock.captureEvent.mock.calls[0][1]).toBe('defaultLogType')
      })
      it('should send default value to captureEvent', () => {
        dispatch({ type: 'SOME_ACTION' })
        expect(rollbarMock.captureEvent.mock.calls[0][1]).toBeDefined()
      })
    })
  })

  describe('transform the action before submit', () => {
    it('should not transform the action by default', () => {
      const action = { type: 'SOME_ACTION' }
      dispatch(action)
      expect(rollbarMock.captureEvent.mock.calls[0][0]).toEqual({ type: 'SOME_ACTION' })
    })
    it('should transform the action is it is presented', () => {
      const options = {
        transformations: [{
          pattern: '*', transformation: action => ({ type: `${action.type}_TRANSFORMED` })
        }, {
          pattern: 'SOME_ACTION', transformation: action => ({ ...action, meta: { test: true }})
        }]
      }
      dispatch({ type: 'SOME_ACTION' }, options)
      dispatch({ type: 'ANOTHER_ACTION' }, options)
      expect(rollbarMock.captureEvent.mock.calls[0][0]).toEqual({ type: 'SOME_ACTION_TRANSFORMED', meta: { test: true } })
      expect(rollbarMock.captureEvent.mock.calls[1][0]).toEqual({ type: 'ANOTHER_ACTION_TRANSFORMED' })
    })
  })
})
