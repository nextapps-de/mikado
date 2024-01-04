const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import template from "../tpl/template.js";
import data from "../data.js";
const mikado = new Mikado(template);
const root_1 = document.getElementById("root-1");
const root_2 = document.getElementById("root-2");
const root_3 = document.getElementById("root-3");

describe("Mount View", function(){

    it("View should have been mounted properly", function(){

        mikado.mount(root_1);
        expect(mikado.root).to.equal(root_1);
        expect(mikado.root["_mki"]).to.equal(mikado);
        expect(mikado.root["_mkd"]).to.equal(root_1["_mkd"]);
    });

    it("View should have been re-mounted properly to a new root", function(){

        mikado.mount(root_2);
        expect(mikado.root).to.equal(root_2);
        expect(mikado.root["_mki"]).to.equal(mikado);
        expect(mikado.root["_mkd"]).to.equal(root_2["_mkd"]);

        expect(mikado.root["_mkd"] === root_1["_mkd"]).to.be.false;
        expect(mikado.root["_mkd"] === root_2["_mkd"]).to.be.true;
    });

    it("View should have been switch mounting properly", function(){

        mikado.mount(root_1);
        mikado.render(data);
        expect(mikado.length).to.equal(data.length);

        mikado.mount(root_2);
        mikado.render(data);
        expect(mikado.length).to.equal(data.length);

        mikado.mount(root_3);
        expect(mikado.length).to.equal(0);

        mikado.mount(root_1);
        expect(mikado.length).to.equal(data.length);

        mikado.mount(root_3);
        expect(mikado.length).to.equal(0);

        mikado.mount(root_2);
        expect(mikado.length).to.equal(data.length);

        mikado.mount(root_1);
        expect(mikado.length).to.equal(data.length);
        mikado.clear();
        expect(mikado.length).to.equal(0);

        mikado.mount(root_2);
        expect(mikado.length).to.equal(data.length);
        mikado.clear();
        expect(mikado.length).to.equal(0);

        mikado.mount(root_1);
        expect(mikado.length).to.equal(0);

        mikado.clear().destroy();
    });

    it("View should have been mounted during initialization properly", function(){

        const mikado = new Mikado(template, { mount: root_3 });

        expect(mikado.root).to.equal(root_3);
        expect(mikado.root["_mki"]).to.equal(mikado);
        expect(mikado.root["_mkd"]).to.equal(root_3["_mkd"]);

        expect(mikado.root["_mkd"] === root_1["_mkd"]).to.be.false;
        expect(mikado.root["_mkd"] === root_2["_mkd"]).to.be.false;
        expect(mikado.root["_mkd"] === root_3["_mkd"]).to.be.true;

        mikado.clear().destroy();
    });

    it("Mounting should detect other view instances already mounted", function(){

        const mikado_a = new Mikado(template, { mount: root_1 });
        const mikado_b = new Mikado(template, { mount: root_2 });

        expect(mikado_a.root).to.equal(root_1);
        expect(mikado_b.root).to.equal(root_2);

        mikado_a.render(data);
        mikado_b.render(data);

        mikado_a.mount(root_2);
        expect(mikado_a.length).to.equal(0);

        mikado_b.mount(root_2);
        expect(mikado_b.length).to.equal(0);

        mikado_b.mount(root_1);
        expect(mikado_b.length).to.equal(0);

        mikado_a.clear().destroy();
        mikado_b.clear().destroy();
    });
});