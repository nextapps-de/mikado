/**!
 * Mikado.js
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */

// COMPILER BLOCK -->
import { TemplateDOM, Template, MikadoOptions } from "./type.js";
import {
    SUPPORT_DOM_HELPERS,
    DEBUG,
    SUPPORT_CACHE,
    SUPPORT_KEYED,
    SUPPORT_POOLS,
    SUPPORT_CALLBACKS,
    SUPPORT_ASYNC,
    SUPPORT_REACTIVE,
    SUPPORT_EVENTS,
    REACTIVE_ONLY,

    MIKADO_DOM,
    MIKADO_LIVE_POOL,
    MIKADO_CLASS,
    MIKADO_TPL_KEY,
    //MIKADO_TPL_INDEX,
    MIKADO_TPL_PATH,
    MIKADO_NODE_CACHE, MIKADO_PROXY
} from "./config.js";
// <-- COMPILER BLOCK

//import "./event.js";
//import "./helper.js";
//import "./proxy.js";
//import "./compile.js";
import Observer from "./array.js";

import { create_path, construct } from "./factory.js";
import proxy_create from "./proxy.js";

/** @const {Object<string, Mikado|Array<Template, MikadoOptions>>} */
export const includes = Object.create(null);

/**
 * Abbrevations:
 * _mkd: _dom
 * _mkl: _live
 * _mki: _instance
 */

/**
 * NOTE: Using prototype enables conditional instance member functions.
 * @param {!string|Template} template
 * @param {MikadoOptions=} options
 * @constructor
 */

export default function Mikado(template, options = /** @type MikadoOptions */ ({})){

    if(!(this instanceof Mikado)) {

        return new Mikado(template, options);
    }

    if(typeof template === "string"){

        const tpl = includes[template];

        if(DEBUG){

            if(!tpl){

                throw new Error("The template '" + template + "' is not registered.");
            }
        }

        if(tpl instanceof Mikado){

            return tpl;
        }

        template = /** @type Template */ (tpl[0]);
        options || (options = /** @type MikadoOptions */ (tpl[1]));
    }

    if(DEBUG){

        if(!template){

            throw new Error("Initialization Error: Template is not defined.");
        }

        if(!template.tpl || !template.name){

            throw new Error("Initialization Error: Template isn't supported.");
        }
    }

    /** @type {Array<!Element>} */
    this.dom = [];
    /** @type {number} */
    this.length = 0;
    /** @type {?Element} */
    this.root = options.root || options.mount || null;
    /** @const {boolean} */
    this.recycle = !!options.recycle;
    /** @type {*} */
    this.state = options.state || {};

    if(SUPPORT_KEYED){

        /** @const {string} */
        this.key = template.key || "";
        /** @private @dict {Object<string, Element>} */
        this.live = {};
    }

    /** @type {Array<Function>} */
    const fn = template.fn;
    /**
     * The compiler unshift includes, so we can use faster arr.pop() here, because it needs reverse direction
     * @private {Function}
     */
    this.apply = fn && fn.pop();
    /** @type {TemplateDOM|null} */
    this.tpl = template.tpl;
    /** @const {string} */
    this.name = template.name;
    /* @const {Array<Mikado>} */
    this.inc = [];

    /**
     * Temporary assign includes to template definition,
     * because this.inc = [] is filled with Mikado instances when factory is constructed,
     * and it needs something which holds those definitions
     * @const {Array<Function>}
     */
    template.tpl._fn = fn;

    if(SUPPORT_POOLS){

        /** @const {boolean|number} */
        this.pool = /** @type {boolean|number} */ (((SUPPORT_KEYED && this.key) || this.recycle) && options.pool) || 0;
        /** @private {Array<Element>} */
        this.pool_shared = [];

        if(SUPPORT_KEYED){

            /** @private */
            this.pool_keyed = new Map();
        }
    }

    if(SUPPORT_CACHE){

        /** @const {boolean} */
        this.cache = template.cache || !!options.cache;
    }

    if(SUPPORT_ASYNC){

        /** @type {boolean} */
        this.async = !!options.async;
        /** @private {number} */
        this.timer = 0;
    }

    if(SUPPORT_CALLBACKS){

        /** @private {Object} */
        this.on = options.on || {};
    }

    if(SUPPORT_REACTIVE){

        /**
         * @type {Object<string, Array<string, number>>}
         */
        this.proxy = null;
        /** @type {number} */
        this.fullproxy = 0;
        /** @type {Observer|undefined} */
        let store = options.observe;

        if(store){

            new Observer(store).mount(this);
        }
    }

    if(this.root){

        this.mount(this.root, options.hydrate);
    }
    else{

        /** @private */
        this.factory = null;
    }
}

