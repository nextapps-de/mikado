/**
 * Mikado.js
 * Copyright 2019 Nextapps GmbH
 * Author: Thomas Wilkerling
 * Licence: Apache-2.0
 * https://github.com/nextapps-de/mikado
 */

"use strict";

//import { profiler_start, profiler_end } from "./profiler.js";

const { requestAnimationFrame, cancelAnimationFrame } = window;

/**
 * @type {Object<string, Template>}
 */

const templates = {};
const events = {};
const listener = {};

/**
 * @param {HTMLElement|Template} root
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
        root = options["root"];
        template = options["template"];
    }

    if(DEBUG){

        if(!template){

            console.error("Initialization Error: Template is not defined.");
        }
    }

    if(typeof template === "string"){

        template = templates[template];
    }
    else{

        Mikado.register(template);
    }

    if(ENABLE_CACHE){

        this.cache = !options || (options["cache"] !== false);
    }

    this.async = options && options["async"];
    this.reuse = !options || (options["reuse"] !== false);

    if(!BUILD_LIGHT){

        const store = options && options["store"];
        this.store = store && (typeof store === "object" ? store : []);
        //this.index = store && options && options["index"];
    }

    if(root){

        this.mount(root);
    }

    this.init(template);
}

Mikado["register"] = function(name, tpl){

    if(!tpl){

        tpl = name;
        name = tpl["n"];
    }

    templates[name] = tpl;
};

Mikado["new"] = function(root, template, options){

    return new this(root, template, options);
};

Mikado.prototype.mount = function(target){

    if(this.target !== target){

        this.target = target;
        this.dom = target["_dom"] || (target["_dom"] = collection_to_array(target.children));
        this.length = this.dom.length;
    }

    return this;
};

/**
 * @dict
 */

const event_types = {

    "change": 1,
    "click": 1,
    "dblclick": 1,
    "input": 1,
    "keydown": 1,
    "keypress": 1,
    "keyup": 1,
    "mousedown": 1,
    "mouseenter": 1,
    "mouseleave": 1,
    "mousemove": 1,
    "mouseout": 1,
    "mouseover": 1,
    "mouseup": 1,
    "mousewheel": 1,
    "touchstart": 1,
    "touchmove": 1,
    "touchend": 1,
    "touchcancel": 1,
    "reset": 1,
    "select": 1,
    "submit": 1,
    "toggle": 1,
    "blur": 1,
    "error": 1,
    "focus": 1,
    "load": 1,
    "resize": 1,
    "scroll": 1
};

