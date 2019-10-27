/**!
 * Mikado.js v0.7.3
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
Object.assign || (Object.assign = function() {
  for (var a = arguments, b = a.length, c = a[0], d = 1, e, f, g; d < b; d++) {
    e = a[d];
    f = Object.keys(e);
    g = f.length;
    for (var h = 0, m; h < g; h++) {
      m = f[h], c[m] = e[m];
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
    if (q || v) {
      aa(a);
      return;
    }
    ba = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || {passive:!0, capture:!0});
}
function B(a, b) {
  b || (b = a.type);
  var c = a.target, d = c, e = c["_event_" + b];
  if (e) {
    d = c["_root_" + b];
  } else {
    for (; d !== ca;) {
      "click" === b && ba && (e = d.getAttribute("tap"));
      e || (e = d.getAttribute(b));
      if (e) {
        var f = e.indexOf(":");
        if (-1 !== f) {
          var g = e.substring(0, f);
          f = e.substring(f + 1);
          e = 0;
          for (d = d.parentElement; d !== ca;) {
            if (d.hasAttribute(f)) {
              e = g;
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
  if (b = da[e]) {
    a.preventDefault(), b(d, a, c);
  }
  a.stopPropagation();
}
var D = {}, da = {}, ca = document.body, q = "ontouchstart" in window, v = !q && window.PointerEvent && navigator.maxTouchPoints, ba;
E.route = E.prototype.route = function(a, b) {
  da[a] = b;
  return this;
};
var F, G, aa;
if (q || v) {
  var ea = function(a, b) {
    b && (a = b[0]);
    F = a.clientX;
    G = a.clientY;
  }, fa = function(a) {
    var b = F, c = G;
    ea(a, a.changedTouches);
    50 > Math.abs(F - b) && 50 > Math.abs(G - c) && B.call(this, a, "tap");
  }, ha = function(a) {
    ea(a, a.touches);
  };
  aa = function(a) {
    k(a, v ? "pointerdown" : "touchstart", ha, !1);
    k(a, v ? "pointerup" : "touchend", fa, !1);
  };
}
E.listen = E.prototype.listen = function(a, b) {
  D[a] || (k(1, a, B, b || !0), D[a] = 1);
  return this;
};
E.unlisten = E.prototype.unlisten = function(a, b) {
  D[a] && (k(0, a, B, b || !0), D[a] = 0);
  return this;
};
E.prototype.move = function(a, b) {
  if ("number" === typeof a) {
    var c = a;
    a = this.dom[c];
  } else {
    c = a._idx;
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
    d = a._idx;
  }
  var e = 0 > b;
  if (e && d || !e && d < this.length - 1) {
    b = e ? Math.max(d + b, 0) : Math.min(d + b, this.length - 1);
    var f = this.dom[b], g = e && 1 < d - b || !e && 1 < b - d;
    if (!g && this.reuse && (this.store || this.loose)) {
      var h = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[b] : f._data, c, b);
      this.update(f, h, c, d);
    } else {
      this.root.insertBefore(a, e ? f : this.dom[b + 1] || null);
    }
    if (g) {
      f = this.dom[d];
      a = this.store && this.store[d];
      if (e) {
        for (e = d; e > b; e--) {
          d = this.dom[e] = this.dom[e - 1], d._idx = e, this.store && (this.store[e] = this.store[e - 1]);
        }
      } else {
        for (e = d; e < b; e++) {
          d = this.dom[e] = this.dom[e + 1], d._idx = e, this.store && (this.store[e] = this.store[e + 1]);
        }
      }
      d = this.dom[b] = f;
      d._idx = b;
      this.store && (this.store[b] = a);
    } else {
      c = this.dom, e = this.store, a._idx = b, f._idx = d, c[d] = f, c[b] = a, e && (f = e[b], e[b] = e[d], e[d] = f);
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
  "number" !== typeof a && (a = a._idx);
  "number" !== typeof b && (b = b._idx);
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
E.prototype.after = function(a, b) {
  "number" !== typeof a && (a = a._idx);
  "number" !== typeof b && (b = b._idx);
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
E.prototype.swap = function(a, b, c) {
  if (a !== b) {
    if ("number" === typeof a) {
      var d = a;
      a = this.dom[a];
    } else {
      d = a._idx;
    }
    if ("number" === typeof b) {
      var e = b;
      b = this.dom[b];
    } else {
      e = b._idx;
    }
    if (this.reuse && (this.store || this.loose)) {
      var f = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[e] : b._data, c, d);
      this.update(b, f, c, e);
    } else {
      c = d + 1 !== e, this.root.insertBefore(c ? a : b, c ? b : a), c && e + 1 !== d && this.root.insertBefore(b, this.dom[d + 1] || null), a._idx = e, b._idx = d, this.dom[d] = b, this.dom[e] = a, this.store && !this.extern && (a = this.store[e], this.store[e] = this.store[d], this.store[d] = a);
    }
  }
  return this;
};
var H = {};
function ia(a) {
  return H[a] = new RegExp("(?:^|\\s)" + a + "(?!\\S)", "g");
}
function ja(a, b) {
  I(a, b) || (a.className += " " + b, a._class += " " + b);
  return this;
}
function ka(a, b) {
  b = (a._class || (a._class = a.className)).replace(H[b] || ia(b), "");
  a._class !== b && (a.className = b, a._class = b);
  return this;
}
function I(a, b) {
  return !!(a._class || (a._class = a.className)).match(H[b] || ia(b));
}
function la(a, b) {
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
    return new Proxy(this, ma);
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
    "number" === typeof b && (b === M && O(this, ++M), ma.set(this, b, a));
  }});
}
var P = !1, ma = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (b = e, d = !0);
  }
  if (!P) {
    P = !0;
    if ((e = a.mikado) && !e.skip) {
      var f = a.length;
      if (d) {
        var g = e.length;
        f !== g && (a.length = g);
        if (e.stealth && a[b] === c) {
          return P = !1, !0;
        }
        d = a.view;
        b >= g ? (e.add(c, d), a.length++) : b < g && (f = e.key, g = e.dom[b], e.reuse || f && g._key === c[f] ? e.update(g, c, d, b) : e.replace(g, c, d, b));
        if (e.proxy) {
          return P = !1, !0;
        }
      } else {
        "length" === b && c < f && e.remove(c, f - c);
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
var oa = !window.Proxy && function() {
  function a(a, c) {
    this.path = c.path;
    this.handler = c.handler;
    c = Object.keys(a);
    for (var b = 0, e = c.length; b < e; b++) {
      var f = c[b];
      this.define(a, f, a[f]);
    }
    return a;
  }
  a.prototype._proxy = !0;
  a.prototype.define = function(a, c, d) {
    var b = this;
    Object.defineProperty(a, c, {get:function() {
      return d;
    }, set:function(a) {
      d !== a && (na(b.handler, b.path, c, a), d = a);
    }});
  };
  return a;
}(), pa = {_text:function(a, b) {
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
function qa(a, b, c) {
  return new (oa || Proxy)(a, {path:b, handler:c, get:ra, set:sa});
}
function ra(a, b) {
  return "_proxy" === b || a[b];
}
function sa(a, b, c) {
  a[b] !== c && (na(this.handler, this.path, b, c), a[b] = c);
  return !0;
}
function na(a, b, c, d) {
  if (a = a["data." + c]) {
    for (var e = 0, f = a.length, g; e < f; e++) {
      g = a[e], pa[g[0]](b[g[1]], d, g[2] || c);
    }
  }
}
;var ta = window, ua = ta.requestAnimationFrame, va = ta.cancelAnimationFrame, wa = {}, Q = {}, R = {}, S = {}, T = {};
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
  this.root !== a && (this.key && this.root && (this.root._pool = this.live, this.live = a._pool || {}), this.root = a, this.check(), this.dom = a._dom || (a._dom = xa(a.children)), this.length = this.dom.length);
  return this;
};
E.prototype.sync = function(a) {
  this.root._dom = this.dom = xa(this.root.children);
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
  return a._idx;
};
E.prototype.node = function(a) {
  return this.dom[a];
};
E.prototype.data = function(a) {
  var b = "object" === typeof a;
  return this.store ? this.store[b ? a._idx : a] : (b ? a : this.dom[a])._data;
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
  for (var b = Object.keys(a), c = b.length, d = [], e = 0, f, g; e < this.length; e++) {
    f = this.data(e);
    g = 1;
    for (var h = 0, m; h < c; h++) {
      if (m = b[h], f[m] !== a[m]) {
        g = 0;
        break;
      }
    }
    g && (d[d.length] = this.dom[e]);
  }
  return d;
};
E.prototype.init = function(a, b) {
  "string" === typeof a ? a = Q[a] : (b || !a || a.n || (b = a, a = null), a ? a.n && E.register(a) : a = Q[this.template]);
  b || (b = this.config || {});
  this.reuse = !1 !== b.reuse;
  this.state = b.state || wa;
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
  var f = new E(a, b);
  "function" === typeof d && (e = d, d = null);
  if (e) {
    var g = e;
    e = function() {
      f.destroy(1);
      g();
    };
  }
  f.render(c, d, e);
  e || f.destroy(1);
  return E;
};
E.prototype.check = function() {
  if (this.root) {
    var a = this.root._tpl;
    a !== this.template && (this.root._tpl = this.template, a && (this.key && (this.live = {}), this.length = 0, this.remove(0, this.length)));
  }
  return this;
};
function xa(a) {
  for (var b = a.length, c = Array(b), d = 0, e; d < b; d++) {
    e = a[d], e._idx = d, c[d] = e;
  }
  return c;
}
E.prototype.create = function(a, b, c) {
  var d = this.key, e = d && a[d], f, g;
  if (d && ((g = this.key_pool) && (f = g[e]) || (f = this.live[e]))) {
    var h = 1;
    if (g) {
      if (g[e] = null, g = this.tpl_pool) {
        var m = f._index;
        f._index = null;
        var n = g.pop();
        n !== f && (n._index = m, g[m] = n);
      }
    } else {
      d = 0;
    }
  } else {
    if ((f = this.tpl_pool) && f.length) {
      f = f.pop(), g && (f._index = null, g[f._key] = null);
    } else {
      var w = 1;
      f = this.factory;
    }
  }
  h && this.stealth && !this.observe || this.apply(f, a, b, c);
  if (w) {
    f = this.factory.cloneNode(!0);
    var l;
    (l = this.on) && (l = l.create) && l(f);
  }
  d && (f._key = e, this.live[e] = f);
  return f;
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
  if ("number" === typeof a) {
    var d = this.dom[a];
  } else {
    a && "number" === typeof(c = a._idx) ? (d = a, a = c) : b = a;
  }
  if (d) {
    return this.apply(d, null, b, a);
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
      this.timer = ua(function() {
        e.timer = 0;
        e.render(a, b, null, 1);
        "function" === typeof c && c();
      });
      return this;
    }
    if (this.async) {
      var f = this;
      return new Promise(function(c) {
        f.timer = ua(function() {
          f.timer = 0;
          f.render(a, b, null, 1);
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
  var g = a.length;
  if ("undefined" === typeof g) {
    a = [a], g = 1;
  } else {
    if (!g) {
      return this.remove(0, d);
    }
  }
  var h = (this.key_pool || !this.reuse) && this.key;
  h || this.reuse || (this.remove(0, d, g), d = 0);
  var m = d < g ? d : g, n = 0;
  if (n < m) {
    for (; n < m; n++) {
      var w = this.dom[n], l = a[n];
      if (h && w._key !== l[h]) {
        return this.reconcile(a, b, n, 1);
      }
      this.update(w, l, b, n);
    }
  }
  if (n < g) {
    for (; n < g; n++) {
      this.add(a[n], b);
    }
  } else {
    g < d && this.remove(g, d - g);
  }
  return this;
};
E.prototype.reconcile = function(a, b, c, d) {
  var e = this.dom, f = this.live, g = a.length, h = e.length, m = h > g ? h : g, n = 0, w = this.key;
  for (c || (c = 0); c < m; c++) {
    var l = void 0;
    if (c < g) {
      var t = a[c], u = t[w];
      if (d && (!f[u] || c >= h)) {
        h++;
        m = h > g ? h : g;
        var p = 1;
        this.add(t, b, c, null, 1);
        continue;
      }
      var r = e[c], z = r._key;
      if (z === u) {
        p && (r._idx = c);
        d && this.update(r, t, b, c);
        continue;
      }
      for (var x = void 0, y = void 0, A = c + 1; A < m; A++) {
        if (!x && A < h && e[A]._key === u && (x = A + 1), !y && A < g && a[A][w] === z && (y = A + 1), x && y) {
          x >= y ? (l = e[x - 1], this.root.insertBefore(l, r), l._idx = c, d && this.update(l, t, b, c), x === y && 1 < A - c ? (this.root.insertBefore(r, e[x] || null), r._idx = A, e[c] = e[A], e[A] = r, d && this.update(r, a[A], b, A)) : (U(e, x - 1, c), n++, p = 1)) : (p = y - 1 + n, this.root.insertBefore(r, e[p]), U(e, c, (p > h ? h : p) - 1), p = 1, n--, c--);
          l = 1;
          break;
        }
      }
    }
    l || (this.remove(c, 1, 0, 1), p = 1, h--, m = h > g ? h : g, c--);
  }
  return this;
};
function U(a, b, c, d, e) {
  if (e && !b) {
    return [a.shift()];
  }
  var f = d || a[b];
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
  if (e) {
    return a.pop(), [f];
  }
  a[c] = f;
}
E.prototype.add = function(a, b, c, d, e) {
  if (!d) {
    if ("number" === typeof b) {
      c = b;
      b = null;
      var f = 1;
    } else {
      if (c || 0 === c) {
        f = 1;
      }
    }
  }
  c = d || f ? c : this.length;
  b = this.create(a, b, c);
  var g;
  this.proxy && (this.stealth && this.loose && b._data === a ? g = 1 : a._proxy || (a = qa(a, b._path || this.create_path(b), this.proxy)));
  g || (this.store ? f && !this.extern ? U(this.store, this.length - 1, c, a) : (this.skip = 1, this.store[c] = a, this.skip = 0) : this.loose && (b._data = a));
  b._idx = c;
  if (f) {
    if (this.root.insertBefore(b, this.dom[c] || null), U(this.dom, this.length - 1, c, b), this.length++, !e) {
      for (; ++c < this.length;) {
        this.dom[c]._idx = c;
      }
    }
  } else {
    d ? this.root.replaceChild(b, d) : (this.root.appendChild(b), this.length++), this.dom[c] = b;
  }
  var h;
  (h = this.on) && (h = h.insert) && h(b);
  return this;
};
E.prototype.clear = function(a) {
  this.remove(0, this.length);
  a && this.purge();
  return this;
};
E.prototype.destroy = function(a) {
  a && this.unload();
  this.factory = this.update_path = this.vpath = this.template = this.root = this.dom = null;
  this.length = 0;
  this.live = {};
  this.store = this.include = null;
};
E.prototype.cancel = function() {
  this.timer && (va(this.timer), this.timer = null);
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
  for (var e = a.length, f = 0; f < e; f++) {
    this.add(a[f], b, d ? c++ : null);
  }
  return this;
};
E.prototype.remove = function(a, b, c, d) {
  var e = this.length;
  a && ("object" === typeof a ? a = a._idx : 0 > a && (a = e + a - 1));
  if (!e || a >= e) {
    return this;
  }
  0 > b ? (a -= b + 1, 0 > a && (a = 0), b *= -1) : b || (b = 1);
  if (!a && b >= e) {
    this.store && !this.observe && (this.extern ? this.store.splice(0) : this.store = c ? Array(c) : []);
    if (this.include && (this.key_pool || this.tpl_pool)) {
      for (b = 0; b < this.include.length; b++) {
        this.include[b].clear();
      }
    }
    var f = this.dom;
    b = f.length;
    this.root.textContent = "";
    this.root._dom = this.dom = c ? Array(c) : [];
    e = 0;
  } else {
    this.store && !this.observe && (1 === b ? U(this.store, a, e - 1, null, 1) : this.store.splice(a, b)), f = 1 === b ? U(this.dom, a, e - 1, null, 1) : this.dom.splice(a, b), e -= b;
  }
  var g;
  if ((g = this.on) && (g = g.remove)) {
    for (c = 0; c < b; c++) {
      g(f[c]);
    }
  }
  this.length = e;
  if (!d && a < e) {
    for (; a < e; a++) {
      this.dom[a]._idx = a;
    }
  }
  if (this.tpl_pool && !this.key_pool && this.cache && 1 < b) {
    a = f;
    d = a.length;
    g = d / 2 | 0;
    c = 0;
    for (var h; c < g; c++) {
      h = a[c], a[c] = a[d - c - 1], a[d - c - 1] = h;
    }
  }
  for (a = 0; a < b; a++) {
    d = f[a], e && this.root.removeChild(d), this.checkout(d);
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
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[d]) : d = a._idx);
  this.add(b, c, d, a);
  this.checkout(a);
  var e;
  (e = this.on) && (e = e.remove) && e(a);
  return this;
};
E.prototype.update = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[a]) : d = a._idx);
  if (this.proxy) {
    if (this.stealth && (this.store ? this.store[d] : a._data) === b) {
      return this;
    }
    b._proxy || (b = qa(b, a._path || this.create_path(a), this.proxy));
  }
  this.store ? (this.skip = 1, this.store[d] = b, this.skip = 0) : this.loose && (a._data = b);
  if (this.key) {
    var e = a._key, f = b[this.key];
    e !== f && (this.live[e] = null, this.live[f] = a, a._key = f);
  }
  var g;
  (g = this.on) && (g = g.update) && g(a);
  return this.apply(a, b, c, d);
};
E.prototype.create_path = function(a) {
  for (var b = this.vpath.length, c = {}, d = Array(b), e = 0, f; e < b; e++) {
    f = this.vpath[e];
    var g = e, h;
    if (!(h = c[f])) {
      h = a;
      for (var m = 0, n = f.length, w = ""; m < n; m++) {
        var l = f[m];
        w += l;
        c[w] ? h = c[w] : (">" === l ? h = h.firstElementChild : "+" === l ? h = h.nextElementSibling : "|" === l && (h = h.firstChild), c[w] = h);
      }
    }
    d[g] = h;
  }
  this.cache && (a._cache = {});
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
  var f = a.s, g = a.i, h = a.x, m = a.h, n = a.a, w = a.e, l = a.c, t = a.j, u = this.vpath.length, p = 0, r = 0, z = "";
  t && (z += ";" + t, -1 < z.indexOf("self") && (p = 2));
  a.f && (V += ";if(" + a.f + "){self.hidden=false", p = 2);
  l && ("object" === typeof l ? (t = l[1], l = l[0], z += this.cache ? ";v=" + l + ";if(self._class!==v){self._class=v;self.className=v}" : ";self.className=" + l, t && (W(this, l, ["_class", u]), r++), p++) : e.className = l);
  if (n || w) {
    var x;
    n && (x = Object.keys(n));
    w && (l = Object.keys(w), x = x ? x.concat(l) : l);
    for (l = 0; l < x.length; l++) {
      t = x[l];
      var y = void 0;
      n && "undefined" !== typeof(y = n[t]) || (y = w[t], this.listen(t));
      if ("object" === typeof y) {
        var A = y[1];
        y = y[0];
        z += this.cache ? ";v=" + y + ";var _a=self._attr||(self._attr={});if(_a['" + t + "']!==v){_a['" + t + "']=v;self.setAttribute('" + t + "',v)}" : ";self.setAttribute('" + t + "'," + y + ")";
        A && (W(this, y, ["_attr", u, t]), r++);
        p++;
      } else {
        e.setAttribute(t, y);
      }
    }
  }
  f && ("string" === typeof f ? e.style.cssText = f : f.length && (x = f[1], f = f[0], z += this.cache ? ";v=" + f + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}" : ";self.style.cssText=" + f, x && (W(this, f, ["_css", u]), r++), p++));
  if (a["@"] || a.r) {
    this.include || (this.include = []);
    var C = a["@"] || a.i;
    a["@"] || (C.n = a["@"] = this.template + "@" + this.include.length, a.i = null);
    g = null;
    z += ";this.include[" + this.include.length + "].mount(self).render(" + a.r + (a.m ? ".slice(" + (0 <= a.m ? "0," + a.m : a.m) + ")" : "") + ",view)";
    h = V;
    V = "";
    this.include.push(new E(e, C, Object.assign({}, this.config, {store:!1, async:0})));
    V = h;
    p++;
  } else {
    if (!g) {
      if (a["+"]) {
        g = Q[a["+"]];
      } else {
        if (h) {
          if (m = "object" === typeof h) {
            C = h[1], h = h[0];
          }
          f = document.createTextNode(h);
          m && (p && u++, this.vpath[u] = c + "|", d[u] = f, ya(p, this.cache ? ";v=" + h + ";if(self._text!==v){self._text=v;self.nodeValue=v}" : ";self.nodeValue=" + h, u, this.cache), C && (W(this, h, ["_text", u]), r++), p && u--);
          e.appendChild(f);
        } else {
          m && ("object" === typeof m ? (C = m[1], m = m[0], z += this.cache ? ";v=" + m + ";if(self._html!==v){self._html=v;self.innerHTML=v}" : ";self.innerHTML=" + m, C && (W(this, m, ["_html", u]), r++), p++) : e.innerHTML = m);
        }
      }
    }
  }
  p ? (this.vpath[u] = c, d[u] = e, this.static = 0, p === r && (this.stealth = 1), ya(p, z, u, this.cache)) : z && (V += z);
  V += "";
  if (g) {
    if (g.length) {
      for (z = ">", C = 0; C < g.length; C++) {
        C && (z += "+");
        h = g[C];
        if (r = h["+"]) {
          h = Q[r];
        }
        e.appendChild(this.parse(h, b + C + 1, c + z, d));
      }
    } else {
      if (r = g["+"]) {
        g = Q[r];
      }
      e.appendChild(this.parse(g, b + 1, c + ">", d));
    }
  }
  a.f && (V += "}else " + (1 < p ? "self" : "p[" + u + "]") + ".hidden=true");
  b || (!this.static && V && (this.update_path = Function("p", "s", "data", "index", "view", '"use strict";var self,v' + V)), b = {update_path:this.update_path, static:this.static, vpath:this.vpath, node:e}, b.include = this.include, b.proxy = this.proxy, b.stealth = this.stealth, R[a.n + (this.cache ? "_cache" : "")] = b);
  return e;
};
function W(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function ya(a, b, c, d) {
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
        var g = h;
      }
      "function" === typeof b && b(g);
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
var za = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, X, Aa = 0;
function Ba(a, b) {
  var c = {};
  if (!b) {
    X = !0;
    if ("string" === typeof a) {
      if (-1 !== a.indexOf("<")) {
        var d = document.createElement("div");
        d.innerHTML = a;
        a = d.firstElementChild;
        c.n = a.id || "tpl_" + Aa++;
      } else {
        c.n = a, a = document.getElementById(a);
      }
    } else {
      c.n = a.id || "tpl_" + Aa++;
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
    for (var f = 0; f < e.length; f++) {
      var g = e[f].nodeName;
      if ("class" === g) {
        Z(c, "c", a.className);
      } else {
        var h = a.getAttribute(g);
        "style" === g ? Z(c, "s", h) : "if" === g ? Z(c, "f", h) : "include" === g ? a.hasAttribute("for") || (g = {}, (c.i || (c.i = [])).push(g), Z(g, "+", h)) : "for" === g && "LABEL" !== d ? ((g = a.getAttribute("include")) && (c["@"] = Y(g)), Z(c, "r", h)) : "max" === g ? Z(c, "m", h) : "js" === g ? c.j = Y(h) : "key" === g ? Z(c, "k", h.replace("data.", "")) : ("bind" === g && (h = h.split(":"), 2 > h.length && h.unshift("value"), g = h[0], h = "{{==" + h[1] + "}}"), za[g.substring(2)] && -1 !== 
        h.indexOf("{{") && (g = g.substring(2)), za[g] ? Z(c.e || (c.e = {}), g, h) : Z(c.a || (c.a = {}), g, h));
      }
    }
  }
  a = a.childNodes;
  if (d = a.length) {
    for (f = e = 0; f < d; f++) {
      if (h = Ba(a[f], 1)) {
        1 === d && 3 === a[f].nodeType ? (h.j && (c.j = h.j), h.h && (c.h = h.h), h.x && (c.x = h.x)) : (c.i || (c.i = []))[e++] = h;
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
;E.compile = Ba;
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
  I(a, b) ? ka(a, b) : ja(a, b);
  return this;
};
E.removeClass = ka;
E.addClass = ja;
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
E.getAttribute = la;
E.hasAttribute = function(a, b) {
  a = la(a, b);
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