/**
 * This function is also automatically called when loading es5 templates.
 * @param {string|Template} tpl
 * @param {MikadoOptions=} options
 */

export function register(tpl, options){

    let name, re_assign;

    if(typeof tpl === "string"){

        name = re_assign = tpl;
        tpl = /** @type {string|Template} */ (includes[name]);
        tpl instanceof Mikado || (tpl = tpl[0]);

        if(DEBUG){

            if(!tpl){

                throw new Error("The template '" + name + "' was not found.");
            }
        }
    }
    else{

        name = tpl.name;
    }

    if(DEBUG){

        if(includes[name]){

            if(re_assign){

                console.info("The template '" + name + "' was replaced by a new definition.");
            }
            else{

                console.warn("The template '" + name + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!");
            }
        }
    }

    // Just collect template definitions. The instantiation starts when .mount() is
    // internally called for the first time.

    includes[name] = [
        /** @type {Template} */ (tpl),
        /** @type {MikadoOptions} */ (options)
    ];

    return Mikado;
}

/**
 * @param {string|Template} name
 */

export function unregister(name){

    if(typeof name === "object"){

        name = /** @type {string} */ (name.name);
    }

    const mikado = includes[name];

    if(mikado){

        mikado instanceof Mikado && mikado.destroy();
        includes[name] = null;
    }

    return Mikado;
}

/*

    Example: Swap Mount

    A[DOM] B[DOM]
    A[TPL] A[TPL]

    A[DOM] A[DOM]
    A[TPL] B[TPL]

 */

/**
 * @param {Element} target
 * @param {boolean=} hydrate
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.mount = function(target, hydrate){

    if(SUPPORT_ASYNC){

        if(this.timer){

            this.cancel();
        }
    }

    const target_instance = target[MIKADO_CLASS];
    const root_changed = this.root !== target;

    if(target_instance === this){

        // same template, same root

        if(!root_changed) return this;

        // same template, different root

        this.dom = target[MIKADO_DOM];
        this.length = this.dom.length;
    }
    else if(target_instance){

        // different template, same root

        target_instance.clear();
        target[MIKADO_DOM] = this.dom = [];
        this.length = 0;
    }
    else{

        // initial mount

        if(hydrate){

            this.dom = collection_to_array(target.children);
            //this.dom = collection_to_array(target.childNodes);
            this.length = this.dom.length;
        }
        else{

            this.dom = [];
            this.length = 0;

            if(target.firstChild){

                target.textContent = "";
            }
        }

        target[MIKADO_DOM] = this.dom;
    }

    if(SUPPORT_KEYED && this.key){

        // handle live pool

        if(root_changed && this.root){

            this.root[MIKADO_LIVE_POOL] = this.live;
        }

        if(target_instance === this){

            this.live = target[MIKADO_LIVE_POOL];
        }
        else{

            const live = {};

            if(!target_instance && hydrate && this.length){

                for(let i = 0, node, key; i < this.length; i++){

                    node = this.dom[i];
                    key = node.getAttribute("key");
                    node[MIKADO_TPL_KEY] = key;
                    live[key] = node;
                }
            }

            target[MIKADO_LIVE_POOL] = this.live = live;
        }
    }

    target[MIKADO_CLASS] = this;
    this.root = target;

    if(!this.factory){

        if(hydrate && this.length){

            /** @private */
            this.factory = this.dom[0].cloneNode();
            construct(/** @type {TemplateDOM} */ (this.tpl), [], "", this.factory, this) && (this.tpl = null);
        }

        // also when falls back on hydration if structure was incompatible

        if(this.tpl){

            /** @private */
            this.factory = construct(/** @type {TemplateDOM} */ (this.tpl), [], "", null, this);
            this.tpl = null;
        }
    }

    return this;
};

