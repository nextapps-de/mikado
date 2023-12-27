/**!
 * Mikado.js v0.8.133 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
var m;
function r(a, c, b) {
  const e = c.length, f = [], k = {};
  for (let g = 0, l, t, n, q, p, u = null; g < e; g++) {
    l = c[g];
    if (t = l.v) {
      if (q = n = k[t], !q) {
        let y = void 0;
        var d = a, h = t;
        for (let A = 0, w = h.length, v = ""; A < w; A++) {
          const B = h[A];
          v += B;
          k[v] ? d = k[v] : (">" === B ? d = d.firstChild : "|" === B ? (y = d, d = d.firstChild) : "@" === B ? (y = d, d = d.style) : d = d.nextSibling, k[v] = d);
        }
        n = [d, y];
        q = n[0];
        n = n[1] || q;
      }
    } else {
      q = n = a;
    }
    b && p !== n && (p = n, n._mkc = u = {});
    f[g] = new x(u, q, "");
  }
  return a._mkp = f;
}
function z(a, c, b, e, f, k) {
  const d = e || (a.tag ? a.s ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag) : document.createTextNode(a.text));
  let h, g;
  if (g = a.class) {
    "object" === typeof g ? c.push(new x(h = {_c:""}, d, b)) : e || (d.className = g);
  }
  if (g = a.attr) {
    for (const l in g) {
      let t = g[l];
      "object" === typeof t ? (h || c.push(new x(h = {}, d, b)), h["_a" + l] = !1) : e || d.setAttribute(l, t);
    }
  }
  if (g = a.event) {
    for (const l in g) {
      e || d.setAttribute(l, g[l]);
    }
  }
  if (g = a.style) {
    "object" === typeof g ? (c.push(new x(h || (h = {}), d.style, b + "@")), h._s = "") : e || (d.style.cssText = g);
  }
  if (g = a.text) {
    "object" === typeof g ? (f = d, g = g[0], a.tag ? (b += "|", f = !e && d.firstChild, f || (f = document.createTextNode(g), d.appendChild(f))) : h = {}, (h || (h = {}))._t = g, c.push(new x(h, f, b))) : e || (a.tag ? d.textContent = g : d.nodeValue = g);
  } else if (g = a.child) {
    e && (e = e.firstChild);
    g.constructor !== Array && (g = [g]);
    for (let l = 0, t, n = g.length; l < n; l++) {
      t = g[l], b = l ? b + "+" : b + ">", a = z(t, c, b, e, f, 1), e ? l < n - 1 && (e = e.nextSibling) : d.appendChild(a);
    }
  } else if (g = a.html) {
    "object" === typeof g ? (h || c.push(new x(h = {}, d, b)), h._h = "") : e || (d.innerHTML = g);
  } else if (g = a.inc) {
    h || c.push(new x(null, d, b));
    if ("string" === typeof g) {
      a = C[g];
      if (!a) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + f.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(a instanceof D)) {
        b = a[0];
        if (a = a[1]) {
          a.async = !1, e && (a.root = e, a.hydrate = !0);
        }
        C[g] = a = new D(b, a);
      }
    } else {
      b = f.inc.length;
      if (!f.tpl.o.length) {
        throw Error("The template '" + f.name + "|" + b + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      a = new D({name:f.name + "|" + b, tpl:g, key:g.key, cache:g.cache, fn:f.tpl.o}, {recycle:f.recycle, cache:f.cache, pool:f.pool, state:f.state, mount:d, hydrate:!!e});
    }
    f.inc.push(a);
  }
  h && (d._mkc = h);
  k || (d._mkp = c);
  return d;
}
function x(a, c, b) {
  this.c = a;
  this.n = c;
  this.v = b;
}
m = x.prototype;
m._a = function(a, c) {
  if (this.c) {
    if (this.c["_a" + a] === c) {
      return;
    }
    this.c["_a" + a] = c;
  }
  !1 !== c ? this.n.setAttribute(a, c) : this.n.removeAttribute(a);
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
  this.i = {};
  this.apply = (b = a.fn) && b.pop();
  this.tpl = a.tpl;
  this.name = a.name;
  this.inc = [];
  a.tpl.o = b;
  this.pool = (this.key || this.recycle) && c.pool || 0;
  this.m = [];
  this.j = {};
  this.l = 0;
  this.cache = a.cache || !!c.cache;
  this.root ? this.mount(this.root, c.hydrate) : this.h = null;
}
m = D.prototype;
m.mount = function(a, c) {
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
      var f = a.children;
      const k = f.length, d = Array(k);
      for (let h = 0; h < k; h++) {
        d[h] = f[h];
      }
      this.g = d;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (e && this.root && (this.root._mkl = this.i), b === this) {
      this.i = a._mkl;
    } else {
      e = {};
      if (!b && c && this.length) {
        for (let k = 0, d, h; k < this.length; k++) {
          d = this.g[k], h = d.getAttribute("key"), d._mkk = h, e[h] = d;
        }
      }
      a._mkl = this.i = e;
    }
  }
  a._mki = this;
  this.root = a;
  this.h || (c && this.length ? (this.h = this.g[0].cloneNode(), z(this.tpl, [], "", this.h, this)) : this.h = z(this.tpl, [], "", null, this), this.tpl = null);
  return this;
};
m.render = function(a, c) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  let b = this.length;
  if (!a) {
    return this.apply || this.g[0] || this.add(), console.warn("When calling .render() by passing no data nothing will happen!"), this;
  }
  let e;
  if (Array.isArray(a)) {
    if (e = a.length, !e) {
      return this.remove(0, b);
    }
  } else {
    a = [a], e = 1;
  }
  const f = this.key;
  !b || f || this.recycle || (this.remove(0, b), b = 0);
  let k = b < e ? b : e, d = 0;
  if (d < k) {
    for (let h, g; d < k; d++) {
      h = this.g[d];
      g = a[d];
      if (f && h._mkk !== g[f]) {
        return this.reconcile(a, c, d, 1);
      }
      this.update(h, g, c, d, 1);
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
m.replace = function(a, c, b, e) {
  "undefined" === typeof e && ("number" === typeof a ? (e = a, a = this.g[e]) : e = this.index(a));
  var f;
  if (this.key) {
    var k = c[this.key];
    if (f = this.i[k]) {
      if (f !== a) {
        var d = this.index(f);
        this.g[e] = f;
        this.g[d] = a;
        k = d < e ? f : a;
        d = d < e ? a : f;
        const h = k.nextElementSibling;
        this.root.insertBefore(k, d);
        h !== d && this.root.insertBefore(d, h);
      }
    } else {
      this.pool && (f = this.j[k]) && (this.j[k] = null, this.l--, E(this, a), this.g[e] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? !this.apply || this.apply(c, b || this.state, e, f._mkp || r(f, this.h._mkp, this.cache)) : (c = this.create(c, b, e, 1), (this.key || this.pool) && E(this, a), this.g[e] = c, a.replaceWith(c));
  return this;
};
m.update = function(a, c, b, e) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  "undefined" === typeof e && ("number" === typeof a ? (e = a, a = this.g[a]) : e = this.index(a));
  this.apply(c, b || this.state, e, a._mkp || r(a, this.h._mkp, this.cache));
  return this;
};
m.create = function(a, c, b, e) {
  let f = this.key;
  const k = f && a[f];
  let d, h, g, l;
  f && this.pool && (h = this.j) && (d = h[k]) ? (l = 1, h[k] = null, this.l--) : (!f || this.recycle) && this.pool && (h = this.m) && h.length ? d = h.pop() : (d = g = this.h, g || (this.h = d = g = z(this.tpl, [], "", null, this), this.tpl = null));
  this.apply && this.apply(a, c || this.state, b, d._mkp || r(d, this.h._mkp, !!g || this.cache));
  g && (d = d.cloneNode(!0));
  f && (l || (d._mkk = k), e && (this.i[k] = d));
  return d;
};
m.add = function(a, c, b) {
  let e;
  "number" === typeof c ? (b = c, c = null, e = b < this.length) : b || 0 === b ? e = b < this.length : b = this.length;
  a = this.create(a, c, b, 1);
  e ? (this.root.insertBefore(a, this.g[b]), F(this.g, this.length - 1, b, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  return this;
};
m.reconcile = function(a, c, b, e) {
  const f = this.g, k = this.i, d = this.key;
  let h = a.length, g = f.length, l = g > h ? g : h, t = 0;
  for (b || (b = 0); b < l; b++) {
    var n = void 0;
    if (b < h) {
      var q = a[b], p = b >= g;
      let u, y, A;
      if (!p && (u = f[b], y = q[d], A = u._mkk, A === y)) {
        e && this.update(u, q, c, b, 1);
        continue;
      }
      if (p || !k[y]) {
        e && (p || !this.pool ? (g++, l = g > h ? g : h, this.add(q, c, b)) : this.replace(u, q, c, b));
        continue;
      }
      let w, v;
      for (p = b + 1; p < l; p++) {
        if (!w && p < g && f[p]._mkk === y && (w = p + 1), !v && p < h && a[p][d] === A && (v = p + 1), w && v) {
          w >= v ? (n = f[w - 1], this.root.insertBefore(n, u), e && this.update(n, q, c, b, 1), w === v ? (1 < p - b && this.root.insertBefore(u, f[w]), f[b] = f[p], (f[p] = u) || console.error("Error")) : (F(f, w - 1, b), t++)) : (q = v - 1 + t, this.root.insertBefore(u, f[q] || null), F(f, b, (q > g ? g : q) - 1), t--, b--);
          n = 1;
          break;
        }
      }
    }
    n || (this.remove(b), g--, l = g > h ? g : h, b--);
  }
  return this;
};
function F(a, c, b, e) {
  const f = e || a[c];
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
  a[b] = f;
}
m.append = function(a, c, b) {
  let e;
  if ("number" === typeof c) {
    b = c, c = null, e = 1;
  } else if (b || 0 === b) {
    e = 1;
  }
  const f = a.length;
  for (let k = 0; k < f; k++) {
    this.add(a[k], c, e ? b++ : null);
  }
  return this;
};
m.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
m.remove = function(a, c) {
  let b = this.length;
  b && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = b + a - 1));
  if (!b || a >= b) {
    return this;
  }
  c ? 0 > c && (a -= c + 1, 0 > a && (a = 0), c *= -1) : c = 1;
  !a && c >= b ? (a = this.g, c = a.length, this.root.textContent = "", this.root._mkd = this.g = [], b = 0) : (a = this.g.splice(a, c), b -= c);
  const e = this.pool && !this.key, f = this.key || this.pool;
  for (let k = 0, d; k < c; k++) {
    d = a[e ? c - k - 1 : k], b && d.remove(), f && E(this, d);
  }
  this.length = b;
  return this;
};
m.index = function(a) {
  return this.g.indexOf(a);
};
m.node = function(a) {
  return this.g[a];
};
function E(a, c) {
  if (a.key) {
    var b = c._mkk;
    a.i[b] = null;
  }
  if (a.pool) {
    if (a.key) {
      if (!0 === a.pool || a.l < a.pool) {
        a.j[b] = c, a.l++;
      }
    } else {
      if (b = a.m.length, !0 === a.pool || b < a.pool) {
        a.m[b] = c;
      }
    }
  }
}
m.destroy = function() {
  for (let a = 0, c; a < this.inc.length; a++) {
    c = this.inc[a], C[c.name] || c.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.i = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.j = this.m = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.h = null;
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
export default D;