if(!BUILD_LIGHT){

    const body = document.body;

    function handler(event, _type){

        const event_target = event.target;
        const type = _type || event.type;
        let target = event_target;
        let id = event_target["_event_" + type];

        if(!id){

            while(target !== body){

                id = target.getAttribute(type);

                if(id){

                    if(id.indexOf(":") !== -1){

                        const cmp = id.split(":");
                        const root = cmp[1];

                        id = 0;
                        target = target.parentElement;

                        while(target !== body){

                            if(target.hasAttribute(root)){

                                id = cmp[0];
                                break;
                            }

                            target = target.parentElement;
                        }
                    }

                    break;
                }

                target = target.parentElement;
            }

            if(!id){

                return;
            }

            event_target["_event_" + type] = id;
            event_target["_root_" + type] = target;
        }
        else{

            target = event_target["_root_" + type];
        }

        const fn = listener[id];

        if(fn){

            fn(target);

            event.stopPropagation();
        }
        else if(DEBUG){

            console.warn("Route: '" + id + "', Event: '" + type + "' is undefined.");
        }
    }

    Mikado.prototype.route = function(id, fn){

        listener[id] = fn;
        return this;
    };

    let has_click, has_moved;

    function handler_down(event){

        has_click = (event.which || event.button) < 2 ? event.target : null;

        if(has_click){

            event.stopPropagation();
        }
    }
    //function handler_move(){ has_moved = true }
    function handler_end(event){

        if(has_click === event.target){

            handler.call(this, event, "click");
            // apply inline listeners
            event.target["click"] && event.target["click"]();
        }
    }

    const has_touch = ("ontouchstart" in window) || navigator["msMaxTouchPoints"];

    /**
     * @param event
     * @param {Object|boolean=} options
     * @returns {Mikado}
     */

    Mikado.prototype.listen = function(event, options){

        if(!events[event]){

            if(event === "click"){

                register_click(1);
            }
            else{

                register_event(1, event, handler, options || true);
            }

            events[event] = 1;
        }

        return this;
    };

    /**
     * @param event
     * @param {Object|boolean=} options
     * @returns {Mikado}
     */

    Mikado.prototype.unlisten = function(event, options){

        if(events[event]){

            if(event === "click"){

                register_click(0);
            }
            else{

                register_event(0, event, handler, options || true);
            }

            events[event] = 0;
        }

        return this;
    };

    function register_click(add_or_remove){

        register_event(add_or_remove, has_touch ? "touchstart" : "mousedown", handler_down, false);
        //register_event(add_or_remove, has_touch ? "touchmove" : "mousemove", handler_move, 0);
        register_event(add_or_remove, has_touch ? "touchend" : "mouseup", handler_end, false);
    }

    /**
     * @param add_or_remove
     * @param type
     * @param handler
     * @param {EventListenerOptions|boolean=} options
     */

    function register_event(add_or_remove, type, handler, options){

        window[(add_or_remove ? "add": "remove") + "EventListener"](
            type,
            handler,
            options || {
                "passive": true,
                "capture": true
            }
        );
    }
}

Mikado.prototype.sync = function(){

    this.target["_dom"] = this.dom = collection_to_array(this.target.children);
    this.length = this.dom.length;

    return this;
};

Mikado.prototype.index = function(node){

    return node["_idx"];
};

Mikado.prototype.get = function(index){

    return this.dom[index];
};

let id_counter = 0;

Mikado.prototype.init = function(template){

    if(this.template !== template){

        this.template = template;
        this.id = ++id_counter;
        this.vpath = null;
        this.update_path = null;
        this.clone = null;
        this.static = true;
    }

    this.state = {};

    return this;
};

function collection_to_array(collection){

    let length = collection.length;
    const array = new Array(length);

    for(let i = 0, item; i < length; i++) {

        item = collection[i];
        item["_idx"] = i;
        array[i] = item;
    }

    return array;
}

Mikado.prototype.create = function(data, view, index){

    //profiler_start("create");

    let clone = this.clone;

    if(!clone){

        this.clone = clone = this.parse(this.template);
    }

    if(!this.static){

        this.update_path(clone["_path"], data, index, view);
    }

    const tmp = clone.cloneNode(true);

    //profiler_end("create");

    return tmp;
};

//const raf = window.requestAnimationFrame;

let timer;

/**
 * @param {Array<*>|Function=} items
 * @param {Object|Function=} view
 * @param {Function=} callback
 * @param {boolean=} skip_async
 * @returns {Mikado|Promise}
 */

