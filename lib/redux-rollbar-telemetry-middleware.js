(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define("reduxRollbarTelemetryMiddleware", ["lodash"], factory);
	else if(typeof exports === 'object')
		exports["reduxRollbarTelemetryMiddleware"] = factory(require("lodash"));
	else
		root["reduxRollbarTelemetryMiddleware"] = factory(root["lodash"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _isMatchAction = __webpack_require__(2);

var _isMatchAction2 = _interopRequireDefault(_isMatchAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applyTransformations = function applyTransformations(transformations, action) {
  return transformations.filter(function (i) {
    return (0, _isMatchAction2.default)(i.pattern, action);
  }).reduce(function (prevResult, transformItem) {
    return transformItem.transformation(prevResult);
  }, action);
};

exports.default = function (rollbar) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$errorLogType = _ref.errorLogType,
      errorLogType = _ref$errorLogType === undefined ? 'warning' : _ref$errorLogType,
      _ref$defaultLogType = _ref.defaultLogType,
      defaultLogType = _ref$defaultLogType === undefined ? 'debug' : _ref$defaultLogType,
      pattern = _ref.pattern,
      _ref$transformations = _ref.transformations,
      transformations = _ref$transformations === undefined ? [] : _ref$transformations;

  return function (store) {
    return function (next) {
      return function (action) {

        if (!pattern || (0, _isMatchAction2.default)(pattern, action)) {
          var transformedAction = applyTransformations(transformations, action);
          rollbar.captureEvent(transformedAction, (0, _lodash.get)(action, 'error') ? errorLogType : defaultLogType);
        }

        return next(action);
      };
    };
  };
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

var _isMatch = __webpack_require__(3);

var _isMatch2 = _interopRequireDefault(_isMatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (predicate, action) {
  return (0, _lodash.isFunction)(predicate) ? (0, _isMatch2.default)(predicate, action) : (0, _isMatch2.default)(predicate, action.type);
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(0);

/**
 * Check the matching object with a predicate
 *
 * @param  {RegExp|Array|String|Function}  predicate matching rule
 * @param  {[type]}  object matching object
 * @return {Boolean} If true, the object is matched with the pattern
 */

exports.default = function (predicate, object) {
  return predicate === '*' && true || (0, _lodash.isRegExp)(predicate) && predicate.test(object) || (0, _lodash.isArray)(predicate) && predicate.indexOf(object) > -1 || (0, _lodash.isString)(predicate) && predicate === object || (0, _lodash.isFunction)(predicate) && predicate(object);
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=redux-rollbar-telemetry-middleware.js.map