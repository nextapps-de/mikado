/**!
 * Mikado.js v0.4.0
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */
(function(){'use strict';
var DEBUG = true;
var USE_POLYFILL = true;
var SUPPORT_CACHE = true;
var SUPPORT_EVENTS = true;
var SUPPORT_STORAGE = true;
var SUPPORT_HELPERS = true;
var SUPPORT_ASYNC = true;
var SUPPORT_TRANSPORT = true;
var SUPPORT_TEMPLATE_EXTENSION = true;
var SUPPORT_REACTIVE = true;
var RELEASE = "browser";
var module$tmp$polyfill = {default:{}};
if (USE_POLYFILL) {
  Object.assign || (Object.assign = function() {
    var args = arguments;
    var size = args.length;
    var obj = args[0];
    if (size > 1) {
      for (var x = 1, current = undefined, keys = undefined, length = undefined; x < size; x++) {
        current = args[x];
        keys = Object.keys(current);
        length = keys.length;
        for (var i = 0, key = undefined; i < length; i++) {
          key = keys[i];
          obj[key] = current[key];
        }
      }
    }
    return obj;
  });
  if (SUPPORT_ASYNC) {
    window["requestAnimationFrame"] || (window["requestAnimationFrame"] = window.setTimeout);
    window["cancelAnimationFrame"] || (window["cancelAnimationFrame"] = window.clearTimeout);
    window["Promise"] || (window["Promise"] = function() {
      function Promise(fn) {
        this.callback = null;
        var self = this;
        fn(function(val) {
          if (self.callback) {
            self.callback(val);
            self.callback = null;
          }
        });
      }
      Promise.prototype.then = function(callback) {
        this.callback = callback;
      };
      return Promise;
    }());
  }
}
;function Template() {
}
Template.prototype.i;
Template.prototype.h;
Template.prototype.x;
Template.prototype.s;
Template.prototype.p;
Template.prototype.a;
Template.prototype.c;
if (SUPPORT_EVENTS) {
  var register_event = function(add_or_remove, type, handler, options) {
    window[(add_or_remove ? "add" : "remove") + "EventListener"](type, handler, options || {"passive":true, "capture":true});
  };
  var handler = function(event, type) {
    type || (type = event.type);
    var event_target = event.target;
    var target = event_target;
    var id = event_target["_e_" + type];
    if (!id) {
      while (target) {
        if (target === body) {
          return;
        }
        id = target.getAttribute(type);
        if (id) {
          if (id.indexOf(":") !== -1) {
            var cmp = id.split(":");
            var root = cmp[1];
            id = 0;
            target = target.parentElement;
            while (target !== body) {
              if (target.hasAttribute(root)) {
                id = cmp[0];
                break;
              }
              target = target.parentElement;
            }
          }
          break;
        }
        target = target.parentElement;
      }
      if (!id) {
        return;
      }
      event_target["_e_" + type] = id;
      event_target["_r_" + type] = target;
    } else {
      target = event_target["_r_" + type];
    }
    var fn = listener[id];
    if (fn) {
      event.preventDefault();
      fn(target, event, event_target);
    } else {
      if (DEBUG) {
        console.warn("Route: '" + id + "', Event: '" + type + "' is undefined.");
      }
    }
    event.stopPropagation();
  };
  var events = {};
  var listener = {};
  var body = document.body;
  Mikado$$module$tmp$mikado.prototype.route = function(id, fn) {
    listener[id] = fn;
    return this;
  };
  var has_touch = "ontouchstart" in window || navigator["msMaxTouchPoints"];
  var touch_x;
  var touch_y;
  var register_tap;
  if (has_touch) {
    var pointer = function(event, touches) {
      if (touches) {
        touches = touches[0];
      }
      touch_x = touches ? touches["clientX"] : event["pageX"];
      touch_y = touches ? touches["clientY"] : event["pageY"];
    };
    var handler_end = function(event) {
      var last_x = touch_x;
      var last_y = touch_y;
      pointer(event, event.changedTouches);
      if (Math.abs(touch_x - last_x) < 50 && Math.abs(touch_y - last_y) < 50) {
        handler.call(this, event, "click");
      }
    };
    var handler_down = function(event) {
      pointer(event, event.touches);
    };
    register_tap = function(add_or_remove) {
      register_event(add_or_remove, "touchstart", handler_down, false);
      register_event(add_or_remove, "touchend", handler_end, false);
    };
  }
  Mikado$$module$tmp$mikado.prototype.listen = function(event, options) {
    if (!events[event]) {
      if (has_touch && event === "click") {
        register_tap(1);
      } else {
        register_event(1, event, handler, options || true);
      }
      events[event] = 1;
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.unlisten = function(event, options) {
    if (events[event]) {
      if (has_touch && event === "click") {
        register_tap(0);
      } else {
        register_event(0, event, handler, options || true);
      }
      events[event] = 0;
    }
    return this;
  };
}
var module$tmp$event = {};
if (SUPPORT_HELPERS) {
  var update = function(dom, store, a, b, index_b, index_a) {
    a["_i"] = index_b;
    b["_i"] = index_a;
    dom[index_a] = b;
    dom[index_b] = a;
    if (SUPPORT_STORAGE && store) {
      var tmp = store[index_b];
      store[index_b] = store[index_a];
      store[index_a] = tmp;
    }
  };
  Mikado$$module$tmp$mikado.prototype.move = function(a, position) {
    var index;
    if (typeof a === "number") {
      index = a;
      a = this.dom[a];
    } else {
      index = a["_i"];
    }
    if (position < 0) {
      position = this.length + position - 1;
    }
    if (index !== position) {
      this.shift(a, position - index);
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.shift = function(a, offset, view) {
    if (!offset) {
      return this;
    }
    var index;
    if (typeof a === "number") {
      index = a;
      a = this.dom[a];
    } else {
      index = a["_i"];
    }
    var up = offset < 0;
    if (up && index || !up && index < this.length - 1) {
      var pos = up ? Math.max(index + offset, 0) : Math.min(index + offset, this.length - 1);
      var b = this.dom[pos];
      var multi_update = up && index - pos > 1 || !up && pos - index > 1;
      if (SUPPORT_STORAGE && !multi_update && this.reuse && (this.store || this.loose)) {
        var tmp = this.store ? this.store[index] : a["_m"];
        this.update(a, this.store ? this.store[pos] : b["_m"], view, pos);
        this.update(b, tmp, view, index);
      } else {
        if (up) {
          this.root.insertBefore(a, b);
        } else {
          if (pos === this.length - 1) {
            this.root.appendChild(a);
          } else {
            this.root.insertBefore(a, this.dom[pos + 1]);
          }
        }
      }
      if (multi_update) {
        var tmp$0 = this.dom[index];
        var tmp_store = SUPPORT_STORAGE && this.store && this.store[index];
        var current;
        if (up) {
          for (var i = index; i > pos; i--) {
            current = this.dom[i] = this.dom[i - 1];
            current["_i"] = i;
            if (SUPPORT_STORAGE && this.store) {
              this.store[i] = this.store[i - 1];
            }
          }
        } else {
          for (var i$1 = index; i$1 < pos; i$1++) {
            current = this.dom[i$1] = this.dom[i$1 + 1];
            current["_i"] = i$1;
            if (SUPPORT_STORAGE && this.store) {
              this.store[i$1] = this.store[i$1 + 1];
            }
          }
        }
        current = this.dom[pos] = tmp$0;
        current["_i"] = pos;
        if (SUPPORT_STORAGE && this.store) {
          this.store[pos] = tmp_store;
        }
      } else {
        update(this.dom, SUPPORT_STORAGE && this.store, a, b, pos, index);
      }
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.up = function(a, offset) {
    if (!offset || offset > 0) {
      this.shift(a, -(offset || 1));
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.down = function(a, offset) {
    if (!offset || offset > 0) {
      this.shift(a, offset || 1);
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.first = function(a) {
    return this.shift(a, -this.length);
  };
  Mikado$$module$tmp$mikado.prototype.last = function(a) {
    return this.shift(a, this.length);
  };
  Mikado$$module$tmp$mikado.prototype.before = function(tmp_a, tmp_b) {
    if (typeof tmp_a !== "number") {
      tmp_a = tmp_a["_i"];
    }
    if (typeof tmp_b !== "number") {
      tmp_b = tmp_b["_i"];
    }
    if (tmp_b !== tmp_a + 1) {
      if (tmp_b < 0) {
        tmp_b = this.length + tmp_b;
        if (tmp_a < 0) {
          tmp_b--;
        }
      }
      if (tmp_a < 0) {
        tmp_a = this.length + tmp_a - 1;
      }
      this.shift(tmp_a, tmp_b - tmp_a - 1);
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.after = function(tmp_a, tmp_b) {
    if (typeof tmp_a !== "number") {
      tmp_a = tmp_a["_i"];
    }
    if (typeof tmp_b !== "number") {
      tmp_b = tmp_b["_i"];
    }
    if (tmp_b !== tmp_a - 1) {
      if (tmp_b < 0) {
        tmp_b = this.length + tmp_b - 2;
        if (tmp_a < 0) {
          tmp_b++;
        }
      }
      if (tmp_a < 0) {
        tmp_a = this.length + tmp_a - 1;
      }
      this.shift(tmp_a, tmp_b - tmp_a + 1);
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.swap = function(a, b, view) {
    if (a !== b) {
      var tmp_a;
      var tmp_b;
      if (typeof a === "number") {
        tmp_a = a;
        a = this.dom[a];
      } else {
        tmp_a = a["_i"];
      }
      if (typeof b === "number") {
        tmp_b = b;
        b = this.dom[b];
      } else {
        tmp_b = b["_i"];
      }
      if (tmp_a !== tmp_b) {
        if (SUPPORT_STORAGE && this.reuse && (this.store || this.loose)) {
          var tmp = this.store ? this.store[tmp_a] : a["_m"];
          this.update(a, this.store ? this.store[tmp_b] : b["_m"], view, tmp_b);
          this.update(b, tmp, view, tmp_a);
        } else {
          this.root.insertBefore(a, b);
          this.root.insertBefore(b, tmp_a + 1 === tmp_b ? a : this.dom[tmp_a + 1]);
          a["_i"] = tmp_b;
          b["_i"] = tmp_a;
          this.dom[tmp_a] = b;
          this.dom[tmp_b] = a;
          if (SUPPORT_STORAGE && this.store) {
            var tmp$2 = this.store[tmp_b];
            this.store[tmp_b] = this.store[tmp_a];
            this.store[tmp_a] = tmp$2;
          }
        }
      }
    }
    return this;
  };
}
var module$tmp$helper = {};
function setText$$module$tmp$cache(target, text) {
  if (target["_x"] !== text) {
    target.nodeValue = text;
    target["_x"] = text;
  }
  return this;
}
function getText$$module$tmp$cache(target) {
  return typeof target["_x"] === "undefined" ? target["_x"] = target.nodeValue : target["_x"];
}
function setHTML$$module$tmp$cache(target, html) {
  if (target["_h"] !== html) {
    target.innerHTML = html;
    target["_h"] = html;
  }
  return this;
}
function getHTML$$module$tmp$cache(target) {
  return typeof target["_h"] === "undefined" ? target["_h"] = target.innerHTML : target["_h"];
}
function setClass$$module$tmp$cache(target, class_name) {
  if (target["_c"] !== class_name) {
    target.className = class_name;
    target["_c"] = class_name;
    target["_cs"] = null;
  }
  return this;
}
function getClass$$module$tmp$cache(target) {
  return typeof target["_c"] === "undefined" ? target["_c"] = target.className : target["_c"];
}
function hasClass$$module$tmp$cache(target, classname) {
  if (typeof target["_c"] === "undefined") {
    target["_c"] = target.className;
  }
  return ("#" + target["_c"].replace(/ /g, "#") + "#").indexOf("#" + classname + "#") !== -1;
}
function setStyle$$module$tmp$cache(target, style, value) {
  var style$ = target["_sc"] || (target["_sc"] = {});
  if (style$[style] !== value) {
    style$[style] = value;
    (target["_s"] || (target["_s"] = target.style)).setProperty(style, value);
    target["_cs"] = null;
  }
  return this;
}
function getStyle$$module$tmp$cache(target, style) {
  var style$ = target["_sc"] || (target["_sc"] = {});
  return typeof style$[style] === "undefined" ? style$[style] = (target["_s"] || (target["_s"] = target.style)).getPropertyValue(style) : style$[style];
}
function setCSS$$module$tmp$cache(target, style) {
  if (target["_cs"] !== style) {
    (target["_s"] || (target["_s"] = target.style)).cssText = style;
    target["_cs"] = style;
    target["_sc"] = null;
  }
  return this;
}
function getCSS$$module$tmp$cache(target) {
  return typeof target["_cs"] === "undefined" ? target["_cs"] = (target["_s"] || (target["_s"] = target.style)).cssText : target["_cs"];
}
function setAttribute$$module$tmp$cache(target, attr, value) {
  var key = "_a_" + attr;
  if (target[key] !== value) {
    target.setAttribute(attr, value);
    target[key] = value;
  }
  return this;
}
function getAttribute$$module$tmp$cache(target, attr) {
  var key = "_a_" + attr;
  return typeof target[key] === "undefined" ? target[key] = target.getAttribute(attr) : target[key];
}
function hasAttribute$$module$tmp$cache(target, attr) {
  var key = "_a_" + attr;
  if (typeof target[key] === "undefined") {
    target[key] = target.getAttribute(attr);
  }
  return !!target[key];
}
function removeAttribute$$module$tmp$cache(target, attr) {
  var key = "_a_" + attr;
  if (target[key]) {
    delete target[key];
  }
  target.removeAttribute(attr);
  return this;
}
var module$tmp$cache = {};
module$tmp$cache.getAttribute = getAttribute$$module$tmp$cache;
module$tmp$cache.getCSS = getCSS$$module$tmp$cache;
module$tmp$cache.getClass = getClass$$module$tmp$cache;
module$tmp$cache.getHTML = getHTML$$module$tmp$cache;
module$tmp$cache.getStyle = getStyle$$module$tmp$cache;
module$tmp$cache.getText = getText$$module$tmp$cache;
module$tmp$cache.hasAttribute = hasAttribute$$module$tmp$cache;
module$tmp$cache.hasClass = hasClass$$module$tmp$cache;
module$tmp$cache.removeAttribute = removeAttribute$$module$tmp$cache;
module$tmp$cache.setAttribute = setAttribute$$module$tmp$cache;
module$tmp$cache.setCSS = setCSS$$module$tmp$cache;
module$tmp$cache.setClass = setClass$$module$tmp$cache;
module$tmp$cache.setHTML = setHTML$$module$tmp$cache;
module$tmp$cache.setStyle = setStyle$$module$tmp$cache;
module$tmp$cache.setText = setText$$module$tmp$cache;
var $jscomp$destructuring$var0 = window;
var localStorage$$module$tmp$store = $jscomp$destructuring$var0.localStorage;
if (SUPPORT_STORAGE) {
  Mikado$$module$tmp$mikado.prototype.export = function() {
    var data;
    if (this.store) {
      data = this.store;
    } else {
      if (this.loose) {
        data = new Array(this.length);
        for (var i = 0; i < this.length; i++) {
          data[i] = this.dom[i]["_m"];
        }
      }
    }
    if (data) {
      localStorage$$module$tmp$store.setItem(this.template, JSON.stringify(data));
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.import = function() {
    var data = localStorage$$module$tmp$store.getItem(this.template);
    if (data) {
      data = JSON.parse(data);
      if (this.extern) {
        this.store.push.apply(this.store, data);
      } else {
        this.store = data;
      }
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.delete = function(id) {
    localStorage$$module$tmp$store.removeItem(id || this.template);
    return this;
  };
}
var module$tmp$store = {};
var proxy_setter$$module$tmp$proxy = {"text":function(target, text) {
  target.nodeValue = text;
}, "html":function(target, html) {
  target.innerHTML = html;
}, "class":function(target, class_name) {
  target.className = class_name;
}, "css":function(target, css) {
  (target["_s"] || (target["_s"] = target.style)).cssText = css;
}, "style":function(target, value, style) {
  (target["_s"] || (target["_s"] = target.style)).setProperty(style, value);
}, "attr":function(target, value, attr) {
  target.setAttribute(attr, value);
}};
function create_proxy$$module$tmp$proxy(obj, path, handler) {
  return new Proxy(obj, {path:path, handler:handler, set:proxy_set$$module$tmp$proxy});
}
function proxy_set$$module$tmp$proxy(target, prop, value) {
  if (target[prop] !== value) {
    var exp = this.handler["data." + prop];
    if (exp) {
      for (var i = 0, length = exp.length, tmp = undefined; i < length; i++) {
        tmp = exp[i];
        proxy_setter$$module$tmp$proxy[tmp[0]](this.path[tmp[1]], value, tmp[2] || prop);
      }
    }
    target[prop] = value;
  }
  return true;
}
if (SUPPORT_REACTIVE) {
  if (!window["Proxy"]) {
    var Proxy$3 = function(obj, proxy) {
      this.path = proxy.path;
      this.handler = proxy.handler;
      var observe = obj;
      var keys = Object.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        this.define(observe, key, obj[key]);
      }
      return observe;
    };
    Proxy$3.prototype.define = function(_obj, _key, _val) {
      var self = this;
      var obj = _obj;
      var key = _key;
      var val = _val;
      Object.defineProperty(obj, key, {get:function() {
        return val;
      }, set:function(newVal) {
        if (val === newVal) {
          return;
        }
        var exp = self.handler["data." + key];
        if (exp) {
          for (var i = 0, length = exp.length, tmp = undefined; i < length; i++) {
            tmp = exp[i];
            proxy_setter$$module$tmp$proxy[tmp[0]](self.path[tmp[1]], newVal, tmp[2] || key);
          }
        }
        val = newVal;
      }});
    };
    window["Proxy"] = Proxy$3;
  }
}
var module$tmp$proxy = {};
module$tmp$proxy.default = create_proxy$$module$tmp$proxy;
var $jscomp$destructuring$var1 = window;
var requestAnimationFrame$$module$tmp$mikado = $jscomp$destructuring$var1.requestAnimationFrame;
var cancelAnimationFrame$$module$tmp$mikado = $jscomp$destructuring$var1.cancelAnimationFrame;
var defaults$$module$tmp$mikado = {"store":true, "loose":true, "cache":true, "async":false, "reuse":true, "proxy":false};
var state$$module$tmp$mikado = {};
var templates$$module$tmp$mikado = {};
var parsed$$module$tmp$mikado = {};
function Mikado$$module$tmp$mikado(root, template, options) {
  if (!root.nodeType) {
    options = template;
    template = root;
    root = null;
  }
  if (!template) {
    options = root;
  }
  if (root) {
    this.mount(root);
  } else {
    this.dom = null;
    this.root = null;
    this.length = 0;
  }
  this.init(template, options);
}
Mikado$$module$tmp$mikado.register = Mikado$$module$tmp$mikado.register = function(name, tpl) {
  if (!tpl) {
    tpl = name;
    name = tpl["n"];
  }
  templates$$module$tmp$mikado[name] = tpl;
  return Mikado$$module$tmp$mikado;
};
Mikado$$module$tmp$mikado.new = Mikado$$module$tmp$mikado.new = function(root, template, options) {
  return new Mikado$$module$tmp$mikado(root, template, options);
};
Mikado$$module$tmp$mikado.prototype.mount = function(target) {
  if (this.root !== target) {
    this.root = target;
    this.check();
    this.dom = target["_d"] || (target["_d"] = collection_to_array$$module$tmp$mikado(target.children));
    this.length = this.dom.length;
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.sync = function() {
  this.root["_d"] = this.dom = collection_to_array$$module$tmp$mikado(this.root.children);
  this.length = this.dom.length;
  return this;
};
Mikado$$module$tmp$mikado.prototype.index = function(node) {
  return node["_i"];
};
Mikado$$module$tmp$mikado.prototype.node = function(index) {
  return this.dom[index];
};
if (SUPPORT_STORAGE) {
  Mikado$$module$tmp$mikado.prototype.data = function(index) {
    return this.loose ? this.dom[index]["_m"] : this.store[index];
  };
  if (SUPPORT_HELPERS) {
    Mikado$$module$tmp$mikado.prototype.find = function(data) {
      for (var i = 0; i < this.length; i++) {
        if (this.data(i) === data) {
          return this.dom[i];
        }
      }
    };
    Mikado$$module$tmp$mikado.prototype.search = function(data) {
      var values = Object.values(data).join("^");
      for (var i = 0; i < this.length; i++) {
        if (Object.values(this.data(i)).join("^") === values) {
          return this.dom[i];
        }
      }
    };
    Mikado$$module$tmp$mikado.prototype.where = function(payload) {
      var keys = Object.keys(payload);
      var length = keys.length;
      var results = [];
      for (var x = 0, data = undefined, found = undefined; x < this.length; x++) {
        data = this.data(x);
        found = true;
        for (var y = 0, key = undefined; y < length; y++) {
          key = keys[y];
          if (data[key] !== payload[key]) {
            found = false;
            break;
          }
        }
        if (found) {
          results[results.length] = this.dom[x];
        }
      }
      return results;
    };
  }
}
Mikado$$module$tmp$mikado.prototype.init = function(template, options) {
  if (DEBUG) {
    if (!template) {
      console.error("Initialization Error: Template is not defined.");
    }
  }
  options = options ? Object.assign({}, this.config || defaults$$module$tmp$mikado, options) : defaults$$module$tmp$mikado;
  this.config = options;
  if (typeof template === "string") {
    template = templates$$module$tmp$mikado[template];
  } else {
    Mikado$$module$tmp$mikado.register(template);
  }
  if (SUPPORT_CACHE) {
    this.cache = options["cache"];
  }
  if (SUPPORT_ASYNC) {
    this.async = options["async"];
    this.timer = 0;
  }
  this.reuse = options["reuse"];
  this.state = options["state"] || state$$module$tmp$mikado;
  if (SUPPORT_STORAGE) {
    var observe = SUPPORT_REACTIVE && options["proxy"];
    var store = typeof observe === "object" ? observe : options["store"] || observe;
    if (store) {
      this.loose = typeof store !== "object" && options["loose"];
      if (this.loose) {
        this.store = false;
      } else {
        this.extern = typeof store === "object";
        this.store = this.extern ? store : [];
      }
      if (SUPPORT_REACTIVE) {
        this.proxy = observe && {};
      }
    } else {
      this.store = false;
      this.loose = false;
      if (SUPPORT_REACTIVE) {
        this.proxy = false;
      }
    }
  }
  if (this.template !== template) {
    this.template = template["n"];
    this.vpath = null;
    this.update_p = null;
    this.static = true;
    if (SUPPORT_TEMPLATE_EXTENSION) {
      this.include = null;
    }
    this.factory = this.parse(template);
    this.check();
  }
  return this;
};
Mikado$$module$tmp$mikado.once = Mikado$$module$tmp$mikado.once = function(root, template, data, view, callback) {
  Mikado$$module$tmp$mikado.new(root, template).render(data, view, callback).destroy(true);
  return Mikado$$module$tmp$mikado;
};
Mikado$$module$tmp$mikado.prototype.check = function() {
  if (this.root) {
    var id = this.root["_t"];
    if (id !== this.template) {
      this.root["_t"] = this.template;
      if (id) {
        return this.clear();
      }
    }
  }
  return this;
};
function collection_to_array$$module$tmp$mikado(collection) {
  var length = collection.length;
  var array = new Array(length);
  for (var i = 0, node = undefined; i < length; i++) {
    node = collection[i];
    node["_i"] = i;
    array[i] = node;
  }
  return array;
}
Mikado$$module$tmp$mikado.prototype.create = function(data, view, index) {
  var factory = this.factory;
  this.static || this.update_p(factory["_p"], factory["$"], data, index, view);
  var tmp = factory.cloneNode(true);
  return tmp;
};
if (SUPPORT_STORAGE) {
  Mikado$$module$tmp$mikado.prototype.refresh = function(index, view) {
    if (typeof index === "number") {
      return this.update(this.dom[index], null, view, index);
    } else {
      view = index;
    }
    var count = this.store ? this.store.length : this.length;
    if (this.loose) {
      this.store = null;
    }
    for (var x = 0; x < count; x++) {
      this.update(this.dom[x], null, view, x);
    }
    return this;
  };
}
Mikado$$module$tmp$mikado.prototype.render = function(data, view, callback, skip_async) {
  if (DEBUG) {
    if (!this.root) {
      console.error("Template was not mounted or root was not found.");
    } else {
      if (this.template !== this.root["_t"]) {
        console.warn("Another template is already assigned to this root. Please use '.mount()' or '.check()' before calling '.render()' to switch the context of a template.");
      }
    }
  }
  if (SUPPORT_ASYNC && !skip_async) {
    if (view) {
      if (typeof view === "function" || typeof view === "boolean") {
        callback = view;
        view = null;
      }
    }
    if (this.timer) {
      this.cancel();
    }
    if (callback) {
      var self = this;
      this.timer = requestAnimationFrame$$module$tmp$mikado(function() {
        self.timer = 0;
        self.render(data, view, null, true);
        if (typeof callback === "function") {
          callback();
        }
      });
      return this;
    }
    if (this.async) {
      var self$4 = this;
      return new Promise(function(resolve) {
        self$4.timer = requestAnimationFrame$$module$tmp$mikado(function() {
          self$4.timer = 0;
          self$4.render(data, view, null, true);
          resolve();
        });
      });
    }
  }
  if (this.static) {
    this.dom[0] || this.add();
  } else {
    var count;
    if (data) {
      if (typeof data.length === "undefined") {
        data = [data];
        count = 1;
      } else {
        count = data.length;
      }
    } else {
      if (SUPPORT_STORAGE) {
        count = this.store ? this.store.length : this.length;
      }
    }
    if (!count) {
      return this.clear();
    }
    this.reuse || this.clear(count);
    for (var x = 0; x < count; x++) {
      if (x < this.length) {
        this.update(this.dom[x], data ? data[x] : null, view, x);
      } else {
        this.add(data ? data[x] : this.store[x], view, this.root);
      }
    }
    if (count < this.length) {
      if (SUPPORT_STORAGE && this.store && !this.extern) {
        this.store.splice(count);
      }
      var nodes = this.dom.splice(count);
      this.length = count;
      count = nodes.length;
      for (var x$5 = 0; x$5 < count; x$5++) {
        this.root.removeChild(nodes[x$5]);
      }
    }
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.add = function(data, view, target) {
  var length = this.length;
  var tmp = this.create(data, view, length);
  if (SUPPORT_STORAGE) {
    if (SUPPORT_REACTIVE && this.proxy) {
      data = create_proxy$$module$tmp$proxy(data, tmp["_p"] || this.create_p(tmp), this.proxy);
    }
    if (this.store) {
      this.store[length] = data;
    } else {
      if (this.loose) {
        tmp["_m"] = data;
      }
    }
  }
  tmp["_i"] = length;
  (target || this.root).appendChild(tmp);
  this.dom[length] = tmp;
  this.length++;
  return this;
};
Mikado$$module$tmp$mikado.prototype.clear = function(resize) {
  this.root["_d"] = this.dom = resize ? new Array(resize) : [];
  this.root.textContent = "";
  this.length = 0;
  if (SUPPORT_STORAGE && this.store && !this.extern) {
    this.store = resize ? new Array(resize) : [];
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.destroy = function(unload) {
  if (unload) {
    this.unload();
  }
  this.dom = null;
  this.root = null;
  this.vpath = null;
  this.update_p = null;
  this.factory = null;
  this.length = 0;
};
if (SUPPORT_ASYNC) {
  Mikado$$module$tmp$mikado.prototype.cancel = function() {
    if (this.timer) {
      cancelAnimationFrame$$module$tmp$mikado(this.timer);
      this.timer = null;
    }
  };
}
Mikado$$module$tmp$mikado.prototype.append = function(data, view) {
  var count = data.length;
  for (var x = 0; x < count; x++) {
    this.add(data[x], view);
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.remove = function(node) {
  var index;
  if (typeof node === "number") {
    index = node;
    node = this.dom[index];
  } else {
    index = node["_i"];
  }
  this.dom.splice(index, 1);
  this.root.removeChild(node);
  this.length--;
  if (SUPPORT_STORAGE && this.store && !this.extern) {
    this.store.splice(index, 1);
  }
  for (var i = index; i < this.length; i++) {
    this.dom[i]["_i"] = i;
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.replace = function(node, data, view, index) {
  if (typeof index === "undefined") {
    index = node["_i"];
  }
  var tmp = this.create(data, view, index);
  if (SUPPORT_STORAGE) {
    if (SUPPORT_REACTIVE && this.proxy) {
      data = create_proxy$$module$tmp$proxy(data, tmp["_p"] || this.create_p(tmp), this.proxy);
    }
    if (this.store) {
      this.store[index] = data;
    } else {
      if (this.loose) {
        tmp["_m"] = data;
      }
    }
  }
  tmp["_i"] = index;
  this.root.replaceChild(tmp, node);
  this.dom[index] = tmp;
  return this;
};
Mikado$$module$tmp$mikado.prototype.update = function(node, data, view, index) {
  if (DEBUG) {
    if (this.static) {
      console.warn("The template '" + this.template + "' is a static template and should not be updated.");
    }
  }
  if (SUPPORT_STORAGE) {
    if (this.store) {
      if (data) {
        this.store[index] = data;
      } else {
        data = this.store[index];
      }
    } else {
      if (this.loose) {
        if (data) {
          node["_m"] = data;
        } else {
          data = node["_m"];
        }
      }
    }
  }
  this.update_p(node["_p"] || this.create_p(node), node["$"], data, index, view);
  return this;
};
Mikado$$module$tmp$mikado.prototype.create_p = function(root) {
  var length = this.vpath.length;
  var cache = {};
  var new_p = new Array(length);
  for (var x = 0; x < length; x++) {
    var path = this.vpath[x];
    new_p[x] = cache[path] || resolve$$module$tmp$mikado(root, path, cache);
  }
  root["_p"] = new_p;
  root["$"] = {};
  return new_p;
};
function resolve$$module$tmp$mikado(root, path, cache) {
  var tmp = "";
  for (var i = 0; i < path.length; i++) {
    var current_p = path[i];
    tmp += current_p;
    if (cache[tmp]) {
      root = cache[tmp];
    } else {
      if (current_p === ">") {
        root = root.firstElementChild;
      } else {
        if (current_p === "+") {
          root = root.nextElementSibling;
        } else {
          if (current_p === "|") {
            root = root.firstChild;
          }
        }
      }
      cache[tmp] = root;
    }
  }
  return root;
}
var tmp_fn$$module$tmp$mikado;
var last_conditional$$module$tmp$mikado;
var root_node$$module$tmp$mikado;
Mikado$$module$tmp$mikado.prototype.parse = function(tpl, index, path, dom_p) {
  var node = document.createElement(tpl["t"] || "div");
  if (!index) {
    index = 0;
    path = "&";
    tmp_fn$$module$tmp$mikado = "";
    this.vpath = [];
    if (SUPPORT_REACTIVE && this.proxy) {
      this.proxy = {};
    }
    node["_p"] = dom_p = [];
    node["$"] = {};
    root_node$$module$tmp$mikado = node;
  }
  var style = tpl["s"];
  var child = tpl["i"];
  var text = tpl["x"];
  var html = tpl["h"];
  var attr = tpl["a"];
  var events = SUPPORT_EVENTS && tpl["e"];
  var class_name = tpl["c"];
  var js = tpl["j"];
  var path_length = this.vpath.length;
  var has_update = 0;
  var new_fn = "";
  if (js) {
    new_fn += ";" + js;
    if (new_fn.indexOf("self") > -1) {
      this.vpath[path_length] = path;
      dom_p[path_length] = node;
      has_update = 2;
    }
  }
  if (class_name) {
    if (typeof class_name === "object") {
      var observable = class_name[1];
      class_name = class_name[0];
      new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_HELPERS ? ";v=" + class_name + ";if(self._c!==v){self._c=v;self.className=v}" : ";v=" + class_name + ";if(s._c" + path_length + "!==v){s._c" + path_length + "=v;self.className=v}" : ";self.className=" + class_name;
      if (SUPPORT_REACTIVE && this.proxy && observable) {
        this.proxy[class_name] || (this.proxy[class_name] = []);
        this.proxy[class_name].push(["class", path_length]);
      }
      this.vpath[path_length] = path;
      dom_p[path_length] = node;
      has_update++;
    } else {
      node.className = class_name;
    }
  }
  if (attr || events) {
    var keys;
    var has_dynamic_values;
    if (attr) {
      keys = Object.keys(attr);
    }
    if (SUPPORT_EVENTS && events) {
      var tmp = Object.keys(events);
      keys = keys ? keys.concat(tmp) : tmp;
    }
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var value = undefined;
      if (!attr || typeof(value = attr[key]) === "undefined") {
        if (SUPPORT_EVENTS) {
          value = events[key];
          this.listen(key);
        }
      }
      if (typeof value === "object") {
        var observable$6 = value[1];
        value = value[0];
        new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_HELPERS ? ";v=" + value + ";if(self['_a_" + key + "']!==v){self['_a_" + key + "']=v;self.setAttribute('" + key + "',v)}" : ";v=" + value + ";if(s['_a_" + key + path_length + "']!==v){s['_a_" + key + path_length + "']=v;self.setAttribute('" + key + "',v)}" : ";self.setAttribute('" + key + "'," + value + ")";
        if (SUPPORT_REACTIVE && this.proxy && observable$6) {
          this.proxy[value] || (this.proxy[value] = []);
          this.proxy[value].push(["attr", path_length, key]);
        }
        has_dynamic_values = true;
        has_update++;
      } else {
        node.setAttribute(key, value);
      }
    }
    if (has_dynamic_values) {
      this.vpath[path_length] = path;
      dom_p[path_length] = node;
    }
  }
  if (style) {
    if (typeof style === "string") {
      node.style.cssText = style;
    } else {
      if (style.length) {
        var observable$7 = style[1];
        style = style[0];
        new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_HELPERS ? ";v=" + style + ";if(self._cs!==v){self._cs=v;(self._s||(self._s=self.style)).cssText=v}" : ";v=" + style + ";if(s._cs" + path_length + "!==v){s._cs" + path_length + "=v;(self._s||(self._s=self.style)).cssText=v}" : ";self.style.cssText=" + style;
        if (SUPPORT_REACTIVE && this.proxy && observable$7) {
          this.proxy[style] || (this.proxy[style] = []);
          this.proxy[style].push(["css", path_length]);
        }
        this.vpath[path_length] = path;
        dom_p[path_length] = node;
        has_update++;
      } else {
        var keys$8 = Object.keys(style);
        var has_dynamic_values$9;
        for (var i$10 = 0; i$10 < keys$8.length; i$10++) {
          var key$11 = keys$8[i$10];
          var value$12 = style[key$11];
          if (typeof value$12 === "object") {
            var observable$13 = value$12[1];
            value$12 = value$12[0];
            new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_HELPERS ? ";v=" + value$12 + ";var t=self['_sc']||(self['_sc']={});if(t['" + key$11 + "']!==v){t['" + key$11 + "']=v;(self._s||(self._s=self.style)).setProperty('" + key$11 + "',v)}" : ";v=" + value$12 + ";if(s['_s_" + key$11 + path_length + "']!==v){s['_s_" + key$11 + path_length + "']=v;(self._s||(self._s=self.style)).setProperty('" + key$11 + "',v)}" : ";self.style.setProperty('" + key$11 + "'," + value$12 + ")";
            if (SUPPORT_REACTIVE && this.proxy && observable$13) {
              this.proxy[value$12] || (this.proxy[value$12] = []);
              this.proxy[value$12].push(["style", path_length, key$11]);
            }
            has_dynamic_values$9 = true;
            has_update++;
          } else {
            node.style.setProperty(key$11, value$12);
          }
        }
        if (has_dynamic_values$9) {
          this.vpath[path_length] = path;
          dom_p[path_length] = node;
        }
      }
    }
  }
  if (!child) {
    if (SUPPORT_TEMPLATE_EXTENSION && tpl["@"]) {
      this.include || (this.include = []);
      tmp_fn$$module$tmp$mikado += ";this.include[" + this.include.length + "].mount(p[" + path_length + "]).render(" + tpl["r"] + (tpl["m"] ? ".slice(" + (tpl["m"] > 0 ? "0," : "") + tpl["m"] + ")" : "") + ",index,view)";
      var old_fn = tmp_fn$$module$tmp$mikado;
      tmp_fn$$module$tmp$mikado = "";
      this.include.push(new Mikado$$module$tmp$mikado(node, typeof tpl["@"] === "string" ? templates$$module$tmp$mikado[tpl["@"]] : tpl["@"], Object.assign(this.config, {"store":false, "async":false})));
      tmp_fn$$module$tmp$mikado = old_fn;
      this.vpath[path_length] = path;
      dom_p[path_length] = node;
      this.static = false;
    } else {
      if (SUPPORT_TEMPLATE_EXTENSION && tpl["+"]) {
        child = templates$$module$tmp$mikado[tpl["+"]];
      } else {
        if (text) {
          path += "|";
          var observable$14;
          var is_object = typeof text === "object";
          if (is_object) {
            observable$14 = text[1];
            text = text[0];
          }
          var text_node = document.createTextNode(text);
          if (is_object) {
            if (has_update) {
              concat_p$$module$tmp$mikado(has_update, new_fn, path_length, SUPPORT_CACHE && this.cache);
              new_fn = "";
              path_length++;
            }
            new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_HELPERS ? ";v=" + text + ";if(self._x!==v){self._x=v;self.nodeValue=v}" : ";v=" + text + ";if(s._x" + path_length + "!==v){s._x" + path_length + "=v;self.nodeValue=v}" : ";self.nodeValue=" + text;
            if (SUPPORT_REACTIVE && this.proxy && observable$14) {
              this.proxy[text] || (this.proxy[text] = []);
              this.proxy[text].push(["text", path_length]);
            }
            this.vpath[path_length] = path;
            dom_p[path_length] = text_node;
            has_update++;
          }
          node.appendChild(text_node);
        } else {
          if (html) {
            if (typeof html === "object") {
              var observable$15 = html[1];
              html = html[0];
              new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_HELPERS ? ";v=" + html + ";if(self._h!==v){self._h=v;self.innerHTML=v}" : ";v=" + html + ";if(s._h" + path_length + "!==v){s._h" + path_length + "=v;self.innerHTML=v}" : ";self.innerHTML=" + html;
              if (SUPPORT_REACTIVE && this.proxy && observable$15) {
                this.proxy[html] || (this.proxy[html] = []);
                this.proxy[html].push(["html", path_length]);
              }
              this.vpath[path_length] = path;
              dom_p[path_length] = node;
              has_update++;
            } else {
              node.innerHTML = html;
            }
          }
        }
      }
    }
  }
  if (SUPPORT_TEMPLATE_EXTENSION && tpl["f"]) {
    tmp_fn$$module$tmp$mikado += ";if(" + tpl["f"] + "){" + (has_update > 1 ? "self" : "p[" + path_length + "]") + ".hidden=false";
    if (!has_update) {
      this.vpath[path_length] = path;
      dom_p[path_length] = node;
      this.static = false;
    }
  }
  if (has_update) {
    this.static = false;
    concat_p$$module$tmp$mikado(has_update, new_fn, path_length, SUPPORT_CACHE && this.cache);
  }
  if (child) {
    var include;
    if (child.length) {
      var tmp$16 = ">";
      for (var i$17 = 0, current = undefined; i$17 < child.length; i$17++) {
        if (i$17) {
          tmp$16 += "+";
        }
        current = child[i$17];
        if (SUPPORT_TEMPLATE_EXTENSION && (include = current["+"])) {
          current = templates$$module$tmp$mikado[include];
        }
        node.appendChild(this.parse(current, index + i$17 + 1, path + tmp$16, dom_p));
      }
    } else {
      if (SUPPORT_TEMPLATE_EXTENSION && (include = child["+"])) {
        child = templates$$module$tmp$mikado[include];
      }
      node.appendChild(this.parse(child, index + 1, path + ">", dom_p));
    }
  }
  if (SUPPORT_TEMPLATE_EXTENSION && tpl["f"]) {
    tmp_fn$$module$tmp$mikado += "}else " + (has_update > 1 ? "self" : "p[" + path_length + "]") + ".hidden=true";
  }
  if (!index && !this.static) {
    if (tmp_fn$$module$tmp$mikado) {
      this.update_p = Function("p", "s", "data", "index", "view", '"use strict";var self,v' + tmp_fn$$module$tmp$mikado);
    }
  }
  return node;
};
function concat_p$$module$tmp$mikado(has_update, new_fn, path_length, cache) {
  if (cache || has_update > 1) {
    tmp_fn$$module$tmp$mikado += ";self=p[" + path_length + "]" + new_fn;
  } else {
    tmp_fn$$module$tmp$mikado += new_fn.replace(/self/g, "p[" + path_length + "]");
  }
}
if (SUPPORT_TRANSPORT) {
  Mikado$$module$tmp$mikado.prototype.load = function(file, callback) {
    if (templates$$module$tmp$mikado[file]) {
      if (this instanceof Mikado$$module$tmp$mikado) {
        this.init(templates$$module$tmp$mikado[file]);
      }
      callback && callback();
      return;
    }
    var self = this;
    var xhr = new XMLHttpRequest;
    xhr.overrideMimeType("application/json");
    xhr.open("GET", file, callback !== false);
    xhr.onload = function() {
      var json = this.responseText;
      if (json) {
        var error;
        try {
          var tpl = JSON.parse(json);
          Mikado$$module$tmp$mikado.register(tpl);
          if (self instanceof Mikado$$module$tmp$mikado) {
            self.init(tpl);
          }
        } catch (e) {
          error = e;
        }
        if (typeof callback === "function") {
          callback(error);
        }
      }
    };
    xhr.send();
  };
  Mikado$$module$tmp$mikado.load = Mikado$$module$tmp$mikado.load = Mikado$$module$tmp$mikado.prototype.load;
}
Mikado$$module$tmp$mikado.prototype.unload = function(template) {
  template || (template = this.template);
  if (template) {
    templates$$module$tmp$mikado[template] = null;
  }
};
Mikado$$module$tmp$mikado.unload = Mikado$$module$tmp$mikado.unload = Mikado$$module$tmp$mikado.prototype.unload;
var module$tmp$mikado = {};
module$tmp$mikado.default = Mikado$$module$tmp$mikado;
Mikado$$module$tmp$mikado.register;
Mikado$$module$tmp$mikado.unload;
Mikado$$module$tmp$mikado.load;
Mikado$$module$tmp$mikado.new;
Mikado$$module$tmp$mikado.once;
Mikado$$module$tmp$mikado.prototype.load;
Mikado$$module$tmp$mikado.prototype.update;
Mikado$$module$tmp$mikado.prototype.sync;
Mikado$$module$tmp$mikado.prototype.replace;
Mikado$$module$tmp$mikado.prototype.render;
Mikado$$module$tmp$mikado.prototype.refresh;
Mikado$$module$tmp$mikado.prototype.unload;
Mikado$$module$tmp$mikado.prototype.remove;
Mikado$$module$tmp$mikado.prototype.node;
Mikado$$module$tmp$mikado.prototype.init;
Mikado$$module$tmp$mikado.prototype.mount;
Mikado$$module$tmp$mikado.prototype.data;
Mikado$$module$tmp$mikado.prototype.index;
Mikado$$module$tmp$mikado.prototype.find;
Mikado$$module$tmp$mikado.prototype.search;
Mikado$$module$tmp$mikado.prototype.where;
Mikado$$module$tmp$mikado.prototype.store;
Mikado$$module$tmp$mikado.prototype.state;
Mikado$$module$tmp$mikado.prototype.destroy;
Mikado$$module$tmp$mikado.prototype.create;
Mikado$$module$tmp$mikado.prototype.clear;
Mikado$$module$tmp$mikado.prototype.cancel;
Mikado$$module$tmp$mikado.prototype.append;
Mikado$$module$tmp$mikado.prototype.add;
Mikado$$module$tmp$mikado.prototype.route;
Mikado$$module$tmp$mikado.prototype.listen;
Mikado$$module$tmp$mikado.prototype.unlisten;
Mikado$$module$tmp$mikado.prototype.export;
Mikado$$module$tmp$mikado.prototype.import;
Mikado$$module$tmp$mikado.prototype.setText;
Mikado$$module$tmp$mikado.prototype.getText;
Mikado$$module$tmp$mikado.prototype.setHTML;
Mikado$$module$tmp$mikado.prototype.getHTML;
Mikado$$module$tmp$mikado.prototype.setClass;
Mikado$$module$tmp$mikado.prototype.getClass;
Mikado$$module$tmp$mikado.prototype.hasClass;
Mikado$$module$tmp$mikado.prototype.removeClass;
Mikado$$module$tmp$mikado.prototype.toggleClass;
Mikado$$module$tmp$mikado.prototype.setStyle;
Mikado$$module$tmp$mikado.prototype.getStyle;
Mikado$$module$tmp$mikado.prototype.setCSS;
Mikado$$module$tmp$mikado.prototype.getCSS;
Mikado$$module$tmp$mikado.prototype.setAttribute;
Mikado$$module$tmp$mikado.prototype.getAttribute;
Mikado$$module$tmp$mikado.prototype.hasAttribute;
Mikado$$module$tmp$mikado.prototype.removeAttribute;
Mikado$$module$tmp$mikado.prototype.move;
Mikado$$module$tmp$mikado.prototype.up;
Mikado$$module$tmp$mikado.prototype.down;
Mikado$$module$tmp$mikado.prototype.first;
Mikado$$module$tmp$mikado.prototype.last;
Mikado$$module$tmp$mikado.prototype.swap;
Promise.prototype.then;
var module$tmp$export = {};
if (SUPPORT_CACHE && SUPPORT_HELPERS) {
  Mikado$$module$tmp$mikado.setText = setText$$module$tmp$cache;
  Mikado$$module$tmp$mikado.getText = getText$$module$tmp$cache;
  Mikado$$module$tmp$mikado.setHTML = setHTML$$module$tmp$cache;
  Mikado$$module$tmp$mikado.getHTML = getHTML$$module$tmp$cache;
  Mikado$$module$tmp$mikado.setClass = setClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado.getClass = getClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado.hasClass = hasClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado.setStyle = setStyle$$module$tmp$cache;
  Mikado$$module$tmp$mikado.getStyle = getStyle$$module$tmp$cache;
  Mikado$$module$tmp$mikado.setCSS = setCSS$$module$tmp$cache;
  Mikado$$module$tmp$mikado.getCSS = getCSS$$module$tmp$cache;
  Mikado$$module$tmp$mikado.setAttribute = setAttribute$$module$tmp$cache;
  Mikado$$module$tmp$mikado.getAttribute = getAttribute$$module$tmp$cache;
  Mikado$$module$tmp$mikado.hasAttribute = hasAttribute$$module$tmp$cache;
  Mikado$$module$tmp$mikado.removeAttribute = removeAttribute$$module$tmp$cache;
}
(function() {
  var name = "Mikado";
  var factory = Mikado$$module$tmp$mikado;
  var root = this || window;
  var prop;
  if ((prop = root["define"]) && prop["amd"]) {
    prop([], function() {
      return factory;
    });
  } else {
    if (prop = root["modules"]) {
      prop[name.toLowerCase()] = factory;
    } else {
      if (typeof root["exports"] === "object") {
        root["module"].exports = factory;
      } else {
        root[name] = factory;
      }
    }
  }
})();
var module$tmp$browser = {};
}).call(this);
