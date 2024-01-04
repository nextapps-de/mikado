/**!
 * Mikado.js v0.8.200 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
var n;
function p(a, b, c) {
  const e = b.length, f = [], h = {};
  for (let g = 0, m, q, l, u, A, x = null; g < e; g++) {
    m = b[g];
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
    c && A !== l && (A = l, l._mkc = x = {});
    f[g] = new w(x, u, "");
  }
  return a._mkp = f;
}
function z(a, b, c, e, f, h) {
  const d = f || (b.tag ? b.o ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let k, g;
  if (g = b.class) {
    "object" === typeof g ? c.push(new w(k = {_c:""}, d, e)) : f || (d.className = g);
  }
  if (g = b.attr) {
    for (const m in g) {
      let q = g[m];
      "object" === typeof q ? (k || c.push(new w(k = {}, d, e)), k["_a" + m] = !1) : f || d.setAttribute(m, q);
    }
  }
  if (g = b.event) {
    for (const m in g) {
      f || d.setAttribute(m, g[m]);
    }
  }
  if (g = b.style) {
    "object" === typeof g ? (c.push(new w(k || (k = {}), d.style, e + "@")), k._s = "") : f || (d.style.cssText = g);
  }
  if (g = b.text) {
    "object" === typeof g ? (a = d, g = g[0], b.tag ? (e += "|", a = !f && d.firstChild, a || (a = document.createTextNode(g), d.appendChild(a))) : k = {}, (k || (k = {}))._t = g, c.push(new w(k, a, e))) : f || (b.tag ? d.textContent = g : d.nodeValue = g);
  } else if (g = b.child) {
    if (f && (f = f.firstChild, !f)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    g.constructor !== Array && (g = [g]);
    for (let m = 0, q, l = g.length; m < l; m++) {
      if (q = g[m], e = m ? e + "+" : e + ">", b = z(a, q, c, e, f, 1), f) {
        if (m < l - 1 && (f = f.nextSibling, !f)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        d.appendChild(b);
      }
    }
  } else if (g = b.html) {
    "object" === typeof g ? (k || c.push(new w(k = {}, d, e)), k._h = "") : f || (d.innerHTML = g);
  } else if (g = b.inc) {
    k || c.push(new w(null, d, e));
    if ("string" === typeof g) {
      b = C[g];
      if (!b) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(b instanceof D)) {
        e = b[0];
        if (b = b[1]) {
          b.async = !1, f && (b.root = f, b.hydrate = !0);
        }
        C[g] = b = new D(e, b);
      }
    } else {
      e = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + e + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      b = new D({name:a.name + "|" + e, tpl:g, key:g.key, cache:g.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:d, hydrate:!!f});
    }
    a.inc.push(b);
  }
  k && (d._mkc = k);
  h || (d._mkp = c);
  return d;
}
function w(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
n = w.prototype;
n._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
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
/*
 this.recycle ||*/
