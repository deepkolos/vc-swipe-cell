(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/install.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = $getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    ReflectApply(this.listener, this.target, args);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}


/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js!./node_modules/fast-sass-loader/lib/index.js!./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src!./node_modules/fast-sass-loader/lib!./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/vue-swipe-directive/index.min.js":
/*!*******************************************************!*\
  !*** ./node_modules/vue-swipe-directive/index.min.js ***!
  \*******************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t();else { var o, n; }}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={bind:function(e,t){var n,o,r,i,u,c,a,l,f,s,d,p,v=t.modifiers.lock,b=t.modifiers.capture,y=t.value,g=void 0===t.value.enable||t.value.enable;function m(t){return{element:e,scrEvt:t,offset:a,startX:n,startY:o,movingX:r,movingY:i,directionTwo:c,directionFour:u,startWidthTwo:s,startWidthFour:d}}["any","horizonal","vertical","right","left","up","down"].includes(t.arg)&&g?(e.addEventListener("touchstart",function(e){n=e.touches[0].clientX,o=e.touches[0].clientY,c=null,l=null,s=null,d=null,f=!1,p=!1},b),e.addEventListener("touchmove",function(e){r=e.touches[0].clientX,i=e.touches[0].clientY;var b,g=r-n,h=i-o,j=!1;(null==c||"any"===t.arg)&&(c=Math.abs(h)<=Math.abs(g)?"horizonal":"vertical"),"vertical"===c?(a=h,u=h<0?"up":"down"):(a=g,u=g>0?"right":"left"),b=[u,c].includes(t.arg)||"any"===t.arg,null===l&&(!0===b&&(s=c,d=u,y.start instanceof Function&&y.start(m(e),function(e){j=e},function(e){f=e})),l=b),l?(v&&(j=!0),y.move instanceof Function&&y.move(m(e),function(e){j=e},function(e){f=e}),!f&&e.stopPropagation(),j&&e.cancelable&&e.preventDefault()):p||(p=!0,y.cancel instanceof Function&&y.cancel(m(e),function(e){j=e},function(e){f=e}))},b),e.addEventListener("touchend",function(e){var t=!1;f=!0,v&&l&&(t=!0),l&&y.end instanceof Function&&y.end(m(e),function(e){t=e},function(e){f=e}),!f&&e.stopPropagation(),t&&e.cancelable&&e.preventDefault()},b)):g&&console.log("未知自定义swipe位置参数:"+t.arg)}};t.default=o}]).default});

/***/ }),

/***/ "./src/install.js":
/*!*************************************!*\
  !*** ./src/install.js + 13 modules ***!
  \*************************************/
/*! exports provided: default */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/events/events.js (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with ./node_modules/vue-swipe-directive/index.min.js (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/vc-swipe-cell.vue?vue&type=template&id=ef43eca8&scoped=true&
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class:
        "vc-swipe-cell cell-base " +
        _vm.state +
        " " +
        _vm.transitionStyle +
        " " +
        _vm.jumpStatus,
      on: {
        "!click": function($event) {
          return _vm.injectApi($event)
        }
      }
    },
    [
      ["reveal", "border", "customized"].includes(_vm.transitionStyle)
        ? [
            _c(
              "div",
              { ref: "leftCan", staticClass: "cell-left-can" },
              [_vm._t("btn-left")],
              2
            ),
            _vm._v(" "),
            _vm.btnCanBgColor
              ? _c("div", {
                  staticClass: "cell-can-bg",
                  style: "background: " + _vm.btnCanBgColor
                })
              : _vm._e(),
            _vm._v(" "),
            _c(
              "div",
              { ref: "rightCan", staticClass: "cell-right-can" },
              [_vm._t("btn-right")],
              2
            )
          ]
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { ref: "body", staticClass: "cell-body-can" },
        [
          _vm.transitionStyle === "drag"
            ? [
                _c(
                  "div",
                  { ref: "leftCan", staticClass: "cell-left-can" },
                  [_vm._t("btn-left", null, null, _vm.btnScope)],
                  2
                ),
                _vm._v(" "),
                _vm.btnCanBgColor
                  ? _c("div", {
                      staticClass: "cell-can-bg",
                      style: "background: " + _vm.btnCanBgColor
                    })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  { ref: "rightCan", staticClass: "cell-right-can" },
                  [_vm._t("btn-right", null, null, _vm.btnScope)],
                  2
                )
              ]
            : _vm._e(),
          _vm._v(" "),
          _c(
            "div",
            {
              directives: [
                {
                  name: "swipe",
                  rawName: "v-swipe:horizonal.lock",
                  value: _vm.swipeConf,
                  expression: "swipeConf",
                  arg: "horizonal",
                  modifiers: { lock: true }
                }
              ],
              staticClass: "cell-body",
              on: {
                "!click": function($event) {
                  return _vm.onClick($event)
                }
              }
            },
            [_vm._t("default", null, null, _vm.bodyScope)],
            2
          )
        ],
        2
      )
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true