/**
 * @param {NodeList} collection
 * @return {Array<Element>}
 */

function collection_to_array(collection){

    const length = collection.length;
    const array = new Array(length);

    for(let i = 0; i < length; i++) {

        array[i] = collection[i];
    }

    return array;
}

/**
 * @param {Element} root
 * @param {Template} template
 * @param {Array<Object>|Object=} data
 * @param {*=} state
 * @param {Function=} callback
 * @const
 */

Mikado.once = function(root, template, data, state, callback){

    const mikado = new Mikado(template);

    if(typeof state === "function"){

        callback = state;
        state = null;
    }

    if(callback){

        const fn = callback;

        callback = function(){

            mikado.destroy();
            fn();
        }
    }

    if(DEBUG){

        if(!root){

            throw new Error("Root element is not defined.");
        }
    }

    root.append(mikado.create(data, state));

    if(!callback){

        mikado.destroy();
    }

    return Mikado;
};

if(!REACTIVE_ONLY){

    /**
     * @param {!*} data
     * @param {*=} state
     * @param {Function|boolean=} callback
     * @param {boolean|number=} _skip_async
     * @returns {Mikado|Promise}
     * @const
     */

    Mikado.prototype.render = function(data, state, callback, _skip_async){

        if(DEBUG){

            if(!this.root){

                throw new Error("Template was not mounted or root was not found.");
            }
            else if(this.root[MIKADO_CLASS] !== this){

                throw new Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
            }
        }

        if(SUPPORT_ASYNC && !_skip_async){

            let has_fn;

            if(state && (has_fn = typeof state === "function") || state === true){

                callback = /** @type {Function|boolean} */ (state);
                state = null;
            }

            if(this.timer){

                this.cancel();
            }

            if(this.async || callback){

                const self = this;
                has_fn || (has_fn = typeof callback === "function");

                self.timer = requestAnimationFrame(function(){

                    self.timer = 0;
                    self.render(data, state, null, 1);
                    has_fn && callback();
                });

                return has_fn ? this : new Promise(function(resolve){

                    callback = resolve;
                });
            }
        }

        //profiler_start("render");

        let length = this.length;

        if(!data){

            if(!this.apply){

                this.dom[0] || this.add();
            }

            if(DEBUG){

                console.warn("When calling .render() by passing no data nothing will happen!");
            }

            return this;
        }

        let count;

        if(Array.isArray(data) || (SUPPORT_REACTIVE && data instanceof Observer)){

            count = data.length;

            if(!count){

                return this.remove(0, length);
            }
        }
        else{

            if(DEBUG && SUPPORT_REACTIVE && this.proxy){

                throw new Error(
                    "When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. " +
                    "Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'."
                );
            }

            data = [data];
            count = 1;
        }

        const key = SUPPORT_KEYED && this.key;

        if(length && !key && !this.recycle){

            this.remove(0, length);
            length = 0;
        }

        let min = length < count ? length : count;
        let x = 0;

        // update
        if(x < min){

            for(let node, item; x < min; x++){

                node = this.dom[x];
                item = data[x];

                if(key && (node[MIKADO_TPL_KEY] !== item[key])){

                    return this.reconcile(/** @type {Array} */ (data), state, x, 1);
                }
                else{

                    this.update(node, item, state, x, 1);
                }

                if(SUPPORT_REACTIVE && this.proxy && !item[MIKADO_PROXY]){

                    data[x] = apply_proxy.call(this, node, item);
                }
            }
        }

        // add
        if(x < count){

            for(; x < count; x++){

                const item = data[x];
                this.add(item, state, x);

                if(SUPPORT_REACTIVE && this.proxy && !item[MIKADO_PROXY]){

                    data[x] = apply_proxy.call(this, this.dom[x], item);
                }
            }
        }

        // remove
        else if(count < length){

            this.remove(count, length - count);
        }
        //}

        //profiler_end("render");

        return this;
    };
}

