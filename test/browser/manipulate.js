const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_static from "../tpl/static.js";
import data from "../data.js";

describe("Manipulate Views", function(){

    it("Should have been used 'up' properly (index)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        let tmp_a = root_1.children[10];
        let tmp_b = root_1.children[9];

        view.up(10);

        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[9]).to.equal(tmp_a);

        tmp_a = root_1.children[10];
        tmp_b = root_1.children[9];

        view.up(10, 1);

        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[9]).to.equal(tmp_a);

        view.up(10, -1);

        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[9]).to.equal(tmp_a);

        view.clear().destroy();
    });

    it("Should have been used 'up' properly (index + offset)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[5];
        const tmp_c = root_1.children[9];

        view.up(10, 5);

        expect(root_1.children[5]).to.equal(tmp_a);
        expect(root_1.children[6]).to.equal(tmp_b);
        expect(root_1.children[10]).to.equal(tmp_c);
    });

    it("Should have been used 'up' properly (first)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[0];
        const tmp_c = root_1.children[1];

        view.first(10);

        expect(root_1.children[0]).to.equal(tmp_a);
        expect(root_1.children[1]).to.equal(tmp_b);
        expect(root_1.children[2]).to.equal(tmp_c);
    });

    it("Should have been used 'down' properly (index)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        let tmp_a = root_1.children[10];
        let tmp_b = root_1.children[11];

        view.down(10);

        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[11]).to.equal(tmp_a);

        tmp_a = root_1.children[10];
        tmp_b = root_1.children[11];

        view.down(10, 1);

        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[11]).to.equal(tmp_a);

        view.down(10, -1);

        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[11]).to.equal(tmp_a);
    });

    it("Should have been used 'down' properly (index + offset)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.down(10, 5);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);
    });

    it("Should have been used 'down' properly (last)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[length - 1];
        const tmp_c = root_1.children[11];

        view.last(10);

        expect(root_1.children[length - 1]).to.equal(tmp_a);
        expect(root_1.children[length - 2]).to.equal(tmp_b);
        expect(root_1.children[10]).to.equal(tmp_c);
    });

    it("Should have been used 'shift' properly (down)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.shift(10, 5);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);

        view.shift(10, 0);

        expect(root_1.children[10]).to.equal(tmp_b);

        view.shift(10, length);

        expect(root_1.children[length - 1]).to.equal(tmp_b);
    });

    it("Should have been used 'shift' properly (up)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[5];
        const tmp_c = root_1.children[9];

        view.shift(10, -5);

        expect(root_1.children[5]).to.equal(tmp_a);
        expect(root_1.children[6]).to.equal(tmp_b);
        expect(root_1.children[10]).to.equal(tmp_c);

        view.shift(10, 0);

        expect(root_1.children[10]).to.equal(tmp_c);

        view.shift(10, -length);

        expect(root_1.children[0]).to.equal(tmp_c);
    });

    it("Should have been used 'move' properly (down)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.move(10, 15);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);

        view.move(10, 10);

        expect(root_1.children[10]).to.equal(tmp_b);

        view.move(10, length * 2);

        expect(root_1.children[length - 1]).to.equal(tmp_b);

        view.move(length - 1, -2);

        expect(root_1.children[length - 3]).to.equal(tmp_b);
    });

    it("Should have been used 'move' properly (up)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[5];
        const tmp_c = root_1.children[9];

        view.move(10, 5);

        expect(root_1.children[5]).to.equal(tmp_a);
        expect(root_1.children[6]).to.equal(tmp_b);
        expect(root_1.children[10]).to.equal(tmp_c);

        view.move(10, 10);

        expect(root_1.children[10]).to.equal(tmp_c);

        view.move(10, 0);

        expect(root_1.children[0]).to.equal(tmp_c);

        view.move(0, -10);

        expect(root_1.children[length - 11]).to.equal(tmp_c);
    });

    it("Should have been used 'move' properly (by node + index)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.move(root_1.children[10], 15);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);
    });

    it("Should have been used 'before' properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.before(10, 16);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);

        view.before(10, 11);
        expect(root_1.children[10]).to.equal(tmp_b);

        view.before(10, length * 2);
        expect(root_1.children[length - 1]).to.equal(tmp_b);

        view.before(length - 1, -2);
        expect(root_1.children[length - 3]).to.equal(tmp_b);

        view.before(-2, -2);
        expect(root_1.children[length - 4]).to.equal(tmp_b);

        view.before(-3, -1);
        expect(root_1.children[length - 3]).to.equal(tmp_b);

        view.before(-2, -4);
        expect(root_1.children[length - 6]).to.equal(tmp_b);
    });

    it("Should have been used 'before' properly (by node)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.before(root_1.children[10], root_1.children[16]);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);
    });

    it("Should have been used 'after' properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const length = root_1.children.length;
        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.after(10, 14);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);

        view.after(10, 9);
        expect(root_1.children[10]).to.equal(tmp_b);

        view.after(10, length * 2);
        expect(root_1.children[length - 1]).to.equal(tmp_b);

        view.after(length - 1, -2);
        expect(root_1.children[length - 3]).to.equal(tmp_b);

        view.after(-2, -2);
        expect(root_1.children[length - 2]).to.equal(tmp_b);

        view.after(-1, -3);
        expect(root_1.children[length - 3]).to.equal(tmp_b);

        view.after(-2, -1);
        expect(root_1.children[length - 1]).to.equal(tmp_b);
    });

    it("Should have been used 'after' properly (by node)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[11];
        const tmp_c = root_1.children[15];

        view.after(root_1.children[10], root_1.children[14]);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[14]).to.equal(tmp_c);
    });

    it("Should have been used 'swap' properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 20));

        const tmp_a = root_1.children[10];
        const tmp_b = root_1.children[15];
        const tmp_c = root_1.children[11];

        view.swap(10, 15);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[11]).to.equal(tmp_c);

        view.swap(-10, -5);

        expect(root_1.children[10]).to.equal(tmp_a);
        expect(root_1.children[15]).to.equal(tmp_b);
        expect(root_1.children[11]).to.equal(tmp_c);

        view.swap(root_1.children[10], root_1.children[15]);

        expect(root_1.children[15]).to.equal(tmp_a);
        expect(root_1.children[10]).to.equal(tmp_b);
        expect(root_1.children[11]).to.equal(tmp_c);
    });
});