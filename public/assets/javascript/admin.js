/*! For license information please see admin.js.LICENSE.txt */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./_frontend/js/admin.js":
/*!*******************************!*\
  !*** ./_frontend/js/admin.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/global */ "./_frontend/js/utils/global.js");
/* harmony import */ var _widget_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget/toggle */ "./_frontend/js/widget/toggle.js");
/* harmony import */ var _widget_toggleMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget/toggleMenu */ "./_frontend/js/widget/toggleMenu.js");
/* harmony import */ var _widget_follow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget/follow */ "./_frontend/js/widget/follow.js");
/* harmony import */ var _widget_smoothScroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widget/smoothScroll */ "./_frontend/js/widget/smoothScroll.js");
/* harmony import */ var _widget_editorTool__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./widget/editorTool */ "./_frontend/js/widget/editorTool.js");
/* harmony import */ var _widget_toggleUserMenu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./widget/toggleUserMenu */ "./_frontend/js/widget/toggleUserMenu.js");
/* harmony import */ var _widget_drawer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./widget/drawer */ "./_frontend/js/widget/drawer.js");
/* harmony import */ var _widget_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./widget/modal */ "./_frontend/js/widget/modal.js");
/* harmony import */ var _widget_tab__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./widget/tab */ "./_frontend/js/widget/tab.js");
/* harmony import */ var _widget_linkageSelectValue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./widget/linkageSelectValue */ "./_frontend/js/widget/linkageSelectValue.js");
/* harmony import */ var _widget_copySource__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./widget/copySource */ "./_frontend/js/widget/copySource.js");
/* harmony import */ var _widget_dropUploader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./widget/dropUploader */ "./_frontend/js/widget/dropUploader.js");
/* harmony import */ var _widget_tagCategoryHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./widget/tagCategoryHelper */ "./_frontend/js/widget/tagCategoryHelper.js");
/* harmony import */ var _widget_checkAll__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./widget/checkAll */ "./_frontend/js/widget/checkAll.js");
/* harmony import */ var _widget_inputFilePreview__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./widget/inputFilePreview */ "./_frontend/js/widget/inputFilePreview.js");
/* harmony import */ var _widget_associateHidden__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./widget/associateHidden */ "./_frontend/js/widget/associateHidden.js");


















(function () {
  (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.setCustomEvents)();
  (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.useDeviceObserver)();
  (0,_widget_toggle__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_widget_toggleMenu__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_widget_follow__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_widget_smoothScroll__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_widget_editorTool__WEBPACK_IMPORTED_MODULE_5__.default)();
  (0,_widget_drawer__WEBPACK_IMPORTED_MODULE_7__.default)();
  (0,_widget_modal__WEBPACK_IMPORTED_MODULE_8__.default)();
  (0,_widget_tab__WEBPACK_IMPORTED_MODULE_9__.default)();
  (0,_widget_linkageSelectValue__WEBPACK_IMPORTED_MODULE_10__.default)();
  (0,_widget_copySource__WEBPACK_IMPORTED_MODULE_11__.default)();
  (0,_widget_dropUploader__WEBPACK_IMPORTED_MODULE_12__.default)();
  (0,_widget_tagCategoryHelper__WEBPACK_IMPORTED_MODULE_13__.default)();
  (0,_widget_checkAll__WEBPACK_IMPORTED_MODULE_14__.default)();
  (0,_widget_inputFilePreview__WEBPACK_IMPORTED_MODULE_15__.default)();
  (0,_widget_associateHidden__WEBPACK_IMPORTED_MODULE_16__.default)();
  (0,_widget_toggleUserMenu__WEBPACK_IMPORTED_MODULE_6__.default)();
})();

/***/ }),

/***/ "./_frontend/js/utils/backdrop.js":
/*!****************************************!*\
  !*** ./_frontend/js/utils/backdrop.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "backdrop": function() { return /* binding */ backdrop; },
/* harmony export */   "eventName": function() { return /* binding */ eventName; },
/* harmony export */   "createBackdropLayer": function() { return /* binding */ createBackdropLayer; },
/* harmony export */   "displayBackdropLayer": function() { return /* binding */ displayBackdropLayer; }
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./_frontend/js/utils/global.js");

var eventName = 'click.backdrop';
var backdrop = null;
/**
 * レイヤーの生成
 * @return {HTMLElement}
 */

var createBackdropLayer = function createBackdropLayer() {
  backdrop = document.querySelector('.admin-backdrop'); // 同じ要素が存在しなければ生成

  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.classList.add('admin-backdrop');
    backdrop.hidden = true; // クリック時のイベント

    backdrop.addEventListener('click', function (e) {
      var crtlData = e.target.dataset.ctrl;
      var crtlTarget = document.getElementById(crtlData);

      if (!crtlTarget) {
        return;
      }

      crtlTarget.dispatchEvent(new Event(eventName));
    }); // トランジションイベント

    backdrop.addEventListener('transitionend', function (e) {
      // 非表示にするの時transitionのみ検知。また、visibility以外のトランジションは検知しない
      if (!backdrop.hidden || e.propertyName !== 'visibility') {
        return;
      }

      backdrop.dataset.ctrl = '';
    });
    _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.insertAdjacentElement('beforeend', backdrop);
  }

  return backdrop;
};
/**
 * レイヤーの表示・非表示
 * @param  {Boolean} isHidden 非表示させるか否か
 * @param  {String}  idName   レイヤーの上に表示されている要素のid名
 * @return {Void}
 */


var displayBackdropLayer = function displayBackdropLayer(isHidden, idName) {
  // 要素がない場合何もしない
  if (!backdrop) {
    return;
  } // 非表示にさせるとき


  if (!isHidden) {
    var duration = window.getComputedStyle(backdrop).getPropertyValue('transition-duration');
    backdrop.hidden = true; // transitionの設定がない場合

    if (duration === '' || parseFloat(duration) === 0) {
      backdrop.dataset.ctrl = '';
    }

    return;
  }

  backdrop.hidden = false;
  backdrop.dataset.ctrl = idName;
}; // エクスポート




/***/ }),

/***/ "./_frontend/js/utils/global.js":
/*!**************************************!*\
  !*** ./_frontend/js/utils/global.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HTML_ELEMENT": function() { return /* binding */ HTML_ELEMENT; },
/* harmony export */   "BODY_ELEMENT": function() { return /* binding */ BODY_ELEMENT; },
/* harmony export */   "SCROLL_ELEMENT": function() { return /* binding */ SCROLL_ELEMENT; },
/* harmony export */   "LOCATION": function() { return /* binding */ LOCATION; },
/* harmony export */   "FOCUS_ELEMENTS": function() { return /* binding */ FOCUS_ELEMENTS; },
/* harmony export */   "MQL": function() { return /* binding */ MQL; },
/* harmony export */   "HEADER_HEIGHT": function() { return /* binding */ HEADER_HEIGHT; },
/* harmony export */   "randomString": function() { return /* binding */ randomString; },
/* harmony export */   "tabIndexControl": function() { return /* binding */ tabIndexControl; },
/* harmony export */   "setCustomEvents": function() { return /* binding */ setCustomEvents; },
/* harmony export */   "useDeviceObserver": function() { return /* binding */ useDeviceObserver; }
/* harmony export */ });
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 共通定数
 *
 * @summary よく使う変数たち
 */
var HTML_ELEMENT = document.documentElement;
var BODY_ELEMENT = document.body;
var SCROLL_ELEMENT = document.scrollingElement || HTML_ELEMENT;
var LOCATION = window.location;
var FOCUS_ELEMENTS = 'a[href], area[href], [tabindex], button, input, select, textarea, iframe, object, audio, video, embed, summary';
var MQL = window.matchMedia('(min-width: 769px)');
var HEADER_HEIGHT = 55;
/**
 * ランダム文字列生成
 * @param  {String} prefix ランダム文字列の接頭辞
 * @return {String}        接頭辞 ＋ ランダム文字列
 */

var randomString = function randomString(prefix) {
  var str = "" + (prefix || 'id') + Math.random().toString(36).slice(-8); // 重複するIDがHTML内に存在する場合、再生成

  if (document.getElementById(str)) {
    return randomString(prefix);
  }

  return str;
};
/**
 * tabIndex制御
 * @param  {Boolean} isSet - tabindex="-1"をセットする(true)しない（false）
 * @param  {NodeList | Array<HTMLElement>} ignoreElements - tabIndexを変更する要素（省略可能、省略した場合すべてのフォーカス可能要素を対象とする）
 * @return {Void}
 */

var tabIndexControl = function tabIndexControl(isSet, ignoreElements) {
  var allFocusableElements = document.querySelectorAll(FOCUS_ELEMENTS);
  var ignore = ignoreElements || [];

  if (isSet) {
    var _iterator = _createForOfIteratorHelper(allFocusableElements),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var element = _step.value;

        if ([].indexOf.call(ignore, element) !== -1) {
          continue;
        }

        if (element.tabIndex !== undefined) {
          element.dataset.tabindex = element.tabIndex;
        }

        element.tabIndex = -1;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    var _iterator2 = _createForOfIteratorHelper(allFocusableElements),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _element = _step2.value;

        if ([].indexOf.call(ignore, _element) !== -1) {
          continue;
        }

        if (Object.prototype.hasOwnProperty.call(_element.dataset, 'tabindex')) {
          _element.tabIndex = _element.dataset.tabindex;

          _element.removeAttribute('data-tabindex');

          continue;
        }

        _element.removeAttribute('tabindex');
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
};
/**
 * 各種カスタムイベントの登録
 * @return {Void}
 */

var setCustomEvents = function setCustomEvents() {
  var MATCH_MEDIA_EVENT = 'matchMedia';
  var RESIZE_START_EVENT = 'resizeStart';
  var RESIZE_END_EVENT = 'resizeEnd';
  var isResizing = false;
  var timer = 0;
  /**
   * isMatchMedia - ブレークポイントを跨いだ時、PC・SPどちらの画面サイズであるかを検証
   * @return {Void}
   */

  var isMatchMedia = function isMatchMedia() {
    MQL.state = MQL.matches ? 'PC' : 'SP';
    window.dispatchEvent(new Event(MATCH_MEDIA_EVENT));
  };

  MQL.event = MATCH_MEDIA_EVENT;
  MQL.addListener(isMatchMedia);
  isMatchMedia(); // 初期実行

  window.addEventListener('resize', function () {
    if (isResizing) {
      return;
    }

    isResizing = true;
    clearTimeout(timer);
    window.dispatchEvent(new Event(RESIZE_START_EVENT)); // リサイズ後、横幅を再取得

    timer = window.setTimeout(function () {
      isResizing = false;
      window.dispatchEvent(new Event(RESIZE_END_EVENT));
    }, 500);
  });
};
/**
 * キーボードとマウスどちらを使っているか判定
 * @return {Void}
 */

var useDeviceObserver = function useDeviceObserver() {
  document.addEventListener('mousedown', function () {
    HTML_ELEMENT.dataset.useKeyboard = 'false';
  });
  document.addEventListener('keydown', function (event) {
    var key = event.key;

    if (key === 'Tab' || /^Arrow/.test(key)) {
      HTML_ELEMENT.dataset.useKeyboard = 'true';
    }
  });
};

/***/ }),

