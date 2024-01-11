const regex_css = /[^;:]+/g,
      regex_class = /[ ]+/g;


// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {*} text
 */

export function setText(node, text) {

    let cache = node._mkc,
        child,
        tmp;

    if (cache) {

        tmp = cache._t;
    } else {

        node._mkc = cache = {};
    }

    if (tmp !== text) {

        cache._t = text;

        if (3 === node.nodeType && (child = node) || (child = node.firstChild)) {

            child.nodeValue = /** @type {string} */text;
        } else {

            node.textContent = text;
        }
    } else {}
}

/**
 * @param {Element|Node} node
 * @return {string}
 */

export function getText(node) {

    let cache = node._mkc,
        child,
        tmp;

    if (cache) {

        tmp = cache._t;
    } else {

        node._mkc = cache = {};
    }

    if ("string" != typeof tmp) {

        if (3 === node.nodeType && (child = node) || (child = node.firstChild)) {

            cache._t = tmp = child.nodeValue;
        } else {

            cache._t = tmp = node.textContent;
        }
    } else {}

    return tmp;
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string|Object<string, string>} attr
 * @param {string|number|boolean=} value
 */

export function setAttribute(node, attr, value) {

    let cache = node._mkc;

    if (!cache) {

        node._mkc = cache = {};
    }

    if ("object" == typeof attr) {

        for (let key in attr) {

            _setAttribute(node, key, attr[key], cache);
        }
    } else {

        _setAttribute(node, attr, /** @type {string} */value, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @param {string|number|boolean} value
 * @param {Object=} cache
 */

function _setAttribute(node, attr, value, cache) {

    if (cache["_a" + attr] !== value) {

        cache["_a" + attr] = value;

        !1 !== value ? node.setAttribute(attr, value) : node.removeAttribute(attr);
    } else {}
}

/**
 * @param {Element} node
 * @param {string|Array<string>} arr
 */

export function removeAttribute(node, arr) {

    let cache = node._mkc;

    if (!cache) {

        node._mkc = cache = {};
    }

    if ("object" == typeof arr) {

        for (let i = 0; i < arr.length; i++) {

            _removeAttribute(node, arr[i], cache);
        }
    } else {

        _removeAttribute(node, /** @type {string} */arr, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} attr
 * @param {Object=} cache
 */

function _removeAttribute(node, attr, cache) {

    if (!1 !== cache["_a" + attr]) {

        cache["_a" + attr] = !1;
        node.removeAttribute(attr);
    } else {}
}

/**
 * @param {Element} node
 * @param {string} attr
 * @return {string|null}
 */

export function getAttribute(node, attr) {

    let cache, tmp;

    if (cache = node._mkc) {

        tmp = cache["_a" + attr];
    } else {

        node._mkc = cache = {};
    }

    if ("string" != typeof tmp) {

        cache["_a" + attr] = tmp = node.getAttribute(attr);
    } else {}

    return tmp;
}

/**
 * @param {Element} node
 * @param {string} attr
 * @return {boolean}
 */

export function hasAttribute(node, attr) {

    const tmp = getAttribute(node, attr);
    return !(!tmp && "" !== tmp);
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function setClass(node, classname) {

    let cache = node._mkc,
        tmp;

    if (cache) {

        tmp = cache._c;
    } else {

        node._mkc = cache = {};
    }

    if ("object" == typeof classname) {

        classname = classname.join(" ");
    }

    if (tmp !== classname) {

        cache._c = classname;
        node.className = classname;
    } else {}
}

/**
 * @param {Element} node
 * @return {Array<string>}
 */

export function getClass(node) {

    let cache = node._mkc,
        tmp;

    if (cache) {

        tmp = cache._c;
    } else {

        node._mkc = cache = {};
    }

    if ("string" != typeof tmp) {

        cache._c = tmp = node.className;
    } else {}

    return tmp.split(regex_class);
}

/**
 * @param {Element} node
 * @return {Object}
 */

function transformClassCache(node) {
    let cache = node._mkc,
        tmp;


    if (cache) {

        tmp = cache._c;
    } else {

        node._mkc = cache = {};
    }

    if (!tmp) {

        return cache._c = {};
    }

    if ("string" == typeof tmp) {

        const matches = tmp.split(regex_class);
        cache._c = tmp = {};

        for (let i = 0; i < matches.length; i++) {

            tmp[matches[i]] = 1;
        }
    }

    return tmp;
}

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function addClass(node, classname) {

    const cache = transformClassCache(node);

    if ("object" == typeof classname) {

        for (let i = 0; i < classname.length; i++) {

            _addClass(node, classname[i], cache);
        }
    } else {

        _addClass(node, classname, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {Object=} cache
 */

function _addClass(node, classname, cache) {

    const tmp = cache[classname];

    if (!tmp) {

        cache[classname] = 1;
        node.classList.add(classname);
    } else {}
}

/**
 * @param {Element} node
 * @param {string|Array<string>} classname
 */

export function removeClass(node, classname) {

    const cache = transformClassCache(node);

    if ("object" == typeof classname) {

        for (let i = 0; i < classname.length; i++) {

            _removeClass(node, classname[i], cache);
        }
    } else {

        _removeClass(node, classname, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {Object=} cache
 */

function _removeClass(node, classname, cache) {

    const tmp = cache[classname];

    if (0 !== tmp) {

        cache[classname] = 0;
        node.classList.remove(classname);
    } else {}
}

/**
 * @param {Element} node
 * @param {string} classname
 * @return {boolean}
 */

export function hasClass(node, classname) {

    const cache = transformClassCache(node);
    let tmp = cache[classname];

    if ("number" != typeof tmp) {

        cache[classname] = tmp = node.classList.contains(classname) ? 1 : 0;
    } else {}

    return !!tmp;
}

/**
 * @param {Element} node
 * @param {string|Array<string>|Object<string, boolean|number>} classname
 * @param {boolean|number|undefined=} state
 */

export function toggleClass(node, classname, state) {

    const cache = transformClassCache(node);

    if ("object" == typeof classname) {

        if (classname.constructor === Array) {

            for (let i = 0; i < classname.length; i++) {

                _toggleClass(node, /** @type {string} */classname[i], state, cache);
            }
        } else {

            for (let key in classname) {

                _toggleClass(node, key, /** @type {boolean|number} */classname[key], cache);
            }
        }
    } else {

        _toggleClass(node, /** @type {string} */classname, state, cache);
    }
}

/**
 * @param {Element} node
 * @param {string} classname
 * @param {boolean|number|undefined=} state
 * @param {Object=} cache
 */

function _toggleClass(node, classname, state, cache) {

    let tmp = !!cache[classname];

    state = "undefined" == typeof state ? !tmp : !!state;

    if (tmp !== state) {

        cache[classname] = state ? 1 : 0;
        state ? node.classList.add(classname) : node.classList.remove(classname);
    } else {}
}

// -------------------------------------------------------------

/**
 * @param {HTMLElement} node
 * @param {string} css
 */

export function setCss(node, css) {

    let cache = node._mkc,
        tmp;

    if (cache) {

        tmp = cache._s;
    } else {

        node._mkc = cache = {};
    }

    if (tmp !== css) {

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
    } else {}
}

/**
 * @param {HTMLElement} node
 * @return {string}
 */

export function getCss(node) {

    let cache = node._mkc,
        tmp;

    if (cache) {

        tmp = cache._s;
    } else {

        node._mkc = cache = {};
    }

    if ("string" != typeof tmp) {

        cache._s = tmp = node.style.cssText;
    } else {}

    return tmp;
}

/**
 * @param {Element} node
 * @return {Object}
 */

function transformStyleCache(node) {
    let cache = node._mkc,
        tmp;


    if (cache) {

        tmp = cache._s;
    } else {

        node._mkc = cache = {};
    }

    if (!tmp) {

        return cache._s = {};
    }

    if ("string" == typeof tmp) {

        const matches = tmp.match(regex_css);
        cache._s = tmp = {};

        for (let i = 0; i < matches.length; i += 2) {

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

export function setStyle(node, property, value) {
    const cache = transformStyleCache(node),
          prop = node.style;


    if ("object" == typeof property) {

        for (const style in property) {

            _setStyle(node, style, property[style], prop, cache);
        }
    } else {

        _setStyle(node, property, /** @type {string} */value, prop, cache);
    }
}

/**
 * @param {HTMLElement} node
 * @param {string} property
 * @param {string|number} value
 * @param {CSSStyleDeclaration} _style
 * @param {Object=} cache
 */

function _setStyle(node, property, value, _style, cache) {

    if (cache[property] !== value) {

        cache[property] = value;
        (_style || node.style).setProperty(property, /** @type {string} */value);
    } else {}
}

/**
 * @param {HTMLElement} node
 * @param {string} property
 * @return {string}
 */

export function getStyle(node, property) {

    const cache = transformStyleCache(node);
    let tmp = cache[property];

    if ("string" != typeof tmp) {

        cache[property] = tmp = node.style.getPropertyValue(property);
    } else {}

    return tmp;
}

// -------------------------------------------------------------

/**
 * @param {Element} node
 * @param {string} html
 */

export function setHtml(node, html) {

    let cache = node._mkc,
        tmp;

    if (cache) {

        tmp = cache._h;
    } else {

        node._mkc = cache = {};
    }

    if (tmp !== html) {

        node.innerHTML = html;
        cache._h = html;
        cache._t = null;
    } else {}
}

/**
 * @param {Element} node
 * @return {string}
 */

export function getHtml(node) {

    let cache = node._mkc,
        tmp;

    if (cache) {

        tmp = cache._h;
    } else {

        node._mkc = cache = {};
    }

    if ("string" != typeof tmp) {

        cache._h = tmp = node.innerHTML;
    } else {}

    return tmp;
}