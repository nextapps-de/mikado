/**!
 * Mikado.js v0.8.135 (Light/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var n;
function p(a, c, b) {
  const e = c.length, g = [], k = {};
  for (let f = 0, m, q, l, u, A, x = null; f < e; f++) {
    m = c[f];
    if (q = m.v) {
      if (u = l = k[q], !u) {
        let t = void 0;
        var d = a, h = q;
        for (let y = 0, B = h.length, r = ""; y < B; y++) {
          const v = h[y];
          r += v;
          k[r] ? d = k[r] : (">" === v ? d = d.firstChild : "|" === v ? (t = d, d = d.firstChild) : "@" === v ? (t = d, d = d.style) : d = d.nextSibling, k[r] = d);
        }
        l = [d, t];
        u = l[0];
        l = l[1] || u;
      }
    } else {
      u = l = a;
    }
    b && A !== l && (A = l, l._mkc = x = {});
    g[f] = new w(x, u, "");
  }
  return a._mkp = g;
}
function z(a, c, b, e, g, k) {
  const d = e || (a.tag ? a.o ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag) : document.createTextNode(a.text));
  let h, f;
  if (f = a.class) {
    "object" === typeof f ? c.push(new w(h = {_c:""}, d, b)) : e || (d.className = f);
  }
  if (f = a.attr) {
    for (const m in f) {
      let q = f[m];
      "object" === typeof q ? (h || c.push(new w(h = {}, d, b)), h["_a" + m] = !1) : e || d.setAttribute(m, q);
    }
  }
  if (f = a.event) {
    for (const m in f) {
      e || d.setAttribute(m, f[m]);
    }
  }
  if (f = a.style) {
    "object" === typeof f ? (c.push(new w(h || (h = {}), d.style, b + "@")), h._s = "") : e || (d.style.cssText = f);
  }
  if (f = a.text) {
    "object" === typeof f ? (g = d, f = f[0], a.tag ? (b += "|", g = !e && d.firstChild, g || (g = document.createTextNode(f), d.appendChild(g))) : h = {}, (h || (h = {}))._t = f, c.push(new w(h, g, b))) : e || (a.tag ? d.textContent = f : d.nodeValue = f);
  } else if (f = a.child) {
    e && (e = e.firstChild);
    f.constructor !== Array && (f = [f]);
    for (let m = 0, q, l = f.length; m < l; m++) {
      q = f[m], b = m ? b + "+" : b + ">", a = z(q, c, b, e, g, 1), e ? m < l - 1 && (e = e.nextSibling) : d.appendChild(a);
    }
  } else if (f = a.html) {
    "object" === typeof f ? (h || c.push(new w(h = {}, d, b)), h._h = "") : e || (d.innerHTML = f);
  } else if (f = a.inc) {
    h || c.push(new w(null, d, b));
    if ("string" === typeof f) {
      a = C[f];
      if (!a) {
        throw Error("The partial template '" + f + "' which is included by the root template '" + g.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(a instanceof D)) {
        b = a[0];
        if (a = a[1]) {
          a.async = !1, e && (a.root = e, a.hydrate = !0);
        }
        C[f] = a = new D(b, a);
      }
    } else {
      b = g.inc.length;
      if (!g.tpl.m.length) {
        throw Error("The template '" + g.name + "|" + b + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      a = new D({name:g.name + "|" + b, tpl:f, key:f.key, cache:f.cache, fn:g.tpl.m}, {recycle:g.recycle, cache:g.cache, pool:g.pool, state:g.state, mount:d, hydrate:!!e});
    }
    g.inc.push(a);
  }
  h && (d._mkc = h);
  k || (d._mkp = c);
  return d;
}
function w(a, c, b) {
  this.c = a;
  this.n = c;
  this.v = b;
}
n = w.prototype;
n._a = function(a, c) {
  if (this.c) {
    if (this.c["_a" + a] === c) {
      return;
    }
    this.c["_a" + a] = c;
  }
  !1 !== c ? this.n.setAttribute(a, c) : this.n.removeAttribute(a);
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
const C = Object.create(null);
function D(a, c = {}) {
  if (!(this instanceof D)) {
    return new D(a, c);
  }
  if ("string" === typeof a) {
    var b = C[a];
    if (!b) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (b instanceof D) {
      return b;
    }
    a = b[0];
    c || (c = b[1]);
  }
  if (!a) {
    throw Error("Initialization Error: Template is not defined.");
  }
  if (!a.tpl || !a.name) {
    throw Error("Initialization Error: Template isn't supported.");
  }
  this.g = [];
  this.length = 0;
  this.root = c.root || c.mount || null;
  this.recycle = !!c.recycle;
  this.state = c.state || {};
  this.key = a.key || "";
  this.j = {};
  this.apply = (b = a.fn) && b.pop();
  this.tpl = a.tpl;
  this.name = a.name;
  this.inc = [];
  a.tpl.m = b;
  this.pool = (this.key || this.recycle) && c.pool || 0;
  this.l = [];
  this.i = new Map();
  this.cache = a.cache || !!c.cache;
  this.root ? this.mount(this.root, c.hydrate) : this.h = null;
}
n = D.prototype;
n.mount = function(a, c) {
  const b = a._mki;
  var e = this.root !== a;
  if (b === this) {
    if (!e) {
      return this;
    }
    this.g = a._mkd;
    this.length = this.g.length;
  } else if (b) {
    b.clear(), a._mkd = this.g = [], this.length = 0;
  } else {
    if (c) {
      var g = a.children;
      const k = g.length, d = Array(k);
      for (let h = 0; h < k; h++) {
        d[h] = g[h];
      }
      this.g = d;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (e && this.root && (this.root._mkl = this.j), b === this) {
      this.j = a._mkl;
    } else {
      e = {};
      if (!b && c && this.length) {
        for (let k = 0, d, h; k < this.length; k++) {
          d = this.g[k], h = d.getAttribute("key"), d._mkk = h, e[h] = d;
        }
      }
      a._mkl = this.j = e;
    }
  }
  a._mki = this;
  this.root = a;
  this.h || (c && this.length ? (this.h = this.g[0].cloneNode(), z(this.tpl, [], "", this.h, this)) : this.h = z(this.tpl, [], "", null, this), this.tpl = null);
  return this;
};
n.render = function(a, c) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  var b = this.length;
  if (!a) {
    return this.apply || this.g[0] || this.add(), console.warn("When calling .render() by passing no data nothing will happen!"), this;
  }
  if (Array.isArray(a)) {
    var e = a.length;
    if (!e) {
      return this.remove(0, b);
    }
  } else {
    a = [a], e = 1;
  }
  var g = this.key;
  !b || g || this.recycle || (this.remove(0, b), b = 0);
  var k = b < e ? b : e, d = 0;
  if (d < k) {
    for (let m, q; d < k; d++) {
      m = this.g[d];
      q = a[d];
      if (g && m._mkk !== q[g]) {
        b = this.g;
        e = this.j;
        g = this.key;
        k = a.length;
        let l = b.length, u = l > k ? l : k, A = 0;
        for (d || (d = 0); d < u; d++) {
          var h = void 0;
          if (d < k) {
            const x = a[d];
            var f = d >= l;
            let t, y, B;
            if (!f && (t = b[d], y = x[g], B = t._mkk, B === y)) {
              this.update(t, x, c, d, 1);
              continue;
            }
            if (f || !e[y]) {
              f || !this.pool ? (l++, u = l > k ? l : k, this.add(x, c, d)) : this.replace(t, x, c, d);
              continue;
            }
            let r, v;
            for (f = d + 1; f < u; f++) {
              if (!r && f < l && b[f]._mkk === y && (r = f + 1), !v && f < k && a[f][g] === B && (v = f + 1), r && v) {
                r >= v ? (h = b[r - 1], this.root.insertBefore(h, t), this.update(h, x, c, d, 1), r === v ? (1 < f - d && this.root.insertBefore(t, b[r]), b[d] = b[f], (b[f] = t) || console.error("Error")) : (E(b, r - 1, d), A++)) : (h = v - 1 + A, this.root.insertBefore(t, b[h] || null), E(b, d, (h > l ? l : h) - 1), A--, d--);
                h = 1;
                break;
              }
            }
          }
          h || (this.remove(d), l--, u = l > k ? l : k, d--);
        }
        return this;
      }
      this.update(m, q, c, d, 1);
    }
  }
  if (d < e) {
    for (; d < e; d++) {
      this.add(a[d], c, d);
    }
  } else {
    e < b && this.remove(e, b - e);
  }
  return this;
};
n.replace = function(a, c, b, e) {
  "undefined" === typeof e && ("number" === typeof a ? (e = a, a = this.g[e]) : e = this.index(a));
  var g;
  if (this.key) {
    var k = c[this.key];
    if (g = this.j[k]) {
      if (g !== a) {
        var d = this.index(g);
        this.g[e] = g;
        this.g[d] = a;
        k = d < e ? g : a;
        d = d < e ? a : g;
        const h = k.nextElementSibling;
        this.root.insertBefore(k, d);
        h !== d && this.root.insertBefore(d, h);
      }
    } else {
      this.pool && (g = this.i.get(k)) && (this.i.delete(k), F(this, a), this.g[e] = g, a.replaceWith(g));
    }
  } else {
    this.recycle && (g = a);
  }
  g ? !this.apply || this.apply(c, b || this.state, e, g._mkp || p(g, this.h._mkp, this.cache)) : (c = this.create(c, b, e, 1), (this.key || this.pool) && F(this, a), this.g[e] = c, a.replaceWith(c));
  return this;
};
n.update = function(a, c, b, e) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  "undefined" === typeof e && ("number" === typeof a ? (e = a, a = this.g[a]) : e = this.index(a));
  this.apply(c, b || this.state, e, a._mkp || p(a, this.h._mkp, this.cache));
  return this;
};
n.create = function(a, c, b, e) {
  let g = this.key;
  const k = g && a[g];
  let d, h, f, m;
  g && this.pool && (h = this.i) && (d = h.get(k)) ? (m = 1, h.delete(k)) : (!g || this.recycle) && this.pool && (h = this.l) && h.length ? d = h.pop() : (d = f = this.h, f || (this.h = d = f = z(this.tpl, [], "", null, this), this.tpl = null));
  this.apply && this.apply(a, c || this.state, b, d._mkp || p(d, this.h._mkp, !!f || this.cache));
  f && (d = d.cloneNode(!0));
  g && (m || (d._mkk = k), e && (this.j[k] = d));
  return d;
};
n.add = function(a, c, b) {
  let e;
  "number" === typeof c ? (b = c, c = null, e = b < this.length) : b || 0 === b ? e = b < this.length : b = this.length;
  a = this.create(a, c, b, 1);
  e ? (this.root.insertBefore(a, this.g[b]), E(this.g, this.length - 1, b, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  return this;
};
function E(a, c, b, e) {
  const g = e || a[c];
  e && c++;
  if (c < b) {
    for (; c < b; c++) {
      a[c] = a[c + 1];
    }
  } else {
    for (; c > b; c--) {
      a[c] = a[c - 1];
    }
  }
  a[b] = g;
}
n.append = function(a, c, b) {
  let e;
  if ("number" === typeof c) {
    b = c, c = null, e = 1;
  } else if (b || 0 === b) {
    e = 1;
  }
  const g = a.length;
  for (let k = 0; k < g; k++) {
    this.add(a[k], c, e ? b++ : null);
  }
  return this;
};
n.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
n.remove = function(a, c) {
  let b = this.length;
  b && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = b + a - 1));
  if (!b || a >= b) {
    return this;
  }
  c ? 0 > c && (a -= c + 1, 0 > a && (a = 0), c *= -1) : c = 1;
  !a && c >= b ? (a = this.g, c = a.length, this.root.textContent = "", this.root._mkd = this.g = [], b = 0) : (a = this.g.splice(a, c), b -= c);
  const e = this.pool && !this.key, g = this.key || this.pool;
  for (let k = 0, d; k < c; k++) {
    d = a[e ? c - k - 1 : k], b && d.remove(), g && F(this, d);
  }
  this.length = b;
  return this;
};
n.index = function(a) {
  return this.g.indexOf(a);
};
n.node = function(a) {
  return this.g[a];
};
function F(a, c) {
  if (a.key) {
    var b = c._mkk;
    a.j[b] = null;
  }
  if (a.pool) {
    if (b) {
      a.i.set(b, c), !0 !== a.pool && a.i.size > a.pool && a.i.delete(a.i.keys().next().value);
    } else {
      if (b = a.l.length, !0 === a.pool || b < a.pool) {
        a.l[b] = c;
      }
    }
  }
}
n.flush = function() {
  this.l = [];
  this.i = new Map();
  return this;
};
n.destroy = function() {
  for (let a = 0, c; a < this.inc.length; a++) {
    c = this.inc[a], C[c.name] || c.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.j = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.i = this.l = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.h = null;
};
D.register = function(a, c) {
  let b, e;
  if ("string" === typeof a) {
    if (b = e = a, a = C[b], a instanceof D || (a = a[0]), !a) {
      throw Error("The template '" + b + "' was not found.");
    }
  } else {
    b = a.name;
  }
  C[b] && (e ? console.info("The template '" + b + "' was replaced by a new definition.") : console.warn("The template '" + b + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  C[b] = [a, c];
  return D;
};
D.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const c = C[a];
  c && (c instanceof D && c.destroy(), C[a] = null);
  return D;
};
const G = window;
let H;
(H = G.define) && H.amd ? H([], function() {
  return D;
}) : "object" === typeof G.exports ? G.module.exports = D : G.Mikado = D;
}).call(this);
