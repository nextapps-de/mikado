const proxy = SUPPORT_REACTIVE && !window["Proxy"] && (function(){

    /**
     * @param obj
     * @param proxy
     * @constructor
     */

    function Proxy(obj, proxy){

        // TODO: hide references
        this.path = proxy.path;
        this.handler = proxy.handler;

        const keys = Object.keys(obj);

        for(let i = 0, length = keys.length; i < length; i++){

            const key = keys[i];
            this.define(obj, key, obj[key]);
        }

        return obj;
    }

    // hide proxy check
    Proxy.prototype["_proxy"] = true;

    Proxy.prototype.define = function(obj, key, val){

        const self = this;
        //const key = _key;
        //let val = _val;

        Object.defineProperty(obj, key, {

            get: function(){

                return val;
            },
            set: function(newVal){

                if(val !== newVal){

                    proxy_loop(self.handler, self.path, key, newVal);
                    val = newVal;
                }
            }
        });
    };

    return Proxy;
}());

// TODO: synchronize with Cache
const proxy_setter = {

    "_text": function(target, text){

        target.nodeValue = text;
    },
    "_html": function(target, html){

        target.innerHTML = html;
    },
    "_class": function(target, class_name){

        target.className = class_name;
    },
    "_css": function(target, css){

        (target["_style"] || (target["_style"] = target.style)).cssText = css;
    },
    "_attr": function(target, value, attr){

        target.setAttribute(attr, value);
    }
};

// Handler holds multiple dynamic expressions which references to the same data field
// {"title": [["text", node, value, attr], [...]]}

export default function create_proxy(obj, path, handler){

    return new (proxy || Proxy)(obj, /** @type {!ProxyHandler} */ ({

        path: path,
        handler: handler,
        get: proxy_get,
        set: proxy_set
    }));
}

function proxy_get(target, prop){

    // hide proxy check
    return (prop === "_proxy") || target[prop];
}

/**
 * @param target
 * @param prop
 * @param value
 * @this {ProxyHandler}
 */

function proxy_set(target, prop, value){

    if(target[prop] !== value){

        proxy_loop(this.handler, this.path, prop, value);
        target[prop] = value;
    }

    // accept changes:
    return true;
}

function proxy_loop(handler, path, prop, value){

    const exp = handler["data." + prop];

    if(exp){

        for(let i = 0, length = exp.length, tmp; i < length; i++){

            tmp = exp[i];
            proxy_setter[tmp[0]](path[tmp[1]], value, tmp[2] || prop);
        }
    }
}