/***/ "./_frontend/js/utils/scrollLock.js":
/*!******************************************!*\
  !*** ./_frontend/js/utils/scrollLock.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./_frontend/js/utils/global.js");

/**
 * スクロールの制御
 * @param  {Boolean} isLock スクロールを無効化するか否か
 * @return {Void}
 */

/* harmony default export */ __webpack_exports__["default"] = (function (isLock) {
  var scrollLength = 0; // すでにロックされている場合、値の更新はしない

  if (isLock && _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.classList.contains('is-fixed')) {
    return;
  } // 固定を解除する場合


  if (!isLock) {
    _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.classList.remove('is-fixed');
    _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.style.top = '';
    window.scrollTo(0, _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.dataset.position);
    return;
  } // 固定する場合


  scrollLength = window.pageYOffset;
  _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.dataset.position = scrollLength;
  _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.classList.add('is-fixed');
  _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.style.top = "-" + scrollLength + "px";
});

/***/ }),

/***/ "./_frontend/js/utils/toast.js":
/*!*************************************!*\
  !*** ./_frontend/js/utils/toast.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toast": function() { return /* binding */ toast; },
/* harmony export */   "createToast": function() { return /* binding */ createToast; },
/* harmony export */   "displayToast": function() { return /* binding */ displayToast; }
/* harmony export */ });
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global */ "./_frontend/js/utils/global.js");

var toast = null;
var isToast = false;
var timer = 0;
/**
 * トーストの生成
 * @return {HTMLElement}
 */

var createToast = function createToast() {
  toast = document.querySelector('.admin-toast'); // 同じ要素が存在しなければ生成

  if (!toast) {
    toast = document.createElement('div');
    toast.classList.add('admin-toast');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.insertAdjacentHTML('beforeend', '<span class="admin-toast__text" hidden></span>');
    _global__WEBPACK_IMPORTED_MODULE_0__.BODY_ELEMENT.insertAdjacentElement('beforeend', toast);
  }

  return toast;
};
/**
 * トーストの表示
 * @param  {String} text    非表示させるテキスト
 * @param  {Number} timeout 表示し続ける時間(ms)
 * @return {Void}
 */


var displayToast = function displayToast(text, timeout) {
  var innerElement = toast.firstElementChild;

  if (isToast && timer > 0) {
    window.clearTimeout(timer);
    innerElement.hidden = true;
  } // トーストをセット


  isToast = true;
  innerElement.textContent = text;
  innerElement.hidden = false; // 一定時間たったら非表示にする

  timer = window.setTimeout(function () {
    innerElement.hidden = true;
    isToast = false;
  }, parseInt(timeout, 10));
}; // エクスポート




/***/ }),

