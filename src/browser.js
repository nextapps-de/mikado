import Mikado from "./mikado.js";

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