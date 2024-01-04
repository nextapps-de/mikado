// COMPILER BLOCK -->
import { MIKADO_NODE_CACHE } from "./config.js";
// <-- COMPILER BLOCK

const regex_css = /[^;:]+/g;
const regex_class = /[ ]+/g;

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {*} text
 */

export function setText(node, text){

    // if(node.length && !node.tagName){
    //
    //     for(let i = 0; i < node.length; i++){
    //
    //         setText(node[i], text);
    //     }
    //
    //     return;
    // }

    let cache = node[MIKADO_NODE_CACHE], child, tmp;

    if(cache){

        tmp = cache["_t"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== text){

        cache["_t"] = text;

        if((node.nodeType === 3 && (child = node)) || (child = node.firstChild)){

            child.nodeValue = /** @type {string} */ (text);
        }
        else{

            node.textContent = text;
        }
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

        if((node.nodeType === 3 && (child = node)) || (child = node.firstChild)){

            cache["_t"] = tmp = child.nodeValue;
        }
        else{

            cache["_t"] = tmp = node.textContent;
        }
    }

    return tmp;
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {Object<string, string>} obj
 */

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

        cache["_a" + attr] = value;

        value !== false
            ? node.setAttribute(attr, value)
            : node.removeAttribute(attr);
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

        cache["_a" + attr] = false;
        node.removeAttribute(attr);
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

        cache["_a" + attr] = tmp = node.getAttribute(attr);
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

        cache["_c"] = classname;
        node.className = classname;
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

        cache["_c"] = tmp = node.className;
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

        cache[classname] = 1;
        node.classList.add(classname);
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

        cache[classname] = 0;
        node.classList.remove(classname);
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

        cache[classname] = tmp = node.classList.contains(classname) ? 1 : 0;
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

        cache[classname] = state ? 1 : 0;
        state ? node.classList.add(classname)
            : node.classList.remove(classname);
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

        cache["_s"] = tmp = node.style.cssText;
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

        cache[property] = value;
        (_style || node.style).setProperty(property, /** @type {string} */ (value));
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

        cache[property] = tmp = node.style.getPropertyValue(property);
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

        node.innerHTML = html;
        cache["_h"] = html;
        cache["_t"] = null;
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

        cache["_h"] = tmp = node.innerHTML
    }

    return tmp;
}

