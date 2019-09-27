export function setText(target, text){

    if(target.nodeType !== 3){

        target["_html"] = null;
        target = target.firstChild || target.appendChild(document.createTextNode(target["_text"] = text));
    }

    if(target["_text"] !== text){

        target.nodeValue = text;
        target["_text"] = text;
    }

    return this;
}

export function getText(target){

    if(target.nodeType !== 3){

        if(!(target = target.firstChild)){

            return "";
        }
    }

    return (

        typeof target["_text"] === "undefined" ?

            target["_text"] = target.nodeValue
        :
            target["_text"]
    );
}

export function setHTML(target, html){

    if(target["_html"] !== html){

        target.innerHTML = html;
        target["_html"] = html;
    }

    return this;
}

export function getHTML(target){

    return (

        typeof target["_html"] === "undefined" ?

            target["_html"] = target.innerHTML
        :
            target["_html"]
    );
}

const regex_cache = {};

function regex(classname){

    return regex_cache[classname] || (regex_cache[classname] = new RegExp("(?:^|\\s)" + classname + "(?!\\S)", "g"));
}

/*
function createClassCache(node){

    const class_list = node.classList;
    const cache = {};
    const length = class_list.length;

    for(let a = 0; a < length; a++){

        cache[class_list[a]] = 1;
    }

    node["_class_cache"] = cache;
    node["_class_list"] = class_list;

    return cache;
}
*/

export function addClass(target, classname){

    if(!hasClass(target, classname)){

        target.className += " " + classname;
        target["_class"] += " " + classname;
    }

    // if(!(target["_class_cache"] || createClassCache(target))[classname]){
    //
    //     target["_class_cache"][classname] = 1;
    //     target["_class_list"].add(classname);
    //     target["_class"] = void 0;
    // }

    return this;
}

export function removeClass(target, classname){

    const new_class = (target["_class"] || (target["_class"] = target.className)).replace(regex(classname) , "");

    if(target["_class"] !== new_class){

        target.className = new_class;
        target["_class"] = new_class;
    }

    // if((target["_class_cache"] || createClassCache(target))[classname]){
    //
    //     target["_class_cache"][classname] = 0;
    //     target["_class_list"].remove(classname);
    //     target["_class"] = void 0;
    // }

    return this;
}

export function setClass(target, classname){

    if(target["_class"] !== classname){

        target.className = classname;
        target["_class"] = classname;
        //target["_class_cache"] = null;
    }

    return this;
}

export function getClass(target){

    return (

        typeof target["_class"] === "undefined" ?

            target["_class"] = target.className
        :
            target["_class"]
    );
}

export function hasClass(target, classname){

    return !!((target["_class"] || (target["_class"] = target.className)).match(regex(classname)));
    //return !!(target["_class_cache"] || createClassCache(target))[classname];
}

export function toggleClass(target, classname){

    if(hasClass(target, classname)){

        removeClass(target, classname);
    }
    else{

        addClass(target, classname);
    }

    // (target["_class_cache"] || createClassCache(target))[classname] = !target["_class_cache"][classname];
    // target["_class_list"].toggle(classname);
    // target["_class"] = null;
}

/*
export function setStyle(target, style, value){

    const style_cache = target["_style_cache"] || (target["_style_cache"] = {});

    if(style_cache[style] !== value){

        style_cache[style] = value;
        (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
        target["_css"] = null;
    }

    return this;
}

export function getStyle(target, style){

    const style_cache = target["_style_cache"] || (target["_style_cache"] = {});

    return (

        typeof style_cache[style] === "undefined" ?

            style_cache[style] = (target["_style"] || (target["_style"] = target.style)).getPropertyValue(style)
        :
            style_cache[style]
    );
}
*/

export function setCSS(target, style){

    if(target["_css"] !== style){

        (target["_style"] || (target["_style"] = target.style)).cssText = style;
        target["_css"] = style;
        //target["_style_cache"] = null;
    }

    return this;
}

export function getCSS(target){

    return (

        typeof target["_css"] === "undefined" ?

            target["_css"] = (target["_style"] || (target["_style"] = target.style)).cssText
        :
            target["_css"]
    );
}

export function setAttribute(target, attr, value){

    const key = "_attr_" + attr;

    if(target[key] !== value){

        target.setAttribute(attr, value);
        target[key] = value;
    }

    return this;
}

export function getAttribute(target, attr){

    const key = "_attr_" + attr;

    return (

        typeof target[key] === "undefined" ?

            target[key] = target.getAttribute(attr)
        :
            target[key]
    );
}

export function hasAttribute(target, attr){

    return typeof getAttribute(target, attr) === "string";
}

export function removeAttribute(target, attr){

    const key = "_attr_" + attr;

    if(target[key] !== null){

        target[key] = null;
        target.removeAttribute(attr);
    }

    return this;
}