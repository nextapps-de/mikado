/**!
 * Mikado.js v0.8.226 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
const l = {}, u = {}, w = Object.create(null), y = Object.create(null), aa = document.documentElement || document.body.parentNode, A = "ontouchstart" in window, B = !A && window.PointerEvent && navigator.maxTouchPoints;
C.eventCache = !1;
C.eventBubble = !1;
let ba;
function D(a, b) {
  b || (b = a.type);
  const c = a.target, d = C.eventCache;
  var e = C.eventBubble;
  let g;
  d && (g = c["_mke" + b]);
  if ("undefined" === typeof g) {
    for (var h = c; h && h !== aa;) {
      var f = void 0;
      "click" === b && ba && (f = h.getAttribute("tap"));
      f || (f = h.getAttribute(b));
      if (f) {
        var k = f.indexOf(":"), m = h;
        if (-1 < k) {
          const n = f.substring(0, k);
          k = f.substring(k + 1);
          for (f = ""; (m = m.parentElement) !== aa;) {
            if (m.hasAttribute(k)) {
              f = n;
              break;
            }
          }
          f || console.warn("Event root '" + k + "' was not found for the event: '" + n + "'.");
        }
        if (f && (g || (g = [], d && (c["_mke" + b] = g)), g.push([f, m]), m = y[f], !e || m && (m.stop || m.cancel))) {
          break;
        }
      }
      h = h.parentElement;
    }
    d && (g || (c["_mke" + b] = null));
  }
  if (g) {
    for (let n = 0, p; n < g.length; n++) {
      if (p = g[n], e = p[0], h = w[e]) {
        f = p[1];
        if (m = y[e]) {
          m.prevent && a.preventDefault(), m.stop && a.stopImmediatePropagation(), m.once && (w[e] = null, d && (c["_mke" + b] = null));
        }
        h(f, a);
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
if (A || B) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    F = e.clientX;
    G = e.clientY;
  }
  function b(d) {
    const e = F, g = G;
    var h = d, f = d.changedTouches;
    f && (h = f[0]);
    F = h.clientX;
    G = h.clientY;
    15 > Math.abs(F - e) && 15 > Math.abs(G - g) && D(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    E(d, B ? "pointerdown" : "touchstart", a, c);
    E(d, B ? "pointerup" : "touchend", b, c);
  };
}
function E(a, b, c, d) {
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
  let d;
  c && (d = a._mkc) && (a._mkc = null);
  const e = b.length, g = Array(e), h = {};
  for (let m = 0, n, p, q, r, v = null; m < e; m++) {
    n = b[m];
    if (p = n.v) {
      if (r = q = h[p], !r) {
        a: {
          var f = a, k = p;
          for (let t = 0, H = k.length, x = ""; t < H; t++) {
            const z = k[t];
            x += z;
            if (h[x]) {
              f = h[x];
            } else {
              if (">" === z) {
                f = f.firstChild;
              } else if ("|" === z) {
                q = [f.firstChild, f];
                break a;
              } else if ("@" === z) {
                q = [f.style, f];
                break a;
              } else {
                f = f.nextSibling;
              }
              h[x] = f;
            }
          }
          q = [f, null];
        }
        r = q[0];
        q = q[1] || r;
      }
    } else {
      r = q = a;
    }
    c && (v = d ? d[m] : {}, q._mkc = v);
    g[m] = new J(v, r, "");
  }
  return a._mkp = g;
}
function K(a, b, c, d, e, g) {
  g || (a.fullproxy = 1);
  const h = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let f, k;
  if (k = b.class) {
    "object" === typeof k ? (c.push(new J(f = {_c:""}, h, d)), (k = k[0]) ? L(a, k, ["_c", c.length - 1]) : a.fullproxy = 0) : e || (h.className = k);
  }
  if (k = b.attr) {
    for (const n in k) {
      let p = k[n];
      "object" === typeof p ? (f || c.push(new J(f = {}, h, d)), f["_a" + n] = !1, (p = p[0]) ? L(a, p, ["_a", c.length - 1, n]) : a.fullproxy = 0) : e || h.setAttribute(n, p);
    }
  }
  if (k = b.event) {
    for (const n in k) {
      e || h.setAttribute(n, k[n]), ca(n);
    }
  }
  if (k = b.style) {
    "object" === typeof k ? (c.push(new J(f || (f = {}), h.style, d + "@")), f._s = "", (k = k[0]) ? L(a, k, ["_s", c.length - 1]) : a.fullproxy = 0) : e || (h.style.cssText = k);
  }
  if (k = b.text) {
    if ("object" === typeof k) {
      var m = h;
      k = k[0];
      b.tag ? (d += "|", m = !e && h.firstChild, m || (m = document.createTextNode(k), h.appendChild(m))) : f = {};
      (f || (f = {}))._t = k;
      c.push(new J(f, m, d));
      k ? L(a, k, ["_t", c.length - 1]) : a.fullproxy = 0;
    } else {
      e || (b.tag ? h.textContent = k : h.nodeValue = k);
    }
  } else if (k = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    k.constructor !== Array && (k = [k]);
    for (let n = 0, p, q = k.length; n < q; n++) {
      if (p = k[n], d = n ? d + "+" : d + ">", b = K(a, p, c, d, e, 1), e) {
        if (n < q - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        h.appendChild(b);
      }
    }
  } else if (k = b.html) {
    "object" === typeof k ? (f || c.push(new J(f = {}, h, d)), f._h = "", (k = k[0]) ? L(a, k, ["_h", c.length - 1]) : a.fullproxy = 0) : e || (h.innerHTML = k);
  } else if (k = b.inc) {
    f || c.push(new J(null, h, d));
    if ("string" === typeof k) {
      m = M[k];
      if (!m) {
        throw Error("The partial template '" + k + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(m instanceof C)) {
        d = m[0];
        if (b = m[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        M[k] = m = new C(d, b);
      }
    } else if (1 !== k) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      m = new C({name:a.name + "|" + d, tpl:k, key:k.key, cache:k.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:h, hydrate:!!e});
    }
    1 !== k && a.inc.push(m);
  }
  f && (h._mkc = f);
  g || (h._mkp = c);
  return h;
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
J.prototype._a = function(a, b, c, d) {
  if (this.c) {
    if (c) {
      if (d || 0 === d) {
        c = c[d] || (c[d] = {});
      }
      c["_a" + a] = b;
    }
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b);
};
J.prototype._t = function(a, b, c) {
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
J.prototype._c = function(a, b, c) {
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
J.prototype._s = function(a, b, c) {
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
J.prototype._h = function(a, b, c) {
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
      const e = c[d], g = e[0], h = a.path[e[1]];
      if (!h.c || h.c[g + (e[2] || "")] !== b) {
        h[g](e[2] || b, b);
      }
    }
  }
}
;const M = Object.create(null);
function C(a, b = {}) {
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
  this.pool = (c = this.recycle || !!this.key) && b.pool || 0;
  this.pool_shared = [];
  this.pool_keyed = new Map();
  this.cache = c && (a.cache || !!b.cache);
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
  if (this.shadow) {
    var c = this.tpl.cmp;
    a = a.shadowRoot || a.attachShadow({mode:"open"});
    if (c && c.length) {
      var d = a.lastElementChild;
      if (d) {
        a = d;
      } else {
        c.push({tag:"root"});
        for (let g = 0, h; g < c.length; g++) {
          h = K(this, c[g], [], ""), a.append(h), g === c.length - 1 && (a = h);
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
      const g = e.length, h = Array(g);
      for (let f = 0; f < g; f++) {
        h[f] = e[f];
      }
      this.dom = h;
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
        for (let g = 0, h, f; g < this.length; g++) {
          h = this.dom[g], (f = h.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), h._mkk = f, d[f] = h;
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
function ja(a, b, c, d, e) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  var g;
  if ("function" === typeof c || !0 === c) {
    e = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    e = d, d = null;
  }
  if (e) {
    return new Promise(function(f) {
      requestAnimationFrame(function() {
        ja(a, b, c, d);
        "function" === typeof e && e();
        f();
      });
    });
  }
  var h = (g = b.cmp) && g.length;
  g && !h && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || h || b.fn) {
    g = new C(b);
    h && (a = g.mount(a).root);
    if (c && Array.isArray(c)) {
      for (h = 0; h < c.length; h++) {
        a.append(g.create(c[h], d, h));
      }
    } else {
      a.append(g.create(c, d));
    }
    g.destroy();
  } else {
    g = K({}, b.tpl, [], "", null, 1), a.append(g);
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
      const m = this;
      e || (e = "function" === typeof c);
      m.timer = requestAnimationFrame(function() {
        m.timer = 0;
        m.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(n) {
        c = n;
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
  const h = this.key;
  e = this.proxy;
  !g || h || this.recycle || (this.remove(0, g), g = 0);
  let f = g < d ? g : d, k = 0;
  if (k < f) {
    for (let m, n; k < f; k++) {
      m = this.dom[k];
      n = a[k];
      if (h && m._mkk !== n[h]) {
        return this.reconcile(a, b, k);
      }
      this.update(m, n, b, k, 1);
      e && !n._mkx && (a[k] = P(this, m, n));
    }
  }
  if (k < d) {
    for (; k < d; k++) {
      g = a[k], this.add(g, b), !e || this.recycle && g._mkx || (a[k] = P(this, this.dom[k], g));
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
    var g = b[this.key];
    if (e = this.live[g]) {
      if (e !== a) {
        g = this.index(e);
        const h = g < d ? e : a, f = g < d ? a : e;
        let k = this.dom[g < d ? g + 1 : d + 1];
        this.dom[d] = e;
        this.dom[g] = a;
        k !== f ? this.root.insertBefore(h, f) : k = h;
        this.root.insertBefore(f, k);
      }
    } else {
      this.pool && (e = this.pool_keyed.get(g)) && (this.pool_keyed.delete(g), this.checkout(a), this.dom[d] = e, a.replaceWith(e));
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
  const e = this.key, g = e && a[e];
  let h, f, k, m;
  this.pool && (e ? (f = this.pool_keyed) && (h = f.get(g)) && (f.delete(g), m = 1) : (f = this.pool_shared) && f.length && (h = f.pop()));
  h || (h = k = this.factory, k || (this.factory = h = k = K(this, this.tpl.tpl, [], ""), O(this)));
  let n;
  this.apply && (n = k && this.cache && [], this.apply(a, b || this.state, c, h._mkp || I(h, this.factory._mkp, !!k || this.cache), n));
  k && (h = k.cloneNode(!0), n && (h._mkc = n));
  e && (m || (h._mkk = g), d && (this.live[g] = h));
  (a = this.on && this.on[k ? "create" : "recycle"]) && a(h, this);
  return h;
};
C.prototype.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), Q(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function P(a, b, c) {
  {
    b = b._mkp || I(b, a.factory._mkp, a.cache);
    a = a.proxy;
    const d = c._mkx;
    d ? d.path = b : c = new fa(c, {path:b, fn:a, get:ha, set:ia});
  }
  return c;
}
C.prototype.reconcile = function(a, b, c) {
  const d = this.dom, e = this.live, g = this.key;
  let h = a.length, f = d.length, k = f > h ? f : h, m = 0;
  for (c || (c = 0); c < k; c++) {
    var n = void 0;
    if (c < h) {
      var p = a[c], q = c >= f;
      let r, v, t, H;
      this.proxy && (p._mkx ? H = 1 : a[c] = P(this, d[c], p));
      if (!q && (r = d[c], v = p[g], t = r._mkk, t === v)) {
        H || this.update(r, p, b, c, 1);
        continue;
      }
      if (q || !e[v]) {
        q || !this.pool ? (f++, k = f > h ? f : h, this.add(p, b, c)) : this.replace(r, p, b, c);
        continue;
      }
      let x, z;
      for (q = c + 1; q < k; q++) {
        if (!x && q < f && d[q]._mkk === v && (x = q + 1), !z && q < h && a[q][g] === t && (z = q + 1), x && z) {
          x >= z + m ? (n = d[x - 1], this.root.insertBefore(n, r), H || this.update(n, p, b, c, 1), x === z ? (1 < q - c && this.root.insertBefore(r, d[x]), d[c] = d[q], (d[q] = r) || console.error("reconcile.error 1")) : (x - 1 === c && console.error("reconcile.error 2"), Q(d, x - 1, c), m++)) : (p = z - 1 + m, this.root.insertBefore(r, d[p] || null), (p > f ? f : p) - 1 === c && console.error("reconcile.error 3"), Q(d, c, (p > f ? f : p) - 1), m--, c--);
          n = 1;
          break;
        }
      }
    }
    n || (this.remove(c), f--, k = f > h ? f : h, c--);
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
C.prototype.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let g = 0; g < e; g++) {
    this.add(a[g], b, d ? c++ : null);
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
  const d = this.pool && !this.key, e = this.key || this.pool, g = this.on && this.on.remove;
  for (let h = 0, f; h < b; h++) {
    f = a[d ? b - h - 1 : h], c && f.remove(), e && this.checkout(f), g && g(f, this);
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
    b = this.inc[a], M[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
const R = Array.prototype, S = window.Proxy;
let T = !1;
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
  const b = a ? a.length : 0;
  if (S) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:R.splice.bind(this), pop:R.pop.bind(this), shift:R.shift.bind(this), unshift:R.unshift.bind(this), push:R.push.bind(this)};
    return new Proxy(this, ka);
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
  if (!T) {
    T = !0;
    if (e) {
      var g = a.length;
      if (d) {
        U(e);
        const h = e.length;
        g !== h && (a.length = h);
        b >= h ? (e.add(c), a.length++) : b < h && (g = e.dom[b], e.recycle || e.key && g._mkk === c[e.key] ? e.update(g, c, null, b) : e.replace(g, c, null, b));
      } else {
        "length" === b && c < g && e.remove(c, g - c);
      }
    }
    T = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = P(e, e.dom[b], c));
  (S ? a : a.proto)[b] = c;
  return !0;
}};
N.prototype.set = function(a) {
  const b = this.mikado.key;
  b && (T = !0);
  if (!b && this.mikado.recycle) {
    const c = this.length;
    for (let d = 0; d < c; d++) {
      this[d] = a[d];
    }
    c > a.length && this.splice(c);
  } else {
    this.splice(), this.concat(a);
  }
  b && (this.mikado.render(this), T = !1);
  return this;
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
  const a = this.proto.pop();
  T = !1;
  return a;
};
N.prototype.shift = function() {
  U(this.mikado);
  T = !0;
  this.mikado.remove(0);
  const a = this.proto.shift();
  T = !1;
  return a;
};
N.prototype.concat = function(a) {
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
N.prototype.sort = R.sort;
N.prototype.reverse = R.reverse;
N.prototype.slice = R.slice;
N.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
N.prototype.filter = function(a, b) {
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, g = this.length; e < g; e++) {
    a(this[e]) ? d && (this.splice(c, d), g -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
N.prototype.indexOf = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
N.prototype.lastIndexOf = function(a) {
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
N.prototype.includes = R.includes;
N.prototype.forEach = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
N.prototype.swap = function(a, b) {
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
N.prototype.transaction = function(a) {
  U(this.mikado);
  T = !0;
  a();
  T = !1;
  const b = this.mikado, c = b.fullproxy;
  b.fullproxy = 0;
  b.async ? b.render(this).then(function() {
    b.fullproxy = c;
  }) : (b.render(this), b.fullproxy = c);
};
const V = document.createElement("div"), la = document.createTextNode(""), W = document.createElement("div");
V.appendChild(la);
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
    const e = this.dom[b], g = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.dom[b + 1] || null);
    if (g) {
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
function X(a, b, c, d, e, g) {
  na || (na = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(v) {
      const t = X(a);
      "function" === typeof b && b(t);
      v(t);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1});
  const h = g ? {} : {tpl:{}}, f = g ? h : h.tpl;
  if (!g) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var k = document.createElement("div");
        k.innerHTML = a;
        a = k.firstElementChild;
      } else {
        h.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (h.name || (h.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  k = a.tagName;
  if (!k || "SCRIPT" === k) {
    var m;
    if ((m = (k ? a.firstChild : a).nodeValue) && m && m.trim()) {
      if (m.includes("{{@")) {
        var n = m.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        m = /{{[\s\S]+}}/.test(n) ? n.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        n && (n = n.replace(/{{([\s\S]+)}}/g, ""));
        n && d.push(n);
        if ("SCRIPT" === k) {
          return m.trim() && (f.text = m, f.tag = k), f;
        }
      }
      m && m.trim() && (m.includes("{{#") ? pa(f, "html", m, !1, null, e, c, d) : (e.count++, pa(f, "text", m, !1, null, e, c, d)));
    }
    if (!k) {
      return m && m.trim() ? f : null;
    }
  }
  k && (f.tag = k);
  if ((m = a.attributes) && m.length) {
    k = {};
    for (n = 0; n < m.length; n++) {
      let v = m[n].nodeName, t = a.getAttribute(v);
      "include" === v && (v = "inc");
      k[v] = t;
    }
    m = k;
    for (var p in m) {
      k = m[p];
      var q = void 0, r = void 0;
      switch(p) {
        case "class":
        case "style":
          q = p;
          break;
        case "include":
          p = "inc";
        case "inc":
          q = p;
          break;
        case "if":
          q = p;
          break;
        case "foreach":
          q = p = "for";
          break;
        case "js":
          break;
        case "key":
          h.key = k.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          ma[p] ? r = f.event || (f.event = {}) : (g || "id" !== p && "name" !== p || h.name || /{{[\s\S]+}}/.test(k) || (h.name = k), r = f.attr || (f.attr = {})), q = p;
      }
      q && pa(r || f, q, k, !!r, m, e, c, d);
    }
  }
  p = (a.content || a).childNodes;
  q = p.length;
  e.included && (e.included = !1, e.inc++, d = [], (f.for || f.if) && c.unshift(d), f.child || (f.child = f.text ? {text:f.text} : f.html ? {html:f.html} : null), q ? (d.root = f, d.inc = f.child || (f.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = f.inc, delete f.for, delete f.if, delete f.text, delete f.html);
  if (q) {
    for (let v = 0, t; v < q; v++) {
      if (t = p[v], 8 !== t.nodeType && (e.count++, r = X(t, null, c, d, e, 1))) {
        1 !== q || 3 !== t.nodeType && r.text || f.js && r.js ? (r.text || r.tag) && (f.child || (f.child = [])).push(r) : (r.js && (f.js = r.js), r.html && (f.html = r.html), r.text && (f.text = r.text));
      }
    }
    f.child && 1 === f.child.length && (f.child = f.child[0]);
  }
  if (!g) {
    h.name || (h.name = "tpl-" + oa++);
    if ("COMPONENT" === f.tag) {
      d = f.child;
      e = [];
      for (let v = 0, t; v < d.length; v++) {
        t = d[v], "TEMPLATE" === t.tag ? (d = g = t.child.length ? t.child[0] : t.child, t.name && (g.name = t.name), t.id && (g.id = t.id), t.key && (g.key = t.key), t.cache && (g.cache = t.cache)) : e.push(t);
      }
      h.tpl = d;
      h.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
      h.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d] = c[d].length ? Function("data", "state", "index", "_p", "_x", '"use strict";let _o,_v,_c;' + c[d].join(";")) : null;
      }
      h.fn = c.length ? c : null;
    }
  }
  return h;
}
function pa(a, b, c, d, e, g, h, f) {
  if (/{{[\s\S]+}}/.test(c)) {
    h = /{{([!?#]+)?=/.test(c);
    let k = /{{!?\?/.test(c), m = /{{\??!/.test(c);
    if (h) {
      if (k || m) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      h = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").trim();
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    k && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || g.count++;
    g.count !== g.last && (g.current++, g.last = g.count, f.push("_o=_p[" + g.current + "]"), f.push("_x&&(_x[" + g.current + "]=_c={})"));
    f.push("_v=" + c);
    d ? f.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? f.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? f.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? f.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === 
    b && f.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = h ? [h] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || g.included || (g.count !== g.last && (g.current++, g.last = g.count, f.push("_o=_p[" + g.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = g.inc, e.if ? f.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? f.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : f.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), g.included = !0);
}
;const qa = /[^;:]+/g, ra = /[ ]+/g;
function sa(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function ta(a, b) {
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
    for (a = c.split(ra), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function ua(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function va(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(qa), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
;C.once = ja;
C.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = M[c], a instanceof C || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  M[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  M[c] = [a, b];
  return C;
};
C.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = M[a];
  b && (b instanceof C && b.destroy(), M[a] = null);
  return C;
};
C.compile = X;
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
  return c.split(ra);
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
        ua(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        ua(a, e, b[e], d);
      }
    }
  } else {
    ua(a, b, c, d);
  }
};
C.removeClass = function(a, b) {
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
C.addClass = function(a, b) {
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
C.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      sa(a, e, b[e], d);
    }
  } else {
    sa(a, b, c, d);
  }
};
C.getAttribute = ta;
C.hasAttribute = function(a, b) {
  a = ta(a, b);
  return !(!a && "" !== a);
};
C.removeAttribute = function(a, b) {
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
  const c = va(a);
  let d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
C.setStyle = function(a, b, c) {
  const d = va(a), e = a.style;
  if ("object" === typeof b) {
    for (const h in b) {
      c = a;
      var g = b[h];
      d[h] !== g && (d[h] = g, (e || c.style).setProperty(h, g));
    }
  } else {
    d[b] !== c && (d[b] = c, (e || a.style).setProperty(b, c));
  }
};
C.escape = function(a) {
  V._text !== a && (la.nodeValue = a, V._html = V.innerHTML, V._text = a);
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
C.Array = N;
const Z = window;
let wa;
(wa = Z.define) && wa.amd ? wa([], function() {
  return C;
}) : "object" === typeof Z.exports ? Z.exports = C : Z.Mikado = C;
}).call(this);
