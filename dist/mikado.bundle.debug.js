/**!
 * Mikado.js v0.8.141 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var l;
const m = {}, u = Object.create(null), y = Object.create(null), aa = document.documentElement || document.body.parentNode, z = "ontouchstart" in window, B = !z && window.PointerEvent && navigator.maxTouchPoints;
let ba;
function C(a, b) {
  b || (b = a.type);
  const c = a.target, d = E.eventCache;
  var e = E.eventBubble;
  let g;
  d && (g = c["_mke" + b]);
  if ("undefined" === typeof g) {
    for (var f = c; f && f !== aa;) {
      var k = void 0;
      "click" === b && ba && (k = f.getAttribute("tap"));
      k || (k = f.getAttribute(b));
      if (k) {
        var h = k.indexOf(":"), n = f;
        if (-1 < h) {
          const p = k.substring(0, h);
          h = k.substring(h + 1);
          for (k = ""; (n = n.parentElement) !== aa;) {
            if (n.hasAttribute(h)) {
              k = p;
              break;
            }
          }
          k || console.warn("Event root '" + h + "' was not found for the event: '" + p + "'.");
        }
        if (k && (g || (g = [], d && (c["_mke" + b] = g)), g.push([k, n]), n = y[k], !e || n && (n.stop || n.cancel))) {
          break;
        }
      }
      f = f.parentElement;
    }
    d && (g || (c["_mke" + b] = null));
  }
  if (g) {
    for (let p = 0, q; p < g.length; p++) {
      if (q = g[p], e = q[0], f = u[e]) {
        k = q[1];
        if (n = y[e]) {
          n.prevent && a.preventDefault(), n.stop && a.stopImmediatePropagation(), n.once && (u[e] = null, d && (c["_mke" + b] = null));
        }
        f(k, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  m[a] || (F(1, a, C, b), m[a] = 1);
  return this;
}
let G, H, da;
if (z || B) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    G = e.clientX;
    H = e.clientY;
  }
  function b(d) {
    const e = G, g = H;
    var f = d, k = d.changedTouches;
    k && (f = k[0]);
    G = f.clientX;
    H = f.clientY;
    15 > Math.abs(G - e) && 15 > Math.abs(H - g) && C(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    F(d, B ? "pointerdown" : "touchstart", a, c);
    F(d, B ? "pointerup" : "touchend", b, c);
  };
}
function F(a, b, c, d) {
  if ("tap" === b) {
    if (z || B) {
      da(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function I(a, b, c) {
  const d = b.length, e = [], g = {};
  for (let h = 0, n, p, q, r, t, v = null; h < d; h++) {
    n = b[h];
    if (p = n.v) {
      if (r = q = g[p], !r) {
        let A = void 0;
        var f = a, k = p;
        for (let D = 0, x = k.length, w = ""; D < x; D++) {
          const P = k[D];
          w += P;
          g[w] ? f = g[w] : (">" === P ? f = f.firstChild : "|" === P ? (A = f, f = f.firstChild) : "@" === P ? (A = f, f = f.style) : f = f.nextSibling, g[w] = f);
        }
        q = [f, A];
        r = q[0];
        q = q[1] || r;
      }
    } else {
      r = q = a;
    }
    c && t !== q && (t = q, q._mkc = v = {});
    e[h] = new J(v, r, "");
  }
  return a._mkp = e;
}
function K(a, b, c, d, e, g) {
  g || (a.m = 1);
  const f = e || (b.tag ? b.B ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let k, h;
  if (h = b.class) {
    "object" === typeof h ? (c.push(new J(k = {_c:""}, f, d)), (h = h[0]) ? L(a, h, ["_c", c.length - 1]) : a.m = 0) : e || (f.className = h);
  }
  if (h = b.attr) {
    for (var n in h) {
      let p = h[n];
      "object" === typeof p ? (k || c.push(new J(k = {}, f, d)), k["_a" + n] = !1, (p = p[0]) ? L(a, p, ["_a", c.length - 1, n]) : a.m = 0) : e || f.setAttribute(n, p);
    }
  }
  if (h = b.event) {
    for (const p in h) {
      e || (f.setAttribute(p, h[p]), ca(p));
    }
  }
  if (h = b.style) {
    "object" === typeof h ? (c.push(new J(k || (k = {}), f.style, d + "@")), k._s = "", (h = h[0]) ? L(a, h, ["_s", c.length - 1]) : a.m = 0) : e || (f.style.cssText = h);
  }
  if (h = b.text) {
    "object" === typeof h ? (n = f, h = h[0], b.tag ? (d += "|", n = !e && f.firstChild, n || (n = document.createTextNode(h), f.appendChild(n))) : k = {}, (k || (k = {}))._t = h, c.push(new J(k, n, d)), h ? L(a, h, ["_t", c.length - 1]) : a.m = 0) : e || (b.tag ? f.textContent = h : f.nodeValue = h);
  } else if (h = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    h.constructor !== Array && (h = [h]);
    for (let p = 0, q, r = h.length; p < r; p++) {
      if (q = h[p], d = p ? d + "+" : d + ">", b = K(a, q, c, d, e, 1), e) {
        if (p < r - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        f.appendChild(b);
      }
    }
  } else if (h = b.html) {
    "object" === typeof h ? (k || c.push(new J(k = {}, f, d)), k._h = "", (h = h[0]) ? L(a, h, ["_h", c.length - 1]) : a.m = 0) : e || (f.innerHTML = h);
  } else if (h = b.inc) {
    k || c.push(new J(null, f, d));
    if ("string" === typeof h) {
      b = M[h];
      if (!b) {
        throw Error("The partial template '" + h + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(b instanceof E)) {
        d = b[0];
        if (b = b[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        M[h] = b = new E(d, b);
      }
    } else {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      b = new E({name:a.name + "|" + d, tpl:h, key:h.key, cache:h.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:f, hydrate:!!e});
    }
    a.inc.push(b);
  }
  k && (f._mkc = k);
  g || (f._mkp = c);
  return f;
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
l = J.prototype;
l._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
l._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
l._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
l._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
l._h = function(a) {
  if (this.c) {
    if (this.c._h === a) {
      return;
    }
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
const fa = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (const d in b) {
      this.define(b, d, b[d]);
    }
    b._mkx = this;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    const e = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(g) {
      ea(e, d = g, c);
    }});
  };
  return a;
}();
function ha(a, b) {
  return "_mkx" === b ? this : a[b];
}
function ia(a, b, c) {
  ea(this, c, b);
  a[b] = c;
  return !0;
}
function ea(a, b, c) {
  if (c = a.fn[c]) {
    for (let d = 0; d < c.length; d++) {
      const e = c[d], g = e[0], f = a.path[e[1]];
      if (!f.c || f.c[g + (e[2] || "")] !== b) {
        f[g](e[2] || b, b);
      }
    }
  }
}
;/*
 this.recycle ||*/