const C = Object.create(null);
function D(a, b = {}) {
  if (!(this instanceof D)) {
    return new D(a, b);
  }
  if ("string" === typeof a) {
    var c = C[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof D) {
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
  this.j = {};
  c = a.fn;
  a.m || c && (a.m = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (this.key || this.recycle) && b.pool || 0;
  this.l = [];
  this.i = new Map();
  this.cache = a.cache || !!b.cache;
  this.root ? this.mount(this.root, b.hydrate) : this.h = null;
}
n = D.prototype;
n.mount = function(a, b) {
  const c = a._mki;
  var e = this.root !== a;
  if (c === this) {
    if (!e) {
      return this;
    }
    this.g = a._mkd;
    this.length = this.g.length;
  } else if (c) {
    c.clear(), a._mkd = this.g = [], this.length = 0;
  } else {
    if (b) {
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
    if (e && this.root && (this.root._mkl = this.j), c === this) {
      this.j = a._mkl;
    } else {
      e = {};
      if (!c && b && this.length) {
        for (let h = 0, d, k; h < this.length; h++) {
          d = this.g[h], k = d.getAttribute("key"), d._mkk = k, e[k] = d;
        }
      }
      a._mkl = this.j = e;
    }
  }
  a._mki = this;
  this.root = a;
  this.h || (b && this.length && (this.h = this.g[0].cloneNode(), z(this, this.tpl.tpl, [], "", this.h) && E(this)), this.tpl && (this.h = z(this, this.tpl.tpl, [], ""), E(this)));
  return this;
};
function E(a) {
  a.tpl.m && (a.tpl.fn.length && console.error("The template '" + a.name + "' might not have been initialized properly. There are " + a.tpl.fn.length + " template functions left which wasn't assigned. Please post an example to Mikado Github issues."), a.tpl.fn = a.tpl.m, a.tpl.m = null);
  a.tpl = null;
}
n.render = function(a, b) {
  if (!this.root) {
    throw Error("Template was not mounted or root was not found.");
  }
  if (this.root._mki !== this) {
    throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
  }
  var c = this.length;
  if (!a) {
    return this.apply ? console.warn("When calling .render() by passing no data nothing will happen!") : this.g[0] || this.add(), this;
  }
  if (Array.isArray(a)) {
    var e = a.length;
    if (!e) {
      return this.remove(0, c);
    }
  } else {
    a = [a], e = 1;
  }
  var f = this.key;
  !c || f || this.recycle || (this.remove(0, c), c = 0);
  var h = c < e ? c : e, d = 0;
  if (d < h) {
    for (let m, q; d < h; d++) {
      m = this.g[d];
      q = a[d];
      if (f && m._mkk !== q[f]) {
        c = this.g;
        e = this.j;
        f = this.key;
        h = a.length;
        let l = c.length, u = l > h ? l : h, A = 0;
        for (d || (d = 0); d < u; d++) {
          var k = void 0;
          if (d < h) {
            const x = a[d];
            var g = d >= l;
            let t, y, B;
            if (!g && (t = c[d], y = x[f], B = t._mkk, B === y)) {
              this.update(t, x, b, d, 1);
              continue;
            }
            if (g || !e[y]) {
              g || !this.pool ? (l++, u = l > h ? l : h, this.add(x, b, d)) : this.replace(t, x, b, d);
              continue;
            }
            let r, v;
            for (g = d + 1; g < u; g++) {
              if (!r && g < l && c[g]._mkk === y && (r = g + 1), !v && g < h && a[g][f] === B && (v = g + 1), r && v) {
                r >= v ? (k = c[r - 1], this.root.insertBefore(k, t), this.update(k, x, b, d, 1), r === v ? (1 < g - d && this.root.insertBefore(t, c[r]), c[d] = c[g], (c[g] = t) || console.error("Error")) : (F(c, r - 1, d), A++)) : (k = v - 1 + A, this.root.insertBefore(t, c[k] || null), F(c, d, (k > l ? l : k) - 1), A--, d--);
                k = 1;
                break;
              }
            }
          }
          k || (this.remove(d), l--, u = l > h ? l : h, d--);
        }
        return this;
      }
      this.update(m, q, b, d, 1);
    }
  }
  if (d < e) {
    for (; d < e; d++) {
      this.add(a[d], b);
    }
  } else {
    e < c && this.remove(e, c - e);
  }
  return this;
};
n.replace = function(a, b, c, e) {
  "undefined" === typeof e && ("number" === typeof a ? (e = 0 > a ? this.length + a : a, a = this.g[e]) : e = this.index(a));
  var f;
  if (this.key) {
    var h = b[this.key];
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
      this.pool && (f = this.i.get(h)) && (this.i.delete(h), G(this, a), this.g[e] = f, a.replaceWith(f));
    }
  } else {
    this.recycle && (f = a);
  }
  f ? !this.apply || this.apply(b, c || this.state, e, f._mkp || p(f, this.h._mkp, this.cache)) : (b = this.create(b, c, e, 1), (this.key || this.pool) && G(this, a), this.g[e] = b, a.replaceWith(b));
  return this;
};
n.update = function(a, b, c, e) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  "undefined" === typeof e && ("number" === typeof a ? (e = 0 > a ? this.length + a - 1 : a, a = this.g[e]) : e = this.index(a));
  this.apply(b, c || this.state, e, a._mkp || p(a, this.h._mkp, this.cache));
  return this;
};
n.create = function(a, b, c, e) {
  let f = this.key;
  const h = f && a[f];
  let d, k, g, m;
  f && this.pool && (k = this.i) && (d = k.get(h)) ? (m = 1, k.delete(h)) : (!f || this.recycle) && this.pool && (k = this.l) && k.length ? d = k.pop() : (d = g = this.h, g || (this.h = d = g = z(this, this.tpl.tpl, [], ""), E(this)));
  this.apply && this.apply(a, b || this.state, c, d._mkp || p(d, this.h._mkp, !!g || this.cache));
  g && (d = d.cloneNode(!0));
  f && (m || (d._mkk = h), e && (this.j[h] = d));
  return d;
};
n.add = function(a, b, c) {
  let e;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, e = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), e = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  e ? (this.root.insertBefore(a, this.g[c]), F(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  return this;
};
function F(a, b, c, e) {
  const f = e || a[b];
  e && b++;
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
n.append = function(a, b, c) {
  let e;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, e = 1) : "number" === typeof c && (0 > c && (c += this.length), e = 1);
  const f = a.length;
  for (let h = 0; h < f; h++) {
    this.add(a[h], b, e ? c++ : null);
  }
  return this;
};
n.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
n.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  const e = this.pool && !this.key, f = this.key || this.pool;
  for (let h = 0, d; h < b; h++) {
    d = a[e ? b - h - 1 : h], c && d.remove(), f && G(this, d);
  }
  this.length = c;
  return this;
};
n.index = function(a) {
  return this.g.indexOf(a);
};
n.node = function(a) {
  return this.g[a];
};
function G(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.j[c] = null;
  }
  if (a.pool) {
    if (c) {
      a.i.set(c, b), !0 !== a.pool && a.i.size > a.pool && a.i.delete(a.i.keys().next().value);
    } else {
      if (c = a.l.length, !0 === a.pool || c < a.pool) {
        a.l[c] = b;
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
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], C[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.j = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.i = this.l = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.h = null;
};
D.once = function(a, b, c, e, f) {
  const h = new D(b);
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
  a.append(h.create(c, e));
  f || h.destroy();
  return D;
};
D.register = function(a, b) {
  let c, e;
  if ("string" === typeof a) {
    if (c = e = a, a = C[c], a instanceof D || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  C[c] && (e ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  C[c] = [a, b];
  return D;
};
D.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = C[a];
  b && (b instanceof D && b.destroy(), C[a] = null);
  return D;
};
export default D;