/***/ "./_frontend/js/widget/associateHidden.js":
/*!************************************************!*\
  !*** ./_frontend/js/widget/associateHidden.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AssociateHidden = /*#__PURE__*/function () {
  /**
   * 特定の条件の時に表示させる
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function AssociateHidden(root, options) {
    _classCallCheck(this, AssociateHidden);

    var config = {
      className: {
        hiddenElement: 'js-associate-hidden__element'
      }
    }; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.hiddenElements = document.querySelectorAll("." + this.config.className.hiddenElement);

    var _Array$from$filter = Array.from(this.hiddenElements).filter(function (element) {
      return element.dataset.visibleValue;
    });

    var _Array$from$filter2 = _slicedToArray(_Array$from$filter, 1);

    this.hasVisibleValueElement = _Array$from$filter2[0];
    this.hiddenValue = this.hasVisibleValueElement.dataset.visibleValue;
    this.hiddenInsideFormElements = this.hasVisibleValueElement.querySelectorAll('input, textarea, select');
    this.addEvent();
    this.hidden();
  }

  _createClass(AssociateHidden, [{
    key: "addEvent",
    value: function addEvent() {
      this.root.addEventListener('change', this.hidden.bind(this));
    }
  }, {
    key: "hidden",
    value: function hidden() {
      var isVisibleValue = this.root.value === this.hiddenValue;

      var _iterator = _createForOfIteratorHelper(this.hiddenElements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;
          element.hidden = isVisibleValue;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(this.hiddenInsideFormElements),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _element = _step2.value;
          _element.disabled = !isVisibleValue;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.hasVisibleValueElement.hidden = !isVisibleValue;
    }
  }]);

  return AssociateHidden;
}();

/* harmony default export */ __webpack_exports__["default"] = (function () {
  document.querySelectorAll('.js-associate-hidden').forEach(function (element) {
    return new AssociateHidden(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/checkAll.js":
/*!*****************************************!*\
  !*** ./_frontend/js/widget/checkAll.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CheckAll = /*#__PURE__*/function () {
  /**
   * すべてのチェックボックスを選択・非選択にする
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   */
  function CheckAll(root) {
    _classCallCheck(this, CheckAll);

    // ルートとなる要素が無い場合は実装しない
    if (!root) {
      return;
    }

    this.root = root;
    this.checkFor = this.root.dataset.checkFor;
    this.checkForElements = !this.checkFor ? [] : Array.from(document.querySelectorAll("[name=\"" + this.checkFor + "\"]"));

    if (!this.checkForElements.length) {
      return;
    }

    this.addEvent();
  }
  /**
   * addEvent - イベントバインド
   */


  _createClass(CheckAll, [{
    key: "addEvent",
    value: function addEvent() {
      this.root.addEventListener('change', this.check.bind(this));

      var _iterator = _createForOfIteratorHelper(this.checkForElements),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var element = _step.value;
          element.addEventListener('change', this.check.bind(this));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "check",
    value: function check(event) {
      var currentTarget = event.currentTarget;

      if (currentTarget === this.root) {
        var _iterator2 = _createForOfIteratorHelper(this.checkForElements),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var element = _step2.value;
            element.checked = currentTarget.checked;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        return;
      }

      this.root.checked = !this.checkForElements.filter(function (element) {
        return !element.checked;
      }).length;
    }
  }]);

  return CheckAll;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用モーダル
  document.querySelectorAll('.js-check-all').forEach(function (element) {
    return new CheckAll(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/copySource.js":
/*!*******************************************!*\
  !*** ./_frontend/js/widget/copySource.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_toast__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/toast */ "./_frontend/js/utils/toast.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var CopySource = /*#__PURE__*/function () {
  /**
   * 画像リンクをMD挿入形でコピー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function CopySource(root, options) {
    _classCallCheck(this, CopySource);

    var config = {}; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.hiddenInput = document.createElement('input');
    this.buttons = this.root.querySelectorAll('.js-source-copy__button');
    this.toast = _utils_toast__WEBPACK_IMPORTED_MODULE_0__.createToast(); // コントロールボタンがない場合は何もしない

    if (!this.buttons.length) {
      return;
    }

    this.init();
    this.addEvent();
  }

  _createClass(CopySource, [{
    key: "init",
    value:
    /**
     * init - 初期化
     * @return {Void}
     */
    function init() {
      this.hiddenInput.type = 'text';
      this.hiddenInput.classList.add('u-altText');
      this.root.insertAdjacentElement('beforeend', this.hiddenInput);

      var _iterator = _createForOfIteratorHelper(this.buttons),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var button = _step.value;
          button.dataset.code = CopySource.createCode(button.querySelector('img'));
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.root.addEventListener('click', function (e) {
        var target = e.target;
        var targetButton = target.closest('.js-source-copy__button');

        if (!targetButton) {
          return;
        }

        if (!targetButton.dataset.code) {
          targetButton.dataset.code = CopySource.createCode(targetButton.querySelector('img'));
        }

        _this.copyToClipboard(targetButton.dataset.code);

        targetButton.focus();
      });
    }
  }, {
    key: "copyToClipboard",
    value: function copyToClipboard(copyText) {
      this.hiddenInput.value = copyText; // コピーを実行

      this.hiddenInput.select();
      document.execCommand('copy');
      _utils_toast__WEBPACK_IMPORTED_MODULE_0__.displayToast('コピーしました', 5000);
    }
  }], [{
    key: "createCode",
    value: function createCode(imageElement) {
      return "![" + imageElement.alt + "](" + imageElement.getAttribute('src') + " \"" + imageElement.getAttribute('width') + "x" + imageElement.getAttribute('height') + "\")";
    }
  }]);

  return CopySource;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用モーダル
  document.querySelectorAll('.js-source-copy').forEach(function (element) {
    return new CopySource(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/drawer.js":
/*!***************************************!*\
  !*** ./_frontend/js/widget/drawer.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global */ "./_frontend/js/utils/global.js");
/* harmony import */ var _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/backdrop */ "./_frontend/js/utils/backdrop.js");
/* harmony import */ var _utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/scrollLock */ "./_frontend/js/utils/scrollLock.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.




var Drawer = /*#__PURE__*/function () {
  /**
   * ドロワーメニュー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function Drawer(root, options) {
    _classCallCheck(this, Drawer);

    var config = {
      drawerMinWidth: 200,
      className: {
        mainContent: 'admin-main',
        buttonWrap: 'admin-drawer',
        button: 'admin-drawer__button',
        content: 'js-drawer__content',
        text: 'js-drawer__controlText',
        altText: 'u-altText',
        open: 'is-open',
        close: 'is-close',
        animate: 'is-animate'
      },
      text: {
        open: '開く',
        close: '閉じる'
      }
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.id = this.root.id || (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.randomString)('drawer-');
    this.mainContent = document.querySelector("." + this.config.className.mainContent);
    this.content = this.root.querySelector("." + this.config.className.content);
    this.textContents = this.content.querySelectorAll("." + this.config.className.text);
    this.control = document.createElement('button');
    this.backdrop = _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.createBackdropLayer();
    this.width = 0;
    this.isOpen = _utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state === 'PC';
    this.isAnimate = false;

    if (!this.mainContent || !this.content || !this.textContents.length) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(Drawer, [{
    key: "init",
    value: function init() {
      if (!this.isOpen) {
        var _iterator = _createForOfIteratorHelper(this.textContents),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var text = _step.value;
            text.hidden = true;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      if (!this.root.id) {
        this.root.id = this.id;
      }

      this.root.classList.add(this.isOpen ? this.config.className.open : this.config.className.close);
      this.control.classList.add(this.config.className.button);
      this.control.insertAdjacentHTML('beforeend', "<span class=\"" + this.config.className.altText + "\">" + this.config.text[this.isOpen ? 'close' : 'open'] + "</span>");
      this.content.insertAdjacentHTML('afterbegin', "<div class=\"" + this.config.className.buttonWrap + "\"></div>");
      this.content.firstElementChild.insertAdjacentElement('beforeend', this.control);
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.root.addEventListener(_utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.eventName, function () {
        if (_this.isAnimate) {
          return;
        }

        _this.isOpen = false;
        _this.isAnimate = true;
        _this.width = _this.root.clientWidth;

        _this.root.classList.add(_this.config.className.animate);

        _this.root.classList.add(_this.config.className.close);

        _this.root.classList.remove(_this.config.className.open);

        _this.control.lastElementChild.textContent = _this.config.text.open;

        if (!_this.closeDrawer()) {
          _this.isAnimate = _this.transitionAfter();
        }
      });
      this.control.addEventListener('click', function () {
        if (_this.isAnimate) {
          return;
        }

        _this.isOpen = !_this.isOpen;
        _this.isAnimate = true;
        _this.width = _this.root.clientWidth;

        _this.root.classList.add(_this.config.className.animate);

        _this.root.classList.add(_this.config.className[_this.isOpen ? 'open' : 'close']);

        _this.root.classList.remove(_this.config.className[_this.isOpen ? 'close' : 'open']);

        _this.control.lastElementChild.textContent = _this.config.text[_this.isOpen ? 'close' : 'open']; // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行

        if (!_this[_this.isOpen ? 'openDrawer' : 'closeDrawer']()) {
          _this.isAnimate = _this.transitionAfter();
        }
      });
      this.root.addEventListener('keydown', function (e) {
        if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state !== 'SP' || !_this.isOpen || e.key.indexOf('Esc') === -1) {
          return;
        }

        _this.isOpen = false;
        _this.isAnimate = true;
        _this.width = _this.root.clientWidth;

        _this.root.classList.add(_this.config.className.close);

        _this.root.classList.remove(_this.config.className.open);

        _this.control.lastElementChild.textContent = _this.config.text.open; // Escapeキー押下で閉じる

        if (!_this.closeDrawer()) {
          _this.isAnimate = _this.transitionAfter();
        }
      });
      this.root.addEventListener('transitionend', function (e) {
        // width以外のトランジションは検知しない
        if (e.propertyName !== 'width') {
          return;
        }

        _this.isAnimate = _this.transitionAfter();
      });
      window.addEventListener(_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.event, function () {
        // フラグを更新
        _this.isAnimate = false; // SP画面サイズ かつ 開いている場合、閉じる処理

        if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state === 'SP' && _this.isOpen) {
          _this.isOpen = false;

          _this.root.classList.add(_this.config.className.close);

          _this.root.classList.remove(_this.config.className.open);

          _this.control.lastElementChild.textContent = _this.config.text.open;

          var _iterator2 = _createForOfIteratorHelper(_this.textContents),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var text = _step2.value;
              text.hidden = true;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          var width = Math.min(_this.root.offsetWidth, _this.root.scrollWidth);
          _this.mainContent.style.marginLeft = width + "px";
        }

        if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state === 'PC') {
          if (_this.isOpen) {
            (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__.default)(false);
            _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.displayBackdropLayer(false);
            (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(true, [].concat(_toConsumableArray(_this.content.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)), [_this.control]));
          }

          _this.width = _this.root.clientWidth;
          _this.mainContent.style.marginLeft = _this.width + "px";
        }
      });
    }
  }, {
    key: "openDrawer",
    value: function openDrawer() {
      var duration = window.getComputedStyle(this.root).getPropertyValue('transition-duration');
      this.root.style.minWidth = 'auto';

      var _iterator3 = _createForOfIteratorHelper(this.textContents),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var text = _step3.value;
          text.hidden = false;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      this.root.style.width = this.width + "px";
      this.root.style.width = Math.max(this.root.offsetWidth, this.config.drawerMinWidth) + "px";
      this.content.focus(); // SP時は背景を表示

      if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state === 'SP') {
        (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__.default)(true);
        _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.displayBackdropLayer(true, this.id);
        (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(true, [].concat(_toConsumableArray(this.content.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)), [this.control]));
      } else {
        this.mainContent.style.marginLeft = '';
      } // transition-durationの有無を返却


      return !(duration === '' || parseFloat(duration) === 0);
    }
  }, {
    key: "closeDrawer",
    value: function closeDrawer() {
      var duration = window.getComputedStyle(this.root).getPropertyValue('transition-duration');
      this.root.style.minWidth = 'auto';

      var _iterator4 = _createForOfIteratorHelper(this.textContents),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var text = _step4.value;
          text.hidden = true;
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      var width = Math.min(this.root.offsetWidth, this.root.scrollWidth);
      this.root.style.width = this.width + "px";
      this.root.style.width = Math.min(width, this.root.offsetWidth) + "px";
      this.control.focus(); // 背景レイヤーをの制御が必要 かつ 背景レイヤーが存在する場合

      if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state === 'SP') {
        (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__.default)(false);
        _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.displayBackdropLayer(false);
        (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(false, _toConsumableArray(this.content.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)));
      } else {
        this.mainContent.style.marginLeft = width + "px";
      } // transitionの有無を返却


      return !(duration === '' || parseFloat(duration) === 0);
    }
  }, {
    key: "transitionAfter",
    value: function transitionAfter() {
      this.root.style.width = '';
      this.root.style.minWidth = '';
      this.root.classList.remove(this.config.className.animate);
      return false;
    }
  }]);

  return Drawer;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-drawer').forEach(function (element) {
    return new Drawer(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/dropUploader.js":
/*!*********************************************!*\
  !*** ./_frontend/js/widget/dropUploader.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast */ "./_frontend/js/utils/toast.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var DropUploader = /*#__PURE__*/function () {
  /**
   * ドラッグ＆ドロップ 画像アップロード
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function DropUploader(root, options) {
    _classCallCheck(this, DropUploader);

    var config = {
      className: {
        dropArea: 'js-drop-uploader__dropArea',
        preview: 'js-drop-uploader__preview',
        previewList: 'admin-layout-media__list',
        previewItem: 'admin-layout-media__item',
        previewImageWrap: 'admin-layout-media__media',
        previewImage: 'admin-layout-media__image',
        removeButton: 'js-drop-uploader__remove',
        drag: 'is-drag'
      }
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.dropArea = this.root.querySelector("." + this.config.className.dropArea);
    this.fileInput = this.root.querySelector('input[type="file"]');
    this.previewArea = this.root.querySelector("." + this.config.className.preview);
    this.files = [];
    this.disableAjax = this.root.dataset.disableAjax === 'true';
    this.toast = _utils_toast__WEBPACK_IMPORTED_MODULE_1__.createToast();
    this.isDrug = false;

    if (!this.dropArea || !this.fileInput || !this.preview) {
      return;
    }

    this.addEvent();
  }

  _createClass(DropUploader, [{
    key: "addEvent",
    value:
    /**
     * addEvent - イベントバインド
     */
    function addEvent() {
      var _this = this;

      this.dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();

        if (_this.isDrug) {
          return;
        }

        _this.isDrug = true;

        _this.dropArea.classList.add(_this.config.className.drag);
      });
      this.dropArea.addEventListener('dragleave', function (e) {
        e.preventDefault();

        if (!_this.isDrug) {
          return;
        }

        _this.isDrug = false;

        _this.dropArea.classList.remove(_this.config.className.drag);
      });
      this.dropArea.addEventListener('drop', function (e) {
        e.preventDefault();

        _this.drop(Array.from(e.dataTransfer.files));
      });
      this.previewArea.addEventListener('click', function (e) {
        var target = e.target;

        if (!target.classList.contains(_this.config.className.removeButton)) {
          return;
        }

        _this.removePreview(target);
      });
      this.fileInput.addEventListener('change', function () {
        _this.drop(Array.from(_this.fileInput.files));
      });

      if (!this.disableAjax) {
        this.root.addEventListener('submit', function (e) {
          e.preventDefault();

          _this.submit();
        });
      }
    }
  }, {
    key: "drop",
    value: function drop(files) {
      if (!files.length) {
        return;
      }

      this.isDrug = false;
      this.files = this.files.concat(files);
      this.dropArea.classList.remove(this.config.className.drag);
      this.fileInput.files = DropUploader.createFileList(this.files);
      this.preview(files);
    }
  }, {
    key: "preview",
    value: function preview(files) {
      var _this2 = this;

      var list = this.previewArea.querySelector("." + this.config.className.previewList);
      var fileLength = files.length;
      var images = [];

      var _loop = function _loop(i) {
        var reader = new FileReader();

        reader.onload = function (e) {
          images.push("<li class=\"" + _this2.config.className.previewItem + "\"><div class=\"" + _this2.config.className.previewImageWrap + "\"><img src=\"" + e.target.result + "\" alt=\"\" class=\"" + _this2.config.className.previewImage + "\"></div><button class=\"admin-button-media-remove " + _this2.config.className.removeButton + "\"><span class=\"u-altText\">\u524A\u9664</span></button></li>");

          if (i === fileLength - 1) {
            if (!list) {
              _this2.previewArea.insertAdjacentHTML('beforeend', "<ul class=\"" + _this2.config.className.previewList + "\">" + images.join('') + "</ul>");
            } else {
              list.insertAdjacentHTML('beforeend', images.join(''));
            }
          }
        };

        reader.readAsDataURL(files[i]);
      };

      for (var i = 0; i < fileLength; i++) {
        _loop(i);
      }
    }
  }, {
    key: "removePreview",
    value: function removePreview(element) {
      var item = element.parentNode;
      var itemIndex = Array.from(this.previewArea.querySelector("." + this.config.className.previewList).children).indexOf(item);
      this.files.splice(itemIndex, 1);
      this.fileInput.files = DropUploader.createFileList(this.files);

      if (!this.files.length) {
        this.previewArea.firstElementChild.remove();
      }

      item.remove();
    }
  }, {
    key: "sync",
    value: function sync(data) {
      var _this3 = this;

      var mediaLists = Array.from(document.querySelectorAll("." + this.config.className.previewList)).filter(function (element) {
        return !element.parentNode.classList.contains(_this3.config.className.preview);
      });

      var _iterator = _createForOfIteratorHelper(mediaLists),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var mediaList = _step.value;
          var cloneItem = mediaList.firstElementChild.cloneNode(true);
          var itemFirstChild = cloneItem.firstElementChild;

          if (itemFirstChild.tagName.toLowerCase() === 'button') {
            itemFirstChild.removeAttribute('data-code');
          }

          for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
            var key = _Object$keys[_i];
            var clone = cloneItem.cloneNode(true);
            var img = clone.querySelector('img');

            if (itemFirstChild.tagName.toLowerCase() === 'label') {
              var input = clone.querySelector('input');
              input.value = data[key].id;
              input.checked = false;
            }

            img.src = data[key].url;
            img.alt = '';
            mediaList.insertAdjacentElement('beforeend', clone);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this4 = this;

      var formData = new FormData(this.root);

      var fetchData = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          var fetchOptions, response, responseData;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fetchOptions = {
                    method: 'POST',
                    headers: {
                      mode: 'cors'
                    },
                    body: formData
                  };
                  _context.prev = 1;
                  _context.next = 4;
                  return fetch(_this4.root.action, fetchOptions);

                case 4:
                  response = _context.sent;
                  _context.next = 7;
                  return response.json();

                case 7:
                  responseData = _context.sent;
                  return _context.abrupt("return", responseData);

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](1);
                  return _context.abrupt("return", {});

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 11]]);
        }));

        return function fetchData() {
          return _ref.apply(this, arguments);
        };
      }();

      fetchData().then(function (response) {
        _this4.sync(response);

        _this4.reset();
      });
    }
  }, {
    key: "reset",
    value: function reset() {
      this.previewArea.firstElementChild.remove();
      this.files.length = 0;
      this.fileInput.files = DropUploader.createFileList(this.files);
      _utils_toast__WEBPACK_IMPORTED_MODULE_1__.displayToast('画像を追加しました', 5000);
    }
  }], [{
    key: "createFileList",
    value: function createFileList(files) {
      var data = new ClipboardEvent('').clipboardData || new DataTransfer();

      var _iterator2 = _createForOfIteratorHelper(files),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var file = _step2.value;
          data.items.add(file);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return data.files;
    }
  }]);

  return DropUploader;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-drop-uploader').forEach(function (element) {
    return new DropUploader(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/editorTool.js":
/*!*******************************************!*\
  !*** ./_frontend/js/widget/editorTool.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_markdownViewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/markdownViewer */ "./_frontend/js/widget/modules/markdownViewer.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var EditorTool = /*#__PURE__*/function () {
  /**
   * 記事エディター補助機能
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function EditorTool(root, options) {
    _classCallCheck(this, EditorTool);

    var config = {
      className: {
        toolbar: 'admin-editor-toolbar',
        buttonList: 'admin-button-list',
        buttonListItem: 'admin-button-list__item',
        mediaButton: 'admin-button-media',
        switchButton: 'admin-button-switch'
      }
    }; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.toolbar = document.createElement('div');
    this.switchButtonList = document.createElement('ul');
    this.mediaButton = "<button type=\"button\" class=\"" + this.config.className.mediaButton + "\" data-href=\"#modal-media-uploader-01\">\u30E1\u30C7\u30A3\u30A2\u3092\u8FFD\u52A0</button>";
    this.markdownViewer = null;
    this.init();
    this.addEvent();
  }

  _createClass(EditorTool, [{
    key: "init",
    value: function init() {
      this.toolbar.classList.add(this.config.className.toolbar);
      this.switchButtonList.classList.add(this.config.className.buttonList);
      this.switchButtonList.insertAdjacentHTML('beforeend', this.createSwitchButton());
      this.toolbar.insertAdjacentHTML('beforeend', this.mediaButton);
      this.toolbar.insertAdjacentElement('beforeend', this.switchButtonList);
      this.root.insertAdjacentElement('afterbegin', this.toolbar);
      this.markdownViewer = new _modules_markdownViewer__WEBPACK_IMPORTED_MODULE_0__.MarkdownViewer(this.switchButtonList);
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      this.switchButtonList.addEventListener('click', this.markdownViewer["switch"].bind(this.markdownViewer));
    }
    /**
     * 切り替えボタンの生成
     */

  }, {
    key: "createSwitchButton",
    value: function createSwitchButton() {
      var items = '';

      for (var _i = 0, _arr = ['markdown', 'html']; _i < _arr.length; _i++) {
        var type = _arr[_i];
        items += "<li class=\"" + this.config.className.buttonListItem + "\"><button type=\"button\" class=\"" + this.config.className.switchButton + "\" data-ctrl=\"" + type + "\"" + (type === 'markdown' ? ' disabled' : '') + ">" + type + "</button></li>";
      }

      return items;
    }
  }]);

  return EditorTool;
}();

