/**!
 * Mikado.js v0.7.4
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
Object.assign || (Object.assign = function() {
  for (var a = arguments, b = a.length, c = a[0], d = 1, e, g, f; d < b; d++) {
    e = a[d];
    g = Object.keys(e);
    f = g.length;
    for (var h = 0, m; h < f; h++) {
      m = g[h], c[m] = e[m];
    }
  }
  return c;
});
Object.values || (Object.values = function(a) {
  for (var b = Object.keys(a), c = b.length, d = Array(c), e = 0; e < c; e++) {
    d[e] = a[b[e]];
  }
  return d;
});
window.requestAnimationFrame || (window.requestAnimationFrame = window.setTimeout);
window.cancelAnimationFrame || (window.cancelAnimationFrame = window.clearTimeout);
window.Promise || (window.Promise = function() {
  function a(a) {
    this.callback = null;
    var b = this;
    a(function(a) {
      b.callback && (b.callback(a), b.callback = null);
    });
  }
  a.prototype.then = function(a) {
    this.callback = a;
  };
  return a;
}());
function k(a, b, c, d) {
  if ("tap" === b) {
    if (u || v) {
      A(a);
      return;
    }
    aa = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || {passive:!0, capture:!0});
}
function C(a, b) {
  b || (b = a.type);
  var c = a.target, d = c, e = c["_event_" + b];
  if (e) {
    d = c["_root_" + b];
  } else {
    for (; d !== ba;) {
      "click" === b && aa && (e = d.getAttribute("tap"));
      e || (e = d.getAttribute(b));
      if (e) {
        var g = e.indexOf(":");
        if (-1 !== g) {
          var f = e.substring(0, g);
          g = e.substring(g + 1);
          e = 0;
          for (d = d.parentElement; d !== ba;) {
            if (d.hasAttribute(g)) {
              e = f;
              break;
            }
            d = d.parentElement;
          }
        }
        break;
      }
      d = d.parentElement;
    }
    if (!e) {
      return;
    }
    c["_event_" + b] = e;
    c["_root_" + b] = d;
  }
  if (b = ca[e]) {
    a.preventDefault(), b(d, a, c);
  }
  a.stopPropagation();
}
var D = {}, ca = {}, ba = document.body, u = "ontouchstart" in window, v = !u && window.PointerEvent && navigator.maxTouchPoints, aa;
E.route = E.prototype.route = function(a, b) {
  ca[a] = b;
  return this;
};
var F, G, A;
if (u || v) {
  var da = function(a, b) {
    b && (a = b[0]);
    F = a.clientX;
    G = a.clientY;
  }, ea = function(a) {
    var b = F, c = G;
    da(a, a.changedTouches);
    50 > Math.abs(F - b) && 50 > Math.abs(G - c) && C.call(this, a, "tap");
  }, fa = function(a) {
    da(a, a.touches);
  };
  A = function(a) {
    k(a, v ? "pointerdown" : "touchstart", fa, !1);
    k(a, v ? "pointerup" : "touchend", ea, !1);
  };
}
E.listen = E.prototype.listen = function(a, b) {
  D[a] || (k(1, a, C, b || !0), D[a] = 1);
  return this;
};
E.unlisten = E.prototype.unlisten = function(a, b) {
  D[a] && (k(0, a, C, b || !0), D[a] = 0);
  return this;
};
E.prototype.move = function(a, b) {
  if ("number" === typeof a) {
    var c = a;
    a = this.dom[c];
  } else {
    c = this.index(a);
  }
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
};
E.prototype.shift = function(a, b, c) {
  if (!b) {
    return this;
  }
  if ("number" === typeof a) {
    var d = a;
    a = this.dom[a];
  } else {
    d = this.index(a);
  }
  var e = 0 > b;
  if (e && d || !e && d < this.length - 1) {
    b = e ? Math.max(d + b, 0) : Math.min(d + b, this.length - 1);
    var g = this.dom[b], f = e && 1 < d - b || !e && 1 < b - d;
    if (!f && this.reuse && (this.store || this.loose)) {
      var h = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[b] : g._data, c, b);
      this.update(g, h, c, d);
    } else {
      this.root.insertBefore(a, e ? g : this.dom[b + 1] || null);
    }
    if (f) {
      a = this.dom[d];
      g = this.store && this.store[d];
      if (e) {
        for (; d > b; d--) {
          this.dom[d] = this.dom[d - 1], this.store && (this.store[d] = this.store[d - 1]);
        }
      } else {
        for (; d < b; d++) {
          this.dom[d] = this.dom[d + 1], this.store && (this.store[d] = this.store[d + 1]);
        }
      }
      this.dom[b] = a;
      this.store && (this.store[b] = g);
    } else {
      c = this.dom, e = this.store, c[d] = g, c[b] = a, e && (a = e[b], e[b] = e[d], e[d] = a);
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
E.prototype.swap = function(a, b, c) {
  if (a !== b) {
    if ("number" === typeof a) {
      var d = a;
      a = this.dom[a];
    } else {
      d = this.index(a);
    }
    if ("number" === typeof b) {
      var e = b;
      b = this.dom[b];
    } else {
      e = this.index(b);
    }
    if (this.reuse && (this.store || this.loose)) {
      var g = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[e] : b._data, c, d);
      this.update(b, g, c, e);
    } else {
      c = d + 1 !== e, this.root.insertBefore(c ? a : b, c ? b : a), c && e + 1 !== d && this.root.insertBefore(b, this.dom[d + 1] || null), this.dom[d] = b, this.dom[e] = a, this.store && !this.extern && (a = this.store[e], this.store[e] = this.store[d], this.store[d] = a);
    }
  }
  return this;
};
var H = {};
function ha(a) {
  return H[a] = new RegExp("(?:^|\\s)" + a + "(?!\\S)", "g");
}
function ia(a, b) {
  I(a, b) || (a.className += " " + b, a._class += " " + b);
  return this;
}
function ja(a, b) {
  b = (a._class || (a._class = a.className)).replace(H[b] || ha(b), "");
  a._class !== b && (a.className = b, a._class = b);
  return this;
}
function I(a, b) {
  return !!(a._class || (a._class = a.className)).match(H[b] || ha(b));
}
function ka(a, b) {
  var c = a._attr || (a._attr = {}), d = c[b];
  return d || "" === d ? d : c[b] = a.getAttribute(b);
}
;var J = window.localStorage;
E.prototype.export = function() {
  if (this.store) {
    var a = this.store;
  } else {
    if (this.loose) {
      a = Array(this.length);
      for (var b = 0; b < this.length; b++) {
        a[b] = this.dom[b]._data;
      }
    }
  }
  a && J.setItem(this.template, JSON.stringify(a));
  return this;
};
E.prototype.import = function() {
  var a = J.getItem(this.template);
  a && (this.store = a = JSON.parse(a));
  return this;
};
E.prototype.delete = function(a) {
  J.removeItem(a || this.template);
  return this;
};
var K = Array.prototype, L = window.Proxy, M = 0;
function N(a) {
  if (!(this instanceof N)) {
    return new N(a);
  }
  if (a instanceof N) {
    return a;
  }
  this.view = this.mikado = null;
  var b = a ? a.length : 0;
  if (L) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:K.splice.bind(this), pop:K.pop.bind(this), shift:K.shift.bind(this), unshift:K.unshift.bind(this), push:K.push.bind(this)};
    return new Proxy(this, la);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    O(this, a);
  }
  M = b;
  O(this, "length");
}
function O(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.proto[b];
  }, set:function(a) {
    "number" === typeof b && (b === M && O(this, ++M), la.set(this, b, a));
  }});
}
var P = !1, la = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (b = e, d = !0);
  }
  if (!P) {
    P = !0;
    if ((e = a.mikado) && !e.skip) {
      var g = a.length;
      if (d) {
        var f = e.length;
        g !== f && (a.length = f);
        if (e.stealth && a[b] === c) {
          return P = !1, !0;
        }
        d = a.view;
        b >= f ? (e.add(c, d), a.length++) : b < f && (g = e.key, f = e.dom[b], e.reuse || g && f._key === c[g] ? e.update(f, c, d, b) : e.replace(f, c, d, b));
        if (e.proxy) {
          return P = !1, !0;
        }
      } else {
        "length" === b && c < g && e.remove(c, g - c);
      }
    }
    P = !1;
  }
  (L ? a : a.proto)[b] = c;
  return !0;
}};
N.prototype.swap = function(a, b) {
  P = !0;
  this.mikado.swap(a, b, this.view);
  P = !1;
  return this;
};
N.prototype.splice = function(a, b, c) {
  P = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a, this.view);
  P = !1;
  return b;
};
N.prototype.push = function(a) {
  P = !0;
  this.mikado.add(a, this.view);
  this.mikado.proxy || (this[this.length] = a);
  L && this.length++;
  P = !1;
};
N.prototype.unshift = function(a) {
  P = !0;
  this.mikado.add(a, 0, this.view);
  this.proto.unshift(a);
  P = !1;
};
N.prototype.pop = function() {
  P = !0;
  this.mikado.remove(this.length - 1);
  var a = this.proto.pop();
  P = !1;
  return a;
};
N.prototype.shift = function() {
  P = !0;
  this.mikado.remove(0);
  var a = this.proto.shift();
  P = !1;
  return a;
};
N.prototype.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
N.prototype.sort = function(a) {
  K.sort.call(this, a);
  return this;
};
N.prototype.reverse = function() {
  K.reverse.call(this);
  return this;
};
N.prototype.slice = K.slice;
N.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
N.prototype.filter = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    if (a(this[b])) {
      e && (this.splice(d, e), c -= e, b -= e, e = 0);
    } else {
      if (e) {
        e++;
      } else {
        var d = b;
        var e = 1;
      }
    }
  }
  e && this.splice(d, e);
  return this;
};
N.prototype.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
N.prototype.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
N.prototype.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
};
var na = !window.Proxy && function() {
  function a(a, c) {
    this.path = c.path;
    this.handler = c.handler;
    c = Object.keys(a);
    for (var b = 0, e = c.length; b < e; b++) {
      var g = c[b];
      this.define(a, g, a[g]);
    }
    return a;
  }
  a.prototype._proxy = !0;
  a.prototype.define = function(a, c, d) {
    var b = this;
    Object.defineProperty(a, c, {get:function() {
      return d;
    }, set:function(a) {
      d !== a && (ma(b.handler, b.path, c, a), d = a);
    }});
  };
  return a;
}(), oa = {_text:function(a, b) {
  a.nodeValue = b;
}, _html:function(a, b) {
  a.innerHTML = b;
}, _class:function(a, b) {
  a.className = b;
}, _css:function(a, b) {
  (a._style || (a._style = a.style)).cssText = b;
}, _attr:function(a, b, c) {
  a.setAttribute(c, b);
}};
function pa(a, b, c) {
  return new (na || Proxy)(a, {path:b, handler:c, get:qa, set:ra});
}
function qa(a, b) {
  return "_proxy" === b || a[b];
}
function ra(a, b, c) {
  a[b] !== c && (ma(this.handler, this.path, b, c), a[b] = c);
  return !0;
}
function ma(a, b, c, d) {
  if (a = a["data." + c]) {
    for (var e = 0, g = a.length, f; e < g; e++) {
      f = a[e], oa[f[0]](b[f[1]], d, f[2] || c);
    }
  }
}
;var sa = window, ta = sa.requestAnimationFrame, ua = sa.cancelAnimationFrame, va = {}, Q = {}, R = {}, S = {}, T = {};
function E(a, b, c) {
  if (!(this instanceof E)) {
    return new E(a, b, c);
  }
  a.nodeType || (c = b, b = a, a = null);
  a ? this.mount(a) : (this.root = this.dom = null, this.length = 0);
  this.init(b, c);
}
E.register = E.register = function(a, b) {
  b || (b = a, a = b.n);
  Q[a] = b;
  return E;
};
E.prototype.mount = function(a) {
  this.root !== a && (this.key && this.root && (this.root._pool = this.live, this.live = a._pool || {}), this.root = a, this.check(), this.dom = a._dom || (a._dom = wa(a.children)), this.length = this.dom.length);
  return this;
};
E.prototype.sync = function(a) {
  this.root._dom = this.dom = wa(this.root.children);
  this.length = this.dom.length;
  if (a && this.cache) {
    for (a = 0; a < this.length; a++) {
      var b = this.dom[a]._path;
      if (b) {
        for (var c = 0, d; c < b.length; c++) {
          d = b[c], d._class = d._html = d._text = d._css = d._attr = null;
        }
      }
    }
  }
  return this;
};
E.prototype.purge = function() {
  R[this.template + (this.cache ? "_cache" : "")] = null;
  if (this.key) {
    if (this.length) {
      for (var a = Object.keys(this.live), b = 0, c = a.length, d = void 0; b < c; b++) {
        this.key[d = a[b]] || delete this.key[d];
      }
    } else {
      this.live = {};
    }
  }
  this.tpl_pool && (this.tpl_pool = S[this.template] = []);
  this.key_pool && (this.key_pool = T[this.template] = {});
  return this;
};
E.prototype.index = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this.dom[b] === a) {
      return b;
    }
  }
  return -1;
};
E.prototype.node = function(a) {
  return this.dom[a];
};
E.prototype.data = function(a) {
  var b = "object" === typeof a;
  return this.store ? this.store[b ? this.index(a) : a] : (b ? a : this.dom[a])._data;
};
E.prototype.find = function(a) {
  if (this.key) {
    return this.live["object" !== typeof a ? a : a[this.key]];
  }
  for (var b = 0; b < this.length; b++) {
    if (this.data(b) === a) {
      return this.dom[b];
    }
  }
};
E.prototype.search = function(a) {
  a = Object.values(a).join("^");
  for (var b = 0; b < this.length; b++) {
    if (Object.values(this.data(b)).join("^") === a) {
      return this.dom[b];
    }
  }
};
E.prototype.where = function(a) {
  for (var b = Object.keys(a), c = b.length, d = [], e = 0, g, f; e < this.length; e++) {
    g = this.data(e);
    f = 1;
    for (var h = 0, m; h < c; h++) {
      if (m = b[h], g[m] !== a[m]) {
        f = 0;
        break;
      }
    }
    f && (d[d.length] = this.dom[e]);
  }
  return d;
};
E.prototype.init = function(a, b) {
  "string" === typeof a ? a = Q[a] : (b || !a || a.n || (b = a, a = null), a ? a.n && E.register(a) : a = Q[this.template]);
  b || (b = this.config || {});
  this.reuse = !1 !== b.reuse;
  this.state = b.state || va;
  this.cache = !1 !== b.cache;
  this.async = b.async;
  this.timer = 0;
  this.on = b.on;
  var c = b.store || !1 !== b.store;
  (this.extern = "object" === typeof c) ? b.store = !0 : c && (c = []);
  if (this.observe = c instanceof N) {
    c.mikado = this;
  }
  this.skip = 0;
  this.loose = !this.extern && !1 !== b.loose;
  this.store = !this.loose && c;
  this.config = b;
  c = a.n;
  this.template !== c && (this.template = c, this.static = a.d, this.update_path = this.vpath = null, this.proxy = this.stealth = 0, this.include = null, this.factory = !1 !== b.prefetch && this.parse(a), this.check(), this.live = (this.key = a.k) && {}, this.tpl_pool = this.reuse && !1 !== b.pool && (S[c] || (S[c] = [])), this.key_pool = this.key && (b.keep || this.tpl_pool) && (T[c] || (T[c] = {})), this.size = this.tpl_pool && b.size);
  return this;
};
E.once = E.once = function(a, b, c, d, e) {
  var g = new E(a, b);
  "function" === typeof d && (e = d, d = null);
  if (e) {
    var f = e;
    e = function() {
      g.destroy(1);
      f();
    };
  }
  g.render(c, d, e);
  e || g.destroy(1);
  return E;
};
E.prototype.check = function() {
  if (this.root) {
    var a = this.root._tpl;
    a !== this.template && (this.root._tpl = this.template, a && (this.live = {}, this.remove(0, this.length)));
  }
  return this;
};
function wa(a) {
  for (var b = a.length, c = Array(b), d = 0, e; d < b; d++) {
    e = a[d], c[d] = e;
  }
  return c;
}
E.prototype.create = function(a, b, c) {
  var d = this.key, e = d && a[d], g, f;
  if (d && (f = this.key_pool) && (g = f[e])) {
    var h = 1;
    if (f) {
      if (f[e] = null, f = this.tpl_pool) {
        var m = g._index;
        g._index = null;
        var n = f.pop();
        n !== g && (n._index = m, f[m] = n);
      }
    } else {
      d = 0;
    }
  } else {
    if ((g = this.tpl_pool) && g.length) {
      g = g.pop(), f && (g._index = null, f[g._key] = null);
    } else {
      var w = 1;
      g = this.factory;
    }
  }
  h && this.stealth && !this.observe || this.apply(g, a, b, c);
  if (w) {
    g = this.factory.cloneNode(!0);
    var l;
    (l = this.on) && (l = l.create) && l(g);
  }
  d && (g._key = e, this.live[e] = g);
  return g;
};
E.prototype.apply = function(a, b, c, d) {
  this.factory || (this.factory = a = this.parse(Q[this.template]));
  if (!this.static) {
    b || (b = this.store ? this.store[d] : a._data);
    c && this.observe && (this.store.view = c);
    this.update_path(a._path || this.create_path(a), !1, b, d, c);
    var e;
    (e = this.on) && (e = e.change) && a !== this.factory && e(a);
    return this;
  }
};
E.prototype.refresh = function(a, b) {
  if (this.stealth) {
    return this;
  }
  var c;
  "number" === typeof a ? c = this.dom[a] : b = a;
  if (c) {
    return this.apply(c, null, b, a);
  }
  a = this.length;
  if ((c = this.store) && this.loose) {
    return this.store = null, this.render(c, b);
  }
  c = c ? c.length : a;
  a = a < c ? a : c;
  for (c = 0; c < a; c++) {
    this.apply(this.dom[c], null, b, c);
  }
  return this;
};
E.prototype.render = function(a, b, c, d) {
  if (!d) {
    b && "object" !== typeof b && (c = b, b = null);
    this.timer && this.cancel();
    if (c) {
      var e = this;
      this.timer = ta(function() {
        e.timer = 0;
        e.render(a, b, null, 1);
        "function" === typeof c && c();
      });
      return this;
    }
    if (this.async) {
      var g = this;
      return new Promise(function(c) {
        g.timer = ta(function() {
          g.timer = 0;
          g.render(a, b, null, 1);
          c();
        });
      });
    }
  }
  d = this.length;
  if (!a) {
    if (this.static) {
      return this.dom[0] || this.add(), this;
    }
    if (d) {
      return this.refresh();
    }
    if (!(a = this.store)) {
      return this;
    }
  }
  var f = a.length;
  if ("undefined" === typeof f) {
    a = [a], f = 1;
  } else {
    if (!f) {
      return this.remove(0, d);
    }
  }
  var h = (this.key_pool || !this.reuse) && this.key;
  h || this.reuse || (this.remove(0, d, f), d = 0);
  var m = d < f ? d : f, n = 0;
  if (n < m) {
    for (; n < m; n++) {
      var w = this.dom[n], l = a[n];
      if (h && w._key !== l[h]) {
        return this.reconcile(a, b, n, 1);
      }
      this.update(w, l, b, n);
    }
  }
  if (n < f) {
    for (; n < f; n++) {
      this.add(a[n], b);
    }
  } else {
    f < d && this.remove(f, d - f);
  }
  return this;
};
E.prototype.reconcile = function(a, b, c, d) {
  var e = this.dom, g = this.live, f = a.length, h = e.length, m = h > f ? h : f, n = 0, w = this.key;
  for (c || (c = 0); c < m; c++) {
    var l = void 0;
    if (c < f) {
      var q = a[c], p = c >= h, r = void 0, y = void 0, x = void 0;
      if (!p && (r = e[c], y = q[w], x = r._key, x === y)) {
        d && this.update(r, q, b, c);
        continue;
      }
      if (d && (p || !g[y])) {
        p || !this.key_pool ? (h++, m = h > f ? h : f, this.add(q, b, c)) : this.replace(r, q, b, c);
        continue;
      }
      for (var z = p = void 0, t = c + 1; t < m; t++) {
        if (!p && t < h && e[t]._key === y && (p = t + 1), !z && t < f && a[t][w] === x && (z = t + 1), p && z) {
          p >= z ? (l = e[p - 1], this.root.insertBefore(l, r), d && this.update(l, q, b, c), p === z ? (1 < t - c && this.root.insertBefore(r, e[p] || null), e[c] = e[t], e[t] = r, d && this.update(r, a[t], b, t)) : (U(e, p - 1, c), n++)) : (q = z - 1 + n, this.root.insertBefore(r, e[q] || null), U(e, c, (q > h ? h : q) - 1), n--, c--);
          l = 1;
          break;
        }
      }
    }
    l || (this.remove(c), h--, m = h > f ? h : f, c--);
  }
  this.store && !this.extern && (this.store = a);
  return this;
};
function U(a, b, c, d) {
  var e = d || a[b];
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
E.prototype.add = function(a, b, c, d) {
  if (!d) {
    if ("number" === typeof b) {
      c = b;
      b = null;
      var e = 1;
    } else {
      if (c || 0 === c) {
        e = 1;
      }
    }
  }
  c = d || e ? c : this.length;
  b = this.create(a, b, c);
  var g;
  this.proxy && (this.stealth && this.loose && b._data === a ? g = 1 : a._proxy || (a = pa(a, b._path || this.create_path(b), this.proxy)));
  g || (this.store ? e && !this.extern ? U(this.store, this.length - 1, c, a) : (this.skip = 1, this.store[c] = a, this.skip = 0) : this.loose && (b._data = a));
  e ? (this.root.insertBefore(b, this.dom[c] || null), U(this.dom, this.length - 1, c, b), this.length++) : (d ? this.root.replaceChild(b, d) : (this.root.appendChild(b), this.length++), this.dom[c] = b);
  var f;
  (f = this.on) && (f = f.insert) && f(b);
  return this;
};
E.prototype.clear = function(a) {
  this.length && this.remove(0, this.length);
  a && this.purge();
  return this;
};
E.prototype.destroy = function(a) {
  a && this.unload();
  this.length = 0;
  this.include = this.store = this.live = this.factory = this.update_path = this.vpath = this.template = this.root = this.dom = null;
};
E.prototype.cancel = function() {
  this.timer && (ua(this.timer), this.timer = null);
  return this;
};
E.prototype.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = 1;
  } else {
    d = c || 0 === c;
  }
  for (var e = a.length, g = 0; g < e; g++) {
    this.add(a[g], b, d ? c++ : null);
  }
  return this;
};
E.prototype.remove = function(a, b, c) {
  var d = this.length;
  a && ("object" === typeof a ? a = this.index(a) : 0 > a && (a = d + a - 1));
  if (!d || a >= d) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  if (!a && b >= d) {
    this.store && !this.extern && (this.store = c ? Array(c) : []);
    if (this.include && (this.key_pool || this.tpl_pool)) {
      for (b = 0; b < this.include.length; b++) {
        this.include[b].clear();
      }
    }
    a = this.dom;
    b = a.length;
    this.root.textContent = "";
    this.root._dom = this.dom = c ? Array(c) : [];
    d = 0;
  } else {
    this.store && !this.observe && this.store.splice(a, b), a = this.dom.splice(a, b), d -= b;
  }
  var e;
  if ((e = this.on) && (e = e.remove)) {
    for (c = 0; c < b; c++) {
      e(a[c]);
    }
  }
  this.length = d;
  if (this.tpl_pool && !this.key_pool && 1 < b) {
    e = a;
    c = e.length;
    for (var g = c / 2 | 0, f = 0, h; f < g; f++) {
      h = e[f], e[f] = e[c - f - 1], e[c - f - 1] = h;
    }
  }
  for (e = 0; e < b; e++) {
    c = a[e], d && this.root.removeChild(c), this.checkout(c);
  }
  return this;
};
E.prototype.checkout = function(a) {
  if (this.key) {
    var b = a._key;
    this.live[b] = null;
    this.key_pool && (this.key_pool[b] = a);
  }
  this.tpl_pool && (b = this.tpl_pool.length, !this.size || b < this.size) && (this.key_pool && (a._index = b), this.tpl_pool[b] = a);
};
E.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[d]) : d = this.index(a));
  this.add(b, c, d, a);
  this.checkout(a);
  var e;
  (e = this.on) && (e = e.remove) && e(a);
  return this;
};
E.prototype.update = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[a]) : d = this.index(a));
  if (this.proxy) {
    if (this.stealth && (this.store ? this.store[d] : a._data) === b) {
      return this;
    }
    b._proxy || (b = pa(b, a._path || this.create_path(a), this.proxy));
  }
  this.store ? (this.skip = 1, this.store[d] = b, this.skip = 0) : this.loose && (a._data = b);
  if (this.key) {
    var e = a._key, g = b[this.key];
    e !== g && (this.live[e] = null, this.live[g] = a, a._key = g);
  }
  var f;
  (f = this.on) && (f = f.update) && f(a);
  return this.apply(a, b, c, d);
};
E.prototype.create_path = function(a) {
  for (var b = this.vpath.length, c = {}, d = Array(b), e = 0, g; e < b; e++) {
    g = this.vpath[e];
    var f = e, h;
    if (!(h = c[g])) {
      h = a;
      for (var m = 0, n = g.length, w = ""; m < n; m++) {
        var l = g[m];
        w += l;
        c[w] ? h = c[w] : (">" === l ? h = h.firstElementChild : "+" === l ? h = h.nextElementSibling : "|" === l && (h = h.firstChild), c[w] = h);
      }
    }
    d[f] = h;
  }
  return a._path = d;
};
var V;
E.prototype.parse = function(a, b, c, d) {
  if (!b) {
    var e = R[a.n + (this.cache ? "_cache" : "")];
    if (e) {
      return this.update_path = e.update_path, this.static = e.static, this.stealth = e.stealth, this.proxy = e.proxy, this.include = e.include, this.vpath = e.vpath, e.node;
    }
  }
  e = document.createElement(a.t || "div");
  b || (b = 0, c = "&", V = "", this.vpath = [], e._path = d = [], this.cache && (e._cache = {}));
  var g = a.s, f = a.i, h = a.x, m = a.h, n = a.a, w = a.e, l = a.c, q = a.j, p = this.vpath.length, r = 0, y = 0, x = "";
  q && (x += ";" + q, -1 < x.indexOf("self") && (r = 2));
  a.f && (V += ";if(" + a.f + "){self.hidden=false", r = 2);
  l && ("object" === typeof l ? (q = l[1], l = l[0], x += this.cache ? ";v=" + l + ";if(self._class!==v){self._class=v;self.className=v}" : ";self.className=" + l, q && (W(this, l, ["_class", p]), y++), r++) : e.className = l);
  if (n || w) {
    var z;
    n && (z = Object.keys(n));
    w && (l = Object.keys(w), z = z ? z.concat(l) : l);
    for (l = 0; l < z.length; l++) {
      q = z[l];
      var t = void 0;
      n && "undefined" !== typeof(t = n[q]) || (t = w[q], this.listen(q));
      if ("object" === typeof t) {
        var Ba = t[1];
        t = t[0];
        x += this.cache ? ";v=" + t + ";var _a=self._attr||(self._attr={});if(_a['" + q + "']!==v){_a['" + q + "']=v;self.setAttribute('" + q + "',v)}" : ";self.setAttribute('" + q + "'," + t + ")";
        Ba && (W(this, t, ["_attr", p, q]), y++);
        r++;
      } else {
        e.setAttribute(q, t);
      }
    }
  }
  g && ("string" === typeof g ? e.style.cssText = g : g.length && (z = g[1], g = g[0], x += this.cache ? ";v=" + g + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}" : ";self.style.cssText=" + g, z && (W(this, g, ["_css", p]), y++), r++));
  if (a["@"] || a.r) {
    this.include || (this.include = []);
    var B = a["@"] || a.i;
    a["@"] || (B.n = a["@"] = this.template + "@" + this.include.length, a.i = null);
    f = null;
    x += ";this.include[" + this.include.length + "].mount(self).render(" + a.r + (a.m ? ".slice(" + (0 <= a.m ? "0," + a.m : a.m) + ")" : "") + ",view)";
    h = V;
    V = "";
    this.include.push(new E(e, B, Object.assign({}, this.config, {store:!1, async:0})));
    V = h;
    r++;
  } else {
    if (!f) {
      if (a["+"]) {
        f = Q[a["+"]];
      } else {
        if (h) {
          if (m = "object" === typeof h) {
            B = h[1], h = h[0];
          }
          g = document.createTextNode(h);
          m && (r && p++, this.vpath[p] = c + "|", d[p] = g, xa(r, this.cache ? ";v=" + h + ";if(self._text!==v){self._text=v;self.nodeValue=v}" : ";self.nodeValue=" + h, p, this.cache), B && (W(this, h, ["_text", p]), y++), r && p--);
          e.appendChild(g);
        } else {
          m && ("object" === typeof m ? (B = m[1], m = m[0], x += this.cache ? ";v=" + m + ";if(self._html!==v){self._html=v;self.innerHTML=v}" : ";self.innerHTML=" + m, B && (W(this, m, ["_html", p]), y++), r++) : e.innerHTML = m);
        }
      }
    }
  }
  r ? (this.vpath[p] = c, d[p] = e, this.static = 0, r === y && (this.stealth = 1), xa(r, x, p, this.cache)) : x && (V += x);
  V += "";
  if (f) {
    if (f.length) {
      for (x = ">", B = 0; B < f.length; B++) {
        B && (x += "+");
        h = f[B];
        if (y = h["+"]) {
          h = Q[y];
        }
        e.appendChild(this.parse(h, b + B + 1, c + x, d));
      }
    } else {
      if (y = f["+"]) {
        f = Q[y];
      }
      e.appendChild(this.parse(f, b + 1, c + ">", d));
    }
  }
  a.f && (V += "}else " + (1 < r ? "self" : "p[" + p + "]") + ".hidden=true");
  b || (!this.static && V && (this.update_path = Function("p", "s", "data", "index", "view", '"use strict";var self,v' + V)), b = {update_path:this.update_path, static:this.static, vpath:this.vpath, node:e}, b.include = this.include, b.proxy = this.proxy, b.stealth = this.stealth, R[a.n + (this.cache ? "_cache" : "")] = b);
  return e;
};
function W(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function xa(a, b, c, d) {
  V = d || 1 < a ? V + (";self=p[" + c + "]" + b) : V + b.replace(/self/g, "p[" + c + "]");
}
E.prototype.load = function(a, b) {
  var c = this, d = new XMLHttpRequest;
  d.overrideMimeType("application/json");
  d.open("GET", a, !1 !== b);
  d.onload = function() {
    var a = this.responseText;
    if (a) {
      try {
        var d = JSON.parse(a);
        E.register(d);
        c instanceof E && c.init(d);
      } catch (h) {
        var f = h;
      }
      "function" === typeof b && b(f);
    }
  };
  d.send();
  return this;
};
E.load = E.prototype.load;
E.prototype.unload = function(a) {
  a ? "object" === typeof a && (a = a.n) : a = this.template;
  a && (Q[a] = null, S[a] = T[a] = R[a] = null, R[a + "_cache"] = null);
  return this;
};
E.unregister = E.prototype.unregister = E.unload = E.prototype.unload;
var ya = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, X, za = 0;
function Aa(a, b) {
  var c = {};
  if (!b) {
    X = !0;
    if ("string" === typeof a) {
      if (-1 !== a.indexOf("<")) {
        var d = document.createElement("div");
        d.innerHTML = a;
        a = d.firstElementChild;
        c.n = a.id || "tpl_" + za++;
      } else {
        c.n = a, a = document.getElementById(a);
      }
    } else {
      c.n = a.id || "tpl_" + za++;
    }
    a.content ? a = a.content.firstElementChild : "TEMPLATE" === a.tagName && (a = a.firstElementChild);
  }
  if (d = a.tagName) {
    if ("INCLUDE" === d) {
      return b = a.getAttribute("from"), c["+"] = b ? b : Y(a.firstChild.nodeValue), c;
    }
    "DIV" !== d && (c.t = d.toLowerCase());
  } else {
    return (b = a) && (b = b.nodeValue) && (b = b.replace(/\s+/g, " ")) && b.trim() && (a = b.indexOf("{{@"), -1 !== a && (d = b.indexOf("}}", a), c.j = b.substring(a + 3, d), b = b.substring(0, a) + b.substring(d + 2)), b && b.trim() && (-1 !== b.indexOf("{{#") ? Z(c, "h", b.replace(/{{#/g, "{{")) : Z(c, "x", b))), c.j || b && b.trim() ? c : null;
  }
  var e = a.attributes;
  if (e.length) {
    for (var g = 0; g < e.length; g++) {
      var f = e[g].nodeName;
      if ("class" === f) {
        Z(c, "c", a.className);
      } else {
        var h = a.getAttribute(f);
        "style" === f ? Z(c, "s", h) : "if" === f ? Z(c, "f", h) : "include" === f ? a.hasAttribute("for") || (f = {}, (c.i || (c.i = [])).push(f), Z(f, "+", h)) : "for" === f && "LABEL" !== d ? ((f = a.getAttribute("include")) && (c["@"] = Y(f)), Z(c, "r", h)) : "max" === f ? Z(c, "m", h) : "js" === f ? c.j = Y(h) : "key" === f ? Z(c, "k", h.replace("data.", "")) : ("bind" === f && (h = h.split(":"), 2 > h.length && h.unshift("value"), f = h[0], h = "{{==" + h[1] + "}}"), ya[f.substring(2)] && -1 !== 
        h.indexOf("{{") && (f = f.substring(2)), ya[f] ? Z(c.e || (c.e = {}), f, h) : Z(c.a || (c.a = {}), f, h));
      }
    }
  }
  a = a.childNodes;
  if (d = a.length) {
    for (g = e = 0; g < d; g++) {
      if (h = Aa(a[g], 1)) {
        1 === d && 3 === a[g].nodeType ? (h.j && (c.j = h.j), h.h && (c.h = h.h), h.x && (c.x = h.x)) : (c.i || (c.i = []))[e++] = h;
      }
    }
    1 === e && (c.i = c.i[0]);
  }
  b || (c.d = X);
  return c;
}
function Z(a, b, c) {
  if (-1 !== c.indexOf("{{") && -1 !== c.indexOf("}}")) {
    var d = -1 !== c.indexOf("{{=="), e = d || -1 !== c.indexOf("{{=");
    X = !1;
    c = c.replace(/{{==/g, "{{").replace(/{{=/g, "{{").replace(/"{{/g, "").replace(/}}"/g, "").replace(/{{/g, "' + ").replace(/}}/g, " + '");
    a[b] = [("'" + c + "'").replace(/'' \+ /g, "").replace(/ \+ ''/g, "")];
    d ? a[b].push(2) : e && a[b].push(1);
  } else {
    a[b] = c;
  }
}
function Y(a) {
  return a.replace(/{{/g, "").replace(/}}/g, "").trim();
}
;E.compile = Aa;
E.array = N;
E.setText = function(a, b) {
  b += "";
  3 !== a.nodeType && (a._html = null, a = a.firstChild || a.appendChild(document.createTextNode(a._text = b)));
  a._text !== b && (a.nodeValue = b, a._text = b);
  return this;
};
E.getText = function(a) {
  if (3 !== a.nodeType && !(a = a.firstChild)) {
    return "";
  }
  var b = a._text;
  return b || "" === b ? b : a._text = a.nodeValue;
};
E.setHTML = function(a, b) {
  b += "";
  a._html !== b && (a.innerHTML = b, a._html = b);
  return this;
};
E.getHTML = function(a) {
  var b = a._html;
  return b || "" === b ? b : a._html = a.innerHTML;
};
E.setClass = function(a, b) {
  a._class !== b && (a.className = b, a._class = b);
  return this;
};
E.getClass = function(a) {
  var b = a._class;
  return b || "" === b ? b : a._class = a.className;
};
E.hasClass = I;
E.toggleClass = function(a, b) {
  I(a, b) ? ja(a, b) : ia(a, b);
  return this;
};
E.removeClass = ja;
E.addClass = ia;
E.setCSS = function(a, b) {
  a._css !== b && ((a._style || (a._style = a.style)).cssText = b, a._css = b);
  return this;
};
E.getCSS = function(a) {
  var b = a._css;
  return b || "" === b ? b : a._css = a.getAttribute("style");
};
E.setAttribute = function(a, b, c) {
  var d = a._attr || (a._attr = {});
  d[b] !== c && (a.setAttribute(b, c), d[b] = c);
  return this;
};
E.getAttribute = ka;
E.hasAttribute = function(a, b) {
  a = ka(a, b);
  return !!a || "" === a;
};
E.removeAttribute = function(a, b) {
  var c = a._attr || (a._attr = {});
  null !== c[b] && (a.removeAttribute(b), c[b] = null);
  return this;
};
(function() {
  var a = E, b = this || window, c;
  (c = b.define) && c.amd ? c([], function() {
    return a;
  }) : (c = b.modules) ? c.mikado = a : "object" === typeof b.exports ? b.module.exports = a : b.Mikado = a;
})();
}).call(this);
