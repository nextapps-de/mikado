// COMPILER BLOCK -->
import { MIKADO_NODE_CACHE } from "./config.js";
// <-- COMPILER BLOCK

const regex_css = /[^;:]+/g;
const regex_class = /[^ ]+/g;

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

export function setAttributes(node, obj){

    // if(node.length && !node.tagName){
    //
    //     for(let i = 0; i < node.length; i++){
    //
    //         setAttributes(node[i], obj);
    //     }
    //
    //     return;
    // }

    let cache = node[MIKADO_NODE_CACHE];

    if(!cache){

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    for(let attr in obj){

        setAttribute(node, attr, obj[attr], cache);
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @param {string|number|boolean} value
 * @param {Object=} _cache
 */

export function setAttribute(node, attr, value, _cache){

    let tmp;

    if(_cache || (_cache = node[MIKADO_NODE_CACHE])){

        tmp = _cache["_a" + attr];
    }
    else{

        node[MIKADO_NODE_CACHE] = _cache = {};
    }

    if(tmp !== value){

        _cache["_a" + attr] = value;

        value !== false
            ? node.setAttribute(attr, value)
            : node.removeAttribute(attr);
    }
}

/**
 * @param {Element} node
 * @param {Array<string>} arr
 */

export function removeAttributes(node, arr){

    let cache = node[MIKADO_NODE_CACHE];

    if(!cache){

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    for(let i = 0; i < arr.length; i++){

        removeAttribute(node, arr[i], cache);
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @param {Object=} _cache
 */

export function removeAttribute(node, attr, _cache){

    let tmp;

    if(_cache || (_cache = node[MIKADO_NODE_CACHE])){

        tmp = _cache["_a" + attr];
    }
    else{

        node[MIKADO_NODE_CACHE] = _cache = {};
    }

    if(tmp !== false){

        _cache["_a" + attr] = false;
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
 * @param {string} classname
 */

export function setClass(node, classname){

    let cache = node[MIKADO_NODE_CACHE], tmp;

    if(cache){

        tmp = cache["_c"];
    }
    else{

        node[MIKADO_NODE_CACHE] = cache = {};
    }

    if(tmp !== classname){

        cache["_c"] = classname;
        node.className = classname;
    }
}

/**
 * @param {Element} node
 * @return {string}
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

    return tmp;
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

        const matches = tmp.match(regex_class);
        cache["_c"] = tmp = {};

        for(let i = 0; i < matches.length; i++){

            tmp[matches[i]] = 1;
        }
    }

    return tmp;
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {Object=} _cache
 */

export function addClass(node, classname, _cache){

    const cache = _cache || transformClassCache(node);
    const tmp = cache[classname];

    if(!tmp){

        cache[classname] = 1;
        node.classList.add(classname);
    }
}

/**
 * @param {Element} node
 * @param {Array<string>} arr
 */

export function addClasses(node, arr){

    const cache = transformClassCache(node);

    for(let i = 0; i < arr.length; i++){

        addClass(node, arr[i], cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {Object=} _cache
 */

export function removeClass(node, classname, _cache){

    const cache = _cache || transformClassCache(node);
    const tmp = cache[classname];

    if(tmp !== 0){

        cache[classname] = 0;
        node.classList.remove(classname);
    }
}

/**
 * @param {Element} node
 * @param {Array<string>} arr
 */

export function removeClasses(node, arr){

    const cache = transformClassCache(node);

    for(let i = 0; i < arr.length; i++){

        removeClass(node, arr[i], cache);
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
 * @param {string} classname
 * @param {boolean|number|undefined=} state
 * @param {Object=} _cache
 */

export function toggleClass(node, classname, state, _cache){

    const cache = _cache || transformClassCache(node);
    let tmp = !!cache[classname];

    state = typeof state === "undefined" ? !tmp : !!state;

    if(tmp !== state){

        cache[classname] = state ? 1 : 0;
        state ? node.classList.add(classname)
              : node.classList.remove(classname);
    }
}

/**
 * @param {Element} node
 * @param {Array<string>|Object<string, boolean|number>} obj
 */

export function toggleClasses(node, obj){

    const cache = transformClassCache(node);

    if(obj.constructor === Array){

        for(let i = 0; i < obj.length; i++){

            toggleClass(node, /** @type {string} */ (obj[i]), void 0, cache);
        }
    }
    else{

        for(let classname in obj){

            toggleClass(node, classname, /** @type {boolean|number} */ (obj[classname]), cache);
        }
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
 * @param {string} property
 * @param {string|number} value
 * @param {CSSStyleDeclaration} _style
 * @param {Object=} _cache
 */

export function setStyle(node, property, value, _style, _cache){

    const cache = _cache || transformStyleCache(node);

    if(cache[property] !== value){

        cache[property] = value;
        (_style || node.style).setProperty(property, /** @type {string} */ (value));
    }
}

/**
 * @param {HTMLElement} node
 * @param {Object<string, string|number>} properties
 */

export function setStyles(node, properties){

    const cache = transformStyleCache(node);
    const prop = node.style;

    for(const style in properties){

        setStyle(node, style, properties[style], prop, cache);
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