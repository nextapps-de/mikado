
import { Template, TemplateDOM } from "./type.js";
import { idl_attributes } from "./factory.js";

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
    //"mouseenter": 1, // non-bubbling
    mouseover: 1,
    //"mouseleave": 1, // non-bubbling
    mouseout: 1,
    mousemove: 1,
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
    //"focus": 1, // non-bubbling
    focusin: 1,
    //"blur": 1, // non-bubbling
    focusout: 1,
    resize: 1,
    scroll: 1,

    // non-bubbling events
    error: 1,
    load: 1
},
      event_bubble = {

    blur: "focusout",
    focus: "focusin",
    mouseleave: "mouseout",
    mouseenter: "mouseover"
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

        if (node.content) {

            if (!template.name) {

                template.name = node.id || node.getAttribute("name");
            }

            node = node.content.firstElementChild;
        }
    }

    const tagName = node.tagName;

    if (!tagName || "SCRIPT" === tagName) {

        // a text node or inline code has no tag

        let value;

        if (value = (tagName ? node.firstChild : node).nodeValue) {

            if (value && value.trim()) {

                if (value.includes("{{@")) {

                    let js = value.replace(/{{@([\s\S]+)}}/g, "$1").trim();
                    value = /{{[\s\S]+}}/.test(js) ? js.replace(/{{([\s\S]+)}}/g, "{{$1}}") : "";
                    js && (js = js.replace(/{{([\s\S]+)}}/g, ""));
                    js && _fn.push(js);

                    // using the script tag allows the runtime compiler
                    // to place code to a specific place

                    if ("SCRIPT" === tagName) {

                        if (value.trim()) {

                            tpl.text = value;
                            tpl.tag = tagName;
                        }

                        return tpl;
                    }
                }

                if (value && value.trim()) {

                    //if(/{{[!?]?#/.test(value)){
                    if (value.includes("{{#")) {

                        handle_value(tpl, "html", value, !1, null, _index, _inc, _fn);
                    } else {

                        _index.count++;

                        handle_value(tpl, "text", value, !1, null, _index, _inc, _fn);
                    }
                }
            }
        }

        if (!tagName) {

            return (/*tpl.js ||*/value && value.trim() ? tpl : null
            );
        }
    }

    if (tagName) {

        tpl.tag = tagName;
    }

    let attributes = node.attributes;

    if (attributes && attributes.length) {

        const tmp = {};

        // collect and normalize attributes

        for (let i = 0; i < attributes.length; i++) {
            let attr_name = attributes[i].nodeName,
                attr_value = node.getAttribute(attr_name);


            // the foreach needs to be handled in the switch below,
            // otherwise it could collide with native "for" attribute

            // if(attr_name === "foreach") attr_name = "for";
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

                    // is already pushed to fn stack
                    break;

                case "key":

                    template.key = strip(attr_value).replace("data.", "");
                    break;

                case "cache":

                    break;

                default:

                    if (event_bubble[attr_name]) {

                        attr = tpl.event || (tpl.event = {});

                        attr_name = event_bubble[attr_name];
                    } else if (event_types[attr_name]) {

                        attr = tpl.event || (tpl.event = {});
                    } else {

                        // derive template name from outer element when it is not a template
                        // skip, when it is an expression

                        if (!_recursive && ("id" === attr_name || "name" === attr_name) && !template.name) {

                            if (!/{{[\s\S]+}}/.test(attr_value)) {

                                template.name = attr_value;
                            }
                        }

                        attr = tpl.attr || (tpl.attr = {});
                    }

                    handler = attr_name;
            }

            if (handler) {

                handle_value(attr || tpl, handler, attr_value, !!attr, attributes, _index, _inc, _fn);
            }
        }
    }

    // from here all attributes was processed by handle_value()

    // process <template/> contents
    const children = (node.content || node).childNodes;
    let length = children.length;

    if (_index.included) {

        _index.included = !1;
        _index.inc++;

        // The compiler unshift includes, because the client then can take them by faster arr.pop()
        _fn = /** @type {Object} */[];

        if (tpl.for || tpl.if) {

            _inc.unshift(_fn);
        }

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

        // for, range and if are fully contained inside render function

        delete tpl.for;
        delete tpl.if;

        // it's different from native compiler, all children will be filled non-recursively
        // delete of tpl.child will run at the bottom of the last loop

        //delete tpl.child;
        delete tpl.text;
        delete tpl.html;
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
                } else if (tmp.text || tmp.tag) {

                    (tpl.child || (tpl.child = [])).push(tmp);
                }
            }
        }

        if (tpl.child) {

            if (1 === tpl.child.length) {

                tpl.child = tpl.child[0];
            }
        }
    }

    if (!_recursive) {

        if (!template.name) {

            // use a default name
            template.name = "tpl-" + counter++;
        }

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

                if (_inc[i].length) {

                    _inc[i] = Function("data", "state", "index", "_p", "_f", "_x", '"use strict";let _o,_v,_c;' + _inc[i].join(";") /*+ ';return _x'*/);
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
 * @param {boolean} attr Indicates weather the key is a native attribute key
 * @param {Object<string, string>} attributes
 * @param {Object=} index
 * @param {Array<Array<String>|Function>=} inc
 * @param {Array<String>|Object=} fn
 */

function handle_value(root, key, value, attr, attributes, index, inc, fn) {

    if (/{{[\s\S]+}}/.test(value)) {

        //const bind = value.includes("{{==");
        let proxy = /{{([!?#]+)?=/.test(value),
            truthy = /{{!?\?/.test(value),
            escape = /{{\??!/.test(value),
            tmp = value;
        //replaceComments(value);

        if (proxy) {

            if (truthy || escape) {

                tmp = tmp.replace(/{{[!?]+/g, "{{");
            }

            proxy = tmp.replace(/{{#?=+(.*)?}}/ig, "$1").trim().replace(/^data\./, "").replace(/^data\[['"](.*)['"]]/, "$1");
        }

        tmp = tmp.replace(/{{[!?#=]+/g, "{{").replace(/"(\s+)?{{(\s+)?/g, "(").replace(/(\s+)?}}(\s+)?"/g, ")").replace(/{{(\s+)?/g, "'+(").replace(/(\s+)?}}/g, ")+'").replace(/\s+/g, " ");
        //.trim();

        tmp = ("'" + tmp + "'").replace(/^""\+/g, "").replace(/^''\+/g, "").replace(/\+''$/g, "").replace(/\+""$/g, "").replace(/"\)\+''\+\("/g, "") // ")+''+("
        .replace(/'\)\+''\+\('/g, "") // ')+''+('
        .replace(/\+''\+/g, "+") // +''+
        .replace(/'(\s+)?\+(\s+)?'/g, "") // ' + '
        .replace(/"(\s+)?\+(\s+)?"/g, "") // " + "
        .replace(/^\(([^ ]+)\)$/g, "$1") // ( value )
        .trim();

        // ... skip resolving static content inside dynamic expressions for the inline compile

        if (truthy) {

            tmp = "(" + (tmp + "||" + tmp + "===0?" + tmp + ":'')");
        }

        if (("text" === key || "style" === key) && root.tag) {

            index.count++;
        }

        if (index.count !== index.last) {

            index.current++;
            index.last = index.count;

            fn.push('_o=_p[' + index.current + ']');
            fn.push('_x&&(_x[' + index.current + ']=_c={})');
        }

        // mode: "inline", the fastest when Cache should be optionally supported

        fn.push('_v=' + tmp);

        if (attr) {

            fn.push('_c&&(_c["_a' + key + "\"]=_v);if(!_o.c||_o.c[\"_a" + key + "\"]!==_v){_o.c&&(_o.c[\"_a" + key + '"]=_v);' + (idl_attributes[key] ? "selected" === key ? '_f?_o.n[_v===false?"removeAttribute":"setAttribute"]("' + key + '",_v):_o.n.' + key + '=_v' : '_o.n.' + key + '=_v' : '_o.n[_v===false?"removeAttribute":"setAttribute"]("' + key + '",_v)') + '}');
        } else if ("class" === key) {

            fn.push("_c&&(_c._c=_v);if(!_o.c||_o.c._c!==_v){_o.c&&(_o.c._c=_v);_o.n.className=_v}");
        } else if ("style" === key) {

            fn.push("_c&&(_c._s=_v);if(!_o.c||_o.c._s!==_v){_o.c&&(_o.c._s=_v);_o.n.cssText=_v}");
        } else if ("html" === key) {

            fn.push("_c&&(_c._h=_v);if(!_o.c||_o.c._h!==_v){_o.c&&(_o.c._h=_v);_o.n.innerHTML=_v}");
        } else if ("text" === key) {

            fn.push("_c&&(_c._t=_v);if(!_o.c||_o.c._t!==_v){_o.c&&(_o.c._t=_v);_o.n.nodeValue=_v}");
        }

        if (proxy) {

            root[key] = [proxy];
        } else {

            root[key] = [];
        }
    } else {

        root[key] = value;
    }

    // handle includes
    // special attributes are not a part of element attributes
    // the key is "for" but related value is on attributes.foreach

    if (("for" === key || "if" === key || "inc" === key) && !attr && !index.included) {

        if (index.count !== index.last) {

            index.current++;
            index.last = index.count;

            fn.push('_o=_p[' + index.current + ']');
        }

        // IMPORTANT
        // the handle_value() function has not all attributes on root
        // use attributes instead, which has attr.foreach instead of root.for

        const data_str = attributes.foreach ? attributes.foreach.trim() : "data";
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
        } else if (attributes.foreach) {

            fn.push('this.inc[' + current_inc + "].mount(_o.n).render(" + data_str + ',state)');
            index.included = !0;
        } else {

            fn.push('this.inc[' + current_inc + "].mount(_o.n).render(data,state)");
            index.included = !0;
        }
    }
}