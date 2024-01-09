

const event_types = {

    tap: 1,
    change: 1,
    click: 1,
    dblclick: 1,
    input: 1,
    keydown: 1,
    keypress: 1,
    keyup: 1,
    mousedown: 1,
    mouseenter: 1,
    mouseleave: 1,
    mousemove: 1,
    mouseout: 1,
    mouseover: 1,
    mouseup: 1,
    mousewheel: 1,
    touchstart: 1,
    touchmove: 1,
    touchend: 1,
    touchcancel: 1,
    reset: 1,
    select: 1,
    submit: 1,
    toggle: 1,
    blur: 1,
    error: 1,
    focus: 1,
    load: 1,
    resize: 1,
    scroll: 1
};

// function escape_single_quotes(str){
//
//     return str.replace(/\\([\s\S])|(')/ig, "\\$1$2");
// }
//
// function escape_single_quotes_expression(str){
//
//     //console.log(str.replace(/{{(.*)?(\\)?([\s\S])|(')([^}]+)?/ig, "{{$1$2$3$4$5"))
//
//     return str.replace(/{{(.*)?(\\)?([\s\S])|(')(.*)?(}})/ig, "{{$1$2$3$4$5$6");
// }

function replaceComments(str) {

    return str.replace(/<!--(.*?)-->/g, "");
}

function strip(str) {

    return str.replace(/({{|}})/g, "").trim();
}

let message = 0,
    counter = 0;


/**
 * @param {!string|HTMLTemplateElement|Element|Node} node
 * @param {boolean|Function=} callback
 * @param {Array<Array<String>|Function>=} _inc
 * @param {Array<String>|Object=} _fn
 * @param {Object=} _index
 * @param {boolean|number=} _recursive
 * @return {Template|TemplateDOM|Promise<Template|TemplateDOM>}
 */

