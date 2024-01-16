const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_keyed from "../tpl/keyed.js";
import data from "../data.js";
//import MikadoTest from "../../src/mikado.js";

// This is a replacement of a performance test which was based on timings before.
// This workaround will produce more stable results.
//
// 7 expressions on 5 elements total:
// ----------------------------------
// attributes: 3 (on same element)
// class: 1
// text: 2
// html: 1

describe("Performance Tests", function(){

    it("Should execute non-keyed render properly (no ca-che)", function(){

        Mikado.unlisten("click").unlisten("tap");

        const root_1 = document.getElementById("root-2");

        window.profiler = {};
        const view = new Mikado(template);

        expect(Object.keys(window.profiler).length).to.equal(1);
        expect(window.profiler["mikado.new"]).to.equal(1);

        window.profiler = {};
        view.mount(root_1);

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["cache.create"]).to.equal(7);
        expect(window.profiler["event.listen"]).to.equal(2);
        expect(window.profiler["event.register"]).to.equal(2);
        expect(window.profiler["factory.construct"]).to.equal(5);
        expect(window.profiler["view.mount"]).to.equal(1);

        window.profiler = {};
        view.render(data.slice(0, 5).reverse());

        expect(Object.keys(window.profiler).length).to.equal(9);
        expect(window.profiler["cache.attr"]).to.equal(5 * 3);
        expect(window.profiler["cache.class"]).to.equal(5 * 1);
        expect(window.profiler["cache.html"]).to.equal(5 * 1);
        expect(window.profiler["cache.miss"]).to.equal(5 * 7);
        expect(window.profiler["cache.text"]).to.equal(5 * 2);
        expect(window.profiler["factory.clone"]).to.equal(5);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["view.render"]).to.equal(1);

        window.profiler = {};
        view.render(data.slice(0, 5));

        expect(Object.keys(window.profiler).length).to.equal(11);
        expect(window.profiler["cache.attr"]).to.equal(13);
        expect(window.profiler["cache.class"]).to.equal(4);
        expect(window.profiler["cache.html"]).to.equal(4);
        expect(window.profiler["cache.match"]).to.equal(6); // todo check
        expect(window.profiler["cache.miss"]).to.equal(29); // 35 - 6 matched
        expect(window.profiler["cache.text"]).to.equal(8);
        expect(window.profiler["factory.clone"]).to.equal(5);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);

        window.profiler = {};
        view.clear().destroy();

        expect(Object.keys(window.profiler).length).to.equal(3);
        expect(window.profiler["view.clear"]).to.equal(1);
        expect(window.profiler["view.destroy"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);

        //console.log(Object.assign({}, window.profiler))
    });

    it("Should execute non-keyed render properly (cache + recycle + pool)", function(){

        Mikado.unlisten("click").unlisten("tap");

        const root_1 = document.getElementById("root-2");

        window.profiler = {};
        const view = new Mikado(template, { cache: true, recycle: true, pool: true });

        expect(Object.keys(window.profiler).length).to.equal(1);
        expect(window.profiler["mikado.new"]).to.equal(1);

        window.profiler = {};
        view.mount(root_1);

        // factory construct

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["view.mount"]).to.equal(1);
        expect(window.profiler["cache.create"]).to.equal(7);
        expect(window.profiler["factory.construct"]).to.equal(5);
        expect(window.profiler["event.listen"]).to.equal(2);
        expect(window.profiler["event.register"]).to.equal(2);

        window.profiler = {};
        view.render(data.slice(0, 5));

        // factory clone (no cache on first round)

        expect(Object.keys(window.profiler).length).to.equal(9);
        expect(window.profiler["cache.attr"]).to.equal(5 * 3);
        expect(window.profiler["cache.class"]).to.equal(5 * 1);
        expect(window.profiler["cache.html"]).to.equal(5 * 1);
        expect(window.profiler["cache.miss"]).to.equal(5 * 7);
        expect(window.profiler["cache.text"]).to.equal(5 * 2);
        expect(window.profiler["factory.clone"]).to.equal(5);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["view.render"]).to.equal(1);

        window.profiler = {};
        view.render(data.slice(0, 5));

        // factory path + resolve => added cache

        expect(Object.keys(window.profiler).length).to.equal(11);
        expect(window.profiler["cache.create"]).to.equal(25);
        expect(window.profiler["cache.attr"]).to.equal(5 * 3);
        expect(window.profiler["cache.class"]).to.equal(5 * 1 - 1); // one match
        expect(window.profiler["cache.html"]).to.equal(5 * 1);
        expect(window.profiler["cache.miss"]).to.equal(5 * 7 - 1); // one match
        expect(window.profiler["cache.text"]).to.equal(5 * 2);
        expect(window.profiler["cache.match"]).to.equal(1); // matched unused class property
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.update"]).to.equal(5);
        expect(window.profiler["factory.path"]).to.equal(5);
        expect(window.profiler["factory.resolve"]).to.equal(5 * 4);

        window.profiler = {};
        view.render(data.slice(0, 5));

        // full cached cycle

        expect(Object.keys(window.profiler).length).to.equal(3);
        expect(window.profiler["cache.match"]).to.equal(5 * 7);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.update"]).to.equal(5);

        window.profiler = {};
        view.clear();

        expect(Object.keys(window.profiler).length).to.equal(4);
        expect(window.profiler["view.checkout"]).to.equal(5);
        expect(window.profiler["view.clear"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);
        expect(window.profiler["pool.in"]).to.equal(5);

        window.profiler = {};
        view.render(data.slice(0, 5));

        // full cached cycle

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["cache.match"]).to.equal(5 * 7);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["pool.out"]).to.equal(5);

        window.profiler = {};
        view.clear().destroy();

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["view.checkout"]).to.equal(5);
        expect(window.profiler["view.clear"]).to.equal(1);
        expect(window.profiler["view.destroy"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);
        expect(window.profiler["pool.in"]).to.equal(5);

        //console.log(Object.assign({}, window.profiler))
    });

    it("Should execute keyed render properly (no cache)", function(){

        Mikado.unlisten("click").unlisten("tap");

        const root_1 = document.getElementById("root-2");

        window.profiler = {};
        const view = new Mikado(template_keyed);

        expect(Object.keys(window.profiler).length).to.equal(1);
        expect(window.profiler["mikado.new"]).to.equal(1);

        window.profiler = {};
        view.mount(root_1);

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["view.mount"]).to.equal(1);
        expect(window.profiler["cache.create"]).to.equal(7);
        expect(window.profiler["event.listen"]).to.equal(2);
        expect(window.profiler["event.register"]).to.equal(2);
        expect(window.profiler["factory.construct"]).to.equal(5);

        window.profiler = {};
        view.render(data.slice(0, 5));

        expect(Object.keys(window.profiler).length).to.equal(9);
        expect(window.profiler["cache.attr"]).to.equal(5 * 3);
        expect(window.profiler["cache.class"]).to.equal(5 * 1);
        expect(window.profiler["cache.html"]).to.equal(5 * 1);
        expect(window.profiler["cache.miss"]).to.equal(5 * 7);
        expect(window.profiler["cache.text"]).to.equal(5 * 2);
        expect(window.profiler["factory.clone"]).to.equal(5);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["view.render"]).to.equal(1);

        window.profiler = {};
        view.render(data.slice(0, 5).reverse());

        expect(Object.keys(window.profiler).length).to.equal(7)
        expect(window.profiler["cache.create"]).to.equal(5 * 5);
        expect(window.profiler["factory.path"]).to.equal(5);
        expect(window.profiler["factory.resolve"]).to.equal(5 * 4);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.reconcile"]).to.equal(1);
        expect(window.profiler["view.update"]).to.equal(5);
        expect(window.profiler["view.reconcile.steps"]).to.equal(4);

        window.profiler = {};
        view.clear().destroy();

        expect(Object.keys(window.profiler).length).to.equal(4);
        expect(window.profiler["view.checkout"]).to.equal(5);
        expect(window.profiler["view.clear"]).to.equal(1);
        expect(window.profiler["view.destroy"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);

        //console.log(Object.assign({}, window.profiler))
    });

    it("Should execute keyed render properly (cache + recycle + pool)", function(){

        Mikado.unlisten("click").unlisten("tap");

        const root_1 = document.getElementById("root-2");

        window.profiler = {};
        const view = new Mikado(template_keyed, { cache: true, pool: true });
        const items = data.slice(0, 5);
        const shortest_path_length = 4;

        expect(Object.keys(window.profiler).length).to.equal(1);
        expect(window.profiler["mikado.new"]).to.equal(1);

        window.profiler = {};
        view.mount(root_1);

        // factory construct

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["view.mount"]).to.equal(1);
        expect(window.profiler["cache.create"]).to.equal(7);
        expect(window.profiler["event.listen"]).to.equal(2);
        expect(window.profiler["event.register"]).to.equal(2);
        expect(window.profiler["factory.construct"]).to.equal(5);

        window.profiler = {};
        view.render(items);

        // factory clone (no cache on first round)

        expect(Object.keys(window.profiler).length).to.equal(9);
        expect(window.profiler["cache.attr"]).to.equal(5 * 3);
        expect(window.profiler["cache.class"]).to.equal(5 * 1);
        expect(window.profiler["cache.html"]).to.equal(5 * 1);
        expect(window.profiler["cache.miss"]).to.equal(5 * 7);
        expect(window.profiler["cache.text"]).to.equal(5 * 2);
        expect(window.profiler["factory.clone"]).to.equal(5);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["view.render"]).to.equal(1);

        window.profiler = {};
        view.render(items.reverse());

        // factory path + resolve => added cache

        expect(Object.keys(window.profiler).length).to.equal(13);
        expect(window.profiler["cache.attr"]).to.equal(5 * 3);
        expect(window.profiler["cache.class"]).to.equal(5 * 1 - 1); // one match
        expect(window.profiler["cache.create"]).to.equal(5 * 5);
        expect(window.profiler["cache.html"]).to.equal(5 * 1);
        expect(window.profiler["cache.miss"]).to.equal(5 * 7 - 1); // one match
        expect(window.profiler["cache.text"]).to.equal(5 * 2);
        expect(window.profiler["cache.match"]).to.equal(1); // matched unused class property
        expect(window.profiler["factory.path"]).to.equal(5);
        expect(window.profiler["factory.resolve"]).to.equal(5 * 4);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.reconcile"]).to.equal(1);
        expect(window.profiler["view.reconcile.steps"]).to.equal(shortest_path_length);
        expect(window.profiler["view.update"]).to.equal(5);

        window.profiler = {};
        view.render(items);

        // full cached cycle

        expect(Object.keys(window.profiler).length).to.equal(3);
        expect(window.profiler["cache.match"]).to.equal(5 * 7);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.update"]).to.equal(5);

        window.profiler = {};
        view.render(items.reverse());

        // full cached cycle (re-order)

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["cache.match"]).to.equal(5 * 7);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.update"]).to.equal(5);
        expect(window.profiler["view.reconcile"]).to.equal(1);
        expect(window.profiler["view.reconcile.steps"]).to.equal(shortest_path_length);

        window.profiler = {};
        view.clear();

        // apply pool transitions

        expect(Object.keys(window.profiler).length).to.equal(4);
        expect(window.profiler["view.checkout"]).to.equal(5);
        expect(window.profiler["view.clear"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);
        expect(window.profiler["pool.in"]).to.equal(5);

        window.profiler = {};
        view.render(items.reverse());

        // full cached cycle

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["cache.match"]).to.equal(5 * 7);
        expect(window.profiler["view.render"]).to.equal(1);
        expect(window.profiler["view.create"]).to.equal(5);
        expect(window.profiler["view.add"]).to.equal(5);
        expect(window.profiler["pool.out"]).to.equal(5);

        window.profiler = {};
        view.clear().destroy();

        expect(Object.keys(window.profiler).length).to.equal(5);
        expect(window.profiler["view.checkout"]).to.equal(5);
        expect(window.profiler["view.clear"]).to.equal(1);
        expect(window.profiler["view.destroy"]).to.equal(1);
        expect(window.profiler["view.remove"]).to.equal(5);
        expect(window.profiler["pool.in"]).to.equal(5);

        //console.log(Object.assign({}, window.profiler))
    });
});
