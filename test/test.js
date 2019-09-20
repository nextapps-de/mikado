if(typeof module !== "undefined"){

    // var env = (process.argv[3] === "test" ? "min" : process.argv[3] === "test/" ? "light" : process.argv[3] === "test/test.js" ? "pre" : "");
    // var expect = require("chai").expect;
    // var Mikado = require("../" + (env ? "dist/": "") + "mikado" + (env ? "." + env : "") + ".js");
}

var root_1 = document.getElementById("root-1");
var root_2 = document.getElementById("root-2");
var root_3 = document.getElementById("root-3");
var data = window.data;

describe("Initialize", function(){

    var mikado = new Mikado("template");

    it("Should have been initialized successfully", function(){

        expect(mikado).to.be.an.instanceOf(Mikado);

        expect(Mikado).to.hasOwnProperty("register");
        expect(Mikado).to.respondTo("unload");
        expect(Mikado).to.respondTo("load");
        expect(Mikado).to.hasOwnProperty("once");
        expect(Mikado).to.hasOwnProperty("new");
    });

    it("Should have all helper functions", function(){

        expect(Mikado).to.hasOwnProperty("setText");
        expect(Mikado).to.hasOwnProperty("getText");
        expect(Mikado).to.hasOwnProperty("setHTML");
        expect(Mikado).to.hasOwnProperty("getHTML");
        expect(Mikado).to.hasOwnProperty("setClass");
        expect(Mikado).to.hasOwnProperty("getClass");
        expect(Mikado).to.hasOwnProperty("hasClass");
        expect(Mikado).to.hasOwnProperty("removeClass");
        expect(Mikado).to.hasOwnProperty("toggleClass");
        expect(Mikado).to.hasOwnProperty("setStyle");
        expect(Mikado).to.hasOwnProperty("getStyle");
        expect(Mikado).to.hasOwnProperty("setCSS");
        expect(Mikado).to.hasOwnProperty("getCSS");
        expect(Mikado).to.hasOwnProperty("setAttribute");
        expect(Mikado).to.hasOwnProperty("getAttribute");
        expect(Mikado).to.hasOwnProperty("hasAttribute");
        expect(Mikado).to.hasOwnProperty("removeAttribute");
    });

    it("Should have all provided methods", function(){

        expect(mikado).to.hasOwnProperty("state");
        expect(mikado).to.hasOwnProperty("store");
        expect(mikado).to.respondTo("load");
        expect(mikado).to.respondTo("update");
        expect(mikado).to.respondTo("sync");
        expect(mikado).to.respondTo("replace");
        expect(mikado).to.respondTo("render");
        expect(mikado).to.respondTo("refresh");
        expect(mikado).to.respondTo("unload");
        expect(mikado).to.respondTo("remove");
        expect(mikado).to.respondTo("node");
        expect(mikado).to.respondTo("init");
        expect(mikado).to.respondTo("mount");
        expect(mikado).to.respondTo("item");
        expect(mikado).to.respondTo("index");
        expect(mikado).to.respondTo("destroy");
        expect(mikado).to.respondTo("create");
        expect(mikado).to.respondTo("clear");
        expect(mikado).to.respondTo("cancel");
        expect(mikado).to.respondTo("append");
        expect(mikado).to.respondTo("add");
        expect(mikado).to.respondTo("route");
        expect(mikado).to.respondTo("listen");
        expect(mikado).to.respondTo("unlisten");
        expect(mikado).to.respondTo("export");
        expect(mikado).to.respondTo("import");
        expect(mikado).to.respondTo("move");
        expect(mikado).to.respondTo("up");
        expect(mikado).to.respondTo("down");
        expect(mikado).to.respondTo("first");
        expect(mikado).to.respondTo("last");
        expect(mikado).to.respondTo("swap");
    });
});

describe("Mount", function(){

    it("Should have been mounted properly", function(){

        var mikado = new Mikado("template");
        mikado.mount(root_1);
        expect(mikado.root).to.equal(root_1);
        expect(mikado.root["_tpl"]).to.equal("template");
        expect(mikado.dom).to.equal(root_1["_dom"]);
    });

    it("Should have been re-mounted properly", function(){

        var mikado = new Mikado("template");
        mikado.mount(root_2);
        expect(mikado.root).to.equal(root_2);
        expect(mikado.root["_tpl"]).to.equal("template");
        expect(mikado.dom).to.equal(root_2["_dom"]);
    });

    it("Should have been mounted during initialization properly", function(){

        var mikado = new Mikado(root_3, "template");
        expect(mikado.root).to.equal(root_3);
        expect(mikado.root["_tpl"]).to.equal("template");
        expect(mikado.dom).to.equal(root_3["_dom"]);
    });
});

