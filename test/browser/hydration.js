const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_keyed from "../tpl/keyed.js";
import data from "../data.js";

describe("Hydration", function(){

    it("Should hydrate components properly", function(){

        const root_1 = document.getElementById("root-1");
        let view = new Mikado(template_keyed, { mount: root_1 });

        view.render(data);
        checkDOM(root_1.firstElementChild, data);

        const root_2 = document.getElementById("root-2");
        const html = root_1.innerHTML.replace(/data-id="([^"]+)"/g, 'key="$1" data-id="$1"');

        view.clear().destroy();

        // check disabled hydration behavior
        root_2.innerHTML = html;
        view = new Mikado(template_keyed, { mount: root_2 });
        expect(view.length).to.equal(0);

        view.clear().destroy();

        // check enabled hydration behavior
        root_2.innerHTML = html;
        view = new Mikado(template_keyed, { mount: root_2, hydrate: true });
        expect(view.length).to.equal(data.length);
        checkDOM(root_2.firstElementChild, data);

        root_2.firstElementChild._test = true;

        // validate internal state
        view.render(data);
        expect(view.length).to.equal(data.length);
        expect(root_2.firstElementChild._test).to.be.true;
        checkDOM(root_2.firstElementChild, data);

        view.clear().destroy();
    });
});
