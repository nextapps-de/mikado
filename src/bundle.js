import {
    DEBUG,
    RELEASE,
    SUPPORT_CACHE,
    SUPPORT_CACHE_HELPERS,
    SUPPORT_KEYED,
    SUPPORT_POOLS,
    SUPPORT_CALLBACKS,
    SUPPORT_ASYNC,
    SUPPORT_REACTIVE,
    SUPPORT_DOM_HELPERS,
    SUPPORT_EVENTS,

    MIKADO_DOM,
    MIKADO_LIVE_POOL,
    MIKADO_CLASS,
    MIKADO_TPL_KEY,
    MIKADO_TPL_PATH,
    MIKADO_NODE_CACHE
} from "./config.js";
import { Template, TemplateDOM, MikadoOptions, EventOptions } from "./type.js";
import Mikado, { register, unregister } from "./mikado.js";
import Observer from "./array.js";
import { Cache } from "./factory.js";
import { escape, sanitize } from "./sanitize.js";
//import compile from "./compile.js";

import {
    setHtml,
    getHtml,
    setText,
    getText,

    getAttribute,
    hasAttribute,
    removeAttribute,
    removeAttributes,
    setAttribute,
    setAttributes,

    getClasses,
    hasClass,
    toggleClass,
    toggleClasses,
    removeClass,
    removeClasses,
    addClass,
    addClasses,
    setClass,

    getCss,
    setCss,
    getStyle,
    setStyle,
    setStyles
} from "./cache.js";

import {
    dispatch,
    listen,
    route,
    unlisten
} from "./event.js";

/*
if(SUPPORT_COMPILE){

    // Mikado global methods
    // --------------------------------

    Mikado.compile = compile;
}
*/

// Mikado global methods
// --------------------------------

Mikado["register"] = register;
Mikado["unregister"] = unregister;

// Mikado global properties
// --------------------------------

if(SUPPORT_EVENTS){

    /** @export */
    Mikado.eventCache;
    /** @export */
    Mikado.eventBubble;
}

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

if(SUPPORT_CACHE_HELPERS){

    // Mikado global methods
    // --------------------------------

    Mikado["setText"] = setText;
    Mikado["getText"] = getText;
    Mikado["setHtml"] = setHtml;
    Mikado["getHtml"] = getHtml;

    Mikado["setClass"] = setClass;
    Mikado["getClasses"] = getClasses;
    Mikado["hasClass"] = hasClass;
    Mikado["toggleClass"] = toggleClass;
    Mikado["toggleClasses"] = toggleClasses;
    Mikado["removeClass"] = removeClass;
    Mikado["removeClasses"] = removeClasses;
    Mikado["addClass"] = addClass;
    Mikado["addClasses"] = addClasses;

    Mikado["setAttribute"] = setAttribute;
    Mikado["setAttributes"] = setAttributes;
    Mikado["getAttribute"] = getAttribute;
    Mikado["hasAttribute"] = hasAttribute;
    Mikado["removeAttribute"] = removeAttribute;
    Mikado["removeAttributes"] = removeAttributes;

    Mikado["setCss"] = setCss;
    Mikado["getCss"] = getCss;
    Mikado["getStyle"] = getStyle;
    Mikado["setStyle"] = setStyle;
    Mikado["setStyles"] = setStyles;
}

if(RELEASE !== "light" && RELEASE !== "light.module"){

    // Mikado global methods
    // --------------------------------

    Mikado["escape"] = escape;
    Mikado["sanitize"] = sanitize;
}

if(SUPPORT_EVENTS){

    // Mikado global + instance methods
    // --------------------------------

    Mikado.prototype.route = Mikado["route"] = route;
    Mikado.prototype.dispatch = Mikado["dispatch"] = dispatch;
    Mikado.prototype.listen = Mikado["listen"] = listen;
    Mikado.prototype.unlisten = Mikado["unlisten"] = unlisten;

    /** @export */
    Mikado.prototype.route;
    /** @export */
    Mikado.prototype.dispatch;
    /** @export */
    Mikado.prototype.listen;
    /** @export */
    Mikado.prototype.unlisten;
}

if(SUPPORT_DOM_HELPERS){

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
}

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

if(SUPPORT_REACTIVE){

    // Mikado global type
    // --------------------------------

    Mikado["Array"] = Observer;

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
    Observer.prototype.forEach;
    /** @export */
    //Observer.prototype.swap;
}

// Structural type definitions
// --------------------------------

/** @export */
Template.tpl;
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

if(RELEASE !== "bundle.module" && RELEASE !== "light.module"){

    let prop;

    // AMD (RequireJS)
    if((prop = root["define"]) && prop["amd"]){

        prop([], function(){

            return Mikado;
        });
    }
    // CommonJS (Node.js)
    else if(typeof root["exports"] === "object"){

        /** @export */
        root["module"].exports = Mikado;
    }
    // Global (window)
    else{

        /** @export */
        root.Mikado = Mikado;
    }
}
else{

    /** @export */
    root.Mikado = Mikado;
}