/**
 * param {!Element|number} node
 * param {*=} data
 * param {*=} state
 * param {number=} index
 * @const
 */

Mikado.prototype.replace = function(node, data, state, index){

    //profiler_start("replace");

    if(typeof index === "undefined"){

        if(typeof node === "number"){

            index = node;
            node = this.dom[index];
        }
        else{

            index = this.index(node);
        }
    }

    let tmp, update;

    // handle key matches in live pool (having two instances of the same component with the same key on the same view model isn't allowed)
    // TODO: provide transaction feature to optimize reconciling when proxy index access modifies in a batch

    if(SUPPORT_KEYED && this.key){

        const key = data[this.key];

        if((tmp = this.live[key])){

            if(tmp !== node){

                const index_old = this.index(tmp);

                this.dom[index] = tmp;
                this.dom[index_old] = node;

                const node_a = index_old < index ? tmp : node;
                const node_b = index_old < index ? node : tmp;
                const prev = node_a.nextElementSibling;

                this.root.insertBefore(node_a, node_b);

                if(prev !== node_b){

                    this.root.insertBefore(node_b, prev);
                }
            }
        }
        else if(SUPPORT_POOLS && this.pool && (tmp = this.pool_keyed.get(key))){

            this.pool_keyed.delete(key);
            this.checkout(node);
            this.dom[index] = tmp;
            node.replaceWith(tmp);
        }

        update = tmp;
    }
    else if(this.recycle){

        update = node;
    }

    if(update){

        (SUPPORT_REACTIVE && this.fullproxy && data[MIKADO_PROXY]) || !this.apply || this.apply(
            data,
            state || this.state,
            index,
            update[MIKADO_TPL_PATH] || create_path(update, this.factory[MIKADO_TPL_PATH], SUPPORT_CACHE && this.cache)
        );
    }
    else{

        const clone = this.create(data, state, index, 1);

        if((SUPPORT_KEYED || SUPPORT_POOLS) && (this.key || this.pool)){

            this.checkout(node);
        }

        this.dom[index] = clone;
        node.replaceWith(clone);
    }

    const callback = SUPPORT_CALLBACKS && this.on["replace"];
    callback && callback(node);

    //profiler_end("replace");

    return this;
};

/**
 * @param {Element|number} node
 * @param {*=} data
 * @param {*=} state
 * @param {number=} index
 * @param {boolean|number=} _skip_check
 * @const
 */

Mikado.prototype.update = function(node, data, state, index, _skip_check){

    //profiler_start("update");

    if(!this.apply){

        if(DEBUG){

            console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents.");
        }

        return this;
    }

    if(SUPPORT_REACTIVE && this.fullproxy && data[MIKADO_PROXY]){

        return this;
    }

    if(typeof index === "undefined"){

        if(typeof node === "number"){

            index = node;
            node = this.dom[node];
        }
        else{

            index = this.index(node);
        }
    }

    node = /** @type {Element} */ (node);

    // if(SUPPORT_STORAGE){
    //
    //     if(SUPPORT_REACTIVE && this.proxy){
    //
    //         if(this.stealth && ((/*this.store ?*/ this.store[index] /*: node["_data"]*/) === data)){
    //
    //             return this;
    //         }
    //
    //         data["_proxy"] || (data = proxy_create(data, node["_path"] || this.create_path(node), this.proxy));
    //     }
    //
    //     if(this.store){
    //
    //         if(SUPPORT_REACTIVE) this.skip = 1;
    //         this.store[index] = data;
    //         if(SUPPORT_REACTIVE) this.skip = 0;
    //     }
    //     else if(this.loose){
    //
    //         node["_data"] = data;
    //     }
    // }

    // TODO is this check also needed in update?
    /*
    if(!_skip_check){

        let replace;

        if(SUPPORT_KEYED && this.key){

            const ref = node[MIKADO_TPL_KEY];
            const tmp = data[this.key];

            if(ref !== tmp){

                if(this.recycle){

                    this.live[ref] = null;
                    this.live[tmp] = node;
                    node[MIKADO_TPL_KEY] = tmp;
                }
                else{

                    replace = true;
                }
            }
        }
        else if(!this.recycle){

            replace = true;
        }

        if(replace){

            return this.replace(node, data, state, index);
        }
    }
    */

    this.apply(
        data,
        state || this.state,
        index,
        node[MIKADO_TPL_PATH] || create_path(node, this.factory[MIKADO_TPL_PATH], SUPPORT_CACHE && this.cache)
    );

    //profiler_end("update");

    const callback = SUPPORT_CALLBACKS && this.on["update"];
    callback && callback(node);

    return this;
};