/* harmony default export */ __webpack_exports__["default"] = (function () {
  document.querySelectorAll('.js-editor-tool').forEach(function (element) {
    return new EditorTool(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/follow.js":
/*!***************************************!*\
  !*** ./_frontend/js/widget/follow.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global */ "./_frontend/js/utils/global.js");
// import global variables.

/**
 * スクロール検知
 *
 * @param  {HTMLElement} root         ルートとなる要素
 * @param  {HTMLElement} followTarget 追従させる要素
 * @param  {Object} options      interSectionObserverのオプション
 * @return {Void}
 */

var follow = function follow(root, followTarget, options) {
  var config = {
    className: {
      follow: 'is-follow'
    },
    observeDefaultOptions: {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
  };
  var observeOptions = Object.assign(config.observeDefaultOptions, options);
  var target = followTarget || root;
  var observer = null;
  var method = {
    /**
     * init - 初期化
     * @return {Void}
     */
    init: function init() {
      if (!root) {
        return;
      } // オブザーバーを定義


      observer = new IntersectionObserver(method.interSection, observeOptions);
      observer.observe(root);
    },

    /**
     * interSection - 可視領域に入り込む・出る時に実行する処理
     * @param  {[type]} entries [description]
     * @return {[type]}         [description]
     */
    interSection: function interSection(entries) {
      if (!entries) {
        return;
      }

      entries.forEach(function (entry) {
        // 入り込んだ場合
        if (entry.isIntersecting) {
          target.classList.remove(config.className.follow); // 出た場合
        } else {
          target.classList.add(config.className.follow);
        }
      });
    }
  }; // 初期化を実行

  method.init();
};
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var header = document.querySelector('.l-header');
  var toTopLink = document.querySelector('.l-footer-pageTop');

  if (!header || !toTopLink) {
    return;
  } // 追従ヘッダー


  follow(header, null, {
    rootMargin: "-" + _utils_global__WEBPACK_IMPORTED_MODULE_0__.HEADER_HEIGHT + "px 0px"
  }); // ページトップリンク追従

  follow(header, toTopLink);
});

/***/ }),

/***/ "./_frontend/js/widget/inputFilePreview.js":
/*!*************************************************!*\
  !*** ./_frontend/js/widget/inputFilePreview.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var InputFilePreview = /*#__PURE__*/function () {
  /**
   * すべてのチェックボックスを選択・非選択にする
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function InputFilePreview(root, options) {
    _classCallCheck(this, InputFilePreview);

    var config = {
      className: {
        image: 'js-input-file-preview__image'
      }
    }; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.input = this.root.querySelector('input[type="file"]');
    this.image = this.root.querySelector("." + this.config.className.image);

    if (!this.input || !this.image) {
      return;
    }

    this.addEvent();
  }
  /**
   * addEvent - イベントバインド
   */


  _createClass(InputFilePreview, [{
    key: "addEvent",
    value: function addEvent() {
      this.input.addEventListener('change', this.preview.bind(this));
    }
  }, {
    key: "preview",
    value: function preview() {
      var _this = this;

      var reader = new FileReader();

      var _this$input$files = _slicedToArray(this.input.files, 1),
          file = _this$input$files[0];

      reader.onload = function (e) {
        _this.image.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  }]);

  return InputFilePreview;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用モーダル
  document.querySelectorAll('.js-input-file-preview').forEach(function (element) {
    return new InputFilePreview(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/linkageSelectValue.js":
/*!***************************************************!*\
  !*** ./_frontend/js/widget/linkageSelectValue.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LinkageSelectValue = /*#__PURE__*/function () {
  /**
   * タブ
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function LinkageSelectValue(root, options) {
    _classCallCheck(this, LinkageSelectValue);

    var config = {
      linkageFormName: 'admin-media-select',
      radioButtonName: 'thumbnail',
      submitButtonId: 'admin-media-submit'
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.form = document.forms[this.config.linkageFormName];
    this.reset = this.form.querySelector('input[type="reset"]');
    this.submit = document.getElementById(this.config.submitButtonId);
    this.imageWrap = this.root.parentElement.nextElementSibling;

    if (!this.form || !this.submit) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(LinkageSelectValue, [{
    key: "init",
    value: function init() {
      var _this = this;

      var _Array$from$filter = Array.from(this.form.querySelectorAll('input[type="radio"]')).filter(function (element) {
        return element.value === _this.root.value;
      }),
          _Array$from$filter2 = _slicedToArray(_Array$from$filter, 1),
          checkedRadio = _Array$from$filter2[0];

      if (checkedRadio) {
        checkedRadio.checked = true;
      }

      var _iterator = _createForOfIteratorHelper(this.root.children),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          child.hidden = true;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "createOption",
    value: function createOption() {
      var radios = Array.from(this.form.querySelectorAll('input[type="radio"]'));
      var options = Array.from(this.root.children);

      if (radios.length + 1 === options.length) {
        return;
      }

      var optionValues = options.map(function (element) {
        return element.value;
      });
      var option = [];

      for (var _i2 = 0, _radios = radios; _i2 < _radios.length; _i2++) {
        var radio = _radios[_i2];

        if (optionValues.includes(radio.value)) {
          continue;
        }

        option.push("<option value=\"" + radio.value + "\" hidden>" + radio.dataset.name + "</option>");
      }

      this.root.insertAdjacentHTML('beforeend', option.join(''));
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this2 = this;

      this.root.addEventListener('click', this.createOption.bind(this));
      this.submit.addEventListener('click', function (e) {
        var _Array$from$filter3 = Array.from(_this2.form.querySelectorAll('input[type="radio"]')).filter(function (element) {
          return element.checked;
        }),
            _Array$from$filter4 = _slicedToArray(_Array$from$filter3, 1),
            checkedRadio = _Array$from$filter4[0];

        var value = !checkedRadio ? '' : checkedRadio.value;
        e.preventDefault();
        _this2.root.value = value;

        _this2.previewImage(checkedRadio, value);
      });
      this.reset.addEventListener('click', function () {
        _this2.form.querySelectorAll('input[type="radio"]').forEach(function (element) {
          element.checked = false;
        });
      });
    }
  }, {
    key: "previewImage",
    value: function previewImage(checkedRadio, value) {
      this.imageWrap.innerHTML = '';

      if (value === '') {
        this.imageWrap.hidden = true;
        return;
      }

      var image = checkedRadio.parentElement.querySelector('img').cloneNode(true);
      image.className = '';
      this.imageWrap.hidden = false;
      this.imageWrap.insertAdjacentElement('beforeend', image);
    }
  }]);

  return LinkageSelectValue;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-linkage-select').forEach(function (element) {
    return new LinkageSelectValue(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/modal.js":
/*!**************************************!*\
  !*** ./_frontend/js/widget/modal.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global */ "./_frontend/js/utils/global.js");
/* harmony import */ var _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/backdrop */ "./_frontend/js/utils/backdrop.js");
/* harmony import */ var _utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/scrollLock */ "./_frontend/js/utils/scrollLock.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.




var Modal = /*#__PURE__*/function () {
  /**
   * モーダル
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function Modal(root, options) {
    _classCallCheck(this, Modal);

    var config = {
      className: {
        label: 'js-modal__label',
        existsCloseButton: 'js-modal__close',
        description: 'js-modal__description',
        closeButton: 'admin-modal__close',
        altText: 'u-altText'
      }
    }; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.id = this.root.id;
    this.controls = document.querySelectorAll("[href=\"#" + this.id + "\"], [data-href=\"#" + this.id + "\"]");
    this.modalLabel = this.root.querySelector("." + this.config.className.label);
    this.modalDescription = this.root.querySelector("." + this.config.className.description);
    this.closeButton = document.createElement('button');
    this.existsCloseButton = this.root.querySelectorAll("." + this.config.className.existsCloseButton);
    this.backdrop = _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.createBackdropLayer();
    this.focusableElements = [].concat(_toConsumableArray(this.root.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)), [this.root]);
    this.current = null;
    this.isOpen = false; // コントロールボタンがない場合は何もしない

    if (!this.controls.length) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(Modal, [{
    key: "init",
    value: function init() {
      var _iterator = _createForOfIteratorHelper(this.controls),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var control = _step.value;

          // button要素以外にはbutton roleを追加
          if (control.tagName.toLowerCase() !== 'button') {
            control.setAttribute('role', 'button');
            control.tabIndex = 0;
          }

          control.setAttribute('aria-expanded', 'false');
          control.setAttribute('aria-haspopup', 'true');
          control.setAttribute('aria-controls', this.id);
        } // モーダルのラベルが指定されている場合の紐づけ

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (this.modalLabel) {
        this.modalLabel.id = this.id + "-label";
        this.root.setAttribute('aria-labelledby', this.id + "-label");
      } // モーダルの説明が指定されている場合の紐づけ


      if (this.modalDescription) {
        this.modalDescription.id = this.id + "-description";
        this.root.setAttribute('aria-describedby', this.id + "-description");
      }

      this.root.hidden = true;
      this.root.tabIndex = -1;
      this.root.setAttribute('role', 'dialog');
      this.root.setAttribute('aria-modal', 'true');
      this.closeButton.type = 'button';
      this.closeButton.classList.add(this.config.className.closeButton);
      this.closeButton.insertAdjacentHTML('beforeend', "<span class=\"" + this.config.className.altText + "\">\u9589\u3058\u308B</span>");
      this.root.insertAdjacentElement('beforeend', this.closeButton);
      this.focusableElements.push(this.closeButton);
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.root.addEventListener(_utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.eventName, this.modalClose.bind(this));
      this.root.addEventListener('keydown', function (e) {
        // 閉じている場合は無効
        if (!_this.isOpen || e.key.indexOf('Esc') === -1) {
          return;
        } // Escapeキー押下で閉じる


        _this.modalClose(e);
      });

      var _iterator2 = _createForOfIteratorHelper(this.controls),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var control = _step2.value;
          control.addEventListener('click', this.modalOpen.bind(this));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      for (var _i = 0, _arr = [this.closeButton].concat(_toConsumableArray(this.existsCloseButton)); _i < _arr.length; _i++) {
        var button = _arr[_i];
        button.addEventListener('click', this.modalClose.bind(this));
      }
    }
    /**
     * modalOpen - 開く処理
     * @param  {clickEvent} event イベントオブジェクト
     * @return {void}
     */

  }, {
    key: "modalOpen",
    value: function modalOpen(event) {
      var currentTarget = event.currentTarget; // すでに展開されている場合は何もしない

      if (this.isOpen) {
        return;
      }

      event.preventDefault(); // フラグを更新

      this.isOpen = true;
      this.root.hidden = false;
      this.current = currentTarget;
      currentTarget.setAttribute('aria-expanded', 'true');
      this.root.focus(); // タブインデックス・スクロールの制御

      (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(true, this.focusableElements);
      _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.displayBackdropLayer(true, this.id);
      (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__.default)(true);
    }
    /**
     * modalClose - 閉じる処理
     * @return {Void}
     */

  }, {
    key: "modalClose",
    value: function modalClose() {
      // すでに閉じられている場合は何もしない
      if (!this.isOpen) {
        return;
      } // フラグを更新


      this.isOpen = false;
      this.root.hidden = true;
      this.current.setAttribute('aria-expanded', 'false');
      this.current.focus(); // タブインデックス・スクロールの制御

      (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(false, this.focusableElements);
      _utils_backdrop__WEBPACK_IMPORTED_MODULE_1__.displayBackdropLayer(false);
      (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_2__.default)(false);
    }
  }]);

  return Modal;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用モーダル
  document.querySelectorAll('.admin-modal').forEach(function (element) {
    return new Modal(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/modules/expand.js":
/*!***********************************************!*\
  !*** ./_frontend/js/widget/modules/expand.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Expand": function() { return /* binding */ Expand; }
/* harmony export */ });
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/global */ "./_frontend/js/utils/global.js");
/* harmony import */ var _utils_scrollLock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../utils/scrollLock */ "./_frontend/js/utils/scrollLock.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Expand = /*#__PURE__*/function () {
  /**
   * トグル
   *
   * @constructor
   * @param {HTMLElement} control      - トグルボタンとして機能する要素
   * @param {HTMLElement} content      - 開閉するコンテンツ部分
   * @param {Boolean}     isOpen       - 初期表示を開く状態にする（true）かしない(false)か
   * @param {Boolean}     isLockScreen - 初期表示を開く状態にする（true）かしない(false)か
   */
  function Expand(control, content, isOpen, isLockScreen) {
    _classCallCheck(this, Expand);

    // ルートとなる要素が無い場合は実装しない
    if (!control || !content) {
      return;
    }

    this.control = control;
    this.content = content;
    this.id = this.content.id || (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.randomString)('toggle-');
    this.isOpen = isOpen;
    this.isLockScreen = isLockScreen;
    this.init();
  }

  _createClass(Expand, [{
    key: "init",
    value: function init() {
      if (!this.content.id) {
        this.content.id = this.id;
      }

      this.content.hidden = !this.isOpen;
      this.control.setAttribute('aria-expanded', "" + this.isOpen);
      this.control.setAttribute('aria-controls', this.id);
    }
  }, {
    key: "open",
    value: function open() {
      var duration = window.getComputedStyle(this.content).getPropertyValue('transition-duration'); // 背景レイヤーをの制御が必要 かつ 背景レイヤーが存在する場合

      if (this.isLockScreen) {
        (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_1__.default)(true);
        (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(true, [].concat(_toConsumableArray(this.content.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)), [this.control]));
      }

      this.control.setAttribute('aria-expanded', 'true');
      this.content.hidden = false;
      this.content.style.height = '0';
      this.content.style.height = Math.max(this.content.offsetHeight, this.content.scrollHeight) + "px";
      this.content.focus(); // transition-durationの有無を返却

      return !(duration === '' || parseFloat(duration) === 0);
    }
  }, {
    key: "close",
    value: function close() {
      var duration = window.getComputedStyle(this.content).getPropertyValue('transition-duration'); // 背景レイヤーをの制御が必要 かつ 背景レイヤーが存在する場合

      if (this.isLockScreen) {
        (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_1__.default)(false);
        (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(false, _toConsumableArray(this.content.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)));
      }

      this.content.style.height = this.content.clientHeight + "px";
      this.content.style.height = "" + Math.min(this.content.offsetHeight, 0);
      this.control.setAttribute('aria-expanded', 'false');
      this.control.focus(); // transitionの有無を返却

      return !(duration === '' || parseFloat(duration) === 0);
    }
  }, {
    key: "transitionAfter",
    value: function transitionAfter() {
      // 閉じる操作だった場合
      if (parseInt(this.content.style.height, 10) === 0) {
        this.content.hidden = true;
      }

      this.content.style.height = '';
      return false;
    }
  }]);

  return Expand;
}();

/***/ }),

/***/ "./_frontend/js/widget/modules/markdownViewer.js":
/*!*******************************************************!*\
  !*** ./_frontend/js/widget/modules/markdownViewer.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MarkdownViewer": function() { return /* binding */ MarkdownViewer; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MarkdownViewer = /*#__PURE__*/function () {
  /**
   * markdownプレビュー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function MarkdownViewer(root, options) {
    _classCallCheck(this, MarkdownViewer);

    var config = {}; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.buttons = this.root.querySelectorAll('button[data-ctrl]');
    this.textarea = this.root.parentNode.nextElementSibling;
    this.previewArea = document.createElement('div');
    this.isPreview = false;
    this.isChanged = true;
    this.init();
    this.addEvent();
    this.resizeObserver();
  }

  _createClass(MarkdownViewer, [{
    key: "init",
    value: function init() {
      this.previewArea.tabIndex = 0;
      this.previewArea.hidden = true;
      this.previewArea.classList.add('admin-form-content-textarea');
      this.textarea.insertAdjacentElement('afterend', this.previewArea);
    }
  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.textarea.addEventListener('input', function () {
        if (_this.isChanged) {
          return;
        }

        _this.isChanged = true;
      });
    }
  }, {
    key: "resizeObserver",
    value: function resizeObserver() {
      var _this2 = this;

      var isResizing = false;
      var timer = 0;
      var observer = new MutationObserver(function () {
        if (isResizing) {
          return;
        }

        isResizing = true;
        _this2.isChanged = true;
        clearTimeout(timer); // リサイズ後、横幅を再取得

        timer = window.setTimeout(function () {
          isResizing = false;
        }, 500);
      });

      for (var _i = 0, _arr = [this.textarea, this.previewArea]; _i < _arr.length; _i++) {
        var target = _arr[_i];
        observer.observe(target, {
          attributes: true,
          attributeFilter: ['style']
        });
      }
    }
  }, {
    key: "switch",
    value: function _switch(event) {
      var target = event.target;

      if (!target.dataset.ctrl) {
        return;
      }

      if (this.isChanged) {
        var biggerHeight = Math.max(this.textarea.offsetHeight, this.previewArea.offsetHeight);
        this.textarea.style.height = biggerHeight + "px";
        this.previewArea.style.height = biggerHeight + "px";

        if (target.dataset.ctrl === 'html') {
          this.getParsedHTML(this.textarea.value);
        }
      }

      var _iterator = _createForOfIteratorHelper(this.buttons),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var button = _step.value;
          button.disabled = button === target;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.isChanged = false;
      this.isPreview = target.dataset.ctrl === 'html';
      this.textarea.hidden = this.isPreview;
      this.previewArea.hidden = !this.isPreview;
    }
  }, {
    key: "getParsedHTML",
    value: function getParsedHTML(text) {
      var _this3 = this;

      var fetchData = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          var fetchOptions, response, responseData;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fetchOptions = {
                    method: 'POST',
                    headers: {
                      mode: 'cors',
                      'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: text
                  };
                  _context.prev = 1;
                  _context.next = 4;
                  return fetch('/api/markdown-parser', fetchOptions);

                case 4:
                  response = _context.sent;
                  _context.next = 7;
                  return response.text();

                case 7:
                  responseData = _context.sent;
                  return _context.abrupt("return", responseData);

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](1);
                  return _context.abrupt("return", '');

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 11]]);
        }));

        return function fetchData() {
          return _ref.apply(this, arguments);
        };
      }();

      this.previewArea.innerHTML = '読み込み中';
      fetchData().then(function (response) {
        _this3.previewArea.innerHTML = response;
      });
    }
  }]);

  return MarkdownViewer;
}();

/***/ }),

/***/ "./_frontend/js/widget/smoothScroll.js":
/*!*********************************************!*\
  !*** ./_frontend/js/widget/smoothScroll.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global */ "./_frontend/js/utils/global.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.


var SmoothScroll = /*#__PURE__*/function () {
  function SmoothScroll(root, options) {
    _classCallCheck(this, SmoothScroll);

    var config = {
      fixedElementSelector: '',
      // ページ上部で固定される要素をセレクターで指定
      adjust: 0,
      // 位置の調整、到着位置を上下に固定値（px）分ずらします
      speed: 400 // アニメーション速度の指定

    }; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.hash = this.root.hash;
    this.fixedElement = this.config.fixedElementSelector !== '' ? document.querySelector(this.config.fixedElementSelector) : null;
    this.isScrollToTop = this.hash === '#top';
    this.target = this.isScrollToTop ? _utils_global__WEBPACK_IMPORTED_MODULE_0__.HTML_ELEMENT : document.getElementById(this.hash.slice(1));
    this.animationFrame = null;
    this.scrollStartTime = 0;
    this.scrollStartPosition = 0;
    this.scrollEndPosition = 0;
    this.scrollDistance = 0;
    this.isScrolling = false;
    this.addEvent();
  }
  /**
   * scrollEasingSwing - スクロールエフェクトの計算
   * @param  {Number} time     経過時間
   * @param  {Number} begin    スクロール開始位置
   * @param  {Number} change   現在のスクロール位置
   * @param  {Number} duration スクロールのスピード
   * @return {Number}
   */


  _createClass(SmoothScroll, [{
    key: "addEvent",
    value:
    /**
     * addEvent - イベントバインド
     */
    function addEvent() {
      // 読み込み後にスクロール位置を調整する（一度実行でOKなのでwindow.onloadを使用）
      if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.LOCATION.hash !== '') {
        window.onload = this.scroll.bind(this);
      }

      this.root.addEventListener('click', this.scroll.bind(this));
    }
    /**
     * getPosition - スクロール位置（到達点）を取得
     * @param  {String} eventType イベントタイプ
     * @return {Number}
     */

  }, {
    key: "getPosition",
    value: function getPosition(eventType) {
      var targetElement = eventType === 'load' ? document.getElementById(_utils_global__WEBPACK_IMPORTED_MODULE_0__.LOCATION.hash.slice(1)) : this.target;
      var fixedElementHeight = !this.fixedElement ? 0 : this.fixedElement.offsetHeight; // ターゲットの要素が見つからない場合は0を返却

      if (targetElement === null) {
        return 0;
      } // ターゲット要素のページ最上部からの位置 - (ヘッダーの高さ + 調整)


      return Math.round(_utils_global__WEBPACK_IMPORTED_MODULE_0__.SCROLL_ELEMENT.scrollTop + targetElement.getBoundingClientRect().top - (fixedElementHeight + this.config.adjust));
    }
    /**
     * scroll - スクロールを実行
     * @param  {loadEvent|clickEvent} event イベントオブジェクト
     * @return {Void}
     */

  }, {
    key: "scroll",
    value: function scroll(event) {
      var type = event.type; // 不正なアンカーの場合またはスクロール中の場合

      if (!this.target || this.isScrolling) {
        return;
      }

      event.preventDefault(); // クリックイベントの場合、履歴を追加

      if (type === 'click') {
        window.history.pushState(null, null, this.hash);
      }

      this.isScrolling = true;
      this.scrollStartTime = performance.now();
      this.scrollStartPosition = _utils_global__WEBPACK_IMPORTED_MODULE_0__.SCROLL_ELEMENT.scrollTop;
      this.scrollEndPosition = event.type !== 'load' && this.isScrollToTop ? 0 : this.getPosition(type);
      this.scrollDistance = this.scrollEndPosition - this.scrollStartPosition; // ロードイベントの場合、アニメーションなしで位置を調整

      if (type === 'load') {
        this.isScrolling = false;
        window.scrollTo(0, this.scrollEndPosition);
        return;
      }

      window.requestAnimationFrame(this.animationScroll.bind(this));
    }
    /**
     * animationScroll - アニメーションスクロールを実行
     * @return {Void}
     */

  }, {
    key: "animationScroll",
    value: function animationScroll() {
      var currentTime = performance.now() - this.scrollStartTime; // animation終了時の処理

      if (currentTime > this.config.speed) {
        this.isScrolling = false;
        window.scrollTo(0, this.scrollEndPosition);
        window.cancelAnimationFrame(this.animationFrame);
        this.target.tabIndex = -1;
        this.target.focus({
          preventScroll: true
        });
        this.target.removeAttribute('tabindex');
        return;
      }

      window.scrollTo(0, SmoothScroll.scrollEasingSwing(currentTime, this.scrollStartPosition, this.scrollDistance, this.config.speed));
      this.animationFrame = window.requestAnimationFrame(this.animationScroll.bind(this));
    }
  }], [{
    key: "scrollEasingSwing",
    value: function scrollEasingSwing(time, begin, change, duration) {
      return change * (0.5 - Math.cos(time / duration * Math.PI) / 2) + begin;
    }
  }]);

  return SmoothScroll;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  document.querySelectorAll('.js-smooth-scroll').forEach(function (element) {
    return new SmoothScroll(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/tab.js":
/*!************************************!*\
  !*** ./_frontend/js/widget/tab.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global */ "./_frontend/js/utils/global.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.


var Tab = /*#__PURE__*/function () {
  /**
   * タブ
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function Tab(root, options) {
    _classCallCheck(this, Tab);

    var config = {
      defaultCurrent: 0,
      className: {
        list: 'js-tab__list',
        listItem: 'js-tab__listItem',
        ctrl: 'js-tab__control',
        content: 'js-tab__content'
      },
      prefix: {
        id: 'tab-'
      }
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.list = this.root.querySelector("." + this.config.className.list);
    this.items = this.list.querySelectorAll("." + this.config.className.listItem);
    this.controls = Array.from(this.list.querySelectorAll("." + this.config.className.ctrl));
    this.contents = this.controls.map(function (element) {
      return document.getElementById(element.hash.slice(1));
    });
    this.currentIndex = parseInt(this.root.dataset.index, 10) || this.config.defaultCurrent;
    this.currentId = this.contents[this.currentIndex].id;
    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(Tab, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.list.setAttribute('role', 'tablist');
      this.list.setAttribute('aria-activedescendant', this.contents[this.currentIndex].id);

      var _iterator = _createForOfIteratorHelper(this.items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;
          item.setAttribute('role', 'presentation');
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.controls.forEach(function (ctrl, idx) {
        var content = _this.contents[idx];
        var ctrlId = (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.randomString)(_this.config.prefix.id);
        var isCurrent = idx === _this.currentIndex;
        ctrl.id = ctrlId;
        ctrl.tabIndex = isCurrent ? 0 : -1;
        ctrl.setAttribute('role', 'tab');
        ctrl.setAttribute('aria-controls', _this.contents[idx].id);
        ctrl.setAttribute('aria-selected', "" + isCurrent);
        content.hidden = !isCurrent;
        content.tabIndex = 0;
        content.setAttribute('aria-labelledby', ctrlId);
        content.setAttribute('role', 'tabpanel');
      });
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this2 = this;

      var _iterator2 = _createForOfIteratorHelper(this.controls),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var ctrl = _step2.value;
          ctrl.addEventListener('click', function (e) {
            e.preventDefault();
            _this2.currentIndex = [].indexOf.call(_this2.controls, e.currentTarget);
            _this2.currentId = _this2.contents[_this2.currentIndex].id;

            _this2.setCurrent();
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      this.list.addEventListener('keydown', this.keydown.bind(this));
    }
    /**
     * setCurrent - タブを更新
     */

  }, {
    key: "setCurrent",
    value: function setCurrent() {
      var _this3 = this;

      this.contents.forEach(function (content, idx) {
        var ctrl = _this3.controls[idx];
        var isMatchIndex = idx === _this3.currentIndex;
        content.hidden = !isMatchIndex;
        ctrl.setAttribute('aria-selected', "" + isMatchIndex);
        ctrl.tabIndex = isMatchIndex ? 0 : -1;
      });
      this.list.setAttribute('aria-activedescendant', this.currentId);
    }
    /**
     * keydown - キーダウン時の処理
     * @param  {keydownEvent} event - イベントオブジェクト
     * @return {Void}
     */

  }, {
    key: "keydown",
    value: function keydown(event) {
      var key = event.key.replace('Arrow', '').toLowerCase(); // 左右矢印キー以外は何もしない

      if (key !== 'left' && key !== 'right') {
        return;
      } // カレントが一番初めのタブだった場合、最後のタブをカレントにする。それ以外はひとつ前をカレントに


      if (key === 'left') {
        this.currentIndex = this.currentIndex === 0 ? this.contents.length - 1 : this.currentIndex - 1; // カレントが一番最後のタブだった場合、最初のタブをカレントにする。それ以外はひとつ後をカレントに
      } else if (key === 'right') {
        this.currentIndex = this.currentIndex === this.contents.length - 1 ? 0 : this.currentIndex + 1;
      }

      this.controls[this.currentIndex].focus();
      this.setCurrent();
    }
  }]);

  return Tab;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-tab').forEach(function (element) {
    return new Tab(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/tagCategoryHelper.js":
/*!**************************************************!*\
  !*** ./_frontend/js/widget/tagCategoryHelper.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/toast */ "./_frontend/js/utils/toast.js");


function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var TagCategoryHelper = /*#__PURE__*/function () {
  /**
   * 画像リンクをMD挿入形でコピー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function TagCategoryHelper(root, options) {
    _classCallCheck(this, TagCategoryHelper);

    var config = {
      maxCount: 10,
      className: {
        cloneRoot: 'js-form-helper__cloneRoot',
        addButton: 'js-form-helper__addButton'
      }
    }; // ルートとなる要素が無い場合は実装しない

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.clone = null;
    this.cloneRoot = this.root.querySelector("." + this.config.className.cloneRoot);
    this.addButton = this.root.querySelector("." + this.config.className.addButton);
    this.submit = this.root.querySelector('button[type="submit"]');
    this.linkageTarget = document.getElementById(this.root.dataset.linkageId);
    this.action = this.root.action;
    this.count = 1;
    this.isLimited = false;
    this.toast = _utils_toast__WEBPACK_IMPORTED_MODULE_1__.createToast(); // 必要な要素が揃わなかった場合は実装しない

    if (!this.cloneRoot || !this.addButton || !this.submit || !this.linkageTarget) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(TagCategoryHelper, [{
    key: "init",
    value: function init() {
      var legend = this.cloneRoot.querySelector('legend');
      this.clone = this.cloneRoot.cloneNode(true);
      this.clone.querySelectorAll('input').forEach(function (element) {
        element.value = '';
      });
      legend.insertAdjacentText('beforeend', this.count++);
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.root.addEventListener('submit', function (e) {
        e.preventDefault();

        _this.linkage();

        _this.reset();

        _utils_toast__WEBPACK_IMPORTED_MODULE_1__.displayToast('追加しました', 5000);
      });
      this.addButton.addEventListener('click', function () {
        if (_this.isLimited) {
          return;
        }

        _this.addButton.parentNode.insertAdjacentElement('beforebegin', _this.getCloneNode());
      });
    }
  }, {
    key: "getCloneNode",
    value: function getCloneNode() {
      var _this2 = this;

      var clone = this.clone.cloneNode(true);
      var legend = clone.querySelector('legend');
      clone.querySelectorAll('input').forEach(function (element) {
        var name = element.name;
        element.name = name.replace('0', _this2.count - 1);
      });
      legend.insertAdjacentText('beforeend', this.count++);

      if (this.count > this.config.maxCount) {
        this.isLimited = true;
      }

      return clone;
    }
  }, {
    key: "linkage",
    value: function linkage() {
      var _this3 = this;

      var formData = new FormData(this.root);

      var fetchData = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
          var fetchOptions, response, responseData;
          return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fetchOptions = {
                    method: 'POST',
                    headers: {
                      mode: 'cors'
                    },
                    body: formData
                  };
                  _context.prev = 1;
                  _context.next = 4;
                  return fetch(_this3.action, fetchOptions);

                case 4:
                  response = _context.sent;
                  _context.next = 7;
                  return response.json();

                case 7:
                  responseData = _context.sent;
                  return _context.abrupt("return", responseData);

                case 11:
                  _context.prev = 11;
                  _context.t0 = _context["catch"](1);
                  return _context.abrupt("return", {});

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[1, 11]]);
        }));

        return function fetchData() {
          return _ref.apply(this, arguments);
        };
      }();

      fetchData().then(function (response) {
        return _this3.sync(response);
      });
    }
  }, {
    key: "sync",
    value: function sync(data) {
      var clone = this.linkageTarget.firstElementChild.cloneNode(true);
      var targetType = this.linkageTarget.tagName.toLowerCase();
      var items = [];

      for (var _i = 0, _Object$keys = Object.keys(data); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];

        if (targetType === 'select') {
          clone.value = data[key].id;
          clone.textContent = data[key].name;
        } else if (targetType === 'ul') {
          clone.querySelector('input').removeAttribute('checked');
          clone.querySelector('input').value = data[key].id;
          clone.querySelector('.admin-form-checkbox__label').textContent = data[key].name;
        }

        items.push(clone.outerHTML);
      }

      this.linkageTarget.insertAdjacentHTML('beforeend', items.join(''));
    }
  }, {
    key: "reset",
    value: function reset() {
      var children = Array.from(this.root.children);
      var removedChildren = children.splice(1, children.length >= 2 ? children.length - 2 : 0);
      this.isLimited = false;
      this.count = 2;
      this.cloneRoot.querySelectorAll('input').forEach(function (element) {
        element.value = '';
      });

      if (!children.length) {
        return;
      }

      var _iterator = _createForOfIteratorHelper(removedChildren),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          child.remove();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return TagCategoryHelper;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用モーダル
  document.querySelectorAll('.js-form-helper').forEach(function (element) {
    return new TagCategoryHelper(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/toggle.js":
/*!***************************************!*\
  !*** ./_frontend/js/widget/toggle.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_expand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/expand */ "./_frontend/js/widget/modules/expand.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.


var Toggle = /*#__PURE__*/function () {
  /**
   * トグルメニュー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function Toggle(root, options) {
    _classCallCheck(this, Toggle);

    var config = {
      className: {
        heading: 'js-toggle__heading',
        content: 'js-toggle__content',
        control: 'js-toggle__control',
        button: 'p-widget-toggle__button',
        altText: 'c-text-status',
        isOpen: 'is-open'
      },
      text: {
        open: '開く',
        close: '閉じる'
      }
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.headings = this.root.querySelectorAll("." + this.config.className.heading);
    this.contents = this.root.querySelectorAll("." + this.config.className.content);
    this.controls = this.getControlElement();
    this.toggle = [];
    this.currentIndex = 0;
    this.isOpen = false;
    this.isAnimate = false;

    if (!this.headings.length || !this.contents.length || this.headings.length !== this.contents.length) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(Toggle, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.root.dataset.width = Math.max(_toConsumableArray(this.contents).map(function (element) {
        var width = 0;
        element.style.display = 'inline-block';
        width = element.clientWidth;
        element.style.display = '';
        return width + 1;
      }));
      this.root.style.maxWidth = this.root.dataset.width + "px";
      this.toggle = _toConsumableArray(this.contents).map(function (content, index) {
        return new _modules_expand__WEBPACK_IMPORTED_MODULE_0__.Expand(_this.controls[index], content, content.classList.contains(_this.config.className.isOpen), false);
      });
    }
  }, {
    key: "createControlElement",
    value: function createControlElement(heading) {
      var button = document.createElement('button');
      button.type = 'button';
      button.classList.add(this.config.className.button);

      var _iterator = _createForOfIteratorHelper(heading.childNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          button.appendChild(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      button.insertAdjacentHTML('beforeend', "<span class=\"" + this.config.className.altText + "\">" + this.config.text.open + "</span>");
      heading.insertAdjacentElement('beforeend', button);
      return button;
    }
  }, {
    key: "getControlElement",
    value: function getControlElement() {
      var controls = [];

      var _iterator2 = _createForOfIteratorHelper(this.headings),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var heading = _step2.value;
          controls.push(heading.querySelector("." + this.config.className.control) || this.createControlElement(heading));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return controls;
    }
  }, {
    key: "getCurrentIndex",
    value: function getCurrentIndex(element) {
      return [].indexOf.call(this.controls, element);
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this2 = this;

      var _iterator3 = _createForOfIteratorHelper(this.controls),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var control = _step3.value;
          control.addEventListener('click', function (e) {
            if (_this2.isAnimate) {
              return;
            }

            _this2.isAnimate = true;
            _this2.currentIndex = _this2.getCurrentIndex(e.currentTarget);
            _this2.isOpen = _this2.contents[_this2.currentIndex].hidden;
            _this2.controls[_this2.currentIndex].lastElementChild.textContent = _this2.config.text[_this2.isOpen ? 'close' : 'open']; // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行

            if (!_this2.toggle[_this2.currentIndex][_this2.isOpen ? 'open' : 'close']()) {
              _this2.isAnimate = _this2.toggle[_this2.currentIndex].transitionAfter();
            }
          });
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(this.contents),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var content = _step4.value;
          content.addEventListener('transitionend', function (e) {
            // height以外のトランジションは検知しない
            if (e.propertyName !== 'height') {
              return;
            }

            _this2.isAnimate = _this2.toggle[_this2.currentIndex].transitionAfter();
          });
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }]);

  return Toggle;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-toggle').forEach(function (element) {
    return new Toggle(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/toggleMenu.js":
/*!*******************************************!*\
  !*** ./_frontend/js/widget/toggleMenu.js ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/global */ "./_frontend/js/utils/global.js");
/* harmony import */ var _utils_scrollLock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/scrollLock */ "./_frontend/js/utils/scrollLock.js");
/* harmony import */ var _modules_expand__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/expand */ "./_frontend/js/widget/modules/expand.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.




var ToggleMenu = /*#__PURE__*/function () {
  /**
   * トグルメニュー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function ToggleMenu(root, options) {
    _classCallCheck(this, ToggleMenu);

    var config = {
      className: {
        header: 'l-header__inner',
        content: 'js-toggle-menu__content',
        control: 'c-button-menu',
        altText: 'u-altText'
      },
      text: {
        button: 'メニュー'
      }
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.header = document.querySelector("." + this.config.className.header);
    this.content = this.root.querySelector("." + this.config.className.content);
    this.control = document.createElement('button');
    this.toggle = null;
    this.isOpen = false;
    this.isAnimate = false;

    if (!this.content) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(ToggleMenu, [{
    key: "init",
    value: function init() {
      this.control.classList.add(this.config.className.control);
      this.control.insertAdjacentHTML('beforeend', "<span class=\"" + this.config.className.altText + "\">" + this.config.text.button + "</span>");

      if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state === 'SP') {
        this.header.insertAdjacentElement('beforeend', this.control);
      }

      this.toggle = new _modules_expand__WEBPACK_IMPORTED_MODULE_2__.Expand(this.control, this.content, _utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state !== 'SP', true);
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.control.addEventListener('click', function () {
        if (_this.isAnimate) {
          return;
        }

        _this.isOpen = !_this.isOpen;
        _this.isAnimate = true; // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行

        if (!_this.toggle[_this.isOpen ? 'open' : 'close']()) {
          _this.isAnimate = _this.toggle.transitionAfter();
        }
      });
      this.content.addEventListener('transitionend', function (e) {
        // height以外のトランジションは検知しない
        if (e.propertyName !== 'height') {
          return;
        }

        _this.isAnimate = _this.toggle.transitionAfter();
      });
      this.root.addEventListener('keydown', function (e) {
        if (!_this.isOpen || e.key.indexOf('Esc') === -1) {
          return;
        }

        _this.isOpen = false;
        _this.isAnimate = true; // Escapeキー押下で閉じる

        if (!_this.toggle.close()) {
          _this.isAnimate = _this.toggle.transitionAfter();
        }
      });
      window.addEventListener(_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.event, function () {
        // 開いている場合、閉じる処理
        if (_this.isOpen) {
          (0,_utils_scrollLock__WEBPACK_IMPORTED_MODULE_1__.default)(false);
          (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.tabIndexControl)(true, [].concat(_toConsumableArray(_this.content.querySelectorAll(_utils_global__WEBPACK_IMPORTED_MODULE_0__.FOCUS_ELEMENTS)), [_this.control]));
        } // フラグを更新


        _this.isAnimate = false;
        _this.isOpen = false;

        _this.control.setAttribute('aria-expanded', 'false');

        if (_utils_global__WEBPACK_IMPORTED_MODULE_0__.MQL.state !== 'SP') {
          _this.content.hidden = false;

          _this.header.removeChild(_this.control);
        } else {
          _this.content.hidden = true;

          _this.header.insertAdjacentElement('beforeend', _this.control);
        }
      });
    }
  }]);

  return ToggleMenu;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-toggle-menu').forEach(function (element) {
    return new ToggleMenu(element);
  });
});

/***/ }),

/***/ "./_frontend/js/widget/toggleUserMenu.js":
/*!***********************************************!*\
  !*** ./_frontend/js/widget/toggleUserMenu.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_expand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/expand */ "./_frontend/js/widget/modules/expand.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import global variables.


var ToggleUserMenu = /*#__PURE__*/function () {
  /**
   * トグルメニュー
   *
   * @constructor
   * @param {HTMLElement} root - ルートとなる要素
   * @param {Object} options - 設定の変更をする際のオブジェクト
   */
  function ToggleUserMenu(root, options) {
    _classCallCheck(this, ToggleUserMenu);

    var config = {
      className: {
        heading: 'js-toggle-user__heading',
        content: 'js-toggle-user__content',
        control: 'js-toggle-user__control',
        button: 'admin-user__button',
        altText: 'u-altText'
      },
      text: {
        altText: 'ユーザーメニュー'
      }
    };

    if (!root) {
      return;
    }

    this.config = Object.assign(config, options);
    this.root = root;
    this.heading = this.root.querySelector("." + this.config.className.heading);
    this.content = this.root.querySelector("." + this.config.className.content);
    this.control = this.heading.querySelector("." + this.config.className.control) || this.createControlElement(this.heading);
    this.toggle = null;
    this.isOpen = false;
    this.isAnimate = false;

    if (!this.heading || !this.content) {
      return;
    }

    this.init();
    this.addEvent();
  }
  /**
   * init - 初期化
   * @return {Void}
   */


  _createClass(ToggleUserMenu, [{
    key: "init",
    value: function init() {
      this.toggle = new _modules_expand__WEBPACK_IMPORTED_MODULE_0__.Expand(this.control, this.content, false, false);
    }
  }, {
    key: "createControlElement",
    value: function createControlElement(heading) {
      var button = document.createElement('button');
      button.type = 'button';
      button.classList.add(this.config.className.button);

      var _iterator = _createForOfIteratorHelper(heading.childNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var child = _step.value;
          button.appendChild(child);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      button.insertAdjacentHTML('beforeend', "<span class=\"" + this.config.className.altText + "\">" + this.config.text.altText + "</span>");
      heading.insertAdjacentElement('beforeend', button);
      return button;
    }
    /**
     * addEvent - イベントバインド
     */

  }, {
    key: "addEvent",
    value: function addEvent() {
      var _this = this;

      this.control.addEventListener('click', function () {
        if (_this.isAnimate) {
          return;
        }

        _this.isAnimate = true;
        _this.isOpen = _this.content.hidden; // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行

        if (!_this.toggle[_this.isOpen ? 'open' : 'close']()) {
          _this.isAnimate = _this.toggle.transitionAfter();
        }
      });
      this.content.addEventListener('transitionend', function (e) {
        // height以外のトランジションは検知しない
        if (e.propertyName !== 'height') {
          return;
        }

        _this.isAnimate = _this.toggle.transitionAfter();
      });
      document.addEventListener('click', function (e) {
        if (!_this.isOpen) {
          return;
        }

        var target = e.target;
        var closestRoot = target.closest('.js-toggle-user');

        if (closestRoot) {
          return;
        }

        _this.isAnimate = true;
        _this.isOpen = false; // 開閉処理を実行、false（transition-durationが設定されていない）場合はトランジション後の処理を実行

        if (!_this.toggle.close()) {
          _this.isAnimate = _this.toggle.transitionAfter();
        }
      });
    }
  }]);

  return ToggleUserMenu;
}();
/**
 * デフォルト実行処理
 * @return {Void}
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  // 汎用タブ
  document.querySelectorAll('.js-toggle-user').forEach(function (element) {
    return new ToggleUserMenu(element);
  });
});

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ (function(module) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./_frontend/js/admin.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=admin.js.map