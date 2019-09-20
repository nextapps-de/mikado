import Mikado from "./mikado.js";
import "./export.js";
import {
    getAttribute,
    getClass,
    getCSS,
    getHTML,
    getText,
    hasAttribute,
    hasClass,
    removeAttribute,
    setAttribute,
    setClass,
    setCSS,
    setHTML,
    setText,
    setStyle,
    getStyle
} from "./cache.js";

if(SUPPORT_CACHE && SUPPORT_HELPERS){

    /** @export */
    Mikado.setText = setText;
    /** @export */
    Mikado.getText = getText;
    /** @export */
    Mikado.setHTML = setHTML;
    /** @export */
    Mikado.getHTML = getHTML;
    /** @export */
    Mikado.setClass = setClass;
    /** @export */
    Mikado.getClass = getClass;
    /** @export */
    Mikado.hasClass = hasClass;
    /** @export */
    Mikado.setStyle = setStyle;
    /** @export */
    Mikado.getStyle = getStyle;
    /** @export */
    Mikado.setCSS = setCSS;
    /** @export */
    Mikado.getCSS = getCSS;
    /** @export */
    Mikado.setAttribute = setAttribute;
    /** @export */
    Mikado.getAttribute = getAttribute;
    /** @export */
    Mikado.hasAttribute = hasAttribute;
    /** @export */
    Mikado.removeAttribute = removeAttribute;
}

(function(){

    const name = "Mikado";
    const factory = Mikado;
    const root = this || window;
    let prop;

    // AMD (RequireJS)
    if((prop = root["define"]) && prop["amd"]){

        prop([], function(){

            return factory;
        });
    }
    // Closure (Xone)
    else if((prop = root["modules"])){

        prop[name.toLowerCase()] = factory;
    }
    // CommonJS (Node.js)
    else if(typeof root["exports"] === "object"){

        /** @export */
        root["module"].exports = factory;
    }
    // Global (window)
    else{

        root[name] = factory;
    }

}());