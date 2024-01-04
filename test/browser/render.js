const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_static from "../tpl/static.js";
import data from "../data.js";

describe("Render Template", function(){

    it("Should render an array properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1 }).render(data);

        checkDOM(root_1.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should render a single object properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1 }).render(data[0]);

        checkDOM(root_1.firstElementChild, [data[0]]);

        view.clear().destroy();
    });

    it("Should not have been rendered", function(){

        const root_1 = document.getElementById("root-1");
        const view = Mikado(template, { mount: root_1 });

        view.render(); // console.warn

        expect(view.length).to.equal(0);
        expect(view.root["_mkd"].length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        view.render([]);

        expect(view.length).to.equal(0);
        expect(view.root["_mkd"].length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        view.render(null); // console.warn

        expect(view.length).to.equal(0);
        expect(view.root["_mkd"].length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        view.render(undefined); // console.warn

        expect(view.length).to.equal(0);
        expect(view.root["_mkd"].length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        view.clear().destroy();
    });

    it("Should render once properly", function(){

        const root_1 = document.getElementById("root-1");

        Mikado.once(root_1, template, data[0]);
        expect(root_1.childNodes.length).to.equal(1);

        // once does not support index keyword in templates
        checkDOM(root_1.firstElementChild, [data[0]], /* skip index */ true);
        root_1.innerHTML = "";
    });

    it("Should render static templates properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_static).mount(root_1).render();

        expect(template_static.fn).to.equal(null);
        expect(view.length).to.equal(1);
        expect(root_1.childNodes.length).to.equal(1);

        view.clear().destroy();
    });

    it("Should render static templates once properly", function(){

        const root_1 = document.getElementById("root-1");
        Mikado.once(root_1, template_static);

        expect(template_static.fn).to.equal(null);
        expect(root_1.childNodes.length).to.equal(1);

        root_1.innerHTML = "";
    });

    it("Should have been cleared properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template);

        view.mount(root_1).render(data);

        expect(view.length).to.equal(data.length);
        expect(view.root.childNodes.length).to.equal(data.length);

        view.clear();

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");
    });

    it("Should have been rendered properly (Async)", async function(){

        const root_1 = document.getElementById("root-1");
        let view = new Mikado(template, { mount: root_1 });

        // callback = true
        let promise = view.render(data, true);

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        await promise;

        expect(view.length).to.equal(data.length);
        expect(view.root.childNodes.length).to.equal(data.length);
        checkDOM(root_1.firstElementChild, data);

        view.clear();

        // callback = function
        view.render(data, function(){});

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        await new Promise(function(resolve){

            requestAnimationFrame(function(){

                expect(view.length).to.equal(data.length);
                expect(view.root.childNodes.length).to.equal(data.length);
                checkDOM(root_1.firstElementChild, data);

                view.clear().destroy();
                resolve();
            });
        });

        // by option
        view = new Mikado(template, { mount: root_1, async: true });
        promise = view.render(data);

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        await promise;

        expect(view.length).to.equal(data.length);
        expect(view.root.childNodes.length).to.equal(data.length);
        checkDOM(root_1.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should have been canceled properly", async function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1 });
        let test = true;

        view.render(data, function(){

            test = false;
        });

        view.cancel();

        await new Promise(function(resolve){

            requestAnimationFrame(function(){

                expect(test).to.equal(true);

                view.clear().destroy();
                resolve();
            });
        });
    });

    it("Should clear a view properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 10));

        expect(view.length).to.equal(10);
        view.clear();
        expect(view.length).to.equal(0);
        expect(root_1.children.length).to.equal(0);

        view.clear().destroy();
    });

    it("Should have been destroyed properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 10));
        expect(view.state).to.deep.equal({});
        expect(view.root).to.equal(root_1);

        view.destroy();

        expect(view.state).to.equal(null);
        expect(view.root).to.equal(null);
    });
});