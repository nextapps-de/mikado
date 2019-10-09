/**!
 * Mikado.js
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */

"use strict";

import "./event.js";
import "./helper.js";
import "./cache.js";
import "./store.js";
import "./polyfill.js";
import create_proxy from "./proxy.js";
//import { profiler_start, profiler_end } from "./profiler.js";

const { requestAnimationFrame, cancelAnimationFrame } = window;

const defaults = {

    "reuse": true,
    "prefetch": true
};

if(SUPPORT_STORAGE){

    defaults["store"] = true;
    defaults["loose"] = true;
}

if(SUPPORT_ASYNC){

    defaults["async"] = false;
}

if(SUPPORT_POOLS){

    defaults["pool"] = true;
}

if(SUPPORT_CACHE){

    defaults["cache"] = true;
}

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
 * @param {Element|Template} root
 * @param {Template|Object=} template
 * @param {Object=} options
 * @constructor
 */

export default function Mikado(root, template, options){

    if(!root.nodeType){

        options = template;
        template = root;
        root = null;
    }

    if(!template){

        options = root;
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
 * @param {Element|Template} root
 * @param {Template|Object=} template
 * @param {Object=} options
 */

Mikado.new = Mikado["new"] = function(root, template, options){

    return new Mikado(root, template, options);
};

Mikado.prototype.mount = function(target){

    if(this.root !== target){

        if(SUPPORT_POOLS && this.key && this.root){

            this.root["_pool"] = this.keyed;
            this.keyed = target["_pool"] || {};
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

                    for(let x = 0, tmp; x < path.length; x++){

                        tmp = path[x];
                        // TODO: move attributes to its own object
                        tmp["_class"] = tmp["_html"] = tmp["_text"] = tmp["_css"] = /*tmp["_attr_"] =*/ null;
                    }
                }
                else{

                    this.dom[i]["_cache"] = null;
                }
            }
        }

        return this;
    };
}

if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("purge") !== -1)){

    /**
     * @param {Template|string=} template
     * @this {Mikado}
     */

    Mikado.purge = Mikado.prototype.purge = function(template){

        if(template || (template = this.template)){

            //NOTE: keep live pool?
            //this.key && (this.keyed = {});

            if(typeof template === "object"){

                template = template["n"];
            }

            factory_pool[template + (SUPPORT_CACHE && this.cache ? "_cache" : "")] = null;

            if(SUPPORT_POOLS){

                template_pool[template] = [];
                keyed_pool[template] = {};
            }
        }
        else{

            factory_pool = {};

            if(SUPPORT_POOLS){

                const keys = Object.keys(/** @type {!Object} */ (templates));

                for(let i = 0, key; i < keys.length; i++){

                    template_pool[key = keys[i]] = [];
                    keyed_pool[key] = {};
                }
            }
        }

        return this;
    };
}

Mikado.prototype.index = function(node){

    return node["_idx"];
};

Mikado.prototype.node = function(index){

    return this.dom[index];
};

