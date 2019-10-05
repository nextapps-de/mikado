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
 * @param {!string|HTMLTemplateElement|Element} node
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
    const attributes = node.attributes;

    if(tagName === "include"){

        if(node.firstChild){

            // <include>{{ template }}</include>

            template["+"] = node.firstChild.nodeValue;

            return;
        }
        else{

            // <include from="..."/>

            const tmp = node.getAttribute("from");

            if(tmp){

                template["+"] = tmp;
            }
            else{

                return;
            }
        }
    }

    if(tagName !== "DIV"){

        template["t"] = tagName.toLowerCase();
    }

    if(node.nodeType !== 3){

        let value = node.firstChild.nodeValue;

        if(value){

            value.replace(/\s+/g, ' ');

            if(value.trim()){

                const pos = value.indexOf("{{@");

                if(pos !== -1){

                    const pos_end = value.indexOf("}}", pos);

                    template["j"] = value.substring(pos + 3, pos_end);
                    value = value.substring(0, pos) + value.substring(pos_end + 2)
                }

                if(value.indexOf("{{#") !== -1){

                    handle_value(template, "h", value.replace(/{{#/g, "{{"));
                }
                else{

                    handle_value(template, "x", value);
                }
            }
        }
    }

    if(attributes.length){

        for(let i = 0; i < attributes.length; i++){

            let attr_name = attributes[i].nodeName;

            if(attr_name === "class"){

                handle_value(template, "c", node.className);
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

                    if(node.hasAttribute("for")){

                        handle_value(template, "@", attr_value);
                    }
                    else{

                        handle_value(template, "+", attr_value);
                    }
                }
                else if(attr_name === "for" && (tagName !== "label")){

                    if(!node.hasAttribute("include")){

                        handle_value(template, "@", compile(node.children[0], 1));
                    }

                    handle_value(template, "r", attr_value);
                }
                else if(attr_name === "max"){

                    handle_value(template, "m", attr_value);
                }
                else if(attr_name === "js"){

                    handle_value(template, "j", attr_value);
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

    const children = node.children;

    if(children.length){

        if(children.length > 1){

            template["i"] = new Array(children.length);

            for(let i = 0; i < children.length; i++){

                template["i"][i] = compile(children[i], 1);
            }
        }
        else{

            template["i"] = compile(children[0], 1);
        }
    }

    if(!recursive){

        template["d"] = is_static;
    }

    return template;
}

function handle_value(template, key, value){

    const bind = value.indexOf("{{==") !== -1;
    const proxy = bind || value.indexOf("{{=") !== -1;

    if(value.indexOf("{{") !== -1 && value.indexOf("}}") !== -1){

        is_static = false;

        const tmp = value.replace(/{{==/g, "{{")
                         .replace(/{{=/g, "{{")
                         .replace(/"{{/g, "")
                         .replace(/}}"/g, "")
                         .replace(/{{/g, "' + ")
                         .replace(/}}/g, " + '");

        template[key] = [("'" + tmp + "'").replace(/'' \+ /g, "")
                                          .replace(/ \+ ''/g, "")];
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