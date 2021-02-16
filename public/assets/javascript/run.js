/*! For license information please see run.js.LICENSE.txt */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./_frontend/js/run.js":
/*!*****************************!*\
  !*** ./_frontend/js/run.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/global */ "./_frontend/js/utils/global.js");
/* harmony import */ var _widget_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widget/toggle */ "./_frontend/js/widget/toggle.js");
/* harmony import */ var _widget_toggleMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widget/toggleMenu */ "./_frontend/js/widget/toggleMenu.js");
/* harmony import */ var _widget_follow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./widget/follow */ "./_frontend/js/widget/follow.js");
/* harmony import */ var _widget_smoothScroll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./widget/smoothScroll */ "./_frontend/js/widget/smoothScroll.js");






(function () {
  (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.setCustomEvents)();
  (0,_utils_global__WEBPACK_IMPORTED_MODULE_0__.useDeviceObserver)();
  (0,_widget_toggle__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_widget_toggleMenu__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_widget_follow__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_widget_smoothScroll__WEBPACK_IMPORTED_MODULE_4__.default)();
})();

/***/ }),

/***/ "./_frontend/js/utils/global.js":
/*!**************************************!*\
  !*** ./_frontend/js/utils/global.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./_frontend/js/widget/follow.js":
/*!***************************************!*\
  !*** ./_frontend/js/widget/follow.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./_frontend/js/widget/modules/expand.js":
/*!***********************************************!*\
  !*** ./_frontend/js/widget/modules/expand.js ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./_frontend/js/widget/smoothScroll.js":
/*!*********************************************!*\
  !*** ./_frontend/js/widget/smoothScroll.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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

/***/ "./_frontend/js/widget/toggle.js":
/*!***************************************!*\
  !*** ./_frontend/js/widget/toggle.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
/******/ 	__webpack_require__("./_frontend/js/run.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=run.js.map