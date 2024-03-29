const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM, escape } from "../common.js";
import template from "../tpl/template.js";
import template_static from "../tpl/static.js";
import template_svg from "../tpl/svg.js";
import template_full from "../tpl/full.js";
import template_crazy from "../tpl/crazy.js";
import template_whitespace from "../tpl/whitespace.js";
import template_idl from "../tpl/idl.js";
import data from "../data.js";

describe("Render Template", function(){

    it("Should render an array properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1 }).render(data);

        checkDOM(root_1.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should render a single object properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1 }).render(data[0]);

        checkDOM(root_1.firstElementChild, [data[0]]);

        view.clear().destroy();
    });

    it("Should render once properly", function(){

        const root_1 = document.getElementById("root-1");

        Mikado.once(root_1, template, data[0]);
        expect(root_1.children.length).to.equal(1);
        // once does not support index keyword in templates
        checkDOM(root_1.firstElementChild, [data[0]], /* data index */ null);

        root_1.innerHTML = "";
    });

    it("Should render static templates properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_static).mount(root_1).render();

        expect(template_static.fn).to.equal(null);
        expect(view.length).to.equal(1);
        expect(root_1.childNodes.length).to.equal(1);

        view.clear().destroy();
    });

    it("Should render static templates once properly", function(){

        const root_1 = document.getElementById("root-1");
        Mikado.once(root_1, template_static);

        expect(template_static.fn).to.equal(null);
        expect(root_1.childNodes.length).to.equal(1);

        root_1.innerHTML = "";
    });

    it("Should have been cleared properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template);

        view.mount(root_1).render(data);

        expect(view.length).to.equal(data.length);
        expect(view.root.childNodes.length).to.equal(data.length);

        view.clear();

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");
    });

    it("Should have been rendered properly (Async)", async function(){

        const root_1 = document.getElementById("root-1");
        let view = new Mikado(template, { mount: root_1 });

        // callback = true
        let promise = view.render(data, true);

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        await promise;

        expect(view.length).to.equal(data.length);
        expect(view.root.childNodes.length).to.equal(data.length);
        checkDOM(root_1.firstElementChild, data);

        view.clear();

        // callback = function
        view.render(data, function(){});

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        await new Promise(function(resolve){

            requestAnimationFrame(function(){

                expect(view.length).to.equal(data.length);
                expect(view.root.childNodes.length).to.equal(data.length);
                checkDOM(root_1.firstElementChild, data);

                view.clear().destroy();
                resolve();
            });
        });

        // by option
        view = new Mikado(template, { mount: root_1, async: true });
        promise = view.render(data);

        expect(view.length).to.equal(0);
        expect(view.root.childNodes.length).to.equal(0);
        expect(view.root.innerHTML).to.equal("");

        await promise;

        expect(view.length).to.equal(data.length);
        expect(view.root.childNodes.length).to.equal(data.length);
        checkDOM(root_1.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should have been canceled properly", async function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { mount: root_1 });
        let test = true;

        view.render(data, function(){

            test = false;
        });

        view.cancel();

        await new Promise(function(resolve){

            requestAnimationFrame(function(){

                expect(test).to.equal(true);

                view.clear().destroy();
                resolve();
            });
        });
    });

    it("Should clear a view properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 10));

        expect(view.length).to.equal(10);
        view.clear();
        expect(view.length).to.equal(0);
        expect(root_1.children.length).to.equal(0);

        view.clear().destroy();
    });

    it("Should have been destroyed properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data.slice(0, 10));
        expect(view.state).to.deep.equal({});
        expect(view.root).to.equal(root_1);

        view.destroy();

        expect(view.state).to.equal(null);
        expect(view.root).to.equal(null);
    });

    it("Should have been rendered SVG properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_svg, { root: root_1 });

        view.render();
        expect(view.length).to.equal(1);

        //const node = root_1.firstElementChild;
        // setTimeout(function(){
        //     window.document.body.append(node);
        // }, 1000)

        view.clear().destroy();
    });

    it("Should render IDL properties properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_idl, { mount: root_1 });
        let tmp;

        // test creation

        view.render([{
            selected: 1,
            checked: 1,
            hidden: 1
        },{
            selected: 2,
            checked: 2,
            hidden: 2
        },{
            selected: 3,
            checked: 3,
            hidden: 3
        }]);

        // <select>

        tmp = view.root.querySelector("form:nth-of-type(1) option");
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);

        // <checkbox>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=checkbox]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        // <radio>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=radio]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        // hidden

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=text]");
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);

        // test factory cycle

        view.render([{
            selected: 2,
            checked: 2,
            hidden: 2
        },{
            selected: 3,
            checked: 3,
            hidden: 3
        },{
            selected: 1,
            checked: 1,
            hidden: 1
        }]);

        // <select>

        tmp = view.root.querySelector("form:nth-of-type(1) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) option");
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        // <checkbox>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=checkbox]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        // <radio>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=radio]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        // hidden

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=text]");
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        view.clear().destroy();
    });

    it("Should render IDL properties properly (recycle + cache)", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_idl, { mount: root_1, recycle: true, cache: true });
        let tmp;

        // test creation

        view.render([{
            selected: 1,
            checked: 1,
            hidden: 1
        },{
            selected: 2,
            checked: 2,
            hidden: 2
        },{
            selected: 3,
            checked: 3,
            hidden: 3
        }]);

        // <select>

        tmp = view.root.querySelector("form:nth-of-type(1) option");
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);

        // <checkbox>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=checkbox]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        // <radio>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=radio]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        // hidden

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=text]");
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);

        // test factory cycle

        view.render([{
            selected: 2,
            checked: 2,
            hidden: 2
        },{
            selected: 3,
            checked: 3,
            hidden: 3
        },{
            selected: 1,
            checked: 1,
            hidden: 1
        }]);

        // <select>

        tmp = view.root.querySelector("form:nth-of-type(1) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) option");
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) option");
        expect(tmp.selected).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.selected).to.equal(false);

        // <checkbox>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=checkbox]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=checkbox]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        // <radio>

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=radio]");
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=radio]");
        expect(tmp.checked).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.checked).to.equal(false);

        // hidden

        tmp = view.root.querySelector("form:nth-of-type(1) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        tmp = view.root.querySelector("form:nth-of-type(2) input[type=text]");
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(true);

        tmp = view.root.querySelector("form:nth-of-type(3) input[type=text]");
        expect(tmp.hidden).to.equal(true);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);
        tmp = tmp.nextElementSibling;
        expect(tmp.hidden).to.equal(false);

        view.clear().destroy();
    });

    it("Should render a complex template properly", function(){

        // the named include "pager" needs to be registered before use
        const tpl_pager = Mikado.compile("<template name='pager'><div class='pager'></div></template>")
        Mikado.register(tpl_pager);

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_full, { mount: root_1 });
        const entries = [{
            id: 1,
            date: "2023-12-01T14:00:00",
            title: "A simple title 1",
            media: "<img src='img1.jpg'>",
            category: null,
            comment: "Some <script>untrusted</script> content",
            mode: "off"
        },{
            id: 2,
            date: "2023-12-02T15:00:00",
            title: "A simple title 2",
            media: "<video src='mov2.mp4'>",
            category: null,
            comment: "Some <script>untrusted</script> content",
            mode: "on"
        },{
            id: 3,
            date: "2023-12-03T16:00:00",
            title: "A simple title 3",
            media: "<img src='img3.jpg'>",
            category: null,
            comment: "Some <script>untrusted</script> content",
            mode: "off"
        }];

        view.render({
            view: "video",
            entries: entries
        });

        expect(view.length).to.equal(1);
        expect(view.root.querySelector("tr th:last-child").children.length).to.equal(1);
        expect(view.root.querySelector("tbody").children.length).to.equal(3);
        expect(view.root.querySelector("tbody > tr").children.length).to.equal(7);
        expect(view.root.querySelector("tfoot").children.length).to.equal(0);

        let tmp = view.root.querySelector("tbody > tr > td");
        expect(tmp.textContent).to.equal("1");
        tmp = tmp.nextElementSibling;
        expect(tmp.textContent).to.equal("A simple title 1");
        tmp = tmp.nextElementSibling;
        expect(tmp.innerHTML).to.equal('<img src="img1.jpg">');
        tmp = tmp.nextElementSibling;
        expect(tmp.innerHTML).to.equal("");
        tmp = tmp.nextElementSibling;
        expect(tmp.textContent).to.equal("Some <script>untrusted</script> content");
        expect(tmp.innerHTML).to.equal(escape("Some <script>untrusted</script> content"));
        tmp = tmp.nextElementSibling;
        expect(tmp.textContent).to.equal(new Date("2023-12-01T14:00:00").toLocaleString());
        tmp = tmp.nextElementSibling;
        expect(tmp.style.opacity).to.equal("0.5");

        tmp = view.root.querySelector("tbody tr:nth-of-type(1) option");
        expect(tmp.selected).to.equal(false);
        expect(tmp.nextElementSibling.selected).to.equal(true);

        tmp = view.root.querySelector("tbody tr:nth-of-type(2) option");
        expect(tmp.selected).to.equal(true);
        expect(tmp.nextElementSibling.selected).to.equal(false);

        tmp = view.root.querySelector("tbody tr:nth-of-type(3) option");
        expect(tmp.selected).to.equal(false);
        expect(tmp.nextElementSibling.selected).to.equal(true);

        // check conditional structure

        view.render({
            view: "video",
            entries: []
        });

        expect(view.length).to.equal(1);
        expect(view.root.querySelector("thead th:last-child").children.length).to.equal(1);
        expect(view.root.querySelector("tbody").children.length).to.equal(0);
        expect(view.root.querySelector("tfoot").children.length).to.equal(1);

        view.clear().destroy();
    });

    it("Should have been rendered crazy templates properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_crazy, { root: root_1 });

        view.render();
        expect(view.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.children.length).to.equal(4);
        expect(node.children[0].textContent).to.equal(`This is some crazy'"" template`);
        expect(node.children[1].textContent).to.equal(" This is some crazy template ");
        expect(node.children[2].textContent.trim()).to.equal("12 true");
        expect(node.children[3].style.display).to.equal("block");
        expect(node.children[3].innerHTML).to.equal(" <b>bold</b> ");

        view.clear().destroy();
    });

    it("Should have been parse whitespaces in templates properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template_whitespace, { root: root_1 });

        view.render();
        expect(view.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.children.length).to.equal(2);
        expect(node.children[0].textContent.trim()).to.equal("test");
        expect(node.children[1].textContent.trim()).to.equal("test-test");

        view.clear().destroy();
    });
});
