import { isRegExp, isArray, isString, isFunction } from 'lodash'
/**
 * Check the matching object with a predicate
 *
 * @param  {RegExp|Array|String|Function}  predicate matching rule
 * @param  {[type]}  object matching object
 * @return {Boolean} If true, the object is matched with the pattern
 */

export default (predicate, object) =>
  (predicate === '*' && true)
  || (isRegExp(predicate) && predicate.test(object))
  || (isArray(predicate) && predicate.indexOf(object) > -1)
  || (isString(predicate) && predicate === object)
  || (isFunction(predicate) && predicate(object))