// CONCATENATED MODULE: ./src/vc-swipe-cell.vue?vue&type=template&id=ef43eca8&scoped=true&

// CONCATENATED MODULE: ./src/mixins/state.js
const STATE_OPTIONS = ['active', 'inactive'];
/* harmony default export */ var state = ({
  props: {
    state: {
      type: String,
      default: STATE_OPTIONS[0],
      validator: i => STATE_OPTIONS.includes(i)
    }
  }
});
// CONCATENATED MODULE: ./src/utils/interpolator.js
const Interpolator = {
  easeOutQuint: {
    style: 'cubic-bezier(0.23, 1, 0.32, 1)',
    fn: function (t) {
      return 1 + --t * t * t * t * t;
    }
  }
};
// CONCATENATED MODULE: ./src/utils/dom.js
// const prefix = ['Moz', 'ms', 'webkit', 'O', 'KHTML'];
const prefix = ['Moz', 'ms', 'webkit'];
const prefixAttrs = ['transform', 'transition', 'transitionDuration', 'transformOrigin', 'clipPath'];

const rFA = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
const tranX = x => `translateX(${x}px)`;
const tranX3D = x => `translateX(${x}px) translateZ(0)`; // TODO: prefix只检测一次就可以了

const transform = $el => {
  const style = $el.style;
  return prefixAttrs.reduce((obj, k) => {
    obj[k] = val => {
      style[k] = val;
      prefix.forEach(pre => {
        style[pre + k.charAt(0).toUpperCase() + k.slice(1)] = val;
      });
      let thenCb;
      let duringCb;
      let offListener;
      let chain = {
        finished: false,
        then: cb => {
          thenCb = cb;
          return chain;
        },
        during: cb => {
          duringCb = cb;
          return chain;
        },
        cancel: () => {
          chain.finished = true;
          offListener();
        }
      };
      setTimeout(() => {
        if (thenCb && !duringCb) {
          offListener = once($el, 'transitionend', thenCb);
        } else if (duringCb) {
          let frame = () => {
            if (chain.finished) return;
            duringCb($el);
            rFA(frame);
          };

          offListener = once($el, 'transitionend', () => {
            thenCb && thenCb();
            chain.finished = true;
          });
          frame();
        }
      });
      return chain;
    };

    return obj;
  }, {});
};
const once = function (el, event, fn) {
  var cancelled = false;

  var canceller = function () {
    if (cancelled) return;
    cancelled = true;
    off(el, event, listener);
  };

  var listener = function () {
    if (fn) {
      fn.apply(this, arguments);
    }

    canceller();
  };

  on(el, event, listener);
  return canceller;
};
const on = (() => {
  if (document.addEventListener) {
    return (element, event, handler, useCapture = false) => {
      if (element && event && handler) {
        element.addEventListener(event, handler, useCapture);
      }
    };
  } else {
    return (element, event, handler) => {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();
const off = (() => {
  if (document.removeEventListener) {
    return (element, event, handler, useCapture = false) => {
      if (element && event) {
        element.removeEventListener(event, handler, useCapture);
      }
    };
  } else {
    return (element, event, handler) => {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
const getNow = () => {
  return window.performance && window.performance.now ? window.performance.now() + window.performance.timing.navigationStart : +new Date();
};
const dom_animate = (src, dst, duration, translate, easeFn = Interpolator.easeOutQuint.fn) => {
  let startTime = getNow();
  let destTime = startTime + duration;
  let doneCB;
  let status = {
    isAnimating: true,
    animateTimer: null,
    cancel: () => {
      status.isAnimating = false;
      return status;
    },
    finish: () => {
      translate(dst);
      doneCB instanceof Function && doneCB();
    },
    then: cb => {
      doneCB = cb;
      return status;
    }
  };

  let step = () => {
    if (!status.isAnimating) return;
    let now = getNow();

    if (now >= destTime || !duration) {
      status.isAnimating = false;
      cancelAnimationFrame(status.animateTimer);
      translate(dst);
      doneCB instanceof Function && doneCB();
      return;
    }

    now = (now - startTime) / duration;
    let easing = easeFn(now);
    let curr = Object.keys(src).reduce((acc, k) => {
      acc[k] = (dst[k] - src[k]) * easing + src[k];
      return acc;
    }, {});
    translate(curr);

    if (status.isAnimating) {
      status.animateTimer = rFA(step);
    }
  };

  step();
  return status;
};
// CONCATENATED MODULE: ./src/mixins/resize.js
 // import { debounce } from 'util/debounce';

/* harmony default export */ var resize = ({
  mounted() {
    on(window, 'resize', this.updateSize); // 让组件里的mounted先执行

    this.$nextTick(() => {
      this.updateSize();
    });
  },

  destroyed() {
    off(window, 'resize', this.updateSize);
  } // methods: {
  //   updateSize() {}
  // }


});
// EXTERNAL MODULE: ./node_modules/vue-swipe-directive/index.min.js
var index_min = __webpack_require__("./node_modules/vue-swipe-directive/index.min.js");
var index_min_default = /*#__PURE__*/__webpack_require__.n(index_min);

// CONCATENATED MODULE: ./src/libs/velocity-tracker.js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timeStamp = Date.now();
  }

}
class VelocityTracker {
  constructor(len = 5) {
    this.pointsLen = len;
    this.clear();
  }

  destroy() {
    this.pointsLen = null;
    this.points.length = 0;
  }

  clear() {
    this.points = new Array(this.pointsLen);
  }

  addMovement(point) {
    this.points.pop();
    this.points.unshift(new Point(point.x, point.y));
  }

  getPoint(lastPointCount = 0) {
    return this.points[lastPointCount];
  }

  getXVelocity(lastPointCount = 1, predictTime) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];
    if (!endPoint || !startPoint) return 0;
    if (predictTime && predictTime - startPoint.timeStamp > 80) return 0;
    return (endPoint.x - startPoint.x) / (endPoint.timeStamp - startPoint.timeStamp);
  }

  getYVelocity(lastPointCount = 1, predictTime) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];
    if (!endPoint || !startPoint) return 0;
    if (predictTime && predictTime - startPoint.timeStamp > 80) return 0;
    return (endPoint.y - startPoint.y) / (endPoint.timeStamp - startPoint.timeStamp);
  }

  getXAcceleration(lastPointCount = 1) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];
    if (!endPoint || !startPoint) return 0;
    return (endPoint.x - startPoint.x) / Math.pow(endPoint.timeStamp - startPoint.timeStamp, 2);
  }

  getYAcceleration(lastPointCount = 1) {
    const endPoint = this.points[0];
    const startPoint = this.points[lastPointCount];
    if (!endPoint || !startPoint) return 0;
    return (endPoint.y - startPoint.y) / Math.pow(endPoint.timeStamp - startPoint.timeStamp, 2);
  }

  predictX(a = -0.001) {
    const v0 = this.getXVelocity(1, Date.now());
    const d = v0 > 0 ? 1 : -1;
    let t = -v0 / a * d;
    let s = -1 / 2 * v0 * v0 / a * d;
    return {
      s,
      t
    };
  }

  predictY(a = -0.001) {
    const v0 = this.getYVelocity(1, Date.now());
    const d = v0 > 0 ? 1 : -1;
    let t = -v0 / a * d;
    let s = -1 / 2 * v0 * v0 / a * d;
    return {
      s,
      t
    };
  }

}
// CONCATENATED MODULE: ./src/utils/num.js
const restrictRange = (curr, min, max) => {
  return curr < min ? min : curr > max ? max : curr;
};
const fillPercent = percent => {
  if (percent > -0.009 && percent < 0.009) return 0;
  if (percent > 0.991 && percent < 1.009) return 1;
  return percent;
};
// EXTERNAL MODULE: ./node_modules/events/events.js
var events = __webpack_require__("./node_modules/events/events.js");
var events_default = /*#__PURE__*/__webpack_require__.n(events);

