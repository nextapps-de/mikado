/**!
 * Mikado.js v0.8.212 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var f;
function n(a) {
  const b = window.profiler || (window.profiler = {});
  b[a] || (b[a] = 0);
  b[a]++;
}
;const p = {}, x = {}, A = Object.create(null), B = Object.create(null), aa = document.documentElement || document.body.parentNode, C = "ontouchstart" in window, D = !C && window.PointerEvent && navigator.maxTouchPoints;
let ba;
function F(a, b) {
  n("event.trigger");
  b || (b = a.type);
  const c = a.target, d = G.eventCache;
  var e = G.eventBubble;
  let h;
  d && (h = c["_mke" + b]);
  if ("undefined" === typeof h) {
    for (var g = c; g && g !== aa;) {
      n("event.bubble");
      var k = void 0;
      "click" === b && ba && (k = g.getAttribute("tap"));
      k || (k = g.getAttribute(b));
      if (k) {
        var l = k.indexOf(":"), m = g;
        if (-1 < l) {
          const r = k.substring(0, l);
          l = k.substring(l + 1);
          for (k = ""; (m = m.parentElement) !== aa;) {
            if (n("event.bubble"), m.hasAttribute(l)) {
              k = r;
              break;
            }
          }
          k || console.warn("Event root '" + l + "' was not found for the event: '" + r + "'.");
        }
        if (k && (h || (h = [], d && (c["_mke" + b] = h)), h.push([k, m]), m = B[k], !e || m && (m.stop || m.cancel))) {
          break;
        }
      }
      g = g.parentElement;
    }
    d && (h || (c["_mke" + b] = null));
  } else {
    n("event.cache");
  }
  if (h) {
    for (let r = 0, q; r < h.length; r++) {
      if (q = h[r], e = q[0], g = A[e]) {
        k = q[1];
        if (m = B[e]) {
          m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (A[e] = null, d && (c["_mke" + b] = null));
        }
        n("route.call");
        g(k, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  p[a] || (n("event.listen"), H(1, a, F, b), p[a] = 1, x[a] = b || null);
  return this;
}
let I, J, da;
if (C || D) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    I = e.clientX;
    J = e.clientY;
  }
  function b(d) {
    const e = I, h = J;
    var g = d, k = d.changedTouches;
    k && (g = k[0]);
    I = g.clientX;
    J = g.clientY;
    15 > Math.abs(I - e) && 15 > Math.abs(J - h) && F(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    H(d, D ? "pointerdown" : "touchstart", a, c);
    H(d, D ? "pointerup" : "touchend", b, c);
  };
}
function H(a, b, c, d) {
  n(a ? "event.register" : "event.unregister");
  if ("tap" === b) {
    if (C || D) {
      da(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function K(a, b, c) {
  n("factory.path");
  const d = b.length, e = [], h = {};
  for (let l = 0, m, r, q, u, t, w = null; l < d; l++) {
    m = b[l];
    if (r = m.v) {
      if (u = q = h[r], !u) {
        let v = void 0;
        var g = a, k = r;
        n("factory.resolve");
        for (let E = 0, z = k.length, y = ""; E < z; E++) {
          const R = k[E];
          y += R;
          h[y] ? g = h[y] : (">" === R ? g = g.firstChild : "|" === R ? (v = g, g = g.firstChild) : "@" === R ? (v = g, g = g.style) : g = g.nextSibling, h[y] = g);
        }
        q = [g, v];
        u = q[0];
        q = q[1] || u;
      }
    } else {
      u = q = a;
    }
    c && t !== q && (t = q, q._mkc = w = {});
    n("cache.create");
    e[l] = new L(w, u, "");
  }
  return a._mkp = e;
}
function M(a, b, c, d, e, h) {
  n("factory.construct");
  h || (a.m = 1);
  const g = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let k, l;
  if (l = b.class) {
    "object" === typeof l ? (n("cache.create"), c.push(new L(k = {_c:""}, g, d)), (l = l[0]) ? N(a, l, ["_c", c.length - 1]) : a.m = 0) : e || (g.className = l);
  }
  if (l = b.attr) {
    for (const r in l) {
      let q = l[r];
      "object" === typeof q ? (n("cache.create"), k || c.push(new L(k = {}, g, d)), k["_a" + r] = !1, (q = q[0]) ? N(a, q, ["_a", c.length - 1, r]) : a.m = 0) : e || g.setAttribute(r, q);
    }
  }
  if (l = b.event) {
    for (const r in l) {
      e || g.setAttribute(r, l[r]), ca(r);
    }
  }
  if (l = b.style) {
    "object" === typeof l ? (n("cache.create"), c.push(new L(k || (k = {}), g.style, d + "@")), k._s = "", (l = l[0]) ? N(a, l, ["_s", c.length - 1]) : a.m = 0) : e || (g.style.cssText = l);
  }
  if (l = b.text) {
    if ("object" === typeof l) {
      var m = g;
      l = l[0];
      b.tag ? (d += "|", m = !e && g.firstChild, m || (m = document.createTextNode(l), g.appendChild(m))) : k = {};
      (k || (k = {}))._t = l;
      n("cache.create");
      c.push(new L(k, m, d));
      l ? N(a, l, ["_t", c.length - 1]) : a.m = 0;
    } else {
      e || (b.tag ? g.textContent = l : g.nodeValue = l);
    }
  } else if (l = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    l.constructor !== Array && (l = [l]);
    for (let r = 0, q, u = l.length; r < u; r++) {
      if (q = l[r], d = r ? d + "+" : d + ">", b = M(a, q, c, d, e, 1), e) {
        if (r < u - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        g.appendChild(b);
      }
    }
  } else if (l = b.html) {
    "object" === typeof l ? (n("cache.create"), k || c.push(new L(k = {}, g, d)), k._h = "", (l = l[0]) ? N(a, l, ["_h", c.length - 1]) : a.m = 0) : e || (g.innerHTML = l);
  } else if (l = b.inc) {
    n("cache.create");
    n("template.include");
    k || c.push(new L(null, g, d));
    if ("string" === typeof l) {
      m = O[l];
      if (!m) {
        throw Error("The partial template '" + l + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(m instanceof G)) {
        d = m[0];
        if (b = m[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        O[l] = m = new G(d, b);
      }
    } else if (1 !== l) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      m = new G({name:a.name + "|" + d, tpl:l, key:l.key, cache:l.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:g, hydrate:!!e});
    }
    1 !== l && a.inc.push(m);
  }
  k && (g._mkc = k);
  h || (g._mkp = c);
  return g;
}
function N(a, b, c) {
  n("proxy.init");
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function L(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
f = L.prototype;
f._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      n("cache.match");
      return;
    }
    n("cache.miss");
    n("cache.attr");
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
f._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      n("cache.match");
      return;
    }
    n("cache.miss");
    n("cache.text");
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
f._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      n("cache.match");
      return;
    }
    n("cache.miss");
    n("cache.class");
    this.c._c = a;
  }
  this.n.className = a;
};
f._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      n("cache.match");
      return;
    }
    n("cache.miss");
    n("cache.style");
    this.c._s = a;
  }
  this.n.cssText = a;
};
f._h = function(a) {
  if (this.c) {
    if (this.c._h === a) {
      n("cache.match");
      return;
    }
    n("cache.miss");
    n("cache.html");
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
const fa = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (const d in b) {
      this.h(b, d, b[d]);
    }
    b._mkx = this;
    return b;
  }
  a.prototype.h = function(b, c, d) {
    n("proxy.define");
    const e = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(h) {
      ea(e, d = h, c);
    }});
  };
  return a;
}();
function ha(a, b) {
  n("proxy.read");
  return "_mkx" === b ? this : a[b];
}
function ia(a, b, c) {
  n("proxy.write");
  ea(this, c, b);
  a[b] = c;
  return !0;
}
function ea(a, b, c) {
  if (c = a.fn[c]) {
    for (let d = 0; d < c.length; d++) {
      const e = c[d], h = e[0], g = a.path[e[1]];
      g.c && g.c[h + (e[2] || "")] === b ? n("cache.match") : (n("cache.miss"), g[h](e[2] || b, b));
    }
  }
}
;const O = Object.create(null);
function G(a, b = {}) {
  if (!(this instanceof G)) {
    return new G(a, b);
  }
  n("mikado.new");
  if ("string" === typeof a) {
    var c = O[a];
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
  this.g = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.shadow = b.shadow || !!a.cmp;
  this.key = a.key || "";
  this.o = {};
  c = a.fn;
  a.B || c && (a.B = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.A = [];
  this.l = new Map();
  this.cache = a.cache || !!b.cache;
  this.async = !!b.async;
  this.s = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.m = 0;
  (a = b.observe) && (new P(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.j = null;
}
f = G.prototype;
f.mount = function(a, b) {
  n("view.mount");
  if (!a) {
    throw Error("No target was passed to .mount()");
  }
  this.s && this.cancel();
  if (this.shadow) {
    var c = this.tpl.cmp;
    a = a.shadowRoot || a.attachShadow({mode:"open"});
    if (c && c.length) {
      var d = a.lastElementChild;
      if (d) {
        a = d;
      } else {
        c.push({tag:"root"});
        for (let h = 0, g; h < c.length; h++) {
          g = M(this, c[h], [], ""), a.append(g), h === c.length - 1 && (a = g);
        }
      }
    }
  }
  c = a._mki;
  d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.g = a._mkd;
    this.length = this.g.length;
  } else if (c) {
    n("mikado.unmount");
    c.clear();
    a._mkd = this.g = [];
    this.length = 0;
    a.firstChild && (n("mount.reset"), a.textContent = "");
    var e = this.on && this.on.unmount;
    e && e(a, c);
  } else {
    if (b) {
      e = a.children;
      n("collection_to_array");
      const h = e.length, g = Array(h);
      for (let k = 0; k < h; k++) {
        g[k] = e[k];
      }
      this.g = g;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (n("mount.reset"), a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.o), c === this) {
      this.o = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let h = 0, g, k; h < this.length; h++) {
          g = this.g[h], k = g.getAttribute("key"), g._mkk = k, d[k] = g;
        }
      }
      a._mkl = this.o = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.j || (b && this.length && (this.j = this.g[0].cloneNode(!0), M(this, this.tpl.tpl, [], "", this.j) && Q(this)), this.tpl && (this.j = M(this, this.tpl.tpl, [], ""), Q(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function Q(a) {
  a.tpl.B && (a.tpl.fn = a.tpl.B, a.tpl.B = null);
  a.tpl = null;
}
function ja(a, b, c, d, e) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  var h;
  if ("function" === typeof c || !0 === c) {
    e = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    e = d, d = null;
  }
  if (e) {
    return new Promise(function(k) {
      requestAnimationFrame(function() {
        ja(a, b, c, d);
        "function" === typeof e && e();
        k();
      });
    });
  }
  n("mikado.once");
  var g = (h = b.cmp) && h.length;
  h && !g && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || g || b.fn) {
    h = new G(b);
    g && (a = h.mount(a).root);
    if (c && Array.isArray(c)) {
      for (g = 0; g < c.length; g++) {
        a.append(h.create(c[g], d, g));
      }
    } else {
      a.append(h.create(c, d));
    }
    h.destroy();
  } else {
    h = M({}, b.tpl, [], "", null, 1), a.append(h);
  }
  return G;
}
f.render = function(a, b, c, d) {
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
      const l = this;
      e || (e = "function" === typeof c);
      l.s = requestAnimationFrame(function() {
        l.s = 0;
        l.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(m) {
        c = m;
      });
    }
  }
  n("view.render");
  var h = this.length;
  if (!a) {
    return this.apply ? console.warn("When calling .render() by passing no data nothing will happen!") : this.g[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof P) {
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
  const g = this.key;
  !h || g || this.recycle || (this.remove(0, h), h = 0);
  let k = h < d ? h : d;
  e = 0;
  if (e < k) {
    for (let l, m; e < k; e++) {
      l = this.g[e];
      m = a[e];
      if (g && l._mkk !== m[g]) {
        return ka(this, a, b, e);
      }
      this.update(l, m, b, e, 1);
      this.proxy && !m._mkx && (a[e] = S(this, l, m));
    }
  }
  if (e < d) {
    for (; e < d; e++) {
      h = a[e], this.add(h, b), !this.proxy || this.recycle && h._mkx || (a[e] = S(this, this.g[e], h));
    }
  } else {
    d < h && this.remove(d, h - d);
  }
  return this;
};
f.replace = function(a, b, c, d) {
  n("view.replace");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var h = b[this.key];
    if (e = this.o[h]) {
      if (e !== a) {
        var g = this.index(e);
        this.g[d] = e;
        this.g[g] = a;
        h = g < d ? e : a;
        g = g < d ? a : e;
        const k = h.nextElementSibling;
        this.root.insertBefore(h, g);
        k !== g && this.root.insertBefore(g, k);
      }
    } else {
      this.pool && (e = this.l.get(h)) && (this.l.delete(h), la(this, a), this.g[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.m && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || K(e, this.j._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && la(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
f.update = function(a, b, c, d) {
  n("view.update");
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.m && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.g[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || K(a, this.j._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
f.cancel = function() {
  n("view.cancel");
  cancelAnimationFrame(this.s);
  this.s = 0;
  return this;
};
f.create = function(a, b, c, d) {
  n("view.create");
  let e = this.key;
  const h = e && a[e];
  let g, k, l, m;
  e && this.pool && (k = this.l) && (g = k.get(h)) ? (n("pool.out"), m = 1, k.delete(h)) : (!e || this.recycle) && this.pool && (k = this.A) && k.length ? (n("pool.out"), g = k.pop()) : (g = l = this.j, l || (this.j = g = l = M(this, this.tpl.tpl, [], ""), Q(this)));
  this.apply && this.apply(a, b || this.state, c, g._mkp || K(g, this.j._mkp, !!l || this.cache));
  l && (n("factory.clone"), g = g.cloneNode(!0));
  e && (m || (g._mkk = h), d && (this.o[h] = g));
  (a = this.on && this.on[l ? "create" : "recycle"]) && a(g, this);
  return g;
};
f.add = function(a, b, c) {
  n("view.add");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), ma(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function S(a, b, c) {
  n("proxy.apply");
  {
    b = b._mkp || K(b, a.j._mkp, a.cache);
    a = a.proxy;
    n("proxy.create");
    const d = c._mkx;
    d ? d.path = b : (n("proxy.new"), c = new fa(c, {path:b, fn:a, get:ha, set:ia}));
  }
  return c;
}
function ka(a, b, c, d) {
  n("view.reconcile");
  const e = a.g, h = a.o, g = a.key;
  let k = b.length, l = e.length, m = l > k ? l : k, r = 0;
  for (d || (d = 0); d < m; d++) {
    var q = void 0;
    if (d < k) {
      var u = b[d], t = d >= l;
      let w, v, E;
      a.proxy && !u._mkx && (b[d] = S(a, e[d], u));
      if (!t && (w = e[d], v = u[g], E = w._mkk, E === v)) {
        a.update(w, u, c, d, 1);
        continue;
      }
      if (t || !h[v]) {
        t || !a.pool ? (l++, m = l > k ? l : k, a.add(u, c, d)) : a.replace(w, u, c, d);
        continue;
      }
      let z, y;
      for (t = d + 1; t < m; t++) {
        if (!z && t < l && e[t]._mkk === v && (z = t + 1), !y && t < k && b[t][g] === E && (y = t + 1), z && y) {
          z >= y ? (q = e[z - 1], a.root.insertBefore(q, w), a.update(q, u, c, d, 1), z === y ? (1 < t - d && a.root.insertBefore(w, e[z]), e[d] = e[t], (e[t] = w) || console.error("Error"), n("view.reconcile.steps")) : (ma(e, z - 1, d), r++)) : (u = y - 1 + r, a.root.insertBefore(w, e[u] || null), ma(e, d, (u > l ? l : u) - 1), r--, d--);
          n("view.reconcile.steps");
          q = 1;
          break;
        }
      }
    }
    q || (a.remove(d), l--, m = l > k ? l : k, d--);
  }
  return a;
}
function ma(a, b, c, d) {
  n("splice");
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
f.append = function(a, b, c) {
  n("view.append");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let h = 0; h < e; h++) {
    this.add(a[h], b, d ? c++ : null);
  }
  return this;
};
f.clear = function() {
  n("view.clear");
  this.length && this.remove(0, this.length);
  return this;
};
f.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, h = this.on && this.on.remove;
  for (let g = 0, k; g < b; g++) {
    n("view.remove"), k = a[d ? b - g - 1 : g], c && k.remove(), e && la(this, k), h && h(k, this);
  }
  this.length = c;
  return this;
};
f.index = function(a) {
  n("view.index");
  return this.g.indexOf(a);
};
f.node = function(a) {
  n("view.node");
  return this.g[a];
};
function la(a, b) {
  n("view.checkout");
  if (a.key) {
    var c = b._mkk;
    a.o[c] = null;
  }
  if (a.pool) {
    if (c) {
      n("pool.in"), a.l.set(c, b), !0 !== a.pool && a.l.size > a.pool && (n("pool.resize"), a.l.delete(a.l.keys().next().value));
    } else {
      if (c = a.A.length, !0 === a.pool || c < a.pool) {
        n("pool.in"), a.A[c] = b;
      }
    }
  }
}
f.flush = function() {
  n("view.flush");
  this.A = [];
  this.l = new Map();
  return this;
};
f.destroy = function() {
  n("view.destroy");
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], O[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.o = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.l = this.A = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.j = null;
};
const T = Array.prototype, na = window.Proxy;
let U = !1;
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
  n("observer.create");
  this.h = null;
  const b = a ? a.length : 0;
  if (na) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, oa);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    pa(this, a);
  }
  pa(this, "length");
}
P.prototype.mount = function(a) {
  n("observer.mount");
  this.h = a;
  return this;
};
function pa(a, b) {
  n("observer.define");
  Object.defineProperty(a, b, {get:function() {
    return this.i[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && pa(this, b + 1), oa.set(this, b, c));
  }});
}
const oa = {set:function(a, b, c) {
  n("observer.write");
  let d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  const e = a.h;
  if (!U) {
    U = !0;
    if (e) {
      var h = a.length;
      if (d) {
        V(e);
        const g = e.length;
        h !== g && (a.length = g);
        b >= g ? (e.add(c), a.length++) : b < g && (h = e.g[b], e.recycle || e.key && h._mkk === c[e.key] ? e.update(h, c, null, b) : e.replace(h, c, null, b));
      } else {
        "length" === b && c < h && e.remove(c, h - c);
      }
    }
    U = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = S(e, e.g[b], c));
  (na ? a : a.i)[b] = c;
  return !0;
}, get:function(a, b) {
  n("observer.read");
  return a[b];
}};
f = P.prototype;
f.swap = function(a, b) {
  n("observer.swap");
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
f.set = function(a) {
  n("observer.set");
  this.splice();
  return this.concat(a);
};
f.splice = function(a, b, c) {
  n("observer.splice");
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
f.push = function(a) {
  n("observer.push");
  V(this.h);
  U = !0;
  this.h.add(a);
  this[this.length] = a;
  na && this.length++;
  U = !1;
};
f.unshift = function(a) {
  n("observer.unshift");
  V(this.h);
  U = !0;
  this.h.add(a, 0);
  this.i.unshift(a);
  U = !1;
};
f.pop = function() {
  n("observer.pop");
  V(this.h);
  U = !0;
  this.h.remove(this.length - 1);
  const a = this.i.pop();
  U = !1;
  return a;
};
f.shift = function() {
  n("observer.shift");
  V(this.h);
  U = !0;
  this.h.remove(0);
  const a = this.i.shift();
  U = !1;
  return a;
};
f.concat = function(a) {
  n("observer.concat");
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
f.sort = T.sort;
f.reverse = T.reverse;
f.slice = T.slice;
f.map = function(a, b) {
  n("observer.map");
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
f.filter = function(a, b) {
  n("observer.filter");
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, h = this.length; e < h; e++) {
    a(this[e]) ? d && (this.splice(c, d), h -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
f.indexOf = function(a) {
  n("observer.indexOf");
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
f.lastIndexOf = function(a) {
  n("observer.lastIndexOf");
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
f.forEach = function(a) {
  n("observer.forEach");
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
const W = document.createElement("div"), qa = document.createTextNode(""), X = document.createElement("div");
W.appendChild(qa);
f = G.prototype;
f.move = G.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.g[c]) : c = this.index(a);
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
f.shift = function(a, b) {
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
    const e = this.g[b], h = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.g[b + 1] || null);
    if (h) {
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
f.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
f.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
f.first = function(a) {
  return this.shift(a, -this.length);
};
f.last = function(a) {
  return this.shift(a, this.length);
};
f.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
f.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
f.swap = function(a, b) {
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
const ra = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1};
let sa = 0, ta = 0;
function ua(a, b, c, d, e, h) {
  sa || (sa = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(w) {
      const v = ua(a);
      "function" === typeof b && b(v);
      w(v);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1});
  const g = h ? {} : {tpl:{}}, k = h ? g : g.tpl;
  if (!h) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var l = document.createElement("div");
        l.innerHTML = a;
        a = l.firstElementChild;
      } else {
        g.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (g.name || (g.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  l = a.tagName;
  if (!l || "SCRIPT" === l) {
    var m;
    if ((m = (l ? a.firstChild : a).nodeValue) && m && m.trim()) {
      if (m.includes("{{@")) {
        var r = m.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        m = /{{[\s\S]+}}/.test(r) ? r.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        r && (r = r.replace(/{{([\s\S]+)}}/g, ""));
        r && d.push(r);
        if ("SCRIPT" === l) {
          return m.trim() && (k.text = m, k.tag = l), k;
        }
      }
      m && m.trim() && (/{{[!?]?#/.test(m) ? va(k, "html", m, !1, null, e, d) : (e.count++, va(k, "text", m, !1, null, e, d)));
    }
    if (!l) {
      return m && m.trim() ? k : null;
    }
  }
  l && (k.tag = l);
  if ((m = a.attributes) && m.length) {
    l = {};
    for (r = 0; r < m.length; r++) {
      let w = m[r].nodeName, v = a.getAttribute(w);
      "include" === w && (w = "inc");
      l[w] = v;
    }
    m = l;
    for (var q in m) {
      l = m[q];
      var u = void 0, t = void 0;
      switch(q) {
        case "class":
        case "style":
          u = q;
          break;
        case "include":
          q = "inc";
        case "inc":
          u = q;
          break;
        case "if":
          u = q;
          break;
        case "foreach":
          u = q = "for";
          break;
        case "js":
          break;
        case "key":
          g.key = l.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          ra[q] ? t = k.event || (k.event = {}) : (h || "id" !== q && "name" !== q || g.name || /{{[\s\S]+}}/.test(l) || (g.name = l), t = k.attr || (k.attr = {})), u = q;
      }
      u && va(t || k, u, l, !!t, m, e, d);
    }
  }
  q = (a.content || a).childNodes;
  u = q.length;
  e.u && (e.u = !1, e.inc++, d = [], (k.for || k.if) && c.unshift(d), k.child || (k.child = k.text ? {text:k.text} : k.html ? {html:k.html} : null), u ? (d.root = k, d.inc = k.child || (k.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1}) : d.inc = k.inc, delete k.for, delete k.if, delete k.text, delete k.html);
  if (u) {
    for (let w = 0, v; w < u; w++) {
      if (v = q[w], 8 !== v.nodeType && (e.count++, t = ua(v, null, c, d, e, 1))) {
        1 !== u || 3 !== v.nodeType && t.text || k.js && t.js ? (t.text || t.tag) && (k.child || (k.child = [])).push(t) : (t.js && (k.js = t.js), t.html && (k.html = t.html), t.text && (k.text = t.text));
      }
    }
    k.child && 1 === k.child.length && (k.child = k.child[0]);
  }
  if (!h) {
    g.name || (g.name = "tpl-" + ta++);
    if ("COMPONENT" === k.tag) {
      d = k.child;
      e = [];
      for (let w = 0, v; w < d.length; w++) {
        v = d[w], "TEMPLATE" === v.tag ? (d = h = v.child.length ? v.child[0] : v.child, v.name && (h.name = v.name), v.id && (h.id = v.id), v.key && (h.key = v.key), v.cache && (h.cache = v.cache)) : e.push(v);
      }
      g.tpl = d;
      g.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
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
function va(a, b, c, d, e, h, g) {
  if (/{{[\s\S]+}}/.test(c)) {
    let k = /{{([!?#]+)?=/.test(c), l = /{{!?\?/.test(c), m = /{{\??!/.test(c);
    c = c.replace(/\x3c!--(.*?)--\x3e/g, "");
    if (k) {
      if (l || m) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      k = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/['"]\)\+''\+\(['"]/g, "").replace(/['"](\s+)?\+(\s+)?['"]/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    l && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" === b && a.tag && h.count++;
    "style" === b && a.tag && h.count++;
    h.count !== h.last && (h.current++, h.last = h.count, g.push("_o=_p[" + h.current + "]"));
    g.push("_v=" + c);
    d ? g.push('if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? g.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? g.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? g.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && g.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = k ? [k] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || h.u || (h.count !== h.last && (h.current++, h.last = h.count, g.push("_o=_p[" + h.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = h.inc, e.if ? g.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? g.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : g.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), h.u = !0);
}
;const wa = /[^;:]+/g, xa = /[ ]+/g;
function ya(a, b, c, d) {
  d["_a" + b] !== c ? (n("cache.miss"), n("cache.attr"), d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b)) : n("cache.match");
}
function za(a, b, c) {
  !1 !== c["_a" + b] ? (n("cache.miss"), n("cache.attr"), c["_a" + b] = !1, a.removeAttribute(b)) : n("cache.match");
}
function Aa(a, b) {
  let c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d ? (n("cache.miss"), n("cache.attr"), c["_a" + b] = d = a.getAttribute(b)) : n("cache.match");
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
    for (n("cache.transform"), a = c.split(xa), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function Ba(a, b, c) {
  c[b] ? n("cache.match") : (n("cache.miss"), n("cache.class"), c[b] = 1, a.classList.add(b));
}
function Ca(a, b, c) {
  0 !== c[b] ? (n("cache.miss"), n("cache.class"), c[b] = 0, a.classList.remove(b)) : n("cache.match");
}
function Da(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c ? (n("cache.miss"), n("cache.class"), d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b)) : n("cache.match");
}
function Ea(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (n("cache.transform"), a = c.match(wa), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
function Fa(a, b, c, d, e) {
  e[b] !== c ? (n("cache.miss"), n("cache.style"), e[b] = c, (d || a.style).setProperty(b, c)) : n("cache.match");
}
;G.once = ja;
G.register = function(a, b) {
  n("mikado.register");
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = O[c], a instanceof G || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  O[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  O[c] = [a, b];
  return G;
};
G.unregister = function(a) {
  n("mikado.unregister");
  "object" === typeof a && (a = a.name);
  const b = O[a];
  b && (b instanceof G && b.destroy(), O[a] = null);
  return G;
};
G.compile = ua;
G.setText = function(a, b) {
  let c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b ? (n("cache.miss"), n("cache.text"), c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b) : n("cache.match");
};
G.getText = function(a) {
  let b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d ? (n("cache.miss"), n("cache.text"), 3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent) : n("cache.match");
  return d;
};
G.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b ? (n("cache.miss"), n("cache.html"), a.innerHTML = b, c._h = b, c._t = null) : n("cache.match");
};
G.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c ? (n("cache.miss"), n("cache.html"), b._h = c = a.innerHTML) : n("cache.match");
  return c;
};
G.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b ? (n("cache.miss"), n("cache.class"), c._c = b, a.className = b) : n("cache.match");
};
G.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c ? (n("cache.miss"), n("cache.class"), b._c = c = a.className) : n("cache.match");
  return c.split(xa);
};
G.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d ? (n("cache.miss"), n("cache.class"), c[b] = d = a.classList.contains(b) ? 1 : 0) : n("cache.match");
  return !!d;
};
G.toggleClass = function(a, b, c) {
  const d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        Da(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        Da(a, e, b[e], d);
      }
    }
  } else {
    Da(a, b, c, d);
  }
};
G.removeClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      Ca(a, b[d], c);
    }
  } else {
    Ca(a, b, c);
  }
};
G.addClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      Ba(a, b[d], c);
    }
  } else {
    Ba(a, b, c);
  }
};
G.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      ya(a, e, b[e], d);
    }
  } else {
    ya(a, b, c, d);
  }
};
G.getAttribute = Aa;
G.hasAttribute = function(a, b) {
  a = Aa(a, b);
  return !(!a && "" !== a);
};
G.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      za(a, b[d], c);
    }
  } else {
    za(a, b, c);
  }
};
G.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b ? (n("cache.miss"), n("cache.style"), c._s = b, a.style.cssText = b) : n("cache.match");
};
G.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c ? (n("cache.miss"), n("cache.css"), b._s = c = a.style.cssText) : n("cache.match");
  return c;
};
G.getStyle = function(a, b) {
  const c = Ea(a);
  let d = c[b];
  "string" !== typeof d ? (n("cache.miss"), n("cache.style"), c[b] = d = a.style.getPropertyValue(b)) : n("cache.match");
  return d;
};
G.setStyle = function(a, b, c) {
  const d = Ea(a), e = a.style;
  if ("object" === typeof b) {
    for (const h in b) {
      Fa(a, h, b[h], e, d);
    }
  } else {
    Fa(a, b, c, e, d);
  }
};
G.escape = function(a) {
  W.i !== a && (qa.nodeValue = a, W.h = W.innerHTML, W.i = a);
  return W.h;
};
G.sanitize = function(a) {
  X.h !== a && (X.innerHTML = a, X.h = a, X.i = X.textContent);
  return X.i;
};
G.prototype.route = G.route = function(a, b, c) {
  n("route.set");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  A[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  A[a] = b;
  c && (B[a] = c);
  return this;
};
G.prototype.dispatch = G.dispatch = function(a, b, c) {
  n("route.dispatch");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!A[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  A[a](b || this, c || window.event);
  return this;
};
G.prototype.listen = G.listen = ca;
G.prototype.unlisten = G.unlisten = function(a) {
  p[a] && (n("event.unlisten"), H(0, a, F, x[a]), p[a] = 0, x[a] = null);
  return this;
};
G.Array = P;
const Z = window;
let Ga;
(Ga = Z.define) && Ga.amd ? Ga([], function() {
  return G;
}) : "object" === typeof Z.exports ? Z.exports = G : Z.Mikado = G;
}).call(this);
