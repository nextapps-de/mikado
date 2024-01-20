/**!
 * Mikado.js v0.8.309 (Bundle/Debug)
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
const RELEASE$$module$tmp$config = "light.module", DEBUG$$module$tmp$config = !0, PROFILER$$module$tmp$config = !1, SUPPORT_CACHE$$module$tmp$config = !0, SUPPORT_CACHE_HELPERS$$module$tmp$config = !1, SUPPORT_DOM_HELPERS$$module$tmp$config = !1, SUPPORT_KEYED$$module$tmp$config = !0, SUPPORT_POOLS$$module$tmp$config = !0, SUPPORT_CALLBACKS$$module$tmp$config = !1, SUPPORT_ASYNC$$module$tmp$config = !1, REACTIVE_ONLY$$module$tmp$config = !1, SUPPORT_REACTIVE$$module$tmp$config = !1, SUPPORT_COMPILE$$module$tmp$config = 
!1, SUPPORT_EVENTS$$module$tmp$config = !1, SUPPORT_WEB_COMPONENTS$$module$tmp$config = !1, SUPPORT_COMPACT_TEMPLATE$$module$tmp$config = !0, MIKADO_NODE_CACHE$$module$tmp$config = "_mkc", MIKADO_DOM$$module$tmp$config = "_mkd", MIKADO_CLASS$$module$tmp$config = "_mki", MIKADO_TPL_KEY$$module$tmp$config = "_mkk", MIKADO_LIVE_POOL$$module$tmp$config = "_mkl", MIKADO_TPL_PATH$$module$tmp$config = "_mkp", MIKADO_PROXY$$module$tmp$config = "_mkx", MIKADO_EVENT_CACHE$$module$tmp$config = "_mke";
var module$tmp$config = {DEBUG:DEBUG$$module$tmp$config, MIKADO_CLASS:MIKADO_CLASS$$module$tmp$config, MIKADO_DOM:MIKADO_DOM$$module$tmp$config, MIKADO_EVENT_CACHE:MIKADO_EVENT_CACHE$$module$tmp$config, MIKADO_LIVE_POOL:MIKADO_LIVE_POOL$$module$tmp$config, MIKADO_NODE_CACHE:MIKADO_NODE_CACHE$$module$tmp$config, MIKADO_PROXY:MIKADO_PROXY$$module$tmp$config, MIKADO_TPL_KEY:MIKADO_TPL_KEY$$module$tmp$config, MIKADO_TPL_PATH:MIKADO_TPL_PATH$$module$tmp$config, PROFILER:PROFILER$$module$tmp$config, REACTIVE_ONLY:REACTIVE_ONLY$$module$tmp$config, 
RELEASE:RELEASE$$module$tmp$config, SUPPORT_ASYNC:SUPPORT_ASYNC$$module$tmp$config, SUPPORT_CACHE:SUPPORT_CACHE$$module$tmp$config, SUPPORT_CACHE_HELPERS:SUPPORT_CACHE_HELPERS$$module$tmp$config, SUPPORT_CALLBACKS:SUPPORT_CALLBACKS$$module$tmp$config, SUPPORT_COMPACT_TEMPLATE:SUPPORT_COMPACT_TEMPLATE$$module$tmp$config, SUPPORT_COMPILE:SUPPORT_COMPILE$$module$tmp$config, SUPPORT_DOM_HELPERS:SUPPORT_DOM_HELPERS$$module$tmp$config, SUPPORT_EVENTS:SUPPORT_EVENTS$$module$tmp$config, SUPPORT_KEYED:SUPPORT_KEYED$$module$tmp$config, 
SUPPORT_POOLS:SUPPORT_POOLS$$module$tmp$config, SUPPORT_REACTIVE:SUPPORT_REACTIVE$$module$tmp$config, SUPPORT_WEB_COMPONENTS:SUPPORT_WEB_COMPONENTS$$module$tmp$config};
function tick$$module$tmp$profiler(a) {
  const b = window.profiler || (window.profiler = {});
  b[a] || (b[a] = 0);
  b[a]++;
}
var module$tmp$profiler = {};
module$tmp$profiler.tick = tick$$module$tmp$profiler;
const events$$module$tmp$event = {}, event_options$$module$tmp$event = {}, routes$$module$tmp$event = SUPPORT_EVENTS$$module$tmp$config ? Object.create(null) : null, options$$module$tmp$event = SUPPORT_EVENTS$$module$tmp$config ? Object.create(null) : null, doc$$module$tmp$event = document.documentElement || document.body.parentNode, has_touch$$module$tmp$event = "ontouchstart" in window, has_pointer$$module$tmp$event = !has_touch$$module$tmp$event && window.PointerEvent && navigator.maxTouchPoints;
SUPPORT_EVENTS$$module$tmp$config && (Mikado$$module$tmp$mikado.eventCache = !1, Mikado$$module$tmp$mikado.eventBubble = !1);
let tap_fallback$$module$tmp$event;
function handler$$module$tmp$event(a, b) {
  const c = a.target;
  if (c !== window && c !== doc$$module$tmp$event) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("event.trigger");
    var d = Mikado$$module$tmp$mikado.eventCache, e = Mikado$$module$tmp$mikado.eventBubble;
    b || (b = a.type);
    var g;
    d && (g = c[MIKADO_EVENT_CACHE$$module$tmp$config + b]);
    if ("undefined" === typeof g) {
      for (var h = c; h && h !== doc$$module$tmp$event;) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("event.bubble");
        var f = void 0;
        "click" === b && tap_fallback$$module$tmp$event && (f = h.getAttribute("tap"));
        f || (f = h.getAttribute(b));
        if (f) {
          var k = f.indexOf(":"), l = h;
          if (-1 < k) {
            const m = f.substring(0, k);
            k = f.substring(k + 1);
            for (f = ""; (l = l.parentElement) !== doc$$module$tmp$event;) {
              if (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("event.bubble"), l.hasAttribute(k)) {
                f = m;
                break;
              }
            }
            DEBUG$$module$tmp$config && (f || console.warn("Event root '" + k + "' was not found for the event: '" + m + "'."));
          }
          if (f && (g || (g = [], d && (c[MIKADO_EVENT_CACHE$$module$tmp$config + b] = g)), g.push([f, l]), l = options$$module$tmp$event[f], !e || l && (l.stop || l.cancel))) {
            break;
          }
        }
        h = h.parentElement;
      }
      d && (g || (c[MIKADO_EVENT_CACHE$$module$tmp$config + b] = null));
    } else {
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("event.cache");
    }
    if (g) {
      for (let m = 0, n; m < g.length; m++) {
        if (n = g[m], e = n[0], h = routes$$module$tmp$event[e]) {
          f = n[1];
          if (l = options$$module$tmp$event[e]) {
            l.prevent && a.preventDefault(), l.stop && a.stopImmediatePropagation(), l.once && (routes$$module$tmp$event[e] = null, d && (c[MIKADO_EVENT_CACHE$$module$tmp$config + b] = null));
          }
          PROFILER$$module$tmp$config && tick$$module$tmp$profiler("route.call");
          h(f, a);
        } else {
          DEBUG$$module$tmp$config && console.warn("The route '" + e + "' is not defined for the event '" + b + "'.");
        }
      }
    }
  }
}
function route$$module$tmp$event(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("route.set");
  if (DEBUG$$module$tmp$config) {
    if (!a) {
      throw Error("Missing route name.");
    }
    if (!b) {
      throw Error("The route '" + a + "' has no function assigned to it.");
    }
    routes$$module$tmp$event[a] && console.info("A new handler was re-assigned to the route '" + a + "'.");
  }
  routes$$module$tmp$event[a] = b;
  c && (options$$module$tmp$event[a] = c);
  return this;
}
function dispatch$$module$tmp$event(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("route.dispatch");
  if (DEBUG$$module$tmp$config) {
    if (!a) {
      throw Error("Missing route name.");
    }
    if (!routes$$module$tmp$event[a]) {
      throw Error("Undefined route '" + a + "'.");
    }
  }
  routes$$module$tmp$event[a](b || this, c || window.event);
  return this;
}
function listen$$module$tmp$event(a, b) {
  events$$module$tmp$event[a] || (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("event.listen"), register_event$$module$tmp$event(1, a, handler$$module$tmp$event, b), events$$module$tmp$event[a] = 1, event_options$$module$tmp$event[a] = b || null);
  return this;
}
function unlisten$$module$tmp$event(a) {
  events$$module$tmp$event[a] && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("event.unlisten"), register_event$$module$tmp$event(0, a, handler$$module$tmp$event, event_options$$module$tmp$event[a]), events$$module$tmp$event[a] = 0, event_options$$module$tmp$event[a] = null);
  return this;
}
let touch_x$$module$tmp$event, touch_y$$module$tmp$event, register_tap$$module$tmp$event;
if (has_touch$$module$tmp$event || has_pointer$$module$tmp$event) {
  function a(e) {
    c(e, e.touches);
  }
  function b(e) {
    const g = touch_x$$module$tmp$event, h = touch_y$$module$tmp$event;
    c(e, e.changedTouches);
    15 > Math.abs(touch_x$$module$tmp$event - g) && 15 > Math.abs(touch_y$$module$tmp$event - h) && handler$$module$tmp$event(e, "tap");
  }
  function c(e, g) {
    g && (e = g[0]);
    touch_x$$module$tmp$event = e.clientX;
    touch_y$$module$tmp$event = e.clientY;
  }
  const d = {passive:!1, capture:!0};
  register_tap$$module$tmp$event = function(e) {
    register_event$$module$tmp$event(e, has_pointer$$module$tmp$event ? "pointerdown" : "touchstart", a, d);
    register_event$$module$tmp$event(e, has_pointer$$module$tmp$event ? "pointerup" : "touchend", b, d);
  };
}
function register_event$$module$tmp$event(a, b, c, d) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler(a ? "event.register" : "event.unregister");
  if ("tap" === b) {
    if (has_touch$$module$tmp$event || has_pointer$$module$tmp$event) {
      register_tap$$module$tmp$event(a);
      return;
    }
    tap_fallback$$module$tmp$event = !0;
    b = "click";
  }
  window[(a ? "add" : "remove") + "EventListener"](b, c, d || !1 === d ? d : !0);
}
var module$tmp$event = {};
module$tmp$event.dispatch = dispatch$$module$tmp$event;
module$tmp$event.listen = listen$$module$tmp$event;
module$tmp$event.route = route$$module$tmp$event;
module$tmp$event.unlisten = unlisten$$module$tmp$event;
function create_path$$module$tmp$factory(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("factory.path");
  let d;
  SUPPORT_CACHE$$module$tmp$config && c && (d = a[MIKADO_NODE_CACHE$$module$tmp$config]) && (a[MIKADO_NODE_CACHE$$module$tmp$config] = null);
  const e = b.length, g = Array(e), h = {};
  for (let f = 0, k, l, m, n, p = null; f < e; f++) {
    k = b[f], (l = k.v) ? (n = m = h[l], n || (m = resolve$$module$tmp$factory(a, l, h), n = m.node, m = m.parent || n)) : n = m = a, c && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.transfer"), p = SUPPORT_CACHE$$module$tmp$config && d ? d[f] : {}, m[MIKADO_NODE_CACHE$$module$tmp$config] = p), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create"), g[f] = new Cache$$module$tmp$factory(p, n, "");
  }
  return a[MIKADO_TPL_PATH$$module$tmp$config] = g;
}
function resolve$$module$tmp$factory(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("factory.resolve");
  let d = null;
  for (let e = 0, g = b.length, h = ""; e < g; e++) {
    const f = b[e];
    h += f;
    if (c[h]) {
      a = c[h];
    } else {
      if (">" === f) {
        a = a.firstChild;
      } else if ("|" === f) {
        d = a;
        a = a.firstChild;
        break;
      } else if ("@" === f) {
        d = a;
        a = a.style;
        break;
      } else {
        a = a.nextSibling;
      }
      c[h] = a;
    }
  }
  return {node:a, parent:d};
}
function construct$$module$tmp$factory(a, b, c, d, e, g) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("factory.construct");
  SUPPORT_REACTIVE$$module$tmp$config && !g && (a.fullproxy = 1);
  const h = e || (b.tag ? b.svg ? document.createElementNS("http://www.w3.org/2000/svg", b.tag) : document.createElement(b.tag) : document.createTextNode(b.text));
  let f, k;
  if (k = b.class) {
    "object" === typeof k ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create"), c.push(new Cache$$module$tmp$factory(f = {_c:""}, h, d)), SUPPORT_REACTIVE$$module$tmp$config && ((k = k[0]) ? init_proxy$$module$tmp$factory(a, k, {fn:"_c", index:c.length - 1}) : a.fullproxy = 0)) : e || (h.className = k);
  }
  if (k = b.attr) {
    for (const m in k) {
      let n = k[m];
      "object" === typeof n ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create"), f || c.push(new Cache$$module$tmp$factory(f = {}, h, d)), f["_a" + m] = !1, SUPPORT_REACTIVE$$module$tmp$config && ((n = n[0]) ? init_proxy$$module$tmp$factory(a, n, {fn:"_a", index:c.length - 1, key:m}) : a.fullproxy = 0)) : e || h.setAttribute(m, n);
    }
  }
  if (SUPPORT_EVENTS$$module$tmp$config && (k = b.event)) {
    for (const m in k) {
      e || h.setAttribute(m, k[m]), listen$$module$tmp$event(m);
    }
  }
  if (k = b.style) {
    "object" === typeof k ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create"), c.push(new Cache$$module$tmp$factory(f || (f = {}), h.style, d + "@")), f._s = "", SUPPORT_REACTIVE$$module$tmp$config && ((k = k[0]) ? init_proxy$$module$tmp$factory(a, k, {fn:"_s", index:c.length - 1}) : a.fullproxy = 0)) : e || (h.style.cssText = k);
  }
  if (k = b.text) {
    if ("object" === typeof k) {
      var l = h;
      k = k[0];
      b.tag ? (d += "|", l = !e && h.firstChild, l || (l = document.createTextNode(k), h.appendChild(l))) : f = {};
      (f || (f = {}))._t = k;
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create");
      c.push(new Cache$$module$tmp$factory(f, l, d));
      SUPPORT_REACTIVE$$module$tmp$config && (k ? init_proxy$$module$tmp$factory(a, k, {fn:"_t", index:c.length - 1}) : a.fullproxy = 0);
    } else {
      e || (b.tag ? h.textContent = k : h.nodeValue = k);
    }
  } else if (k = b.child) {
    if (e && (e = e.firstChild, !e)) {
      return DEBUG$$module$tmp$config && console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
    }
    k.constructor !== Array && (k = [k]);
    for (let m = 0, n, p = k.length; m < p; m++) {
      if (n = k[m], d = m ? d + "+" : d + ">", b = construct$$module$tmp$factory(a, n, c, d, e, 1), e) {
        if (m < p - 1 && (e = e.nextSibling, !e)) {
          return DEBUG$$module$tmp$config && console.warn("Hydration failed of template '" + a.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead."), null;
        }
      } else {
        h.appendChild(b);
      }
    }
  } else if (k = b.html) {
    "object" === typeof k ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create"), f || c.push(new Cache$$module$tmp$factory(f = {}, h, d)), f._h = "", SUPPORT_REACTIVE$$module$tmp$config && ((k = k[0]) ? init_proxy$$module$tmp$factory(a, k, {fn:"_h", index:c.length - 1}) : a.fullproxy = 0)) : e || (h.innerHTML = k);
  } else if (k = b.inc) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.create");
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("template.include");
    f || c.push(new Cache$$module$tmp$factory(null, h, d));
    if ("string" === typeof k) {
      l = includes$$module$tmp$mikado[k];
      if (DEBUG$$module$tmp$config && !l) {
        throw Error("The partial template '" + k + "' which is included by the root template '" + a.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
      }
      if (!(l instanceof Mikado$$module$tmp$mikado)) {
        d = l[0];
        if (b = l[1]) {
          b.async = !1, e && (b.root = e, b.hydrate = !0);
        }
        includes$$module$tmp$mikado[k] = l = new Mikado$$module$tmp$mikado(d, b);
      }
    } else if (1 !== k) {
      d = a.inc.length;
      if (DEBUG$$module$tmp$config && !a.tpl.fn.length) {
        throw Error("The template '" + a.name + "|" + d + "' has conflicts. It should provide a handler entry, but wasn't found.");
      }
      l = new Mikado$$module$tmp$mikado({name:a.name + "|" + d, tpl:k, key:k.key, cache:k.cache, fn:a.tpl.fn}, {recycle:a.recycle, cache:a.cache, pool:a.pool, state:a.state, mount:h, hydrate:!!e});
    }
    1 !== k && a.inc.push(l);
  }
  f && (h[MIKADO_NODE_CACHE$$module$tmp$config] = f);
  g || (h[MIKADO_TPL_PATH$$module$tmp$config] = c);
  return h;
}
function init_proxy$$module$tmp$factory(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.init");
  a.proxy || (a.proxy = {});
  (a.proxy[b] || (a.proxy[b] = [])).push(c);
}
function Cache$$module$tmp$factory(a, b, c) {
  this.c = a;
  this.n = b;
  this.v = c;
}
if (SUPPORT_COMPACT_TEMPLATE$$module$tmp$config || SUPPORT_REACTIVE$$module$tmp$config) {
  Cache$$module$tmp$factory.prototype._a = function(a, b, c, d) {
    if (this.c) {
      if (c) {
        if (d || 0 === d) {
          c = c[d] || (c[d] = {});
        }
        c["_a" + a] = b;
      }
      if (this.c["_a" + a] === b) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
        return;
      }
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss");
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.attr");
      this.c["_a" + a] = b;
    }
    !1 === b ? this.n.removeAttribute(a) : this.n.setAttribute(a, b);
  }, Cache$$module$tmp$factory.prototype._t = function(a, b, c) {
    if (this.c) {
      if (b) {
        if (c || 0 === c) {
          b = b[c] || (b[c] = {});
        }
        b._t = a;
      }
      if (this.c._t === a) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
        return;
      }
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss");
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.text");
      this.c._t = a;
    }
    this.n.nodeValue = a;
  }, Cache$$module$tmp$factory.prototype._c = function(a, b, c) {
    if (this.c) {
      if (b) {
        if (c || 0 === c) {
          b = b[c] || (b[c] = {});
        }
        b._c = a;
      }
      if (this.c._c === a) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
        return;
      }
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss");
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class");
      this.c._c = a;
    }
    this.n.className = a;
  }, Cache$$module$tmp$factory.prototype._s = function(a, b, c) {
    if (this.c) {
      if (b) {
        if (c || 0 === c) {
          b = b[c] || (b[c] = {});
        }
        b._s = a;
      }
      if (this.c._s === a) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
        return;
      }
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss");
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.style");
      this.c._s = a;
    }
    this.n.cssText = a;
  }, Cache$$module$tmp$factory.prototype._h = function(a, b, c) {
    if (this.c) {
      if (b) {
        if (c || 0 === c) {
          b = b[c] || (b[c] = {});
        }
        b._h = a;
      }
      if (this.c._h === a) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
        return;
      }
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss");
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.html");
      this.c._h = a;
    }
    this.n.innerHTML = a;
  };
}
var module$tmp$factory = {Cache:Cache$$module$tmp$factory};
module$tmp$factory.construct = construct$$module$tmp$factory;
module$tmp$factory.create_path = create_path$$module$tmp$factory;
const proxy$$module$tmp$proxy = SUPPORT_REACTIVE$$module$tmp$config && (window.Proxy || function() {
  function a(b, c) {
    this.path = c.path;
    this.fn = c.fn;
    for (const d in b) {
      this.define(b, d, b[d]);
    }
    b[MIKADO_PROXY$$module$tmp$config] = this;
    return b;
  }
  a.prototype.define = function(b, c, d) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.define");
    const e = this;
    Object.defineProperty(b, c, {get:function() {
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.read");
      return d;
    }, set:function(g) {
      PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.write");
      proxy_loop$$module$tmp$proxy(e, d = g, c);
    }});
  };
  return a;
}());
function proxy_create$$module$tmp$proxy(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.create");
  const d = a[MIKADO_PROXY$$module$tmp$config];
  if (d) {
    return d.path = b, a;
  }
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.new");
  return new proxy$$module$tmp$proxy(a, {path:b, fn:c, get:get$$module$tmp$proxy, set:set$$module$tmp$proxy});
}
function get$$module$tmp$proxy(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.read");
  return b === MIKADO_PROXY$$module$tmp$config ? this : a[b];
}
function set$$module$tmp$proxy(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.write");
  proxy_loop$$module$tmp$proxy(this, c, b);
  a[b] = c;
  return !0;
}
function proxy_loop$$module$tmp$proxy(a, b, c) {
  if (c = a.fn[c]) {
    for (let e = 0; e < c.length; e++) {
      var d = c[e];
      const g = d.fn, h = a.path[d.index];
      d = d.key || "";
      h.c && h.c[g + d] === b ? PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match") : (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), d ? h[g](d, b) : h[g](b));
    }
  }
}
var module$tmp$proxy = {};
module$tmp$proxy.default = proxy_create$$module$tmp$proxy;
const includes$$module$tmp$mikado = Object.create(null);
function Mikado$$module$tmp$mikado(a, b = {}) {
  if (!(this instanceof Mikado$$module$tmp$mikado)) {
    return new Mikado$$module$tmp$mikado(a, b);
  }
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mikado.new");
  if ("string" === typeof a) {
    var c = includes$$module$tmp$mikado[a];
    if (DEBUG$$module$tmp$config && !c) {
      throw Error("The template '" + a + "' is not registered.");
    }
    if (c instanceof Mikado$$module$tmp$mikado) {
      return c;
    }
    a = c[0];
    b || (b = c[1]);
  }
  if (DEBUG$$module$tmp$config) {
    if (!a) {
      throw Error("Initialization Error: Template is not defined.");
    }
    if (!a.tpl) {
      throw Error("Initialization Error: Template isn't supported.");
    }
  }
  this.dom = [];
  this.length = 0;
  this.root = b.root || b.mount || null;
  this.recycle = !!b.recycle;
  this.state = b.state || {};
  this.shadow = b.shadow || SUPPORT_WEB_COMPONENTS$$module$tmp$config && !!a.cmp;
  SUPPORT_KEYED$$module$tmp$config && (this.key = a.key || "", this.live = {});
  c = a.fn;
  a.fc || c && (a.fc = c.slice());
  this.apply = c && c.pop();
  this.tpl = a;
  this.name = a.name;
  this.inc = [];
  c = this.recycle || SUPPORT_KEYED$$module$tmp$config && !!this.key;
  SUPPORT_POOLS$$module$tmp$config && (this.pool = c && b.pool || 0, this.pool_shared = [], SUPPORT_KEYED$$module$tmp$config && (this.pool_keyed = new Map()));
  SUPPORT_CACHE$$module$tmp$config && (this.cache = c && (a.cache || !!b.cache));
  SUPPORT_ASYNC$$module$tmp$config && (this.async = !!b.async, this.timer = 0);
  SUPPORT_CALLBACKS$$module$tmp$config && (this.on = b.on || null);
  SUPPORT_REACTIVE$$module$tmp$config && (this.proxy = null, this.fullproxy = 0, (a = b.observe) && (new Observer$$module$tmp$array(a)).mount(this));
  this.root ? this.mount(this.root, b.hydrate) : this.factory = null;
}
function register$$module$tmp$mikado(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mikado.register");
  let c, d;
  if ("string" === typeof a) {
    if (c = d = a, a = includes$$module$tmp$mikado[c], a instanceof Mikado$$module$tmp$mikado || (a = a[0]), DEBUG$$module$tmp$config && !a) {
      throw Error("The template '" + c + "' was not found.");
    }
  } else {
    c = a.name;
  }
  DEBUG$$module$tmp$config && includes$$module$tmp$mikado[c] && (d ? console.info("The template '" + c + "' was replaced by a new definition.") : console.warn("The template '" + c + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!"));
  includes$$module$tmp$mikado[c] = [a, b];
  return Mikado$$module$tmp$mikado;
}
function unregister$$module$tmp$mikado(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mikado.unregister");
  "object" === typeof a && (a = a.name);
  const b = includes$$module$tmp$mikado[a];
  b && (b instanceof Mikado$$module$tmp$mikado && b.destroy(), includes$$module$tmp$mikado[a] = null);
  return Mikado$$module$tmp$mikado;
}
Mikado$$module$tmp$mikado.prototype.mount = function(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.mount");
  if (DEBUG$$module$tmp$config && !a) {
    throw Error("No target was passed to .mount()");
  }
  SUPPORT_ASYNC$$module$tmp$config && this.timer && this.cancel();
  if (this.shadow) {
    var c = SUPPORT_WEB_COMPONENTS$$module$tmp$config && this.tpl.cmp;
    a = a.shadowRoot || a.attachShadow({mode:"open"});
    if (c && c.length) {
      var d = a.lastElementChild;
      if (d) {
        a = d;
      } else {
        c.push({tag:"root"});
        for (let e = 0, g; e < c.length; e++) {
          g = construct$$module$tmp$factory(this, c[e], [], ""), a.append(g), e === c.length - 1 && (a = g);
        }
      }
    }
  }
  c = a[MIKADO_CLASS$$module$tmp$config];
  d = this.root !== a;
  if (c === this) {
    if (!d) {
      return this;
    }
    this.dom = a[MIKADO_DOM$$module$tmp$config];
    this.length = this.dom.length;
  } else if (c) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mikado.unmount");
    c.clear();
    a[MIKADO_DOM$$module$tmp$config] = this.dom = [];
    this.length = 0;
    a.firstChild && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mount.reset"), a.textContent = "");
    const e = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on.unmount;
    e && e(a, c);
  } else {
    b ? (this.dom = collection_to_array$$module$tmp$mikado(a.children), this.length = this.dom.length) : (this.dom = [], this.length = 0, a.firstChild && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mount.reset"), a.textContent = "")), a[MIKADO_DOM$$module$tmp$config] = this.dom;
  }
  if (SUPPORT_KEYED$$module$tmp$config && this.key) {
    if (d && this.root && (this.root[MIKADO_LIVE_POOL$$module$tmp$config] = this.live), c === this) {
      this.live = a[MIKADO_LIVE_POOL$$module$tmp$config];
    } else {
      d = {};
      if (!c && b && this.length) {
        for (let e = 0, g, h; e < this.length; e++) {
          PROFILER$$module$tmp$config && tick$$module$tmp$profiler("hydrate.count"), g = this.dom[e], h = g.getAttribute("key"), DEBUG$$module$tmp$config && (h || console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported.")), g[MIKADO_TPL_KEY$$module$tmp$config] = h, d[h] = g;
        }
      }
      a[MIKADO_LIVE_POOL$$module$tmp$config] = this.live = d;
    }
  }
  a[MIKADO_CLASS$$module$tmp$config] = this;
  this.root = a;
  this.factory || (b && this.length && (this.factory = this.dom[0].cloneNode(!0), construct$$module$tmp$factory(this, this.tpl.tpl, [], "", this.factory) && finishFactory$$module$tmp$mikado(this)), PROFILER$$module$tmp$config && b && tick$$module$tmp$profiler(this.tpl ? "hydrate.error" : "hydrate.success"), this.tpl && (this.factory = construct$$module$tmp$factory(this, this.tpl.tpl, [], ""), finishFactory$$module$tmp$mikado(this)));
  (b = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on.mount) && b(a, this);
  return this;
};
function finishFactory$$module$tmp$mikado(a) {
  a.tpl.fc && (a.tpl.fn = a.tpl.fc, a.tpl.fc = null);
  a.tpl = null;
}
function collection_to_array$$module$tmp$mikado(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("collection_to_array");
  const b = a.length, c = Array(b);
  for (let d = 0; d < b; d++) {
    c[d] = a[d];
  }
  return c;
}
function once$$module$tmp$mikado(a, b, c, d, e) {
  if (DEBUG$$module$tmp$config) {
    if (!a) {
      throw Error("Root element is not defined.");
    }
    if (!b) {
      throw Error("Template is not defined.");
    }
  }
  var g;
  if (SUPPORT_ASYNC$$module$tmp$config) {
    if ("function" === typeof c || !0 === c) {
      e = c, c = null;
    } else if ("function" === typeof d || !0 === d) {
      e = d, d = null;
    }
    if (e) {
      return new Promise(function(f) {
        requestAnimationFrame(function() {
          once$$module$tmp$mikado(a, b, c, d);
          "function" === typeof e && e();
          f();
        });
      });
    }
  }
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("mikado.once");
  var h = (g = SUPPORT_WEB_COMPONENTS$$module$tmp$config && b.cmp) && g.length;
  g && !h && (a = a.shadowRoot || a.attachShadow({mode:"open"}));
  if (c || h || b.fn) {
    g = new Mikado$$module$tmp$mikado(b);
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
    g = construct$$module$tmp$factory({}, b.tpl, [], "", null, 1), a.append(g);
  }
  return Mikado$$module$tmp$mikado;
}
REACTIVE_ONLY$$module$tmp$config || (Mikado$$module$tmp$mikado.prototype.render = function(a, b, c, d) {
  if (DEBUG$$module$tmp$config) {
    if (!this.root) {
      throw Error("Template was not mounted or root was not found.");
    }
    if (this.root[MIKADO_CLASS$$module$tmp$config] !== this) {
      throw Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
    }
  }
  if (SUPPORT_ASYNC$$module$tmp$config && !d) {
    var e;
    if (b && (e = "function" === typeof b) || !0 === b) {
      c = b, b = null;
    }
    this.timer && this.cancel();
    if (this.async || c) {
      const l = this;
      e || (e = "function" === typeof c);
      l.timer = requestAnimationFrame(function() {
        l.timer = 0;
        l.render(a, b, null, 1);
        c();
      });
      return e ? this : new Promise(function(m) {
        c = m;
      });
    }
  }
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.render");
  var g = this.length;
  if (!a && !this.apply) {
    return this.dom[0] || this.add(), this;
  }
  if (Array.isArray(a) || SUPPORT_REACTIVE$$module$tmp$config && a instanceof Observer$$module$tmp$array) {
    if (d = a.length, !d) {
      return this.remove(0, g);
    }
  } else {
    if (DEBUG$$module$tmp$config && SUPPORT_REACTIVE$$module$tmp$config && this.proxy) {
      throw Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
    }
    a = [a];
    d = 1;
  }
  const h = SUPPORT_KEYED$$module$tmp$config && this.key;
  e = SUPPORT_REACTIVE$$module$tmp$config && this.proxy;
  !g || h || this.recycle || (this.remove(0, g), g = 0);
  let f = g < d ? g : d, k = 0;
  if (k < f) {
    for (let l, m; k < f; k++) {
      l = this.dom[k];
      m = a[k];
      if (h && l[MIKADO_TPL_KEY$$module$tmp$config] !== m[h]) {
        return this.reconcile(a, b, k);
      }
      this.update(l, m, b, k, 1);
      e && !m[MIKADO_PROXY$$module$tmp$config] && (a[k] = apply_proxy$$module$tmp$mikado(this, l, m));
    }
  }
  if (k < d) {
    for (; k < d; k++) {
      g = a[k], this.add(g, b), !e || this.recycle && g[MIKADO_PROXY$$module$tmp$config] || (a[k] = apply_proxy$$module$tmp$mikado(this, this.dom[k], g));
    }
  } else {
    d < g && this.remove(d, g - d);
  }
  return this;
});
Mikado$$module$tmp$mikado.prototype.replace = function(a, b, c, d) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.replace");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a : a, a = this.dom[d]) : d = this.index(a));
  var e;
  if (SUPPORT_KEYED$$module$tmp$config && this.key) {
    var g = b[this.key];
    if (e = this.live[g]) {
      if (e !== a) {
        g = this.index(e);
        const h = g < d ? e : a, f = g < d ? a : e;
        let k = this.dom[g < d ? g + 1 : d + 1];
        this.dom[d] = e;
        this.dom[g] = a;
        k !== f ? this.root.insertBefore(h, f) : k = h;
        this.root.insertBefore(f, k);
      }
    } else {
      SUPPORT_POOLS$$module$tmp$config && this.pool && (e = this.pool_keyed.get(g)) && (this.pool_keyed.delete(g), this.checkout(a), this.dom[d] = e, a.replaceWith(e));
    }
  } else {
    this.recycle && (e = a);
  }
  e ? SUPPORT_REACTIVE$$module$tmp$config && this.fullproxy && b[MIKADO_PROXY$$module$tmp$config] || !this.apply || this.apply(b, c || this.state, d, e[MIKADO_TPL_PATH$$module$tmp$config] || create_path$$module$tmp$factory(e, this.factory[MIKADO_TPL_PATH$$module$tmp$config], SUPPORT_CACHE$$module$tmp$config && this.cache)) : (b = this.create(b, c, d, 1), (SUPPORT_KEYED$$module$tmp$config || SUPPORT_POOLS$$module$tmp$config) && (this.key || this.pool) && this.checkout(a), this.dom[d] = b, a.replaceWith(b));
  (d = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on.replace) && d(a, this);
  return this;
};
Mikado$$module$tmp$mikado.prototype.update = function(a, b, c, d, e) {
  if (!this.apply) {
    return DEBUG$$module$tmp$config && console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents."), this;
  }
  if (SUPPORT_REACTIVE$$module$tmp$config && this.fullproxy && b[MIKADO_PROXY$$module$tmp$config]) {
    return this;
  }
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.update");
  "undefined" === typeof d && ("number" === typeof a ? (d = 0 > a ? this.length + a - 1 : a, a = this.dom[d]) : d = this.index(a));
  this.apply(b, c || this.state, d, a[MIKADO_TPL_PATH$$module$tmp$config] || create_path$$module$tmp$factory(a, this.factory[MIKADO_TPL_PATH$$module$tmp$config], SUPPORT_CACHE$$module$tmp$config && this.cache));
  (b = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on.update) && b(a, this);
  return this;
};
SUPPORT_ASYNC$$module$tmp$config && (Mikado$$module$tmp$mikado.prototype.cancel = function() {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.cancel");
  cancelAnimationFrame(this.timer);
  this.timer = 0;
  return this;
});
Mikado$$module$tmp$mikado.prototype.create = function(a, b, c, d) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.create");
  const e = SUPPORT_KEYED$$module$tmp$config && this.key, g = e && a[e];
  let h;
  var f;
  let k, l;
  SUPPORT_POOLS$$module$tmp$config && this.pool && (e ? (f = this.pool_keyed) && (h = f.get(g)) && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("pool.out"), f.delete(g), l = 1) : (f = this.pool_shared) && f.length && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("pool.out"), h = f.pop()));
  h || (h = k = this.factory, k || (this.factory = h = k = construct$$module$tmp$factory(this, this.tpl.tpl, [], ""), finishFactory$$module$tmp$mikado(this)));
  let m;
  this.apply && (f = h[MIKADO_TPL_PATH$$module$tmp$config] || create_path$$module$tmp$factory(h, this.factory[MIKADO_TPL_PATH$$module$tmp$config], !!k || SUPPORT_CACHE$$module$tmp$config && this.cache), m = SUPPORT_CACHE$$module$tmp$config && k && this.cache && Array(f.length), this.apply(a, b || this.state, c, f, m));
  k && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("factory.clone"), h = k.cloneNode(!0), SUPPORT_CACHE$$module$tmp$config && m && (h[MIKADO_NODE_CACHE$$module$tmp$config] = m));
  e && (l || (h[MIKADO_TPL_KEY$$module$tmp$config] = g), d && (this.live[g] = h));
  (a = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on[k ? "create" : "recycle"]) && a(h, this);
  return h;
};
Mikado$$module$tmp$mikado.prototype.add = function(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.add");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = c < this.length) : "number" === typeof c ? (0 > c && (c += this.length), d = c < this.length) : c = this.length;
  a = this.create(a, b, c, 1);
  d ? (this.root.insertBefore(a, this.dom[c]), splice$$module$tmp$mikado(this.dom, this.length - 1, c, a), this.length++) : (this.root.appendChild(a), this.dom[this.length++] = a);
  (c = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on.insert) && c(a, this);
  return this;
};
function apply_proxy$$module$tmp$mikado(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("proxy.apply");
  return proxy_create$$module$tmp$proxy(c, b[MIKADO_TPL_PATH$$module$tmp$config] || create_path$$module$tmp$factory(b, a.factory[MIKADO_TPL_PATH$$module$tmp$config], SUPPORT_CACHE$$module$tmp$config && a.cache), a.proxy);
}
SUPPORT_KEYED$$module$tmp$config && !REACTIVE_ONLY$$module$tmp$config && (Mikado$$module$tmp$mikado.prototype.reconcile = function(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.reconcile");
  const d = this.dom, e = this.live, g = this.key;
  let h = a.length, f = d.length, k = f > h ? f : h, l = 0;
  for (c || (c = 0); c < k; c++) {
    var m = void 0;
    if (c < h) {
      var n = a[c], p = c >= f;
      let r, t, q, w;
      SUPPORT_REACTIVE$$module$tmp$config && this.proxy && (n[MIKADO_PROXY$$module$tmp$config] ? w = 1 : a[c] = apply_proxy$$module$tmp$mikado(this, d[c], n));
      if (!p && (r = d[c], t = n[g], q = r[MIKADO_TPL_KEY$$module$tmp$config], q === t)) {
        w || this.update(r, n, b, c, 1);
        continue;
      }
      if (p || !e[t]) {
        p || !this.pool ? (f++, k = f > h ? f : h, this.add(n, b, c)) : this.replace(r, n, b, c);
        continue;
      }
      let u, v;
      for (p = c + 1; p < k; p++) {
        if (!u && p < f && d[p][MIKADO_TPL_KEY$$module$tmp$config] === t && (u = p + 1), !v && p < h && a[p][g] === q && (v = p + 1), u && v) {
          u >= v + l ? (m = d[u - 1], this.root.insertBefore(m, r), w || this.update(m, n, b, c, 1), u === v ? (1 < p - c && this.root.insertBefore(r, d[u]), d[c] = d[p], d[p] = r, DEBUG$$module$tmp$config && (r || console.error("reconcile.error 1")), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.reconcile.steps")) : (DEBUG$$module$tmp$config && u - 1 === c && console.error("reconcile.error 2"), splice$$module$tmp$mikado(d, u - 1, c), l++)) : (n = v - 1 + l, this.root.insertBefore(r, 
          d[n] || null), DEBUG$$module$tmp$config && (n > f ? f : n) - 1 === c && console.error("reconcile.error 3"), splice$$module$tmp$mikado(d, c, (n > f ? f : n) - 1), l--, c--);
          PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.reconcile.steps");
          m = 1;
          break;
        }
      }
    }
    m || (this.remove(c), f--, k = f > h ? f : h, c--);
  }
  return this;
});
function splice$$module$tmp$mikado(a, b, c, d) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("splice");
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
REACTIVE_ONLY$$module$tmp$config || (Mikado$$module$tmp$mikado.prototype.append = function(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.append");
  let d;
  "number" === typeof b ? (c = 0 > b ? this.length + b : b, b = null, d = 1) : "number" === typeof c && (0 > c && (c += this.length), d = 1);
  const e = a.length;
  for (let g = 0; g < e; g++) {
    this.add(a[g], b, d ? c++ : null);
  }
  return this;
}, Mikado$$module$tmp$mikado.prototype.clear = function() {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.clear");
  this.length && this.remove(0, this.length);
  return this;
});
Mikado$$module$tmp$mikado.prototype.remove = function(a, b) {
  let c = this.length;
  c && a && ("number" !== typeof a ? a = this.index(a) : 0 > a && (a = c + a));
  if (!c || a >= c) {
    return this;
  }
  b ? 0 > b && (a -= b + 1, 0 > a && (a = 0), b *= -1) : b = 1;
  !a && b >= c ? (a = this.dom, b = a.length, this.root.textContent = "", this.root[MIKADO_DOM$$module$tmp$config] = this.dom = [], c = 0) : (a = this.dom.splice(a, b), c -= b);
  const d = SUPPORT_POOLS$$module$tmp$config && this.pool && (!SUPPORT_KEYED$$module$tmp$config || !this.key), e = (SUPPORT_KEYED$$module$tmp$config || SUPPORT_POOLS$$module$tmp$config) && (this.key || this.pool), g = SUPPORT_CALLBACKS$$module$tmp$config && this.on && this.on.remove;
  SUPPORT_POOLS$$module$tmp$config && SUPPORT_KEYED$$module$tmp$config && this.pool && !0 !== this.pool && b >= this.pool && this.key && this.pool_keyed.clear();
  for (let h = 0, f; h < b; h++) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.remove"), f = a[d ? b - h - 1 : h], c && f.remove(), e && this.checkout(f), g && g(f, this);
  }
  this.length = c;
  return this;
};
Mikado$$module$tmp$mikado.prototype.index = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.index");
  return this.dom.indexOf(a);
};
Mikado$$module$tmp$mikado.prototype.node = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.node");
  return this.dom[a];
};
if (SUPPORT_KEYED$$module$tmp$config || SUPPORT_POOLS$$module$tmp$config) {
  Mikado$$module$tmp$mikado.prototype.checkout = function(a) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.checkout");
    if (SUPPORT_KEYED$$module$tmp$config && this.key) {
      var b = a[MIKADO_TPL_KEY$$module$tmp$config];
      this.live[b] = null;
    }
    if (SUPPORT_POOLS$$module$tmp$config && this.pool) {
      if (b) {
        PROFILER$$module$tmp$config && tick$$module$tmp$profiler("pool.in"), this.pool_keyed.set(b, a), !0 !== this.pool && this.pool_keyed.size > this.pool && (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("pool.resize"), this.pool_keyed.delete(this.pool_keyed.keys().next().value));
      } else {
        if (b = this.pool_shared.length, !0 === this.pool || b < this.pool) {
          PROFILER$$module$tmp$config && tick$$module$tmp$profiler("pool.in"), this.pool_shared[b] = a;
        }
      }
    }
  };
}
SUPPORT_POOLS$$module$tmp$config && (Mikado$$module$tmp$mikado.prototype.flush = function() {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.flush");
  this.pool_shared = [];
  SUPPORT_KEYED$$module$tmp$config && (this.pool_keyed = new Map());
  return this;
});
Mikado$$module$tmp$mikado.prototype.destroy = function() {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("view.destroy");
  for (let a = 0, b; a < this.inc.length; a++) {
    b = this.inc[a], includes$$module$tmp$mikado[b.name] || b.destroy();
  }
  SUPPORT_KEYED$$module$tmp$config && this.key && (this.root && (this.root[MIKADO_LIVE_POOL$$module$tmp$config] = null), this.live = null);
  this.root && (this.root[MIKADO_DOM$$module$tmp$config] = this.root[MIKADO_CLASS$$module$tmp$config] = null);
  this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;
  SUPPORT_POOLS$$module$tmp$config && (this.pool_shared = null, SUPPORT_KEYED$$module$tmp$config && (this.pool_keyed = null));
  SUPPORT_CALLBACKS$$module$tmp$config && (this.on = null);
  SUPPORT_REACTIVE$$module$tmp$config && (this.proxy = null);
};
var module$tmp$mikado = {};
module$tmp$mikado.apply_proxy = apply_proxy$$module$tmp$mikado;
module$tmp$mikado.default = Mikado$$module$tmp$mikado;
module$tmp$mikado.includes = includes$$module$tmp$mikado;
module$tmp$mikado.once = once$$module$tmp$mikado;
module$tmp$mikado.register = register$$module$tmp$mikado;
module$tmp$mikado.unregister = unregister$$module$tmp$mikado;
const proto$$module$tmp$array = Array.prototype, proxy$$module$tmp$array = window.Proxy;
let skip$$module$tmp$array = !1;
function debug$$module$tmp$array(a) {
  if (!a) {
    throw Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
  }
}
function Observer$$module$tmp$array(a) {
  if (a instanceof Observer$$module$tmp$array) {
    return a;
  }
  if (!(this instanceof Observer$$module$tmp$array)) {
    return new Observer$$module$tmp$array(a);
  }
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.create");
  this.mikado = null;
  const b = a ? a.length : 0;
  if (proxy$$module$tmp$array) {
    if (b) {
      for (let c = 0; c < b; c++) {
        this[c] = a[c];
      }
    }
    this.length = b;
    this.proto = {splice:proto$$module$tmp$array.splice.bind(this), pop:proto$$module$tmp$array.pop.bind(this), shift:proto$$module$tmp$array.shift.bind(this), unshift:proto$$module$tmp$array.unshift.bind(this), push:proto$$module$tmp$array.push.bind(this)};
    return new Proxy(this, handler$$module$tmp$array);
  }
  this.proto = a || [];
  for (a = 0; a <= b; a++) {
    this.define(a);
  }
  this.define("length");
}
Observer$$module$tmp$array.prototype.mount = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.mount");
  this.mikado !== a && (this.mikado && a.mount(this.mikado.root), this.mikado = a);
  return this;
};
Observer$$module$tmp$array.prototype.define = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.define");
  Object.defineProperty(this, a, {get:function() {
    return this.proto[a];
  }, set:function(b) {
    "number" === typeof a && (a === this.length && this.define(a + 1), handler$$module$tmp$array.set(this, a, b));
  }});
  return this;
};
const handler$$module$tmp$array = {set:function(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.write");
  let d;
  if ("number" === typeof b) {
    d = !0;
  } else {
    var e = parseInt(b, 10);
    b === "" + e && (d = !0);
  }
  e = a.mikado;
  if (!skip$$module$tmp$array) {
    skip$$module$tmp$array = !0;
    if (e) {
      var g = a.length;
      if (d) {
        DEBUG$$module$tmp$config && debug$$module$tmp$array(e);
        const h = e.length;
        g !== h && (a.length = h);
        b >= h ? (e.add(c), a.length++) : b < h && (g = e.dom[b], e.recycle || SUPPORT_KEYED$$module$tmp$config && e.key && g[MIKADO_TPL_KEY$$module$tmp$config] === c[e.key] ? e.update(g, c, null, b) : e.replace(g, c, null, b));
      } else {
        "length" === b && c < g && e.remove(c, g - c);
      }
    }
    skip$$module$tmp$array = !1;
  }
  !d || !e.proxy || e.recycle && c[MIKADO_PROXY$$module$tmp$config] || (c = apply_proxy$$module$tmp$mikado(e, e.dom[b], c));
  (proxy$$module$tmp$array ? a : a.proto)[b] = c;
  return !0;
}};
PROFILER$$module$tmp$config && (handler$$module$tmp$array.get = function(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.read");
  return a[b];
});
Observer$$module$tmp$array.prototype.set = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.set");
  const b = SUPPORT_KEYED$$module$tmp$config && this.mikado.key;
  b && (skip$$module$tmp$array = !0);
  if (!b && this.mikado.recycle) {
    const c = this.length;
    for (let d = 0; d < c; d++) {
      this[d] = a[d];
    }
    c > a.length && this.splice(c);
  } else {
    this.splice(), this.concat(a);
  }
  b && (this.mikado.render(this), skip$$module$tmp$array = !1);
  return this;
};
Observer$$module$tmp$array.prototype.splice = function(a, b, c) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.splice");
  DEBUG$$module$tmp$config && debug$$module$tmp$array(this.mikado);
  skip$$module$tmp$array = !0;
  a || (a = 0);
  "undefined" === typeof b && (b = this.length - a, 0 > b && (b = 0));
  b && this.mikado.remove(a, b);
  b = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);
  c && this.mikado.add(c, a);
  skip$$module$tmp$array = !1;
  return b;
};
Observer$$module$tmp$array.prototype.push = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.push");
  DEBUG$$module$tmp$config && debug$$module$tmp$array(this.mikado);
  skip$$module$tmp$array = !0;
  this.mikado.add(a);
  this[this.length] = a;
  proxy$$module$tmp$array && this.length++;
  skip$$module$tmp$array = !1;
};
Observer$$module$tmp$array.prototype.unshift = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.unshift");
  DEBUG$$module$tmp$config && debug$$module$tmp$array(this.mikado);
  skip$$module$tmp$array = !0;
  this.mikado.add(a, 0);
  this.proto.unshift(a);
  skip$$module$tmp$array = !1;
};
Observer$$module$tmp$array.prototype.pop = function() {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.pop");
  DEBUG$$module$tmp$config && debug$$module$tmp$array(this.mikado);
  skip$$module$tmp$array = !0;
  this.mikado.remove(this.length - 1);
  const a = this.proto.pop();
  skip$$module$tmp$array = !1;
  return a;
};
Observer$$module$tmp$array.prototype.shift = function() {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.shift");
  DEBUG$$module$tmp$config && debug$$module$tmp$array(this.mikado);
  skip$$module$tmp$array = !0;
  this.mikado.remove(0);
  const a = this.proto.shift();
  skip$$module$tmp$array = !1;
  return a;
};
Observer$$module$tmp$array.prototype.concat = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.concat");
  const b = a.length;
  for (let c = 0; c < b; c++) {
    this.push(a[c]);
  }
  return this;
};
Observer$$module$tmp$array.prototype.sort = proto$$module$tmp$array.sort;
Observer$$module$tmp$array.prototype.reverse = proto$$module$tmp$array.reverse;
Observer$$module$tmp$array.prototype.slice = proto$$module$tmp$array.slice;
Observer$$module$tmp$array.prototype.map = function(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.map");
  b && (a = a.bind(this));
  for (let c = 0, d = this.length; c < d; c++) {
    this[c] = a(this[c]);
  }
  return this;
};
Observer$$module$tmp$array.prototype.filter = function(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.filter");
  b && (a = a.bind(this));
  let c, d;
  for (let e = 0, g = this.length; e < g; e++) {
    a(this[e]) ? d && (this.splice(c, d), g -= d, e -= d, d = 0) : d ? d++ : (c = e, d = 1);
  }
  d && this.splice(c, d);
  return this;
};
Observer$$module$tmp$array.prototype.indexOf = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.indexOf");
  for (let b = 0, c = this.length; b < c; b++) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
Observer$$module$tmp$array.prototype.lastIndexOf = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.lastIndexOf");
  for (let b = this.length - 1; 0 <= b; b--) {
    if (this[b] === a) {
      return b;
    }
  }
  return -1;
};
Observer$$module$tmp$array.prototype.includes = proto$$module$tmp$array.includes;
Observer$$module$tmp$array.prototype.forEach = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.forEach");
  for (let b = 0, c = this.length; b < c; b++) {
    a(this[b]);
  }
  return this;
};
Observer$$module$tmp$array.prototype.swap = function(a, b) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.swap");
  const c = this[b];
  this[b] = this[a];
  this[a] = c;
  return this;
};
Observer$$module$tmp$array.prototype.transaction = function(a) {
  PROFILER$$module$tmp$config && tick$$module$tmp$profiler("observer.transaction");
  DEBUG$$module$tmp$config && debug$$module$tmp$array(this.mikado);
  skip$$module$tmp$array = !0;
  a();
  skip$$module$tmp$array = !1;
  const b = this.mikado, c = b.fullproxy;
  b.fullproxy = 0;
  b.async ? b.render(this).then(function() {
    b.fullproxy = c;
  }) : (b.render(this), b.fullproxy = c);
};
var module$tmp$array = {};
module$tmp$array.default = Observer$$module$tmp$array;
let MikadoOptions$$module$tmp$type, Template$$module$tmp$type, TemplateDOM$$module$tmp$type, EventOptions$$module$tmp$type, NodeCache$$module$tmp$type, ProxyHandler$$module$tmp$type, ProxyCache$$module$tmp$type, MikadoCallbacks$$module$tmp$type;
var module$tmp$type = {};
const escape_div$$module$tmp$sanitize = document.createElement("div"), escape_text$$module$tmp$sanitize = document.createTextNode(""), sanitizer_div$$module$tmp$sanitize = document.createElement("div");
"light" !== RELEASE$$module$tmp$config && "light.module" !== RELEASE$$module$tmp$config && escape_div$$module$tmp$sanitize.appendChild(escape_text$$module$tmp$sanitize);
function escape$$module$tmp$sanitize(a) {
  escape_div$$module$tmp$sanitize._text !== a && (escape_text$$module$tmp$sanitize.nodeValue = a, escape_div$$module$tmp$sanitize._html = escape_div$$module$tmp$sanitize.innerHTML, escape_div$$module$tmp$sanitize._text = a);
  return escape_div$$module$tmp$sanitize._html;
}
function sanitize$$module$tmp$sanitize(a) {
  sanitizer_div$$module$tmp$sanitize._html !== a && (sanitizer_div$$module$tmp$sanitize.innerHTML = a, sanitizer_div$$module$tmp$sanitize._html = a, sanitizer_div$$module$tmp$sanitize._text = sanitizer_div$$module$tmp$sanitize.textContent);
  return sanitizer_div$$module$tmp$sanitize._text;
}
var module$tmp$sanitize = {};
module$tmp$sanitize.escape = escape$$module$tmp$sanitize;
module$tmp$sanitize.sanitize = sanitize$$module$tmp$sanitize;
SUPPORT_DOM_HELPERS$$module$tmp$config && (Mikado$$module$tmp$mikado.prototype.move = Mikado$$module$tmp$mikado.prototype.moveTo = function(a, b) {
  let c;
  "number" === typeof a ? (c = a, a = this.dom[c]) : c = this.index(a);
  0 > b && (b = this.length + b - 1);
  c !== b && this.shift(a, b - c);
  return this;
}, Mikado$$module$tmp$mikado.prototype.shift = Mikado$$module$tmp$mikado.prototype.shiftBy = function(a, b) {
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
    const e = this.dom[b], g = d && 1 < c - b || !d && 1 < b - c;
    this.root.insertBefore(a, d ? e : this.dom[b + 1] || null);
    if (g) {
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
}, Mikado$$module$tmp$mikado.prototype.up = function(a, b) {
  (!b || 0 < b) && this.shift(a, -(b || 1));
  return this;
}, Mikado$$module$tmp$mikado.prototype.down = function(a, b) {
  (!b || 0 < b) && this.shift(a, b || 1);
  return this;
}, Mikado$$module$tmp$mikado.prototype.first = function(a) {
  return this.shift(a, -this.length);
}, Mikado$$module$tmp$mikado.prototype.last = function(a) {
  return this.shift(a, this.length);
}, Mikado$$module$tmp$mikado.prototype.before = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a + 1 && (0 > b && (b = this.length + b, 0 > a && b--), 0 > a && (a = this.length + a - 1), this.shift(a, b - a - 1));
  return this;
}, Mikado$$module$tmp$mikado.prototype.after = function(a, b) {
  "number" !== typeof a && (a = this.index(a));
  "number" !== typeof b && (b = this.index(b));
  b !== a - 1 && (0 > b && (b = this.length + b - 2, 0 > a && b++), 0 > a && (a = this.length + a - 1), this.shift(a, b - a + 1));
  return this;
}, Mikado$$module$tmp$mikado.prototype.swap = function(a, b) {
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
});
var module$tmp$helper = {};
const event_types$$module$tmp$compile = SUPPORT_EVENTS$$module$tmp$config && {tap:1, change:1, click:1, dblclick:1, input:1, keydown:1, keypress:1, keyup:1, mousedown:1, mouseenter:1, mouseleave:1, mousemove:1, mouseout:1, mouseover:1, mouseup:1, mousewheel:1, touchstart:1, touchmove:1, touchend:1, touchcancel:1, reset:1, select:1, submit:1, toggle:1, blur:1, error:1, focus:1, load:1, resize:1, scroll:1};
function replaceComments$$module$tmp$compile(a) {
  return a.replace(/\x3c!--(.*?)--\x3e/g, "");
}
function strip$$module$tmp$compile(a) {
  return a.replace(/({{|}})/g, "").trim();
}
let message$$module$tmp$compile = 0, counter$$module$tmp$compile = 0;
function compile$$module$tmp$compile(a, b, c, d, e, g) {
  DEBUG$$module$tmp$config && !message$$module$tmp$compile && (message$$module$tmp$compile = 1, console.info("If this page has set a Content-Security-Policy (CSP) header field, using the inline compiler has disadvantage when not configure \"script-src 'unsafe-eval'\". It is recommended to use the Mikado native compiler, which is CSP-friendly and also can optimize your templates more powerful."));
  if (b) {
    return new Promise(function(t) {
      const q = compile$$module$tmp$compile(a);
      "function" === typeof b && b(q);
      t(q);
    });
  }
  e || (d = [], c = [d], d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1});
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
      if (DEBUG$$module$tmp$config && !a) {
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
      l && l.trim() && (l.includes("{{#") ? handle_value$$module$tmp$compile(f, "html", l, !1, null, e, c, d) : (e.count++, handle_value$$module$tmp$compile(f, "text", l, !1, null, e, c, d)));
    }
    if (!k) {
      return l && l.trim() ? f : null;
    }
  }
  k && (f.tag = k);
  if ((l = a.attributes) && l.length) {
    k = {};
    for (m = 0; m < l.length; m++) {
      let t = l[m].nodeName, q = a.getAttribute(t);
      "include" === t && (t = "inc");
      k[t] = q;
    }
    l = k;
    for (var n in l) {
      k = l[n];
      var p = void 0, r = void 0;
      switch(n) {
        case "class":
        case "style":
          p = n;
          break;
        case "include":
          n = "inc";
        case "inc":
          p = n;
          break;
        case "if":
          p = n;
          break;
        case "foreach":
          p = n = "for";
          break;
        case "js":
          break;
        case "key":
          h.key = strip$$module$tmp$compile(k).replace("data.", "");
          break;
        case "cache":
          break;
        default:
          SUPPORT_EVENTS$$module$tmp$config && event_types$$module$tmp$compile[n] ? r = f.event || (f.event = {}) : (g || "id" !== n && "name" !== n || h.name || /{{[\s\S]+}}/.test(k) || (h.name = k), r = f.attr || (f.attr = {})), p = n;
      }
      p && handle_value$$module$tmp$compile(r || f, p, k, !!r, l, e, c, d);
    }
  }
  n = (a.content || a).childNodes;
  p = n.length;
  e.included && (e.included = !1, e.inc++, d = [], (f.for || f.if) && c.unshift(d), f.child || (f.child = f.text ? {text:f.text} : f.html ? {html:f.html} : null), p ? (d.root = f, d.inc = f.child || (f.child = []), d.index = e = {current:-1, count:0, last:-1, inc:0, included:!1}) : d.inc = f.inc, delete f.for, delete f.if, delete f.text, delete f.html);
  if (p) {
    for (let t = 0, q; t < p; t++) {
      if (q = n[t], 8 !== q.nodeType && (e.count++, r = compile$$module$tmp$compile(q, null, c, d, e, 1))) {
        1 !== p || 3 !== q.nodeType && r.text || f.js && r.js ? (r.text || r.tag) && (f.child || (f.child = [])).push(r) : (r.js && (f.js = r.js), r.html && (f.html = r.html), r.text && (f.text = r.text));
      }
    }
    f.child && 1 === f.child.length && (f.child = f.child[0]);
  }
  if (!g) {
    h.name || (h.name = "tpl-" + counter$$module$tmp$compile++);
    if (SUPPORT_WEB_COMPONENTS$$module$tmp$config && "COMPONENT" === f.tag) {
      d = f.child;
      e = [];
      for (let t = 0, q; t < d.length; t++) {
        q = d[t], "TEMPLATE" === q.tag ? (d = g = q.child.length ? q.child[0] : q.child, q.name && (g.name = q.name), q.id && (g.id = q.id), q.key && (g.key = q.key), q.cache && (g.cache = q.cache)) : e.push(q);
      }
      h.tpl = d;
      h.cmp = e;
    }
    if (1 === c.length && 0 === c[0].length) {
      h.fn = null;
    } else {
      for (d = 0; d < c.length; d++) {
        c[d].root && (c[d].root.inc = c[d].inc[0], delete c[d].root.child), c[d] = c[d].length ? Function("data", "state", "index", "_p", "_x", '"use strict";let _o,_v,_c;' + c[d].join(";")) : null;
      }
      h.fn = c.length ? c : null;
    }
  }
  return h;
}
function handle_value$$module$tmp$compile(a, b, c, d, e, g, h, f) {
  if (/{{[\s\S]+}}/.test(c)) {
    h = SUPPORT_REACTIVE$$module$tmp$config && /{{([!?#]+)?=/.test(c);
    let k = /{{!?\?/.test(c), l = /{{\??!/.test(c);
    if (SUPPORT_REACTIVE$$module$tmp$config && h) {
      if (k || l) {
        c = c.replace(/{{[!?]+/g, "{{");
      }
      h = c.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
    }
    c = c.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").replace(/\s+/g, " ");
    c = ("'" + c + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "").replace(/'\)\+''\+\('/g, "").replace(/\+''\+/g, "+").replace(/'(\s+)?\+(\s+)?'/g, "").replace(/"(\s+)?\+(\s+)?"/g, "").replace(/^\(([^ ]+)\)$/g, "$1").trim();
    k && (c = "(" + (c + "||" + c + "===0?" + c + ":'')"));
    "text" !== b && "style" !== b || !a.tag || g.count++;
    g.count !== g.last && (g.current++, g.last = g.count, f.push("_o=_p[" + g.current + "]"), f.push("_x&&(_x[" + g.current + "]=_c={})"));
    f.push("_v=" + c);
    d ? f.push('_c&&(_c["_a' + b + '"]=_v);if(!_o.c||_o.c["_a' + b + '"]!==_v){_o.c&&(_o.c["_a' + b + '"]=_v);_o.n[_v===false?"removeAttribute":"setAttribute"]("' + b + '",_v)}') : "class" === b ? f.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}") : "style" === b ? f.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}") : "html" === b ? f.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}") : "text" === 
    b && f.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
    a[b] = SUPPORT_REACTIVE$$module$tmp$config && h ? [h] : [""];
  } else {
    a[b] = c;
  }
  "for" !== b && "if" !== b && "inc" !== b || d || g.included || (g.count !== g.last && (g.current++, g.last = g.count, f.push("_o=_p[" + g.current + "]")), a = e.foreach ? e.foreach.trim() : "data", b = g.inc, e.if ? f.push("this.inc[" + b + "].mount(_o.n)[" + e.if.trim() + '?"render":"clear"](' + a + ",state)") : e.foreach ? f.push("this.inc[" + b + "].mount(_o.n).render(" + a + ",state)") : f.push("this.inc[" + b + "].mount(_o.n).render(data,state)"), g.included = !0);
}
var module$tmp$compile = {};
module$tmp$compile.default = compile$$module$tmp$compile;
const regex_css$$module$tmp$cache = /[^;:]+/g, regex_class$$module$tmp$cache = / +/;
function setText$$module$tmp$cache(a, b) {
  var c = a[MIKADO_NODE_CACHE$$module$tmp$config];
  let d;
  c ? d = c._t : a[MIKADO_NODE_CACHE$$module$tmp$config] = c = {};
  d !== b ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.text"), c._t = b, c._h = null, (c = a.firstChild) ? c.nodeValue = b : a.appendChild(document.createTextNode(b))) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function getText$$module$tmp$cache(a) {
  let b = a[MIKADO_NODE_CACHE$$module$tmp$config], c;
  b ? c = b._t : a[MIKADO_NODE_CACHE$$module$tmp$config] = b = {};
  "string" !== typeof c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.text"), a = a.firstChild, b._t = c = a ? a.nodeValue : "") : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  return c;
}
function setAttribute$$module$tmp$cache(a, b, c) {
  let d = a[MIKADO_NODE_CACHE$$module$tmp$config];
  d || (a[MIKADO_NODE_CACHE$$module$tmp$config] = d = {});
  if ("object" === typeof b) {
    for (let e in b) {
      _setAttribute$$module$tmp$cache(a, e, b[e], d);
    }
  } else {
    _setAttribute$$module$tmp$cache(a, b, c, d);
  }
}
function _setAttribute$$module$tmp$cache(a, b, c, d) {
  d["_a" + b] !== c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.attr"), d["_a" + b] = c, !1 === c ? a.removeAttribute(b) : a.setAttribute(b, c)) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function removeAttribute$$module$tmp$cache(a, b) {
  let c = a[MIKADO_NODE_CACHE$$module$tmp$config];
  c || (a[MIKADO_NODE_CACHE$$module$tmp$config] = c = {});
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      _removeAttribute$$module$tmp$cache(a, b[d], c);
    }
  } else {
    _removeAttribute$$module$tmp$cache(a, b, c);
  }
}
function _removeAttribute$$module$tmp$cache(a, b, c) {
  !1 !== c["_a" + b] ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.attr"), c["_a" + b] = !1, a.removeAttribute(b)) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function getAttribute$$module$tmp$cache(a, b) {
  let c = a[MIKADO_NODE_CACHE$$module$tmp$config], d;
  c ? d = c["_a" + b] : a[MIKADO_NODE_CACHE$$module$tmp$config] = c = {};
  "string" !== typeof d ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.attr"), d = a.getAttribute(b), c["_a" + b] = d) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  return d;
}
function hasAttribute$$module$tmp$cache(a, b) {
  a = getAttribute$$module$tmp$cache(a, b);
  return !(!a && "" !== a);
}
function setClass$$module$tmp$cache(a, b) {
  let c = a[MIKADO_NODE_CACHE$$module$tmp$config], d;
  c ? d = c._c : a[MIKADO_NODE_CACHE$$module$tmp$config] = c = {};
  "object" === typeof b && (b = b.join(" "));
  d !== b ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class"), c._c = b, a.className = b) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function getClass$$module$tmp$cache(a) {
  let b = a[MIKADO_NODE_CACHE$$module$tmp$config], c;
  b ? c = b._c : a[MIKADO_NODE_CACHE$$module$tmp$config] = b = {};
  "string" !== typeof c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class"), b._c = c = a.className) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  c = c.split(regex_class$$module$tmp$cache);
  return "" === c[0] ? [] : c;
}
function transformClassCache$$module$tmp$cache(a) {
  let b = a[MIKADO_NODE_CACHE$$module$tmp$config], c;
  b ? c = b._c : a[MIKADO_NODE_CACHE$$module$tmp$config] = b = {};
  if (!c) {
    return b._c = {};
  }
  if ("string" === typeof c) {
    PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.transform");
    a = c.trim().split(regex_class$$module$tmp$cache);
    b._c = c = {};
    for (let d = 0, e; d < a.length; d++) {
      (e = a[d]) && (c[a[d]] = 1);
    }
  }
  return c;
}
function addClass$$module$tmp$cache(a, b) {
  const c = transformClassCache$$module$tmp$cache(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      _addClass$$module$tmp$cache(a, b[d], c);
    }
  } else {
    _addClass$$module$tmp$cache(a, b, c);
  }
}
function _addClass$$module$tmp$cache(a, b, c) {
  c[b] ? PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match") : (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class"), c[b] = 1, a.classList.add(b));
}
function removeClass$$module$tmp$cache(a, b) {
  const c = transformClassCache$$module$tmp$cache(a);
  if ("object" === typeof b) {
    for (let d = 0; d < b.length; d++) {
      _removeClass$$module$tmp$cache(a, b[d], c);
    }
  } else {
    _removeClass$$module$tmp$cache(a, b, c);
  }
}
function _removeClass$$module$tmp$cache(a, b, c) {
  0 !== c[b] ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class"), c[b] = 0, a.classList.remove(b)) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function hasClass$$module$tmp$cache(a, b) {
  const c = transformClassCache$$module$tmp$cache(a);
  let d = c[b];
  "number" !== typeof d ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class"), c[b] = d = a.classList.contains(b) ? 1 : 0) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  return !!d;
}
function toggleClass$$module$tmp$cache(a, b, c) {
  const d = transformClassCache$$module$tmp$cache(a);
  if ("object" === typeof b) {
    if (b.constructor === Array) {
      for (var e = 0; e < b.length; e++) {
        _toggleClass$$module$tmp$cache(a, b[e], c, d);
      }
    } else {
      for (e in b) {
        _toggleClass$$module$tmp$cache(a, e, b[e], d);
      }
    }
  } else {
    _toggleClass$$module$tmp$cache(a, b, c, d);
  }
}
function _toggleClass$$module$tmp$cache(a, b, c, d) {
  let e = !!d[b];
  c = "undefined" === typeof c ? !e : !!c;
  e !== c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.class"), d[b] = c ? 1 : 0, c ? a.classList.add(b) : a.classList.remove(b)) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function setCss$$module$tmp$cache(a, b) {
  let c = a[MIKADO_NODE_CACHE$$module$tmp$config], d;
  c ? d = c._s : a[MIKADO_NODE_CACHE$$module$tmp$config] = c = {};
  d !== b ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.style"), c._s = b, a.style.cssText = b) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function getCss$$module$tmp$cache(a) {
  let b = a[MIKADO_NODE_CACHE$$module$tmp$config], c;
  b ? c = b._s : a[MIKADO_NODE_CACHE$$module$tmp$config] = b = {};
  "string" !== typeof c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.css"), b._s = c = a.style.cssText) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  return c;
}
function transformStyleCache$$module$tmp$cache(a) {
  var b = a[MIKADO_NODE_CACHE$$module$tmp$config];
  let c;
  b ? c = b._s : a[MIKADO_NODE_CACHE$$module$tmp$config] = b = {};
  if (!c) {
    return b._s = {};
  }
  if ("string" === typeof c) {
    for (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.transform"), a = c.match(regex_css$$module$tmp$cache), b._s = c = {}, b = 0; b < a.length; b += 2) {
      c[a[b].trim()] = a[b + 1].trim();
    }
  }
  return c;
}
function setStyle$$module$tmp$cache(a, b, c) {
  const d = transformStyleCache$$module$tmp$cache(a), e = a.style;
  if ("object" === typeof b) {
    for (const g in b) {
      _setStyle$$module$tmp$cache(a, g, b[g], e, d);
    }
  } else {
    _setStyle$$module$tmp$cache(a, b, c, e, d);
  }
}
function _setStyle$$module$tmp$cache(a, b, c, d, e) {
  e[b] !== c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.style"), e[b] = c, (d || a.style).setProperty(b, c)) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function getStyle$$module$tmp$cache(a, b) {
  const c = transformStyleCache$$module$tmp$cache(a);
  let d = c[b];
  "string" !== typeof d ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.style"), c[b] = d = a.style.getPropertyValue(b)) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  return d;
}
function setHtml$$module$tmp$cache(a, b) {
  let c = a[MIKADO_NODE_CACHE$$module$tmp$config], d;
  c ? d = c._h : a[MIKADO_NODE_CACHE$$module$tmp$config] = c = {};
  d !== b ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.html"), a.innerHTML = b, c._h = b, c._t = null) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
}
function getHtml$$module$tmp$cache(a) {
  let b = a[MIKADO_NODE_CACHE$$module$tmp$config], c;
  b ? c = b._h || b._t : a[MIKADO_NODE_CACHE$$module$tmp$config] = b = {};
  "string" !== typeof c ? (PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.miss"), PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.html"), b._h = c = a.innerHTML) : PROFILER$$module$tmp$config && tick$$module$tmp$profiler("cache.match");
  return c;
}
var module$tmp$cache = {};
module$tmp$cache.addClass = addClass$$module$tmp$cache;
module$tmp$cache.getAttribute = getAttribute$$module$tmp$cache;
module$tmp$cache.getClass = getClass$$module$tmp$cache;
module$tmp$cache.getCss = getCss$$module$tmp$cache;
module$tmp$cache.getHtml = getHtml$$module$tmp$cache;
module$tmp$cache.getStyle = getStyle$$module$tmp$cache;
module$tmp$cache.getText = getText$$module$tmp$cache;
module$tmp$cache.hasAttribute = hasAttribute$$module$tmp$cache;
module$tmp$cache.hasClass = hasClass$$module$tmp$cache;
module$tmp$cache.removeAttribute = removeAttribute$$module$tmp$cache;
module$tmp$cache.removeClass = removeClass$$module$tmp$cache;
module$tmp$cache.setAttribute = setAttribute$$module$tmp$cache;
module$tmp$cache.setClass = setClass$$module$tmp$cache;
module$tmp$cache.setCss = setCss$$module$tmp$cache;
module$tmp$cache.setHtml = setHtml$$module$tmp$cache;
module$tmp$cache.setStyle = setStyle$$module$tmp$cache;
module$tmp$cache.setText = setText$$module$tmp$cache;
module$tmp$cache.toggleClass = toggleClass$$module$tmp$cache;
Mikado$$module$tmp$mikado.once = once$$module$tmp$mikado;
Mikado$$module$tmp$mikado.register = register$$module$tmp$mikado;
Mikado$$module$tmp$mikado.unregister = unregister$$module$tmp$mikado;
SUPPORT_COMPILE$$module$tmp$config && (Mikado$$module$tmp$mikado.compile = compile$$module$tmp$compile);
SUPPORT_CACHE_HELPERS$$module$tmp$config && (Mikado$$module$tmp$mikado.setText = setText$$module$tmp$cache, Mikado$$module$tmp$mikado.getText = getText$$module$tmp$cache, Mikado$$module$tmp$mikado.setHtml = setHtml$$module$tmp$cache, Mikado$$module$tmp$mikado.getHtml = getHtml$$module$tmp$cache, Mikado$$module$tmp$mikado.setClass = setClass$$module$tmp$cache, Mikado$$module$tmp$mikado.getClass = getClass$$module$tmp$cache, Mikado$$module$tmp$mikado.hasClass = hasClass$$module$tmp$cache, Mikado$$module$tmp$mikado.toggleClass = 
toggleClass$$module$tmp$cache, Mikado$$module$tmp$mikado.removeClass = removeClass$$module$tmp$cache, Mikado$$module$tmp$mikado.addClass = addClass$$module$tmp$cache, Mikado$$module$tmp$mikado.setAttribute = setAttribute$$module$tmp$cache, Mikado$$module$tmp$mikado.getAttribute = getAttribute$$module$tmp$cache, Mikado$$module$tmp$mikado.hasAttribute = hasAttribute$$module$tmp$cache, Mikado$$module$tmp$mikado.removeAttribute = removeAttribute$$module$tmp$cache, Mikado$$module$tmp$mikado.setCss = setCss$$module$tmp$cache, 
Mikado$$module$tmp$mikado.getCss = getCss$$module$tmp$cache, Mikado$$module$tmp$mikado.getStyle = getStyle$$module$tmp$cache, Mikado$$module$tmp$mikado.setStyle = setStyle$$module$tmp$cache);
"light" !== RELEASE$$module$tmp$config && "light.module" !== RELEASE$$module$tmp$config && (Mikado$$module$tmp$mikado.escape = escape$$module$tmp$sanitize, Mikado$$module$tmp$mikado.sanitize = sanitize$$module$tmp$sanitize);
SUPPORT_EVENTS$$module$tmp$config && (Mikado$$module$tmp$mikado.prototype.route = Mikado$$module$tmp$mikado.route = route$$module$tmp$event, Mikado$$module$tmp$mikado.prototype.dispatch = Mikado$$module$tmp$mikado.dispatch = dispatch$$module$tmp$event, Mikado$$module$tmp$mikado.prototype.listen = Mikado$$module$tmp$mikado.listen = listen$$module$tmp$event, Mikado$$module$tmp$mikado.prototype.unlisten = Mikado$$module$tmp$mikado.unlisten = unlisten$$module$tmp$event);
SUPPORT_REACTIVE$$module$tmp$config && (Mikado$$module$tmp$mikado.Array = Observer$$module$tmp$array);
if ("bundle.module" !== RELEASE$$module$tmp$config && "light.module" !== RELEASE$$module$tmp$config && "custom.module" !== RELEASE$$module$tmp$config) {
  const a = window;
  let b;
  (b = a.define) && b.amd ? b([], function() {
    return Mikado$$module$tmp$mikado;
  }) : "object" === typeof a.exports ? a.exports = Mikado$$module$tmp$mikado : a.Mikado = Mikado$$module$tmp$mikado;
} else {
  export default Mikado$$module$tmp$mikado;
}
var module$tmp$bundle = {};

