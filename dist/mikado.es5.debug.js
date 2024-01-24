/**!
 * Mikado.js v0.8.327 (ES5/Debug)
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
var q = aa(this);
function ba(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
var v = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
function y(a, b) {
  if (b) {
    a: {
      var c = q;
      a = a.split(".");
      for (var d = 0; d < a.length - 1; d++) {
        var g = a[d];
        if (!(g in c)) {
          break a;
        }
        c = c[g];
      }
      a = a[a.length - 1];
      d = c[a];
      b = b(d);
      b != d && null != b && v(c, a, {configurable:!0, writable:!0, value:b});
    }
  }
}
y("Symbol", function(a) {
  function b(l) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new c(d + (l || "") + "_" + g++, l);
  }
  function c(l, h) {
    this.g = l;
    v(this, "description", {configurable:!0, writable:!0, value:h});
  }
  if (a) {
    return a;
  }
  c.prototype.toString = function() {
    return this.g;
  };
  var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_", g = 0;
  return b;
});
y("Symbol.iterator", function(a) {
  if (a) {
    return a;
  }
  a = Symbol("Symbol.iterator");
  for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
    var d = q[b[c]];
    "function" === typeof d && "function" != typeof d.prototype[a] && v(d.prototype, a, {configurable:!0, writable:!0, value:function() {
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
  function b(e) {
    this.g = (f += Math.random() + 1).toString();
    if (e) {
      e = z(e);
      for (var k; !(k = e.next()).done;) {
        k = k.value, this.set(k[0], k[1]);
      }
    }
  }
  function c() {
  }
  function d(e) {
    var k = typeof e;
    return "object" === k && null !== e || "function" === k;
  }
  function g(e) {
    if (!A(e, h)) {
      var k = new c();
      v(e, h, {value:k});
    }
  }
  function l(e) {
    var k = Object[e];
    k && (Object[e] = function(m) {
      if (m instanceof c) {
        return m;
      }
      Object.isExtensible(m) && g(m);
      return k(m);
    });
  }
  if (function() {
    if (!a || !Object.seal) {
      return !1;
    }
    try {
      var e = Object.seal({}), k = Object.seal({}), m = new a([[e, 2], [k, 3]]);
      if (2 != m.get(e) || 3 != m.get(k)) {
        return !1;
      }
      m.delete(e);
      m.set(k, 4);
      return !m.has(e) && 4 == m.get(k);
    } catch (p) {
      return !1;
    }
  }()) {
    return a;
  }
  var h = "$jscomp_hidden_" + Math.random();
  l("freeze");
  l("preventExtensions");
  l("seal");
  var f = 0;
  b.prototype.set = function(e, k) {
    if (!d(e)) {
      throw Error("Invalid WeakMap key");
    }
    g(e);
    if (!A(e, h)) {
      throw Error("WeakMap key fail: " + e);
    }
    e[h][this.g] = k;
    return this;
  };
  b.prototype.get = function(e) {
    return d(e) && A(e, h) ? e[h][this.g] : void 0;
  };
  b.prototype.has = function(e) {
    return d(e) && A(e, h) && A(e[h], this.g);
  };
  b.prototype.delete = function(e) {
    return d(e) && A(e, h) && A(e[h], this.g) ? delete e[h][this.g] : !1;
  };
  return b;
});
y("Map", function(a) {
  function b() {
    var f = {};
    return f.s = f.next = f.head = f;
  }
  function c(f, e) {
    var k = f[1];
    return ca(function() {
      if (k) {
        for (; k.head != f[1];) {
          k = k.s;
        }
        for (; k.next != k.head;) {
          return k = k.next, {done:!1, value:e(k)};
        }
        k = null;
      }
      return {done:!0, value:void 0};
    });
  }
  function d(f, e) {
    var k = e && typeof e;
    "object" == k || "function" == k ? l.has(e) ? k = l.get(e) : (k = "" + ++h, l.set(e, k)) : k = "p_" + e;
    var m = f[0][k];
    if (m && A(f[0], k)) {
      for (f = 0; f < m.length; f++) {
        var p = m[f];
        if (e !== e && p.key !== p.key || e === p.key) {
          return {id:k, list:m, index:f, j:p};
        }
      }
    }
    return {id:k, list:m, index:-1, j:void 0};
  }
  function g(f) {
    this[0] = {};
    this[1] = b();
    this.size = 0;
    if (f) {
      f = z(f);
      for (var e; !(e = f.next()).done;) {
        e = e.value, this.set(e[0], e[1]);
      }
    }
  }
  if (function() {
    if (!a || "function" != typeof a || !a.prototype.entries || "function" != typeof Object.seal) {
      return !1;
    }
    try {
      var f = Object.seal({x:4}), e = new a(z([[f, "s"]]));
      if ("s" != e.get(f) || 1 != e.size || e.get({x:4}) || e.set({x:4}, "t") != e || 2 != e.size) {
        return !1;
      }
      var k = e.entries(), m = k.next();
      if (m.done || m.value[0] != f || "s" != m.value[1]) {
        return !1;
      }
      m = k.next();
      return m.done || 4 != m.value[0].x || "t" != m.value[1] || !k.next().done ? !1 : !0;
    } catch (p) {
      return !1;
    }
  }()) {
    return a;
  }
  var l = new WeakMap();
  g.prototype.set = function(f, e) {
    f = 0 === f ? 0 : f;
    var k = d(this, f);
    k.list || (k.list = this[0][k.id] = []);
    k.j ? k.j.value = e : (k.j = {next:this[1], s:this[1].s, head:this[1], key:f, value:e}, k.list.push(k.j), this[1].s.next = k.j, this[1].s = k.j, this.size++);
    return this;
  };
  g.prototype.delete = function(f) {
    f = d(this, f);
    return f.j && f.list ? (f.list.splice(f.index, 1), f.list.length || delete this[0][f.id], f.j.s.next = f.j.next, f.j.next.s = f.j.s, f.j.head = null, this.size--, !0) : !1;
  };
  g.prototype.clear = function() {
    this[0] = {};
    this[1] = this[1].s = b();
    this.size = 0;
  };
  g.prototype.has = function(f) {
    return !!d(this, f).j;
  };
  g.prototype.get = function(f) {
    return (f = d(this, f).j) && f.value;
  };
  g.prototype.entries = function() {
    return c(this, function(f) {
      return [f.key, f.value];
    });
  };
  g.prototype.keys = function() {
    return c(this, function(f) {
      return f.key;
    });
  };
  g.prototype.values = function() {
    return c(this, function(f) {
      return f.value;
    });
  };
  g.prototype.forEach = function(f, e) {
    for (var k = this.entries(), m; !(m = k.next()).done;) {
      m = m.value, f.call(e, m[1], m[0], this);
    }
  };
  g.prototype[Symbol.iterator] = g.prototype.entries;
  var h = 0;
  return g;
});
y("Promise", function(a) {
  function b(h) {
    this.i = 0;
    this.u = void 0;
    this.g = [];
    this.K = !1;
    var f = this.D();
    try {
      h(f.resolve, f.reject);
    } catch (e) {
      f.reject(e);
    }
  }
  function c() {
    this.g = null;
  }
  function d(h) {
    return h instanceof b ? h : new b(function(f) {
      f(h);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.i = function(h) {
    if (null == this.g) {
      this.g = [];
      var f = this;
      this.u(function() {
        f.F();
      });
    }
    this.g.push(h);
  };
  var g = q.setTimeout;
  c.prototype.u = function(h) {
    g(h, 0);
  };
  c.prototype.F = function() {
    for (; this.g && this.g.length;) {
      var h = this.g;
      this.g = [];
      for (var f = 0; f < h.length; ++f) {
        var e = h[f];
        h[f] = null;
        try {
          e();
        } catch (k) {
          this.D(k);
        }
      }
    }
    this.g = null;
  };
  c.prototype.D = function(h) {
    this.u(function() {
      throw h;
    });
  };
  b.prototype.D = function() {
    function h(k) {
      return function(m) {
        e || (e = !0, k.call(f, m));
      };
    }
    var f = this, e = !1;
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
              var f = null != h;
              break a;
            case "function":
              f = !0;
              break a;
            default:
              f = !1;
          }
        }
        f ? this.N(h) : this.J(h);
      }
    }
  };
  b.prototype.N = function(h) {
    var f = void 0;
    try {
      f = h.then;
    } catch (e) {
      this.F(e);
      return;
    }
    "function" == typeof f ? this.S(f, h) : this.J(h);
  };
  b.prototype.F = function(h) {
    this.L(2, h);
  };
  b.prototype.J = function(h) {
    this.L(1, h);
  };
  b.prototype.L = function(h, f) {
    if (0 != this.i) {
      throw Error("Cannot settle(" + h + ", " + f + "): Promise already settled in state" + this.i);
    }
    this.i = h;
    this.u = f;
    2 === this.i && this.P();
    this.T();
  };
  b.prototype.P = function() {
    var h = this;
    g(function() {
      if (h.M()) {
        var f = q.console;
        "undefined" !== typeof f && f.error(h.u);
      }
    }, 1);
  };
  b.prototype.M = function() {
    if (this.K) {
      return !1;
    }
    var h = q.CustomEvent, f = q.Event, e = q.dispatchEvent;
    if ("undefined" === typeof e) {
      return !0;
    }
    "function" === typeof h ? h = new h("unhandledrejection", {cancelable:!0}) : "function" === typeof f ? h = new f("unhandledrejection", {cancelable:!0}) : (h = q.document.createEvent("CustomEvent"), h.initCustomEvent("unhandledrejection", !1, !0, h));
    h.promise = this;
    h.reason = this.u;
    return e(h);
  };
  b.prototype.T = function() {
    if (null != this.g) {
      for (var h = 0; h < this.g.length; ++h) {
        l.i(this.g[h]);
      }
      this.g = null;
    }
  };
  var l = new c();
  b.prototype.R = function(h) {
    var f = this.D();
    h.H(f.resolve, f.reject);
  };
  b.prototype.S = function(h, f) {
    var e = this.D();
    try {
      h.call(f, e.resolve, e.reject);
    } catch (k) {
      e.reject(k);
    }
  };
  b.prototype.then = function(h, f) {
    function e(r, t) {
      return "function" == typeof r ? function(u) {
        try {
          k(r(u));
        } catch (w) {
          m(w);
        }
      } : t;
    }
    var k, m, p = new b(function(r, t) {
      k = r;
      m = t;
    });
    this.H(e(h, k), e(f, m));
    return p;
  };
  b.prototype.catch = function(h) {
    return this.then(void 0, h);
  };
  b.prototype.H = function(h, f) {
    function e() {
      switch(k.i) {
        case 1:
          h(k.u);
          break;
        case 2:
          f(k.u);
          break;
        default:
          throw Error("Unexpected state: " + k.i);
      }
    }
    var k = this;
    null == this.g ? l.i(e) : this.g.push(e);
    this.K = !0;
  };
  b.resolve = d;
  b.reject = function(h) {
    return new b(function(f, e) {
      e(h);
    });
  };
  b.race = function(h) {
    return new b(function(f, e) {
      for (var k = z(h), m = k.next(); !m.done; m = k.next()) {
        d(m.value).H(f, e);
      }
    });
  };
  b.all = function(h) {
    var f = z(h), e = f.next();
    return e.done ? d([]) : new b(function(k, m) {
      function p(u) {
        return function(w) {
          r[u] = w;
          t--;
          0 == t && k(r);
        };
      }
      var r = [], t = 0;
      do {
        r.push(void 0), t++, d(e.value).H(p(r.length - 1), m), e = f.next();
      } while (!e.done);
    });
  };
  return b;
});
function da(a, b) {
  a instanceof String && (a += "");
  var c = 0, d = !1, g = {next:function() {
    if (!d && c < a.length) {
      var l = c++;
      return {value:b(l, a[l]), done:!1};
    }
    d = !0;
    return {done:!0, value:void 0};
  }};
  g[Symbol.iterator] = function() {
    return g;
  };
  return g;
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
    var g = d.length;
    c = c || 0;
    for (0 > c && (c = Math.max(c + g, 0)); c < g; c++) {
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
var B = {}, C = {}, D = Object.create(null), E = Object.create(null), ea = document.documentElement || document.body.parentNode, fa = "ontouchstart" in window, F = !fa && window.PointerEvent && navigator.maxTouchPoints;
G.eventCache = !1;
G.eventBubble = !1;
var ja;
function ka(a, b) {
  var c = a.target;
  if (c !== window && c !== ea) {
    var d = G.eventCache, g = G.eventBubble;
    b || (b = a.type);
    var l;
    d && (l = c["_mke" + b]);
    if ("undefined" === typeof l) {
      for (var h = c; h && h !== ea;) {
        var f = void 0;
        "click" === b && ja && (f = h.getAttribute("tap"));
        f || (f = h.getAttribute(b));
        if (f) {
          var e = f.indexOf(":"), k = h;
          if (-1 < e) {
            var m = f.substring(0, e);
            e = f.substring(e + 1);
            for (f = ""; (k = k.parentElement) !== ea;) {
              if ("root" === e ? k._mkr : k.hasAttribute(e)) {
                f = m;
                break;
              }
            }
            f || console.warn("Event root '" + e + "' was not found for the event: '" + m + "'.");
          }
          if (f && (l || (l = [], d && (c["_mke" + b] = l)), l.push([f, k]), f = E[f], !g || f && (f.stop || f.cancel))) {
            break;
          }
        }
        h = h.parentElement;
      }
      d && (l || (c["_mke" + b] = null));
    }
    if (l) {
      for (g = 0; g < l.length; g++) {
        if (k = l[g], h = k[0], f = D[h]) {
          k = k[1];
          if (m = E[h]) {
            m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (D[h] = null, d && (c["_mke" + b] = null));
          }
          f(k, a);
        } else {
          console.warn("The route '" + h + "' is not defined for the event '" + b + "'.");
        }
      }
    }
  }
}
function la(a, b) {
  B[a] || (I(1, a, ka, b), B[a] = 1, C[a] = b || null);
  return this;
}
var J, K, ma;
if (fa || F) {
  var na = function(a) {
    var b = J, c = K, d = a, g = a.changedTouches;
    g && (d = g[0]);
    J = d.clientX;
    K = d.clientY;
    15 > Math.abs(J - b) && 15 > Math.abs(K - c) && ka(a, "tap");
  }, oa = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    J = b.clientX;
    K = b.clientY;
  }, pa = {passive:!1, capture:!0};
  ma = function(a) {
    I(a, F ? "pointerdown" : "touchstart", oa, pa);
    I(a, F ? "pointerup" : "touchend", na, pa);
  };
}
function I(a, b, c, d) {
  if ("tap" === b) {
    if (fa || F) {
      ma(a);
      return;
    }
    ja = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function L(a, b, c) {
  var d;
  c && (d = a._mkc) && (a._mkc = null);
  for (var g = b.length, l = [], h = {}, f = 0, e, k, m, p = null; f < g; f++) {
    e = b[f];
    if (k = e.v) {
      if (m = e = h[k], !m) {
        a: {
          e = a;
          m = 0;
          for (var r = k.length, t = ""; m < r; m++) {
            var u = k[m];
            t += u;
            if (h[t]) {
              e = h[t];
            } else {
              if (">" === u) {
                e = e.firstChild;
              } else {
                if ("|" === u) {
                  e = [e.firstChild, e];
                  break a;
                }
                if ("@" === u) {
                  e = [e.style, e];
                  break a;
                }
                e = e.nextSibling;
              }
              h[t] = e;
            }
          }
          e = [e];
        }
        m = e[0];
        e = e[1] || m;
      }
    } else {
      m = e = a;
    }
    c && (p = d ? d[f] : {}, e._mkc = p);
    l[f] = new M(p, m, "");
  }
  return a._mkp = l;
}
function N(a, b, c, d, g, l) {
  l || (a.l = 1);
  var h = g || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text)), f, e;
  if (e = b.class) {
    "object" === typeof e ? (c.push(new M(f = {_c:""}, h, d)), (e = e[0]) ? O(a, e, {fn:"_c", index:c.length - 1}) : a.l = 0) : g || (h.className = e);
  }
  if (e = b.attr) {
    for (var k in e) {
      var m = e[k];
      "object" === typeof m ? (f || c.push(new M(f = {}, h, d)), f["_a" + k] = !1, (m = m[0]) ? O(a, m, {fn:"_a", index:c.length - 1, key:k}) : a.l = 0) : g || h.setAttribute(k, m);
    }
  }
  if (e = b.event) {
    for (var p in e) {
      g || h.setAttribute(p, e[p]), la(p);
    }
  }
  if (e = b.style) {
    "object" === typeof e ? (c.push(new M(f || (f = {}), h.style, d + "@")), f._s = "", (e = e[0]) ? O(a, e, {fn:"_s", index:c.length - 1}) : a.l = 0) : g || (h.style.cssText = e);
  }
  if (e = b.text) {
    if ("object" === typeof e) {
      var r = h;
      e = e[0];
      b.tag ? (d += "|", r = !g && h.firstChild, r || (r = document.createTextNode(e), h.appendChild(r))) : f = {};
      (f || (f = {}))._t = e;
      c.push(new M(f, r, d));
      e ? O(a, e, {fn:"_t", index:c.length - 1}) : a.l = 0;
    } else {
      g || (b.tag ? h.textContent = e : h.nodeValue = e);
    }
  } else if (e = b.child) {
    if (g && (g = g.firstChild, !g)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    e.constructor !== Array && (e = [e]);
    b = 0;
    for (r = e.length; b < r; b++) {
      if (k = e[b], d = b ? d + "+" : d + ">", k = N(a, k, c, d, g, 1), g) {
        if (b < r - 1 && (g = g.nextSibling, !g)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        h.appendChild(k);
      }
    }
  } else if (e = b.html) {
    "object" === typeof e ? (f || c.push(new M(f = {}, h, d)), f._h = "", (e = e[0]) ? O(a, e, {fn:"_h", index:c.length - 1}) : a.l = 0) : g || (h.innerHTML = e);
  } else if (e = b.inc) {
    f || c.push(new M(null, h, d));
    if ("string" === typeof e) {
      r = P[e];
      if (!r) {
        throw Error("The partial template '" + e + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(r instanceof G)) {
        d = r[0];
        if (b = r[1]) {
          b.async = !1, g && (b.root = g, b.hydrate = !0);
        }
        P[e] = r = new G(d, b);
      }
    } else if (1 !== e) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      r = new G({name:a.name + "|" + d, tpl:e, key:e.key, cache:e.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:!!a.pool, state:a.state, mount:h, hydrate:!!g});
    }
    1 !== e && a.inc.push(r);
  }
  f && (h._mkc = f);
  l || (h._mkp = c);
  return h;
}
function O(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
var Q = {checked:1, selected:1, hidden:1};
function M(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
n = M.prototype;
n._a = function(a, b, c, d, g) {
  if (this.c) {
    if (d) {
      if (g || 0 === g) {
        d = d[g] || (d[g] = {});
      }
      d["_a" + a] = b;
    }
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !Q[a] || c && "selected" === a ? !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b) : this.n[a] = b;
};
n._t = function(a, b, c) {
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
n._c = function(a, b, c) {
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
n._s = function(a, b, c) {
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
n._h = function(a, b, c) {
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
var ra = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (var d in b) {
      this.g(b, d, b[d]);
    }
    b._mkx = this;
    return b;
  }
  a.prototype.g = function(b, c, d) {
    var g = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(l) {
      qa(g, d = l, c);
    }});
  };
  return a;
}();
function sa(a, b) {
  return "_mkx" === b ? this : a[b];
}
function ta(a, b, c) {
  qa(this, c, b);
  a[b] = c;
  return !0;
}
function qa(a, b, c) {
  if (c = a.fn[c]) {
    for (var d = 0; d < c.length; d++) {
      var g = c[d], l = g.fn, h = a.path[g.index];
      g = g.key || "";
      h.c && h.c[l + g] === b || (g ? h[l](g, b) : h[l](b));
    }
  }
}
;var P = Object.create(null);
function G(a, b) {
  b = void 0 === b ? {} : b;
  if (!(this instanceof G)) {
    return new G(a, b);
  }
  if ("string" === typeof a) {
    var c = P[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof G) {
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
  this.h = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.shadow = b.shadow || !1;
  this.key = a.key || "";
  this.A = {};
  c = a.fn;
  a.I || c && (a.I = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (c = this.recycle || !!this.key) && b.pool ? 1 : 0;
  this.G = [];
  this.m = new Map();
  this.cache = c && (a.cache || !!b.cache);
  this.async = !!b.async;
  this.B = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.l = 0;
  (a = b.observe) && (new R(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.o = null;
}
n = G.prototype;
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
    this.h = a._mkd;
    this.length = this.h.length;
  } else if (c) {
    c.clear();
    a._mkd = this.h = [];
    this.length = 0;
    a.firstChild && (a.textContent = "");
    var g = this.on && this.on.unmount;
    g && g(a, c);
  } else {
    if (b) {
      g = a.children;
      for (var l = g.length, h = Array(l), f = 0; f < l; f++) {
        h[f] = g[f];
      }
      this.h = h;
      this.length = this.h.length;
    } else {
      this.h = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.h;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.A), c === this) {
      this.A = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (c = 0; c < this.length; c++) {
          g = this.h[c], (l = g.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), g._mkk = l, d[l] = g;
        }
      }
      a._mkl = this.A = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.o || (b && this.length && (this.o = this.h[0].cloneNode(!0), N(this, this.tpl.tpl, [], "", this.o) && ua(this)), this.tpl && (this.o = N(this, this.tpl.tpl, [], ""), ua(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function ua(a) {
  a.tpl.I && (a.tpl.fn = a.tpl.I, a.tpl.I = null);
  a.tpl = null;
}
function va(a, b, c, d, g) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  if ("function" === typeof c || !0 === c) {
    g = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    g = d, d = null;
  }
  if (g) {
    return new Promise(function(f) {
      requestAnimationFrame(function() {
        va(a, b, c, d);
        "function" === typeof g && g();
        f();
      });
    });
  }
  if (c || b.fn) {
    var l = new G(b);
    if (c && Array.isArray(c)) {
      for (var h = 0; h < c.length; h++) {
        a.append(l.create(c[h], d, h));
      }
    } else {
      a.append(l.create(c, d));
    }
    l.destroy();
  } else {
    l = N({}, b.tpl, [], "", null, 1), a.append(l);
  }
  return G;
}
n.render = function(a, b, c, d) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  if (!d) {
    var g;
    if (b && (g = "function" === typeof b) || !0 === b) {
      c = b, b = null;
    }
    this.B && this.cancel();
    if (this.async || c) {
      var l = this;
      g || (g = "function" === typeof c);
      l.B = requestAnimationFrame(function() {
        l.B = 0;
        l.render(a, b, null, 1);
        c();
      });
      return g ? this : new Promise(function(r) {
        c = r;
      });
    }
  }
  var h = this.length;
  if (!a && !this.apply) {
    return this.h[0] || this.add(), this;
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
  var f = this.key;
  g = this.proxy;
  !h || f || this.recycle || (this.remove(0, h), h = 0);
  var e = h < d ? h : d, k = 0;
  if (k < e) {
    for (var m = void 0, p = void 0; k < e; k++) {
      m = this.h[k];
      p = a[k];
      if (f && m._mkk !== p[f]) {
        return wa(this, a, b, k);
      }
      this.update(m, p, b, k);
      g && !p._mkx && (a[k] = S(this, m, p));
    }
  }
  if (k < d) {
    for (h = f || this.recycle; k < d; k++) {
      f = a[k], this.add(f, b), !g || h && f._mkx || (a[k] = S(this, this.h[k], f));
    }
  } else {
    d < h && this.remove(d, h - d);
  }
  return this;
};
n.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.h[d]) : d = this.index(a));
  var g;
  if (this.key) {
    var l = b[this.key];
    if (g = this.A[l]) {
      if (g !== a) {
        l = this.index(g);
        var h = l < d ? g : a, f = l < d ? a : g, e = this.h[l < d ? l + 1 : d + 1];
        this.h[d] = g;
        this.h[l] = a;
        e !== f ? this.root.insertBefore(h, f) : e = h;
        this.root.insertBefore(f, e);
      }
    } else {
      this.pool && (g = this.m.get(l)) && (this.m.delete(l), xa(this, a), this.h[d] = g, a.replaceWith(g));
    }
  } else {
    this.recycle && (g = a);
  }
  g ? this.apply && (this.l && b._mkx || this.apply(b, c || this.state, d, g._mkp || L(g, this.o._mkp, this.cache))) : (b = this.create(b, c, d, 1), (this.key || this.pool) && xa(this, a), this.h[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
n.update = function(a, b, c, d) {
  if (!this.apply) {
    return "number" !== typeof d && console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.l && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.h[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || L(a, this.o._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
n.cancel = function() {
  cancelAnimationFrame(this.B);
  this.B = 0;
  return this;
};
n.create = function(a, b, c, d) {
  var g = this.key, l = g && a[g], h, f, e;
  if (this.pool) {
    if (g) {
      if ((f = this.m) && (h = f.get(l))) {
        f.delete(l);
        var k = 1;
      }
    } else {
      (f = this.G) && f.length && (h = f.pop());
    }
  }
  h || (h = e = this.o, e || (this.o = h = e = N(this, this.tpl.tpl, [], ""), ua(this)));
  if (this.apply) {
    f = h._mkp || L(h, this.o._mkp, !!e || this.cache);
    var m = e && this.cache && Array(f.length);
    this.apply(a, b || this.state, c, f, !!e, m);
  }
  e && (h = e.cloneNode(!0), m && !0 !== m && (h._mkc = m), h._mkr = 1);
  g && (k || (h._mkk = l), d && (this.A[l] = h));
  (a = this.on && this.on[e ? "create" : "recycle"]) && a(h, this);
  return h;
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
  d ? (this.root.insertBefore(a, this.h[c]), ya(this.h, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.h[this.length++] = a);
  this.key && this.pool && this.pool < this.length && (this.pool = this.length);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function S(a, b, c) {
  b = b._mkp || L(b, a.o._mkp, a.cache);
  a = a.proxy;
  var d = c._mkx;
  d ? d.path = b : c = new ra(c, {path:b, fn:a, get:sa, set:ta});
  return c;
}
function wa(a, b, c, d) {
  var g = a.h, l = a.A, h = a.key, f = b.length, e = g.length, k = e > f ? e : f, m = 0;
  for (d || (d = 0); d < k; d++) {
    var p = void 0;
    if (d < f) {
      var r = b[d], t = d >= e, u = void 0, w = void 0, ha = void 0, ia = void 0;
      a.proxy && (r._mkx ? ia = a.l : b[d] = S(a, g[d], r));
      if (!t && (u = g[d], w = r[h], ha = u._mkk, ha === w)) {
        ia || a.update(u, r, c, d);
        continue;
      }
      if (t || !l[w]) {
        t || !a.pool ? (e++, k = e > f ? e : f, a.add(r, c, d)) : a.replace(u, r, c, d);
        continue;
      }
      for (var H = t = void 0, x = d + 1; x < k; x++) {
        if (!t && x < e && g[x]._mkk === w && (t = x + 1), !H && x < f && b[x][h] === ha && (H = x + 1), t && H) {
          t >= H + m ? (p = g[t - 1], a.root.insertBefore(p, u), ia || a.update(p, r, c, d), t === H ? (1 < x - d && a.root.insertBefore(u, g[t]), g[d] = g[x], (g[x] = u) || console.error("reconcile.error 1")) : (t - 1 === d && console.error("reconcile.error 2"), ya(g, t - 1, d), m++)) : (r = H - 1 + m, a.root.insertBefore(u, g[r] || null), (r > e ? e : r) - 1 === d && console.error("reconcile.error 3"), ya(g, d, (r > e ? e : r) - 1), m--, d--);
          p = 1;
          break;
        }
      }
    }
    p || (a.remove(d), e--, k = e > f ? e : f, d--);
  }
  return a;
}
function ya(a, b, c, d) {
  var g = d || a[b];
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
  a[c] = g;
}
n.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = 0 > b ? this.length + b : b;
    b = null;
    var d = 1;
  } else {
    "number" === typeof c && (0 > c && (c += this.length), d = 1);
  }
  for (var g = a.length, l = 0; l < g; l++) {
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
  if (!a && b >= c) {
    var d = this.h;
    b = d.length;
    this.root.textContent = "";
    this.root._mkd = this.h = [];
    c = 0;
  } else {
    d = this.h.splice(a, b), c -= b;
  }
  var g = this.pool && !this.key, l = this.key || this.pool, h = this.on && this.on.remove;
  (a = this.key && this.pool) && b >= a && (this.m = new Map(), a = 0);
  for (var f = 0, e; f < b; f++) {
    e = d[g ? b - f - 1 : f], c && e.remove(), l && xa(this, e, 1), h && h(e, this);
  }
  if (a && 0 < (a = this.m.size - a)) {
    for (b = this.m.keys(); a--;) {
      this.m.delete(b.next().value);
    }
  }
  this.length = c;
  return this;
};
n.index = function(a) {
  return a ? this.h.indexOf(a) : -1;
};
n.node = function(a) {
  return this.h[a];
};
function xa(a, b, c) {
  if (a.key) {
    var d = b._mkk;
    a.A[d] = null;
  }
  a.pool && (d ? (a.m.set(d, b), !c && a.m.size > a.pool && a.m.delete(a.m.keys().next().value)) : a.G[a.G.length] = b);
}
n.flush = function() {
  this.G = [];
  this.m = new Map();
  return this;
};
n.destroy = function() {
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], P[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.A = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.m = this.G = this.h = this.root = this.tpl = this.apply = this.inc = this.state = this.o = null;
};
var T = Array.prototype, za = window.Proxy, U = !1;
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
  if (za) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, Aa);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    Ba(this, a);
  }
  Ba(this, "length");
}
R.prototype.mount = function(a) {
  this.g !== a && (this.g && a.mount(this.g.root), this.g = a);
  return this;
};
function Ba(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.i[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && Ba(this, b + 1), Aa.set(this, b, c));
  }});
}
var Aa = {set:function(a, b, c) {
  var d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  var g = a.g;
  if (!U) {
    U = !0;
    if (g) {
      var l = a.length;
      if (d) {
        V(g);
        var h = g.length;
        l !== h && (a.length = h);
        b >= h ? (g.add(c), a.length++) : b < h && (l = g.h[b], g.recycle || g.key && l._mkk === c[g.key] ? g.update(l, c, null, b) : g.replace(l, c, null, b));
      } else {
        "length" === b && c < l && g.remove(c, l - c);
      }
    }
    U = !1;
  }
  g && (l = g.recycle || g.key, !d || !g.proxy || l && c._mkx || (c = S(g, g.h[b], c)));
  (za ? a : a.i)[b] = c;
  return !0;
}};
n = R.prototype;
n.set = function(a) {
  var b = this.g;
  b.recycle || b.key ? (U = !0, b.render(a), U = !1, this.length > a.length && this.splice(a.length)) : (this.splice(), this.concat(a));
  return this;
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
  za && this.length++;
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
      g && (this.splice(d, g), c -= g, b -= g, g = 0);
    } else {
      if (g) {
        g++;
      } else {
        var d = b;
        var g = 1;
      }
    }
  }
  g && this.splice(d, g);
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
n.includes = T.includes;
n.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
n.swap = function(a, b) {
  var c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
n.transaction = function(a) {
  V(this.g);
  U = !0;
  a();
  U = !1;
  var b = this.g, c = b.l;
  b.l = 0;
  b.async ? b.render(this).then(function() {
    b.l = c;
  }) : (b.render(this), b.l = c);
};
var W = document.createElement("div"), Ca = document.createTextNode(""), X = document.createElement("div");
W.appendChild(Ca);
n = G.prototype;
n.move = G.prototype.moveTo = function(a, b) {
  if ("number" === typeof a) {
    var c = a;
    a = this.h[c];
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
    a = this.h[a];
  } else {
    c = this.index(a);
  }
  var d = 0 > b;
  if (d && c || !d && c < this.length - 1) {
    b = d ? Math.max(c + b, 0) : Math.min(c + b, this.length - 1);
    var g = this.h[b], l = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? g : this.h[b + 1] || null);
    if (l) {
      a = this.h[c];
      if (d) {
        for (; c > b; c--) {
          this.h[c] = this.h[c - 1];
        }
      } else {
        for (; c < b; c++) {
          this.h[c] = this.h[c + 1];
        }
      }
      this.h[b] = a;
    } else {
      this.h[c] = g, this.h[b] = a;
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
      a = this.h[c];
    } else {
      c = this.index(a);
    }
    if ("number" === typeof b) {
      var d = 0 > b ? this.length + b : b;
      b = this.h[d];
    } else {
      d = this.index(b);
    }
    var g = c + 1 !== d;
    this.root.insertBefore(g ? a : b, g ? b : a);
    g && d + 1 !== c && this.root.insertBefore(b, this.h[c + 1] || null);
    this.h[c] = b;
    this.h[d] = a;
  }
  return this;
};
var Da = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, Ea = 0, Fa = 0;
function Ga(a, b, c, d, g, l) {
  Ea || (Ea = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(u) {
      var w = Ga(a);
      "function" === typeof b && b(w);
      u(w);
    });
  }
  g || (d = [], c = [d], d.index = g = {current:-1, count:0, last:-1, inc:0, C:!1});
  var h = l ? {} : {tpl:{}}, f = l ? h : h.tpl;
  if (!l) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var e = document.createElement("div");
        e.innerHTML = a;
        a = e.firstElementChild;
      } else {
        h.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (h.name || (h.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  e = a.tagName;
  if (!e || "SCRIPT" === e) {
    var k;
    if ((k = (e ? a.firstChild : a).nodeValue) && k && k.trim()) {
      if (k.includes("{{@")) {
        var m = k.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        k = /{{[\s\S]+}}/.test(m) ? m.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        m && (m = m.replace(/{{([\s\S]+)}}/g, ""));
        m && d.push(m);
        if ("SCRIPT" === e) {
          return k.trim() && (f.text = k, f.tag = e), f;
        }
      }
      k && k.trim() && (k.includes("{{#") ? Ha(f, "html", k, !1, null, g, d) : (g.count++, Ha(f, "text", k, !1, null, g, d)));
    }
    if (!e) {
      return k && k.trim() ? f : null;
    }
  }
  e && (f.tag = e);
  if ((k = a.attributes) && k.length) {
    e = {};
    for (m = 0; m < k.length; m++) {
      var p = k[m].nodeName, r = a.getAttribute(p);
      "include" === p && (p = "inc");
      e[p] = r;
    }
    k = e;
    for (var t in k) {
      e = k[t];
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
          h.key = e.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          Da[t] ? p = f.event || (f.event = {}) : (l || "id" !== t && "name" !== t || h.name || /{{[\s\S]+}}/.test(e) || (h.name = e), p = f.attr || (f.attr = {})), m = t;
      }
      m && Ha(p || f, m, e, !!p, k, g, d);
    }
  }
  t = (a.content || a).childNodes;
  k = t.length;
  g.C && (g.C = !1, g.inc++, d = [], (f.for || f.if) && c.unshift(d), f.child || (f.child = f.text ? {text:f.text} : f.html ? {html:f.html} : null), k ? (d.root = f, d.inc = f.child || (f.child = []), d.index = g = {current:-1, count:0, last:-1, inc:0, C:!1}) : d.inc = f.inc, delete f.for, delete f.if, delete f.text, delete f.html);
  if (k) {
    e = 0;
    for (m = void 0; e < k; e++) {
      if (m = t[e], 8 !== m.nodeType && (g.count++, p = Ga(m, null, c, d, g, 1))) {
        1 !== k || 3 !== m.nodeType && p.text || f.js && p.js ? (p.text || p.tag) && (f.child || (f.child = [])).push(p) : (p.js && (f.js = p.js), p.html && (f.html = p.html), p.text && (f.text = p.text));
      }
    }
    f.child && 1 === f.child.length && (f.child = f.child[0]);
  }
  if (!l) {
    if (h.name || (h.name = "tpl-" + Fa++), 1 === c.length && 0 === c[0].length) {
      h.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d] = c[d].length ? Function("data", "state", "index", "_p", "_f", "_x", '"use strict";let _o,_v,_c;' + c[d].join(";")) : null;
      }
      h.fn = c.length ? c : null;
    }
  }
  return h;
}
function Ha(a, b, c, d, g, l, h) {
  if (/{{[\s\S]+}}/.test(c)) {
    var f = /{{([!?#]+)?=/.test(c), e = /{{!?\?/.test(c), k = /{{\??!/.test(c);
    if (f) {
      if (e || k) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      f = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").replace(/\s+/g, " ");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    e && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || l.count++;
    l.count !== l.last && (l.current++, l.last = l.count, h.push("_o=_p[" + l.current + "]"), h.push("_x&&(_x[" + l.current + "]=_c={})"));
    h.push("_v=" + c);
    d ? h.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);' + (Q[b] ? "selected" === b ? '_f?_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v):_o.n.' + b + "=_v" : "_o.n." + b + "=_v" : '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)') + "}") : "class" === b ? h.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? h.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : 
    "html" === b ? h.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && h.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = f ? [f] : [];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || l.C || (l.count !== l.last && (l.current++, l.last = l.count, h.push("_o=_p[" + l.current + "]")), a = g.foreach ? g.foreach.trim() : "data", b = l.inc, g.if ? h.push("this.inc[" + b + "].mount(_o.n)[" + g.if.trim() + '?"render":"clear"](' + a + ",state)") : g.foreach ? h.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : h.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), l.C = !0);
}
;var Ia = /[^;:]+/g, Ja = / +/;
function Ka(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, Q[b] ? a[b] = c : !1 === c ? a.removeAttribute(b) : a.setAttribute(b, c));
}
function La(a, b, c) {
  !1 !== c["_a" + b] && (c["_a" + b] = !1, Q[b] ? a[b] = !1 : a.removeAttribute(b));
}
function Ma(a, b) {
  var c = a._mkc, d;
  c ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (Q[b] ? d = a[b] : d = a.getAttribute(b), c["_a" + b] = d);
  return d;
}
function Y(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    a = c.trim().split(Ja);
    b._c = c = {};
    b = 0;
    for (var d; b < a.length; b++) {
      (d = a[b]) && (c[a[b]] = 1);
    }
  }
  return c;
}
function Na(a, b, c, d) {
  var g = !!d[b];
  c = "undefined" === typeof c ? !g : !!c;
  g !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function Oa(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(Ia), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b].trim()] = a[b + 1].trim();
    }
  }
  return c;
}
;G.once = va;
G.register = function(a, b) {
  var c;
  if ("string" === typeof a) {
    var d = c = a;
    a = P[d];
    a instanceof G || (a = a[0]);
    if (!a) {
      throw Error("The template '" + d + "' was not found.");
    }
  } else {
    d = a.name;
  }
  P[d] && (c ? console.info("The template '" + d + "' was replaced by a new definition.") : console.warn("The template '" + d + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  P[d] = [a, b];
  return G;
};
G.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  var b = P[a];
  b && (b instanceof G && b.destroy(), P[a] = null);
  return G;
};
G.compile = Ga;
G.setText = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._t : a._mkc = c = {};
  d !== b && (c._t = b, c._h = null, (c = a.firstChild) ? c.nodeValue = b : a.appendChild(document.createTextNode(b)));
};
G.getText = function(a) {
  var b = a._mkc, c;
  b ? c = b._t : a._mkc = b = {};
  "string" !== typeof c && (a = a.firstChild, b._t = c = a ? a.nodeValue : "");
  return c;
};
G.setHtml = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
G.getHtml = function(a) {
  var b = a._mkc, c;
  b ? c = b._h || b._t : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
G.setClass = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
G.getClass = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  c = c.split(Ja);
  return "" === c[0] ? [] : c;
};
G.hasClass = function(a, b) {
  var c = Y(a), d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
G.toggleClass = function(a, b, c) {
  var d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var g = 0; g < b.length; g++) {
        Na(a, b[g], c, d);
      }
    } else {
      for (g in b) {
        Na(a, g, b[g], d);
      }
    }
  } else {
    Na(a, b, c, d);
  }
};
G.removeClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var g = a, l = b[d];
      0 !== c[l] && (c[l] = 0, g.classList.remove(l));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
G.addClass = function(a, b) {
  var c = Y(a);
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      var g = a, l = b[d];
      c[l] || (c[l] = 1, g.classList.add(l));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
G.setAttribute = function(a, b, c) {
  var d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (var g in b) {
      Ka(a, g, b[g], d);
    }
  } else {
    Ka(a, b, c, d);
  }
};
G.getAttribute = Ma;
G.hasAttribute = function(a, b) {
  a = Ma(a, b);
  return !(!a && "" !== a);
};
G.removeAttribute = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (var d = 0; d < b.length; d++) {
      La(a, b[d], c);
    }
  } else {
    La(a, b, c);
  }
};
G.setCss = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
G.getCss = function(a) {
  var b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
G.getStyle = function(a, b) {
  var c = Oa(a), d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
G.setStyle = function(a, b, c) {
  var d = Oa(a), g = a.style;
  if ("object" === typeof b) {
    for (var l in b) {
      c = a;
      var h = l, f = b[l];
      d[h] !== f && (d[h] = f, (g || c.style).setProperty(h, f));
    }
  } else {
    d[b] !== c && (d[b] = c, (g || a.style).setProperty(b, c));
  }
};
G.escape = function(a) {
  W.i !== a && (Ca.nodeValue = a, W.g = W.innerHTML, W.i = a);
  return W.g;
};
G.sanitize = function(a) {
  X.g !== a && (X.innerHTML = a, X.g = a, X.i = X.textContent);
  return X.i;
};
G.prototype.route = G.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  D[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  D[a] = b;
  E[a] = c || null;
  return this;
};
G.prototype.dispatch = G.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!D[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  D[a](b || this, c || window.event);
  return this;
};
G.prototype.listen = G.listen = la;
G.prototype.unlisten = G.unlisten = function(a) {
  B[a] && (I(0, a, ka, C[a]), B[a] = 0, C[a] = null);
  return this;
};
G.Array = R;
var Z = window, Pa;
(Pa = Z.define) && Pa.amd ? Pa([], function() {
  return G;
}) : "object" === typeof Z.exports ? Z.exports = G : Z.Mikado = G;
}).call(this);
