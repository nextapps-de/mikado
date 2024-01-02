// COMPILER BLOCK -->
import { TemplateDOM, Template, MikadoOptions } from "./type.js";
import {
    SUPPORT_DOM_HELPERS,
    DEBUG,
    SUPPORT_CACHE,
    SUPPORT_KEYED,
    SUPPORT_POOLS,
    SUPPORT_CALLBACKS,
    SUPPORT_ASYNC,
    SUPPORT_REACTIVE,
    SUPPORT_EVENTS,

    MIKADO_DOM,
    MIKADO_LIVE_POOL,
    MIKADO_CLASS,
    MIKADO_TPL_KEY,
    MIKADO_TPL_PATH,
    MIKADO_NODE_CACHE
} from "./config.js";
// <-- COMPILER BLOCK
import Mikado, { includes } from "./mikado.js";
import { listen } from "./event.js";

/**
 * @param {Element} root
 * @param {Array<Cache>} path
 * @param {boolean=} _use_cache
 * @return {Array<Cache>}
 */

export function create_path(root, path, _use_cache){

    //profiler_start("create_path");

    const length = path.length;
    /** @type {Array<Cache>} */
    const new_path = [];
    /** @dict */
    const vcache = {};

    for(let x = 0, item, vpath, node_parent, node, last, cache = null; x < length; x++){

        item = path[x];
        vpath = item.v;

        if(vpath){

            node = node_parent = vcache[vpath];

            if(!node){

                node_parent = resolve(root, vpath, vcache);
                node = node_parent[0];
                node_parent = node_parent[1] || node;
            }
        }
        else{

            node = node_parent = root;
        }

        if(_use_cache && last !== node_parent){

            last = node_parent;
            node_parent[MIKADO_NODE_CACHE] = cache = {};
        }

        new_path[x] = new Cache(cache, node, "");
    }

    root[MIKADO_TPL_PATH] = new_path;

    //profiler_end("create_path");

    return new_path;
}

/**
 * @param {Node} root
 * @param {string} path
 * @param {Object} cache
 * @return {Array<Element|Node|CSSStyleDeclaration>}
 */

function resolve(root, path, cache){

    let node;

    //profiler_start("resolve");

    for(let i = 0, length = path.length, tmp = ""; i < length; i++){

        const current_path = path[i];
        tmp += current_path;

        if(cache[tmp]){

            root = cache[tmp];
        }
        else{

            if(current_path === ">"){

                //root = root.firstElementChild;
                root = root.firstChild;
            }
            else if(current_path === "|"){

                node = root;
                root = root.firstChild;
            }
            else if(current_path === "@"){

                node = root;
                root = root.style;
            }
            else /*if(current_path === "+")*/{

                //root = root.nextElementSibling;
                root = root.nextSibling;
            }

            cache[tmp] = root;
        }
    }

    //profiler_end("resolve");

    return [root, node];
}

/**
 * @param {TemplateDOM} tpl
 * @param {Array<Cache>} path
 * @param {string} vpath
 * @param {Element|Node=} vnode Exists on hydration
 * @param {Mikado=} self
 * @param {boolean|number=} _recursive
 * @returns {Element|Node}
 */

