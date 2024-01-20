const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM, shuffle } from "../common.js";
import template from "../tpl/template.js";
import template_keyed from "../tpl/keyed.js";
import data from "../data.js";

describe("Recycle Template", function(){

    it("Should have been rendered properly in non-keyed mode", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1, recycle: true });
        let items = data.slice(0, 50);

        view.render(items);

        // add test marker
        root_1.children[1]._test = "1";
        root_1.children[35]._test = "35";

        items = items.concat(data.slice(50));
        items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
        items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
        for(let i = 80; i < 90; i++) items.splice(79, 0, items.splice(10, 1)[0]);
        for(let i = 30; i < 40; i++) items.splice(10, 0, items.splice(89, 1)[0]);
        items.splice(50, 10);

        view.render(items);
        expect(view.length).to.equal(90);
        checkDOM(root_1.firstElementChild, items);

        view.render(data);
        expect(view.length).to.equal(100);
        checkDOM(root_1.firstElementChild, data);

        expect(root_1.children[1]._test).to.equal("1");
        expect(root_1.children[35]._test).to.equal("35");

        view.clear().destroy();
    });

    it("Should have been handle non-keyed pool properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1, recycle: true, pool: true });

        view.render(data);
        expect(view.length).to.equal(100);

        // add test marker
        root_1.children[1]._test = "1";
        root_1.children[98]._test = "98";

        view.render(data.slice(50));
        expect(view.length).to.equal(50);
        checkDOM(root_1.firstElementChild, data.slice(50));

        view.render(data);
        expect(view.length).to.equal(100);
        expect(root_1.children[1]._test).to.equal("1");
        expect(root_1.children[98]._test).to.equal("98");
        checkDOM(root_1.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should have been rendered properly in keyed mode", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_keyed, { mount: root_1 });
        const items = data.slice();

        view.render(items);
        expect(view.length).to.equal(100);

        // add test marker
        root_1.children[1]._test = "1";
        root_1.children[98]._test = "98";

        items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
        items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
        for(let i = 80; i < 90; i++) items.splice(79, 0, items.splice(10, 1)[0]);
        for(let i = 30; i < 40; i++) items.splice(10, 0, items.splice(89, 1)[0]);
        items.splice(50, 10);

        view.render(items);

        expect(view.length).to.equal(90);
        expect(root_1.children[1]._test).to.equal("98");
        expect(root_1.children[88]._test).to.equal("1");
        checkDOM(root_1.firstElementChild, items, /* data index */ true);

        view.render(data);

        expect(view.length).to.equal(100);
        expect(root_1.children[1]._test).to.equal("1");
        expect(root_1.children[98]._test).to.equal("98");
        checkDOM(root_1.firstElementChild, data, /* data index */ true);

        view.clear().destroy();
    });

    it("Should have been handle keyed pool properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_keyed, { mount: root_1, pool: true });

        view.render(data);
        expect(view.length).to.equal(100);

        // add test marker
        root_1.children[1]._test = "1";
        root_1.children[98]._test = "98";

        view.render(data.slice(50));
        expect(view.length).to.equal(50);
        checkDOM(root_1.firstElementChild, data.slice(50), /* data index */ true);

        const items = data.slice().reverse();

        view.render(items);
        expect(view.length).to.equal(100);
        expect(root_1.children[1]._test).to.equal("98");
        expect(root_1.children[98]._test).to.equal("1");
        checkDOM(root_1.firstElementChild, items, /* data index */ true);

        view.clear().destroy();
    });

    it("Should have been handle live pool properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_keyed, { mount: root_1, pool: true, cache: true });
        let items = data.slice(0, 50);

        view.render(items);
        expect(view.length).to.equal(50);
        checkDOM(root_1.firstElementChild, data.slice(0, 50), /* data index */ true);

        // add test marker
        root_1.children[1]._test = "1";
        root_1.children[48]._test = "48";

        items = items.reverse();

        // enabled keyed pool will execute .replace() under the hood
        view.render(items);
        expect(view.length).to.equal(50);
        expect(root_1.children[1]._test).to.equal("48");
        expect(root_1.children[48]._test).to.equal("1");
        checkDOM(root_1.firstElementChild, items, /* data index */ true);

        items = items.reverse();

        for(let i = 0; i < items.length; i++){

            view.replace(i, items[i]);
        }

        expect(view.length).to.equal(50);
        expect(root_1.children[1]._test).to.equal("1");
        expect(root_1.children[48]._test).to.equal("48");
        checkDOM(root_1.firstElementChild, items, /* data index */ true);

        view.clear().destroy();
    });

    it("Should have been reconcile DOM properly", function(){

        const root_1 = document.getElementById("root-1");
        let view = new Mikado(template_keyed, { mount: root_1, pool: true, cache: true });
        let items = data.slice(0, 30);

        // full shuffle

        for(let i = 0; i < 10; i++){

            items = shuffle(items);
            view.render(items);
            checkDOM(root_1.firstElementChild, items, /* data index */ true);

            for(let x = 0; x < root_1.children.length; x++){

                expect(view.length).to.equal(items.length);
                expect(view.dom[x]).to.equal(root_1.children[x]);
                expect(view.dom[x]["_mkk"]).to.equal(items[x].id);
            }
        }

        // new items in, old items out, some items stay, size increase or decrease

        for(let i = 0; i < 10; i++){

            items = shuffle(data.slice());
            items = items.splice(0, 15).concat(items.splice(15, (Math.random() * 30) | 0));
            view.render(items);
            checkDOM(root_1.firstElementChild, items, /* data index */ true);

            for(let x = 0; x < root_1.children.length; x++){

                expect(view.length).to.equal(items.length);
                expect(root_1.children.length).to.equal(items.length);
                expect(view.dom[x]).to.equal(root_1.children[x]);
                expect(view.dom[x]["_mkk"]).to.equal(items[x].id);
            }
        }

        view.clear().destroy();

        view = new Mikado(template_keyed, { mount: root_1, pool: false, cache: true });
        items = data.slice();

        for(let i = 0; i < 10; i++){

            items = shuffle(items);
            view.render(items);
            checkDOM(root_1.firstElementChild, items, /* data index */ true);

            for(let x = 0; x < root_1.children.length; x++){

                expect(view.length).to.equal(items.length);
                expect(view.dom[x]).to.equal(root_1.children[x]);
                expect(view.dom[x]["_mkk"]).to.equal(items[x].id);
            }
        }

        // new items in, old items out, some items stay, size increase or decrease

        for(let i = 0; i < 10; i++){

            items = shuffle(data.slice());
            items = items.splice(0, 15).concat(items.splice(15, (Math.random() * 30) | 0));
            view.render(items);
            checkDOM(root_1.firstElementChild, items, /* data index */ true);

            for(let x = 0; x < root_1.children.length; x++){

                expect(view.length).to.equal(items.length);
                expect(root_1.children.length).to.equal(items.length);
                expect(view.dom[x]).to.equal(root_1.children[x]);
                expect(view.dom[x]["_mkk"]).to.equal(items[x].id);
            }
        }

        view.clear().destroy();
    });
});
