const env = require("./env");
const config = require("../package.json");
const app = require("express")();
const fs = require('fs');
const zlib = require('zlib');
const { isMaster } = require("cluster");

app.disable("x-powered-by");

/* Enforce SSL
-----------------------------------------------*/

if(config.force_ssl) {

    app.use(function(req, res, next){

        if(req.secure ||
          (req.protocol === "https") ||
          (req.get("x-forwarded-proto") === "https")){

            next();
        }
        else{

            res.redirect("https://" + req.headers.host + req.url);
        }
    });
}

/* CORS
-----------------------------------------------*/

app.use(function(req, res, next){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* Routes
-----------------------------------------------*/

app.get("/", function(req, res, next){

    res.end("Server running.\n\nUse API like {host}:{port}/:{type}/path/to/template.html, e.g. localhost:3000/json/template/app.html");
});

app.get("/:type/*", function(req, res, next){

    const type = req.params.type || "json";
    const tpl = req.path.replace(type, "");

    if(!tpl) return next();

    let filename = __dirname + '/cache' + tpl.replace(".html", "." + (type !== "json" ? "js" : type));

    if(fs.existsSync(filename)){

        const stats_tpl = fs.statSync(__dirname + "/../" + tpl);
        const stats_json = fs.statSync(filename);

        if(stats_tpl.mtime < stats_json.mtime){

            res.set('Content-Type', 'application/json');

            if(!req.headers["x-no-compression"]){

                res.header('Content-Encoding', 'gzip');
                return res.sendFile(filename + ".gz");
            }

            return res.sendFile(filename);
        }
    }
    else{

        const path = filename.split("/");
              path.pop();

        fs.mkdirSync(path.join("/"), { recursive: true });
    }

    try{

        const compiler = require(__dirname + "/../task/compile.js");
        const template = compiler(tpl, "server/cache/" + tpl.replace(".html", "." + (type !== "json" ? "js" : type)), type);

        if(type === "es6"){

            res.set('Content-Type', 'text/javascript');
            res.end(template);
        }
        else{

            res.set('Content-Type', 'application/json');
            res.end(template);
        }

        const gzip = zlib.createGzip();
        const r = fs.createReadStream(filename);
        const w = fs.createWriteStream(filename + ".gz");

        r.pipe(gzip).pipe(w);
    }
    catch(e){

        return next(e);
    }

    next();
});

/* Start HTTPS Server
-----------------------------------------------*/

if(config.https || config.force_ssl){

    const { readFileSync, existsSync } = require("fs");

    if(existsSync("../../cert/" + env + ".pem") &&
       existsSync("../../cert/" + env + ".crt")){

        const { createServer } = require("https");

        createServer({

            key: readFileSync("../../cert/" + env + ".pem", "utf8"),
            cert: readFileSync("../../cert/" + env + ".crt", "utf8")

        }, app).listen(config.port_ssl, function(err){

            if(err) throw err;

            console.info("Server@" + process.pid + " listening on https://localhost" + (config.port_ssl !== 443 ? ":" + config.port_ssl : ""));
        });
    }
    else{

       console.info("Could not find certificates located at: /certs. Therefore HTTPS server can't initialize.");
    }
}

/* Start HTTP Server
-----------------------------------------------*/

if(!config.force_ssl){

    const server = app.listen(config.port || 3000, function(err){

        if(err) throw err;

        console.info("Server@" + process.pid + " listening on http://localhost" + (config.port !== 80 ? ":" + (config.port || 3000) : ""));
    });

    if(process.env.NODE_ENV === "test"){

        module.exports = server;
    }
}
