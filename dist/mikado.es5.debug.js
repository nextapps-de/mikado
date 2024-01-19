/**!
 * Mikado.js v0.8.304 (ES5/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var n = n || {};
n.scope = {};
n.getGlobal = function(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
};
n.global = n.getGlobal(this);
n.checkEs6ConformanceViaProxy = function() {
  try {
    var a = {}, b = Object.create(new n.global.Proxy(a, {get:function(c, d, f) {
      return c == a && "q" == d && f == b;
    }}));
    return !0 === b.q;
  } catch (c) {
    return !1;
  }
};
n.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS = !1;
n.ES6_CONFORMANCE = n.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS && n.checkEs6ConformanceViaProxy();
n.arrayIteratorImpl = function(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
};
n.arrayIterator = function(a) {
  return {next:n.arrayIteratorImpl(a)};
};
n.ASSUME_ES5 = !1;
n.ASSUME_NO_NATIVE_MAP = !1;
n.ASSUME_NO_NATIVE_SET = !1;
n.SIMPLE_FROUND_POLYFILL = !1;
n.ISOLATE_POLYFILLS = !1;
n.FORCE_POLYFILL_PROMISE = !1;
n.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1;
n.defineProperty = n.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
n.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
n.TRUST_ES6_POLYFILLS = !n.ISOLATE_POLYFILLS || n.IS_SYMBOL_NATIVE;
n.polyfills = {};
n.propertyToPolyfillSymbol = {};
n.POLYFILL_PREFIX = "$jscp$";
n.polyfill = function(a, b, c, d) {
  b && (n.ISOLATE_POLYFILLS ? n.polyfillIsolated(a, b, c, d) : n.polyfillUnisolated(a, b, c, d));
};
n.polyfillUnisolated = function(a, b) {
  var c = n.global;
  a = a.split(".");
  for (var d = 0; d < a.length - 1; d++) {
    var f = a[d];
    if (!(f in c)) {
      return;
    }
    c = c[f];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d && null != b && n.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
n.polyfillIsolated = function(a, b, c) {
  var d = a.split(".");
  a = 1 === d.length;
  var f = d[0];
  f = !a && f in n.polyfills ? n.polyfills : n.global;
  for (var m = 0; m < d.length - 1; m++) {
    var g = d[m];
    if (!(g in f)) {
      return;
    }
    f = f[g];
  }
  d = d[d.length - 1];
  c = n.IS_SYMBOL_NATIVE && "es6" === c ? f[d] : null;
  b = b(c);
  null != b && (a ? n.defineProperty(n.polyfills, d, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === n.propertyToPolyfillSymbol[d] && (a = 1E9 * Math.random() >>> 0, n.propertyToPolyfillSymbol[d] = n.IS_SYMBOL_NATIVE ? n.global.Symbol(d) : n.POLYFILL_PREFIX + a + "$" + d), n.defineProperty(f, n.propertyToPolyfillSymbol[d], {configurable:!0, writable:!0, value:b})));
};
n.initSymbol = function() {
};
n.polyfill("Symbol", function(a) {
  function b(m) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (m || "") + "_" + f++, m);
  }
  function c(m, g) {
    this.$jscomp$symbol$id_ = m;
    n.defineProperty(this, "description", {configurable:!0, writable:!0, value:g});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", f = 0;
  return b;
}, "es6", "es3");
n.polyfill("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = n.global[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && n.defineProperty(d.prototype, a, {configurable:!0, writable:!0, value:function() {
      return n.iteratorPrototype(n.arrayIteratorImpl(this));
    }});
  }
  return a;
}, "es6", "es3");
n.iteratorPrototype = function(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
};
n.makeIterator = function(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return n.arrayIterator(a);
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
};
n.owns = function(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
};
n.polyfill("WeakMap", function(a) {
  function b(k) {
    this.id_ = (e += Math.random() + 1).toString();
    if (k) {
      k = n.makeIterator(k);
      for (var l; !(l = k.next()).done;) {
        l = l.value, this.set(l[0], l[1]);
      }
    }
  }
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), l = Object.seal({}), p = new a([[k, 2], [l, 3]]);
      if (2 != p.get(k) || 3 != p.get(l)) {
        return !1;
      }
      p.delete(k);
      p.set(l, 4);
      return !p.has(k) && 4 == p.get(l);
    } catch (r) {
      return !1;
    }
  }
  function d() {
  }
  function f(k) {
    var l = typeof k;
    return "object" === l && null !== k || "function" === l;
  }
  function m(k) {
    if (!n.owns(k, h)) {
      var l = new d();
      n.defineProperty(k, h, {value:l});
    }
  }
  function g(k) {
    if (!n.ISOLATE_POLYFILLS) {
      var l = Object[k];
      l && (Object[k] = function(p) {
        if (p instanceof d) {
          return p;
        }
        Object.isExtensible(p) && m(p);
        return l(p);
      });
    }
  }
  if (n.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && n.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (c()) {
      return a;
    }
  }
  var h = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var e = 0;
  b.prototype.set = function(k, l) {
    if (!f(k)) {
      throw Error("Invalid WeakMap key");
    }
    m(k);
    if (!n.owns(k, h)) {
      throw Error("WeakMap key fail: " + k);
    }
    k[h][this.id_] = l;
    return this;
  };
  b.prototype.get = function(k) {
    return f(k) && n.owns(k, h) ? k[h][this.id_] : void 0;
  };
  b.prototype.has = function(k) {
    return f(k) && n.owns(k, h) && n.owns(k[h], this.id_);
  };
  b.prototype.delete = function(k) {
    return f(k) && n.owns(k, h) && n.owns(k[h], this.id_) ? delete k[h][this.id_] : !1;
  };
  return b;
}, "es6", "es3");
n.MapEntry = function() {
};
n.polyfill("Map", function(a) {
  function b() {
    var e = {};
    return e.previous = e.next = e.head = e;
  }
  function c(e, k) {
    var l = e[1];
    return n.iteratorPrototype(function() {
      if (l) {
        for (; l.head != e[1];) {
          l = l.previous;
        }
        for (; l.next != l.head;) {
          return l = l.next, {done:!1, value:k(l)};
        }
        l = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(e, k) {
    var l = k && typeof k;
    "object" == l || "function" == l ? g.has(k) ? l = g.get(k) : (l = "" + ++h, g.set(k, l)) : l = "p_" + k;
    var p = e[0][l];
    if (p && n.owns(e[0], l)) {
      for (e = 0; e < p.length; e++) {
        var r = p[e];
        if (k !== k && r.key !== r.key || k === r.key) {
          return {id:l, list:p, index:e, entry:r};
        }
      }
    }
    return {id:l, list:p, index:-1, entry:void 0};
  }
  function f(e) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (e) {
      e = n.makeIterator(e);
      for (var k; !(k = e.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  function m() {
    if (n.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({x:4}), k = new a(n.makeIterator([[e, "s"]]));
      if ("s" != k.get(e) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var l = k.entries(), p = l.next();
      if (p.done || p.value[0] != e || "s" != p.value[1]) {
        return !1;
      }
      p = l.next();
      return p.done || 4 != p.value[0].x || "t" != p.value[1] || !l.next().done ? !1 : !0;
    } catch (r) {
      return !1;
    }
  }
  if (n.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && n.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (m()) {
      return a;
    }
  }
  var g = new WeakMap();
  f.prototype.set = function(e, k) {
    e = 0 === e ? 0 : e;
    var l = d(this, e);
    l.list || (l.list = this[0][l.id] = []);
    l.entry ? l.entry.value = k : (l.entry = {next:this[1], previous:this[1].previous, head:this[1], key:e, value:k}, l.list.push(l.entry), this[1].previous.next = l.entry, this[1].previous = l.entry, this.size++);
    return this;
  };
  f.prototype.delete = function(e) {
    e = d(this, e);
    return e.entry && e.list ? (e.list.splice(e.index, 1), e.list.length || delete this[0][e.id], e.entry.previous.next = e.entry.next, e.entry.next.previous = e.entry.previous, e.entry.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].previous = b();
    this.size = 0;
  };
  f.prototype.has = function(e) {
    return !!d(this, e).entry;
  };
  f.prototype.get = function(e) {
    return (e = d(this, e).entry) && e.value;
  };
  f.prototype.entries = function() {
    return c(this, function(e) {
      return [e.key, e.value];
    });
  };
  f.prototype.keys = function() {
    return c(this, function(e) {
      return e.key;
    });
  };
  f.prototype.values = function() {
    return c(this, function(e) {
      return e.value;
    });
  };
  f.prototype.forEach = function(e, k) {
    for (var l = this.entries(), p; !(p = l.next()).done;) {
      p = p.value, e.call(k, p[1], p[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var h = 0;
  return f;
}, "es6", "es3");
n.polyfill("Promise", function(a) {
  function b(g) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var h = this.createResolveAndReject_();
    try {
      g(h.resolve, h.reject);
    } catch (e) {
      h.reject(e);
    }
  }
  function c() {
    this.batch_ = null;
  }
  function d(g) {
    return g instanceof b ? g : new b(function(h) {
      h(g);
    });
  }
  if (a && (!(n.FORCE_POLYFILL_PROMISE || n.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof n.global.PromiseRejectionEvent) || !n.global.Promise || -1 === n.global.Promise.toString().indexOf("[native code]"))) {
    return a;
  }
  c.prototype.asyncExecute = function(g) {
    if (null == this.batch_) {
      this.batch_ = [];
      var h = this;
      this.asyncExecuteFunction(function() {
        h.executeBatch_();
      });
    }
    this.batch_.push(g);
  };
  var f = n.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(g) {
    f(g, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var g = this.batch_;
      this.batch_ = [];
      for (var h = 0; h < g.length; ++h) {
        var e = g[h];
        g[h] = null;
        try {
          e();
        } catch (k) {
          this.asyncThrow_(k);
        }
      }
    }
    this.batch_ = null;
  };
  c.prototype.asyncThrow_ = function(g) {
    this.asyncExecuteFunction(function() {
      throw g;
    });
  };
  b.prototype.createResolveAndReject_ = function() {
    function g(k) {
      return function(l) {
        e || (e = !0, k.call(h, l));
      };
    }
    var h = this, e = !1;
    return {resolve:g(this.resolveTo_), reject:g(this.reject_)};
  };
  b.prototype.resolveTo_ = function(g) {
    if (g === this) {
      this.reject_(new TypeError("A Promise cannot resolve to itself"));
    } else if (g instanceof b) {
      this.settleSameAsPromise_(g);
    } else {
      a: {
        switch(typeof g) {
          case "object":
            var h = null != g;
            break a;
          case "function":
            h = !0;
            break a;
          default:
            h = !1;
        }
      }
      h ? this.resolveToNonPromiseObj_(g) : this.fulfill_(g);
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(g) {
    var h = void 0;
    try {
      h = g.then;
    } catch (e) {
      this.reject_(e);
      return;
    }
    "function" == typeof h ? this.settleSameAsThenable_(h, g) : this.fulfill_(g);
  };
  b.prototype.reject_ = function(g) {
    this.settle_(2, g);
  };
  b.prototype.fulfill_ = function(g) {
    this.settle_(1, g);
  };
  b.prototype.settle_ = function(g, h) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.state_);
    }
    this.state_ = g;
    this.result_ = h;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  b.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var g = this;
    f(function() {
      if (g.notifyUnhandledRejection_()) {
        var h = n.global.console;
        "undefined" !== typeof h && h.error(g.result_);
      }
    }, 1);
  };
  b.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var g = n.global.CustomEvent, h = n.global.Event, e = n.global.dispatchEvent;
    if ("undefined" === typeof e) {
      return !0;
    }
    "function" === typeof g ? g = new g("unhandledrejection", {cancelable:!0}) : "function" === typeof h ? g = new h("unhandledrejection", {cancelable:!0}) : (g = n.global.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
    g.promise = this;
    g.reason = this.result_;
    return e(g);
  };
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var g = 0; g < this.onSettledCallbacks_.length; ++g) {
        m.asyncExecute(this.onSettledCallbacks_[g]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var m = new c();
  b.prototype.settleSameAsPromise_ = function(g) {
    var h = this.createResolveAndReject_();
    g.callWhenSettled_(h.resolve, h.reject);
  };
  b.prototype.settleSameAsThenable_ = function(g, h) {
    var e = this.createResolveAndReject_();
    try {
      g.call(h, e.resolve, e.reject);
    } catch (k) {
      e.reject(k);
    }
  };
  b.prototype.then = function(g, h) {
    function e(r, t) {
      return "function" == typeof r ? function(w) {
        try {
          k(r(w));
        } catch (z) {
          l(z);
        }
      } : t;
    }
    var k, l, p = new b(function(r, t) {
      k = r;
      l = t;
    });
    this.callWhenSettled_(e(g, k), e(h, l));
    return p;
  };
  b.prototype.catch = function(g) {
    return this.then(void 0, g);
  };
  b.prototype.callWhenSettled_ = function(g, h) {
    function e() {
      switch(k.state_) {
        case 1:
          g(k.result_);
          break;
        case 2:
          h(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? m.asyncExecute(e) : this.onSettledCallbacks_.push(e);
    this.isRejectionHandled_ = !0;
  };
  b.resolve = d;
  b.reject = function(g) {
    return new b(function(h, e) {
      e(g);
    });
  };
  b.race = function(g) {
    return new b(function(h, e) {
      for (var k = n.makeIterator(g), l = k.next(); !l.done; l = k.next()) {
        d(l.value).callWhenSettled_(h, e);
      }
    });
  };
  b.all = function(g) {
    var h = n.makeIterator(g), e = h.next();
    return e.done ? d([]) : new b(function(k, l) {
      function p(w) {
        return function(z) {
          r[w] = z;
          t--;
          0 == t && k(r);
        };
      }
      var r = [], t = 0;
      do {
        r.push(void 0), t++, d(e.value).callWhenSettled_(p(r.length - 1), l), e = h.next();
      } while (!e.done);
    });
  };
  return b;
}, "es6", "es3");
n.iteratorFromArray = function(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, f = {next:function() {
    if (!d && c < a.length) {
      var m = c++;
      return {value:b(m, a[m]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  f[Symbol.iterator] = function() {
    return f;
  };
  return f;
};
n.polyfill("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return n.iteratorFromArray(this, function(b) {
      return b;
    });
  };
}, "es6", "es3");
n.polyfill("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
}, "es6", "es3");
n.polyfill("Array.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var f = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + f, 0)); c < f; c++) {
      var m = d[c];
      if (m === b || Object.is(m, b)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
n.checkStringArgs = function(a, b, c) {
  if (null == a) {
    throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
  }
  if (b instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
  }
  return a + "";
};
n.polyfill("String.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    return -1 !== n.checkStringArgs(this, b, "includes").indexOf(b, c || 0);
  };
}, "es6", "es3");
var q = {}, u = {}, v = Object.create(null), x = Object.create(null), A = document.documentElement || document.body.parentNode, B = "ontouchstart" in window, C = !B && window.PointerEvent && navigator.maxTouchPoints;
D.eventCache = !1;
D.eventBubble = !1;
var ba;
function F(a, b) {
  var c = a.target;
  if (c !== window && c !== A) {
    var d = D.eventCache, f = D.eventBubble;
    b || (b = a.type);
    var m;
    d && (m = c["_mke" + b]);
    if ("undefined" === typeof m) {
      for (var g = c; g && g !== A;) {
        var h = void 0;
        "click" === b && ba && (h = g.getAttribute("tap"));
        h || (h = g.getAttribute(b));
        if (h) {
          var e = h.indexOf(":"), k = g;
          if (-1 < e) {
            var l = h.substring(0, e);
            e = h.substring(e + 1);
            for (h = ""; (k = k.parentElement) !== A;) {
              if (k.hasAttribute(e)) {
                h = l;
                break;
              }
            }
            h || console.warn("Event root '" + e + "' was not found for the event: '" + l + "'.");
          }
          if (h && (m || (m = [], d && (c["_mke" + b] = m)), m.push([h, k]), h = x[h], !f || h && (h.stop || h.cancel))) {
            break;
          }
        }
        g = g.parentElement;
      }
      d && (m || (c["_mke" + b] = null));
    }
    if (m) {
      for (f = 0; f < m.length; f++) {
        if (k = m[f], g = k[0], h = v[g]) {
          k = k[1];
          if (l = x[g]) {
            l.prevent && a.preventDefault(), l.stop && a.stopImmediatePropagation(), l.once && (v[g] = null, d && (c["_mke" + b] = null));
          }
          h(k, a);
        } else {
          console.warn("The route '" + g + "' is not defined for the event '" + b + "'.");
        }
      }
    }
  }
}
function ca(a, b) {
  q[a] || (G(1, a, F, b), q[a] = 1, u[a] = b || null);
  return this;
}
var H, I, da;
if (B || C) {
  var ea = function(a) {
    var b = H, c = I, d = a, f = a.changedTouches;
    f && (d = f[0]);
    H = d.clientX;
    I = d.clientY;
    15 > Math.abs(H - b) && 15 > Math.abs(I - c) && F(a, "tap");
  }, fa = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    H = b.clientX;
    I = b.clientY;
  }, ha = {passive:!1, capture:!0};
  da = function(a) {
    G(a, C ? "pointerdown" : "touchstart", fa, ha);
    G(a, C ? "pointerup" : "touchend", ea, ha);
  };
}
function G(a, b, c, d) {
  if ("tap" === b) {
    if (B || C) {
      da(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function J(a, b, c) {
  var d;
  c && (d = a._mkc) && (a._mkc = null);
  for (var f = b.length, m = Array(f), g = {}, h = 0, e, k, l, p = null; h < f; h++) {
    e = b[h];
    if (k = e.v) {
      if (l = e = g[k], !l) {
        a: {
          e = a;
          l = 0;
          for (var r = k.length, t = ""; l < r; l++) {
            var w = k[l];
            t += w;
            if (g[t]) {
              e = g[t];
            } else {
              if (">" === w) {
                e = e.firstChild;
              } else if ("|" === w) {
                e = [e.firstChild, e];
                break a;
              } else if ("@" === w) {
                e = [e.style, e];
                break a;
              } else {
                e = e.nextSibling;
              }
              g[t] = e;
            }
          }
          e = [e, null];
        }
        l = e[0];
        e = e[1] || l;
      }
    } else {
      l = e = a;
    }
    c && (p = d ? d[h] : {}, e._mkc = p);
    m[h] = new K(p, l, "");
  }
  return a._mkp = m;
}
function L(a, b, c, d, f, m) {
  m || (a.fullproxy = 1);
  var g = f || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text)), h, e;
  if (e = b.class) {
    "object" === typeof e ? (c.push(new K(h = {_c:""}, g, d)), (e = e[0]) ? M(a, e, ["_c", c.length - 1]) : a.fullproxy = 0) : f || (g.className = e);
  }
  if (e = b.attr) {
    for (var k in e) {
      var l = e[k];
      "object" === typeof l ? (h || c.push(new K(h = {}, g, d)), h["_a" + k] = !1, (l = l[0]) ? M(a, l, ["_a", c.length - 1, k]) : a.fullproxy = 0) : f || g.setAttribute(k, l);
    }
  }
  if (e = b.event) {
    for (var p in e) {
      f || g.setAttribute(p, e[p]), ca(p);
    }
  }
  if (e = b.style) {
    "object" === typeof e ? (c.push(new K(h || (h = {}), g.style, d + "@")), h._s = "", (e = e[0]) ? M(a, e, ["_s", c.length - 1]) : a.fullproxy = 0) : f || (g.style.cssText = e);
  }
  if (e = b.text) {
    if ("object" === typeof e) {
      var r = g;
      e = e[0];
      b.tag ? (d += "|", r = !f && g.firstChild, r || (r = document.createTextNode(e), g.appendChild(r))) : h = {};
      (h || (h = {}))._t = e;
      c.push(new K(h, r, d));
      e ? M(a, e, ["_t", c.length - 1]) : a.fullproxy = 0;
    } else {
      f || (b.tag ? g.textContent = e : g.nodeValue = e);
    }
  } else if (e = b.child) {
    if (f && (f = f.firstChild, !f)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    e.constructor !== Array && (e = [e]);
    b = 0;
    for (r = e.length; b < r; b++) {
      if (k = e[b], d = b ? d + "+" : d + ">", k = L(a, k, c, d, f, 1), f) {
        if (b < r - 1 && (f = f.nextSibling, !f)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        g.appendChild(k);
      }
    }
  } else if (e = b.html) {
    "object" === typeof e ? (h || c.push(new K(h = {}, g, d)), h._h = "", (e = e[0]) ? M(a, e, ["_h", c.length - 1]) : a.fullproxy = 0) : f || (g.innerHTML = e);
  } else if (e = b.inc) {
    h || c.push(new K(null, g, d));
    if ("string" === typeof e) {
      r = N[e];
      if (!r) {
        throw Error("The partial template '" + e + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(r instanceof D)) {
        d = r[0];
        if (b = r[1]) {
          b.async = !1, f && (b.root = f, b.hydrate = !0);
        }
        N[e] = r = new D(d, b);
      }
    } else if (1 !== e) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      r = new D({name:a.name + "|" + d, tpl:e, key:e.key, cache:e.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:g, hydrate:!!f});
    }
    1 !== e && a.inc.push(r);
  }
  h && (g._mkc = h);
  m || (g._mkp = c);
  return g;
}
function M(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
var O = {checked:1, selected:1, hidden:1};
function K(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
K.prototype._a = function(a, b, c, d) {
  if (this.c) {
    if (c) {
      if (d || 0 === d) {
        c = c[d] || (c[d] = {});
      }
      c["_a" + a] = b;
    }
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  O[a] ? this.n[a] = b : !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b);
};
K.prototype._t = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._t = a;
    }
    if (this.c._t === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
K.prototype._c = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._c = a;
    }
    if (this.c._c === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
K.prototype._s = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._s = a;
    }
    if (this.c._s === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
K.prototype._h = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._h = a;
    }
    if (this.c._h === a) {
      return;
    }
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
var ja = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (var d in b) {
      this.define(b, d, b[d]);
    }
    b._mkx = this;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    var f = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(m) {
      ia(f, d = m, c);
    }});
  };
  return a;
}();
function ka(a, b) {
  return "_mkx" === b ? this : a[b];
}
function la(a, b, c) {
  ia(this, c, b);
  a[b] = c;
  return !0;
}
function ia(a, b, c) {
  if (c = a.fn[c]) {
    for (var d = 0; d < c.length; d++) {
      var f = c[d], m = f[0], g = a.path[f[1]];
      f = f[2] || "";
      g.c && g.c[m + f] === b || (f ? g[m](f, b) : g[m](b));
    }
  }
}
;var N = Object.create(null);
function D(a, b) {
  b = void 0 === b ? {} : b;
  if (!(this instanceof D)) {
    return new D(a, b);
  }
  if ("string" === typeof a) {
    var c = N[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof D) {
      return c;
    }
    a = c[0];
    b || (b = c[1]);
  }
  if (!a) {
    throw Error("Initialization Error: Template is not defined.");
  }
  if (!a.tpl) {
    throw Error("Initialization Error: Template isn't supported.");
  }
  this.dom = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.shadow = b.shadow || !1;
  this.key = a.key || "";
  this.live = {};
  c = a.fn;
  a.fc || c && (a.fc = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (c = this.recycle || !!this.key) && b.pool || 0;
  this.pool_shared = [];
  this.pool_keyed = new Map();
  this.cache = c && (a.cache || !!b.cache);
  this.async = !!b.async;
  this.timer = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.fullproxy = 0;
  (a = b.observe) && (new P(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
D.prototype.mount = function(a, b) {
  if (!a) {
    throw Error("No target was passed to .mount()");
  }
  this.timer && this.cancel();
  this.shadow && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  var c = a._mki, d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.dom = a._mkd;
    this.length = this.dom.length;
  } else if (c) {
    c.clear();
    a._mkd = this.dom = [];
    this.length = 0;
    a.firstChild && (a.textContent = "");
    var f = this.on && this.on.unmount;
    f && f(a, c);
  } else {
    if (b) {
      f = a.children;
      for (var m = f.length, g = Array(m), h = 0; h < m; h++) {
        g[h] = f[h];
      }
      this.dom = g;
      this.length = this.dom.length;
    } else {
      this.dom = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.dom;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.live), c === this) {
      this.live = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (c = 0; c < this.length; c++) {
          f = this.dom[c], (m = f.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), f._mkk = m, d[m] = f;
        }
      }
      a._mkl = this.live = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), L(this, this.tpl.tpl, [], "", this.factory) && Q(this)), this.tpl && (this.factory = L(this, this.tpl.tpl, [], ""), Q(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function Q(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
function ma(a, b, c, d, f) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  if ("function" === typeof c || !0 === c) {
    f = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    f = d, d = null;
  }
  if (f) {
    return new Promise(function(h) {
      requestAnimationFrame(function() {
        ma(a, b, c, d);
        "function" === typeof f && f();
        h();
      });
    });
  }
  if (c || b.fn) {
    var m = new D(b);
    if (c && Array.isArray(c)) {
      for (var g = 0; g < c.length; g++) {
        a.append(m.create(c[g], d, g));
      }
    } else {
      a.append(m.create(c, d));
    }
    m.destroy();
  } else {
    m = L({}, b.tpl, [], "", null, 1), a.append(m);
  }
  return D;
}
D.prototype.render = function(a, b, c, d) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  if (!d) {
    var f;
    if (b && (f = "function" === typeof b) || !0 === b) {
      c = b, b = null;
    }
    this.timer && this.cancel();
    if (this.async || c) {
      var m = this;
      f || (f = "function" === typeof c);
      m.timer = requestAnimationFrame(function() {
        m.timer = 0;
        m.render(a, b, null, 1);
        c();
      });
      return f ? this : new Promise(function(r) {
        c = r;
      });
    }
  }
  var g = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof P) {
    if (d = a.length, !d) {
      return this.remove(0, g);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  var h = this.key;
  f = this.proxy;
  !g || h || this.recycle || (this.remove(0, g), g = 0);
  var e = g < d ? g : d, k = 0;
  if (k < e) {
    for (var l = void 0, p = void 0; k < e; k++) {
      l = this.dom[k];
      p = a[k];
      if (h && l._mkk !== p[h]) {
        return this.reconcile(a, b, k);
      }
      this.update(l, p, b, k, 1);
      f && !p._mkx && (a[k] = R(this, l, p));
    }
  }
  if (k < d) {
    for (; k < d; k++) {
      g = a[k], this.add(g, b), !f || this.recycle && g._mkx || (a[k] = R(this, this.dom[k], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
D.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var f;
  if (this.key) {
    var m = b[this.key];
    if (f = this.live[m]) {
      if (f !== a) {
        m = this.index(f);
        var g = m < d ? f : a, h = m < d ? a : f, e = this.dom[m < d ? m + 1 : d + 1];
        this.dom[d] = f;
        this.dom[m] = a;
        e !== h ? this.root.insertBefore(g, h) : e = g;
        this.root.insertBefore(h, e);
      }
    } else {
      this.pool && (f = this.pool_keyed.get(m)) && (this.pool_keyed.delete(m), this.checkout(a), this.dom[d] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? this.fullproxy && b._mkx || !this.apply || this.apply(b, c || this.state, d, f._mkp || J(f, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
D.prototype.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.fullproxy && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.dom[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || J(a, this.factory._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
D.prototype.cancel = function() {
  cancelAnimationFrame(this.timer);
  this.timer = 0;
  return this;
};
D.prototype.create = function(a, b, c, d) {
  var f = this.key, m = f && a[f], g, h, e;
  if (this.pool) {
    if (f) {
      if ((h = this.pool_keyed) && (g = h.get(m))) {
        h.delete(m);
        var k = 1;
      }
    } else {
      (h = this.pool_shared) && h.length && (g = h.pop());
    }
  }
  g || (g = e = this.factory, e || (this.factory = g = e = L(this, this.tpl.tpl, [], ""), Q(this)));
  if (this.apply) {
    var l = e && this.cache && [];
    this.apply(a, b || this.state, c, g._mkp || J(g, this.factory._mkp, !!e || this.cache), l);
  }
  e && (g = e.cloneNode(!0), l && (g._mkc = l));
  f && (k || (g._mkk = m), d && (this.live[m] = g));
  (a = this.on && this.on[e ? "create" : "recycle"]) && a(g, this);
  return g;
};
D.prototype.add = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = c < this.length;
  } else {
    "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  }
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), S(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function R(a, b, c) {
  b = b._mkp || J(b, a.factory._mkp, a.cache);
  a = a.proxy;
  var d = c._mkx;
  d ? d.path = b : c = new ja(c, {path:b, fn:a, get:ka, set:la});
  return c;
}
D.prototype.reconcile = function(a, b, c) {
  var d = this.dom, f = this.live, m = this.key, g = a.length, h = d.length, e = h > g ? h : g, k = 0;
  for (c || (c = 0); c < e; c++) {
    var l = void 0;
    if (c < g) {
      var p = a[c], r = c >= h, t = void 0, w = void 0, z = void 0, aa = void 0;
      this.proxy && (p._mkx ? aa = 1 : a[c] = R(this, d[c], p));
      if (!r && (t = d[c], w = p[m], z = t._mkk, z === w)) {
        aa || this.update(t, p, b, c, 1);
        continue;
      }
      if (r || !f[w]) {
        r || !this.pool ? (h++, e = h > g ? h : g, this.add(p, b, c)) : this.replace(t, p, b, c);
        continue;
      }
      for (var E = r = void 0, y = c + 1; y < e; y++) {
        if (!r && y < h && d[y]._mkk === w && (r = y + 1), !E && y < g && a[y][m] === z && (E = y + 1), r && E) {
          r >= E + k ? (l = d[r - 1], this.root.insertBefore(l, t), aa || this.update(l, p, b, c, 1), r === E ? (1 < y - c && this.root.insertBefore(t, d[r]), d[c] = d[y], (d[y] = t) || console.error("reconcile.error 1")) : (r - 1 === c && console.error("reconcile.error 2"), S(d, r - 1, c), k++)) : (p = E - 1 + k, this.root.insertBefore(t, d[p] || null), (p > h ? h : p) - 1 === c && console.error("reconcile.error 3"), S(d, c, (p > h ? h : p) - 1), k--, c--);
          l = 1;
          break;
        }
      }
    }
    l || (this.remove(c), h--, e = h > g ? h : g, c--);
  }
  return this;
};
function S(a, b, c, d) {
  var f = d || a[b];
  d && b++;
  if (b < c) {
    for (; b < c; b++) {
      a[b] = a[b + 1];
    }
  } else {
    for (; b > c; b--) {
      a[b] = a[b - 1];
    }
  }
  a[c] = f;
}
D.prototype.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = 1;
  } else {
    "number" === typeof c && (0 > c && (c += this.length), d = 1);
  }
  for (var f = a.length, m = 0; m < f; m++) {
    this.add(a[m], b, d ? c++ : null);
  }
  return this;
};
D.prototype.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
D.prototype.remove = function(a, b) {
  var c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root._mkd = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  for (var d = this.pool && !this.key, f = this.key || this.pool, m = this.on && this.on.remove, g = 0, h; g < b; g++) {
    h = a[d ? b - g - 1 : g], c && h.remove(), f && this.checkout(h), m && m(h, this);
  }
  this.length = c;
  return this;
};
D.prototype.index = function(a) {
  return this.dom.indexOf(a);
};
D.prototype.node = function(a) {
  return this.dom[a];
};
D.prototype.checkout = function(a) {
  if (this.key) {
    var b = a._mkk;
    this.live[b] = null;
  }
  if (this.pool) {
    if (b) {
      this.pool_keyed.set(b, a), !0 !== this.pool && this.pool_keyed.size > this.pool && this.pool_keyed.delete(this.pool_keyed.keys().next().value);
    } else {
      if (b = this.pool_shared.length, !0 === this.pool || b < this.pool) {
        this.pool_shared[b] = a;
      }
    }
  }
};
D.prototype.flush = function() {
  this.pool_shared = [];
  this.pool_keyed = new Map();
  return this;
};
D.prototype.destroy = function() {
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], N[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
var T = Array.prototype, na = window.Proxy, U = !1;
function V(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function P(a) {
  if (a instanceof P) {
    return a;
  }
  if (!(this instanceof P)) {
    return new P(a);
  }
  this.mikado = null;
  var b = a ? a.length : 0;
  if (na) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, oa);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
P.prototype.mount = function(a) {
  this.mikado !== a && (this.mikado && a.mount(this.mikado.root), this.mikado = a);
  return this;
};
P.prototype.define = function(a) {
  Object.defineProperty(this, a, {get:function() {
    return this.proto[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), oa.set(this, a, b));
  }});
  return this;
};
var oa = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var f = parseInt(b, 10);
    b === "" + f && (d = !0);
  }
  f = a.mikado;
  if (!U) {
    U = !0;
    if (f) {
      var m = a.length;
      if (d) {
        V(f);
        var g = f.length;
        m !== g && (a.length = g);
        b >= g ? (f.add(c), a.length++) : b < g && (m = f.dom[b], f.recycle || f.key && m._mkk === c[f.key] ? f.update(m, c, null, b) : f.replace(m, c, null, b));
      } else {
        "length" === b && c < m && f.remove(c, m - c);
      }
    }
    U = !1;
  }
  !d || !f.proxy || f.recycle && c._mkx || (c = R(f, f.dom[b], c));
  (na ? a : a.proto)[b] = c;
  return !0;
}};
P.prototype.set = function(a) {
  var b = this.mikado.key;
  b && (U = !0);
  if (!b && this.mikado.recycle) {
    for (var c = this.length, d = 0; d < c; d++) {
      this[d] = a[d];
    }
    c > a.length && this.splice(c);
  } else {
    this.splice(), this.concat(a);
  }
  b && (this.mikado.render(this), U = !1);
  return this;
};
P.prototype.splice = function(a, b, c) {
  V(this.mikado);
  U = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a);
  U = !1;
  return b;
};
P.prototype.push = function(a) {
  V(this.mikado);
  U = !0;
  this.mikado.add(a);
  this[this.length] = a;
  na && this.length++;
  U = !1;
};
P.prototype.unshift = function(a) {
  V(this.mikado);
  U = !0;
  this.mikado.add(a, 0);
  this.proto.unshift(a);
  U = !1;
};
P.prototype.pop = function() {
  V(this.mikado);
  U = !0;
  this.mikado.remove(this.length - 1);
  var a = this.proto.pop();
  U = !1;
  return a;
};
P.prototype.shift = function() {
  V(this.mikado);
  U = !0;
  this.mikado.remove(0);
  var a = this.proto.shift();
  U = !1;
  return a;
};
P.prototype.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
P.prototype.sort = T.sort;
P.prototype.reverse = T.reverse;
P.prototype.slice = T.slice;
P.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
P.prototype.filter = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    if (a(this[b])) {
      f && (this.splice(d, f), c -= f, b -= f, f = 0);
    } else {
      if (f) {
        f++;
      } else {
        var d = b;
        var f = 1;
      }
    }
  }
  f && this.splice(d, f);
  return this;
};
P.prototype.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
P.prototype.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
P.prototype.includes = T.includes;
P.prototype.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
P.prototype.swap = function(a, b) {
  var c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
P.prototype.transaction = function(a) {
  V(this.mikado);
  U = !0;
  a();
  U = !1;
  var b = this.mikado, c = b.fullproxy;
  b.fullproxy = 0;
  b.async ? b.render(this).then(function() {
    b.fullproxy = c;
  }) : (b.render(this), b.fullproxy = c);
};
var W = document.createElement("div"), pa = document.createTextNode(""), X = document.createElement("div");
W.appendChild(pa);
D.prototype.move = D.prototype.moveTo = function(a, b) {
  if ("number" === typeof a) {
    var c = a;
    a = this.dom[c];
  } else {
    c = this.index(a);
  }
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
D.prototype.shift = D.prototype.shiftBy = function(a, b) {
  if (!b) {
    return this;
  }
  if ("number" === typeof a) {
    var c = a;
    a = this.dom[a];
  } else {
    c = this.index(a);
  }
  var d = 0 > b;
  if (d && c || !d && c < this.length - 1) {
    b = d ? Math.max(c + b, 0) : Math.min(c + b, this.length - 1);
    var f = this.dom[b], m = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? f : this.dom[b + 1] || null);
    if (m) {
      a = this.dom[c];
      if (d) {
        for (; c > b; c--) {
          this.dom[c] = this.dom[c - 1];
        }
      } else {
        for (; c < b; c++) {
          this.dom[c] = this.dom[c + 1];
        }
      }
      this.dom[b] = a;
    } else {
      this.dom[c] = f, this.dom[b] = a;
    }
  }
  return this;
};
D.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
D.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
D.prototype.first = function(a) {
  return this.shift(a, -this.length);
};
D.prototype.last = function(a) {
  return this.shift(a, this.length);
};
D.prototype.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
D.prototype.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
D.prototype.swap = function(a, b) {
  if (a !== b) {
    if ("number" === typeof a) {
      var c = 0 > a ? this.length + a : a;
      a = this.dom[c];
    } else {
      c = this.index(a);
    }
    if ("number" === typeof b) {
      var d = 0 > b ? this.length + b : b;
      b = this.dom[d];
    } else {
      d = this.index(b);
    }
    var f = c + 1 !== d;
    this.root.insertBefore(f ? a : b, f ? b : a);
    f && d + 1 !== c && this.root.insertBefore(b, this.dom[c + 1] || null);
    this.dom[c] = b;
    this.dom[d] = a;
  }
  return this;
};
var qa = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, ra = {checked:1, selected:1, hidden:1}, sa = 0, ta = 0;
function ua(a, b, c, d, f, m) {
  sa || (sa = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(w) {
      var z = ua(a);
      "function" === typeof b && b(z);
      w(z);
    });
  }
  f || (d = [], c = [d], d.index = f = {current:-1, count:0, last:-1, inc:0, included:!1});
  var g = m ? {} : {tpl:{}}, h = m ? g : g.tpl;
  if (!m) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var e = document.createElement("div");
        e.innerHTML = a;
        a = e.firstElementChild;
      } else {
        g.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (g.name || (g.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  e = a.tagName;
  if (!e || "SCRIPT" === e) {
    var k;
    if ((k = (e ? a.firstChild : a).nodeValue) && k && k.trim()) {
      if (k.includes("{{@")) {
        var l = k.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        k = /{{[\s\S]+}}/.test(l) ? l.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        l && (l = l.replace(/{{([\s\S]+)}}/g, ""));
        l && d.push(l);
        if ("SCRIPT" === e) {
          return k.trim() && (h.text = k, h.tag = e), h;
        }
      }
      k && k.trim() && (k.includes("{{#") ? va(h, "html", k, !1, null, f, c, d) : (f.count++, va(h, "text", k, !1, null, f, c, d)));
    }
    if (!e) {
      return k && k.trim() ? h : null;
    }
  }
  e && (h.tag = e);
  if ((k = a.attributes) && k.length) {
    e = {};
    for (l = 0; l < k.length; l++) {
      var p = k[l].nodeName, r = a.getAttribute(p);
      "include" === p && (p = "inc");
      e[p] = r;
    }
    k = e;
    for (var t in k) {
      e = k[t];
      p = l = void 0;
      switch(t) {
        case "class":
        case "style":
          l = t;
          break;
        case "include":
          t = "inc";
        case "inc":
          l = t;
          break;
        case "if":
          l = t;
          break;
        case "foreach":
          l = t = "for";
          break;
        case "js":
          break;
        case "key":
          g.key = e.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          qa[t] ? p = h.event || (h.event = {}) : (m || "id" !== t && "name" !== t || g.name || /{{[\s\S]+}}/.test(e) || (g.name = e), p = h.attr || (h.attr = {})), l = t;
      }
      l && va(p || h, l, e, !!p, k, f, c, d);
    }
  }
  t = (a.content || a).childNodes;
  k = t.length;
  f.included && (f.included = !1, f.inc++, d = [], (h.for || h.if) && c.unshift(d), h.child || (h.child = h.text ? {text:h.text} : h.html ? {html:h.html} : null), k ? (d.root = h, d.inc = h.child || (h.child = []), d.index = f = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = h.inc, delete h.for, delete h.if, delete h.text, delete h.html);
  if (k) {
    e = 0;
    for (l = void 0; e < k; e++) {
      if (l = t[e], 8 !== l.nodeType && (f.count++, p = ua(l, null, c, d, f, 1))) {
        1 !== k || 3 !== l.nodeType && p.text || h.js && p.js ? (p.text || p.tag) && (h.child || (h.child = [])).push(p) : (p.js && (h.js = p.js), p.html && (h.html = p.html), p.text && (h.text = p.text));
      }
    }
    h.child && 1 === h.child.length && (h.child = h.child[0]);
  }
  if (!m) {
    if (g.name || (g.name = "tpl-" + ta++), 1 === c.length && 0 === c[0].length) {
      g.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d] = c[d].length ? Function("data", "state", "index", "_p", "_x", '"use strict";let _o,_v,_c;' + c[d].join(";")) : null;
      }
      g.fn = c.length ? c : null;
    }
  }
  return g;
}
function va(a, b, c, d, f, m, g, h) {
  if (/{{[\s\S]+}}/.test(c)) {
    g = /{{([!?#]+)?=/.test(c);
    var e = /{{!?\?/.test(c), k = /{{\??!/.test(c);
    if (g) {
      if (e || k) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      g = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").replace(/\s+/g, " ");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    e && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || m.count++;
    m.count !== m.last && (m.current++, m.last = m.count, h.push("_o=_p[" + m.current + "]"), h.push("_x&&(_x[" + m.current + "]=_c={})"));
    h.push("_v=" + c);
    d ? h.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);' + (ra[b] ? "_o.n." + b + "=_v" : '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)') + "}") : "class" === b ? h.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? h.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? h.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : 
    "text" === b && h.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = g ? [g] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || m.included || (m.count !== m.last && (m.current++, m.last = m.count, h.push("_o=_p[" + m.current + "]")), a = f.foreach ? f.foreach.trim() : "data", b = m.inc, f.if ? h.push("this.inc[" + b + "].mount(_o.n)[" + f.if.trim() + '?"render":"clear"](' + a + ",state)") : f.foreach ? h.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : h.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), m.included = !0);
}
;var wa = /[^;:]+/g, xa = / +/;
function ya(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, O[b] ? a[b] = c : !1 === c ? a.removeAttribute(b) : a.setAttribute(b, c));
}
function za(a, b, c) {
  !1 !== c["_a" + b] && (c["_a" + b] = !1, O[b] ? a[b] = !1 : a.removeAttribute(b));
}
function Aa(a, b) {
  var c = a._mkc, d;
  c ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (d = O[b] ? a[b] : a.getAttribute(b), c["_a" + b] = d);
  return d;
}
function Y(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    a = c.trim().split(xa);
    b._c = c = {};
    b = 0;
    for (var d; b < a.length; b++) {
      (d = a[b]) && (c[a[b]] = 1);
    }
  }
  return c;
}
function Ba(a, b, c, d) {
  var f = !!d[b];
  c = "undefined" === typeof c ? !f : !!c;
  f !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function Ca(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(wa), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b].trim()] = a[b + 1].trim();
    }
  }
  return c;
}
;D.once = ma;
D.register = function(a, b) {
  var c;
  if ("string" === typeof a) {
    var d = c = a;
    a = N[d];
    a instanceof D || (a = a[0]);
    if (!a) {
      throw Error("The template '" + d + "' was not found.");
    }
  } else {
    d = a.name;
  }
  N[d] && (c ? console.info("The template '" + d + "' was replaced by a new definition.") : console.warn("The template '" + d + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  N[d] = [a, b];
  return D;
};
D.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  var b = N[a];
  b && (b instanceof D && b.destroy(), N[a] = null);
  return D;
};
D.compile = ua;
D.setText = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._t : a._mkc = c = {};
  d !== b && (c._t = b, c._h = null, (c = a.firstChild) ? c.nodeValue = b : a.appendChild(document.createTextNode(b)));
};
D.getText = function(a) {
  var b = a._mkc, c;
  b ? c = b._t : a._mkc = b = {};
  "string" !== typeof c && (a = a.firstChild, b._t = c = a ? a.nodeValue : "");
  return c;
};
D.setHtml = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
D.getHtml = function(a) {
  var b = a._mkc, c;
  b ? c = b._h || b._t : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
D.setClass = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
D.getClass = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  c = c.split(xa);
  return "" === c[0] ? [] : c;
};
D.hasClass = function(a, b) {
  var c = Y(a), d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
D.toggleClass = function(a, b, c) {
  var d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var f = 0; f < b.length; f++) {
        Ba(a, b[f], c, d);
      }
    } else {
      for (f in b) {
        Ba(a, f, b[f], d);
      }
    }
  } else {
    Ba(a, b, c, d);
  }
};
D.removeClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var f = a, m = b[d];
      0 !== c[m] && (c[m] = 0, f.classList.remove(m));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
D.addClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var f = a, m = b[d];
      c[m] || (c[m] = 1, f.classList.add(m));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
D.setAttribute = function(a, b, c) {
  var d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (var f in b) {
      ya(a, f, b[f], d);
    }
  } else {
    ya(a, b, c, d);
  }
};
D.getAttribute = Aa;
D.hasAttribute = function(a, b) {
  a = Aa(a, b);
  return !(!a && "" !== a);
};
D.removeAttribute = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      za(a, b[d], c);
    }
  } else {
    za(a, b, c);
  }
};
D.setCss = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
D.getCss = function(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
D.getStyle = function(a, b) {
  var c = Ca(a), d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
D.setStyle = function(a, b, c) {
  var d = Ca(a), f = a.style;
  if ("object" === typeof b) {
    for (var m in b) {
      c = a;
      var g = m, h = b[m];
      d[g] !== h && (d[g] = h, (f || c.style).setProperty(g, h));
    }
  } else {
    d[b] !== c && (d[b] = c, (f || a.style).setProperty(b, c));
  }
};
D.escape = function(a) {
  W._text !== a && (pa.nodeValue = a, W._html = W.innerHTML, W._text = a);
  return W._html;
};
D.sanitize = function(a) {
  X._html !== a && (X.innerHTML = a, X._html = a, X._text = X.textContent);
  return X._text;
};
D.prototype.route = D.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  v[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  v[a] = b;
  c && (x[a] = c);
  return this;
};
D.prototype.dispatch = D.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!v[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  v[a](b || this, c || window.event);
  return this;
};
D.prototype.listen = D.listen = ca;
D.prototype.unlisten = D.unlisten = function(a) {
  q[a] && (G(0, a, F, u[a]), q[a] = 0, u[a] = null);
  return this;
};
D.Array = P;
var Z = window, Da;
(Da = Z.define) && Da.amd ? Da([], function() {
  return D;
}) : "object" === typeof Z.exports ? Z.exports = D : Z.Mikado = D;
}).call(this);
