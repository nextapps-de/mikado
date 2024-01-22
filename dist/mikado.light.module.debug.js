/**!
 * Mikado.js v0.8.323 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
var n;
function q(a, b, c) {
  let d;
  c && (d = a._mkc) && (a._mkc = null);
  const h = b.length, k = [], e = {};
  for (let l = 0, p, m, r, v, w = null; l < h; l++) {
    p = b[l];
    if (m = p.v) {
      if (v = r = e[m], !v) {
        a: {
          var f = a, g = m;
          for (let u = 0, A = g.length, y = ""; u < A; u++) {
            const t = g[u];
            y += t;
            if (e[y]) {
              f = e[y];
            } else {
              if (">" === t) {
                f = f.firstChild;
              } else {
                if ("|" === t) {
                  r = [f.firstChild, f];
                  break a;
                }
                if ("@" === t) {
                  r = [f.style, f];
                  break a;
                }
                f = f.nextSibling;
              }
              e[y] = f;
            }
          }
          r = [f];
        }
        v = r[0];
        r = r[1] || v;
      }
    } else {
      v = r = a;
    }
    c && (w = d ? d[l] : {}, r._mkc = w);
    k[l] = new x(w, v, "");
  }
  return a._mkp = k;
}
function z(a, b, c, d, h, k) {
  const e = h || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let f, g;
  if (g = b.class) {
    "object" === typeof g ? c.push(new x(f = {_c:""}, e, d)) : h || (e.className = g);
  }
  if (g = b.attr) {
    for (const l in g) {
      let p = g[l];
      "object" === typeof p ? (f || c.push(new x(f = {}, e, d)), f["_a" + l] = !1) : h || e.setAttribute(l, p);
    }
  }
  if (g = b.style) {
    "object" === typeof g ? (c.push(new x(f || (f = {}), e.style, d + "@")), f._s = "") : h || (e.style.cssText = g);
  }
  if (g = b.text) {
    "object" === typeof g ? (a = e, g = g[0], b.tag ? (d += "|", a = !h && e.firstChild, a || (a = document.createTextNode(g), e.appendChild(a))) : f = {}, (f || (f = {}))._t = g, c.push(new x(f, a, d))) : h || (b.tag ? e.textContent = g : e.nodeValue = g);
  } else if (g = b.child) {
    if (h && (h = h.firstChild, !h)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    g.constructor !== Array && (g = [g]);
    for (let l = 0, p, m = g.length; l < m; l++) {
      if (p = g[l], d = l ? d + "+" : d + ">", b = z(a, p, c, d, h, 1), h) {
        if (l < m - 1 && (h = h.nextSibling, !h)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        e.appendChild(b);
      }
    }
  } else if (g = b.html) {
    "object" === typeof g ? (f || c.push(new x(f = {}, e, d)), f._h = "") : h || (e.innerHTML = g);
  } else if (g = b.inc) {
    f || c.push(new x(null, e, d));
    let l;
    if ("string" === typeof g) {
      l = C[g];
      if (!l) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(l instanceof D)) {
        d = l[0];
        if (b = l[1]) {
          b.async = !1, h && (b.root = h, b.hydrate = !0);
        }
        C[g] = l = new D(d, b);
      }
    } else if (1 !== g) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      l = new D({name:a.name + "|" + d, tpl:g, key:g.key, cache:g.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:!!a.pool, state:a.state, mount:e, hydrate:!!h});
    }
    1 !== g && a.inc.push(l);
  }
  f && (e._mkc = f);
  k || (e._mkp = c);
  return e;
}
const E = {checked:1, selected:1, hidden:1};
function x(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
n = x.prototype;
n._a = function(a, b, c, d, h) {
  if (this.c) {
    if (d) {
      if (h || 0 === h) {
        d = d[h] || (d[h] = {});
      }
      d["_a" + a] = b;
    }
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !E[a] || c && "selected" === a ? !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b) : this.n[a] = b;
};
n._t = function(a, b, c) {
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
n._c = function(a, b, c) {
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
n._s = function(a, b, c) {
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
n._h = function(a, b, c) {
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
  if (!a.tpl) {
    throw Error("Initialization Error: Template isn't supported.");
  }
  this.g = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.shadow = b.shadow || !1;
  this.key = a.key || "";
  this.j = {};
  c = a.fn;
  a.m || c && (a.m = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = (c = this.recycle || !!this.key) && b.pool ? 1 : 0;
  this.l = [];
  this.h = new Map();
  this.cache = c && (a.cache || !!b.cache);
  this.root ? this.mount(this.root, b.hydrate) : this.i = null;
}
n = D.prototype;
n.mount = function(a, b) {
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
    this.g = a._mkd;
    this.length = this.g.length;
  } else if (c) {
    c.clear(), a._mkd = this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
  } else {
    if (b) {
      var h = a.children;
      const k = h.length, e = Array(k);
      for (let f = 0; f < k; f++) {
        e[f] = h[f];
      }
      this.g = e;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.j), c === this) {
      this.j = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let k = 0, e, f; k < this.length; k++) {
          e = this.g[k], (f = e.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), e._mkk = f, d[f] = e;
        }
      }
      a._mkl = this.j = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.i || (b && this.length && (this.i = this.g[0].cloneNode(!0), z(this, this.tpl.tpl, [], "", this.i) && F(this)), this.tpl && (this.i = z(this, this.tpl.tpl, [], ""), F(this)));
  return this;
};
function F(a) {
  a.tpl.m && (a.tpl.fn = a.tpl.m, a.tpl.m = null);
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
  if (!a && !this.apply) {
    return this.g[0] || this.add(), this;
  }
  if (Array.isArray(a)) {
    var d = a.length;
    if (!d) {
      return this.remove(0, c);
    }
  } else {
    a = [a], d = 1;
  }
  var h = this.key;
  !c || h || this.recycle || (this.remove(0, c), c = 0);
  var k = c < d ? c : d, e = 0;
  if (e < k) {
    for (let l, p; e < k; e++) {
      l = this.g[e];
      p = a[e];
      if (h && l._mkk !== p[h]) {
        c = this.g;
        d = this.j;
        h = this.key;
        k = a.length;
        let m = c.length, r = m > k ? m : k, v = 0;
        for (e || (e = 0); e < r; e++) {
          var f = void 0;
          if (e < k) {
            const w = a[e];
            var g = e >= m;
            let u, A, y;
            if (!g && (u = c[e], A = w[h], y = u._mkk, y === A)) {
              this.update(u, w, b, e, 1);
              continue;
            }
            if (g || !d[A]) {
              g || !this.pool ? (m++, r = m > k ? m : k, this.add(w, b, e)) : this.replace(u, w, b, e);
              continue;
            }
            let t, B;
            for (g = e + 1; g < r; g++) {
              if (!t && g < m && c[g]._mkk === A && (t = g + 1), !B && g < k && a[g][h] === y && (B = g + 1), t && B) {
                t >= B + v ? (f = c[t - 1], this.root.insertBefore(f, u), this.update(f, w, b, e, 1), t === B ? (1 < g - e && this.root.insertBefore(u, c[t]), c[e] = c[g], (c[g] = u) || console.error("reconcile.error 1")) : (t - 1 === e && console.error("reconcile.error 2"), G(c, t - 1, e), v++)) : (f = B - 1 + v, this.root.insertBefore(u, c[f] || null), (f > m ? m : f) - 1 === e && console.error("reconcile.error 3"), G(c, e, (f > m ? m : f) - 1), v--, e--);
                f = 1;
                break;
              }
            }
          }
          f || (this.remove(e), m--, r = m > k ? m : k, e--);
        }
        return this;
      }
      this.update(l, p, b, e, 1);
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
n.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var h;
  if (this.key) {
    var k = b[this.key];
    if (h = this.j[k]) {
      if (h !== a) {
        k = this.index(h);
        const e = k < d ? h : a, f = k < d ? a : h;
        let g = this.g[k < d ? k + 1 : d + 1];
        this.g[d] = h;
        this.g[k] = a;
        g !== f ? this.root.insertBefore(e, f) : g = e;
        this.root.insertBefore(f, g);
      }
    } else {
      this.pool && (h = this.h.get(k)) && (this.h.delete(k), H(this, a), this.g[d] = h, a.replaceWith(h));
    }
  } else {
    this.recycle && (h = a);
  }
  h ? this.apply && this.apply(b, c || this.state, d, h._mkp || q(h, this.i._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && H(this, a), this.g[d] = b, a.replaceWith(b));
  return this;
};
n.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.g[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || q(a, this.i._mkp, this.cache));
  return this;
};
n.create = function(a, b, c, d) {
  const h = this.key, k = h && a[h];
  let e;
  var f;
  let g, l;
  this.pool && (h ? (f = this.h) && (e = f.get(k)) && (f.delete(k), l = 1) : (f = this.l) && f.length && (e = f.pop()));
  e || (e = g = this.i, g || (this.i = e = g = z(this, this.tpl.tpl, [], ""), F(this)));
  let p;
  this.apply && (f = e._mkp || q(e, this.i._mkp, !!g || this.cache), p = g && this.cache && Array(f.length), this.apply(a, b || this.state, c, f, !!g, p));
  g && (e = g.cloneNode(!0), p && !0 !== p && (e._mkc = p));
  h && (l || (e._mkk = k), d && (this.j[k] = e));
  return e;
};
n.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), G(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  this.key && this.pool && this.pool < this.length && (this.pool = this.length);
  return this;
};
function G(a, b, c, d) {
  const h = d || a[b];
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
  a[c] = h;
}
n.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const h = a.length;
  for (let k = 0; k < h; k++) {
    this.add(a[k], b, d ? c++ : null);
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
  let d;
  !a && b >= c ? (d = this.g, b = d.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (d = this.g.splice(a, b), c -= b);
  const h = this.pool && !this.key, k = this.key || this.pool;
  (a = this.key && this.pool) && b >= a && (this.h = new Map(), a = 0);
  for (let e = 0, f; e < b; e++) {
    f = d[h ? b - e - 1 : e], c && f.remove(), k && H(this, f, 1);
  }
  if (a && 0 < (a = this.h.size - a)) {
    for (b = this.h.keys(); a--;) {
      this.h.delete(b.next().value);
    }
  }
  this.length = c;
  return this;
};
n.index = function(a) {
  return a ? this.g.indexOf(a) : -1;
};
n.node = function(a) {
  return this.g[a];
};
function H(a, b, c) {
  let d;
  a.key && (d = b._mkk, a.j[d] = null);
  a.pool && (d ? (a.h.set(d, b), !c && a.h.size > a.pool && a.h.delete(a.h.keys().next().value)) : a.l[a.l.length] = b);
}
n.flush = function() {
  this.l = [];
  this.h = new Map();
  return this;
};
n.destroy = function() {
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], C[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.j = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.h = this.l = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.i = null;
};
D.once = function(a, b, c, d) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  if (c || b.fn) {
    b = new D(b);
    if (c && Array.isArray(c)) {
      for (let h = 0; h < c.length; h++) {
        a.append(b.create(c[h], d, h));
      }
    } else {
      a.append(b.create(c, d));
    }
    b.destroy();
  } else {
    c = z({}, b.tpl, [], "", null, 1), a.append(c);
  }
  return D;
};
D.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = C[c], a instanceof D || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  C[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
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

