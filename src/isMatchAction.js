import { isFunction } from 'lodash'
import isMatch from './isMatch'

export default (predicate, action) =>
  isFunction(predicate) ? isMatch(predicate, action) : isMatch(predicate, action.type)
