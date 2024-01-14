/**!
 * Mikado.js v0.8.218 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
const l = {}, u = {}, w = Object.create(null), y = Object.create(null), aa = document.documentElement || document.body.parentNode, z = "ontouchstart" in window, A = !z && window.PointerEvent && navigator.maxTouchPoints;
C.eventCache = !1;
C.eventBubble = !1;
let ba;
function D(a, b) {
  b || (b = a.type);
  const c = a.target, d = C.eventCache;
  var e = C.eventBubble;
  let f;
  d && (f = c["_mke" + b]);
  if ("undefined" === typeof f) {
    for (var g = c; g && g !== aa;) {
      var h = void 0;
      "click" === b && ba && (h = g.getAttribute("tap"));
      h || (h = g.getAttribute(b));
      if (h) {
        var k = h.indexOf(":"), m = g;
        if (-1 < k) {
          const p = h.substring(0, k);
          k = h.substring(k + 1);
          for (h = ""; (m = m.parentElement) !== aa;) {
            if (m.hasAttribute(k)) {
              h = p;
              break;
            }
          }
          h || console.warn("Event root '" + k + "' was not found for the event: '" + p + "'.");
        }
        if (h && (f || (f = [], d && (c["_mke" + b] = f)), f.push([h, m]), m = y[h], !e || m && (m.stop || m.cancel))) {
          break;
        }
      }
      g = g.parentElement;
    }
    d && (f || (c["_mke" + b] = null));
  }
  if (f) {
    for (let p = 0, n; p < f.length; p++) {
      if (n = f[p], e = n[0], g = w[e]) {
        h = n[1];
        if (m = y[e]) {
          m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (w[e] = null, d && (c["_mke" + b] = null));
        }
        g(h, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  l[a] || (E(1, a, D, b), l[a] = 1, u[a] = b || null);
  return this;
}
let F, G, da;
if (z || A) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    F = e.clientX;
    G = e.clientY;
  }
  function b(d) {
    const e = F, f = G;
    var g = d, h = d.changedTouches;
    h && (g = h[0]);
    F = g.clientX;
    G = g.clientY;
    15 > Math.abs(F - e) && 15 > Math.abs(G - f) && D(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    E(d, A ? "pointerdown" : "touchstart", a, c);
    E(d, A ? "pointerup" : "touchend", b, c);
  };
}
function E(a, b, c, d) {
  if ("tap" === b) {
    if (z || A) {
      da(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function H(a, b, c) {
  const d = b.length, e = [], f = {};
  for (let k = 0, m, p, n, q, t, v = null; k < d; k++) {
    m = b[k];
    if (p = m.v) {
      if (q = n = f[p], !q) {
        let r = void 0;
        var g = a, h = p;
        for (let x = 0, B = h.length, O = ""; x < B; x++) {
          const P = h[x];
          O += P;
          f[O] ? g = f[O] : (">" === P ? g = g.firstChild : "|" === P ? (r = g, g = g.firstChild) : "@" === P ? (r = g, g = g.style) : g = g.nextSibling, f[O] = g);
        }
        n = [g, r];
        q = n[0];
        n = n[1] || q;
      }
    } else {
      q = n = a;
    }
    c && t !== n && (t = n, n._mkc = v = {});
    e[k] = new I(v, q, "");
  }
  return a._mkp = e;
}
function J(a, b, c, d, e, f) {
  f || (a.fullproxy = 1);
  const g = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let h, k;
  if (k = b.class) {
    "object" === typeof k ? (c.push(new I(h = {_c:""}, g, d)), (k = k[0]) ? K(a, k, ["_c", c.length - 1]) : a.fullproxy = 0) : e || (g.className = k);
  }
  if (k = b.attr) {
    for (const p in k) {
      let n = k[p];
      "object" === typeof n ? (h || c.push(new I(h = {}, g, d)), h["_a" + p] = !1, (n = n[0]) ? K(a, n, ["_a", c.length - 1, p]) : a.fullproxy = 0) : e || g.setAttribute(p, n);
    }
  }
  if (k = b.event) {
    for (const p in k) {
      e || g.setAttribute(p, k[p]), ca(p);
    }
  }
  if (k = b.style) {
    "object" === typeof k ? (c.push(new I(h || (h = {}), g.style, d + "@")), h._s = "", (k = k[0]) ? K(a, k, ["_s", c.length - 1]) : a.fullproxy = 0) : e || (g.style.cssText = k);
  }
  if (k = b.text) {
    if ("object" === typeof k) {
      var m = g;
      k = k[0];
      b.tag ? (d += "|", m = !e && g.firstChild, m || (m = document.createTextNode(k), g.appendChild(m))) : h = {};
      (h || (h = {}))._t = k;
      c.push(new I(h, m, d));
      k ? K(a, k, ["_t", c.length - 1]) : a.fullproxy = 0;
    } else {
      e || (b.tag ? g.textContent = k : g.nodeValue = k);
    }
  } else if (k = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    k.constructor !== Array && (k = [k]);
    for (let p = 0, n, q = k.length; p < q; p++) {
      if (n = k[p], d = p ? d + "+" : d + ">", b = J(a, n, c, d, e, 1), e) {
        if (p < q - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        g.appendChild(b);
      }
    }
  } else if (k = b.html) {
    "object" === typeof k ? (h || c.push(new I(h = {}, g, d)), h._h = "", (k = k[0]) ? K(a, k, ["_h", c.length - 1]) : a.fullproxy = 0) : e || (g.innerHTML = k);
  } else if (k = b.inc) {
    h || c.push(new I(null, g, d));
    if ("string" === typeof k) {
      m = L[k];
      if (!m) {
        throw Error("The partial template '" + k + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(m instanceof C)) {
        d = m[0];
        if (b = m[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        L[k] = m = new C(d, b);
      }
    } else if (1 !== k) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      m = new C({name:a.name + "|" + d, tpl:k, key:k.key, cache:k.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:g, hydrate:!!e});
    }
    1 !== k && a.inc.push(m);
  }
  h && (g._mkc = h);
  f || (g._mkp = c);
  return g;
}
function K(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function I(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
I.prototype._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
I.prototype._t = function(a) {
  if (this.c) {
    if (this.c._t === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
I.prototype._c = function(a) {
  if (this.c) {
    if (this.c._c === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
I.prototype._s = function(a) {
  if (this.c) {
    if (this.c._s === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
I.prototype._h = function(a) {
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
    }, set:function(f) {
      ea(e, d = f, c);
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
      const e = c[d], f = e[0], g = a.path[e[1]];
      if (!g.c || g.c[f + (e[2] || "")] !== b) {
        g[f](e[2] || b, b);
      }
    }
  }
}
;const L = Object.create(null);
function C(a, b = {}) {
  if (!(this instanceof C)) {
    return new C(a, b);
  }
  if ("string" === typeof a) {
    var c = L[a];
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
  (a = b.observe) && (new M(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
C.prototype.mount = function(a, b) {
  if (!a) {
    throw Error("No target was passed to .mount()");
  }
  this.timer && this.cancel();
  if (this.shadow) {
    var c = this.tpl.cmp;
    a = a.shadowRoot || a.attachShadow({mode:"open"});
    if (c && c.length) {
      var d = a.lastElementChild;
      if (d) {
        a = d;
      } else {
        c.push({tag:"root"});
        for (let f = 0, g; f < c.length; f++) {
          g = J(this, c[f], [], ""), a.append(g), f === c.length - 1 && (a = g);
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
      const f = e.length, g = Array(f);
      for (let h = 0; h < f; h++) {
        g[h] = e[h];
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
        for (let f = 0, g, h; f < this.length; f++) {
          g = this.dom[f], h = g.getAttribute("key"), g._mkk = h, d[h] = g;
        }
      }
      a._mkl = this.live = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), J(this, this.tpl.tpl, [], "", this.factory) && N(this)), this.tpl && (this.factory = J(this, this.tpl.tpl, [], ""), N(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function N(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
function ja(a, b, c, d, e) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  var f;
  if ("function" === typeof c || !0 === c) {
    e = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    e = d, d = null;
  }
  if (e) {
    return new Promise(function(h) {
      requestAnimationFrame(function() {
        ja(a, b, c, d);
        "function" === typeof e && e();
        h();
      });
    });
  }
  var g = (f = b.cmp) && f.length;
  f && !g && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || g || b.fn) {
    f = new C(b);
    g && (a = f.mount(a).root);
    if (c && Array.isArray(c)) {
      for (g = 0; g < c.length; g++) {
        a.append(f.create(c[g], d, g));
      }
    } else {
      a.append(f.create(c, d));
    }
    f.destroy();
  } else {
    f = J({}, b.tpl, [], "", null, 1), a.append(f);
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
      const k = this;
      e || (e = "function" === typeof c);
      k.timer = requestAnimationFrame(function() {
        k.timer = 0;
        k.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(m) {
        c = m;
      });
    }
  }
  var f = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof M) {
    if (d = a.length, !d) {
      return this.remove(0, f);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  const g = this.key;
  !f || g || this.recycle || (this.remove(0, f), f = 0);
  let h = f < d ? f : d;
  e = 0;
  if (e < h) {
    for (let k, m; e < h; e++) {
      k = this.dom[e];
      m = a[e];
      if (g && k._mkk !== m[g]) {
        return this.reconcile(a, b, e);
      }
      this.update(k, m, b, e, 1);
      this.proxy && !m._mkx && (a[e] = Q(this, k, m));
    }
  }
  if (e < d) {
    for (; e < d; e++) {
      f = a[e], this.add(f, b), !this.proxy || this.recycle && f._mkx || (a[e] = Q(this, this.dom[e], f));
    }
  } else {
    d < f && this.remove(d, f - d);
  }
  return this;
};
C.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var f = b[this.key];
    if (e = this.live[f]) {
      if (e !== a) {
        f = this.index(e);
        const g = f < d ? e : a, h = f < d ? a : e;
        let k = this.dom[f < d ? f + 1 : d + 1];
        this.dom[d] = e;
        this.dom[f] = a;
        k !== h ? this.root.insertBefore(g, h) : k = g;
        this.root.insertBefore(h, k);
      }
    } else {
      this.pool && (e = this.pool_keyed.get(f)) && (this.pool_keyed.delete(f), this.checkout(a), this.dom[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.fullproxy && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || H(e, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
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
  this.apply(b, c || this.state, d, a._mkp || H(a, this.factory._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
C.prototype.cancel = function() {
  cancelAnimationFrame(this.timer);
  this.timer = 0;
  return this;
};
C.prototype.create = function(a, b, c, d) {
  let e = this.key;
  const f = e && a[e];
  let g, h, k, m;
  e && this.pool && (h = this.pool_keyed) && (g = h.get(f)) ? (m = 1, h.delete(f)) : (!e || this.recycle) && this.pool && (h = this.pool_shared) && h.length ? g = h.pop() : (g = k = this.factory, k || (this.factory = g = k = J(this, this.tpl.tpl, [], ""), N(this)));
  this.apply && this.apply(a, b || this.state, c, g._mkp || H(g, this.factory._mkp, !!k || this.cache));
  k && (g = g.cloneNode(!0));
  e && (m || (g._mkk = f), d && (this.live[f] = g));
  (a = this.on && this.on[k ? "create" : "recycle"]) && a(g, this);
  return g;
};
C.prototype.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), R(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function Q(a, b, c) {
  {
    b = b._mkp || H(b, a.factory._mkp, a.cache);
    a = a.proxy;
    const d = c._mkx;
    d ? d.path = b : c = new fa(c, {path:b, fn:a, get:ha, set:ia});
  }
  return c;
}
C.prototype.reconcile = function(a, b, c) {
  const d = this.dom, e = this.live, f = this.key;
  let g = a.length, h = d.length, k = h > g ? h : g, m = 0;
  for (c || (c = 0); c < k; c++) {
    var p = void 0;
    if (c < g) {
      var n = a[c], q = c >= h;
      let t, v, r;
      this.proxy && !n._mkx && (a[c] = Q(this, d[c], n));
      if (!q && (t = d[c], v = n[f], r = t._mkk, r === v)) {
        this.update(t, n, b, c, 1);
        continue;
      }
      if (q || !e[v]) {
        q || !this.pool ? (h++, k = h > g ? h : g, this.add(n, b, c)) : this.replace(t, n, b, c);
        continue;
      }
      let x, B;
      for (q = c + 1; q < k; q++) {
        if (!x && q < h && d[q]._mkk === v && (x = q + 1), !B && q < g && a[q][f] === r && (B = q + 1), x && B) {
          x >= B + m ? (p = d[x - 1], this.root.insertBefore(p, t), this.update(p, n, b, c, 1), x === B ? (1 < q - c && this.root.insertBefore(t, d[x]), d[c] = d[q], (d[q] = t) || console.error("reconcile.error 1")) : (x - 1 === c && console.error("reconcile.error 2"), R(d, x - 1, c), m++)) : (n = B - 1 + m, this.root.insertBefore(t, d[n] || null), (n > h ? h : n) - 1 === c && console.error("reconcile.error 3"), R(d, c, (n > h ? h : n) - 1), m--, c--);
          p = 1;
          break;
        }
      }
    }
    p || (this.remove(c), h--, k = h > g ? h : g, c--);
  }
  return this;
};
function R(a, b, c, d) {
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
C.prototype.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let f = 0; f < e; f++) {
    this.add(a[f], b, d ? c++ : null);
  }
  return this;
};
C.prototype.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
C.prototype.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root._mkd = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, f = this.on && this.on.remove;
  for (let g = 0, h; g < b; g++) {
    h = a[d ? b - g - 1 : g], c && h.remove(), e && this.checkout(h), f && f(h, this);
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
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], L[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
const S = Array.prototype, T = window.Proxy;
let U = !1;
function V(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function M(a) {
  if (a instanceof M) {
    return a;
  }
  if (!(this instanceof M)) {
    return new M(a);
  }
  this.mikado = null;
  const b = a ? a.length : 0;
  if (T) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:S.splice.bind(this), pop:S.pop.bind(this), shift:S.shift.bind(this), unshift:S.unshift.bind(this), push:S.push.bind(this)};
    return new Proxy(this, ka);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
M.prototype.mount = function(a) {
  this.mikado !== a && (this.mikado && a.mount(this.mikado.root), this.mikado = a);
  return this;
};
M.prototype.define = function(a) {
  Object.defineProperty(this, a, {get:function() {
    return this.proto[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), ka.set(this, a, b));
  }});
  return this;
};
const ka = {set:function(a, b, c) {
  let d;
  if ("number" === typeof b) {
    d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (d = !0);
  }
  e = a.mikado;
  if (!U) {
    U = !0;
    if (e) {
      var f = a.length;
      if (d) {
        V(e);
        const g = e.length;
        f !== g && (a.length = g);
        b >= g ? (e.add(c), a.length++) : b < g && (f = e.dom[b], e.recycle || e.key && f._mkk === c[e.key] ? e.update(f, c, null, b) : e.replace(f, c, null, b));
      } else {
        "length" === b && c < f && e.remove(c, f - c);
      }
    }
    U = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = Q(e, e.dom[b], c));
  (T ? a : a.proto)[b] = c;
  return !0;
}};
M.prototype.swap = function(a, b) {
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
M.prototype.set = function(a) {
  this.splice();
  return this.concat(a);
};
M.prototype.splice = function(a, b, c) {
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
M.prototype.push = function(a) {
  V(this.mikado);
  U = !0;
  this.mikado.add(a);
  this[this.length] = a;
  T && this.length++;
  U = !1;
};
M.prototype.unshift = function(a) {
  V(this.mikado);
  U = !0;
  this.mikado.add(a, 0);
  this.proto.unshift(a);
  U = !1;
};
M.prototype.pop = function() {
  V(this.mikado);
  U = !0;
  this.mikado.remove(this.length - 1);
  const a = this.proto.pop();
  U = !1;
  return a;
};
M.prototype.shift = function() {
  V(this.mikado);
  U = !0;
  this.mikado.remove(0);
  const a = this.proto.shift();
  U = !1;
  return a;
};
M.prototype.concat = function(a) {
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
M.prototype.sort = S.sort;
M.prototype.reverse = S.reverse;
M.prototype.slice = S.slice;
M.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
M.prototype.filter = function(a, b) {
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, f = this.length; e < f; e++) {
    a(this[e]) ? d && (this.splice(c, d), f -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
M.prototype.indexOf = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
M.prototype.lastIndexOf = function(a) {
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
M.prototype.includes = S.includes;
M.prototype.forEach = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
M.prototype.transaction = function(a) {
  V(this.mikado);
  U = !0;
  a();
  this.mikado.async ? this.mikado.render(this).then(function() {
    U = !1;
  }) : (this.mikado.render(this), U = !1);
  return this;
};
const W = document.createElement("div"), la = document.createTextNode(""), X = document.createElement("div");
W.appendChild(la);
C.prototype.move = C.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.dom[c]) : c = this.index(a);
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
  const d = 0 > b;
  if (d && c || !d && c < this.length - 1) {
    b = d ? Math.max(c + b, 0) : Math.min(c + b, this.length - 1);
    const e = this.dom[b], f = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.dom[b + 1] || null);
    if (f) {
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
    let c, d;
    "number" === typeof a ? (c = 0 > a ? this.length + a : a, a = this.dom[c]) : c = this.index(a);
    "number" === typeof b ? (d = 0 > b ? this.length + b : b, b = this.dom[d]) : d = this.index(b);
    const e = c + 1 !== d;
    this.root.insertBefore(e ? a : b, e ? b : a);
    e && d + 1 !== c && this.root.insertBefore(b, this.dom[c + 1] || null);
    this.dom[c] = b;
    this.dom[d] = a;
  }
  return this;
};
const ma = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1};
let na = 0, oa = 0;
function pa(a, b, c, d, e, f) {
  na || (na = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(v) {
      const r = pa(a);
      "function" === typeof b && b(r);
      v(r);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1});
  const g = f ? {} : {tpl:{}}, h = f ? g : g.tpl;
  if (!f) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var k = document.createElement("div");
        k.innerHTML = a;
        a = k.firstElementChild;
      } else {
        g.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (g.name || (g.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  k = a.tagName;
  if (!k || "SCRIPT" === k) {
    var m;
    if ((m = (k ? a.firstChild : a).nodeValue) && m && m.trim()) {
      if (m.includes("{{@")) {
        var p = m.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        m = /{{[\s\S]+}}/.test(p) ? p.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        p && (p = p.replace(/{{([\s\S]+)}}/g, ""));
        p && d.push(p);
        if ("SCRIPT" === k) {
          return m.trim() && (h.text = m, h.tag = k), h;
        }
      }
      m && m.trim() && (m.includes("{{#") ? qa(h, "html", m, !1, null, e, c, d) : (e.count++, qa(h, "text", m, !1, null, e, c, d)));
    }
    if (!k) {
      return m && m.trim() ? h : null;
    }
  }
  k && (h.tag = k);
  if ((m = a.attributes) && m.length) {
    k = {};
    for (p = 0; p < m.length; p++) {
      let v = m[p].nodeName, r = a.getAttribute(v);
      "include" === v && (v = "inc");
      k[v] = r;
    }
    m = k;
    for (var n in m) {
      k = m[n];
      var q = void 0, t = void 0;
      switch(n) {
        case "class":
        case "style":
          q = n;
          break;
        case "include":
          n = "inc";
        case "inc":
          q = n;
          break;
        case "if":
          q = n;
          break;
        case "foreach":
          q = n = "for";
          break;
        case "js":
          break;
        case "key":
          g.key = k.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          ma[n] ? t = h.event || (h.event = {}) : (f || "id" !== n && "name" !== n || g.name || /{{[\s\S]+}}/.test(k) || (g.name = k), t = h.attr || (h.attr = {})), q = n;
      }
      q && qa(t || h, q, k, !!t, m, e, c, d);
    }
  }
  n = (a.content || a).childNodes;
  q = n.length;
  e.included && (e.included = !1, e.inc++, d = [], (h.for || h.if) && c.unshift(d), h.child || (h.child = h.text ? {text:h.text} : h.html ? {html:h.html} : null), q ? (d.root = h, d.inc = h.child || (h.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = h.inc, delete h.for, delete h.if, delete h.text, delete h.html);
  if (q) {
    for (let v = 0, r; v < q; v++) {
      if (r = n[v], 8 !== r.nodeType && (e.count++, t = pa(r, null, c, d, e, 1))) {
        1 !== q || 3 !== r.nodeType && t.text || h.js && t.js ? (t.text || t.tag) && (h.child || (h.child = [])).push(t) : (t.js && (h.js = t.js), t.html && (h.html = t.html), t.text && (h.text = t.text));
      }
    }
    h.child && 1 === h.child.length && (h.child = h.child[0]);
  }
  if (!f) {
    g.name || (g.name = "tpl-" + oa++);
    if ("COMPONENT" === h.tag) {
      d = h.child;
      e = [];
      for (let v = 0, r; v < d.length; v++) {
        r = d[v], "TEMPLATE" === r.tag ? (d = f = r.child.length ? r.child[0] : r.child, r.name && (f.name = r.name), r.id && (f.id = r.id), r.key && (f.key = r.key), r.cache && (f.cache = r.cache)) : e.push(r);
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
function qa(a, b, c, d, e, f, g, h) {
  if (/{{[\s\S]+}}/.test(c)) {
    g = /{{([!?#]+)?=/.test(c);
    let k = /{{!?\?/.test(c), m = /{{\??!/.test(c);
    if (g) {
      if (k || m) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      g = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").trim();
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    k && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || f.count++;
    f.count !== f.last && (f.current++, f.last = f.count, h.push("_o=_p[" + f.current + "]"));
    h.push("_v=" + c);
    d ? h.push('if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? h.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? h.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? h.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && h.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = g ? [g] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || f.included || (f.count !== f.last && (f.current++, f.last = f.count, h.push("_o=_p[" + f.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = f.inc, e.if ? h.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? h.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : h.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), f.included = !0);
}
;const ra = /[^;:]+/g, sa = /[ ]+/g;
function ta(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function ua(a, b) {
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
    for (a = c.split(sa), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function va(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function wa(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(ra), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
;C.once = ja;
C.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = L[c], a instanceof C || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  L[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  L[c] = [a, b];
  return C;
};
C.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = L[a];
  b && (b instanceof C && b.destroy(), L[a] = null);
  return C;
};
C.compile = pa;
C.setText = function(a, b) {
  let c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
};
C.getText = function(a) {
  let b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d && (3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent);
  return d;
};
C.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
C.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
C.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
C.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c.split(sa);
};
C.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
C.toggleClass = function(a, b, c) {
  const d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        va(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        va(a, e, b[e], d);
      }
    }
  } else {
    va(a, b, c, d);
  }
};
C.removeClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let f = 0; f < b.length; f++) {
      var d = a, e = b[f];
      0 !== c[e] && (c[e] = 0, d.classList.remove(e));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
C.addClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let f = 0; f < b.length; f++) {
      var d = a, e = b[f];
      c[e] || (c[e] = 1, d.classList.add(e));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
C.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      ta(a, e, b[e], d);
    }
  } else {
    ta(a, b, c, d);
  }
};
C.getAttribute = ua;
C.hasAttribute = function(a, b) {
  a = ua(a, b);
  return !(!a && "" !== a);
};
C.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let f = 0; f < b.length; f++) {
      var d = a, e = b[f];
      !1 !== c["_a" + e] && (c["_a" + e] = !1, d.removeAttribute(e));
    }
  } else {
    !1 !== c["_a" + b] && (c["_a" + b] = !1, a.removeAttribute(b));
  }
};
C.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
C.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
C.getStyle = function(a, b) {
  const c = wa(a);
  let d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
C.setStyle = function(a, b, c) {
  const d = wa(a), e = a.style;
  if ("object" === typeof b) {
    for (const g in b) {
      c = a;
      var f = b[g];
      d[g] !== f && (d[g] = f, (e || c.style).setProperty(g, f));
    }
  } else {
    d[b] !== c && (d[b] = c, (e || a.style).setProperty(b, c));
  }
};
C.escape = function(a) {
  W._text !== a && (la.nodeValue = a, W._html = W.innerHTML, W._text = a);
  return W._html;
};
C.sanitize = function(a) {
  X._html !== a && (X.innerHTML = a, X._html = a, X._text = X.textContent);
  return X._text;
};
C.prototype.route = C.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  w[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  w[a] = b;
  c && (y[a] = c);
  return this;
};
C.prototype.dispatch = C.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!w[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  w[a](b || this, c || window.event);
  return this;
};
C.prototype.listen = C.listen = ca;
C.prototype.unlisten = C.unlisten = function(a) {
  l[a] && (E(0, a, D, u[a]), l[a] = 0, u[a] = null);
  return this;
};
C.Array = M;
const Z = window;
let xa;
(xa = Z.define) && xa.amd ? xa([], function() {
  return C;
}) : "object" === typeof Z.exports ? Z.exports = C : Z.Mikado = C;
}).call(this);