describe("Render", function(){

    it("Should not have been rendered", function(){

        var mikado = new Mikado(root_1, "template");

        mikado.render();

        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);

        mikado.render([]);

        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);

        mikado.render(null);

        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);

        mikado.render(undefined);

        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);
    });

    it("Should have been rendered properly", function(){

        var mikado = new Mikado(root_1, "template");

        mikado.render(data);

        expect(mikado.length).to.equal(data.length);
        expect(mikado.dom.length).to.equal(data.length);
        expect(mikado.dom).to.equal(mikado.root["_dom"]);
        expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
        expect(mikado.dom[data.length - 1]).to.equal(root_1.lastElementChild);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been rendered properly (single item)", function(){

        var mikado = new Mikado(root_1, "template");

        mikado.render(data[0]);

        expect(mikado.length).to.equal(1);
        expect(mikado.dom.length).to.equal(1);
        expect(mikado.dom).to.equal(mikado.root["_dom"]);
        expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been indexed properly", function(){

        var mikado = new Mikado(root_1, "template");

        mikado.render(data);

        expect(mikado.dom[0]["_idx"]).to.equal(0);
        expect(mikado.dom[data.length - 1]["_idx"]).to.equal(data.length - 1);
    });

    it("Should have been re-mounted properly", function(){

        var mikado = new Mikado("template");
        mikado.mount(root_1).render(data.slice(0, 9));
        mikado.mount(root_2).render(data.slice(10, 19));

        mikado.mount(root_1);

        expect(mikado.dom).to.equal(root_1._dom);
        expect(mikado.dom[0]["_idx"]).to.equal(0);
        expect(mikado.dom[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);

        mikado.mount(root_2);

        expect(mikado.dom).to.equal(root_2._dom);
        expect(mikado.dom[0]["_idx"]).to.equal(0);
        expect(mikado.dom[0].dataset.id).to.equal(data[10]["id"]);
        validate(mikado.dom[0], data[10]);

        mikado.mount(root_1);

        expect(mikado.dom).to.equal(root_1._dom);
        expect(mikado.dom[0]["_idx"]).to.equal(0);
        expect(mikado.dom[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been cleared properly", function(){

        var mikado = new Mikado(root_1, "template");

        mikado.render(data);

        expect(mikado.length).to.equal(data.length);
        expect(mikado.dom.length).to.equal(data.length);

        mikado.clear();

        expect(mikado.dom).to.equal(root_1._dom);
        expect(mikado.dom.length).to.equal(0);
        expect(mikado.length).to.equal(0);
    });
});

describe("Render (Async)", function(){

    it("Should have been rendered properly (Queue)", function(done){

        var mikado = new Mikado(root_1, "template");

        mikado.render(data, true);

        expect(mikado.root).to.equal(root_1);
        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);

        requestAnimationFrame(function(){

            expect(mikado.length).to.equal(data.length);
            expect(mikado.dom.length).to.equal(data.length);
            expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
            expect(mikado.dom[data.length - 1]).to.equal(root_1.lastElementChild);
            validate(mikado.dom[0], data[0]);

            done();
        });
    });

    it("Should have been rendered properly (Callback)", function(done){

        var mikado = new Mikado(root_1, "template");

        mikado.render(data, function(){

            expect(mikado.length).to.equal(data.length);
            expect(mikado.dom.length).to.equal(data.length);
            expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
            expect(mikado.dom[data.length - 1]).to.equal(root_1.lastElementChild);
            validate(mikado.dom[0], data[0]);

            done();
        });

        expect(mikado.root).to.equal(root_1);
        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);
    });

    it("Should have been rendered properly (Promise)", function(done){

        var mikado = new Mikado(root_1, "template", { async: true });

        mikado.render(data).then(function(){

            expect(mikado.length).to.equal(data.length);
            expect(mikado.dom.length).to.equal(data.length);
            expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
            expect(mikado.dom[data.length - 1]).to.equal(root_1.lastElementChild);
            validate(mikado.dom[0], data[0]);

            done();
        });

        expect(mikado.root).to.equal(root_1);
        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);
    });
});

