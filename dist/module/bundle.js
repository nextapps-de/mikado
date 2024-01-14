
import { Template, TemplateDOM, MikadoOptions, EventOptions } from "./type.js";
import Mikado, { once, register, unregister } from "./mikado.js";
import Observer from "./array.js";
import { Cache } from "./factory.js";
import { escape, sanitize } from "./sanitize.js";
import "./helper.js";
import "./event.js";
import compile from "./compile.js";

import { setHtml, getHtml, setText, getText, getAttribute, hasAttribute, removeAttribute, setAttribute, getClass, setClass, hasClass, toggleClass, removeClass, addClass, getCss, setCss, getStyle, setStyle } from "./cache.js";

import { dispatch, listen, route, unlisten } from "./event.js";

// Mikado global methods
// --------------------------------

Mikado.once = once;
Mikado.register = register;
Mikado.unregister = unregister;

Mikado.compile = compile;

// Mikado global properties
// --------------------------------

/**
 * @export
 * @nocollapse
 */
Mikado.eventCache;
/**
 * @export
 * @nocollapse
 */
Mikado.eventBubble;

// Mikado public instance properties
// --------------------------------

/** @export */
Mikado.length;
/** @export */
Mikado.state;
/** @export */
Mikado.name;

// Mikado public instance methods
// --------------------------------

/** @export */
Mikado.prototype.update;
/** @export */
Mikado.prototype.replace;
/** @export */
Mikado.prototype.render;
/** @export */
Mikado.prototype.remove;
/** @export */
Mikado.prototype.node;
/** @export */
Mikado.prototype.index;
/** @export */
Mikado.prototype.mount;
/** @export */
Mikado.prototype.destroy;
/** @export */
Mikado.prototype.flush;
/** @export */
Mikado.prototype.create;
/** @export */
Mikado.prototype.clear;
/** @export */
Mikado.prototype.cancel;
/** @export */
Mikado.prototype.append;
/** @export */
Mikado.prototype.add;

// Mikado global methods
// --------------------------------

Mikado.setText = setText;
Mikado.getText = getText;
Mikado.setHtml = setHtml;
Mikado.getHtml = getHtml;

Mikado.setClass = setClass;
Mikado.getClass = getClass;
Mikado.hasClass = hasClass;
Mikado.toggleClass = toggleClass;
Mikado.removeClass = removeClass;
Mikado.addClass = addClass;

Mikado.setAttribute = setAttribute;
Mikado.getAttribute = getAttribute;
Mikado.hasAttribute = hasAttribute;
Mikado.removeAttribute = removeAttribute;

Mikado.setCss = setCss;
Mikado.getCss = getCss;
Mikado.getStyle = getStyle;
Mikado.setStyle = setStyle;


// Mikado global methods
// --------------------------------

Mikado.escape = escape;
Mikado.sanitize = sanitize;


// Mikado global + instance methods
// --------------------------------

Mikado.prototype.route = Mikado.route = route;
Mikado.prototype.dispatch = Mikado.dispatch = dispatch;
Mikado.prototype.listen = Mikado.listen = listen;
Mikado.prototype.unlisten = Mikado.unlisten = unlisten;

/** @export */
Mikado.prototype.route;
/** @export */
Mikado.prototype.dispatch;
/** @export */
Mikado.prototype.listen;
/** @export */
Mikado.prototype.unlisten;


// Mikado public instance methods
// --------------------------------

/** @export */
Mikado.prototype.move;
/** @export */
Mikado.prototype.up;
/** @export */
Mikado.prototype.down;
/** @export */
Mikado.prototype.first;
/** @export */
Mikado.prototype.last;
/** @export */
Mikado.prototype.before;
/** @export */
Mikado.prototype.after;
/** @export */
Mikado.prototype.swap;
/** @export */
Mikado.prototype.shift;

// Cache private instance properties
// --------------------------------

/** @export */
Cache.c;
/** @export */
Cache.n;
/** @export */
Cache.v;

// Cache private instance methods
// --------------------------------

/** @export */
Cache.prototype._a;
/** @export */
Cache.prototype._t;
/** @export */
Cache.prototype._s;
/** @export */
Cache.prototype._c;
/** @export */
Cache.prototype._h;

// Mikado global type
// --------------------------------

Mikado.Array = Observer;

// Observer public instance properties
// --------------------------------

/** @export */
Observer.length;

// Observer public instance methods
// --------------------------------

/** @export */
Observer.prototype.mount;
/** @export */
Observer.prototype.concat;
/** @export */
Observer.prototype.push;
/** @export */
Observer.prototype.splice;
/** @export */
Observer.prototype.pop;
/** @export */
Observer.prototype.shift;
/** @export */
Observer.prototype.unshift;
/** @export */
Observer.prototype.slice;
/** @export */
Observer.prototype.set;
/** @export */
Observer.prototype.sort;
/** @export */
Observer.prototype.reverse;
/** @export */
Observer.prototype.map;
/** @export */
Observer.prototype.filter;
/** @export */
Observer.prototype.indexOf;
/** @export */
Observer.prototype.lastIndexOf;
/** @export */
Observer.prototype.includes;
/** @export */
Observer.prototype.forEach;
/** @export */
Observer.prototype.swap;
/** @export */
Observer.prototype.transaction;

// Structural type definitions
// --------------------------------

/** @export */
Template.tpl;
/** @export */
Template.cmp;
/** @export */
Template.key;
/** @export */
Template.cache;
/** @export */
Template.name;
/** @export */
Template.fn;

/** @export */
TemplateDOM.tag;
/** @export */
TemplateDOM.attr;
/** @export */
TemplateDOM.style;
/** @export */
TemplateDOM.class;
/** @export */
TemplateDOM.child;
/** @export */
TemplateDOM.text;
/** @export */
TemplateDOM.html;
/** @export */
TemplateDOM.for;
/** @export */
TemplateDOM.foreach;
/** @export */
TemplateDOM.if;
/** @export */
TemplateDOM.inc;
/** @export */
TemplateDOM.js;
/** @export */
TemplateDOM.event;
/** @export */
TemplateDOM.key;
/** @export */
TemplateDOM.cache;
/** @export */
TemplateDOM.svg;

/** @export */
MikadoOptions.root;
/** @export */
MikadoOptions.mount;
/** @export */
MikadoOptions.recycle;
/** @export */
MikadoOptions.pool;
/** @export */
MikadoOptions.cache;
/** @export */
MikadoOptions.async;
/** @export */
MikadoOptions.on;
/** @export */
MikadoOptions.hydrate;
/** @export */
MikadoOptions.shadow;

/** @export */
EventOptions.prevent;
/** @export */
EventOptions.stop;
/** @export */
EventOptions.cancel;
/** @export */
EventOptions.once;

// Export as library (Bundle)
// --------------------------------

const root = window;

{

    let prop;

    // AMD (RequireJS)
    if ((prop = root.define) && prop.amd) {

        prop([], function () {

            return Mikado;
        });
    }
    // CommonJS
    else if ("object" == typeof root.exports) {

            root.exports = Mikado;
        }
        // Global (window)
        else {

                /** @export */
                root.Mikado = Mikado;
            }
}