const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_scope from "../tpl/scope.js";
import data from "../data.js";

describe("Inline Scripts (Scope)", function(){

    it("Should handle inline scripts properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_scope, { mount: root_1 }).render({ test: "foobar" });
        let tmp;

        expect(view.length).to.equal(1);
        expect((tmp = root_1.firstElementChild.firstElementChild).textContent).to.equal("test");
        expect((tmp = tmp.nextElementSibling).textContent).to.equal("test|test");
        expect((tmp = tmp.nextElementSibling).textContent).to.equal("test|test|foobar");

        view.clear().destroy();
    });
});
