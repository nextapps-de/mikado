// COMPILER BLOCK -->
import { MIKADO_NODE_CACHE, PROFILER } from "./config.js";
import { tick } from "./profiler.js";
// <-- COMPILER BLOCK

const regex_css = /[^;:]+/g;
const regex_class = /[ ]+/g;

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {*} text
 */

export function setText(node, text){

    let cache = node[MIKADO_NODE_CACHE], child, tmp;

    if(cache){

        tmp = cache["_t"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== text){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.text");

        cache["_t"] = text;

        if((node.nodeType === 3 && (child = node)) || (child = node.firstChild)){

            child.nodeValue = /** @type {string} */ (text);
        }
        else{

            node.textContent = text;
        }
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element|Node} node
 * @return {string}
 */

export function getText(node){

    let cache = node[MIKADO_NODE_CACHE], child, tmp;

    if(cache){

        tmp = cache["_t"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.text");

        if((node.nodeType === 3 && (child = node)) || (child = node.firstChild)){

            cache["_t"] = tmp = child.nodeValue;
        }
        else{

            cache["_t"] = tmp = node.textContent;
        }
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp;
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string|Object<string, string>} attr
 * @param {string|number|boolean=} value
 */

export function setAttribute(node, attr, value){

    let cache = node[MIKADO_NODE_CACHE];

    if(!cache){

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof attr === "object"){

        for(let key in attr){

            _setAttribute(node, key, attr[key], cache);
        }
    }
    else{

        _setAttribute(node, attr, /** @type {string} */ (value), cache);
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @param {string|number|boolean} value
 * @param {Object=} cache
 */

function _setAttribute(node, attr, value, cache){

    if(cache["_a" + attr] !== value){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.attr");

        cache["_a" + attr] = value;

        value !== false
            ? node.setAttribute(attr, value)
            : node.removeAttribute(attr);
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element} node
 * @param {string|Array<string>} arr
 */

export function removeAttribute(node, arr){

    let cache = node[MIKADO_NODE_CACHE];

    if(!cache){

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof arr === "object"){

        for(let i = 0; i < arr.length; i++){

            _removeAttribute(node, arr[i], cache);
        }
    }
    else{

        _removeAttribute(node, /** @type {string} */ (arr), cache);
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @param {Object=} cache
 */

function _removeAttribute(node, attr, cache){

    if(cache["_a" + attr] !== false){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.attr");

        cache["_a" + attr] = false;
        node.removeAttribute(attr);
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @return {string|null}
 */

export function getAttribute(node, attr){

    let cache, tmp;

    if((cache = node[MIKADO_NODE_CACHE])){

        tmp = cache["_a" + attr];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.attr");

        cache["_a" + attr] = tmp = node.getAttribute(attr);
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp;
}

/**
 * @param {Element} node
 * @param {string} attr
 * @return {boolean}
 */

export function hasAttribute(node, attr){

    const tmp = getAttribute(node, attr);
    return !(!tmp && tmp !== "");
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function setClass(node, classname){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_c"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof classname === "object"){

        classname = classname.join(" ");
    }

    if(tmp !== classname){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        cache["_c"] = classname;
        node.className = classname;
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element} node
 * @return {Array<string>}
 */

export function getClass(node){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_c"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        cache["_c"] = tmp = node.className;
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp.split(regex_class);
}

/**
 * @param {Element} node
 * @return {Object}
 */

function transformClassCache(node){

    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache["_c"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(!tmp){

        return cache["_c"] = {};
    }

    if(typeof tmp === "string"){

        PROFILER && tick("cache.transform");

        const matches = tmp.split(regex_class);
        cache["_c"] = tmp = {};

        for(let i = 0; i < matches.length; i++){

            tmp[matches[i]] = 1;
        }
    }

    return tmp;
}

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function addClass(node, classname){

    const cache = transformClassCache(node);

    if(typeof classname === "object"){

        for(let i = 0; i < classname.length; i++){

            _addClass(node, classname[i], cache);
        }
    }
    else{

        _addClass(node, classname, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {Object=} cache
 */

function _addClass(node, classname, cache){

    const tmp = cache[classname];

    if(!tmp){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        cache[classname] = 1;
        node.classList.add(classname);
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function removeClass(node, classname){

    const cache = transformClassCache(node);

    if(typeof classname === "object"){

        for(let i = 0; i < classname.length; i++){

            _removeClass(node, classname[i], cache);
        }
    }
    else{

        _removeClass(node, classname, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {Object=} cache
 */

function _removeClass(node, classname, cache){

    const tmp = cache[classname];

    if(tmp !== 0){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        cache[classname] = 0;
        node.classList.remove(classname);
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @return {boolean}
 */

export function hasClass(node, classname){

    const cache = transformClassCache(node);
    let tmp = cache[classname];

    if(typeof tmp !== "number"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        cache[classname] = tmp = node.classList.contains(classname) ? 1 : 0;
    }
    else{

        PROFILER && tick("cache.match");
    }

    return !!tmp;
}

/**
 * @param {Element} node
 * @param {string|Array<string>|Object<string, boolean|number>} classname
 * @param {boolean|number|undefined=} state
 */

export function toggleClass(node, classname, state){

    const cache = transformClassCache(node);

    if(typeof classname === "object"){

        if(classname.constructor === Array){

            for(let i = 0; i < classname.length; i++){

                _toggleClass(node, /** @type {string} */ (classname[i]), state, cache);
            }
        }
        else{

            for(let key in classname){

                _toggleClass(node, key, /** @type {boolean|number} */ (classname[key]), cache);
            }
        }
    }
    else{

        _toggleClass(node, /** @type {string} */ (classname), state, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {boolean|number|undefined=} state
 * @param {Object=} cache
 */

function _toggleClass(node, classname, state, cache){

    let tmp = !!cache[classname];

    state = typeof state === "undefined" ? !tmp : !!state;

    if(tmp !== state){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        cache[classname] = state ? 1 : 0;
        state ? node.classList.add(classname)
              : node.classList.remove(classname);
    }
    else{

        PROFILER && tick("cache.match");
    }
}

// -------------------------------------------------------------

/**
 * @param {HTMLElement} node
 * @param {string} css
 */

export function setCss(node, css){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_s"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== css){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.style");

        cache["_s"] = css;
        node.style.cssText = css;

        // const arr = css.match(regex_css);
        //
        // for(let i = 0, key, val; i < arr.length; i+=2){
        //
        //     //_style.setProperty(arr[i], arr[i+1]);
        //
        //     key = arr[i];
        //     val = arr[i + 1];
        //
        //     if(_cache["_s" + key] !== val){
        //
        //         _cache["_s" + key] = val;
        //         (_style || (_style = node.style)).setProperty(key, val);
        //     }
        // }
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {HTMLElement} node
 * @return {string}
 */

export function getCss(node){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_s"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.css");

        cache["_s"] = tmp = node.style.cssText;
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp;
}

/**
 * @param {Element} node
 * @return {Object}
 */

function transformStyleCache(node){

    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache["_s"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(!tmp){

        return cache["_s"] = {};
    }

    if(typeof tmp === "string"){

        PROFILER && tick("cache.transform");

        const matches = tmp.match(regex_css);
        cache["_s"] = tmp = {};

        for(let i = 0; i < matches.length; i+=2){

            tmp[matches[i]] = matches[i + 1];
        }
    }

    return tmp;
}

/**
 * @param {HTMLElement} node
 * @param {string|Object<string, string|number>} property
 * @param {string|number=} value
 */

export function setStyle(node, property, value){

    const cache = transformStyleCache(node);
    const prop = node.style;

    if(typeof property === "object"){

        for(const style in property){

            _setStyle(node, style, property[style], prop, cache);
        }
    }
    else{

        _setStyle(node, property, /** @type {string} */ (value), prop, cache);
    }
}

/**
 * @param {HTMLElement} node
 * @param {string} property
 * @param {string|number} value
 * @param {CSSStyleDeclaration} _style
 * @param {Object=} cache
 */

function _setStyle(node, property, value, _style, cache){

    if(cache[property] !== value){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.style");

        cache[property] = value;
        (_style || node.style).setProperty(property, /** @type {string} */ (value));
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {HTMLElement} node
 * @param {string} property
 * @return {string}
 */

export function getStyle(node, property){

    const cache = transformStyleCache(node);
    let tmp = cache[property];

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.style");

        cache[property] = tmp = node.style.getPropertyValue(property);
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp;
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string} html
 */

export function setHtml(node, html){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_h"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== html){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.html");

        node.innerHTML = html;
        cache["_h"] = html;
        cache["_t"] = null;
    }
    else{

        PROFILER && tick("cache.match");
    }
}

/**
 * @param {Element} node
 * @return {string}
 */

export function getHtml(node){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_h"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.html");

        cache["_h"] = tmp = node.innerHTML
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp;
}
