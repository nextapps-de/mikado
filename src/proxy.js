// COMPILER BLOCK -->
import { SUPPORT_REACTIVE, MIKADO_PROXY, PROFILER } from "./config.js";
// <-- COMPILER BLOCK

import { ProxyHandler } from "./type.js";
import { Cache } from "./factory.js";
import { tick } from "./profiler.js";

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
         * @const {Object<string, Array<string, number>>}
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

                return val;
            },
            set: function(newVal){

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
 * @param {Object<string, Array<string, number>>} fn
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

    const exp = handler.fn[prop];

    if(exp){

        for(let i = 0; i < exp.length; i++){

            // tmp = [ Function Name, DOM Cache, <Attribute Key> ]
            const tmp = exp[i];
            const fn = tmp[0];
            const cache = /** @type {Cache} */ (handler.path[tmp[1]]);

            if(!cache.c || cache.c[fn + (tmp[2] || "")] !== value){

                PROFILER && tick("cache.miss");

                cache[fn](tmp[2] || value, value);
            }
            else{

                PROFILER && tick("cache.match");
            }
        }
    }
}
