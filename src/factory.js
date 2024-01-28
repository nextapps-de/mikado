// COMPILER BLOCK -->
import {
    SUPPORT_DOM_HELPERS,
    DEBUG,
    PROFILER,
    SUPPORT_CACHE,
    SUPPORT_KEYED,
    SUPPORT_POOLS,
    SUPPORT_CALLBACKS,
    SUPPORT_ASYNC,
    SUPPORT_REACTIVE,
    SUPPORT_COMPACT_TEMPLATE,
    SUPPORT_EVENTS,

    MIKADO_DOM,
    MIKADO_LIVE_POOL,
    MIKADO_CLASS,
    MIKADO_TPL_KEY,
    MIKADO_TPL_PATH,
    MIKADO_NODE_CACHE
} from "./config.js";
import { tick } from "./profiler.js";
// <-- COMPILER BLOCK
import { TemplateDOM, Template, MikadoOptions, NodeCache, ProxyCache } from "./type.js";
import Mikado, { includes } from "./mikado.js";
import { dispatch, listen } from "./event.js";

/**
 * @param {Element} root
 * @param {Array<Cache>} path
 * @param {boolean=} _use_cache
 * @return {Array<Cache>}
 */

export function create_path(root, path, _use_cache){

    PROFILER && tick("factory.path");
    //profiler_start("create_path");
    //console.time("create_path");

    /** @type {Array<NodeCache>|undefined} */
    let cache_clone;

    if(SUPPORT_CACHE && _use_cache){

        // when path is created there don't exist a node cache,
        // so it can be used temporary to pass the full vcache array

        if((cache_clone = root[MIKADO_NODE_CACHE])){

            root[MIKADO_NODE_CACHE] = null;
        }
    }

    const length = path.length;
    /** @type {Array<Cache>} */
    const new_path = []; // new Array(length); slows down
    /** @dict */
    const vcache = {};

    for(let x = 0, item, vpath, node_parent, node, cache = null/*, last, cache_index = 0*/; x < length; x++){

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

        if(_use_cache /*&& last !== node_parent*/){

            PROFILER && tick("cache.transfer");

            //last = node_parent;
            cache = SUPPORT_CACHE && cache_clone ? cache_clone[x] : {};
            node_parent[MIKADO_NODE_CACHE] = cache;
        }

        PROFILER && tick("cache.create");
        new_path[x] = new Cache(cache, node, "");
    }

    root[MIKADO_TPL_PATH] = new_path;

    //profiler_end("create_path");
    //console.timeEnd("create_path");

    return new_path;
}

/**
 * @param {Node} node
 * @param {string} path
 * @param {Object} cache
 * @return {Array<Element|Node|CSSStyleDeclaration>}
 */

function resolve(node, path, cache){

    PROFILER && tick("factory.resolve");
    //profiler_start("resolve");

    for(let i = 0, length = path.length, tmp = ""; i < length; i++){

        const current_path = path[i];
        tmp += current_path;

        if(cache[tmp]){

            node = cache[tmp];
        }
        else{

            if(current_path === ">"){

                //node = node.firstElementChild;
                node = node.firstChild;
            }
            else if(current_path === "|"){

                return [node.firstChild, node];
            }
            else if(current_path === "@"){

                return [node.style, node];
            }
            else /*if(current_path === "+")*/{

                //node = node.nextElementSibling;
                node = node.nextSibling;
            }

            cache[tmp] = node;
        }
    }

    //profiler_end("resolve");

    return [node];
}

/**
 * @param {!Mikado} self
 * @param {TemplateDOM} tpl
 * @param {Array<Cache>} path
 * @param {string} vpath
 * @param {Element|Node=} vnode Exists on hydration
 * @param {boolean|number=} _recursive
 * @returns {Element|Node}
 */