Mikado.prototype.render = function(items, view, callback, skip_async){

    if(!BUILD_LIGHT && !items){

        items = this.store;
    }
    else if(typeof items === "function"){

        callback = items;

        if(!BUILD_LIGHT){

            items = this.store;
        }
    }
    else if(typeof view === "function"){

        callback = view;
        view = null;
    }

    if(!skip_async){

        if(callback){

            const self = this;

            timer = requestAnimationFrame(function(){

                timer = null;
                self.render(items, view, null, true);

                if(typeof callback === "function"){

                    callback();
                }
            });

            return this;
        }

        if(this.async){

            const self = this;

            return new Promise(function(resolve){

                timer = requestAnimationFrame(function(){

                    timer = null;
                    self.render(items, view, null, true);
                    resolve();
                });
            });
        }
    }

    //profiler_start("render");

    const id = this.target["_tpl"];

    if(id){

        if(id !== this.id){

            this.target["_tpl"] = this.id;
            this.clear();
        }
    }
    else{

        this.target["_tpl"] = this.id;
    }

    if(items){

        let count = items.length;
        let fragment;

        // add or update

        for(let x = 0, node, item; x < count; x++){

            item = items[x];

            if((node = this.dom[x])){

                if(this.reuse){

                    this.update(node, item, view, x);
                }
                else{

                    this.replace(node, item, view, x);
                }
            }
            else{

                this.add(item, view, fragment || (fragment = document.createDocumentFragment()));
            }
        }

        if(fragment){

            this.target.appendChild(fragment);
        }

        // reduce

        if(count < this.length){

            if(!BUILD_LIGHT && this.store){

                this.store.splice(count);
            }

            const nodes = this.dom.splice(count);
            this.length = count;
            count = nodes.length;

            for(let x = 0; x < count; x++){

                this.target.removeChild(nodes[x]);
            }
        }
    }
    else{

        this.dom[0] || this.add();
    }

    //profiler_end("render");

    return this;
};

/**
 * @param {*=} item
 * @param {*=} view
 * @param {DocumentFragment=} target
 * @returns {Mikado}
 */

Mikado.prototype.add = function(item, view, target){

    //profiler_start("add");

    const length = this.length;
    const tmp = this.create(item, view, length);

    tmp["_idx"] = length;
    (target || this.target).appendChild(tmp);
    this.dom[length] = tmp;

    if(!BUILD_LIGHT && this.store){

        this.store[length] = item;
    }

    this.length++;

    //profiler_end("add");

    return this;
};

Mikado.prototype.clear = function(){

    //profiler_start("clear");

    this.target.textContent = "";
    this.target["_dom"] = this.dom = [];
    this.length = 0;

    if(!BUILD_LIGHT && this.store){

        // TODO: keep reference?
        this.store = [];
    }

    if(ENABLE_CACHE && this.cache){

        this.target["_html"] = null;
    }

    //profiler_end("clear");

    return this;
};

