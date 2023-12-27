const MikadoSSR = require("../ssr/");
let init;

function engine(filePath, data, callback){

    if(!init){

        init = true;
        MikadoSSR.state = engine.state;
        MikadoSSR.options = engine.options;

        const settings = data.settings;

        if(settings){

            let tmp;
            ((tmp = settings["view engine"] || settings["view extension"])) && (MikadoSSR.options.extension = tmp);
            (typeof (tmp = settings["view compression"]) !== "undefined") && (MikadoSSR.options.compression = tmp);
            (typeof (tmp = settings["view cache"]) !== "undefined") && (MikadoSSR.options.cache = tmp);
            (typeof (tmp = settings["view debug"]) !== "undefined") && (MikadoSSR.options.debug = tmp);
        }
    }

    return callback(/* err */ null, MikadoSSR.compile(filePath).apply(data));
}

//engine.__express = engine;
engine.options = MikadoSSR.options;
engine.state = MikadoSSR.state;
module.exports = engine;