export function construct(tpl, path, vpath, vnode, self, _recursive){

    const node = vnode || (
        tpl.tag
            ? (tpl.svg
                ? document.createElementNS("http://www.w3.org/2000/svg", tpl.tag)
                : document.createElement(tpl.tag))
            : document.createTextNode(/** @type {string} */ (tpl.text))
    );

    let cache, val;

    if((val = tpl.class)){

        if(typeof val === "object"){

            /*cache ||*/ path.push(new Cache(cache = {"_c": ""}, node, vpath));

            if(SUPPORT_REACTIVE && (val = val[0])){

                init_proxy.call(self, val, ["_c", path.length - 1]);
            }
        }
        else if(!vnode){

            node.className = val;
        }
    }

    if((val = tpl.attr)){

        for(const key in val){

            let item = val[key];

            if(typeof item === "object"){

                cache || path.push(new Cache(cache = {}, node, vpath));
                cache["_a" + key] = false;

                if(SUPPORT_REACTIVE && (item = item[0])){

                    init_proxy.call(self, item, ["_a", path.length - 1, key]);
                }
            }
            else if(!vnode){

                node.setAttribute(key, item);
            }
        }
    }

    if((val = tpl.event)){

        for(const key in val){

            if(!vnode){

                node.setAttribute(key, val[key]);

                if(SUPPORT_EVENTS){

                    listen(key);
                }
            }
        }
    }

    if((val = tpl.style)){

        if(typeof val === "object"){

            path.push(new Cache(cache || (cache = {}), node.style, vpath + "@"));
            cache["_s"] = "";

            if(SUPPORT_REACTIVE && (val = val[0])){

                init_proxy.call(self, val, ["_s", path.length - 1]);
            }
        }
        else if(!vnode){

            node.style.cssText = val;
        }
    }

    if((val = tpl.text)){

        if(typeof val === "object"){

            let child = node;
            val = val[0];

            if(tpl.tag){

                vpath += "|";
                child = !vnode && node.firstChild;

                // prepare dynamic expressions on text nodes

                if(!child){

                    child = document.createTextNode(val);
                    node.appendChild(child);
                }
            }
            else{

                // when no tag exists, as series of text nodes can't share cache like on element node
                cache = {};
            }

            (cache || (cache = {}))["_t"] = val;

            path.push(new Cache(cache, /** @type {Element|Node} */ (child), vpath));

            if(SUPPORT_REACTIVE && val){

                init_proxy.call(self, val, ["_t", path.length - 1]);
            }
        }
        else if(!vnode){

            if(tpl.tag){

                node.textContent = val;
            }
            else{

                node.nodeValue = /** @type {string} */ (val);
            }
        }
    }
    else if((val = tpl.child)){

        if(vnode){

            //vnode = vnode.firstElementChild;
            vnode = vnode.firstChild;

            if(!vnode){

                if(DEBUG){

                    console.warn("Hydration failed of template '" + self.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead.");
                }

                return null;
            }
        }

        if(val.constructor !== Array){

            val = [val];
        }

        for(let i = 0, child, length = val.length; i < length; i++){

            child = val[i];

            if(i){

                vpath += "+";
            }
            else{

                vpath += ">";
            }

            const tmp = construct(child, path, vpath, vnode, self, 1);

            if(vnode){

                if(i < length - 1){

                    //vnode = vnode.nextElementSibling;
                    vnode = vnode.nextSibling;

                    if(!vnode){

                        if(DEBUG){

                            console.warn("Hydration failed of template '" + self.name + "' because the existing DOM structure was incompatible. Falls back to factory construction instead.");
                        }

                        return null;
                    }
                }
            }
            else{

                node.appendChild(tmp);
            }
        }
    }
    else if((val = tpl.html)){

        if(typeof val === "object"){

            cache || path.push(new Cache(cache = {}, node, vpath));
            cache["_h"] = "";

            if(SUPPORT_REACTIVE && (val = val[0])){

                init_proxy.call(self, val, ["_h", path.length - 1]);
            }
        }
        else if(!vnode){

            node.innerHTML = val;
        }
    }
    else if((val = tpl.inc /*|| tpl.for || tpl.if*/)){

        cache || path.push(new Cache(null, node, vpath));

        let mikado;

        if(typeof val === "string"){

            mikado = includes[val];

            if(DEBUG){

                if(!mikado) throw new Error("The partial template '" + val + "' which is included by the root template '" + self.name + "' was not registered. When using named includes make sure you register all your includes by Mikado.register(tpl) before instantiating the Mikado view instance.");
            }

            // From this point it needs the Mikado instance to push to inc[]

            if(!(mikado instanceof Mikado)){

                const template =  /** @type {Template} */ (mikado[0]);
                const options = /** @type {MikadoOptions} */ (mikado[1]);

                if(options){

                    // Includes should be treated as non-async, because async is already controlled by the initial render.
                    // The async callback needs to be called when the whole render process including partials is done.
                    // Instead of async-await the whole render chain it is even more clean to process at least one full template render in a single asynchronous animation frame.
                    // This also has some advantages when rendering multiple Mikado instances at the same time in "parallel".
                    options.async = false;

                    if(vnode){

                        // Continue hydration of nested includes
                        options.root = /** @type {Element} */ (vnode);
                        options.hydrate = true;
                    }
                }

                // Assign back the new instance, since it does no longer need the template definition,
                // because Mikado partials which was registered by Mikado.register() are globally shared.
                includes[val] = mikado = new Mikado(template, options);
            }
        }
        else{

            const index = self.inc.length;

            if(DEBUG){

                if(!self.tpl._fn.length){

                    throw new Error("The template '" + self.name + "|" + index + "' has conflicts. It should provide a handler entry, but wasn't found.");
                }
            }

            val = /** @type {TemplateDOM} */ (val);

            /**
             * @type {Template}
             */

            const tpl = {
                name: self.name + "|" + index,
                tpl: val,
                key: val.key,
                cache: val.cache,
                fn: self.tpl._fn
            };

            /**
             * @type {MikadoOptions}
             */

            const options = {
                recycle: self.recycle,
                cache: self.cache,
                pool: self.pool,
                state: self.state,
                mount: /** @type {Element} */ (node),
                hydrate: !!vnode,
                // Includes should be treated as non-async,
                // because async is already controlled by initial render.
                //async: false // default
            };

            mikado = new Mikado(tpl, options);
        }

        self.inc.push(mikado);
    }

    if(cache){

        node[MIKADO_NODE_CACHE] = cache;
    }

    if(!_recursive){

        node[MIKADO_TPL_PATH] = path;

        if(SUPPORT_REACTIVE){

            self.fullproxy = self.fullproxy === path.length ? 1 : 0;
        }
    }

    return node;
}

/**
 * @param {string} key
 * @param {Array<string, Cache>} payload
 * @this Mikado
 */

function init_proxy(key, payload){

    this.fullproxy++;
    this.proxy || (this.proxy = {});
    (this.proxy[key] || (this.proxy[key] = [])).push(payload);
}

/**
 * @typedef {{
 *   _s: (string|undefined),
 *   _t: (string|undefined),
 *   _c: (string|undefined),
 *   _h: (string|undefined)
 * }}
 */
export let NodeCache;

/**
 * @constructor
 * @const
 */

export function Cache(cache, node, vpath){

    /** @const @type {NodeCache} */
    this.c = cache;
    /** @const {Element|Node|CSSStyleDeclaration} */
    this.n = node;
    /** @const {string} */
    this.v = vpath;
}

/**
 * @param {string} key
 * @param {string|boolean} value
 * @const
 */

Cache.prototype._a = function(key, value){

    if(this.c){

        if(this.c["_a" + key] === value){

            return;
        }

        this.c["_a" + key] = value;
    }

    value !== false
        ? this.n.setAttribute(key, value)
        : this.n.removeAttribute(key);
}

/**
 * @param {string} text
 * @const
 */

Cache.prototype._t = function(text){

    if(this.c){

        if(this.c["_t"] === text){

            return;
        }

        this.c["_t"] = text;
    }

    this.n.nodeValue = text;
}

/**
 * @param {string} classname
 * @const
 */

Cache.prototype._c = function(classname){

    if(this.c){

        if(this.c["_c"] === classname){

            return;
        }

        this.c["_c"] = classname;
    }

    this.n.className = classname;
}

/**
 * @param {string} css
 * @const
 */

Cache.prototype._s = function(css){

    if(this.c){

        if(this.c["_s"] === css){

            return;
        }

        this.c["_s"] = css;
    }

    this.n.cssText = css;
}

/**
 * @param {string} html
 * @const
 */

Cache.prototype._h = function(html){

    if(this.c){

        if(this.c["_h"] === html){

            return;
        }

        this.c["_h"] = html;
    }

    this.n.innerHTML = html;
}

// It needs a default export here, because proxy handler methods are passed by string keys like "_t"

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