if(!BUILD_LIGHT){

    /**
     * @export
     */

    Mikado.prototype.cancel = function(){

        if(timer){

            cancelAnimationFrame(timer);
            timer = null;
        }
    };

    /**
     * @param {*=} items
     * @param {*=} view
     * @export
     */

    Mikado.prototype.append = function(items, view){

        //profiler_start("append");

        const count = items.length;

        for(let x = 0; x < count; x++){

            this.add(items[x], view);
        }

        //profiler_end("append");

        return this;
    };

    /**
     * @export
     */

    Mikado.prototype.remove = function(node){

        //profiler_start("remove");

        const index = node["_idx"];

        this.dom.splice(index, 1);
        this.target.removeChild(node);
        this.length--;

        if(!BUILD_LIGHT && this.store){

            this.store.splice(index, 1);
        }

        for(let i = index; i < this.length; i++){

            this.dom[i]["_idx"] = i;
        }

        //profiler_end("remove");

        return this;
    };

    /**
     * @export
     */

    Mikado.prototype.up = function(a){

        const index = a["_idx"];

        if(index){

            const a = this.dom[index];
            const b = this.dom[index - 1];

            this.target.insertBefore(a, b);

            a["_idx"] = index - 1;
            b["_idx"] = index;

            this.dom[index] = b;
            this.dom[index - 1] = a;

            if(!BUILD_LIGHT && this.store){

                const tmp = this.store[index - 1];

                this.store[index - 1] = this.store[index];
                this.store[index] = tmp;
            }
        }
    };

    /**
     * @export
     */

    Mikado.prototype.down = function(a){

        const index = a["_idx"];

        if(index < this.length - 1){

            const a = this.dom[index];
            const b = this.dom[index + 1];

            if(index === this.length - 2){

                this.target.appendChild(a);
            }
            else{

                this.target.insertBefore(a, b);
            }

            a["_idx"] = index + 1;
            b["_idx"] = index;

            this.dom[index] = b;
            this.dom[index + 1] = a;

            if(!BUILD_LIGHT && this.store){

                const tmp = this.store[index + 1];

                this.store[index + 1] = this.store[index];
                this.store[index] = tmp;
            }
        }
    };

    /**
     * @export
     */

    Mikado.prototype.first = function(a){

        const index = a["_idx"];

        if(index){

            this.target.insertBefore(a, this.dom[0]);
            const tmp = this.dom.splice(index, 1)[0];
            this.dom.unshift(tmp);

            for(let i = 0; i <= index; i++){

                this.dom[i]["_idx"] = i;
            }

            if(!BUILD_LIGHT && this.store){

                const tmp = this.store.splice(index, 1)[0];
                this.store.unshift(tmp);
            }
        }
    };

    /**
     * @export
     */

    Mikado.prototype.last = function(a){

        const index = a["_idx"];

        if(index < this.length - 1){

            this.target.appendChild(a);
            const tmp = this.dom.splice(index, 1)[0];
            this.dom.push(tmp);

            for(let i = index; i < this.length; i++){

                this.dom[i]["_idx"] = i;
            }

            if(!BUILD_LIGHT && this.store){

                const tmp = this.store.splice(index, 1)[0];
                this.store.push(tmp);
            }
        }
    };

    /**
     * @export
     */

    Mikado.prototype.swap = function(a, b){

        //profiler_start("swap");

        if(a !== b){

            const next = b.nextSibling;

            if(next === a){

                this.target.insertBefore(a, b);
            }
            else{

                this.target.insertBefore(b, a);

                if(next){

                    this.target.insertBefore(a, next);
                }
                else{

                    this.target.appendChild(a);
                }
            }

            const tmp_a = a["_idx"];
            const tmp_b = b["_idx"];

            a["_idx"] = tmp_b;
            b["_idx"] = tmp_a;

            this.dom[tmp_a] = b;
            this.dom[tmp_b] = a;

            if(!BUILD_LIGHT && this.store){

                const tmp = this.store[tmp_b];

                this.store[tmp_b] = this.store[tmp_a];
                this.store[tmp_a] = tmp;
            }
        }

        //profiler_end("swap");

        return this;
    };

    /**
     * @export
     */

    Mikado.prototype.replace = function(node, item, view, index){

        //profiler_start("replace");

        if(typeof index === "undefined"){

            index = node["_idx"];
        }

        const tmp = this.create(item, view, index);
        node.replaceWith(tmp);
        //this.target.replaceChild(tmp, node);
        this.dom[index] = tmp;

        if(!BUILD_LIGHT && this.store){

            this.store[index] = item;
        }

        //profiler_end("replace");

        return this;
    };

    /**
     * @param {Element} node
     * @param {*=} item
     * @param {*=} view
     * @param {number=} index
     * @export
     */

    Mikado.prototype.update = function(node, item, view, index){

        //profiler_start("update");

        if(!this.static){

            if(typeof index === "undefined"){

                index = node["_idx"];
            }

            if(!BUILD_LIGHT && this.store){

                if(item){

                    this.store[index] = item;
                }
                else{

                    item = this.store[index];
                }
            }

            this.update_path(node["_path"] || this.create_path(node), item, index, view);
        }

        //profiler_end("update");

        return this;
    };
}

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
let tmp_length;

/**
 * @param {Template|Array<Template>} tpl
 * @param {number=} index
 * @param {string=} path
 * @param {Array=} dom_path
 * @returns {Element}
 */

