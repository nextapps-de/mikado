/**!
 * Mikado.js v0.8.222 (Light/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
function l(a, b, c) {
  const d = b.length, f = [], k = {};
  for (let g = 0, m, q, n, p, u, x = null; g < d; g++) {
    m = b[g];
    if (q = m.v) {
      if (p = n = k[q], !p) {
        let y = void 0;
        var e = a, h = q;
        for (let r = 0, w = h.length, A = ""; r < w; r++) {
          const B = h[r];
          A += B;
          k[A] ? e = k[A] : (">" === B ? e = e.firstChild : "|" === B ? (y = e, e = e.firstChild) : "@" === B ? (y = e, e = e.style) : e = e.nextSibling, k[A] = e);
        }
        n = [e, y];
        p = n[0];
        n = n[1] || p;
      }
    } else {
      p = n = a;
    }
    c && u !== n && (u = n, n._mkc = x = {});
    f[g] = new t(x, p, "");
  }
  return a._mkp = f;
}
function v(a, b, c, d, f, k) {
  const e = f || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let h, g;
  if (g = b.class) {
    "object" === typeof g ? c.push(new t(h = {_c:""}, e, d)) : f || (e.className = g);
  }
  if (g = b.attr) {
    for (const m in g) {
      let q = g[m];
      "object" === typeof q ? (h || c.push(new t(h = {}, e, d)), h["_a" + m] = !1) : f || e.setAttribute(m, q);
    }
  }
  if (g = b.style) {
    "object" === typeof g ? (c.push(new t(h || (h = {}), e.style, d + "@")), h._s = "") : f || (e.style.cssText = g);
  }
  if (g = b.text) {
    "object" === typeof g ? (a = e, g = g[0], b.tag ? (d += "|", a = !f && e.firstChild, a || (a = document.createTextNode(g), e.appendChild(a))) : h = {}, (h || (h = {}))._t = g, c.push(new t(h, a, d))) : f || (b.tag ? e.textContent = g : e.nodeValue = g);
  } else if (g = b.child) {
    if (f && (f = f.firstChild, !f)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    g.constructor !== Array && (g = [g]);
    for (let m = 0, q, n = g.length; m < n; m++) {
      if (q = g[m], d = m ? d + "+" : d + ">", b = v(a, q, c, d, f, 1), f) {
        if (m < n - 1 && (f = f.nextSibling, !f)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        e.appendChild(b);
      }
    }
  } else if (g = b.html) {
    "object" === typeof g ? (h || c.push(new t(h = {}, e, d)), h._h = "") : f || (e.innerHTML = g);
  } else if (g = b.inc) {
    h || c.push(new t(null, e, d));
    let m;
    if ("string" === typeof g) {
      m = z[g];
      if (!m) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(m instanceof C)) {
        d = m[0];
        if (b = m[1]) {
          b.async = !1, f && (b.root = f, b.hydrate = !0);
        }
        z[g] = m = new C(d, b);
      }
    } else if (1 !== g) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      m = new C({name:a.name + "|" + d, tpl:g, key:g.key, cache:g.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:e, hydrate:!!f});
    }
    1 !== g && a.inc.push(m);
  }
  h && (e._mkc = h);
  k || (e._mkp = c);
  return e;
}
function t(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
t.prototype._a = function(a, b) {
  if (this.c) {
    if (("undefined" === typeof this.c["_a" + a] ? !1 : this.c["_a" + a]) === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
t.prototype._t = function(a) {
  if (this.c) {
    if (("undefined" === typeof this.c._t ? "" : this.c._t) === a) {
      return;
    }
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
t.prototype._c = function(a) {
  if (this.c) {
    if ((this.c._c || "") === a) {
      return;
    }
    this.c._c = a;
  }
  this.n.className = a;
};
t.prototype._s = function(a) {
  if (this.c) {
    if ((this.c._s || "") === a) {
      return;
    }
    this.c._s = a;
  }
  this.n.cssText = a;
};
t.prototype._h = function(a) {
  if (this.c) {
    if ((this.c._h || "") === a) {
      return;
    }
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
const z = Object.create(null);
function C(a, b = {}) {
  if (!(this instanceof C)) {
    return new C(a, b);
  }
  if ("string" === typeof a) {
    var c = z[a];
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
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
C.prototype.mount = function(a, b) {
  if (!a) {
    throw Error("No target was passed to .mount()");
  }
  this.shadow && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  const c = a._mki;
  var d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.dom = a._mkd;
    this.length = this.dom.length;
  } else if (c) {
    c.clear(), a._mkd = this.dom = [], this.length = 0, a.firstChild && (a.textContent = "");
  } else {
    if (b) {
      var f = a.children;
      const k = f.length, e = Array(k);
      for (let h = 0; h < k; h++) {
        e[h] = f[h];
      }
      this.dom = e;
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
        for (let k = 0, e, h; k < this.length; k++) {
          e = this.dom[k], (h = e.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), e._mkk = h, d[h] = e;
        }
      }
      a._mkl = this.live = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), v(this, this.tpl.tpl, [], "", this.factory) && D(this)), this.tpl && (this.factory = v(this, this.tpl.tpl, [], ""), D(this)));
  return this;
};
function D(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
C.prototype.render = function(a, b) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  let c = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  let d;
  if (Array.isArray(a)) {
    if (d = a.length, !d) {
      return this.remove(0, c);
    }
  } else {
    a = [a], d = 1;
  }
  const f = this.key;
  !c || f || this.recycle || (this.remove(0, c), c = 0);
  let k = c < d ? c : d, e = 0;
  if (e < k) {
    for (let h, g; e < k; e++) {
      h = this.dom[e];
      g = a[e];
      if (f && h._mkk !== g[f]) {
        return this.reconcile(a, b, e);
      }
      this.update(h, g, b, e, 1);
    }
  }
  if (e < d) {
    for (; e < d; e++) {
      this.add(a[e], b);
    }
  } else {
    d < c && this.remove(d, c - d);
  }
  return this;
};
C.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var f;
  if (this.key) {
    var k = b[this.key];
    if (f = this.live[k]) {
      if (f !== a) {
        k = this.index(f);
        const e = k < d ? f : a, h = k < d ? a : f;
        let g = this.dom[k < d ? k + 1 : d + 1];
        this.dom[d] = f;
        this.dom[k] = a;
        g !== h ? this.root.insertBefore(e, h) : g = e;
        this.root.insertBefore(h, g);
      }
    } else {
      this.pool && (f = this.pool_keyed.get(k)) && (this.pool_keyed.delete(k), this.checkout(a), this.dom[d] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? !this.apply || this.apply(b, c || this.state, d, f._mkp || l(f, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  return this;
};
C.prototype.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.dom[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || l(a, this.factory._mkp, this.cache));
  return this;
};
C.prototype.create = function(a, b, c, d) {
  const f = this.key, k = f && a[f];
  let e, h, g, m;
  this.pool && (f ? (h = this.pool_keyed) && (e = h.get(k)) && (h.delete(k), m = 1) : (h = this.pool_shared) && h.length && (e = h.pop()));
  e || (e = g = this.factory, g || (this.factory = e = g = v(this, this.tpl.tpl, [], ""), D(this)));
  this.apply && this.apply(a, b || this.state, c, e._mkp || l(e, this.factory._mkp, !!g || this.cache));
  g && (e = g.cloneNode(!0));
  f && (m || (e._mkk = k), d && (this.live[k] = e));
  return e;
};
C.prototype.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), E(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  return this;
};
C.prototype.reconcile = function(a, b, c) {
  const d = this.dom, f = this.live, k = this.key;
  let e = a.length, h = d.length, g = h > e ? h : e, m = 0;
  for (c || (c = 0); c < g; c++) {
    var q = void 0;
    if (c < e) {
      var n = a[c], p = c >= h;
      let u, x, y;
      if (!p && (u = d[c], x = n[k], y = u._mkk, y === x)) {
        this.update(u, n, b, c, 1);
        continue;
      }
      if (p || !f[x]) {
        p || !this.pool ? (h++, g = h > e ? h : e, this.add(n, b, c)) : this.replace(u, n, b, c);
        continue;
      }
      let r, w;
      for (p = c + 1; p < g; p++) {
        if (!r && p < h && d[p]._mkk === x && (r = p + 1), !w && p < e && a[p][k] === y && (w = p + 1), r && w) {
          r >= w + m ? (q = d[r - 1], this.root.insertBefore(q, u), this.update(q, n, b, c, 1), r === w ? (1 < p - c && this.root.insertBefore(u, d[r]), d[c] = d[p], (d[p] = u) || console.error("reconcile.error 1")) : (r - 1 === c && console.error("reconcile.error 2"), E(d, r - 1, c), m++)) : (n = w - 1 + m, this.root.insertBefore(u, d[n] || null), (n > h ? h : n) - 1 === c && console.error("reconcile.error 3"), E(d, c, (n > h ? h : n) - 1), m--, c--);
          q = 1;
          break;
        }
      }
    }
    q || (this.remove(c), h--, g = h > e ? h : e, c--);
  }
  return this;
};
function E(a, b, c, d) {
  const f = d || a[b];
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
C.prototype.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const f = a.length;
  for (let k = 0; k < f; k++) {
    this.add(a[k], b, d ? c++ : null);
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
  const d = this.pool && !this.key, f = this.key || this.pool;
  for (let k = 0, e; k < b; k++) {
    e = a[d ? b - k - 1 : k], c && e.remove(), f && this.checkout(e);
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
    b = this.inc[a], z[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
document.createElement("div");
document.createTextNode("");
document.createElement("div");
C.once = function(a, b, c, d) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  if (c || b.fn) {
    b = new C(b);
    if (c && Array.isArray(c)) {
      for (let f = 0; f < c.length; f++) {
        a.append(b.create(c[f], d, f));
      }
    } else {
      a.append(b.create(c, d));
    }
    b.destroy();
  } else {
    c = v({}, b.tpl, [], "", null, 1), a.append(c);
  }
  return C;
};
C.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = z[c], a instanceof C || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  z[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  z[c] = [a, b];
  return C;
};
C.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = z[a];
  b && (b instanceof C && b.destroy(), z[a] = null);
  return C;
};
const F = window;
let G;
(G = F.define) && G.amd ? G([], function() {
  return C;
}) : "object" === typeof F.exports ? F.exports = C : F.Mikado = C;
}).call(this);
