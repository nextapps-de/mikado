#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");
const compile = require("./compile.js");

class CommandError extends Error {
    constructor(message) {
        super(message);
        this.name = "CommandError";
    }
}

const parameter = parse_argv(process.argv, {
    force: 1, f: 1,
    pretty: 1, p: 1,
    watch: 1, w: 1,
    compact: 1, c: 1,
    inline: 1, i: 1,
    help: 1, h: 1, info: 1
});

const extension = (parameter.extension || parameter.ext || parameter.e || parameter[2] || "html").replace(/^\./, "");
const src = (parameter.source || parameter.src || parameter.s || parameter[0] || "").replace(/^\.[/\\]/, "");
const dest = (parameter.destination || parameter.dest || parameter.d || parameter[1] || "").replace(/^\.[/\\]/, "");
const force = parameter.force || parameter.f || false;
const pretty = parameter.pretty || parameter.p || false;
const type = parameter.type || parameter.t || false;
let mode = parameter.mode || parameter.m || "default";
const compact = mode === "compact" || parameter.compact || parameter.c || false;
const inline = !compact && (mode === "inline" || parameter.inline || parameter.i || false);
const watch = parameter.watch || parameter.w || false;
const help = parameter.help || parameter.info || parameter.h || false;
const extension_regex = new RegExp("\." + extension + "$");

if(help){

    console.log("");
    console.log("Mikado Compiler CLI (Help)");
    console.log("------------------------------------------");
    console.log("--src {filepath}\tThe source file or folder. It should be the most inner folder which is covering every template. This also influences the template auto naming.");
    console.log("-s {filepath}");
    console.log("");
    console.log("--dest {filepath}\tThe destination file or folder. When not set the destination files will be saved into the source folders.");
    console.log("-d {filepath}");
    console.log("");
    console.log("--force\t\t\tSilently replace existing destination files.");
    console.log("-f");
    console.log("");
    console.log("--pretty\t\tDoes not minify the output.");
    console.log("-p");
    console.log("");
    console.log("--extension html\tSpecify the extension of files which should be compiled.");
    console.log("--ext .html");
    console.log("-e html");
    console.log("");
    console.log("--type module|es5\tSpecify if the template should be exported as ES6 module or as a legacy ES5 script.");
    console.log("-t module|es5")
    console.log("");
    console.log("--mode compact|inline\tSwitch the build strategy to optimize either the performance or size.");
    console.log("-m compact|inline");
    console.log("--compact");
    console.log("-c");
    console.log("--inline");
    console.log("-i");
    console.log("");
    console.log("--watch\t\t\tStart a watcher to automatically compile given sources when files has changed (for development purposes only).");
    console.log("-w")

    return;
}

if(!src){

    throw new CommandError("No file/folder source specified by the flag --src");
}

if(type && type !== "module" && type !== "es5"){

    throw new CommandError("Unknown type '" + type + "' was passed by the flag --type");
}

if(mode && mode !== "compact" && mode !== "inline" && mode !== "default"){

    throw new CommandError("Unknown mode '" + mode + "' was passed by the flag --mode");
}

if(compact) mode = "compact";
else if(inline) mode = "inline";

function parse_argv(argv, flags){

    const payload = Object.create(null);

    for(let i = 2, flag = "", count = 0; i < argv.length; i++){

        const current = argv[i];

        if(current.startsWith("-")){

            flag = current.replace(/-+/g, "");

            if(flags[flag]){

                payload[flag] = true;
                flag = "";
            }
            else if(flag.includes("=")){

                flag = flag.split("=");
                payload[flag[0]] = flag[1];
            }
        }
        else{

            if(flag){

                payload[flag] = current;
                flag = "";
            }
            else{

                payload[count++] = current;
            }
        }
    }

    return payload;
}

function compiler(name, _force){

    const relPath = path.join(src, name);

    return compile(relPath, dest, {
        force: _force || force,
        root: src,
        extension,
        pretty,
        mode,
        type
    });
}

const skip = {};
const repeat = {};

function watcher(src) {

    console.info("Watching: " + src);

    fs.watch(src, async function(eventType, name){

        if(eventType === "change"){

            if(!skip[name]){

                skip[name] = true;

                if(extension_regex.test(name)){

                    await compiler(name, true);
                    repeat[name] = false;

                    setTimeout(function(){

                        repeat[name] && compiler(name, true);
                        repeat[name] = false;
                        skip[name] = false;

                    }, 250);
                }
            }
            else{

                repeat[name] = true;
            }
        }
    });
}

async function loopFiles(file, callback) {

    const dir = await fs.promises.opendir(file, { recursive: true });

    for await(const dirent of dir) {

        const name = path.join(file, dirent.name).replace(/\\/g, "/");
        dirent.isDirectory() ? await loopFiles(name, callback) : callback(name.replace(src, ""));
    }
}

function stdin(query) {

    const cmd = readline.createInterface({

        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(function(resolve){

        cmd.question(query, function(result){

            cmd.close();
            resolve(result);
        })
    });
}

async function check(name, type){

    if(extension_regex.test(name)){

        const relPath = path.join(src, name.replace(extension_regex, (type === "es5" ? ".es5" : "") + ".js"));

        if(await fs.promises.stat(relPath).catch(e=>{})){

            return relPath + "\n";
        }
    }

    return "";
}

(async function(){

    if(watch){

        watcher(src);
    }
    else{

        console.log("Compile templates with '" + mode + "' strategy ...");

        let exist = "";
        let is_dir = (await fs.promises.lstat(src)).isDirectory();

        if(!force){

            if(is_dir){

                await loopFiles(src, async function(name){

                    if(type === "es5" || type === false){

                        exist += await check(name, "es5");
                    }

                    if(type === "module" || type === false){

                        exist += await check(name, "module");
                    }
                });
            }
            else{

                if(type === "es5" || type === false){

                    exist += await check(src, "es5");
                }

                if(type === "module" || type === false){

                    exist += await check(src, "module");
                }
            }
        }

        if(exist){

            const query = await stdin(exist + "\nThe files listed above gets overwritten. Continue? (y/n): ");

            if(query.toLowerCase().trim() !== "y"){

                console.log("Aborted.");
                return;
            }
        }

        if(is_dir){

            await loopFiles(src, async function(name){

                if(extension_regex.test(name)){

                    await compiler(name);
                }
            });
        }
        else{

            if(extension_regex.test(src)){

                await compiler("");
            }
        }

        console.log("Done.");
    }
})();
