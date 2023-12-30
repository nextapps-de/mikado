/**!
 * Mikado.js
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */

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

export default function Mikado(template, options = /** @type MikadoOptions */{}) {

    if (!(this instanceof Mikado)) {

        return new Mikado(template, options);
    }

    if ("string" == typeof template) {

        const tpl = includes[template];

        if (!tpl) {

            throw new Error("The template '" + template + "' is not registered.");
        }


        if (tpl instanceof Mikado) {

            return tpl;
        }

        template = /** @type Template */tpl[0];
        options || (options = /** @type MikadoOptions */tpl[1]);
    }

    if (!template) {

        throw new Error("Initialization Error: Template is not defined.");
    }

    if (!template.tpl || !template.name) {

        throw new Error("Initialization Error: Template isn't supported.");
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

    /** @const {string} */
    this.key = template.key || "";
    /** @private @dict {Object<string, Element>} */
    this.live = {};

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

    /** @const {boolean|number} */
    this.pool = /** @type {boolean|number} */(this.key || this.recycle) && options.pool || 0;
    /** @private {Array<Element>} */
    this.pool_shared = [];

    /**
     * @dict {Object<string, Element>}
     * @private
     */
    this.pool_keyed = {};
    /** @private {number} */
    this.pool_keyed_length = 0;


    /** @const {boolean} */
    this.cache = template.cache || !!options.cache;


    /** @type {boolean} */
    this.async = !!options.async;
    /** @private {number} */
    this.timer = 0;


    /** @private {Object} */
    this.on = options.on || {};
    {

        /**
         * @type {Object<string, Array<string, number>>}
         */
        this.proxy = null;
        /** @type {number} */
        this.fullproxy = 0;
        /** @type {Observer|undefined} */
        let store = options.observe;

        if (store) {

            new Observer(store).mount(this);
        }
    }

    if (this.root) {

        this.mount(this.root, options.hydrate);
    } else {

        /** @private */
        this.factory = null;
    }
}

/**
 * This function is also automatically called when loading es5 templates.
 * @param {string|Template} tpl
 * @param {MikadoOptions=} options
 */

export function register(tpl, options) {

    let name, re_assign;

    if ("string" == typeof tpl) {

        name = re_assign = tpl;
        tpl = /** @type {string|Template} */includes[name];
        tpl instanceof Mikado || (tpl = tpl[0]);

        if (!tpl) {

            throw new Error("The template '" + name + "' was not found.");
        }
    } else {

        name = tpl.name;
    }

    if (includes[name]) {

        if (re_assign) {

            console.info("The template '" + name + "' was replaced by a new definition.");
        } else {

            console.warn("The template '" + name + "' was already registered and is getting overwritten. When this isn't your intention, then please check your template names about uniqueness and collision!");
        }
    }

    // Just collect template definitions. The instantiation starts when .mount() is
    // internally called for the first time.

    includes[name] = [
    /** @type {Template} */tpl,
    /** @type {MikadoOptions} */options];

    return Mikado;
}

/**
 * @param {string|Template} name
 */

export function unregister(name) {

    if ("object" == typeof name) {

        name = /** @type {string} */name.name;
    }

    const mikado = includes[name];

    if (mikado) {

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

Mikado.prototype.mount = function (target, hydrate) {

    if (this.timer) {

        this.cancel();
    }
    const target_instance = target._mki,
          root_changed = this.root !== target;


    if (target_instance === this) {

        // same template, same root

        if (!root_changed) return this;

        // same template, different root

        this.dom = target._mkd;
        this.length = this.dom.length;
    } else if (target_instance) {

        // different template, same root

        target_instance.clear();
        target._mkd = this.dom = [];
        this.length = 0;
    } else {

        // initial mount

        if (hydrate) {

            this.dom = collection_to_array(target.children);
            //this.dom = collection_to_array(target.childNodes);
            this.length = this.dom.length;
        } else {

            this.dom = [];
            this.length = 0;

            if (target.firstChild) {

                target.textContent = "";
            }
        }

        target._mkd = this.dom;
    }

    if (this.key) {

        // handle live pool

        if (root_changed && this.root) {

            this.root._mkl = this.live;
        }

        if (target_instance === this) {

            this.live = target._mkl;
        } else {

            const live = {};

            if (!target_instance && hydrate && this.length) {

                for (let i = 0, node, key; i < this.length; i++) {

                    node = this.dom[i];
                    key = node.getAttribute("key");
                    node._mkk = key;
                    live[key] = node;
                }
            }

            target._mkl = this.live = live;
        }
    }

    target._mki = this;
    this.root = target;

    if (!this.factory) {

        if (hydrate && this.length) {

            /** @private */
            this.factory = this.dom[0].cloneNode();
            construct( /** @type {TemplateDOM} */this.tpl, [], "", this.factory, this);
            this.tpl = null;
        } else {

            /** @private */
            this.factory = construct( /** @type {TemplateDOM} */this.tpl, [], "", null, this);
            this.tpl = null;
        }
    }

    return this;
};

/**
 * @param {NodeList} collection
 * @return {Array<Element>}
 */

function collection_to_array(collection) {
    const length = collection.length,
          array = Array(length);


    for (let i = 0; i < length; i++) {

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

Mikado.once = function (root, template, data, state, callback) {

    const mikado = new Mikado(template);

    if ("function" == typeof state) {

        callback = state;
        state = null;
    }

    if (callback) {

        const fn = callback;

        callback = function () {

            mikado.destroy();
            fn();
        };
    }

    if (!root) {

        throw new Error("Root element is not defined.");
    }


    root.append(mikado.create(data, state));

    if (!callback) {

        mikado.destroy();
    }

    return Mikado;
};

/**
 * @param {!*} data
 * @param {*=} state
 * @param {Function|boolean=} callback
 * @param {boolean|number=} _skip_async
 * @returns {Mikado|Promise}
 * @const
 */

Mikado.prototype.render = function (data, state, callback, _skip_async) {

    if (!this.root) {

        throw new Error("Template was not mounted or root was not found.");
    } else if (this.root._mki !== this) {

        throw new Error("Another template is already assigned to this root. Please use '.mount(root_element)' before calling '.render()' to switch the context of a template.");
    }


    if (!_skip_async) {

        if ("function" == typeof state) {

            callback = /** @type {Function|boolean} */state;
            state = null;
        }

        if (this.timer) {

            this.cancel();
        }

        if (this.async || callback) {

            const self = this;

            self.timer = requestAnimationFrame(function () {

                self.timer = 0;
                self.render(data, state, null, 1);

                if ("function" == typeof callback) {

                    callback();
                }
            });

            if (callback) {

                return this;
            } else {

                return new Promise(function (resolve) {

                    callback = resolve;
                });
            }
        }
    }

    //profiler_start("render");

    let length = this.length;

    if (!data) {

        if (!this.apply) {

            this.dom[0] || this.add();
        }

        console.warn("When calling .render() by passing no data nothing will happen!");


        return this;
    }

    let count;

    if (Array.isArray(data) || data instanceof Observer) {

        count = data.length;

        if (!count) {

            return this.remove(0, length);
        }
    } else {

        if (this.proxy) {

            throw new Error("When a template is using data bindings by an expression like {{= ... }} you will need to pass an array to the render() function, also when just one single item should be rendered. Because the array you will pass in is getting proxified after calling .render(arr), after then you can trigger bindings via arr[0].prop = 'value'.");
        }

        data = [data];
        count = 1;
    }

    const key = this.key;

    if (length && !key && !this.recycle) {

        this.remove(0, length);
        length = 0;
    }

    let min = length < count ? length : count,
        x = 0;


    // update
    if (x < min) {

        for (let node, item; x < min; x++) {

            node = this.dom[x];
            item = data[x];

            if (key && node._mkk !== item[key]) {

                return this.reconcile( /** @type {Array} */data, state, x, 1);
            } else {

                this.update(node, item, state, x, 1);
            }

            if (this.proxy && !item._mkx) {

                data[x] = apply_proxy.call(this, node, item);
            }
        }
    }

    // add
    if (x < count) {

        for (; x < count; x++) {

            const item = data[x];
            this.add(item, state, x);

            if (this.proxy && !item._mkx) {

                data[x] = apply_proxy.call(this, this.dom[x], item);
            }
        }
    }

    // remove
    else if (count < length) {

            this.remove(count, length - count);
        }
    //}

    //profiler_end("render");

    return this;
};

/**
 * param {!Element|number} node
 * param {*=} data
 * param {*=} state
 * param {number=} index
 * @const
 */

Mikado.prototype.replace = function (node, data, state, index) {

    //profiler_start("replace");

    if ("undefined" == typeof index) {

        if ("number" == typeof node) {

            index = node;
            node = this.dom[index];
        } else {

            index = this.index(node);
        }
    }

    let tmp, update;

    // handle key matches in live pool (having two instances of the same component with the same key on the same view model isn't allowed)
    // TODO: provide transaction feature to optimize reconciling when proxy index access modifies in a batch

    if (this.key) {

        const key = data[this.key];

        if (tmp = this.live[key]) {

            if (tmp !== node) {

                const index_old = this.index(tmp);

                this.dom[index] = tmp;
                this.dom[index_old] = node;

                const node_a = index_old < index ? tmp : node,
                      node_b = index_old < index ? node : tmp,
                      prev = node_a.nextElementSibling;


                this.root.insertBefore(node_a, node_b);

                if (prev !== node_b) {

                    this.root.insertBefore(node_b, prev);
                }
            }
        } else if (this.pool && (tmp = this.pool_keyed[key])) {

            this.pool_keyed[key] = null;
            this.pool_keyed_length--;
            this.checkout(node);
            this.dom[index] = tmp;
            node.replaceWith(tmp);
        }

        update = tmp;
    } else if (this.recycle) {

        update = node;
    }

    if (update) {

        this.fullproxy && data._mkx || !this.apply || this.apply(data, state || this.state, index, update._mkp || create_path(update, this.factory._mkp, this.cache));
    } else {

        const clone = this.create(data, state, index, 1);

        if (this.key || this.pool) {

            this.checkout(node);
        }

        this.dom[index] = clone;
        node.replaceWith(clone);
    }

    const callback = this.on.replace;
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

Mikado.prototype.update = function (node, data, state, index) {

    //profiler_start("update");

    if (!this.apply) {

        console.warn("The template '" + this.name + "' is a static template and should not be updated. Alternatively you can use .replace() to switch contents.");


        return this;
    }

    if (this.fullproxy && data._mkx) {

        return this;
    }

    if ("undefined" == typeof index) {

        if ("number" == typeof node) {

            index = node;
            node = this.dom[node];
        } else {

            index = this.index(node);
        }
    }

    node = /** @type {Element} */node;

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

    this.apply(data, state || this.state, index, node._mkp || create_path(node, this.factory._mkp, this.cache));

    //profiler_end("update");

    const callback = this.on.update;
    callback && callback(node);

    return this;
};

/** @const */
Mikado.prototype.cancel = function () {

    //if(this.timer){

    cancelAnimationFrame(this.timer);
    this.timer = 0;
    //}

    return this;
};

/**
 * @param {*=} data
 * @param {*=} state
 * @param {number=} index
 * @param {boolean|number=} _update_pool
 * @return {!Element}
 * @const
 */

Mikado.prototype.create = function (data, state, index, _update_pool) {

    //profiler_start("create");

    let keyed = this.key;
    const key = keyed && data[keyed];
    let node, pool, factory, found;

    // 1. keyed pool (shared)
    if (keyed && this.pool && (pool = this.pool_keyed) && (node = pool[key])) {

        found = 1;

        pool[key] = null;
        this.pool_keyed_length--;
    }
    // 2. non-keyed pool (shared)
    else if ((!keyed || this.recycle) && this.pool && (pool = this.pool_shared) && pool.length) {

            node = pool.pop();
        } else {

            node = factory = this.factory;

            if (!factory) {

                /** @private */
                this.factory = node = factory = construct( /** @type {TemplateDOM} */this.tpl, [], "", null, this);
                this.tpl = null;
            }
        }

    //if(!SUPPORT_STORAGE || !SUPPORT_REACTIVE || !found || !this.stealth || this.observe){

    this.apply && this.apply(data, state || this.state, index, node._mkp || create_path(node, this.factory._mkp, !!factory || this.cache));
    // }

    if (factory) {

        node = node.cloneNode(!0);
    }

    if (keyed) {

        if (!found) node._mkk = key;
        if (_update_pool) this.live[key] = node;
    }

    const callback = this.on[factory ? "create" : "recycle"];
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

Mikado.prototype.add = function (data, state, index) {

    //profiler_start("add");

    let has_index;

    if ("number" == typeof state) {

        index = state;
        state = null;
        has_index = index < this.length;
    } else if (index || 0 === index) {

        has_index = index < this.length;
    } else {

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

    if (has_index) {

        this.root.insertBefore(node, this.dom[index]);
        splice(this.dom, this.length - 1, index, node);
        //this.dom.splice(length, 0, node);
        this.length++;
    } else {

        this.root.appendChild(node);
        this.dom[this.length++] = node;
    }

    const callback = this.on.insert;
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

export function apply_proxy(node, data) {

    return proxy_create(data, node._mkp || create_path(node, this.factory._mkp, this.cache), this.proxy);
}

/**
 * Reconcile based on "longest distance" strategy by Thomas Wilkerling
 * @param {Array=} b
 * @param {*=} state
 * @param {number=} x
 * @param {boolean|number=} render
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.reconcile = function (b, state, x, render) {

    // const store = SUPPORT_STORAGE && !this.extern && this.store;
    //
    // if(store){
    //
    //     b || (b = store);
    //
    //     // skips updating internal store
    //     this.store = 0;
    // }

    const a = this.dom,
          live = this.live,
          key = this.key;
    let end_b = b.length,
        end_a = a.length,
        max_end = end_a > end_b ? end_a : end_b,
        shift = 0;

    //let steps = 0;

    for (x || (x = 0); x < max_end; x++) {

        let found;

        if (x < end_b) {
            const b_x = b[x],
                  ended = x >= end_a;
            let a_x, b_x_key, a_x_key;


            if (!ended) {

                a_x = a[x];
                b_x_key = b_x[key];
                a_x_key = a_x._mkk;

                if (this.proxy && !b_x._mkx) {

                    b[x] = apply_proxy.call(this, a_x, b_x);
                }

                if (a_x_key === b_x_key) {

                    if (render) {

                        this.update(a_x, b_x, state, x, 1);
                    }

                    continue;
                }
            }

            if (ended || !live[b_x_key]) {

                if (render) {

                    // TODO check: !this.pool
                    if (ended || !this.pool) {

                        end_a++;
                        max_end = end_a > end_b ? end_a : end_b;

                        this.add(b_x, state, x);
                    } else {

                        this.replace(a_x, b_x, state, x);
                    }
                }

                if (this.proxy && !b_x._mkx) {

                    b[x] = apply_proxy.call(this, a[x], b_x);
                }

                continue;
            }

            let idx_a, idx_b;

            for (let y = x + 1; y < max_end; y++) {

                // determine longest distance
                if (!idx_a && y < end_a && a[y]._mkk === b_x_key) idx_a = y + 1;
                if (!idx_b && y < end_b && b[y][key] === a_x_key) idx_b = y + 1;

                if (idx_a && idx_b) {

                    // shift up (move target => current)
                    if (idx_a >= idx_b) {

                        const tmp_a = a[idx_a - 1];

                        // when distance is 1 it will always move before, no predecessor check necessary
                        this.root.insertBefore( /** @type {Node} */tmp_a, /** @type {Node} */a_x);

                        if (render) {

                            this.update(tmp_a, b_x, state, x, 1);
                        }

                        // fast path optimization when distance is equal (skips finding on next turn)
                        if (idx_a === idx_b) {

                            if (1 < y - x) {

                                this.root.insertBefore( /** @type {Node} */a_x, /** @type {Node} */a[idx_a]);
                            }

                            a[x] = a[y];
                            a[y] = /** @type {!Element} */a_x;

                            if (!a_x) {

                                console.error("Error");
                            }

                            // if(render){
                            //
                            //     this.update(a_x, b[y], state, y);
                            // }

                            //steps++;
                        } else {

                            splice(a, idx_a - 1, x);
                            //a.splice(x, 0, a.splice(idx_a - 1, 1)[0]);

                            shift++;
                        }

                        //steps++;
                    }
                    // shift down (move current => target)
                    else {

                            const index = idx_b - 1 + shift;

                            // distance is always greater than 1, no predecessor check necessary
                            this.root.insertBefore( /** @type {Node} */a_x, /** @type {Node} */a[index] || null);
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

        if (!found) {

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

/**
 * @param {Array} arr
 * @param {number} pos_old
 * @param {number} pos_new
 * @param {*=} insert
 * @const
 */

function splice(arr, pos_old, pos_new, insert) {

    const tmp = insert || arr[pos_old];

    if (insert) {

        pos_old++;
    }

    if (pos_old < pos_new) {

        for (; pos_old < pos_new; pos_old++) {

            arr[pos_old] = arr[pos_old + 1];
        }
    } else /*if(pos_old > pos_new)*/{

            for (; pos_old > pos_new; pos_old--) {

                arr[pos_old] = arr[pos_old - 1];
            }
        }

    arr[pos_new] = tmp;
}

/**
 * @param {*=} data
 * @param {*=} state
 * @param {number=} index
 * @const
 */

Mikado.prototype.append = function (data, state, index) {

    //profiler_start("append");

    let has_index;

    if ("number" == typeof state) {

        index = state;
        state = null;
        has_index = 1;
    } else if (index || 0 === index) {

        has_index = 1;
    }

    const count = data.length;

    for (let x = 0; x < count; x++) {

        this.add(data[x], state, has_index ? index++ : null);
    }

    //profiler_end("append");

    return this;
};

/**
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.clear = function () {

    if (this.length) {

        this.remove(0, this.length);
    }

    return this;
};

/**
 * @param {!Element|number} index
 * @param {number=} count
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.remove = function (index, count) {

    //profiler_start("remove");

    let length = this.length;

    if (length && index) {

        if ("number" != typeof index) {

            index = this.index(index);
        } else if (0 > index) {

            index = length + index - 1;
        }
    }

    if (!length || index >= length) {

        //profiler_end("remove");

        return this;
    }

    if (count) {

        if (0 > count) {

            index -= count + 1;

            if (0 > index) {

                index = 0;
            }

            count *= -1;
        }
    } else {

        count = 1;
    }

    let nodes;

    if (!index && count >= length) {

        nodes = this.dom;
        count = nodes.length;
        this.root.textContent = "";
        this.root._mkd = this.dom = [];
        length = 0;
    } else {

        nodes = this.dom.splice( /** @type {number} */index, count);
        length -= count;
    }

    // reverse is applied in order to use push/pop rather than shift/unshift
    // when no keyed pool is used a proper order of items will:
    // 1. optimize the pagination of content (forward, backward)
    // 2. optimize toggling the count of items per page (list resizing)
    // 3. optimize folding of content (show more, show less)

    const reverse = this.pool && !this.key,
          checkout = this.key || this.pool,
          callback = this.on.remove;


    for (let x = 0, node; x < count; x++) {

        node = nodes[reverse ? count - x - 1 : x];
        length && node.remove(); //this.root.removeChild(node);
        checkout && this.checkout(node);
        callback && callback(node);
    }

    this.length = length;

    //profiler_end("remove");

    return this;
};

/**
 * param {Element} node
 * @return {number}
 * @const
 */

Mikado.prototype.index = function (node) {

    return this.dom.indexOf(node);
};

/**
 * param {number} index
 * @return {Element}
 * @const
 */

Mikado.prototype.node = function (index) {

    return this.dom[index];
};

/**
 * param {Element} node
 * @private
 * @const
 */

Mikado.prototype.checkout = function (node) {

    let key;

    if (this.key) {

        key = node._mkk;

        //if(key || key === 0){

        // remove from live-pool
        this.live[key] = null;
        //}
    }

    if (this.pool) {

        if (this.key) {

            if (!0 === this.pool || this.pool_keyed_length < this.pool) {

                // update reference to queued shared-pool
                //node[MIKADO_TPL_INDEX] = length;

                // add to keyed shared-pool
                this.pool_keyed[key] = node;
                this.pool_keyed_length++;
            }
        } else {

            const length = this.pool_shared.length;

            if (!0 === this.pool || length < this.pool) {

                // add to non-keyed shared-pool
                this.pool_shared[length] = node;
            }
        }
    }
};


Mikado.prototype.flush = function () {

    this.pool_shared = [];

    this.pool_keyed = {};
};

/**
 * @const
 */

Mikado.prototype.destroy = function () {

    for (let i = 0, inc; i < this.inc.length; i++) {

        inc = this.inc[i];
        includes[inc.name] || inc.destroy();
    }

    if (this.key) {

        this.root && (this.root._mkl = null);
        this.live = null;
    }

    if (this.root) {

        this.root._mkd = this.root._mki = null;
    }

    /** @suppress {checkTypes} */this.dom = this.root = this.tpl = this.apply = this.inc = this.state = this.factory = null;

    this.pool_shared = null;

    this.pool_keyed = null;


    this.on = null;


    this.proxy = null;
};