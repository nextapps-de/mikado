/**!
 * Mikado.js v0.8.215 (Bundle/Module/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
var m;
const n = {}, w = {}, z = Object.create(null), aa = Object.create(null), ba = document.documentElement || document.body.parentNode, A = "ontouchstart" in window, B = !A && window.PointerEvent && navigator.maxTouchPoints;
let ca;
function C(a, b) {
  b || (b = a.type);
  var c = a.target;
  let d;
  if ("undefined" === typeof d) {
    for (; c && c !== ba;) {
      var e = void 0;
      "click" === b && ca && (e = c.getAttribute("tap"));
      e || (e = c.getAttribute(b));
      if (e) {
        var g = e.indexOf(":"), f = c;
        if (-1 < g) {
          var h = e.substring(0, g);
          g = e.substring(g + 1);
          for (e = ""; (f = f.parentElement) !== ba;) {
            if (f.hasAttribute(g)) {
              e = h;
              break;
            }
          }
          e || console.warn("Event root '" + g + "' was not found for the event: '" + h + "'.");
        }
        if (e) {
          d || (d = []);
          d.push([e, f]);
          break;
        }
      }
      c = c.parentElement;
    }
  }
  if (d) {
    for (let k = 0, l; k < d.length; k++) {
      if (l = d[k], e = l[0], c = z[e]) {
        f = l[1];
        if (h = aa[e]) {
          h.prevent && a.preventDefault(), h.stop && a.stopImmediatePropagation(), h.once && (z[e] = null);
        }
        c(f, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function da(a, b) {
  n[a] || (E(1, a, C, b), n[a] = 1, w[a] = b || null);
  return this;
}
let F, G, ea;
if (A || B) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    F = e.clientX;
    G = e.clientY;
  }
  function b(d) {
    const e = F, g = G;
    var f = d, h = d.changedTouches;
    h && (f = h[0]);
    F = f.clientX;
    G = f.clientY;
    15 > Math.abs(F - e) && 15 > Math.abs(G - g) && C(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  ea = function(d) {
    E(d, B ? "pointerdown" : "touchstart", a, c);
    E(d, B ? "pointerup" : "touchend", b, c);
  };
}
function E(a, b, c, d) {
  if ("tap" === b) {
    if (A || B) {
      ea(a);
      return;
    }
    ca = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function H(a, b, c) {
  const d = b.length, e = [], g = {};
  for (let k = 0, l, r, p, t, q, v = null; k < d; k++) {
    l = b[k];
    if (r = l.v) {
      if (t = p = g[r], !t) {
        let u = void 0;
        var f = a, h = r;
        for (let D = 0, y = h.length, x = ""; D < y; D++) {
          const Q = h[D];
          x += Q;
          g[x] ? f = g[x] : (">" === Q ? f = f.firstChild : "|" === Q ? (u = f, f = f.firstChild) : "@" === Q ? (u = f, f = f.style) : f = f.nextSibling, g[x] = f);
        }
        p = [f, u];
        t = p[0];
        p = p[1] || t;
      }
    } else {
      t = p = a;
    }
    c && q !== p && (q = p, p._mkc = v = {});
    e[k] = new I(v, t, "");
  }
  return a._mkp = e;
}
function J(a, b, c, d, e, g) {
  g || (a.m = 1);
  const f = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let h, k;
  if (k = b.class) {
    "object" === typeof k ? (c.push(new I(h = {_c:""}, f, d)), (k = k[0]) ? K(a, k, ["_c", c.length - 1]) : a.m = 0) : e || (f.className = k);
  }
  if (k = b.attr) {
    for (const r in k) {
      let p = k[r];
      "object" === typeof p ? (h || c.push(new I(h = {}, f, d)), h["_a" + r] = !1, (p = p[0]) ? K(a, p, ["_a", c.length - 1, r]) : a.m = 0) : e || f.setAttribute(r, p);
    }
  }
  if (k = b.event) {
    for (const r in k) {
      e || f.setAttribute(r, k[r]), da(r);
    }
  }
  if (k = b.style) {
    "object" === typeof k ? (c.push(new I(h || (h = {}), f.style, d + "@")), h._s = "", (k = k[0]) ? K(a, k, ["_s", c.length - 1]) : a.m = 0) : e || (f.style.cssText = k);
  }
  if (k = b.text) {
    if ("object" === typeof k) {
      var l = f;
      k = k[0];
      b.tag ? (d += "|", l = !e && f.firstChild, l || (l = document.createTextNode(k), f.appendChild(l))) : h = {};
      (h || (h = {}))._t = k;
      c.push(new I(h, l, d));
      k ? K(a, k, ["_t", c.length - 1]) : a.m = 0;
    } else {
      e || (b.tag ? f.textContent = k : f.nodeValue = k);
    }
  } else if (k = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    k.constructor !== Array && (k = [k]);
    for (let r = 0, p, t = k.length; r < t; r++) {
      if (p = k[r], d = r ? d + "+" : d + ">", b = J(a, p, c, d, e, 1), e) {
        if (r < t - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        f.appendChild(b);
      }
    }
  } else if (k = b.html) {
    "object" === typeof k ? (h || c.push(new I(h = {}, f, d)), h._h = "", (k = k[0]) ? K(a, k, ["_h", c.length - 1]) : a.m = 0) : e || (f.innerHTML = k);
  } else if (k = b.inc) {
    h || c.push(new I(null, f, d));
    if ("string" === typeof k) {
      l = L[k];
      if (!l) {
        throw Error("The partial template '" + k + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(l instanceof M)) {
        d = l[0];
        if (b = l[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        L[k] = l = new M(d, b);
      }
    } else if (1 !== k) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      l = new M({name:a.name + "|" + d, tpl:k, key:k.key, cache:k.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:f, hydrate:!!e});
    }
    1 !== k && a.inc.push(l);
  }
  h && (f._mkc = h);
  g || (f._mkp = c);
  return f;
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
m = I.prototype;
m._a = function(a, b) {
  if (this.c) {
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
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
const ha = window.Proxy || function() {
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
    const e = this;
    Object.defineProperty(b, c, {get:function() {
      return d;
    }, set:function(g) {
      fa(e, d = g, c);
    }});
  };
  return a;
}();
function ia(a, b) {
  return "_mkx" === b ? this : a[b];
}
function ja(a, b, c) {
  fa(this, c, b);
  a[b] = c;
  return !0;
}
function fa(a, b, c) {
  if (c = a.fn[c]) {
    for (let d = 0; d < c.length; d++) {
      const e = c[d], g = e[0], f = a.path[e[1]];
      if (!f.c || f.c[g + (e[2] || "")] !== b) {
        f[g](e[2] || b, b);
      }
    }
  }
}
;const L = Object.create(null);
function M(a, b = {}) {
  if (!(this instanceof M)) {
    return new M(a, b);
  }
  if ("string" === typeof a) {
    var c = L[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof M) {
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
  (a = b.observe) && (new N(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.j = null;
}
m = M.prototype;
m.mount = function(a, b) {
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
        for (let g = 0, f; g < c.length; g++) {
          f = J(this, c[g], [], ""), a.append(f), g === c.length - 1 && (a = f);
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
    c.clear();
    a._mkd = this.g = [];
    this.length = 0;
    a.firstChild && (a.textContent = "");
    var e = this.on && this.on.unmount;
    e && e(a, c);
  } else {
    if (b) {
      e = a.children;
      const g = e.length, f = Array(g);
      for (let h = 0; h < g; h++) {
        f[h] = e[h];
      }
      this.g = f;
      this.length = this.g.length;
    } else {
      this.g = [], this.length = 0, a.firstChild && (a.textContent = "");
    }
    a._mkd = this.g;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.o), c === this) {
      this.o = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let g = 0, f, h; g < this.length; g++) {
          f = this.g[g], h = f.getAttribute("key"), f._mkk = h, d[h] = f;
        }
      }
      a._mkl = this.o = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.j || (b && this.length && (this.j = this.g[0].cloneNode(!0), J(this, this.tpl.tpl, [], "", this.j) && O(this)), this.tpl && (this.j = J(this, this.tpl.tpl, [], ""), O(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function O(a) {
  a.tpl.B && (a.tpl.fn = a.tpl.B, a.tpl.B = null);
  a.tpl = null;
}
function ka(a, b, c, d, e) {
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
    return new Promise(function(h) {
      requestAnimationFrame(function() {
        ka(a, b, c, d);
        "function" === typeof e && e();
        h();
      });
    });
  }
  var f = (g = b.cmp) && g.length;
  g && !f && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || f || b.fn) {
    g = new M(b);
    f && (a = g.mount(a).root);
    if (c && Array.isArray(c)) {
      for (f = 0; f < c.length; f++) {
        a.append(g.create(c[f], d, f));
      }
    } else {
      a.append(g.create(c, d));
    }
    g.destroy();
  } else {
    g = J({}, b.tpl, [], "", null, 1), a.append(g);
  }
  return M;
}
m.render = function(a, b, c, d) {
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
      const k = this;
      e || (e = "function" === typeof c);
      k.s = requestAnimationFrame(function() {
        k.s = 0;
        k.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(l) {
        c = l;
      });
    }
  }
  var g = this.length;
  if (!a) {
    return this.apply ? console.warn("When calling .render() by passing no data nothing will happen!") : this.g[0] || this.add(), this;
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
  const f = this.key;
  !g || f || this.recycle || (this.remove(0, g), g = 0);
  let h = g < d ? g : d;
  e = 0;
  if (e < h) {
    for (let k, l; e < h; e++) {
      k = this.g[e];
      l = a[e];
      if (f && k._mkk !== l[f]) {
        return la(this, a, b, e);
      }
      this.update(k, l, b, e, 1);
      this.proxy && !l._mkx && (a[e] = P(this, k, l));
    }
  }
  if (e < d) {
    for (; e < d; e++) {
      g = a[e], this.add(g, b), !this.proxy || this.recycle && g._mkx || (a[e] = P(this, this.g[e], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
m.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var g = b[this.key];
    if (e = this.o[g]) {
      if (e !== a) {
        var f = this.index(e);
        this.g[d] = e;
        this.g[f] = a;
        g = f < d ? e : a;
        f = f < d ? a : e;
        const h = g.nextElementSibling;
        this.root.insertBefore(g, f);
        h !== f && this.root.insertBefore(f, h);
      }
    } else {
      this.pool && (e = this.l.get(g)) && (this.l.delete(g), R(this, a), this.g[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.m && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || H(e, this.j._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && R(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
m.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.m && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.g[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || H(a, this.j._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
m.cancel = function() {
  cancelAnimationFrame(this.s);
  this.s = 0;
  return this;
};
m.create = function(a, b, c, d) {
  let e = this.key;
  const g = e && a[e];
  let f, h, k, l;
  e && this.pool && (h = this.l) && (f = h.get(g)) ? (l = 1, h.delete(g)) : (!e || this.recycle) && this.pool && (h = this.A) && h.length ? f = h.pop() : (f = k = this.j, k || (this.j = f = k = J(this, this.tpl.tpl, [], ""), O(this)));
  this.apply && this.apply(a, b || this.state, c, f._mkp || H(f, this.j._mkp, !!k || this.cache));
  k && (f = f.cloneNode(!0));
  e && (l || (f._mkk = g), d && (this.o[g] = f));
  (a = this.on && this.on[k ? "create" : "recycle"]) && a(f, this);
  return f;
};
m.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), S(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function P(a, b, c) {
  {
    b = b._mkp || H(b, a.j._mkp, a.cache);
    a = a.proxy;
    const d = c._mkx;
    d ? d.path = b : c = new ha(c, {path:b, fn:a, get:ia, set:ja});
  }
  return c;
}
function la(a, b, c, d) {
  const e = a.g, g = a.o, f = a.key;
  let h = b.length, k = e.length, l = k > h ? k : h, r = 0;
  for (d || (d = 0); d < l; d++) {
    var p = void 0;
    if (d < h) {
      var t = b[d], q = d >= k;
      let v, u, D;
      a.proxy && !t._mkx && (b[d] = P(a, e[d], t));
      if (!q && (v = e[d], u = t[f], D = v._mkk, D === u)) {
        a.update(v, t, c, d, 1);
        continue;
      }
      if (q || !g[u]) {
        q || !a.pool ? (k++, l = k > h ? k : h, a.add(t, c, d)) : a.replace(v, t, c, d);
        continue;
      }
      let y, x;
      for (q = d + 1; q < l; q++) {
        if (!y && q < k && e[q]._mkk === u && (y = q + 1), !x && q < h && b[q][f] === D && (x = q + 1), y && x) {
          y >= x ? (p = e[y - 1], a.root.insertBefore(p, v), a.update(p, t, c, d, 1), y === x ? (1 < q - d && a.root.insertBefore(v, e[y]), e[d] = e[q], (e[q] = v) || console.error("Error")) : (S(e, y - 1, d), r++)) : (t = x - 1 + r, a.root.insertBefore(v, e[t] || null), S(e, d, (t > k ? k : t) - 1), r--, d--);
          p = 1;
          break;
        }
      }
    }
    p || (a.remove(d), k--, l = k > h ? k : h, d--);
  }
  return a;
}
function S(a, b, c, d) {
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
m.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let g = 0; g < e; g++) {
    this.add(a[g], b, d ? c++ : null);
  }
  return this;
};
m.clear = function() {
  this.length && this.remove(0, this.length);
  return this;
};
m.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.g, b = a.length, this.root.textContent = "", this.root._mkd = this.g = [], c = 0) : (a = this.g.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, g = this.on && this.on.remove;
  for (let f = 0, h; f < b; f++) {
    h = a[d ? b - f - 1 : f], c && h.remove(), e && R(this, h), g && g(h, this);
  }
  this.length = c;
  return this;
};
m.index = function(a) {
  return this.g.indexOf(a);
};
m.node = function(a) {
  return this.g[a];
};
function R(a, b) {
  if (a.key) {
    var c = b._mkk;
    a.o[c] = null;
  }
  if (a.pool) {
    if (c) {
      a.l.set(c, b), !0 !== a.pool && a.l.size > a.pool && a.l.delete(a.l.keys().next().value);
    } else {
      if (c = a.A.length, !0 === a.pool || c < a.pool) {
        a.A[c] = b;
      }
    }
  }
}
m.flush = function() {
  this.A = [];
  this.l = new Map();
  return this;
};
m.destroy = function() {
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], L[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.o = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.l = this.A = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.j = null;
};
const T = Array.prototype, U = window.Proxy;
let V = !1;
function W(a) {
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
  this.h = null;
  const b = a ? a.length : 0;
  if (U) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.i = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, ma);
  }
  this.i = a || [];
  for (a = 0; a <= b; a++) {
    na(this, a);
  }
  na(this, "length");
}
N.prototype.mount = function(a) {
  this.h !== a && (a.mount(this.h.root), this.h = a);
  return this;
};
function na(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.i[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && na(this, b + 1), ma.set(this, b, c));
  }});
}
const ma = {set:function(a, b, c) {
  let d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  const e = a.h;
  if (!V) {
    V = !0;
    if (e) {
      var g = a.length;
      if (d) {
        W(e);
        const f = e.length;
        g !== f && (a.length = f);
        b >= f ? (e.add(c), a.length++) : b < f && (g = e.g[b], e.recycle || e.key && g._mkk === c[e.key] ? e.update(g, c, null, b) : e.replace(g, c, null, b));
      } else {
        "length" === b && c < g && e.remove(c, g - c);
      }
    }
    V = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = P(e, e.g[b], c));
  (U ? a : a.i)[b] = c;
  return !0;
}};
m = N.prototype;
m.swap = function(a, b) {
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
m.set = function(a) {
  this.splice();
  return this.concat(a);
};
m.splice = function(a, b, c) {
  W(this.h);
  V = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.h.remove(a, b);
  b = c ? this.i.splice(a, b, c) : this.i.splice(a, b);
  c && this.h.add(c, a);
  V = !1;
  return b;
};
m.push = function(a) {
  W(this.h);
  V = !0;
  this.h.add(a);
  this[this.length] = a;
  U && this.length++;
  V = !1;
};
m.unshift = function(a) {
  W(this.h);
  V = !0;
  this.h.add(a, 0);
  this.i.unshift(a);
  V = !1;
};
m.pop = function() {
  W(this.h);
  V = !0;
  this.h.remove(this.length - 1);
  const a = this.i.pop();
  V = !1;
  return a;
};
m.shift = function() {
  W(this.h);
  V = !0;
  this.h.remove(0);
  const a = this.i.shift();
  V = !1;
  return a;
};
m.concat = function(a) {
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
m.sort = T.sort;
m.reverse = T.reverse;
m.slice = T.slice;
m.map = function(a, b) {
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
m.filter = function(a, b) {
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, g = this.length; e < g; e++) {
    a(this[e]) ? d && (this.splice(c, d), g -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
m.indexOf = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
m.lastIndexOf = function(a) {
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
m.includes = T.includes;
m.forEach = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
const X = document.createElement("div"), oa = document.createTextNode(""), Y = document.createElement("div");
X.appendChild(oa);
m = M.prototype;
m.move = M.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.g[c]) : c = this.index(a);
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
m.shift = function(a, b) {
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
    const e = this.g[b], g = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.g[b + 1] || null);
    if (g) {
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
m.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
m.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
m.first = function(a) {
  return this.shift(a, -this.length);
};
m.last = function(a) {
  return this.shift(a, this.length);
};
m.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
m.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
m.swap = function(a, b) {
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
const pa = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1};
let qa = 0, ra = 0;
function sa(a, b, c, d, e, g) {
  qa || (qa = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(v) {
      const u = sa(a);
      "function" === typeof b && b(u);
      v(u);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1});
  const f = g ? {} : {tpl:{}}, h = g ? f : f.tpl;
  if (!g) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var k = document.createElement("div");
        k.innerHTML = a;
        a = k.firstElementChild;
      } else {
        f.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (f.name || (f.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  k = a.tagName;
  if (!k || "SCRIPT" === k) {
    var l;
    if ((l = (k ? a.firstChild : a).nodeValue) && l && l.trim()) {
      if (l.includes("{{@")) {
        var r = l.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        l = /{{[\s\S]+}}/.test(r) ? r.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        r && (r = r.replace(/{{([\s\S]+)}}/g, ""));
        r && d.push(r);
        if ("SCRIPT" === k) {
          return l.trim() && (h.text = l, h.tag = k), h;
        }
      }
      l && l.trim() && (/{{[!?]?#/.test(l) ? ta(h, "html", l, !1, null, e, d) : (e.count++, ta(h, "text", l, !1, null, e, d)));
    }
    if (!k) {
      return l && l.trim() ? h : null;
    }
  }
  k && (h.tag = k);
  if ((l = a.attributes) && l.length) {
    k = {};
    for (r = 0; r < l.length; r++) {
      let v = l[r].nodeName, u = a.getAttribute(v);
      "include" === v && (v = "inc");
      k[v] = u;
    }
    l = k;
    for (var p in l) {
      k = l[p];
      var t = void 0, q = void 0;
      switch(p) {
        case "class":
        case "style":
          t = p;
          break;
        case "include":
          p = "inc";
        case "inc":
          t = p;
          break;
        case "if":
          t = p;
          break;
        case "foreach":
          t = p = "for";
          break;
        case "js":
          break;
        case "key":
          f.key = k.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          pa[p] ? q = h.event || (h.event = {}) : (g || "id" !== p && "name" !== p || f.name || /{{[\s\S]+}}/.test(k) || (f.name = k), q = h.attr || (h.attr = {})), t = p;
      }
      t && ta(q || h, t, k, !!q, l, e, d);
    }
  }
  p = (a.content || a).childNodes;
  t = p.length;
  e.u && (e.u = !1, e.inc++, d = [], (h.for || h.if) && c.unshift(d), h.child || (h.child = h.text ? {text:h.text} : h.html ? {html:h.html} : null), t ? (d.root = h, d.inc = h.child || (h.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1}) : d.inc = h.inc, delete h.for, delete h.if, delete h.text, delete h.html);
  if (t) {
    for (let v = 0, u; v < t; v++) {
      if (u = p[v], 8 !== u.nodeType && (e.count++, q = sa(u, null, c, d, e, 1))) {
        1 !== t || 3 !== u.nodeType && q.text || h.js && q.js ? (q.text || q.tag) && (h.child || (h.child = [])).push(q) : (q.js && (h.js = q.js), q.html && (h.html = q.html), q.text && (h.text = q.text));
      }
    }
    h.child && 1 === h.child.length && (h.child = h.child[0]);
  }
  if (!g) {
    f.name || (f.name = "tpl-" + ra++);
    if ("COMPONENT" === h.tag) {
      d = h.child;
      e = [];
      for (let v = 0, u; v < d.length; v++) {
        u = d[v], "TEMPLATE" === u.tag ? (d = g = u.child.length ? u.child[0] : u.child, u.name && (g.name = u.name), u.id && (g.id = u.id), u.key && (g.key = u.key), u.cache && (g.cache = u.cache)) : e.push(u);
      }
      f.tpl = d;
      f.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
      f.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d].length ? (c[d].unshift("let _o,_v"), c[d] = Function("data", "state", "index", "_p", '"use strict";' + c[d].join(";"))) : c[d] = null;
      }
      f.fn = c.length ? c : null;
    }
  }
  return f;
}
function ta(a, b, c, d, e, g, f) {
  if (/{{[\s\S]+}}/.test(c)) {
    let h = /{{([!?#]+)?=/.test(c), k = /{{!?\?/.test(c), l = /{{\??!/.test(c);
    c = c.replace(/\x3c!--(.*?)--\x3e/g, "");
    if (h) {
      if (k || l) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      h = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/['"]\)\+''\+\(['"]/g, "").replace(/['"](\s+)?\+(\s+)?['"]/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    k && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" === b && a.tag && g.count++;
    "style" === b && a.tag && g.count++;
    g.count !== g.last && (g.current++, g.last = g.count, f.push("_o=_p[" + g.current + "]"));
    f.push("_v=" + c);
    d ? f.push('if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? f.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? f.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? f.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && f.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = h ? [h] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || g.u || (g.count !== g.last && (g.current++, g.last = g.count, f.push("_o=_p[" + g.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = g.inc, e.if ? f.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? f.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : f.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), g.u = !0);
}
;const ua = /[^;:]+/g, va = /[ ]+/g;
function wa(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b));
}
function xa(a, b) {
  let c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (c["_a" + b] = d = a.getAttribute(b));
  return d;
}
function Z(a) {
  var b = a._mkc;
  let c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    for (a = c.split(va), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function ya(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function za(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(ua), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
;M.once = ka;
M.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = L[c], a instanceof M || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  L[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  L[c] = [a, b];
  return M;
};
M.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = L[a];
  b && (b instanceof M && b.destroy(), L[a] = null);
  return M;
};
M.compile = sa;
M.setText = function(a, b) {
  let c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b && (c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b);
};
M.getText = function(a) {
  let b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d && (3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent);
  return d;
};
M.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
M.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
M.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
M.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  return c.split(va);
};
M.hasClass = function(a, b) {
  const c = Z(a);
  let d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
M.toggleClass = function(a, b, c) {
  const d = Z(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        ya(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        ya(a, e, b[e], d);
      }
    }
  } else {
    ya(a, b, c, d);
  }
};
M.removeClass = function(a, b) {
  const c = Z(a);
  if ("object" === typeof b) {
    for (let g = 0; g < b.length; g++) {
      var d = a, e = b[g];
      0 !== c[e] && (c[e] = 0, d.classList.remove(e));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
M.addClass = function(a, b) {
  const c = Z(a);
  if ("object" === typeof b) {
    for (let g = 0; g < b.length; g++) {
      var d = a, e = b[g];
      c[e] || (c[e] = 1, d.classList.add(e));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
M.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      wa(a, e, b[e], d);
    }
  } else {
    wa(a, b, c, d);
  }
};
M.getAttribute = xa;
M.hasAttribute = function(a, b) {
  a = xa(a, b);
  return !(!a && "" !== a);
};
M.removeAttribute = function(a, b) {
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
M.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
M.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
M.getStyle = function(a, b) {
  const c = za(a);
  let d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
M.setStyle = function(a, b, c) {
  const d = za(a), e = a.style;
  if ("object" === typeof b) {
    for (const f in b) {
      c = a;
      var g = b[f];
      d[f] !== g && (d[f] = g, (e || c.style).setProperty(f, g));
    }
  } else {
    d[b] !== c && (d[b] = c, (e || a.style).setProperty(b, c));
  }
};
M.escape = function(a) {
  X.i !== a && (oa.nodeValue = a, X.h = X.innerHTML, X.i = a);
  return X.h;
};
M.sanitize = function(a) {
  Y.h !== a && (Y.innerHTML = a, Y.h = a, Y.i = Y.textContent);
  return Y.i;
};
M.prototype.route = M.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  z[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  z[a] = b;
  c && (aa[a] = c);
  return this;
};
M.prototype.dispatch = M.dispatch = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!z[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  z[a](b || this, c || window.event);
  return this;
};
M.prototype.listen = M.listen = da;
M.prototype.unlisten = M.unlisten = function(a) {
  n[a] && (E(0, a, C, w[a]), n[a] = 0, w[a] = null);
  return this;
};
M.Array = N;
export default M;

