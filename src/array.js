const proto = Array.prototype;
const proxy = window["Proxy"];

let size = 0;

/**
 * @param {Array|Observer=} array
 * @returns {Observer|Proxy}
 * @constructor
 */

export default function Observer(array){

    if(!(this instanceof Observer)){

        return new Observer(array);
    }

    if(array instanceof Observer){

        return array;
    }

    // TODO: hide references
    this.mikado = null;
    this.view = null;

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

            define(this, i);
        }

        size = length;

        define(this, "length");
    }
}

function define(self, _key){

    const key = _key;

    Object.defineProperty(self, key, {

        get: /** @this {Observer} */ function(){

            return this.proto[key];
        },
        set: /** @this {Observer} */ function(val){

            if(typeof key === "number"){

                if(key === size){

                    define(this, ++size);
                }

                handler.set(this, key, val);
            }
        }
    });
}

let skip = false;

const handler = {

    set: function(target, prop, value){

        let index_by_number;

        if(typeof prop === "number"){

            index_by_number = true;
        }
        else{

            const index = parseInt(prop, 10);

            if(prop === ("" + index)){

                prop = index;
                index_by_number = true;
            }
        }

        if(!skip){

            skip = true;

            const mikado = target.mikado;

            if(mikado && !mikado.skip){

                const target_length = target.length;

                if(index_by_number){

                    const mikado_length = mikado.length;

                    if(target_length !== mikado_length){

                        target.length = mikado_length;
                    }

                    if(mikado.stealth && (target[prop] === value)){

                        skip = false;
                        return true;
                    }

                    const view = target.view;

                    if(prop >= mikado_length){

                        mikado.add(value, view);
                        target.length++;
                    }
                    else if(prop < mikado_length){

                        const replace_key = SUPPORT_POOLS && mikado.key;
                        const node = mikado.dom[prop];

                        // NOTE: node from the live pool could not be used as the replacement here, also no arrangement
                        if(mikado.reuse || (replace_key && (node["_key"] === value[replace_key]))){

                            mikado.update(node, value, view, prop);
                        }
                        else{

                            mikado.replace(node, value, view, prop);
                        }
                    }

                    if(mikado.proxy){

                        skip = false;
                        return true;
                    }
                }
                else{

                    if(prop === "length" && (value < target_length)){

                        mikado.remove(value, target_length - value);
                    }
                }
            }

            skip = false;
        }

        (proxy ? target : target.proto)[prop] = value;

        // accept changes:
        return true;
    }
};

if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("swap") !== -1)){

    Observer.prototype.swap = function(a, b){

        skip = true;
        this.mikado.swap(a, b, this.view);
        //const self = proxy ? this : this.proto;
        // const tmp = self[b];
        // self[b] = self[a];
        // self[a] = tmp;
        skip = false;
        return this;
    };
}

/**
 * @param a
 * @param b
 * @param {*=} c
 * @returns {*}
 */

Observer.prototype.splice = function(a, b, c){

    skip = true;

    if(typeof b === "undefined"){

        b = this.length - a;
        if(b < 0) b = 0;
    }

    b && this.mikado.remove(a, b);

    const tmp = c ? this.proto.splice(a, b, c) : this.proto.splice(a, b);

    c && this.mikado.add(c, a, this.view);

    //this.length += (c ? 1 : 0) - b;
    skip = false;
    return tmp;
};

Observer.prototype.push = function(data){

    skip = true;
    this.mikado.add(data, this.view);
    if(!this.mikado.proxy) this[this.length] = data;
    if(proxy) this.length++;
    skip = false;
};

Observer.prototype.unshift = function(data){

    skip = true;
    this.mikado.add(data, 0, this.view);
    this.proto.unshift(data);
    skip = false;
};

Observer.prototype.pop = function(){

    skip = true;
    this.mikado.remove(this.length - 1);
    const tmp = this.proto.pop();
    skip = false;
    return tmp;
};

Observer.prototype.shift = function(){

    skip = true;
    this.mikado.remove(0);
    const tmp = this.proto.shift();
    skip = false;
    return tmp;
};

Observer.prototype.concat = function(b){

    const length = b.length;
    for(let i = 0; i < length; i++) this.push(b[i]);
    return this;
};

Observer.prototype.sort = function(fn){

    //skip = true;
    proto.sort.call(this, fn);
    //this.mikado.refresh(this.view);
    //skip = false;
    return this;
};

Observer.prototype.reverse = function(){

    //skip = true;
    proto.reverse.call(this);
    //this.mikado.refresh();
    //skip = false;
    return this;
};

Observer.prototype.slice = proto.slice;

Observer.prototype.map = function(fn, self){

    if(self){

        fn = fn.bind(this);
    }

    for(let i = 0, length = this.length; i < length; i++){

        this[i] = fn(this[i]);
        //this.apply(this.dom[i], data, this.view, i);
    }

    return this;
};

Observer.prototype.filter = function(fn, self){

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

Observer.prototype.indexOf = function(search){

    for(let i = 0, len = this.length; i < len; i++){

        if(this[i] === search){

            return i;
        }
    }

    return -1;
};

Observer.prototype.lastIndexOf = function(search){

    for(let i = this.length - 1; i >= 0; i--){

        if(this[i] === search){

            return i;
        }
    }

    return -1;
};

Observer.prototype.forEach = function(fn){

    for(let i = 0, length = this.length; i < length; i++){

        fn(this[i]);
    }
};