// CONCATENATED MODULE: ./src/libs/state-machine.js
// 还是比较乱, 不够通用

const _DEV = false;
class State {
  constructor(id, data = {}, nextStates = {}) {
    this.id = id;
    this.data = data;
    this.nextStates = nextStates;
    this.nextStateIds = Object.keys(nextStates).map(i => ~~i);
  }

}
const JUMP_STATUS = ['', 'can', 'may', 'do', 'done', 'not do']; // '' -> can -> may -> do     -> done
//                  -> not do -> ''
// 这个状态少了一个分支
// 在do ~ done/not do ~ init 阶段的新输入都会导致退回may阶段, 而不是直接cancel

class state_machine_StateMachine {
  constructor(initStateId, stateMapArr) {
    this.nextStateId;
    this.jumpStatus = 0;
    this.currStateId = initStateId;
    this.stateMapArr = stateMapArr;
    this.stateMap = stateMapArr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
    this.currState = this.stateMap[this.currStateId];
    this.emitter = new events_default.a();
    this.committingStateId;
  }

  destroy() {
    this.committingStateId = this.nextStateId = this.currState = this.currStateId = this.stateMapArr = this.stateMap = null;
    this.emitter.removeAllListeners();
  }

  onStateChange(cb) {
    this.emitter.on('stateChange', cb);
  }

  onceState(stateId, cb) {
    this.emitter.once('stateChange2' + stateId, cb);
  }

  getCurrState() {
    return this.currState;
  }

  getCurrStateId() {
    return this.currStateId;
  }

  getNextState() {
    if (this.stateMap) return this.stateMap[this.nextStateId];
  }

  getNextStateId() {
    return this.nextStateId;
  }

  getJumpStatus() {
    return this.jumpStatus;
  }

  setJumpStatus(nextJumpStatus) {
    this.jumpStatus = nextJumpStatus;
  }

