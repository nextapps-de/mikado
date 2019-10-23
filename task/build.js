const child_process = require('child_process');
const fs = require('fs');

console.log("Start build .....");
console.log();

fs.existsSync("log") || fs.mkdirSync("log");
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
            /*
            else if(index === "USE_POLYFILL"){

                use_polyfill = val;
            }
            */
            else{

                flag_str += " --define='" + index + "=" + val + "'";
                arr[index] = val;
            }

            if(count > 3) console.log(index + ': ' + val);
        }
    });

    console.log('RELEASE: ' + (arr['RELEASE'] || 'custom'));

    return arr;

})(process.argv);

const light_version = (options["RELEASE"] === "light") || (process.argv[2] === "--light");
const es5_version = (options["RELEASE"] === "es5") || (process.argv[2] === "--es5");
//const extern = process.argv[2] === "--extern";

let parameter = (function(opt){

    let parameter = '';

    for(let index in opt){

        if(opt.hasOwnProperty(index)){

            parameter += ' --' + index + '=' + opt[index];
        }
    }

    return parameter;
})({

    compilation_level: options["RELEASE"] === "pre" ? "SIMPLE" : (options["RELEASE"] === "debug" ? "WHITESPACE" : "ADVANCED_OPTIMIZATIONS"), //"SIMPLE"
    use_types_for_optimization: true,
    //new_type_inf: true,
    jscomp_warning: "newCheckTypes",
    //jscomp_error: "strictCheckTypes",
    jscomp_error: "newCheckTypesExtraChecks",
    generate_exports: true,
    export_local_property_definitions: true,
    language_in: "ECMASCRIPT6_STRICT",
    language_out: language_out || "ECMASCRIPT5_STRICT",
    process_closure_primitives: true,
    summary_detail_level: 3,
    warning_level: "VERBOSE",
    emit_use_strict: true,

    output_manifest: "log/manifest.log",
    output_module_dependencies: "log/module_dependencies.log",
    property_renaming_report: "log/property_renaming.log",
    create_source_map: "log/source_map.log",
    variable_renaming_report: "log/variable_renaming.log",
    strict_mode_input: true,
    assume_function_wrapper: true,

    transform_amd_modules: true,
    process_common_js_modules: true,
    module_resolution: "BROWSER",
    //dependency_mode: "SORT_ONLY",
    //js_module_root: "./",
    entry_point: "./tmp/browser.js",
    //manage_closure_dependencies: true,
    dependency_mode: "PRUNE_LEGACY",
    rewrite_polyfills: use_polyfill || false,

    isolation_mode: "IIFE"
    //output_wrapper: "(function(){%output%}());"

    //formatting: "PRETTY_PRINT"
});

if(options["RELEASE"] === "pre" || options["RELEASE"] === "debug"){
    parameter += ' --formatting=PRETTY_PRINT';
}

const custom = (!options["RELEASE"] || (options["RELEASE"] === "custom"));

if(custom){

    options["RELEASE"] = "custom." + hashCode(parameter + flag_str).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

const files = [

    "mikado.js",
    "browser.js",
    "config.js",
    "event.js",
    "helper.js",
    "type.js",
    "cache.js",
    "export.js",
    "store.js",
    "proxy.js",
    "array.js",
    "compile.js",
    "polyfill.js"
];

const prename = require('./prename.json');

files.forEach(function(file){

    let src = String(fs.readFileSync("src/" + file));

    if(options["RELEASE"] !== "pre" && options["RELEASE"] !== "debug"){

        for(let key in prename){

            if(prename.hasOwnProperty(key)){

                src = src.replace(new RegExp(key, "g"), prename[key]);
            }
        }
    }

    fs.writeFileSync("tmp/" + file, src);
});

var filename = "dist/mikado." + (options["RELEASE"] || "custom") + ".js";

exec("java -jar node_modules/google-closure-compiler-java/compiler.jar" + parameter + " --js='tmp/**.js'" + flag_str + " --js_output_file='" + filename + "' && exit 0", function(){

    let build = fs.readFileSync(filename);
    let preserve = fs.readFileSync("src/mikado.js", "utf8");

    const package_json = require("../package.json");
    const postname = require('./postname.json');

    preserve = preserve.replace("* Mikado.js", "* Mikado.js v" + package_json.version + (light_version ? " (Light)" : es5_version ? " (ES5)" : ""));
    build = preserve.substring(0, preserve.indexOf('*/') + 2) + "\n" + build;

    for(let key in postname){

        if(postname.hasOwnProperty(key)){

            build = build.replace(new RegExp(key, "g"), postname[key]);
        }
    }

    if(options["RELEASE"] === "pre"){

        fs.existsSync("test/dist") || fs.mkdirSync("test/dist");
        fs.writeFileSync("test/" + filename, build);
    }
    else{

        fs.writeFileSync(filename, build);
    }

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
