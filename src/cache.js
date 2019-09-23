export function setText(target, text){

    if(target["_text"] !== text){

        target.nodeValue = text;
        target["_text"] = text;
    }

    return this;
}

export function getText(target){

    return (

        typeof target["_text"] === "undefined" ?

            target["_text"] = target.nodeValue
        :
            target["_text"]
    );
}

// TODO: when rendering on a modified template all states hast to reset to its default template values

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

// OK: when rendering on a modified template all states hast to reset to its default template values

export function setClass(target, class_name){

    if(target["_class"] !== class_name){

        target.className = class_name;
        target["_class"] = class_name;
        target["_class_cache"] = null; // TODO: Xone compatibility
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

    if(typeof target["_class"] === "undefined"){

        target["_class"] = target.className;
    }

    return ("#" + target["_class"].replace(/ /g, "#") + "#").indexOf("#" + classname + "#") !== -1;
}

// Ok: when rendering on a modified template all states hast to reset to its default template values

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

/*
export function setStyle(target, style, value){

    const key = "_style_" + style;

    if(target[key] !== value){

        (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
        target[key] = value;
    }

    return this;
}
*/

// OK: when rendering on a modified template all states hast to reset to its default template values

export function setCSS(target, style){

    if(target["_css"] !== style){

        (target["_style"] || (target["_style"] = target.style)).cssText = style;
        target["_css"] = style;
        target["_style_cache"] = null; // TODO: Xone Compatibility
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

// https://jsperf.com/data-dataet/43
// NOTE: when rendering on a modified template all states hast to reset to its default template values

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

    const key = "_attr_" + attr;

    if(typeof target[key] === "undefined"){

        target[key] = target.getAttribute(attr);
    }

    return !!target[key] ;
}

export function removeAttribute(target, attr){

    const key = "_attr_" + attr;

    if(target[key]){

        delete target[key];
    }

    target.removeAttribute(attr);

    return this;
}