Mikado.prototype.parse = function(tpl, index, path, dom_path){

    //profiler_start("parse");

    const node = document.createElement(tpl["t"] || "div");

    if(!index){

        index = 0;
        path = "&";
        tmp_fn = "";
        this.vpath = [];
        node["_path"] = dom_path = [];
    }

    const style = tpl["s"];
    const child = tpl["i"];
    let text = tpl["x"];
    let html = tpl["h"];
    const attr = tpl["a"];
    let class_name = tpl["c"];
    const js = tpl["j"];
    let path_length = this.vpath.length;

    tmp_fn += ";self=p[" + path_length + "];";

    if(js){

        tmp_fn += js + ";";
    }

    if(ENABLE_CACHE && this.cache){

        tmp_fn += "this";
    }

    if(class_name){

        if(typeof class_name === "object"){

            tmp_fn += ENABLE_CACHE && this.cache ?

                "._setClass(self," + class_name[0] + ")"
            :
                "self.className=" + class_name[0] + ";";

            this.vpath[path_length] = path;
            dom_path[path_length++] = node;
            this.static = false;
        }
        else{

            node.className = class_name;
        }
    }

    if(attr){

        const keys = Object.keys(attr);
        let has_dynamic_values;

        for(let i = 0; i < keys.length; i++){

            const key = keys[i];
            let value = attr[key];

            if(typeof value === "object"){

                tmp_fn += ENABLE_CACHE && this.cache ?

                    "._setAttribute(self,'" + key + "'," + value[0] + ")"
                :
                    "self.setAttribute('" + key + "'," + value[0] + ");";

                has_dynamic_values = true;
            }
            else{

                node.setAttribute(key, value);
            }

            if(event_types[key]){

                this.listen(key);
            }
        }

        if(has_dynamic_values){

            this.vpath[path_length] = path;
            dom_path[path_length++] = node;
            this.static = false;
        }
    }

    if(style){

        if(typeof style === "string"){

            node.style.cssText = style;
        }
        else if(style.length){

            tmp_fn += ENABLE_CACHE && this.cache ?

                "._setCSS(self," + style[0] + ")"
            :
                "self.style.cssText=" + style[0] + ";";

            this.vpath[path_length] = path;
            dom_path[path_length++] = node;
        }
        else{

            const keys = Object.keys(style);
            let has_dynamic_values;

            for(let i = 0; i < keys.length; i++){

                const key = keys[i];
                const value = style[key];

                if(typeof value === "object"){

                    tmp_fn += ENABLE_CACHE && this.cache ?

                        "._setStyle(self,'" + key + "'," + value[0] + ")"
                    :
                        "self.style.setProperty('" + key + "'," + value[0] + ");";

                    has_dynamic_values = true;
                }
                else{

                    node.style.setProperty(key, value);
                }
            }

            if(has_dynamic_values){

                this.vpath[path_length] = path;
                dom_path[path_length++] = node;
                this.static = false;
            }
        }
    }

    if(child){

        if(child.length){

            let tmp = ">";

            for(let i = 0; i < child.length; i++){

                if(i){

                    tmp += "+";
                }

                node.appendChild(this.parse(child[i], index + i + 1, path + tmp, dom_path));
            }
        }
        else{

            node.appendChild(this.parse(child, index + 1, path + ">", dom_path));
        }
    }
    else{

        if(text){

            path += "|";

            const is_object = typeof text === "object";

            if(is_object){

                text = text[0];
            }

            let text_node = document.createTextNode(text);

            if(is_object){

                tmp_fn += ENABLE_CACHE && this.cache ?

                    "._setText(self," + text + ")"
                :
                    "self.nodeValue=" + text + ";";

                this.vpath[path_length] = path;
                dom_path[path_length++] = text_node;
                this.static = false;
            }

            node.appendChild(text_node);
        }
        else if(html){

            if(typeof html === "object"){

                html = html[0];
                tmp_fn += ENABLE_CACHE && this.cache ?

                    "._setHTML(self, " + html + ")"
                :
                    "self.innerHTML=" + html + ";";

                this.vpath[path_length] = path;
                dom_path[path_length++] = node;
                this.static = false;
            }
            else{

                node.innerHTML = html;
            }
        }
    }

    if(!index && !this.static){

        this.update_path = Function("p", "item", "index", "view", (

            tmp_fn ?

                '"use strict";var root=p[0],self' + tmp_fn //+ ';'
            :
                ""
        ));
    }

    //profiler_end("parse");

    return node;
};

