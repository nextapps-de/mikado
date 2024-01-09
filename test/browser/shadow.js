const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_shadow from "../tpl/shadow.js";
import template_shadow_empty from "../tpl/shadow-empty.js";
import template_shadow_option from "../tpl/shadow-option.js";
//import { once } from "../../src/mikado.js";
import data from "../data.js";

describe("Render Web Components", function(){

    it("Should render web components properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_shadow, { mount: root_1 }).render(data);
        let tmp;

        expect(tmp = root_1.shadowRoot).to.exist;
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        tmp._test = true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        tmp._test = true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        expect(tmp).to.equal(view.root);
        checkDOM(tmp.firstElementChild, data);

        view.render(data);

        expect(tmp = root_1.shadowRoot).to.exist;
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        expect(tmp._test).to.be.true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        expect(tmp._test).to.be.true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        expect(tmp).to.equal(view.root);
        checkDOM(tmp.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should render empty web components properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_shadow_empty, { mount: root_1 }).render(data);
        let tmp;

        expect(tmp = root_1.shadowRoot).to.exist;
        expect(tmp).to.equal(view.root);
        expect((tmp = tmp.firstElementChild).tagName).to.equal("SECTION");
        checkDOM(tmp, data);

        view.render(data);

        expect(tmp = root_1.shadowRoot).to.exist;
        expect(tmp).to.equal(view.root);
        expect((tmp = tmp.firstElementChild).tagName).to.equal("SECTION");
        checkDOM(tmp, data);

        view.clear().destroy();
    });

    it("Should render web components by option properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_shadow_option, {
            mount: root_1,
            shadow: true,
            recycle: true
        }).render({ data: data });

        let tmp;

        expect(tmp = root_1.shadowRoot).to.exist;
        expect(tmp).to.equal(view.root);
        expect((tmp = tmp.firstElementChild).tagName).to.equal("MAIN");
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        tmp._test = true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        tmp._test = true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        checkDOM(tmp.firstElementChild, data);

        view.render({ data: data });

        expect(tmp = root_1.shadowRoot).to.exist;
        expect(tmp).to.equal(view.root);
        expect((tmp = tmp.firstElementChild).tagName).to.equal("MAIN");
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        expect(tmp._test).to.be.true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        expect(tmp._test).to.be.true;
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        checkDOM(tmp.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should render once web components properly", function(){

        const root_1 = document.getElementById("root-1");
        Mikado.once(root_1, template_shadow, data);
        let tmp;

        expect(tmp = root_1.shadowRoot).to.exist;
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        checkDOM(tmp.firstElementChild, data);

        root_1.textContent = "";
    });

    it("Should render once empty web components properly", function(){

        const root_1 = document.getElementById("root-1");
        Mikado.once(root_1, template_shadow_empty, data);
        let tmp;

        expect(tmp = root_1.shadowRoot).to.exist;
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        checkDOM(tmp.firstElementChild, data);

        root_1.textContent = "";
    });
});