if(SUPPORT_ASYNC){

    /** @const */
    Mikado.prototype.cancel = function(){

        //if(this.timer){

            cancelAnimationFrame(this.timer);
            this.timer = 0;
        //}

        return this;
    };
}

/**
 * @param {*=} data
 * @param {*=} state
 * @param {number=} index
 * @param {boolean|number=} _update_pool
 * @return {!Element}
 * @const
 */

Mikado.prototype.create = function(data, state, index, _update_pool){

    //profiler_start("create");

    let keyed = SUPPORT_KEYED && this.key;
    const key = keyed && data[keyed];
    let node, pool, factory, found;

    // 1. keyed pool (shared)
    if(SUPPORT_POOLS && keyed && this.pool && (pool = this.pool_keyed) && (node = pool.get(key))){

        found = 1;
        pool.delete(key);
    }
    // 2. non-keyed pool (shared)
    else if(SUPPORT_POOLS && (!keyed || this.recycle) && this.pool && (pool = this.pool_shared) && pool.length){

        node = pool.pop();
    }
    else{

        node = factory = this.factory;

        if(!factory){

            /** @private */
            this.factory = node = factory = construct(/** @type {TemplateDOM} */ (this.tpl), [], "", null, this);
            this.tpl = null;
        }
    }

    //if(!SUPPORT_STORAGE || !SUPPORT_REACTIVE || !found || !this.stealth || this.observe){

        this.apply && this.apply(
            data,
            state || this.state,
            index,
            node[MIKADO_TPL_PATH] || create_path(node, this.factory[MIKADO_TPL_PATH], !!factory || (SUPPORT_CACHE && this.cache))
        );
   // }

    if(factory){

        node = node.cloneNode(true);
    }

    if(keyed){

        if(!found) node[MIKADO_TPL_KEY] = key;
        if(_update_pool) this.live[key] = node;
    }

    const callback = SUPPORT_CALLBACKS && this.on[factory ? "create" : "recycle"];
    callback && callback(node);

    //profiler_end("create");

    return node;
};

/**
 * @param {*=} data
 * @param {*=} state
 * @param {number|null=} index
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.add = function(data, state, index){

    //profiler_start("add");

    let has_index;

    if(typeof state === "number"){

        index = state;
        state = null;
        has_index = index < this.length;
    }
    else if(index || (index === 0)){

        has_index = index < this.length;
    }
    else{

        index = this.length;
    }

    const node = this.create(data, state, index, 1);

    //if(SUPPORT_STORAGE) {

        //let stealth_mode;

        // if(SUPPORT_REACTIVE && this.proxy){
        //
        //     if(this.stealth && this.loose && (node["_data"] === data)){
        //
        //         stealth_mode = 1;
        //     }
        //     else{
        //
        //         data["_proxy"] || (data = proxy_create(data, node["_path"] || this.create_path(node), this.proxy));
        //     }
        // }

        // if(!stealth_mode){
        //
        //     if(this.store){
        //
        //         if(has_index && !this.extern){
        //
        //             splice(this.store, this.length - 1, length, data);
        //             //this.store.splice(length, 0, data);
        //         }
        //         else{
        //
        //             if(SUPPORT_REACTIVE) this.skip = 1;
        //             this.store[length] = data;
        //             if(SUPPORT_REACTIVE) this.skip = 0;
        //         }
        //     }
        //     else if(this.loose){
        //
        //         node["_data"] = data;
        //     }
        // }
    //}

    if(has_index){

        this.root.insertBefore(node, this.dom[index]);
        splice(this.dom, this.length - 1, index, node);
        //this.dom.splice(length, 0, node);
        this.length++;
    }
    else{

        this.root.appendChild(node);
        this.dom[this.length++] = node;
    }

    const callback = SUPPORT_CALLBACKS && this.on["insert"];
    callback && callback(node);

    //profiler_end("add");

    return this;
};

/**
 * @param {Element} node
 * @param {Object} data
 * @this Mikado
 * @return {Proxy}
 */

