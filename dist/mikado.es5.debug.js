/**!
 * Mikado.js v0.8.213 (ES5/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var n;
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
var w = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
function y(a, b) {
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
      b != d && null != b && w(c, a, {configurable:!0, writable:!0, value:b});
    }
  }
}
y("Symbol", function(a) {
  function b(l) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (l || "") + "_" + f++, l);
  }
  function c(l, g) {
    this.h = l;
    w(this, "description", {configurable:!0, writable:!0, value:g});
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
y("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = p[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && w(d.prototype, a, {configurable:!0, writable:!0, value:function() {
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
y("WeakMap", function(a) {
  function b(h) {
    this.h = (e += Math.random() + 1).toString();
    if (h) {
      h = z(h);
      for (var k; !(k = h.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  function c() {
  }
  function d(h) {
    var k = typeof h;
    return "object" === k && null !== h || "function" === k;
  }
  function f(h) {
    if (!A(h, g)) {
      var k = new c();
      w(h, g, {value:k});
    }
  }
  function l(h) {
    var k = Object[h];
    k && (Object[h] = function(m) {
      if (m instanceof c) {
        return m;
      }
      Object.isExtensible(m) && f(m);
      return k(m);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var h = Object.seal({}), k = Object.seal({}), m = new a([[h, 2], [k, 3]]);
      if (2 != m.get(h) || 3 != m.get(k)) {
        return !1;
      }
      m.delete(h);
      m.set(k, 4);
      return !m.has(h) && 4 == m.get(k);
    } catch (q) {
      return !1;
    }
  }()) {
    return a;
  }
  var g = "$jscomp_hidden_" + Math.random();
  l("freeze");
  l("preventExtensions");
  l("seal");
  var e = 0;
  b.prototype.set = function(h, k) {
    if (!d(h)) {
      throw Error("Invalid WeakMap key");
    }
    f(h);
    if (!A(h, g)) {
      throw Error("WeakMap key fail: " + h);
    }
    h[g][this.h] = k;
    return this;
  };
  b.prototype.get = function(h) {
    return d(h) && A(h, g) ? h[g][this.h] : void 0;
  };
  b.prototype.has = function(h) {
    return d(h) && A(h, g) && A(h[g], this.h);
  };
  b.prototype.delete = function(h) {
    return d(h) && A(h, g) && A(h[g], this.h) ? delete h[g][this.h] : !1;
  };
  return b;
});
y("Map", function(a) {
  function b() {
    var e = {};
    return e.o = e.next = e.head = e;
  }
  function c(e, h) {
    var k = e[1];
    return ca(function() {
      if (k) {
        for (; k.head != e[1];) {
          k = k.o;
        }
        for (; k.next != k.head;) {
          return k = k.next, {done:!1, value:h(k)};
        }
        k = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(e, h) {
    var k = h && typeof h;
    "object" == k || "function" == k ? l.has(h) ? k = l.get(h) : (k = "" + ++g, l.set(h, k)) : k = "p_" + h;
    var m = e[0][k];
    if (m && A(e[0], k)) {
      for (e = 0; e < m.length; e++) {
        var q = m[e];
        if (h !== h && q.key !== q.key || h === q.key) {
          return {id:k, list:m, index:e, j:q};
        }
      }
    }
    return {id:k, list:m, index:-1, j:void 0};
  }
  function f(e) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (e) {
      e = z(e);
      for (var h; !(h = e.next()).done;) {
        h = h.value, this.set(h[0], h[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({x:4}), h = new a(z([[e, "s"]]));
      if ("s" != h.get(e) || 1 != h.size || h.get({x:4}) || h.set({x:4}, "t") != h || 2 != h.size) {
        return !1;
      }
      var k = h.entries(), m = k.next();
      if (m.done || m.value[0] != e || "s" != m.value[1]) {
        return !1;
      }
      m = k.next();
      return m.done || 4 != m.value[0].x || "t" != m.value[1] || !k.next().done ? !1 : !0;
    } catch (q) {
      return !1;
    }
  }()) {
    return a;
  }
  var l = new WeakMap();
  f.prototype.set = function(e, h) {
    e = 0 === e ? 0 : e;
    var k = d(this, e);
    k.list || (k.list = this[0][k.id] = []);
    k.j ? k.j.value = h : (k.j = {next:this[1], o:this[1].o, head:this[1], key:e, value:h}, k.list.push(k.j), this[1].o.next = k.j, this[1].o = k.j, this.size++);
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
  f.prototype.forEach = function(e, h) {
    for (var k = this.entries(), m; !(m = k.next()).done;) {
      m = m.value, e.call(h, m[1], m[0], this);
    }
  };
  f.prototype[Symbol.iterator] = f.prototype.entries;
  var g = 0;
  return f;
});
y("Promise", function(a) {
  function b(g) {
    this.i = 0;
    this.u = void 0;
    this.h = [];
    this.K = !1;
    var e = this.D();
    try {
      g(e.resolve, e.reject);
    } catch (h) {
      e.reject(h);
    }
  }
  function c() {
    this.h = null;
  }
  function d(g) {
    return g instanceof b ? g : new b(function(e) {
      e(g);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.i = function(g) {
    if (null == this.h) {
      this.h = [];
      var e = this;
      this.u(function() {
        e.F();
      });
    }
    this.h.push(g);
  };
  var f = p.setTimeout;
  c.prototype.u = function(g) {
    f(g, 0);
  };
  c.prototype.F = function() {
    for (; this.h && this.h.length;) {
      var g = this.h;
      this.h = [];
      for (var e = 0; e < g.length; ++e) {
        var h = g[e];
        g[e] = null;
        try {
          h();
        } catch (k) {
          this.D(k);
        }
      }
    }
    this.h = null;
  };
  c.prototype.D = function(g) {
    this.u(function() {
      throw g;
    });
  };
  b.prototype.D = function() {
    function g(k) {
      return function(m) {
        h || (h = !0, k.call(e, m));
      };
    }
    var e = this, h = !1;
    return {resolve:g(this.O), reject:g(this.F)};
  };
  b.prototype.O = function(g) {
    if (g === this) {
      this.F(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (g instanceof b) {
        this.R(g);
      } else {
        a: {
          switch(typeof g) {
            case "object":
              var e = null != g;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.N(g) : this.J(g);
      }
    }
  };
  b.prototype.N = function(g) {
    var e = void 0;
    try {
      e = g.then;
    } catch (h) {
      this.F(h);
      return;
    }
    "function" == typeof e ? this.S(e, g) : this.J(g);
  };
  b.prototype.F = function(g) {
    this.L(2, g);
  };
  b.prototype.J = function(g) {
    this.L(1, g);
  };
  b.prototype.L = function(g, e) {
    if (0 != this.i) {
      throw Error("Cannot settle(" + g + ", " + e + "): Promise already settled in state" + this.i);
    }
    this.i = g;
    this.u = e;
    2 === this.i && this.P();
    this.T();
  };
  b.prototype.P = function() {
    var g = this;
    f(function() {
      if (g.M()) {
        var e = p.console;
        "undefined" !== typeof e && e.error(g.u);
      }
    }, 1);
  };
  b.prototype.M = function() {
    if (this.K) {
      return !1;
    }
    var g = p.CustomEvent, e = p.Event, h = p.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof g ? g = new g("unhandledrejection", {cancelable:!0}) : "function" === typeof e ? g = new e("unhandledrejection", {cancelable:!0}) : (g = p.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
    g.promise = this;
    g.reason = this.u;
    return h(g);
  };
  b.prototype.T = function() {
    if (null != this.h) {
      for (var g = 0; g < this.h.length; ++g) {
        l.i(this.h[g]);
      }
      this.h = null;
    }
  };
  var l = new c();
  b.prototype.R = function(g) {
    var e = this.D();
    g.H(e.resolve, e.reject);
  };
  b.prototype.S = function(g, e) {
    var h = this.D();
    try {
      g.call(e, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  b.prototype.then = function(g, e) {
    function h(r, t) {
      return "function" == typeof r ? function(u) {
        try {
          k(r(u));
        } catch (v) {
          m(v);
        }
      } : t;
    }
    var k, m, q = new b(function(r, t) {
      k = r;
      m = t;
    });
    this.H(h(g, k), h(e, m));
    return q;
  };
  b.prototype.catch = function(g) {
    return this.then(void 0, g);
  };
  b.prototype.H = function(g, e) {
    function h() {
      switch(k.i) {
        case 1:
          g(k.u);
          break;
        case 2:
          e(k.u);
          break;
        default:
          throw Error("Unexpected state: " + k.i);
      }
    }
    var k = this;
    null == this.h ? l.i(h) : this.h.push(h);
    this.K = !0;
  };
  b.resolve = d;
  b.reject = function(g) {
    return new b(function(e, h) {
      h(g);
    });
  };
  b.race = function(g) {
    return new b(function(e, h) {
      for (var k = z(g), m = k.next(); !m.done; m = k.next()) {
        d(m.value).H(e, h);
      }
    });
  };
  b.all = function(g) {
    var e = z(g), h = e.next();
    return h.done ? d([]) : new b(function(k, m) {
      function q(u) {
        return function(v) {
          r[u] = v;
          t--;
          0 == t && k(r);
        };
      }
      var r = [], t = 0;
      do {
        r.push(void 0), t++, d(h.value).H(q(r.length - 1), m), h = e.next();
      } while (!h.done);
    });
  };
  return b;
});
function da(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, f = {next:function() {
    if (!d && c < a.length) {
      var l = c++;
      return {value:b(l, a[l]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  f[Symbol.iterator] = function() {
    return f;
  };
  return f;
}
y("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return da(this, function(b) {
      return b;
    });
  };
});
y("Object.is", function(a) {
  return a ? a : function(b, c) {
    return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c;
  };
});
y("Array.prototype.includes", function(a) {
  return a ? a : function(b, c) {
    var d = this;
    d instanceof String && (d = String(d));
    var f = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + f, 0)); c < f; c++) {
      var l = d[c];
      if (l === b || Object.is(l, b)) {
        return !0;
      }
    }
    return !1;
  };
});
y("String.prototype.includes", function(a) {
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
var B = {}, C = {}, D = Object.create(null), E = Object.create(null), fa = document.documentElement || document.body.parentNode, F = "ontouchstart" in window, H = !F && window.PointerEvent && navigator.maxTouchPoints, ha;
function ia(a, b) {
  b || (b = a.type);
  var c = a.target, d = I.eventCache, f = I.eventBubble, l;
  d && (l = c["_mke" + b]);
  if ("undefined" === typeof l) {
    for (var g = c; g && g !== fa;) {
      var e = void 0;
      "click" === b && ha && (e = g.getAttribute("tap"));
      e || (e = g.getAttribute(b));
      if (e) {
        var h = e.indexOf(":"), k = g;
        if (-1 < h) {
          var m = e.substring(0, h);
          h = e.substring(h + 1);
          for (e = ""; (k = k.parentElement) !== fa;) {
            if (k.hasAttribute(h)) {
              e = m;
              break;
            }
          }
          e || console.warn("Event root '" + h + "' was not found for the event: '" + m + "'.");
        }
        if (e && (l || (l = [], d && (c["_mke" + b] = l)), l.push([e, k]), e = E[e], !f || e && (e.stop || e.cancel))) {
          break;
        }
      }
      g = g.parentElement;
    }
    d && (l || (c["_mke" + b] = null));
  }
  if (l) {
    for (f = 0; f < l.length; f++) {
      if (k = l[f], g = k[0], e = D[g]) {
        k = k[1];
        if (m = E[g]) {
          m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (D[g] = null, d && (c["_mke" + b] = null));
        }
        e(k, a);
      } else {
        console.warn("The route '" + g + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ja(a, b) {
  B[a] || (J(1, a, ia, b), B[a] = 1, C[a] = b || null);
  return this;
}
var K, L, ka;
if (F || H) {
  var la = function(a) {
    var b = K, c = L, d = a, f = a.changedTouches;
    f && (d = f[0]);
    K = d.clientX;
    L = d.clientY;
    15 > Math.abs(K - b) && 15 > Math.abs(L - c) && ia(a, "tap");
  }, ma = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    K = b.clientX;
    L = b.clientY;
  }, na = {passive:!1, capture:!0};
  ka = function(a) {
    J(a, H ? "pointerdown" : "touchstart", ma, na);
    J(a, H ? "pointerup" : "touchend", la, na);
  };
}
function J(a, b, c, d) {
  if ("tap" === b) {
    if (F || H) {
      ka(a);
      return;
    }
    ha = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function M(a, b, c) {
  for (var d = b.length, f = [], l = {}, g = 0, e, h, k, m = void 0, q = null; g < d; g++) {
    e = b[g];
    if (h = e.v) {
      if (k = e = l[h], !k) {
        e = void 0;
        k = a;
        for (var r = 0, t = h.length, u = ""; r < t; r++) {
          var v = h[r];
          u += v;
          l[u] ? k = l[u] : (">" === v ? k = k.firstChild : "|" === v ? (e = k, k = k.firstChild) : "@" === v ? (e = k, k = k.style) : k = k.nextSibling, l[u] = k);
        }
        e = [k, e];
        k = e[0];
        e = e[1] || k;
      }
    } else {
      k = e = a;
    }
    c && m !== e && (m = e, e._mkc = q = {});
    f[g] = new N(q, k, "");
  }
  return a._mkp = f;
}
function O(a, b, c, d, f, l) {
  l || (a.s = 1);
  var g = f || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text)), e, h;
  if (h = b.class) {
    "object" === typeof h ? (c.push(new N(e = {_c:""}, g, d)), (h = h[0]) ? P(a, h, ["_c", c.length - 1]) : a.s = 0) : f || (g.className = h);
  }
  if (h = b.attr) {
    for (var k in h) {
      var m = h[k];
      "object" === typeof m ? (e || c.push(new N(e = {}, g, d)), e["_a" + k] = !1, (m = m[0]) ? P(a, m, ["_a", c.length - 1, k]) : a.s = 0) : f || g.setAttribute(k, m);
    }
  }
  if (h = b.event) {
    for (var q in h) {
      f || g.setAttribute(q, h[q]), ja(q);
    }
  }
  if (h = b.style) {
    "object" === typeof h ? (c.push(new N(e || (e = {}), g.style, d + "@")), e._s = "", (h = h[0]) ? P(a, h, ["_s", c.length - 1]) : a.s = 0) : f || (g.style.cssText = h);
  }
  if (h = b.text) {
    if ("object" === typeof h) {
      var r = g;
      h = h[0];
      b.tag ? (d += "|", r = !f && g.firstChild, r || (r = document.createTextNode(h), g.appendChild(r))) : e = {};
      (e || (e = {}))._t = h;
      c.push(new N(e, r, d));
      h ? P(a, h, ["_t", c.length - 1]) : a.s = 0;
    } else {
      f || (b.tag ? g.textContent = h : g.nodeValue = h);
    }
  } else if (h = b.child) {
    if (f && (f = f.firstChild, !f)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    h.constructor !== Array && (h = [h]);
    b = 0;
    for (r = h.length; b < r; b++) {
      if (k = h[b], d = b ? d + "+" : d + ">", k = O(a, k, c, d, f, 1), f) {
        if (b < r - 1 && (f = f.nextSibling, !f)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        g.appendChild(k);
      }
    }
  } else if (h = b.html) {
    "object" === typeof h ? (e || c.push(new N(e = {}, g, d)), e._h = "", (h = h[0]) ? P(a, h, ["_h", c.length - 1]) : a.s = 0) : f || (g.innerHTML = h);
  } else if (h = b.inc) {
    e || c.push(new N(null, g, d));
    if ("string" === typeof h) {
      r = Q[h];
      if (!r) {
        throw Error("The partial template '" + h + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(r instanceof I)) {
        d = r[0];
        if (b = r[1]) {
          b.async = !1, f && (b.root = f, b.hydrate = !0);
        }
        Q[h] = r = new I(d, b);
      }
    } else if (1 !== h) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      r = new I({name:a.name + "|" + d, tpl:h, key:h.key, cache:h.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:g, hydrate:!!f});
    }
    1 !== h && a.inc.push(r);
  }
  e && (g._mkc = e);
  l || (g._mkp = c);
  return g;
}
function P(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function N(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
n = N.prototype;
n._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
n._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
n._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
n._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
n._h = function(a) {
  if (this.c) {
    if (this.c._h === a) {
      return;
    }
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
var pa = window.Proxy || function() {
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
    var f = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(l) {
      oa(f, d = l, c);
    }});
  };
  return a;
}();
function qa(a, b) {
  return "_mkx" === b ? this : a[b];
}
function ra(a, b, c) {
  oa(this, c, b);
  a[b] = c;
  return !0;
}
function oa(a, b, c) {
  if (c = a.fn[c]) {
    for (var d = 0; d < c.length; d++) {
      var f = c[d], l = f[0], g = a.path[f[1]];
      if (!g.c || g.c[l + (f[2] || "")] !== b) {
        g[l](f[2] || b, b);
      }
    }
  }
}
;var Q = Object.create(null);
function I(a, b) {
  b = void 0 === b ? {} : b;
  if (!(this instanceof I)) {
    return new I(a, b);
  }
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
n = I.prototype;
n.mount = function(a, b) {
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
    c.clear();
    a._mkd = this.g = [];
    this.length = 0;
    a.firstChild && (a.textContent = "");
    var f = this.on && this.on.unmount;
    f && f(a, c);
  } else {
    if (b) {
      f = a.children;
      for (var l = f.length, g = Array(l), e = 0; e < l; e++) {
        g[e] = f[e];
      }
      this.g = g;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
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
          f = this.g[c], l = f.getAttribute("key"), f._mkk = l, d[l] = f;
        }
      }
      a._mkl = this.A = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.l || (b && this.length && (this.l = this.g[0].cloneNode(!0), O(this, this.tpl.tpl, [], "", this.l) && sa(this)), this.tpl && (this.l = O(this, this.tpl.tpl, [], ""), sa(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function sa(a) {
  a.tpl.I && (a.tpl.fn = a.tpl.I, a.tpl.I = null);
  a.tpl = null;
}
function ta(a, b, c, d, f) {
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
        ta(a, b, c, d);
        "function" === typeof f && f();
        e();
      });
    });
  }
  if (c || b.fn) {
    var l = new I(b);
    if (c && Array.isArray(c)) {
      for (var g = 0; g < c.length; g++) {
        a.append(l.create(c[g], d, g));
      }
    } else {
      a.append(l.create(c, d));
    }
    l.destroy();
  } else {
    l = O({}, b.tpl, [], "", null, 1), a.append(l);
  }
  return I;
}
n.render = function(a, b, c, d) {
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
      var l = this;
      f || (f = "function" === typeof c);
      l.B = requestAnimationFrame(function() {
        l.B = 0;
        l.render(a, b, null, 1);
        c();
      });
      return f ? this : new Promise(function(q) {
        c = q;
      });
    }
  }
  var g = this.length;
  if (!a) {
    return this.apply ? console.warn("When calling .render() by passing no data nothing will happen!") : this.g[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof R) {
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
  var e = this.key;
  !g || e || this.recycle || (this.remove(0, g), g = 0);
  var h = g < d ? g : d;
  f = 0;
  if (f < h) {
    for (var k = void 0, m = void 0; f < h; f++) {
      k = this.g[f];
      m = a[f];
      if (e && k._mkk !== m[e]) {
        return ua(this, a, b, f);
      }
      this.update(k, m, b, f, 1);
      this.proxy && !m._mkx && (a[f] = S(this, k, m));
    }
  }
  if (f < d) {
    for (; f < d; f++) {
      g = a[f], this.add(g, b), !this.proxy || this.recycle && g._mkx || (a[f] = S(this, this.g[f], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
n.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var f;
  if (this.key) {
    var l = b[this.key];
    if (f = this.A[l]) {
      if (f !== a) {
        var g = this.index(f);
        this.g[d] = f;
        this.g[g] = a;
        l = g < d ? f : a;
        g = g < d ? a : f;
        var e = l.nextElementSibling;
        this.root.insertBefore(l, g);
        e !== g && this.root.insertBefore(g, e);
      }
    } else {
      this.pool && (f = this.m.get(l)) && (this.m.delete(l), va(this, a), this.g[d] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? this.s && b._mkx || !this.apply || this.apply(b, c || this.state, d, f._mkp || M(f, this.l._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && va(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
n.update = function(a, b, c, d) {
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
n.cancel = function() {
  cancelAnimationFrame(this.B);
  this.B = 0;
  return this;
};
n.create = function(a, b, c, d) {
  var f = this.key, l = f && a[f], g, e, h;
  if (f && this.pool && (e = this.m) && (g = e.get(l))) {
    var k = 1;
    e.delete(l);
  } else {
    (!f || this.recycle) && this.pool && (e = this.G) && e.length ? g = e.pop() : (g = h = this.l, h || (this.l = g = h = O(this, this.tpl.tpl, [], ""), sa(this)));
  }
  this.apply && this.apply(a, b || this.state, c, g._mkp || M(g, this.l._mkp, !!h || this.cache));
  h && (g = g.cloneNode(!0));
  f && (k || (g._mkk = l), d && (this.A[l] = g));
  (a = this.on && this.on[h ? "create" : "recycle"]) && a(g, this);
  return g;
};
n.add = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = c < this.length;
  } else {
    "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  }
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), wa(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function S(a, b, c) {
  b = b._mkp || M(b, a.l._mkp, a.cache);
  a = a.proxy;
  var d = c._mkx;
  d ? d.path = b : c = new pa(c, {path:b, fn:a, get:qa, set:ra});
  return c;
}
function ua(a, b, c, d) {
  var f = a.g, l = a.A, g = a.key, e = b.length, h = f.length, k = h > e ? h : e, m = 0;
  for (d || (d = 0); d < k; d++) {
    var q = void 0;
    if (d < e) {
      var r = b[d], t = d >= h, u = void 0, v = void 0, ea = void 0;
      a.proxy && !r._mkx && (b[d] = S(a, f[d], r));
      if (!t && (u = f[d], v = r[g], ea = u._mkk, ea === v)) {
        a.update(u, r, c, d, 1);
        continue;
      }
      if (t || !l[v]) {
        t || !a.pool ? (h++, k = h > e ? h : e, a.add(r, c, d)) : a.replace(u, r, c, d);
        continue;
      }
      for (var G = t = void 0, x = d + 1; x < k; x++) {
        if (!t && x < h && f[x]._mkk === v && (t = x + 1), !G && x < e && b[x][g] === ea && (G = x + 1), t && G) {
          t >= G ? (q = f[t - 1], a.root.insertBefore(q, u), a.update(q, r, c, d, 1), t === G ? (1 < x - d && a.root.insertBefore(u, f[t]), f[d] = f[x], (f[x] = u) || console.error("Error")) : (wa(f, t - 1, d), m++)) : (r = G - 1 + m, a.root.insertBefore(u, f[r] || null), wa(f, d, (r > h ? h : r) - 1), m--, d--);
          q = 1;
          break;
        }
      }
    }
    q || (a.remove(d), h--, k = h > e ? h : e, d--);
  }
  return a;
}
function wa(a, b, c, d) {
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
n.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = 1;
  } else {
    "number" === typeof c && (0 > c && (c += this.length), d = 1);
  }
  for (var f = a.length, l = 0; l < f; l++) {
    this.add(a[l], b, d ? c++ : null);
  }
  return this;
};
n.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
n.remove = function(a, b) {
  var c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  for (var d = this.pool && !this.key, f = this.key || this.pool, l = this.on && this.on.remove, g = 0, e; g < b; g++) {
    e = a[d ? b - g - 1 : g], c && e.remove(), f && va(this, e), l && l(e, this);
  }
  this.length = c;
  return this;
};
n.index = function(a) {
  return this.g.indexOf(a);
};
n.node = function(a) {
  return this.g[a];
};
function va(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.A[c] = null;
  }
  if (a.pool) {
    if (c) {
      a.m.set(c, b), !0 !== a.pool && a.m.size > a.pool && a.m.delete(a.m.keys().next().value);
    } else {
      if (c = a.G.length, !0 === a.pool || c < a.pool) {
        a.G[c] = b;
      }
    }
  }
}
n.flush = function() {
  this.G = [];
  this.m = new Map();
  return this;
};
n.destroy = function() {
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], Q[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.A = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.m = this.G = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.l = null;
};
var T = Array.prototype, xa = window.Proxy, U = !1;
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
  this.h = null;
  var b = a ? a.length : 0;
  if (xa) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, ya);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    za(this, a);
  }
  za(this, "length");
}
R.prototype.mount = function(a) {
  this.h = a;
  return this;
};
function za(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.i[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && za(this, b + 1), ya.set(this, b, c));
  }});
}
var ya = {set:function(a, b, c) {
  var d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  var f = a.h;
  if (!U) {
    U = !0;
    if (f) {
      var l = a.length;
      if (d) {
        V(f);
        var g = f.length;
        l !== g && (a.length = g);
        b >= g ? (f.add(c), a.length++) : b < g && (l = f.g[b], f.recycle || f.key && l._mkk === c[f.key] ? f.update(l, c, null, b) : f.replace(l, c, null, b));
      } else {
        "length" === b && c < l && f.remove(c, l - c);
      }
    }
    U = !1;
  }
  !d || !f.proxy || f.recycle && c._mkx || (c = S(f, f.g[b], c));
  (xa ? a : a.i)[b] = c;
  return !0;
}};
n = R.prototype;
n.swap = function(a, b) {
  var c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
n.set = function(a) {
  this.splice();
  return this.concat(a);
};
n.splice = function(a, b, c) {
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
n.push = function(a) {
  V(this.h);
  U = !0;
  this.h.add(a);
  this[this.length] = a;
  xa && this.length++;
  U = !1;
};
n.unshift = function(a) {
  V(this.h);
  U = !0;
  this.h.add(a, 0);
  this.i.unshift(a);
  U = !1;
};
n.pop = function() {
  V(this.h);
  U = !0;
  this.h.remove(this.length - 1);
  var a = this.i.pop();
  U = !1;
  return a;
};
n.shift = function() {
  V(this.h);
  U = !0;
  this.h.remove(0);
  var a = this.i.shift();
  U = !1;
  return a;
};
n.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
n.sort = T.sort;
n.reverse = T.reverse;
n.slice = T.slice;
n.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
n.filter = function(a, b) {
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
n.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
n.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
n.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
var W = document.createElement("div"), Aa = document.createTextNode(""), X = document.createElement("div");
W.appendChild(Aa);
n = I.prototype;
n.move = I.prototype.moveTo = function(a, b) {
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
n.shift = function(a, b) {
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
    var f = this.g[b], l = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? f : this.g[b + 1] || null);
    if (l) {
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
n.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
n.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
n.first = function(a) {
  return this.shift(a, -this.length);
};
n.last = function(a) {
  return this.shift(a, this.length);
};
n.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
n.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
n.swap = function(a, b) {
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
var Ba = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, Ca = 0, Da = 0;
function Ea(a, b, c, d, f, l) {
  Ca || (Ca = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(u) {
      var v = Ea(a);
      "function" === typeof b && b(v);
      u(v);
    });
  }
  f || (d = [], c = [d], d.index = f = {current:-1, count:0, last:-1, inc:0, C:!1});
  var g = l ? {} : {tpl:{}}, e = l ? g : g.tpl;
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
          return k.trim() && (e.text = k, e.tag = h), e;
        }
      }
      k && k.trim() && (/{{[!?]?#/.test(k) ? Fa(e, "html", k, !1, null, f, d) : (f.count++, Fa(e, "text", k, !1, null, f, d)));
    }
    if (!h) {
      return k && k.trim() ? e : null;
    }
  }
  h && (e.tag = h);
  if ((k = a.attributes) && k.length) {
    h = {};
    for (m = 0; m < k.length; m++) {
      var q = k[m].nodeName, r = a.getAttribute(q);
      "include" === q && (q = "inc");
      h[q] = r;
    }
    k = h;
    for (var t in k) {
      h = k[t];
      q = m = void 0;
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
          Ba[t] ? q = e.event || (e.event = {}) : (l || "id" !== t && "name" !== t || g.name || /{{[\s\S]+}}/.test(h) || (g.name = h), q = e.attr || (e.attr = {})), m = t;
      }
      m && Fa(q || e, m, h, !!q, k, f, d);
    }
  }
  t = (a.content || a).childNodes;
  k = t.length;
  f.C && (f.C = !1, f.inc++, d = [], (e.for || e.if) && c.unshift(d), e.child || (e.child = e.text ? {text:e.text} : e.html ? {html:e.html} : null), k ? (d.root = e, d.inc = e.child || (e.child = []), d.index = f = {current:-1, count:0, last:-1, inc:0, C:!1}) : d.inc = e.inc, delete e.for, delete e.if, delete e.text, delete e.html);
  if (k) {
    h = 0;
    for (m = void 0; h < k; h++) {
      if (m = t[h], 8 !== m.nodeType && (f.count++, q = Ea(m, null, c, d, f, 1))) {
        1 !== k || 3 !== m.nodeType && q.text || e.js && q.js ? (q.text || q.tag) && (e.child || (e.child = [])).push(q) : (q.js && (e.js = q.js), q.html && (e.html = q.html), q.text && (e.text = q.text));
      }
    }
    e.child && 1 === e.child.length && (e.child = e.child[0]);
  }
  if (!l) {
    if (g.name || (g.name = "tpl-" + Da++), 1 === c.length && 0 === c[0].length) {
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
function Fa(a, b, c, d, f, l, g) {
  if (/{{[\s\S]+}}/.test(c)) {
    var e = /{{([!?#]+)?=/.test(c), h = /{{!?\?/.test(c), k = /{{\??!/.test(c);
    c = c.replace(/\x3c!--(.*?)--\x3e/g, "");
    if (e) {
      if (h || k) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      e = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/['"]\)\+''\+\(['"]/g, "").replace(/['"](\s+)?\+(\s+)?['"]/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    h && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" === b && a.tag && l.count++;
    "style" === b && a.tag && l.count++;
    l.count !== l.last && (l.current++, l.last = l.count, g.push("_o=_p[" + l.current + "]"));
    g.push("_v=" + c);
    d ? g.push('if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? g.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? g.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? g.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && g.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = e ? [e] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || l.C || (l.count !== l.last && (l.current++, l.last = l.count, g.push("_o=_p[" + l.current + "]")), a = f.foreach ? f.foreach.trim() : "data", b = l.inc, f.if ? g.push("this.inc[" + b + "].mount(_o.n)[" + f.if.trim() + '?"render":"clear"](' + a + ",state)") : f.foreach ? g.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : g.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), l.C = !0);
}
;var Ga = /[^;:]+/g, Ha = /[ ]+/g;
function Ia(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function Ja(a, b) {
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
    for (a = c.split(Ha), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function Ka(a, b, c, d) {
  var f = !!d[b];
  c = "undefined" === typeof c ? !f : !!c;
  f !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function La(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(Ga), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
;I.once = ta;
I.register = function(a, b) {
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
  "object" === typeof a && (a = a.name);
  var b = Q[a];
  b && (b instanceof I && b.destroy(), Q[a] = null);
  return I;
};
I.compile = Ea;
I.setText = function(a, b) {
  var c = a._mkc, d, f;
  c ? f = c._t : a._mkc = c = {};
  f !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
};
I.getText = function(a) {
  var b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d && (3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent);
  return d;
};
I.setHtml = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
I.getHtml = function(a) {
  var b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
I.setClass = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
I.getClass = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c.split(Ha);
};
I.hasClass = function(a, b) {
  var c = Y(a), d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
I.toggleClass = function(a, b, c) {
  var d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var f = 0; f < b.length; f++) {
        Ka(a, b[f], c, d);
      }
    } else {
      for (f in b) {
        Ka(a, f, b[f], d);
      }
    }
  } else {
    Ka(a, b, c, d);
  }
};
I.removeClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var f = a, l = b[d];
      0 !== c[l] && (c[l] = 0, f.classList.remove(l));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
I.addClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var f = a, l = b[d];
      c[l] || (c[l] = 1, f.classList.add(l));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
I.setAttribute = function(a, b, c) {
  var d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (var f in b) {
      Ia(a, f, b[f], d);
    }
  } else {
    Ia(a, b, c, d);
  }
};
I.getAttribute = Ja;
I.hasAttribute = function(a, b) {
  a = Ja(a, b);
  return !(!a && "" !== a);
};
I.removeAttribute = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var f = a, l = b[d];
      !1 !== c["_a" + l] && (c["_a" + l] = !1, f.removeAttribute(l));
    }
  } else {
    !1 !== c["_a" + b] && (c["_a" + b] = !1, a.removeAttribute(b));
  }
};
I.setCss = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
I.getCss = function(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
I.getStyle = function(a, b) {
  var c = La(a), d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
I.setStyle = function(a, b, c) {
  var d = La(a), f = a.style;
  if ("object" === typeof b) {
    for (var l in b) {
      c = a;
      var g = l, e = b[l];
      d[g] !== e && (d[g] = e, (f || c.style).setProperty(g, e));
    }
  } else {
    d[b] !== c && (d[b] = c, (f || a.style).setProperty(b, c));
  }
};
I.escape = function(a) {
  W.i !== a && (Aa.nodeValue = a, W.h = W.innerHTML, W.i = a);
  return W.h;
};
I.sanitize = function(a) {
  X.h !== a && (X.innerHTML = a, X.h = a, X.i = X.textContent);
  return X.i;
};
I.prototype.route = I.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  D[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  D[a] = b;
  c && (E[a] = c);
  return this;
};
I.prototype.dispatch = I.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!D[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  D[a](b || this, c || window.event);
  return this;
};
I.prototype.listen = I.listen = ja;
I.prototype.unlisten = I.unlisten = function(a) {
  B[a] && (J(0, a, ia, C[a]), B[a] = 0, C[a] = null);
  return this;
};
I.Array = R;
var Z = window, Ma;
(Ma = Z.define) && Ma.amd ? Ma([], function() {
  return I;
}) : "object" === typeof Z.exports ? Z.exports = I : Z.Mikado = I;
}).call(this);
