/**!
 * Mikado.js v0.8.212 (ES5/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var l;
function aa(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
}
var p = aa(this);
function ba(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
var q = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
function x(a, b) {
  if (b) {
    a: {
      var c = p;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var f = a[d];
        if (!(f in c)) {
          break a;
        }
        c = c[f];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && q(c, a, {configurable:!0, writable:!0, value:b});
    }
  }
}
x("Symbol", function(a) {
  function b(m) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (m || "") + "_" + f++, m);
  }
  function c(m, h) {
    this.h = m;
    q(this, "description", {configurable:!0, writable:!0, value:h});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.h;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", f = 0;
  return b;
});
x("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = p[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && q(d.prototype, a, {configurable:!0, writable:!0, value:function() {
      return ca(ba(this));
    }});
  }
  return a;
});
function ca(a) {
  a = {next:a};
  a[Symbol.iterator] = function() {
    return this;
  };
  return a;
}
function z(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return {next:ba(a)};
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
}
function A(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}
x("WeakMap", function(a) {
  function b(g) {
    this.h = (e += Math.random() + 1).toString();
    if (g) {
      g = z(g);
      for (var k; !(k = g.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  function c() {
  }
  function d(g) {
    var k = typeof g;
    return "object" === k && null !== g || "function" === k;
  }
  function f(g) {
    if (!A(g, h)) {
      var k = new c();
      q(g, h, {value:k});
    }
  }
  function m(g) {
    var k = Object[g];
    k && (Object[g] = function(n) {
      if (n instanceof c) {
        return n;
      }
      Object.isExtensible(n) && f(n);
      return k(n);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var g = Object.seal({}), k = Object.seal({}), n = new a([[g, 2], [k, 3]]);
      if (2 != n.get(g) || 3 != n.get(k)) {
        return !1;
      }
      n.delete(g);
      n.set(k, 4);
      return !n.has(g) && 4 == n.get(k);
    } catch (r) {
      return !1;
    }
  }()) {
    return a;
  }
  var h = "$jscomp_hidden_" + Math.random();
  m("freeze");
  m("preventExtensions");
  m("seal");
  var e = 0;
  b.prototype.set = function(g, k) {
    if (!d(g)) {
      throw Error("Invalid WeakMap key");
    }
    f(g);
    if (!A(g, h)) {
      throw Error("WeakMap key fail: " + g);
    }
    g[h][this.h] = k;
    return this;
  };
  b.prototype.get = function(g) {
    return d(g) && A(g, h) ? g[h][this.h] : void 0;
  };
  b.prototype.has = function(g) {
    return d(g) && A(g, h) && A(g[h], this.h);
  };
  b.prototype.delete = function(g) {
    return d(g) && A(g, h) && A(g[h], this.h) ? delete g[h][this.h] : !1;
  };
  return b;
});
x("Map", function(a) {
  function b() {
    var e = {};
    return e.o = e.next = e.head = e;
  }
  function c(e, g) {
    var k = e[1];
    return ca(function() {
      if (k) {
        for (; k.head != e[1];) {
          k = k.o;
        }
        for (; k.next != k.head;) {
          return k = k.next, {done:!1, value:g(k)};
        }
        k = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(e, g) {
    var k = g && typeof g;
    "object" == k || "function" == k ? m.has(g) ? k = m.get(g) : (k = "" + ++h, m.set(g, k)) : k = "p_" + g;
    var n = e[0][k];
    if (n && A(e[0], k)) {
      for (e = 0; e < n.length; e++) {
        var r = n[e];
        if (g !== g && r.key !== r.key || g === r.key) {
          return {id:k, list:n, index:e, j:r};
        }
      }
    }
    return {id:k, list:n, index:-1, j:void 0};
  }
  function f(e) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (e) {
      e = z(e);
      for (var g; !(g = e.next()).done;) {
        g = g.value, this.set(g[0], g[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({x:4}), g = new a(z([[e, "s"]]));
      if ("s" != g.get(e) || 1 != g.size || g.get({x:4}) || g.set({x:4}, "t") != g || 2 != g.size) {
        return !1;
      }
      var k = g.entries(), n = k.next();
      if (n.done || n.value[0] != e || "s" != n.value[1]) {
        return !1;
      }
      n = k.next();
      return n.done || 4 != n.value[0].x || "t" != n.value[1] || !k.next().done ? !1 : !0;
    } catch (r) {
      return !1;
    }
  }()) {
    return a;
  }
  var m = new WeakMap();
  f.prototype.set = function(e, g) {
    e = 0 === e ? 0 : e;
    var k = d(this, e);
    k.list || (k.list = this[0][k.id] = []);
    k.j ? k.j.value = g : (k.j = {next:this[1], o:this[1].o, head:this[1], key:e, value:g}, k.list.push(k.j), this[1].o.next = k.j, this[1].o = k.j, this.size++);
    return this;
  };
  f.prototype.delete = function(e) {
    e = d(this, e);
    return e.j && e.list ? (e.list.splice(e.index, 1), e.list.length || delete this[0][e.id], e.j.o.next = e.j.next, e.j.next.o = e.j.o, e.j.head = null, this.size--, !0) : !1;
  };
  f.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].o = b();
    this.size = 0;
  };
  f.prototype.has = function(e) {
    return !!d(this, e).j;
  };
  f.prototype.get = function(e) {
    return (e = d(this, e).j) && e.value;
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
  f.prototype.forEach = function(e, g) {
    for (var k = this.entries(), n; !(n = k.next()).done;) {
      n = n.value, e.call(g, n[1], n[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var h = 0;
  return f;
});
x("Promise", function(a) {
  function b(h) {
    this.i = 0;
    this.u = void 0;
    this.h = [];
    this.K = !1;
    var e = this.D();
    try {
      h(e.resolve, e.reject);
    } catch (g) {
      e.reject(g);
    }
  }
  function c() {
    this.h = null;
  }
  function d(h) {
    return h instanceof b ? h : new b(function(e) {
      e(h);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.i = function(h) {
    if (null == this.h) {
      this.h = [];
      var e = this;
      this.u(function() {
        e.F();
      });
    }
    this.h.push(h);
  };
  var f = p.setTimeout;
  c.prototype.u = function(h) {
    f(h, 0);
  };
  c.prototype.F = function() {
    for (; this.h && this.h.length;) {
      var h = this.h;
      this.h = [];
      for (var e = 0; e < h.length; ++e) {
        var g = h[e];
        h[e] = null;
        try {
          g();
        } catch (k) {
          this.D(k);
        }
      }
    }
    this.h = null;
  };
  c.prototype.D = function(h) {
    this.u(function() {
      throw h;
    });
  };
  b.prototype.D = function() {
    function h(k) {
      return function(n) {
        g || (g = !0, k.call(e, n));
      };
    }
    var e = this, g = !1;
    return {resolve:h(this.O), reject:h(this.F)};
  };
  b.prototype.O = function(h) {
    if (h === this) {
      this.F(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (h instanceof b) {
        this.R(h);
      } else {
        a: {
          switch(typeof h) {
            case "object":
              var e = null != h;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.N(h) : this.J(h);
      }
    }
  };
  b.prototype.N = function(h) {
    var e = void 0;
    try {
      e = h.then;
    } catch (g) {
      this.F(g);
      return;
    }
    "function" == typeof e ? this.S(e, h) : this.J(h);
  };
  b.prototype.F = function(h) {
    this.L(2, h);
  };
  b.prototype.J = function(h) {
    this.L(1, h);
  };
  b.prototype.L = function(h, e) {
    if (0 != this.i) {
      throw Error("Cannot settle(" + h + ", " + e + "): Promise already settled in state" + this.i);
    }
    this.i = h;
    this.u = e;
    2 === this.i && this.P();
    this.T();
  };
  b.prototype.P = function() {
    var h = this;
    f(function() {
      if (h.M()) {
        var e = p.console;
        "undefined" !== typeof e && e.error(h.u);
      }
    }, 1);
  };
  b.prototype.M = function() {
    if (this.K) {
      return !1;
    }
    var h = p.CustomEvent, e = p.Event, g = p.dispatchEvent;
    if ("undefined" === typeof g) {
      return !0;
    }
    "function" === typeof h ? h = new h("unhandledrejection", {cancelable:!0}) : "function" === typeof e ? h = new e("unhandledrejection", {cancelable:!0}) : (h = p.document.createEvent("CustomEvent"), h.initCustomEvent("unhandledrejection", !1, !0, h));
    h.promise = this;
    h.reason = this.u;
    return g(h);
  };
  b.prototype.T = function() {
    if (null != this.h) {
      for (var h = 0; h < this.h.length; ++h) {
        m.i(this.h[h]);
      }
      this.h = null;
    }
  };
  var m = new c();
  b.prototype.R = function(h) {
    var e = this.D();
    h.H(e.resolve, e.reject);
  };
  b.prototype.S = function(h, e) {
    var g = this.D();
    try {
      h.call(e, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  b.prototype.then = function(h, e) {
    function g(t, u) {
      return "function" == typeof t ? function(v) {
        try {
          k(t(v));
        } catch (w) {
          n(w);
        }
      } : u;
    }
    var k, n, r = new b(function(t, u) {
      k = t;
      n = u;
    });
    this.H(g(h, k), g(e, n));
    return r;
  };
  b.prototype.catch = function(h) {
    return this.then(void 0, h);
  };
  b.prototype.H = function(h, e) {
    function g() {
      switch(k.i) {
        case 1:
          h(k.u);
          break;
        case 2:
          e(k.u);
          break;
        default:
          throw Error("Unexpected state: " + k.i);
      }
    }
    var k = this;
    null == this.h ? m.i(g) : this.h.push(g);
    this.K = !0;
  };
  b.resolve = d;
  b.reject = function(h) {
    return new b(function(e, g) {
      g(h);
    });
  };
  b.race = function(h) {
    return new b(function(e, g) {
      for (var k = z(h), n = k.next(); !n.done; n = k.next()) {
        d(n.value).H(e, g);
      }
    });
  };
  b.all = function(h) {
    var e = z(h), g = e.next();
    return g.done ? d([]) : new b(function(k, n) {
      function r(v) {
        return function(w) {
          t[v] = w;
          u--;
          0 == u && k(t);
        };
      }
      var t = [], u = 0;
      do {
        t.push(void 0), u++, d(g.value).H(r(t.length - 1), n), g = e.next();
      } while (!g.done);
    });
  };
  return b;
});
function da(a, b) {
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
}
x("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return da(this, function(b) {
      return b;
    });
  };
});
x("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
});
x("Array.prototype.includes", function(a) {
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
});
x("String.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    if (null == this) {
      throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
    }
    if (b instanceof RegExp) {
      throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
    }
    return -1 !== this.indexOf(b, c || 0);
  };
});
function B(a) {
  var b = window.profiler || (window.profiler = {});
  b[a] || (b[a] = 0);
  b[a]++;
}
;var C = {}, D = {}, E = Object.create(null), F = Object.create(null), ea = document.documentElement || document.body.parentNode, ha = "ontouchstart" in window, G = !ha && window.PointerEvent && navigator.maxTouchPoints, ia;
function ja(a, b) {
  B("event.trigger");
  b || (b = a.type);
  var c = a.target, d = I.eventCache, f = I.eventBubble, m;
  d && (m = c["_mke" + b]);
  if ("undefined" === typeof m) {
    for (var h = c; h && h !== ea;) {
      B("event.bubble");
      var e = void 0;
      "click" === b && ia && (e = h.getAttribute("tap"));
      e || (e = h.getAttribute(b));
      if (e) {
        var g = e.indexOf(":"), k = h;
        if (-1 < g) {
          var n = e.substring(0, g);
          g = e.substring(g + 1);
          for (e = ""; (k = k.parentElement) !== ea;) {
            if (B("event.bubble"), k.hasAttribute(g)) {
              e = n;
              break;
            }
          }
          e || console.warn("Event root '" + g + "' was not found for the event: '" + n + "'.");
        }
        if (e && (m || (m = [], d && (c["_mke" + b] = m)), m.push([e, k]), e = F[e], !f || e && (e.stop || e.cancel))) {
          break;
        }
      }
      h = h.parentElement;
    }
    d && (m || (c["_mke" + b] = null));
  } else {
    B("event.cache");
  }
  if (m) {
    for (f = 0; f < m.length; f++) {
      if (k = m[f], h = k[0], e = E[h]) {
        k = k[1];
        if (n = F[h]) {
          n.prevent && a.preventDefault(), n.stop && a.stopImmediatePropagation(), n.once && (E[h] = null, d && (c["_mke" + b] = null));
        }
        B("route.call");
        e(k, a);
      } else {
        console.warn("The route '" + h + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ka(a, b) {
  C[a] || (B("event.listen"), J(1, a, ja, b), C[a] = 1, D[a] = b || null);
  return this;
}
var K, L, la;
if (ha || G) {
  var ma = function(a) {
    var b = K, c = L, d = a, f = a.changedTouches;
    f && (d = f[0]);
    K = d.clientX;
    L = d.clientY;
    15 > Math.abs(K - b) && 15 > Math.abs(L - c) && ja(a, "tap");
  }, na = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    K = b.clientX;
    L = b.clientY;
  }, oa = {passive:!1, capture:!0};
  la = function(a) {
    J(a, G ? "pointerdown" : "touchstart", na, oa);
    J(a, G ? "pointerup" : "touchend", ma, oa);
  };
}
function J(a, b, c, d) {
  B(a ? "event.register" : "event.unregister");
  if ("tap" === b) {
    if (ha || G) {
      la(a);
      return;
    }
    ia = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function M(a, b, c) {
  B("factory.path");
  for (var d = b.length, f = [], m = {}, h = 0, e, g, k, n = void 0, r = null; h < d; h++) {
    e = b[h];
    if (g = e.v) {
      if (k = e = m[g], !k) {
        e = void 0;
        k = a;
        B("factory.resolve");
        for (var t = 0, u = g.length, v = ""; t < u; t++) {
          var w = g[t];
          v += w;
          m[v] ? k = m[v] : (">" === w ? k = k.firstChild : "|" === w ? (e = k, k = k.firstChild) : "@" === w ? (e = k, k = k.style) : k = k.nextSibling, m[v] = k);
        }
        e = [k, e];
        k = e[0];
        e = e[1] || k;
      }
    } else {
      k = e = a;
    }
    c && n !== e && (n = e, e._mkc = r = {});
    B("cache.create");
    f[h] = new N(r, k, "");
  }
  return a._mkp = f;
}
function O(a, b, c, d, f, m) {
  B("factory.construct");
  m || (a.s = 1);
  var h = f || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text)), e, g;
  if (g = b.class) {
    "object" === typeof g ? (B("cache.create"), c.push(new N(e = {_c:""}, h, d)), (g = g[0]) ? P(a, g, ["_c", c.length - 1]) : a.s = 0) : f || (h.className = g);
  }
  if (g = b.attr) {
    for (var k in g) {
      var n = g[k];
      "object" === typeof n ? (B("cache.create"), e || c.push(new N(e = {}, h, d)), e["_a" + k] = !1, (n = n[0]) ? P(a, n, ["_a", c.length - 1, k]) : a.s = 0) : f || h.setAttribute(k, n);
    }
  }
  if (g = b.event) {
    for (var r in g) {
      f || h.setAttribute(r, g[r]), ka(r);
    }
  }
  if (g = b.style) {
    "object" === typeof g ? (B("cache.create"), c.push(new N(e || (e = {}), h.style, d + "@")), e._s = "", (g = g[0]) ? P(a, g, ["_s", c.length - 1]) : a.s = 0) : f || (h.style.cssText = g);
  }
  if (g = b.text) {
    if ("object" === typeof g) {
      var t = h;
      g = g[0];
      b.tag ? (d += "|", t = !f && h.firstChild, t || (t = document.createTextNode(g), h.appendChild(t))) : e = {};
      (e || (e = {}))._t = g;
      B("cache.create");
      c.push(new N(e, t, d));
      g ? P(a, g, ["_t", c.length - 1]) : a.s = 0;
    } else {
      f || (b.tag ? h.textContent = g : h.nodeValue = g);
    }
  } else if (g = b.child) {
    if (f && (f = f.firstChild, !f)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    g.constructor !== Array && (g = [g]);
    b = 0;
    for (t = g.length; b < t; b++) {
      if (k = g[b], d = b ? d + "+" : d + ">", k = O(a, k, c, d, f, 1), f) {
        if (b < t - 1 && (f = f.nextSibling, !f)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        h.appendChild(k);
      }
    }
  } else if (g = b.html) {
    "object" === typeof g ? (B("cache.create"), e || c.push(new N(e = {}, h, d)), e._h = "", (g = g[0]) ? P(a, g, ["_h", c.length - 1]) : a.s = 0) : f || (h.innerHTML = g);
  } else if (g = b.inc) {
    B("cache.create");
    B("template.include");
    e || c.push(new N(null, h, d));
    if ("string" === typeof g) {
      t = Q[g];
      if (!t) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(t instanceof I)) {
        d = t[0];
        if (b = t[1]) {
          b.async = !1, f && (b.root = f, b.hydrate = !0);
        }
        Q[g] = t = new I(d, b);
      }
    } else if (1 !== g) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      t = new I({name:a.name + "|" + d, tpl:g, key:g.key, cache:g.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:h, hydrate:!!f});
    }
    1 !== g && a.inc.push(t);
  }
  e && (h._mkc = e);
  m || (h._mkp = c);
  return h;
}
function P(a, b, c) {
  B("proxy.init");
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function N(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
l = N.prototype;
l._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      B("cache.match");
      return;
    }
    B("cache.miss");
    B("cache.attr");
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
l._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      B("cache.match");
      return;
    }
    B("cache.miss");
    B("cache.text");
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
l._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      B("cache.match");
      return;
    }
    B("cache.miss");
    B("cache.class");
    this.c._c = a;
  }
  this.n.className = a;
};
l._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      B("cache.match");
      return;
    }
    B("cache.miss");
    B("cache.style");
    this.c._s = a;
  }
  this.n.cssText = a;
};
l._h = function(a) {
  if (this.c) {
    if (this.c._h === a) {
      B("cache.match");
      return;
    }
    B("cache.miss");
    B("cache.html");
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
var qa = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (var d in b) {
      this.h(b, d, b[d]);
    }
    b._mkx = this;
    return b;
  }
  a.prototype.h = function(b, c, d) {
    B("proxy.define");
    var f = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(m) {
      pa(f, d = m, c);
    }});
  };
  return a;
}();
function ra(a, b) {
  B("proxy.read");
  return "_mkx" === b ? this : a[b];
}
function sa(a, b, c) {
  B("proxy.write");
  pa(this, c, b);
  a[b] = c;
  return !0;
}
function pa(a, b, c) {
  if (c = a.fn[c]) {
    for (var d = 0; d < c.length; d++) {
      var f = c[d], m = f[0], h = a.path[f[1]];
      h.c && h.c[m + (f[2] || "")] === b ? B("cache.match") : (B("cache.miss"), h[m](f[2] || b, b));
    }
  }
}
;var Q = Object.create(null);
function I(a, b) {
  b = void 0 === b ? {} : b;
  if (!(this instanceof I)) {
    return new I(a, b);
  }
  B("mikado.new");
  if ("string" === typeof a) {
    var c = Q[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof I) {
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
  this.g = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.shadow = b.shadow || !!a.cmp;
  this.key = a.key || "";
  this.A = {};
  c = a.fn;
  a.I || c && (a.I = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.G = [];
  this.m = new Map();
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.B = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.s = 0;
  (a = b.observe) && (new R(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.l = null;
}
l = I.prototype;
l.mount = function(a, b) {
  B("view.mount");
  if (!a) {
    throw Error("No target was passed to .mount()");
  }
  this.B && this.cancel();
  this.shadow && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  var c = a._mki, d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.g = a._mkd;
    this.length = this.g.length;
  } else if (c) {
    B("mikado.unmount");
    c.clear();
    a._mkd = this.g = [];
    this.length = 0;
    a.firstChild && (B("mount.reset"), a.textContent = "");
    var f = this.on && this.on.unmount;
    f && f(a, c);
  } else {
    if (b) {
      f = a.children;
      B("collection_to_array");
      for (var m = f.length, h = Array(m), e = 0; e < m; e++) {
        h[e] = f[e];
      }
      this.g = h;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (B("mount.reset"), a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.A), c === this) {
      this.A = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (c = 0; c < this.length; c++) {
          f = this.g[c], m = f.getAttribute("key"), f._mkk = m, d[m] = f;
        }
      }
      a._mkl = this.A = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.l || (b && this.length && (this.l = this.g[0].cloneNode(!0), O(this, this.tpl.tpl, [], "", this.l) && ta(this)), this.tpl && (this.l = O(this, this.tpl.tpl, [], ""), ta(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function ta(a) {
  a.tpl.I && (a.tpl.fn = a.tpl.I, a.tpl.I = null);
  a.tpl = null;
}
function ua(a, b, c, d, f) {
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
    return new Promise(function(e) {
      requestAnimationFrame(function() {
        ua(a, b, c, d);
        "function" === typeof f && f();
        e();
      });
    });
  }
  B("mikado.once");
  if (c || b.fn) {
    var m = new I(b);
    if (c && Array.isArray(c)) {
      for (var h = 0; h < c.length; h++) {
        a.append(m.create(c[h], d, h));
      }
    } else {
      a.append(m.create(c, d));
    }
    m.destroy();
  } else {
    m = O({}, b.tpl, [], "", null, 1), a.append(m);
  }
  return I;
}
l.render = function(a, b, c, d) {
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
    this.B && this.cancel();
    if (this.async || c) {
      var m = this;
      f || (f = "function" === typeof c);
      m.B = requestAnimationFrame(function() {
        m.B = 0;
        m.render(a, b, null, 1);
        c();
      });
      return f ? this : new Promise(function(r) {
        c = r;
      });
    }
  }
  B("view.render");
  var h = this.length;
  if (!a) {
    return this.apply ? console.warn("When calling .render() by passing no data nothing will happen!") : this.g[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof R) {
    if (d = a.length, !d) {
      return this.remove(0, h);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  var e = this.key;
  !h || e || this.recycle || (this.remove(0, h), h = 0);
  var g = h < d ? h : d;
  f = 0;
  if (f < g) {
    for (var k = void 0, n = void 0; f < g; f++) {
      k = this.g[f];
      n = a[f];
      if (e && k._mkk !== n[e]) {
        return va(this, a, b, f);
      }
      this.update(k, n, b, f, 1);
      this.proxy && !n._mkx && (a[f] = S(this, k, n));
    }
  }
  if (f < d) {
    for (; f < d; f++) {
      h = a[f], this.add(h, b), !this.proxy || this.recycle && h._mkx || (a[f] = S(this, this.g[f], h));
    }
  } else {
    d < h && this.remove(d, h - d);
  }
  return this;
};
l.replace = function(a, b, c, d) {
  B("view.replace");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var f;
  if (this.key) {
    var m = b[this.key];
    if (f = this.A[m]) {
      if (f !== a) {
        var h = this.index(f);
        this.g[d] = f;
        this.g[h] = a;
        m = h < d ? f : a;
        h = h < d ? a : f;
        var e = m.nextElementSibling;
        this.root.insertBefore(m, h);
        e !== h && this.root.insertBefore(h, e);
      }
    } else {
      this.pool && (f = this.m.get(m)) && (this.m.delete(m), wa(this, a), this.g[d] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? this.s && b._mkx || !this.apply || this.apply(b, c || this.state, d, f._mkp || M(f, this.l._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && wa(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
l.update = function(a, b, c, d) {
  B("view.update");
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.s && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.g[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || M(a, this.l._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
l.cancel = function() {
  B("view.cancel");
  cancelAnimationFrame(this.B);
  this.B = 0;
  return this;
};
l.create = function(a, b, c, d) {
  B("view.create");
  var f = this.key, m = f && a[f], h, e, g;
  if (f && this.pool && (e = this.m) && (h = e.get(m))) {
    B("pool.out");
    var k = 1;
    e.delete(m);
  } else {
    (!f || this.recycle) && this.pool && (e = this.G) && e.length ? (B("pool.out"), h = e.pop()) : (h = g = this.l, g || (this.l = h = g = O(this, this.tpl.tpl, [], ""), ta(this)));
  }
  this.apply && this.apply(a, b || this.state, c, h._mkp || M(h, this.l._mkp, !!g || this.cache));
  g && (B("factory.clone"), h = h.cloneNode(!0));
  f && (k || (h._mkk = m), d && (this.A[m] = h));
  (a = this.on && this.on[g ? "create" : "recycle"]) && a(h, this);
  return h;
};
l.add = function(a, b, c) {
  B("view.add");
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = c < this.length;
  } else {
    "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  }
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), xa(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function S(a, b, c) {
  B("proxy.apply");
  b = b._mkp || M(b, a.l._mkp, a.cache);
  a = a.proxy;
  B("proxy.create");
  var d = c._mkx;
  d ? d.path = b : (B("proxy.new"), c = new qa(c, {path:b, fn:a, get:ra, set:sa}));
  return c;
}
function va(a, b, c, d) {
  B("view.reconcile");
  var f = a.g, m = a.A, h = a.key, e = b.length, g = f.length, k = g > e ? g : e, n = 0;
  for (d || (d = 0); d < k; d++) {
    var r = void 0;
    if (d < e) {
      var t = b[d], u = d >= g, v = void 0, w = void 0, fa = void 0;
      a.proxy && !t._mkx && (b[d] = S(a, f[d], t));
      if (!u && (v = f[d], w = t[h], fa = v._mkk, fa === w)) {
        a.update(v, t, c, d, 1);
        continue;
      }
      if (u || !m[w]) {
        u || !a.pool ? (g++, k = g > e ? g : e, a.add(t, c, d)) : a.replace(v, t, c, d);
        continue;
      }
      for (var H = u = void 0, y = d + 1; y < k; y++) {
        if (!u && y < g && f[y]._mkk === w && (u = y + 1), !H && y < e && b[y][h] === fa && (H = y + 1), u && H) {
          u >= H ? (r = f[u - 1], a.root.insertBefore(r, v), a.update(r, t, c, d, 1), u === H ? (1 < y - d && a.root.insertBefore(v, f[u]), f[d] = f[y], (f[y] = v) || console.error("Error"), B("view.reconcile.steps")) : (xa(f, u - 1, d), n++)) : (t = H - 1 + n, a.root.insertBefore(v, f[t] || null), xa(f, d, (t > g ? g : t) - 1), n--, d--);
          B("view.reconcile.steps");
          r = 1;
          break;
        }
      }
    }
    r || (a.remove(d), g--, k = g > e ? g : e, d--);
  }
  return a;
}
function xa(a, b, c, d) {
  B("splice");
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
l.append = function(a, b, c) {
  B("view.append");
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
l.clear = function() {
  B("view.clear");
  this.length && this.remove(0, this.length);
  return this;
};
l.remove = function(a, b) {
  var c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  for (var d = this.pool && !this.key, f = this.key || this.pool, m = this.on && this.on.remove, h = 0, e; h < b; h++) {
    B("view.remove"), e = a[d ? b - h - 1 : h], c && e.remove(), f && wa(this, e), m && m(e, this);
  }
  this.length = c;
  return this;
};
l.index = function(a) {
  B("view.index");
  return this.g.indexOf(a);
};
l.node = function(a) {
  B("view.node");
  return this.g[a];
};
function wa(a, b) {
  B("view.checkout");
  if (a.key) {
    var c = b._mkk;
    a.A[c] = null;
  }
  if (a.pool) {
    if (c) {
      B("pool.in"), a.m.set(c, b), !0 !== a.pool && a.m.size > a.pool && (B("pool.resize"), a.m.delete(a.m.keys().next().value));
    } else {
      if (c = a.G.length, !0 === a.pool || c < a.pool) {
        B("pool.in"), a.G[c] = b;
      }
    }
  }
}
l.flush = function() {
  B("view.flush");
  this.G = [];
  this.m = new Map();
  return this;
};
l.destroy = function() {
  B("view.destroy");
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], Q[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.A = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.m = this.G = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.l = null;
};
var T = Array.prototype, ya = window.Proxy, U = !1;
function V(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function R(a) {
  if (a instanceof R) {
    return a;
  }
  if (!(this instanceof R)) {
    return new R(a);
  }
  B("observer.create");
  this.h = null;
  var b = a ? a.length : 0;
  if (ya) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, za);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    Aa(this, a);
  }
  Aa(this, "length");
}
R.prototype.mount = function(a) {
  B("observer.mount");
  this.h = a;
  return this;
};
function Aa(a, b) {
  B("observer.define");
  Object.defineProperty(a, b, {get:function() {
    return this.i[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && Aa(this, b + 1), za.set(this, b, c));
  }});
}
var za = {set:function(a, b, c) {
  B("observer.write");
  var d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  var f = a.h;
  if (!U) {
    U = !0;
    if (f) {
      var m = a.length;
      if (d) {
        V(f);
        var h = f.length;
        m !== h && (a.length = h);
        b >= h ? (f.add(c), a.length++) : b < h && (m = f.g[b], f.recycle || f.key && m._mkk === c[f.key] ? f.update(m, c, null, b) : f.replace(m, c, null, b));
      } else {
        "length" === b && c < m && f.remove(c, m - c);
      }
    }
    U = !1;
  }
  !d || !f.proxy || f.recycle && c._mkx || (c = S(f, f.g[b], c));
  (ya ? a : a.i)[b] = c;
  return !0;
}, get:function(a, b) {
  B("observer.read");
  return a[b];
}};
l = R.prototype;
l.swap = function(a, b) {
  B("observer.swap");
  var c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
l.set = function(a) {
  B("observer.set");
  this.splice();
  return this.concat(a);
};
l.splice = function(a, b, c) {
  B("observer.splice");
  V(this.h);
  U = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.h.remove(a, b);
  b = c ? this.i.splice(a, b, c) : this.i.splice(a, b);
  c && this.h.add(c, a);
  U = !1;
  return b;
};
l.push = function(a) {
  B("observer.push");
  V(this.h);
  U = !0;
  this.h.add(a);
  this[this.length] = a;
  ya && this.length++;
  U = !1;
};
l.unshift = function(a) {
  B("observer.unshift");
  V(this.h);
  U = !0;
  this.h.add(a, 0);
  this.i.unshift(a);
  U = !1;
};
l.pop = function() {
  B("observer.pop");
  V(this.h);
  U = !0;
  this.h.remove(this.length - 1);
  var a = this.i.pop();
  U = !1;
  return a;
};
l.shift = function() {
  B("observer.shift");
  V(this.h);
  U = !0;
  this.h.remove(0);
  var a = this.i.shift();
  U = !1;
  return a;
};
l.concat = function(a) {
  B("observer.concat");
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
l.sort = T.sort;
l.reverse = T.reverse;
l.slice = T.slice;
l.map = function(a, b) {
  B("observer.map");
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
l.filter = function(a, b) {
  B("observer.filter");
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
l.indexOf = function(a) {
  B("observer.indexOf");
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
l.lastIndexOf = function(a) {
  B("observer.lastIndexOf");
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
l.forEach = function(a) {
  B("observer.forEach");
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
var W = document.createElement("div"), Ba = document.createTextNode(""), X = document.createElement("div");
W.appendChild(Ba);
l = I.prototype;
l.move = I.prototype.moveTo = function(a, b) {
  if ("number" === typeof a) {
    var c = a;
    a = this.g[c];
  } else {
    c = this.index(a);
  }
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
l.shift = function(a, b) {
  if (!b) {
    return this;
  }
  if ("number" === typeof a) {
    var c = a;
    a = this.g[a];
  } else {
    c = this.index(a);
  }
  var d = 0 > b;
  if (d && c || !d && c < this.length - 1) {
    b = d ? Math.max(c + b, 0) : Math.min(c + b, this.length - 1);
    var f = this.g[b], m = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? f : this.g[b + 1] || null);
    if (m) {
      a = this.g[c];
      if (d) {
        for (; c > b; c--) {
          this.g[c] = this.g[c - 1];
        }
      } else {
        for (; c < b; c++) {
          this.g[c] = this.g[c + 1];
        }
      }
      this.g[b] = a;
    } else {
      this.g[c] = f, this.g[b] = a;
    }
  }
  return this;
};
l.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
l.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
l.first = function(a) {
  return this.shift(a, -this.length);
};
l.last = function(a) {
  return this.shift(a, this.length);
};
l.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
l.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
l.swap = function(a, b) {
  if (a !== b) {
    if ("number" === typeof a) {
      var c = 0 > a ? this.length + a : a;
      a = this.g[c];
    } else {
      c = this.index(a);
    }
    if ("number" === typeof b) {
      var d = 0 > b ? this.length + b : b;
      b = this.g[d];
    } else {
      d = this.index(b);
    }
    var f = c + 1 !== d;
    this.root.insertBefore(f ? a : b, f ? b : a);
    f && d + 1 !== c && this.root.insertBefore(b, this.g[c + 1] || null);
    this.g[c] = b;
    this.g[d] = a;
  }
  return this;
};
var Ca = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, Da = 0, Ea = 0;
function Fa(a, b, c, d, f, m) {
  Da || (Da = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(v) {
      var w = Fa(a);
      "function" === typeof b && b(w);
      v(w);
    });
  }
  f || (d = [], c = [d], d.index = f = {current:-1, count:0, last:-1, inc:0, C:!1});
  var h = m ? {} : {tpl:{}}, e = m ? h : h.tpl;
  if (!m) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var g = document.createElement("div");
        g.innerHTML = a;
        a = g.firstElementChild;
      } else {
        h.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (h.name || (h.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  g = a.tagName;
  if (!g || "SCRIPT" === g) {
    var k;
    if ((k = (g ? a.firstChild : a).nodeValue) && k && k.trim()) {
      if (k.includes("{{@")) {
        var n = k.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        k = /{{[\s\S]+}}/.test(n) ? n.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        n && (n = n.replace(/{{([\s\S]+)}}/g, ""));
        n && d.push(n);
        if ("SCRIPT" === g) {
          return k.trim() && (e.text = k, e.tag = g), e;
        }
      }
      k && k.trim() && (/{{[!?]?#/.test(k) ? Ga(e, "html", k, !1, null, f, d) : (f.count++, Ga(e, "text", k, !1, null, f, d)));
    }
    if (!g) {
      return k && k.trim() ? e : null;
    }
  }
  g && (e.tag = g);
  if ((k = a.attributes) && k.length) {
    g = {};
    for (n = 0; n < k.length; n++) {
      var r = k[n].nodeName, t = a.getAttribute(r);
      "include" === r && (r = "inc");
      g[r] = t;
    }
    k = g;
    for (var u in k) {
      g = k[u];
      r = n = void 0;
      switch(u) {
        case "class":
        case "style":
          n = u;
          break;
        case "include":
          u = "inc";
        case "inc":
          n = u;
          break;
        case "if":
          n = u;
          break;
        case "foreach":
          n = u = "for";
          break;
        case "js":
          break;
        case "key":
          h.key = g.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          Ca[u] ? r = e.event || (e.event = {}) : (m || "id" !== u && "name" !== u || h.name || /{{[\s\S]+}}/.test(g) || (h.name = g), r = e.attr || (e.attr = {})), n = u;
      }
      n && Ga(r || e, n, g, !!r, k, f, d);
    }
  }
  u = (a.content || a).childNodes;
  k = u.length;
  f.C && (f.C = !1, f.inc++, d = [], (e.for || e.if) && c.unshift(d), e.child || (e.child = e.text ? {text:e.text} : e.html ? {html:e.html} : null), k ? (d.root = e, d.inc = e.child || (e.child = []), d.index = f = {current:-1, count:0, last:-1, inc:0, C:!1}) : d.inc = e.inc, delete e.for, delete e.if, delete e.text, delete e.html);
  if (k) {
    g = 0;
    for (n = void 0; g < k; g++) {
      if (n = u[g], 8 !== n.nodeType && (f.count++, r = Fa(n, null, c, d, f, 1))) {
        1 !== k || 3 !== n.nodeType && r.text || e.js && r.js ? (r.text || r.tag) && (e.child || (e.child = [])).push(r) : (r.js && (e.js = r.js), r.html && (e.html = r.html), r.text && (e.text = r.text));
      }
    }
    e.child && 1 === e.child.length && (e.child = e.child[0]);
  }
  if (!m) {
    if (h.name || (h.name = "tpl-" + Ea++), 1 === c.length && 0 === c[0].length) {
      h.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d].length ? (c[d].unshift("let _o,_v"), c[d] = Function("data", "state", "index", "_p", '"use strict";' + c[d].join(";"))) : c[d] = null;
      }
      h.fn = c.length ? c : null;
    }
  }
  return h;
}
function Ga(a, b, c, d, f, m, h) {
  if (/{{[\s\S]+}}/.test(c)) {
    var e = /{{([!?#]+)?=/.test(c), g = /{{!?\?/.test(c), k = /{{\??!/.test(c);
    c = c.replace(/\x3c!--(.*?)--\x3e/g, "");
    if (e) {
      if (g || k) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      e = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/['"]\)\+''\+\(['"]/g, "").replace(/['"](\s+)?\+(\s+)?['"]/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    g && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" === b && a.tag && m.count++;
    "style" === b && a.tag && m.count++;
    m.count !== m.last && (m.current++, m.last = m.count, h.push("_o=_p[" + m.current + "]"));
    h.push("_v=" + c);
    d ? h.push('if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? h.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? h.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? h.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && h.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = e ? [e] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || m.C || (m.count !== m.last && (m.current++, m.last = m.count, h.push("_o=_p[" + m.current + "]")), a = f.foreach ? f.foreach.trim() : "data", b = m.inc, f.if ? h.push("this.inc[" + b + "].mount(_o.n)[" + f.if.trim() + '?"render":"clear"](' + a + ",state)") : f.foreach ? h.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : h.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), m.C = !0);
}
;var Ha = /[^;:]+/g, Ia = /[ ]+/g;
function Ja(a, b, c, d) {
  d["_a" + b] !== c ? (B("cache.miss"), B("cache.attr"), d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b)) : B("cache.match");
}
function Ka(a, b, c) {
  !1 !== c["_a" + b] ? (B("cache.miss"), B("cache.attr"), c["_a" + b] = !1, a.removeAttribute(b)) : B("cache.match");
}
function La(a, b) {
  var c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d ? (B("cache.miss"), B("cache.attr"), c["_a" + b] = d = a.getAttribute(b)) : B("cache.match");
  return d;
}
function Y(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    for (B("cache.transform"), a = c.split(Ia), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function Ma(a, b, c) {
  c[b] ? B("cache.match") : (B("cache.miss"), B("cache.class"), c[b] = 1, a.classList.add(b));
}
function Na(a, b, c) {
  0 !== c[b] ? (B("cache.miss"), B("cache.class"), c[b] = 0, a.classList.remove(b)) : B("cache.match");
}
function Oa(a, b, c, d) {
  var f = !!d[b];
  c = "undefined" === typeof c ? !f : !!c;
  f !== c ? (B("cache.miss"), B("cache.class"), d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b)) : B("cache.match");
}
function Pa(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (B("cache.transform"), a = c.match(Ha), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
function Qa(a, b, c, d, f) {
  f[b] !== c ? (B("cache.miss"), B("cache.style"), f[b] = c, (d || a.style).setProperty(b, c)) : B("cache.match");
}
;I.once = ua;
I.register = function(a, b) {
  B("mikado.register");
  var c;
  if ("string" === typeof a) {
    var d = c = a;
    a = Q[d];
    a instanceof I || (a = a[0]);
    if (!a) {
      throw Error("The template '" + d + "' was not found.");
    }
  } else {
    d = a.name;
  }
  Q[d] && (c ? console.info("The template '" + d + "' was replaced by a new definition.") : console.warn("The template '" + d + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  Q[d] = [a, b];
  return I;
};
I.unregister = function(a) {
  B("mikado.unregister");
  "object" === typeof a && (a = a.name);
  var b = Q[a];
  b && (b instanceof I && b.destroy(), Q[a] = null);
  return I;
};
I.compile = Fa;
I.setText = function(a, b) {
  var c = a._mkc, d, f;
  c ? f = c._t : a._mkc = c = {};
  f !== b ? (B("cache.miss"), B("cache.text"), c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b) : B("cache.match");
};
I.getText = function(a) {
  var b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d ? (B("cache.miss"), B("cache.text"), 3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent) : B("cache.match");
  return d;
};
I.setHtml = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b ? (B("cache.miss"), B("cache.html"), a.innerHTML = b, c._h = b, c._t = null) : B("cache.match");
};
I.getHtml = function(a) {
  var b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c ? (B("cache.miss"), B("cache.html"), b._h = c = a.innerHTML) : B("cache.match");
  return c;
};
I.setClass = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b ? (B("cache.miss"), B("cache.class"), c._c = b, a.className = b) : B("cache.match");
};
I.getClass = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c ? (B("cache.miss"), B("cache.class"), b._c = c = a.className) : B("cache.match");
  return c.split(Ia);
};
I.hasClass = function(a, b) {
  var c = Y(a), d = c[b];
  "number" !== typeof d ? (B("cache.miss"), B("cache.class"), c[b] = d = a.classList.contains(b) ? 1 : 0) : B("cache.match");
  return !!d;
};
I.toggleClass = function(a, b, c) {
  var d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var f = 0; f < b.length; f++) {
        Oa(a, b[f], c, d);
      }
    } else {
      for (f in b) {
        Oa(a, f, b[f], d);
      }
    }
  } else {
    Oa(a, b, c, d);
  }
};
I.removeClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      Na(a, b[d], c);
    }
  } else {
    Na(a, b, c);
  }
};
I.addClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      Ma(a, b[d], c);
    }
  } else {
    Ma(a, b, c);
  }
};
I.setAttribute = function(a, b, c) {
  var d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (var f in b) {
      Ja(a, f, b[f], d);
    }
  } else {
    Ja(a, b, c, d);
  }
};
I.getAttribute = La;
I.hasAttribute = function(a, b) {
  a = La(a, b);
  return !(!a && "" !== a);
};
I.removeAttribute = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      Ka(a, b[d], c);
    }
  } else {
    Ka(a, b, c);
  }
};
I.setCss = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b ? (B("cache.miss"), B("cache.style"), c._s = b, a.style.cssText = b) : B("cache.match");
};
I.getCss = function(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c ? (B("cache.miss"), B("cache.css"), b._s = c = a.style.cssText) : B("cache.match");
  return c;
};
I.getStyle = function(a, b) {
  var c = Pa(a), d = c[b];
  "string" !== typeof d ? (B("cache.miss"), B("cache.style"), c[b] = d = a.style.getPropertyValue(b)) : B("cache.match");
  return d;
};
I.setStyle = function(a, b, c) {
  var d = Pa(a), f = a.style;
  if ("object" === typeof b) {
    for (var m in b) {
      Qa(a, m, b[m], f, d);
    }
  } else {
    Qa(a, b, c, f, d);
  }
};
I.escape = function(a) {
  W.i !== a && (Ba.nodeValue = a, W.h = W.innerHTML, W.i = a);
  return W.h;
};
I.sanitize = function(a) {
  X.h !== a && (X.innerHTML = a, X.h = a, X.i = X.textContent);
  return X.i;
};
I.prototype.route = I.route = function(a, b, c) {
  B("route.set");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  E[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  E[a] = b;
  c && (F[a] = c);
  return this;
};
I.prototype.dispatch = I.dispatch = function(a, b, c) {
  B("route.dispatch");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!E[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  E[a](b || this, c || window.event);
  return this;
};
I.prototype.listen = I.listen = ka;
I.prototype.unlisten = I.unlisten = function(a) {
  C[a] && (B("event.unlisten"), J(0, a, ja, D[a]), C[a] = 0, D[a] = null);
  return this;
};
I.Array = R;
var Z = window, Ra;
(Ra = Z.define) && Ra.amd ? Ra([], function() {
  return I;
}) : "object" === typeof Z.exports ? Z.exports = I : Z.Mikado = I;
}).call(this);
