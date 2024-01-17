

import { ProxyHandler } from "./type.js";
import { Cache } from "./factory.js";
import { tick } from "./profiler.js";

const proxy = window.Proxy || function () {

    /**
     * @param {!Object} obj
     * @param {ProxyHandler} proxy
     * @constructor
     */

    function Proxy(obj, proxy) {

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

        for (const key in obj) {

            this.define(obj, key, obj[key]);
        }

        // add proxy check (visible)

        obj._mkx = this;

        return obj;
    }

    /**
     * @param {Object} obj
     * @param {string} key
     * @param {*} val
     * @this {!ProxyHandler}
     */

    Proxy.prototype.define = function (obj, key, val) {

        const self = this;

        Object.defineProperty(obj, key, {

            get: function () {

                return val;
            },
            set: function (newVal) {

                // we can't use this scope as cache, although it would be nice.
                // the dom cache needs to be exported stateful.

                //if(val !== newVal){

                proxy_loop(self, val = newVal, key);
                //}
            }
        });
    };

    return Proxy;
}();

// Handler holds multiple dynamic expressions which references to the same data field
// {"title": [["text", node, value, attr], [...]]}

/**
 * @param {Object} obj
 * @param {Array<Cache>} path
 * @param {Object<string, Array<string, number>>} fn
 * @return {Proxy}
 */

export default function proxy_create(obj, path, fn) {

    const self = obj._mkx;

    if (self) {

        self.path = path;
        return (/** @type {Proxy} */obj
        );
    }

    /** @type {!ProxyHandler} */
    return new proxy(obj, { path, fn, get, set });
}

function get(target, prop) {

    // proxy check (hidden)
    return prop === "_mkx" ? this : target[prop];
}

/**
 * @param {Object} target
 * @param {string} prop
 * @param {*} value
 * @this {ProxyHandler}
 */

function set(target, prop, value) {

    // we can't use the data as cache, although it would be nice.
    // the dom cache needs to be exported stateful.

    //if(target[prop] !== value){

    proxy_loop(this, value, prop);
    target[prop] = value;
    //}

    // accept changes:
    return !0;
}

/**
 * @param {ProxyHandler} handler
 * @param {*} value
 * @param {string} prop
 */

function proxy_loop(handler, value, prop) {

    const exp = handler.fn[prop];

    if (exp) {

        for (let i = 0; i < exp.length; i++) {

            // tmp = [ Function Name, DOM Cache, <Attribute Key> ]
            const tmp = exp[i],
                  fn = tmp[0],
                  cache = /** @type {Cache} */handler.path[tmp[1]],
                  key = tmp[2] || "";


            if (!cache.c || cache.c[fn + key] !== value) {

                key ? cache[fn](key, value) : cache[fn](value);
            } else {}
        }
    }
}