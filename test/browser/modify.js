const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_static from "../tpl/static.js";
import data from "../data.js";

describe("Modify Views", function(){

    it("Should update a component properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        checkDOM(root_1.firstElementChild, [data[0]]);

        view.update(root_1.firstElementChild, data[1])
        checkDOM(root_1.firstElementChild, [data[1]]);

        view.update(0, data[2])
        checkDOM(root_1.firstElementChild, [data[2]]);

        view.render([data[0], data[1]]);
        view.update(-1, data[3])
        checkDOM(root_1.firstElementChild, [data[3], data[1]]);

        view.clear().destroy();
    });

    it("Should add a component properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        checkDOM(root_1.firstElementChild, [data[0]]);

        view.add(data[1])
        expect(view.length).to.equal(2);
        checkDOM(root_1.firstElementChild, [data[0], data[1]]);

        // add does not update index of other components
        view.add(data[2], 1)
        expect(view.length).to.equal(3);
        checkDOM(root_1.firstElementChild, [data[0], data[2], data[1]], /* data index */ null);

        view.add(data[3], -1);
        expect(view.length).to.equal(4);
        checkDOM(root_1.firstElementChild, [data[0], data[2], data[3], data[1]], /* data index */ null);

        view.clear().destroy();
    });

    it("Should append a component properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        checkDOM(root_1.firstElementChild, [data[0]]);

        view.append([data[1], data[2]])
        expect(view.length).to.equal(3);
        checkDOM(root_1.firstElementChild, [data[0], data[1], data[2]]);

        // append does not update index of other components
        view.append([data[3], data[4]], 1);
        expect(view.length).to.equal(5);
        checkDOM(root_1.firstElementChild, [data[0], data[3], data[4], data[1], data[2]], /* data index */ null);

        view.append([data[5], data[6]], -1);
        expect(view.length).to.equal(7);
        checkDOM(root_1.firstElementChild, [data[0], data[3], data[4], data[1], data[5], data[6], data[2]], /* data index */ null);

        view.clear().destroy();
    });

    it("Should remove a component properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 10));

        // remove does not update index of other components
        view.remove(root_1.firstElementChild);
        expect(view.length).to.equal(9);
        expect(root_1.children.length).to.equal(9);
        checkDOM(root_1.firstElementChild, data.slice(1, 10), /* data index */ null);

        view.remove(root_1.firstElementChild, 2);
        expect(view.length).to.equal(7);
        expect(root_1.children.length).to.equal(7);
        checkDOM(root_1.firstElementChild, data.slice(3, 10), /* data index */ null);

        view.remove(0);
        expect(view.length).to.equal(6);
        expect(root_1.children.length).to.equal(6);
        checkDOM(root_1.firstElementChild, data.slice(4, 10), /* data index */ null);

        view.remove(-1);
        expect(view.length).to.equal(5);
        expect(root_1.children.length).to.equal(5);
        checkDOM(root_1.firstElementChild, data.slice(4, 9), /* data index */ null);

        view.remove(-2, 2);
        expect(view.length).to.equal(3);
        expect(root_1.children.length).to.equal(3);
        checkDOM(root_1.firstElementChild, data.slice(4, 7), /* data index */ null);

        view.clear().destroy();
    });

    it("Should replace a component properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);

        view.replace(root_1.firstElementChild, data[1])
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);
        checkDOM(root_1.firstElementChild, [data[1]]);

        view.replace(0, data[2])
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);
        checkDOM(root_1.firstElementChild, [data[2]]);

        view.render([data[0], data[1]]);

        view.replace(-2, data[3])
        expect(view.length).to.equal(2);
        expect(root_1.children.length).to.equal(2);
        checkDOM(root_1.firstElementChild, [data[3], data[1]]);

        view.clear().destroy();
    });

    it("Should have been get node by index", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        expect(view.node(10)).to.equal(view.root.children[10]);
    });

    it("Should have been get index by node", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        expect(view.index(view.root.children[10])).to.equal(10);
    });
});