const M = Object.create(null);
function E(a, b = {}) {
  if (!(this instanceof E)) {
    return new E(a, b);
  }
  if ("string" === typeof a) {
    var c = M[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof E) {
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
  this.g = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.key = a.key || "";
  this.o = {};
  c = a.fn;
  a.A || c && (a.A = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.u = [];
  this.l = new Map();
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.s = 0;
  this.on = b.on || {};
  this.proxy = null;
  this.m = 0;
  (a = b.observe) && (new N(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.j = null;
}
l = E.prototype;
l.mount = function(a, b) {
  this.s && this.cancel();
  const c = a._mki;
  var d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.g = a._mkd;
    this.length = this.g.length;
  } else if (c) {
    c.clear(), a._mkd = this.g = [], this.length = 0;
  } else {
    if (b) {
      var e = a.children;
      const g = e.length, f = Array(g);
      for (let k = 0; k < g; k++) {
        f[k] = e[k];
      }
      this.g = f;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.o), c === this) {
      this.o = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let g = 0, f, k; g < this.length; g++) {
          f = this.g[g], k = f.getAttribute("key"), f._mkk = k, d[k] = f;
        }
      }
      a._mkl = this.o = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.j || (b && this.length && (this.j = this.g[0].cloneNode(), K(this, this.tpl.tpl, [], "", this.j) && O(this)), this.tpl && (this.j = K(this, this.tpl.tpl, [], ""), O(this)));
  return this;
};
function O(a) {
  a.tpl.A && (a.tpl.fn.length && console.error("The template '" + a.name + "' might not have been initialized properly. There are " + a.tpl.fn.length + " template functions left which wasn't assigned. Please post an example to Mikado Github issues."), a.tpl.fn = a.tpl.A, a.tpl.A = null);
  a.tpl = null;
}
l.render = function(a, b, c, d) {
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
    this.s && this.cancel();
    if (this.async || c) {
      const h = this;
      e || (e = "function" === typeof c);
      h.s = requestAnimationFrame(function() {
        h.s = 0;
        h.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(n) {
        c = n;
      });
    }
  }
  var g = this.length;
  if (!a) {
    return this.apply ? console.warn("When calling .render() by passing no data nothing will happen!") : this.g[0] || this.add(), this;
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
  const f = this.key;
  !g || f || this.recycle || (this.remove(0, g), g = 0);
  let k = g < d ? g : d;
  e = 0;
  if (e < k) {
    for (let h, n; e < k; e++) {
      h = this.g[e];
      n = a[e];
      if (f && h._mkk !== n[f]) {
        return ja(this, a, b, e);
      }
      this.update(h, n, b, e, 1);
      this.proxy && !n._mkx && (a[e] = Q(this, h, n));
    }
  }
  if (e < d) {
    for (; e < d; e++) {
      g = a[e], this.add(g, b), !this.proxy || this.recycle && g._mkx || (a[e] = Q(this, this.g[e], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
l.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var g = b[this.key];
    if (e = this.o[g]) {
      if (e !== a) {
        var f = this.index(e);
        this.g[d] = e;
        this.g[f] = a;
        g = f < d ? e : a;
        f = f < d ? a : e;
        const k = g.nextElementSibling;
        this.root.insertBefore(g, f);
        k !== f && this.root.insertBefore(f, k);
      }
    } else {
      this.pool && (e = this.l.get(g)) && (this.l.delete(g), R(this, a), this.g[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.m && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || I(e, this.j._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && R(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on.replace) && d(a);
  return this;
};
l.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.m && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.g[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || I(a, this.j._mkp, this.cache));
  (b = this.on.update) && b(a);
  return this;
};
l.cancel = function() {
  cancelAnimationFrame(this.s);
  this.s = 0;
  return this;
};
l.create = function(a, b, c, d) {
  let e = this.key;
  const g = e && a[e];
  let f, k, h, n;
  e && this.pool && (k = this.l) && (f = k.get(g)) ? (n = 1, k.delete(g)) : (!e || this.recycle) && this.pool && (k = this.u) && k.length ? f = k.pop() : (f = h = this.j, h || (this.j = f = h = K(this, this.tpl.tpl, [], ""), O(this)));
  this.apply && this.apply(a, b || this.state, c, f._mkp || I(f, this.j._mkp, !!h || this.cache));
  h && (f = f.cloneNode(!0));
  e && (n || (f._mkk = g), d && (this.o[g] = f));
  (a = this.on[h ? "create" : "recycle"]) && a(f);
  return f;
};
l.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), S(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  (c = this.on.insert) && c(a);
  return this;
};
function Q(a, b, c) {
  {
    b = b._mkp || I(b, a.j._mkp, a.cache);
    a = a.proxy;
    const d = c._mkx;
    d ? d.path = b : c = new fa(c, {path:b, fn:a, get:ha, set:ia});
  }
  return c;
}
function ja(a, b, c, d) {
  const e = a.g, g = a.o, f = a.key;
  let k = b.length, h = e.length, n = h > k ? h : k, p = 0;
  for (d || (d = 0); d < n; d++) {
    var q = void 0;
    if (d < k) {
      var r = b[d], t = d >= h;
      let v, A, D;
      a.proxy && !r._mkx && (b[d] = Q(a, e[d], r));
      if (!t && (v = e[d], A = r[f], D = v._mkk, D === A)) {
        a.update(v, r, c, d, 1);
        continue;
      }
      if (t || !g[A]) {
        t || !a.pool ? (h++, n = h > k ? h : k, a.add(r, c, d)) : a.replace(v, r, c, d);
        continue;
      }
      let x, w;
      for (t = d + 1; t < n; t++) {
        if (!x && t < h && e[t]._mkk === A && (x = t + 1), !w && t < k && b[t][f] === D && (w = t + 1), x && w) {
          x >= w ? (q = e[x - 1], a.root.insertBefore(q, v), a.update(q, r, c, d, 1), x === w ? (1 < t - d && a.root.insertBefore(v, e[x]), e[d] = e[t], (e[t] = v) || console.error("Error")) : (S(e, x - 1, d), p++)) : (r = w - 1 + p, a.root.insertBefore(v, e[r] || null), S(e, d, (r > h ? h : r) - 1), p--, d--);
          q = 1;
          break;
        }
      }
    }
    q || (a.remove(d), h--, n = h > k ? h : k, d--);
  }
  return a;
}
function S(a, b, c, d) {
  const e = d || a[b];
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
l.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let g = 0; g < e; g++) {
    this.add(a[g], b, d ? c++ : null);
  }
  return this;
};
l.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
l.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, g = this.on.remove;
  for (let f = 0, k; f < b; f++) {
    k = a[d ? b - f - 1 : f], c && k.remove(), e && R(this, k), g && g(k);
  }
  this.length = c;
  return this;
};
l.index = function(a) {
  return this.g.indexOf(a);
};
l.node = function(a) {
  return this.g[a];
};
function R(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.o[c] = null;
  }
  if (a.pool) {
    if (c) {
      a.l.set(c, b), !0 !== a.pool && a.l.size > a.pool && a.l.delete(a.l.keys().next().value);
    } else {
      if (c = a.u.length, !0 === a.pool || c < a.pool) {
        a.u[c] = b;
      }
    }
  }
}
l.flush = function() {
  this.u = [];
  this.l = new Map();
  return this;
};
l.destroy = function() {
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], M[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.o = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.l = this.u = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.j = null;
};
const T = Array.prototype, ka = window.Proxy;
let U = !1;
function V(a) {
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
  this.h = null;
  const b = a ? a.length : 0;
  if (ka) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, la);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
N.prototype.mount = function(a) {
  this.h = a;
  return this;
};
N.prototype.define = function(a) {
  Object.defineProperty(this, a, {get:function() {
    return this.i[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), la.set(this, a, b));
  }});
  return this;
};
const la = {set:function(a, b, c) {
  let d;
  if ("number" === typeof b) {
    d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (b = e, d = !0);
  }
  e = a.h;
  if (!U) {
    U = !0;
    if (e) {
      var g = a.length;
      if (d) {
        V(e);
        const f = e.length;
        g !== f && (a.length = f);
        b >= f ? (e.add(c), a.length++) : b < f && (g = e.g[b], e.recycle || e.key && g._mkk === c[e.key] ? e.update(g, c, null, b) : e.replace(g, c, null, b));
      } else {
        "length" === b && c < g && e.remove(c, g - c);
      }
    }
    U = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = Q(e, e.g[b], c));
  (ka ? a : a.i)[b] = c;
  return !0;
}};
l = N.prototype;
l.swap = function(a, b) {
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
l.set = function(a) {
  this.splice();
  return this.concat(a);
};
l.splice = function(a, b, c) {
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
  V(this.h);
  U = !0;
  this.h.add(a);
  this[this.length] = a;
  ka && this.length++;
  U = !1;
};
l.unshift = function(a) {
  V(this.h);
  U = !0;
  this.h.add(a, 0);
  this.i.unshift(a);
  U = !1;
};
l.pop = function() {
  V(this.h);
  U = !0;
  this.h.remove(this.length - 1);
  const a = this.i.pop();
  U = !1;
  return a;
};
l.shift = function() {
  V(this.h);
  U = !0;
  this.h.remove(0);
  const a = this.i.shift();
  U = !1;
  return a;
};
l.concat = function(a) {
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
l.sort = T.sort;
l.reverse = T.reverse;
l.slice = T.slice;
l.map = function(a, b) {
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
l.filter = function(a, b) {
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, g = this.length; e < g; e++) {
    a(this[e]) ? d && (this.splice(c, d), g -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
l.indexOf = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
l.lastIndexOf = function(a) {
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
l.forEach = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
};
const W = document.createElement("div"), ma = document.createTextNode(""), X = document.createElement("div");
W.appendChild(ma);
l = E.prototype;
l.move = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.g[c]) : c = this.index(a);
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
  const d = 0 > b;
  if (d && c || !d && c < this.length - 1) {
    b = d ? Math.max(c + b, 0) : Math.min(c + b, this.length - 1);
    const e = this.g[b], g = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.g[b + 1] || null);
    if (g) {
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
      this.g[c] = e, this.g[b] = a;
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
    let c, d;
    "number" === typeof a ? (c = 0 > a ? this.length + a : a, a = this.g[c]) : c = this.index(a);
    "number" === typeof b ? (d = 0 > b ? this.length + b : b, b = this.g[d]) : d = this.index(b);
    const e = c + 1 !== d;
    this.root.insertBefore(e ? a : b, e ? b : a);
    e && d + 1 !== c && this.root.insertBefore(b, this.g[c + 1] || null);
    this.g[c] = b;
    this.g[d] = a;
  }
  return this;
};
const na = /[^;:]+/g, oa = /[ ]+/g;
function pa(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function qa(a, b) {
  let c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (c["_a" + b] = d = a.getAttribute(b));
  return d;
}
function Y(a) {
  var b = a._mkc;
  let c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    for (a = c.split(oa), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function ra(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function sa(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(na), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
;E.once = function(a, b, c, d, e) {
  const g = new E(b);
  "function" === typeof d && (e = d, d = null);
  if (e) {
    const f = e;
    e = function() {
      g.destroy();
      f();
    };
  }
  if (!a) {
    throw Error("Root element is not defined.");
  }
  a.append(g.create(c, d));
  e || g.destroy();
  return E;
};
E.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = M[c], a instanceof E || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  M[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  M[c] = [a, b];
  return E;
};
E.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = M[a];
  b && (b instanceof E && b.destroy(), M[a] = null);
  return E;
};
E.setText = function(a, b) {
  let c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
};
E.getText = function(a) {
  let b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d && (3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent);
  return d;
};
E.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
E.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
E.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
E.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c.split(oa);
};
E.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
E.toggleClass = function(a, b, c) {
  const d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        ra(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        ra(a, e, b[e], d);
      }
    }
  } else {
    ra(a, b, c, d);
  }
};
E.removeClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let g = 0; g < b.length; g++) {
      var d = a, e = b[g];
      0 !== c[e] && (c[e] = 0, d.classList.remove(e));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
E.addClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let g = 0; g < b.length; g++) {
      var d = a, e = b[g];
      c[e] || (c[e] = 1, d.classList.add(e));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
E.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      pa(a, e, b[e], d);
    }
  } else {
    pa(a, b, c, d);
  }
};
E.getAttribute = qa;
E.hasAttribute = function(a, b) {
  a = qa(a, b);
  return !(!a && "" !== a);
};
E.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let g = 0; g < b.length; g++) {
      var d = a, e = b[g];
      !1 !== c["_a" + e] && (c["_a" + e] = !1, d.removeAttribute(e));
    }
  } else {
    !1 !== c["_a" + b] && (c["_a" + b] = !1, a.removeAttribute(b));
  }
};
E.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
E.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
E.getStyle = function(a, b) {
  const c = sa(a);
  let d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
E.setStyle = function(a, b, c) {
  const d = sa(a), e = a.style;
  if ("object" === typeof b) {
    for (const f in b) {
      c = a;
      var g = b[f];
      d[f] !== g && (d[f] = g, (e || c.style).setProperty(f, g));
    }
  } else {
    d[b] !== c && (d[b] = c, (e || a.style).setProperty(b, c));
  }
};
E.escape = function(a) {
  W.i !== a && (ma.nodeValue = a, W.h = W.innerHTML, W.i = a);
  return W.h;
};
E.sanitize = function(a) {
  X.h !== a && (X.innerHTML = a, X.h = a, X.i = X.textContent);
  return X.i;
};
E.prototype.route = E.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  u[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  u[a] = b;
  c && (y[a] = c);
  return this;
};
E.prototype.dispatch = E.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!u[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  u[a](b || this, c || window.event);
  return this;
};
E.prototype.listen = E.listen = ca;
E.prototype.unlisten = E.unlisten = function(a, b) {
  m[a] && (F(0, a, C, b), m[a] = 0);
  return this;
};
E.Array = N;
const Z = window;
let ta;
(ta = Z.define) && ta.amd ? ta([], function() {
  return E;
}) : "object" === typeof Z.exports ? Z.module.exports = E : Z.Mikado = E;
}).call(this);
