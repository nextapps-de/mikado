/**!
 * Mikado.js v0.8.225 (Light/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
function l(a, b, c) {
  let d;
  c && (d = a._mkc) && (a._mkc = null);
  const g = b.length, k = Array(g), e = {};
  for (let m = 0, p, q, n, r, x = null; m < g; m++) {
    p = b[m];
    if (q = p.v) {
      if (r = n = e[q], !r) {
        a: {
          var f = a, h = q;
          for (let y = 0, u = h.length, v = ""; y < u; y++) {
            const A = h[y];
            v += A;
            if (e[v]) {
              f = e[v];
            } else {
              if (">" === A) {
                f = f.firstChild;
              } else if ("|" === A) {
                n = [f.firstChild, f];
                break a;
              } else if ("@" === A) {
                n = [f.style, f];
                break a;
              } else {
                f = f.nextSibling;
              }
              e[v] = f;
            }
          }
          n = [f, null];
        }
        r = n[0];
        n = n[1] || r;
      }
    } else {
      r = n = a;
    }
    c && (x = d ? d[m] : {}, n._mkc = x);
    k[m] = new t(x, r, "");
  }
  return a._mkp = k;
}
function w(a, b, c, d, g, k) {
  const e = g || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let f, h;
  if (h = b.class) {
    "object" === typeof h ? c.push(new t(f = {_c:""}, e, d)) : g || (e.className = h);
  }
  if (h = b.attr) {
    for (const m in h) {
      let p = h[m];
      "object" === typeof p ? (f || c.push(new t(f = {}, e, d)), f["_a" + m] = !1) : g || e.setAttribute(m, p);
    }
  }
  if (h = b.style) {
    "object" === typeof h ? (c.push(new t(f || (f = {}), e.style, d + "@")), f._s = "") : g || (e.style.cssText = h);
  }
  if (h = b.text) {
    "object" === typeof h ? (a = e, h = h[0], b.tag ? (d += "|", a = !g && e.firstChild, a || (a = document.createTextNode(h), e.appendChild(a))) : f = {}, (f || (f = {}))._t = h, c.push(new t(f, a, d))) : g || (b.tag ? e.textContent = h : e.nodeValue = h);
  } else if (h = b.child) {
    if (g && (g = g.firstChild, !g)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    h.constructor !== Array && (h = [h]);
    for (let m = 0, p, q = h.length; m < q; m++) {
      if (p = h[m], d = m ? d + "+" : d + ">", b = w(a, p, c, d, g, 1), g) {
        if (m < q - 1 && (g = g.nextSibling, !g)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        e.appendChild(b);
      }
    }
  } else if (h = b.html) {
    "object" === typeof h ? (f || c.push(new t(f = {}, e, d)), f._h = "") : g || (e.innerHTML = h);
  } else if (h = b.inc) {
    f || c.push(new t(null, e, d));
    let m;
    if ("string" === typeof h) {
      m = z[h];
      if (!m) {
        throw Error("The partial template '" + h + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(m instanceof B)) {
        d = m[0];
        if (b = m[1]) {
          b.async = !1, g && (b.root = g, b.hydrate = !0);
        }
        z[h] = m = new B(d, b);
      }
    } else if (1 !== h) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      m = new B({name:a.name + "|" + d, tpl:h, key:h.key, cache:h.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:e, hydrate:!!g});
    }
    1 !== h && a.inc.push(m);
  }
  f && (e._mkc = f);
  k || (e._mkp = c);
  return e;
}
function t(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
t.prototype._a = function(a, b, c, d) {
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
t.prototype._t = function(a, b, c) {
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
t.prototype._c = function(a, b, c) {
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
t.prototype._s = function(a, b, c) {
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
t.prototype._h = function(a, b, c) {
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
const z = Object.create(null);
function B(a, b = {}) {
  if (!(this instanceof B)) {
    return new B(a, b);
  }
  if ("string" === typeof a) {
    var c = z[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof B) {
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
  this.shadow = b.shadow || !1;
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
B.prototype.mount = function(a, b) {
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
      var g = a.children;
      const k = g.length, e = Array(k);
      for (let f = 0; f < k; f++) {
        e[f] = g[f];
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
        for (let k = 0, e, f; k < this.length; k++) {
          e = this.dom[k], (f = e.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), e._mkk = f, d[f] = e;
        }
      }
      a._mkl = this.live = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), w(this, this.tpl.tpl, [], "", this.factory) && C(this)), this.tpl && (this.factory = w(this, this.tpl.tpl, [], ""), C(this)));
  return this;
};
function C(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
B.prototype.render = function(a, b) {
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
  const g = this.key;
  !c || g || this.recycle || (this.remove(0, c), c = 0);
  let k = c < d ? c : d, e = 0;
  if (e < k) {
    for (let f, h; e < k; e++) {
      f = this.dom[e];
      h = a[e];
      if (g && f._mkk !== h[g]) {
        return this.reconcile(a, b, e);
      }
      this.update(f, h, b, e, 1);
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
B.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var g;
  if (this.key) {
    var k = b[this.key];
    if (g = this.live[k]) {
      if (g !== a) {
        k = this.index(g);
        const e = k < d ? g : a, f = k < d ? a : g;
        let h = this.dom[k < d ? k + 1 : d + 1];
        this.dom[d] = g;
        this.dom[k] = a;
        h !== f ? this.root.insertBefore(e, f) : h = e;
        this.root.insertBefore(f, h);
      }
    } else {
      this.pool && (g = this.pool_keyed.get(k)) && (this.pool_keyed.delete(k), this.checkout(a), this.dom[d] = g, a.replaceWith(g));
    }
  } else {
    this.recycle && (g = a);
  }
  g ? !this.apply || this.apply(b, c || this.state, d, g._mkp || l(g, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  return this;
};
B.prototype.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.dom[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || l(a, this.factory._mkp, this.cache));
  return this;
};
B.prototype.create = function(a, b, c, d) {
  const g = this.key, k = g && a[g];
  let e, f, h, m;
  this.pool && (g ? (f = this.pool_keyed) && (e = f.get(k)) && (f.delete(k), m = 1) : (f = this.pool_shared) && f.length && (e = f.pop()));
  e || (e = h = this.factory, h || (this.factory = e = h = w(this, this.tpl.tpl, [], ""), C(this)));
  let p;
  this.apply && (p = this.apply(a, b || this.state, c, e._mkp || l(e, this.factory._mkp, !!h || this.cache), h && this.cache && []));
  h && (e = h.cloneNode(!0), p && (e._mkc = p));
  g && (m || (e._mkk = k), d && (this.live[k] = e));
  return e;
};
B.prototype.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), D(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  return this;
};
B.prototype.reconcile = function(a, b, c) {
  const d = this.dom, g = this.live, k = this.key;
  let e = a.length, f = d.length, h = f > e ? f : e, m = 0;
  for (c || (c = 0); c < h; c++) {
    var p = void 0;
    if (c < e) {
      var q = a[c], n = c >= f;
      let r, x, y;
      if (!n && (r = d[c], x = q[k], y = r._mkk, y === x)) {
        this.update(r, q, b, c, 1);
        continue;
      }
      if (n || !g[x]) {
        n || !this.pool ? (f++, h = f > e ? f : e, this.add(q, b, c)) : this.replace(r, q, b, c);
        continue;
      }
      let u, v;
      for (n = c + 1; n < h; n++) {
        if (!u && n < f && d[n]._mkk === x && (u = n + 1), !v && n < e && a[n][k] === y && (v = n + 1), u && v) {
          u >= v + m ? (p = d[u - 1], this.root.insertBefore(p, r), this.update(p, q, b, c, 1), u === v ? (1 < n - c && this.root.insertBefore(r, d[u]), d[c] = d[n], (d[n] = r) || console.error("reconcile.error 1")) : (u - 1 === c && console.error("reconcile.error 2"), D(d, u - 1, c), m++)) : (q = v - 1 + m, this.root.insertBefore(r, d[q] || null), (q > f ? f : q) - 1 === c && console.error("reconcile.error 3"), D(d, c, (q > f ? f : q) - 1), m--, c--);
          p = 1;
          break;
        }
      }
    }
    p || (this.remove(c), f--, h = f > e ? f : e, c--);
  }
  return this;
};
function D(a, b, c, d) {
  const g = d || a[b];
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
B.prototype.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const g = a.length;
  for (let k = 0; k < g; k++) {
    this.add(a[k], b, d ? c++ : null);
  }
  return this;
};
B.prototype.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
B.prototype.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root._mkd = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  const d = this.pool && !this.key, g = this.key || this.pool;
  for (let k = 0, e; k < b; k++) {
    e = a[d ? b - k - 1 : k], c && e.remove(), g && this.checkout(e);
  }
  this.length = c;
  return this;
};
B.prototype.index = function(a) {
  return this.dom.indexOf(a);
};
B.prototype.node = function(a) {
  return this.dom[a];
};
B.prototype.checkout = function(a) {
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
B.prototype.flush = function() {
  this.pool_shared = [];
  this.pool_keyed = new Map();
  return this;
};
B.prototype.destroy = function() {
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
B.once = function(a, b, c, d) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  if (c || b.fn) {
    b = new B(b);
    if (c && Array.isArray(c)) {
      for (let g = 0; g < c.length; g++) {
        a.append(b.create(c[g], d, g));
      }
    } else {
      a.append(b.create(c, d));
    }
    b.destroy();
  } else {
    c = w({}, b.tpl, [], "", null, 1), a.append(c);
  }
  return B;
};
B.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = z[c], a instanceof B || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  z[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  z[c] = [a, b];
  return B;
};
B.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = z[a];
  b && (b instanceof B && b.destroy(), z[a] = null);
  return B;
};
const E = window;
let F;
(F = E.define) && F.amd ? F([], function() {
  return B;
}) : "object" === typeof E.exports ? E.exports = B : E.Mikado = B;
}).call(this);
