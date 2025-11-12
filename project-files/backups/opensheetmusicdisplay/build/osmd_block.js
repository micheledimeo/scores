(window["webpackJsonp_opensheetmusicdisplay_wordpress_block"] = window["webpackJsonp_opensheetmusicdisplay_wordpress_block"] || []).push([[3],{

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	var jsonpArray = window["webpackJsonp_opensheetmusicdisplay_wordpress_block"] = window["webpackJsonp_opensheetmusicdisplay_wordpress_block"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([34,3]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ }),
/* 1 */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["i18n"]; }());

/***/ }),
/* 2 */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["components"]; }());

/***/ }),
/* 3 */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blockEditor"]; }());

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = window["opensheetmusicdisplay-wordpress-block"];

/***/ }),
/* 5 */
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(13);
var iterableToArrayLimit = __webpack_require__(14);
var unsupportedIterableToArray = __webpack_require__(15);
var nonIterableRest = __webpack_require__(17);
function _slicedToArray(r, e) {
  return arrayWithHoles(r) || iterableToArrayLimit(r, e) || unsupportedIterableToArray(r, e) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["blocks"]; }());

/***/ }),
/* 8 */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["data"]; }());

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

var icons = {};
icons.osmd = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24px",
  zoomAndPan: "magnify",
  viewBox: "0 0 375 374.999991",
  height: "24px",
  preserveAspectRatio: "xMidYMid meet",
  version: "1.0"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("defs", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("clipPath", {
  id: "a9fd300b37"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M 123.214844 122 L 263 122 L 263 295 L 123.214844 295 Z M 123.214844 122 ",
  "clip-rule": "nonzero"
})), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("clipPath", {
  id: "75ee92d1b0"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M 248 182 L 337.714844 182 L 337.714844 337.867188 L 248 337.867188 Z M 248 182 ",
  "clip-rule": "nonzero"
}))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
  x: "-37.5",
  width: "450",
  fill: "#ffffff",
  y: "-37.499999",
  height: "449.999989",
  "fill-opacity": "1"
}), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
  x: "-37.5",
  width: "450",
  fill: "#ff6600",
  y: "-37.499999",
  height: "449.999989",
  "fill-opacity": "1"
}), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  "clip-path": "url(#a9fd300b37)"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  fill: "#100f0d",
  d: "M 170.320312 177.871094 C 170.320312 175.035156 170.320312 172.203125 170.320312 169.367188 C 170.320312 165.882812 170.320312 162.398438 170.320312 158.914062 C 179.359375 156.296875 188.394531 153.679688 197.433594 151.0625 C 213.984375 146.265625 230.53125 141.472656 247.082031 136.679688 C 248.621094 136.234375 250.164062 135.785156 251.703125 135.339844 C 251.703125 141.480469 251.703125 147.621094 251.703125 153.757812 C 224.496094 161.535156 197.5 170.011719 170.320312 177.871094 Z M 255.691406 122.855469 C 245.324219 125.859375 234.957031 128.863281 224.589844 131.867188 C 208.042969 136.660156 191.492188 141.453125 174.941406 146.25 C 171.109375 147.359375 167.273438 148.46875 163.441406 149.578125 C 161.140625 150.246094 159.449219 152.414062 159.449219 154.824219 C 159.449219 168.085938 159.449219 181.34375 159.449219 194.605469 C 159.449219 213.339844 159.449219 232.074219 159.449219 250.808594 C 155.804688 248.5 151.488281 247.160156 146.855469 247.160156 C 133.832031 247.160156 123.269531 257.726562 123.269531 270.761719 C 123.269531 283.796875 133.832031 294.363281 146.855469 294.363281 C 158.921875 294.363281 168.867188 285.296875 170.265625 273.597656 C 170.277344 273.53125 170.285156 273.464844 170.292969 273.398438 C 170.386719 272.53125 170.441406 271.652344 170.441406 270.761719 C 170.441406 269.949219 170.402344 269.144531 170.320312 268.355469 C 170.320312 256.582031 170.320312 244.804688 170.320312 233.03125 C 170.320312 218.410156 170.320312 203.789062 170.320312 189.171875 C 170.511719 189.136719 170.703125 189.09375 170.902344 189.035156 C 197.898438 181.265625 224.703125 172.847656 251.703125 165.078125 C 251.703125 166.015625 251.703125 166.949219 251.703125 167.882812 C 251.703125 187.265625 251.703125 206.652344 251.703125 226.035156 C 248.027344 223.675781 243.664062 222.300781 238.972656 222.300781 C 225.949219 222.300781 215.386719 232.867188 215.386719 245.902344 C 215.386719 258.9375 225.949219 269.503906 238.972656 269.503906 C 251.714844 269.503906 262.089844 259.394531 262.539062 246.753906 C 262.5625 246.539062 262.574219 246.316406 262.574219 246.085938 C 262.574219 232.828125 262.574219 219.566406 262.574219 206.308594 C 262.574219 185.085938 262.574219 163.863281 262.574219 142.640625 C 262.574219 137.792969 262.574219 132.949219 262.574219 128.101562 C 262.574219 124.605469 259.09375 121.871094 255.691406 122.855469 ",
  "fill-opacity": "1",
  "fill-rule": "nonzero"
})), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  "clip-path": "url(#75ee92d1b0)"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  fill: "#100f0d",
  d: "M 295.949219 188.722656 C 289.574219 184.429688 285.078125 182.242188 285.078125 182.242188 C 285.078125 188.84375 285.078125 203.0625 285.078125 219.351562 C 285.078125 247.875 285.078125 282.765625 285.078125 294.324219 C 281.082031 291.796875 276.28125 290.429688 271.140625 290.714844 C 259.078125 291.386719 249.371094 301.289062 248.917969 313.371094 C 248.414062 326.820312 259.160156 337.878906 272.488281 337.878906 C 284.550781 337.878906 294.496094 328.8125 295.898438 317.117188 C 295.902344 317.050781 295.914062 316.984375 295.921875 316.914062 C 296.019531 316.050781 296.070312 315.171875 296.070312 314.28125 C 296.070312 313.464844 296.03125 312.664062 295.949219 311.871094 C 295.949219 300.097656 295.949219 288.324219 295.949219 276.546875 C 295.949219 269.121094 295.949219 240.492188 295.949219 216.394531 C 314.484375 215.519531 327.054688 233.609375 333.4375 245.945312 C 334.492188 247.988281 337.613281 246.925781 337.183594 244.667969 C 331.867188 216.78125 309.597656 197.914062 295.949219 188.722656 ",
  "fill-opacity": "1",
  "fill-rule": "nonzero"
})));
icons.practicebird = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  zoomAndPan: "magnify",
  viewBox: "0 0 375 374.999991",
  height: "24",
  preserveAspectRatio: "xMidYMid meet",
  version: "1.0"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("defs", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
  x: "-37.5",
  width: "450",
  fill: "#ffffff",
  y: "-37.499999",
  height: "449.999989",
  "fill-opacity": "1"
}), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("rect", {
  x: "-37.5",
  width: "450",
  fill: "#ff6600",
  y: "-37.499999",
  height: "449.999989",
  "fill-opacity": "1"
}), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  fill: "#000000",
  "fill-opacity": "1"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  transform: "translate(85.630095, 318.601411)"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M 47.109375 -102.40625 L 47.109375 -86.9375 L 31.40625 -86.9375 L 31.40625 7.859375 L 47.109375 7.859375 L 47.109375 23.4375 L 13.453125 23.4375 L 13.453125 -102.40625 Z M 47.109375 -102.40625 "
})))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  fill: "#000000",
  "fill-opacity": "1"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  transform: "translate(142.841032, 318.601411)"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M 63.046875 13.453125 L 52.9375 -0.109375 C 49.945312 0.484375 47.035156 0.78125 44.203125 0.78125 C 36.796875 0.78125 30.003906 -0.9375 23.828125 -4.375 C 17.660156 -7.8125 12.765625 -12.613281 9.140625 -18.78125 C 5.515625 -24.957031 3.703125 -31.894531 3.703125 -39.59375 C 3.703125 -47.300781 5.515625 -54.21875 9.140625 -60.34375 C 12.765625 -66.476562 17.660156 -71.265625 23.828125 -74.703125 C 30.003906 -78.140625 36.796875 -79.859375 44.203125 -79.859375 C 51.597656 -79.859375 58.378906 -78.140625 64.546875 -74.703125 C 70.722656 -71.265625 75.585938 -66.476562 79.140625 -60.34375 C 82.691406 -54.21875 84.46875 -47.300781 84.46875 -39.59375 C 84.46875 -32.863281 83.101562 -26.710938 80.375 -21.140625 C 77.644531 -15.566406 73.847656 -10.953125 68.984375 -7.296875 L 86.265625 13.453125 Z M 23.328125 -39.59375 C 23.328125 -32.644531 25.210938 -27.09375 28.984375 -22.9375 C 32.765625 -18.789062 37.835938 -16.71875 44.203125 -16.71875 C 50.484375 -16.71875 55.507812 -18.8125 59.28125 -23 C 63.0625 -27.1875 64.953125 -32.71875 64.953125 -39.59375 C 64.953125 -46.550781 63.0625 -52.101562 59.28125 -56.25 C 55.507812 -60.40625 50.484375 -62.484375 44.203125 -62.484375 C 37.835938 -62.484375 32.765625 -60.425781 28.984375 -56.3125 C 25.210938 -52.195312 23.328125 -46.625 23.328125 -39.59375 Z M 23.328125 -39.59375 "
})))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  fill: "#000000",
  "fill-opacity": "1"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  transform: "translate(231.237528, 318.601411)"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M 47.109375 0 L 30.734375 -29.71875 L 26.140625 -29.71875 L 26.140625 0 L 6.953125 0 L 6.953125 -78.75 L 39.140625 -78.75 C 45.347656 -78.75 50.640625 -77.660156 55.015625 -75.484375 C 59.390625 -73.316406 62.660156 -70.34375 64.828125 -66.5625 C 67.003906 -62.789062 68.09375 -58.585938 68.09375 -53.953125 C 68.09375 -48.722656 66.613281 -44.050781 63.65625 -39.9375 C 60.707031 -35.820312 56.351562 -32.90625 50.59375 -31.1875 L 68.765625 0 Z M 26.140625 -43.296875 L 38.03125 -43.296875 C 41.539062 -43.296875 44.175781 -44.15625 45.9375 -45.875 C 47.695312 -47.59375 48.578125 -50.023438 48.578125 -53.171875 C 48.578125 -56.160156 47.695312 -58.515625 45.9375 -60.234375 C 44.175781 -61.953125 41.539062 -62.8125 38.03125 -62.8125 L 26.140625 -62.8125 Z M 26.140625 -43.296875 "
})))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  fill: "#000000",
  "fill-opacity": "1"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", {
  transform: "translate(304.377776, 318.601411)"
}, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("g", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("path", {
  d: "M 43.75 23.4375 L 10.09375 23.4375 L 10.09375 7.859375 L 25.796875 7.859375 L 25.796875 -86.9375 L 10.09375 -86.9375 L 10.09375 -102.40625 L 43.75 -102.40625 Z M 43.75 23.4375 "
})))));
/* harmony default export */ __webpack_exports__["a"] = (icons);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(18);
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),
/* 13 */
/***/ (function(module, exports) {

function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(16);
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray(r, a) : void 0;
  }
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(5)["default"];
var toPrimitive = __webpack_require__(19);
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
module.exports = toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(5)["default"];
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
module.exports = toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function _getPrototypeOf(t) {
  return module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _getPrototypeOf(t);
}
module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

function _extends() {
  return module.exports = _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends.apply(null, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(5)["default"];
var assertThisInitialized = __webpack_require__(28);
function _possibleConstructorReturn(t, e) {
  if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return assertThisInitialized(t);
}
module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(29);
function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && setPrototypeOf(t, e);
}
module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = opensheetmusicdisplay;

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports) {

function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function _setPrototypeOf(t, e) {
  return module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _setPrototypeOf(t, e);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external ["wp","blocks"]
var external_wp_blocks_ = __webpack_require__(7);

// EXTERNAL MODULE: external ["wp","i18n"]
var external_wp_i18n_ = __webpack_require__(1);

// EXTERNAL MODULE: ./src/osmd_block/style.scss
var style = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/extends.js
var helpers_extends = __webpack_require__(22);
var extends_default = /*#__PURE__*/__webpack_require__.n(helpers_extends);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/slicedToArray.js
var slicedToArray = __webpack_require__(6);
var slicedToArray_default = /*#__PURE__*/__webpack_require__.n(slicedToArray);

// EXTERNAL MODULE: external ["wp","element"]
var external_wp_element_ = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/classCallCheck.js
var classCallCheck = __webpack_require__(10);
var classCallCheck_default = /*#__PURE__*/__webpack_require__.n(classCallCheck);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/createClass.js
var createClass = __webpack_require__(11);
var createClass_default = /*#__PURE__*/__webpack_require__.n(createClass);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js
var possibleConstructorReturn = __webpack_require__(23);
var possibleConstructorReturn_default = /*#__PURE__*/__webpack_require__.n(possibleConstructorReturn);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/getPrototypeOf.js
var getPrototypeOf = __webpack_require__(20);
var getPrototypeOf_default = /*#__PURE__*/__webpack_require__.n(getPrototypeOf);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inherits.js
var inherits = __webpack_require__(24);
var inherits_default = /*#__PURE__*/__webpack_require__.n(inherits);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(12);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// EXTERNAL MODULE: external "opensheetmusicdisplay"
var external_opensheetmusicdisplay_ = __webpack_require__(25);

// CONCATENATED MODULE: ./src/Components/OpenSheetMusicDisplay.jsx






function _callSuper(t, o, e) { return o = getPrototypeOf_default()(o), possibleConstructorReturn_default()(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], getPrototypeOf_default()(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }


//TODO: Combine with React repo, use as npm dependency.
//TODO: Would be nice to use tsx and have typing on options
var OpenSheetMusicDisplay_OpenSheetMusicDisplay = /*#__PURE__*/function (_PureComponent) {
  function OpenSheetMusicDisplay(props) {
    var _props$pluginManager;
    var _this;
    classCallCheck_default()(this, OpenSheetMusicDisplay);
    _this = _callSuper(this, OpenSheetMusicDisplay, [props]);
    _this.pendingLoad = undefined;
    _this.loadAttempts = 0;
    _this.maxReloadAttempts = _this.props.maxReloadAttempts ? _this.props.maxReloadAttempts : 3;
    _this.showErrorCallback = _this.props.showErrorCallback ? _this.props.showErrorCallback : _this.defaultErrorCallback;
    _this.osmd = undefined;
    _this.osmdDivRef = external_React_default.a.createRef();
    _this.loaderDivRef = external_React_default.a.createRef();
    _this.pluginManager = undefined;
    if (((_props$pluginManager = props.pluginManager) === null || _props$pluginManager === void 0 || (_props$pluginManager = _props$pluginManager._reflection) === null || _props$pluginManager === void 0 || (_props$pluginManager = _props$pluginManager.class) === null || _props$pluginManager === void 0 ? void 0 : _props$pluginManager.name) === 'OpenSheetMusicDisplayReactPluginManager') {
      _this.pluginManager = props.pluginManager;
    }
    return _this;
  }
  inherits_default()(OpenSheetMusicDisplay, _PureComponent);
  return createClass_default()(OpenSheetMusicDisplay, [{
    key: "defaultErrorCallback",
    value: function defaultErrorCallback(message, details) {
      this.osmdDivRef.current.innerHTML = "<p><strong>".concat(message, "</strong>: <code>").concat(details, "</code></p>");
    }
  }, {
    key: "getOptionsObjectFromProps",
    value: function getOptionsObjectFromProps(props) {
      var _this$pluginManager;
      var options = {};
      var propKeys = Object.keys(props);
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        if (key !== 'file' && key !== 'zoom' && key !== 'width') {
          options[key] = props[key];
        }
      }
      if (((_this$pluginManager = this.pluginManager) === null || _this$pluginManager === void 0 || (_this$pluginManager = _this$pluginManager.getPlugins()) === null || _this$pluginManager === void 0 ? void 0 : _this$pluginManager.length) > 0) {
        for (var _i = 0; _i < this.pluginManager.getPlugins().length; _i++) {
          this.pluginManager.getPlugins()[_i].processOptionsHook(this.osmd, options, this.osmdDivRef.current);
        }
      }
      return options;
    }
  }, {
    key: "renderBehavior",
    value: function renderBehavior() {
      var _this$pluginManager2,
        _this2 = this;
      if (((_this$pluginManager2 = this.pluginManager) === null || _this$pluginManager2 === void 0 || (_this$pluginManager2 = _this$pluginManager2.getPlugins()) === null || _this$pluginManager2 === void 0 ? void 0 : _this$pluginManager2.length) > 0) {
        for (var i = 0; i < this.pluginManager.getPlugins().length; i++) {
          this.pluginManager.getPlugins()[i].preRenderHook(this.osmd, this.props, this.osmdDivRef.current);
        }
      }
      this.osmd.Zoom = this.props.zoom;
      //little bit of a hack so that the loader is actually rendered.
      //Presently OSMD.render locks up the browser and by the time the loader would display, it's derendered
      //Best solution, though very involved, is for osmd to use web workers for rendering
      setTimeout(function () {
        var error = undefined;
        try {
          _this2.osmd.render();
        } catch (err) {
          console.warn('Error rendering: ', err);
          _this2.showErrorCallback("Error rendering file: ".concat(_this2.props.file), err);
        } finally {
          var _this2$pluginManager, _this2$loaderDivRef$c;
          if (((_this2$pluginManager = _this2.pluginManager) === null || _this2$pluginManager === void 0 || (_this2$pluginManager = _this2$pluginManager.getPlugins()) === null || _this2$pluginManager === void 0 ? void 0 : _this2$pluginManager.length) > 0) {
            for (var _i2 = 0; _i2 < _this2.pluginManager.getPlugins().length; _i2++) {
              _this2.pluginManager.getPlugins()[_i2].postRenderHook(_this2.osmd, _this2.props, _this2.osmdDivRef.current, error);
            }
          }
          (_this2$loaderDivRef$c = _this2.loaderDivRef.current) === null || _this2$loaderDivRef$c === void 0 || _this2$loaderDivRef$c.classList.add('hide');
        }
      }, 250);
    }
  }, {
    key: "loadFileBehavior",
    value: function loadFileBehavior() {
      var _this$pluginManager3;
      if (((_this$pluginManager3 = this.pluginManager) === null || _this$pluginManager3 === void 0 || (_this$pluginManager3 = _this$pluginManager3.getPlugins()) === null || _this$pluginManager3 === void 0 ? void 0 : _this$pluginManager3.length) > 0) {
        for (var i = 0; i < this.pluginManager.getPlugins().length; i++) {
          this.pluginManager.getPlugins()[i].preLoadFileHook(this.osmd, this.props, this.osmdDivRef.current);
        }
      }
      this.loadAttempts++;
      this.pendingLoad = this.osmd.load(this.props.file);
      var _self = this;
      this.pendingLoad.then(function () {
        var _self$pluginManager;
        _self.loadAttempts = 0;
        _self.pendingLoad = undefined;
        if (((_self$pluginManager = _self.pluginManager) === null || _self$pluginManager === void 0 || (_self$pluginManager = _self$pluginManager.getPlugins()) === null || _self$pluginManager === void 0 ? void 0 : _self$pluginManager.length) > 0) {
          for (var _i3 = 0; _i3 < _self.pluginManager.getPlugins().length; _i3++) {
            _self.pluginManager.getPlugins()[_i3].postLoadFileHook(_self.osmd, _self.props, _self.osmdDivRef.current);
          }
        }
        _self.renderBehavior();
      }, function (error) {
        var _self$pluginManager2;
        if (((_self$pluginManager2 = _self.pluginManager) === null || _self$pluginManager2 === void 0 || (_self$pluginManager2 = _self$pluginManager2.getPlugins()) === null || _self$pluginManager2 === void 0 ? void 0 : _self$pluginManager2.length) > 0) {
          for (var _i4 = 0; _i4 < _self.pluginManager.getPlugins().length; _i4++) {
            _self.pluginManager.getPlugins()[_i4].postLoadFileHook(_self.osmd, _self.props, _self.osmdDivRef.current, error);
          }
        }
        console.warn(error);
        if (_self.loadAttempts < _self.maxReloadAttempts) {
          console.log('Attempting to reload...');
          _self.loadFileBehavior();
        } else {
          var _self$loaderDivRef$cu;
          (_self$loaderDivRef$cu = _self.loaderDivRef.current) === null || _self$loaderDivRef$cu === void 0 || _self$loaderDivRef$cu.classList.add('hide');
          _self.loadAttempts = 0;
          _self.pendingLoad = undefined;
          _self.showErrorCallback("Failed to load file: ".concat(_self.props.file), error);
          console.error("Max reload attempts reached. Failed to load file: ".concat(_self.props.file));
        }
      });
    }
  }, {
    key: "setupOsmd",
    value: function setupOsmd() {
      var _this$pluginManager4;
      this.osmdDivRef.current.innerHTML = '';
      var options = this.getOptionsObjectFromProps(this.props);
      //We always want to manage resizing from here. Turn off autoresize
      options.autoResize = false;
      this.osmd = new external_opensheetmusicdisplay_["OpenSheetMusicDisplay"](this.osmdDivRef.current, options);
      if (((_this$pluginManager4 = this.pluginManager) === null || _this$pluginManager4 === void 0 || (_this$pluginManager4 = _this$pluginManager4.getPlugins()) === null || _this$pluginManager4 === void 0 ? void 0 : _this$pluginManager4.length) > 0) {
        for (var i = 0; i < this.pluginManager.getPlugins().length; i++) {
          this.pluginManager.getPlugins()[i].postSetupHook(this.osmd, this.props, this.osmdDivRef.current);
        }
      }
      if (this.props.file) {
        var _this$loaderDivRef$cu;
        (_this$loaderDivRef$cu = this.loaderDivRef.current) === null || _this$loaderDivRef$cu === void 0 || _this$loaderDivRef$cu.classList.remove('hide');
        this.loadFileBehavior();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$loaderDivRef$cu2;
      this.osmdDivRef.current.innerHTML = '';
      (_this$loaderDivRef$cu2 = this.loaderDivRef.current) === null || _this$loaderDivRef$cu2 === void 0 || _this$loaderDivRef$cu2.classList.remove('hide');
      var options = this.getOptionsObjectFromProps(this.props);
      //We always want to manage resizing from here. Turn off autoresize
      options.autoResize = false;
      this.osmd.setOptions(options);
      if (this.props.file !== prevProps.file) {
        this.loadFileBehavior();
      } else {
        this.renderBehavior();
      }
    }
  }, {
    key: "resize",
    value: function resize() {
      var _this$loaderDivRef$cu3;
      var prevWidth = this.currentWidth;
      this.currentWidth = this.osmdDivRef.current.offsetWidth;
      //The gutenberg editor pane does little resizes when changed block selections, etc. 
      //Need this threshold to prevent annoying resizes
      if (Math.abs(this.currentWidth - prevWidth) < 32) {
        return;
      }
      (_this$loaderDivRef$cu3 = this.loaderDivRef.current) === null || _this$loaderDivRef$cu3 === void 0 || _this$loaderDivRef$cu3.classList.remove('hide');
      clearTimeout(this.timeoutObject);
      var self = this;
      this.timeoutObject = setTimeout(function () {
        self.renderBehavior();
      }, 500);
    }

    // Called after render
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setupOsmd();
      this.currentWidth = this.osmdDivRef.current.offsetWidth;
      this.timeoutObject = undefined;
      var self = this;
      /* We do not want to re-render in edit mode at all
      if(ResizeObserver){
        const resizeObserver = new ResizeObserver(entries => {
          self.resize();
        });
        resizeObserver.observe(this.osmdDivRef.current);
      } else {
          console.info("Browser doesn't support ResizeObserver, defaulting to window resize");
          window.addEventListener('resize', (event) => {
            self.resize();
          });
      }*/
    }
  }, {
    key: "render",
    value: function render() {
      var _this$pluginManager5;
      var renderResult = Object(external_wp_element_["createElement"])("div", {
        className: "phonicscore-opensheetmusicdisplay"
      }, Object(external_wp_element_["createElement"])("div", {
        className: "phonicscore-opensheetmusicdisplay__full-loading-spinner hide",
        ref: this.loaderDivRef
      }), Object(external_wp_element_["createElement"])("div", {
        className: "phonicscore-opensheetmusicdisplay__render-block",
        ref: this.osmdDivRef
      }));
      if (((_this$pluginManager5 = this.pluginManager) === null || _this$pluginManager5 === void 0 || (_this$pluginManager5 = _this$pluginManager5.getPlugins()) === null || _this$pluginManager5 === void 0 ? void 0 : _this$pluginManager5.length) > 0) {
        for (var i = 0; i < this.pluginManager.getPlugins().length; i++) {
          this.pluginManager.getPlugins()[i].preReactRenderHook(this.osmd, this.props, this.osmdDivRef.current, renderResult);
        }
      }
      return renderResult;
    }
  }]);
}(external_React_["PureComponent"]);
// CONCATENATED MODULE: ./src/Models/OpenSheetMusicDisplayReactPluginManager.js


var OpenSheetMusicDisplayReactPluginManager_OpenSheetMusicDisplayReactPluginManager = /*#__PURE__*/function () {
  function OpenSheetMusicDisplayReactPluginManager() {
    classCallCheck_default()(this, OpenSheetMusicDisplayReactPluginManager);
    this._reflection = {
      class: {
        name: 'OpenSheetMusicDisplayReactPluginManager'
      }
    };
    this.plugins = [];
  }
  return createClass_default()(OpenSheetMusicDisplayReactPluginManager, [{
    key: "getPlugins",
    value: function getPlugins() {
      return this.plugins;
    }
  }, {
    key: "registerPlugin",
    value: function registerPlugin(newPlugin) {
      var _newPlugin$_reflectio;
      if ((newPlugin === null || newPlugin === void 0 || (_newPlugin$_reflectio = newPlugin._reflection) === null || _newPlugin$_reflectio === void 0 || (_newPlugin$_reflectio = _newPlugin$_reflectio.class) === null || _newPlugin$_reflectio === void 0 ? void 0 : _newPlugin$_reflectio.name) === 'OpenSheetMusicDisplayReactPluginTemplate') {
        this.plugins.push(newPlugin);
      }
    }
  }]);
}();

// EXTERNAL MODULE: external "window[\"opensheetmusicdisplay-wordpress-block\"]"
var external_window_opensheetmusicdisplay_wordpress_block_ = __webpack_require__(4);

// EXTERNAL MODULE: external ["wp","blockEditor"]
var external_wp_blockEditor_ = __webpack_require__(3);

// EXTERNAL MODULE: external ["wp","components"]
var external_wp_components_ = __webpack_require__(2);

// EXTERNAL MODULE: external ["wp","data"]
var external_wp_data_ = __webpack_require__(8);

// EXTERNAL MODULE: ./src/osmd_block/editor.scss
var editor = __webpack_require__(30);

// CONCATENATED MODULE: ./src/osmd_block/edit.js



/**
 * Internal Dependencies
 */




/**
 * Wordpress Dependencies
 */





/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


//Process custom filters (we have a filter registered to add a plugin)
var OpenSheetMusicDisplayWithFilters = Object(external_wp_components_["withFilters"])('phonicscore_opensheetmusicdisplay_plugin')(OpenSheetMusicDisplay_OpenSheetMusicDisplay);
var pluginManager = new OpenSheetMusicDisplayReactPluginManager_OpenSheetMusicDisplayReactPluginManager();
var wpPlugin = new external_window_opensheetmusicdisplay_wordpress_block_["OpenSheetMusicDisplayWordpressPlugin"]('phonicscore/opensheetmusicdisplay/wordpress-plugin-hooks', external_window_opensheetmusicdisplay_wordpress_block_["OpenSheetMusicDisplayGlobalHooks"]);
pluginManager.registerPlugin(wpPlugin);

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
var edit_Edit = function Edit(_ref) {
  var attributes = _ref.attributes,
    setAttributes = _ref.setAttributes,
    queueableAttributes = _ref.queueableAttributes,
    queueAttribute = _ref.queueAttribute,
    commitAttributes = _ref.commitAttributes;
  var blockProps = Object(external_wp_blockEditor_["useBlockProps"])();
  var onSelectMedia = function onSelectMedia(media) {
    setAttributes({
      musicXmlId: media.id,
      musicXmlUrl: media.url,
      musicXmlTitle: media.title
    });
  };
  var aspectRatioStringInit = '';
  if (attributes.aspectRatio === 0.0) {
    aspectRatioStringInit = 'auto';
  } else if (attributes.aspectRatio === 1.5) {
    aspectRatioStringInit = 'landscape';
  } else if (attributes.aspectRatio === 0.5625) {
    aspectRatioStringInit = 'portrait';
  } else {
    aspectRatioStringInit = 'custom';
  }
  var _useState = Object(external_wp_element_["useState"])(aspectRatioStringInit),
    _useState2 = slicedToArray_default()(_useState, 2),
    aspectRatioString = _useState2[0],
    setAspectRatioString = _useState2[1];
  var setAspectRatio = function setAspectRatio(value) {
    switch (value) {
      case 'auto':
        setAttributes({
          aspectRatio: 0.0
        });
        break;
      case 'landscape':
        setAttributes({
          aspectRatio: 1.5
        });
        break;
      case 'portrait':
        setAttributes({
          aspectRatio: 0.5625
        });
        break;
    }
    setAspectRatioString(value);
  };
  var aspectRatioDropdownOptions = [{
    label: Object(external_wp_i18n_["__"])('Auto (No Scrollbar)'),
    value: 'auto'
  }, {
    label: Object(external_wp_i18n_["__"])('Landscape'),
    value: 'landscape'
  }, {
    label: Object(external_wp_i18n_["__"])('Portrait'),
    value: 'portrait'
  }, {
    label: Object(external_wp_i18n_["__"])('Custom'),
    value: 'custom'
  }];
  var translateAspectRatioToHeight = function translateAspectRatioToHeight(aspectRatio) {
    if (!blockProps.ref.current || aspectRatio === 0.0 || !blockProps.ref.current.offsetWidth) {
      return 'auto';
    } else {
      return (blockProps.ref.current.offsetWidth / aspectRatio).toString() + 'px';
    }
  };
  var OSMDProps = {
    file: attributes.musicXmlUrl,
    width: attributes.width,
    zoom: attributes.zoom,
    drawTitle: attributes.drawTitle,
    drawSubtitle: attributes.drawSubtitle,
    drawComposer: attributes.drawComposer,
    drawLyricist: attributes.drawLyricist,
    drawMetronomeMarks: attributes.drawMetronomeMarks,
    drawPartNames: attributes.drawPartNames,
    drawPartAbbreviations: attributes.drawPartAbbreviations,
    drawMeasureNumbers: attributes.drawMeasureNumbers,
    drawMeasureNumbersOnlyAtSystemStart: attributes.drawMeasureNumbersOnlyAtSystemStart,
    drawTimeSignatures: attributes.drawTimeSignatures,
    maxReloadAttempts: 5,
    newSystemFromXML: attributes.newSystemFromXML,
    pluginManager: pluginManager,
    rerenderDummy: attributes.rerenderDummy
  };
  var pluginProps = external_window_opensheetmusicdisplay_wordpress_block_["OpenSheetMusicDisplayGlobalHooks"].applyFilters('phonicscore_opensheetmusicdisplay_block-props', OSMDProps, attributes, queueableAttributes);
  if (!pluginProps) {
    pluginProps = {};
  }
  return Object(external_wp_element_["createElement"])("div", extends_default()({}, blockProps, {
    style: {
      width: attributes.width + '%',
      maxWidth: attributes.width + '%',
      height: translateAspectRatioToHeight(attributes.aspectRatio)
    }
  }), Object(external_wp_element_["createElement"])(external_wp_blockEditor_["InspectorControls"], null, Object(external_wp_element_["createElement"])(external_wp_components_["Card"], null, Object(external_wp_element_["createElement"])(external_wp_components_["CardBody"], null, Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Automatically Rerender on Change'),
    checked: !attributes.queueAttributes,
    onChange: function onChange(val) {
      setAttributes({
        queueAttributes: !val
      });
      if (val) {
        commitAttributes();
      }
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["Button"], {
    variant: "primary",
    onClick: function onClick() {
      queueAttribute('rerenderDummy', {}, 0);
      commitAttributes();
    }
  }, Object(external_wp_i18n_["__"])('Rerender')))), Object(external_wp_element_["createElement"])(external_wp_components_["PanelBody"], {
    title: Object(external_wp_i18n_["__"])('Basic Options'),
    initialOpen: true
  }, Object(external_wp_element_["createElement"])("div", {
    className: "musicxml-selector"
  }, Object(external_wp_element_["createElement"])(external_wp_blockEditor_["MediaUploadCheck"], null, Object(external_wp_element_["createElement"])(external_wp_blockEditor_["MediaUpload"], {
    allowedTypes: ['application/vnd.recordare.musicxml', 'application/vnd.recordare.musicxml+xml', 'text/xml', 'application/xml'],
    onSelect: onSelectMedia,
    value: attributes.musicXmlId,
    render: function render(_ref2) {
      var open = _ref2.open;
      return Object(external_wp_element_["createElement"])("div", null, Object(external_wp_element_["createElement"])("sub", null, Object(external_wp_element_["createElement"])("strong", null, Object(external_wp_i18n_["__"])(attributes.musicXmlId > -1 ? "Current Score: ".concat(attributes.musicXmlTitle) : 'No MusicXML selected.'))), Object(external_wp_element_["createElement"])("br", null), Object(external_wp_element_["createElement"])(external_wp_components_["Button"], {
        variant: "secondary",
        onClick: open
      }, Object(external_wp_i18n_["__"])('Select Media')));
    }
  }))), Object(external_wp_element_["createElement"])("div", {
    className: "phonicscore_opensheetmusicdisplay_spacer"
  }), Object(external_wp_element_["createElement"])(external_wp_components_["TextControl"], {
    label: Object(external_wp_i18n_["__"])('Width (%)'),
    type: "number",
    min: 10.0,
    max: 100.0,
    step: 1,
    onChange: function onChange(val) {
      return queueAttribute('width', parseInt(val, 10), 500);
    },
    value: queueableAttributes.width.value
  }), Object(external_wp_element_["createElement"])(external_wp_components_["SelectControl"], {
    label: Object(external_wp_i18n_["__"])('Container Aspect Ratio'),
    value: aspectRatioString,
    onChange: function onChange(val) {
      return setAspectRatio(val);
    },
    options: aspectRatioDropdownOptions
  }), aspectRatioString === 'custom' ? Object(external_wp_element_["createElement"])(external_wp_components_["TextControl"], {
    label: Object(external_wp_i18n_["__"])('Custom Aspect Ratio'),
    type: "number",
    min: 0.1,
    onChange: function onChange(val) {
      return setAttributes({
        aspectRatio: val
      });
    },
    value: attributes.aspectRatio
  }) : null, Object(external_wp_element_["createElement"])(external_wp_components_["TextControl"], {
    label: Object(external_wp_i18n_["__"])('Zoom (%)'),
    type: "number",
    min: 10,
    onChange: function onChange(val) {
      return queueAttribute('zoom', parseInt(val, 10) / 100, 500);
    },
    value: Math.floor(queueableAttributes.zoom.value * 100)
  })), Object(external_wp_element_["createElement"])(external_wp_components_["PanelBody"], {
    title: Object(external_wp_i18n_["__"])('Drawing Options'),
    initialOpen: false
  }, Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Title'),
    checked: queueableAttributes.drawTitle.value,
    onChange: function onChange(val) {
      return queueAttribute('drawTitle', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Subtitle'),
    checked: queueableAttributes.drawSubtitle.value,
    onChange: function onChange(val) {
      return queueAttribute('drawSubtitle', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Composer'),
    checked: queueableAttributes.drawComposer.value,
    onChange: function onChange(val) {
      return queueAttribute('drawComposer', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Lyricist'),
    checked: queueableAttributes.drawLyricist.value,
    onChange: function onChange(val) {
      return queueAttribute('drawLyricist', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Metronome Marks'),
    checked: queueableAttributes.drawMetronomeMarks.value,
    onChange: function onChange(val) {
      return queueAttribute('drawMetronomeMarks', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Part Names'),
    checked: queueableAttributes.drawPartNames.value,
    onChange: function onChange(val) {
      return queueAttribute('drawPartNames', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Part Abbreviations'),
    checked: queueableAttributes.drawPartAbbreviations.value,
    onChange: function onChange(val) {
      return queueAttribute('drawPartAbbreviations', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Measure Numbers'),
    checked: queueableAttributes.drawMeasureNumbers.value,
    onChange: function onChange(val) {
      return queueAttribute('drawMeasureNumbers', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Measure Numbers Only at System Start'),
    checked: queueableAttributes.drawMeasureNumbersOnlyAtSystemStart.value,
    onChange: function onChange(val) {
      return queueAttribute('drawMeasureNumbersOnlyAtSystemStart', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('Draw Time Signatures'),
    checked: queueableAttributes.drawTimeSignatures.value,
    onChange: function onChange(val) {
      return queueAttribute('drawTimeSignatures', val, 0);
    }
  }), Object(external_wp_element_["createElement"])(external_wp_components_["ToggleControl"], {
    label: Object(external_wp_i18n_["__"])('New Systems From XML'),
    checked: queueableAttributes.newSystemFromXML.value,
    onChange: function onChange(val) {
      return queueAttribute('newSystemFromXML', val, 0);
    }
  }))), attributes.musicXmlId > -1 ? Object(external_wp_element_["createElement"])(OpenSheetMusicDisplayWithFilters, pluginProps) : Object(external_wp_element_["createElement"])("h4", null, Object(external_wp_i18n_["__"])('No MusicXML Selected.')));
};
/* harmony default export */ var edit = (Object(external_wp_data_["withSelect"])(function (select, props) {
  var _select = select('core'),
    getMedia = _select.getMedia;
  return {
    media: props.attributes.musicXmlId > -1 ? getMedia(props.attributes.musicXmlId) : undefined
  };
})(edit_Edit));
// EXTERNAL MODULE: ./src/block_assets/icons.js
var icons = __webpack_require__(9);

// CONCATENATED MODULE: ./src/osmd_block/index.js
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */


/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
//wrapper to ensure filters that are registered elsewhere (extensions/plugins to this block) are fired
wp.domReady(function () {
  Object(external_wp_blocks_["registerBlockType"])('phonicscore/opensheetmusicdisplay', {
    /**
     * @see https://make.wordpress.org/core/2020/11/18/block-api-version-2/
     */
    apiVersion: 2,
    /**
     * This is the display title for your block, which can be translated with `i18n` functions.
     * The block inserter will show this name.
     */
    title: Object(external_wp_i18n_["__"])('OSMD Sheet Music', 'opensheetmusicdisplay'),
    /**
     * This is a short description for your block, can be translated with `i18n` functions.
     * It will be shown in the Block Tab in the Settings Sidebar.
     */
    description: Object(external_wp_i18n_["__"])('Block to render MusicXML in the browser as sheet music using OSMD.', 'opensheetmusicdisplay'),
    /**
     * Blocks are grouped into categories to help users browse and discover them.
     * The categories provided by core are `text`, `media`, `design`, `widgets`, and `embed`.
     */
    category: 'embed',
    /**
     * An icon property should be specified to make it easier to identify a block.
     * These can be any of WordPress’ Dashicons, or a custom svg element.
     */
    icon: icons["a" /* default */].osmd,
    /**
     * Optional block extended support features.
     */
    supports: {
      // Removes support for an HTML mode.
      html: false
    },
    keywords: [Object(external_wp_i18n_["__"])('musicxml'), Object(external_wp_i18n_["__"])('sheet music'), Object(external_wp_i18n_["__"])('osmd'), Object(external_wp_i18n_["__"])('opensheetmusicdisplay')],
    /**
     * @see ./edit.js
     */
    edit: edit,
    /**
     * @see ./save.js
     */
    save: function save() {
      return null;
    },
    attributes: {
      alignRests: {
        type: 'number',
        default: 0
      },
      autoBeam: {
        type: 'boolean',
        default: false
      },
      autoBeamOptions: {
        type: 'object',
        default: {
          beam_middle_rests_only: false,
          beam_rests: false,
          maintain_stem_directions: false
        }
      },
      autoResize: {
        type: 'boolean',
        default: true
      },
      backend: {
        type: 'string',
        default: 'svg'
      },
      coloringMode: {
        type: 'number',
        default: undefined
      },
      coloringSetCustom: {
        type: 'array',
        default: undefined
      },
      coloringEnabled: {
        type: 'boolean',
        default: true
      },
      colorStemsLikeNoteheads: {
        type: 'boolean',
        default: false
      },
      defaultColorNotehead: {
        type: 'string',
        default: undefined
      },
      defaultColorStem: {
        type: 'string',
        default: undefined
      },
      defaultColorRest: {
        type: 'string',
        default: undefined
      },
      defaultColorLabel: {
        type: 'string',
        default: undefined
      },
      defaultColorTitle: {
        type: 'string',
        default: undefined
      },
      defaultFontFamily: {
        type: 'string',
        default: undefined
      },
      defaultFontStyle: {
        type: 'number',
        default: 0
      },
      disableCursor: {
        type: 'boolean',
        default: true
      },
      followCursor: {
        type: 'boolean',
        default: false
      },
      drawingParameters: {
        type: 'string',
        default: undefined
      },
      drawCredits: {
        type: 'boolean',
        default: true
      },
      drawTitle: {
        type: 'boolean',
        default: true
      },
      drawSubtitle: {
        type: 'boolean',
        default: true
      },
      drawComposer: {
        type: 'boolean',
        default: true
      },
      drawLyricist: {
        type: 'boolean',
        default: true
      },
      drawMetronomeMarks: {
        type: 'boolean',
        default: true
      },
      drawPartNames: {
        type: 'boolean',
        default: true
      },
      drawPartAbbreviations: {
        type: 'boolean',
        default: true
      },
      drawMeasureNumbers: {
        type: 'boolean',
        default: true
      },
      drawMeasureNumbersOnlyAtSystemStart: {
        type: 'boolean',
        default: false
      },
      drawTimeSignatures: {
        type: 'boolean',
        default: true
      },
      measureNumberInterval: {
        type: 'number',
        default: 2
      },
      useXMLMeasureNumbers: {
        type: 'boolean',
        default: true
      },
      drawFingerings: {
        type: 'boolean',
        default: true
      },
      fingeringPosition: {
        type: 'string',
        default: undefined
      },
      fingeringInsideStafflines: {
        type: 'boolean',
        default: false
      },
      drawLyrics: {
        type: 'boolean',
        default: true
      },
      drawSlurs: {
        type: 'boolean',
        default: true
      },
      drawUpToMeasureNumber: {
        type: 'number',
        default: undefined
      },
      drawUpToSystemNumber: {
        type: 'number',
        default: undefined
      },
      drawUpToPageNumber: {
        type: 'number',
        default: undefined
      },
      drawFromMeasureNumber: {
        type: 'number',
        default: undefined
      },
      fillEmptyMeasuresWithWholeRest: {
        type: 'number',
        default: 0
      },
      setWantedStemDirectionByXml: {
        type: 'boolean',
        default: true
      },
      tupletsRatioed: {
        type: 'boolean',
        default: false
      },
      tupletsBracketed: {
        type: 'boolean',
        default: false
      },
      tripletsBracketed: {
        type: 'boolean',
        default: false
      },
      pageFormat: {
        type: 'string',
        default: undefined
      },
      pageBackgroundColor: {
        type: 'string',
        default: undefined
      },
      renderSingleHorizontalStaffline: {
        type: 'boolean',
        default: false
      },
      newSystemFromXML: {
        type: 'boolean',
        default: false
      },
      newPageFromXML: {
        type: 'boolean',
        default: false
      },
      percussionOneLineCutoff: {
        type: 'number',
        default: 4
      },
      percussionForceVoicesOneLineCutoff: {
        type: 'number',
        default: 3
      },
      spacingFactorSoftmax: {
        type: 'number',
        default: 5
      },
      spacingBetweenTextLines: {
        type: 'number',
        default: undefined
      },
      stretchLastSystemLine: {
        type: 'boolean',
        default: false
      },
      autoGenerateMutipleRestMeasuresFromRestMeasures: {
        type: 'boolean',
        default: true
      },
      width: {
        type: 'number',
        default: 100.0
      },
      aspectRatio: {
        type: 'number',
        default: 0.0
      },
      zoom: {
        type: 'number',
        default: 1.0
      },
      musicXmlId: {
        type: 'number',
        default: -1
      },
      musicXmlUrl: {
        type: 'string',
        default: ''
      },
      musicXmlTitle: {
        type: 'string',
        default: ''
      },
      queueAttributes: {
        type: 'boolean',
        default: false
      },
      rerenderDummy: {
        type: 'object',
        default: {}
      },
      queueableAttributes: {
        type: 'array',
        default: ["alignRests", "autoBeam", "autoBeamOptions", "backend", "coloringMode", "coloringSetCustom", "coloringEnabled", "colorStemsLikeNoteheads", "defaultColorNotehead", "defaultColorStem", "defaultColorRest", "defaultColorLabel", "defaultColorTitle", "defaultFontFamily", "defaultFontStyle", "disableCursor", "drawingParameters", "drawCredits", "drawTitle", "drawSubtitle", "drawComposer", "drawLyricist", "drawMetronomeMarks", "drawPartNames", "drawPartAbbreviations", "drawMeasureNumbers", "drawMeasureNumbersOnlyAtSystemStart", "drawTimeSignatures", "measureNumberInterval", "useXMLMeasureNumbers", "drawFingerings", "fingeringPosition", "fingeringInsideStafflines", "drawLyrics", "drawSlurs", "drawUpToMeasureNumber", "drawUpToSystemNumber", "drawUpToPageNumber", "drawFromMeasureNumber", "fillEmptyMeasuresWithWholeRest", "setWantedStemDirectionByXml", "tupletsRatioed", "tupletsBracketed", "tripletsBracketed", "pageFormat", "pageBackgroundColor", "renderSingleHorizontalStaffline", "newSystemFromXML", "newPageFromXML", "percussionOneLineCutoff", "percussionForceVoicesOneLineCutoff", "spacingFactorSoftmax", "spacingBetweenTextLines", "stretchLastSystemLine", "autoGenerateMutipleRestMeasuresFromRestMeasures", "width", "zoom", "rerenderDummy"]
      }
    }
  });
});

/***/ })
/******/ ]);