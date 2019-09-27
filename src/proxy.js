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
    /*
    "_style": function(target, value, style){

        (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
    },
    */
    "_attr": function(target, value, attr){

        target.setAttribute(attr, value);
    }
};

// Handler holds multiple dynamic expressions which references to the same data field
// {"title": [["text", node, key]]}

export default function create_proxy(obj, path, handler){

    return new Proxy(obj, /** @type {!ProxyHandler} */ ({

        path: path,
        handler: handler,
        set: proxy_set
    }));
}

/**
 * @param target
 * @param prop
 * @param value
 * @this {ProxyHandler}
 */

function proxy_set(target, prop, value){

    if(target[prop] !== value){

        const exp = this.handler["data." + prop];

        if(exp){

            for(let i = 0, length = exp.length, tmp; i < length; i++){

                tmp = exp[i];
                proxy_setter[tmp[0]](this.path[tmp[1]], value, tmp[2] || prop);
            }
        }

        target[prop] = value;
    }

    return true;
}

if(SUPPORT_REACTIVE){

    if(!window["Proxy"]){

        /**
         * @param obj
         * @param proxy
         * @constructor
         */

        function Proxy(obj, proxy){

            this.path = proxy.path;
            this.handler = proxy.handler;

            const observe = obj;
            const keys = Object.keys(obj);

            for(let i = 0, length = keys.length; i < length; i++){

                const key = keys[i];
                this.define(observe, key, obj[key]);
            }

            return observe;
        }

        Proxy.prototype.define = function(_obj, _key, _val){

            const self = this;
            const obj = _obj;
            const key = _key;
            let val = _val;

            Object.defineProperty(obj, key, {

                get: function(){

                    return val;
                },
                set: function(newVal){

                    if(val === newVal){

                        return;
                    }

                    const exp = self.handler["data." + key];

                    if(exp){

                        for(let i = 0, length = exp.length, tmp; i < length; i++){

                            tmp = exp[i];
                            proxy_setter[tmp[0]](self.path[tmp[1]], newVal, tmp[2] || key);
                        }
                    }

                    val = newVal;
                }
            });
        };

        window["Proxy"] = Proxy;
    }
}