describe("Update", function(){

    it("Should have been updated all properly", function(){

        var mikado = new Mikado(root_1, "template");
        mikado.render(data);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        expect(root_1.children[1].dataset.id).to.equal(data[1]["id"]);
        validate(mikado.dom[0], data[0]);
        validate(mikado.dom[1], data[1]);

        var tmp = data[0]["id"];
        data[0]["id"] = data[1]["id"];
        data[1]["id"] = tmp;

        mikado.render(data);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        expect(root_1.children[1].dataset.id).to.equal(data[1]["id"]);
        validate(mikado.dom[0], data[0]);
        validate(mikado.dom[1], data[1]);
    });

    it("Should have been updated properly (direct)", function(){

        var mikado = new Mikado(root_1, "template");
        mikado.render(data);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);

        var tmp = data[0]["id"];
        data[0]["id"] = data[1]["id"];
        data[1]["id"] = tmp;

        mikado.update(root_1.children[0], data[0]);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been refreshed properly (single)", function(){

        var mikado = new Mikado(root_1, "template", { store: data, loose: false });
        mikado.render(data);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);

        var tmp = data[0]["id"];
        data[0]["id"] = data[1]["id"];
        data[1]["id"] = tmp;

        mikado.refresh(0);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been refreshed properly (all)", function(){

        var mikado = new Mikado(root_1, "template", { store: data, loose: false });
        mikado.render(data);

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);

        var tmp = data[0]["id"];
        data[0]["id"] = data[1]["id"];
        data[1]["id"] = tmp;

        mikado.refresh();

        expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
        validate(mikado.dom[0], data[0]);
    });
});

describe("Store", function(){

    it("Should have been stored items properly", function(){

        var mikado = new Mikado(root_1, "template", { store: true, loose: false });
        mikado.render(data);

        expect(mikado.store.length).to.equal(data.length);
        expect(mikado.store[0]).to.equal(data[0]);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been referenced items properly (loose)", function(){

        var mikado = new Mikado(root_1, "template", { store: true, loose: true });

        mikado.render(data);
        expect(mikado.dom.length).to.equal(data.length);
        expect(mikado.dom[0]["_item"]).to.equal(data[0]);
        validate(mikado.dom[0], data[0]);

        mikado.render();
        expect(mikado.dom.length).to.equal(data.length);
        expect(mikado.dom[0]["_item"]).to.equal(data[0]);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been used an external store properly", function(){

        var store = data.slice(0);
        var mikado = new Mikado(root_1, "template", { store: store, loose: false });

        mikado.render();
        expect(mikado.store).to.equal(store);
        validate(mikado.dom[0], data[0]);
        validate(mikado.dom[0], store[0]);

        // swap items
        var tmp = store[0];
        store[0] = store[1];
        store[1] = tmp;
        mikado.render();
        expect(store[1]).to.equal(tmp);
        validate(mikado.dom[0], data[1]);
        validate(mikado.dom[1], data[0]);
        validate(mikado.dom[1], store[1]);

        // remove first item
        store.shift();
        mikado.render();
        expect(store[0]).to.equal(tmp);
        validate(mikado.dom[0], data[0]);
        validate(mikado.dom[0], store[0]);

        // render through over new items
        mikado.render(store[0]);
        expect(store[0]).to.equal(tmp);
        expect(mikado.store.length).to.equal(store.length);
        validate(mikado.dom[0], store[0]);

        // clear root
        mikado.clear();
        mikado.render();
        expect(store[0]).to.equal(tmp);
        expect(mikado.store.length).to.equal(store.length);

        // clear store
        store.splice(0);
        mikado.render();
        expect(mikado.length).to.equal(0);
        expect(mikado.dom.length).to.equal(0);
        expect(mikado.store.length).to.equal(0);

        // assign new store
        mikado.store = store = data.slice(0);
        mikado.render();
        expect(mikado.store).to.equal(store);
        expect(mikado.length).to.equal(store.length);
        expect(mikado.dom.length).to.equal(store.length);
        validate(mikado.dom[0], store[0]);
    });
});

