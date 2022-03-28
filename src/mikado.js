/**!
 * Mikado.js
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */

/* TODO
    - shared routes: Mikado.route() / private route: view.router()
    - support dispatch parameters
    - support dataset cache
*/

/*
    Modes Keyed:

    1. keyed, non-reusing + live pool (explicit)
        key + !reuse

    2. keyed, non-reusing + exclusive pool (explicit)
        (key + pool-key) + !reuse

    3. keyed, reusing + live pool (hybrid)
        key + reuse

    4. keyed, reusing + exclusive pool (hybrid)
        (key + pool-key) + reuse

    5. keyed, reusing + cross pool (hybrid)
        key + (reuse + pool)

    ------------------------------------

    Modes Non-Keyed:

    1. non-keyed, non-reusing (strict)
        !key + !reuse

    2. non-keyed, reusing (recycle)
        !key + reuse

    3. non-keyed, reusing + cross pool (recycle)
        !key + (reuse + pool)
*/

import "./event.js";
import "./helper.js";
import "./cache.js";
import "./store.js";
import "./polyfill.js";
import Observer from "./array.js";
import create_proxy from "./proxy.js";

//import { profiler_start, profiler_end } from "./profiler.js";

const { requestAnimationFrame, cancelAnimationFrame } = window;

/**
 * @dict
 */

let state = {};

/**
 * @type {Object<string, Template>}
 */

const templates = {};

/**
 * @type {Object<string, *>}
 */

let factory_pool = {};

/**
 * @type {Object<string, Array<Element>>}
 */

const template_pool = {};

/**
 * @type {Object<string, Object<string, Element>>}
 */

const keyed_pool = {};

/**
 * @param {!Element|Template} root
 * @param {Template|Object=} template
 * @param {Object=} options
 * @constructor
 */

export default function Mikado(root, template, options){

    if(!(this instanceof Mikado)) {

        return new Mikado(root, template, options);
    }

    if(!root.nodeType){

        options = template;
        template = root;
        root = null;
    }

    if(root){

        this.mount(root);
    }
    else{

        this.dom = null;
        this.root = null;
        this.length = 0;
    }

    this.init(/** @type {Template} */ (template), options);
}

/**
 * @param {string|Template} name
 * @param {Template=} tpl
 */

Mikado.register = Mikado["register"] = function(name, tpl){

    if(!tpl){

        tpl = /** @type {Template} */ (name);
        name = tpl["n"];
    }

    templates[name] = tpl;

    return Mikado;
};

/**
 * @returns {Mikado}
 */

Mikado.prototype.mount = function(target){

    if(this.root !== target){

        if(SUPPORT_KEYED && this.key && this.root){

            this.root["_pool"] = this.live;
            this.live = target["_pool"] || {};
        }

        this.root = target;
        this.check();
        this.dom = target["_dom"] || (target["_dom"] = collection_to_array(target.children));
        this.length = this.dom.length;
    }

    return this;
};

if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("sync") !== -1)){

    Mikado.prototype.sync = function(clear_cache){

        this.root["_dom"] = this.dom = collection_to_array(this.root.children);
        this.length = this.dom.length;

        if(SUPPORT_CACHE && clear_cache && this.cache){

            for(let i = 0; i < this.length; i++){

                if(SUPPORT_CACHE_HELPERS){

                    const path = this.dom[i]["_path"];

                    if(path) {

                        for(let x = 0, tmp; x < path.length; x++){

                            tmp = path[x];
                            tmp["_class"] = tmp["_html"] = tmp["_text"] = tmp["_css"] = tmp["_attr"] = null;
                        }
                    }
                }
                else{

                    this.dom[i]["_cache"] = {};
                }
            }
        }

        return this;
    };
}

if(SUPPORT_POOLS && ((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("purge") !== -1))){

    Mikado.prototype.purge = function(){

        factory_pool[this.template + (SUPPORT_CACHE && this.cache ? "_cache" : "")] = null;

        if(SUPPORT_KEYED && this.key){

            // NOTE: fully purge the live pool when in use will lead into duped keys

            if(this.length){

                const keys = Object.keys(this.live);

                for(let i = 0, length = keys.length, key; i < length; i++){

                    this.key[(key = keys[i])] || delete this.key[key];
                }
            }
            else{

                this.live = {};
            }
        }

        // TODO: this will de-reference other instances with the same template
        this.tpl_pool && (this.tpl_pool = template_pool[this.template] = []);
        SUPPORT_KEYED && this.key_pool && (this.key_pool = keyed_pool[this.template] = {});

        return this;
    };
}

Mikado.prototype.index = function(node){

    // for(let i = 0, length = this.length; i < length; i++){
    //
    //     if(this.dom[i] === node) return i;
    // }
    //
    // return -1;

    return this.dom.indexOf(node);
};

Mikado.prototype.node = function(index){

    return this.dom[index];
};

if(SUPPORT_STORAGE){

    Mikado.prototype.data = function(index){

        const get_by_node = (typeof index === "object");

        return (

            // NOTE: get store first (could be set during import process)

            this.store ?

                this.store[get_by_node ? this.index(index) : index]
            :
                (get_by_node ? index : this.dom[index])["_data"]
        );
    };

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("find") !== -1)){

        Mikado.prototype.find = function(data){

            if(SUPPORT_KEYED && this.key){

                const key = typeof data !== "object" ? data : data[this.key];

                return this.live[key];
            }

            // TODO: find by indexOf when storage is available

            for(let i = 0; i < this.length; i++){

                if(this.data(i) === data){

                    return this.dom[i];
                }
            }
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("search") !== -1)){

        Mikado.prototype.search = function(data){

            const values = Object.values(data).join("^");

            for(let i = 0; i < this.length; i++){

                if(Object.values(this.data(i)).join("^") === values){

                    return this.dom[i];
                }
            }
        };
    }

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("where") !== -1)){

        Mikado.prototype.where = function(payload){

            const keys = Object.keys(payload);
            const length = keys.length;
            const results = [];

            for(let x = 0, data, found; x < this.length; x++){

                data = this.data(x);
                found = 1;

                for(let y = 0, key; y < length; y++){

                    key = keys[y];

                    if(data[key] !== payload[key]){

                        found = 0;
                        break;
                    }
                }

                if(found){

                    results[results.length] = this.dom[x];
                }
            }

            return results;
        };
    }
}

