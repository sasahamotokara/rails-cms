/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./_frontend/js/es5/init.js":
/*!**********************************!*\
  !*** ./_frontend/js/es5/init.js ***!
  \**********************************/
/***/ (function() {

eval("(function (window, document) {\r\n    const HTML_ELEMENT = document.documentElement;\r\n    const applyViewportHeight = function () {\r\n        HTML_ELEMENT.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);\r\n    };\r\n\r\n    window.addEventListener('resizeEnd', applyViewportHeight);\r\n\r\n    HTML_ELEMENT.dataset.scriptEnabled = 'true';\r\n    applyViewportHeight();\r\n}(window, window.document));\r\n\n\n//# sourceURL=webpack://rails_cms/./_frontend/js/es5/init.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./_frontend/js/es5/init.js"]();
/******/ 	
/******/ })()
;