  moveJumpStatus(nextJumpStatus, context) {
    // 中间的状态都会触发的一次的
    // 不过会标记为move的中间状态(TBD)
    // _DEV && console.log('test moveJumpStatus', nextJumpStatus);
    if (nextJumpStatus === this.jumpStatus) return;
    _DEV && console.log('moveJumpStatus', nextJumpStatus);

    if (nextJumpStatus === 3) {
      this.committingStateId = this.nextStateId;
    }

    this.jumpStatus = nextJumpStatus;
    const updateFn = this.currState.nextStates[this.nextStateId].update;
    updateFn && updateFn(JUMP_STATUS[this.jumpStatus], context, this);
  }

  moveState(nextStateId) {
    if (this.currStateId === nextStateId) return;
    this.nextStateId = nextStateId;
    this.moveJumpStatus(2);
    this.moveJumpStatus(3);
    return {
      then: cb => {
        if (cb) {
          this.onceState(nextStateId, cb);
        }
      }
    };
  }

  stateEach(cb) {
    cb && this.stateMapArr.forEach(cb);
  }

  testNextState(context) {
    this.stateMapArr.some(state => {
      return this.canJump(state.id, context);
    });
  }

  canJump(nextStateId, context) {
    const isCommitting = this.committingStateId !== undefined;
    const baseState = isCommitting ? this.stateMap[this.committingStateId] : this.currState;
    const inNextStateArr = baseState.nextStateIds.includes(nextStateId);

    if (inNextStateArr) {
      const testCan = baseState.nextStates[nextStateId].can;
      const matchCanJump = testCan instanceof Function ? testCan(context, this) : true;

      if (matchCanJump) {
        if (!isCommitting) {
          _DEV && console.log('nextStateId', nextStateId);
          this.nextStateId = nextStateId;
          this.moveJumpStatus(1, context);
          return true;
        } else {
          if (nextStateId === this.committingStateId) {
            const t = this.currStateId;
            this.currStateId = this.committingStateId;
            this.nextStateId = t;
            this.committingStateId = t;
            this.currState = this.stateMap[this.currStateId];
            this.moveJumpStatus(1, context);
            return true;
          }
        }
      }
    }

    return false;
  }

  mayJump(context) {
    if (this.jumpStatus === 0) return false;
    const testMay = this.currState.nextStates[this.nextStateId].may;
    const matchMayJump = testMay ? testMay(context, this) : true;
    this.moveJumpStatus(matchMayJump ? 2 : 1, context);
    return matchMayJump;
  }

  doJump(context) {
    if (this.jumpStatus === 2) {
      this.moveJumpStatus(3, context);
    } else if (this.jumpStatus !== 0) {
      this.moveJumpStatus(5, context);
    }
  }

  doneJump(context, force) {
    if (this.jumpStatus === 3 || force) {
      this.moveJumpStatus(4, context);
      const lastId = this.currStateId;
      this.jumpStatus = 0;
      this.currStateId = this.committingStateId;
      this.nextStateId = undefined;
      this.committingStateId = undefined;
      this.currState = this.stateMap[this.currStateId];
      this.emitter.emit('stateChange', this.currStateId, lastId);
      this.emitter.emit('stateChange2' + this.currStateId);
      _DEV && console.log('move to state ', this.currStateId);
    } else {// this.moveJumpStatus(0, context);
    }
  }

  doneNotJump(context) {
    if (this.jumpStatus === 5) {
      this.moveJumpStatus(0, context);
      _DEV && console.log('doneNotJump ', this.nextStateId);
      this.committingStateId = undefined;
      this.jumpStatus = 0;
      this.nextStateId = undefined;
    } else {// this.moveJumpStatus(0, context);
    }
  }

  cancelJump() {
    this.moveJumpStatus(0);
    this.jumpStatus = 0;
    this.nextStateId = undefined;
  }

}
// CONCATENATED MODULE: ./node_modules/happypack/loader.js??ref--0-0!./node_modules/eslint-loader!./src/vc-swipe-cell.js?vue&type=script&lang=js&







const MIN_DURATION = 200;
const MAX_LOG_INPUT = 1800;
const DEFAULT_DURATION = 280;
const MAX_OVERFLOW_OFFSET = 100;
const MAX_OVERFLOW_DURATION = 280; // const OVERFLOW_RATIO = 288 / 3 / 360;

const TRANSITION_STYLE_OPTIONS = ['reveal', 'drag', 'border', 'customized'];
const EXPANSION_STYLE_OPTIONS = ['none', 'selection', 'destructive', 'customized'];

const collectChildWidth = node => Array.prototype.map.call(node.children, $btn => $btn.getBoundingClientRect().width);

const vc_swipe_cellvue_type_script_lang_js_fillPercent = percent => {
  if (percent > -0.009 && percent < 0.009) return 0;
  if (percent > 0.991 && percent < 1.009) return 1;
  return percent;
};