/**
 * @param {Template|string} template
 * @param {Object=} options
 * @returns {Mikado}
 */

Mikado.prototype.init = function(template, options){

    if(DEBUG){

        if(!template){

            console.error("Initialization Error: Template is not defined.");
        }
    }

    if(typeof template === "string"){

        template = templates[template];
    }
    else{

        if(!options){

            if(template && !template["n"]){

                options = template;
                template = null;
            }
        }

        if(!template){

            template = templates[this.template];
        }
        else if(template["n"]){

            Mikado.register(template);
        }
    }

    options || (options = this.config || {});
    this.reuse = options["reuse"] !== false;
    this.state = options["state"] || state;

    if(SUPPORT_CACHE){

        this.cache = options["cache"] !== false;
    }

    if(SUPPORT_ASYNC){

        this.async = options["async"];
        this.timer = 0;
    }

    if(SUPPORT_CALLBACKS){

        this.on = options["on"];
    }

    if(SUPPORT_STORAGE){

        let store = options["store"] || (options["store"] !== false);

        if((this.extern = (typeof store === "object"))){

            options["store"] = true;
        }
        else if(store){

            store = [];
        }

        if(SUPPORT_REACTIVE){

            if((this.observe = store instanceof Observer)){

                store.mikado = this;
            }

            this.skip = 0;
        }

        // TODO: also enable by default on stealth mode
        this.loose = !this.extern && (options["loose"] !== false);
        this.store = !this.loose && store;
    }

    this.config = options;

    const tpl_name = template["n"];

    if(this.template !== tpl_name){

        this.template = tpl_name;
        this.static = template["d"];
        this.vpath = null;
        this.update_path = null;
        if(SUPPORT_REACTIVE && SUPPORT_STORAGE) this.stealth = 0;
        if(SUPPORT_REACTIVE && SUPPORT_STORAGE) this.proxy = 0;
        if(SUPPORT_TEMPLATE_EXTENSION) this["include"] = null;
        this.factory = (options["prefetch"] !== false) && this.parse(template);

        this.check();

        if(SUPPORT_KEYED){

            this.key = template["k"];
            this.live = this.key && {};
        }

        if(SUPPORT_POOLS){

            const pool = options["pool"];

            this.tpl_pool = this.reuse && (pool !== false) && (pool !== "key") && (template_pool[tpl_name] || (
                template_pool[tpl_name] = []
            ));

            if(SUPPORT_KEYED) this.key_pool = this.key && (pool !== false) && (pool !== "queue") && (keyed_pool[tpl_name] || (
                keyed_pool[tpl_name] = {}
            ));

            this.size = this.tpl_pool && options["size"];
        }
    }

    return this;
};

/**
 * @param {Element} root
 * @param {Template|Object} template
 * @param {Array<Object>|Object=} data
 * @param {Object|Function=} view
 * @param {Function=} callback
 */

Mikado.once = Mikado["once"] = function(root, template, data, view, callback){

    const tmp = new Mikado(root, template);

    if(typeof view === "function"){

        callback = view;
        view = null;
    }

    if(callback){

        const fn = callback;

        callback = function(){

            tmp.destroy(1);
            fn();
        }
    }

    tmp.render(data, view, callback);

    if(!callback){

        tmp.destroy(1);
    }

    return Mikado;
};

Mikado.prototype.check = function(){

    if(this.root){

        const id = this.root["_tpl"];

        if(id !== this.template){

            this.root["_tpl"] = this.template;

            if(id){

                if(SUPPORT_KEYED) this.live = {};
                this.remove(0, this.length);
            }
        }
    }

    return this;
};

function collection_to_array(collection){

    let length = collection.length;
    const array = new Array(length);

    for(let i = 0, node; i < length; i++) {

        node = collection[i];
        array[i] = node;
    }

    return array;
}

Mikado.prototype.create = function(data, view, index){

    //profiler_start("create");

    let keyed = SUPPORT_KEYED && this.key;
    const key = keyed && data[keyed];
    let node, pool, factory, cache, found;

    // 1. keyed pools (live + shared)
    if(SUPPORT_POOLS && keyed && (
        // NOTE: this optimization cannot render more than one data item which has
        //       the same key within same template on the same view instance
        // TODO: removing from the live pool may break indices, also breaks shift within reconcile
        //(node = this.live[key]) ||
        ((pool = this.key_pool) && (node = pool[key]))
    )){

        found = 1;

        if(pool){

            // remove from keyed shared-pool
            pool[key] = null;

            // replace current with last (fast swap removal, skips refresh index)
            if((pool = this.tpl_pool)){

                const pos = node["_index"];

                // remove reference to queued shared-pool
                node["_index"] = null;

                // remove from queued shared-pool
                const last = pool.pop();

                if(last !== node){

                    // update reference to queued shared-pool
                    last["_index"] = pos;
                    pool[pos] = last;
                }
            }
        }
        else{

            // skip referencing
            keyed = 0;
        }
    }
    // 2. queued pool (shared)
    else if(SUPPORT_POOLS && (node = this.tpl_pool) && node.length){

        // remove from queued shared-pool
        node = node.pop();

        if(pool){

            // remove reference to queued shared-pool
            node["_index"] = null;

            // remove from keyed shared-pool
            pool[node["_key"]] = null;
        }
    }
    else{

        node = factory = this.factory || (this.factory = this.parse(templates[this.template]));

        // if(SUPPORT_CACHE && !SUPPORT_CACHE_HELPERS && this.cache){
        //
        //     node["_cache"] = cache = {};
        // }
    }

    if(!SUPPORT_STORAGE || !SUPPORT_REACTIVE || !found || !this.stealth || this.observe){

        this.apply(node, data, view, index);
    }

    if(factory){

        node = node.cloneNode(true);

        /*
        if(SUPPORT_CACHE && !SUPPORT_CACHE_HELPERS && this.cache){

            node["_cache"] = {};
            // NOTE: how often a cache from factory could be re-used VS. overhead from Object.assign
            //node["_cache"] = Object.assign({}, this.factory["_cache"]);
        }
        */

        let tmp;

        if(SUPPORT_CALLBACKS && (tmp = this.on) && (tmp = tmp["create"])){

            tmp(node);
        }
    }

    // TODO orphans should not be a part of the live pool
    if(keyed){

        // add reference to keyed pools
        node["_key"] = key;

        // add to keyed live-pool (non-shared)
        this.live[key] = node;
    }

    //profiler_end("create");

    return node;
};

