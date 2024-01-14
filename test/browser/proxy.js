const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM, copy } from "../common.js";
import template from "../tpl/template.js";
import template_proxy from "../tpl/proxy.js";
import data from "../data.js";

describe("Reactive Proxy", function(){

    it("Should have been made properties observable", function(){

        const store = copy(data.slice(0, 10));
        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_proxy, { root: root_1 }).render(store);

        // attribute
        store[0].id = "foo";
        store[1].id = "bar";
        // class
        store[0].class = "foo";
        store[1].class = "bar";
        // text
        store[0].title = "foo";
        store[1].title = "bar";
        // style
        store[0].style = "top:0px";
        store[1].style = "top:0px";
        // html
        store[0].content = "<b>foo</b>";
        store[1].content = "<b>bar</b>";

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");
        expect(root_1.children[0].children[0].className).to.equal("foo");
        expect(root_1.children[1].children[0].className).to.equal("bar");
        expect(root_1.children[0].children[0].style.cssText.trim()).to.equal("top: 0px;");
        expect(root_1.children[1].children[0].style.cssText.trim()).to.equal("top: 0px;");
        expect(root_1.children[0].children[0].children[1].innerHTML).to.equal("<b>foo</b>");
        expect(root_1.children[1].children[0].children[1].innerHTML).to.equal("<b>bar</b>");

        view.clear().destroy();
    });

    it("Should have been made empty array observable", function(){

        const items = copy(data.slice(0, 10));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array();
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        // fill data
        for(let i = 0; i < items.length; i++) store.push(items[i]);

        expect(view.length).to.equal(items.length);
        expect(root_1.children.length).to.equal(items.length);
        expect(root_1.children[0].dataset.id).to.equal(items[0].id);
        expect(root_1.children[1].dataset.id).to.equal(items[1].id);
        checkDOM(root_1.firstElementChild, items);

        store[0].id = "foo";
        store[1].id = "bar";

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");

        store[0].id = "bar";
        store[1].id = "foo";

        expect(root_1.children[0].dataset.id).to.equal("bar");
        expect(root_1.children[1].dataset.id).to.equal("foo");

        view.render(items);

        expect(root_1.children[0].dataset.id).to.equal(items[0].id);
        expect(root_1.children[1].dataset.id).to.equal(items[1].id);

        view.clear().destroy();
    });

    it("Should have been made existing array observable", function(){

        const items = copy(data.slice(0, 10));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);

        store[0].id = "foo";
        store[1].id = "bar";

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");

        store[0].id = "bar";
        store[1].id = "foo";

        expect(root_1.children[0].dataset.id).to.equal("bar");
        expect(root_1.children[1].dataset.id).to.equal("foo");

        view.clear().destroy();
    });

    it("Should have been execute transaction properly", function(){

        const items = copy(data.slice(0, 10));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        // transaction is a replacement for render() supporting reconciling
        //view.render(store);

        store.transaction(function(){

            store[0].id = "foo";
            store[1].id = "bar";
        });

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");

        store.transaction(function(){

            store[0].id = "bar";
            store[1].id = "foo";
        });

        expect(root_1.children[0].dataset.id).to.equal("bar");
        expect(root_1.children[1].dataset.id).to.equal("foo");

        view.clear().destroy();
    });

    it("Should have been used push properly", function(){

        const items = copy(data.slice(0, 10));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array([]);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        items[0].id = "foo";
        items[1].id = "bar";

        store.push(items[0]);
        store.push(items[1]);

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");

        view.clear().destroy();
    });

    it("Should have been used pop properly", function(){

        const items = copy(data.slice(0, 2));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        const a = store.pop();
        const b = store.pop();

        expect(view.length).to.equal(0);
        expect(root_1.children.length).to.equal(0);
        expect(a).to.equal(items[1]);
        expect(b).to.equal(items[0]);

        view.clear().destroy();
    });

    it("Should have been used unshift properly", function(){

        const items = copy(data.slice(0, 2));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array([]);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        items[0].id = "foo";
        items[1].id = "bar";

        store.unshift(items[1]);
        store.unshift(items[0]);

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");

        view.clear().destroy();
    });

    it("Should have been used shift properly", function(){

        const items = copy(data.slice(0, 2));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        const a = store.shift();
        const b = store.shift();

        expect(view.length).to.equal(0);
        expect(root_1.children.length).to.equal(0);
        expect(a).to.equal(items[0]);
        expect(b).to.equal(items[1]);

        view.clear().destroy();
    });

    it("Should have been used concat properly", function(){

        const items = copy(data.slice(0, 2));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array([]);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        items[0].id = "foo";
        items[1].id = "bar";

        store.concat(items);

        expect(root_1.children[0].dataset.id).to.equal("foo");
        expect(root_1.children[1].dataset.id).to.equal("bar");

        store[0].id = "bar";
        store[1].id = "foo";

        expect(root_1.children[0].dataset.id).to.equal("bar");
        expect(root_1.children[1].dataset.id).to.equal("foo");

        view.clear().destroy();
    });

    it("Should have been used slice properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        const a = store.slice();

        expect(a.length).to.equal(5);
        expect(a).to.eql(items);

        const b = store.slice(3);

        expect(b.length).to.equal(2);
        expect(b).to.eql([items[3], items[4]]);

        const c = store.slice(1, 3);

        expect(c.length).to.equal(2);
        expect(c).to.eql([items[1], items[2]]);

        view.clear().destroy();
    });

    it("Should have been used splice properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        const a = store.splice(0);

        expect(view.length).to.equal(0);
        expect(a.length).to.equal(5);
        expect(a).to.eql(items);

        store.splice(0, 0, a[1]);
        store.splice(0, 0, a[0]);

        expect(view.length).to.equal(2);
        expect(root_1.children[0].dataset.id).to.equal(items[0]["id"]);
        expect(root_1.children[1].dataset.id).to.equal(items[1]["id"]);

        store.splice(0, 2, a[2]);

        expect(view.length).to.equal(1);
        expect(root_1.children[0].dataset.id).to.equal(items[2]["id"]);

        view.clear().destroy();
    });

    it("Should have been used swap properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);
        store.swap(0, 4);

        expect(store[0]).to.deep.equal(items[4]);
        expect(root_1.children[0].dataset.id).to.deep.equal(items[4]["id"]);
        expect(store[4]).to.deep.equal(items[0]);
        expect(root_1.children[4].dataset.id).to.deep.equal(items[0]["id"]);

        view.clear().destroy();
    });

    it("Should have been used index assign properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);

        const tmp = store[0];
        store[0] = store[4];
        store[4] = tmp;

        expect(store[0]).to.deep.equal(items[4]);
        expect(root_1.children[0].dataset.id).to.equal(store[0]["id"]);
        expect(store[4]).to.deep.equal(items[0]);
        expect(root_1.children[4].dataset.id).to.equal(store[4]["id"]);

        view.clear().destroy();
    });

    it("Should have been used filter properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);

        const result = store.filter(function(item){
            return item.index  % 2 === 0;
        });

        expect(result.length).to.equal(3);
        expect(result[0]).to.deep.equal(items[0]);
        expect(root_1.children[0].dataset.id).to.equal(items[0]["id"]);
        expect(result[1]).to.deep.equal(items[2]);
        expect(root_1.children[1].dataset.id).to.equal(items[2]["id"]);
        expect(result[2]).to.deep.equal(items[4]);
        expect(root_1.children[2].dataset.id).to.equal(items[4]["id"]);

        view.clear().destroy();
    });

    it("Should have been used map properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);

        let i = 5;

        const result = store.map(function(item){
            return items.slice(--i, i + 1)[0];
        });

        expect(result.length).to.equal(5);
        expect(result[0]).to.deep.equal(items[4]);
        expect(root_1.children[0].dataset.id).to.equal(items[4]["id"]);
        expect(result[4]).to.deep.equal(items[0]);
        expect(root_1.children[4].dataset.id).to.equal(items[0]["id"]);

        view.clear().destroy();
    });

    it("Should have been reversed properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);
        store.reverse();

        expect(store[0]).to.deep.equal(items[4]);
        expect(root_1.children[0].dataset.id).to.equal(items[4]["id"]);
        expect(store[4]).to.deep.equal(items[0]);
        expect(root_1.children[4].dataset.id).to.equal(items[0]["id"]);

        view.clear().destroy();
    });

    it("Should have been sorted properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);

        store.sort(function(a, b){
            return b.index - a.index; // down by index (reversed)
        });

        expect(root_1.children[0].dataset.id).to.equal(store[0]["id"]);
        expect(root_1.children[0].dataset.id).to.equal(data[4]["id"]);
        expect(root_1.children[4].dataset.id).to.equal(store[4]["id"]);
        expect(root_1.children[4].dataset.id).to.equal(data[0]["id"]);

        view.clear().destroy();
    });

    it("Should have been used indexOf properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);
        expect(store.indexOf(store[2])).to.equal(2);
        expect(store.indexOf(store[4])).to.equal(4);

        store[2] = store[4];

        expect(store.indexOf(store[4])).to.equal(2);
        expect(store.indexOf(store[2])).to.equal(2);
        expect(store.indexOf(store[5])).to.equal(-1);

        view.clear().destroy();
    });

    it("Should have been used lastIndexOf properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);
        store[4] = store[2];

        expect(store.lastIndexOf(store[2])).to.equal(4);
        expect(store.lastIndexOf(store[5])).to.equal(-1);
    });

    it("Should have been used forEach properly", function(){

        const items = copy(data.slice(0, 5));
        const root_1 = document.getElementById("root-1");
        const store = Mikado.Array(items);
        const view = new Mikado(template_proxy, { root: root_1, observe: store });

        view.render(store);

        let count = 0;
        store.forEach(() => count++);

        expect(count).to.equal(5);
    });
});