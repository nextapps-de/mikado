
import Mikado, { apply_proxy } from "./mikado.js";

const proto = Array.prototype,
      proxy = window.Proxy;

let skip = !1;

function debug(mikado) {

    if (!mikado) {

        throw new Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
    }
}

/**
 * @param {Array|Observer=} array
 * @returns {Observer|Proxy}
 * @constructor
 */

export default function Observer(array) {

    if (array instanceof Observer) {

        return array;
    }

    if (!(this instanceof Observer)) {

        return new Observer(array);
    }

    this.mikado = null;

    const length = array ? array.length : 0;

    if (proxy) {

        if (length) {

            for (let i = 0; i < length; i++) {

                this[i] = array[i];
            }
        }

        /** @export */
        this.length = length;

        this.proto = {

            splice: proto.splice.bind(this),
            pop: proto.pop.bind(this),
            shift: proto.shift.bind(this),
            unshift: proto.unshift.bind(this),
            push: proto.push.bind(this)
        };

        return new Proxy(this, handler);
    } else {

        this.proto = array || [];

        for (let i = 0; i <= length; i++) {

            this.define(i);
        }

        //size = length;
        this.define("length");
    }
}

/**
 * @param {Mikado=} mikado
 * @const
 */

Observer.prototype.mount = function (mikado) {

    this.mikado = mikado;
    return this;
};

/**
 * @param key
 * @private
 * @const
 */

Observer.prototype.define = function (key) {

    Object.defineProperty(this, key, {

        get: /** @this {Observer} */function () {

            return this.proto[key];
        },
        set: /** @this {Observer} */function (val) {

            if ("number" == typeof key) {

                if (key === this.length) {

                    // create pointer +1 of array length to trigger array growth
                    this.define(key + 1);
                }

                handler.set(this, key, val);
            }
        }
    });

    return this;
};

const handler = {

    // get: function(target, prop){
    //
    //     return target[prop];
    // },

    /**
     * @param {Observer} target
     * @param prop
     * @param value
     * @return {boolean}
     */

    set: function (target, prop, value) {

        let index_by_number;

        if ("number" == typeof prop) {

            index_by_number = !0;
        } else {

            const index = parseInt(prop, 10);

            if (prop === "" + index) {

                prop = index;
                index_by_number = !0;
            }
        }

        const mikado = target.mikado;

        if (!skip) {

            skip = !0;

            if (mikado /*&& !mikado.skip*/) {

                    const target_length = target.length;

                    if (index_by_number) {

                        const mikado_length = mikado.length;

                        if (target_length !== mikado_length) {

                            target.length = mikado_length;
                        }

                        // if(mikado.stealth && (target[prop] === value)){
                        //
                        //     skip = false;
                        //     return true;
                        // }

                        //const view = mikado.view;
                        let node;

                        if (prop >= mikado_length) {

                            mikado.add(value /*, view*/);
                            target.length++;
                        } else if (prop < mikado_length) {

                            node = mikado.dom[prop];

                            // let tmp, key;

                            // if(replace_key && (node["_key"] !== (key = value[replace_key]))){
                            //
                            //     if((tmp = mikado.live[key])){
                            //
                            //         const idx = tmp["_idx"];
                            //         const item = target[idx];
                            //         target[idx] = target[prop];
                            //         target[prop] = item;
                            //
                            //         mikado.arrange(node, tmp, value, view, prop);
                            //         //has_moved = true;
                            //     }
                            //     else{
                            //
                            //         mikado.replace(node, value, view, prop);
                            //     }
                            // }
                            // else{
                            //
                            //     mikado.update(node, value, view, prop);
                            // }

                            // NOTE: node from the live pool could not be used as the replacement here, also no arrangement
                            // TODO: .replace() could be replaced by .update() (move live pool handler from replace to update)

                            if (mikado.recycle || mikado.key && node._mkk === value[mikado.key]) {

                                mikado.update(node, value, null, prop);
                            } else {

                                mikado.replace(node, value, null, prop);
                            }
                        }
                    } else {

                        if ("length" === prop && value < target_length) {

                            mikado.remove(value, target_length - value);
                        }
                    }
                }

            skip = !1;
        }

        if (index_by_number && mikado.proxy && !value._mkx) {

            value = apply_proxy.call(mikado, mikado.dom[prop], value);
        }

        (proxy ? target : target.proto)[prop] = value;

        // accept changes:
        return !0;
    }
};