export default function compile(node, callback, _inc, _fn, _index, _recursive) {

    if (callback) {

        return new Promise(function (resolve) {

            const tpl = compile(node);
            if ("function" == typeof callback) callback(tpl);
            resolve(tpl);
        });
    }

    if (!_index) {

        _fn = /** @type {Object} */[];
        _inc = [_fn];
        _fn.index = _index = {

            // the actual index of element p[i]
            current: -1,

            // counts every index change (next element, style, text node)
            count: 0,

            // the value of the last index counter to identify if counter has increased
            // and current index should also be increased by 1
            last: -1,

            // the actual index of inc[i]
            inc: 0,

            // a state to identify if one of the 3 include types was applied
            included: !1

            // a cache to identify repeating template structures
            // not supported by the inline compiler
            //cache: {}
        };
    }

    const template = _recursive ? /** @type {TemplateDOM} */{} : /** @type {Template} */{
        tpl: /** @type {TemplateDOM} */{}
    },
          tpl = _recursive ? template : template.tpl;


    if (!_recursive) {

        if ("string" == typeof node) {

            if (/<.*>/.test(node)) {

                const tmp = document.createElement("div");
                tmp.innerHTML = node;
                node = tmp.firstElementChild;
            } else {

                template.name = node;
                node = document.getElementById(node);
            }
        }

        node = /** @type {HTMLTemplateElement} */node;

        if (!template.name) {

            template.name = node.getAttribute("name") || node.id || "tpl-" + counter++;
        }

        if (node.content) {

            node = node.content.firstElementChild;
        } else if ("TEMPLATE" === node.tagName) {

            node = node.firstElementChild;
        }
    }

    const tagName = node.tagName;

    if (tagName) {

        tpl.tag = tagName;
    } else {

        let value;

        if (node && (value = node.nodeValue)) {

            if (value && value.trim()) {

                const pos = value.indexOf("{{@");

                if (-1 !== pos) {
                    const pos_end = value.indexOf("}}", pos),
                          js = value.substring(pos + 3, pos_end).trim();

                    js && _fn.push(js);

                    value = value.substring(0, pos) + value.substring(pos_end + 2);
                }

                if (value && value.trim()) {

                    if (/{{[!?]?#/.test(value)) {

                        handle_value(tpl, "html", value, !1, null, _index, _inc, _fn);
                    } else {

                        _index.count++;

                        handle_value(tpl, "text", value, !1, null, _index, _inc, _fn);
                    }
                }
            }
        }

        return (/*tpl.js ||*/value && value.trim() ? tpl : null
        );
    }

    let attributes = node.attributes;

    if (attributes.length) {

        const tmp = {};

        // attribute normalization

        for (let i = 0; i < attributes.length; i++) {
            let attr_name = attributes[i].nodeName,
                attr_value = node.getAttribute(attr_name);


            if ("foreach" === attr_name) attr_name = "for";
            if ("include" === attr_name) attr_name = "inc";

            tmp[attr_name] = attr_value;
        }

        attributes = /** @type {TemplateDOM} */tmp;

        for (let attr_name in attributes) {
            let attr_value = attributes[attr_name],
                handler,
                attr;


            switch (attr_name) {

                case "class":
                case "style":

                    handler = attr_name;
                    break;

                case "offset":

                    attr_name = "range";
                    tpl.range = attr_value;
                // fallthrough

                case "limit":

                    attr_name = "range";
                    tpl.range = (tpl.range || 0) + "," + attr_value;
                // fallthrough

                case "range":

                    tpl.range = (tpl.range || attr_value).split(",").map(item => parseInt(item, 10) || 0);
                    handler = attr_name;
                    break;

                case "include":

                    attr_name = "inc";
                // fallthrough

                case "inc":

                    handler = attr_name;
                    break;

                case "if":

                    handler = attr_name;
                    break;

                case "foreach":

                    attr_name = "for";
                    handler = attr_name;
                    break;

                case "js":

                    // already pushed to fn stack
                    break;

                case "key":

                    template.key = strip(attr_value).replace("data.", "");
                    break;

                case "cache":

                    break;

                default:

                    if (event_types[attr_name]) {

                        attr = tpl.event || (tpl.event = {});
                    } else {

                        attr = tpl.attr || (tpl.attr = {});
                    }

                    handler = attr_name;
            }

            if (handler) {

                handle_value(attr || tpl, handler, attr_value, !!attr, attributes, _index, _inc, _fn);
            }
        }
    }

    // process <template/> contents
    const children = (node.content || node).childNodes,
          length = children.length;


    if (_index.included) {

        _index.included = !1;
        _index.inc++;

        // The compiler unshift includes, because the client then can take them by faster arr.pop()
        _fn = /** @type {Object} */[];
        _inc.unshift(_fn);

        // when there is no child it must be a text or a html declaration on root level
        tpl.child || (tpl.child = tpl.text ? { text: tpl.text } : tpl.html ? { html: tpl.html } : null);

        // inline includes
        if (length) {

            _fn.root = tpl;
            _fn.inc = tpl.child || (tpl.child = []);
            _fn.index = _index = {
                current: -1,
                count: 0,
                last: -1,
                inc: 0,
                included: !1
                //cache: _index.cache
            };
        } else {

            _fn.inc = tpl.inc;
        }

        // it's different from native compiler, all children will be filled non-recursively
        // delete of tpl.child will run at the bottom of the last loop

        //delete tpl.child;
        delete tpl.text;
        delete tpl.html;
        delete tpl.for;
    }

    if (length) {

        for (let i = 0, child; i < length; i++) {

            child = children[i];

            // skip comments

            if (8 === child.nodeType) {

                continue;
            }

            _index.count++;

            const tmp = /** @type {TemplateDOM} */compile(child, null, _inc, _fn, _index, 1);

            if (tmp) {

                if (1 === length && (3 === child.nodeType || !tmp.text) && (!tpl.js || !tmp.js)) {

                    if (tmp.js) tpl.js = tmp.js;
                    if (tmp.html) tpl.html = tmp.html;
                    if (tmp.text) tpl.text = tmp.text;
                } else {

                    (tpl.child || (tpl.child = [])).push(tmp);
                }
            }
        }

        if (tpl.child && 1 === tpl.child.length) {

            tpl.child = tpl.child[0];
        }
    }

    if (!_recursive) {

        if ("COMPONENT" === tpl.tag) {
            let json = tpl.child,
                shadow = [];


            for (let i = 0, child; i < json.length; i++) {

                child = json[i];

                if ("TEMPLATE" === child.tag) {

                    const tmp = child.child.length ? child.child[0] : child.child;
                    json = tmp;

                    if (child.name) tmp.name = child.name;
                    if (child.id) tmp.id = child.id;
                    if (child.key) tmp.key = child.key;
                    if (child.cache) tmp.cache = child.cache;
                } else {

                    shadow.push(child);
                }
            }

            template.tpl = json;
            template.cmp = shadow;
        }


        if (1 === _inc.length && 0 === _inc[0].length) {

            template.fn = null;
        } else {

            for (let i = 0; i < _inc.length; i++) {

                if (_inc[i].root) {

                    _inc[i].root.inc = _inc[i].inc[0];
                    delete _inc[i].root.child;
                }
            }

            for (let i = 0; i < _inc.length; i++) {

                if (_inc[i].length) {

                    _inc[i].unshift("let _o,_v");
                    _inc[i] = Function("data", "state", "index", "_p", '"use strict";' + (_inc[i].join(";") + ";") /*.replaceAll(",_v)};", ",_v)}").replaceAll("=_v};", "=_v}")*/);
                } else {

                    _inc[i] = null;
                }
            }

            template.fn = _inc.length ? _inc : null;
        }
    }

    return template;
}

/**
 * @param {TemplateDOM} root
 * @param {string} key
 * @param {string} value
 * @param {boolean} attr
 * @param {Object<string, string>} attributes
 * @param index
 * @param inc
 * @param fn
 */

function handle_value(root, key, value, attr, attributes, index, inc, fn) {

    if (/{{[\s\S]+}}/.test(value)) {

        //const bind = value.includes("{{==");
        let proxy = /{{([!?#]+)?=/.test(value),
            truthy = /{{!?\?/.test(value),
            escape = /{{\??!/.test(value),
            tmp = replaceComments(value);


        if (proxy) {

            if (truthy || escape) {

                tmp = tmp.replace(/{{[!?]+/g, "{{");
            }

            proxy = tmp.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
        }

        tmp = tmp.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'");

        tmp = ("'" + tmp + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/['"]\)\+''\+\(['"]/g, "") // ")+''+("
        .replace(/['"](\s+)?\+(\s+)?['"]/g, "") // ' + '
        .replace(/^\(([^ ]+)\)$/g, "$1") // ( value )
        .trim();

        // ... skip resolving static content inside dynamic expressions for the inline compile

        if (truthy) {

            tmp = "(" + (tmp + "||" + tmp + "===0?" + tmp + ":'')");
        }

        if ("text" === key && root.tag) {

            index.count++;
        }

        if ("style" === key && root.tag) {

            index.count++;
        }

        if (index.count !== index.last) {

            index.current++;
            index.last = index.count;

            fn.push('_o=_p[' + index.current + ']');
        }

        // mode: "inline", the fastest when Cache should be optionally supported

        fn.push('_v=' + tmp);

        if (attr) {

            fn.push('if(!_o.c||_o.c["_a' + key + "\"]!==_v){_o.c&&(_o.c[\"_a" + key + "\"]=_v);_o.n[_v===false?\"removeAttribute\":\"setAttribute\"](\"" + key + "\",_v)}");
        } else if ("class" === key) {

            fn.push("if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}");
        } else if ("style" === key) {

            fn.push("if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}");
        } else if ("html" === key) {

            fn.push("if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}");
        } else if ("text" === key) {

            fn.push("if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
        }

        if (proxy) {

            root[key] = [proxy];
        } else {

            root[key] = [""];
        }
    } else {

        root[key] = value;
    }

    // handle includes
    // special attributes are not a part of element attributes

    if (("for" === key || "if" === key || "inc" === key) && !attr && !index.included) {

        if (index.count !== index.last) {

            index.current++;
            index.last = index.count;

            fn.push('_o=_p[' + index.current + ']');
        }

        const data_str = attributes.for ? attributes.for.trim() + (attributes.range ? '.slice(' + (attributes.range[0] || 0) + (attributes.range[1] ? ',' + ((attributes.range[0] || 0) + attributes.range[1]) : '') + ')' : '') : "data";
        let current_inc = index.inc;

        // TODO: it needs the "root.child" already to be filled at this point
        // let cached;
        //
        // if(root.child){
        //
        //     const cache = JSON.stringify(root.child);
        //     const tmp = index.cache[cache];
        //
        //     if(tmp || tmp === 0){
        //
        //         cached = true;
        //         delete root.child;
        //         root.inc = 1;
        //         current_inc = tmp;
        //     }
        //     else{
        //
        //         index.cache[cache] = current_inc;
        //     }
        // }

        // inline includes could be merged?

        if (attributes.if) {

            fn.push('this.inc[' + current_inc + "].mount(_o.n)[" + attributes.if.trim() + '?"render":"clear"](' + data_str + ',state)');
            index.included = !0;
        } else if (attributes.for) {

            fn.push('this.inc[' + current_inc + "].mount(_o.n).render(" + data_str + ',state)');
            index.included = !0;
        } else {

            fn.push('this.inc[' + current_inc + "].mount(_o.n).render(data,state)");
            index.included = !0;
        }

        // for, range and if are fully contained inside render function
        delete root.for;
        delete root.range;
        delete root.if;
    }
}