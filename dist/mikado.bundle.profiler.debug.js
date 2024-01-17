/**!
 * Mikado.js v0.8.225 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
function f(a) {
  const b = window.profiler || (window.profiler = {});
  b[a] || (b[a] = 0);
  b[a]++;
}
;const m = {}, v = {}, x = Object.create(null), z = Object.create(null), aa = document.documentElement || document.body.parentNode, B = "ontouchstart" in window, C = !B && window.PointerEvent && navigator.maxTouchPoints;
D.eventCache = !1;
D.eventBubble = !1;
let ba;
function E(a, b) {
  f("event.trigger");
  b || (b = a.type);
  const c = a.target, d = D.eventCache;
  var e = D.eventBubble;
  let h;
  d && (h = c["_mke" + b]);
  if ("undefined" === typeof h) {
    for (var k = c; k && k !== aa;) {
      f("event.bubble");
      var g = void 0;
      "click" === b && ba && (g = k.getAttribute("tap"));
      g || (g = k.getAttribute(b));
      if (g) {
        var l = g.indexOf(":"), n = k;
        if (-1 < l) {
          const p = g.substring(0, l);
          l = g.substring(l + 1);
          for (g = ""; (n = n.parentElement) !== aa;) {
            if (f("event.bubble"), n.hasAttribute(l)) {
              g = p;
              break;
            }
          }
          g || console.warn("Event root '" + l + "' was not found for the event: '" + p + "'.");
        }
        if (g && (h || (h = [], d && (c["_mke" + b] = h)), h.push([g, n]), n = z[g], !e || n && (n.stop || n.cancel))) {
          break;
        }
      }
      k = k.parentElement;
    }
    d && (h || (c["_mke" + b] = null));
  } else {
    f("event.cache");
  }
  if (h) {
    for (let p = 0, q; p < h.length; p++) {
      if (q = h[p], e = q[0], k = x[e]) {
        g = q[1];
        if (n = z[e]) {
          n.prevent && a.preventDefault(), n.stop && a.stopImmediatePropagation(), n.once && (x[e] = null, d && (c["_mke" + b] = null));
        }
        f("route.call");
        k(g, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  m[a] || (f("event.listen"), F(1, a, E, b), m[a] = 1, v[a] = b || null);
  return this;
}
let G, H, da;
if (B || C) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    G = e.clientX;
    H = e.clientY;
  }
  function b(d) {
    const e = G, h = H;
    var k = d, g = d.changedTouches;
    g && (k = g[0]);
    G = k.clientX;
    H = k.clientY;
    15 > Math.abs(G - e) && 15 > Math.abs(H - h) && E(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    F(d, C ? "pointerdown" : "touchstart", a, c);
    F(d, C ? "pointerup" : "touchend", b, c);
  };
}
function F(a, b, c, d) {
  f(a ? "event.register" : "event.unregister");
  if ("tap" === b) {
    if (B || C) {
      da(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
;function J(a, b, c) {
  f("factory.path");
  let d;
  c && (d = a._mkc) && (a._mkc = null);
  const e = b.length, h = Array(e), k = {};
  for (let n = 0, p, q, r, t, w = null; n < e; n++) {
    p = b[n];
    if (q = p.v) {
      if (t = r = k[q], !t) {
        a: {
          var g = a, l = q;
          f("factory.resolve");
          for (let u = 0, I = l.length, y = ""; u < I; u++) {
            const A = l[u];
            y += A;
            if (k[y]) {
              g = k[y];
            } else {
              if (">" === A) {
                g = g.firstChild;
              } else if ("|" === A) {
                r = [g.firstChild, g];
                break a;
              } else if ("@" === A) {
                r = [g.style, g];
                break a;
              } else {
                g = g.nextSibling;
              }
              k[y] = g;
            }
          }
          r = [g, null];
        }
        t = r[0];
        r = r[1] || t;
      }
    } else {
      t = r = a;
    }
    c && (f("cache.transfer"), w = d ? d[n] : {}, r._mkc = w);
    f("cache.create");
    h[n] = new K(w, t, "");
  }
  return a._mkp = h;
}
function L(a, b, c, d, e, h) {
  f("factory.construct");
  h || (a.fullproxy = 1);
  const k = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let g, l;
  if (l = b.class) {
    "object" === typeof l ? (f("cache.create"), c.push(new K(g = {_c:""}, k, d)), (l = l[0]) ? M(a, l, ["_c", c.length - 1]) : a.fullproxy = 0) : e || (k.className = l);
  }
  if (l = b.attr) {
    for (const p in l) {
      let q = l[p];
      "object" === typeof q ? (f("cache.create"), g || c.push(new K(g = {}, k, d)), g["_a" + p] = !1, (q = q[0]) ? M(a, q, ["_a", c.length - 1, p]) : a.fullproxy = 0) : e || k.setAttribute(p, q);
    }
  }
  if (l = b.event) {
    for (const p in l) {
      e || k.setAttribute(p, l[p]), ca(p);
    }
  }
  if (l = b.style) {
    "object" === typeof l ? (f("cache.create"), c.push(new K(g || (g = {}), k.style, d + "@")), g._s = "", (l = l[0]) ? M(a, l, ["_s", c.length - 1]) : a.fullproxy = 0) : e || (k.style.cssText = l);
  }
  if (l = b.text) {
    if ("object" === typeof l) {
      var n = k;
      l = l[0];
      b.tag ? (d += "|", n = !e && k.firstChild, n || (n = document.createTextNode(l), k.appendChild(n))) : g = {};
      (g || (g = {}))._t = l;
      f("cache.create");
      c.push(new K(g, n, d));
      l ? M(a, l, ["_t", c.length - 1]) : a.fullproxy = 0;
    } else {
      e || (b.tag ? k.textContent = l : k.nodeValue = l);
    }
  } else if (l = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    l.constructor !== Array && (l = [l]);
    for (let p = 0, q, r = l.length; p < r; p++) {
      if (q = l[p], d = p ? d + "+" : d + ">", b = L(a, q, c, d, e, 1), e) {
        if (p < r - 1 && (e = e.nextSibling, !e)) {
          return console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        k.appendChild(b);
      }
    }
  } else if (l = b.html) {
    "object" === typeof l ? (f("cache.create"), g || c.push(new K(g = {}, k, d)), g._h = "", (l = l[0]) ? M(a, l, ["_h", c.length - 1]) : a.fullproxy = 0) : e || (k.innerHTML = l);
  } else if (l = b.inc) {
    f("cache.create");
    f("template.include");
    g || c.push(new K(null, k, d));
    if ("string" === typeof l) {
      n = N[l];
      if (!n) {
        throw Error("The partial template '" + l + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(n instanceof D)) {
        d = n[0];
        if (b = n[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        N[l] = n = new D(d, b);
      }
    } else if (1 !== l) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      n = new D({name:a.name + "|" + d, tpl:l, key:l.key, cache:l.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:k, hydrate:!!e});
    }
    1 !== l && a.inc.push(n);
  }
  g && (k._mkc = g);
  h || (k._mkp = c);
  return k;
}
function M(a, b, c) {
  f("proxy.init");
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function K(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
K.prototype._a = function(a, b, c, d) {
  if (this.c) {
    if (c) {
      if (d || 0 === d) {
        c = c[d] || (c[d] = {});
      }
      c["_a" + a] = b;
    }
    if (this.c["_a" + a] === b) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.attr");
    this.c["_a" + a] = b;
  }
  !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b);
};
K.prototype._t = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._t = a;
    }
    if (this.c._t === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.text");
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
K.prototype._c = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._c = a;
    }
    if (this.c._c === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.class");
    this.c._c = a;
  }
  this.n.className = a;
};
K.prototype._s = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._s = a;
    }
    if (this.c._s === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.style");
    this.c._s = a;
  }
  this.n.cssText = a;
};
K.prototype._h = function(a, b, c) {
  if (this.c) {
    if (b) {
      if (c || 0 === c) {
        b = b[c] || (b[c] = {});
      }
      b._h = a;
    }
    if (this.c._h === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.html");
    this.c._h = a;
  }
  this.n.innerHTML = a;
};
const fa = window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (const d in b) {
      this.define(b, d, b[d]);
    }
    b._mkx = this;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    f("proxy.define");
    const e = this;
    Object.defineProperty(b, c, {get:function() {
      f("proxy.read");
      return d;
    }, set:function(h) {
      f("proxy.write");
      ea(e, d = h, c);
    }});
  };
  return a;
}();
function ha(a, b) {
  f("proxy.read");
  return "_mkx" === b ? this : a[b];
}
function ia(a, b, c) {
  f("proxy.write");
  ea(this, c, b);
  a[b] = c;
  return !0;
}
function ea(a, b, c) {
  if (c = a.fn[c]) {
    for (let d = 0; d < c.length; d++) {
      const e = c[d], h = e[0], k = a.path[e[1]];
      k.c && k.c[h + (e[2] || "")] === b ? f("cache.match") : (f("cache.miss"), k[h](e[2] || b, b));
    }
  }
}
;const N = Object.create(null);
function D(a, b = {}) {
  if (!(this instanceof D)) {
    return new D(a, b);
  }
  f("mikado.new");
  if ("string" === typeof a) {
    var c = N[a];
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
  this.async = !!b.async;
  this.timer = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.fullproxy = 0;
  (a = b.observe) && (new O(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
D.prototype.mount = function(a, b) {
  f("view.mount");
  if (!a) {
    throw Error("No target was passed to .mount()");
  }
  this.timer && this.cancel();
  if (this.shadow) {
    var c = this.tpl.cmp;
    a = a.shadowRoot || a.attachShadow({mode:"open"});
    if (c && c.length) {
      var d = a.lastElementChild;
      if (d) {
        a = d;
      } else {
        c.push({tag:"root"});
        for (let h = 0, k; h < c.length; h++) {
          k = L(this, c[h], [], ""), a.append(k), h === c.length - 1 && (a = k);
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
    this.dom = a._mkd;
    this.length = this.dom.length;
  } else if (c) {
    f("mikado.unmount");
    c.clear();
    a._mkd = this.dom = [];
    this.length = 0;
    a.firstChild && (f("mount.reset"), a.textContent = "");
    var e = this.on && this.on.unmount;
    e && e(a, c);
  } else {
    if (b) {
      e = a.children;
      f("collection_to_array");
      const h = e.length, k = Array(h);
      for (let g = 0; g < h; g++) {
        k[g] = e[g];
      }
      this.dom = k;
      this.length = this.dom.length;
    } else {
      this.dom = [], this.length = 0, a.firstChild && (f("mount.reset"), a.textContent = "");
    }
    a._mkd = this.dom;
  }
  if (this.key) {
    if (d && this.root && (this.root._mkl = this.live), c === this) {
      this.live = a._mkl;
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let h = 0, k, g; h < this.length; h++) {
          f("hydrate.count"), k = this.dom[h], (g = k.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported."), k._mkk = g, d[g] = k;
        }
      }
      a._mkl = this.live = d;
    }
  }
  a._mki = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), L(this, this.tpl.tpl, [], "", this.factory) && P(this)), b && f(this.tpl ? "hydrate.error" : "hydrate.success"), this.tpl && (this.factory = L(this, this.tpl.tpl, [], ""), P(this)));
  (b = this.on && this.on.mount) && b(a, this);
  return this;
};
function P(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
function ja(a, b, c, d, e) {
  if (!a) {
    throw Error("Root element is not defined.");
  }
  if (!b) {
    throw Error("Template is not defined.");
  }
  var h;
  if ("function" === typeof c || !0 === c) {
    e = c, c = null;
  } else if ("function" === typeof d || !0 === d) {
    e = d, d = null;
  }
  if (e) {
    return new Promise(function(g) {
      requestAnimationFrame(function() {
        ja(a, b, c, d);
        "function" === typeof e && e();
        g();
      });
    });
  }
  f("mikado.once");
  var k = (h = b.cmp) && h.length;
  h && !k && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || k || b.fn) {
    h = new D(b);
    k && (a = h.mount(a).root);
    if (c && Array.isArray(c)) {
      for (k = 0; k < c.length; k++) {
        a.append(h.create(c[k], d, k));
      }
    } else {
      a.append(h.create(c, d));
    }
    h.destroy();
  } else {
    h = L({}, b.tpl, [], "", null, 1), a.append(h);
  }
  return D;
}
D.prototype.render = function(a, b, c, d) {
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
    this.timer && this.cancel();
    if (this.async || c) {
      const n = this;
      e || (e = "function" === typeof c);
      n.timer = requestAnimationFrame(function() {
        n.timer = 0;
        n.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(p) {
        c = p;
      });
    }
  }
  f("view.render");
  var h = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof O) {
    if (d = a.length, !d) {
      return this.remove(0, h);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  const k = this.key;
  e = this.proxy;
  !h || k || this.recycle || (this.remove(0, h), h = 0);
  let g = h < d ? h : d, l = 0;
  if (l < g) {
    for (let n, p; l < g; l++) {
      n = this.dom[l];
      p = a[l];
      if (k && n._mkk !== p[k]) {
        return this.reconcile(a, b, l);
      }
      this.update(n, p, b, l, 1);
      e && !p._mkx && (a[l] = Q(this, n, p));
    }
  }
  if (l < d) {
    for (; l < d; l++) {
      h = a[l], this.add(h, b), !e || this.recycle && h._mkx || (a[l] = Q(this, this.dom[l], h));
    }
  } else {
    d < h && this.remove(d, h - d);
  }
  return this;
};
D.prototype.replace = function(a, b, c, d) {
  f("view.replace");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var h = b[this.key];
    if (e = this.live[h]) {
      if (e !== a) {
        h = this.index(e);
        const k = h < d ? e : a, g = h < d ? a : e;
        let l = this.dom[h < d ? h + 1 : d + 1];
        this.dom[d] = e;
        this.dom[h] = a;
        l !== g ? this.root.insertBefore(k, g) : l = k;
        this.root.insertBefore(g, l);
      }
    } else {
      this.pool && (e = this.pool_keyed.get(h)) && (this.pool_keyed.delete(h), this.checkout(a), this.dom[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.fullproxy && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || J(e, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
D.prototype.update = function(a, b, c, d) {
  if (!this.apply) {
    return console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (this.fullproxy && b._mkx) {
    return this;
  }
  f("view.update");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.dom[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a._mkp || J(a, this.factory._mkp, this.cache));
  (b = this.on && this.on.update) && b(a, this);
  return this;
};
D.prototype.cancel = function() {
  f("view.cancel");
  cancelAnimationFrame(this.timer);
  this.timer = 0;
  return this;
};
D.prototype.create = function(a, b, c, d) {
  f("view.create");
  const e = this.key, h = e && a[e];
  let k, g, l, n;
  this.pool && (e ? (g = this.pool_keyed) && (k = g.get(h)) && (f("pool.out"), g.delete(h), n = 1) : (g = this.pool_shared) && g.length && (f("pool.out"), k = g.pop()));
  k || (k = l = this.factory, l || (this.factory = k = l = L(this, this.tpl.tpl, [], ""), P(this)));
  let p;
  this.apply && (p = l && this.cache && [], this.apply(a, b || this.state, c, k._mkp || J(k, this.factory._mkp, !!l || this.cache), p));
  l && (f("factory.clone"), k = l.cloneNode(!0), p && (k._mkc = p));
  e && (n || (k._mkk = h), d && (this.live[h] = k));
  (a = this.on && this.on[l ? "create" : "recycle"]) && a(k, this);
  return k;
};
D.prototype.add = function(a, b, c) {
  f("view.add");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), R(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function Q(a, b, c) {
  f("proxy.apply");
  {
    b = b._mkp || J(b, a.factory._mkp, a.cache);
    a = a.proxy;
    f("proxy.create");
    const d = c._mkx;
    d ? d.path = b : (f("proxy.new"), c = new fa(c, {path:b, fn:a, get:ha, set:ia}));
  }
  return c;
}
D.prototype.reconcile = function(a, b, c) {
  f("view.reconcile");
  const d = this.dom, e = this.live, h = this.key;
  let k = a.length, g = d.length, l = g > k ? g : k, n = 0;
  for (c || (c = 0); c < l; c++) {
    var p = void 0;
    if (c < k) {
      var q = a[c], r = c >= g;
      let t, w, u, I;
      this.proxy && (q._mkx ? I = 1 : a[c] = Q(this, d[c], q));
      if (!r && (t = d[c], w = q[h], u = t._mkk, u === w)) {
        I || this.update(t, q, b, c, 1);
        continue;
      }
      if (r || !e[w]) {
        r || !this.pool ? (g++, l = g > k ? g : k, this.add(q, b, c)) : this.replace(t, q, b, c);
        continue;
      }
      let y, A;
      for (r = c + 1; r < l; r++) {
        if (!y && r < g && d[r]._mkk === w && (y = r + 1), !A && r < k && a[r][h] === u && (A = r + 1), y && A) {
          y >= A + n ? (p = d[y - 1], this.root.insertBefore(p, t), I || this.update(p, q, b, c, 1), y === A ? (1 < r - c && this.root.insertBefore(t, d[y]), d[c] = d[r], (d[r] = t) || console.error("reconcile.error 1"), f("view.reconcile.steps")) : (y - 1 === c && console.error("reconcile.error 2"), R(d, y - 1, c), n++)) : (q = A - 1 + n, this.root.insertBefore(t, d[q] || null), (q > g ? g : q) - 1 === c && console.error("reconcile.error 3"), R(d, c, (q > g ? g : q) - 1), n--, c--);
          f("view.reconcile.steps");
          p = 1;
          break;
        }
      }
    }
    p || (this.remove(c), g--, l = g > k ? g : k, c--);
  }
  return this;
};
function R(a, b, c, d) {
  f("splice");
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
D.prototype.append = function(a, b, c) {
  f("view.append");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let h = 0; h < e; h++) {
    this.add(a[h], b, d ? c++ : null);
  }
  return this;
};
D.prototype.clear = function() {
  f("view.clear");
  this.length && this.remove(0, this.length);
  return this;
};
D.prototype.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root._mkd = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, h = this.on && this.on.remove;
  for (let k = 0, g; k < b; k++) {
    f("view.remove"), g = a[d ? b - k - 1 : k], c && g.remove(), e && this.checkout(g), h && h(g, this);
  }
  this.length = c;
  return this;
};
D.prototype.index = function(a) {
  f("view.index");
  return this.dom.indexOf(a);
};
D.prototype.node = function(a) {
  f("view.node");
  return this.dom[a];
};
D.prototype.checkout = function(a) {
  f("view.checkout");
  if (this.key) {
    var b = a._mkk;
    this.live[b] = null;
  }
  if (this.pool) {
    if (b) {
      f("pool.in"), this.pool_keyed.set(b, a), !0 !== this.pool && this.pool_keyed.size > this.pool && (f("pool.resize"), this.pool_keyed.delete(this.pool_keyed.keys().next().value));
    } else {
      if (b = this.pool_shared.length, !0 === this.pool || b < this.pool) {
        f("pool.in"), this.pool_shared[b] = a;
      }
    }
  }
};
D.prototype.flush = function() {
  f("view.flush");
  this.pool_shared = [];
  this.pool_keyed = new Map();
  return this;
};
D.prototype.destroy = function() {
  f("view.destroy");
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], N[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
const S = Array.prototype, T = window.Proxy;
let U = !1;
function V(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function O(a) {
  if (a instanceof O) {
    return a;
  }
  if (!(this instanceof O)) {
    return new O(a);
  }
  f("observer.create");
  this.mikado = null;
  const b = a ? a.length : 0;
  if (T) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:S.splice.bind(this), pop:S.pop.bind(this), shift:S.shift.bind(this), unshift:S.unshift.bind(this), push:S.push.bind(this)};
    return new Proxy(this, ka);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
O.prototype.mount = function(a) {
  f("observer.mount");
  this.mikado !== a && (this.mikado && a.mount(this.mikado.root), this.mikado = a);
  return this;
};
O.prototype.define = function(a) {
  f("observer.define");
  Object.defineProperty(this, a, {get:function() {
    return this.proto[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), ka.set(this, a, b));
  }});
  return this;
};
const ka = {set:function(a, b, c) {
  f("observer.write");
  let d;
  if ("number" === typeof b) {
    d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (d = !0);
  }
  e = a.mikado;
  if (!U) {
    U = !0;
    if (e) {
      var h = a.length;
      if (d) {
        V(e);
        const k = e.length;
        h !== k && (a.length = k);
        b >= k ? (e.add(c), a.length++) : b < k && (h = e.dom[b], e.recycle || e.key && h._mkk === c[e.key] ? e.update(h, c, null, b) : e.replace(h, c, null, b));
      } else {
        "length" === b && c < h && e.remove(c, h - c);
      }
    }
    U = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = Q(e, e.dom[b], c));
  (T ? a : a.proto)[b] = c;
  return !0;
}, get:function(a, b) {
  f("observer.read");
  return a[b];
}};
O.prototype.set = function(a) {
  f("observer.set");
  const b = this.mikado.key;
  b && (U = !0);
  if (!b && this.mikado.recycle) {
    const c = this.length;
    for (let d = 0; d < c; d++) {
      this[d] = a[d];
    }
    c > a.length && this.splice(c);
  } else {
    this.splice(), this.concat(a);
  }
  b && (this.mikado.render(this), U = !1);
  return this;
};
O.prototype.splice = function(a, b, c) {
  f("observer.splice");
  V(this.mikado);
  U = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a);
  U = !1;
  return b;
};
O.prototype.push = function(a) {
  f("observer.push");
  V(this.mikado);
  U = !0;
  this.mikado.add(a);
  this[this.length] = a;
  T && this.length++;
  U = !1;
};
O.prototype.unshift = function(a) {
  f("observer.unshift");
  V(this.mikado);
  U = !0;
  this.mikado.add(a, 0);
  this.proto.unshift(a);
  U = !1;
};
O.prototype.pop = function() {
  f("observer.pop");
  V(this.mikado);
  U = !0;
  this.mikado.remove(this.length - 1);
  const a = this.proto.pop();
  U = !1;
  return a;
};
O.prototype.shift = function() {
  f("observer.shift");
  V(this.mikado);
  U = !0;
  this.mikado.remove(0);
  const a = this.proto.shift();
  U = !1;
  return a;
};
O.prototype.concat = function(a) {
  f("observer.concat");
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
O.prototype.sort = S.sort;
O.prototype.reverse = S.reverse;
O.prototype.slice = S.slice;
O.prototype.map = function(a, b) {
  f("observer.map");
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
O.prototype.filter = function(a, b) {
  f("observer.filter");
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, h = this.length; e < h; e++) {
    a(this[e]) ? d && (this.splice(c, d), h -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
O.prototype.indexOf = function(a) {
  f("observer.indexOf");
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
O.prototype.lastIndexOf = function(a) {
  f("observer.lastIndexOf");
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
O.prototype.includes = S.includes;
O.prototype.forEach = function(a) {
  f("observer.forEach");
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
O.prototype.swap = function(a, b) {
  f("observer.swap");
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
O.prototype.transaction = function(a) {
  f("observer.transaction");
  V(this.mikado);
  U = !0;
  a();
  U = !1;
  const b = this.mikado, c = b.fullproxy;
  b.fullproxy = 0;
  b.async ? b.render(this).then(function() {
    b.fullproxy = c;
  }) : (b.render(this), b.fullproxy = c);
};
const W = document.createElement("div"), la = document.createTextNode(""), X = document.createElement("div");
W.appendChild(la);
D.prototype.move = D.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.dom[c]) : c = this.index(a);
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
D.prototype.shift = D.prototype.shiftBy = function(a, b) {
  if (!b) {
    return this;
  }
  if ("number" === typeof a) {
    var c = a;
    a = this.dom[a];
  } else {
    c = this.index(a);
  }
  const d = 0 > b;
  if (d && c || !d && c < this.length - 1) {
    b = d ? Math.max(c + b, 0) : Math.min(c + b, this.length - 1);
    const e = this.dom[b], h = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.dom[b + 1] || null);
    if (h) {
      a = this.dom[c];
      if (d) {
        for (; c > b; c--) {
          this.dom[c] = this.dom[c - 1];
        }
      } else {
        for (; c < b; c++) {
          this.dom[c] = this.dom[c + 1];
        }
      }
      this.dom[b] = a;
    } else {
      this.dom[c] = e, this.dom[b] = a;
    }
  }
  return this;
};
D.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
D.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
D.prototype.first = function(a) {
  return this.shift(a, -this.length);
};
D.prototype.last = function(a) {
  return this.shift(a, this.length);
};
D.prototype.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
D.prototype.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
D.prototype.swap = function(a, b) {
  if (a !== b) {
    let c, d;
    "number" === typeof a ? (c = 0 > a ? this.length + a : a, a = this.dom[c]) : c = this.index(a);
    "number" === typeof b ? (d = 0 > b ? this.length + b : b, b = this.dom[d]) : d = this.index(b);
    const e = c + 1 !== d;
    this.root.insertBefore(e ? a : b, e ? b : a);
    e && d + 1 !== c && this.root.insertBefore(b, this.dom[c + 1] || null);
    this.dom[c] = b;
    this.dom[d] = a;
  }
  return this;
};
const ma = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1};
let na = 0, oa = 0;
function pa(a, b, c, d, e, h) {
  na || (na = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(w) {
      const u = pa(a);
      "function" === typeof b && b(u);
      w(u);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1});
  const k = h ? {} : {tpl:{}}, g = h ? k : k.tpl;
  if (!h) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var l = document.createElement("div");
        l.innerHTML = a;
        a = l.firstElementChild;
      } else {
        k.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (k.name || (k.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
  }
  l = a.tagName;
  if (!l || "SCRIPT" === l) {
    var n;
    if ((n = (l ? a.firstChild : a).nodeValue) && n && n.trim()) {
      if (n.includes("{{@")) {
        var p = n.replace(/{{@([\s\S]+)}}/g, "$1").trim();
        n = /{{[\s\S]+}}/.test(p) ? p.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
        p && (p = p.replace(/{{([\s\S]+)}}/g, ""));
        p && d.push(p);
        if ("SCRIPT" === l) {
          return n.trim() && (g.text = n, g.tag = l), g;
        }
      }
      n && n.trim() && (n.includes("{{#") ? qa(g, "html", n, !1, null, e, c, d) : (e.count++, qa(g, "text", n, !1, null, e, c, d)));
    }
    if (!l) {
      return n && n.trim() ? g : null;
    }
  }
  l && (g.tag = l);
  if ((n = a.attributes) && n.length) {
    l = {};
    for (p = 0; p < n.length; p++) {
      let w = n[p].nodeName, u = a.getAttribute(w);
      "include" === w && (w = "inc");
      l[w] = u;
    }
    n = l;
    for (var q in n) {
      l = n[q];
      var r = void 0, t = void 0;
      switch(q) {
        case "class":
        case "style":
          r = q;
          break;
        case "include":
          q = "inc";
        case "inc":
          r = q;
          break;
        case "if":
          r = q;
          break;
        case "foreach":
          r = q = "for";
          break;
        case "js":
          break;
        case "key":
          k.key = l.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          ma[q] ? t = g.event || (g.event = {}) : (h || "id" !== q && "name" !== q || k.name || /{{[\s\S]+}}/.test(l) || (k.name = l), t = g.attr || (g.attr = {})), r = q;
      }
      r && qa(t || g, r, l, !!t, n, e, c, d);
    }
  }
  q = (a.content || a).childNodes;
  r = q.length;
  e.included && (e.included = !1, e.inc++, d = [], (g.for || g.if) && c.unshift(d), g.child || (g.child = g.text ? {text:g.text} : g.html ? {html:g.html} : null), r ? (d.root = g, d.inc = g.child || (g.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = g.inc, delete g.for, delete g.if, delete g.text, delete g.html);
  if (r) {
    for (let w = 0, u; w < r; w++) {
      if (u = q[w], 8 !== u.nodeType && (e.count++, t = pa(u, null, c, d, e, 1))) {
        1 !== r || 3 !== u.nodeType && t.text || g.js && t.js ? (t.text || t.tag) && (g.child || (g.child = [])).push(t) : (t.js && (g.js = t.js), t.html && (g.html = t.html), t.text && (g.text = t.text));
      }
    }
    g.child && 1 === g.child.length && (g.child = g.child[0]);
  }
  if (!h) {
    k.name || (k.name = "tpl-" + oa++);
    if ("COMPONENT" === g.tag) {
      d = g.child;
      e = [];
      for (let w = 0, u; w < d.length; w++) {
        u = d[w], "TEMPLATE" === u.tag ? (d = h = u.child.length ? u.child[0] : u.child, u.name && (h.name = u.name), u.id && (h.id = u.id), u.key && (h.key = u.key), u.cache && (h.cache = u.cache)) : e.push(u);
      }
      k.tpl = d;
      k.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
      k.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d] = c[d].length ? Function("data", "state", "index", "_p", "_x", '"use strict";let _o,_v,_c;' + c[d].join(";")) : null;
      }
      k.fn = c.length ? c : null;
    }
  }
  return k;
}
function qa(a, b, c, d, e, h, k, g) {
  if (/{{[\s\S]+}}/.test(c)) {
    k = /{{([!?#]+)?=/.test(c);
    let l = /{{!?\?/.test(c), n = /{{\??!/.test(c);
    if (k) {
      if (l || n) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      k = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").trim();
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    l && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || h.count++;
    h.count !== h.last && (h.current++, h.last = h.count, g.push("_o=_p[" + h.current + "]"), g.push("_x&&(_x[" + h.current + "]=_c={})"));
    g.push("_v=" + c);
    d ? g.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? g.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? g.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? g.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === 
    b && g.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = k ? [k] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || h.included || (h.count !== h.last && (h.current++, h.last = h.count, g.push("_o=_p[" + h.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = h.inc, e.if ? g.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? g.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : g.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), h.included = !0);
}
;const ra = /[^;:]+/g, sa = /[ ]+/g;
function ta(a, b, c, d) {
  d["_a" + b] !== c ? (f("cache.miss"), f("cache.attr"), d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b)) : f("cache.match");
}
function ua(a, b, c) {
  !1 !== c["_a" + b] ? (f("cache.miss"), f("cache.attr"), c["_a" + b] = !1, a.removeAttribute(b)) : f("cache.match");
}
function va(a, b) {
  let c, d;
  (c = a._mkc) ? d = c["_a" + b] : a._mkc = c = {};
  "string" !== typeof d ? (f("cache.miss"), f("cache.attr"), c["_a" + b] = d = a.getAttribute(b)) : f("cache.match");
  return d;
}
function Y(a) {
  var b = a._mkc;
  let c;
  b ? c = b._c : a._mkc = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    for (f("cache.transform"), a = c.split(sa), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function wa(a, b, c) {
  c[b] ? f("cache.match") : (f("cache.miss"), f("cache.class"), c[b] = 1, a.classList.add(b));
}
function xa(a, b, c) {
  0 !== c[b] ? (f("cache.miss"), f("cache.class"), c[b] = 0, a.classList.remove(b)) : f("cache.match");
}
function ya(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c ? (f("cache.miss"), f("cache.class"), d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b)) : f("cache.match");
}
function za(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (f("cache.transform"), a = c.match(ra), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
function Aa(a, b, c, d, e) {
  e[b] !== c ? (f("cache.miss"), f("cache.style"), e[b] = c, (d || a.style).setProperty(b, c)) : f("cache.match");
}
;D.once = ja;
D.register = function(a, b) {
  f("mikado.register");
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = N[c], a instanceof D || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  N[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  N[c] = [a, b];
  return D;
};
D.unregister = function(a) {
  f("mikado.unregister");
  "object" === typeof a && (a = a.name);
  const b = N[a];
  b && (b instanceof D && b.destroy(), N[a] = null);
  return D;
};
D.compile = pa;
D.setText = function(a, b) {
  let c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b ? (f("cache.miss"), f("cache.text"), c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b) : f("cache.match");
};
D.getText = function(a) {
  let b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d ? (f("cache.miss"), f("cache.text"), 3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent) : f("cache.match");
  return d;
};
D.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b ? (f("cache.miss"), f("cache.html"), a.innerHTML = b, c._h = b, c._t = null) : f("cache.match");
};
D.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c ? (f("cache.miss"), f("cache.html"), b._h = c = a.innerHTML) : f("cache.match");
  return c;
};
D.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b ? (f("cache.miss"), f("cache.class"), c._c = b, a.className = b) : f("cache.match");
};
D.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c ? (f("cache.miss"), f("cache.class"), b._c = c = a.className) : f("cache.match");
  return c.split(sa);
};
D.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d ? (f("cache.miss"), f("cache.class"), c[b] = d = a.classList.contains(b) ? 1 : 0) : f("cache.match");
  return !!d;
};
D.toggleClass = function(a, b, c) {
  const d = Y(a);
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
D.removeClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      xa(a, b[d], c);
    }
  } else {
    xa(a, b, c);
  }
};
D.addClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      wa(a, b[d], c);
    }
  } else {
    wa(a, b, c);
  }
};
D.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      ta(a, e, b[e], d);
    }
  } else {
    ta(a, b, c, d);
  }
};
D.getAttribute = va;
D.hasAttribute = function(a, b) {
  a = va(a, b);
  return !(!a && "" !== a);
};
D.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      ua(a, b[d], c);
    }
  } else {
    ua(a, b, c);
  }
};
D.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b ? (f("cache.miss"), f("cache.style"), c._s = b, a.style.cssText = b) : f("cache.match");
};
D.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c ? (f("cache.miss"), f("cache.css"), b._s = c = a.style.cssText) : f("cache.match");
  return c;
};
D.getStyle = function(a, b) {
  const c = za(a);
  let d = c[b];
  "string" !== typeof d ? (f("cache.miss"), f("cache.style"), c[b] = d = a.style.getPropertyValue(b)) : f("cache.match");
  return d;
};
D.setStyle = function(a, b, c) {
  const d = za(a), e = a.style;
  if ("object" === typeof b) {
    for (const h in b) {
      Aa(a, h, b[h], e, d);
    }
  } else {
    Aa(a, b, c, e, d);
  }
};
D.escape = function(a) {
  W._text !== a && (la.nodeValue = a, W._html = W.innerHTML, W._text = a);
  return W._html;
};
D.sanitize = function(a) {
  X._html !== a && (X.innerHTML = a, X._html = a, X._text = X.textContent);
  return X._text;
};
D.prototype.route = D.route = function(a, b, c) {
  f("route.set");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  x[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  x[a] = b;
  c && (z[a] = c);
  return this;
};
D.prototype.dispatch = D.dispatch = function(a, b, c) {
  f("route.dispatch");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!x[a]) {
    throw Error("Undefined route '" + a + "'.");
  }
  x[a](b || this, c || window.event);
  return this;
};
D.prototype.listen = D.listen = ca;
D.prototype.unlisten = D.unlisten = function(a) {
  m[a] && (f("event.unlisten"), F(0, a, E, v[a]), m[a] = 0, v[a] = null);
  return this;
};
D.Array = O;
const Z = window;
let Ba;
(Ba = Z.define) && Ba.amd ? Ba([], function() {
  return D;
}) : "object" === typeof Z.exports ? Z.exports = D : Z.Mikado = D;
}).call(this);
