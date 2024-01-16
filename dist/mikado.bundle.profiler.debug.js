/**!
 * Mikado.js v0.8.220 (Bundle/Debug)
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
;const m = {}, v = {}, x = Object.create(null), y = Object.create(null), aa = document.documentElement || document.body.parentNode, B = "ontouchstart" in window, C = !B && window.PointerEvent && navigator.maxTouchPoints;
E.eventCache = !1;
E.eventBubble = !1;
let ba;
function F(a, b) {
  f("event.trigger");
  b || (b = a.type);
  const c = a.target, d = E.eventCache;
  var e = E.eventBubble;
  let k;
  d && (k = c["_mke" + b]);
  if ("undefined" === typeof k) {
    for (var h = c; h && h !== aa;) {
      f("event.bubble");
      var g = void 0;
      "click" === b && ba && (g = h.getAttribute("tap"));
      g || (g = h.getAttribute(b));
      if (g) {
        var l = g.indexOf(":"), n = h;
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
        if (g && (k || (k = [], d && (c["_mke" + b] = k)), k.push([g, n]), n = y[g], !e || n && (n.stop || n.cancel))) {
          break;
        }
      }
      h = h.parentElement;
    }
    d && (k || (c["_mke" + b] = null));
  } else {
    f("event.cache");
  }
  if (k) {
    for (let p = 0, q; p < k.length; p++) {
      if (q = k[p], e = q[0], h = x[e]) {
        g = q[1];
        if (n = y[e]) {
          n.prevent && a.preventDefault(), n.stop && a.stopImmediatePropagation(), n.once && (x[e] = null, d && (c["_mke" + b] = null));
        }
        f("route.call");
        h(g, a);
      } else {
        console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
      }
    }
  }
}
function ca(a, b) {
  m[a] || (f("event.listen"), G(1, a, F, b), m[a] = 1, v[a] = b || null);
  return this;
}
let H, I, da;
if (B || C) {
  function a(d) {
    var e = d;
    (d = d.touches) && (e = d[0]);
    H = e.clientX;
    I = e.clientY;
  }
  function b(d) {
    const e = H, k = I;
    var h = d, g = d.changedTouches;
    g && (h = g[0]);
    H = h.clientX;
    I = h.clientY;
    15 > Math.abs(H - e) && 15 > Math.abs(I - k) && F(d, "tap");
  }
  const c = {passive:!1, capture:!0};
  da = function(d) {
    G(d, C ? "pointerdown" : "touchstart", a, c);
    G(d, C ? "pointerup" : "touchend", b, c);
  };
}
function G(a, b, c, d) {
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
  const d = b.length, e = [], k = {};
  for (let l = 0, n, p, q, r, u, w = null; l < d; l++) {
    n = b[l];
    if (p = n.v) {
      if (r = q = k[p], !r) {
        let t = void 0;
        var h = a, g = p;
        f("factory.resolve");
        for (let D = 0, z = g.length, A = ""; D < z; D++) {
          const Q = g[D];
          A += Q;
          k[A] ? h = k[A] : (">" === Q ? h = h.firstChild : "|" === Q ? (t = h, h = h.firstChild) : "@" === Q ? (t = h, h = h.style) : h = h.nextSibling, k[A] = h);
        }
        q = [h, t];
        r = q[0];
        q = q[1] || r;
      }
    } else {
      r = q = a;
    }
    c && u !== q && (u = q, q._mkc = w = {});
    f("cache.create");
    e[l] = new K(w, r, "");
  }
  return a._mkp = e;
}
function L(a, b, c, d, e, k) {
  f("factory.construct");
  k || (a.fullproxy = 1);
  const h = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let g, l;
  if (l = b.class) {
    "object" === typeof l ? (f("cache.create"), c.push(new K(g = {_c:""}, h, d)), (l = l[0]) ? M(a, l, ["_c", c.length - 1]) : a.fullproxy = 0) : e || (h.className = l);
  }
  if (l = b.attr) {
    for (const p in l) {
      let q = l[p];
      "object" === typeof q ? (f("cache.create"), g || c.push(new K(g = {}, h, d)), g["_a" + p] = !1, (q = q[0]) ? M(a, q, ["_a", c.length - 1, p]) : a.fullproxy = 0) : e || h.setAttribute(p, q);
    }
  }
  if (l = b.event) {
    for (const p in l) {
      e || h.setAttribute(p, l[p]), ca(p);
    }
  }
  if (l = b.style) {
    "object" === typeof l ? (f("cache.create"), c.push(new K(g || (g = {}), h.style, d + "@")), g._s = "", (l = l[0]) ? M(a, l, ["_s", c.length - 1]) : a.fullproxy = 0) : e || (h.style.cssText = l);
  }
  if (l = b.text) {
    if ("object" === typeof l) {
      var n = h;
      l = l[0];
      b.tag ? (d += "|", n = !e && h.firstChild, n || (n = document.createTextNode(l), h.appendChild(n))) : g = {};
      (g || (g = {}))._t = l;
      f("cache.create");
      c.push(new K(g, n, d));
      l ? M(a, l, ["_t", c.length - 1]) : a.fullproxy = 0;
    } else {
      e || (b.tag ? h.textContent = l : h.nodeValue = l);
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
        h.appendChild(b);
      }
    }
  } else if (l = b.html) {
    "object" === typeof l ? (f("cache.create"), g || c.push(new K(g = {}, h, d)), g._h = "", (l = l[0]) ? M(a, l, ["_h", c.length - 1]) : a.fullproxy = 0) : e || (h.innerHTML = l);
  } else if (l = b.inc) {
    f("cache.create");
    f("template.include");
    g || c.push(new K(null, h, d));
    if ("string" === typeof l) {
      n = N[l];
      if (!n) {
        throw Error("The partial template '" + l + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(n instanceof E)) {
        d = n[0];
        if (b = n[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        N[l] = n = new E(d, b);
      }
    } else if (1 !== l) {
      d = a.inc.length;
      if (!a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      n = new E({name:a.name + "|" + d, tpl:l, key:l.key, cache:l.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:h, hydrate:!!e});
    }
    1 !== l && a.inc.push(n);
  }
  g && (h._mkc = g);
  k || (h._mkp = c);
  return h;
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
K.prototype._a = function(a, b) {
  if (this.c) {
    if (("undefined" === typeof this.c["_a" + a] ? !1 : this.c["_a" + a]) === b) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.attr");
    this.c["_a" + a] = b;
  }
  !1 !== b ? this.n.setAttribute(a, b) : this.n.removeAttribute(a);
};
K.prototype._t = function(a) {
  if (this.c) {
    if (("undefined" === typeof this.c._t ? "" : this.c._t) === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.text");
    this.c._t = a;
  }
  this.n.nodeValue = a;
};
K.prototype._c = function(a) {
  if (this.c) {
    if ((this.c._c || "") === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.class");
    this.c._c = a;
  }
  this.n.className = a;
};
K.prototype._s = function(a) {
  if (this.c) {
    if ((this.c._s || "") === a) {
      f("cache.match");
      return;
    }
    f("cache.miss");
    f("cache.style");
    this.c._s = a;
  }
  this.n.cssText = a;
};
K.prototype._h = function(a) {
  if (this.c) {
    if ((this.c._h || "") === a) {
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
    }, set:function(k) {
      f("proxy.write");
      ea(e, d = k, c);
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
      const e = c[d], k = e[0], h = a.path[e[1]];
      h.c && h.c[k + (e[2] || "")] === b ? f("cache.match") : (f("cache.miss"), h[k](e[2] || b, b));
    }
  }
}
;const N = Object.create(null);
function E(a, b = {}) {
  if (!(this instanceof E)) {
    return new E(a, b);
  }
  f("mikado.new");
  if ("string" === typeof a) {
    var c = N[a];
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
  this.dom = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.state = b.state || {};
  this.shadow = b.shadow || !!a.cmp;
  this.key = a.key || "";
  this.live = {};
  this.recycle = !!this.key || !!b.recycle;
  c = a.fn;
  a.fc || c && (a.fc = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  this.pool = this.recycle && b.pool || 0;
  this.pool_shared = [];
  this.pool_keyed = new Map();
  this.cache = this.recycle && (a.cache || !!b.cache);
  this.async = !!b.async;
  this.timer = 0;
  this.on = b.on || null;
  this.proxy = null;
  this.fullproxy = 0;
  (a = b.observe) && (new O(a)).mount(this);
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
E.prototype.mount = function(a, b) {
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
        for (let k = 0, h; k < c.length; k++) {
          h = L(this, c[k], [], ""), a.append(h), k === c.length - 1 && (a = h);
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
      const k = e.length, h = Array(k);
      for (let g = 0; g < k; g++) {
        h[g] = e[g];
      }
      this.dom = h;
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
        for (let k = 0, h, g; k < this.length; k++) {
          f("hydrate.count"), h = this.dom[k], (g = h.getAttribute("key")) || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated components don't have an attribute 'key' exported."), h._mkk = g, d[g] = h;
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
  var k;
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
  var h = (k = b.cmp) && k.length;
  k && !h && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || h || b.fn) {
    k = new E(b);
    h && (a = k.mount(a).root);
    if (c && Array.isArray(c)) {
      for (h = 0; h < c.length; h++) {
        a.append(k.create(c[h], d, h));
      }
    } else {
      a.append(k.create(c, d));
    }
    k.destroy();
  } else {
    k = L({}, b.tpl, [], "", null, 1), a.append(k);
  }
  return E;
}
E.prototype.render = function(a, b, c, d) {
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
  var k = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  if (Array.isArray(a) || a instanceof O) {
    if (d = a.length, !d) {
      return this.remove(0, k);
    }
  } else {
    if (this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  const h = this.key;
  e = this.proxy;
  !k || h || this.recycle || (this.remove(0, k), k = 0);
  let g = k < d ? k : d, l = 0;
  if (l < g) {
    for (let n, p; l < g; l++) {
      n = this.dom[l];
      p = a[l];
      if (h && n._mkk !== p[h]) {
        return this.reconcile(a, b, l);
      }
      this.update(n, p, b, l, 1);
      e && !p._mkx && (a[l] = R(this, n, p));
    }
  }
  if (l < d) {
    for (; l < d; l++) {
      k = a[l], this.add(k, b), !e || this.recycle && k._mkx || (a[l] = R(this, this.dom[l], k));
    }
  } else {
    d < k && this.remove(d, k - d);
  }
  return this;
};
E.prototype.replace = function(a, b, c, d) {
  f("view.replace");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var e;
  if (this.key) {
    var k = b[this.key];
    if (e = this.live[k]) {
      if (e !== a) {
        k = this.index(e);
        const h = k < d ? e : a, g = k < d ? a : e;
        let l = this.dom[k < d ? k + 1 : d + 1];
        this.dom[d] = e;
        this.dom[k] = a;
        l !== g ? this.root.insertBefore(h, g) : l = h;
        this.root.insertBefore(g, l);
      }
    } else {
      this.pool && (e = this.pool_keyed.get(k)) && (this.pool_keyed.delete(k), this.checkout(a), this.dom[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? this.fullproxy && b._mkx || !this.apply || this.apply(b, c || this.state, d, e._mkp || J(e, this.factory._mkp, this.cache)) : (b = this.create(b, c, d, 1), (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  (d = this.on && this.on.replace) && d(a, this);
  return this;
};
E.prototype.update = function(a, b, c, d) {
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
E.prototype.cancel = function() {
  f("view.cancel");
  cancelAnimationFrame(this.timer);
  this.timer = 0;
  return this;
};
E.prototype.create = function(a, b, c, d) {
  f("view.create");
  const e = this.key, k = e && a[e];
  let h, g, l, n;
  e ? this.pool && (g = this.pool_keyed) && (h = g.get(k)) && (f("pool.out"), g.delete(k), n = 1) : this.recycle && this.pool && (g = this.pool_shared) && g.length && (f("pool.out"), h = g.pop());
  h || (h = l = this.factory, l || (this.factory = h = l = L(this, this.tpl.tpl, [], ""), P(this)));
  this.apply && this.apply(a, b || this.state, c, h._mkp || J(h, this.factory._mkp, !!l || this.cache));
  l && (f("factory.clone"), h = l.cloneNode(!0));
  e && (n || (h._mkk = k), d && (this.live[k] = h));
  (a = this.on && this.on[l ? "create" : "recycle"]) && a(h, this);
  return h;
};
E.prototype.add = function(a, b, c) {
  f("view.add");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), S(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = this.on && this.on.insert) && c(a, this);
  return this;
};
function R(a, b, c) {
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
E.prototype.reconcile = function(a, b, c) {
  f("view.reconcile");
  const d = this.dom, e = this.live, k = this.key;
  let h = a.length, g = d.length, l = g > h ? g : h, n = 0;
  for (c || (c = 0); c < l; c++) {
    var p = void 0;
    if (c < h) {
      var q = a[c], r = c >= g;
      let u, w, t, D;
      this.proxy && (q._mkx ? D = 1 : a[c] = R(this, d[c], q));
      if (!r && (u = d[c], w = q[k], t = u._mkk, t === w)) {
        D || this.update(u, q, b, c, 1);
        continue;
      }
      if (r || !e[w]) {
        r || !this.pool ? (g++, l = g > h ? g : h, this.add(q, b, c)) : this.replace(u, q, b, c);
        continue;
      }
      let z, A;
      for (r = c + 1; r < l; r++) {
        if (!z && r < g && d[r]._mkk === w && (z = r + 1), !A && r < h && a[r][k] === t && (A = r + 1), z && A) {
          z >= A + n ? (p = d[z - 1], this.root.insertBefore(p, u), D || this.update(p, q, b, c, 1), z === A ? (1 < r - c && this.root.insertBefore(u, d[z]), d[c] = d[r], (d[r] = u) || console.error("reconcile.error 1"), f("view.reconcile.steps")) : (z - 1 === c && console.error("reconcile.error 2"), S(d, z - 1, c), n++)) : (q = A - 1 + n, this.root.insertBefore(u, d[q] || null), (q > g ? g : q) - 1 === c && console.error("reconcile.error 3"), S(d, c, (q > g ? g : q) - 1), n--, c--);
          f("view.reconcile.steps");
          p = 1;
          break;
        }
      }
    }
    p || (this.remove(c), g--, l = g > h ? g : h, c--);
  }
  return this;
};
function S(a, b, c, d) {
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
E.prototype.append = function(a, b, c) {
  f("view.append");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let k = 0; k < e; k++) {
    this.add(a[k], b, d ? c++ : null);
  }
  return this;
};
E.prototype.clear = function() {
  f("view.clear");
  this.length && this.remove(0, this.length);
  return this;
};
E.prototype.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root._mkd = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  const d = this.pool && !this.key, e = this.key || this.pool, k = this.on && this.on.remove;
  for (let h = 0, g; h < b; h++) {
    f("view.remove"), g = a[d ? b - h - 1 : h], c && g.remove(), e && this.checkout(g), k && k(g, this);
  }
  this.length = c;
  return this;
};
E.prototype.index = function(a) {
  f("view.index");
  return this.dom.indexOf(a);
};
E.prototype.node = function(a) {
  f("view.node");
  return this.dom[a];
};
E.prototype.checkout = function(a) {
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
E.prototype.flush = function() {
  f("view.flush");
  this.pool_shared = [];
  this.pool_keyed = new Map();
  return this;
};
E.prototype.destroy = function() {
  f("view.destroy");
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], N[b.name] || b.destroy();
  }
  this.key && (this.root && (this.root._mkl = null), this.live = null);
  this.root && (this.root._mkd = this.root._mki = null);
  this.proxy = this.on = this.pool_keyed = this.pool_shared = this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
};
const T = Array.prototype, ka = window.Proxy;
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
  if (ka) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:T.splice.bind(this), pop:T.pop.bind(this), shift:T.shift.bind(this), unshift:T.unshift.bind(this), push:T.push.bind(this)};
    return new Proxy(this, la);
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
    "number" === typeof a && (a === this.length && this.define(a + 1), la.set(this, a, b));
  }});
  return this;
};
const la = {set:function(a, b, c) {
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
      var k = a.length;
      if (d) {
        V(e);
        const h = e.length;
        k !== h && (a.length = h);
        b >= h ? (e.add(c), a.length++) : b < h && (k = e.dom[b], e.recycle || e.key && k._mkk === c[e.key] ? e.update(k, c, null, b) : e.replace(k, c, null, b));
      } else {
        "length" === b && c < k && e.remove(c, k - c);
      }
    }
    U = !1;
  }
  !d || !e.proxy || e.recycle && c._mkx || (c = R(e, e.dom[b], c));
  (ka ? a : a.proto)[b] = c;
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
  ka && this.length++;
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
O.prototype.sort = T.sort;
O.prototype.reverse = T.reverse;
O.prototype.slice = T.slice;
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
  for (let e = 0, k = this.length; e < k; e++) {
    a(this[e]) ? d && (this.splice(c, d), k -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
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
O.prototype.includes = T.includes;
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
const W = document.createElement("div"), ma = document.createTextNode(""), X = document.createElement("div");
W.appendChild(ma);
E.prototype.move = E.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.dom[c]) : c = this.index(a);
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
E.prototype.shift = E.prototype.shiftBy = function(a, b) {
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
    const e = this.dom[b], k = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.dom[b + 1] || null);
    if (k) {
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
E.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
E.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
E.prototype.first = function(a) {
  return this.shift(a, -this.length);
};
E.prototype.last = function(a) {
  return this.shift(a, this.length);
};
E.prototype.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
E.prototype.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
E.prototype.swap = function(a, b) {
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
const na = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1};
let oa = 0, pa = 0;
function qa(a, b, c, d, e, k) {
  oa || (oa = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(w) {
      const t = qa(a);
      "function" === typeof b && b(t);
      w(t);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1});
  const h = k ? {} : {tpl:{}}, g = k ? h : h.tpl;
  if (!k) {
    if ("string" === typeof a) {
      if (/<.*>/.test(a)) {
        var l = document.createElement("div");
        l.innerHTML = a;
        a = l.firstElementChild;
      } else {
        h.name = a, a = document.getElementById(a);
      }
      if (!a) {
        throw Error("The template was not found.");
      }
    }
    a.content && (h.name || (h.name = a.id || a.getAttribute("name")), a = a.content.firstElementChild);
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
      n && n.trim() && (n.includes("{{#") ? ra(g, "html", n, !1, null, e, c, d) : (e.count++, ra(g, "text", n, !1, null, e, c, d)));
    }
    if (!l) {
      return n && n.trim() ? g : null;
    }
  }
  l && (g.tag = l);
  if ((n = a.attributes) && n.length) {
    l = {};
    for (p = 0; p < n.length; p++) {
      let w = n[p].nodeName, t = a.getAttribute(w);
      "include" === w && (w = "inc");
      l[w] = t;
    }
    n = l;
    for (var q in n) {
      l = n[q];
      var r = void 0, u = void 0;
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
          h.key = l.replace(/({{|}})/g, "").trim().replace("data.", "");
          break;
        case "cache":
          break;
        default:
          na[q] ? u = g.event || (g.event = {}) : (k || "id" !== q && "name" !== q || h.name || /{{[\s\S]+}}/.test(l) || (h.name = l), u = g.attr || (g.attr = {})), r = q;
      }
      r && ra(u || g, r, l, !!u, n, e, c, d);
    }
  }
  q = (a.content || a).childNodes;
  r = q.length;
  e.included && (e.included = !1, e.inc++, d = [], (g.for || g.if) && c.unshift(d), g.child || (g.child = g.text ? {text:g.text} : g.html ? {html:g.html} : null), r ? (d.root = g, d.inc = g.child || (g.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = g.inc, delete g.for, delete g.if, delete g.text, delete g.html);
  if (r) {
    for (let w = 0, t; w < r; w++) {
      if (t = q[w], 8 !== t.nodeType && (e.count++, u = qa(t, null, c, d, e, 1))) {
        1 !== r || 3 !== t.nodeType && u.text || g.js && u.js ? (u.text || u.tag) && (g.child || (g.child = [])).push(u) : (u.js && (g.js = u.js), u.html && (g.html = u.html), u.text && (g.text = u.text));
      }
    }
    g.child && 1 === g.child.length && (g.child = g.child[0]);
  }
  if (!k) {
    h.name || (h.name = "tpl-" + pa++);
    if ("COMPONENT" === g.tag) {
      d = g.child;
      e = [];
      for (let w = 0, t; w < d.length; w++) {
        t = d[w], "TEMPLATE" === t.tag ? (d = k = t.child.length ? t.child[0] : t.child, t.name && (k.name = t.name), t.id && (k.id = t.id), t.key && (k.key = t.key), t.cache && (k.cache = t.cache)) : e.push(t);
      }
      h.tpl = d;
      h.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
      h.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d].length ? (c[d].unshift("let _o,_v"), c[d] = Function("data", "state", "index", "_p", '"use strict";' + c[d].join(";"))) : c[d] = null;
      }
      h.fn = c.length ? c : null;
    }
  }
  return h;
}
function ra(a, b, c, d, e, k, h, g) {
  if (/{{[\s\S]+}}/.test(c)) {
    h = /{{([!?#]+)?=/.test(c);
    let l = /{{!?\?/.test(c), n = /{{\??!/.test(c);
    if (h) {
      if (l || n) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      h = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").trim();
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    l && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || k.count++;
    k.count !== k.last && (k.current++, k.last = k.count, g.push("_o=_p[" + k.current + "]"));
    g.push("_v=" + c);
    d ? g.push('if(!_o.c||(typeof _o.c["_a' + b + '"]==="undefined"?false:_o.c["_a' + b + '"])!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? g.push('if(!_o.c||(_o.c._c||"")!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}') : "style" === b ? g.push('if(!_o.c||(_o.c._s||"")!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}') : "html" === b ? g.push('if(!_o.c||(_o.c._h||"")!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}') : "text" === b && 
    g.push('if(!_o.c||(typeof _o.c._t==="undefined"?"":_o.c._t)!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}');
    a[b] = h ? [h] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || k.included || (k.count !== k.last && (k.current++, k.last = k.count, g.push("_o=_p[" + k.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = k.inc, e.if ? g.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? g.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : g.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), k.included = !0);
}
;const sa = /[^;:]+/g, ta = /[ ]+/g;
function ua(a, b, c, d) {
  d["_a" + b] !== c ? (f("cache.miss"), f("cache.attr"), d["_a" + b] = c, !1 !== c ? a.setAttribute(b, c) : a.removeAttribute(b)) : f("cache.match");
}
function va(a, b, c) {
  !1 !== c["_a" + b] ? (f("cache.miss"), f("cache.attr"), c["_a" + b] = !1, a.removeAttribute(b)) : f("cache.match");
}
function wa(a, b) {
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
    for (f("cache.transform"), a = c.split(ta), b._c = c = {}, b = 0; b < a.length; b++) {
      c[a[b]] = 1;
    }
  }
  return c;
}
function xa(a, b, c) {
  c[b] ? f("cache.match") : (f("cache.miss"), f("cache.class"), c[b] = 1, a.classList.add(b));
}
function ya(a, b, c) {
  0 !== c[b] ? (f("cache.miss"), f("cache.class"), c[b] = 0, a.classList.remove(b)) : f("cache.match");
}
function za(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c ? (f("cache.miss"), f("cache.class"), d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b)) : f("cache.match");
}
function Aa(a) {
  var b = a._mkc;
  let c;
  b ? c = b._s : a._mkc = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (f("cache.transform"), a = c.match(sa), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b]] = a[b + 1];
    }
  }
  return c;
}
function Ba(a, b, c, d, e) {
  e[b] !== c ? (f("cache.miss"), f("cache.style"), e[b] = c, (d || a.style).setProperty(b, c)) : f("cache.match");
}
;E.once = ja;
E.register = function(a, b) {
  f("mikado.register");
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = N[c], a instanceof E || (a = a[0]), !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  N[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  N[c] = [a, b];
  return E;
};
E.unregister = function(a) {
  f("mikado.unregister");
  "object" === typeof a && (a = a.name);
  const b = N[a];
  b && (b instanceof E && b.destroy(), N[a] = null);
  return E;
};
E.compile = qa;
E.setText = function(a, b) {
  let c = a._mkc, d, e;
  c ? e = c._t : a._mkc = c = {};
  e !== b ? (f("cache.miss"), f("cache.text"), c._t = b, 3 === a.nodeType && (d = a) || (d = a.firstChild) ? d.nodeValue = b : a.textContent = b) : f("cache.match");
};
E.getText = function(a) {
  let b = a._mkc, c, d;
  b ? d = b._t : a._mkc = b = {};
  "string" !== typeof d ? (f("cache.miss"), f("cache.text"), 3 === a.nodeType && (c = a) || (c = a.firstChild) ? b._t = d = c.nodeValue : b._t = d = a.textContent) : f("cache.match");
  return d;
};
E.setHtml = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._h : a._mkc = c = {};
  d !== b ? (f("cache.miss"), f("cache.html"), a.innerHTML = b, c._h = b, c._t = null) : f("cache.match");
};
E.getHtml = function(a) {
  let b = a._mkc, c;
  b ? c = b._h : a._mkc = b = {};
  "string" !== typeof c ? (f("cache.miss"), f("cache.html"), b._h = c = a.innerHTML) : f("cache.match");
  return c;
};
E.setClass = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._c : a._mkc = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b ? (f("cache.miss"), f("cache.class"), c._c = b, a.className = b) : f("cache.match");
};
E.getClass = function(a) {
  let b = a._mkc, c;
  b ? c = b._c : a._mkc = b = {};
  "string" !== typeof c ? (f("cache.miss"), f("cache.class"), b._c = c = a.className) : f("cache.match");
  return c.split(ta);
};
E.hasClass = function(a, b) {
  const c = Y(a);
  let d = c[b];
  "number" !== typeof d ? (f("cache.miss"), f("cache.class"), c[b] = d = a.classList.contains(b) ? 1 : 0) : f("cache.match");
  return !!d;
};
E.toggleClass = function(a, b, c) {
  const d = Y(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        za(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        za(a, e, b[e], d);
      }
    }
  } else {
    za(a, b, c, d);
  }
};
E.removeClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      ya(a, b[d], c);
    }
  } else {
    ya(a, b, c);
  }
};
E.addClass = function(a, b) {
  const c = Y(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      xa(a, b[d], c);
    }
  } else {
    xa(a, b, c);
  }
};
E.setAttribute = function(a, b, c) {
  let d = a._mkc;
  d || (a._mkc = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      ua(a, e, b[e], d);
    }
  } else {
    ua(a, b, c, d);
  }
};
E.getAttribute = wa;
E.hasAttribute = function(a, b) {
  a = wa(a, b);
  return !(!a && "" !== a);
};
E.removeAttribute = function(a, b) {
  let c = a._mkc;
  c || (a._mkc = c = {});
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      va(a, b[d], c);
    }
  } else {
    va(a, b, c);
  }
};
E.setCss = function(a, b) {
  let c = a._mkc, d;
  c ? d = c._s : a._mkc = c = {};
  d !== b ? (f("cache.miss"), f("cache.style"), c._s = b, a.style.cssText = b) : f("cache.match");
};
E.getCss = function(a) {
  let b = a._mkc, c;
  b ? c = b._s : a._mkc = b = {};
  "string" !== typeof c ? (f("cache.miss"), f("cache.css"), b._s = c = a.style.cssText) : f("cache.match");
  return c;
};
E.getStyle = function(a, b) {
  const c = Aa(a);
  let d = c[b];
  "string" !== typeof d ? (f("cache.miss"), f("cache.style"), c[b] = d = a.style.getPropertyValue(b)) : f("cache.match");
  return d;
};
E.setStyle = function(a, b, c) {
  const d = Aa(a), e = a.style;
  if ("object" === typeof b) {
    for (const k in b) {
      Ba(a, k, b[k], e, d);
    }
  } else {
    Ba(a, b, c, e, d);
  }
};
E.escape = function(a) {
  W._text !== a && (ma.nodeValue = a, W._html = W.innerHTML, W._text = a);
  return W._html;
};
E.sanitize = function(a) {
  X._html !== a && (X.innerHTML = a, X._html = a, X._text = X.textContent);
  return X._text;
};
E.prototype.route = E.route = function(a, b, c) {
  f("route.set");
  if (!a) {
    throw Error("Missing route name.");
  }
  if (!b) {
    throw Error("The route '" + a + "' has no function assigned to it.");
  }
  x[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  x[a] = b;
  c && (y[a] = c);
  return this;
};
E.prototype.dispatch = E.dispatch = function(a, b, c) {
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
E.prototype.listen = E.listen = ca;
E.prototype.unlisten = E.unlisten = function(a) {
  m[a] && (f("event.unlisten"), G(0, a, F, v[a]), m[a] = 0, v[a] = null);
  return this;
};
E.Array = O;
const Z = window;
let Ca;
(Ca = Z.define) && Ca.amd ? Ca([], function() {
  return E;
}) : "object" === typeof Z.exports ? Z.exports = E : Z.Mikado = E;
}).call(this);
