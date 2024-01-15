// COMPILER BLOCK -->
import {
    DEBUG,
    PROFILER,
    SUPPORT_CACHE,
    SUPPORT_KEYED,
    SUPPORT_POOLS,
    SUPPORT_CALLBACKS,
    SUPPORT_ASYNC,
    SUPPORT_REACTIVE,
    SUPPORT_EVENTS,
    SUPPORT_DOM_HELPERS,

    MIKADO_DOM,
    MIKADO_LIVE_POOL,
    MIKADO_CLASS,
    MIKADO_TPL_KEY,
    MIKADO_TPL_PATH,
    MIKADO_NODE_CACHE,
    MIKADO_PROXY
} from "./config.js";
// <-- COMPILER BLOCK
import Mikado, { apply_proxy } from "./mikado.js";
import { tick } from "./profiler.js";

const proto = Array.prototype;
/** @type {Proxy} */
const proxy = window["Proxy"];
/** @type {boolean} */
let skip = false;

/**
 * @param {Mikado=} mikado
 */

function debug(mikado){

    if(!mikado){

        throw new Error("The observable array was not assigned to a Mikado instance. You need to pass in the observable array when initiating a Mikado instance.");
    }
}

/**
 * @param {Array|Observer=} array
 * @returns {Observer|Proxy}
 * @constructor
 */

