const event_types = {

    "tap": 1,
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

let is_static;
let counter = 0;

/**
 * @param {!string|HTMLTemplateElement|Element|Node} node
 * @param {boolean|number=} recursive
 */

export default function compile(node, recursive){

    const template = {};

    if(!recursive){

        is_static = true;

        if(typeof node === "string"){

            if(node.indexOf("<") !== -1){

                const tmp = document.createElement("div");
                tmp.innerHTML = node;
                node = /** @type {Element} */ (tmp.firstElementChild);
                template["n"] = node.id || ("tpl_" + counter++);
            }
            else{

                template["n"] = node;
                node = document.getElementById(node);
            }
        }
        else{

            template["n"] = node.id || ("tpl_" + counter++);
        }

        node = /** @type {HTMLTemplateElement} */ (node);

        if(node.content){

            node =  /** @type {Element} */ (node.content.firstElementChild);
        }
        else if(node.tagName === "TEMPLATE"){

            node =  /** @type {Element} */ (node.firstElementChild);
        }
    }

    const tagName = node.tagName;

    if(tagName){

        if(tagName === "INCLUDE"){

            const from = node.getAttribute("from");

            if(from){

                // <include from="..."/>
                template["+"] = from;
            }
            else{

                // <include>{{ template }}</include>
                template["+"] = strip(node.firstChild.nodeValue);
            }

            return template;
        }
        else if(tagName !== "DIV"){

            template["t"] = tagName.toLowerCase();
        }
    }
    else{

        let value = node;

        if(value && (value = value.nodeValue)){

            value = value.replace(/\s+/g, " ");

            if(value && value.trim()){

                const pos = value.indexOf("{{@");

                if(pos !== -1){

                    const pos_end = value.indexOf("}}", pos);

                    template["j"] = value.substring(pos + 3, pos_end);
                    value = value.substring(0, pos) + value.substring(pos_end + 2);
                }

                if(value && value.trim()){

                    if(value.indexOf("{{#") !== -1){

                        handle_value(template, "h", value.replace(/{{#/g, "{{"));
                    }
                    else{

                        handle_value(template, "x", value);
                    }
                }
            }
        }

        return template["j"] || (value && value.trim()) ? template : null;
    }

    const attributes = node.attributes;

    if(attributes.length){

        for(let i = 0; i < attributes.length; i++){

            let attr_name = attributes[i].nodeName;

            if(attr_name === "class"){

                handle_value(template, "c",
                    node.className instanceof SVGAnimatedString ?
                        node.className.baseVal
                        : node.className);
            }
            else{

                let attr_value = node.getAttribute(attr_name);

                if(attr_name === "style"){

                    handle_value(template, "s", attr_value);
                }
                else if(attr_name === "if"){

                    handle_value(template, "f", attr_value);
                }
                else if(attr_name === "include"){

                    if(!node.hasAttribute("for")){

                        const tmp = {};
                        (template["i"] || (template["i"] = [])).push(tmp);

                        handle_value(tmp, "+", attr_value);
                    }
                }
                else if(attr_name === "for" && (tagName !== "LABEL")){

                    const tmp = node.getAttribute("include");

                    if(tmp){

                        template["@"] = strip(tmp);
                    }

                    handle_value(template, "r", attr_value);
                }
                else if(attr_name === "max"){

                    handle_value(template, "m", attr_value);
                }
                else if(attr_name === "js"){

                    template["j"] = strip(attr_value);
                }
                else if(attr_name === "key"){

                    handle_value(template, "k", attr_value.replace("data.", ""));
                }
                else {

                    if(attr_name === "bind"){

                        const parts = attr_value.split(":");
                        if(parts.length < 2) parts.unshift("value");

                        attr_name = parts[0];
                        attr_value = "{{==" + parts[1] + "}}";
                    }

                    if(event_types[attr_name.substring(2)] && (attr_value.indexOf("{{") !== -1)){ // /*!event_types[attr_name] &&*/

                        attr_name = attr_name.substring(2);
                    }

                    if(event_types[attr_name]){

                        handle_value(template["e"] || (template["e"] = {}), attr_name, attr_value);
                    }
                    else{

                        handle_value(template["a"] || (template["a"] = {}), attr_name, attr_value);
                    }
                }
            }
        }
    }

    const children = node.childNodes;
    const length = children.length;

    if(length){

        let count = 0;

        for(let i = 0; i < length; i++){

            const tmp = compile(children[i], 1);

            if(tmp){

                if((length === 1) && (children[i].nodeType === 3)){

                    if(tmp["j"]) template["j"] = tmp["j"];
                    if(tmp["h"]) template["h"] = tmp["h"];
                    if(tmp["x"]) template["x"] = tmp["x"];
                }
                else{

                    (template["i"] || (template["i"] = []))[count++] = tmp;
                }
            }
        }

        if(count === 1){

            template["i"] = template["i"][0];
        }
    }

    if(!recursive){

        template["d"] = is_static;
    }

    return template;
}

function handle_value(template, key, value){

    if((value.indexOf("{{") !== -1) && (value.indexOf("}}") !== -1)){

        const bind = value.indexOf("{{==") !== -1;
        const proxy = bind || (value.indexOf("{{=") !== -1);

        is_static = false;

        const tmp = value.replace(/{{==/g, "{{")
                         .replace(/{{=/g, "{{")
                         .replace(/"{{/g, "")
                         .replace(/}}"/g, "")
                         .replace(/{{/g, "' + ")
                         .replace(/}}/g, " + '");

        template[key] = [("'" + tmp + "'").replace(/'' \+ /g, "")
                                          .replace(/ \+ ''/g, "")
                                          .trim()];
        if(bind){

            template[key].push(2);
        }
        else if(proxy){

            template[key].push(1);
        }
    }
    else{

        template[key] = value;
    }
}

function strip(str){

    return str.replace(/{{/g, "").replace(/}}/g, "").trim();
}