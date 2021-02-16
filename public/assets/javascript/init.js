/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/*!**********************************!*\
  !*** ./_frontend/js/es5/init.js ***!
  \**********************************/
eval("(function (window, document) {\r\n    const HTML_ELEMENT = document.documentElement;\r\n    const isIE11 = 'uniqueID' in document;\r\n    const applyViewportHeight = function () {\r\n        HTML_ELEMENT.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);\r\n    };\r\n\r\n    if (isIE11) {\r\n        HTML_ELEMENT.classList.add('ie11');\r\n    }\r\n\r\n    window.addEventListener('resize', applyViewportHeight);\r\n\r\n    HTML_ELEMENT.dataset.scriptEnabled = 'true';\r\n    applyViewportHeight();\r\n}(window, window.document));\r\n\n\n//# sourceURL=webpack://rails_cms/./_frontend/js/es5/init.js?");
/******/ })()
;