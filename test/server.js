process.env.NODE_ENV = "production";
const express = require("express");
const mikado = require("../express");
const ssr = require("../ssr");
const app = express();
const state = {};

// Example Setup Direct SSR (No Express)
// -----------------------------------

mikado.options.debug = false;
mikado.options.compression = true;
mikado.options.state = state;
mikado.options.cache = true;
mikado.options.csr = true

// dynamic route:

app.post("/ssr/:template/", express.json(), function(req, res){

    const tpl = ssr.compile("tpl/" + req.params.template)
    const html = tpl.render(req.body, state);

    res.send(html).end();
});



// Example Setup Express
// -----------------------------------

app.set("views", [
    __dirname + "/tpl"
    // ...
]);

// register engine to filetype .html
app.engine("html", mikado);
// enable engine fore filetype .html
app.set("view engine", "html");
app.set("view compression", false /*env === "production"*/);
app.set("view cache", 200);
app.set("view debug", true);

// dynamic route:

app.post("/express/:template/", express.json(), function(req, res){

    res.render(req.params.template, {
        data: req.body,
        state
    });
});

// Start Server
// -----------------------------------

app.use("/", express.static("../", { index: "test/index.html" }));

app.listen("8080", function(err){

    if(err) throw err;
    console.info("Server running on http://localhost:8080");
});
