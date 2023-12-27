

/**
 * @typedef {{
 *   path: Array<Cache>,
 *   handler: Object<string, Array<string, number>>,
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
        this.handler = proxy.handler;

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

                proxy_loop.call(self, val = newVal, key);
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
 * @param {Object<string, Array<string, number>>} handler
 * @return {Proxy}
 */

export default function proxy_create(obj, path, handler) {

    return new proxy(obj, {

        path: path,
        handler: handler,
        get: proxy_get,
        set: proxy_set
    });

    /** @type {!ProxyHandler} */
}

function proxy_get(target, prop) {

    // proxy check (hidden)
    return prop === "_mkx" || target[prop];
}

/**
 * @param {Object} target
 * @param {string} prop
 * @param {*} value
 * @this {ProxyHandler}
 */

function proxy_set(target, prop, value) {

    //if(target[prop] !== value){

    proxy_loop.call(this, value, prop);
    target[prop] = value;
    //}

    // accept changes:
    return !0;
}

/**
 * @param {*} value
 * @param {string} prop
 * @this {ProxyHandler}
 */

function proxy_loop(value, prop) {

    const exp = this.handler[prop];

    if (exp) {

        for (let i = 0; i < exp.length; i++) {
            const tmp = exp[i],
                  fn = tmp[0],
                  cache = /** @type {Cache} */this.path[tmp[1]];


            if (!cache.c || cache.c[fn + (tmp[2] || "")] !== value) {

                cache[fn](tmp[2] || value, value);
            }
        }
    }
}