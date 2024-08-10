/**!
 * Mikado.js v0.8.400 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var n;
const p = {}, w = {}, y = Object.create(null), z = Object.create(null), B = document.documentElement || document.body.parentNode, C = "ontouchstart" in window, D = !C && window.PointerEvent && navigator.maxTouchPoints;
let aa;
function E(a, b) {
  const c = a.target;
  if (c !== window && c !== B) {
    b || (b = a.type);
    var d = c["_mke" + b];
    if ("undefined" === typeof d) {
      for (var e = c; e && e !== B;) {
        var f = void 0;
        "click" === b && aa && (f = e.getAttribute("tap"));
        f || (f = e.getAttribute(b));
        if (f) {
          if ("$" === f[0]) {
            var h = e === c;
            f = f.substring(1);
          }
          var k = f.indexOf(":"), g = e, l = void 0;
          if (-1 < k) {
            l = f.endsWith(":*");
            const m = f.substring(0, k);
            k = f.substring(k + 1, f.length - (l ? 2 : 0));
            for (f = ""; (g = g.parentElement) !== B;) {
              if ("root" === k ? g._mkr : g.hasAttribute(k)) {
                f = m;
                break;
              }
            }
            f || console.warn("Event root '" + k + "' was not found for the event: '" + m + "'.");
          }
          if (f && (d || (d = [], h && (c["_mke" + b] = d)), d.push([f, g]), g = z[f], !l || g && (g.stop || g.cancel))) {
            break;
          }
        }
        e = e.parentElement;
      }
      h && (d || (c["_mke" + b] = null));
    }
    if (d) {
      for (let m = 0, q; m < d.length; m++) {
        if (q = d[m], e = q[0], f = y[e]) {
          l = q[1];
          if (g = z[e]) {
            g.prevent && a.preventDefault(), g.stop && a.stopImmediatePropagation(), g.once && (y[e] = null, h && (c["_mke" + b] = null));
          }
          f(l, a);
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
  p[a] || (F(1, a, E, b), p[a] = 1, w[a] = b || null);
  return this;
}
let H, I, da;
if (C || D) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    H = e.clientX;
    I = e.clientY;
  }
  function b(d) {
    const e = H, f = I;
    var h = d, k = d.changedTouches;
    k && (h = k[0]);
    H = h.clientX;
    I = h.clientY;
    15 > Math.abs(H - e) && 15 > Math.abs(I - f) && E(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    F(d, D ? "pointerdown" : "touchstart", a, c);
    F(d, D ? "pointerup" : "touchend", b, c);
  };
}
function F(a, b, c, d) {
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
;function K(a, b, c) {
  let d;
  c && (d = a._mkc) && (a._mkc = null);
  const e = b.length, f = [], h = {};
  for (let l = 0, m, q, t, r, v = null; l < e; l++) {
    m = b[l];
    if (q = m.v) {
      if (r = t = h[q], !r) {
        a: {
          var k = a, g = q;
          for (let u = 0, J = g.length, A = ""; u < J; u++) {
            const x = g[u];
            A += x;
            if (h[A]) {
              k = h[A];
            } else {
              if (">" === x) {
                k = k.firstChild;
              } else {
                if ("|" === x) {
                  t = [k.firstChild, k];
                  break a;
                }
                if ("@" === x) {
                  t = [k.style, k];
                  break a;
                }
                k = k.nextSibling;
              }
              h[A] = k;
            }
          }
          t = [k];
        }
        r = t[0];
        t = t[1] || r;
      }
    } else {
      r = t = a;
    }
    c && (v = d ? d[l] : {}, t._mkc = v);
    f[l] = new L(v, r, "");
  }
  return a._mkp = f;
}
function M(a, b, c, d, e, f) {
  f || (a.i = 1);
  const h = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let k, g;
  if (g = b.class) {
    "object" === typeof g ? (c.push(new L(k = {_c:""}, h, d)), (g = g[0]) ? N(a, g, {fn:"_c", index:c.length - 1}) : a.i = 0) : e || (h.className = g);
  }
  if (g = b.attr) {
    for (const m in g) {
      let q = g[m];
      "object" === typeof q ? (k || c.push(new L(k = {}, h, d)), k["_a" + m] = !1, (q = q[0]) ? N(a, q, {fn:"_a", index:c.length - 1, key:m}) : a.i = 0) : e || h.setAttribute(m, q);
    }
  }
  if (g = b.event) {
    for (let m in g) {
      let q;
      if (!e) {
        if ("load" === m || "error" === m) {
          window.dispatch = ba, g["on" + m] = "dispatch('" + g[m] + "', this)", m = "on" + m, q = 1;
        }
        h.setAttribute(m, g[m]);
      }
      q || ca(m);
    }
  }
  if (g = b.style) {
    "object" === typeof g ? (c.push(new L(k || (k = {}), h.style, d + "@")), k._s = "", (g = g[0]) ? N(a, g, {fn:"_s", index:c.length - 1}) : a.i = 0) : e || (h.style.cssText = g);
  }
  if (g = b.text) {
    if ("object" === typeof g) {
      var l = h;
      g = g[0];
      b.tag ? (d += "|", l = !e && h.firstChild, l || (l = document.createTextNode(g), h.appendChild(l))) : k = {};
      (k || (k = {}))._t = g;
      c.push(new L(k, l, d));
      g ? N(a, g, {fn:"_t", index:c.length - 1}) : a.i = 0;
    } else {
      e || (b.tag ? h.textContent = g : h.nodeValue = g);
    }
  } else if (g = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    g.constructor !== Array && (g = [g]);
    for (let m = 0, q, t = g.length; m < t; m++) {
      if (q = g[m], d = m ? d + "+" : d + ">", b = M(a, q, c, d, e, 1), e) {
        if (m < t - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        h.appendChild(b);
      }
    }
  } else if (g = b.html) {
    "object" === typeof g ? (k || c.push(new L(k = {}, h, d)), k._h = "", (g = g[0]) ? N(a, g, {fn:"_h", index:c.length - 1}) : a.i = 0) : e || (h.innerHTML = g);
  } else if (g = b.inc) {
    k || c.push(new L(null, h, d));
    if ("string" === typeof g) {
      l = O[g];
      if (!l) {
        throw Error("The partial template '" + g + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(l instanceof P)) {
        d = l[0];
        if (b = l[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        O[g] = l = new P(d, b);
      }
    } else if (1 !== g) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      l = new P({name:a.name + "|" + d, tpl:g, key:g.key, cache:g.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:!!a.pool, state:a.state, mount:h, hydrate:!!e});
    }
    1 !== g && a.inc.push(l);
  }
  k && (h._mkc = k);
  f || (h._mkp = c);
  return h;
}
function N(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
const Q = {checked:1, selected:1, hidden:1};
function L(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
n = L.prototype;
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
    }, set:function(f) {
      ea(e, d = f, c);
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
      const f = d.fn, h = a.path[d.index];
      d = d.key || "";
      h.c && h.c[f + d] === b || (d ? h[f](d, b) : h[f](b));
    }
  }
}
;const O = Object.create(null);
function P(a, b = {}) {
  if (!(this instanceof P)) {
    return new P(a, b);
  }
  if ("string" === typeof a) {
    var c = O[a];
    if (!c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof P) {
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
n = P.prototype;
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
        for (let f = 0, h; f < c.length; f++) {
          h = M(this, c[f], [], ""), a.append(h), f === c.length - 1 && (a = h);
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
      const f = e.length, h = Array(f);
      for (let k = 0; k < f; k++) {
        h[k] = e[k];
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
        for (let f = 0, h, k; f < this.length; f++) {
          h = this.g[f], (k = h.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), h._mkk = k, d[k] = h;
        }
      }
      a._mkl = this.o = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.m || (b && this.length && (this.m = this.g[0].cloneNode(!0), M(this, this.tpl.tpl, [], "", this.m) && ja(this)), this.tpl && (this.m = M(this, this.tpl.tpl, [], ""), ja(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function ja(a) {
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
  var f;
  if ("function" === typeof c || !0 === c) {
    e = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    e = d, d = null;
  }
  if (e) {
    return new Promise(function(k) {
      requestAnimationFrame(function() {
        ka(a, b, c, d);
        "function" === typeof e && e();
        k();
      });
    });
  }
  var h = (f = b.cmp) && f.length;
  f && !h && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || h || b.fn) {
    f = new P(b);
    h && (a = f.mount(a).root);
    if (c && Array.isArray(c)) {
      for (h = 0; h < c.length; h++) {
        a.append(f.create(c[h], d, h));
      }
    } else {
      a.append(f.create(c, d));
    }
    f.destroy();
  } else {
    f = M({}, b.tpl, [], "", null, 1), a.append(f);
  }
  return P;
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
  var f = this.length;
  if (!a && !this.apply) {
    return this.g[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof R) {
    if (d = a.length, !d) {
      return this.remove(0, f);
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
  !f || h || this.recycle || (this.remove(0, f), f = 0);
  let k = f < d ? f : d, g = 0;
  if (g < k) {
    for (let l, m; g < k; g++) {
      l = this.g[g];
      m = a[g];
      if (h && l._mkk !== m[h]) {
        return la(this, a, b, g);
      }
      this.update(l, m, b, g);
      e && !m._mkx && (a[g] = S(this, l, m));
    }
  }
  if (g < d) {
    for (f = h || this.recycle; g < d; g++) {
      h = a[g], this.add(h, b), !e || f && h._mkx || (a[g] = S(this, this.g[g], h));
    }
  } else {
    d < f && this.remove(d, f - d);
  }
  return this;
};
n.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.g[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var f = b[this.key];
    if (e = this.o[f]) {
      if (e !== a) {
        f = this.index(e);
        const h = f < d ? e : a, k = f < d ? a : e;
        let g = this.g[f < d ? f + 1 : d + 1];
        this.g[d] = e;
        this.g[f] = a;
        g !== k ? this.root.insertBefore(h, k) : g = h;
        this.root.insertBefore(k, g);
      }
    } else {
      this.pool && (e = this.j.get(f)) && (this.j.delete(f), ma(this, a), this.g[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.apply && (this.i && b._mkx || this.apply(b, c || this.state, d, e._mkp || K(e, this.m._mkp, this.cache))) : (b = this.create(b, c, d, 1), (this.key || this.pool) && ma(this, a), this.g[d] = b, a.replaceWith(b));
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
  this.apply(b, c || this.state, d, a._mkp || K(a, this.m._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
n.cancel = function() {
  cancelAnimationFrame(this.s);
  this.s = 0;
  return this;
};
n.create = function(a, b, c, d) {
  const e = this.key, f = e && a[e];
  let h;
  var k;
  let g, l;
  this.pool && (e ? (k = this.j) && (h = k.get(f)) && (k.delete(f), l = 1) : (k = this.A) && k.length && (h = k.pop()));
  h || (h = g = this.m, g || (this.m = h = g = M(this, this.tpl.tpl, [], ""), ja(this)));
  let m;
  this.apply && (k = h._mkp || K(h, this.m._mkp, !!g || this.cache), m = g && this.cache && Array(k.length), this.apply(a, b || this.state, c, k, !!g, m));
  g && (h = g.cloneNode(!0), m && !0 !== m && (h._mkc = m), h._mkr = 1);
  e && (l || (h._mkk = f), d && (this.o[f] = h));
  (a = this.on && this.on[g ? "create" : "recycle"]) && a(h, this);
  return h;
};
n.add = function(a, b, c) {
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.g[c]), na(this.g, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.g[this.length++] = a);
  this.key && this.pool && this.pool < this.length && (this.pool = this.length);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function S(a, b, c) {
  {
    b = b._mkp || K(b, a.m._mkp, a.cache);
    a = a.proxy;
    const d = c._mkx;
    d ? d.path = b : c = new fa(c, {path:b, fn:a, get:ha, set:ia});
  }
  return c;
}
function la(a, b, c, d) {
  const e = a.g, f = a.o, h = a.key;
  let k = b.length, g = e.length, l = g > k ? g : k, m = 0;
  for (d || (d = 0); d < l; d++) {
    var q = void 0;
    if (d < k) {
      var t = b[d], r = d >= g;
      let v, u, J, A;
      a.proxy && (t._mkx ? A = a.i : b[d] = S(a, e[d], t));
      if (!r && (v = e[d], u = t[h], J = v._mkk, J === u)) {
        A || a.update(v, t, c, d);
        continue;
      }
      if (r || !f[u]) {
        r || !a.pool ? (g++, l = g > k ? g : k, a.add(t, c, d)) : a.replace(v, t, c, d);
        continue;
      }
      let x, G;
      for (r = d + 1; r < l; r++) {
        if (!x && r < g && e[r]._mkk === u && (x = r + 1), !G && r < k && b[r][h] === J && (G = r + 1), x && G) {
          x >= G + m ? (q = e[x - 1], a.root.insertBefore(q, v), A || a.update(q, t, c, d), x === G ? (1 < r - d && a.root.insertBefore(v, e[x]), e[d] = e[r], (e[r] = v) || console.error("reconcile.error 1")) : (x - 1 === d && console.error("reconcile.error 2"), na(e, x - 1, d), m++)) : (t = G - 1 + m, a.root.insertBefore(v, e[t] || null), (t > g ? g : t) - 1 === d && console.error("reconcile.error 3"), na(e, d, (t > g ? g : t) - 1), m--, d--);
          q = 1;
          break;
        }
      }
    }
    q || (a.remove(d), g--, l = g > k ? g : k, d--);
  }
  return a;
}
function na(a, b, c, d) {
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
  for (let f = 0; f < e; f++) {
    this.add(a[f], b, d ? c++ : null);
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
  const e = this.pool && !this.key, f = this.key || this.pool, h = this.on && this.on.remove;
  (a = this.key && this.pool) && b >= a && (this.j = new Map(), a = 0);
  for (let k = 0, g; k < b; k++) {
    g = d[e ? b - k - 1 : k], c && g.remove(), f && ma(this, g, 1), h && h(g, this);
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
function ma(a, b, c) {
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
    b = this.inc[a], O[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.o = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.j = this.A = this.g = this.root = this.tpl = this.apply = this.inc = this.state = this.m = null;
};
const T = Array.prototype, oa = window.Proxy;
let U = !1;
function V(a) {
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
  if (oa) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.l = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, pa);
  }
  this.l = a || [];
  for (a = 0; a <= b; a++) {
    qa(this, a);
  }
  qa(this, "length");
}
R.prototype.mount = function(a) {
  this.h !== a && (this.h && a.mount(this.h.root), this.h = a);
  return this;
};
function qa(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.l[b];
  }, set:function(c) {
    "number" === typeof b && (b === this.length && qa(this, b + 1), pa.set(this, b, c));
  }});
}
const pa = {set:function(a, b, c) {
  let d;
  "number" === typeof b ? d = !0 : b === "" + parseInt(b, 10) && (d = !0);
  const e = a.h;
  if (!U) {
    U = !0;
    if (e) {
      var f = a.length;
      if (d) {
        V(e);
        const h = e.length;
        f !== h && (a.length = h);
        b >= h ? (e.add(c), a.length++) : b < h && (f = e.g[b], e.recycle || e.key && f._mkk === c[e.key] ? e.update(f, c, null, b) : e.replace(f, c, null, b));
      } else {
        "length" === b && c < f && e.remove(c, f - c);
      }
    }
    U = !1;
  }
  e && (f = e.recycle || e.key, !d || !e.proxy || f && c._mkx || (c = S(e, e.g[b], c)));
  (oa ? a : a.l)[b] = c;
  return !0;
}};
n = R.prototype;
n.set = function(a) {
  const b = this.h;
  b.recycle || b.key ? (U = !0, b.render(a), U = !1, this.length > a.length && this.splice(a.length)) : (this.splice(), this.concat(a));
  return this;
};
n.splice = function(a, b, c) {
  V(this.h);
  U = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.h.remove(a, b);
  b = c ? this.l.splice(a, b, c) : this.l.splice(a, b);
  c && this.h.add(c, a);
  U = !1;
  return b;
};
n.push = function(a) {
  V(this.h);
  U = !0;
  this.h.add(a);
  this[this.length] = a;
  oa && this.length++;
  U = !1;
};
n.unshift = function(a) {
  V(this.h);
  U = !0;
  this.h.add(a, 0);
  this.l.unshift(a);
  U = !1;
};
n.pop = function() {
  V(this.h);
  U = !0;
  this.h.remove(this.length - 1);
  const a = this.l.pop();
  U = !1;
  return a;
};
n.shift = function() {
  V(this.h);
  U = !0;
  this.h.remove(0);
  const a = this.l.shift();
  U = !1;
  return a;
};
n.concat = function(a) {
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
n.sort = T.sort;
n.reverse = T.reverse;
n.slice = T.slice;
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
  for (let e = 0, f = this.length; e < f; e++) {
    a(this[e]) ? d && (this.splice(c, d), f -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
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
n.includes = T.includes;
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
  V(this.h);
  U = !0;
  a();
  U = !1;
  const b = this.h, c = b.i;
  b.i = 0;
  b.async ? b.render(this).then(function() {
    b.i = c;
  }) : (b.render(this), b.i = c);
};
const W = document.createElement("div"), ra = document.createTextNode(""), X = document.createElement("div");
W.appendChild(ra);
n = P.prototype;
n.move = P.prototype.moveTo = function(a, b) {
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
    const e = this.g[b], f = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.g[b + 1] || null);
    if (f) {
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
const sa = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseover:1, mouseout:1, mousemove:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, focusin:1, focusout:1, resize:1, scroll:1, error:1, load:1}, ta = {blur:"focusout", focus:"focusin", mouseleave:"mouseout", mouseenter:"mouseover"};
let ua = 0, va = 0;
function wa(a, b, c, d, e, f) {
  ua || (ua = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(v) {
      const u = wa(a);
      "function" === typeof b && b(u);
      v(u);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1});
  const h = f ? {} : {tpl:{}}, k = f ? h : h.tpl;
  if (!f) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var g = document.createElement("div");
        g.innerHTML = a;
        a = g.firstElementChild;
      } else {
        h.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (h.name || (h.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  g = a.tagName;
  if (!g || "SCRIPT" === g) {
    var l;
    if ((l = (g ? a.firstChild : a).nodeValue) && l && l.trim()) {
      if (l.includes("{{@")) {
        var m = l.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        l = /{{[\s\S]+}}/.test(m) ? m.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        m && (m = m.replace(/{{([\s\S]+)}}/g, ""));
        m && d.push(m);
        if ("SCRIPT" === g) {
          return l.trim() && (k.text = l, k.tag = g), k;
        }
      }
      l && l.trim() && (l.includes("{{#") ? xa(k, "html", l, !1, null, e, d) : (e.count++, xa(k, "text", l, !1, null, e, d)));
    }
    if (!g) {
      return l && l.trim() ? k : null;
    }
  }
  g && (k.tag = g);
  if ((l = a.attributes) && l.length) {
    g = {};
    for (m = 0; m < l.length; m++) {
      let v = l[m].nodeName, u = a.getAttribute(v);
      "include" === v && (v = "inc");
      g[v] = u;
    }
    l = g;
    for (var q in l) {
      g = l[q];
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
          h.key = g.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          ta[q] ? (r = k.event || (k.event = {}), console.info("The assigned event '" + q + "' was replaced by the event '" + ta[q] + "'."), q = ta[q]) : sa[q] ? r = k.event || (k.event = {}) : (f || "id" !== q && "name" !== q || h.name || /{{[\s\S]+}}/.test(g) || (h.name = g), r = k.attr || (k.attr = {})), t = q;
      }
      t && xa(r || k, t, g, !!r, l, e, d);
    }
  }
  q = (a.content || a).childNodes;
  t = q.length;
  e.u && (e.u = !1, e.inc++, d = [], (k.for || k.if) && c.unshift(d), k.child || (k.child = k.text ? {text:k.text} : k.html ? {html:k.html} : null), t ? (d.root = k, d.inc = k.child || (k.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, u:!1}) : d.inc = k.inc, delete k.for, delete k.if, delete k.text, delete k.html);
  if (t) {
    for (let v = 0, u; v < t; v++) {
      if (u = q[v], 8 !== u.nodeType && (e.count++, r = wa(u, null, c, d, e, 1))) {
        1 !== t || 3 !== u.nodeType && r.text || k.js && r.js ? (r.text || r.tag) && (k.child || (k.child = [])).push(r) : (r.js && (k.js = r.js), r.html && (k.html = r.html), r.text && (k.text = r.text));
      }
    }
    k.child && 1 === k.child.length && (k.child = k.child[0]);
  }
  if (!f) {
    h.name || (h.name = "tpl-" + va++);
    if ("COMPONENT" === k.tag) {
      d = k.child;
      e = [];
      for (let v = 0, u; v < d.length; v++) {
        u = d[v], "TEMPLATE" === u.tag ? (d = f = u.child.length ? u.child[0] : u.child, u.name && (f.name = u.name), u.id && (f.id = u.id), u.key && (f.key = u.key), u.cache && (f.cache = u.cache)) : e.push(u);
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
function xa(a, b, c, d, e, f, h) {
  if (/{{[\s\S]+}}/.test(c)) {
    let k = /{{([!?#]+)?=/.test(c), g = /{{!?\?/.test(c), l = /{{\??!/.test(c);
    if (k) {
      if (g || l) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      k = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").replace(/\s+/g, " ");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    g && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || f.count++;
    f.count !== f.last && (f.current++, f.last = f.count, h.push("_o=_p[" + f.current + "]"), h.push("_x&&(_x[" + f.current + "]=_c={})"));
    h.push("_v=" + c);
    d ? h.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);' + (Q[b] ? "selected" === b ? '_f?_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v):_o.n.' + b + "=_v" : "_o.n." + b + "=_v" : '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)') + "}") : "class" === b ? h.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? h.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : 
    "html" === b ? h.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === b && h.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = k ? [k] : [];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || f.u || (f.count !== f.last && (f.current++, f.last = f.count, h.push("_o=_p[" + f.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = f.inc, e.if ? h.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? h.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : h.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), f.u = !0);
}
;const ya = /[^;:]+/g, za = / +/;
function Aa(a, b, c, d) {
  d["_a" + b] !== c && (d["_a" + b] = c, Q[b] ? a[b] = c : !1 === c ? a.removeAttribute(b) : a.setAttribute(b, c));
}
function Ba(a, b, c) {
  !1 !== c["_a" + b] && (c["_a" + b] = !1, Q[b] ? a[b] = !1 : a.removeAttribute(b));
}
function Ca(a, b) {
  let c = a._mkc, d;
  c ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d && (Q[b] ? d = a[b] : d = a.getAttribute(b), c["_a" + b] = d);
  return d;
}
function Y(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    a = c.trim().split(za);
    b._c = c = {};
    for (let d = 0, e; d < a.length; d++) {
      (e = a[d]) && (c[a[d]] = 1);
    }
  }
  return c;
}
function Da(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c && (d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b));
}
function Ea(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (a = c.match(ya), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b].trim()] = a[b + 1].trim();
    }
  }
  return c;
}
;P.once = ka;
P.register = function(a, b) {
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = O[c], a instanceof P || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  O[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  O[c] = [a, b];
  return P;
};
P.unregister = function(a) {
  "object" === typeof a && (a = a.name);
  const b = O[a];
  b && (b instanceof P && b.destroy(), O[a] = null);
  return P;
};
P.compile = wa;
P.setText = function(a, b) {
  var c = a._mkc;
  let d;
  c ? d = c._t : a._mkc = c = {};
  d !== b && (c._t = b, c._h = null, (c = a.firstChild) ? c.nodeValue = b : a.appendChild(document.createTextNode(b)));
};
P.getText = function(a) {
  let b = a._mkc, c;
  b ? c = b._t : a._mkc = b = {};
  "string" !== typeof c && (a = a.firstChild, b._t = c = a ? a.nodeValue : "");
  return c;
};
P.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b && (a.innerHTML = b, c._h = b, c._t = null);
};
P.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h || b._t : a._mkc = b = {};
  "string" !== typeof c && (b._h = c = a.innerHTML);
  return c;
};
P.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b && (c._c = b, a.className = b);
};
P.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c && (b._c = c = a.className);
  c = c.split(za);
  return "" === c[0] ? [] : c;
};
P.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d && (c[b] = d = a.classList.contains(b) ? 1 : 0);
  return !!d;
};
P.toggleClass = function(a, b, c) {
  const d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        Da(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        Da(a, e, b[e], d);
      }
    }
  } else {
    Da(a, b, c, d);
  }
};
P.removeClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let f = 0; f < b.length; f++) {
      var d = a, e = b[f];
      0 !== c[e] && (c[e] = 0, d.classList.remove(e));
    }
  } else {
    0 !== c[b] && (c[b] = 0, a.classList.remove(b));
  }
};
P.addClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let f = 0; f < b.length; f++) {
      var d = a, e = b[f];
      c[e] || (c[e] = 1, d.classList.add(e));
    }
  } else {
    c[b] || (c[b] = 1, a.classList.add(b));
  }
};
P.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      Aa(a, e, b[e], d);
    }
  } else {
    Aa(a, b, c, d);
  }
};
P.getAttribute = Ca;
P.hasAttribute = function(a, b) {
  a = Ca(a, b);
  return !(!a && "" !== a);
};
P.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      Ba(a, b[d], c);
    }
  } else {
    Ba(a, b, c);
  }
};
P.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b && (c._s = b, a.style.cssText = b);
};
P.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c && (b._s = c = a.style.cssText);
  return c;
};
P.getStyle = function(a, b) {
  const c = Ea(a);
  let d = c[b];
  "string" !== typeof d && (c[b] = d = a.style.getPropertyValue(b));
  return d;
};
P.setStyle = function(a, b, c) {
  const d = Ea(a), e = a.style;
  if ("object" === typeof b) {
    for (const h in b) {
      c = a;
      var f = b[h];
      d[h] !== f && (d[h] = f, (e || c.style).setProperty(h, f));
    }
  } else {
    d[b] !== c && (d[b] = c, (e || a.style).setProperty(b, c));
  }
};
P.escape = function(a) {
  W.l !== a && (ra.nodeValue = a, W.h = W.innerHTML, W.l = a);
  return W.h;
};
P.sanitize = function(a) {
  X.h !== a && (X.innerHTML = a, X.h = a, X.l = X.textContent);
  return X.l;
};
P.prototype.route = P.route = function(a, b, c) {
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
P.prototype.dispatch = P.dispatch = ba;
P.prototype.listen = P.listen = ca;
P.prototype.unlisten = P.unlisten = function(a) {
  p[a] && (F(0, a, E, w[a]), p[a] = 0, w[a] = null);
  return this;
};
P.Array = R;
const Z = window;
let Fa;
(Fa = Z.define) && Fa.amd ? Fa([], function() {
  return P;
}) : "object" === typeof Z.exports ? Z.exports = P : Z.Mikado = P;
}).call(this);
