/**!
 * Mikado.js
 * Copyright 2019-2024 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */

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
    SUPPORT_WEB_COMPONENTS,
    SUPPORT_DOM_HELPERS,
    REACTIVE_ONLY,

    MIKADO_DOM,
    MIKADO_LIVE_POOL,
    MIKADO_CLASS,
    MIKADO_TPL_KEY,
    MIKADO_TPL_PATH,
    MIKADO_NODE_CACHE,
    MIKADO_PROXY
} from "./config.js";
import { tick } from "./profiler.js";
// <-- COMPILER BLOCK
import { TemplateDOM, Template, MikadoOptions, MikadoCallbacks, NodeCache, ProxyCache } from "./type.js";
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

    PROFILER && tick("mikado.new");

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

        if(!template.tpl /*|| !template.name*/){

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
    /** @type {boolean} */
    this.shadow = options.shadow || (SUPPORT_WEB_COMPONENTS && !!template.cmp);

    if(SUPPORT_KEYED){

        /** @const {string} */
        this.key = template.key || "";
        /**
         * @private
         * @dict {Object<string, Element>}
         */
        this.live = {};
    }

    /** @type {Array<Function>} */
    const fn = template.fn;
    // make a copy to make this template re-usable when consumed
    // this should just have been copied when it is a root template!
    template.fc || (fn && (template.fc = fn.slice()));
    /**
     * The compiler unshift includes, so we can use faster arr.pop() here, because it needs reverse direction.
     * Let consume the nested template functions by using .pop() is pretty much simpler than using an index.
     * @private {Function}
     */
    this.apply = fn && fn.pop();
    /** @type {Template|null} */
    this.tpl = template;
    /** @const {string} */
    this.name = template.name;

    /*
     * Includes are filled with Mikado instances when factory is constructed
     * @const {Array<Mikado>}
     */
    this.inc = [];

    const cacheable = this.recycle || (SUPPORT_KEYED && !!this.key);

    if(SUPPORT_POOLS){

        // Pool sizes are automatically being handled,
        // non-keyed pools does not need boundary,
        // keyed pools start at size 1 and increase to max items per view

        /** @type {number} */
        this.pool = cacheable && options.pool ? 1 : 0;
        /** @private {Array<Element>} */
        this.pool_shared = [];

        if(SUPPORT_KEYED){

            /** @private */
            this.pool_keyed = new Map();
        }
    }

    if(SUPPORT_CACHE){

        /** @const {boolean} */
        this.cache = cacheable && (template.cache || !!options.cache);
    }

    if(SUPPORT_ASYNC){

        /** @type {boolean} */
        this.async = !!options.async;
        /** @private {number} */
        this.timer = 0;
    }

    if(SUPPORT_CALLBACKS){

        /** @private {MikadoCallbacks|null} */
        this.on = options.on || null;
    }

    if(SUPPORT_REACTIVE){

        /**
         * @type {Object<string, Array<ProxyCache>>}
         */
        this.proxy = null;
        /** @type {number} */
        this.fullproxy = 0;
        /** @type {Observer|undefined} */
        const store = options.observe;

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

    PROFILER && tick("mikado.register");

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

    PROFILER && tick("mikado.unregister");

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

    PROFILER && tick("view.mount");

    if(DEBUG){

        if(!target){

            throw new Error("No target was passed to .mount()");
        }
    }

    if(SUPPORT_ASYNC){

        // cancel async render task if scheduled
        this.timer && this.cancel();
    }

    if(this.shadow){

        // Actually the MIKADO_CLASS will append to the templates root element,
        // but it would be better to have it on the mounting element
        // TODO improve getting the root withing components by assigning MIKADO_ROOT to the mounting element

        const cmp = SUPPORT_WEB_COMPONENTS && /** @type {Array<TemplateDOM>} */ (this.tpl.cmp);
        // also when cmp: [] has no definitions at top level scope
        target = target.shadowRoot || target.attachShadow({ mode: "open" });

        if(cmp && cmp.length){

            // the root is always the last element
            const tmp = target.lastElementChild;

            if(tmp /*&& tmp.tagName === "ROOT"*/){

                target = tmp;
            }
            else{

                /** @type {TemplateDOM} */
                const root = { tag: "root" };
                // push root as the last element
                cmp.push(root);

                for(let i = 0, node; i < cmp.length; i++){

                    node = construct(this, /** @type {TemplateDOM} */ (cmp[i]), [], "");
                    target.append(node);

                    if(i === cmp.length - 1){

                        // the root element is the last one
                        target = /** @type {Element} */ (node);
                    }
                }
            }
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

        // different template

        PROFILER && tick("mikado.unmount");

        target_instance.clear();
        target[MIKADO_DOM] = this.dom = [];
        this.length = 0;

        if(target.firstChild){

            PROFILER && tick("mount.reset");
            target.textContent = "";
        }

        const callback = SUPPORT_CALLBACKS && this.on && this.on["unmount"];
        callback && callback(target, target_instance);
    }
    else{

        // initial mount

        if(hydrate){

            this.dom = collection_to_array(target.children);
            this.length = this.dom.length;
        }
        else{

            this.dom = [];
            this.length = 0;

            if(target.firstChild){

                PROFILER && tick("mount.reset");
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

                    PROFILER && tick("hydrate.count");

                    node = this.dom[i];
                    // server-side rendering needs to export the key as attribute
                    key = node.getAttribute("key");

                    if(DEBUG){

                        if(!key){

                            console.warn("The template '" + this.name + "' runs in keyed mode, but the hydrated component don't have the attribute 'key' exported.");
                        }
                    }

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
            this.factory = this.dom[0].cloneNode(true);
            construct(this, /** @type {TemplateDOM} */ (this.tpl.tpl), [], "", this.factory)
            && finishFactory(this);
        }

        if(PROFILER){

            hydrate && tick(this.tpl ? "hydrate.error" : "hydrate.success");
        }

        // also when falls back on hydration if structure was incompatible:

        if(this.tpl){

            /** @private */
            this.factory = construct(this, /** @type {TemplateDOM} */ (this.tpl.tpl), [], "");
            finishFactory(this);
        }
    }

    const callback = SUPPORT_CALLBACKS && this.on && this.on["mount"];
    callback && callback(target, this);

    return this;
};

/**
 * @param {Mikado} self
 */

function finishFactory(self){

    if(self.tpl.fc){

        // self.tpl.fn could have further template functions

        self.tpl.fn = self.tpl.fc;
        self.tpl.fc = null;
    }

    self.tpl = null;
}

/**
 * @param {NodeList} collection
 * @return {Array<Element>}
 */

function collection_to_array(collection){

    PROFILER && tick("collection_to_array");

    const length = collection.length;
    const array = new Array(length);

    for(let i = 0; i < length; i++) {

        array[i] = collection[i];
    }

    return array;
}

/**
 * @param {Element|ShadowRoot} root
 * @param {Template} template
 * @param {Array<Object>|Object|Function|boolean=} data
 * @param {*|Function|boolean=} state
 * @param {Function|boolean=} callback
 * @const
 */

export function once(root, template, data, state, callback){

    if(DEBUG){

        if(!root){

            throw new Error("Root element is not defined.");
        }

        if(!template){

            throw new Error("Template is not defined.");
        }
    }

    let mikado;

    if(SUPPORT_ASYNC){

        if(typeof data === "function" || data === true){

            callback = data;
            data = null;
        }
        else if(typeof state === "function" || state === true){

            callback = state;
            state = null;
        }

        if(callback){

            return new Promise(function(resolve){

                requestAnimationFrame(function(){

                    once(root, template, data, state);
                    if(typeof callback === "function") callback();
                    resolve();
                });
            });
        }
    }

    PROFILER && tick("mikado.once");

    const is_shadow = SUPPORT_WEB_COMPONENTS && template.cmp;
    const is_component = is_shadow && is_shadow.length;

    if(is_shadow && !is_component){

        // switch to shadow root

        root = root.shadowRoot || root.attachShadow({ mode: "open" });
    }

    if(!data && !is_component && !template.fn){

        // static non-looped templates
        // uses the low-level template factory constructor

        const node = construct(
            /** @type {!Mikado} */ ({}),
            /** @type {TemplateDOM} */ (template.tpl), [], "", null, 1);

        root.append(node);
    }
    else{

        mikado = new Mikado(template);

        if(is_component){

            // full declared web components needs to be mounted

            root = mikado.mount(root).root;
        }

        if(data && Array.isArray(data)){

            // looped templates

            for(let i = 0; i < data.length; i++){

                root.append(mikado.create(data[i], state, i));
            }
        }
        else{

            // dynamic non-looped templates + web components

            root.append(mikado.create(data, state));
        }

        mikado.destroy();
    }

    return Mikado;
}

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
                    /*has_fn &&*/ /** @type {Function} */ (callback)();
                });

                return has_fn ? this : new Promise(function(resolve){

                    callback = resolve;
                });
            }
        }

        PROFILER && tick("view.render");

        //profiler_start("render");

        let length = this.length;

        // a template could have just expressions without accessing data

        if(!data){

            if(!this.apply){

                this.dom[0] || this.add();
                return this;
            }
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
        const proxy = SUPPORT_REACTIVE && this.proxy;

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

                    return this.reconcile(/** @type {Array} */ (data), state, x);
                }
                else{

                    this.update(node, item, state, x, 1);
                }

                if(proxy && (/* (!key && !this.recycle) || */ !item[MIKADO_PROXY])){

                    data[x] = apply_proxy(this, node, item);
                }
            }
        }

        // add
        if(x < count){

            // when recycle is disabled the proxy needs to be updated
            const recycle = key || this.recycle;

            for(; x < count; x++){

                const item = data[x];
                this.add(item, state/*, x*/);

                if(proxy && (!recycle || !item[MIKADO_PROXY])){

                    data[x] = apply_proxy(this, this.dom[x], item);
                }
            }
        }

        // remove
        else if(count < length){

            this.remove(count, length - count);
        }

        //profiler_end("render");

        return this;
    };
}

