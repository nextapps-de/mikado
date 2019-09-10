import Mikado from "./mikado.js";

if(SUPPORT_CACHE){

    Mikado.prototype["setText"] = function(target, text){

        if(target["_text"] !== text){

            target.nodeValue = text;
            target["_text"] = text;
        }

        return this;
    };

    // TODO: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype["setHTML"] = function(target, html){

        if(target["_html"] !== html){

            target.innerHTML = html;
            target["_html"] = html;
        }

        return this;
    };

    // OK: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype["setClass"] = function(target, class_name){

        if(target["_class"] !== class_name){

            target.className = class_name;
            target["_class"] = class_name;
            target["_class_cache"] = null; // TODO: Xone compatibility
        }

        return this;
    };

    // Ok: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype["setStyle"] = function(target, style, value){

        const style_cache = target["_style_cache"] || (target["_style_cache"] = {});

        if(style_cache[style] !== value){

            style_cache[style] = value;
            (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
            target["_css"] = null;
        }

        return this;
    };

    /*
    Mikado.prototype["setStyle"] = function(target, style, value){

        const key = "_style_" + style;

        if(target[key] !== value){

            (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
            target[key] = value;
        }

        return this;
    };
    */

    // OK: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype["setCSS"] = function(target, style){

        if(target["_css"] !== style){

            (target["_style"] || (target["_style"] = target.style)).cssText = style;
            target["_css"] = style;
            target["_style_cache"] = null; // TODO: Xone Compatibility
        }

        return this;
    };

    // https://jsperf.com/data-dataset/43
    // NOTE: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype["setAttribute"] = function(target, attr, value){

        const key = "_attr_" + attr;

        if(target[key] !== value){

            target.setAttribute(attr, value);
            target[key] = value;
        }

        return this;
    };
}