// COMPILER BLOCK -->
import { MIKADO_NODE_CACHE, PROFILER } from "./config.js";
import { tick } from "./profiler.js";
// <-- COMPILER BLOCK
import { NodeCache } from "./type.js";
import { idl_attributes } from "./factory.js";

const regex_css = /[^;:]+/g;
const regex_class = / +/;

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string|number} text
 */

export function setText(node, text){

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let child, tmp;

    if(cache){

        tmp = cache._t;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== text){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.text");

        cache._t = text;
        cache._h = null;
        child = node.firstChild;

        if(child /*(node.nodeType === 3 && (child = node)) || (child = node.firstChild)*/){

            child.nodeValue = /** @type {string} */ (text);
        }
        else{

            node.appendChild(document.createTextNode(text));
            //node.textContent = text;
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let child, tmp;

    if(cache){

        tmp = cache._t;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.text");

        child = node.firstChild;
        cache._t = tmp = child ? child.nodeValue : "";

        // if(child /*(node.nodeType === 3 && (child = node)) || (child = node.firstChild)*/){
        //
        //     cache._t = tmp = child.nodeValue;
        // }
        // else{
        //
        //     cache._t = tmp = ""; //node.textContent;
        // }
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

    /** @type {NodeCache} */
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
 * @param {NodeCache=} cache
 */

function _setAttribute(node, attr, value, cache){

    if(cache["_a" + attr] !== value){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.attr");

        cache["_a" + attr] = value;

        if(idl_attributes[attr]){

            node[attr] = value;
        }
        else{

            value === false
                ? node.removeAttribute(attr)
                : node.setAttribute(attr, value);
        }
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

    /** @type {NodeCache} */
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
 * @param {NodeCache=} cache
 */

function _removeAttribute(node, attr, cache){

    if(cache["_a" + attr] !== false){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.attr");

        cache["_a" + attr] = false;

        if(idl_attributes[attr]){

            node[attr] = false;
        }
        else{

            node.removeAttribute(attr);
        }
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache["_a" + attr];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.attr");

        if(idl_attributes[attr]){

            tmp = node[attr];
        }
        else{

            tmp = node.getAttribute(attr);
        }

        cache["_a" + attr] = tmp;
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
    return !!(tmp || tmp === "");
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function setClass(node, classname){

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._c;
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

        cache._c = classname;
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._c;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.class");

        // TODO do not transform back
        cache._c = tmp = node.className;
    }
    else{

        PROFILER && tick("cache.match");
    }

    tmp = tmp.split(regex_class);
    return tmp[0] === "" ? [] : tmp;
}

/**
 * @param {Element} node
 * @return {Object}
 */

function transformClassCache(node){

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._c;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(!tmp){

        return cache._c = {};
    }

    if(typeof tmp === "string"){

        PROFILER && tick("cache.transform");

        const matches = tmp.trim().split(regex_class);
        cache._c = tmp = {};

        for(let i = 0, match; i < matches.length; i++){

            match = matches[i];
            match && (tmp[matches[i]] = 1);
        }
    }

    return /** @type {Object} */ (tmp);
}

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function addClass(node, classname){

    /** @type {Object<string, string|number>} */
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._s;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== css){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.style");

        cache._s = css;
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._s;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.css");

        cache._s = tmp = node.style.cssText;
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._s;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(!tmp){

        return cache._s = {};
    }

    if(typeof tmp === "string"){

        PROFILER && tick("cache.transform");

        const matches = tmp.match(regex_css);
        cache._s = tmp = {};

        for(let i = 0; i < matches.length; i += 2){

            tmp[matches[i].trim()] = matches[i + 1].trim();
        }
    }

    return /** @type {Object} */ (tmp);
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._h;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== html){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.html");

        node.innerHTML = html;
        cache._h = html;
        cache._t = null;
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

    /** @type {NodeCache} */
    let cache = node[MIKADO_NODE_CACHE];
    let tmp;

    if(cache){

        tmp = cache._h || cache._t;
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(typeof tmp !== "string"){

        PROFILER && tick("cache.miss");
        PROFILER && tick("cache.html");

        cache._h = tmp = node.innerHTML;
    }
    else{

        PROFILER && tick("cache.match");
    }

    return tmp;
}
