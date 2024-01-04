const { describe, it } = intern.getPlugin("interface.bdd");
const { expect, assert } = intern.getPlugin("chai");

import template from "../tpl/template.js";

describe("Check Bundle", function(){

    it("Static class methods should have been exported", function(){

        assert.isFunction(Mikado.register);
        assert.isFunction(Mikado.unregister);
        assert.isFunction(Mikado.once);
        assert.isFunction(Mikado.listen);
        assert.isFunction(Mikado.unlisten);
        assert.isFunction(Mikado.dispatch);
        assert.isFunction(Mikado.Array);
    });

    it("Static class properties should have been exported", function(){

        expect(Mikado).to.hasOwnProperty("eventBubble");
        expect(Mikado).to.hasOwnProperty("eventCache");
    });

    it("Static DOM Cache Helper should have been exported", function(){

        assert.isFunction(Mikado.setText);
        assert.isFunction(Mikado.getText);
        assert.isFunction(Mikado.setHtml);
        assert.isFunction(Mikado.getHtml);
        assert.isFunction(Mikado.setClass);
        assert.isFunction(Mikado.getClass);
        assert.isFunction(Mikado.hasClass);
        assert.isFunction(Mikado.addClass);
        assert.isFunction(Mikado.removeClass);
        assert.isFunction(Mikado.toggleClass);
        assert.isFunction(Mikado.setStyle);
        assert.isFunction(Mikado.getStyle);
        assert.isFunction(Mikado.setCss);
        assert.isFunction(Mikado.getCss);
        assert.isFunction(Mikado.setAttribute);
        assert.isFunction(Mikado.getAttribute);
        assert.isFunction(Mikado.hasAttribute);
        assert.isFunction(Mikado.removeAttribute);
    });

    it("Mikado class methods should have been exported", async function(){

        const mikado = new Mikado(template);

        assert.instanceOf(mikado, Mikado);
        assert.isString(mikado.name);
        assert.isNull(mikado.root);
        //assert.instanceOf(mikado.root, HTMLElement);
        assert.isObject(mikado.state);

        expect(mikado).to.respondTo("mount");
        expect(mikado).to.respondTo("render");
        expect(mikado).to.respondTo("cancel");
        expect(mikado).to.respondTo("destroy");
        expect(mikado).to.respondTo("flush");

        expect(mikado).to.respondTo("add");
        expect(mikado).to.respondTo("update");
        expect(mikado).to.respondTo("remove");
        expect(mikado).to.respondTo("replace");
        expect(mikado).to.respondTo("append");
        expect(mikado).to.respondTo("create");
        expect(mikado).to.respondTo("clear");

        expect(mikado).to.respondTo("node");
        expect(mikado).to.respondTo("index");

        expect(mikado).to.respondTo("route");
        expect(mikado).to.respondTo("listen");
        expect(mikado).to.respondTo("unlisten");
        expect(mikado).to.respondTo("dispatch");

        expect(mikado).to.respondTo("move");
        expect(mikado).to.respondTo("shift");
        expect(mikado).to.respondTo("before");
        expect(mikado).to.respondTo("after");
        expect(mikado).to.respondTo("up");
        expect(mikado).to.respondTo("down");
        expect(mikado).to.respondTo("first");
        expect(mikado).to.respondTo("last");
        expect(mikado).to.respondTo("swap");
    });

    it("Observable Array class methods should have been exported", async function(){

        const array = new Mikado.Array();

        assert.instanceOf(array, Mikado.Array);
        assert.isNumber(array.length);

        expect(array).to.respondTo("mount");
        expect(array).to.respondTo("concat");
        expect(array).to.respondTo("filter");
        expect(array).to.respondTo("forEach");
        expect(array).to.respondTo("indexOf");
        expect(array).to.respondTo("lastIndexOf");
        expect(array).to.respondTo("map");
        expect(array).to.respondTo("pop");
        expect(array).to.respondTo("push");
        expect(array).to.respondTo("reverse");
        expect(array).to.respondTo("set");
        expect(array).to.respondTo("shift");
        expect(array).to.respondTo("slice");
        expect(array).to.respondTo("sort");
        expect(array).to.respondTo("splice");
        expect(array).to.respondTo("swap");
        expect(array).to.respondTo("unshift");
    });
});
