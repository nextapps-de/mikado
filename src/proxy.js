// COMPILER BLOCK -->
import { SUPPORT_REACTIVE, MIKADO_PROXY, PROFILER } from "./config.js";
import { tick } from "./profiler.js";
// <-- COMPILER BLOCK

import { ProxyHandler, ProxyCache } from "./type.js";
import { Cache } from "./factory.js";

const proxy = SUPPORT_REACTIVE && (window["Proxy"] || (function(){

    /**
     * @param {!Object} obj
     * @param {ProxyHandler} proxy
     * @constructor
     */

    function Proxy(obj, proxy){

        /**
         * @private
         * @const {Array<Cache>}
         */
        this.path = proxy.path;

        /**
         * @private
         * @const {Object<string, Array<ProxyCache>>}
         */
        this.fn = proxy.fn;

        // register properties

        for(const key in obj){

            this.define(obj, key, obj[key]);
        }

        // add proxy check (visible)

        obj[MIKADO_PROXY] = this;

        return obj;
    }

    /**
     * @param {Object} obj
     * @param {string} key
     * @param {*} val
     * @this {!ProxyHandler}
     */

    Proxy.prototype.define = function(obj, key, val){

        PROFILER && tick("proxy.define");

        const self = this;

        Object.defineProperty(obj, key, {

            get: function(){

                PROFILER && tick("proxy.read");

                return val;
            },
            set: function(newVal){

                PROFILER && tick("proxy.write");

                // we can't use this scope as cache, although it would be nice.
                // the dom cache needs to be exported stateful.

                //if(val !== newVal){

                    proxy_loop(self, val = newVal, key);
                //}
            }
        });
    };

    return Proxy;
}()));



// Handler holds multiple dynamic expressions which references to the same data field
// {"title": [["text", node, value, attr], [...]]}

/**
 * @param {Object} obj
 * @param {Array<Cache>} path
 * @param {Object<string, Array<ProxyCache>>} fn
 * @return {Proxy}
 */

export default function proxy_create(obj, path, fn){

    PROFILER && tick("proxy.create");

    const self = obj[MIKADO_PROXY];

    if(self){

        self.path = path;
        return /** @type {Proxy} */ (obj);
    }

    PROFILER && tick("proxy.new");

    /** @type {!ProxyHandler} */
    const proxy_handler = { path, fn, get, set };
    return new proxy(obj, proxy_handler);
}

function get(target, prop){

    PROFILER && tick("proxy.read");

    // proxy check (hidden)
    return prop === MIKADO_PROXY ? this : target[prop];
}

/**
 * @param {Object} target
 * @param {string} prop
 * @param {*} value
 * @this {ProxyHandler}
 */

function set(target, prop, value){

    PROFILER && tick("proxy.write");

    // we can't use the data as cache, although it would be nice.
    // the dom cache needs to be exported stateful.

    //if(target[prop] !== value){

        proxy_loop(this, value, prop);
        target[prop] = value;
    //}

    // accept changes:
    return true;
}

/**
 * @param {ProxyHandler} handler
 * @param {*} value
 * @param {string} prop
 */

function proxy_loop(handler, value, prop){

    /** @type {Array<ProxyCache>} */
    const exp = handler.fn[prop];

    if(exp){

        for(let i = 0; i < exp.length; i++){

            /** @type {ProxyCache} */
            const tmp = exp[i];
            const fn = tmp.fn;
            const cache = /** @type {Cache} */ (handler.path[tmp.index]);
            const key = tmp.key || "";

            if(!cache.c || cache.c[fn + key] !== value){

                PROFILER && tick("cache.miss");

                key ? cache[fn](key, value)
                    : cache[fn](value);

            }
            else{

                PROFILER && tick("cache.match");
            }
        }
    }
}
