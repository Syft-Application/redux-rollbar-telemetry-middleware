import { get } from 'lodash'
import isMatchAction from './isMatchAction'

const applyTransformations = (transformations, action) =>
  transformations
  .filter(i => isMatchAction(i.pattern, action))
  .reduce((prevResult, transformItem) => transformItem.transformation(prevResult), action)

export default (rollbar, {
  errorLogType = 'warning',
  defaultLogType = 'debug',
  pattern,
  transformations = [],
} = {}) => store => next => action => {

  if (!pattern || isMatchAction(pattern, action)) {
    const transformedAction = applyTransformations(transformations, action)
    rollbar.captureEvent(transformedAction, get(action, 'error') ? errorLogType : defaultLogType)
  }

  return next(action)
}
