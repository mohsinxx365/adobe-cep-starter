/******/ (function(modules) { // webpackBootstrap
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./host/index.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./host/index.tsx":
/*!************************!*\
  !*** ./host/index.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\n//@ts-ignore\r\nif (typeof JSON !== 'object') {\r\n    JSON = {};\r\n}\r\n(function () {\r\n    'use strict';\r\n    function f(n) { return n < 10 ? '0' + n : n; }\r\n    function this_value() { return this.valueOf(); }\r\n    if (typeof Date.prototype.toJSON !== 'function') {\r\n        Date.prototype.toJSON = function () { return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null; };\r\n        Boolean.prototype.toJSON = this_value;\r\n        Number.prototype.toJSON = this_value;\r\n        String.prototype.toJSON = this_value;\r\n    }\r\n    var cx, escapable, gap, indent, meta, rep;\r\n    function quote(string) { escapable.lastIndex = 0; return escapable.test(string) ? '\"' + string.replace(escapable, function (a) { var c = meta[a]; return typeof c === 'string' ? c : '\\\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) + '\"' : '\"' + string + '\"'; }\r\n    function str(key, holder) { var i, k, v, length, mind = gap, partial, value = holder[key]; if (value && typeof value === 'object' && typeof value.toJSON === 'function') {\r\n        value = value.toJSON(key);\r\n    } if (typeof rep === 'function') {\r\n        value = rep.call(holder, key, value);\r\n    } switch (typeof value) {\r\n        case 'string': return quote(value);\r\n        case 'number': return isFinite(value) ? String(value) : 'null';\r\n        case 'boolean':\r\n        case 'null': return String(value);\r\n        case 'object':\r\n            if (!value) {\r\n                return 'null';\r\n            }\r\n            gap += indent;\r\n            partial = [];\r\n            if (Object.prototype.toString.apply(value) === '[object Array]') {\r\n                length = value.length;\r\n                for (i = 0; i < length; i += 1) {\r\n                    partial[i] = str(i, value) || 'null';\r\n                }\r\n                v = partial.length === 0 ? '[]' : gap ? '[\\n' + gap + partial.join(',\\n' + gap) + '\\n' + mind + ']' : '[' + partial.join(',') + ']';\r\n                gap = mind;\r\n                return v;\r\n            }\r\n            if (rep && typeof rep === 'object') {\r\n                length = rep.length;\r\n                for (i = 0; i < length; i += 1) {\r\n                    if (typeof rep[i] === 'string') {\r\n                        k = rep[i];\r\n                        v = str(k, value);\r\n                        if (v) {\r\n                            partial.push(quote(k) + (gap ? ': ' : ':') + v);\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n            else {\r\n                for (k in value) {\r\n                    if (Object.prototype.hasOwnProperty.call(value, k)) {\r\n                        v = str(k, value);\r\n                        if (v) {\r\n                            partial.push(quote(k) + (gap ? ': ' : ':') + v);\r\n                        }\r\n                    }\r\n                }\r\n            }\r\n            v = partial.length === 0 ? '{}' : gap ? '{\\n' + gap + partial.join(',\\n' + gap) + '\\n' + mind + '}' : '{' + partial.join(',') + '}';\r\n            gap = mind;\r\n            return v;\r\n    } }\r\n    if (typeof JSON.stringify !== 'function') {\r\n        escapable = /[\\\\\\\"\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g;\r\n        meta = { '\\b': '\\\\b', '\\t': '\\\\t', '\\n': '\\\\n', '\\f': '\\\\f', '\\r': '\\\\r', '\"': '\\\\\"', '\\\\': '\\\\\\\\' };\r\n        JSON.stringify = function (value, replacer, space) { var i; gap = ''; indent = ''; if (typeof space === 'number') {\r\n            for (i = 0; i < space; i += 1) {\r\n                indent += ' ';\r\n            }\r\n        }\r\n        else if (typeof space === 'string') {\r\n            indent = space;\r\n        } rep = replacer; if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {\r\n            throw new Error('JSON.stringify');\r\n        } return str('', { '': value }); };\r\n    }\r\n    if (typeof JSON.parse !== 'function') {\r\n        cx = /[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]/g;\r\n        JSON.parse = function (text, reviver) { var j; function walk(holder, key) { var k, v, value = holder[key]; if (value && typeof value === 'object') {\r\n            for (k in value) {\r\n                if (Object.prototype.hasOwnProperty.call(value, k)) {\r\n                    v = walk(value, k);\r\n                    if (v !== undefined) {\r\n                        value[k] = v;\r\n                    }\r\n                    else {\r\n                        delete value[k];\r\n                    }\r\n                }\r\n            }\r\n        } return reviver.call(holder, key, value); } text = String(text); cx.lastIndex = 0; if (cx.test(text)) {\r\n            text = text.replace(cx, function (a) { return '\\\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });\r\n        } if (/^[\\],:{}\\s]*$/.test(text.replace(/\\\\(?:[\"\\\\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/\"[^\"\\\\\\n\\r]*\"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?/g, ']').replace(/(?:^|:|,)(?:\\s*\\[)+/g, ''))) {\r\n            j = eval('(' + text + ')');\r\n            return typeof reviver === 'function' ? walk({ '': j }, '') : j;\r\n        } throw new SyntaxError('JSON.parse'); };\r\n    }\r\n}());\r\n//@ts-ignore\r\nalert('hello ts');\r\n\n\n//# sourceURL=webpack:///./host/index.tsx?");

/***/ })

/******/ });