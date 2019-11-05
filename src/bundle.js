import Mikado from "./mikado.js";
import "./export.js";
import compile from "./compile.js";
import array from "./array.js";
import {
    getAttribute,
    getClass,
    getCSS,
    getHTML,
    getText,
    hasAttribute,
    hasClass,
    toggleClass,
    removeClass,
    addClass,
    removeAttribute,
    setAttribute,
    setClass,
    setCSS,
    setHTML,
    setText
} from "./cache.js";

if(SUPPORT_COMPILE){

    Mikado["compile"] = compile;
}

if(SUPPORT_REACTIVE){

    Mikado["array"] = array;
}

if(SUPPORT_CACHE && SUPPORT_CACHE_HELPERS){

    Mikado["setText"] = setText;
    Mikado["getText"] = getText;
    Mikado["setHTML"] = setHTML;
    Mikado["getHTML"] = getHTML;
    Mikado["setClass"] = setClass;
    Mikado["getClass"] = getClass;
    Mikado["hasClass"] = hasClass;
    Mikado["toggleClass"] = toggleClass;
    Mikado["removeClass"] = removeClass;
    Mikado["addClass"] = addClass;
    Mikado["setCSS"] = setCSS;
    Mikado["getCSS"] = getCSS;
    Mikado["setAttribute"] = setAttribute;
    Mikado["getAttribute"] = getAttribute;
    Mikado["hasAttribute"] = hasAttribute;
    Mikado["removeAttribute"] = removeAttribute;
}

const name = "Mikado";
const root = window;
let prop;

// AMD (RequireJS)
if((prop = root["define"]) && prop["amd"]){

    prop([], function(){

        return Mikado;
    });
}
// Closure (Xone)
// else if((prop = root["modules"])){
//
//     prop[name.toLowerCase()] = Mikado;
// }
// CommonJS (Node.js)
else if(typeof root["exports"] === "object"){

    /** @export */
    root["module"].exports = Mikado;
}
// Global (window)
else{

    root[name] = Mikado;
}