export default function Observer(array){

    if(array instanceof Observer){

        return array;
    }

    if(!(this instanceof Observer)){

        return new Observer(array);
    }

    PROFILER && tick("observer.create");

    this.mikado = null;

    const length = array ? array.length : 0;

    if(proxy){

        if(length){

            for(let i = 0; i < length; i++){

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
            push: proto.push.bind(this),
        };

        return new Proxy(this, handler);
    }
    else{

        this.proto = array || [];

        for(let i = 0; i <= length; i++){

            this.define(i);
        }

        this.define("length");
    }
}

/**
 * @param {!Mikado} mikado
 * @const
 */

Observer.prototype.mount = function(mikado){

    PROFILER && tick("observer.mount");

    if(this.mikado !== mikado){

        this.mikado && mikado.mount(this.mikado.root);
        this.mikado = mikado;
    }

    return this;
}

/**
 * @param {string|number} key
 * @private
 * @const
 */

Observer.prototype.define = function(key){

    PROFILER && tick("observer.define");

    Object.defineProperty(this, /** @type {string} */ (key), {

        get: /** @this {Observer} */ function(){

            return this.proto[key];
        },
        set: /** @this {Observer} */ function(val){

            if(typeof key === "number"){

                if(key === this.length){

                    // create pointer +1 of array length to trigger array growth
                    this.define(key + 1);
                }

                handler.set(this, key, val);
            }
        }
    });

    return this;
}

const handler = /** @type {!ProxyHandler} */ ({

    // actually we do not need a trap for the getter

    // get: function(target, prop){
    //     return target[prop];
    // },

    /**
     * @param {Observer} target
     * @param {string|number} prop
     * @param {Object|number} value
     * @return {boolean}
     */

    set: function(target, prop, value){

        PROFILER && tick("observer.write");

        let index_by_number;

        if(typeof prop === "number"){

            index_by_number = true;
        }
        else{

            const index = parseInt(prop, 10);

            if(prop === ("" + index)){

                index_by_number = true;
            }
        }

        const mikado = target.mikado;

        if(!skip){

            skip = true;

            if(mikado){

                const target_length = target.length;

                if(index_by_number){

                    prop = /** @type {number} */ (prop);

                    DEBUG && debug(mikado);

                    const mikado_length = mikado.length;

                    if(target_length !== mikado_length){

                        target.length = mikado_length;
                    }

                    let node;

                    if(prop >= mikado_length){

                        mikado.add(value);
                        target.length++;
                    }
                    else if(prop < mikado_length){

                        node = mikado.dom[prop];

                        // NOTE: node from the live pool could not be used as the replacement here, also no arrangement
                        // TODO: .replace() could be replaced by .update() (move live pool handler from replace to update)

                        if(mikado.recycle || (SUPPORT_KEYED && mikado.key && (node[MIKADO_TPL_KEY] === value[mikado.key]))){

                            mikado.update(node, value, null, prop);
                        }
                        else{

                            mikado.replace(node, value, null, prop);
                        }
                    }
                }
                else{

                    if(prop === "length"){

                        value = /** @type {number} */ (value);

                        if(value < target_length){

                            mikado.remove(value, target_length - value);
                        }
                    }
                }
            }

            skip = false;
        }

        if(index_by_number && mikado.proxy && (!mikado.recycle || !value[MIKADO_PROXY])){

            prop = /** @type {number} */ (prop);
            value = /** @type {Object} */ (value);
            value = apply_proxy(mikado, mikado.dom[prop], value);
        }

        (proxy ? target : target.proto)[prop] = value;

        // accept changes:
        return true;
    }
});

if(PROFILER){

    handler.get = function(target, prop){

        PROFILER && tick("observer.read");

        return target[prop];
    }
}

/**
 * @param {Array} array
 */

Observer.prototype.set = function(array){

    PROFILER && tick("observer.set");

    const keyed = SUPPORT_KEYED && this.mikado.key;

    if(keyed){

        skip = true;
    }

    if(!keyed && this.mikado.recycle){

        const length = this.length;

        for(let i = 0; i < length; i++){

            this[i] = array[i];
        }

        if(length > array.length){

            this.splice(length);
        }
    }
    else{

        this.splice();
        this.concat(array);
    }

    if(keyed){

        this.mikado.render(this);
        skip = false;
    }

    return this;
};

/**
 * @param {number=} start
 * @param {number=} count
 * @param {*=} insert
 * @returns {Array<*>}
 */

Observer.prototype.splice = function(start, count, insert){

    PROFILER && tick("observer.splice");
    DEBUG && debug(this.mikado);

    skip = true;

    start || (start = 0);

    if(typeof count === "undefined"){

        count = this.length - start;
        if(count < 0) count = 0;
    }

    count && this.mikado.remove(/** @type {number} */ (start), count);
    const tmp = insert ? this.proto.splice(start, count, insert) : this.proto.splice(start, count);
    insert && this.mikado.add(insert, start/*, this.mikado.view*/);

    //this.length += (insert ? 1 : 0) - count;
    skip = false;
    return tmp;
};

/**
 * @param {Object<string, number|string>} data
 */

Observer.prototype.push = function(data){

    PROFILER && tick("observer.push");
    DEBUG && debug(this.mikado);

    skip = true;
    this.mikado.add(data);
    this[this.length] = data;
    if(proxy) this.length++;
    skip = false;
};

/**
 * @param {Object<string, number|string>} data
 */

Observer.prototype.unshift = function(data){

    PROFILER && tick("observer.unshift");
    DEBUG && debug(this.mikado);

    skip = true;
    this.mikado.add(data, 0);
    this.proto.unshift(data);
    skip = false;
};

/**
 * @return {Object<string, number|string>}
 */

Observer.prototype.pop = function(){

    PROFILER && tick("observer.pop");
    DEBUG && debug(this.mikado);

    skip = true;
    this.mikado.remove(this.length - 1);
    const tmp = this.proto.pop();
    skip = false;
    return tmp;
};

/**
 * @return {Object<string, number|string>}
 */

Observer.prototype.shift = function(){

    PROFILER && tick("observer.shift");
    DEBUG && debug(this.mikado);

    skip = true;
    this.mikado.remove(0);
    const tmp = this.proto.shift();
    skip = false;
    return tmp;
};

/**
 * @param {Array<Object<string, number|string>>} arr
 */

Observer.prototype.concat = function(arr){

    PROFILER && tick("observer.concat");

    const length = arr.length;
    for(let i = 0; i < length; i++) this.push(arr[i]);
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

/**
 * @param {Function} fn
 * @param {boolean} self
 */

Observer.prototype.map = function(fn, self){

    PROFILER && tick("observer.map");

    if(self){

        fn = fn.bind(this);
    }

    for(let i = 0, length = this.length; i < length; i++){

        this[i] = fn(this[i]);
        //this.apply(this.dom[i], data, this.view, i);
    }

    return this;
};

/**
 * @param {Function} fn
 * @param {boolean} self
 */

Observer.prototype.filter = function(fn, self){

    PROFILER && tick("observer.filter");

    if(self){

        fn = fn.bind(this);
    }

    let start, count;

    for(let i = 0, length = this.length; i < length; i++){

        if(!fn(this[i])){

            if(count){

                count++;
            }
            else{

                start = i;
                count = 1;
            }
        }
        else if(count){

            this.splice(start, count);
            length -= count;
            i -= count;
            count = 0;
        }
    }

    if(count){

        this.splice(start, count);
    }

    return this;
};

/**
 * @param {*} search
 * @return number
 */

Observer.prototype.indexOf = function(search){

    PROFILER && tick("observer.indexOf");

    for(let i = 0, len = this.length; i < len; i++){

        if(this[i] === search){

            return i;
        }
    }

    return -1;
};

/**
 * @param {*} search
 * @return number
 */

Observer.prototype.lastIndexOf = function(search){

    PROFILER && tick("observer.lastIndexOf");

    for(let i = this.length - 1; i >= 0; i--){

        if(this[i] === search){

            return i;
        }
    }

    return -1;
};

Observer.prototype.includes = proto.includes;

/**
 * @param {Function} fn
 */

Observer.prototype.forEach = function(fn){

    PROFILER && tick("observer.forEach");

    for(let i = 0, length = this.length; i < length; i++){

        fn(this[i]);
    }

    return this;
};

/**
 * @param {number} a
 * @param {number} b
 */

Observer.prototype.swap = function(a, b){

    PROFILER && tick("observer.swap");

    //const self = proxy ? this : this.proto;
    const tmp = this[b];
    this[b] = this[a];
    this[a] = tmp;

    return this;
};

/**
 * Transactions will apply reconciling
 * @param {Function} fn
 */

Observer.prototype.transaction = function(fn){

    PROFILER && tick("observer.transaction");
    DEBUG && debug(this.mikado);

    skip = true;
    fn();
    skip = false;

    const mikado = this.mikado;
    const fullproxy = mikado.fullproxy;

    // the fullproxy skip needs to be removed temporary,
    // otherwise it won't commit collected properties
    mikado.fullproxy = 0;

    if(mikado.async){

        mikado.render(this).then(function(){
            mikado.fullproxy = fullproxy;
        })
    }
    else{

        mikado.render(this);
        mikado.fullproxy = fullproxy;
    }
}