export function apply_proxy(node, data){

    return proxy_create(
        data,
        node[MIKADO_TPL_PATH] || create_path(node, this.factory[MIKADO_TPL_PATH], SUPPORT_CACHE && this.cache),
        this.proxy
    );
}

if(SUPPORT_KEYED && !REACTIVE_ONLY){

    /**
     * Reconcile based on "longest distance" strategy by Thomas Wilkerling
     * @param {Array=} b
     * @param {*=} state
     * @param {number=} x
     * @param {boolean|number=} render
     * @returns {Mikado}
     * @const
     */

    Mikado.prototype.reconcile = function(b, state, x, render){

        // const store = SUPPORT_STORAGE && !this.extern && this.store;
        //
        // if(store){
        //
        //     b || (b = store);
        //
        //     // skips updating internal store
        //     this.store = 0;
        // }

        const a = this.dom;
        const live = this.live;
        const key = this.key;

        let end_b = b.length;
        let end_a = a.length;
        let max_end = end_a > end_b ? end_a : end_b;
        let shift = 0;
        //let steps = 0;

        for(x || (x = 0); x < max_end; x++){

            let found;

            if(x < end_b){

                const b_x = b[x];
                const ended = x >= end_a;
                let a_x;
                let b_x_key;
                let a_x_key;

                if(!ended){

                    a_x = a[x];
                    b_x_key = b_x[key];
                    a_x_key = a_x[MIKADO_TPL_KEY];

                    if(SUPPORT_REACTIVE && this.proxy && !b_x[MIKADO_PROXY]){

                        b[x] = apply_proxy.call(this, a_x, b_x);
                    }

                    if(a_x_key === b_x_key){

                        if(render){

                            this.update(a_x, b_x, state, x, 1);
                        }

                        continue;
                    }
                }

                if(ended || !live[b_x_key]){

                    if(render){

                        // TODO check: !this.pool
                        if(ended || !this.pool){

                            end_a++;
                            max_end = end_a > end_b ? end_a : end_b;

                            this.add(b_x, state, x);
                        }
                        else{

                            this.replace(a_x, b_x, state, x);
                        }
                    }

                    if(SUPPORT_REACTIVE && this.proxy && !b_x[MIKADO_PROXY]){

                        b[x] = apply_proxy.call(this, a[x], b_x);
                    }

                    continue;
                }

                let idx_a, idx_b;

                for(let y = x + 1; y < max_end; y++){

                    // determine longest distance
                    if(!idx_a && (y < end_a) && (a[y][MIKADO_TPL_KEY] === b_x_key)) idx_a = y + 1;
                    if(!idx_b && (y < end_b) && (b[y][key] === a_x_key)) idx_b = y + 1;

                    if(idx_a && idx_b){

                        // shift up (move target => current)
                        if(idx_a >= idx_b){

                            const tmp_a = a[idx_a - 1];

                            // when distance is 1 it will always move before, no predecessor check necessary
                            this.root.insertBefore(/** @type {Node} */ (tmp_a), /** @type {Node} */ (a_x));

                            if(render){

                                this.update(tmp_a, b_x, state, x, 1);
                            }

                            // fast path optimization when distance is equal (skips finding on next turn)
                            if(idx_a === idx_b){

                                if((y - x) > 1){

                                    this.root.insertBefore(/** @type {Node} */ (a_x), /** @type {Node} */ (a[idx_a]));
                                }

                                a[x] = a[y];
                                a[y] = /** @type {!Element} */ (a_x);

                                if(DEBUG){

                                    if(!a_x){

                                        console.error("Error");
                                    }
                                }

                                // if(render){
                                //
                                //     this.update(a_x, b[y], state, y);
                                // }

                                //steps++;
                            }
                            else{

                                splice(a, idx_a - 1, x);
                                //a.splice(x, 0, a.splice(idx_a - 1, 1)[0]);

                                shift++;
                            }

                            //steps++;
                        }
                        // shift down (move current => target)
                        else{

                            const index = idx_b - 1 + shift;

                            // distance is always greater than 1, no predecessor check necessary
                            this.root.insertBefore(/** @type {Node} */ (a_x), /** @type {Node} */ (a[index]) || null);
                            splice(a, x, (index > end_a ? end_a : index) - 1);
                            //a.splice(/* one is removed: */ index - 1, 0, a.splice(x, 1)[0]);

                            shift--;
                            x--;
                            //steps++;
                        }

                        found = 1;
                        break;
                    }
                }
            }

            if(!found){

                this.remove(x);

                end_a--;
                max_end = end_a > end_b ? end_a : end_b;
                x--;
            }
        }

        // if(store){
        //
        //     this.store = b;
        // }

        //if(steps) console.log(steps);

        return this;
    };
}