/* harmony default export */ var vc_swipe_cellvue_type_script_lang_js_ = ({
  name: 'vc-swipe-cell',
  props: {
    transitionStyle: {
      type: String,
      default: TRANSITION_STYLE_OPTIONS[0],
      validator: i => TRANSITION_STYLE_OPTIONS.includes(i)
    },
    expansionStyle: {
      type: String,
      default: EXPANSION_STYLE_OPTIONS[0],
      validator: i => EXPANSION_STYLE_OPTIONS.includes(i)
    },
    threshold: {
      type: Number,
      default: 0.2
    },
    duration: {
      type: Number,
      default: DEFAULT_DURATION // TODO: 变为参考值, 根据加速度去修正

    },
    btnCanBgColor: {
      type: String,
      default: ''
    },
    overflow: {
      type: Boolean,
      default: true
    },
    bodyScope: Object,
    btnScope: Object
  },

  /**
   * event: {
   *   progress-change()
   *   swipe-start()
   *   swipe-end()
   * }
   */
  mixins: [resize, state],
  directives: {
    swipe: index_min_default.a
  },

  data() {
    return {
      jumpStatus: '',
      bodyWidth: 0,
      leftCanWidth: 0,
      rightCanWidth: 0,
      leftCanOffset: 0,
      rightCanOffset: 0
    };
  },

  computed: {
    isBorderTransition() {
      return this.transitionStyle === 'border';
    },

    isExpandable() {
      return ['selection', 'destructive'].includes(this.expand);
    },

    canExpandLeft() {
      return this.$refs.leftCan.children.length;
    },

    canExpandRight() {
      return this.$refs.rightCan.children.length;
    }

  },

  created() {
    this.swipeConf = {
      cancel: this.onSwipeCancel,
      start: this.onSwipeStart,
      move: this.onSwipeMove,
      end: this.onSwipeEnd
    };
  },

  mounted() {
    this.$bodyStyle = transform(this.$refs.body);
    this.$leftCanStyle = transform(this.$refs.leftCan);
    this.$rightCanStyle = transform(this.$refs.rightCan);
    this.updateSize();
    this.bodyOffsetCurr = 0;
    this.tracker = new VelocityTracker();

    this.bodyOffsetPredicted = () => {
      return restrictRange(this.bodyOffsetCurr + this.tracker.predictX(-0.003).s, this.swipeOffsetMin(), this.swipeOffsetMax());
    };

    this.stepper = new state_machine_StateMachine(0, [// new State(-2), // 用来做可滑动的二段溢出
    new State(-1, {
      action: 'expand',
      direction: 'left'
    }, {
      0: {
        update: jumpStatus => {
          this.jumpStatus = `${jumpStatus}-unexpand-left`;

          switch (jumpStatus) {
            case 'not do':
              this.bodyTranX(this.leftCanWidth).then(() => this.stepper.doneNotJump());
              break;

            case 'do':
              this.bodyTranX(0).then(() => this.stepper.doneJump());
              break;
          }
        },
        may: () => 1 - Math.abs(this.bodyOffsetPredicted()) / this.leftCanWidth > this.threshold,
        can: info => info.startWidthFour === 'left' && this.canExpandLeft
      },
      [-2]: {
        update: jumpStatus => {
          this.jumpStatus = `${jumpStatus}-expand-left`;

          switch (jumpStatus) {
            case 'not do':
              this.bodyTranX(this.leftCanWidth).then(() => this.stepper.doneNotJump());
              break;
          }
        },
        may: () => false,
        can: info => info.startWidthFour === 'right' && this.canExpandLeft
      }
    }), new State(0, {
      action: 'unexpand',
      direction: ''
    }, {
      1: {
        update: jumpStatus => {
          this.jumpStatus = `${jumpStatus}-expand-right`;

          switch (jumpStatus) {
            case 'not do':
              this.bodyTranX(0).then(() => this.stepper.doneNotJump());
              break;

            case 'do':
              if (this.isExpandable && this.isReachExpansion()) {
                // expandsion trigger
                console.log('expandsion trigger');
                this.bodyTranX(0).then(() => this.stepper.doneNotJump());
              } else {
                this.bodyTranX(-this.rightCanWidth).then(() => this.stepper.doneJump());
              }

              break;
          }
        },
        may: () => Math.abs(this.bodyOffsetPredicted()) / this.rightCanWidth > this.threshold,
        can: info => info.startWidthFour === 'left' && this.canExpandRight
      },
      [-1]: {
        update: jumpStatus => {
          this.jumpStatus = `${jumpStatus}-expand-left`;

          switch (jumpStatus) {
            case 'not do':
              this.bodyTranX(0).then(() => this.stepper.doneNotJump());
              break;

            case 'do':
              if (this.isExpandable && this.isReachExpansion()) {
                // expandsion trigger
                console.log('expandsion trigger');
                this.bodyTranX(0).then(() => this.stepper.doneNotJump());
              } else {
                this.bodyTranX(this.leftCanWidth).then(() => this.stepper.doneJump());
              }

              break;
          }
        },
        may: () => Math.abs(this.bodyOffsetPredicted()) / this.leftCanWidth > this.threshold,
        can: info => info.startWidthFour === 'right' && this.canExpandLeft
      }
    }), new State(1, {
      action: 'expand',
      direction: 'right'
    }, {
      0: {
        update: jumpStatus => {
          this.jumpStatus = `${jumpStatus}-unexpand-right`;

          switch (jumpStatus) {
            case 'not do':
              this.bodyTranX(-this.rightCanWidth).then(() => this.stepper.doneNotJump());
              break;

            case 'do':
              this.bodyTranX(0).then(() => this.stepper.doneJump());
              break;
          }
        },
        may: () => 1 - Math.abs(this.bodyOffsetPredicted()) / this.rightCanWidth > this.threshold,
        can: info => info.startWidthFour === 'right' && this.canExpandRight
      },
      [-2]: {
        update: jumpStatus => {
          switch (jumpStatus) {
            case 'not do':
              this.bodyTranX(-this.rightCanWidth).then(() => this.stepper.doneNotJump());
              break;
          }
        },
        may: () => false,
        can: info => info.startWidthFour === 'left' && this.canExpandRight
      }
    })]);
  },

  destroyed() {
    this.tracker.destroy();
    this.stepper.destroy();
  },

  methods: {
    // private method
    updateSize() {
      let bodyRect = this.$refs.body.getBoundingClientRect();
      let leftCanRect = this.$refs.leftCan.getBoundingClientRect();
      let rightCanRect = this.$refs.rightCan.getBoundingClientRect();
      this.bodyWidth = bodyRect.width;
      this.leftCanWidth = leftCanRect.width;
      this.rightCanWidth = rightCanRect.width;

      if (this.transitionStyle === 'drag') {
        this.leftCanOffset = -this.leftCanWidth;
        this.rightCanOffset = this.rightCanWidth;
        this.$leftCanStyle.transform(tranX(this.leftCanOffset));
        this.$rightCanStyle.transform(tranX(this.rightCanOffset));
      }

      if (this.transitionStyle === 'border' || this.transitionStyle === 'customized') {
        this.leftCanBtnsWidth = collectChildWidth(this.$refs.leftCan);
        this.rightCanBtnsWidth = collectChildWidth(this.$refs.rightCan).reverse();
      }

      if (this.transitionStyle === 'border') {
        this.$leftCanBtns = [...this.$refs.leftCan.children].map(($btn, i, arr) => {
          $btn.style.zIndex = arr.length - i;
          return transform($btn);
        });
        this.$rightCanBtns = [...this.$refs.rightCan.children].map($btn => transform($btn)).reverse();
      }
    },

    injectApi(e) {
      e.vmSwipeCell = this;
    },

    swipeOffsetMin(withOverflow) {
      const state = this.stepper.getCurrStateId();
      const nextState = this.stepper.getNextStateId(); // 向左展开 / 从左收缩

      if (state === 0 && nextState === -1 || state === -1 && nextState === 0) {
        return 0;
      } // 向右展开 / 从右收缩


      if (state === 0 && nextState === 1 || state === 1 && nextState === 0) {
        return !withOverflow && this.overflow ? -this.rightCanWidth : -this.rightCanWidth - MAX_OVERFLOW_OFFSET;
      }
    },

    swipeOffsetMax(withOverflow) {
      const state = this.stepper.getCurrStateId();
      const nextState = this.stepper.getNextStateId(); // 向左展开 / 从左收缩

      if (state === 0 && nextState === -1 || state === -1 && nextState === 0) {
        return !withOverflow && this.overflow ? this.leftCanWidth : this.leftCanWidth + MAX_OVERFLOW_OFFSET;
      } // 向右展开 / 从右收缩


      if (state === 0 && nextState === 1 || state === 1 && nextState === 0) {
        return 0;
      }
    },

    swipeOffsetDeta(withOverflow) {
      return this.swipeOffsetMax(withOverflow) - this.swipeOffsetMin(withOverflow);
    },

    swipePercentMax() {
      return this.swipeOffsetDeta(true) / this.swipeOffsetDeta();
    },

    onSwipeStart(info) {
      this.tracker.clear();
      this.currAnimation && !this.currAnimation.finished && this.currAnimation.cancel();
      this.$bodyStyle.transitionDuration('0ms');
      this.$bodyStyle.transform(tranX(this.bodyOffsetCurr));

      switch (this.stepper.getJumpStatus()) {
        case 0:
          this.stepper.testNextState(info);
          rFA(() => {
            rFA(() => {
              this.startVelocityX = this.tracker.getXVelocity();
            });
          });
          break;

        case 3:
          this.stepper.testNextState(info);
          break;

        case 5:
          this.stepper.setJumpStatus(2);
          break;
      }

      this.bodyOffsetStart = this.bodyOffsetCurr;
      this.swipeOffsetStart = info.offset;
      this.$emit('swipe-start', this.getEmitInfo());
    },

    onSwipeMove(info) {
      this.tracker.addMovement({
        x: info.movingX,
        y: info.movingY
      });
      this.stepper.mayJump(info);
      if (this.stepper.getJumpStatus() === 0) return;
      let offset = info.offset - this.swipeOffsetStart + this.bodyOffsetStart;
      this.bodyOffsetCurr = offset = restrictRange(offset, this.swipeOffsetMin(true), this.swipeOffsetMax(true)); //  else {
      //   const minOffset = this.swipeOffsetMin();
      //   const maxOffset = this.swipeOffsetMax();
      //   this.bodyOffsetCurr = offset;
      //   if (offset < minOffset)
      //     this.bodyOffsetCurr = offset =
      //       minOffset + (offset - minOffset) * OVERFLOW_RATIO;
      //   if (offset > maxOffset)
      //     this.bodyOffsetCurr = offset =
      //       maxOffset + (offset - maxOffset) * OVERFLOW_RATIO;
      // }

      rFA(() => {
        this.emitProgressChange();
      });
      this.$bodyStyle.transform(tranX(offset));
    },

    onSwipeEnd() {
      this.stepper.doJump();
    },

    onSwipeCancel() {},

    onFlingEnd() {},

    onClick(e) {
      if (this.stepper.getCurrStateId() !== 0) {
        this.unexpand();
        e.stopPropagation();
      }

      if (this.stepper.getJumpStatus() !== 0) {
        e.stopPropagation();
      }
    },

    progressPrecent() {
      const nextState = this.stepper.getNextStateId();
      let percent = vc_swipe_cellvue_type_script_lang_js_fillPercent(Math.abs(this.bodyOffsetCurr) / (this.swipeOffsetMax() - this.swipeOffsetMin()));

      if (nextState === 0) {
        return 1 - percent;
      }

      return percent;
    },

    isReachExpansion() {
      return this.progressPrecent() > 1 + 3 / 4 * MAX_OVERFLOW_OFFSET / this.swipeOffsetDeta();
    },

    ajustDuration() {
      const predictX = this.tracker.predictX(-0.006);
      const remainDistance = (1 - this.progressPrecent()) * this.swipeOffsetDeta();
      let duration = this.duration;

      if (predictX.s > remainDistance) {
        duration = remainDistance / Math.abs(predictX.s) * predictX.t * 1.5;
        return restrictRange(duration, MIN_DURATION, this.duration);
      }

      return duration;
    },

    bodyTranX(dst) {
      let thenCb;
      let src = this.bodyOffsetCurr;

      if (src === dst) {
        setTimeout(() => {
          thenCb && thenCb();
        });
      } else {
        const nextId = this.stepper.getNextStateId();
        const p = this.tracker.predictX(-0.005);
        let predictOffset = this.bodyOffsetCurr + p.s;
        const overflowed = nextId === 1 ? predictOffset < dst : nextId === -1 ? predictOffset > dst : false;

        const moveTo = () => {
          this.$bodyStyle.transitionDuration(this.ajustDuration() + 'ms');
          this.currAnimation = this.$bodyStyle.transform(tranX(dst)).then(() => {
            this.$bodyStyle.transitionDuration('0ms');
            this.bodyOffsetStart = this.bodyOffsetCurr = dst;
            thenCb && thenCb();
          }).during($el => {
            this.bodyOffsetCurr = $el.getBoundingClientRect().left;
            this.emitProgressChange();
          });
        };

        if (overflowed && this.overflow) {
          const flag = dst > 0 ? 1 : -1;
          const ADst = Math.abs(dst);
          const APredictOffset = Math.abs(predictOffset);
          const AOverflowOffset = restrictRange(APredictOffset - ADst + 1, Number.MIN_VALUE, MAX_LOG_INPUT);
          let predictDuration = restrictRange(p.t, MAX_OVERFLOW_DURATION / 1.5, MAX_OVERFLOW_DURATION);
          predictDuration = predictDuration * this.duration / DEFAULT_DURATION;
          predictOffset = dst + flag * Math.pow(AOverflowOffset / MAX_LOG_INPUT, 2) * MAX_OVERFLOW_OFFSET;
          this.$bodyStyle.transitionDuration(predictDuration + 'ms');
          this.currAnimation = this.$bodyStyle.transform(tranX(predictOffset)).then(moveTo).during($el => {
            this.bodyOffsetCurr = $el.getBoundingClientRect().left;
            this.emitProgressChange();
          });
        } else {
          moveTo();
        }
      }

      return {
        then: cb => {
          thenCb = cb;
        }
      };
    },

    getBorderLeftBtnTranX(btnIndex, percent) {
      const startOffset = -this.leftCanBtnsWidth.slice(0, btnIndex + 1).reduce((a, b) => a + b);
      return (0 - startOffset) * percent + startOffset;
    },

    getBorderRightBtnTranX(btnIndex, percent) {
      const startOffset = this.rightCanBtnsWidth.slice(0, btnIndex + 1).reduce((a, b) => a + b);
      return (0 - startOffset) * percent + startOffset;
    },

    updateBorderTranX(info = {}) {
      const currState = info.currState.id;
      const nextState = info.nextState.id;
      if (!nextState) return;
      let percent = info.percent;
      let transitionType = 'follow';

      const animate = duration => {
        if (currState === -1 || nextState === -1) {
          this.$leftCanBtns.forEach(($btnStyle, i) => {
            $btnStyle.transitionDuration(duration);
            $btnStyle.transform(tranX3D(this.getBorderLeftBtnTranX(i, percent)));
          });
        }

        if (currState === 1 || nextState === 1) {
          this.$rightCanBtns.forEach(($btnStyle, i) => {
            $btnStyle.transform(tranX3D(this.getBorderRightBtnTranX(i, percent)));
          });
        }
      };

      switch (this.expansionStyle) {
        case 'none':
          break;

        case 'selection':
          if (this.isReachExpansion()) {
            // 慢速推进
            transitionType = 'jump';
            percent = this.swipePercentMax();
          } else if (percent > 1) {
            percent = 1 + (percent - 1) / 3;
          }

          break;

        case 'destructive':
          break;
      }

      animate(transitionType === 'follow' ? '' : '280ms');
    },

    updateRevealTranX(info = {}) {
      const percent = info.percent;

      if (percent > 1) {
        switch (this.expansionStyle) {
          case 'none':
            // 跟随修正
            break;

          case 'selection':
            // 慢速推进
            if (this.isReachExpansion()) {// 立即跳转更新
            }

            break;

          case 'destructive':
            break;
        }
      }
    },

    updateDragTranX() {},

    getEmitInfo() {
      const currState = this.stepper.getCurrState();
      const nextState = this.stepper.getNextState();
      let percent = vc_swipe_cellvue_type_script_lang_js_fillPercent(Math.abs(this.bodyOffsetCurr) / (this.swipeOffsetMax() - this.swipeOffsetMin()));

      if (!nextState) {
        return {
          percent,
          currState,
          vm: this,
          startVelocityX: this.startVelocityX
        };
      }

      let btns;
      let btnsWidth;
      let btnCanWidth;

      if (currState.id === -1 || nextState.id === -1) {
        btns = [...this.$refs.leftCan.children];
        btnsWidth = this.leftCanBtnsWidth;
        btnCanWidth = this.leftCanWidth;
      } else {
        btns = [...this.$refs.rightCan.children].reverse();
        btnsWidth = this.rightCanBtnsWidth;
        btnCanWidth = this.rightCanWidth;
      }

      return {
        btns,
        percent,
        btnsWidth,
        btnCanWidth,
        currState,
        nextState,
        vm: this,
        startVelocityX: this.startVelocityX
      };
    },

    emitProgressChange() {
      const info = this.getEmitInfo();

      switch (this.transitionStyle) {
        case 'reveal':
          this.updateRevealTranX(info);
          break;

        case 'drag':
          this.updateDragTranX(info);
          break;

        case 'border':
          this.updateBorderTranX(info);
          break;
      }

      this.$emit('progress-change', info);
    },

    // public method
    unexpand() {
      return this.stepper.moveState(0);
    },

    expand(left) {
      if (left === 'left') {
        return this.stepper.moveState(-1);
      }
      /* right */
      else {
          return this.stepper.moveState(1);
        }
    },

    onceUnexpand(cb) {
      this.stepper.onceState(0, cb);
    }

  }
});
// CONCATENATED MODULE: ./src/vc-swipe-cell.js?vue&type=script&lang=js&
 /* harmony default export */ var src_vc_swipe_cellvue_type_script_lang_js_ = (vc_swipe_cellvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true&
var vc_swipe_cellvue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true_ = __webpack_require__("./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true&");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/vc-swipe-cell.vue






/* normalize component */

var component = normalizeComponent(
  src_vc_swipe_cellvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "ef43eca8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/vc-swipe-cell.vue"
/* harmony default export */ var vc_swipe_cell = (component.exports);
// CONCATENATED MODULE: ./src/install.js

const version = "1.0.0";

const install = function (Vue) {
  if (install.installed) return;
  Vue.component(vc_swipe_cell.name, vc_swipe_cell);
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var src_install = __webpack_exports__["default"] = ({
  install,
  version,
  VcSwipeCell: vc_swipe_cell
});

/***/ }),

/***/ "./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true&":
/*!******************************************************************************************!*\
  !*** ./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true& ***!
  \******************************************************************************************/
/*! no static exports found */
/*! ModuleConcatenation bailout: Module exports are unknown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_node_modules_fast_sass_loader_lib_index_js_vc_swipe_cell_scss_vue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/mini-css-extract-plugin/dist/loader.js!../node_modules/css-loader/dist/cjs.js!../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../node_modules/postcss-loader/src!../node_modules/fast-sass-loader/lib!./vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true& */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js!./node_modules/fast-sass-loader/lib/index.js!./src/vc-swipe-cell.scss?vue&type=style&index=0&id=ef43eca8&lang=scss&scoped=true&");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_node_modules_fast_sass_loader_lib_index_js_vc_swipe_cell_scss_vue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_node_modules_fast_sass_loader_lib_index_js_vc_swipe_cell_scss_vue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_node_modules_fast_sass_loader_lib_index_js_vc_swipe_cell_scss_vue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_node_modules_fast_sass_loader_lib_index_js_vc_swipe_cell_scss_vue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_node_modules_fast_sass_loader_lib_index_js_vc_swipe_cell_scss_vue_type_style_index_0_id_ef43eca8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=vc-swipe-cell.js.map