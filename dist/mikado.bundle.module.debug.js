/**!
 * Mikado.js v0.8.329 (Bundle/Module/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
var n;
const p = {}, w = {}, y = Object.create(null), z = Object.create(null), B = document.documentElement || document.body.parentNode, C = "ontouchstart" in window, D = !C && window.PointerEvent && navigator.maxTouchPoints;
E.eventCache = !1;
E.eventBubble = !1;
let aa;
function F(a, b) {
  const c = a.target;
  if (c !== window && c !== B) {
    var d = E.eventCache, e = E.eventBubble;
    b || (b = a.type);
    var g;
    d && (g = c["_mke" + b]);
    if ("undefined" === typeof g) {
      for (var h = c; h && h !== B;) {
        var f = void 0;
        "click" === b && aa && (f = h.getAttribute("tap"));
        f || (f = h.getAttribute(b));
        if (f) {
          var k = f.indexOf(":"), l = h;
          if (-1 < k) {
            const m = f.substring(0, k);
            k = f.substring(k + 1);
            for (f = ""; (l = l.parentElement) !== B;) {
              if ("root" === k ? l._mkr : l.hasAttribute(k)) {
                f = m;
                break;
              }
            }
            f || console.warn("Event root '" + k + "' was not found for the event: '" + m + "'.");
          }
          if (f && (g || (g = [], d && (c["_mke" + b] = g)), g.push([f, l]), l = z[f], !e || l && (l.stop || l.cancel))) {
            break;
          }
        }
        h = h.parentElement;
      }
      d && (g || (c["_mke" + b] = null));
    }
    if (g) {
      for (let m = 0, q; m < g.length; m++) {
        if (q = g[m], e = q[0], h = y[e]) {
          f = q[1];
          if (l = z[e]) {
            l.prevent && a.preventDefault(), l.stop && a.stopImmediatePropagation(), l.once && (y[e] = null, d && (c["_mke" + b] = null));
          }
          h(f, a);
        } else {
          console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
        }
      }
    }
  }
}
function ba(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!y[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  y[a](b || this, c || window.event);
  return this;
}
function ca(a, b) {
  p[a] || (H(1, a, F, b), p[a] = 1, w[a] = b || null);
  return this;
}
let I, K, da;
if (C || D) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    I = e.clientX;
    K = e.clientY;
  }
  function b(d) {
    const e = I, g = K;
    var h = d, f = d.changedTouches;
    f && (h = f[0]);
    I = h.clientX;
    K = h.clientY;
    15 > Math.abs(I - e) && 15 > Math.abs(K - g) && F(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    H(d, D ? "pointerdown" : "touchstart", a, c);
    H(d, D ? "pointerup" : "touchend", b, c);
  };
}
function H(a, b, c, d) {
  if ("tap" === b) {
    if (C || D) {
      da(a);
      return;
    }
    aa = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function L(a, b, c) {
  let d;
  c && (d = a._mkc) && (a._mkc = null);
  const e = b.length, g = [], h = {};
  for (let l = 0, m, q, t, r, v = null; l < e; l++) {
    m = b[l];
    if (q = m.v) {
      if (r = t = h[q], !r) {
        a: {
          var f = a, k = q;
          for (let u = 0, J = k.length, A = ""; u < J; u++) {
            const x = k[u];
            A += x;
            if (h[A]) {
              f = h[A];
            } else {
              if (">" === x) {
                f = f.firstChild;
              } else {
                if ("|" === x) {
                  t = [f.firstChild, f];
                  break a;
                }
                if ("@" === x) {
                  t = [f.style, f];
                  break a;
                }
                f = f.nextSibling;
              }
              h[A] = f;
            }
          }
          t = [f];
        }
        r = t[0];
        t = t[1] || r;
      }
    } else {
      r = t = a;
    }
    c && (v = d ? d[l] : {}, t._mkc = v);
    g[l] = new M(v, r, "");
  }
  return a._mkp = g;
}
function N(a, b, c, d, e, g) {
  g || (a.i = 1);
  const h = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let f, k;
  if (k = b.class) {
    "object" === typeof k ? (c.push(new M(f = {_c:""}, h, d)), (k = k[0]) ? O(a, k, {fn:"_c", index:c.length - 1}) : a.i = 0) : e || (h.className = k);
  }
  if (k = b.attr) {
    for (const m in k) {
      let q = k[m];
      "object" === typeof q ? (f || c.push(new M(f = {}, h, d)), f["_a" + m] = !1, (q = q[0]) ? O(a, q, {fn:"_a", index:c.length - 1, key:m}) : a.i = 0) : e || h.setAttribute(m, q);
    }
  }
  if (k = b.event) {
    for (let m in k) {
      let q;
      if (!e) {
        if ("load" === m || "error" === m) {
          window.dispatch = ba, k["on" + m] = "dispatch('" + k[m] + "', this)", m = "on" + m, q = 1;
        }
        h.setAttribute(m, k[m]);
      }
      q || ca(m);
    }
  }
  if (k = b.style) {
    "object" === typeof k ? (c.push(new M(f || (f = {}), h.style, d + "@")), f._s = "", (k = k[0]) ? O(a, k, {fn:"_s", index:c.length - 1}) : a.i = 0) : e || (h.style.cssText = k);
  }
  if (k = b.text) {
    if ("object" === typeof k) {
      var l = h;
      k = k[0];
      b.tag ? (d += "|", l = !e && h.firstChild, l || (l = document.createTextNode(k), h.appendChild(l))) : f = {};
      (f || (f = {}))._t = k;
      c.push(new M(f, l, d));
      k ? O(a, k, {fn:"_t", index:c.length - 1}) : a.i = 0;
    } else {
      e || (b.tag ? h.textContent = k : h.nodeValue = k);
    }
  } else if (k = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    k.constructor !== Array && (k = [k]);
    for (let m = 0, q, t = k.length; m < t; m++) {
      if (q = k[m], d = m ? d + "+" : d + ">", b = N(a, q, c, d, e, 1), e) {
        if (m < t - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        h.appendChild(b);
      }
    }
  } else if (k = b.html) {
    "object" === typeof k ? (f || c.push(new M(f = {}, h, d)), f._h = "", (k = k[0]) ? O(a, k, {fn:"_h", index:c.length - 1}) : a.i = 0) : e || (h.innerHTML = k);
  } else if (k = b.inc) {
    f || c.push(new M(null, h, d));
    if ("string" === typeof k) {
      l = P[k];
      if (!l) {
        throw Error("The partial template '" + k + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(l instanceof E)) {
        d = l[0];
        if (b = l[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        P[k] = l = new E(d, b);
      }
    } else if (1 !== k) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      l = new E({name:a.name + "|" + d, tpl:k, key:k.key, cache:k.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:!!a.pool, state:a.state, mount:h, hydrate:!!e});
    }
    1 !== k && a.inc.push(l);
  }
  f && (h._mkc = f);
  g || (h._mkp = c);
  return h;
}
function O(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
const Q = {checked:1, selected:1, hidden:1};
function M(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
n = M.prototype;
n._a = function(a, b, c, d, e) {
  if (this.c) {
    if (d) {
      if (e || 0 === e) {
        d = d[e] || (d[e] = {});
      }
      d["_a" + a] = b;
    }
    if (this.c["_a" + a] === b) {
      return;
    }
    this.c["_a" + a] = b;
  }
  !Q[a] || c && "selected" === a ? !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b) : this.n[a] = b;
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
const fa = window.Proxy || function() {
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
    for (let e = 0; e < c.length; e++) {
      var d = c[e];
      const g = d.fn, h = a.path[d.index];
      d = d.key || "";
      h.c && h.c[g + d] === b || (d ? h[g](d, b) : h[g](b));
    }
  }
}
;const P = Object.create(null);
function E(a, b = {}) {
  if (!(this instanceof E)) {
    return new E(a, b);
  }
  if ("string" === typeof a) {
    var c = P[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof E) {
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
  this.pool = (c = this.recycle || !!this.key) && b.pool ? 1 : 0;
  this.A = [];
  this.j = new Map();
  this.cache = c && (a.cache || !!b.cache);
  this.async = !!b.async;
  this.s = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.i = 0;
  (a = b.observe) && (new R(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.m = null;
}
n = E.prototype;
n.mount = function(a, b) {
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
        for (let g = 0, h; g < c.length; g++) {
          h = N(this, c[g], [], ""), a.append(h), g === c.length - 1 && (a = h);
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
      const g = e.length, h = Array(g);
      for (let f = 0; f < g; f++) {
        h[f] = e[f];
      }
      this.g = h;
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
        for (let g = 0, h, f; g < this.length; g++) {
          h = this.g[g], (f = h.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), h._mkk = f, d[f] = h;
        }
      }
      a._mkl = this.o = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.m || (b && this.length && (this.m = this.g[0].cloneNode(!0), N(this, this.tpl.tpl, [], "", this.m) && S(this)), this.tpl && (this.m = N(this, this.tpl.tpl, [], ""), S(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function S(a) {
  a.tpl.B && (a.tpl.fn = a.tpl.B, a.tpl.B = null);
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
    g = new E(b);
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
    g = N({}, b.tpl, [], "", null, 1), a.append(g);
  }
  return E;
}
n.render = function(a, b, c, d) {
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
      const l = this;
      e || (e = "function" === typeof c);
      l.s = requestAnimationFrame(function() {
        l.s = 0;
        l.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(m) {
        c = m;
      });
    }
  }
  var g = this.length;
  if (!a && !this.apply) {
    return this.g[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof R) {
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
  var h = this.key;
  e = this.proxy;
  !g || h || this.recycle || (this.remove(0, g), g = 0);
  let f = g < d ? g : d, k = 0;
  if (k < f) {
    for (let l, m; k < f; k++) {
      l = this.g[k];
      m = a[k];
      if (h && l._mkk !== m[h]) {
        return ka(this, a, b, k);
      }
      this.update(l, m, b, k);
      e && !m._mkx && (a[k] = T(this, l, m));
    }
  }
  if (k < d) {
    for (g = h || this.recycle; k < d; k++) {
      h = a[k], this.add(h, b), !e || g && h._mkx || (a[k] = T(this, this.g[k], h));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
};
n.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var g = b[this.key];
    if (e = this.o[g]) {
      if (e !== a) {
        g = this.index(e);
        const h = g < d ? e : a, f = g < d ? a : e;
        let k = this.g[g < d ? g + 1 : d + 1];
        this.g[d] = e;
        this.g[g] = a;
        k !== f ? this.root.insertBefore(h, f) : k = h;
        this.root.insertBefore(f, k);
      }
    } else {
      this.pool && (e = this.j.get(g)) && (this.j.delete(g), la(this, a), this.g[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.apply && (this.i && b._mkx || this.apply(b, c || this.state, d, e._mkp || L(e, this.m._mkp, this.cache))) : (b = this.create(b, c, d, 1), (this.key || this.pool) && la(this, a), this.g[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
n.update = function(a, b, c, d) {
  if (!this.apply) {
    return "number" !== typeof d && console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.i && b._mkx) {
    return this;
  }
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.g[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || L(a, this.m._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
n.cancel = function() {
  cancelAnimationFrame(this.s);
  this.s = 0;
  return this;
};
n.create = function(a, b, c, d) {
  const e = this.key, g = e && a[e];
  let h;
  var f;
  let k, l;
  this.pool && (e ? (f = this.j) && (h = f.get(g)) && (f.delete(g), l = 1) : (f = this.A) && f.length && (h = f.pop()));
  h || (h = k = this.m, k || (this.m = h = k = N(this, this.tpl.tpl, [], ""), S(this)));
  let m;
  this.apply && (f = h._mkp || L(h, this.m._mkp, !!k || this.cache), m = k && this.cache && Array(f.length), this.apply(a, b || this.state, c, f, !!k, m));
  k && (h = k.cloneNode(!0), m && !0 !== m && (h._mkc = m), h._mkr = 1);
  e && (l || (h._mkk = g), d && (this.o[g] = h));
  (a = this.on && this.on[k ? "create" : "recycle"]) && a(h, this);
  return h;
};
n.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), ma(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  this.key && this.pool && this.pool < this.length && (this.pool = this.length);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function T(a, b, c) {
  {
    b = b._mkp || L(b, a.m._mkp, a.cache);
    a = a.proxy;
    const d = c._mkx;
    d ? d.path = b : c = new fa(c, {path:b, fn:a, get:ha, set:ia});
  }
  return c;
}
function ka(a, b, c, d) {
  const e = a.g, g = a.o, h = a.key;
  let f = b.length, k = e.length, l = k > f ? k : f, m = 0;
  for (d || (d = 0); d < l; d++) {
    var q = void 0;
    if (d < f) {
      var t = b[d], r = d >= k;
      let v, u, J, A;
      a.proxy && (t._mkx ? A = a.i : b[d] = T(a, e[d], t));
      if (!r && (v = e[d], u = t[h], J = v._mkk, J === u)) {
        A || a.update(v, t, c, d);
        continue;
      }
      if (r || !g[u]) {
        r || !a.pool ? (k++, l = k > f ? k : f, a.add(t, c, d)) : a.replace(v, t, c, d);
        continue;
      }
      let x, G;
      for (r = d + 1; r < l; r++) {
        if (!x && r < k && e[r]._mkk === u && (x = r + 1), !G && r < f && b[r][h] === J && (G = r + 1), x && G) {
          x >= G + m ? (q = e[x - 1], a.root.insertBefore(q, v), A || a.update(q, t, c, d), x === G ? (1 < r - d && a.root.insertBefore(v, e[x]), e[d] = e[r], (e[r] = v) || console.error("reconcile.error 1")) : (x - 1 === d && console.error("reconcile.error 2"), ma(e, x - 1, d), m++)) : (t = G - 1 + m, a.root.insertBefore(v, e[t] || null), (t > k ? k : t) - 1 === d && console.error("reconcile.error 3"), ma(e, d, (t > k ? k : t) - 1), m--, d--);
          q = 1;
          break;
        }
      }
    }
    q || (a.remove(d), k--, l = k > f ? k : f, d--);
  }
  return a;
}
function ma(a, b, c, d) {
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
n.append = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let g = 0; g < e; g++) {
    this.add(a[g], b, d ? c++ : null);
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
  const e = this.pool && !this.key, g = this.key || this.pool, h = this.on && this.on.remove;
  (a = this.key && this.pool) && b >= a && (this.j = new Map(), a = 0);
  for (let f = 0, k; f < b; f++) {
    k = d[e ? b - f - 1 : f], c && k.remove(), g && la(this, k, 1), h && h(k, this);
  }
  if (a && 0 < (a = this.j.size - a)) {
    for (b = this.j.keys(); a--;) {
      this.j.delete(b.next().value);
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
function la(a, b, c) {
  let d;
  a.key && (d = b._mkk, a.o[d] = null);
  a.pool && (d ? (a.j.set(d, b), !c && a.j.size > a.pool && a.j.delete(a.j.keys().next().value)) : a.A[a.A.length] = b);
}
n.flush = function() {
  this.A = [];
  this.j = new Map();
  return this;
};
n.destroy = function() {
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], P[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.o = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.j = this.A = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.m = null;
};
const U = Array.prototype, na = window.Proxy;
let V = !1;
function W(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function R(a) {
  if (a instanceof R) {
    return a;
  }
  if (!(this instanceof R)) {
    return new R(a);
  }
  this.h = null;
  const b = a ? a.length : 0;
  if (na) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.l = {splice:U.splice.bind(this), pop:U.pop.bind(this), shift:U.shift.bind(this), unshift:U.unshift.bind(this), push:U.push.bind(this)};
    return new Proxy(this, oa);
  }
  this.l = a || [];
  for (a = 0; a <= b; a++) {
    pa(this, a);
  }
  pa(this, "length");
}
R.prototype.mount = function(a) {
  this.h !== a && (this.h && a.mount(this.h.root), this.h = a);
  return this;
};
function pa(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.l[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && pa(this, b + 1), oa.set(this, b, c));
  }});
}
const oa = {set:function(a, b, c) {
  let d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  const e = a.h;
  if (!V) {
    V = !0;
    if (e) {
      var g = a.length;
      if (d) {
        W(e);
        const h = e.length;
        g !== h && (a.length = h);
        b >= h ? (e.add(c), a.length++) : b < h && (g = e.g[b], e.recycle || e.key && g._mkk === c[e.key] ? e.update(g, c, null, b) : e.replace(g, c, null, b));
      } else {
        "length" === b && c < g && e.remove(c, g - c);
      }
    }
    V = !1;
  }
  e && (g = e.recycle || e.key, !d || !e.proxy || g && c._mkx || (c = T(e, e.g[b], c)));
  (na ? a : a.l)[b] = c;
  return !0;
}};
n = R.prototype;
n.set = function(a) {
  const b = this.h;
  b.recycle || b.key ? (V = !0, b.render(a), V = !1, this.length > a.length && this.splice(a.length)) : (this.splice(), this.concat(a));
  return this;
};
n.splice = function(a, b, c) {
  W(this.h);
  V = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.h.remove(a, b);
  b = c ? this.l.splice(a, b, c) : this.l.splice(a, b);
  c && this.h.add(c, a);
  V = !1;
  return b;
};
n.push = function(a) {
  W(this.h);
  V = !0;
  this.h.add(a);
  this[this.length] = a;
  na && this.length++;
  V = !1;
};
n.unshift = function(a) {
  W(this.h);
  V = !0;
  this.h.add(a, 0);
  this.l.unshift(a);
  V = !1;
};
n.pop = function() {
  W(this.h);
  V = !0;
  this.h.remove(this.length - 1);
  const a = this.l.pop();
  V = !1;
  return a;
};
n.shift = function() {
  W(this.h);
  V = !0;
  this.h.remove(0);
  const a = this.l.shift();
  V = !1;
  return a;
};
n.concat = function(a) {
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
n.sort = U.sort;
n.reverse = U.reverse;
n.slice = U.slice;
n.map = function(a, b) {
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
n.filter = function(a, b) {
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, g = this.length; e < g; e++) {
    a(this[e]) ? d && (this.splice(c, d), g -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
n.indexOf = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
n.lastIndexOf = function(a) {
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
n.includes = U.includes;
n.forEach = function(a) {
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
n.swap = function(a, b) {
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
n.transaction = function(a) {
  W(this.h);
  V = !0;
  a();
  V = !1;
  const b = this.h, c = b.i;
  b.i = 0;
  b.async ? b.render(this).then(function() {
    b.i = c;
  }) : (b.render(this), b.i = c);
};
const X = document.createElement("div"), qa = document.createTextNode(""), Y = document.createElement("div");
X.appendChild(qa);
n = E.prototype;
n.move = E.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.g[c]) : c = this.index(a);
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
n.shift = function(a, b) {
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
n.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
n.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
n.first = function(a) {
  return this.shift(a, -this.length);
};
n.last = function(a) {
  return this.shift(a, this.length);
};
n.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
n.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
n.swap = function(a, b) {
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
const ra = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseover:1, mouseout:1, mousemove:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, focusin:1, focusout:1, resize:1, scroll:1, error:1, load:1}, sa = {blur:"focusout", focus:"focusin", mouseleave:"mouseout", mouseenter:"mouseover"};
let ta = 0, ua = 0;
function va(a, b, c, d, e, g) {
  ta || (ta = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(v) {
      const u = va(a);
      "function" === typeof b && b(u);
      v(u);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1});
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
    var l;
    if ((l = (k ? a.firstChild : a).nodeValue) && l && l.trim()) {
      if (l.includes("{{@")) {
        var m = l.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        l = /{{[\s\S]+}}/.test(m) ? m.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        m && (m = m.replace(/{{([\s\S]+)}}/g, ""));
        m && d.push(m);
        if ("SCRIPT" === k) {
          return l.trim() && (f.text = l, f.tag = k), f;
        }
      }
      l && l.trim() && (l.includes("{{#") ? wa(f, "html", l, !1, null, e, d) : (e.count++, wa(f, "text", l, !1, null, e, d)));
    }
    if (!k) {
      return l && l.trim() ? f : null;
    }
  }
  k && (f.tag = k);
  if ((l = a.attributes) && l.length) {
    k = {};
    for (m = 0; m < l.length; m++) {
      let v = l[m].nodeName, u = a.getAttribute(v);
      "include" === v && (v = "inc");
      k[v] = u;
    }
    l = k;
    for (var q in l) {
      k = l[q];
      var t = void 0, r = void 0;
      switch(q) {
        case "class":
        case "style":
          t = q;
          break;
        case "include":
          q = "inc";
        case "inc":
          t = q;
          break;
        case "if":
          t = q;
          break;
        case "foreach":
          t = q = "for";
          break;
        case "js":
          break;
        case "key":
          h.key = k.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          sa[q] ? (r = f.event || (f.event = {}), console.info("The assigned event '" + q + "' was replaced by the event '" + sa[q] + "'."), q = sa[q]) : ra[q] ? r = f.event || (f.event = {}) : (g || "id" !== q && "name" !== q || h.name || /{{[\s\S]+}}/.test(k) || (h.name = k), r = f.attr || (f.attr = {})), t = q;
      }
      t && wa(r || f, t, k, !!r, l, e, d);
    }
  }
  q = (a.content || a).childNodes;
  t = q.length;
  e.u && (e.u = !1, e.inc++, d = [], (f.for || f.if) && c.unshift(d), f.child || (f.child = f.text ? {text:f.text} : f.html ? {html:f.html} : null), t ? (d.root = f, d.inc = f.child || (f.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1}) : d.inc = f.inc, delete f.for, delete f.if, delete f.text, delete f.html);
  if (t) {
    for (let v = 0, u; v < t; v++) {
      if (u = q[v], 8 !== u.nodeType && (e.count++, r = va(u, null, c, d, e, 1))) {
        1 !== t || 3 !== u.nodeType && r.text || f.js && r.js ? (r.text || r.tag) && (f.child || (f.child = [])).push(r) : (r.js && (f.js = r.js), r.html && (f.html = r.html), r.text && (f.text = r.text));
      }
    }
    f.child && 1 === f.child.length && (f.child = f.child[0]);
  }
  if (!g) {
    h.name || (h.name = "tpl-" + ua++);
    if ("COMPONENT" === f.tag) {
      d = f.child;
      e = [];
      for (let v = 0, u; v < d.length; v++) {
        u = d[v], "TEMPLATE" === u.tag ? (d = g = u.child.length ? u.child[0] : u.child, u.name && (g.name = u.name), u.id && (g.id = u.id), u.key && (g.key = u.key), u.cache && (g.cache = u.cache)) : e.push(u);
      }
      h.tpl = d;
      h.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
      h.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d] = c[d].length ? Function("data", "state", "index", "_p", "_f", "_x", '"use strict";let _o,_v,_c;' + c[d].join(";")) : null;
      }
      h.fn = c.length ? c : null;
    }
  }
  return h;
}
function wa(a, b, c, d, e, g, h) {
  if (/{{[\s\S]+}}/.test(c)) {
    let f = /{{([!?#]+)?=/.test(c), k = /{{!?\?/.test(c), l = /{{\??!/.test(c);
    if (f) {
      if (k || l) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      f = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").replace(/\s+/g, " ");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    k && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || g.count++;
    g.count !== g.last && (g.current++, g.last = g.count, h.push("_o=_p[" + g.current + "]"), h.push("_x&&(_x[" + g.current + "]=_c={})"));
    h.push("_v=" + c);
    d ? h.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);' + (Q[b] ? "selected" === b ? '_f?_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v):_o.n.' + b + "=_v" : "_o.n." + b + "=_v" : '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)') + "}") : "class" === b ? h.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? h.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : 
    "html" === b ? h.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && h.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = f ? [f] : [];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || g.u || (g.count !== g.last && (g.current++, g.last = g.count, h.push("_o=_p[" + g.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = g.inc, e.if ? h.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? h.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : h.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), g.u = !0);
}
;const xa = /[^;:]+/g, ya = / +/;
function za(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, Q[b] ? a[b] = c : !1 === c ? a.removeAttribute(b) : a.setAttribute(b, c));
}
function Aa(a, b, c) {
  !1 !== c["_a" + b] && (c["_a" + b] = !1, Q[b] ? a[b] = !1 : a.removeAttribute(b));
}
function Ba(a, b) {
  let c = a._mkc, d;
  c ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (Q[b] ? d = a[b] : d = a.getAttribute(b), c["_a" + b] = d);
  return d;
}
function Z(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    a = c.trim().split(ya);
    b._c = c = {};
    for (let d = 0, e; d < a.length; d++) {
      (e = a[d]) && (c[a[d]] = 1);
    }
  }
  return c;
}
function Ca(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function Da(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(xa), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b].trim()] = a[b + 1].trim();
    }
  }
  return c;
}
;E.once = ja;
E.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = P[c], a instanceof E || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  P[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  P[c] = [a, b];
  return E;
};
E.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = P[a];
  b && (b instanceof E && b.destroy(), P[a] = null);
  return E;
};
E.compile = va;
E.setText = function(a, b) {
  var c = a._mkc;
  let d;
  c ? d = c._t : a._mkc = c = {};
  d !== b && (c._t = b, c._h = null, (c = a.firstChild) ? c.nodeValue = b : a.appendChild(document.createTextNode(b)));
};
E.getText = function(a) {
  let b = a._mkc, c;
  b ? c = b._t : a._mkc = b = {};
  "string" !== typeof c && (a = a.firstChild, b._t = c = a ? a.nodeValue : "");
  return c;
};
E.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
E.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h || b._t : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
E.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
E.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  c = c.split(ya);
  return "" === c[0] ? [] : c;
};
E.hasClass = function(a, b) {
  const c = Z(a);
  let d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
E.toggleClass = function(a, b, c) {
  const d = Z(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        Ca(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        Ca(a, e, b[e], d);
      }
    }
  } else {
    Ca(a, b, c, d);
  }
};
E.removeClass = function(a, b) {
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
E.addClass = function(a, b) {
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
E.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      za(a, e, b[e], d);
    }
  } else {
    za(a, b, c, d);
  }
};
E.getAttribute = Ba;
E.hasAttribute = function(a, b) {
  a = Ba(a, b);
  return !(!a && "" !== a);
};
E.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      Aa(a, b[d], c);
    }
  } else {
    Aa(a, b, c);
  }
};
E.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
E.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
E.getStyle = function(a, b) {
  const c = Da(a);
  let d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
E.setStyle = function(a, b, c) {
  const d = Da(a), e = a.style;
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
E.escape = function(a) {
  X.l !== a && (qa.nodeValue = a, X.h = X.innerHTML, X.l = a);
  return X.h;
};
E.sanitize = function(a) {
  Y.h !== a && (Y.innerHTML = a, Y.h = a, Y.l = Y.textContent);
  return Y.l;
};
E.prototype.route = E.route = function(a, b, c) {
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  y[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  y[a] = b;
  z[a] = c || null;
  return this;
};
E.prototype.dispatch = E.dispatch = ba;
E.prototype.listen = E.listen = ca;
E.prototype.unlisten = E.unlisten = function(a) {
  p[a] && (H(0, a, F, w[a]), p[a] = 0, w[a] = null);
  return this;
};
E.Array = R;
export default E;

