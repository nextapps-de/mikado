const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const baseDir = path.resolve(__dirname + "/../");

const httpServer = http.createServer((request, response) => {

    const parsedUrl = url.parse(request.url, true);
    const pathName = parsedUrl.pathname + (request.url.endsWith("/") ? "index.html" : "");

    // Get the contentType based on the file extension
    const responseContentType = getContentType(pathName);
    // Set the "Content-Type" in response header
    response.setHeader("Content-Type", responseContentType);

    fs.readFile(baseDir + pathName, function(error, data){

        if(error){

            //console.error(error);
            response.writeHead(404);
            response.end("404 - File Not Found");
        }
        else{

            response.writeHead(200);
            response.end(data);
        }
    });
});

/** @enum {string} */
const mimeTypes = {
    ".html": "text/html",
    ".jgp": "image/jpeg",
    ".css": "text/css",
    ".svg": "image/svg",
    ".js": "text/javascript",
    ".png": "image/png",
    ".ico": "image/x-icon"
};

// Get the content type for a given path
const getContentType = pathName => {
    // Set the default content type
    let contentType = "application/octet-stream";

    // Set the contentType based on mime type
    for(const key in mimeTypes) {

        if(new RegExp("\\" + key + "(\\?|$)").test(pathName)) {

            contentType = mimeTypes[key];
        }
    }
    return contentType;
};

function init(port, host){

    httpServer.listen(port, function(){

        console.log(`\x1b[32m%s\x1b[0m`, `Server is running at http://${host}:${port}/src/`);
    });
}

init(8080, "localhost");