/**
 * @param {!Element|number} node
 * @param {*=} data
 * @param {*=} state
 * @param {number=} index
 * @const
 */

Mikado.prototype.replace = function(node, data, state, index){

    PROFILER && tick("view.replace");

    //profiler_start("replace");

    if(typeof index === "undefined"){

        if(typeof node === "number"){

            index = node < 0 ? this.length + node : node;
            node = this.dom[index];
        }
        else{

            index = this.index(node);
        }
    }

    node = /** @type {!Element} */ (node);

    let tmp, update;

    // The main difference of replace() and update() is that replace() will also handle the keyed live pool.

    if(SUPPORT_KEYED && this.key){

        const key = data[this.key];

        if((tmp = this.live[key])){

            if(tmp !== node){

                const index_old = this.index(tmp);
                const node_a = index_old < index ? tmp : node;
                const node_b = index_old < index ? node : tmp;
                let next = this.dom[index_old < index ? index_old + 1 : index + 1];

                this.dom[index] = tmp;
                this.dom[index_old] = node;

                // if(next === node_b){
                //
                //     this.root.insertBefore(node_b, node_a);
                // }
                // else{

                    if(next !== node_b){

                        this.root.insertBefore(node_a, node_b);
                    }
                    else{

                        next = node_a;
                    }

                    this.root.insertBefore(node_b, next);
                //}
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

        this.apply && ((SUPPORT_REACTIVE && this.fullproxy && data[MIKADO_PROXY]) || this.apply(
            data,
            state || this.state,
            index,
            update[MIKADO_TPL_PATH] || create_path(update, this.factory[MIKADO_TPL_PATH], SUPPORT_CACHE && this.cache)
        ));
    }
    else{

        const clone = this.create(data, state, index, 1);

        if((SUPPORT_KEYED || SUPPORT_POOLS) && (this.key || this.pool)){

            this.checkout(node);
        }

        this.dom[index] = clone;
        node.replaceWith(clone);
    }

    const callback = SUPPORT_CALLBACKS && this.on && this.on["replace"];
    callback && callback(node, this);

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

    PROFILER && tick("view.update");

    if(typeof index === "undefined"){

        if(typeof node === "number"){

            index = node < 0 ? this.length + node - 1 : node;
            node = this.dom[index];
        }
        else{

            index = this.index(node);
        }
    }

    node = /** @type {Element} */ (node);

    // Is keyed handling also needed in update?
    // .replace() = .update() + keyed handling

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

    const callback = SUPPORT_CALLBACKS && this.on && this.on["update"];
    callback && callback(node, this);

    return this;
};

if(SUPPORT_ASYNC){

    /** @const */
    Mikado.prototype.cancel = function(){

        PROFILER && tick("view.cancel");

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

    PROFILER && tick("view.create");

    const keyed = SUPPORT_KEYED && this.key;
    const key = keyed && data[keyed];
    let node, pool, factory, found;

    if(SUPPORT_POOLS && this.pool){

        // 1. shared keyed pool
        if(keyed){

            if((pool = this.pool_keyed) && (node = pool.get(key))){

                PROFILER && tick("pool.out");
                pool.delete(key);
                found = 1;
            }
        }
        // 2. shared non-keyed pool
        else if((pool = this.pool_shared) && pool.length){

            PROFILER && tick("pool.out");
            node = pool.pop();
        }
    }

    if(!node){

        node = factory = this.factory;

        if(!factory){

            /** @private */
            this.factory = node = factory = construct(this, /** @type {TemplateDOM} */ (this.tpl.tpl), [], "");
            finishFactory(this);
        }
    }

    let cache;

    if(this.apply){

        const vpath = node[MIKADO_TPL_PATH] || create_path(node, this.factory[MIKADO_TPL_PATH], !!factory || (SUPPORT_CACHE && this.cache));
        cache = SUPPORT_CACHE && factory && this.cache && /** @type {Array<NodeCache>} */ (new Array(vpath.length));

        this.apply(
            data,
            state || this.state,
            index,
            vpath,
            !!factory,
            cache
        );
    }

    if(factory){

        PROFILER && tick("factory.clone");
        node = factory.cloneNode(true);

        if(SUPPORT_CACHE && cache && cache !== true){

            node[MIKADO_NODE_CACHE] = cache;
        }
    }

    if(keyed){

        if(!found) node[MIKADO_TPL_KEY] = key;
        if(_update_pool) this.live[key] = node;
    }

    const callback = SUPPORT_CALLBACKS && this.on && this.on[factory ? "create" : "recycle"];
    callback && callback(node, this);

    return node;
};

/**
 * @param {*=} data
 * @param {*|number=} state
 * @param {number|null=} index
 * @returns {Mikado}
 * @const
 */

Mikado.prototype.add = function(data, state, index){

    PROFILER && tick("view.add");
    //profiler_start("add");

    let has_index;

    if(typeof state === "number"){

        index = state < 0 ? this.length + state : state;
        state = null;
        has_index = index < this.length;
    }
    else if(typeof index === "number"){

        if(index < 0) index += this.length;
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

    if(SUPPORT_KEYED && this.key && SUPPORT_POOLS && this.pool){

        // adjust keyed pool size
        if(this.pool < this.length) this.pool = this.length;
    }

    const callback = SUPPORT_CALLBACKS && this.on && this.on["insert"];
    callback && callback(node, this);

    //profiler_end("add");

    return this;
};

/**
 * @param {Mikado} self
 * @param {Element} node
 * @param {Object} data
 * @return {Proxy}
 */

export function apply_proxy(self, node, data){

    PROFILER && tick("proxy.apply");

    //TODO inject the full path on first recycle

    return proxy_create(
        data,
        node[MIKADO_TPL_PATH] || create_path(node, self.factory[MIKADO_TPL_PATH], SUPPORT_CACHE && self.cache),
        self.proxy
    );
}

if(SUPPORT_KEYED && !REACTIVE_ONLY){

    // Since there don't exist a native transaction feature for DOM changes, all changes applies incrementally.
    // For a full render task there are a "dirty" intermediate state when moving one node.
    // This state will resolve after running through the whole reconcile().
    // Since we don't use an extra loop running upfront to calculate the diff,
    // Mikado uses a smart algorithm which can find the shortest path in one loop.
    // That also means, during reconcile there is no look-ahead to the data (just to the live pool).
    // For this reason the keyed live pool needs to be in sync with the vdom array.
    // The reconcile runs like a resizable "window function" on where unmatched things
    // will move further to the end until the process cursor reach this index.

    /**
     * Reconcile based on "longest distance" strategy by Thomas Wilkerling
     * @param {Array=} b
     * @param {*=} state
     * @param {number=} x
     * @returns {Mikado}
     * @const
     */

    Mikado.prototype.reconcile = function(b, state, x){

        PROFILER && tick("view.reconcile");

        const a = this.dom;
        const live = this.live;
        const key = this.key;

        let end_b = b.length;
        let end_a = a.length;
        let max_end = end_a > end_b ? end_a : end_b;
        let shift = 0;

        for(x || (x = 0); x < max_end; x++){

            let found;

            if(x < end_b){

                const b_x = b[x];
                const ended = x >= end_a;
                let a_x;
                let b_x_key;
                let a_x_key;
                let proxy;

                if(SUPPORT_REACTIVE && this.proxy){

                    if(b_x[MIKADO_PROXY]){

                        proxy = this.fullproxy;
                    }
                    else{

                        b[x] = apply_proxy(this, a[x], b_x);
                    }
                }

                if(!ended){

                    a_x = a[x];
                    b_x_key = b_x[key];
                    a_x_key = a_x[MIKADO_TPL_KEY];

                    if(a_x_key === b_x_key){

                        proxy || this.update(a_x, b_x, state, x, 1);
                        continue;
                    }
                }

                if(ended || !live[b_x_key]){

                    // without pool enabled .add() is better than .replace()

                    if(ended || !this.pool){

                        end_a++;
                        max_end = end_a > end_b ? end_a : end_b;

                        this.add(b_x, state, x);
                    }
                    else{

                        // TODO replace iteratively performs pool size adjustment
                        this.replace(/** @type {!Element} */ (a_x), b_x, state, x);
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
                        if(idx_a >= idx_b + shift){

                            const tmp_a = a[idx_a - 1];

                            // when distance is 1 it will always move before, no predecessor check necessary
                            this.root.insertBefore(/** @type {Node} */ (tmp_a), /** @type {Node} */ (a_x));

                            proxy || this.update(tmp_a, b_x, state, x, 1);

                            // fast path optimization when distance is equal (skips finding on next turn)
                            if(idx_a === idx_b){

                                if((y - x) > 1){

                                    this.root.insertBefore(/** @type {Node} */ (a_x), /** @type {Node} */ (a[idx_a]));
                                }

                                a[x] = a[y];
                                a[y] = /** @type {!Element} */ (a_x);

                                if(DEBUG){

                                    // internal state validation
                                    if(!a_x) console.error("reconcile.error 1");
                                }

                                PROFILER && tick("view.reconcile.steps");
                            }
                            else{

                                if(DEBUG){

                                    // internal cursor validation
                                    if((idx_a - 1) === x) console.error("reconcile.error 2");
                                }

                                splice(a, idx_a - 1, x);
                                //a.splice(x, 0, a.splice(idx_a - 1, 1)[0]);

                                shift++;
                            }

                            PROFILER && tick("view.reconcile.steps");
                        }
                        // shift down (move current => target)
                        else{

                            const index = idx_b - 1 + shift;

                            // distance is always greater than 1, no predecessor check necessary
                            this.root.insertBefore(/** @type {Node} */ (a_x), /** @type {Node} */ (a[index]) || null);

                            if(DEBUG){

                                if(((index > end_a ? end_a : index) - 1) === x) console.error("reconcile.error 3");
                            }

                            splice(a, x, (index > end_a ? end_a : index) - 1);
                            //a.splice(/* one is removed: */ index - 1, 0, a.splice(x, 1)[0]);

                            shift--;
                            x--;

                            PROFILER && tick("view.reconcile.steps");
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

    PROFILER && tick("splice");

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

        PROFILER && tick("view.append");
        //profiler_start("append");

        let has_index;

        if(typeof state === "number"){

            index = state < 0 ? this.length + state : state;
            state = null;
            has_index = 1;
        }
        else if(typeof index === "number"){

            if(index < 0) index += this.length;
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

        PROFILER && tick("view.clear");

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

            index = length + index;
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

    // Reverse is applied in order to use push/pop rather than shift/unshift.
    // When no keyed pool is used a proper order of items will:
    // 1. optimize the pagination of content (forward, backward)
    // 2. optimize toggling the count of items per page (list resizing)
    // 3. optimize folding of content (show more, show less)
    // 4. optimize filtering state of content (filter on, filter off)
    // 5. optimize initializing with the last view state (close view, open view)

    const reverse = SUPPORT_POOLS && this.pool && (!SUPPORT_KEYED || !this.key);
    const checkout = (SUPPORT_KEYED || SUPPORT_POOLS) && (this.key || this.pool);
    const callback = SUPPORT_CALLBACKS && this.on && this.on["remove"];
    let adjust_pool = SUPPORT_POOLS && SUPPORT_KEYED && this.key && this.pool;

    if(adjust_pool && count >= adjust_pool){

        this.pool_keyed = new Map();
        //this.pool_keyed.clear();
        adjust_pool = 0;
    }

    for(let x = 0, node; x < count; x++){

        PROFILER && tick("view.remove");

        node = nodes[reverse ? count - x - 1 : x];
        length && node.remove();
        checkout && this.checkout(node, /* skip pool resize */ 1);
        callback && callback(node, this);
    }

    if(adjust_pool && (adjust_pool = this.pool_keyed.size - adjust_pool) > 0){

        const keys = this.pool_keyed.keys();

        while(adjust_pool--){

            this.pool_keyed.delete(keys.next().value);
        }
    }

    this.length = length;

    //profiler_end("remove");

    return this;
};

/**
 * @param {Element} node
 * @return {number}
 * @const
 */

Mikado.prototype.index = function(node){

    PROFILER && tick("view.index");
    return node ? this.dom.indexOf(node) : -1;
};

/**
 * @param {number} index
 * @return {Element}
 * @const
 */

Mikado.prototype.node = function(index){

    PROFILER && tick("view.node");
    return this.dom[index];
};

if(SUPPORT_KEYED || SUPPORT_POOLS){

    /**
     * @param {Element} node
     * @param {?number=} _skip_resize
     * @private
     * @const
     */

    Mikado.prototype.checkout = function(node, _skip_resize){

        PROFILER && tick("view.checkout");

        let key;

        if(SUPPORT_KEYED && this.key){

            key = node[MIKADO_TPL_KEY];
            // remove from live-pool
            this.live[key] = null;
        }

        if(SUPPORT_POOLS && this.pool){

            if(key){

                PROFILER && tick("pool.in");

                // always adding to keyed shared-pool increases the probability of matching keys
                // but requires resizing of limited pools
                this.pool_keyed.set(key, node);

                if(!_skip_resize && /*this.pool !== true &&*/ (this.pool_keyed.size > this.pool)){

                    PROFILER && tick("pool.resize");

                    this.pool_keyed.delete(
                        (/*this.pool_keyed._keys ||*/ this.pool_keyed.keys()).next().value
                    );
                }
            }
            else{

                const length = this.pool_shared.length;

                //if(this.pool === true || (length < this.pool)){

                    PROFILER && tick("pool.in");

                    // add to non-keyed shared-pool
                    this.pool_shared[length] = node;
                //}
            }
        }
    };
}

if(SUPPORT_POOLS){

    Mikado.prototype.flush = function(){

        PROFILER && tick("view.flush");

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

    PROFILER && tick("view.destroy");

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
