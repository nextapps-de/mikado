const child_process = require('child_process');
const fs = require('fs');

console.log("Start build .....");
//console.log("----------------------");

//fs.existsSync("log") || fs.mkdirSync("log");
fs.existsSync("tmp") || fs.mkdirSync("tmp");
fs.existsSync("dist") || fs.mkdirSync("dist");

let flag_str = "";
let language_out;
let use_polyfill;

var options = (function(argv){

    const arr = {};
    let count = 0;

    argv.forEach(function(val, index) {

        if(++count > 2){

            index = val.split('=');
            val = index[1];
            index = index[0].toUpperCase();

            if(index === "LANGUAGE_OUT"){

                language_out = val;
            }
            else if(index === "POLYFILL"){

                use_polyfill = val !== "false";
            }
            else{

                if(val === "false") val = false;

                //flag_str += " --define='" + index + "=" + val + "'";
                arr[index] = val;
            }
        }
    });

    console.log('Bundle: ' + (arr['RELEASE'] || 'custom') + (arr['DEBUG'] ?  ":debug" : ""));

    return arr;

})(process.argv);

const light_version = (options["RELEASE"] === "light") || (process.argv[2] === "--light");
const es5_version = (options["RELEASE"] === "es5") || (process.argv[2] === "--es5");
//const module_version = (options["RELEASE"] === "module") || (process.argv[2] === "--module");

let parameter = (function(opt){

    let parameter = '';

    for(let index in opt){

        if(opt.hasOwnProperty(index)){

            parameter += ' --' + index + '=' + opt[index];
        }
    }

    return parameter;
})({

    compilation_level: /*options["DEBUG"] ? "SIMPLE" :*/ "ADVANCED_OPTIMIZATIONS", //"WHITESPACE"
    use_types_for_optimization: true,
    generate_exports: true,
    export_local_property_definitions: true,
    //language_in: "ECMASCRIPT_2015",
    language_out: language_out || "ECMASCRIPT_2020",
    process_closure_primitives: true,
    summary_detail_level: 3,
    warning_level: "VERBOSE",
    //emit_use_strict: true,
    strict_mode_input: true,
    //assume_function_wrapper: true,
    process_common_js_modules: true,
    module_resolution: "BROWSER",
    entry_point: "./tmp/bundle.js",
    dependency_mode: "PRUNE",
    rewrite_polyfills: use_polyfill || false

    //isolation_mode: "IIFE"
    //output_wrapper: "%output%"
    //formatting: "PRETTY_PRINT"
});

if(options["DEBUG"]){
    parameter += ' --formatting=PRETTY_PRINT';
}

if(options["RELEASE"] !== "bundle.module" && options["RELEASE"] !== "light.module"){
    parameter += ' --isolation_mode=IIFE';
    parameter += ' --emit_use_strict=true';
}

const custom = (!options["RELEASE"] || (options["RELEASE"] === "custom"));

if(custom){

    options["RELEASE"] = "custom." + hashCode(parameter + flag_str).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

const files = [

    "mikado.js",
    "bundle.js",
    "config.js",
    "event.js",
    "helper.js",
    "type.js",
    "cache.js",
    "factory.js",
    "sanitize.js",
    //"export.js",
    //"store.js",
    "proxy.js",
    "array.js",
    //"compile.js",
    //"polyfill.js"
];

//const prename = require('./prename.json');

files.forEach(function(file){

    let src = String(fs.readFileSync("src/" + file));

    if(file === "config.js"){

        for(let opt in options){

            src = src.replace(new RegExp('(export const ' + opt + ' = )(")?[^";]+(")?;'), "$1$2" + options[opt] + "$3;");
        }
    }

    // if(options["RELEASE"] !== "pre" && options["RELEASE"] !== "debug"){
    //
    //     for(let key in prename){
    //
    //         if(prename.hasOwnProperty(key)){
    //
    //             src = src.replace(new RegExp(key, "g"), prename[key]);
    //         }
    //     }
    // }

    fs.writeFileSync("tmp/" + file, src);
});

//console.log("----------------------");

var filename = "dist/mikado." + (options["RELEASE"] || "custom") + (options["DEBUG"] ?  ".debug" : ".min") + ".js";

const executable = process.platform === "win32" ?  "\"node_modules/google-closure-compiler-windows/compiler.exe\"" :
                   process.platform === "darwin" ? "\"node_modules/google-closure-compiler-osx/compiler\"" :
                                                   "java -jar node_modules/google-closure-compiler-java/compiler.jar"

exec(executable + parameter + " --js='tmp/**.js' " + flag_str + " --js_output_file='" + filename + "' && exit 0", function(){

    let build = fs.readFileSync(filename);
    let preserve = fs.readFileSync("src/mikado.js", "utf8");

    const package_json = require("../package.json");
    //const postname = require('./postname.json');

    preserve = preserve.replace("* Mikado.js", "* Mikado.js v" + package_json.version + " (" + (light_version ? "Light" + (options["RELEASE"] === "light.module" ? "/Module" : "") : es5_version ? "ES5" : "Bundle" + (options["RELEASE"] === "bundle.module" ? "/Module" : "")) + (options["DEBUG"] ? "/Debug" : "") + ")" );
    build = preserve.substring(0, preserve.indexOf('*/') + 2) + "\n" + build;

    // for(let key in postname){
    //
    //     if(postname.hasOwnProperty(key)){
    //
    //         build = build.replace(new RegExp(key, "g"), postname[key]);
    //     }
    // }

    // if(options["RELEASE"] === "pre"){
    //
    //     fs.existsSync("test/dist") || fs.mkdirSync("test/dist");
    //     fs.writeFileSync("test/" + filename, build);
    // }
    // else{

        if(options["RELEASE"] === "bundle.module" || options["RELEASE"] === "light.module"){

            build = build.replace(/window\.Mikado(\s+)?=(\s+)?/, "export default ");
        }

        fs.writeFileSync(filename, build);

        // if(options["RELEASE"] === "light"){
        //
        //     fs.writeFileSync("test/bench/mikado-new/mikado.light.js", build);
        // }
    //}

    console.log("Saved to " + filename);
    console.log("Build Complete.");
});

function hashCode(str) {

    var hash = 0, i, chr;

    if(str.length === 0){

        return hash;
    }

    for(i = 0; i < str.length; i++){

        chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
    }

    hash = Math.abs(hash) >> 0;

    return hash.toString(16).substring(0, 5);
}

function exec(prompt, callback){

    const child = child_process.exec(prompt, function(err, stdout, stderr){

        if(err){

            console.error(err);
        }
        else{

            if(callback){

                callback();
            }
        }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
}