/**
 * @param {Array} arr
 * @param {number} pos_old
 * @param {number} pos_new
 * @param {*=} insert
 * @const
 */

function splice(arr, pos_old, pos_new, insert){

    const tmp = insert || arr[pos_old];

    if(insert){

        pos_old++;
    }

    if(pos_old < pos_new){

        for(; pos_old < pos_new; pos_old++){

            arr[pos_old] = arr[pos_old + 1];
        }
    }
    else /*if(pos_old > pos_new)*/{

        for(; pos_old > pos_new; pos_old--){

            arr[pos_old] = arr[pos_old - 1];
        }
    }

    arr[pos_new] = tmp;
}

if(!REACTIVE_ONLY){

    /**
     * @param {*=} data
     * @param {*=} state
     * @param {number=} index
     * @const
     */

    Mikado.prototype.append = function(data, state, index){

        //profiler_start("append");

        let has_index;

        if(typeof state === "number"){

            index = state;
            state = null;
            has_index = 1;
        }
        else if(index || index === 0){

            has_index = 1;
        }

        const count = data.length;

        for(let x = 0; x < count; x++){

            this.add(data[x], state, has_index ? index++ : null);
        }

        //profiler_end("append");

        return this;
    };

    /**
     * @returns {Mikado}
     * @const
     */

    Mikado.prototype.clear = function(){

        if(this.length){

            this.remove(0, this.length);
        }

        return this;
    };
}