//
// export function setText(target, text){
//
//     text += "";
//
//     if(target.nodeType !== 3){
//
//         target["_html"] = null;
//         target = target.firstChild || target.appendChild(document.createTextNode(target["_text"] = text));
//     }
//
//     if(target["_text"] !== text){
//
//         target.nodeValue = text;
//         target["_text"] = text;
//     }
//
//     return this;
// }
//
// export function getText(target){
//
//     if((target.nodeType !== 3) && !(target = target.firstChild)){
//
//         return "";
//     }
//
//     const tmp = target["_text"];
//
//     return (
//
//         tmp || (tmp === "") ?
//
//             tmp
//         :
//             target["_text"] = target.nodeValue
//     );
// }
//
// export function setHTML(target, html){
//
//     html += "";
//
//     if(target["_html"] !== html){
//
//         target.innerHTML = html;
//         target["_html"] = html;
//     }
//
//     return this;
// }
//
// export function getHTML(target){
//
//     const tmp = target["_html"];
//
//     return (
//
//         tmp || (tmp === "") ?
//
//             tmp
//         :
//             target["_html"] = target.innerHTML
//     );
// }
//
// const regex_cache = {};
//
// function regex(classname){
//
//     return regex_cache[classname] = new RegExp("(?:^|\\s)" + classname + "(?!\\S)", "g");
// }
//
// /*
// function createClassCache(node){
//
//     const class_list = node.classList;
//     const cache = {};
//     const length = class_list.length;
//
//     for(let a = 0; a < length; a++){
//
//         cache[class_list[a]] = 1;
//     }
//
//     node["_class_cache"] = cache;
//     node["_class_list"] = class_list;
//
//     return cache;
// }
// */
//
// export function addClass(target, classname){
//
//     if(!hasClass(target, classname)){
//
//         target.className += " " + classname;
//         target["_class"] += " " + classname;
//     }
//
//     // if(!(target["_class_cache"] || createClassCache(target))[classname]){
//     //
//     //     target["_class_cache"][classname] = 1;
//     //     target["_class_list"].add(classname);
//     //     target["_class"] = void 0;
//     // }
//
//     return this;
// }
//
// export function removeClass(target, classname){
//
//     const new_class = (target["_class"] || (target["_class"] = target.className)).replace(regex_cache[classname] || regex(classname) , "");
//
//     if(target["_class"] !== new_class){
//
//         target.className = new_class;
//         target["_class"] = new_class;
//     }
//
//     // if((target["_class_cache"] || createClassCache(target))[classname]){
//     //
//     //     target["_class_cache"][classname] = 0;
//     //     target["_class_list"].remove(classname);
//     //     target["_class"] = void 0;
//     // }
//
//     return this;
// }
//
// export function setClass(target, classname){
//
//     if(target["_class"] !== classname){
//
//         target.className = classname;
//         target["_class"] = classname;
//         //target["_class_cache"] = null;
//     }
//
//     return this;
// }
//
// export function getClass(target){
//
//     const tmp = target["_class"];
//
//     return (
//
//         tmp || (tmp === "") ?
//
//             tmp
//         :
//             target["_class"] = target.className
//     );
// }
//
// export function hasClass(target, classname){
//
//     return !!(target["_class"] || (target["_class"] = target.className)).match(regex_cache[classname] || regex(classname));
//     //return !!(target["_class_cache"] || createClassCache(target))[classname];
// }
//
// export function toggleClass(target, classname){
//
//     if(hasClass(target, classname)){
//
//         removeClass(target, classname);
//     }
//     else{
//
//         addClass(target, classname);
//     }
//
//     // (target["_class_cache"] || createClassCache(target))[classname] = !target["_class_cache"][classname];
//     // target["_class_list"].toggle(classname);
//     // target["_class"] = null;
//
//     return this;
// }
//
// /*
// export function setStyle(target, style, value){
//
//     const style_cache = target["_style_cache"] || (target["_style_cache"] = {});
//
//     if(style_cache[style] !== value){
//
//         style_cache[style] = value;
//         (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
//         target["_css"] = null;
//     }
//
//     return this;
// }
//
// export function getStyle(target, style){
//
//     const style_cache = target["_style_cache"] || (target["_style_cache"] = {});
//
//     return (
//
//         typeof style_cache[style] === "undefined" ?
//
//             style_cache[style] = (target["_style"] || (target["_style"] = target.style)).getPropertyValue(style)
//         :
//             style_cache[style]
//     );
// }
// */
//
// export function setCSS(target, style){
//
//     if(target["_css"] !== style){
//
//         (target["_style"] || (target["_style"] = target.style)).cssText = style;
//         target["_css"] = style;
//         //target["_style_cache"] = null;
//     }
//
//     return this;
// }
//
// export function getCSS(target){
//
//     const tmp = target["_css"];
//
//     return (
//
//         tmp || (tmp === "") ?
//
//             tmp
//         :
//             target["_css"] = target/*(target["_style"] || (target["_style"] = target.style))*/.getAttribute("style")
//     );
// }
//
// export function setAttribute(target, attr, value){
//
//     const cache = target["_attr"] || (target["_attr"] = {});
//
//     if(cache[attr] !== value){
//
//         target.setAttribute(attr, value);
//         cache[attr] = value;
//     }
//
//     return this;
// }
//
// export function getAttribute(target, attr){
//
//     const cache = target["_attr"] || (target["_attr"] = {});
//     const tmp = cache[attr];
//
//     return (
//
//         tmp || (tmp === "") ?
//
//             tmp
//         :
//             cache[attr] = target.getAttribute(attr)
//     );
// }
//
// export function hasAttribute(target, attr){
//
//     const tmp = getAttribute(target, attr);
//
//     return !!tmp || (tmp === "");
// }
//
// export function removeAttribute(target, attr){
//
//     const cache = target["_attr"] || (target["_attr"] = {});
//
//     if(cache[attr] !== null){
//
//         target.removeAttribute(attr);
//         cache[attr] = null;
//     }
//
//     return this;
// }