Mikado.prototype.apply = function(root, data, payload, index){

    //this.factory || (this.factory = root = this.parse(templates[this.template]));

    if(this.static){

        if(DEBUG){

            console.warn("The template '" + this.template + "' is a static template and should not be refreshed.");
        }
    }
    else{

        if(SUPPORT_STORAGE){

            data || (data = this.store ? this.store[index] : root["_data"]);

            // if(SUPPORT_REACTIVE && payload && this.observe){
            //
            //     this.store.view = payload;
            // }
        }

        //root || (root = this.factory);

        // TODO: find out why root["_cache"] does not exist sometimes when looping partials
        this.update_path(root["_path"] || this.create_path(root), SUPPORT_CACHE && !SUPPORT_CACHE_HELPERS && (root["_cache"] || (root["_cache"] = {})), data, index, payload);

        let tmp;

        if(SUPPORT_CALLBACKS && (tmp = this.on) && (tmp = tmp["change"])){

            if(root !== this.factory){

                tmp(root);
            }
        }

        return this;
    }
};

if(SUPPORT_STORAGE){

    /**
     * @param {number|Element=} index
     * @param {Object=} view
     */

    Mikado.prototype.refresh = function(index, view){

        if(DEBUG){

            if(this.static){

                console.warn("The template '" + this.template + "' is a static template and should not be refreshed.");
            }
        }

        if(SUPPORT_REACTIVE && this.stealth){

            return this;
        }

        let tmp, node;

        if(typeof index === "number"){

            node = this.dom[index];
        }
        // else if(index && (typeof (tmp = index["_idx"]) === "number")){
        //
        //     node = index;
        //     index = tmp;
        // }
        else{

            view = index;
        }

        if(node){

            return this.apply(node, null, view, index);
        }

        let length = this.length;
        const data = this.store;

        // data delegated from import
        if(data && this.loose){

            this.store = null;
            return this.render(data, view);
        }

        const count = data ? data.length : length;
        const min = length < count ? length : count;

        // if(count < length){
        //
        //     this.remove(count, length - count);
        // }

        for(let x = 0; x < min; x++){

            this.apply(this.dom[x], null, view, x);
        }

        // if(x < count){
        //
        //     for(; x < count; x++){
        //
        //         this.add(data[x], view);
        //     }
        // }

        return this;
    };
}

/**
 * @param {Array<*>|Object|Function=} data
 * @param {Object|Function=} view
 * @param {Function|boolean=} callback
 * @param {boolean|number=} skip_async
 * @returns {Mikado|Promise}
 */

Mikado.prototype.render = function(data, view, callback, skip_async){

    if(DEBUG){

        if(!this.root){

            console.error("Template was not mounted or root was not found.");
        }
        else if(this.template !== this.root["_tpl"]){

            console.warn("Another template is already assigned to this root. Please use '.mount()' or '.check()' before calling '.render()' to switch the context of a template.");
        }
    }

    if(SUPPORT_ASYNC && !skip_async){

        if(view && (typeof view !== "object")){

            callback = /** @type {Function|boolean} */ (view);
            view = null;
        }

        if(this.timer){

            this.cancel();
        }

        if(callback){

            const self = this;

            this.timer = requestAnimationFrame(function(){

                self.timer = 0;
                self.render(data, view, null, 1);

                if(typeof callback === "function"){

                    callback();
                }
            });

            return this;
        }

        if(this.async){

            const self = this;

            return new Promise(function(resolve){

                self.timer = requestAnimationFrame(function(){

                    self.timer = 0;
                    self.render(data, view, null, 1);
                    resolve();
                });
            });
        }
    }

    //profiler_start("render");

    // if(this.static){
    //
    //     this.dom[0] || this.add();
    // }
    // else{

        let length = this.length;

        if(!data){

            if(this.static){

                this.dom[0] || this.add();
                return this;
            }

            if(SUPPORT_STORAGE){

                // if(length){
                //
                //     return this.refresh();
                // }

                if(!(data = this.store)){

                    return this;
                }
            }
        }

        // TODO: use array type check
        let count = data.length;

        if(typeof count === "undefined"){

            data = [data];
            count = 1;
        }
        else if(!count){

            return this.remove(0, length);
        }

        const replace_key = SUPPORT_KEYED && ((SUPPORT_POOLS && this.key_pool) || !this.reuse) && this.key;

        if(!replace_key && !this.reuse){

            this.remove(0, length, count);
            length = 0;
        }

        let min = length < count ? length : count;
        let x = 0;

        // update
        if(x < min){

            for(; x < min; x++){

                const node = this.dom[x];
                const item = data[x];
                //let key, tmp;

                if(replace_key && (node["_key"] !== (/*key =*/ item[replace_key]))){

                    return this.reconcile(data, view, x, 1);

                    // if((tmp = this.live[key])){
                    //     this.arrange(node, tmp, item, view, x);
                    // }
                    // else{
                    //     this.replace(node, item, view, x);
                    // }
                }
                else{

                    this.update(node, item, view, x);
                }
            }
        }

        // add
        if(x < count){

            for(; x < count; x++){

                this.add(data[x], view);
            }
        }

        // reduce
        else if(count < length){

            this.remove(count, length - count);
        }
    //}

    //profiler_end("render");

    return this;
};

