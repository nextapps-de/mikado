import Mikado from "./mikado.js";

if(SUPPORT_CACHE && SUPPORT_HELPERS){

    Mikado.prototype.setText = function(target, text){

        if(target["_text"] !== text){

            target.nodeValue = text;
            target["_text"] = text;
        }

        return this;
    };

    Mikado.prototype.getText = function(target){

        return (

            typeof target["_text"] === "undefined" ?

                target["_text"] = target.nodeValue
            :
                target["_text"]
        );
    };

    // TODO: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype.setHTML = function(target, html){

        if(target["_html"] !== html){

            target.innerHTML = html;
            target["_html"] = html;
        }

        return this;
    };

    Mikado.prototype.getHTML = function(target){

        return (

            typeof target["_html"] === "undefined" ?

                target["_html"] = target.innerHTML
            :
                target["_html"]
        );
    };

    // OK: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype.setClass = function(target, class_name){

        if(target["_class"] !== class_name){

            target.className = class_name;
            target["_class"] = class_name;
            target["_class_cache"] = null; // TODO: Xone compatibility
        }

        return this;
    };

    Mikado.prototype.getClass = function(target){

        return (

            typeof target["_class"] === "undefined" ?

                target["_class"] = target.className
            :
                target["_class"]
        );
    };

    Mikado.prototype.hasClass = function(target, classname){

        if(typeof target["_class"] === "undefined"){

            target["_class"] = target.className;
        }

        return ("#" + target["_class"].replace(/ /g, "#") + "#").indexOf("#" + classname + "#") !== -1;
    };

    // Ok: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype.setStyle = function(target, style, value){

        const style_cache = target["_style_cache"] || (target["_style_cache"] = {});

        if(style_cache[style] !== value){

            style_cache[style] = value;
            (target["_style"] || (target["_style"] = target.style)).setProperty(style, value);
            target["_css"] = null;
        }

        return this;
    };

    Mikado.prototype.getStyle = function(target, style){

        const style_cache = target["_style_cache"] || (target["_style_cache"] = {});

        return (

            typeof style_cache[style] === "undefined" ?

                style_cache[style] = (target["_style"] || (target["_style"] = target.style)).getPropertyValue(style)
            :
                style_cache[style]
        );
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

    Mikado.prototype.setCSS = function(target, style){

        if(target["_css"] !== style){

            (target["_style"] || (target["_style"] = target.style)).cssText = style;
            target["_css"] = style;
            target["_style_cache"] = null; // TODO: Xone Compatibility
        }

        return this;
    };

    Mikado.prototype.getCSS = function(target){

        return (

            typeof target["_css"] === "undefined" ?

                target["_css"] = (target["_style"] || (target["_style"] = target.style)).cssText
            :
                target["_css"]
        );
    };

    // https://jsperf.com/data-dataset/43
    // NOTE: when rendering on a modified template all states hast to reset to its default template values

    Mikado.prototype.setAttribute = function(target, attr, value){

        const key = "_attr_" + attr;

        if(target[key] !== value){

            target.setAttribute(attr, value);
            target[key] = value;
        }

        return this;
    };

    Mikado.prototype.getAttribute = function(target, attr){

        const key = "_attr_" + attr;

        return (

            typeof target[key] === "undefined" ?

                target[key] = target.getAttribute(attr)
            :
                target[key]
        );
    };

    Mikado.prototype.hasAttribute = function(target, attr){

        const key = "_attr_" + attr;

        if(typeof target[key] === "undefined"){

            target[key] = target.getAttribute(attr);
        }

        return !!target[key] ;
    };

    Mikado.prototype.removeAttribute = function(target, attr){

        const key = "_attr_" + attr;

        if(target[key]){

            delete target[key];
        }

        target.removeAttribute(attr);

        return this;
    };
}