if(SUPPORT_STORAGE){

    Mikado.prototype.data = function(index){

        const get_by_node = typeof index === "object";

        return (

            this.loose ?

                (get_by_node ? index : this.dom[index])["_data"]
            :
                this.store[get_by_node ? index["_idx"] : index]
        );
    };

    if((SUPPORT_HELPERS === true) || (SUPPORT_HELPERS && SUPPORT_HELPERS.indexOf("find") !== -1)){

        Mikado.prototype.find = function(data){

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
                found = true;

                for(let y = 0, key; y < length; y++){

                    key = keys[y];

                    if(data[key] !== payload[key]){

                        found = false;
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

    options = options ?

        Object.assign({}, this.config || defaults, options)
    :
        defaults;

    this.config = options;

    if(!template){

        template = this.template;
    }
    else{

        if(typeof template === "string"){

            template = templates[template];
        }
        else{

            Mikado.register(template);
        }
    }

    this.reuse = options["reuse"];
    this.state = options["state"] || state;

    if(SUPPORT_CACHE){

        this.cache = options["cache"];
    }

    if(SUPPORT_POOLS){

        this.pool = this.reuse && options["pool"];
    }

    if(SUPPORT_ASYNC){

        this.async = options["async"];
        this.timer = 0;
    }

    if(SUPPORT_STORAGE){

        const store = options["store"];

        this.loose = (typeof store !== "object") && options["loose"];

        if(!store || this.loose){

            this.extern = false;
            this.store = false;
        }
        else{

            this.extern = typeof store === "object";
            this.store = this.extern ? store : [];
        }

        if(SUPPORT_REACTIVE){

            this.proxy = false;
        }
    }

    if(this.template !== template["n"]){

        this.template = template["n"];
        this.static = template["d"];
        this.vpath = null;
        this.update_path = null;
        if(SUPPORT_TEMPLATE_EXTENSION) this.include = null;
        this.factory = options["prefetch"] && this.parse(template);

        this.check();

        if(SUPPORT_POOLS){

            this.key = template["k"];
            this.keyed = this.key && {};

            if(this.key){

                keyed_pool[this.template] || (
                    keyed_pool[this.template] = {}
                );
            }

            if(this.pool){

                template_pool[this.template] || (
                    template_pool[this.template] = []
                );
            }
        }
    }

    return this;
};

/**
 * @param {Element} root
 * @param {Template|Object} template
 * @param {Array<Object>|Object=} data
 * @param {Object=} view
 * @param {Function=} callback
 */

Mikado.once = Mikado["once"] = function(root, template, data, view, callback){

    Mikado.new(root, template).render(data, view, callback).destroy(true);
    return Mikado;
};

Mikado.prototype.check = function(){

    if(this.root){

        const id = this.root["_tpl"];

        if(id !== this.template){

            this.root["_tpl"] = this.template;

            if(id){

                if(SUPPORT_POOLS){

                    if(this.key){

                        this.keyed = {};
                    }

                    this.length = 0;
                }

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
        node["_idx"] = i;
        array[i] = node;
    }

    return array;
}

Mikado.prototype.create = function(data, view, index){

    //profiler_start("create");

    let node, key, pool, clone;

    // 1. keyed shared-pool
    if(SUPPORT_POOLS && this.key && (
        (node = (pool = keyed_pool[this.template])[(key = data[this.key])]) ||
        // NOTE: this optimization cannot render more than one data item which has
        //       the same key within same template on the same view instance
        (node = this.keyed[key])
    )){
        if(pool){

            // remove from keyed shared-pool
            pool[key] = null;

            if(this.pool){

                let pos;

                if((pos = node["_index"]) || (pos === 0)){

                    pool = template_pool[this.template];

                    if(pool.length){

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
            }
        }
    }
    // 2. queued shared-pool
    else if(SUPPORT_POOLS && this.pool && (node = template_pool[this.template]) && node.length){

        // remove from queued shared-pool
        node = node.pop();

        if(this.key){

            // remove reference to queued shared-pool
            node["_index"] = null;

            let ref;

            if((ref = node["_key"]) || (ref === 0)){

                // remove from keyed shared-pool
                pool[ref] = null;
            }
        }
    }
    else{

        clone = node = this.factory || (this.factory = this.parse(templates[this.template]));
    }

    this.apply(node, data, view, index);

    if(clone){

        node = this.factory.cloneNode(true);
    }

    if(SUPPORT_POOLS && this.key){

        // add reference to keyed shared-pool
        node["_key"] = key;

        // add to keyed live-pool (non-shared)
        this.keyed[key] = node;
    }

    //profiler_end("create");

    return node;
};

Mikado.prototype.apply = function(root, data, payload, index){

    if(this.static){

        if(DEBUG){

            console.warn("The template '" + this.template + "' is a static template and should not be refreshed.");
        }
    }
    else{

        index || (index === 0) || (index = root["_idx"]);

        if(SUPPORT_STORAGE){

            data || (data = this.store ? this.store[index] : root["_data"]);
        }

        return this.update_path(root["_path"] || this.create_path(root), SUPPORT_CACHE && !SUPPORT_CACHE_HELPERS && root["_cache"], data, index, payload);
    }
};

if(SUPPORT_STORAGE){

    Mikado.prototype.refresh = function(index, view){

        if(DEBUG){

            if(this.static){

                console.warn("The template '" + this.template + "' is a static template and should not be refreshed.");
            }
        }

        let tmp, data, node;

        if(typeof index === "number"){

            node = this.dom[index];
        }
        else if(index && (typeof (tmp = index["_idx"]) === "number")){

            node = index;
            index = tmp;
        }

        if(node){

            this.apply(node, null, view, index);
        }
        else{

            const length = this.length;
            const count = this.store ? this.store.length : length;

            // data delegated from import
            if(this.loose){

                this.store = null;
            }

            if(!count && length){

                return this.remove(0, length);
            }

            for(let x = 0; x < count; x++){

                if(length){

                    this.apply(this.dom[x], null, view, x);
                }
                else{

                    this.add(this.store[x], view);
                }
            }
        }

        return this;
    };
}

/**
 * @param {!Array<*>|Function} data
 * @param {Object|Function=} view
 * @param {Function|boolean=} callback
 * @param {boolean=} skip_async
 * @returns {Mikado|Promise}
 */

Mikado.prototype.render = (function(data, view, callback, skip_async){

    if(DEBUG){

        if(!this.root){

            console.error("Template was not mounted or root was not found.");
        }
        else if(this.template !== this.root["_tpl"]){

            console.warn("Another template is already assigned to this root. Please use '.mount()' or '.check()' before calling '.render()' to switch the context of a template.");
        }
    }

    if(SUPPORT_ASYNC && !skip_async){

        if(view){

            if((typeof view === "function") ||
               (typeof view === "boolean")){

                callback = /** @type {Function|boolean} */ (view);
                view = null;
            }
        }

        if(this.timer){

            this.cancel();
        }

        if(callback){

            const self = this;

            this.timer = requestAnimationFrame(function(){

                self.timer = 0;
                self.render(data, view, null, true);

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
                    self.render(data, view, null, true);
                    resolve();
                });
            });
        }
    }

    //profiler_start("render");

    if(this.static){

        this.dom[0] || this.add();
    }
    else{

        if(!data){

            return SUPPORT_STORAGE && this.refresh();
        }

        let length = this.length;
        let count;

        count = data.length;

        if(typeof count === "undefined"){

            data = [data];
            count = 1;
        }

        if(!count){

            return this.remove(0, length);
        }

        let use_replace;

        if(!this.reuse){

            use_replace = SUPPORT_POOLS && this.key;

            // let found;
            //
            // if(this.key){
            //
            //     found = 0;
            //
            //     for(let x = 0; x < count; x++){
            //
            //         if(this.keyed[data[x][this.key]]){
            //
            //             if(++found > (count / 3)){
            //
            //                 use_replace = true;
            //                 break;
            //             }
            //         }
            //     }
            // }

            if(!use_replace){

                this.remove(0, length, count);
                length = 0;
            }
        }

        let min = length < count ? length : count;
        let x = 0;

        // update
        if(x < min){

            for(; x < min; x++){

                const node = this.dom[x];
                const item = data[x];
                let key;

                if(SUPPORT_POOLS && use_replace && (node["_key"] !== (key = item[this.key]))){

                    const tmp = this.keyed[key];

                    if(tmp){

                        const idx = tmp["_idx"];

                        tmp["_idx"] = x;
                        node["_idx"] = idx;

                        this.dom[x] = tmp;
                        this.dom[idx] = node;

                        if(SUPPORT_STORAGE){

                            if(this.store){

                                this.store[idx] = this.store[x];
                                this.store[x] = item;
                            }
                            else if(this.loose){

                                tmp["_data"] = node["_data"];
                                node["_data"] = item;
                            }
                        }

                        this.root.insertBefore(tmp, node);
                        this.apply(tmp, item, view, x);
                    }
                    else{

                        this.replace(node, item, view, x);
                    }
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
    }

    //profiler_end("render");

    return this;
});

/**
 * @param {!Object|Array<Object>} data
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
            has_index = true;
        }
        else if(index || (index === 0)){

            has_index = true;
        }
    }

    let length = _replace_node || has_index ? index : this.length;
    const tmp = this.create(data, view, length);

    if(SUPPORT_STORAGE) {

        if(SUPPORT_REACTIVE && this.proxy){

            // TODO: how to skip when proxy was already applied?
            data = create_proxy(data, tmp["_path"] || this.create_path(tmp), this.proxy)
        }

        if(this.store){

            if(has_index){

                this.store.splice(length, 0, data);
            }
            else{

                this.store[length] = data;
            }
        }
        else if(this.loose){

            tmp["_data"] = data;
        }
    }

    tmp["_idx"] = length;

    if(has_index){

        this.root.insertBefore(tmp, this.dom[length] || null);
        this.dom.splice(length, 0, tmp);
        this.length++;

        for(;++length < this.length;){

            this.dom[length]["_idx"] = length;
        }
    }
    else{

        if(_replace_node){

            this.root.replaceChild(tmp, _replace_node); //node.replaceWith(tmp);
        }
        else{

            this.root.appendChild(tmp);
            this.length++;
        }

        this.dom[length] = tmp;
    }

    //profiler_end("add");

    return this;
};

Mikado.prototype.clear = function(){

    return this.remove(0, this.length);
};

Mikado.prototype.destroy = function(unload){

    if(unload){

        this.unload();
    }

    this.dom = null;
    this.root = null;
    this.template = null;
    this.vpath = null;
    this.update_path = null;
    this.factory = null;
    this.length = 0;

    if(SUPPORT_POOLS){

        this.keyed = {};
    }

    if(SUPPORT_TEMPLATE_EXTENSION){

        this.include = null;
    }

    if(SUPPORT_STORAGE){

        this.store = null;
    }
};

if(SUPPORT_ASYNC){

    Mikado.prototype.cancel = function(){

        if(this.timer){

            cancelAnimationFrame(this.timer);
            this.timer = null;
        }
    };
}

/**
 * @param {Object|Array<Object>=} data
 * @param {Object|number=} view
 * @param {number=} position
 */

Mikado.prototype.append = function(data, view, position){

    //profiler_start("append");

    let has_position;

    if(typeof view === "number"){

        position = view;
        view = null;
        has_position = true;
    }
    else{

        has_position = position || (position === 0);
    }

    const count = data.length;

    for(let x = 0; x < count; x++){

        this.add(data[x], view, has_position ? position++ : null);
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

    if(typeof index === "object"){

        index = index["_idx"];
    }
    else if(index < 0){

        index = length + index - 1;
    }

    if(!length || (index >= length)) return this;

    if(count < 0){

        if(count < 1){

            index -= count + 1;

            if(index < 0){

                index = 0;
            }
        }

        count *= -1;
    }
    else{

        count || (count = 1);
    }

    let nodes;

    if(count >= length){

        if(SUPPORT_STORAGE && this.store && !this.extern){

            // TODO: check if replacing index + resize array is faster then fill empty
            this.store = resize ? new Array(resize) : [];
        }

        nodes = this.dom;
        count = nodes.length;
        this.root.textContent = "";
        this.root["_dom"] = this.dom = resize ? new Array(resize) : [];
        length = 0;
    }
    else{

        if(SUPPORT_STORAGE && this.store && !this.extern){

            this.store.splice(index, count);
        }

        nodes = this.dom.splice(index, count);
        length -= count;
    }

    this.length = length;

    let queued_pool_offset;

    if(SUPPORT_POOLS && this.pool){

        const pool = template_pool[this.template];
        const size = pool.length;

        if(this.cache && (count > 1) && !this.key){

            // reverse is applied in order to use push/pop rather than shift/unshift
            // when no keyed pool is used the right order of items will:
            // 1. optimize the pagination of content (forward, backward)
            // 2. optimize toggling the count of items per page (list resizing)
            // 3. optimize folding of content (show more, show less)

            reverse(nodes);
        }

        queued_pool_offset = size + 1;

        template_pool[this.template] = (

            size ?

                pool.concat(nodes)
            :
                nodes
        );
    }

    const pool = SUPPORT_POOLS && this.key && keyed_pool[this.template];

    for(let x = 0, tmp; x < count; x++){

        tmp = nodes[x];

        if(length){

            this.root.removeChild(tmp);
        }

        if(pool){

            const key = tmp["_key"];

            // remove from keyed live-pool
            this.keyed[key] = null;

            // add to keyed shared-pool
            pool[key] = tmp;

            if(queued_pool_offset){

                // update reference to queued shared-pool
                tmp["_index"] = queued_pool_offset + x - 1;
            }
        }
    }

    if(index < length){

        for(; index < length; index++){

            this.dom[index]["_idx"] = index;
        }
    }

    //profiler_end("remove");

    return this;
};

Mikado.prototype.replace = function(node, data, view, index){

    //profiler_start("replace");

    if(typeof index === "undefined"){

        index = node["_idx"];
    }

    this.add(data, view, index, node);

    if(SUPPORT_POOLS && this.key){

        const ref = node["_key"];

        // remove from keyed live-pool
        this.keyed[ref] = null;

        // add to keyed shared-pool
        keyed_pool[this.template][ref] = node;
    }

    if(SUPPORT_POOLS && this.pool){

        const pool = template_pool[this.template];

        if(this.key){

            // update reference to queued shared-pool
            node["_index"] = pool.length;
        }

        // add to queued shared-pool
        pool[pool.length] = node;
    }

    //profiler_end("replace");

    return this;
};

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

            index = node["_idx"];
        }
    }

    if(SUPPORT_POOLS && this.key){

        const ref = node["_key"];
        const tmp = data[this.key];

        if(ref !== tmp){

            // remove from keyed live-pool
            this.keyed[ref] = null;

            // add to keyed live-pool
            this.keyed[tmp] = node;

            // update reference to keyed shared-pool
            node["_key"] = tmp;
        }
    }

    if(SUPPORT_STORAGE){

        if(this.store){

            this.store[index] = data;
        }
        else if(this.loose){

            node["_data"] = data;
        }
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

    for(let x = 0; x < length; x++){

        const path = this.vpath[x];

        new_path[x] = cache[path] || resolve(root, path, cache);
    }

    root["_path"] = new_path;
    root["_cache"] = {};

    //profiler_end("create_path");

    return new_path;
};

function resolve(root, path, cache){

    //profiler_start("resolve");

    let tmp = "";

    for(let i = 0; i < path.length; i++){

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
 * @returns {Element}
 */

Mikado.prototype.parse = function(tpl, index, path, dom_path){

    //profiler_start("parse");

    // TODO: there are two versions of the same factory: cached and non-cached
    const cache = factory_pool[tpl["n"] + (SUPPORT_CACHE && this.cache ? "_cache" : "")];

    if(cache){

        this.update_path = cache.update_path;
        this.static = cache.static;
        if(SUPPORT_TEMPLATE_EXTENSION) this.include = cache.include;
        if(SUPPORT_REACTIVE) this.proxy = cache.proxy;
        this.vpath = cache.vpath;

        return cache.node;
    }

    const node = document.createElement(tpl["t"] || "div");

    if(!index){

        index = 0;
        path = "&";
        tmp_fn = "";
        this.vpath = [];
        node["_path"] = dom_path = [];
        if(SUPPORT_CACHE) node["_cache"] = {};
        root_node = node;
    }

    let style = tpl["s"];
    let child = tpl["i"];
    let text = tpl["x"];
    let html = tpl["h"];
    const attr = tpl["a"];
    const events = SUPPORT_EVENTS && tpl["e"];
    let class_name = tpl["c"];
    const js = tpl["j"];
    let path_length = this.vpath.length;
    let has_update = 0;
    let new_fn = "";

    if(js){

        new_fn += ";" + js;

        if(new_fn.indexOf("self") > -1){

            this.vpath[path_length] = path;
            dom_path[path_length] = node;
            has_update = 2; // force providing "self"
        }
    }

    if(class_name){

        if(typeof class_name === "object"){

            // NOTE: classList is faster but has to reset old state when "reuse" is enabled and helpers were used

            let observable = class_name[1];
            class_name = class_name[0];

            new_fn += SUPPORT_CACHE && this.cache ? (

                SUPPORT_CACHE_HELPERS ?

                        ";v=" + class_name + ";if(self._class!==v){self._class=v;self.className=v}"
                    :
                        ";v=" + class_name + ";if(s._class" + path_length + "!==v){s._class" + path_length + "=v;self.className=v}"
                ):
                    ";self.className=" + class_name;

            if(SUPPORT_REACTIVE && observable){

                this.proxy || (this.proxy = {});
                this.proxy[class_name] || (this.proxy[class_name] = []);
                this.proxy[class_name].push(["_class", path_length]);
            }

            this.vpath[path_length] = path;
            dom_path[path_length] = node;
            has_update++;
        }

        else{

            node.className = class_name;
        }
    }

    if(attr || events){

        let keys;
        let has_dynamic_values;

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

                let observable = value[1];
                value = value[0];

                new_fn += SUPPORT_CACHE && this.cache ? (

                    SUPPORT_CACHE_HELPERS ?

                            ";v=" + value + ";if(self['_attr_" + key + "']!==v){self['_attr_" + key + "']=v;self.setAttribute('" + key + "',v)}"
                        :
                            ";v=" + value + ";if(s['_attr_" + key + path_length + "']!==v){s['_attr_" + key + path_length + "']=v;self.setAttribute('" + key + "',v)}"
                    ):
                        ";self.setAttribute('" + key + "'," + value + ")";

                if(SUPPORT_REACTIVE && observable){

                    this.proxy || (this.proxy = {});
                    this.proxy[value] || (this.proxy[value] = []);
                    this.proxy[value].push(["_attr", path_length, key]);
                }

                has_dynamic_values = true;
                has_update++;
            }
            else{

                node.setAttribute(key, value);
            }
        }

        if(has_dynamic_values){

            this.vpath[path_length] = path;
            dom_path[path_length] = node;
        }
    }

    if(style){

        if(typeof style === "string"){

            node.style.cssText = style;
        }
        else if(style.length){

            let observable = style[1];
            style = style[0];

            new_fn += SUPPORT_CACHE && this.cache ? (

                SUPPORT_CACHE_HELPERS ?

                        ";v=" + style + ";if(self._css!==v){self._css=v;(self._style||(self._style=self.style)).cssText=v}"
                    :
                        ";v=" + style + ";if(s._css" + path_length + "!==v){s._css" + path_length + "=v;(self._style||(self._style=self.style)).cssText=v}"
                ):
                    ";self.style.cssText=" + style;

            if(SUPPORT_REACTIVE && observable){

                this.proxy || (this.proxy = {});
                this.proxy[style] || (this.proxy[style] = []);
                this.proxy[style].push(["_css", path_length]);
            }

            this.vpath[path_length] = path;
            dom_path[path_length] = node;
            has_update++;
        }
        // NOTE: Faster but will not reset old state when "reuse" is enabled and helpers were used:
        /*
        else{

            const keys = Object.keys(style);
            let has_dynamic_values;

            for(let i = 0; i < keys.length; i++){

                const key = keys[i];
                let value = style[key];

                if(typeof value === "object"){

                    let observable = value[1];
                    value = value[0];

                    new_fn += SUPPORT_CACHE && this.cache ? (

                        SUPPORT_CACHE_HELPERS ?

                                ";v=" + value + ";var t=self['_style_cache']||(self['_style_cache']={});if(t['" + key + "']!==v){t['" + key + "']=v;(self._style||(self._style=self.style)).setProperty('" + key + "',v)}"
                            :
                                ";v=" + value + ";if(s['_style_" + key + path_length + "']!==v){s['_style_" + key + path_length + "']=v;(self._style||(self._style=self.style)).setProperty('" + key + "',v)}"
                        ):
                            ";self.style.setProperty('" + key + "'," + value + ")";

                    if(SUPPORT_REACTIVE && observable){

                        this.proxy || (this.proxy = {});
                        this.proxy[value] || (this.proxy[value] = []);
                        this.proxy[value].push(["_style", path_length, key]);
                    }

                    has_dynamic_values = true;
                    has_update++;
                }
                else{

                    node.style.setProperty(key, value);
                }
            }

            if(has_dynamic_values){

                this.vpath[path_length] = path;
                dom_path[path_length] = node;
            }
        }
        */
    }

    if(!child){

        // create partial render tree
        if(SUPPORT_TEMPLATE_EXTENSION && tpl["@"]){

            this.include || (this.include = []);

            // TODO use update_path for non-looping includes
            // TODO mount after creation through this.include[]
            tmp_fn += ";this.include[" + this.include.length + "].mount(p[" + path_length + "]).render(" + tpl["r"] + (tpl["m"] ? ".slice(" + (tpl["m"] > 0 ? "0," : "") + tpl["m"] + ")" : "") + ",view)";

            const old_fn = tmp_fn;
            tmp_fn = "";
            this.include.push(new Mikado(node, typeof tpl["@"] === "string" ? templates[tpl["@"]] : tpl["@"], Object.assign(this.config, { "store": false, /*"loose": false,*/ "async": false })));
            tmp_fn = old_fn;

            this.vpath[path_length] = path;
            dom_path[path_length] = node;
            this.static = false;
            //has_update++;
        }
        // forward if include is on root (has no childs)
        else if(SUPPORT_TEMPLATE_EXTENSION && tpl["+"]){

            child = templates[tpl["+"]];
        }
        else if(text){

            path += "|";

            let observable;
            const is_object = typeof text === "object";

            if(is_object){

                observable = text[1];
                text = text[0];
            }

            let text_node = document.createTextNode(text);

            if(is_object){

                // collect text node
                if(has_update){

                    concat_path(has_update, new_fn, path_length, SUPPORT_CACHE && this.cache);
                    new_fn = "";
                    path_length++;
                }

                new_fn += SUPPORT_CACHE && this.cache ? (

                    SUPPORT_CACHE_HELPERS ?

                            ";v=" + text + ";if(self._text!==v){self._text=v;self.nodeValue=v}"
                        :
                            ";v=" + text + ";if(s._text" + path_length + "!==v){s._text" + path_length + "=v;self.nodeValue=v}"
                    ):
                        ";self.nodeValue=" + text;

                if(SUPPORT_REACTIVE && observable){

                    this.proxy || (this.proxy = {});
                    this.proxy[text] || (this.proxy[text] = []);
                    this.proxy[text].push(["_text", path_length]);
                }

                this.vpath[path_length] = path;
                dom_path[path_length] = text_node;
                has_update++;
            }

            node.appendChild(text_node);
        }
        else if(html){

            if(typeof html === "object"){

                let observable = html[1];
                html = html[0];

                new_fn += SUPPORT_CACHE && this.cache ? (

                    SUPPORT_CACHE_HELPERS ?

                            ";v=" + html + ";if(self._html!==v){self._html=v;self.innerHTML=v}"
                        :
                            ";v=" + html + ";if(s._html" + path_length + "!==v){s._html" + path_length + "=v;self.innerHTML=v}"
                    ):
                        ";self.innerHTML=" + html;

                if(SUPPORT_REACTIVE && observable){

                    this.proxy || (this.proxy = {});
                    this.proxy[html] || (this.proxy[html] = []);
                    this.proxy[html].push(["_html", path_length]);
                }

                this.vpath[path_length] = path;
                dom_path[path_length] = node;
                has_update++;
            }
            else{

                node.innerHTML = html;
            }
        }
    }

    if(SUPPORT_TEMPLATE_EXTENSION && tpl["f"]){

        tmp_fn += ";if(" + tpl["f"] + "){" + (has_update > 1 ? "self" : "p[" + path_length + "]") + ".hidden=false";

        if(!has_update){

            this.vpath[path_length] = path;
            dom_path[path_length] = node;
            this.static = false;
            //has_update++;
        }
    }

    if(has_update){

        this.static = false;

        // push path before recursion
        concat_path(has_update, new_fn, path_length, SUPPORT_CACHE && this.cache);
    }

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
                node.appendChild(this.parse(current, index + i + 1, path + tmp, dom_path));
            }
        }
        else{

            // self extracting include <include/>
            if(SUPPORT_TEMPLATE_EXTENSION && (include = child["+"])){

                child = templates[include];
            }

            // process child recursively
            node.appendChild(this.parse(child, index + 1, path + ">", dom_path));
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

        const payload = {

            update_path: this.update_path,
            static: this.static,
            vpath: this.vpath,
            node: node
        };

        if(SUPPORT_TEMPLATE_EXTENSION) payload.include = this.include;
        if(SUPPORT_REACTIVE) payload.proxy = this.proxy;

        // NOTE: cache has a different factory
        factory_pool[tpl["n"] + (SUPPORT_CACHE && this.cache ? "_cache" : "")] = payload;
    }

    //profiler_end("parse");

    return node;
};

function concat_path(has_update, new_fn, path_length, cache){

    //if(has_update){ // already checked

        if(cache || (has_update > 1)){

            tmp_fn += ";self=p[" + path_length + "]" + new_fn;
        }
        else{

            tmp_fn += new_fn.replace(/self/g, "p[" + path_length + "]");
        }
    //}
}

if(SUPPORT_TRANSPORT){

    Mikado.prototype.load = function(file, callback){

        if(templates[file]){

            if(this instanceof Mikado){

                this.init(templates[file]);
            }

            callback && callback();
            return;
        }

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
    };

    Mikado.load = Mikado["load"] = Mikado.prototype.load;
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

        templates[template] =
        factory_pool[template] = null;

        if(SUPPORT_POOLS){

            template_pool[template] = [];
            keyed_pool[template] = {};
        }

        if(SUPPORT_CACHE){

            factory_pool[template + "_cache"] = null;
        }
    }
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