/*
 * This is a naive "fast-swap" workaround.
 * It moves nodes from the keyed live pool into place.
 */

// if(SUPPORT_POOLS){
//
//     /**
//      * @param old_node
//      * @param new_node
//      * @param item
//      * @param view
//      * @param x
//      * @param {number=} idx
//      */
//
//     Mikado.prototype.arrange = function(old_node, new_node, item, view, x, idx){
//
//         idx || (idx = new_node["_idx"]);
//
//         const no_predecessor = (idx + 1) !== x;
//
//         this.root.insertBefore(no_predecessor ? new_node : old_node, no_predecessor ? old_node : new_node);
//         if(no_predecessor && ((x + 1) !== idx)) this.root.insertBefore(old_node, this.dom[idx + 1] || null);
//
//         new_node["_idx"] = x;
//         old_node["_idx"] = idx;
//
//         this.dom[x] = new_node;
//         this.dom[idx] = old_node;
//
//         if(item && !(SUPPORT_STORAGE && SUPPORT_REACTIVE && this.stealth && ((this.store ? this.store[this.extern ? x : idx] : new_node["_data"]) === item))){
//
//             this.apply(new_node, item, view, x);
//         }
//
//         if(SUPPORT_STORAGE && this.store && !this.extern){
//
//             item || (item = this.store[idx]);
//             this.store[idx] = this.store[x];
//             this.store[x] = item;
//         }
//     };
// }

