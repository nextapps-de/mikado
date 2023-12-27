const child_process = require('child_process');
const fs = require('fs');
const debug = process.argv[2] && process.argv[2].toLowerCase().includes("debug=true");

console.log("Start build .....");
console.log('Bundle: ' + ('module' /* 'custom' */) + (debug ?  ":debug" : ""));

fs.existsSync("log") || fs.mkdirSync("log");
fs.existsSync("tmp") || fs.mkdirSync("tmp");
fs.existsSync("dist") || fs.mkdirSync("dist");

const files = [

    "mikado.js",
    "bundle.js",
    //"config.js",
    "event.js",
    "helper.js",
    //"type.js",
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

const prename = require('./prename.json');

files.forEach(function(file){

    let src = String(fs.readFileSync("src/" + file));

    src = src.replace(/\/\/ COMPILER BLOCK -->(.*)<-- COMPILER BLOCK/gs, "");

    if(src.indexOf("COMPILER BLOCK")>-1) console.log(src.substring(0, 300))

    // for(let key in prename){
    //
    //     if(prename.hasOwnProperty(key)){
    //
    //         src = src.replace(new RegExp(key, "g"), prename[key]);
    //     }
    // }

    fs.writeFileSync("tmp/" + file, src);
});

fs.copyFileSync("task/babel." + (debug ? "debug": "bundle") + ".json", "tmp/.babelrc");

exec("npx babel tmp -d dist/module" + (debug ? "-debug" : " --minified --compact true") + " --config-file tmp/.babelrc && exit 0", function(){

    // let build = fs.readFileSync(filename);
    // let preserve = fs.readFileSync("src/mikado.js", "utf8");
    //
    // const package_json = require("../package.json");
    // const postname = require('./postname.json');
    //
    // preserve = preserve.replace("* Mikado.js", "* Mikado.js v" + package_json.version + (light_version ? " (Light)" : es5_version ? " (ES5)" : ""));
    // build = preserve.substring(0, preserve.indexOf('*/') + 2) + "\n" + build;
    //
    // for(let key in postname){
    //
    //     if(postname.hasOwnProperty(key)){
    //
    //         build = build.replace(new RegExp(key, "g"), postname[key]);
    //     }
    // }
    //
    // if(options["RELEASE"] === "pre"){
    //
    //     // fs.existsSync("test/dist") || fs.mkdirSync("test/dist");
    //     // fs.writeFileSync("test/" + filename, build);
    // }
    // else{
    //
    //     fs.writeFileSync(filename, build);
    //
    //     // if(options["RELEASE"] === "light"){
    //     //
    //     //     fs.writeFileSync("test/bench/mikado-new/mikado.light.js", build);
    //     // }
    // }

    console.log("Build Complete.");
});

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