if(HTMLElement.prototype.click) describe("Event", function(){

    it("Should have been attached events properly", function(done){

        var mikado = new Mikado(root_1, "template");
        mikado.render(data);

        var node = root_1.firstElementChild.firstElementChild;

        mikado.route("attach", function(target, event, self){

            expect(target).to.equal(node);
            expect(event).to.equal(window.event);
            expect(self).to.equal(target);
            done();
        });

        node.click();
    });

    it("Should have been delegated properly", function(done){

        var mikado = new Mikado(root_1, "template");
        mikado.render(data);

        var node = root_1.firstElementChild.firstElementChild.firstElementChild;

        mikado.route("delegate", function(target, event, self){

            expect(target).to.equal(root_1.firstElementChild);
            expect(event).to.equal(window.event);
            expect(self).to.equal(node);
            done();
        });

        node.click();
    });

    it("Should have been cached properly", function(done){

        var mikado = new Mikado(root_1, "template");
        mikado.render(data);

        var node = root_1.firstElementChild.firstElementChild;
        var count = 0;

        mikado.route("attach", function(target, event, self){

            expect(target).to.equal(node);
            expect(event).to.equal(window.event);
            expect(self).to.equal(target);

            if(++count === 3) done();
        });

        node.click();
        node.click();
        node.click();
    });

    it("Should have been stopped listening properly", function(done){

        var mikado = new Mikado(root_1, "template");
        mikado.render(data);

        var node = root_1.firstElementChild.firstElementChild;
        var test = true;

        mikado.route("attach", function(){
            test = false;
        });

        mikado.unlisten("click");
        node.click();

        setTimeout(function(){

            expect(test).to.equal(true);
            done();
        });
    });
});

describe("Cache", function(){

    it("Should not have been cached (cache = false)", function(){

        var mikado = new Mikado(root_1, "template", { cache: false });
        mikado.render(data);
        // cache will create during second run!
        mikado.render(data);

        var tmp = root_1.firstElementChild.dataset.id;
        root_1.firstElementChild.dataset.id = "changed";
        mikado.render(data);

        expect(root_1.firstElementChild.dataset.id).to.equal(tmp);
        validate(mikado.dom[0], data[0]);
    });

    it("Should not have been cached (reuse = false)", function(){

        var mikado = new Mikado(root_1, "template", { cache: true, reuse: false });
        mikado.render(data);
        // cache will create during second run!
        mikado.render(data);

        var tmp = root_1.firstElementChild.dataset.id;
        root_1.firstElementChild.dataset.id = "changed";
        mikado.render(data);

        expect(root_1.firstElementChild.dataset.id).to.equal(tmp);
        validate(mikado.dom[0], data[0]);
    });

    it("Should have been cached properly", function(){

        var mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
        mikado.render(data);
        // cache will create during second run!
        mikado.render(data);

        var tmp = root_1.firstElementChild.dataset.id;
        root_1.firstElementChild.dataset.id = "changed";
        mikado.render(data);

        expect(root_1.firstElementChild.dataset.id).to.equal("changed");
        validate(mikado.dom[0], Object.assign(data[0], { id: "changed" }));
    });
});

describe("Cache Helpers", function(){

    it("Should have been set attribute in sync", function(){

        var mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
        mikado.render(data);
        // cache will create during second run!
        mikado.render(data);

        var tmp = root_1.firstElementChild.dataset.id;
        Mikado.setAttribute(root_1.firstElementChild, "data-id", "changed");
        mikado.render(data);

        expect(root_1.firstElementChild.dataset.id).to.equal(tmp);
        validate(mikado.dom[0], data[0]);
    });
});

function validate(node, item){

    expect(node.outerHTML).to.equal(prototype(item));
}

function prototype(item){

    return (

        '<section root="" data-id="' + item.id + '" data-date="' + item.date + '" data-index="' + item.index + '">' +
            '<div click="attach" class="' + item.class + '" style="padding-right: 10px;">' +
                '<div class="title" click="delegate:root">' + item.title + '</div>' +
                '<div class="content">' + item.content + '</div>' +
                '<div class="footer">' + item.footer + '</div>' +
            '</div>' +
        '</section>'
    );
}