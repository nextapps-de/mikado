/**!
 * Mikado.js v0.8.133 (ES5/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var m;
function aa(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
function ba(a) {
  var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
  if (b) {
    return b.call(a);
  }
  if ("number" == typeof a.length) {
    return {next:aa(a)};
  }
  throw Error(String(a) + " is not an iterable or ArrayLike");
}
function ca(a) {
  a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
  for (var b = 0; b < a.length; ++b) {
    var c = a[b];
    if (c && c.Math == Math) {
      return c;
    }
  }
  throw Error("Cannot find global object");
}
var n = ca(this), da = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
  if (a == Array.prototype || a == Object.prototype) {
    return a;
  }
  a[b] = c.value;
  return a;
};
function ea(a, b) {
  if (b) {
    a: {
      var c = n;
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
      b != d && null != b && da(c, a, {configurable:!0, writable:!0, value:b});
    }
  }
}
ea("Promise", function(a) {
  function b(e) {
    this.i = 0;
    this.l = void 0;
    this.g = [];
    this.J = !1;
    var g = this.u();
    try {
      e(g.resolve, g.reject);
    } catch (h) {
      g.reject(h);
    }
  }
  function c() {
    this.g = null;
  }
  function d(e) {
    return e instanceof b ? e : new b(function(g) {
      g(e);
    });
  }
  if (a) {
    return a;
  }
  c.prototype.i = function(e) {
    if (null == this.g) {
      this.g = [];
      var g = this;
      this.l(function() {
        g.A();
      });
    }
    this.g.push(e);
  };
  var f = n.setTimeout;
  c.prototype.l = function(e) {
    f(e, 0);
  };
  c.prototype.A = function() {
    for (; this.g && this.g.length;) {
      var e = this.g;
      this.g = [];
      for (var g = 0; g < e.length; ++g) {
        var h = e[g];
        e[g] = null;
        try {
          h();
        } catch (k) {
          this.u(k);
        }
      }
    }
    this.g = null;
  };
  c.prototype.u = function(e) {
    this.l(function() {
      throw e;
    });
  };
  b.prototype.u = function() {
    function e(k) {
      return function(p) {
        h || (h = !0, k.call(g, p));
      };
    }
    var g = this, h = !1;
    return {resolve:e(this.N), reject:e(this.A)};
  };
  b.prototype.N = function(e) {
    if (e === this) {
      this.A(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (e instanceof b) {
        this.P(e);
      } else {
        a: {
          switch(typeof e) {
            case "object":
              var g = null != e;
              break a;
            case "function":
              g = !0;
              break a;
            default:
              g = !1;
          }
        }
        g ? this.M(e) : this.I(e);
      }
    }
  };
  b.prototype.M = function(e) {
    var g = void 0;
    try {
      g = e.then;
    } catch (h) {
      this.A(h);
      return;
    }
    "function" == typeof g ? this.R(g, e) : this.I(e);
  };
  b.prototype.A = function(e) {
    this.K(2, e);
  };
  b.prototype.I = function(e) {
    this.K(1, e);
  };
  b.prototype.K = function(e, g) {
    if (0 != this.i) {
      throw Error("Cannot settle(" + e + ", " + g + "): Promise already settled in state" + this.i);
    }
    this.i = e;
    this.l = g;
    2 === this.i && this.O();
    this.S();
  };
  b.prototype.O = function() {
    var e = this;
    f(function() {
      if (e.L()) {
        var g = n.console;
        "undefined" !== typeof g && g.error(e.l);
      }
    }, 1);
  };
  b.prototype.L = function() {
    if (this.J) {
      return !1;
    }
    var e = n.CustomEvent, g = n.Event, h = n.dispatchEvent;
    if ("undefined" === typeof h) {
      return !0;
    }
    "function" === typeof e ? e = new e("unhandledrejection", {cancelable:!0}) : "function" === typeof g ? e = new g("unhandledrejection", {cancelable:!0}) : (e = n.document.createEvent("CustomEvent"), e.initCustomEvent("unhandledrejection", !1, !0, e));
    e.promise = this;
    e.reason = this.l;
    return h(e);
  };
  b.prototype.S = function() {
    if (null != this.g) {
      for (var e = 0; e < this.g.length; ++e) {
        l.i(this.g[e]);
      }
      this.g = null;
    }
  };
  var l = new c();
  b.prototype.P = function(e) {
    var g = this.u();
    e.C(g.resolve, g.reject);
  };
  b.prototype.R = function(e, g) {
    var h = this.u();
    try {
      e.call(g, h.resolve, h.reject);
    } catch (k) {
      h.reject(k);
    }
  };
  b.prototype.then = function(e, g) {
    function h(q, r) {
      return "function" == typeof q ? function(t) {
        try {
          k(q(t));
        } catch (v) {
          p(v);
        }
      } : r;
    }
    var k, p, u = new b(function(q, r) {
      k = q;
      p = r;
    });
    this.C(h(e, k), h(g, p));
    return u;
  };
  b.prototype.catch = function(e) {
    return this.then(void 0, e);
  };
  b.prototype.C = function(e, g) {
    function h() {
      switch(k.i) {
        case 1:
          e(k.l);
          break;
        case 2:
          g(k.l);
          break;
        default:
          throw Error("Unexpected state: " + k.i);
      }
    }
    var k = this;
    null == this.g ? l.i(h) : this.g.push(h);
    this.J = !0;
  };
  b.resolve = d;
  b.reject = function(e) {
    return new b(function(g, h) {
      h(e);
    });
  };
  b.race = function(e) {
    return new b(function(g, h) {
      for (var k = ba(e), p = k.next(); !p.done; p = k.next()) {
        d(p.value).C(g, h);
      }
    });
  };
  b.all = function(e) {
    var g = ba(e), h = g.next();
    return h.done ? d([]) : new b(function(k, p) {
      function u(t) {
        return function(v) {
          q[t] = v;
          r--;
          0 == r && k(q);
        };
      }
      var q = [], r = 0;
      do {
        q.push(void 0), r++, d(h.value).C(u(q.length - 1), p), h = g.next();
      } while (!h.done);
    });
  };
  return b;
});
var w = {}, y = Object.create(null), z = Object.create(null), fa = document.documentElement || document.body.parentNode, A = "ontouchstart" in window, B = !A && window.PointerEvent && navigator.maxTouchPoints, ha;
function C(a, b) {
  b || (b = a.type);
  var c = a.target, d = D.eventCache, f = !1 !== D.eventBubble, l;
  d && (l = c["_mke" + b]);
  if ("undefined" === typeof l) {
    for (var e = c; e && e !== fa;) {
      var g = void 0;
      "click" === b && ha && (g = e.getAttribute("tap"));
      g || (g = e.getAttribute(b));
      if (g) {
        var h = g.indexOf(":");
        if (-1 < h) {
          var k = g.substring(0, h);
          h = g.substring(h + 1);
          for (g = ""; (e = e.parentElement) !== fa;) {
            if (e.hasAttribute(h)) {
              g = k;
              break;
            }
          }
          g || console.warn("Event root '" + h + "' was not found for the event: '" + k + "'.");
        }
        if (g && (l || (l = [], d && (c["_mke" + b] = l)), l.push([g, e]), g = z[g], !f || g && (g.stop || g.cancel))) {
          break;
        }
      }
      e = e.parentElement;
    }
    d && (l || (c["_mke" + b] = null));
  }
  if (l) {
    for (f = 0; f < l.length; f++) {
      if (k = l[f], e = k[0], g = y[e]) {
        k = k[1];
        if (h = z[e]) {
          h.prevent && a.preventDefault(), h.stop && a.stopImmediatePropagation(), h.once && (y[e] = null, d && (c["_mke" + b] = null));
        }
        g(k, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ia(a, b) {
  w[a] || (E(1, a, C, b), w[a] = 1);
  return this;
}
var G, H, ja;
if (A || B) {
  var ka = function(a) {
    var b = G, c = H, d = a, f = a.changedTouches;
    f && (d = f[0]);
    G = d.clientX;
    H = d.clientY;
    15 > Math.abs(G - b) && 15 > Math.abs(H - c) && C.call(this, a, "tap");
  }, la = function(a) {
    var b = a;
    (a = a.touches) && (b = a[0]);
    G = b.clientX;
    H = b.clientY;
  }, ma = {passive:!1, capture:!0};
  ja = function(a) {
    E(a, B ? "pointerdown" : "touchstart", la, ma);
    E(a, B ? "pointerup" : "touchend", ka, ma);
  };
}
function E(a, b, c, d) {
  if ("tap" === b) {
    if (A || B) {
      ja(a);
      return;
    }
    ha = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function I(a, b, c) {
  for (var d = b.length, f = [], l = {}, e = 0, g, h, k, p = void 0, u = null; e < d; e++) {
    g = b[e];
    if (h = g.v) {
      if (k = g = l[h], !k) {
        g = void 0;
        k = a;
        for (var q = 0, r = h.length, t = ""; q < r; q++) {
          var v = h[q];
          t += v;
          l[t] ? k = l[t] : (">" === v ? k = k.firstChild : "|" === v ? (g = k, k = k.firstChild) : "@" === v ? (g = k, k = k.style) : k = k.nextSibling, l[t] = k);
        }
        g = [k, g];
        k = g[0];
        g = g[1] || k;
      }
    } else {
      k = g = a;
    }
    c && p !== g && (p = g, g._mkc = u = {});
    f[e] = new J(u, k, "");
  }
  return a._mkp = f;
}
function K(a, b, c, d, f, l) {
  var e = d || (a.tag ? a.T ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag) : document.createTextNode(a.text)), g, h;
  if (h = a.class) {
    "object" === typeof h ? (b.push(new J(g = {_c:""}, e, c)), (h = h[0]) && L.call(f, h, ["_c", b.length - 1])) : d || (e.className = h);
  }
  if (h = a.attr) {
    for (var k in h) {
      var p = h[k];
      "object" === typeof p ? (g || b.push(new J(g = {}, e, c)), g["_a" + k] = !1, (p = p[0]) && L.call(f, p, ["_a", b.length - 1, k])) : d || e.setAttribute(k, p);
    }
  }
  if (h = a.event) {
    for (var u in h) {
      d || (e.setAttribute(u, h[u]), ia(u));
    }
  }
  if (h = a.style) {
    "object" === typeof h ? (b.push(new J(g || (g = {}), e.style, c + "@")), g._s = "", (h = h[0]) && L.call(f, h, ["_s", b.length - 1])) : d || (e.style.cssText = h);
  }
  if (h = a.text) {
    "object" === typeof h ? (k = e, h = h[0], a.tag ? (c += "|", k = !d && e.firstChild, k || (k = document.createTextNode(h), e.appendChild(k))) : g = {}, (g || (g = {}))._t = h, b.push(new J(g, k, c)), h && L.call(f, h, ["_t", b.length - 1])) : d || (a.tag ? e.textContent = h : e.nodeValue = h);
  } else if (h = a.child) {
    for (d && (d = d.firstChild), h.constructor !== Array && (h = [h]), a = 0, k = h.length; a < k; a++) {
      p = h[a], c = a ? c + "+" : c + ">", p = K(p, b, c, d, f, 1), d ? a < k - 1 && (d = d.nextSibling) : e.appendChild(p);
    }
  } else if (h = a.html) {
    "object" === typeof h ? (g || b.push(new J(g = {}, e, c)), g._h = "", (h = h[0]) && L.call(f, h, ["_h", b.length - 1])) : d || (e.innerHTML = h);
  } else if (h = a.inc) {
    g || b.push(new J(null, e, c));
    if ("string" === typeof h) {
      a = M[h];
      if (!a) {
        throw Error("The partial template '" + h + "' which is included by the root template '" + f.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(a instanceof D)) {
        c = a[0];
        if (a = a[1]) {
          a.async = !1, d && (a.root = d, a.hydrate = !0);
        }
        M[h] = a = new D(c, a);
      }
    } else {
      c = f.inc.length;
      if (!f.tpl.H.length) {
        throw Error("The template '" + f.name + "|" + c + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      a = new D({name:f.name + "|" + c, tpl:h, key:h.key, cache:h.cache, fn:f.tpl.H}, {recycle:f.recycle, cache:f.cache, pool:f.pool, state:f.state, mount:e, hydrate:!!d});
    }
    f.inc.push(a);
  }
  g && (e._mkc = g);
  l || (e._mkp = b, f.s = f.s === b.length ? 1 : 0);
  return e;
}
function L(a, b) {
  this.s++;
  this.proxy || (this.proxy = {});
  (this.proxy[a] || (this.proxy[a] = [])).push(b);
}
function J(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
m = J.prototype;
m._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
m._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
m._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
m._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
m._h = function(a) {
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
    this.G = c.G;
    for (var d in b) {
      this.define(b, d, b[d]);
    }
    b._mkx = !0;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    var f = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(l) {
      na.call(f, d = l, c);
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
  if (b = this.G[b]) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c], f = d[0], l = this.path[d[1]];
      if (!l.c || l.c[f + (d[2] || "")] !== a) {
        l[f](d[2] || a, a);
      }
    }
  }
}
;var M = Object.create(null);
function D(a, b) {
  b = void 0 === b ? {} : b;
  if (!(this instanceof D)) {
    return new D(a, b);
  }
  if ("string" === typeof a) {
    var c = M[a];
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
  if (!a.tpl || !a.name) {
    throw Error("Initialization Error: Template isn't supported.");
  }
  this.h = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.key = a.key || "";
  this.m = {};
  this.apply = (c = a.fn) && c.pop();
  this.tpl = a.tpl;
  this.name = a.name;
  this.inc = [];
  a.tpl.H = c;
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.F = [];
  this.B = {};
  this.D = 0;
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.o = 0;
  this.on = b.on || {};
  this.proxy = null;
  this.s = 0;
  (a = b.observe) && (new N(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.j = null;
}
m = D.prototype;
m.mount = function(a, b) {
  this.o && this.cancel();
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
      for (var f = a.children, l = f.length, e = Array(l), g = 0; g < l; g++) {
        e[g] = f[g];
      }
      this.h = e;
      this.length = this.h.length;
    } else {
      this.h = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.h;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.m), c === this) {
      this.m = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (c = 0; c < this.length; c++) {
          f = this.h[c], l = f.getAttribute("key"), f._mkk = l, d[l] = f;
        }
      }
      a._mkl = this.m = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.j || (b && this.length ? (this.j = this.h[0].cloneNode(), K(this.tpl, [], "", this.j, this)) : this.j = K(this.tpl, [], "", null, this), this.tpl = null);
  return this;
};
m.render = function(a, b, c, d) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  if (!d && ("function" === typeof b && (c = b, b = null), this.o && this.cancel(), this.async || c)) {
    var f = this;
    f.o = requestAnimationFrame(function() {
      f.o = 0;
      f.render(a, b, null, 1);
      "function" === typeof c && c();
    });
    return c ? this : new Promise(function(u) {
      c = u;
    });
  }
  var l = this.length;
  if (!a) {
    return this.apply || this.h[0] || this.add(), console.warn("When calling .render() by passing no data nothing will happen!"), this;
  }
  if (Array.isArray(a) || a instanceof N) {
    if (d = a.length, !d) {
      return this.remove(0, l);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  var e = this.key;
  !l || e || this.recycle || (this.remove(0, l), l = 0);
  var g = l < d ? l : d, h = 0;
  if (h < g) {
    for (var k = void 0, p = void 0; h < g; h++) {
      k = this.h[h];
      p = a[h];
      if (e && k._mkk !== p[e]) {
        return this.reconcile(a, b, h, 1);
      }
      this.update(k, p, b, h, 1);
      this.proxy && !p._mkx && (a[h] = O.call(this, k, p));
    }
  }
  if (h < d) {
    for (; h < d; h++) {
      l = a[h], this.add(l, b, h), this.proxy && !l._mkx && (a[h] = O.call(this, this.h[h], l));
    }
  } else {
    d < l && this.remove(d, l - d);
  }
  return this;
};
m.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.h[d]) : d = this.index(a));
  var f;
  if (this.key) {
    var l = b[this.key];
    if (f = this.m[l]) {
      if (f !== a) {
        var e = this.index(f);
        this.h[d] = f;
        this.h[e] = a;
        l = e < d ? f : a;
        e = e < d ? a : f;
        var g = l.nextElementSibling;
        this.root.insertBefore(l, e);
        g !== e && this.root.insertBefore(e, g);
      }
    } else {
      this.pool && (f = this.B[l]) && (this.B[l] = null, this.D--, P(this, a), this.h[d] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? this.s && b._mkx || !this.apply || this.apply(b, c || this.state, d, f._mkp || I(f, this.j._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && P(this, a), this.h[d] = b, a.replaceWith(b));
  (d = this.on.replace) && d(a);
  return this;
};
m.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.s && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.h[a]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || I(a, this.j._mkp, this.cache));
  (b = this.on.update) && b(a);
  return this;
};
m.cancel = function() {
  cancelAnimationFrame(this.o);
  this.o = 0;
  return this;
};
m.create = function(a, b, c, d) {
  var f = this.key, l = f && a[f], e, g, h;
  if (f && this.pool && (g = this.B) && (e = g[l])) {
    var k = 1;
    g[l] = null;
    this.D--;
  } else {
    (!f || this.recycle) && this.pool && (g = this.F) && g.length ? e = g.pop() : (e = h = this.j, h || (this.j = e = h = K(this.tpl, [], "", null, this), this.tpl = null));
  }
  this.apply && this.apply(a, b || this.state, c, e._mkp || I(e, this.j._mkp, !!h || this.cache));
  h && (e = e.cloneNode(!0));
  f && (k || (e._mkk = l), d && (this.m[l] = e));
  (a = this.on[h ? "create" : "recycle"]) && a(e);
  return e;
};
m.add = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = c < this.length;
  } else {
    c || 0 === c ? d = c < this.length : c = this.length;
  }
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.h[c]), Q(this.h, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.h[this.length++] = a);
  (c = this.on.insert) && c(a);
  return this;
};
function O(a, b) {
  a = a._mkp || I(a, this.j._mkp, this.cache);
  return new oa(b, {path:a, G:this.proxy, get:pa, set:qa});
}
m.reconcile = function(a, b, c, d) {
  var f = this.h, l = this.m, e = this.key, g = a.length, h = f.length, k = h > g ? h : g, p = 0;
  for (c || (c = 0); c < k; c++) {
    var u = void 0;
    if (c < g) {
      var q = a[c], r = c >= h, t = void 0, v = void 0, Y = void 0;
      if (!r && (t = f[c], v = q[e], Y = t._mkk, this.proxy && !q._mkx && (a[c] = O.call(this, t, q)), Y === v)) {
        d && this.update(t, q, b, c, 1);
        continue;
      }
      if (r || !l[v]) {
        d && (r || !this.pool ? (h++, k = h > g ? h : g, this.add(q, b, c)) : this.replace(t, q, b, c));
        this.proxy && !q._mkx && (a[c] = O.call(this, f[c], q));
        continue;
      }
      for (var F = r = void 0, x = c + 1; x < k; x++) {
        if (!r && x < h && f[x]._mkk === v && (r = x + 1), !F && x < g && a[x][e] === Y && (F = x + 1), r && F) {
          r >= F ? (u = f[r - 1], this.root.insertBefore(u, t), d && this.update(u, q, b, c, 1), r === F ? (1 < x - c && this.root.insertBefore(t, f[r]), f[c] = f[x], (f[x] = t) || console.error("Error")) : (Q(f, r - 1, c), p++)) : (q = F - 1 + p, this.root.insertBefore(t, f[q] || null), Q(f, c, (q > h ? h : q) - 1), p--, c--);
          u = 1;
          break;
        }
      }
    }
    u || (this.remove(c), h--, k = h > g ? h : g, c--);
  }
  return this;
};
function Q(a, b, c, d) {
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
m.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = 1;
  } else if (c || 0 === c) {
    d = 1;
  }
  for (var f = a.length, l = 0; l < f; l++) {
    this.add(a[l], b, d ? c++ : null);
  }
  return this;
};
m.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
m.remove = function(a, b) {
  var c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a - 1));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.h, b = a.length, this.root.textContent = "", this.root._mkd = this.h = [], c = 0) : (a = this.h.splice(a, b), c -= b);
  for (var d = this.pool && !this.key, f = this.key || this.pool, l = this.on.remove, e = 0, g; e < b; e++) {
    g = a[d ? b - e - 1 : e], c && g.remove(), f && P(this, g), l && l(g);
  }
  this.length = c;
  return this;
};
m.index = function(a) {
  return this.h.indexOf(a);
};
m.node = function(a) {
  return this.h[a];
};
function P(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.m[c] = null;
  }
  if (a.pool) {
    if (a.key) {
      if (!0 === a.pool || a.D < a.pool) {
        a.B[c] = b, a.D++;
      }
    } else {
      if (c = a.F.length, !0 === a.pool || c < a.pool) {
        a.F[c] = b;
      }
    }
  }
}
m.destroy = function() {
  for (var a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], M[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.m = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.B = this.F = this.h = this.root = this.tpl = this.apply = this.inc = this.state = this.j = null;
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
  this.g = null;
  var b = a ? a.length : 0;
  if (S) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:R.splice.bind(this), pop:R.pop.bind(this), shift:R.shift.bind(this), unshift:R.unshift.bind(this), push:R.push.bind(this)};
    return new Proxy(this, ra);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
N.prototype.mount = function(a) {
  this.g = a;
  return this;
};
N.prototype.define = function(a) {
  Object.defineProperty(this, a, {get:function() {
    return this.i[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), ra.set(this, a, b));
  }});
  return this;
};
var ra = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var f = parseInt(b, 10);
    b === "" + f && (b = f, d = !0);
  }
  f = a.g;
  if (!T) {
    T = !0;
    if (f) {
      var l = a.length;
      if (d) {
        U(f);
        var e = f.length;
        l !== e && (a.length = e);
        b >= e ? (f.add(c), a.length++) : b < e && (l = f.h[b], f.recycle || f.key && l._mkk === c[f.key] ? f.update(l, c, null, b) : f.replace(l, c, null, b));
      } else {
        "length" === b && c < l && f.remove(c, l - c);
      }
    }
    T = !1;
  }
  d && f.proxy && !c._mkx && (c = O.call(f, f.h[b], c));
  (S ? a : a.i)[b] = c;
  return !0;
}};
m = N.prototype;
m.set = function(a) {
  this.splice();
  return this.concat(a);
};
m.splice = function(a, b, c) {
  U(this.g);
  T = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.g.remove(a, b);
  b = c ? this.i.splice(a, b, c) : this.i.splice(a, b);
  c && this.g.add(c, a);
  T = !1;
  return b;
};
m.push = function(a) {
  U(this.g);
  T = !0;
  this.g.add(a);
  this[this.length] = a;
  S && this.length++;
  T = !1;
};
m.unshift = function(a) {
  U(this.g);
  T = !0;
  this.g.add(a, 0);
  this.i.unshift(a);
  T = !1;
};
m.pop = function() {
  U(this.g);
  T = !0;
  this.g.remove(this.length - 1);
  var a = this.i.pop();
  T = !1;
  return a;
};
m.shift = function() {
  U(this.g);
  T = !0;
  this.g.remove(0);
  var a = this.i.shift();
  T = !1;
  return a;
};
m.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
m.sort = R.sort;
m.reverse = R.reverse;
m.slice = R.slice;
m.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
m.filter = function(a, b) {
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
m.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
m.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
m.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
};
var V = document.createElement("div"), sa = document.createTextNode(""), W = document.createElement("div");
V.appendChild(sa);
var ta = /[^;:]+/g, ua = /[^ ]+/g;
function va(a, b, c, d) {
  var f;
  d || (d = a._mkc) ? f = d["_a" + b] : a._mkc = d = {};
  f !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function wa(a, b, c) {
  var d;
  c || (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  !1 !== d && (c["_a" + b] = !1, a.removeAttribute(b));
}
function xa(a, b) {
  var c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (c["_a" + b] = d = a.getAttribute(b));
  return d;
}
function X(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(ua), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function ya(a, b, c) {
  c = c || X(a);
  c[b] || (c[b] = 1, a.classList.add(b));
}
function za(a, b, c) {
  c = c || X(a);
  0 !== c[b] && (c[b] = 0, a.classList.remove(b));
}
function Aa(a, b, c, d) {
  d = d || X(a);
  var f = !!d[b];
  c = "undefined" === typeof c ? !f : !!c;
  f !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function Ba(a) {
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
function Ca(a, b, c, d, f) {
  f = f || Ba(a);
  f[b] !== c && (f[b] = c, (d || a.style).setProperty(b, c));
}
;D.register = function(a, b) {
  var c;
  if ("string" === typeof a) {
    var d = c = a;
    a = M[d];
    a instanceof D || (a = a[0]);
    if (!a) {
      throw Error("The template '" + d + "' was not found.");
    }
  } else {
    d = a.name;
  }
  M[d] && (c ? console.info("The template '" + d + "' was replaced by a new definition.") : console.warn("The template '" + d + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  M[d] = [a, b];
  return D;
};
D.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  var b = M[a];
  b && (b instanceof D && b.destroy(), M[a] = null);
  return D;
};
D.setText = function(a, b) {
  var c = a._mkc, d, f;
  c ? f = c._t : a._mkc = c = {};
  f !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
};
D.getText = function(a) {
  var b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d && (3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent);
  return d;
};
D.setHtml = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
D.getHtml = function(a) {
  var b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
D.setClass = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  d !== b && (c._c = b, a.className = b);
};
D.getClass = function(a) {
  var b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c;
};
D.hasClass = function(a, b) {
  var c = X(a), d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
D.toggleClass = Aa;
D.toggleClasses = function(a, b) {
  var c = X(a);
  if (b.constructor === Array) {
    for (var d = 0; d < b.length; d++) {
      Aa(a, b[d], void 0, c);
    }
  } else {
    for (d in b) {
      Aa(a, d, b[d], c);
    }
  }
};
D.removeClass = za;
D.removeClasses = function(a, b) {
  for (var c = X(a), d = 0; d < b.length; d++) {
    za(a, b[d], c);
  }
};
D.addClass = ya;
D.addClasses = function(a, b) {
  for (var c = X(a), d = 0; d < b.length; d++) {
    ya(a, b[d], c);
  }
};
D.setAttribute = va;
D.setAttributes = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  for (var d in b) {
    va(a, d, b[d], c);
  }
};
D.getAttribute = xa;
D.hasAttribute = function(a, b) {
  a = xa(a, b);
  return !(!a && "" !== a);
};
D.removeAttribute = wa;
D.removeAttributes = function(a, b) {
  var c = a._mkc;
  c || (a._mkc = c = {});
  for (var d = 0; d < b.length; d++) {
    wa(a, b[d], c);
  }
};
D.setCss = function(a, b) {
  var c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
D.setStyle = Ca;
D.setStyles = function(a, b) {
  var c = Ba(a), d = a.style, f;
  for (f in b) {
    Ca(a, f, b[f], d, c);
  }
};
D.escape = function(a) {
  V.i !== a && (sa.nodeValue = a, V.g = V.innerHTML, V.i = a);
  return V.g;
};
D.sanitize = function(a) {
  W.g !== a && (W.innerHTML = a, W.g = a, W.i = W.textContent);
  return W.i;
};
D.prototype.route = D.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  y[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  y[a] = b;
  c && (z[a] = c);
  return this;
};
D.prototype.dispatch = D.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!y[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  y[a].call(b || this, c || window.event);
  return this;
};
D.prototype.listen = D.listen = ia;
D.prototype.unlisten = D.unlisten = function(a, b) {
  w[a] && (E(0, a, C, b), w[a] = 0);
  return this;
};
D.Array = N;
var Z = window, Da;
(Da = Z.define) && Da.amd ? Da([], function() {
  return D;
}) : "object" === typeof Z.exports ? Z.module.exports = D : Z.Mikado = D;
}).call(this);
