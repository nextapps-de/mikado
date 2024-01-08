const child_process = require("child_process");
const fs = require("fs");
const debug = process.argv[2] && process.argv[2].toLowerCase().includes("debug=true");
const minify = process.argv[2] && process.argv[2].toLowerCase().includes("release=min");

console.log("Start build .....");
console.log('Bundle: ' + ('module' /* 'custom' */) + (debug ?  ":debug" : (minify ?  ":min" : "")));

//fs.existsSync("log") || fs.mkdirSync("log");
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
    "proxy.js",
    "array.js",
    "compile.js",
    //"polyfill.js"
];

files.forEach(function(file){

    let src = String(fs.readFileSync("src/" + file));
    src = src.replace(/\/\/ COMPILER BLOCK -->(.*)<-- COMPILER BLOCK/gs, "");
    fs.writeFileSync("tmp/" + file, src);
});

fs.copyFileSync("task/babel." + (debug ? "debug": (minify ? "min" : "bundle")) + ".json", "tmp/.babelrc");

exec("npx babel tmp -d dist/module" + (debug ? "-debug" : (minify ? "-min --minified --compact true" : "")) + " --config-file tmp/.babelrc && exit 0", function(){

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
