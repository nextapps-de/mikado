

/**
 * @typedef {{
 *   path: Array<Cache>,
 *   fn: Object<string, Array<string, number>>,
 *   get: Function,
 *   set: Function
 * }}
 */
let ProxyHandler;

const proxy = window.Proxy || function () {

    /**
     * @param obj
     * @param proxy
     * @constructor
     */

    function Proxy(obj, proxy) {

        /** @private @const {Array<Cache>} */
        this.path = proxy.path;
        /** @private @const {Object<string, Array<string, number>>} */
        this.fn = proxy.fn;

        for (const key in obj) {

            this.define(obj, key, obj[key]);
        }

        // proxy check (visible)
        obj._mkx = !0;

        return obj;
    }

    //Proxy.prototype["_proxy"] = true;

    Proxy.prototype.define = function (obj, key, val) {

        const self = /** @type {!ProxyHandler} */this;

        Object.defineProperty(obj, key, {

            get: function () {

                return val;
            },
            set: function (newVal) {

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
    return new proxy(obj, { path, fn, get, set });

    /** @type {!ProxyHandler} */
}

function get(target, prop) {

    // proxy check (hidden)
    return prop === "_mkx" || target[prop];
}

/**
 * @param {Object} target
 * @param {string} prop
 * @param {*} value
 * @this {ProxyHandler}
 */

function set(target, prop, value) {

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
            const tmp = exp[i],
                  fn = tmp[0],
                  cache = /** @type {Cache} */handler.path[tmp[1]];


            if (!cache.c || cache.c[fn + (tmp[2] || "")] !== value) {

                cache[fn](tmp[2] || value, value);
            }
        }
    }
}