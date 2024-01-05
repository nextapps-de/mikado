#!/usr/bin/env node

const ws = require("web-servo");
let port = process.argv[2] || 8080;

// if(!port){
//
//     if(/^win/.test(process.platform)){
//
//         port = 80;
//     }
//     else{
//
//         port = 8080;
//     }
// }

ws.config({

    "server": {
        "port": port,
        "dir": "../",
        "exitOnError": false,
        "ssl": {
            "enabled": false,
            "key": "",
            "cert": ""
        }
    },
    "page": {
        "default": "test/index.html"
    },
    "methods": {
        "allowed": [
            "OPTIONS",
            "GET",
            "POST",
            "HEAD",
            "PUT",
            "PATCH",
            "DELETE"
            //"COPY",
            //"LINK",
            //"UNLINK",
            //"TRACE",
            //"CONNECT"
        ]
    }
});

//ws.setConfigVar('server.port', port);
ws.silent().start();

console.info("Server listening on: http://localhost" + (+port !== 80 ? ":" + port : ""));
console.log("-----------------------------------------------------");
console.log("Hit CTRL-C to stop the server...");