// if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("swap") !== -1)){
//
//     Observer.prototype.swap = function(a, b){
//
//         skip = true;
//         this.mikado.swap(a, b, this.view);
//         //const self = proxy ? this : this.proto;
//         // const tmp = self[b];
//         // self[b] = self[a];
//         // self[a] = tmp;
//         skip = false;
//         return this;
//     };
// }

Observer.prototype.set = function (array) {

    this.splice();
    return this.concat(array);
};

/**
 * @param {number=} start
 * @param {number=} count
 * @param {*=} insert
 * @returns {Array<*>}
 */

Observer.prototype.splice = function (start, count, insert) {

    skip = !0;

    start || (start = 0);

    if ("undefined" == typeof count) {

        count = this.length - start;
        if (0 > count) count = 0;
    }

    count && this.mikado.remove( /** @type {number} */start, count);

    const tmp = insert ? this.proto.splice(start, count, insert) : this.proto.splice(start, count);

    insert && this.mikado.add(insert, start /*, this.mikado.view*/);

    //this.length += (insert ? 1 : 0) - count;
    skip = !1;
    return tmp;
};

Observer.prototype.push = function (data) {

    skip = !0;
    this.mikado.add(data /*, this.mikado.view*/);
    /*if(!this.mikado.proxy)*/this[this.length] = data;
    if (proxy) this.length++;
    skip = !1;
};

Observer.prototype.unshift = function (data) {

    skip = !0;
    this.mikado.add(data, 0 /*, this.mikado.view*/);
    this.proto.unshift(data);
    skip = !1;
};

Observer.prototype.pop = function () {

    skip = !0;
    this.mikado.remove(this.length - 1);
    const tmp = this.proto.pop();
    skip = !1;
    return tmp;
};

Observer.prototype.shift = function () {

    skip = !0;
    this.mikado.remove(0);
    const tmp = this.proto.shift();
    skip = !1;
    return tmp;
};

Observer.prototype.concat = function (b) {

    const length = b.length;
    for (let i = 0; i < length; i++) this.push(b[i]);
    return this;
};

Observer.prototype.sort = proto.sort;
// Observer.prototype.sort = function(fn){
//
//     //skip = true;
//     proto.sort.call(this, fn);
//     //this.mikado.refresh(this.view);
//     //skip = false;
//     return this;
// };

Observer.prototype.reverse = proto.reverse;
// Observer.prototype.reverse = function(){
//
//     //skip = true;
//     proto.reverse.call(this);
//     //this.mikado.refresh();
//     //skip = false;
//     return this;
// };

Observer.prototype.slice = proto.slice;

Observer.prototype.map = function (fn, self) {

    if (self) {

        fn = fn.bind(this);
    }

    for (let i = 0, length = this.length; i < length; i++) {

        this[i] = fn(this[i]);
        //this.apply(this.dom[i], data, this.view, i);
    }

    return this;
};

Observer.prototype.filter = function (fn, self) {

    if (self) {

        fn = fn.bind(this);
    }

    let start, count;

    for (let i = 0, length = this.length; i < length; i++) {

        if (!fn(this[i])) {

            if (count) {

                count++;
            } else {

                start = i;
                count = 1;
            }
        } else if (count) {

            this.splice(start, count);
            length -= count;
            i -= count;
            count = 0;
        }
    }

    if (count) {

        this.splice(start, count);
    }

    return this;
};

Observer.prototype.indexOf = function (search) {

    for (let i = 0, len = this.length; i < len; i++) {

        if (this[i] === search) {

            return i;
        }
    }

    return -1;
};

Observer.prototype.lastIndexOf = function (search) {

    for (let i = this.length - 1; 0 <= i; i--) {

        if (this[i] === search) {

            return i;
        }
    }

    return -1;
};

Observer.prototype.forEach = function (fn) {

    for (let i = 0, length = this.length; i < length; i++) {

        fn(this[i]);
    }
};

Observer.prototype.transaction = function (fn) {

    skip = !0;
    fn();

    if (this.mikado.async) {

        this.mikado.render(this).then(function () {
            skip = !1;
        });
    } else {

        this.mikado.render(this);
        skip = !1;
    }
};