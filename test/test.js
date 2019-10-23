(function(){

    if(typeof module !== "undefined"){

        // var env = (process.argv[3] === "test" ? "min" : process.argv[3] === "test/" ? "light" : process.argv[3] === "test/test.js" ? "pre" : "");
        // var expect = require("chai").expect;
        // var Mikado = require("../" + (env ? "dist/": "") + "mikado" + (env ? "." + env : "") + ".js");
    }

    var root_1 = document.getElementById("root-1");
    var root_2 = document.getElementById("root-2");
    var root_3 = document.getElementById("root-3");
    var json = window.data;

    for(var i = 0; i < json.length; i++){

        json[i]["content"] = "<p>" + json[i]["content"] + "</p>";
    }

    var items;
    var mikado;
    var data;

    beforeEach(function(){

        data = json.slice(0);

        for(var i = 0; i < data.length; i++){

            data[i] = Object.assign({}, data[i]);
        }
    });

    afterEach(function(){

        mikado && mikado.clear(true);
    });

    describe("Initialize", function(){

        it("Should have been initialized successfully", function(){

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

            mikado = new Mikado("template");

            expect(mikado).to.be.an.instanceOf(Mikado);
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
            expect(mikado).to.respondTo("data");
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

            mikado = new Mikado("template");
            mikado.mount(root_1);
            expect(mikado.root).to.equal(root_1);
            expect(mikado.root["_tpl"]).to.equal("template");
            expect(mikado.dom).to.equal(root_1["_dom"]);
        });

        it("Should have been re-mounted properly", function(){

            mikado = new Mikado("template");
            mikado.mount(root_2);
            expect(mikado.root).to.equal(root_2);
            expect(mikado.root["_tpl"]).to.equal("template");
            expect(mikado.dom).to.equal(root_2["_dom"]);
        });

        it("Should have been mounted during initialization properly", function(){

            mikado = new Mikado(root_3, "template");
            expect(mikado.root).to.equal(root_3);
            expect(mikado.root["_tpl"]).to.equal("template");
            expect(mikado.dom).to.equal(root_3["_dom"]);
        });
    });

    describe("Render", function(){

        it("Should not have been rendered", function(){

            mikado = new Mikado(root_1, "template");

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

            mikado = new Mikado(root_1, "template");

            mikado.render(data);

            expect(mikado.length).to.equal(data.length);
            expect(mikado.dom.length).to.equal(data.length);
            expect(mikado.dom).to.equal(mikado.root["_dom"]);
            expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
            expect(mikado.dom[data.length - 1]).to.equal(root_1.lastElementChild);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been rendered properly (no prefetch)", function(){

            mikado = new Mikado(root_1, "keyed", { prefetch: false });

            mikado.render(data);

            expect(mikado.length).to.equal(data.length);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been rendered properly (single data)", function(){

            mikado = new Mikado(root_1, "template");

            mikado.render(data[0]);

            expect(mikado.length).to.equal(1);
            expect(mikado.dom.length).to.equal(1);
            expect(mikado.dom).to.equal(mikado.root["_dom"]);
            expect(mikado.dom[0]).to.equal(root_1.firstElementChild);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been rendered properly (once)", function(done){

            var template = Mikado.compile("template-test");

            Mikado.once(root_1, template, data, function(){

                expect(root_1.children.length).to.equal(data.length);
                validate(root_1.children[0], data[0]);
                done();
            });
        });

        it("Should have been rendered properly (static)", function(){

            var template = Mikado.compile(
                '<section root>' +
                    '<div style="padding-right: 10px;" tap="attach">' +
                        '<div class="title" click="delegate:root">data.title</div>' +
                        '<div class="content" click="delegate:foo">data.content</div>' +
                        '<div class="footer">data.footer</div>' +
                    '</div>' +
                '</section>'
            );
            mikado = new Mikado(root_1, template);
            mikado.render(data);

            expect(root_1.children.length).to.equal(data.length);
            validate(root_1.children[0], data[0]);

            items = data.slice(0, 50);
            mikado.render(items);

            expect(root_1.children.length).to.equal(items.length);
            validate(root_1.children[0], items[0]);
        });

        it("Should have been indexed properly", function(){

            mikado = new Mikado(root_1, "template");

            mikado.render(data);

            expect(mikado.dom[0]["_idx"]).to.equal(0);
            expect(mikado.dom[data.length - 1]["_idx"]).to.equal(data.length - 1);
        });

        it("Should have been re-mounted properly", function(){

            mikado = new Mikado("template");
            mikado.mount(root_1).render(data.slice(0, 10));
            mikado.mount(root_2).render(data.slice(10, 20));

            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            expect(root_1.children[9].dataset.id).to.equal(data[9]["id"]);
            expect(root_2.children[0].dataset.id).to.equal(data[10]["id"]);
            expect(root_2.children[9].dataset.id).to.equal(data[19]["id"]);

            mikado.mount(root_1);

            expect(mikado.dom).to.equal(root_1._dom);
            expect(mikado.dom[0]["_idx"]).to.equal(0);
            expect(mikado.dom[0].dataset.id).to.equal(data[0]["id"]);
            validate(mikado.dom[0], data[0]);

            mikado.mount(root_2);

            expect(mikado.root).to.equal(root_2);
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

            mikado = new Mikado(root_1, "template");

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

            mikado = new Mikado(root_1, "template");

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

        it("Should have been canceled properly", function(done){

            mikado = new Mikado(root_1, "template");
            var test = true;

            mikado.render(data, function(){

                test = false;
            });

            mikado.cancel();

            requestAnimationFrame(function(){

                expect(test).to.equal(true);
                done();
            });
        });

        it("Should have been rendered properly (Callback)", function(done){

            mikado = new Mikado(root_1, "template");

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

            mikado = new Mikado(root_1, "template", { async: true });

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

    describe("Non-Keyed", function(){

        it("Should have been rendered properly in non-keyed mode", function(){

            items = data.slice(0, 50);
            mikado = new Mikado(root_1, "template", {reuse: true, pool: false});

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                validate(mikado.dom[i], items[i]);
            }

            items = items.concat(data.slice(50));
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
            for(var i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(var i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                validate(mikado.dom[i], items[i]);
            }
        });

        it("Should have been rendered properly in non-keyed mode (pool)", function(){

            items = data.slice(0, 50);
            mikado = new Mikado(root_1, "template", {reuse: true, pool: true});

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                validate(mikado.dom[i], items[i]);
            }

            items = items.concat(data.slice(50));
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
            for(var i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(var i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                validate(mikado.dom[i], items[i]);
            }
        });
    });

    describe("Keyed", function(){

        it("Should have been rendered properly in keyed mode", function(){

            var items = data.slice(0, 50);
            mikado = new Mikado(root_1, "keyed", {reuse: false, store: true, loose: true});

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                mikado.dom[i]._test = items[i].id;
                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.dom[i]["_data"]).to.equal(items[i]);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                validate(mikado.dom[i], items[i]);
            }

            items = items.concat(data.slice(50));
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
            for(var i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(var i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                if(mikado.dom[i]._test) expect(mikado.dom[i]._test).to.equal(items[i].id);
                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.dom[i]["_data"]).to.equal(items[i]);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                validate(mikado.dom[i], items[i]);
            }
        });

        it("Should have been rendered properly in keyed mode (exclusive)", function(){

            var items = data.slice(0, 50);
            mikado = new Mikado(root_1, "keyed", {reuse: false, keep: true, store: true, loose: false});

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                mikado.dom[i]._test = items[i].id;
                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                expect(mikado.store[i]).to.equal(items[i]);
                validate(mikado.dom[i], items[i]);
            }

            items = items.concat(data.slice(50));
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
            for(var i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(var i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                if(mikado.dom[i]._test) expect(mikado.dom[i]._test).to.equal(items[i].id);
                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                expect(mikado.store[i]).to.equal(items[i]);
                validate(mikado.dom[i], items[i]);
            }
        });

        it("Should have been rendered properly in keyed mode (cross shared)", function(){

            var items = data.slice(0, 50);
            mikado = new Mikado(root_1, "keyed", {reuse: true, pool: true});

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                validate(mikado.dom[i], items[i]);
            }

            items = items.concat(data.slice(50));
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
            for(var i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(var i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                validate(mikado.dom[i], items[i]);
            }
        });

        it("Should have been rendered properly in keyed mode (exclusive shared)", function(){

            var items = data.slice(0, 50);
            mikado = new Mikado(root_1, "keyed", {reuse: true, pool: true, keep: true});

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                validate(mikado.dom[i], items[i]);
            }

            items = items.concat(data.slice(50));
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
            for(var i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(var i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);

            mikado.render(items);

            for(var i = 0; i < items.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                expect(mikado.dom[i]["_key"]).to.equal(items[i].id);
                expect(mikado.live[items[i].id]).to.equal(mikado.dom[i]);
                validate(mikado.dom[i], items[i]);
            }
        });

        it("Should have been purged properly", function(){

            var items = data.slice(20, 30);
            mikado = new Mikado(root_1, "keyed", {reuse: true, keep: true, pool: false});

            mikado.render(data.slice(0, 10));
            mikado.render(data.slice(10, 20));
            mikado.render(items);
            mikado.dom[0]._test = "foo";
            mikado.clear().render(data.slice(0, 10));
            mikado.render(items);
            expect(mikado.dom[0]._test).to.equal("foo");

            mikado.render(data.slice(0, 10));
            mikado.purge();
            mikado.render(items);
            expect(mikado.dom[0]._test).to.undefined;
        });

        it("Should have been mounted properly", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "keyed", {reuse: false, keep: true});

            mikado.render(items);
            validate(mikado.dom[0], items[0]);
            mikado.clear().mount(root_2);
            mikado.render(items);
            validate(mikado.dom[0], items[0]);
            mikado.clear().mount(root_1);
            mikado.render(items.slice(0, 10));
            validate(mikado.dom[0], items[0]);

            // mount live pool
            mikado.mount(root_2);
            mikado.render(items.slice(10, 20));
            validate(mikado.dom[0], items[10]);
            mikado.mount(root_1);
            mikado.render(items.slice(0, 10));
            validate(mikado.dom[0], items[0]);
        });
    });

    describe("Update", function(){

        it("Should have been updated all properly", function(){

            mikado = new Mikado(root_1, "template");
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

            mikado = new Mikado(root_1, "template");
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

            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            validate(mikado.dom[0], data[0]);

            var tmp = data[0]["id"];
            data[0]["id"] = data[1]["id"];
            data[1]["id"] = tmp;

            mikado.refresh(0);

            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            validate(mikado.dom[0], data[0]);

            tmp = data[0]["id"];
            data[0]["id"] = data[1]["id"];
            data[1]["id"] = tmp;

            mikado.refresh(mikado.dom[0]);

            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been refreshed properly (all)", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            validate(mikado.dom[0], data[0]);

            var tmp = data[0]["id"];
            data[0]["id"] = data[1]["id"];
            data[1]["id"] = tmp;

            mikado.render();

            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been replaced properly", function(){

            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            mikado.replace(mikado.dom[10], data[11]);
            mikado.replace(mikado.dom[11], data[10]);

            expect(mikado.dom[10].dataset.id).to.equal(data[11]["id"]);
            expect(mikado.dom[11].dataset.id).to.equal(data[10]["id"]);
        });

        it("Should have been removed properly", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { store: items, loose: false });
            mikado.render(items);

            mikado.remove(mikado.dom[10]);
            mikado.remove(mikado.dom[10]);

            expect(mikado.dom[10].dataset.id).to.equal(data[12]["id"]);
            expect(mikado.dom[11].dataset.id).to.equal(data[13]["id"]);
        });

        it("Should have been removed multiple properly", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { store: items, loose: false });
            mikado.render(items);

            mikado.remove(mikado.dom[10], 2);

            expect(mikado.dom[10].dataset.id).to.equal(data[12]["id"]);
            expect(mikado.dom[11].dataset.id).to.equal(data[13]["id"]);
        });

        it("Should have been removed multiple from end", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { store: true, loose: false });
            mikado.render(items);

            expect(mikado.dom.length).to.equal(items.length);

            var id_a = items[9]["id"];
            var id_b = items[10]["id"];

            mikado.remove(mikado.dom[10], -2);

            expect(mikado.dom.length).to.equal(items.length - 2);
            expect(mikado.dom[9].dataset.id).to.equal(id_a);
            expect(mikado.dom[10].dataset.id).to.equal(id_b);
        });

        it("Should have been added properly", function(){

            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            mikado.add(data[10]);
            mikado.add(data[11]);
            mikado.add(data[12]);

            var length = mikado.length;
            expect(mikado.dom[length-3].dataset.id).to.equal(data[10]["id"]);
            expect(mikado.dom[length-2].dataset.id).to.equal(data[11]["id"]);
            expect(mikado.dom[length-1].dataset.id).to.equal(data[12]["id"]);
        });

        it("Should have been added to index properly", function(){

            mikado = new Mikado(root_1, "template", { store: false, loose: false });
            mikado.render(data.slice(0, 20));

            mikado.add(data[30], 10);
            mikado.add(data[31], 11);
            mikado.add(data[32], 12);

            validate(mikado.dom[10], data[30]);
            validate(mikado.dom[11], data[31]);
            validate(mikado.dom[12], data[32]);
        });

        it("Should have been replaced properly", function(){

            mikado = new Mikado(root_1, "template", { store: false, loose: false });
            mikado.render(data.slice(0, 20));

            mikado.replace(mikado.dom[10], data[30]);
            mikado.replace(mikado.dom[11], data[31]);
            mikado.replace(mikado.dom[12], data[32]);

            validate(mikado.dom[10], data[30]);
            validate(mikado.dom[11], data[31]);
            validate(mikado.dom[12], data[32]);
        });

        it("Should have been appended properly", function(){

            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            mikado.append([data[10], data[11], data[12]]);

            var length = mikado.length;
            expect(mikado.dom[length-3].dataset.id).to.equal(data[10]["id"]);
            expect(mikado.dom[length-2].dataset.id).to.equal(data[11]["id"]);
            expect(mikado.dom[length-1].dataset.id).to.equal(data[12]["id"]);
        });

        it("Should have been cleared properly", function(){

            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            mikado.clear();

            expect(mikado.length).to.equal(0);
            expect(mikado.dom.length).to.equal(0);
            expect(root_1.innerHTML).to.equal("");
        });

        it("Should have been destroyed properly", function(){

            mikado = new Mikado(root_1, "template", { store: data, loose: false });
            mikado.render(data);

            mikado.destroy();

            expect(mikado.length).to.equal(0);
            expect(mikado.dom).to.equal(null);
            expect(mikado.root).to.equal(null);
        });
    });

    describe("Store", function(){

        it("Should have been stored data properly", function(){

            mikado = new Mikado(root_1, "template", { store: true, loose: false });
            mikado.render(data);

            expect(mikado.data(0)).to.equal(data[0]);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been referenced data properly (loose)", function(){

            mikado = new Mikado(root_1, "template", { store: true, loose: true });

            mikado.render(data);
            expect(mikado.dom.length).to.equal(data.length);
            expect(mikado.dom[0]["_data"]).to.equal(data[0]);
            validate(mikado.dom[0], data[0]);

            mikado.render();
            expect(mikado.dom.length).to.equal(data.length);
            expect(mikado.dom[0]["_data"]).to.equal(data[0]);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been used an external store properly", function(){

            var store = data.slice(0);
            mikado = new Mikado(root_1, "template", { store: store, loose: false });

            mikado.render();
            expect(mikado.store).to.equal(store);
            expect(mikado.store[0]).to.equal(data[0]);
            validate(mikado.dom[0], data[0]);

            // swap data
            var tmp = store[0];
            store[0] = store[1];
            store[1] = tmp;
            mikado.refresh();
            expect(store[1]).to.equal(tmp);
            validate(mikado.dom[0], data[1]);
            validate(mikado.dom[1], data[0]);

            // remove first data
            store.shift();
            mikado.render();
            expect(store[0]).to.equal(tmp);
            expect(mikado.store[0]).to.equal(data[0]);
            validate(mikado.dom[0], data[0]);

            // render through over new data
            mikado.render(store[0]);
            expect(store[0]).to.equal(tmp);
            expect(mikado.store.length).to.equal(store.length);
            validate(mikado.dom[0], store[0]);

            // clear root
            mikado.clear();
            store = data.slice(0);
            mikado.render(store);
            expect(store[0]).to.equal(tmp);
            expect(mikado.store.length).to.equal(store.length);
            expect(mikado.store[0]).to.equal(data[0]);
            validate(mikado.dom[0], data[0]);

            // clear store
            store.splice(0);
            mikado.render(store);
            expect(mikado.length).to.equal(0);
            expect(mikado.dom.length).to.equal(0);
            expect(mikado.store.length).to.equal(0);

            // assign new store
            mikado.store = store = data.slice(0);
            mikado.render(store);
            expect(mikado.store).to.equal(store);
            expect(mikado.length).to.equal(store.length);
            expect(mikado.dom.length).to.equal(store.length);
            validate(mikado.dom[0], store[0]);
        });
    });

    if(HTMLElement.prototype.click) describe("Event", function(){

        it("Should have been attached events properly", function(done){

            mikado = new Mikado(root_1, "template");
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

            mikado = new Mikado(root_1, "template");
            mikado.render(data);

            var node = root_1.firstElementChild.firstElementChild.lastElementChild;

            mikado.route("attach", function(target, event, self){

                expect(target).to.equal(root_1.firstElementChild.firstElementChild);
                expect(event).to.equal(window.event);
                expect(self).to.equal(node);
                done();
            });

            node.click();
        });

        it("Should have been delegated properly (root)", function(done){

            mikado = new Mikado(root_1, "template");
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

        it("Should have been delegated properly when not found", function(done){

            mikado = new Mikado(root_1, "template");
            mikado.render(data);

            var node = root_1.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
            var fired = false;

            mikado.route("delegate", function(){

                fired = true;
            });

            node.click();

            setTimeout(function(){

                expect(fired).to.equal(false);
                done();
            });
        });

        it("Should have been shared handler properly", function(done){

            var mikado_1 = new Mikado(root_1, "template");
            var mikado_2 = new Mikado(root_2, "template");
            mikado_1.render(data);
            mikado_2.render(data);

            var node = root_2.firstElementChild.firstElementChild.firstElementChild;

            Mikado.route("delegate", function(target, event, self){

                expect(target).to.equal(root_2.firstElementChild);
                expect(event).to.equal(window.event);
                expect(self).to.equal(node);
                mikado_1.clear(true);
                mikado_2.clear(true);
                done();
            });

            node.click();
        });

        it("Should have been cached properly", function(done){

            mikado = new Mikado(root_1, "template");
            mikado.render(data);

            var node = root_1.firstElementChild.firstElementChild;
            var count = 0;

            mikado.route("attach", function(target, event, self){

                expect(target).to.equal(node);
                expect(event).to.equal(window.event);
                expect(self).to.equal(target);

                if(++count === 3){
                    done();
                }
            });

            node.click();
            node.click();
            node.click();
        });

        it("Should have been stopped listening properly", function(done){

            mikado = new Mikado(root_1, "template");
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

            mikado = new Mikado(root_1, "template", { cache: false });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var tmp = root_1.firstElementChild.dataset.id;
            root_1.firstElementChild.dataset.id = "new1";
            mikado.render(data);

            expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
            validate(mikado.dom[0], data[0]);
        });

        it("Should not have been cached (reuse = false)", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: false });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var tmp = root_1.firstElementChild.dataset.id;
            root_1.firstElementChild.dataset.id = "new2";
            mikado.render(data);

            expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
            validate(mikado.dom[0], data[0]);
        });

        it("Should have been cached properly", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var tmp = root_1.firstElementChild.dataset.id;
            root_1.firstElementChild.dataset.id = "new3";
            mikado.render(data);

            expect(root_1.firstElementChild.dataset.id).to.equal("new3");
            validate(mikado.dom[0], Object.assign(data[0], { id: "new3" }));
        });
    });

    describe("Sync", function(){

        it("Should have been re-synced properly", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(items);
            root_1.removeChild(mikado.dom[0]);
            root_1.removeChild(mikado.dom[50]);
            root_1.removeChild(mikado.dom[mikado.length - 1]);

            expect(mikado.length).to.equal(items.length);

            mikado.sync();

            expect(mikado.length).to.equal(items.length - 3);
            items.splice(0, 1);
            items.splice(49, 1);
            items.pop();

            for(var i = 0; i < mikado.length; i++){

                expect(mikado.dom[i]["_idx"]).to.equal(i);
                validate(mikado.dom[i], items[i]);
            }
        });

        it("Should have been re-synced properly (incl. cache)", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var tmp = root_1.firstElementChild.dataset.id;
            root_1.firstElementChild.dataset.id = "new4";
            mikado.sync(true).render(data);

            expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
            validate(mikado.dom[0], data[0]);
        });
    });

    describe("Cache Helpers", function(){

        it("Should have been set/get text in sync", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var node = root_1.firstElementChild.firstElementChild.firstElementChild;
            var tmp = node.textContent;
            Mikado.setText(node, "foo");
            expect(Mikado.getText(node)).to.equal("foo");
            mikado.render(data);

            expect(node.textContent).to.equal(tmp);
            validate(mikado.dom[0], data[0]);

            expect(Mikado.getText(node)).to.equal(tmp);
        });

        it("Should have been set/get html in sync", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var node = root_1.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
            var tmp = node.innerHTML;
            Mikado.setHTML(node, "<b>foo</b>");
            expect(Mikado.getHTML(node)).to.equal("<b>foo</b>");
            mikado.render(data);

            expect(node.innerHTML).to.equal(tmp);
            validate(mikado.dom[0], data[0]);

            expect(Mikado.getHTML(node)).to.equal(tmp);
        });

        it("Should have been set/get/has/remove attribute in sync", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var tmp = root_1.firstElementChild.dataset.id;
            Mikado.setAttribute(root_1.firstElementChild, "data-id", "new5");
            mikado.render(data);

            expect(root_1.firstElementChild.dataset.id).to.equal(tmp);
            validate(mikado.dom[0], data[0]);

            expect(Mikado.hasAttribute(root_1.firstElementChild, "data-id")).to.equal(true);
            expect(Mikado.getAttribute(root_1.firstElementChild, "data-id")).to.equal(tmp);

            Mikado.removeAttribute(root_1.firstElementChild, "data-id", "new5");
            mikado.render(data);
            expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
        });

        it("Should have been set/get/has/toggle class in sync", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var target = root_1.children[0].children[0];
            var tmp = target.className;
            Mikado.setClass(target, "changed");
            expect(Mikado.hasClass(target, tmp.split(" ")[0])).to.equal(false);
            expect(Mikado.hasClass(target, "changed")).to.equal(true);
            mikado.render(data);

            expect(target.className).to.equal(tmp);
            validate(mikado.dom[0], data[0]);

            expect(Mikado.getClass(target)).to.equal(tmp);
            expect(Mikado.hasClass(target, tmp.split(" ")[0])).to.equal(true);

            expect(Mikado.hasClass(target, "changed")).to.equal(false);
            Mikado.toggleClass(target, "changed");
            expect(Mikado.hasClass(target, "changed")).to.equal(true);

            Mikado.removeClass(target, "changed");
            expect(Mikado.hasClass(target, "changed")).to.equal(false);
        });

        it("Should have been set/get css in sync", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);
            // cache will create during second run!
            mikado.render(data);

            var target = root_1.children[0].children[0];
            Mikado.setCSS(target, "top: 0px; ");
            expect(Mikado.getCSS(target)).to.equal("top: 0px; ");
            mikado.render(data);
            expect(Mikado.getCSS(target)).to.equal("top: 0px; ");
        });
    });

    describe("Runtime Compiler", function(){

        it("Should have been compiled properly (native template)", function(){

            var template = Mikado.compile("template-test");
            mikado = new Mikado(root_1, template);
            mikado.render(data);

            validate(mikado.dom[0], data[0]);
        });

        it("Should have been compiled properly (template string)", function(){

            var template = Mikado.compile(
                '<section data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{data.index}}" root>' +
                    '<div class="{{data.class}}" style="padding-right: 10px;" tap="attach">' +
                        '<div class="title" click="delegate:root">{{=data.title}}</div>' +
                        '<div class="content" click="delegate:foo">{{#data.content}}</div>' +
                        '<div class="footer">{{data.footer}}</div>' +
                    '</div>' +
                '</section>'
            );

            var items = data.slice(0);
            mikado = new Mikado(root_1, template, { store: items });
            mikado.render(items);

            validate(mikado.dom[0], items[0]);
            items[0].title = "foobar";
            validate(mikado.dom[0], items[0]);
        });
    });

    describe("DOM Helpers", function(){

        it("Should have been get node by index", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);

            expect(mikado.node(10)).to.equal(mikado.dom[10]);
        });

        it("Should have been get index by node", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);

            expect(mikado.index(mikado.dom[10])).to.equal(10);
        });

        it("Should have been get data by index", function(){

            mikado = new Mikado(root_1, "template", { store: true, reuse: true });
            mikado.render(data);

            expect(mikado.data(10)).to.equal(data[10]);
        });

        it("Should have been get data by node", function(){

            mikado = new Mikado(root_1, "template", { store: true, reuse: true });
            mikado.render(data);

            expect(mikado.data(mikado.dom[10])).to.equal(data[10]);
        });

        it("Should have been find properly", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);

            expect(mikado.find(data[10])).to.equal(mikado.dom[10]);
        });

        it("Should have been find properly (keyed)", function(){

            mikado = new Mikado(root_1, "keyed", { reuse: false, keep: true });
            mikado.render(data);

            expect(mikado.find(data[10].id)).to.equal(mikado.dom[10]);
        });

        it("Should have been search properly", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);

            expect(mikado.search(data[10])).to.equal(mikado.dom[10]);

            data[10] = Object.assign({}, data[10]);

            expect(mikado.find(data[10])).to.be.undefined;
            expect(mikado.search(data[10])).to.equal(mikado.dom[10]);
        });

        it("Should have been used 'where' properly", function(){

            mikado = new Mikado(root_1, "template", { cache: true, reuse: true });
            mikado.render(data);

            expect(mikado.where(data[10])[0]).to.equal(mikado.dom[10]);
            expect(mikado.where({id : data[10].id})[0]).to.equal(mikado.dom[10]);
        });
    });

    describe("DOM Manipulation", function(){

        it("Should have been used 'up' properly (index)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[9];

            mikado.up(10);

            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[9]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[9]).to.equal(mikado.dom[9]);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[9]["_idx"]).to.equal(9);

            tmp_a = root_1.children[10];
            tmp_b = root_1.children[9];

            mikado.up(10, 1);

            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[9]).to.equal(tmp_a);

            mikado.up(10, -1);

            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[9]).to.equal(tmp_a);
        });

        it("Should have been used 'up' properly (index + offset)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[5];
            var tmp_c = root_1.children[9];

            mikado.up(10, 5);

            expect(root_1.children[5]).to.equal(tmp_a);
            expect(root_1.children[6]).to.equal(tmp_b);
            expect(root_1.children[10]).to.equal(tmp_c);

            expect(mikado.dom[5]["_idx"]).to.equal(5);
            expect(mikado.dom[6]["_idx"]).to.equal(6);
            expect(mikado.dom[7]["_idx"]).to.equal(7);
            expect(mikado.dom[10]["_idx"]).to.equal(10);

            expect(root_1.children[5]).to.equal(mikado.dom[5]);
            expect(root_1.children[6]).to.equal(mikado.dom[6]);
            expect(root_1.children[7]).to.equal(mikado.dom[7]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
        });

        it("Should have been used 'up' properly (first)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[0];
            var tmp_c = root_1.children[1];

            mikado.first(10);

            expect(root_1.children[0]).to.equal(tmp_a);
            expect(root_1.children[1]).to.equal(tmp_b);
            expect(root_1.children[2]).to.equal(tmp_c);

            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[9]["_idx"]).to.equal(9);
            expect(mikado.dom[1]["_idx"]).to.equal(1);
            expect(mikado.dom[0]["_idx"]).to.equal(0);

            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[9]).to.equal(mikado.dom[9]);
            expect(root_1.children[1]).to.equal(mikado.dom[1]);
            expect(root_1.children[0]).to.equal(mikado.dom[0]);
        });

        it("Should have been used 'down' properly (index)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];

            mikado.down(10);

            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[11]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            tmp_a = root_1.children[10];
            tmp_b = root_1.children[11];

            mikado.down(10, 1);

            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[11]).to.equal(tmp_a);

            mikado.down(10, -1);

            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[11]).to.equal(tmp_a);
        });

        it("Should have been used 'down' properly (index + offset)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.down(10, 5);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);

            expect(mikado.dom[15]["_idx"]).to.equal(15);
            expect(mikado.dom[14]["_idx"]).to.equal(14);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[15]).to.equal(mikado.dom[15]);
            expect(root_1.children[14]).to.equal(mikado.dom[14]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);
        });

        it("Should have been used 'down' properly (last)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[length - 1];
            var tmp_c = root_1.children[11];

            mikado.last(10);

            expect(root_1.children[length - 1]).to.equal(tmp_a);
            expect(root_1.children[length - 2]).to.equal(tmp_b);
            expect(root_1.children[10]).to.equal(tmp_c);

            expect(mikado.dom[length - 1]["_idx"]).to.equal(length - 1);
            expect(mikado.dom[length - 2]["_idx"]).to.equal(length - 2);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[length - 1]).to.equal(mikado.dom[length - 1]);
            expect(root_1.children[length - 2]).to.equal(mikado.dom[length - 2]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);
        });

        it("Should have been used 'shift' properly (down)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.shift(10, 5);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);

            expect(mikado.dom[15]["_idx"]).to.equal(15);
            expect(mikado.dom[14]["_idx"]).to.equal(14);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[15]).to.equal(mikado.dom[15]);
            expect(root_1.children[14]).to.equal(mikado.dom[14]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);

            mikado.shift(10, 0);
            expect(root_1.children[10]).to.equal(tmp_b);

            mikado.shift(10, length);
            expect(root_1.children[length - 1]).to.equal(tmp_b);
        });

        it("Should have been used 'shift' properly (up)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[5];
            var tmp_c = root_1.children[9];

            mikado.shift(10, -5);

            expect(root_1.children[5]).to.equal(tmp_a);
            expect(root_1.children[6]).to.equal(tmp_b);
            expect(root_1.children[10]).to.equal(tmp_c);

            expect(mikado.dom[5]["_idx"]).to.equal(5);
            expect(mikado.dom[6]["_idx"]).to.equal(6);
            expect(mikado.dom[7]["_idx"]).to.equal(7);
            expect(mikado.dom[10]["_idx"]).to.equal(10);

            expect(root_1.children[5]).to.equal(mikado.dom[5]);
            expect(root_1.children[6]).to.equal(mikado.dom[6]);
            expect(root_1.children[7]).to.equal(mikado.dom[7]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);

            mikado.shift(10, 0);
            expect(root_1.children[10]).to.equal(tmp_c);

            mikado.shift(10, -length);
            expect(root_1.children[0]).to.equal(tmp_c);
        });

        it("Should have been used 'shift' properly (store)", function(){

            mikado = new Mikado(root_1, "template", { reuse: true });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];

            mikado.shift(10, 1);

            expect(mikado.dom[10]).to.equal(tmp_b);
            expect(mikado.dom[11]).to.equal(tmp_a);

            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);
        });

        it("Should have been used 'move' properly (down)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.move(10, 15);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);

            expect(mikado.dom[15]["_idx"]).to.equal(15);
            expect(mikado.dom[14]["_idx"]).to.equal(14);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[15]).to.equal(mikado.dom[15]);
            expect(root_1.children[14]).to.equal(mikado.dom[14]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);

            mikado.move(10, 10);
            expect(root_1.children[10]).to.equal(tmp_b);

            mikado.move(10, length * 2);
            expect(root_1.children[length - 1]).to.equal(tmp_b);

            mikado.move(length - 1, -2);
            expect(root_1.children[length - 3]).to.equal(tmp_b);
        });

        it("Should have been used 'move' properly (up)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[5];
            var tmp_c = root_1.children[9];

            mikado.move(10, 5);

            expect(root_1.children[5]).to.equal(tmp_a);
            expect(root_1.children[6]).to.equal(tmp_b);
            expect(root_1.children[10]).to.equal(tmp_c);

            expect(mikado.dom[5]["_idx"]).to.equal(5);
            expect(mikado.dom[6]["_idx"]).to.equal(6);
            expect(mikado.dom[7]["_idx"]).to.equal(7);
            expect(mikado.dom[10]["_idx"]).to.equal(10);

            expect(root_1.children[5]).to.equal(mikado.dom[5]);
            expect(root_1.children[6]).to.equal(mikado.dom[6]);
            expect(root_1.children[7]).to.equal(mikado.dom[7]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);

            mikado.move(10, 10);
            expect(root_1.children[10]).to.equal(tmp_c);

            mikado.move(10, 0);
            expect(root_1.children[0]).to.equal(tmp_c);

            mikado.move(0, -10);
            expect(root_1.children[length - 11]).to.equal(tmp_c);
        });

        it("Should have been used 'move' properly (by node + index)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.move(mikado.dom[10], 15);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);
        });

        it("Should have been used 'before' properly", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.before(10, 16);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);

            expect(mikado.dom[15]["_idx"]).to.equal(15);
            expect(mikado.dom[14]["_idx"]).to.equal(14);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[15]).to.equal(mikado.dom[15]);
            expect(root_1.children[14]).to.equal(mikado.dom[14]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);

            mikado.before(10, 11);
            expect(root_1.children[10]).to.equal(tmp_b);

            mikado.before(10, length * 2);
            expect(root_1.children[length - 1]).to.equal(tmp_b);

            mikado.before(length - 1, -2);
            expect(root_1.children[length - 3]).to.equal(tmp_b);

            mikado.before(-2, -2);
            expect(root_1.children[length - 4]).to.equal(tmp_b);

            mikado.before(-3, -1);
            expect(root_1.children[length - 3]).to.equal(tmp_b);

            mikado.before(-2, -4);
            expect(root_1.children[length - 6]).to.equal(tmp_b);
        });

        it("Should have been used 'before' properly (by node)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.before(mikado.dom[10], mikado.dom[16]);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);
        });

        it("Should have been used 'after' properly", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var length = root_1.children.length;
            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.after(10, 14);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);

            expect(mikado.dom[15]["_idx"]).to.equal(15);
            expect(mikado.dom[14]["_idx"]).to.equal(14);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[15]).to.equal(mikado.dom[15]);
            expect(root_1.children[14]).to.equal(mikado.dom[14]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);

            mikado.after(10, 9);
            expect(root_1.children[10]).to.equal(tmp_b);

            mikado.after(10, length * 2);
            expect(root_1.children[length - 1]).to.equal(tmp_b);

            mikado.after(length - 1, -2);
            expect(root_1.children[length - 3]).to.equal(tmp_b);

            mikado.after(-2, -2);
            expect(root_1.children[length - 2]).to.equal(tmp_b);

            mikado.after(-1, -3);
            expect(root_1.children[length - 3]).to.equal(tmp_b);

            mikado.after(-2, -1);
            expect(root_1.children[length - 1]).to.equal(tmp_b);
        });

        it("Should have been used 'after' properly (by node)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[11];
            var tmp_c = root_1.children[15];

            mikado.after(mikado.dom[10], mikado.dom[14]);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[14]).to.equal(tmp_c);
        });

        it("Should have been used 'swap' properly", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(items);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[15];
            var tmp_c = root_1.children[11];

            mikado.swap(10, 15);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[11]).to.equal(tmp_c);

            expect(mikado.dom[15]["_idx"]).to.equal(15);
            expect(mikado.dom[14]["_idx"]).to.equal(14);
            expect(mikado.dom[10]["_idx"]).to.equal(10);
            expect(mikado.dom[11]["_idx"]).to.equal(11);

            expect(root_1.children[15]).to.equal(mikado.dom[15]);
            expect(root_1.children[14]).to.equal(mikado.dom[14]);
            expect(root_1.children[10]).to.equal(mikado.dom[10]);
            expect(root_1.children[11]).to.equal(mikado.dom[11]);
        });

        it("Should have been used 'swap' properly (reuse)", function(){

            var items = data.slice(0);
            mikado = new Mikado(root_1, "template", { store: items, reuse: true });
            mikado.render(items);

            tmp_a = root_1.children[10];
            tmp_b = root_1.children[15];
            tmp_c = root_1.children[11];

            mikado.swap(10, 15);

            // re-used:
            expect(root_1.children[15]).to.equal(tmp_b);
            expect(root_1.children[10]).to.equal(tmp_a);
            expect(root_1.children[11]).to.equal(tmp_c);

            expect(root_1.children[15].dataset.id).to.equal(data[10].id);
            expect(root_1.children[10].dataset.id).to.equal(data[15].id);
            expect(root_1.children[11].dataset.id).to.equal(data[11].id);
        });

        it("Should have been used 'swap' properly (by node)", function(){

            mikado = new Mikado(root_1, "template", { reuse: false });
            mikado.render(data);

            var tmp_a = root_1.children[10];
            var tmp_b = root_1.children[15];
            var tmp_c = root_1.children[11];

            mikado.swap(mikado.dom[10], mikado.dom[15]);

            expect(root_1.children[15]).to.equal(tmp_a);
            expect(root_1.children[10]).to.equal(tmp_b);
            expect(root_1.children[11]).to.equal(tmp_c);

            mikado = new Mikado(root_1, "template", { store: data, reuse: true });
            mikado.render(data);

            tmp_a = root_1.children[10];
            tmp_b = root_1.children[15];
            tmp_c = root_1.children[11];

            mikado.swap(mikado.dom[10], mikado.dom[15]);

            expect(root_1.children[15]).to.equal(tmp_b);
            expect(root_1.children[10]).to.equal(tmp_a);
            expect(root_1.children[11]).to.equal(tmp_c);
        });
    });

    describe("Proxy", function(){

        it("Should have been made data observable (internal store)", function(){

            var items = data.slice(0);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = new Mikado(root_1, "proxy", { store: true, loose: false });
            mikado.render(items);

            // attribute
            mikado.store[0].id = "foo";
            mikado.store[1].id = "bar";
            // class
            mikado.store[0].class = "foo";
            mikado.store[1].class = "bar";
            // text
            mikado.store[0].title = "foo";
            mikado.store[1].title = "bar";
            // style
            mikado.store[0].footer = "top:0px";
            mikado.store[1].footer = "top:0px";
            // html
            mikado.store[0].content = "<b>foo</b>";
            mikado.store[1].content = "<b>bar</b>";

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");
            expect(root_1.children[0].children[0].className).to.equal("foo");
            expect(root_1.children[1].children[0].className).to.equal("bar");
            expect(root_1.children[0].children[0].style.cssText.trim()).to.equal("top: 0px;");
            expect(root_1.children[1].children[0].style.cssText.trim()).to.equal("top: 0px;");
            expect(root_1.children[0].children[0].children[1].innerHTML).to.equal("<b>foo</b>");
            expect(root_1.children[1].children[0].children[1].innerHTML).to.equal("<b>bar</b>");
        });

        it("Should have been made data observable (internal store + loose)", function(){

            var items = data.slice(0);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = new Mikado(root_1, "proxy", { store: true, loose: true });
            mikado.render(items);

            mikado.data(0).id = "foo";
            mikado.data(1).id = "bar";

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");
        });

        it("Should have been made data observable (external store)", function(){

            var items = data.slice(0);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = new Mikado(root_1, "proxy", { store: items, loose: false });
            mikado.render(items);

            items[0].id = "foo";
            items[1].id = "bar";

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");

            mikado.store[0].id = "bar";
            mikado.store[1].id = "foo";

            expect(root_1.children[0].dataset.id).to.equal("bar");
            expect(root_1.children[1].dataset.id).to.equal("foo");
        });

        it("Should have been made data observable (external store + loose)", function(){

            var items = data.slice(0);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = new Mikado(root_1, "proxy", { store: items, loose: true });
            mikado.render(items);

            items[0].id = "foo";
            items[1].id = "bar";

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");

            mikado.data(0).id = "bar";
            mikado.data(1).id = "foo";

            expect(root_1.children[0].dataset.id).to.equal("bar");
            expect(root_1.children[1].dataset.id).to.equal("foo");
        });
    });

    describe("Observer", function(){

        it("Should have been made array observable", function(){

            var items = data.slice(0, 2);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);

            items[0].id = "foo";
            items[1].id = "bar";

            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false });
            mikado.render();

            expect(mikado.store).to.equal(store);
            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");

            // items[0].id = "bar";
            // items[1].id = "foo";
            //
            // expect(root_1.children[0].dataset.id).to.equal("bar");
            // expect(root_1.children[1].dataset.id).to.equal("foo");

            store[0].id = "bar";
            store[1].id = "foo";

            expect(root_1.children[0].dataset.id).to.equal("bar");
            expect(root_1.children[1].dataset.id).to.equal("foo");
        });

        it("Should have been used push properly", function(){

            var items = data.slice(0, 2);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);

            items[0].id = "foo";
            items[1].id = "bar";

            var store = Mikado.array([]);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false });

            store.push(items[0]);
            store.push(items[1]);

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");
        });

        it("Should have been used pop properly", function(){

            var items = data.slice(0, 2);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false });
            mikado.render();

            var a = store.pop();
            var b = store.pop();

            expect(mikado.store.length).to.equal(0);
            expect(root_1.children.length).to.equal(0);
            expect(a).to.eql(data[1]);
            expect(b).to.eql(data[0]);
        });

        it("Should have been used unshift properly", function(){

            var items = data.slice(0, 2);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);

            items[0].id = "foo";
            items[1].id = "bar";

            var store = Mikado.array([]);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false });

            store.unshift(items[1]);
            store.unshift(items[0]);

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");
        });

        it("Should have been used shift properly", function(){

            var items = data.slice(0, 2);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            var a = store.shift();
            var b = store.shift();

            expect(mikado.store.length).to.equal(0);
            expect(root_1.children.length).to.equal(0);
            expect(a).to.eql(data[0]);
            expect(b).to.eql(data[1]);
        });

        it("Should have been used concat properly", function(){

            var items = data.slice(0, 2);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array([]);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false });

            items[0].id = "foo";
            items[1].id = "bar";

            store.concat(items);

            expect(root_1.children[0].dataset.id).to.equal("foo");
            expect(root_1.children[1].dataset.id).to.equal("bar");

            store[0].id = "bar";
            store[1].id = "foo";

            expect(root_1.children[0].dataset.id).to.equal("bar");
            expect(root_1.children[1].dataset.id).to.equal("foo");
        });

        it("Should have been used slice properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            var a = store.slice();

            expect(a.length).to.equal(5);
            expect(a).to.eql(items);

            var a = store.slice(3);

            expect(a.length).to.equal(2);
            expect(a).to.eql([items[3], items[4]]);

            var a = store.slice(1, 3);

            expect(a.length).to.equal(2);
            expect(a).to.eql([items[1], items[2]]);
        });

        it("Should have been used splice properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items.slice(0));
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            var a = store.splice(0);

            expect(mikado.store.length).to.equal(0);
            expect(a.length).to.equal(5);
            expect(a).to.eql(items);

            store.splice(0, 0, a[1]);
            store.splice(0, 0, a[0]);

            expect(mikado.store.length).to.equal(2);
            expect(mikado.store[0]).to.eql(data[0]);
            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            expect(mikado.store[1]).to.eql(data[1]);
            expect(root_1.children[1].dataset.id).to.equal(data[1]["id"]);

            store.splice(0, 2, a[2]);

            expect(mikado.store.length).to.equal(1);
            expect(mikado.store[0]).to.eql(items[2]);
            expect(root_1.children[0].dataset.id).to.equal(data[2]["id"]);
        });

        it("Should have been used swap properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            store.swap(0, 4);

            expect(store[0]).to.eql(data[4]);
            expect(root_1.children[0].dataset.id).to.equal(store[0]["id"]);
            expect(store[4]).to.eql(data[0]);
            expect(root_1.children[4].dataset.id).to.equal(store[4]["id"]);
        });

        it("Should have been used filter properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            var i = 0;

            var result = store.filter(function(item){
                return item.index % 2 !== 0;
            });

            expect(result.length).to.equal(3);
            expect(result[0]).to.eql(data[0]);
            expect(root_1.children[0].dataset.id).to.equal(data[0]["id"]);
            expect(result[1]).to.eql(data[2]);
            expect(root_1.children[1].dataset.id).to.equal(data[2]["id"]);
            expect(result[2]).to.eql(data[4]);
            expect(root_1.children[2].dataset.id).to.equal(data[4]["id"]);
        });

        it("Should have been used map properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            var i = 5;

            var result = store.map(function(item){
                return data.slice(--i, i + 1)[0];
            });

            expect(result.length).to.equal(5);
            expect(result[0]).to.eql(data[4]);
            expect(root_1.children[0].dataset.id).to.equal(data[4]["id"]);
            expect(result[4]).to.eql(data[0]);
            expect(root_1.children[4].dataset.id).to.equal(data[0]["id"]);
        });

        it("Should have been reversed properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            store.reverse();

            expect(store[0]).to.eql(data[4]);
            expect(root_1.children[0].dataset.id).to.equal(data[4]["id"]);
            expect(store[4]).to.eql(data[0]);
            expect(root_1.children[4].dataset.id).to.equal(data[0]["id"]);
        });

        it("Should have been sorted properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();

            store.sort(function(a, b){
                return b.index - a.index; // down by index (reversed)
            });

            expect(store[0]).to.eql(data[4]);
            expect(root_1.children[0].dataset.id).to.equal(data[4]["id"]);
            expect(store[4]).to.eql(data[0]);
            expect(root_1.children[4].dataset.id).to.equal(data[0]["id"]);
        });

        it("Should have been used indexOf properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);

            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();
            store[2] = store[4];

            expect(store.indexOf(store[4])).to.equal(2);
            expect(store.indexOf(data[5])).to.equal(-1);
        });

        it("Should have been used lastIndexOf properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            var store = Mikado.array(items);
            mikado = Mikado(root_1, "proxy", { store: store, loose: false }).render();
            store[4] = store[2];

            expect(store.lastIndexOf(store[2])).to.equal(4);
            expect(store.lastIndexOf(data[5])).to.equal(-1);
        });

        it("Should have been used forEach properly", function(){

            var items = data.slice(0, 5);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = Mikado(root_1, "proxy", { store: Mikado.array(items), loose: false }).render();

            var count = 0;

            mikado.store.forEach(function(){

                count ++;
            });

            expect(count).to.equal(5);
        });
    });

    describe("Callbacks", function(){

        it("Should have been called hooks properly", function(){

            var count_create = 0;
            var count_insert = 0;
            var count_update = 0;
            var count_change = 0;
            var count_remove = 0;

            mikado = new Mikado(root_1, "template", {
                on: {
                    create: function(node){ count_create++; },
                    insert: function(node){ count_insert++; },
                    update: function(node){ count_update++; },
                    change: function(node){ count_change++; },
                    remove: function(node){ count_remove++; },
                }
            });

            var items = data.slice(0);
            mikado.render(items);

            expect(count_create).to.equal(items.length);
            expect(count_insert).to.equal(items.length);
            expect(count_update).to.equal(0);
            expect(count_change).to.equal(0);
            expect(count_remove).to.equal(0);

            mikado.refresh();

            expect(count_create).to.equal(items.length);
            expect(count_insert).to.equal(items.length);
            expect(count_update).to.equal(0);
            expect(count_change).to.equal(items.length);
            expect(count_remove).to.equal(0);

            mikado.render(items);

            expect(count_create).to.equal(items.length);
            expect(count_insert).to.equal(items.length);
            expect(count_update).to.equal(items.length);
            expect(count_change).to.equal(items.length * 2);
            expect(count_remove).to.equal(0);

            mikado.clear();

            expect(count_create).to.equal(items.length);
            expect(count_insert).to.equal(items.length);
            expect(count_update).to.equal(items.length);
            expect(count_change).to.equal(items.length * 2);
            expect(count_remove).to.equal(items.length);
        });
    });

    describe("Transport (Load)", function(){

        it("Should have been loaded properly (sync)", function(){

            Mikado.unregister("template");
            Mikado.load("http://gitcdn.link/cdn/nextapps-de/mikado/3c796e63ef0761427e2a9c1d5b6f9500f0cc86a8/test/template.json", false);

            mikado = new Mikado(root_1, "template", { store: true, loose: false });

            mikado.render(data);
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
        });

        it("Should have been loaded properly (async)", function(done){

            mikado = new Mikado(root_1, "template", { store: true, loose: false });
            mikado.unregister("template");
            mikado.load("http://gitcdn.link/cdn/nextapps-de/mikado/3c796e63ef0761427e2a9c1d5b6f9500f0cc86a8/test/template.json", function(){

                mikado.render(data);
                expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
                done();
            });
        });
    });

    describe("Import/Export", function(){

        it("Should have been exported properly", function(){

            var items = data.slice(0);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = new Mikado(root_1, "proxy", { store: true, loose: false });
            mikado.render(items);

            mikado.export();

            expect(localStorage.getItem(mikado.template)).to.not.equal(null);
            expect(JSON.parse(localStorage.getItem(mikado.template))[10].id).to.eql(data[10].id);
        });

        it("Should have been exported properly (loose)", function(){

            var items = data.slice(0);
            for(var i = 0; i < items.length; i++) items[i] = Object.assign({}, items[i]);
            mikado = new Mikado(root_1, "proxy", { store: true, loose: true });
            mikado.render(items);

            mikado.export();

            expect(localStorage.getItem(mikado.template)).to.not.equal(null);
            expect(JSON.parse(localStorage.getItem(mikado.template))[10].id).to.eql(data[10].id);
        });

        it("Should have been imported properly", function(){

            mikado = new Mikado(root_1, "proxy", { store: true, loose: false });

            mikado.import();
            expect(mikado.store[10].id).to.equal(data[10].id);

            mikado.render();
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
        });

        it("Should have been imported properly (loose)", function(){

            mikado = new Mikado(root_1, "proxy", { store: true, loose: true });

            mikado.import();
            expect(mikado.data(10).id).to.equal(data[10].id);

            mikado.render();
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
        });

        it("Should have been deleted properly", function(){

            mikado = new Mikado(root_1, "proxy", { store: true, loose: false });

            mikado.delete();
            expect(localStorage.getItem(mikado.template)).to.equal(null);
        });
    });

    describe("Includes", function(){

        it("Should have been included properly", function(){

            var tpl_1 =
            "    <section id=\"tpl-1\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\">" +
            "        <include from=\"include\"></include>" +
            //"        <include from=\"include\"></include>" +
            "    </section>";

            var tpl_2 =
            "    <section id=\"tpl-2\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\">" +
            "        <include>{{include}}</include>" +
            //"        <include>{{include}}</include>" +
            "    </section>";

            var tpl_3 =
            "    <section id=\"tpl-3\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\" include=\"include\"></section>";

            var tpl_4 =
            "    <section id=\"tpl-4\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\">" +
            "        <div include=\"include\"></div>" +
            //"        <div include=\"include\"></div>" +
            "    </section>";

            var include =
            "    <div class=\"{{data.class}}\" style=\"padding-right: 10px;\">" +
            "        <div class=\"title\">{{data.title}}</div>" +
            "        <div class=\"content\">{{#data.content}}</div>" +
            "        <div class=\"footer\" href=\"show-test\">{{data.footer}}</div>" +
            "    </div>";

            Mikado.register("include", Mikado.compile(include));
            var template = Mikado.compile(tpl_1);
            mikado = new Mikado(root_1, template, { store: true, loose: true });
            mikado.clear().render(data);
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
            expect(mikado.dom[10].firstElementChild.firstElementChild.textContent).to.equal(data[10].title);

            var template = Mikado.compile(tpl_2);
            mikado = new Mikado(root_1, template, { store: true, loose: true });
            mikado.clear().render(data);
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
            expect(mikado.dom[10].firstElementChild.firstElementChild.textContent).to.equal(data[10].title);

            var template = Mikado.compile(tpl_3);
            mikado = new Mikado(root_1, template, { store: true, loose: true });
            mikado.clear().render(data);
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
            expect(mikado.dom[10].firstElementChild.firstElementChild.textContent).to.equal(data[10].title);

            var template = Mikado.compile(tpl_4);
            mikado = new Mikado(root_1, template, { store: true, loose: true });
            mikado.clear().render(data);
            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
            expect(mikado.dom[10].firstElementChild.firstElementChild.textContent).to.equal(data[10].title);
        });
    });

    describe("Conditional", function(){

        it("Should have been applied conditionals properly", function(){

            var tpl_1 =
                "    <section id=\"tpl-if\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\">" +
                "        <div if=\"data.flag\" class=\"{{data.class}}\" style=\"padding-right: 10px;\">" +
                "            <div>ON</div>" +
                "            <div class=\"title\">{{data.title}}</div>" +
                "            <div class=\"content\">{{#data.content}}</div>" +
                "            <div class=\"footer\" href=\"show-test\">{{data.footer}}</div>" +
                "        </div>" +
                "    </section>";

            var template = Mikado.compile(tpl_1);
            mikado = new Mikado(root_1, template, { store: true, loose: true });

            data[0].flag = 0;
            data[1].flag = 1;
            mikado.clear().render(data);

            expect(mikado.dom[10].dataset.id).to.equal(data[10].id);
            expect(mikado.dom[0].hidden).to.equal(!data[0].flag);
            expect(mikado.dom[1].hidden).to.equal(!data[1].flag);
        });
    });

    describe("Loops", function(){

        it("Should have been looped partial properly", function(){

            var tpl_1 =
                "    <section id=\"tpl-loop-1\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\">" +
                "        <div id=\"custom\" include=\"include\" for=\"data.arr\" max=\"99\"></div>" +
                "    </section>";

            var tpl_2 =
                "    <section id=\"tpl-loop-2\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\" for=\"data.arr\" max=\"2\">" +
                "            <div class=\"{{data.class}}\" style=\"padding-right: 10px;\">" +
                "                <div class=\"title\">{{data.title}}</div>" +
                "                <div class=\"content\">{{#data.content}}</div>" +
                "                <div class=\"footer\" href=\"show-test\">{{data.footer}}</div>" +
                "            </div>" +
                "    </section>";

            var tpl_3 =
                "    <section id=\"tpl-loop-3\" data-id=\"{{data.id}}\" data-date=\"{{data.date}}\" data-index=\"{{data.index}}\" include=\"include\" for=\"data.arr\" max=\"99\"></section>";

            var include =
                "    <div class=\"{{data.class}}\" style=\"padding-right: 10px;\">" +
                "        <div class=\"title\">{{data.title}}</div>" +
                "        <div class=\"content\">{{#data.content}}</div>" +
                "        <div class=\"footer\" href=\"show-test\">{{data.footer}}</div>" +
                "    </div>";

            var items = data.slice(0, 3);

            items[0].arr = [data[10], data[11], data[12]];
            items[1].arr = [data[20], data[21], data[22]];
            items[2].arr = [data[30], data[31], data[32]];

            Mikado.unregister("include").register("include", Mikado.compile(include));
            // var template = Mikado.compile(tpl_1);
            // mikado = new Mikado(root_1, template, { store: true, loose: true });
            // mikado.clear().render(items);
            // expect(mikado.dom[2].dataset.id).to.equal(items[2].id);
            // expect(mikado.dom[2].firstElementChild.firstElementChild.textContent).to.equal(items[2].arr[0].title);

            var template = Mikado.compile(tpl_2);
            mikado = new Mikado(root_1, template, { store: true, loose: true, pool: true });

            mikado.clear().render(items);
            expect(mikado.dom[2].dataset.id).to.equal(items[2].id);
            expect(mikado.dom[2].firstElementChild.firstElementChild.textContent).to.equal(items[2].arr[0].title);

            mikado.clear().render(items);
            expect(mikado.dom[2].dataset.id).to.equal(items[2].id);
            expect(mikado.dom[2].firstElementChild.firstElementChild.textContent).to.equal(items[2].arr[0].title);

            var template = Mikado.compile(tpl_3);
            mikado = new Mikado(root_1, template, { store: true, loose: true, pool: true });

            mikado.clear().render(items);
            expect(mikado.dom[2].dataset.id).to.equal(items[2].id);
            expect(mikado.dom[2].firstElementChild.firstElementChild.textContent).to.equal(items[2].arr[0].title);

            mikado.clear().render(items);
            expect(mikado.dom[2].dataset.id).to.equal(items[2].id);
            expect(mikado.dom[2].firstElementChild.firstElementChild.textContent).to.equal(items[2].arr[0].title);
        });
    });

    function validate(node, data){

        var dataset = node.dataset;
        expect(dataset.id).to.equal(data.id);
        expect(dataset.date).to.equal(data.date);
        expect(dataset.index).to.equal(String(data.index));
        expect(node.hasAttribute("root")).to.equal(true);

        var wrapper = node.firstElementChild;
        expect(wrapper.className).to.equal(data.class);
        expect(wrapper.style.paddingRight).to.equal("10px");
        expect(wrapper.getAttribute("tap")).to.equal("attach");

        var title = wrapper.firstElementChild;
        expect(title.textContent).to.equal(data.title);
        expect(title.getAttribute("click")).to.equal("delegate:root");

        var content = title.nextElementSibling;
        expect(content.innerHTML.replace("&lt;p&gt;", "<p>").replace("&lt;/p&gt;", "</p>")).to.equal(data.content);

        var footer = content.nextElementSibling;
        expect(footer.textContent).to.equal(data.footer);
    }
}());