/**!
 * Mikado.js v0.8.218 (ES5/Debug)
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
    var a = {}, b = Object.create(new n.global.Proxy(a, {get:function(c, d, e) {
      return c == a && "q" == d && e == b;
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
    var e = a[d];
    if (!(e in c)) {
      return;
    }
    c = c[e];
  }
  a = a[a.length - 1];
  d = c[a];
  b = b(d);
  b != d && null != b && n.defineProperty(c, a, {configurable:!0, writable:!0, value:b});
};
n.polyfillIsolated = function(a, b, c) {
  var d = a.split(".");
  a = 1 === d.length;
  var e = d[0];
  e = !a && e in n.polyfills ? n.polyfills : n.global;
  for (var l = 0; l < d.length - 1; l++) {
    var g = d[l];
    if (!(g in e)) {
      return;
    }
    e = e[g];
  }
  d = d[d.length - 1];
  c = n.IS_SYMBOL_NATIVE && "es6" === c ? e[d] : null;
  b = b(c);
  null != b && (a ? n.defineProperty(n.polyfills, d, {configurable:!0, writable:!0, value:b}) : b !== c && (void 0 === n.propertyToPolyfillSymbol[d] && (a = 1E9 * Math.random() >>> 0, n.propertyToPolyfillSymbol[d] = n.IS_SYMBOL_NATIVE ? n.global.Symbol(d) : n.POLYFILL_PREFIX + a + "$" + d), n.defineProperty(e, n.propertyToPolyfillSymbol[d], {configurable:!0, writable:!0, value:b})));
};
n.initSymbol = function() {
};
n.polyfill("Symbol", function(a) {
  function b(l) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (l || "") + "_" + e++, l);
  }
  function c(l, g) {
    this.$jscomp$symbol$id_ = l;
    n.defineProperty(this, "description", {configurable:!0, writable:!0, value:g});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.$jscomp$symbol$id_;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", e = 0;
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
    this.id_ = (h += Math.random() + 1).toString();
    if (k) {
      k = n.makeIterator(k);
      for (var m; !(m = k.next()).done;) {
        m = m.value, this.set(m[0], m[1]);
      }
    }
  }
  function c() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var k = Object.seal({}), m = Object.seal({}), p = new a([[k, 2], [m, 3]]);
      if (2 != p.get(k) || 3 != p.get(m)) {
        return !1;
      }
      p.delete(k);
      p.set(m, 4);
      return !p.has(k) && 4 == p.get(m);
    } catch (r) {
      return !1;
    }
  }
  function d() {
  }
  function e(k) {
    var m = typeof k;
    return "object" === m && null !== k || "function" === m;
  }
  function l(k) {
    if (!n.owns(k, f)) {
      var m = new d();
      n.defineProperty(k, f, {value:m});
    }
  }
  function g(k) {
    if (!n.ISOLATE_POLYFILLS) {
      var m = Object[k];
      m && (Object[k] = function(p) {
        if (p instanceof d) {
          return p;
        }
        Object.isExtensible(p) && l(p);
        return m(p);
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
  var f = "$jscomp_hidden_" + Math.random();
  g("freeze");
  g("preventExtensions");
  g("seal");
  var h = 0;
  b.prototype.set = function(k, m) {
    if (!e(k)) {
      throw Error("Invalid WeakMap key");
    }
    l(k);
    if (!n.owns(k, f)) {
      throw Error("WeakMap key fail: " + k);
    }
    k[f][this.id_] = m;
    return this;
  };
  b.prototype.get = function(k) {
    return e(k) && n.owns(k, f) ? k[f][this.id_] : void 0;
  };
  b.prototype.has = function(k) {
    return e(k) && n.owns(k, f) && n.owns(k[f], this.id_);
  };
  b.prototype.delete = function(k) {
    return e(k) && n.owns(k, f) && n.owns(k[f], this.id_) ? delete k[f][this.id_] : !1;
  };
  return b;
}, "es6", "es3");
n.MapEntry = function() {
};
n.polyfill("Map", function(a) {
  function b() {
    var h = {};
    return h.previous = h.next = h.head = h;
  }
  function c(h, k) {
    var m = h[1];
    return n.iteratorPrototype(function() {
      if (m) {
        for (; m.head != h[1];) {
          m = m.previous;
        }
        for (; m.next != m.head;) {
          return m = m.next, {done:!1, value:k(m)};
        }
        m = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(h, k) {
    var m = k && typeof k;
    "object" == m || "function" == m ? g.has(k) ? m = g.get(k) : (m = "" + ++f, g.set(k, m)) : m = "p_" + k;
    var p = h[0][m];
    if (p && n.owns(h[0], m)) {
      for (h = 0; h < p.length; h++) {
        var r = p[h];
        if (k !== k && r.key !== r.key || k === r.key) {
          return {id:m, list:p, index:h, entry:r};
        }
      }
    }
    return {id:m, list:p, index:-1, entry:void 0};
  }
  function e(h) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (h) {
      h = n.makeIterator(h);
      for (var k; !(k = h.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  function l() {
    if (n.ASSUME_NO_NATIVE_MAP || !a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var h = Object.seal({x:4}), k = new a(n.makeIterator([[h, "s"]]));
      if ("s" != k.get(h) || 1 != k.size || k.get({x:4}) || k.set({x:4}, "t") != k || 2 != k.size) {
        return !1;
      }
      var m = k.entries(), p = m.next();
      if (p.done || p.value[0] != h || "s" != p.value[1]) {
        return !1;
      }
      p = m.next();
      return p.done || 4 != p.value[0].x || "t" != p.value[1] || !m.next().done ? !1 : !0;
    } catch (r) {
      return !1;
    }
  }
  if (n.USE_PROXY_FOR_ES6_CONFORMANCE_CHECKS) {
    if (a && n.ES6_CONFORMANCE) {
      return a;
    }
  } else {
    if (l()) {
      return a;
    }
  }
  var g = new WeakMap();
  e.prototype.set = function(h, k) {
    h = 0 === h ? 0 : h;
    var m = d(this, h);
    m.list || (m.list = this[0][m.id] = []);
    m.entry ? m.entry.value = k : (m.entry = {next:this[1], previous:this[1].previous, head:this[1], key:h, value:k}, m.list.push(m.entry), this[1].previous.next = m.entry, this[1].previous = m.entry, this.size++);
    return this;
  };
  e.prototype.delete = function(h) {
    h = d(this, h);
    return h.entry && h.list ? (h.list.splice(h.index, 1), h.list.length || delete this[0][h.id], h.entry.previous.next = h.entry.next, h.entry.next.previous = h.entry.previous, h.entry.head = null, this.size--, !0) : !1;
  };
  e.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].previous = b();
    this.size = 0;
  };
  e.prototype.has = function(h) {
    return !!d(this, h).entry;
  };
  e.prototype.get = function(h) {
    return (h = d(this, h).entry) && h.value;
  };
  e.prototype.entries = function() {
    return c(this, function(h) {
      return [h.key, h.value];
    });
  };
  e.prototype.keys = function() {
    return c(this, function(h) {
      return h.key;
    });
  };
  e.prototype.values = function() {
    return c(this, function(h) {
      return h.value;
    });
  };
  e.prototype.forEach = function(h, k) {
    for (var m = this.entries(), p; !(p = m.next()).done;) {
      p = p.value, h.call(k, p[1], p[0], this);
    }
  };
  e.prototype[Symbol.iterator] = e.prototype.entries;
  var f = 0;
  return e;
}, "es6", "es3");
n.polyfill("Promise", function(a) {
  function b(g) {
    this.state_ = 0;
    this.result_ = void 0;
    this.onSettledCallbacks_ = [];
    this.isRejectionHandled_ = !1;
    var f = this.createResolveAndReject_();
    try {
      g(f.resolve, f.reject);
    } catch (h) {
      f.reject(h);
    }
  }
  function c() {
    this.batch_ = null;
  }
  function d(g) {
    return g instanceof b ? g : new b(function(f) {
      f(g);
    });
  }
  if (a && (!(n.FORCE_POLYFILL_PROMISE || n.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && "undefined" === typeof n.global.PromiseRejectionEvent) || !n.global.Promise || -1 === n.global.Promise.toString().indexOf("[native code]"))) {
    return a;
  }
  c.prototype.asyncExecute = function(g) {
    if (null == this.batch_) {
      this.batch_ = [];
      var f = this;
      this.asyncExecuteFunction(function() {
        f.executeBatch_();
      });
    }
    this.batch_.push(g);
  };
  var e = n.global.setTimeout;
  c.prototype.asyncExecuteFunction = function(g) {
    e(g, 0);
  };
  c.prototype.executeBatch_ = function() {
    for (; this.batch_ && this.batch_.length;) {
      var g = this.batch_;
      this.batch_ = [];
      for (var f = 0; f < g.length; ++f) {
        var h = g[f];
        g[f] = null;
        try {
          h();
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
      return function(m) {
        h || (h = !0, k.call(f, m));
      };
    }
    var f = this, h = !1;
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
            var f = null != g;
            break a;
          case "function":
            f = !0;
            break a;
          default:
            f = !1;
        }
      }
      f ? this.resolveToNonPromiseObj_(g) : this.fulfill_(g);
    }
  };
  b.prototype.resolveToNonPromiseObj_ = function(g) {
    var f = void 0;
    try {
      f = g.then;
    } catch (h) {
      this.reject_(h);
      return;
    }
    "function" == typeof f ? this.settleSameAsThenable_(f, g) : this.fulfill_(g);
  };
  b.prototype.reject_ = function(g) {
    this.settle_(2, g);
  };
  b.prototype.fulfill_ = function(g) {
    this.settle_(1, g);
  };
  b.prototype.settle_ = function(g, f) {
    if (0 != this.state_) {
      throw Error("Cannot settle(" + g + ", " + f + "): Promise already settled in state" + this.state_);
    }
    this.state_ = g;
    this.result_ = f;
    2 === this.state_ && this.scheduleUnhandledRejectionCheck_();
    this.executeOnSettledCallbacks_();
  };
  b.prototype.scheduleUnhandledRejectionCheck_ = function() {
    var g = this;
    e(function() {
      if (g.notifyUnhandledRejection_()) {
        var f = n.global.console;
        "undefined" !== typeof f && f.error(g.result_);
      }
    }, 1);
  };
  b.prototype.notifyUnhandledRejection_ = function() {
    if (this.isRejectionHandled_) {
      return !1;
    }
    var g = n.global.CustomEvent, f = n.global.Event, h = n.global.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof g ? g = new g("unhandledrejection", {cancelable:!0}) : "function" === typeof f ? g = new f("unhandledrejection", {cancelable:!0}) : (g = n.global.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
    g.promise = this;
    g.reason = this.result_;
    return h(g);
  };
  b.prototype.executeOnSettledCallbacks_ = function() {
    if (null != this.onSettledCallbacks_) {
      for (var g = 0; g < this.onSettledCallbacks_.length; ++g) {
        l.asyncExecute(this.onSettledCallbacks_[g]);
      }
      this.onSettledCallbacks_ = null;
    }
  };
  var l = new c();
  b.prototype.settleSameAsPromise_ = function(g) {
    var f = this.createResolveAndReject_();
    g.callWhenSettled_(f.resolve, f.reject);
  };
  b.prototype.settleSameAsThenable_ = function(g, f) {
    var h = this.createResolveAndReject_();
    try {
      g.call(f, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  b.prototype.then = function(g, f) {
    function h(r, t) {
      return "function" == typeof r ? function(w) {
        try {
          k(r(w));
        } catch (x) {
          m(x);
        }
      } : t;
    }
    var k, m, p = new b(function(r, t) {
      k = r;
      m = t;
    });
    this.callWhenSettled_(h(g, k), h(f, m));
    return p;
  };
  b.prototype.catch = function(g) {
    return this.then(void 0, g);
  };
  b.prototype.callWhenSettled_ = function(g, f) {
    function h() {
      switch(k.state_) {
        case 1:
          g(k.result_);
          break;
        case 2:
          f(k.result_);
          break;
        default:
          throw Error("Unexpected state: " + k.state_);
      }
    }
    var k = this;
    null == this.onSettledCallbacks_ ? l.asyncExecute(h) : this.onSettledCallbacks_.push(h);
    this.isRejectionHandled_ = !0;
  };
  b.resolve = d;
  b.reject = function(g) {
    return new b(function(f, h) {
      h(g);
    });
  };
  b.race = function(g) {
    return new b(function(f, h) {
      for (var k = n.makeIterator(g), m = k.next(); !m.done; m = k.next()) {
        d(m.value).callWhenSettled_(f, h);
      }
    });
  };
  b.all = function(g) {
    var f = n.makeIterator(g), h = f.next();
    return h.done ? d([]) : new b(function(k, m) {
      function p(w) {
        return function(x) {
          r[w] = x;
          t--;
          0 == t && k(r);
        };
      }
      var r = [], t = 0;
      do {
        r.push(void 0), t++, d(h.value).callWhenSettled_(p(r.length - 1), m), h = f.next();
      } while (!h.done);
    });
  };
  return b;
}, "es6", "es3");
n.iteratorFromArray = function(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, e = {next:function() {
    if (!d && c < a.length) {
      var l = c++;
      return {value:b(l, a[l]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  e[Symbol.iterator] = function() {
    return e;
  };
  return e;
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
    var e = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
      var l = d[c];
      if (l === b || Object.is(l, b)) {
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
var q = {}, u = {}, v = Object.create(null), y = Object.create(null), aa = document.documentElement || document.body.parentNode, A = "ontouchstart" in window, B = !A && window.PointerEvent && navigator.maxTouchPoints;
C.eventCache = !1;
C.eventBubble = !1;
var ba;
function D(a, b) {
  b || (b = a.type);
  var c = a.target, d = C.eventCache, e = C.eventBubble, l;
  d && (l = c["_mke" + b]);
  if ("undefined" === typeof l) {
    for (var g = c; g && g !== aa;) {
      var f = void 0;
      "click" === b && ba && (f = g.getAttribute("tap"));
      f || (f = g.getAttribute(b));
      if (f) {
        var h = f.indexOf(":"), k = g;
        if (-1 < h) {
          var m = f.substring(0, h);
          h = f.substring(h + 1);
          for (f = ""; (k = k.parentElement) !== aa;) {
            if (k.hasAttribute(h)) {
              f = m;
              break;
            }
          }
          f || console.warn("Event root '" + h + "' was not found for the event: '" + m + "'.");
        }
        if (f && (l || (l = [], d && (c["_mke" + b] = l)), l.push([f, k]), f = y[f], !e || f && (f.stop || f.cancel))) {
          break;
        }
      }
      g = g.parentElement;
    }
    d && (l || (c["_mke" + b] = null));
  }
  if (l) {
    for (e = 0; e < l.length; e++) {
      if (k = l[e], g = k[0], f = v[g]) {
        k = k[1];
        if (m = y[g]) {
          m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (v[g] = null, d && (c["_mke" + b] = null));
        }
        f(k, a);
      } else {
        console.warn("The route '" + g + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  q[a] || (F(1, a, D, b), q[a] = 1, u[a] = b || null);
  return this;
}
var G, H, da;
if (A || B) {
  var ea = function(a) {
    var b = G, c = H, d = a, e = a.changedTouches;
    e && (d = e[0]);
    G = d.clientX;
    H = d.clientY;
    15 > Math.abs(G - b) && 15 > Math.abs(H - c) && D(a, "tap");
  }, fa = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    G = b.clientX;
    H = b.clientY;
  }, ha = {passive:!1, capture:!0};
  da = function(a) {
    F(a, B ? "pointerdown" : "touchstart", fa, ha);
    F(a, B ? "pointerup" : "touchend", ea, ha);
  };
}
function F(a, b, c, d) {
  if ("tap" === b) {
    if (A || B) {
      da(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function I(a, b, c) {
  for (var d = b.length, e = [], l = {}, g = 0, f, h, k, m = void 0, p = null; g < d; g++) {
    f = b[g];
    if (h = f.v) {
      if (k = f = l[h], !k) {
        f = void 0;
        k = a;
        for (var r = 0, t = h.length, w = ""; r < t; r++) {
          var x = h[r];
          w += x;
          l[w] ? k = l[w] : (">" === x ? k = k.firstChild : "|" === x ? (f = k, k = k.firstChild) : "@" === x ? (f = k, k = k.style) : k = k.nextSibling, l[w] = k);
        }
        f = [k, f];
        k = f[0];
        f = f[1] || k;
      }
    } else {
      k = f = a;
    }
    c && m !== f && (m = f, f._mkc = p = {});
    e[g] = new J(p, k, "");
  }
  return a._mkp = e;
}
function K(a, b, c, d, e, l) {
  l || (a.fullproxy = 1);
  var g = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text)), f, h;
  if (h = b.class) {
    "object" === typeof h ? (c.push(new J(f = {_c:""}, g, d)), (h = h[0]) ? L(a, h, ["_c", c.length - 1]) : a.fullproxy = 0) : e || (g.className = h);
  }
  if (h = b.attr) {
    for (var k in h) {
      var m = h[k];
      "object" === typeof m ? (f || c.push(new J(f = {}, g, d)), f["_a" + k] = !1, (m = m[0]) ? L(a, m, ["_a", c.length - 1, k]) : a.fullproxy = 0) : e || g.setAttribute(k, m);
    }
  }
  if (h = b.event) {
    for (var p in h) {
      e || g.setAttribute(p, h[p]), ca(p);
    }
  }
  if (h = b.style) {
    "object" === typeof h ? (c.push(new J(f || (f = {}), g.style, d + "@")), f._s = "", (h = h[0]) ? L(a, h, ["_s", c.length - 1]) : a.fullproxy = 0) : e || (g.style.cssText = h);
  }
  if (h = b.text) {
    if ("object" === typeof h) {
      var r = g;
      h = h[0];
      b.tag ? (d += "|", r = !e && g.firstChild, r || (r = document.createTextNode(h), g.appendChild(r))) : f = {};
      (f || (f = {}))._t = h;
      c.push(new J(f, r, d));
      h ? L(a, h, ["_t", c.length - 1]) : a.fullproxy = 0;
    } else {
      e || (b.tag ? g.textContent = h : g.nodeValue = h);
    }
  } else if (h = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    h.constructor !== Array && (h = [h]);
    b = 0;
    for (r = h.length; b < r; b++) {
      if (k = h[b], d = b ? d + "+" : d + ">", k = K(a, k, c, d, e, 1), e) {
        if (b < r - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        g.appendChild(k);
      }
    }
  } else if (h = b.html) {
    "object" === typeof h ? (f || c.push(new J(f = {}, g, d)), f._h = "", (h = h[0]) ? L(a, h, ["_h", c.length - 1]) : a.fullproxy = 0) : e || (g.innerHTML = h);
  } else if (h = b.inc) {
    f || c.push(new J(null, g, d));
    if ("string" === typeof h) {
      r = M[h];
      if (!r) {
        throw Error("The partial template '" + h + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(r instanceof C)) {
        d = r[0];
        if (b = r[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        M[h] = r = new C(d, b);
      }
    } else if (1 !== h) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      r = new C({name:a.name + "|" + d, tpl:h, key:h.key, cache:h.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:g, hydrate:!!e});
    }
    1 !== h && a.inc.push(r);
  }
  f && (g._mkc = f);
  l || (g._mkp = c);
  return g;
}
function L(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function J(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
J.prototype._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
J.prototype._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
J.prototype._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
J.prototype._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
J.prototype._h = function(a) {
  if (this.c) {
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
    var e = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(l) {
      ia(e, d = l, c);
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
      var e = c[d], l = e[0], g = a.path[e[1]];
      if (!g.c || g.c[l + (e[2] || "")] !== b) {
        g[l](e[2] || b, b);
      }
    }
  }
}
;var M = Object.create(null);
function C(a, b) {
  b = void 0 === b ? {} : b;
  if (!(this instanceof C)) {
    return new C(a, b);
  }
  if ("string" === typeof a) {
    var c = M[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof C) {
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
  this.shadow = b.shadow || !!a.cmp;
  this.key = a.key || "";
  this.live = {};
  c = a.fn;
  a.fc || c && (a.fc = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.pool_shared = [];
  this.pool_keyed = new Map();
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.timer = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.fullproxy = 0;
  (a = b.observe) && (new N(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
C.prototype.mount = function(a, b) {
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
    var e = this.on && this.on.unmount;
    e && e(a, c);
  } else {
    if (b) {
      e = a.children;
      for (var l = e.length, g = Array(l), f = 0; f < l; f++) {
        g[f] = e[f];
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
          e = this.dom[c], l = e.getAttribute("key"), e._mkk = l, d[l] = e;
        }
      }
      a._mkl = this.live = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), K(this, this.tpl.tpl, [], "", this.factory) && O(this)), this.tpl && (this.factory = K(this, this.tpl.tpl, [], ""), O(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function O(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
function ma(a, b, c, d, e) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  if ("function" === typeof c || !0 === c) {
    e = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    e = d, d = null;
  }
  if (e) {
    return new Promise(function(f) {
      requestAnimationFrame(function() {
        ma(a, b, c, d);
        "function" === typeof e && e();
        f();
      });
    });
  }
  if (c || b.fn) {
    var l = new C(b);
    if (c && Array.isArray(c)) {
      for (var g = 0; g < c.length; g++) {
        a.append(l.create(c[g], d, g));
      }
    } else {
      a.append(l.create(c, d));
    }
    l.destroy();
  } else {
    l = K({}, b.tpl, [], "", null, 1), a.append(l);
  }
  return C;
}
C.prototype.render = function(a, b, c, d) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  if (!d) {
    var e;
    if (b && (e = "function" === typeof b) || !0 === b) {
      c = b, b = null;
    }
    this.timer && this.cancel();
    if (this.async || c) {
      var l = this;
      e || (e = "function" === typeof c);
      l.timer = requestAnimationFrame(function() {
        l.timer = 0;
        l.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(p) {
        c = p;
      });
    }
  }
  var g = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof N) {
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
  var f = this.key;
  !g || f || this.recycle || (this.remove(0, g), g = 0);
  var h = g < d ? g : d;
  e = 0;
  if (e < h) {
    for (var k = void 0, m = void 0; e < h; e++) {
      k = this.dom[e];
      m = a[e];
      if (f && k._mkk !== m[f]) {
        return this.reconcile(a, b, e);
      }
      this.update(k, m, b, e, 1);
      this.proxy && !m._mkx && (a[e] = P(this, k, m));
    }
  }
  if (e < d) {
    for (; e < d; e++) {
      g = a[e], this.add(g, b), !this.proxy || this.recycle && g._mkx || (a[e] = P(this, this.dom[e], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
C.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var l = b[this.key];
    if (e = this.live[l]) {
      if (e !== a) {
        l = this.index(e);
        var g = l < d ? e : a, f = l < d ? a : e, h = this.dom[l < d ? l + 1 : d + 1];
        this.dom[d] = e;
        this.dom[l] = a;
        h !== f ? this.root.insertBefore(g, f) : h = g;
        this.root.insertBefore(f, h);
      }
    } else {
      this.pool && (e = this.pool_keyed.get(l)) && (this.pool_keyed.delete(l), this.checkout(a), this.dom[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.fullproxy && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || I(e, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
C.prototype.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.fullproxy && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.dom[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || I(a, this.factory._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
C.prototype.cancel = function() {
  cancelAnimationFrame(this.timer);
  this.timer = 0;
  return this;
};
C.prototype.create = function(a, b, c, d) {
  var e = this.key, l = e && a[e], g, f, h;
  if (e && this.pool && (f = this.pool_keyed) && (g = f.get(l))) {
    var k = 1;
    f.delete(l);
  } else {
    (!e || this.recycle) && this.pool && (f = this.pool_shared) && f.length ? g = f.pop() : (g = h = this.factory, h || (this.factory = g = h = K(this, this.tpl.tpl, [], ""), O(this)));
  }
  this.apply && this.apply(a, b || this.state, c, g._mkp || I(g, this.factory._mkp, !!h || this.cache));
  h && (g = g.cloneNode(!0));
  e && (k || (g._mkk = l), d && (this.live[l] = g));
  (a = this.on && this.on[h ? "create" : "recycle"]) && a(g, this);
  return g;
};
C.prototype.add = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = c < this.length;
  } else {
    "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  }
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), Q(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function P(a, b, c) {
  b = b._mkp || I(b, a.factory._mkp, a.cache);
  a = a.proxy;
  var d = c._mkx;
  d ? d.path = b : c = new ja(c, {path:b, fn:a, get:ka, set:la});
  return c;
}
C.prototype.reconcile = function(a, b, c) {
  var d = this.dom, e = this.live, l = this.key, g = a.length, f = d.length, h = f > g ? f : g, k = 0;
  for (c || (c = 0); c < h; c++) {
    var m = void 0;
    if (c < g) {
      var p = a[c], r = c >= f, t = void 0, w = void 0, x = void 0;
      this.proxy && !p._mkx && (a[c] = P(this, d[c], p));
      if (!r && (t = d[c], w = p[l], x = t._mkk, x === w)) {
        this.update(t, p, b, c, 1);
        continue;
      }
      if (r || !e[w]) {
        r || !this.pool ? (f++, h = f > g ? f : g, this.add(p, b, c)) : this.replace(t, p, b, c);
        continue;
      }
      for (var E = r = void 0, z = c + 1; z < h; z++) {
        if (!r && z < f && d[z]._mkk === w && (r = z + 1), !E && z < g && a[z][l] === x && (E = z + 1), r && E) {
          r >= E + k ? (m = d[r - 1], this.root.insertBefore(m, t), this.update(m, p, b, c, 1), r === E ? (1 < z - c && this.root.insertBefore(t, d[r]), d[c] = d[z], (d[z] = t) || console.error("reconcile.error 1")) : (r - 1 === c && console.error("reconcile.error 2"), Q(d, r - 1, c), k++)) : (p = E - 1 + k, this.root.insertBefore(t, d[p] || null), (p > f ? f : p) - 1 === c && console.error("reconcile.error 3"), Q(d, c, (p > f ? f : p) - 1), k--, c--);
          m = 1;
          break;
        }
      }
    }
    m || (this.remove(c), f--, h = f > g ? f : g, c--);
  }
  return this;
};
function Q(a, b, c, d) {
  var e = d || a[b];
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
  a[c] = e;
}
C.prototype.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = 1;
  } else {
    "number" === typeof c && (0 > c && (c += this.length), d = 1);
  }
  for (var e = a.length, l = 0; l < e; l++) {
    this.add(a[l], b, d ? c++ : null);
  }
  return this;
};
C.prototype.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
C.prototype.remove = function(a, b) {
  var c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root._mkd = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  for (var d = this.pool && !this.key, e = this.key || this.pool, l = this.on && this.on.remove, g = 0, f; g < b; g++) {
    f = a[d ? b - g - 1 : g], c && f.remove(), e && this.checkout(f), l && l(f, this);
  }
  this.length = c;
  return this;
};
C.prototype.index = function(a) {
  return this.dom.indexOf(a);
};
C.prototype.node = function(a) {
  return this.dom[a];
};
C.prototype.checkout = function(a) {
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
C.prototype.flush = function() {
  this.pool_shared = [];
  this.pool_keyed = new Map();
  return this;
};
C.prototype.destroy = function() {
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], M[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
var R = Array.prototype, S = window.Proxy, T = !1;
function U(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function N(a) {
  if (a instanceof N) {
    return a;
  }
  if (!(this instanceof N)) {
    return new N(a);
  }
  this.mikado = null;
  var b = a ? a.length : 0;
  if (S) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:R.splice.bind(this), pop:R.pop.bind(this), shift:R.shift.bind(this), unshift:R.unshift.bind(this), push:R.push.bind(this)};
    return new Proxy(this, na);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
N.prototype.mount = function(a) {
  this.mikado !== a && (this.mikado && a.mount(this.mikado.root), this.mikado = a);
  return this;
};
N.prototype.define = function(a) {
  Object.defineProperty(this, a, {get:function() {
    return this.proto[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), na.set(this, a, b));
  }});
  return this;
};
var na = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (d = !0);
  }
  e = a.mikado;
  if (!T) {
    T = !0;
    if (e) {
      var l = a.length;
      if (d) {
        U(e);
        var g = e.length;
        l !== g && (a.length = g);
        b >= g ? (e.add(c), a.length++) : b < g && (l = e.dom[b], e.recycle || e.key && l._mkk === c[e.key] ? e.update(l, c, null, b) : e.replace(l, c, null, b));
      } else {
        "length" === b && c < l && e.remove(c, l - c);
      }
    }
    T = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = P(e, e.dom[b], c));
  (S ? a : a.proto)[b] = c;
  return !0;
}};
N.prototype.swap = function(a, b) {
  var c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
N.prototype.set = function(a) {
  this.splice();
  return this.concat(a);
};
N.prototype.splice = function(a, b, c) {
  U(this.mikado);
  T = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a);
  T = !1;
  return b;
};
N.prototype.push = function(a) {
  U(this.mikado);
  T = !0;
  this.mikado.add(a);
  this[this.length] = a;
  S && this.length++;
  T = !1;
};
N.prototype.unshift = function(a) {
  U(this.mikado);
  T = !0;
  this.mikado.add(a, 0);
  this.proto.unshift(a);
  T = !1;
};
N.prototype.pop = function() {
  U(this.mikado);
  T = !0;
  this.mikado.remove(this.length - 1);
  var a = this.proto.pop();
  T = !1;
  return a;
};
N.prototype.shift = function() {
  U(this.mikado);
  T = !0;
  this.mikado.remove(0);
  var a = this.proto.shift();
  T = !1;
  return a;
};
N.prototype.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
N.prototype.sort = R.sort;
N.prototype.reverse = R.reverse;
N.prototype.slice = R.slice;
N.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
N.prototype.filter = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    if (a(this[b])) {
      e && (this.splice(d, e), c -= e, b -= e, e = 0);
    } else {
      if (e) {
        e++;
      } else {
        var d = b;
        var e = 1;
      }
    }
  }
  e && this.splice(d, e);
  return this;
};
N.prototype.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
N.prototype.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
N.prototype.includes = R.includes;
N.prototype.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
N.prototype.transaction = function(a) {
  U(this.mikado);
  T = !0;
  a();
  this.mikado.async ? this.mikado.render(this).then(function() {
    T = !1;
  }) : (this.mikado.render(this), T = !1);
  return this;
};
var V = document.createElement("div"), oa = document.createTextNode(""), W = document.createElement("div");
V.appendChild(oa);
C.prototype.move = C.prototype.moveTo = function(a, b) {
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
C.prototype.shift = C.prototype.shiftBy = function(a, b) {
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
    var e = this.dom[b], l = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.dom[b + 1] || null);
    if (l) {
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
      this.dom[c] = e, this.dom[b] = a;
    }
  }
  return this;
};
C.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
C.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
C.prototype.first = function(a) {
  return this.shift(a, -this.length);
};
C.prototype.last = function(a) {
  return this.shift(a, this.length);
};
C.prototype.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
C.prototype.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
C.prototype.swap = function(a, b) {
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
    var e = c + 1 !== d;
    this.root.insertBefore(e ? a : b, e ? b : a);
    e && d + 1 !== c && this.root.insertBefore(b, this.dom[c + 1] || null);
    this.dom[c] = b;
    this.dom[d] = a;
  }
  return this;
};
var pa = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, qa = 0, ra = 0;
function X(a, b, c, d, e, l) {
  qa || (qa = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(w) {
      var x = X(a);
      "function" === typeof b && b(x);
      w(x);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1});
  var g = l ? {} : {tpl:{}}, f = l ? g : g.tpl;
  if (!l) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var h = document.createElement("div");
        h.innerHTML = a;
        a = h.firstElementChild;
      } else {
        g.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (g.name || (g.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  h = a.tagName;
  if (!h || "SCRIPT" === h) {
    var k;
    if ((k = (h ? a.firstChild : a).nodeValue) && k && k.trim()) {
      if (k.includes("{{@")) {
        var m = k.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        k = /{{[\s\S]+}}/.test(m) ? m.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        m && (m = m.replace(/{{([\s\S]+)}}/g, ""));
        m && d.push(m);
        if ("SCRIPT" === h) {
          return k.trim() && (f.text = k, f.tag = h), f;
        }
      }
      k && k.trim() && (k.includes("{{#") ? sa(f, "html", k, !1, null, e, c, d) : (e.count++, sa(f, "text", k, !1, null, e, c, d)));
    }
    if (!h) {
      return k && k.trim() ? f : null;
    }
  }
  h && (f.tag = h);
  if ((k = a.attributes) && k.length) {
    h = {};
    for (m = 0; m < k.length; m++) {
      var p = k[m].nodeName, r = a.getAttribute(p);
      "include" === p && (p = "inc");
      h[p] = r;
    }
    k = h;
    for (var t in k) {
      h = k[t];
      p = m = void 0;
      switch(t) {
        case "class":
        case "style":
          m = t;
          break;
        case "include":
          t = "inc";
        case "inc":
          m = t;
          break;
        case "if":
          m = t;
          break;
        case "foreach":
          m = t = "for";
          break;
        case "js":
          break;
        case "key":
          g.key = h.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          pa[t] ? p = f.event || (f.event = {}) : (l || "id" !== t && "name" !== t || g.name || /{{[\s\S]+}}/.test(h) || (g.name = h), p = f.attr || (f.attr = {})), m = t;
      }
      m && sa(p || f, m, h, !!p, k, e, c, d);
    }
  }
  t = (a.content || a).childNodes;
  k = t.length;
  e.included && (e.included = !1, e.inc++, d = [], (f.for || f.if) && c.unshift(d), f.child || (f.child = f.text ? {text:f.text} : f.html ? {html:f.html} : null), k ? (d.root = f, d.inc = f.child || (f.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = f.inc, delete f.for, delete f.if, delete f.text, delete f.html);
  if (k) {
    h = 0;
    for (m = void 0; h < k; h++) {
      if (m = t[h], 8 !== m.nodeType && (e.count++, p = X(m, null, c, d, e, 1))) {
        1 !== k || 3 !== m.nodeType && p.text || f.js && p.js ? (p.text || p.tag) && (f.child || (f.child = [])).push(p) : (p.js && (f.js = p.js), p.html && (f.html = p.html), p.text && (f.text = p.text));
      }
    }
    f.child && 1 === f.child.length && (f.child = f.child[0]);
  }
  if (!l) {
    if (g.name || (g.name = "tpl-" + ra++), 1 === c.length && 0 === c[0].length) {
      g.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d].length ? (c[d].unshift("let _o,_v"), c[d] = Function("data", "state", "index", "_p", '"use strict";' + c[d].join(";"))) : c[d] = null;
      }
      g.fn = c.length ? c : null;
    }
  }
  return g;
}
function sa(a, b, c, d, e, l, g, f) {
  if (/{{[\s\S]+}}/.test(c)) {
    g = /{{([!?#]+)?=/.test(c);
    var h = /{{!?\?/.test(c), k = /{{\??!/.test(c);
    if (g) {
      if (h || k) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      g = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").trim();
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    h && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || l.count++;
    l.count !== l.last && (l.current++, l.last = l.count, f.push("_o=_p[" + l.current + "]"));
    f.push("_v=" + c);
    d ? f.push('if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? f.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? f.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? f.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && f.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = g ? [g] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || l.included || (l.count !== l.last && (l.current++, l.last = l.count, f.push("_o=_p[" + l.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = l.inc, e.if ? f.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? f.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : f.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), l.included = !0);
}
;var ta = /[^;:]+/g, ua = /[ ]+/g;
function va(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function wa(a, b) {
  var c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (c["_a" + b] = d = a.getAttribute(b));
  return d;
}
function Y(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    for (a = c.split(ua), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function xa(a, b, c, d) {
  var e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function ya(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(ta), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
;C.once = ma;
C.register = function(a, b) {
  var c;
  if ("string" === typeof a) {
    var d = c = a;
    a = M[d];
    a instanceof C || (a = a[0]);
    if (!a) {
      throw Error("The template '" + d + "' was not found.");
    }
  } else {
    d = a.name;
  }
  M[d] && (c ? console.info("The template '" + d + "' was replaced by a new definition.") : console.warn("The template '" + d + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  M[d] = [a, b];
  return C;
};
C.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  var b = M[a];
  b && (b instanceof C && b.destroy(), M[a] = null);
  return C;
};
C.compile = X;
C.setText = function(a, b) {
  var c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
};
C.getText = function(a) {
  var b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d && (3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent);
  return d;
};
C.setHtml = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
C.getHtml = function(a) {
  var b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
C.setClass = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
C.getClass = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c.split(ua);
};
C.hasClass = function(a, b) {
  var c = Y(a), d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
C.toggleClass = function(a, b, c) {
  var d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        xa(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        xa(a, e, b[e], d);
      }
    }
  } else {
    xa(a, b, c, d);
  }
};
C.removeClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var e = a, l = b[d];
      0 !== c[l] && (c[l] = 0, e.classList.remove(l));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
C.addClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var e = a, l = b[d];
      c[l] || (c[l] = 1, e.classList.add(l));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
C.setAttribute = function(a, b, c) {
  var d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (var e in b) {
      va(a, e, b[e], d);
    }
  } else {
    va(a, b, c, d);
  }
};
C.getAttribute = wa;
C.hasAttribute = function(a, b) {
  a = wa(a, b);
  return !(!a && "" !== a);
};
C.removeAttribute = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var e = a, l = b[d];
      !1 !== c["_a" + l] && (c["_a" + l] = !1, e.removeAttribute(l));
    }
  } else {
    !1 !== c["_a" + b] && (c["_a" + b] = !1, a.removeAttribute(b));
  }
};
C.setCss = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
C.getCss = function(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
C.getStyle = function(a, b) {
  var c = ya(a), d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
C.setStyle = function(a, b, c) {
  var d = ya(a), e = a.style;
  if ("object" === typeof b) {
    for (var l in b) {
      c = a;
      var g = l, f = b[l];
      d[g] !== f && (d[g] = f, (e || c.style).setProperty(g, f));
    }
  } else {
    d[b] !== c && (d[b] = c, (e || a.style).setProperty(b, c));
  }
};
C.escape = function(a) {
  V._text !== a && (oa.nodeValue = a, V._html = V.innerHTML, V._text = a);
  return V._html;
};
C.sanitize = function(a) {
  W._html !== a && (W.innerHTML = a, W._html = a, W._text = W.textContent);
  return W._text;
};
C.prototype.route = C.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  v[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  v[a] = b;
  c && (y[a] = c);
  return this;
};
C.prototype.dispatch = C.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!v[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  v[a](b || this, c || window.event);
  return this;
};
C.prototype.listen = C.listen = ca;
C.prototype.unlisten = C.unlisten = function(a) {
  q[a] && (F(0, a, D, u[a]), q[a] = 0, u[a] = null);
  return this;
};
C.Array = N;
var Z = window, za;
(za = Z.define) && za.amd ? za([], function() {
  return C;
}) : "object" === typeof Z.exports ? Z.exports = C : Z.Mikado = C;
}).call(this);
