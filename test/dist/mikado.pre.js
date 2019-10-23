/**!
 * Mikado.js v0.7.1
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
    for (var k = 0, l; k < g; k++) {
      l = f[k], c[l] = e[l];
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
function h(a, b, c, d) {
  if ("tap" === b) {
    if (p || q) {
      w(a);
      return;
    }
    z = !0;
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
    for (; d !== aa;) {
      "click" === b && z && (e = d.getAttribute("tap"));
      e || (e = d.getAttribute(b));
      if (e) {
        var f = e.indexOf(":");
        if (-1 !== f) {
          var g = e.substring(0, f);
          f = e.substring(f + 1);
          e = 0;
          for (d = d.parentElement; d !== aa;) {
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
  if (b = ba[e]) {
    a.preventDefault(), b(d, a, c);
  }
  a.stopPropagation();
}
var D = {}, ba = {}, aa = document.body, p = "ontouchstart" in window, q = !p && window.PointerEvent && navigator.maxTouchPoints, z;
F.route = F.prototype.route = function(a, b) {
  ba[a] = b;
  return this;
};
var G, H, w;
if (p || q) {
  var ca = function(a, b) {
    b && (a = b[0]);
    G = a.clientX;
    H = a.clientY;
  }, da = function(a) {
    var b = G, c = H;
    ca(a, a.changedTouches);
    50 > Math.abs(G - b) && 50 > Math.abs(H - c) && C.call(this, a, "tap");
  }, ea = function(a) {
    ca(a, a.touches);
  };
  w = function(a) {
    h(a, q ? "pointerdown" : "touchstart", ea, !1);
    h(a, q ? "pointerup" : "touchend", da, !1);
  };
}
F.listen = F.prototype.listen = function(a, b) {
  D[a] || (h(1, a, C, b || !0), D[a] = 1);
  return this;
};
F.unlisten = F.prototype.unlisten = function(a, b) {
  D[a] && (h(0, a, C, b || !0), D[a] = 0);
  return this;
};
F.prototype.move = function(a, b) {
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
F.prototype.shift = function(a, b, c) {
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
      var k = this.store ? this.store[d] : a._data;
      this.update(a, this.store ? this.store[b] : f._data, c, b);
      this.update(f, k, c, d);
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
F.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
};
F.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
};
F.prototype.first = function(a) {
  return this.shift(a, -this.length);
};
F.prototype.last = function(a) {
  return this.shift(a, this.length);
};
F.prototype.before = function(a, b) {
  "number" !== typeof a && (a = a._idx);
  "number" !== typeof b && (b = b._idx);
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
};
F.prototype.after = function(a, b) {
  "number" !== typeof a && (a = a._idx);
  "number" !== typeof b && (b = b._idx);
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
};
F.prototype.swap = function(a, b, c) {
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
      this.arrange(a, b, null, c, d, e);
    }
  }
  return this;
};
var I = {};
function fa(a) {
  return I[a] = new RegExp("(?:^|\\s)" + a + "(?!\\S)", "g");
}
function ha(a, b) {
  J(a, b) || (a.className += " " + b, a._class += " " + b);
  return this;
}
function ia(a, b) {
  b = (a._class || (a._class = a.className)).replace(I[b] || fa(b), "");
  a._class !== b && (a.className = b, a._class = b);
  return this;
}
function J(a, b) {
  return !!(a._class || (a._class = a.className)).match(I[b] || fa(b));
}
function ja(a, b) {
  var c = a._attr || (a._attr = {}), d = c[b];
  return d || "" === d ? d : c[b] = a.getAttribute(b);
}
;var K = window.localStorage;
F.prototype.export = function() {
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
  a && K.setItem(this.template, JSON.stringify(a));
  return this;
};
F.prototype.import = function() {
  var a = K.getItem(this.template);
  a && (this.store = a = JSON.parse(a));
  return this;
};
F.prototype.delete = function(a) {
  K.removeItem(a || this.template);
  return this;
};
var L = Array.prototype, M = window.Proxy, N = 0;
function O(a) {
  if (!(this instanceof O)) {
    return new O(a);
  }
  if (a instanceof O) {
    return a;
  }
  this.view = this.mikado = null;
  var b = a ? a.length : 0;
  if (M) {
    if (b) {
      for (var c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:L.splice.bind(this), pop:L.pop.bind(this), shift:L.shift.bind(this), unshift:L.unshift.bind(this), push:L.push.bind(this)};
    return new Proxy(this, ka);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    P(this, a);
  }
  N = b;
  P(this, "length");
}
function P(a, b) {
  Object.defineProperty(a, b, {get:function() {
    return this.proto[b];
  }, set:function(a) {
    "number" === typeof b && (b === N && P(this, ++N), ka.set(this, b, a));
  }});
}
var Q = !1, ka = {set:function(a, b, c) {
  if ("number" === typeof b) {
    var d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (b = e, d = !0);
  }
  if (!Q) {
    Q = !0;
    if ((e = a.mikado) && !e.skip) {
      var f = a.length;
      if (d) {
        var g = e.length;
        f !== g && (a.length = g);
        if (e.stealth && a[b] === c) {
          return Q = !1, !0;
        }
        d = a.view;
        b >= g ? (e.add(c, d), a.length++) : b < g && (f = e.key, g = e.dom[b], e.reuse || f && g._key === c[f] ? e.update(g, c, d, b) : e.replace(g, c, d, b));
        if (e.proxy) {
          return Q = !1, !0;
        }
      } else {
        "length" === b && c < f && e.remove(c, f - c);
      }
    }
    Q = !1;
  }
  (M ? a : a.proto)[b] = c;
  return !0;
}};
O.prototype.swap = function(a, b) {
  Q = !0;
  this.mikado.swap(a, b, this.view);
  Q = !1;
  return this;
};
O.prototype.splice = function(a, b, c) {
  Q = !0;
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a, this.view);
  Q = !1;
  return b;
};
O.prototype.push = function(a) {
  Q = !0;
  this.mikado.add(a, this.view);
  this.mikado.proxy || (this[this.length] = a);
  M && this.length++;
  Q = !1;
};
O.prototype.unshift = function(a) {
  Q = !0;
  this.mikado.add(a, 0, this.view);
  this.proto.unshift(a);
  Q = !1;
};
O.prototype.pop = function() {
  Q = !0;
  this.mikado.remove(this.length - 1);
  var a = this.proto.pop();
  Q = !1;
  return a;
};
O.prototype.shift = function() {
  Q = !0;
  this.mikado.remove(0);
  var a = this.proto.shift();
  Q = !1;
  return a;
};
O.prototype.concat = function(a) {
  for (var b = a.length, c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
O.prototype.sort = function(a) {
  L.sort.call(this, a);
  return this;
};
O.prototype.reverse = function() {
  L.reverse.call(this);
  return this;
};
O.prototype.slice = L.slice;
O.prototype.map = function(a, b) {
  b && (a = a.bind(this));
  b = 0;
  for (var c = this.length; b < c; b++) {
    this[b] = a(this[b]);
  }
  return this;
};
O.prototype.filter = function(a, b) {
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
O.prototype.indexOf = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
O.prototype.lastIndexOf = function(a) {
  for (var b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
O.prototype.forEach = function(a) {
  for (var b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
};
var ma = !window.Proxy && function() {
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
      d !== a && (la(b.handler, b.path, c, a), d = a);
    }});
  };
  return a;
}(), na = {_text:function(a, b) {
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
function oa(a, b, c) {
  return new (ma || Proxy)(a, {path:b, handler:c, get:pa, set:qa});
}
function pa(a, b) {
  return "_proxy" === b || a[b];
}
function qa(a, b, c) {
  a[b] !== c && (la(this.handler, this.path, b, c), a[b] = c);
  return !0;
}
function la(a, b, c, d) {
  if (a = a["data." + c]) {
    for (var e = 0, f = a.length, g; e < f; e++) {
      g = a[e], na[g[0]](b[g[1]], d, g[2] || c);
    }
  }
}
;var ra = window, sa = ra.requestAnimationFrame, ta = ra.cancelAnimationFrame, ua = {}, R = {}, S = {}, T = {}, U = {};
function F(a, b, c) {
  if (!(this instanceof F)) {
    return new F(a, b, c);
  }
  a.nodeType || (c = b, b = a, a = null);
  a ? this.mount(a) : (this.root = this.dom = null, this.length = 0);
  this.init(b, c);
}
F.register = F.register = function(a, b) {
  b || (b = a, a = b.n);
  R[a] = b;
  return F;
};
F.prototype.mount = function(a) {
  this.root !== a && (this.key && this.root && (this.root._pool = this.live, this.live = a._pool || {}), this.root = a, this.check(), this.dom = a._dom || (a._dom = va(a.children)), this.length = this.dom.length);
  return this;
};
F.prototype.sync = function(a) {
  this.root._dom = this.dom = va(this.root.children);
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
F.prototype.purge = function() {
  S[this.template + (this.cache ? "_cache" : "")] = null;
  if (this.key) {
    if (this.length) {
      for (var a = Object.keys(this.live), b = 0, c = a.length, d = void 0; b < c; b++) {
        this.key[d = a[b]] || delete this.key[d];
      }
    } else {
      this.live = {};
    }
  }
  this.tpl_pool && (this.tpl_pool = T[this.template] = []);
  this.key_pool && (this.key_pool = U[this.template] = {});
  return this;
};
F.prototype.index = function(a) {
  return a._idx;
};
F.prototype.node = function(a) {
  return this.dom[a];
};
F.prototype.data = function(a) {
  var b = "object" === typeof a;
  return this.store ? this.store[b ? a._idx : a] : (b ? a : this.dom[a])._data;
};
F.prototype.find = function(a) {
  if (this.key) {
    return this.live["object" !== typeof a ? a : a[this.key]];
  }
  for (var b = 0; b < this.length; b++) {
    if (this.data(b) === a) {
      return this.dom[b];
    }
  }
};
F.prototype.search = function(a) {
  a = Object.values(a).join("^");
  for (var b = 0; b < this.length; b++) {
    if (Object.values(this.data(b)).join("^") === a) {
      return this.dom[b];
    }
  }
};
F.prototype.where = function(a) {
  for (var b = Object.keys(a), c = b.length, d = [], e = 0, f, g; e < this.length; e++) {
    f = this.data(e);
    g = !0;
    for (var k = 0, l; k < c; k++) {
      if (l = b[k], f[l] !== a[l]) {
        g = !1;
        break;
      }
    }
    g && (d[d.length] = this.dom[e]);
  }
  return d;
};
F.prototype.init = function(a, b) {
  "string" === typeof a ? a = R[a] : (b || !a || a.n || (b = a, a = null), a ? a.n && F.register(a) : a = R[this.template]);
  b || (b = this.config || {});
  this.reuse = !1 !== b.reuse;
  this.state = b.state || ua;
  this.cache = !1 !== b.cache;
  this.async = b.async;
  this.timer = 0;
  this.on = b.on;
  var c = b.store || !1 !== b.store;
  (this.extern = "object" === typeof c) ? b.store = !0 : c && (c = []);
  if (this.observe = c instanceof O) {
    c.mikado = this;
  }
  this.skip = !1;
  this.loose = !this.extern && !1 !== b.loose;
  this.store = !this.loose && c;
  this.config = b;
  c = a.n;
  this.template !== c && (this.template = c, this.static = a.d, this.update_path = this.vpath = null, this.proxy = this.stealth = !1, this.include = null, this.factory = !1 !== b.prefetch && this.parse(a), this.check(), this.live = (this.key = a.k) && {}, this.tpl_pool = this.reuse && !1 !== b.pool && (T[c] || (T[c] = [])), this.key_pool = this.key && (b.keep || this.tpl_pool) && (U[c] || (U[c] = {})), this.size = this.tpl_pool && b.size);
  return this;
};
F.once = F.once = function(a, b, c, d, e) {
  var f = new F(a, b);
  "function" === typeof d && (e = d, d = null);
  if (e) {
    var g = e;
    e = function() {
      f.destroy(!0);
      g();
    };
  }
  f.render(c, d, e);
  e || f.destroy(!0);
  return F;
};
F.prototype.check = function() {
  if (this.root) {
    var a = this.root._tpl;
    a !== this.template && (this.root._tpl = this.template, a && (this.key && (this.live = {}), this.length = 0, this.remove(0, this.length)));
  }
  return this;
};
function va(a) {
  for (var b = a.length, c = Array(b), d = 0, e; d < b; d++) {
    e = a[d], e._idx = d, c[d] = e;
  }
  return c;
}
F.prototype.create = function(a, b, c) {
  var d = this.key, e = d && a[d], f, g;
  if (d && ((g = this.key_pool) && (f = g[e]) || (f = this.live[e]))) {
    var k = !0;
    if (g) {
      if (g[e] = null, g = this.tpl_pool) {
        var l = f._index;
        f._index = null;
        var n = g.pop();
        n !== f && (n._index = l, g[l] = n);
      }
    } else {
      d = !1;
    }
  } else {
    if ((f = this.tpl_pool) && f.length) {
      f = f.pop(), g && (f._index = null, g[f._key] = null);
    } else {
      var u = 1;
      f = this.factory;
    }
  }
  k && this.stealth && !this.observe || this.apply(f, a, b, c);
  if (u) {
    f = this.factory.cloneNode(!0);
    var m;
    (m = this.on) && (m = m.create) && m(f);
  }
  d && (f._key = e, this.live[e] = f);
  return f;
};
F.prototype.apply = function(a, b, c, d) {
  this.factory || (this.factory = a = this.parse(R[this.template]));
  if (!this.static) {
    b || (b = this.store ? this.store[d] : a._data);
    c && this.observe && (this.store.view = c);
    this.update_path(a._path || this.create_path(a), !1, b, d, c);
    var e;
    (e = this.on) && (e = e.change) && a !== this.factory && e(a);
    return this;
  }
};
F.prototype.refresh = function(a, b) {
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
F.prototype.render = function(a, b, c, d) {
  if (!d) {
    b && "object" !== typeof b && (c = b, b = null);
    this.timer && this.cancel();
    if (c) {
      var e = this;
      this.timer = sa(function() {
        e.timer = 0;
        e.render(a, b, null, !0);
        "function" === typeof c && c();
      });
      return this;
    }
    if (this.async) {
      var f = this;
      return new Promise(function(c) {
        f.timer = sa(function() {
          f.timer = 0;
          f.render(a, b, null, !0);
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
  var k = (this.key_pool || !this.reuse) && this.key;
  k || this.reuse || (this.remove(0, d, g), d = 0);
  var l = d < g ? d : g, n = 0;
  if (n < l) {
    for (; n < l; n++) {
      var u = this.dom[n], m = a[n], r = void 0, t = void 0;
      k && u._key !== (r = m[k]) ? (t = this.live[r]) ? this.arrange(u, t, m, b, n) : this.replace(u, m, b, n) : this.update(u, m, b, n);
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
F.prototype.arrange = function(a, b, c, d, e, f) {
  f || (f = b._idx);
  var g = f + 1 !== e;
  this.root.insertBefore(g ? b : a, g ? a : b);
  g && e + 1 !== f && this.root.insertBefore(a, this.dom[f + 1] || null);
  b._idx = e;
  a._idx = f;
  this.dom[e] = b;
  this.dom[f] = a;
  !c || this.stealth && (this.store ? this.store[this.extern ? e : f] : b._data) === c || this.apply(b, c, d, e);
  this.store && !this.extern && (c || (c = this.store[f]), this.store[f] = this.store[e], this.store[e] = c);
};
F.prototype.add = function(a, b, c, d) {
  if (!d) {
    if ("number" === typeof b) {
      c = b;
      b = null;
      var e = !0;
    } else {
      if (c || 0 === c) {
        e = !0;
      }
    }
  }
  c = d || e ? c : this.length;
  b = this.create(a, b, c);
  var f;
  this.proxy && (this.stealth && this.loose && b._data === a ? f = !0 : a._proxy || (a = oa(a, b._path || this.create_path(b), this.proxy)));
  f || (this.store ? e && !this.observe ? this.store.splice(c, 0, a) : (this.skip = !0, this.store[c] = a, this.skip = !1) : this.loose && (b._data = a));
  b._idx = c;
  if (e) {
    for (this.root.insertBefore(b, this.dom[c] || null), this.dom.splice(c, 0, b), this.length++; ++c < this.length;) {
      this.dom[c]._idx = c;
    }
  } else {
    d ? this.root.replaceChild(b, d) : (this.root.appendChild(b), this.length++), this.dom[c] = b;
  }
  var g;
  (g = this.on) && (g = g.insert) && g(b);
  return this;
};
F.prototype.clear = function(a) {
  this.remove(0, this.length);
  a && this.purge();
  return this;
};
F.prototype.destroy = function(a) {
  a && this.unload();
  this.factory = this.update_path = this.vpath = this.template = this.root = this.dom = null;
  this.length = 0;
  this.live = {};
  this.store = this.include = null;
};
F.prototype.cancel = function() {
  this.timer && (ta(this.timer), this.timer = null);
};
F.prototype.append = function(a, b, c) {
  if ("number" === typeof b) {
    c = b;
    b = null;
    var d = !0;
  } else {
    d = c || 0 === c;
  }
  for (var e = a.length, f = 0; f < e; f++) {
    this.add(a[f], b, d ? c++ : null);
  }
  return this;
};
F.prototype.remove = function(a, b, c) {
  var d = this.length;
  a && ("object" === typeof a ? a = a._idx : 0 > a && (a = d + a - 1));
  if (!d || a >= d) {
    return this;
  }
  0 > b ? (a -= b + 1, 0 > a && (a = 0), b *= -1) : b || (b = 1);
  if (!a && b >= d) {
    this.store && !this.observe && (this.extern ? this.store.splice(0) : this.store = c ? Array(c) : []);
    if (this.include && (this.key_pool || this.tpl_pool)) {
      for (b = 0; b < this.include.length; b++) {
        this.include[b].clear();
      }
    }
    var e = this.dom;
    b = e.length;
    this.root.textContent = "";
    this.root._dom = this.dom = c ? Array(c) : [];
    d = 0;
  } else {
    this.store && !this.observe && this.store.splice(a, b), e = this.dom.splice(a, b), d -= b;
  }
  var f;
  if ((f = this.on) && (f = f.remove)) {
    for (c = 0; c < b; c++) {
      f(e[c]);
    }
  }
  this.length = d;
  if (a < d) {
    for (; a < d; a++) {
      this.dom[a]._idx = a;
    }
  }
  var g;
  if (this.tpl_pool) {
    a = this.tpl_pool.length;
    if (g = this.size) {
      if (a >= g) {
        return this;
      }
      a + b > g && (e.splice(g - a), b = e.length);
    }
    if (this.cache && 1 < b && !this.key_pool) {
      g = e;
      f = g.length;
      c = f / 2 | 0;
      for (var k = 0, l; k < c; k++) {
        l = g[k], g[k] = g[f - k - 1], g[f - k - 1] = l;
      }
    }
    g = a + 1;
    T[this.template] = this.tpl_pool = a ? this.tpl_pool.concat(e) : e;
  }
  a = this.key;
  f = this.key_pool;
  for (c = 0; c < b; c++) {
    k = e[c], d && this.root.removeChild(k), a && (l = k._key, this.live[l] = null, f && (f[l] = k, g && (k._index = g + c - 1)));
  }
  return this;
};
F.prototype.replace = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[d]) : d = a._idx);
  this.add(b, c, d, a);
  this.key && (b = a._key, this.live[b] = null, this.key_pool && (this.key_pool[b] = a));
  if (b = this.tpl_pool) {
    this.key && (a._index = b.length), b[b.length] = a;
  }
  var e;
  (e = this.on) && (e = e.remove) && e(a);
  return this;
};
F.prototype.update = function(a, b, c, d) {
  "undefined" === typeof d && ("number" === typeof a ? (d = a, a = this.dom[a]) : d = a._idx);
  if (this.proxy) {
    if (this.stealth && (this.store ? this.store[d] : a._data) === b) {
      return this;
    }
    b._proxy || (b = oa(b, a._path || this.create_path(a), this.proxy));
  }
  this.store ? (this.skip = !0, this.store[d] = b, this.skip = !1) : this.loose && (a._data = b);
  if (this.key) {
    var e = a._key, f = b[this.key];
    e !== f && (this.live[e] = null, this.live[f] = a, a._key = f);
  }
  var g;
  (g = this.on) && (g = g.update) && g(a);
  return this.apply(a, b, c, d);
};
F.prototype.create_path = function(a) {
  for (var b = this.vpath.length, c = {}, d = Array(b), e = 0, f; e < b; e++) {
    f = this.vpath[e];
    var g = e, k;
    if (!(k = c[f])) {
      k = a;
      for (var l = 0, n = f.length, u = ""; l < n; l++) {
        var m = f[l];
        u += m;
        c[u] ? k = c[u] : (">" === m ? k = k.firstElementChild : "+" === m ? k = k.nextElementSibling : "|" === m && (k = k.firstChild), c[u] = k);
      }
    }
    d[g] = k;
  }
  this.cache && (a._cache = {});
  return a._path = d;
};
var V;
F.prototype.parse = function(a, b, c, d) {
  if (!b) {
    var e = S[a.n + (this.cache ? "_cache" : "")];
    if (e) {
      return this.update_path = e.update_path, this.static = e.static, this.stealth = e.stealth, this.proxy = e.proxy, this.include = e.include, this.vpath = e.vpath, e.node;
    }
  }
  e = document.createElement(a.t || "div");
  b || (b = 0, c = "&", V = "", this.vpath = [], e._path = d = [], this.cache && (e._cache = {}));
  var f = a.s, g = a.i, k = a.x, l = a.h, n = a.a, u = a.e, m = a.c, r = a.j, t = this.vpath.length, v = 0, A = 0, x = "";
  r && (x += ";" + r, -1 < x.indexOf("self") && (v = 2));
  a.f && (V += ";if(" + a.f + "){self.hidden=false", v = 2);
  m && ("object" === typeof m ? (r = m[1], m = m[0], x += this.cache ? ";v=" + m + ";if(self._class!==v){self._class=v;self.className=v}" : ";self.className=" + m, r && (W(this, m, ["_class", t]), A++), v++) : e.className = m);
  if (n || u) {
    var E;
    n && (E = Object.keys(n));
    u && (m = Object.keys(u), E = E ? E.concat(m) : m);
    for (m = 0; m < E.length; m++) {
      r = E[m];
      var B = void 0;
      n && "undefined" !== typeof(B = n[r]) || (B = u[r], this.listen(r));
      if ("object" === typeof B) {
        var Aa = B[1];
        B = B[0];
        x += this.cache ? ";v=" + B + ";var _a=self._attr||(self._attr={});if(_a['" + r + "']!==v){_a['" + r + "']=v;self.setAttribute('" + r + "',v)}" : ";self.setAttribute('" + r + "'," + B + ")";
        Aa && (W(this, B, ["_attr", t, r]), A++);
        v++;
      } else {
        e.setAttribute(r, B);
      }
    }
  }
  f && ("string" === typeof f ? e.style.cssText = f : f.length && (E = f[1], f = f[0], x += this.cache ? ";v=" + f + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}" : ";self.style.cssText=" + f, E && (W(this, f, ["_css", t]), A++), v++));
  if (a["@"] || a.r) {
    this.include || (this.include = []);
    var y = a["@"] || a.i;
    a["@"] || (y.n = a["@"] = this.template + "@" + this.include.length, a.i = null);
    g = null;
    x += ";this.include[" + this.include.length + "].mount(self).render(" + a.r + (a.m ? ".slice(" + (0 <= a.m ? "0," + a.m : a.m) + ")" : "") + ",view)";
    k = V;
    V = "";
    this.include.push(new F(e, y, Object.assign({}, this.config, {store:!1, async:!1})));
    V = k;
    v++;
  } else {
    if (!g) {
      if (a["+"]) {
        g = R[a["+"]];
      } else {
        if (k) {
          if (l = "object" === typeof k) {
            y = k[1], k = k[0];
          }
          f = document.createTextNode(k);
          l && (v && t++, this.vpath[t] = c + "|", d[t] = f, wa(v, this.cache ? ";v=" + k + ";if(self._text!==v){self._text=v;self.nodeValue=v}" : ";self.nodeValue=" + k, t, this.cache), y && (W(this, k, ["_text", t]), A++), v && t--);
          e.appendChild(f);
        } else {
          l && ("object" === typeof l ? (y = l[1], l = l[0], x += this.cache ? ";v=" + l + ";if(self._html!==v){self._html=v;self.innerHTML=v}" : ";self.innerHTML=" + l, y && (W(this, l, ["_html", t]), A++), v++) : e.innerHTML = l);
        }
      }
    }
  }
  v ? (this.vpath[t] = c, d[t] = e, this.static = !1, v === A && (this.stealth = !0), wa(v, x, t, this.cache)) : x && (V += x);
  V += "";
  if (g) {
    if (g.length) {
      for (x = ">", y = 0; y < g.length; y++) {
        y && (x += "+");
        k = g[y];
        if (A = k["+"]) {
          k = R[A];
        }
        e.appendChild(this.parse(k, b + y + 1, c + x, d));
      }
    } else {
      if (A = g["+"]) {
        g = R[A];
      }
      e.appendChild(this.parse(g, b + 1, c + ">", d));
    }
  }
  a.f && (V += "}else " + (1 < v ? "self" : "p[" + t + "]") + ".hidden=true");
  b || (!this.static && V && (this.update_path = Function("p", "s", "data", "index", "view", '"use strict";var self,v' + V)), b = {update_path:this.update_path, static:this.static, vpath:this.vpath, node:e}, b.include = this.include, b.proxy = this.proxy, b.stealth = this.stealth, S[a.n + (this.cache ? "_cache" : "")] = b);
  return e;
};
function W(a, b, c) {
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function wa(a, b, c, d) {
  V = d || 1 < a ? V + (";self=p[" + c + "]" + b) : V + b.replace(/self/g, "p[" + c + "]");
}
F.prototype.load = function(a, b) {
  var c = this, d = new XMLHttpRequest;
  d.overrideMimeType("application/json");
  d.open("GET", a, !1 !== b);
  d.onload = function() {
    var a = this.responseText;
    if (a) {
      try {
        var d = JSON.parse(a);
        F.register(d);
        c instanceof F && c.init(d);
      } catch (k) {
        var g = k;
      }
      "function" === typeof b && b(g);
    }
  };
  d.send();
  return this;
};
F.load = F.prototype.load;
F.prototype.unload = function(a) {
  a ? "object" === typeof a && (a = a.n) : a = this.template;
  a && (R[a] = null, T[a] = U[a] = S[a] = null, S[a + "_cache"] = null);
  return this;
};
F.unregister = F.prototype.unregister = F.unload = F.prototype.unload;
var xa = {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1}, X, ya = 0;
function za(a, b) {
  var c = {};
  if (!b) {
    X = !0;
    if ("string" === typeof a) {
      if (-1 !== a.indexOf("<")) {
        var d = document.createElement("div");
        d.innerHTML = a;
        a = d.firstElementChild;
        c.n = a.id || "tpl_" + ya++;
      } else {
        c.n = a, a = document.getElementById(a);
      }
    } else {
      c.n = a.id || "tpl_" + ya++;
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
        var k = a.getAttribute(g);
        "style" === g ? Z(c, "s", k) : "if" === g ? Z(c, "f", k) : "include" === g ? a.hasAttribute("for") || (g = {}, (c.i || (c.i = [])).push(g), Z(g, "+", k)) : "for" === g && "LABEL" !== d ? ((g = a.getAttribute("include")) && (c["@"] = Y(g)), Z(c, "r", k)) : "max" === g ? Z(c, "m", k) : "js" === g ? c.j = Y(k) : "key" === g ? Z(c, "k", k.replace("data.", "")) : ("bind" === g && (k = k.split(":"), 2 > k.length && k.unshift("value"), g = k[0], k = "{{==" + k[1] + "}}"), xa[g.substring(2)] && -1 !== 
        k.indexOf("{{") && (g = g.substring(2)), xa[g] ? Z(c.e || (c.e = {}), g, k) : Z(c.a || (c.a = {}), g, k));
      }
    }
  }
  a = a.childNodes;
  if (d = a.length) {
    for (f = e = 0; f < d; f++) {
      if (k = za(a[f], 1)) {
        1 === d && 3 === a[f].nodeType ? (k.j && (c.j = k.j), k.h && (c.h = k.h), k.x && (c.x = k.x)) : (c.i || (c.i = []))[e++] = k;
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
;F.compile = za;
F.array = O;
F.setText = function(a, b) {
  b += "";
  3 !== a.nodeType && (a._html = null, a = a.firstChild || a.appendChild(document.createTextNode(a._text = b)));
  a._text !== b && (a.nodeValue = b, a._text = b);
  return this;
};
F.getText = function(a) {
  if (3 !== a.nodeType && !(a = a.firstChild)) {
    return "";
  }
  var b = a._text;
  return b || "" === b ? b : a._text = a.nodeValue;
};
F.setHTML = function(a, b) {
  b += "";
  a._html !== b && (a.innerHTML = b, a._html = b);
  return this;
};
F.getHTML = function(a) {
  var b = a._html;
  return b || "" === b ? b : a._html = a.innerHTML;
};
F.setClass = function(a, b) {
  a._class !== b && (a.className = b, a._class = b);
  return this;
};
F.getClass = function(a) {
  var b = a._class;
  return b || "" === b ? b : a._class = a.className;
};
F.hasClass = J;
F.toggleClass = function(a, b) {
  J(a, b) ? ia(a, b) : ha(a, b);
  return this;
};
F.removeClass = ia;
F.addClass = ha;
F.setCSS = function(a, b) {
  a._css !== b && ((a._style || (a._style = a.style)).cssText = b, a._css = b);
  return this;
};
F.getCSS = function(a) {
  var b = a._css;
  return b || "" === b ? b : a._css = a.getAttribute("style");
};
F.setAttribute = function(a, b, c) {
  var d = a._attr || (a._attr = {});
  d[b] !== c && (a.setAttribute(b, c), d[b] = c);
  return this;
};
F.getAttribute = ja;
F.hasAttribute = function(a, b) {
  a = ja(a, b);
  return !!a || "" === a;
};
F.removeAttribute = function(a, b) {
  var c = a._attr || (a._attr = {});
  null !== c[b] && (a.removeAttribute(b), c[b] = null);
  return this;
};
(function() {
  var a = F, b = this || window, c;
  (c = b.define) && c.amd ? c([], function() {
    return a;
  }) : (c = b.modules) ? c.mikado = a : "object" === typeof b.exports ? b.module.exports = a : b.Mikado = a;
})();
}).call(this);
