/**!
 * Mikado.js v0.8.139 (Light/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var n;
function p(a, c, b) {
  const e = c.length, f = [], h = {};
  for (let g = 0, m, q, l, u, A, x = null; g < e; g++) {
    m = c[g];
    if (q = m.v) {
      if (u = l = h[q], !u) {
        let t = void 0;
        var d = a, k = q;
        for (let y = 0, B = k.length, r = ""; y < B; y++) {
          const v = k[y];
          r += v;
          h[r] ? d = h[r] : (">" === v ? d = d.firstChild : "|" === v ? (t = d, d = d.firstChild) : "@" === v ? (t = d, d = d.style) : d = d.nextSibling, h[r] = d);
        }
        l = [d, t];
        u = l[0];
        l = l[1] || u;
      }
    } else {
      u = l = a;
    }
    b && A !== l && (A = l, l._mkc = x = {});
    f[g] = new w(x, u, "");
  }
  return a._mkp = f;
}
function z(a, c, b, e, f, h) {
  const d = e || (a.tag ? a.o ? document.createElementNS("http://www.w3.org/2000/svg", a.tag) : document.createElement(a.tag) : document.createTextNode(a.text));
  let k, g;
  if (g = a.class) {
    "object" === typeof g ? c.push(new w(k = {_c:""}, d, b)) : e || (d.className = g);
  }
  if (g = a.attr) {
    for (const m in g) {
      let q = g[m];
      "object" === typeof q ? (k || c.push(new w(k = {}, d, b)), k["_a" + m] = !1) : e || d.setAttribute(m, q);
    }
  }
  if (g = a.event) {
    for (const m in g) {
      e || d.setAttribute(m, g[m]);
    }
  }
  if (g = a.style) {
    "object" === typeof g ? (c.push(new w(k || (k = {}), d.style, b + "@")), k._s = "") : e || (d.style.cssText = g);
  }
  if (g = a.text) {
    "object" === typeof g ? (f = d, g = g[0], a.tag ? (b += "|", f = !e && d.firstChild, f || (f = document.createTextNode(g), d.appendChild(f))) : k = {}, (k || (k = {}))._t = g, c.push(new w(k, f, b))) : e || (a.tag ? d.textContent = g : d.nodeValue = g);
  } else if (g = a.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + f.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    g.constructor !== Array && (g = [g]);
    for (let m = 0, q, l = g.length; m < l; m++) {
      if (q = g[m], b = m ? b + "+" : b + ">", a = z(q, c, b, e, f, 1), e) {
        if (m < l - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + f.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        d.appendChild(a);
      }
    }
  } else if (g = a.html) {
    "object" === typeof g ? (k || c.push(new w(k = {}, d, b)), k._h = "") : e || (d.innerHTML = g);
  } else if (g = a.inc) {
    k || c.push(new w(null, d, b));
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
      if (!f.tpl.m.length) {
        throw Error("The template '" + f.name + "|" + b + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      a = new D({name:f.name + "|" + b, tpl:g, key:g.key, cache:g.cache, fn:f.tpl.m}, {recycle:f.recycle, cache:f.cache, pool:f.pool, state:f.state, mount:d, hydrate:!!e});
    }
    f.inc.push(a);
  }
  k && (d._mkc = k);
  h || (d._mkp = c);
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
      var f = a.children;
      const h = f.length, d = Array(h);
      for (let k = 0; k < h; k++) {
        d[k] = f[k];
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
        for (let h = 0, d, k; h < this.length; h++) {
          d = this.g[h], k = d.getAttribute("key"), d._mkk = k, e[k] = d;
        }
      }
      a._mkl = this.j = e;
    }
  }
  a._mki = this;
  this.root = a;
  this.h || (c && this.length && (this.h = this.g[0].cloneNode(), z(this.tpl, [], "", this.h, this) && (this.tpl = null)), this.tpl && (this.h = z(this.tpl, [], "", null, this), this.tpl = null));
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
  var f = this.key;
  !b || f || this.recycle || (this.remove(0, b), b = 0);
  var h = b < e ? b : e, d = 0;
  if (d < h) {
    for (let m, q; d < h; d++) {
      m = this.g[d];
      q = a[d];
      if (f && m._mkk !== q[f]) {
        b = this.g;
        e = this.j;
        f = this.key;
        h = a.length;
        let l = b.length, u = l > h ? l : h, A = 0;
        for (d || (d = 0); d < u; d++) {
          var k = void 0;
          if (d < h) {
            const x = a[d];
            var g = d >= l;
            let t, y, B;
            if (!g && (t = b[d], y = x[f], B = t._mkk, B === y)) {
              this.update(t, x, c, d, 1);
              continue;
            }
            if (g || !e[y]) {
              g || !this.pool ? (l++, u = l > h ? l : h, this.add(x, c, d)) : this.replace(t, x, c, d);
              continue;
            }
            let r, v;
            for (g = d + 1; g < u; g++) {
              if (!r && g < l && b[g]._mkk === y && (r = g + 1), !v && g < h && a[g][f] === B && (v = g + 1), r && v) {
                r >= v ? (k = b[r - 1], this.root.insertBefore(k, t), this.update(k, x, c, d, 1), r === v ? (1 < g - d && this.root.insertBefore(t, b[r]), b[d] = b[g], (b[g] = t) || console.error("Error")) : (E(b, r - 1, d), A++)) : (k = v - 1 + A, this.root.insertBefore(t, b[k] || null), E(b, d, (k > l ? l : k) - 1), A--, d--);
                k = 1;
                break;
              }
            }
          }
          k || (this.remove(d), l--, u = l > h ? l : h, d--);
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
  var f;
  if (this.key) {
    var h = c[this.key];
    if (f = this.j[h]) {
      if (f !== a) {
        var d = this.index(f);
        this.g[e] = f;
        this.g[d] = a;
        h = d < e ? f : a;
        d = d < e ? a : f;
        const k = h.nextElementSibling;
        this.root.insertBefore(h, d);
        k !== d && this.root.insertBefore(d, k);
      }
    } else {
      this.pool && (f = this.i.get(h)) && (this.i.delete(h), F(this, a), this.g[e] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? !this.apply || this.apply(c, b || this.state, e, f._mkp || p(f, this.h._mkp, this.cache)) : (c = this.create(c, b, e, 1), (this.key || this.pool) && F(this, a), this.g[e] = c, a.replaceWith(c));
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
  let f = this.key;
  const h = f && a[f];
  let d, k, g, m;
  f && this.pool && (k = this.i) && (d = k.get(h)) ? (m = 1, k.delete(h)) : (!f || this.recycle) && this.pool && (k = this.l) && k.length ? d = k.pop() : (d = g = this.h, g || (this.h = d = g = z(this.tpl, [], "", null, this), this.tpl = null));
  this.apply && this.apply(a, c || this.state, b, d._mkp || p(d, this.h._mkp, !!g || this.cache));
  g && (d = d.cloneNode(!0));
  f && (m || (d._mkk = h), e && (this.j[h] = d));
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
n.append = function(a, c, b) {
  let e;
  if ("number" === typeof c) {
    b = c, c = null, e = 1;
  } else if (b || 0 === b) {
    e = 1;
  }
  const f = a.length;
  for (let h = 0; h < f; h++) {
    this.add(a[h], c, e ? b++ : null);
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
  const e = this.pool && !this.key, f = this.key || this.pool;
  for (let h = 0, d; h < c; h++) {
    d = a[e ? c - h - 1 : h], b && d.remove(), f && F(this, d);
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
D.once = function(a, c, b, e, f) {
  const h = new D(c);
  "function" === typeof e && (f = e, e = null);
  if (f) {
    const d = f;
    f = function() {
      h.destroy();
      d();
    };
  }
  if (!a) {
    throw Error("Root element is not defined.");
  }
  a.append(h.create(b, e));
  f || h.destroy();
  return D;
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
