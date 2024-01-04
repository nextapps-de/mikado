const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_static from "../tpl/static.js";
import data from "../data.js";

describe("DOM State Cache", function(){

    it("Should not have been cached by default", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        const tmp = root_1.firstElementChild.dataset.id;
        root_1.firstElementChild.dataset.id = "test";
        view.render(data[0]);

        expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
        checkDOM(root_1.firstElementChild, [data[0]]);

        view.clear().destroy();
    });

    it("Should have been cached when enabled", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        root_1.firstElementChild.dataset.id = "test";
        expect(root_1.firstElementChild.dataset.id).to.equal("test");
        view.render(data[0]);

        expect(root_1.firstElementChild.dataset.id).to.equal("test");
        checkDOM(root_1.firstElementChild, [Object.assign({}, data[0], { id: "test" })]);

        view.clear().destroy();
    });

    it("Should have been handled by cache helper properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        Mikado.setAttribute(root_1.firstElementChild, "data-id", "test");
        expect(root_1.firstElementChild.dataset.id).to.equal("test");

        view.render(data[0]);

        expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
        checkDOM(root_1.firstElementChild, [data[0]]);

        Mikado.setAttribute(root_1.firstElementChild, { "data-id": "test" });
        expect(root_1.firstElementChild.dataset.id).to.equal("test");

        view.render(data[0]);

        expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
        checkDOM(root_1.firstElementChild, [data[0]]);

        view.clear().destroy();
    });

    it("Should have been set/get text in sync", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        const node = root_1.firstElementChild.firstElementChild.firstElementChild;
        const tmp = node.textContent;
        Mikado.setText(node, "foo");
        expect(Mikado.getText(node)).to.equal("foo");
        expect(node.textContent).to.equal("foo");

        view.render(data[0]);

        expect(node.textContent).to.equal(tmp);
        expect(Mikado.getText(node)).to.equal(tmp);
        checkDOM(root_1.firstElementChild, [data[0]]);
    });

    it("Should have been set/get html in sync", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        const node = root_1.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;
        const tmp = node.innerHTML;
        Mikado.setHtml(node, "<b>foo</b>");
        expect(Mikado.getHtml(node)).to.equal("<b>foo</b>");
        expect(node.innerHTML).to.equal("<b>foo</b>");

        view.render(data);

        expect(node.innerHTML).to.equal(tmp);
        expect(Mikado.getHtml(node)).to.equal(tmp);
        checkDOM(root_1.firstElementChild, [data[0]]);
    });

    it("Should have been set/get/has/remove attribute in sync", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        const tmp = root_1.firstElementChild.dataset.id;
        Mikado.setAttribute(root_1.firstElementChild, "data-id", "new5");
        expect(Mikado.hasAttribute(root_1.firstElementChild, "data-id")).to.equal(true);
        expect(Mikado.getAttribute(root_1.firstElementChild, "data-id")).to.equal("new5");
        expect(root_1.firstElementChild.dataset.id).to.equal("new5");

        view.render(data);

        expect(root_1.firstElementChild.dataset.id).to.equal(tmp);
        checkDOM(root_1.firstElementChild, [data[0]]);

        expect(Mikado.hasAttribute(root_1.firstElementChild, "data-id")).to.equal(true);
        expect(Mikado.getAttribute(root_1.firstElementChild, "data-id")).to.equal(tmp);
        expect(root_1.firstElementChild.dataset.id).to.equal(tmp);
        Mikado.removeAttribute(root_1.firstElementChild, "data-id");

        view.render(data);

        expect(Mikado.hasAttribute(root_1.firstElementChild, "data-id")).to.equal(true);
        expect(Mikado.getAttribute(root_1.firstElementChild, "data-id")).to.equal(tmp);
        expect(root_1.firstElementChild.dataset.id).to.equal(data[0].id);
    });

    it("Should have been set/get/has/toggle class in sync", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        const target = root_1.firstElementChild.firstElementChild;
        const tmp = target.className;

        Mikado.setClass(target, "changed");
        expect(Mikado.hasClass(target, tmp.split(" ")[0])).to.equal(false);
        expect(Mikado.hasClass(target, "changed")).to.equal(true);

        view.render(data);

        expect(target.className).to.equal(tmp);
        checkDOM(root_1.firstElementChild, [data[0]]);

        expect(Mikado.getClass(target)).to.deep.equal(tmp.split(" "));
        expect(Mikado.hasClass(target, tmp.split(" ")[0])).to.equal(true);

        expect(Mikado.hasClass(target, "changed")).to.equal(false);
        Mikado.toggleClass(target, "changed");
        expect(Mikado.hasClass(target, "changed")).to.equal(true);
        Mikado.toggleClass(target, "changed", true);
        expect(Mikado.hasClass(target, "changed")).to.equal(true);
        Mikado.toggleClass(target, { "changed": true });
        expect(Mikado.hasClass(target, "changed")).to.equal(true);

        Mikado.removeClass(target, "changed");
        expect(Mikado.hasClass(target, "changed")).to.equal(false);

        Mikado.addClass(target, "new");
        expect(Mikado.hasClass(target, "new")).to.equal(true);
        expect(target.className.includes("new")).to.true;
        Mikado.removeClass(target, "new");
        expect(Mikado.hasClass(target, "new")).to.equal(false);
        expect(target.className.includes("new")).to.false;
    });

    it("Should have been set/get css in sync", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1, recycle: true, cache: true })

        view.render(data[0]);
        // cache will create during second run!
        view.render(data[0]);

        const target = root_1.firstElementChild.firstElementChild;

        expect(Mikado.getCss(target)).to.equal("padding-right: 10px;");
        expect(target.style.cssText).to.equal("padding-right: 10px;");

        Mikado.setCss(target, "top: 0px;");

        expect(Mikado.getCss(target)).to.equal("top: 0px;");
        expect(target.style.cssText).to.equal("top: 0px;");

        // style is not a dynamic expression, it won't update
        view.render(data);

        expect(Mikado.getCss(target)).to.equal("top: 0px;");
        expect(target.style.cssText).to.equal("top: 0px;");

        Mikado.setStyle(target, { "padding-right": "10px;" });
        view.render(data);

        expect(Mikado.getStyle(target, "padding-right")).to.equal("10px;");
        // changing from set/getStyle to set/getCss will transform style cache
        expect(Mikado.getCss(target)).to.equal("top: 0px;");
        expect(target.style.cssText).to.equal("top: 0px;");
    });

});