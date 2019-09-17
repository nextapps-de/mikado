#!/usr/bin/env node

const { existsSync } = require("fs");

const param1 = process.argv[2];
const param2 = process.argv[3];
const param3 = process.argv[4];

if(!param1){

    console.warn("No method was set.");
}
else{

    process.argv[2] = param2;
    process.argv[3] = param3;

    switch(param1){

        case "-compile":
        case "compile":
            if(!existsSync("./../../mikado-compile/compile.js")){
                console.error("Error: Module was not found. Please run 'npm install mikado-compile'");
            }
            else if(!param2){
                console.error("Error: Template was not specified.");
            }
            else{
                require("./../../mikado-compile/compile");
            }
            break;

        case "-server":
        case "server":
            if(!existsSync("./../../mikado-server/server.js")){
                console.error("Error: Module was not found. Please run 'npm install mikado-server'");
            }
            else{
                require("./../../mikado-server/server");
            }
            break;

        case "?":
        case "-help":
        case "help":
            console.info("Usage: 'mikado server', 'mikado compile'");
            break;

        case "-v":
        case "-version":
        case "version":
            console.info(require("./../package.json").version);
            break;

        default:
            console.error("Error: Unknown method '" + param1 + "'.");
    }
}