if(SUPPORT_KEYED){

    /**
     * Reconcile based on "longest distance" strategy
     * Source: https://github.com/nextapps-de/mikado/blob/master/doc/reconcile.md#2-longest-distance
     * Author: Thomas Wilkerling
     * Licence: Apache-2.0
     *
     * @param {Array=} b
     * @param {Object=} view
     * @param {number=} x
     * @param {boolean|number=} render
     * @returns {Mikado}
     */

    Mikado.prototype.reconcile = function(b, view, x, render){

        const store = SUPPORT_STORAGE && !this.extern && this.store;

        if(store){

            b || (b = store);

            // skips updating internal store
            this.store = 0;
        }

        const a = this.dom;
        const keys = this.live;
        let end_b = b.length;
        let end_a = a.length;
        let max_end = end_a > end_b ? end_a : end_b;
        let shift = 0;
        const key = this.key;
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
                    a_x_key = a_x["_key"];

                    if(a_x_key === b_x_key){

                        if(render){

                            this.update(a_x, b_x, view, x);
                        }

                        continue;
                    }
                }

                if(ended || !keys[b_x_key]){

                    if(render){

                        if(ended || !this.key_pool){

                            end_a++;
                            max_end = end_a > end_b ? end_a : end_b;

                            this.add(b_x, view, x);
                        }
                        else{

                            this.replace(a_x, b_x, view, x);
                        }
                    }

                    continue;
                }

                let idx_a, idx_b;

                for(let y = x + 1; y < max_end; y++){

                    // determine longest distance
                    if(!idx_a && (y < end_a) && (a[y]["_key"] === b_x_key)) idx_a = y + 1;
                    if(!idx_b && (y < end_b) && (b[y][key] === a_x_key)) idx_b = y + 1;

                    if(idx_a && idx_b){

                        // shift up (move target => current)
                        if(idx_a >= idx_b){

                            const tmp_a = a[idx_a - 1];

                            // when distance is 1 it will always move before, no predecessor check necessary
                            this.root.insertBefore(tmp_a, a_x);

                            if(render){

                                this.update(tmp_a, b_x, view, x);
                            }

                            // fast path optimization when distance is equal (skips finding on next turn)
                            if(idx_a === idx_b){

                                if((y - x) > 1){

                                    this.root.insertBefore(a_x, a[idx_a]);
                                }

                                a[x] = a[y];
                                a[y] = a_x;

                                // if(render){
                                //
                                //     this.update(a_x, b[y], view, y);
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
                            this.root.insertBefore(a_x, a[index] || null);
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

        if(store){

            this.store = b;
        }

        //if(steps) console.log(steps);

        return this;
    };
}

/**
 * @param {Array} arr
 * @param {number} pos_old
 * @param {number} pos_new
 * @param {*=} insert
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

/**
 * @param {!Object|Array<Object>=} data
 * @param {Object|number=} view
 * @param {number|null=} index
 * @param {Element=} _replace_node
 * @returns {Mikado}
 */

Mikado.prototype.add = function(data, view, index, _replace_node){

    //profiler_start("add");

    let has_index;

    if(!_replace_node){

        if(typeof view === "number"){

            index = view;
            view = null;
            has_index = 1;
        }
        else if(index || (index === 0)){

            has_index = 1;
        }
    }

    let length = _replace_node || has_index ? index : this.length;
    const node = this.create(data, view, length);

    if(SUPPORT_STORAGE) {

        let stealth_mode;

        if(SUPPORT_REACTIVE && this.proxy){

            if(this.stealth && this.loose && (node["_data"] === data)){

                stealth_mode = 1;
            }
            else{

                data["_proxy"] || (data = create_proxy(data, node["_path"] || this.create_path(node), this.proxy));
            }
        }

        if(!stealth_mode){

            if(this.store){

                if(has_index && !this.extern){

                    splice(this.store, this.length - 1, length, data);
                    //this.store.splice(length, 0, data);
                }
                else{

                    if(SUPPORT_REACTIVE) this.skip = 1;
                    this.store[length] = data;
                    if(SUPPORT_REACTIVE) this.skip = 0;
                }
            }
            else if(this.loose){

                node["_data"] = data;
            }
        }
    }

    if(has_index){

        this.root.insertBefore(node, this.dom[length]);
        splice(this.dom, this.length - 1, length, node);
        //this.dom.splice(length, 0, node);
        this.length++;
    }
    else{

        if(_replace_node){

            // TODO edge case: node from the live pool is used as the replacement
            this.root.replaceChild(node, _replace_node);
        }
        else{

            this.root.appendChild(node);
            this.length++;
        }

        this.dom[length] = node;
    }

    let tmp;

    if(SUPPORT_CALLBACKS && (tmp = this.on) && (tmp = tmp["insert"])){

        tmp(node);
    }

    //profiler_end("add");

    return this;
};

/**
 * @param {boolean=} purge
 * @returns {Mikado}
 */

Mikado.prototype.clear = function(purge){

    if(this.length){

        this.remove(0, this.length);
    }

    if(SUPPORT_POOLS && ((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("purge") !== -1))){

        purge && this.purge();
    }

    return this;
};

Mikado.prototype.destroy = function(unload){

    if(unload){

        this.unload();
    }

    this.length = 0;
    this.dom =
    this.root =
    this.template =
    this.vpath =
    this.update_path =
    this.factory = null;

    if(SUPPORT_KEYED){

        this.live = null;
    }

    if(SUPPORT_STORAGE){

        this.store = null;
    }

    if(SUPPORT_TEMPLATE_EXTENSION){

        this["include"] = null;
    }
};

if(SUPPORT_ASYNC){

    Mikado.prototype.cancel = function(){

        if(this.timer){

            cancelAnimationFrame(this.timer);
            this.timer = null;
        }

        return this;
    };
}

/**
 * @param {Object|Array<Object>=} data
 * @param {Object|number=} view
 * @param {number=} index
 */

Mikado.prototype.append = function(data, view, index){

    //profiler_start("append");

    let has_position;

    if(typeof view === "number"){

        index = view;
        view = null;
        has_position = 1;
    }
    else{

        has_position = index || (index === 0);
    }

    const count = data.length;

    for(let x = 0; x < count; x++){

        this.add(data[x], view, has_position ? index++ : null);
    }

    //profiler_end("append");

    return this;
};

/**
 * @param {!Element|number} index
 * @param {number=} count
 * @param {number=} resize
 * @returns {Mikado}
 */

Mikado.prototype.remove = function(index, count, resize){

    let length = this.length;

    //profiler_start("remove");

    if(index){

        if(typeof index === "object"){

            index = this.index(index);
        }
        else if(index < 0){

            index = length + index - 1;
        }
    }

    if(!length || (index >= length)) return this;

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

        if(SUPPORT_STORAGE && this.store && !this.extern /*&& !this.observe*/){

            // if(this.extern){
            //
            //     this.store.splice(0);
            // }
            // else{

                this.store = resize ? new Array(resize) : [];
            //}
        }

        if(SUPPORT_POOLS && SUPPORT_TEMPLATE_EXTENSION && this["include"] && ((SUPPORT_KEYED && this.key_pool) || this.tpl_pool)){

            for(let y = 0; y < this["include"].length; y++){

                this["include"][y].clear();
            }
        }

        nodes = this.dom;
        count = nodes.length;
        this.root.textContent = "";
        this.root["_dom"] = this.dom = resize ? new Array(resize) : [];
        length = 0;
    }
    else{

        if(SUPPORT_STORAGE && this.store && !this.observe){

            this.store.splice(index, count);
        }

        nodes = this.dom.splice(index, count);
        length -= count;
    }

    let tmp;

    if(SUPPORT_CALLBACKS && (tmp = this.on) && (tmp = tmp["remove"])){

        for(let x = 0; x < count; x++){

            tmp(nodes[x]);
        }
    }

    this.length = length;

    if(SUPPORT_POOLS && this.tpl_pool && (!SUPPORT_KEYED || !this.key_pool) && (count > 1)){

        // reverse is applied in order to use push/pop rather than shift/unshift
        // when no keyed pool is used the right order of items will:
        // 1. optimize the pagination of content (forward, backward)
        // 2. optimize toggling the count of items per page (list resizing)
        // 3. optimize folding of content (show more, show less)

        reverse(nodes);
    }

    for(let x = 0, node; x < count; x++){

        node = nodes[x];

        if(length){

            this.root.removeChild(node);
        }

        this.checkout(node);
    }

    //profiler_end("remove");

    return this;
};

Mikado.prototype.checkout = function(node){

    if(SUPPORT_KEYED && this.key){

        const ref = node["_key"];

        // remove from keyed live-pool
        this.live[ref] = null;

        if(SUPPORT_POOLS){

            if(this.key_pool){

                // add to keyed shared-pool
                this.key_pool[ref] = node;
            }
        }
    }

    if(SUPPORT_POOLS && this.tpl_pool){

        const length = this.tpl_pool.length;

        if(!this.size || (length < this.size)){

            if(SUPPORT_KEYED && this.key_pool){

                // update reference to queued shared-pool
                node["_index"] = length;
            }

            // add to queued shared-pool
            this.tpl_pool[length] = node;
        }
    }
};

Mikado.prototype.replace = function(node, data, view, index){

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

    let tmp;

    // handle key matches in live pool (having two instances of the same component with the same key on the same view model isn't allowed)
    // TODO: provide transaction feature to optimize reconciling when proxy index access modifies in a batch

    if(SUPPORT_KEYED && this.key && (tmp = this.live[data[this.key]])){

        if(!SUPPORT_REACTIVE || !(this.stealth || data["_proxy"])){

            this.apply(node, data, view, index);
        }

        if(tmp !== node){

            let index_b = this.index(tmp);

            if(SUPPORT_STORAGE && this.store){

                if(SUPPORT_REACTIVE) this.skip = 1;
                let tmp2 = this.store[index];
                this.store[index] = data;
                this.store[index_b] = tmp2;
                if(SUPPORT_REACTIVE) this.skip = 0;
            }

            this.dom[index] = tmp;
            this.dom[index_b] = node;

            if(index_b < index){

                let tmp2 = node;
                node = tmp;
                tmp = tmp2;
            }

            const prev = node.nextElementSibling;

            this.root.insertBefore(node, tmp);

            if(prev !== tmp){

                this.root.insertBefore(tmp, prev);
            }
        }

        return this;
    }
    else{

        this.add(data, view, index, node);
    }

    this.checkout(node);

    if(SUPPORT_CALLBACKS && (tmp = this.on) && (tmp = tmp["replace"])){

        tmp(node);
    }

    //profiler_end("replace");

    return this;
};

// TODO: handle key collision and take live pool into account (move live pool handler from replace to update)

/**
 * @param {Element|number} node
 * @param {*=} data
 * @param {Object=} view
 * @param {number=} index
 */

Mikado.prototype.update = function(node, data, view, index){

    //profiler_start("update");

    if(DEBUG){

        if(this.static){

            console.warn("The template '" + this.template + "' is a static template and should not be updated.");
        }
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

    if(SUPPORT_STORAGE){

        if(SUPPORT_REACTIVE && this.proxy){

            if(this.stealth && ((/*this.store ?*/ this.store[index] /*: node["_data"]*/) === data)){

                return this;
            }

            data["_proxy"] || (data = create_proxy(data, node["_path"] || this.create_path(node), this.proxy));
        }

        if(this.store){

            if(SUPPORT_REACTIVE) this.skip = 1;
            this.store[index] = data;
            if(SUPPORT_REACTIVE) this.skip = 0;
        }
        else if(this.loose){

            node["_data"] = data;
        }
    }

    if(SUPPORT_KEYED && this.key){

        const ref = node["_key"];
        const tmp = data[this.key];

        if(ref !== tmp){

            // TODO: checkout node (apply pool transitions)
            // remove from keyed live-pool
            this.live[ref] = null;

            // add to keyed live-pool
            this.live[tmp] = node;

            // update reference to keyed shared-pool
            node["_key"] = tmp;
        }
    }

    let tmp;

    if(SUPPORT_CALLBACKS && (tmp = this.on) && (tmp = tmp["update"])){

        tmp(node);
    }

    //profiler_end("update");

    return this.apply(node, data, view, index);
};

// resolve(nodes, "&") => root
// resolve(nodes, "&>") => root.firstElementChild
// resolve(nodes, "&>+") => root.firstElementChild.nextElementSibling
// resolve(nodes, "&>+:") => root.firstElementChild.firstChild
// resolve(nodes, "&>++") => root.firstElementChild.nextElementSibling.nextElementSibling

Mikado.prototype.create_path = function(root){

    //profiler_start("create_path");

    const length = this.vpath.length;
    const cache = {};
    const new_path = new Array(length);

    for(let x = 0, path; x < length; x++){

        path = this.vpath[x];
        new_path[x] = cache[path] || resolve(root, path, cache);
    }

    // if(SUPPORT_CACHE && this.cache){
    //
    //     root["_cache"] = {};
    // }

    root["_path"] = new_path;

    //profiler_end("create_path");

    return new_path;
};

function resolve(root, path, cache){

    //profiler_start("resolve");

    for(let i = 0, length = path.length, tmp = ""; i < length; i++){

        const current_path = path[i];

        tmp += current_path;

        if(cache[tmp]){

            root = cache[tmp];
        }
        else{

            if(current_path === ">"){

                root = root.firstElementChild;
            }
            else if(current_path === "+"){

                root = root.nextElementSibling;
            }
            else if(current_path === "|"){

                root = root.firstChild;
            }

            cache[tmp] = root;
        }
    }

    //profiler_end("resolve");

    return root;
}

let tmp_fn;
let last_conditional;
let root_node;

/**
 * @param {Template|Array<Template>} tpl
 * @param {number=} index
 * @param {string=} path
 * @param {Array=} dom_path
 * @param {string=} namespaceURI
 * @returns {Element}
 */

Mikado.prototype.parse = function(tpl, index, path, dom_path, namespaceURI){

    //profiler_start("parse");

    if(SUPPORT_POOLS && !index){

        // TODO: there are two versions of the same factory: cached and non-cached
        const cache = factory_pool[tpl["n"] + (SUPPORT_CACHE && this.cache ? "_cache" : "")];

        if(cache){

            this.update_path = cache.update_path;
            this.static = cache.static;
            if(SUPPORT_REACTIVE && SUPPORT_STORAGE) this.stealth = cache.stealth;
            if(SUPPORT_REACTIVE && SUPPORT_STORAGE) this.proxy = cache.proxy;
            if(SUPPORT_TEMPLATE_EXTENSION) this["include"] = cache.include;
            this.vpath = cache.vpath;

            return cache.node;
        }
    }

    let style = tpl["s"];
    let child = tpl["i"];
    let text = tpl["x"];
    let html = tpl["h"];
    const attr = tpl["a"];
    const events = SUPPORT_EVENTS && tpl["e"];
    let class_name = tpl["c"];
    const js = tpl["j"];

    if(attr && attr["xmlns"]){
        namespaceURI = attr["xmlns"];
    }

    const node = namespaceURI ?
        document.createElementNS(namespaceURI, tpl["t"] || "div")
        : document.createElement(tpl["t"] || "div");

    if(!index){

        index = 0;
        path = "&";
        tmp_fn = "";
        this.vpath = [];
        node["_path"] = dom_path = [];
        if(SUPPORT_CACHE && !SUPPORT_CACHE_HELPERS && this.cache) node["_cache"] = {};
        root_node = node;
    }

    let path_length = this.vpath.length;
    let has_update = 0;
    let has_observe = 0;
    let new_fn = "";

    if(js){

        new_fn += ";" + js;

        if(new_fn.indexOf("self") > -1){

            has_update = 2; // force providing "self"
        }
    }

    if(SUPPORT_TEMPLATE_EXTENSION && tpl["f"]){

        tmp_fn += ";if(" + tpl["f"] + "){self.hidden=false";
        has_update = 2;
    }

    if(class_name){

        if(typeof class_name === "object"){

            let observable = SUPPORT_REACTIVE && class_name[1];
            class_name = "" + class_name[0];

            new_fn += SUPPORT_CACHE && this.cache && !observable ? (

                SUPPORT_CACHE_HELPERS ?

                        ";v=" + class_name + ";if(self._class!==v){self._class=v;self.className=v}"
                    :
                        ";v=" + class_name + ";if(s._class" + path_length + "!==v){s._class" + path_length + "=v;self.className=v}"
                ):(
                    class_name ?

                        ";self.className=" + class_name
                    :
                        ""
            );

            if(observable){

                init_proxy(this, class_name, ["_class", path_length]);
                has_observe++;
            }

            has_update++;
        }
        else{

            if(node.className.baseVal === undefined){
                node.className = class_name;
            }else{
                node.setAttribute("class", class_name);
            }
        }
    }

    if(attr || events){

        let keys;

        if(attr){

            keys = Object.keys(attr);
        }

        if(SUPPORT_EVENTS && events){

            const tmp = Object.keys(events);
            keys = keys ? keys.concat(tmp) : tmp;
        }

        for(let i = 0; i < keys.length; i++){

            const key = keys[i];
            let value;

            if(!attr || typeof (value = attr[key]) === "undefined"){

                if(SUPPORT_EVENTS){

                    value = events[key];
                    this.listen(key);
                }
            }

            if(typeof value === "object"){

                // NOTE: did not reset old state when attributes were manually changed

                let observable = SUPPORT_REACTIVE && value[1];
                value = "" + value[0];

                new_fn += SUPPORT_CACHE && this.cache && !observable ? (

                    SUPPORT_CACHE_HELPERS ?

                            ";v=" + value + ";var _a=self._attr||(self._attr={});if(_a['" + key + "']!==v){_a['" + key + "']=v;self[v||v===0?'setAttribute':'removeAttribute']('" + key + "',v)}"
                        :
                            ";v=" + value + ";if(s['_attr_" + key + path_length + "']!==v){s['_attr_" + key + path_length + "']=v;self[v||v===0?'setAttribute':'removeAttribute']('" + key + "',v)}"
                    ):(
                        value ?

                        ";v=" + value + ";self[v||v===0?'setAttribute':'removeAttribute']('" + key + "',v)"
                    :
                        ""
                );

                if(observable){

                    init_proxy(this, value, ["_attr", path_length, key]);
                    has_observe++;
                }

                has_update++;
            }
            else{

                node.setAttribute(key, value);
            }
        }
    }

    if(style){

        if(typeof style === "string"){

            node.style.cssText = style;
        }
        else if(style.length){

            let observable = SUPPORT_REACTIVE && style[1];
            style = style[0];

            new_fn += SUPPORT_CACHE && this.cache && !observable ? (

                SUPPORT_CACHE_HELPERS ?

                        ";v=" + style + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}"
                    :
                        ";v=" + style + ";if(s._css" + path_length + "!==v){s._css" + path_length + "=v;(self._style||(self._style=self.style)).cssText=v}"
                ):(
                    style ?

                        ";self.style.cssText=" + style
                    :
                        ""
            );

            if(observable){

                init_proxy(this, style, ["_css", path_length]);
                has_observe++;
            }

            has_update++;
        }
    }

    let text_fn = "";

    // create partial render tree
    if(SUPPORT_TEMPLATE_EXTENSION && (tpl["@"] || tpl["r"])){

        this["include"] || (this["include"] = []);

        let partial = tpl["@"] || tpl["i"];

        if(!tpl["@"]){

            partial["n"] = tpl["@"] = this.template + "@" + this["include"].length;
            tpl["i"] = null;
        }
        // else /*if(typeof partial === "string")*/{
        //
        //     partial = templates[partial];
        // }

        child = null;

        // TODO use update_path for non-looping includes
        // TODO mount after creation through this.include[]
        new_fn += ";this.include[" + this["include"].length + "].mount(self).render(" + tpl["r"] + (tpl["m"] ? ".slice(" + (tpl["m"] >= 0 ? "0," + tpl["m"] : tpl["m"]) + ")" : "") + ",view)";

        const old_fn = tmp_fn;
        tmp_fn = "";
        this["include"].push(new Mikado(node, partial, Object.assign({}, this.config, { "store": false, "async": 0 })));
        tmp_fn = old_fn;

        has_update++;
        //this.static = false;
    }
    else if(!child){

        // forward if include is on root (has no childs)
        if(SUPPORT_TEMPLATE_EXTENSION && tpl["+"]){

            child = templates[tpl["+"]];
        }
        else if(text){

            let observable;
            const is_object = typeof text === "object";

            if(is_object){

                observable = SUPPORT_REACTIVE && text[1];
                text = "" + text[0];
            }

            let text_node = document.createTextNode(text);

            if(is_object){

                // collect text node
                if(has_update){

                    path_length++;
                }

                this.vpath[path_length] = path + "|";
                dom_path[path_length] = text_node;

                const text_fn = SUPPORT_CACHE && this.cache && !observable ? (

                    SUPPORT_CACHE_HELPERS ?

                            ";v=" + text + ";if(self._text!==v){self._text=v;self.nodeValue=v}"
                        :
                            ";v=" + text + ";if(s._text" + path_length + "!==v){s._text" + path_length + "=v;self.nodeValue=v}"
                    ):(
                        text ?

                            ";self.nodeValue=" + text
                        :
                            ""
                );

                concat_path(has_update, text_fn, path_length, SUPPORT_CACHE && this.cache);

                if(SUPPORT_REACTIVE && observable){

                    init_proxy(this, text, ["_text", path_length]);
                    has_observe++;
                }

                if(has_update){

                    path_length--;
                }
                // else{
                //
                //     path_length++;
                // }
            }

            node.appendChild(text_node);
        }
        else if(html){

            if(typeof html === "object"){

                let observable = SUPPORT_REACTIVE && html[1];
                html = "" + html[0];

                new_fn += SUPPORT_CACHE && this.cache && !observable ? (

                    SUPPORT_CACHE_HELPERS ?

                            ";v=" + html + ";if(self._html!==v){self._html=v;self.innerHTML=v}"
                        :
                            ";v=" + html + ";if(s._html" + path_length + "!==v){s._html" + path_length + "=v;self.innerHTML=v}"
                    ):(
                        html ?

                            ";self.innerHTML=" + html
                        :
                            ""
                );

                if(observable){

                    init_proxy(this, html, ["_html", path_length]);
                    has_observe++;
                }

                has_update++;
            }
            else{

                node.innerHTML = html;
            }
        }
    }

    if(has_update){

        this.vpath[path_length] = path;
        dom_path[path_length] = node;
        this.static = 0;

        if(has_update === has_observe){

            this.stealth = 1;
        }

        // push path before recursion
        concat_path(has_update, new_fn, path_length, SUPPORT_CACHE && this.cache);
    }
    else if(new_fn){

        tmp_fn += new_fn;
    }

    tmp_fn += text_fn;

    if(child){

        let include;

        if(child.length){

            let tmp = ">";

            for(let i = 0, current; i < child.length; i++){

                if(i){

                    tmp += "+";
                }

                current = child[i];

                // self extracting include <include/>
                if(SUPPORT_TEMPLATE_EXTENSION && (include = current["+"])){

                    current = templates[include];
                }

                // process child recursively
                node.appendChild(this.parse(current, index + i + 1, path + tmp, dom_path, namespaceURI));
            }
        }
        else{

            // self extracting include <include/>
            if(SUPPORT_TEMPLATE_EXTENSION && (include = child["+"])){

                child = templates[include];
            }

            // process child recursively
            node.appendChild(this.parse(child, index + 1, path + ">", dom_path, namespaceURI));
        }
    }

    if(SUPPORT_TEMPLATE_EXTENSION && tpl["f"]){

        tmp_fn += "}else " + (has_update > 1 ? "self" : "p[" + path_length + "]") + ".hidden=true";
    }

    if(!index){

        if(!this.static){

            // console.log('"use strict";var self,v' + tmp_fn);
            // console.log(dom_path);
            // console.log(this.vpath);

            if(tmp_fn) {

                this.update_path = Function("p", "s", "data", "index", "view", (

                    '"use strict";var self,v' + tmp_fn
                ));
            }
        }

        if(SUPPORT_POOLS){

            const payload = {

                update_path: this.update_path,
                static: this.static,
                vpath: this.vpath,
                node: node
            };

            if(SUPPORT_TEMPLATE_EXTENSION) payload.include = this["include"];
            if(SUPPORT_REACTIVE && SUPPORT_STORAGE) payload.proxy = this.proxy;
            if(SUPPORT_REACTIVE && SUPPORT_STORAGE) payload.stealth = this.stealth;

            // NOTE: cache has a different factory
            factory_pool[tpl["n"] + (SUPPORT_CACHE && this.cache ? "_cache" : "")] = payload;
        }
    }

    //profiler_end("parse");

    return node;
};

function init_proxy(self, text, payload){

    self.proxy || (self.proxy = {});
    (self.proxy[text] || (self.proxy[text] = [])).push(payload);
}

function concat_path(has_update, new_fn, path_length, cache){

    //if(has_update){ // already checked

        if((SUPPORT_CACHE_HELPERS && cache) || (has_update > 1)){

            tmp_fn += ";self=p[" + path_length + "]" + new_fn;
        }
        else{

            tmp_fn += new_fn.replace(/self/g, "p[" + path_length + "]");
        }
    //}
}

if(SUPPORT_TRANSPORT){

    Mikado.prototype.load = function(file, callback){

        // if(templates[file]){
        //
        //     if(this instanceof Mikado){
        //
        //         this.init(templates[file]);
        //     }
        //
        //     callback && callback();
        //     return;
        // }

        const self = this;
        const xhr = new XMLHttpRequest();

        xhr.overrideMimeType("application/json");
        xhr.open("GET", file, callback !== false);

        xhr.onload = function(){

            let json = this.responseText;

            if(json){

                let error;

                try{

                    const tpl = /** @type {Template} */ (JSON.parse(json));

                    Mikado.register(tpl);

                    if(self instanceof Mikado){

                        self.init(tpl);
                    }
                }
                catch(e){

                    error = e;
                }

                if(typeof callback === "function"){

                    callback(error);
                }
            }
        };

        xhr.send();

        return this;
    };

    Mikado["load"] = Mikado.prototype.load;
}

/**
 * @param {Template=} template
 */

Mikado.prototype.unload = function(template){

    if(!template){

        template = this.template;
    }
    else{

        if(typeof template === "object"){

            template = template["n"];
        }
    }

    if(template){

        templates[template] = null;

        if(SUPPORT_POOLS){

            template_pool[template] =
            keyed_pool[template] =
            factory_pool[template] = null;

            if(SUPPORT_CACHE){

                factory_pool[template + "_cache"] = null;
            }
        }
    }

    return this;
};

Mikado["unregister"] = Mikado.prototype.unregister =
Mikado["unload"] = Mikado.prototype.unload;

function reverse(arr){

    const length = arr.length;
    const half = (length / 2) | 0;

    for(let i = 0, tmp; i < half; i++){

        tmp = arr[i];
        arr[i] = arr[length - i - 1];
        arr[length - i - 1] = tmp;
    }

    return arr;
}

// NOTE: default export required by template partial rendering (inline script)

/** @export */
Mikado.prototype.mount;

/** @export */
Mikado.prototype.render;