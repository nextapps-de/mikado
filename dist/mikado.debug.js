/**!
 * Mikado.js v0.6.4
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
var SUPPORT_CACHE_HELPERS = true;
var SUPPORT_ASYNC = true;
var SUPPORT_TRANSPORT = true;
var SUPPORT_TEMPLATE_EXTENSION = true;
var SUPPORT_REACTIVE = true;
var SUPPORT_POOLS = true;
var SUPPORT_COMPILE = true;
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
  Object.values || (Object.values = function(obj) {
    var keys = Object.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var x = 0; x < length; x++) {
      values[x] = obj[keys[x]];
    }
    return values;
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
    var id = event_target["_event_" + type];
    if (!id) {
      while (target) {
        if (target === body) {
          return;
        }
        id = target.getAttribute(type);
        if (id) {
          var tmp = id.indexOf(":");
          if (tmp !== -1) {
            var handler$0 = id.substring(0, tmp);
            var root = id.substring(tmp + 1);
            id = 0;
            target = target.parentElement;
            while (target !== body) {
              if (target.hasAttribute(root)) {
                id = handler$0;
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
      event_target["_event_" + type] = id;
      event_target["_root_" + type] = target;
    } else {
      target = event_target["_root_" + type];
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
  Mikado$$module$tmp$mikado["route"] = Mikado$$module$tmp$mikado.prototype.route = function(id, fn) {
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
  Mikado$$module$tmp$mikado["listen"] = Mikado$$module$tmp$mikado.prototype.listen = function(event, options) {
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
  Mikado$$module$tmp$mikado["unlisten"] = Mikado$$module$tmp$mikado.prototype.unlisten = function(event, options) {
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
    a["_idx"] = index_b;
    b["_idx"] = index_a;
    dom[index_a] = b;
    dom[index_b] = a;
    if (SUPPORT_STORAGE && store) {
      var tmp = store[index_b];
      store[index_b] = store[index_a];
      store[index_a] = tmp;
    }
  };
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("move") !== -1) {
    Mikado$$module$tmp$mikado.prototype.move = function(a, position) {
      var index;
      if (typeof a === "number") {
        index = a;
        a = this.dom[a];
      } else {
        index = a["_idx"];
      }
      if (position < 0) {
        position = this.length + position - 1;
      }
      if (index !== position) {
        this.shift(a, position - index);
      }
      return this;
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS !== "swap") {
    Mikado$$module$tmp$mikado.prototype.shift = function(a, offset, view) {
      if (!offset) {
        return this;
      }
      var index;
      if (typeof a === "number") {
        index = a;
        a = this.dom[a];
      } else {
        index = a["_idx"];
      }
      var up = offset < 0;
      if (up && index || !up && index < this.length - 1) {
        var pos = up ? Math.max(index + offset, 0) : Math.min(index + offset, this.length - 1);
        var b = this.dom[pos];
        var multi_update = up && index - pos > 1 || !up && pos - index > 1;
        if (SUPPORT_STORAGE && !multi_update && this.reuse && (this.store || this.loose)) {
          var tmp = this.store ? this.store[index] : a["_data"];
          this.update(a, this.store ? this.store[pos] : b["_data"], view, pos);
          this.update(b, tmp, view, index);
        } else {
          this.root.insertBefore(a, up ? b : this.dom[pos + 1] || null);
        }
        if (multi_update) {
          var tmp$1 = this.dom[index];
          var tmp_store = SUPPORT_STORAGE && this.store && this.store[index];
          var current;
          if (up) {
            for (var i = index; i > pos; i--) {
              current = this.dom[i] = this.dom[i - 1];
              current["_idx"] = i;
              if (SUPPORT_STORAGE && this.store) {
                this.store[i] = this.store[i - 1];
              }
            }
          } else {
            for (var i$2 = index; i$2 < pos; i$2++) {
              current = this.dom[i$2] = this.dom[i$2 + 1];
              current["_idx"] = i$2;
              if (SUPPORT_STORAGE && this.store) {
                this.store[i$2] = this.store[i$2 + 1];
              }
            }
          }
          current = this.dom[pos] = tmp$1;
          current["_idx"] = pos;
          if (SUPPORT_STORAGE && this.store) {
            this.store[pos] = tmp_store;
          }
        } else {
          update(this.dom, SUPPORT_STORAGE && this.store, a, b, pos, index);
        }
      }
      return this;
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("up") !== -1) {
    Mikado$$module$tmp$mikado.prototype.up = function(a, offset) {
      if (!offset || offset > 0) {
        this.shift(a, -(offset || 1));
      }
      return this;
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("down") !== -1) {
    Mikado$$module$tmp$mikado.prototype.down = function(a, offset) {
      if (!offset || offset > 0) {
        this.shift(a, offset || 1);
      }
      return this;
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("first") !== -1) {
    Mikado$$module$tmp$mikado.prototype.first = function(a) {
      return this.shift(a, -this.length);
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("last") !== -1) {
    Mikado$$module$tmp$mikado.prototype.last = function(a) {
      return this.shift(a, this.length);
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("before") !== -1) {
    Mikado$$module$tmp$mikado.prototype.before = function(tmp_a, tmp_b) {
      if (typeof tmp_a !== "number") {
        tmp_a = tmp_a["_idx"];
      }
      if (typeof tmp_b !== "number") {
        tmp_b = tmp_b["_idx"];
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
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("after") !== -1) {
    Mikado$$module$tmp$mikado.prototype.after = function(tmp_a, tmp_b) {
      if (typeof tmp_a !== "number") {
        tmp_a = tmp_a["_idx"];
      }
      if (typeof tmp_b !== "number") {
        tmp_b = tmp_b["_idx"];
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
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("swap") !== -1) {
    Mikado$$module$tmp$mikado.prototype.swap = function(a, b, view) {
      if (a !== b) {
        var tmp_a;
        var tmp_b;
        if (typeof a === "number") {
          tmp_a = a;
          a = this.dom[a];
        } else {
          tmp_a = a["_idx"];
        }
        if (typeof b === "number") {
          tmp_b = b;
          b = this.dom[b];
        } else {
          tmp_b = b["_idx"];
        }
        if (tmp_a !== tmp_b) {
          if (SUPPORT_STORAGE && this.reuse && (this.store || this.loose)) {
            var tmp = this.store ? this.store[tmp_a] : a["_data"];
            this.update(a, this.store ? this.store[tmp_b] : b["_data"], view, tmp_b);
            this.update(b, tmp, view, tmp_a);
          } else {
            this.root.insertBefore(a, b);
            this.root.insertBefore(b, tmp_a + 1 === tmp_b ? a : this.dom[tmp_a + 1]);
            a["_idx"] = tmp_b;
            b["_idx"] = tmp_a;
            this.dom[tmp_a] = b;
            this.dom[tmp_b] = a;
            if (SUPPORT_STORAGE && this.store) {
              var tmp$3 = this.store[tmp_b];
              this.store[tmp_b] = this.store[tmp_a];
              this.store[tmp_a] = tmp$3;
            }
          }
        }
      }
      return this;
    };
  }
}
var module$tmp$helper = {};
function setText$$module$tmp$cache(target, text) {
  text += "";
  if (target.nodeType !== 3) {
    target["_html"] = null;
    target = target.firstChild || target.appendChild(document.createTextNode(target["_text"] = text));
  }
  if (target["_text"] !== text) {
    target.nodeValue = text;
    target["_text"] = text;
  }
  return this;
}
function getText$$module$tmp$cache(target) {
  if (target.nodeType !== 3 && !(target = target.firstChild)) {
    return "";
  }
  var tmp = target["_text"];
  return tmp || tmp === "" ? tmp : target["_text"] = target.nodeValue;
}
function setHTML$$module$tmp$cache(target, html) {
  html += "";
  if (target["_html"] !== html) {
    target.innerHTML = html;
    target["_html"] = html;
  }
  return this;
}
function getHTML$$module$tmp$cache(target) {
  var tmp = target["_html"];
  return tmp || tmp === "" ? tmp : target["_html"] = target.innerHTML;
}
var regex_cache$$module$tmp$cache = {};
function regex$$module$tmp$cache(classname) {
  return regex_cache$$module$tmp$cache[classname] = new RegExp("(?:^|\\s)" + classname + "(?!\\S)", "g");
}
function addClass$$module$tmp$cache(target, classname) {
  if (!hasClass$$module$tmp$cache(target, classname)) {
    target.className += " " + classname;
    target["_class"] += " " + classname;
  }
  return this;
}
function removeClass$$module$tmp$cache(target, classname) {
  var new_class = (target["_class"] || (target["_class"] = target.className)).replace(regex_cache$$module$tmp$cache[classname] || regex$$module$tmp$cache(classname), "");
  if (target["_class"] !== new_class) {
    target.className = new_class;
    target["_class"] = new_class;
  }
  return this;
}
function setClass$$module$tmp$cache(target, classname) {
  if (target["_class"] !== classname) {
    target.className = classname;
    target["_class"] = classname;
  }
  return this;
}
function getClass$$module$tmp$cache(target) {
  var tmp = target["_class"];
  return tmp || tmp === "" ? tmp : target["_class"] = target.className;
}
function hasClass$$module$tmp$cache(target, classname) {
  return !!(target["_class"] || (target["_class"] = target.className)).match(regex_cache$$module$tmp$cache[classname] || regex$$module$tmp$cache(classname));
}
function toggleClass$$module$tmp$cache(target, classname) {
  if (hasClass$$module$tmp$cache(target, classname)) {
    removeClass$$module$tmp$cache(target, classname);
  } else {
    addClass$$module$tmp$cache(target, classname);
  }
  return this;
}
function setCSS$$module$tmp$cache(target, style) {
  if (target["_css"] !== style) {
    (target["_style"] || (target["_style"] = target.style)).cssText = style;
    target["_css"] = style;
  }
  return this;
}
function getCSS$$module$tmp$cache(target) {
  var tmp = target["_css"];
  return tmp || tmp === "" ? tmp : target["_css"] = (target["_style"] || (target["_style"] = target.style)).getAttribute("style");
}
function setAttribute$$module$tmp$cache(target, attr, value) {
  var key = "_attr_" + attr;
  if (target[key] !== value) {
    target.setAttribute(attr, value);
    target[key] = value;
  }
  return this;
}
function getAttribute$$module$tmp$cache(target, attr) {
  var key = "_attr_" + attr;
  var tmp = target[key];
  return tmp || tmp === "" ? tmp : target[key] = target.getAttribute(attr);
}
function hasAttribute$$module$tmp$cache(target, attr) {
  var tmp = getAttribute$$module$tmp$cache(target, attr);
  return tmp || tmp === "";
}
function removeAttribute$$module$tmp$cache(target, attr) {
  var key = "_attr_" + attr;
  if (target[key] !== null) {
    target[key] = null;
    target.removeAttribute(attr);
  }
  return this;
}
var module$tmp$cache = {};
module$tmp$cache.addClass = addClass$$module$tmp$cache;
module$tmp$cache.getAttribute = getAttribute$$module$tmp$cache;
module$tmp$cache.getCSS = getCSS$$module$tmp$cache;
module$tmp$cache.getClass = getClass$$module$tmp$cache;
module$tmp$cache.getHTML = getHTML$$module$tmp$cache;
module$tmp$cache.getText = getText$$module$tmp$cache;
module$tmp$cache.hasAttribute = hasAttribute$$module$tmp$cache;
module$tmp$cache.hasClass = hasClass$$module$tmp$cache;
module$tmp$cache.removeAttribute = removeAttribute$$module$tmp$cache;
module$tmp$cache.removeClass = removeClass$$module$tmp$cache;
module$tmp$cache.setAttribute = setAttribute$$module$tmp$cache;
module$tmp$cache.setCSS = setCSS$$module$tmp$cache;
module$tmp$cache.setClass = setClass$$module$tmp$cache;
module$tmp$cache.setHTML = setHTML$$module$tmp$cache;
module$tmp$cache.setText = setText$$module$tmp$cache;
module$tmp$cache.toggleClass = toggleClass$$module$tmp$cache;
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
          data[i] = this.dom[i]["_data"];
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
      this.store = data;
    }
    return this;
  };
  Mikado$$module$tmp$mikado.prototype.delete = function(id) {
    localStorage$$module$tmp$store.removeItem(id || this.template);
    return this;
  };
}
var module$tmp$store = {};
var proxy_setter$$module$tmp$proxy = {"_text":function(target, text) {
  target.nodeValue = text;
}, "_html":function(target, html) {
  target.innerHTML = html;
}, "_class":function(target, class_name) {
  target.className = class_name;
}, "_css":function(target, css) {
  (target["_style"] || (target["_style"] = target.style)).cssText = css;
}, "_attr":function(target, value, attr) {
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
    var Proxy$4 = function(obj, proxy) {
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
    Proxy$4.prototype.define = function(_obj, _key, _val) {
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
    window["Proxy"] = Proxy$4;
  }
}
var module$tmp$proxy = {};
module$tmp$proxy.default = create_proxy$$module$tmp$proxy;
var $jscomp$destructuring$var1 = window;
var requestAnimationFrame$$module$tmp$mikado = $jscomp$destructuring$var1.requestAnimationFrame;
var cancelAnimationFrame$$module$tmp$mikado = $jscomp$destructuring$var1.cancelAnimationFrame;
var defaults$$module$tmp$mikado = {"reuse":true, "prefetch":true};
if (SUPPORT_STORAGE) {
  defaults$$module$tmp$mikado["store"] = true;
  defaults$$module$tmp$mikado["loose"] = true;
}
if (SUPPORT_POOLS) {
  defaults$$module$tmp$mikado["pool"] = true;
}
if (SUPPORT_CACHE) {
  defaults$$module$tmp$mikado["cache"] = true;
}
var state$$module$tmp$mikado = {};
var templates$$module$tmp$mikado = {};
var factory_pool$$module$tmp$mikado = {};
var template_pool$$module$tmp$mikado = {};
var keyed_pool$$module$tmp$mikado = {};
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
    if (SUPPORT_POOLS && this.key && this.root) {
      this.root["_pool"] = this.live;
      this.live = target["_pool"] || {};
    }
    this.root = target;
    this.check();
    this.dom = target["_dom"] || (target["_dom"] = collection_to_array$$module$tmp$mikado(target.children));
    this.length = this.dom.length;
  }
  return this;
};
if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("sync") !== -1) {
  Mikado$$module$tmp$mikado.prototype.sync = function(clear_cache) {
    this.root["_dom"] = this.dom = collection_to_array$$module$tmp$mikado(this.root.children);
    this.length = this.dom.length;
    if (SUPPORT_CACHE && clear_cache && this.cache) {
      for (var i = 0; i < this.length; i++) {
        if (SUPPORT_CACHE_HELPERS) {
          var path = this.dom[i]["_path"];
          for (var x = 0, tmp = undefined; x < path.length; x++) {
            tmp = path[x];
            tmp["_class"] = tmp["_html"] = tmp["_text"] = tmp["_css"] = null;
          }
        } else {
          this.dom[i]["_cache"] = null;
        }
      }
    }
    return this;
  };
}
if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("purge") !== -1) {
  Mikado$$module$tmp$mikado.purge = Mikado$$module$tmp$mikado.prototype.purge = function(template) {
    if (template || (template = this.template)) {
      if (typeof template === "object") {
        template = template["n"];
      }
      factory_pool$$module$tmp$mikado[template + (SUPPORT_CACHE && this.cache ? "_cache" : "")] = null;
      if (SUPPORT_POOLS) {
        template_pool$$module$tmp$mikado[template] = [];
        keyed_pool$$module$tmp$mikado[template] = {};
        this.key && (this.live = {});
        this.tpl_pool && (this.tpl_pool = template_pool$$module$tmp$mikado[template]);
        this.key_pool && (this.key_pool = keyed_pool$$module$tmp$mikado[template]);
      }
    } else {
      factory_pool$$module$tmp$mikado = {};
      if (SUPPORT_POOLS) {
        var keys = Object.keys(templates$$module$tmp$mikado);
        for (var i = 0, key = undefined; i < keys.length; i++) {
          template_pool$$module$tmp$mikado[key = keys[i]] = [];
          keyed_pool$$module$tmp$mikado[key] = {};
        }
      }
    }
    return this;
  };
}
Mikado$$module$tmp$mikado.prototype.index = function(node) {
  return node["_idx"];
};
Mikado$$module$tmp$mikado.prototype.node = function(index) {
  return this.dom[index];
};
if (SUPPORT_STORAGE) {
  Mikado$$module$tmp$mikado.prototype.data = function(index) {
    var get_by_node = typeof index === "object";
    return this.loose ? (get_by_node ? index : this.dom[index])["_data"] : this.store[get_by_node ? index["_idx"] : index];
  };
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("find") !== -1) {
    Mikado$$module$tmp$mikado.prototype.find = function(data) {
      if (SUPPORT_POOLS && this.key) {
        var key = typeof data !== "object" ? data : data[this.key];
        return this.live[key];
      }
      for (var i = 0; i < this.length; i++) {
        if (this.data(i) === data) {
          return this.dom[i];
        }
      }
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("search") !== -1) {
    Mikado$$module$tmp$mikado.prototype.search = function(data) {
      var values = Object.values(data).join("^");
      for (var i = 0; i < this.length; i++) {
        if (Object.values(this.data(i)).join("^") === values) {
          return this.dom[i];
        }
      }
    };
  }
  if (SUPPORT_HELPERS === true || SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("where") !== -1) {
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
  if (typeof template === "string") {
    template = templates$$module$tmp$mikado[template];
  } else {
    if (!options) {
      if (template && !template["n"]) {
        options = template;
        template = null;
      }
    }
    if (!template) {
      template = templates$$module$tmp$mikado[this.template];
    } else {
      if (template["n"]) {
        Mikado$$module$tmp$mikado.register(template);
      }
    }
  }
  options = options ? Object.assign({}, this.config || defaults$$module$tmp$mikado, options) : defaults$$module$tmp$mikado;
  this.config = options;
  this.reuse = options["reuse"];
  this.state = options["state"] || state$$module$tmp$mikado;
  if (SUPPORT_CACHE) {
    this.cache = options["cache"];
  }
  if (SUPPORT_ASYNC) {
    this.async = options["async"];
    this.timer = 0;
  }
  if (SUPPORT_STORAGE) {
    var store = options["store"];
    this.loose = typeof store !== "object" && options["loose"];
    if (!store || this.loose) {
      this.extern = false;
      this.store = false;
    } else {
      this.extern = typeof store === "object";
      this.store = this.extern ? store : [];
    }
    if (SUPPORT_REACTIVE) {
      this.proxy = false;
    }
  }
  var tpl_name = template["n"];
  if (this.template !== tpl_name) {
    this.template = tpl_name;
    this.static = template["d"];
    this.vpath = null;
    this.update_path = null;
    if (SUPPORT_TEMPLATE_EXTENSION) {
      this["include"] = null;
    }
    this.factory = options["prefetch"] && this.parse(template);
    this.check();
    if (SUPPORT_POOLS) {
      this.key = template["k"];
      this.live = this.key && {};
      this.tpl_pool = this.reuse && options["pool"] && (template_pool$$module$tmp$mikado[tpl_name] || (template_pool$$module$tmp$mikado[tpl_name] = []));
      this.key_pool = this.key && (options["keep"] || this.tpl_pool) && (keyed_pool$$module$tmp$mikado[tpl_name] || (keyed_pool$$module$tmp$mikado[tpl_name] = {}));
      this.size = this.tpl_pool && options["size"];
    }
  }
  return this;
};
Mikado$$module$tmp$mikado.once = Mikado$$module$tmp$mikado.once = function(root, template, data, view, callback) {
  var tmp = Mikado$$module$tmp$mikado.new(root, template);
  if (callback) {
    var fn = callback;
    callback = function() {
      tmp.destroy(true);
      fn();
    };
  }
  tmp.render(data, view, callback);
  if (!callback) {
    tmp.destroy(true);
  }
  return Mikado$$module$tmp$mikado;
};
Mikado$$module$tmp$mikado.prototype.check = function() {
  if (this.root) {
    var id = this.root["_tpl"];
    if (id !== this.template) {
      this.root["_tpl"] = this.template;
      if (id) {
        if (SUPPORT_POOLS) {
          if (this.key) {
            this.live = {};
          }
          this.length = 0;
        }
        this.remove(0, this.length);
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
    node["_idx"] = i;
    array[i] = node;
  }
  return array;
}
Mikado$$module$tmp$mikado.prototype.create = function(data, view, index) {
  var keyed = SUPPORT_POOLS && this.key;
  var key = keyed && data[keyed];
  var node;
  var pool;
  var factory;
  if (keyed && ((pool = this.key_pool) && (node = pool[key]) || (node = this.live[key]))) {
    if (pool) {
      pool[key] = null;
      if (pool = this.tpl_pool) {
        var pos = node["_index"];
        node["_index"] = null;
        var last = pool.pop();
        if (last !== node) {
          last["_index"] = pos;
          pool[pos] = last;
        }
      }
    } else {
      keyed = false;
    }
  } else {
    if (SUPPORT_POOLS && (node = this.tpl_pool) && node.length) {
      node = node.pop();
      if (pool) {
        node["_index"] = null;
        var ref = node["_key"];
        pool[ref] = null;
      }
    } else {
      factory = node = this.factory || (this.factory = this.parse(templates$$module$tmp$mikado[this.template]));
    }
  }
  this.apply(node, data, view, index);
  if (factory) {
    node = factory.cloneNode(true);
  }
  if (keyed) {
    node["_key"] = key;
    this.live[key] = node;
  }
  return node;
};
Mikado$$module$tmp$mikado.prototype.apply = function(root, data, payload, index) {
  if (this.static) {
    if (DEBUG) {
      console.warn("The template '" + this.template + "' is a static template and should not be refreshed.");
    }
  } else {
    index || index === 0 || (index = root["_idx"]);
    if (SUPPORT_STORAGE) {
      data || (data = this.store ? this.store[index] : root["_data"]);
    }
    return this.update_path(root["_path"] || this.create_path(root), SUPPORT_CACHE && !SUPPORT_CACHE_HELPERS && root["_cache"], data, index, payload);
  }
};
if (SUPPORT_STORAGE) {
  Mikado$$module$tmp$mikado.prototype.refresh = function(index, view) {
    if (DEBUG) {
      if (this.static) {
        console.warn("The template '" + this.template + "' is a static template and should not be refreshed.");
      }
    }
    var tmp;
    var node;
    if (typeof index === "number") {
      node = this.dom[index];
    } else {
      if (index && typeof(tmp = index["_idx"]) === "number") {
        node = index;
        index = tmp;
      }
    }
    if (node) {
      return this.apply(node, null, view, index);
    }
    var length = this.length;
    var data = this.store;
    var count = data ? data.length : length;
    var min = length < count ? length : count;
    var x = 0;
    if (count < length) {
      this.remove(count, length - count);
    }
    if (x < min) {
      for (; x < min; x++) {
        this.apply(this.dom[x], null, view, x);
      }
    }
    if (x < count) {
      for (; x < count; x++) {
        this.add(data[x], view);
      }
    }
    if (data && this.loose) {
      this.store = null;
    }
    return this;
  };
}
Mikado$$module$tmp$mikado.prototype.render = function(data, view, callback, skip_async) {
  if (DEBUG) {
    if (!this.root) {
      console.error("Template was not mounted or root was not found.");
    } else {
      if (this.template !== this.root["_tpl"]) {
        console.warn("Another template is already assigned to this root. Please use '.mount()' or '.check()' before calling '.render()' to switch the context of a template.");
      }
    }
  }
  if (SUPPORT_STORAGE && !data) {
    return this.refresh();
  }
  if (SUPPORT_ASYNC && !skip_async) {
    if (view && typeof view !== "object") {
      callback = view;
      view = null;
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
      var self$5 = this;
      return new Promise(function(resolve) {
        self$5.timer = requestAnimationFrame$$module$tmp$mikado(function() {
          self$5.timer = 0;
          self$5.render(data, view, null, true);
          resolve();
        });
      });
    }
  }
  if (this.static) {
    this.dom[0] || this.add();
  } else {
    var length = this.length;
    var count;
    count = data.length;
    if (typeof count === "undefined") {
      data = [data];
      count = 1;
    }
    if (!count) {
      return this.remove(0, length);
    }
    var replace_key = SUPPORT_POOLS && this.key;
    if (!replace_key && !this.reuse) {
      this.remove(0, length, count);
      length = 0;
    }
    var min = length < count ? length : count;
    var x = 0;
    if (x < min) {
      for (; x < min; x++) {
        var node = this.dom[x];
        var item = data[x];
        var key = undefined;
        var tmp = undefined;
        if (replace_key && node["_key"] !== (key = item[replace_key])) {
          if (tmp = this.live[key]) {
            this.arrange(node, tmp, item, view, x);
          } else {
            this.replace(node, item, view, x);
          }
        } else {
          if (replace_key) {
            node["_idx"] = x;
          }
          this.update(node, item, view, x);
        }
      }
    }
    if (x < count) {
      for (; x < count; x++) {
        this.add(data[x], view);
      }
    } else {
      if (count < length) {
        this.remove(count, length - count);
      }
    }
  }
  return this;
};
if (SUPPORT_POOLS) {
  Mikado$$module$tmp$mikado.prototype.arrange = function(old_node, new_node, item, view, x) {
    var idx = new_node["_idx"];
    new_node["_idx"] = x;
    old_node["_idx"] = idx;
    this.dom[x] = new_node;
    this.dom[idx] = old_node;
    if (SUPPORT_STORAGE) {
      if (this.store) {
        this.store[idx] = this.store[x];
        this.store[x] = item;
      } else {
        if (this.loose) {
          new_node["_data"] = old_node["_data"];
          old_node["_data"] = item;
        }
      }
    }
    this.root.insertBefore(new_node, old_node);
    this.apply(new_node, item, view, x);
  };
}
Mikado$$module$tmp$mikado.prototype.add = function(data, view, index, _replace_node) {
  var has_index;
  if (!_replace_node) {
    if (typeof view === "number") {
      index = view;
      view = null;
      has_index = true;
    } else {
      if (index || index === 0) {
        has_index = true;
      }
    }
  }
  var length = _replace_node || has_index ? index : this.length;
  var tmp = this.create(data, view, length);
  if (SUPPORT_STORAGE) {
    if (SUPPORT_REACTIVE && this.proxy) {
      data = create_proxy$$module$tmp$proxy(data, tmp["_path"] || this.create_path(tmp), this.proxy);
    }
    if (this.store) {
      if (has_index) {
        this.store.splice(length, 0, data);
      } else {
        this.store[length] = data;
      }
    } else {
      if (this.loose) {
        tmp["_data"] = data;
      }
    }
  }
  tmp["_idx"] = length;
  if (has_index) {
    this.root.insertBefore(tmp, this.dom[length] || null);
    this.dom.splice(length, 0, tmp);
    this.length++;
    for (; ++length < this.length;) {
      this.dom[length]["_idx"] = length;
    }
  } else {
    if (_replace_node) {
      this.root.replaceChild(tmp, _replace_node);
    } else {
      this.root.appendChild(tmp);
      this.length++;
    }
    this.dom[length] = tmp;
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.clear = function() {
  return this.remove(0, this.length);
};
Mikado$$module$tmp$mikado.prototype.destroy = function(unload) {
  if (unload) {
    this.unload();
  }
  this.dom = null;
  this.root = null;
  this.template = null;
  this.vpath = null;
  this.update_path = null;
  this.factory = null;
  this.length = 0;
  if (SUPPORT_POOLS) {
    this.live = {};
  }
  if (SUPPORT_TEMPLATE_EXTENSION) {
    this["include"] = null;
  }
  if (SUPPORT_STORAGE) {
    this.store = null;
  }
};
if (SUPPORT_ASYNC) {
  Mikado$$module$tmp$mikado.prototype.cancel = function() {
    if (this.timer) {
      cancelAnimationFrame$$module$tmp$mikado(this.timer);
      this.timer = null;
    }
  };
}
Mikado$$module$tmp$mikado.prototype.append = function(data, view, position) {
  var has_position;
  if (typeof view === "number") {
    position = view;
    view = null;
    has_position = true;
  } else {
    has_position = position || position === 0;
  }
  var count = data.length;
  for (var x = 0; x < count; x++) {
    this.add(data[x], view, has_position ? position++ : null);
  }
  return this;
};
Mikado$$module$tmp$mikado.prototype.remove = function(index, count, resize) {
  var length = this.length;
  if (typeof index === "object") {
    index = index["_idx"];
  } else {
    if (index < 0) {
      index = length + index - 1;
    }
  }
  if (!length || index >= length) {
    return this;
  }
  if (count < 0) {
    if (count < 1) {
      index -= count + 1;
      if (index < 0) {
        index = 0;
      }
    }
    count *= -1;
  } else {
    count || (count = 1);
  }
  var nodes;
  if (count >= length) {
    if (SUPPORT_STORAGE && this.store && !this.extern) {
      this.store = resize ? new Array(resize) : [];
    }
    nodes = this.dom;
    count = nodes.length;
    this.root.textContent = "";
    this.root["_dom"] = this.dom = resize ? new Array(resize) : [];
    length = 0;
  } else {
    if (SUPPORT_STORAGE && this.store && !this.extern) {
      this.store.splice(index, count);
    }
    nodes = this.dom.splice(index, count);
    length -= count;
  }
  this.length = length;
  if (index < length) {
    for (; index < length; index++) {
      this.dom[index]["_idx"] = index;
    }
  }
  var queued_pool_offset;
  if (SUPPORT_POOLS && this.tpl_pool) {
    var size = this.tpl_pool.length;
    var limit = this.size;
    if (limit) {
      if (size >= limit) {
        return this;
      }
      if (size + count > limit) {
        nodes.splice(limit - size);
        count = nodes.length;
      }
    }
    if (this.cache && count > 1 && !this.key) {
      reverse$$module$tmp$mikado(nodes);
    }
    queued_pool_offset = size + 1;
    template_pool$$module$tmp$mikado[this.template] = this.tpl_pool = size ? this.tpl_pool.concat(nodes) : nodes;
  }
  var key = SUPPORT_POOLS && this.key;
  var pool = SUPPORT_POOLS && this.key_pool;
  for (var x = 0, tmp = undefined; x < count; x++) {
    tmp = nodes[x];
    if (length) {
      if (SUPPORT_POOLS && SUPPORT_TEMPLATE_EXTENSION && this["include"]) {
        for (var y = 0; y < this["include"].length; y++) {
          this["include"][y].clear();
        }
      }
      this.root.removeChild(tmp);
    }
    if (key) {
      var ref = tmp["_key"];
      this.live[ref] = null;
      if (pool) {
        pool[ref] = tmp;
        if (queued_pool_offset) {
          tmp["_index"] = queued_pool_offset + x - 1;
        }
      }
    }
  }
  return this;
};
if (SUPPORT_POOLS) {
  Mikado$$module$tmp$mikado.prototype.replace = function(node, data, view, index) {
    if (typeof index === "undefined") {
      index = node["_idx"];
    }
    this.add(data, view, index, node);
    if (SUPPORT_POOLS && this.key) {
      var ref = node["_key"];
      this.live[ref] = null;
      if (this.key_pool) {
        this.key_pool[ref] = node;
      }
    }
    if (SUPPORT_POOLS && this.tpl_pool) {
      var pool = this.tpl_pool;
      if (this.key) {
        node["_index"] = pool.length;
      }
      pool[pool.length] = node;
    }
    return this;
  };
}
Mikado$$module$tmp$mikado.prototype.update = function(node, data, view, index) {
  if (DEBUG) {
    if (this.static) {
      console.warn("The template '" + this.template + "' is a static template and should not be updated.");
    }
  }
  if (typeof index === "undefined") {
    if (typeof node === "number") {
      index = node;
      node = this.dom[node];
    } else {
      index = node["_idx"];
    }
  }
  if (SUPPORT_POOLS && this.key) {
    var ref = node["_key"];
    var tmp = data[this.key];
    if (ref !== tmp) {
      this.live[ref] = null;
      this.live[tmp] = node;
      node["_key"] = tmp;
    }
  }
  if (SUPPORT_STORAGE) {
    if (this.store) {
      this.store[index] = data;
    } else {
      if (this.loose) {
        node["_data"] = data;
      }
    }
  }
  return this.apply(node, data, view, index);
};
Mikado$$module$tmp$mikado.prototype.create_path = function(root) {
  var length = this.vpath.length;
  var cache = {};
  var new_path = new Array(length);
  for (var x = 0; x < length; x++) {
    var path = this.vpath[x];
    new_path[x] = cache[path] || resolve$$module$tmp$mikado(root, path, cache);
  }
  root["_path"] = new_path;
  root["_cache"] = {};
  return new_path;
};
function resolve$$module$tmp$mikado(root, path, cache) {
  for (var i = 0, length = path.length, tmp = ""; i < length; i++) {
    var current_path = path[i];
    tmp += current_path;
    if (cache[tmp]) {
      root = cache[tmp];
    } else {
      if (current_path === ">") {
        root = root.firstElementChild;
      } else {
        if (current_path === "+") {
          root = root.nextElementSibling;
        } else {
          if (current_path === "|") {
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
Mikado$$module$tmp$mikado.prototype.parse = function(tpl, index, path, dom_path) {
  if (SUPPORT_POOLS && !index) {
    var cache = factory_pool$$module$tmp$mikado[tpl["n"] + (SUPPORT_CACHE && this.cache ? "_cache" : "")];
    if (cache) {
      this.update_path = cache.update_path;
      this.static = cache.static;
      if (SUPPORT_TEMPLATE_EXTENSION) {
        this["include"] = cache.include;
      }
      if (SUPPORT_REACTIVE) {
        this.proxy = cache.proxy;
      }
      this.vpath = cache.vpath;
      return cache.node;
    }
  }
  var node = document.createElement(tpl["t"] || "div");
  if (!index) {
    index = 0;
    path = "&";
    tmp_fn$$module$tmp$mikado = "";
    this.vpath = [];
    node["_path"] = dom_path = [];
    if (SUPPORT_CACHE) {
      node["_cache"] = {};
    }
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
      has_update = 2;
    }
  }
  if (SUPPORT_TEMPLATE_EXTENSION && tpl["f"]) {
    tmp_fn$$module$tmp$mikado += ";if(" + tpl["f"] + "){self.hidden=false";
    has_update = 2;
  }
  if (class_name) {
    if (typeof class_name === "object") {
      var observable = class_name[1];
      class_name = class_name[0];
      new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_CACHE_HELPERS ? ";v=" + class_name + ";if(self._class!==v){self._class=v;self.className=v}" : ";v=" + class_name + ";if(s._class" + path_length + "!==v){s._class" + path_length + "=v;self.className=v}" : ";self.className=" + class_name;
      if (SUPPORT_REACTIVE && observable) {
        init_proxy$$module$tmp$mikado(this, class_name, ["_class", path_length]);
      }
      has_update++;
    } else {
      node.className = class_name;
    }
  }
  if (attr || events) {
    var keys;
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
        new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_CACHE_HELPERS ? ";v=" + value + ";if(self['_attr_" + key + "']!==v){self['_attr_" + key + "']=v;self.setAttribute('" + key + "',v)}" : ";v=" + value + ";if(s['_attr_" + key + path_length + "']!==v){s['_attr_" + key + path_length + "']=v;self.setAttribute('" + key + "',v)}" : ";self.setAttribute('" + key + "'," + value + ")";
        if (SUPPORT_REACTIVE && observable$6) {
          init_proxy$$module$tmp$mikado(this, value, ["_attr", path_length, key]);
        }
        has_update++;
      } else {
        node.setAttribute(key, value);
      }
    }
  }
  if (style) {
    if (typeof style === "string") {
      node.style.cssText = style;
    } else {
      if (style.length) {
        var observable$7 = style[1];
        style = style[0];
        new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_CACHE_HELPERS ? ";v=" + style + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}" : ";v=" + style + ";if(s._css" + path_length + "!==v){s._css" + path_length + "=v;(self._style||(self._style=self.style)).cssText=v}" : ";self.style.cssText=" + style;
        if (SUPPORT_REACTIVE && observable$7) {
          init_proxy$$module$tmp$mikado(this, style, ["_css", path_length]);
        }
        has_update++;
      }
    }
  }
  var text_fn = "";
  if (SUPPORT_TEMPLATE_EXTENSION && (tpl["@"] || tpl["r"])) {
    this["include"] || (this["include"] = []);
    var partial = tpl["@"] || tpl["i"];
    if (!tpl["@"]) {
      partial["n"] = tpl["@"] = this.template + "@" + this["include"].length;
      delete tpl["i"];
    } else {
      if (typeof partial === "string") {
        partial = templates$$module$tmp$mikado[partial];
      }
    }
    child = null;
    tmp_fn$$module$tmp$mikado += ";this.include[" + this["include"].length + "].mount(p[" + path_length + "]).render(" + tpl["r"] + (tpl["m"] ? ".slice(" + (tpl["m"] >= 0 ? "0," + tpl["m"] : tpl["m"]) + ")" : "") + ",view)";
    var old_fn = tmp_fn$$module$tmp$mikado;
    tmp_fn$$module$tmp$mikado = "";
    this["include"].push(new Mikado$$module$tmp$mikado(node, partial, Object.assign(this.config, {"store":false, "async":false})));
    tmp_fn$$module$tmp$mikado = old_fn;
    this.static = false;
  } else {
    if (!child) {
      if (SUPPORT_TEMPLATE_EXTENSION && tpl["+"]) {
        child = templates$$module$tmp$mikado[tpl["+"]];
      } else {
        if (text) {
          var observable$8;
          var is_object = typeof text === "object";
          if (is_object) {
            observable$8 = text[1];
            text = text[0];
          }
          var text_node = document.createTextNode(text);
          if (is_object) {
            if (has_update) {
              path_length++;
            }
            this.vpath[path_length] = path + "|";
            dom_path[path_length] = text_node;
            var text_fn$9 = SUPPORT_CACHE && this.cache ? SUPPORT_CACHE_HELPERS ? ";v=" + text + ";if(self._text!==v){self._text=v;self.nodeValue=v}" : ";v=" + text + ";if(s._text" + path_length + "!==v){s._text" + path_length + "=v;self.nodeValue=v}" : ";self.nodeValue=" + text;
            concat_path$$module$tmp$mikado(has_update, text_fn$9, path_length, SUPPORT_CACHE && this.cache);
            if (SUPPORT_REACTIVE && observable$8) {
              init_proxy$$module$tmp$mikado(this, text, ["_text", path_length]);
            }
            if (has_update) {
              path_length--;
            }
          }
          node.appendChild(text_node);
        } else {
          if (html) {
            if (typeof html === "object") {
              var observable$10 = html[1];
              html = html[0];
              new_fn += SUPPORT_CACHE && this.cache ? SUPPORT_CACHE_HELPERS ? ";v=" + html + ";if(self._html!==v){self._html=v;self.innerHTML=v}" : ";v=" + html + ";if(s._html" + path_length + "!==v){s._html" + path_length + "=v;self.innerHTML=v}" : ";self.innerHTML=" + html;
              if (SUPPORT_REACTIVE && observable$10) {
                init_proxy$$module$tmp$mikado(this, html, ["_html", path_length]);
              }
              has_update++;
            } else {
              node.innerHTML = html;
            }
          }
        }
      }
    }
  }
  if (has_update) {
    this.vpath[path_length] = path;
    dom_path[path_length] = node;
    this.static = false;
    concat_path$$module$tmp$mikado(has_update, new_fn, path_length, SUPPORT_CACHE && this.cache);
  } else {
    if (new_fn) {
      tmp_fn$$module$tmp$mikado += new_fn;
    }
  }
  tmp_fn$$module$tmp$mikado += text_fn;
  if (child) {
    var include;
    if (child.length) {
      var tmp$11 = ">";
      for (var i$12 = 0, current = undefined; i$12 < child.length; i$12++) {
        if (i$12) {
          tmp$11 += "+";
        }
        current = child[i$12];
        if (SUPPORT_TEMPLATE_EXTENSION && (include = current["+"])) {
          current = templates$$module$tmp$mikado[include];
        }
        node.appendChild(this.parse(current, index + i$12 + 1, path + tmp$11, dom_path));
      }
    } else {
      if (SUPPORT_TEMPLATE_EXTENSION && (include = child["+"])) {
        child = templates$$module$tmp$mikado[include];
      }
      node.appendChild(this.parse(child, index + 1, path + ">", dom_path));
    }
  }
  if (SUPPORT_TEMPLATE_EXTENSION && tpl["f"]) {
    tmp_fn$$module$tmp$mikado += "}else " + (has_update > 1 ? "self" : "p[" + path_length + "]") + ".hidden=true";
  }
  if (!index) {
    if (!this.static) {
      if (tmp_fn$$module$tmp$mikado) {
        this.update_path = Function("p", "s", "data", "index", "view", '"use strict";var self,v' + tmp_fn$$module$tmp$mikado);
      }
    }
    if (SUPPORT_POOLS) {
      var payload = {update_path:this.update_path, static:this.static, vpath:this.vpath, node:node};
      if (SUPPORT_TEMPLATE_EXTENSION) {
        payload.include = this["include"];
      }
      if (SUPPORT_REACTIVE) {
        payload.proxy = this.proxy;
      }
      factory_pool$$module$tmp$mikado[tpl["n"] + (SUPPORT_CACHE && this.cache ? "_cache" : "")] = payload;
    }
  }
  return node;
};
function init_proxy$$module$tmp$mikado(self, text, payload) {
  self.proxy || (self.proxy = {});
  (self.proxy[text] || (self.proxy[text] = [])).push(payload);
}
function concat_path$$module$tmp$mikado(has_update, new_fn, path_length, cache) {
  if (SUPPORT_CACHE_HELPERS && cache || has_update > 1) {
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
  if (!template) {
    template = this.template;
  } else {
    if (typeof template === "object") {
      template = template["n"];
    }
  }
  if (template) {
    templates$$module$tmp$mikado[template] = factory_pool$$module$tmp$mikado[template] = null;
    if (SUPPORT_POOLS) {
      template_pool$$module$tmp$mikado[template] = [];
      keyed_pool$$module$tmp$mikado[template] = {};
    }
    if (SUPPORT_CACHE) {
      factory_pool$$module$tmp$mikado[template + "_cache"] = null;
    }
  }
};
Mikado$$module$tmp$mikado.unregister = Mikado$$module$tmp$mikado.prototype.unregister = Mikado$$module$tmp$mikado.unload = Mikado$$module$tmp$mikado.prototype.unload;
function reverse$$module$tmp$mikado(arr) {
  var length = arr.length;
  var half = length / 2 | 0;
  for (var i = 0, tmp = undefined; i < half; i++) {
    tmp = arr[i];
    arr[i] = arr[length - i - 1];
    arr[length - i - 1] = tmp;
  }
  return arr;
}
var module$tmp$mikado = {};
module$tmp$mikado.default = Mikado$$module$tmp$mikado;
Mikado$$module$tmp$mikado.prototype.load;
Mikado$$module$tmp$mikado.prototype.update;
Mikado$$module$tmp$mikado.prototype.sync;
Mikado$$module$tmp$mikado.prototype.replace;
Mikado$$module$tmp$mikado.prototype.render;
Mikado$$module$tmp$mikado.prototype.refresh;
Mikado$$module$tmp$mikado.prototype.apply;
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
Mikado$$module$tmp$mikado.prototype.before;
Mikado$$module$tmp$mikado.prototype.after;
Mikado$$module$tmp$mikado.prototype.swap;
Promise.prototype.then;
var module$tmp$export = {};
var event_types$$module$tmp$compile = {"tap":1, "change":1, "click":1, "dblclick":1, "input":1, "keydown":1, "keypress":1, "keyup":1, "mousedown":1, "mouseenter":1, "mouseleave":1, "mousemove":1, "mouseout":1, "mouseover":1, "mouseup":1, "mousewheel":1, "touchstart":1, "touchmove":1, "touchend":1, "reset":1, "select":1, "submit":1, "toggle":1, "blur":1, "error":1, "focus":1, "load":1, "resize":1, "scroll":1};
var is_static$$module$tmp$compile;
var counter$$module$tmp$compile = 0;
function compile$$module$tmp$compile(node, recursive) {
  var template = {};
  if (!recursive) {
    is_static$$module$tmp$compile = true;
    if (typeof node === "string") {
      if (node.indexOf("<") !== -1) {
        var tmp = document.createElement("div");
        tmp.innerHTML = node;
        node = tmp.firstElementChild;
        template["n"] = node.id || "tpl_" + counter$$module$tmp$compile++;
      } else {
        template["n"] = node;
        node = document.getElementById(node);
      }
    } else {
      template["n"] = node.id || "tpl_" + counter$$module$tmp$compile++;
    }
    node = node;
    if (node.content) {
      node = node.content.firstElementChild;
    } else {
      if (node.tagName === "TEMPLATE") {
        node = node.firstElementChild;
      }
    }
  }
  var tagName = node.tagName;
  if (tagName) {
    if (tagName === "INCLUDE") {
      var from = node.getAttribute("from");
      if (from) {
        template["+"] = from;
      } else {
        template["+"] = strip$$module$tmp$compile(node.firstChild.nodeValue);
      }
      return template;
    } else {
      if (tagName !== "DIV") {
        template["t"] = tagName.toLowerCase();
      }
    }
  } else {
    var value = node;
    if (value && (value = value.nodeValue)) {
      value = value.replace(/\s+/g, " ");
      if (value && value.trim()) {
        var pos = value.indexOf("{{@");
        if (pos !== -1) {
          var pos_end = value.indexOf("}}", pos);
          template["j"] = value.substring(pos + 3, pos_end);
          value = value.substring(0, pos) + value.substring(pos_end + 2);
        }
        if (value && value.trim()) {
          if (value.indexOf("{{#") !== -1) {
            handle_value$$module$tmp$compile(template, "h", value.replace(/{{#/g, "{{"));
          } else {
            handle_value$$module$tmp$compile(template, "x", value);
          }
        }
      }
    }
    return template["j"] || value && value.trim() ? template : null;
  }
  var attributes = node.attributes;
  if (attributes.length) {
    for (var i = 0; i < attributes.length; i++) {
      var attr_name = attributes[i].nodeName;
      if (attr_name === "class") {
        handle_value$$module$tmp$compile(template, "c", node.className);
      } else {
        var attr_value = node.getAttribute(attr_name);
        if (attr_name === "style") {
          handle_value$$module$tmp$compile(template, "s", attr_value);
        } else {
          if (attr_name === "if") {
            handle_value$$module$tmp$compile(template, "f", attr_value);
          } else {
            if (attr_name === "include") {
              if (!node.hasAttribute("for")) {
                var tmp$13 = {};
                (template["i"] || (template["i"] = [])).push(tmp$13);
                handle_value$$module$tmp$compile(tmp$13, "+", attr_value);
              }
            } else {
              if (attr_name === "for" && tagName !== "LABEL") {
                var tmp$14 = node.getAttribute("include");
                if (tmp$14) {
                  template["@"] = strip$$module$tmp$compile(tmp$14);
                }
                handle_value$$module$tmp$compile(template, "r", attr_value);
              } else {
                if (attr_name === "max") {
                  handle_value$$module$tmp$compile(template, "m", attr_value);
                } else {
                  if (attr_name === "js") {
                    template["j"] = strip$$module$tmp$compile(attr_value);
                  } else {
                    if (attr_name === "key") {
                      handle_value$$module$tmp$compile(template, "k", attr_value.replace("data.", ""));
                    } else {
                      if (attr_name === "bind") {
                        var parts = attr_value.split(":");
                        if (parts.length < 2) {
                          parts.unshift("value");
                        }
                        attr_name = parts[0];
                        attr_value = "{{==" + parts[1] + "}}";
                      }
                      if (event_types$$module$tmp$compile[attr_name.substring(2)] && attr_value.indexOf("{{") !== -1) {
                        attr_name = attr_name.substring(2);
                      }
                      if (event_types$$module$tmp$compile[attr_name]) {
                        handle_value$$module$tmp$compile(template["e"] || (template["e"] = {}), attr_name, attr_value);
                      } else {
                        handle_value$$module$tmp$compile(template["a"] || (template["a"] = {}), attr_name, attr_value);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  var children = node.childNodes;
  if (children.length) {
    if (children.length > 1) {
      var count = 0;
      for (var i$15 = 0; i$15 < children.length; i$15++) {
        var tmp$16 = compile$$module$tmp$compile(children[i$15], 1);
        if (tmp$16) {
          (template["i"] || (template["i"] = []))[count++] = tmp$16;
        }
      }
    } else {
      var tmp$17 = compile$$module$tmp$compile(children[0], 1);
      if (tmp$17) {
        if (tmp$17["j"]) {
          template["j"] = tmp$17["j"];
        }
        if (tmp$17["h"]) {
          template["h"] = tmp$17["h"];
        }
        if (tmp$17["x"]) {
          template["x"] = tmp$17["x"];
        }
      }
    }
  }
  if (!recursive) {
    template["d"] = is_static$$module$tmp$compile;
  }
  return template;
}
function handle_value$$module$tmp$compile(template, key, value) {
  var bind = value.indexOf("{{==") !== -1;
  var proxy = bind || value.indexOf("{{=") !== -1;
  if (value.indexOf("{{") !== -1 && value.indexOf("}}") !== -1) {
    is_static$$module$tmp$compile = false;
    var tmp = value.replace(/{{==/g, "{{").replace(/{{=/g, "{{").replace(/"{{/g, "").replace(/}}"/g, "").replace(/{{/g, "' + ").replace(/}}/g, " + '");
    template[key] = [("'" + tmp + "'").replace(/'' \+ /g, "").replace(/ \+ ''/g, "")];
    if (bind) {
      template[key].push(2);
    } else {
      if (proxy) {
        template[key].push(1);
      }
    }
  } else {
    template[key] = value;
  }
}
function strip$$module$tmp$compile(str) {
  return str.replace(/{{/g, "").replace(/}}/g, "").trim();
}
var module$tmp$compile = {};
module$tmp$compile.default = compile$$module$tmp$compile;
if (SUPPORT_COMPILE) {
  Mikado$$module$tmp$mikado.compile = compile$$module$tmp$compile;
}
if (SUPPORT_CACHE && SUPPORT_CACHE_HELPERS) {
  Mikado$$module$tmp$mikado["setText"] = setText$$module$tmp$cache;
  Mikado$$module$tmp$mikado["getText"] = getText$$module$tmp$cache;
  Mikado$$module$tmp$mikado["setHTML"] = setHTML$$module$tmp$cache;
  Mikado$$module$tmp$mikado["getHTML"] = getHTML$$module$tmp$cache;
  Mikado$$module$tmp$mikado["setClass"] = setClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado["getClass"] = getClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado["hasClass"] = hasClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado["toggleClass"] = toggleClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado["removeClass"] = removeClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado["addClass"] = addClass$$module$tmp$cache;
  Mikado$$module$tmp$mikado["setCSS"] = setCSS$$module$tmp$cache;
  Mikado$$module$tmp$mikado["getCSS"] = getCSS$$module$tmp$cache;
  Mikado$$module$tmp$mikado["setAttribute"] = setAttribute$$module$tmp$cache;
  Mikado$$module$tmp$mikado["getAttribute"] = getAttribute$$module$tmp$cache;
  Mikado$$module$tmp$mikado["hasAttribute"] = hasAttribute$$module$tmp$cache;
  Mikado$$module$tmp$mikado["removeAttribute"] = removeAttribute$$module$tmp$cache;
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
