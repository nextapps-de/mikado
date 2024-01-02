/**!
 * Mikado.js v0.8.139 (ES5/Debug)
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
        var h = a[d];
        if (!(h in c)) {
          break a;
        }
        c = c[h];
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
    return new c(d + (l || "") + "_" + h++, l);
  }
  function c(l, g) {
    this.g = l;
    w(this, "description", {configurable:!0, writable:!0, value:g});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.g;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", h = 0;
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
      return da(ba(this));
    }});
  }
  return a;
});
function da(a) {
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
  function b(f) {
    this.g = (e += Math.random() + 1).toString();
    if (f) {
      f = z(f);
      for (var k; !(k = f.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  function c() {
  }
  function d(f) {
    var k = typeof f;
    return "object" === k && null !== f || "function" === k;
  }
  function h(f) {
    if (!A(f, g)) {
      var k = new c();
      w(f, g, {value:k});
    }
  }
  function l(f) {
    var k = Object[f];
    k && (Object[f] = function(m) {
      if (m instanceof c) {
        return m;
      }
      Object.isExtensible(m) && h(m);
      return k(m);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({}), k = Object.seal({}), m = new a([[f, 2], [k, 3]]);
      if (2 != m.get(f) || 3 != m.get(k)) {
        return !1;
      }
      m.delete(f);
      m.set(k, 4);
      return !m.has(f) && 4 == m.get(k);
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
  b.prototype.set = function(f, k) {
    if (!d(f)) {
      throw Error("Invalid WeakMap key");
    }
    h(f);
    if (!A(f, g)) {
      throw Error("WeakMap key fail: " + f);
    }
    f[g][this.g] = k;
    return this;
  };
  b.prototype.get = function(f) {
    return d(f) && A(f, g) ? f[g][this.g] : void 0;
  };
  b.prototype.has = function(f) {
    return d(f) && A(f, g) && A(f[g], this.g);
  };
  b.prototype.delete = function(f) {
    return d(f) && A(f, g) && A(f[g], this.g) ? delete f[g][this.g] : !1;
  };
  return b;
});
y("Map", function(a) {
  function b() {
    var e = {};
    return e.o = e.next = e.head = e;
  }
  function c(e, f) {
    var k = e[1];
    return da(function() {
      if (k) {
        for (; k.head != e[1];) {
          k = k.o;
        }
        for (; k.next != k.head;) {
          return k = k.next, {done:!1, value:f(k)};
        }
        k = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(e, f) {
    var k = f && typeof f;
    "object" == k || "function" == k ? l.has(f) ? k = l.get(f) : (k = "" + ++g, l.set(f, k)) : k = "p_" + f;
    var m = e[0][k];
    if (m && A(e[0], k)) {
      for (e = 0; e < m.length; e++) {
        var q = m[e];
        if (f !== f && q.key !== q.key || f === q.key) {
          return {id:k, list:m, index:e, j:q};
        }
      }
    }
    return {id:k, list:m, index:-1, j:void 0};
  }
  function h(e) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (e) {
      e = z(e);
      for (var f; !(f = e.next()).done;) {
        f = f.value, this.set(f[0], f[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({x:4}), f = new a(z([[e, "s"]]));
      if ("s" != f.get(e) || 1 != f.size || f.get({x:4}) || f.set({x:4}, "t") != f || 2 != f.size) {
        return !1;
      }
      var k = f.entries(), m = k.next();
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
  h.prototype.set = function(e, f) {
    e = 0 === e ? 0 : e;
    var k = d(this, e);
    k.list || (k.list = this[0][k.id] = []);
    k.j ? k.j.value = f : (k.j = {next:this[1], o:this[1].o, head:this[1], key:e, value:f}, k.list.push(k.j), this[1].o.next = k.j, this[1].o = k.j, this.size++);
    return this;
  };
  h.prototype.delete = function(e) {
    e = d(this, e);
    return e.j && e.list ? (e.list.splice(e.index, 1), e.list.length || delete this[0][e.id], e.j.o.next = e.j.next, e.j.next.o = e.j.o, e.j.head = null, this.size--, !0) : !1;
  };
  h.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].o = b();
    this.size = 0;
  };
  h.prototype.has = function(e) {
    return !!d(this, e).j;
  };
  h.prototype.get = function(e) {
    return (e = d(this, e).j) && e.value;
  };
  h.prototype.entries = function() {
    return c(this, function(e) {
      return [e.key, e.value];
    });
  };
  h.prototype.keys = function() {
    return c(this, function(e) {
      return e.key;
    });
  };
  h.prototype.values = function() {
    return c(this, function(e) {
      return e.value;
    });
  };
  h.prototype.forEach = function(e, f) {
    for (var k = this.entries(), m; !(m = k.next()).done;) {
      m = m.value, e.call(f, m[1], m[0], this);
    }
  };
  h.prototype[Symbol.iterator] = h.prototype.entries;
  var g = 0;
  return h;
});
y("Promise", function(a) {
  function b(g) {
    this.i = 0;
    this.s = void 0;
    this.g = [];
    this.K = !1;
    var e = this.C();
    try {
      g(e.resolve, e.reject);
    } catch (f) {
      e.reject(f);
    }
  }
  function c() {
    this.g = null;
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
    if (null == this.g) {
      this.g = [];
      var e = this;
      this.s(function() {
        e.D();
      });
    }
    this.g.push(g);
  };
  var h = p.setTimeout;
  c.prototype.s = function(g) {
    h(g, 0);
  };
  c.prototype.D = function() {
    for (; this.g && this.g.length;) {
      var g = this.g;
      this.g = [];
      for (var e = 0; e < g.length; ++e) {
        var f = g[e];
        g[e] = null;
        try {
          f();
        } catch (k) {
          this.C(k);
        }
      }
    }
    this.g = null;
  };
  c.prototype.C = function(g) {
    this.s(function() {
      throw g;
    });
  };
  b.prototype.C = function() {
    function g(k) {
      return function(m) {
        f || (f = !0, k.call(e, m));
      };
    }
    var e = this, f = !1;
    return {resolve:g(this.O), reject:g(this.D)};
  };
  b.prototype.O = function(g) {
    if (g === this) {
      this.D(new TypeError("A Promise cannot resolve to itself"));
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
    } catch (f) {
      this.D(f);
      return;
    }
    "function" == typeof e ? this.S(e, g) : this.J(g);
  };
  b.prototype.D = function(g) {
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
    this.s = e;
    2 === this.i && this.P();
    this.T();
  };
  b.prototype.P = function() {
    var g = this;
    h(function() {
      if (g.M()) {
        var e = p.console;
        "undefined" !== typeof e && e.error(g.s);
      }
    }, 1);
  };
  b.prototype.M = function() {
    if (this.K) {
      return !1;
    }
    var g = p.CustomEvent, e = p.Event, f = p.dispatchEvent;
    if ("undefined" === typeof f) {
      return !0;
    }
    "function" === typeof g ? g = new g("unhandledrejection", {cancelable:!0}) : "function" === typeof e ? g = new e("unhandledrejection", {cancelable:!0}) : (g = p.document.createEvent("CustomEvent"), g.initCustomEvent("unhandledrejection", !1, !0, g));
    g.promise = this;
    g.reason = this.s;
    return f(g);
  };
  b.prototype.T = function() {
    if (null != this.g) {
      for (var g = 0; g < this.g.length; ++g) {
        l.i(this.g[g]);
      }
      this.g = null;
    }
  };
  var l = new c();
  b.prototype.R = function(g) {
    var e = this.C();
    g.G(e.resolve, e.reject);
  };
  b.prototype.S = function(g, e) {
    var f = this.C();
    try {
      g.call(e, f.resolve, f.reject);
    } catch (k) {
      f.reject(k);
    }
  };
  b.prototype.then = function(g, e) {
    function f(r, t) {
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
    this.G(f(g, k), f(e, m));
    return q;
  };
  b.prototype.catch = function(g) {
    return this.then(void 0, g);
  };
  b.prototype.G = function(g, e) {
    function f() {
      switch(k.i) {
        case 1:
          g(k.s);
          break;
        case 2:
          e(k.s);
          break;
        default:
          throw Error("Unexpected state: " + k.i);
      }
    }
    var k = this;
    null == this.g ? l.i(f) : this.g.push(f);
    this.K = !0;
  };
  b.resolve = d;
  b.reject = function(g) {
    return new b(function(e, f) {
      f(g);
    });
  };
  b.race = function(g) {
    return new b(function(e, f) {
      for (var k = z(g), m = k.next(); !m.done; m = k.next()) {
        d(m.value).G(e, f);
      }
    });
  };
  b.all = function(g) {
    var e = z(g), f = e.next();
    return f.done ? d([]) : new b(function(k, m) {
      function q(u) {
        return function(v) {
          r[u] = v;
          t--;
          0 == t && k(r);
        };
      }
      var r = [], t = 0;
      do {
        r.push(void 0), t++, d(f.value).G(q(r.length - 1), m), f = e.next();
      } while (!f.done);
    });
  };
  return b;
});
function ea(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, h = {next:function() {
    if (!d && c < a.length) {
      var l = c++;
      return {value:b(l, a[l]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  h[Symbol.iterator] = function() {
    return h;
  };
  return h;
}
y("Array.prototype.keys", function(a) {
  return a ? a : function() {
    return ea(this, function(b) {
      return b;
    });
  };
});
var B = {}, C = Object.create(null), D = Object.create(null), fa = document.documentElement || document.body.parentNode, E = "ontouchstart" in window, F = !E && window.PointerEvent && navigator.maxTouchPoints, ha;
function G(a, b) {
  b || (b = a.type);
  var c = a.target, d = I.eventCache, h = I.eventBubble, l;
  d && (l = c["_mke" + b]);
  if ("undefined" === typeof l) {
    for (var g = c; g && g !== fa;) {
      var e = void 0;
      "click" === b && ha && (e = g.getAttribute("tap"));
      e || (e = g.getAttribute(b));
      if (e) {
        var f = e.indexOf(":");
        if (-1 < f) {
          var k = e.substring(0, f);
          f = e.substring(f + 1);
          for (e = ""; (g = g.parentElement) !== fa;) {
            if (g.hasAttribute(f)) {
              e = k;
              break;
            }
          }
          e || console.warn("Event root '" + f + "' was not found for the event: '" + k + "'.");
        }
        if (e && (l || (l = [], d && (c["_mke" + b] = l)), l.push([e, g]), e = D[e], !h || e && (e.stop || e.cancel))) {
          break;
        }
      }
      g = g.parentElement;
    }
    d && (l || (c["_mke" + b] = null));
  }
  if (l) {
    for (h = 0; h < l.length; h++) {
      if (k = l[h], g = k[0], e = C[g]) {
        k = k[1];
        if (f = D[g]) {
          f.prevent && a.preventDefault(), f.stop && a.stopImmediatePropagation(), f.once && (C[g] = null, d && (c["_mke" + b] = null));
        }
        e(k, a);
      } else {
        console.warn("The route '" + g + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ia(a, b) {
  B[a] || (J(1, a, G, b), B[a] = 1);
  return this;
}
var K, L, ja;
if (E || F) {
  var ka = function(a) {
    var b = K, c = L, d = a, h = a.changedTouches;
    h && (d = h[0]);
    K = d.clientX;
    L = d.clientY;
    15 > Math.abs(K - b) && 15 > Math.abs(L - c) && G.call(this, a, "tap");
  }, la = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    K = b.clientX;
    L = b.clientY;
  }, ma = {passive:!1, capture:!0};
  ja = function(a) {
    J(a, F ? "pointerdown" : "touchstart", la, ma);
    J(a, F ? "pointerup" : "touchend", ka, ma);
  };
}
function J(a, b, c, d) {
  if ("tap" === b) {
    if (E || F) {
      ja(a);
      return;
    }
    ha = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function M(a, b, c) {
  for (var d = b.length, h = [], l = {}, g = 0, e, f, k, m = void 0, q = null; g < d; g++) {
    e = b[g];
    if (f = e.v) {
      if (k = e = l[f], !k) {
        e = void 0;
        k = a;
        for (var r = 0, t = f.length, u = ""; r < t; r++) {
          var v = f[r];
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
    h[g] = new N(q, k, "");
  }
  return a._mkp = h;
}
function O(a, b, c, d, h, l) {
  var g = d || (a.tag ? a.U ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag) : document.createTextNode(a.text)), e, f;
  if (f = a.class) {
    "object" === typeof f ? (b.push(new N(e = {_c:""}, g, c)), (f = f[0]) && P.call(h, f, ["_c", b.length - 1])) : d || (g.className = f);
  }
  if (f = a.attr) {
    for (var k in f) {
      var m = f[k];
      "object" === typeof m ? (e || b.push(new N(e = {}, g, c)), e["_a" + k] = !1, (m = m[0]) && P.call(h, m, ["_a", b.length - 1, k])) : d || g.setAttribute(k, m);
    }
  }
  if (f = a.event) {
    for (var q in f) {
      d || (g.setAttribute(q, f[q]), ia(q));
    }
  }
  if (f = a.style) {
    "object" === typeof f ? (b.push(new N(e || (e = {}), g.style, c + "@")), e._s = "", (f = f[0]) && P.call(h, f, ["_s", b.length - 1])) : d || (g.style.cssText = f);
  }
  if (f = a.text) {
    "object" === typeof f ? (k = g, f = f[0], a.tag ? (c += "|", k = !d && g.firstChild, k || (k = document.createTextNode(f), g.appendChild(k))) : e = {}, (e || (e = {}))._t = f, b.push(new N(e, k, c)), f && P.call(h, f, ["_t", b.length - 1])) : d || (a.tag ? g.textContent = f : g.nodeValue = f);
  } else if (f = a.child) {
    if (d && (d = d.firstChild, !d)) {
      return console.warn("Hydration failed of template '" + h.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    f.constructor !== Array && (f = [f]);
    a = 0;
    for (k = f.length; a < k; a++) {
      if (m = f[a], c = a ? c + "+" : c + ">", m = O(m, b, c, d, h, 1), d) {
        if (a < k - 1 && (d = d.nextSibling, !d)) {
          return console.warn("Hydration failed of template '" + h.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        g.appendChild(m);
      }
    }
  } else if (f = a.html) {
    "object" === typeof f ? (e || b.push(new N(e = {}, g, c)), e._h = "", (f = f[0]) && P.call(h, f, ["_h", b.length - 1])) : d || (g.innerHTML = f);
  } else if (f = a.inc) {
    e || b.push(new N(null, g, c));
    if ("string" === typeof f) {
      a = Q[f];
      if (!a) {
        throw Error("The partial template '" + f + "' which is included by the root template '" + h.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(a instanceof I)) {
        c = a[0];
        if (a = a[1]) {
          a.async = !1, d && (a.root = d, a.hydrate = !0);
        }
        Q[f] = a = new I(c, a);
      }
    } else {
      c = h.inc.length;
      if (!h.tpl.I.length) {
        throw Error("The template '" + h.name + "|" + c + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      a = new I({name:h.name + "|" + c, tpl:f, key:f.key, cache:f.cache, fn:h.tpl.I}, {recycle:h.recycle, cache:h.cache, pool:h.pool, state:h.state, mount:g, hydrate:!!d});
    }
    h.inc.push(a);
  }
  e && (g._mkc = e);
  l || (g._mkp = b, h.B = h.B === b.length ? 1 : 0);
  return g;
}
function P(a, b) {
  this.B++;
  this.proxy || (this.proxy = {});
  (this.proxy[a] || (this.proxy[a] = [])).push(b);
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
var oa = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.H = c.H;
    for (var d in b) {
      this.define(b, d, b[d]);
    }
    b._mkx = !0;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    var h = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(l) {
      na.call(h, d = l, c);
    }});
  };
  return a;
}();
function pa(a, b) {
  return "_mkx" === b || a[b];
}
function qa(a, b, c) {
  na.call(this, c, b);
  a[b] = c;
  return !0;
}
function na(a, b) {
  if (b = this.H[b]) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c], h = d[0], l = this.path[d[1]];
      if (!l.c || l.c[h + (d[2] || "")] !== a) {
        l[h](d[2] || a, a);
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
  if (!a.tpl || !a.name) {
    throw Error("Initialization Error: Template isn't supported.");
  }
  this.h = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.key = a.key || "";
  this.u = {};
  this.apply = (c = a.fn) && c.pop();
  this.tpl = a.tpl;
  this.name = a.name;
  this.inc = [];
  a.tpl.I = c;
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.F = [];
  this.m = new Map();
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.A = 0;
  this.on = b.on || {};
  this.proxy = null;
  this.B = 0;
  (a = b.observe) && (new R(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.l = null;
}
n = I.prototype;
n.mount = function(a, b) {
  this.A && this.cancel();
  var c = a._mki, d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.h = a._mkd;
    this.length = this.h.length;
  } else if (c) {
    c.clear(), a._mkd = this.h = [], this.length = 0;
  } else {
    if (b) {
      for (var h = a.children, l = h.length, g = Array(l), e = 0; e < l; e++) {
        g[e] = h[e];
      }
      this.h = g;
      this.length = this.h.length;
    } else {
      this.h = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.h;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.u), c === this) {
      this.u = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (c = 0; c < this.length; c++) {
          h = this.h[c], l = h.getAttribute("key"), h._mkk = l, d[l] = h;
        }
      }
      a._mkl = this.u = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.l || (b && this.length && (this.l = this.h[0].cloneNode(), O(this.tpl, [], "", this.l, this) && (this.tpl = null)), this.tpl && (this.l = O(this.tpl, [], "", null, this), this.tpl = null));
  return this;
};
n.render = function(a, b, c, d) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  if (!d) {
    var h;
    if (b && (h = "function" === typeof b) || !0 === b) {
      c = b, b = null;
    }
    this.A && this.cancel();
    if (this.async || c) {
      var l = this;
      h || (h = "function" === typeof c);
      l.A = requestAnimationFrame(function() {
        l.A = 0;
        l.render(a, b, null, 1);
        h && c();
      });
      return h ? this : new Promise(function(r) {
        c = r;
      });
    }
  }
  var g = this.length;
  if (!a) {
    return this.apply || this.h[0] || this.add(), console.warn("When calling .render() by passing no data nothing will happen!"), this;
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
  var f = g < d ? g : d, k = 0;
  if (k < f) {
    for (var m = void 0, q = void 0; k < f; k++) {
      m = this.h[k];
      q = a[k];
      if (e && m._mkk !== q[e]) {
        return ra(this, a, b, k);
      }
      this.update(m, q, b, k, 1);
      this.proxy && !q._mkx && (a[k] = S.call(this, m, q));
    }
  }
  if (k < d) {
    for (; k < d; k++) {
      g = a[k], this.add(g, b, k), this.proxy && !g._mkx && (a[k] = S.call(this, this.h[k], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
n.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.h[d]) : d = this.index(a));
  var h;
  if (this.key) {
    var l = b[this.key];
    if (h = this.u[l]) {
      if (h !== a) {
        var g = this.index(h);
        this.h[d] = h;
        this.h[g] = a;
        l = g < d ? h : a;
        g = g < d ? a : h;
        var e = l.nextElementSibling;
        this.root.insertBefore(l, g);
        e !== g && this.root.insertBefore(g, e);
      }
    } else {
      this.pool && (h = this.m.get(l)) && (this.m.delete(l), sa(this, a), this.h[d] = h, a.replaceWith(h));
    }
  } else {
    this.recycle && (h = a);
  }
  h ? this.B && b._mkx || !this.apply || this.apply(b, c || this.state, d, h._mkp || M(h, this.l._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && sa(this, a), this.h[d] = b, a.replaceWith(b));
  (d = this.on.replace) && d(a);
  return this;
};
n.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.B && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.h[a]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || M(a, this.l._mkp, this.cache));
  (b = this.on.update) && b(a);
  return this;
};
n.cancel = function() {
  cancelAnimationFrame(this.A);
  this.A = 0;
  return this;
};
n.create = function(a, b, c, d) {
  var h = this.key, l = h && a[h], g, e, f;
  if (h && this.pool && (e = this.m) && (g = e.get(l))) {
    var k = 1;
    e.delete(l);
  } else {
    (!h || this.recycle) && this.pool && (e = this.F) && e.length ? g = e.pop() : (g = f = this.l, f || (this.l = g = f = O(this.tpl, [], "", null, this), this.tpl = null));
  }
  this.apply && this.apply(a, b || this.state, c, g._mkp || M(g, this.l._mkp, !!f || this.cache));
  f && (g = g.cloneNode(!0));
  h && (k || (g._mkk = l), d && (this.u[l] = g));
  (a = this.on[f ? "create" : "recycle"]) && a(g);
  return g;
};
n.add = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = c < this.length;
  } else {
    c || 0 === c ? d = c < this.length : c = this.length;
  }
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.h[c]), ta(this.h, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.h[this.length++] = a);
  (c = this.on.insert) && c(a);
  return this;
};
function S(a, b) {
  a = a._mkp || M(a, this.l._mkp, this.cache);
  return new oa(b, {path:a, H:this.proxy, get:pa, set:qa});
}
function ra(a, b, c, d) {
  var h = a.h, l = a.u, g = a.key, e = b.length, f = h.length, k = f > e ? f : e, m = 0;
  for (d || (d = 0); d < k; d++) {
    var q = void 0;
    if (d < e) {
      var r = b[d], t = d >= f, u = void 0, v = void 0, ca = void 0;
      if (!t && (u = h[d], v = r[g], ca = u._mkk, a.proxy && !r._mkx && (b[d] = S.call(a, u, r)), ca === v)) {
        a.update(u, r, c, d, 1);
        continue;
      }
      if (t || !l[v]) {
        t || !a.pool ? (f++, k = f > e ? f : e, a.add(r, c, d)) : a.replace(u, r, c, d);
        a.proxy && !r._mkx && (b[d] = S.call(a, h[d], r));
        continue;
      }
      for (var H = t = void 0, x = d + 1; x < k; x++) {
        if (!t && x < f && h[x]._mkk === v && (t = x + 1), !H && x < e && b[x][g] === ca && (H = x + 1), t && H) {
          t >= H ? (q = h[t - 1], a.root.insertBefore(q, u), a.update(q, r, c, d, 1), t === H ? (1 < x - d && a.root.insertBefore(u, h[t]), h[d] = h[x], (h[x] = u) || console.error("Error")) : (ta(h, t - 1, d), m++)) : (r = H - 1 + m, a.root.insertBefore(u, h[r] || null), ta(h, d, (r > f ? f : r) - 1), m--, d--);
          q = 1;
          break;
        }
      }
    }
    q || (a.remove(d), f--, k = f > e ? f : e, d--);
  }
  return a;
}
function ta(a, b, c, d) {
  var h = d || a[b];
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
  a[c] = h;
}
n.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = 1;
  } else if (c || 0 === c) {
    d = 1;
  }
  for (var h = a.length, l = 0; l < h; l++) {
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
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a - 1));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.h, b = a.length, this.root.textContent = "", this.root._mkd = this.h = [], c = 0) : (a = this.h.splice(a, b), c -= b);
  for (var d = this.pool && !this.key, h = this.key || this.pool, l = this.on.remove, g = 0, e; g < b; g++) {
    e = a[d ? b - g - 1 : g], c && e.remove(), h && sa(this, e), l && l(e);
  }
  this.length = c;
  return this;
};
n.index = function(a) {
  return this.h.indexOf(a);
};
n.node = function(a) {
  return this.h[a];
};
function sa(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.u[c] = null;
  }
  if (a.pool) {
    if (c) {
      a.m.set(c, b), !0 !== a.pool && a.m.size > a.pool && a.m.delete(a.m.keys().next().value);
    } else {
      if (c = a.F.length, !0 === a.pool || c < a.pool) {
        a.F[c] = b;
      }
    }
  }
}
n.flush = function() {
  this.F = [];
  this.m = new Map();
  return this;
};
n.destroy = function() {
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], Q[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.u = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.m = this.F = this.h = this.root = this.tpl = this.apply = this.inc = this.state = this.l = null;
};
var T = Array.prototype, ua = window.Proxy, U = !1;
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
  this.g = null;
  var b = a ? a.length : 0;
  if (ua) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, va);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
R.prototype.mount = function(a) {
  this.g = a;
  return this;
};
R.prototype.define = function(a) {
  Object.defineProperty(this, a, {get:function() {
    return this.i[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), va.set(this, a, b));
  }});
  return this;
};
var va = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var h = parseInt(b, 10);
    b === "" + h && (b = h, d = !0);
  }
  h = a.g;
  if (!U) {
    U = !0;
    if (h) {
      var l = a.length;
      if (d) {
        V(h);
        var g = h.length;
        l !== g && (a.length = g);
        b >= g ? (h.add(c), a.length++) : b < g && (l = h.h[b], h.recycle || h.key && l._mkk === c[h.key] ? h.update(l, c, null, b) : h.replace(l, c, null, b));
      } else {
        "length" === b && c < l && h.remove(c, l - c);
      }
    }
    U = !1;
  }
  d && h.proxy && !c._mkx && (c = S.call(h, h.h[b], c));
  (ua ? a : a.i)[b] = c;
  return !0;
}};
n = R.prototype;
n.set = function(a) {
  this.splice();
  return this.concat(a);
};
n.splice = function(a, b, c) {
  V(this.g);
  U = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.g.remove(a, b);
  b = c ? this.i.splice(a, b, c) : this.i.splice(a, b);
  c && this.g.add(c, a);
  U = !1;
  return b;
};
n.push = function(a) {
  V(this.g);
  U = !0;
  this.g.add(a);
  this[this.length] = a;
  ua && this.length++;
  U = !1;
};
n.unshift = function(a) {
  V(this.g);
  U = !0;
  this.g.add(a, 0);
  this.i.unshift(a);
  U = !1;
};
n.pop = function() {
  V(this.g);
  U = !0;
  this.g.remove(this.length - 1);
  var a = this.i.pop();
  U = !1;
  return a;
};
n.shift = function() {
  V(this.g);
  U = !0;
  this.g.remove(0);
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
      h && (this.splice(d, h), c -= h, b -= h, h = 0);
    } else {
      if (h) {
        h++;
      } else {
        var d = b;
        var h = 1;
      }
    }
  }
  h && this.splice(d, h);
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
};
var W = document.createElement("div"), wa = document.createTextNode(""), X = document.createElement("div");
W.appendChild(wa);
var xa = /[^;:]+/g, ya = /[^ ]+/g;
function za(a, b, c, d) {
  var h;
  d || (d = a._mkc) ? h = d["_a" + b] : a._mkc = d = {};
  h !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function Aa(a, b, c) {
  var d;
  c || (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  !1 !== d && (c["_a" + b] = !1, a.removeAttribute(b));
}
function Ba(a, b) {
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
    for (a = c.match(ya), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function Ca(a, b, c) {
  c = c || Y(a);
  c[b] || (c[b] = 1, a.classList.add(b));
}
function Da(a, b, c) {
  c = c || Y(a);
  0 !== c[b] && (c[b] = 0, a.classList.remove(b));
}
function Ea(a, b, c, d) {
  d = d || Y(a);
  var h = !!d[b];
  c = "undefined" === typeof c ? !h : !!c;
  h !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function Fa(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(xa), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
function Ga(a, b, c, d, h) {
  h = h || Fa(a);
  h[b] !== c && (h[b] = c, (d || a.style).setProperty(b, c));
}
;I.once = function(a, b, c, d, h) {
  var l = new I(b);
  "function" === typeof d && (h = d, d = null);
  if (h) {
    var g = h;
    h = function() {
      l.destroy();
      g();
    };
  }
  if (!a) {
    throw Error("Root element is not defined.");
  }
  a.append(l.create(c, d));
  h || l.destroy();
  return I;
};
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
I.setText = function(a, b) {
  var c = a._mkc, d, h;
  c ? h = c._t : a._mkc = c = {};
  h !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
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
I.setClasses = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  d !== b && (c._c = b, a.className = b);
};
I.getClasses = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c.split(ya);
};
I.hasClass = function(a, b) {
  var c = Y(a), d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
I.toggleClass = Ea;
I.toggleClasses = function(a, b) {
  var c = Y(a);
  if (b.constructor === Array) {
    for (var d = 0; d < b.length; d++) {
      Ea(a, b[d], void 0, c);
    }
  } else {
    for (d in b) {
      Ea(a, d, b[d], c);
    }
  }
};
I.removeClass = Da;
I.removeClasses = function(a, b) {
  for (var c = Y(a), d = 0; d < b.length; d++) {
    Da(a, b[d], c);
  }
};
I.addClass = Ca;
I.addClasses = function(a, b) {
  for (var c = Y(a), d = 0; d < b.length; d++) {
    Ca(a, b[d], c);
  }
};
I.setAttribute = za;
I.setAttributes = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  for (var d in b) {
    za(a, d, b[d], c);
  }
};
I.getAttribute = Ba;
I.hasAttribute = function(a, b) {
  a = Ba(a, b);
  return !(!a && "" !== a);
};
I.removeAttribute = Aa;
I.removeAttributes = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  for (var d = 0; d < b.length; d++) {
    Aa(a, b[d], c);
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
  var c = Fa(a), d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
I.setStyle = Ga;
I.setStyles = function(a, b) {
  var c = Fa(a), d = a.style, h;
  for (h in b) {
    Ga(a, h, b[h], d, c);
  }
};
I.escape = function(a) {
  W.i !== a && (wa.nodeValue = a, W.g = W.innerHTML, W.i = a);
  return W.g;
};
I.sanitize = function(a) {
  X.g !== a && (X.innerHTML = a, X.g = a, X.i = X.textContent);
  return X.i;
};
I.prototype.route = I.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  C[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  C[a] = b;
  c && (D[a] = c);
  return this;
};
I.prototype.dispatch = I.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!C[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  C[a].call(b || this, c || window.event);
  return this;
};
I.prototype.listen = I.listen = ia;
I.prototype.unlisten = I.unlisten = function(a, b) {
  B[a] && (J(0, a, G, b), B[a] = 0);
  return this;
};
I.Array = R;
var Z = window, Ha;
(Ha = Z.define) && Ha.amd ? Ha([], function() {
  return I;
}) : "object" === typeof Z.exports ? Z.module.exports = I : Z.Mikado = I;
}).call(this);