/**
 * @param {!Element|number} index
 * @param {number=} count
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.remove = function(index, count){

    //profiler_start("remove");

    let length = this.length;

    if(length && index){

        if(typeof index !== "number"){

            index = this.index(index);
        }
        else if(index < 0){

            index = length + index - 1;
        }
    }

    if(!length || (index >= length)){

        //profiler_end("remove");

        return this;
    }

    if(count){

        if(count < 0){

            index -= count + 1;

            if(index < 0){

                index = 0;
            }

            count *= -1;
        }
    }
    else{

        count = 1;
    }

    let nodes;

    if(!index && (count >= length)){

        nodes = this.dom;
        count = nodes.length;
        this.root.textContent = "";
        this.root[MIKADO_DOM] = this.dom = [];
        length = 0;
    }
    else{

        nodes = this.dom.splice(/** @type {number} */ (index), count);
        length -= count;
    }

    // reverse is applied in order to use push/pop rather than shift/unshift
    // when no keyed pool is used a proper order of items will:
    // 1. optimize the pagination of content (forward, backward)
    // 2. optimize toggling the count of items per page (list resizing)
    // 3. optimize folding of content (show more, show less)

    const reverse = SUPPORT_POOLS && this.pool && (!SUPPORT_KEYED || !this.key);
    const checkout = (SUPPORT_KEYED || SUPPORT_POOLS) && (this.key || this.pool);
    const callback = SUPPORT_CALLBACKS && this.on["remove"];

    // TODO
    // 1. checkout multiple keyed nodes
    // 2. when count > this.pool it should assign new Map() instead
    // 3. handle oversize checkouts (count > this.pool) to add items later

    // const resize = SUPPORT_KEYED && SUPPORT_POOLS && count > 1 && this.key && this.pool && this.pool !== true && ((this.pool_keyed.size + count) - this.pool);
    //
    // if(resize){
    //
    //     if(count >= this.pool){
    //
    //         this.pool_keyed = new Map();
    //     }
    //     else{
    //
    //         this.pool_keyed._keys = this.pool_keyed.keys();
    //     }
    // }

    for(let x = 0, node; x < count; x++){

        node = nodes[reverse ? count - x - 1 : x];
        length && node.remove(); //this.root.removeChild(node);
        checkout && this.checkout(node);
        callback && callback(node);
    }

    // if(resize){
    //
    //     this.pool_keyed._keys = null;
    // }

    this.length = length;

    //profiler_end("remove");

    return this;
};

/**
 * param {Element} node
 * @return {number}
 * @const
 */

Mikado.prototype.index = function(node){

    return this.dom.indexOf(node);
};

/**
 * param {number} index
 * @return {Element}
 * @const
 */

Mikado.prototype.node = function(index){

    return this.dom[index];
};

if(SUPPORT_KEYED || SUPPORT_POOLS){

    /**
     * param {Element} node
     * @private
     * @const
     */

    Mikado.prototype.checkout = function(node){

        let key;

        if(SUPPORT_KEYED && this.key){

            key = node[MIKADO_TPL_KEY];

            //if(key || key === 0){

                // remove from live-pool
                this.live[key] = null;
            //}
        }

        if(SUPPORT_POOLS && this.pool){

            if(key){

                // always adding to keyed shared-pool increases the probability of matching keys
                // but requires resizing of limited pools
                this.pool_keyed.set(key, node);

                if(this.pool !== true && (this.pool_keyed.size > this.pool)){

                    this.pool_keyed.delete(
                        (/*this.pool_keyed._keys ||*/ this.pool_keyed.keys()).next().value
                    );
                }
            }
            else{

                const length = this.pool_shared.length;

                if(this.pool === true || (length < this.pool)){

                    // add to non-keyed shared-pool
                    this.pool_shared[length] = node;
                }
            }
        }
    };
}

if(SUPPORT_POOLS){

    Mikado.prototype.flush = function(){

        this.pool_shared = [];

        if(SUPPORT_KEYED){

            this.pool_keyed = new Map();
        }

        return this;
    }
}

/**
 * @const
 */

Mikado.prototype.destroy = function(){

    for(let i = 0, inc; i < this.inc.length; i++){

        inc = this.inc[i];
        includes[inc.name] || inc.destroy();
    }

    if(SUPPORT_KEYED && this.key){

        this.root && (this.root[MIKADO_LIVE_POOL] = null);
        this.live = null;
    }

    if(this.root){

        this.root[MIKADO_DOM] =
        this.root[MIKADO_CLASS] = null;
    }

    /** @suppress {checkTypes} */(
    this.dom =
    this.root =
    this.tpl =
    this.apply =
    this.inc =
    this.state =
    this.factory = null);

    if(SUPPORT_POOLS){

        this.pool_shared = null;

        if(SUPPORT_KEYED){

            this.pool_keyed = null;
        }
    }

    if(SUPPORT_CALLBACKS){

        this.on = null;
    }

    if(SUPPORT_REACTIVE){

        this.proxy = null;
    }
};