// TODO: when rendering on a modified template all states hast to reset to its default template values

if(ENABLE_CACHE) Mikado.prototype["_setText"] = function(target, text){

    if(target["_text"] !== text){

        target.nodeValue = text;
        target["_text"] = text;
    }

    return this;
};

// TODO: when rendering on a modified template all states hast to reset to its default template values

if(ENABLE_CACHE) Mikado.prototype["_setHTML"] = function(target, html){

    if(target["_html"] !== html){

        target.innerHTML = html;
        target["_html"] = html;
    }

    return this;
};

// OK: when rendering on a modified template all states hast to reset to its default template values

if(ENABLE_CACHE) Mikado.prototype["_setClass"] = function(target, class_name){

    if(target["_class"] !== class_name){

        target.className = class_name;
        target["_class"] = class_name;
        target["_class_cache"] = null; // TODO: Xone compatibility
    }

    return this;
};

// Ok: when rendering on a modified template all states hast to reset to its default template values

if(ENABLE_CACHE) Mikado.prototype["_setStyle"] = function(target, style, value){

    const style_cache = target["_style_cache"] || (target["_style_cache"] = {});

    if(style_cache[style] !== value){

        style_cache[style] = value;
        (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
        target["_css"] = null;
    }

    return this;
};

/*
Mikado.prototype["_setStyle"] = function(target, style, value){

    const key = "_style_" + style;

    if(target[key] !== value){

        (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
        target[key] = value;
    }

    return this;
};
*/

// OK: when rendering on a modified template all states hast to reset to its default template values

if(ENABLE_CACHE) Mikado.prototype["_setCSS"] = function(target, style){

    if(target["_css"] !== style){

        (target["_style"] || (target["_style"] = target.style)).cssText = style;
        target["_css"] = style;
        target["_style_cache"] = null; // TODO: Xone Compatibility
    }

    return this;
};

// https://jsperf.com/data-dataset/43
// NOTE: when rendering on a modified template all states hast to reset to its default template values

if(ENABLE_CACHE) Mikado.prototype["_setAttribute"] = function(target, attr, value){

    const key = "_attr_" + attr;

    if(target[key] !== value){

        target.setAttribute(attr, value);
        target[key] = value;
    }

    return this;
};

if(!BUILD_LIGHT){

    /**
     * @export
     */

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

                    const tpl = JSON.parse(json);

                    Mikado.register(file, tpl);

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

    Mikado["load"] = Mikado.prototype.load;

    Mikado.prototype.shuffle = function(){

        const dom = this.dom;

        for(let i = dom.length - 1; i > 0; i--) {

            let j = (Math.random() * (i + 1)) | 0;
            let x = dom[i];
            dom[i] = dom[j];
            dom[j] = x;
        }

        return this;
    };
}

/** @export */
Mikado.prototype.render;
/** @export */
Mikado.prototype.mount;
/** @export */
Mikado.register;

/** @record */
function Template() {}
/** @type {!Template|Array<Template>} */
Template.prototype.i;
/** @type {!string|Array<string>} */
Template.prototype.h;
/** @type {!string|Array<string>} */
Template.prototype.x;
/** @type {!string|Object<string, string>|Array<Object<string, string>>} */
Template.prototype.s;
/** @type {!string|Array<string>} */
Template.prototype.p;
/** @type {!Object<string, string>} */
Template.prototype.a;
/** @type {!string|Array<string>} */
Template.prototype.c;
