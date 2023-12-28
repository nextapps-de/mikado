/**!
 * Mikado.js v0.8.133 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var l;
const n = {}, u = Object.create(null), y = Object.create(null), aa = document.documentElement || document.body.parentNode, z = "ontouchstart" in window, B = !z && window.PointerEvent && navigator.maxTouchPoints;
let ba;
function C(a, b) {
  b || (b = a.type);
  const c = a.target, d = E.eventCache;
  var e = !1 !== E.eventBubble;
  let k;
  d && (k = c["_mke" + b]);
  if ("undefined" === typeof k) {
    for (var f = c; f && f !== aa;) {
      var h = void 0;
      "click" === b && ba && (h = f.getAttribute("tap"));
      h || (h = f.getAttribute(b));
      if (h) {
        var g = h.indexOf(":");
        if (-1 < g) {
          var m = h.substring(0, g);
          g = h.substring(g + 1);
          for (h = ""; (f = f.parentElement) !== aa;) {
            if (f.hasAttribute(g)) {
              h = m;
              break;
            }
          }
          h || console.warn("Event root '" + g + "' was not found for the event: '" + m + "'.");
        }
        if (h && (k || (k = [], d && (c["_mke" + b] = k)), k.push([h, f]), m = y[h], !e || m && (m.stop || m.cancel))) {
          break;
        }
      }
      f = f.parentElement;
    }
    d && (k || (c["_mke" + b] = null));
  }
  if (k) {
    for (let p = 0, r; p < k.length; p++) {
      if (r = k[p], e = r[0], f = u[e]) {
        h = r[1];
        if (m = y[e]) {
          m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (u[e] = null, d && (c["_mke" + b] = null));
        }
        f(h, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  n[a] || (F(1, a, C, b), n[a] = 1);
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
    const e = G, k = H;
    var f = d, h = d.changedTouches;
    h && (f = h[0]);
    G = f.clientX;
    H = f.clientY;
    15 > Math.abs(G - e) && 15 > Math.abs(H - k) && C.call(this, d, "tap");
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
  const d = b.length, e = [], k = {};
  for (let g = 0, m, p, r, q, t, v = null; g < d; g++) {
    m = b[g];
    if (p = m.v) {
      if (q = r = k[p], !q) {
        let A = void 0;
        var f = a, h = p;
        for (let D = 0, x = h.length, w = ""; D < x; D++) {
          const R = h[D];
          w += R;
          k[w] ? f = k[w] : (">" === R ? f = f.firstChild : "|" === R ? (A = f, f = f.firstChild) : "@" === R ? (A = f, f = f.style) : f = f.nextSibling, k[w] = f);
        }
        r = [f, A];
        q = r[0];
        r = r[1] || q;
      }
    } else {
      q = r = a;
    }
    c && t !== r && (t = r, r._mkc = v = {});
    e[g] = new J(v, q, "");
  }
  return a._mkp = e;
}
function K(a, b, c, d, e, k) {
  const f = d || (a.tag ? a.D ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag) : document.createTextNode(a.text));
  let h, g;
  if (g = a.class) {
    "object" === typeof g ? (b.push(new J(h = {_c:""}, f, c)), (g = g[0]) && L.call(e, g, ["_c", b.length - 1])) : d || (f.className = g);
  }
  if (g = a.attr) {
    for (var m in g) {
      let p = g[m];
      "object" === typeof p ? (h || b.push(new J(h = {}, f, c)), h["_a" + m] = !1, (p = p[0]) && L.call(e, p, ["_a", b.length - 1, m])) : d || f.setAttribute(m, p);
    }
  }
  if (g = a.event) {
    for (const p in g) {
      d || (f.setAttribute(p, g[p]), ca(p));
    }
  }
  if (g = a.style) {
    "object" === typeof g ? (b.push(new J(h || (h = {}), f.style, c + "@")), h._s = "", (g = g[0]) && L.call(e, g, ["_s", b.length - 1])) : d || (f.style.cssText = g);
  }
  if (g = a.text) {
    "object" === typeof g ? (m = f, g = g[0], a.tag ? (c += "|", m = !d && f.firstChild, m || (m = document.createTextNode(g), f.appendChild(m))) : h = {}, (h || (h = {}))._t = g, b.push(new J(h, m, c)), g && L.call(e, g, ["_t", b.length - 1])) : d || (a.tag ? f.textContent = g : f.nodeValue = g);
  } else if (g = a.child) {
    d && (d = d.firstChild);
    g.constructor !== Array && (g = [g]);
    for (let p = 0, r, q = g.length; p < q; p++) {
      r = g[p], c = p ? c + "+" : c + ">", a = K(r, b, c, d, e, 1), d ? p < q - 1 && (d = d.nextSibling) : f.appendChild(a);
    }
  } else if (g = a.html) {
    "object" === typeof g ? (h || b.push(new J(h = {}, f, c)), h._h = "", (g = g[0]) && L.call(e, g, ["_h", b.length - 1])) : d || (f.innerHTML = g);
  } else if (g = a.inc) {
    h || b.push(new J(null, f, c));
    if ("string" === typeof g) {
      a = M[g];
      if (!a) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + e.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(a instanceof E)) {
        c = a[0];
        if (a = a[1]) {
          a.async = !1, d && (a.root = d, a.hydrate = !0);
        }
        M[g] = a = new E(c, a);
      }
    } else {
      c = e.inc.length;
      if (!e.tpl.C.length) {
        throw Error("The template '" + e.name + "|" + c + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      a = new E({name:e.name + "|" + c, tpl:g, key:g.key, cache:g.cache, fn:e.tpl.C}, {recycle:e.recycle, cache:e.cache, pool:e.pool, state:e.state, mount:f, hydrate:!!d});
    }
    e.inc.push(a);
  }
  h && (f._mkc = h);
  k || (f._mkp = b, e.o = e.o === b.length ? 1 : 0);
  return f;
}
function L(a, b) {
  this.o++;
  this.proxy || (this.proxy = {});
  (this.proxy[a] || (this.proxy[a] = [])).push(b);
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
    this.B = c.B;
    for (const d in b) {
      this.define(b, d, b[d]);
    }
    b._mkx = !0;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    const e = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(k) {
      ea.call(e, d = k, c);
    }});
  };
  return a;
}();
function ha(a, b) {
  return "_mkx" === b || a[b];
}
function ia(a, b, c) {
  ea.call(this, c, b);
  a[b] = c;
  return !0;
}
function ea(a, b) {
  if (b = this.B[b]) {
    for (let c = 0; c < b.length; c++) {
      const d = b[c], e = d[0], k = this.path[d[1]];
      if (!k.c || k.c[e + (d[2] || "")] !== a) {
        k[e](d[2] || a, a);
      }
    }
  }
}
;const M = Object.create(null);
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
  this.l = {};
  this.apply = (c = a.fn) && c.pop();
  this.tpl = a.tpl;
  this.name = a.name;
  this.inc = [];
  a.tpl.C = c;
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.A = [];
  this.s = {};
  this.u = 0;
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.m = 0;
  this.on = b.on || {};
  this.proxy = null;
  this.o = 0;
  (a = b.observe) && (new N(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.j = null;
}
l = E.prototype;
l.mount = function(a, b) {
  this.m && this.cancel();
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
      const k = e.length, f = Array(k);
      for (let h = 0; h < k; h++) {
        f[h] = e[h];
      }
      this.g = f;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.l), c === this) {
      this.l = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let k = 0, f, h; k < this.length; k++) {
          f = this.g[k], h = f.getAttribute("key"), f._mkk = h, d[h] = f;
        }
      }
      a._mkl = this.l = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.j || (b && this.length ? (this.j = this.g[0].cloneNode(), K(this.tpl, [], "", this.j, this)) : this.j = K(this.tpl, [], "", null, this), this.tpl = null);
  return this;
};
l.render = function(a, b, c, d) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  if (!d && ("function" === typeof b && (c = b, b = null), this.m && this.cancel(), this.async || c)) {
    const g = this;
    g.m = requestAnimationFrame(function() {
      g.m = 0;
      g.render(a, b, null, 1);
      "function" === typeof c && c();
    });
    return c ? this : new Promise(function(m) {
      c = m;
    });
  }
  var e = this.length;
  if (!a) {
    return this.apply || this.g[0] || this.add(), console.warn("When calling .render() by passing no data nothing will happen!"), this;
  }
  if (Array.isArray(a) || a instanceof N) {
    if (d = a.length, !d) {
      return this.remove(0, e);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  const k = this.key;
  !e || k || this.recycle || (this.remove(0, e), e = 0);
  let f = e < d ? e : d, h = 0;
  if (h < f) {
    for (let g, m; h < f; h++) {
      g = this.g[h];
      m = a[h];
      if (k && g._mkk !== m[k]) {
        return this.reconcile(a, b, h, 1);
      }
      this.update(g, m, b, h, 1);
      this.proxy && !m._mkx && (a[h] = O.call(this, g, m));
    }
  }
  if (h < d) {
    for (; h < d; h++) {
      e = a[h], this.add(e, b, h), this.proxy && !e._mkx && (a[h] = O.call(this, this.g[h], e));
    }
  } else {
    d < e && this.remove(d, e - d);
  }
  return this;
};
l.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.g[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var k = b[this.key];
    if (e = this.l[k]) {
      if (e !== a) {
        var f = this.index(e);
        this.g[d] = e;
        this.g[f] = a;
        k = f < d ? e : a;
        f = f < d ? a : e;
        const h = k.nextElementSibling;
        this.root.insertBefore(k, f);
        h !== f && this.root.insertBefore(f, h);
      }
    } else {
      this.pool && (e = this.s[k]) && (this.s[k] = null, this.u--, P(this, a), this.g[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.o && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || I(e, this.j._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && P(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on.replace) && d(a);
  return this;
};
l.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.o && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.g[a]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || I(a, this.j._mkp, this.cache));
  (b = this.on.update) && b(a);
  return this;
};
l.cancel = function() {
  cancelAnimationFrame(this.m);
  this.m = 0;
  return this;
};
l.create = function(a, b, c, d) {
  let e = this.key;
  const k = e && a[e];
  let f, h, g, m;
  e && this.pool && (h = this.s) && (f = h[k]) ? (m = 1, h[k] = null, this.u--) : (!e || this.recycle) && this.pool && (h = this.A) && h.length ? f = h.pop() : (f = g = this.j, g || (this.j = f = g = K(this.tpl, [], "", null, this), this.tpl = null));
  this.apply && this.apply(a, b || this.state, c, f._mkp || I(f, this.j._mkp, !!g || this.cache));
  g && (f = f.cloneNode(!0));
  e && (m || (f._mkk = k), d && (this.l[k] = f));
  (a = this.on[g ? "create" : "recycle"]) && a(f);
  return f;
};
l.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = b, b = null, d = c < this.length) : c || 0 === c ? d = c < this.length : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), Q(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  (c = this.on.insert) && c(a);
  return this;
};
function O(a, b) {
  a = a._mkp || I(a, this.j._mkp, this.cache);
  return new fa(b, {path:a, B:this.proxy, get:ha, set:ia});
}
l.reconcile = function(a, b, c, d) {
  const e = this.g, k = this.l, f = this.key;
  let h = a.length, g = e.length, m = g > h ? g : h, p = 0;
  for (c || (c = 0); c < m; c++) {
    var r = void 0;
    if (c < h) {
      var q = a[c], t = c >= g;
      let v, A, D;
      if (!t && (v = e[c], A = q[f], D = v._mkk, this.proxy && !q._mkx && (a[c] = O.call(this, v, q)), D === A)) {
        d && this.update(v, q, b, c, 1);
        continue;
      }
      if (t || !k[A]) {
        d && (t || !this.pool ? (g++, m = g > h ? g : h, this.add(q, b, c)) : this.replace(v, q, b, c));
        this.proxy && !q._mkx && (a[c] = O.call(this, e[c], q));
        continue;
      }
      let x, w;
      for (t = c + 1; t < m; t++) {
        if (!x && t < g && e[t]._mkk === A && (x = t + 1), !w && t < h && a[t][f] === D && (w = t + 1), x && w) {
          x >= w ? (r = e[x - 1], this.root.insertBefore(r, v), d && this.update(r, q, b, c, 1), x === w ? (1 < t - c && this.root.insertBefore(v, e[x]), e[c] = e[t], (e[t] = v) || console.error("Error")) : (Q(e, x - 1, c), p++)) : (q = w - 1 + p, this.root.insertBefore(v, e[q] || null), Q(e, c, (q > g ? g : q) - 1), p--, c--);
          r = 1;
          break;
        }
      }
    }
    r || (this.remove(c), g--, m = g > h ? g : h, c--);
  }
  return this;
};
function Q(a, b, c, d) {
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
  if ("number" === typeof b) {
    c = b, b = null, d = 1;
  } else if (c || 0 === c) {
    d = 1;
  }
  const e = a.length;
  for (let k = 0; k < e; k++) {
    this.add(a[k], b, d ? c++ : null);
  }
  return this;
};
l.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
l.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a - 1));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, k = this.on.remove;
  for (let f = 0, h; f < b; f++) {
    h = a[d ? b - f - 1 : f], c && h.remove(), e && P(this, h), k && k(h);
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
function P(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.l[c] = null;
  }
  if (a.pool) {
    if (a.key) {
      if (!0 === a.pool || a.u < a.pool) {
        a.s[c] = b, a.u++;
      }
    } else {
      if (c = a.A.length, !0 === a.pool || c < a.pool) {
        a.A[c] = b;
      }
    }
  }
}
l.destroy = function() {
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], M[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.l = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.s = this.A = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.j = null;
};
const S = Array.prototype, T = window.Proxy;
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
  if (T) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:S.splice.bind(this), pop:S.pop.bind(this), shift:S.shift.bind(this), unshift:S.unshift.bind(this), push:S.push.bind(this)};
    return new Proxy(this, ja);
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
    "number" === typeof a && (a === this.length && this.define(a + 1), ja.set(this, a, b));
  }});
  return this;
};
const ja = {set:function(a, b, c) {
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
      var k = a.length;
      if (d) {
        V(e);
        const f = e.length;
        k !== f && (a.length = f);
        b >= f ? (e.add(c), a.length++) : b < f && (k = e.g[b], e.recycle || e.key && k._mkk === c[e.key] ? e.update(k, c, null, b) : e.replace(k, c, null, b));
      } else {
        "length" === b && c < k && e.remove(c, k - c);
      }
    }
    U = !1;
  }
  d && e.proxy && !c._mkx && (c = O.call(e, e.g[b], c));
  (T ? a : a.i)[b] = c;
  return !0;
}};
l = N.prototype;
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
  T && this.length++;
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
l.sort = S.sort;
l.reverse = S.reverse;
l.slice = S.slice;
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
  for (let e = 0, k = this.length; e < k; e++) {
    a(this[e]) ? d && (this.splice(c, d), k -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
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
const W = document.createElement("div"), ka = document.createTextNode(""), X = document.createElement("div");
W.appendChild(ka);
const la = /[^;:]+/g, ma = /[^ ]+/g;
function na(a, b, c, d) {
  let e;
  d || (d = a._mkc) ? e = d["_a" + b] : a._mkc = d = {};
  e !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function oa(a, b, c) {
  let d;
  c || (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  !1 !== d && (c["_a" + b] = !1, a.removeAttribute(b));
}
function pa(a, b) {
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
    for (a = c.match(ma), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function qa(a, b, c) {
  c = c || Y(a);
  c[b] || (c[b] = 1, a.classList.add(b));
}
function ra(a, b, c) {
  c = c || Y(a);
  0 !== c[b] && (c[b] = 0, a.classList.remove(b));
}
function sa(a, b, c, d) {
  d = d || Y(a);
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function ta(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(la), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
function ua(a, b, c, d, e) {
  e = e || ta(a);
  e[b] !== c && (e[b] = c, (d || a.style).setProperty(b, c));
}
;E.register = function(a, b) {
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
  d !== b && (c._c = b, a.className = b);
};
E.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c;
};
E.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
E.toggleClass = sa;
E.toggleClasses = function(a, b) {
  const c = Y(a);
  if (b.constructor === Array) {
    for (var d = 0; d < b.length; d++) {
      sa(a, b[d], void 0, c);
    }
  } else {
    for (d in b) {
      sa(a, d, b[d], c);
    }
  }
};
E.removeClass = ra;
E.removeClasses = function(a, b) {
  const c = Y(a);
  for (let d = 0; d < b.length; d++) {
    ra(a, b[d], c);
  }
};
E.addClass = qa;
E.addClasses = function(a, b) {
  const c = Y(a);
  for (let d = 0; d < b.length; d++) {
    qa(a, b[d], c);
  }
};
E.setAttribute = na;
E.setAttributes = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  for (let d in b) {
    na(a, d, b[d], c);
  }
};
E.getAttribute = pa;
E.hasAttribute = function(a, b) {
  a = pa(a, b);
  return !(!a && "" !== a);
};
E.removeAttribute = oa;
E.removeAttributes = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  for (let d = 0; d < b.length; d++) {
    oa(a, b[d], c);
  }
};
E.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
E.setStyle = ua;
E.setStyles = function(a, b) {
  const c = ta(a), d = a.style;
  for (let e in b) {
    ua(a, e, b[e], d, c);
  }
};
E.escape = function(a) {
  W.i !== a && (ka.nodeValue = a, W.h = W.innerHTML, W.i = a);
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
  u[a].call(b || this, c || window.event);
  return this;
};
E.prototype.listen = E.listen = ca;
E.prototype.unlisten = E.unlisten = function(a, b) {
  n[a] && (F(0, a, C, b), n[a] = 0);
  return this;
};
E.Array = N;
const Z = window;
let va;
(va = Z.define) && va.amd ? va([], function() {
  return E;
}) : "object" === typeof Z.exports ? Z.module.exports = E : Z.Mikado = E;
}).call(this);