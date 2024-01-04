const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_keyed from "../tpl/keyed.js";
import data from "../data.js";

function copy(store){

    for(let i = 0; i < store.length; i++){

        // de-referencing data instead of modifying original test data

        store[i] = Object.assign({}, store[i], { style: "padding-right: 10px;" });
    }

    return store;
}

describe("Custom Callbacks", function(){

    it("Should have been called hooks properly", function(){

        let count_create = 0;
        let count_recycle = 0;
        let count_insert = 0;
        let count_update = 0;
        let count_replace = 0;
        let count_remove = 0;

        const view = new Mikado(template_keyed, {
            recycle: true,
            pool: true,
            mount: document.getElementById("root-1"),
            on: {
                create: function(node){ count_create++; },
                recycle: function(node){ count_recycle++; },
                insert: function(node){ count_insert++; },
                update: function(node){ count_update++; },
                remove: function(node){ count_remove++; },
                replace: function(node){ count_replace++; }
            }
        });

        const items = data.slice(0, 50);
        view.render(items);

        expect(count_create).to.equal(items.length);
        expect(count_recycle).to.equal(0);
        expect(count_insert).to.equal(items.length);
        expect(count_update).to.equal(0);
        expect(count_replace).to.equal(0);
        expect(count_remove).to.equal(0);

        view.render(items);

        expect(count_create).to.equal(items.length);
        expect(count_recycle).to.equal(0);
        expect(count_insert).to.equal(items.length);
        expect(count_update).to.equal(items.length);
        expect(count_replace).to.equal(0);
        expect(count_remove).to.equal(0);

        view.clear();

        expect(count_create).to.equal(items.length)
        expect(count_recycle).to.equal(0);
        expect(count_insert).to.equal(items.length);
        expect(count_update).to.equal(items.length);
        expect(count_replace).to.equal(0);
        expect(count_remove).to.equal(items.length);

        view.render(items);

        expect(count_create).to.equal(items.length);
        expect(count_recycle).to.equal(items.length);
        expect(count_insert).to.equal(items.length * 2);
        expect(count_update).to.equal(items.length);
        expect(count_replace).to.equal(0);
        expect(count_remove).to.equal(items.length);

        view.render(data.slice(50));

        expect(count_create).to.equal(items.length * 2);
        expect(count_recycle).to.equal(items.length);
        expect(count_insert).to.equal(items.length * 2);
        expect(count_update).to.equal(items.length);
        expect(count_replace).to.equal(items.length);
        expect(count_remove).to.equal(items.length);
    });
});