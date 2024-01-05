const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_inline from "../tpl/loop-inline.js";
import template_include from "../tpl/loop-include.js";
import data from "../data.js";

describe("Loop partials", function(){

    it("Should looped inline partials properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_inline, { mount: root_1 });

        view.render({ main: [data] });

        let node = root_1.firstElementChild;

        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);
        expect(node.tagName.toLowerCase()).to.equal("main");

        node = node.firstElementChild.firstElementChild;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");

        checkDOM(node.firstElementChild, data);

        node = node.nextElementSibling;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");

        checkDOM(node.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should looped included partials properly", function(){

        Mikado.register(template);

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_include, { mount: root_1 });

        view.render({ main: [data] });

        let node = root_1.firstElementChild;

        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);
        expect(node.tagName.toLowerCase()).to.equal("main");

        node = node.firstElementChild.firstElementChild;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");

        checkDOM(node.firstElementChild, data);

        node = node.nextElementSibling;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");

        checkDOM(node.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should apply conditional properly (1)", function(){

        const root_1 = document.getElementById("root-1");

        // inline

        let view = new Mikado(template_inline, { mount: root_1 });

        view.render({ main: [[]] });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(1);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(2);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        node = node.nextElementSibling;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();

        // extern include

        view = new Mikado(template_include, { mount: root_1 });

        view.render({ main: [[]] });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(1);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(2);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        node = node.nextElementSibling;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();
    });

    it("Should apply conditional properly (2)", function(){

        const root_1 = document.getElementById("root-1");

        // inline

        let view = new Mikado(template_inline, { mount: root_1 });

        view.render({ main: [data], hide: true });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();

        // extern include

        view = new Mikado(template_include, { mount: root_1 });

        view.render({ main: [data], hide: true });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();
    });
});