export function construct(self, tpl, path, vpath, vnode, _recursive){

    PROFILER && tick("factory.construct");

    if(SUPPORT_REACTIVE){

        if(!_recursive){

            self.fullproxy = 1;
        }
    }

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

            PROFILER && tick("cache.create");

            /*cache ||*/ path.push(new Cache(cache = {"_c": ""}, node, vpath));

            if(SUPPORT_REACTIVE){

                if((val = val[0])){

                    /** @type {ProxyCache} */
                    const proxy = {
                        fn: "_c",
                        index:  path.length - 1
                    };

                    init_proxy(self, val, proxy);
                }
                else{

                    self.fullproxy = 0;
                }
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

                PROFILER && tick("cache.create");

                cache || path.push(new Cache(cache = {}, node, vpath));
                cache["_a" + key] = false;

                if(SUPPORT_REACTIVE){

                    if((item = item[0])){

                        /** @type {ProxyCache} */
                        const proxy = {
                            fn: "_a",
                            index:  path.length - 1,
                            key
                        };

                        init_proxy(self, item, proxy);
                    }
                    else{

                        self.fullproxy = 0;
                    }
                }
            }
            else if(!vnode){

                node.setAttribute(key, item);
            }
        }
    }

    if(SUPPORT_EVENTS && (val = tpl.event)){

        for(let key in val){

            let skip;

            if(!vnode){

                // handle common non-bubbling events
                if(key === "load" || key === "error"){

                    window["dispatch"] = dispatch;
                    val["on" + key] = "dispatch('" + val[key] + "', this)";
                    key = "on" + key
                    skip = 1;
                }

                node.setAttribute(key, val[key]);
            }

            skip || listen(key);
        }
    }

    if((val = tpl.style)){

        if(typeof val === "object"){

            PROFILER && tick("cache.create");

            path.push(new Cache(cache || (cache = {}), node.style, vpath + "@"));
            cache["_s"] = "";

            if(SUPPORT_REACTIVE){

                if((val = val[0])){

                    /** @type {ProxyCache} */
                    const proxy = {
                        fn: "_s",
                        index:  path.length - 1
                    };

                    init_proxy(self, val, proxy);
                }
                else{

                    self.fullproxy = 0;
                }
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

            PROFILER && tick("cache.create");
            path.push(new Cache(cache, /** @type {Element|Node} */ (child), vpath));

            if(SUPPORT_REACTIVE){

                if(val){

                    /** @type {ProxyCache} */
                    const proxy = {
                        fn: "_t",
                        index:  path.length - 1
                    };

                    init_proxy(self, val, proxy);
                }
                else{

                    self.fullproxy = 0;
                }
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

            const tmp = construct(self, child, path, vpath, vnode, 1);

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

            PROFILER && tick("cache.create");

            cache || path.push(new Cache(cache = {}, node, vpath));
            cache["_h"] = "";

            if(SUPPORT_REACTIVE){

                if((val = val[0])){

                    /** @type {ProxyCache} */
                    const proxy = {
                        fn: "_h",
                        index:  path.length - 1
                    };

                    init_proxy(self, val, proxy);
                }
                else{

                    self.fullproxy = 0;
                }
            }
        }
        else if(!vnode){

            node.innerHTML = val;
        }
    }
    else if((val = tpl.inc /*|| tpl.for || tpl.if*/)){

        PROFILER && tick("cache.create");
        PROFILER && tick("template.include");

        cache || path.push(new Cache(null, node, vpath));
        let mikado;

        // val is equal 1 when a cached structure was re-used by the compiler,
        // it just needs push to the path

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
        else if(val !== 1){

            const index = self.inc.length;

            if(DEBUG){

                if(!self.tpl.fn.length){

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
                fn: self.tpl.fn
            };

            /**
             * @type {MikadoOptions}
             */

            const options = {
                recycle: self.recycle,
                cache: self.cache,
                pool: !!self.pool,
                state: self.state,
                mount: /** @type {Element} */ (node),
                hydrate: !!vnode,
                // Includes are treated as non-async,
                // because async is already controlled by initial render
                // and therefore there are already async
                // this also makes callback handling more simple
                //async: false // default
            };

            mikado = new Mikado(tpl, options);
        }

        if(val !== 1){

            self.inc.push(mikado);
        }
    }

    if(cache){

        node[MIKADO_NODE_CACHE] = cache;
    }

    if(!_recursive){

        node[MIKADO_TPL_PATH] = path;
    }

    return node;
}

/**
 * @param {!Mikado} self
 * @param {string} key
 * @param {ProxyCache} payload
 */

function init_proxy(self, key, payload){

    PROFILER && tick("proxy.init");

    self.proxy || (self.proxy = {});
    (self.proxy[key] || (self.proxy[key] = [])).push(payload);
}

/** @dict */
export const idl_attributes = {

    "checked": 1,
    "selected": 1,
    "hidden": 1
};

/**
 * @constructor
 * @const
 */

export function Cache(cache, node, vpath){

    /** @const {NodeCache} */
    this.c = cache;
    /** @const {Element|Node|CSSStyleDeclaration} */
    this.n = node;
    /** @const {string} */
    this.v = vpath;
}

if(SUPPORT_COMPACT_TEMPLATE || SUPPORT_REACTIVE){

    /**
     * @param {string} key
     * @param {string|boolean} value
     * @param {boolean} factory
     * @param {NodeCache|boolean=} cache
     * @param {number=} index
     * @const
     */

    Cache.prototype._a = function(key, value, factory, cache, index){

        if(this.c){

            if(cache){

                if(index || index === 0){

                    cache = cache[index] || (cache[index] = {});
                }

                cache["_a" + key] = value;
            }

            if(this.c["_a" + key] === value){

                PROFILER && tick("cache.match");
                return;
            }

            PROFILER && tick("cache.miss");
            PROFILER && tick("cache.attr");

            this.c["_a" + key] = value;
        }

        // IDL attributes are faster but "selected" didn't reflect content attribute state

        if(idl_attributes[key] && (!factory || key !== "selected")){

            this.n[key] = value;
        }
        else{

            value === false
                ? this.n.removeAttribute(key)
                : this.n.setAttribute(key, value);
        }
    }

    /**
     * @param {string} text
     * @param {NodeCache|boolean=} cache
     * @param {number=} index
     * @const
     */

    Cache.prototype._t = function(text, cache, index){

        if(this.c){

            if(cache){

                if(index || index === 0){

                    cache = cache[index] || (cache[index] = {});
                }

                cache._t = text;
            }

            if(this.c._t === text){

                PROFILER && tick("cache.match");
                return;
            }


            PROFILER && tick("cache.miss");
            PROFILER && tick("cache.text");

            this.c._t = text;
        }

        this.n.nodeValue = text;
    }

    /**
     * @param {string} classname
     * @param {NodeCache|boolean=} cache
     * @param {number=} index
     * @const
     */

    Cache.prototype._c = function(classname, cache, index){

        if(this.c){

            if(cache){

                if(index || index === 0){

                    cache = cache[index] || (cache[index] = {});
                }

                cache._c = classname;
            }

            if(this.c._c === classname){

                PROFILER && tick("cache.match");
                return;
            }

            PROFILER && tick("cache.miss");
            PROFILER && tick("cache.class");

            this.c._c = classname;
        }

        this.n.className = classname;
    }

    /**
     * @param {string} css
     * @param {NodeCache|boolean=} cache
     * @param {number=} index
     * @const
     */

    Cache.prototype._s = function(css, cache, index){

        if(this.c){

            if(cache){

                if(index || index === 0){

                    cache = cache[index] || (cache[index] = {});
                }

                cache._s = css;
            }

            if(this.c._s === css){

                PROFILER && tick("cache.match");
                return;
            }

            PROFILER && tick("cache.miss");
            PROFILER && tick("cache.style");

            this.c._s = css;
        }

        this.n.cssText = css;
    }

    /**
     * @param {string} html
     * @param {NodeCache|boolean=} cache
     * @param {number=} index
     * @const
     */

    Cache.prototype._h = function(html, cache, index){

        if(this.c){

            if(cache){

                if(index || index === 0){

                    cache = cache[index] || (cache[index] = {});
                }

                cache._h = html;
            }

            if(this.c._h === html){

                PROFILER && tick("cache.match");
                return;
            }

            PROFILER && tick("cache.miss");
            PROFILER && tick("cache.html");

            this.c._h = html;
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
}