const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");
import { checkDOM, copy, escape } from "../common.js";
import compile from "../../src/compile.js";
import data from "../data.js";

const template = `
<section name="template" data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{index}}" root>
    <div class="{{data.class}}" style="padding-right: 10px;" tap="attach">
        <div class="title" click="delegate:root">{{data.title}}</div>
        <div class="content" click="delegate:foo">{{#data.content}}</div>
        <div class="footer">{{data.footer}}</div>
    </div>
</section>
`;

const template_static = `
<template name="static">
    <section data-id="data.id" data-date="data.date" data-index="index" root>
        <div class="data.class" style="padding-right: 10px;" tap="attach">
            <div class="title" click="delegate:root">data.title</div>
            <div class="content" click="delegate:foo">data.content</div>
            <div class="footer">data.footer</div>
        </div>
    </section>
</template>
`;

const template_svg = `
<section>
    <svg width="1652px" height="296px" viewBox="0 0 1652 296">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="mikado-logo">
                <path d="M413.2,289.8 L360,289.8 L360,93 L410.8,93 L410.8,117 C421.6,97.8 446.8,87.4 468.4,87.4 C495.2,87.4 516.8,99 526.8,120.2 C542.4,96.2 563.2,87.4 589.2,87.4 C625.6,87.4 660.4,109.4 660.4,162.2 L660.4,289.8 L608.8,289.8 L608.8,173 C608.8,151.8 598.4,135.8 574,135.8 C551.2,135.8 537.6,153.4 537.6,174.6 L537.6,289.8 L484.8,289.8 L484.8,173 C484.8,151.8 474,135.8 450,135.8 C426.8,135.8 413.2,153 413.2,174.6 L413.2,289.8 Z M759.6,289.8 L706.4,289.8 L706.4,93 L759.6,93 L759.6,289.8 Z M759.6,53.2 L706.4,53.2 L706.4,-3.69482223e-13 L759.6,-3.69482223e-13 L759.6,53.2 Z M998.2,93 L919.4,175.8 L999.8,289.8 L934.6,289.8 L882.6,214.6 L860.6,237.8 L860.6,289.8 L807.4,289.8 L807.4,0.2 L860.6,0.2 L860.6,166.2 L928.6,93 L998.2,93 Z M1010,236.2 C1010,201 1036,181.4 1068.8,176.6 L1117.2,169.4 C1128.4,167.8 1132,162.2 1132,155.4 C1132,141.4 1121.2,129.8 1098.8,129.8 C1075.6,129.8 1062.8,144.6 1061.2,161.8 L1014,151.8 C1017.2,121 1045.6,87 1098.4,87 C1160.8,87 1184,122.2 1184,161.8 L1184,258.6 C1184,269 1185.2,283 1186.4,289.8 L1137.6,289.8 C1136.4,284.6 1135.6,273.8 1135.6,266.2 C1125.6,281.8 1106.8,295.4 1077.6,295.4 C1035.6,295.4 1010,267 1010,236.2 Z M1088.8,255.8 C1111.2,255.8 1132,245 1132,210.2 L1132,201.4 L1087.6,208.2 C1074,210.2 1063.2,217.8 1063.2,233 C1063.2,244.6 1071.6,255.8 1088.8,255.8 Z M1416.2,0.2 L1416.2,254.2 C1416.2,267.4 1417,281.8 1417.8,289.8 L1367,289.8 C1366.2,285.8 1365,276.2 1365,267 C1356.2,282.6 1336.2,294.6 1309.8,294.6 C1253.8,294.6 1213.8,250.6 1213.8,191 C1213.8,133.4 1252.6,88.2 1308.2,88.2 C1342.2,88.2 1358.2,102.2 1363.8,112.6 L1363.8,0.2 L1416.2,0.2 Z M1267.4,191 C1267.4,226.2 1288.2,247 1316.2,247 C1343.4,247 1364.6,226.2 1364.6,190.6 C1364.6,155.4 1343.4,135.8 1316.2,135.8 C1289,135.8 1267.4,155.8 1267.4,191 Z M1548.2,247.4 C1574.2,247.4 1598.2,228.6 1598.2,191.4 C1598.2,154.2 1574.2,135.4 1548.2,135.4 C1522.2,135.4 1498.2,154.2 1498.2,191.4 C1498.2,228.2 1522.2,247.4 1548.2,247.4 Z M1548.2,87 C1607,87 1651.4,130.6 1651.4,191.4 C1651.4,251.8 1607,295.8 1548.2,295.8 C1489.4,295.8 1445,251.8 1445,191.4 C1445,130.6 1489.4,87 1548.2,87 Z" id="mikado" fill="#888888"></path>
                <g id="Symbol" transform="translate(0.000000, 20.000000)">
                    <path d="M240,240 L270,240 L270,270 L240,270 L240,240 Z M180,240 L210,240 L210,270 L180,270 L180,240 Z M180,180 L210,180 L210,210 L180,210 L180,180 Z M60,120 L90,120 L90,150 L60,150 L60,120 Z M120,120 L150,120 L150,150 L120,150 L120,120 Z M120,60 L150,60 L150,90 L120,90 L120,60 Z M240,0 L270,0 L270,30 L240,30 L240,0 Z M120,0 L150,0 L150,30 L120,30 L120,0 Z M240,120 L270,120 L270,150 L240,150 L240,120 Z" id="Red" fill="#EB4642"></path>
                    <path d="M60,240 L90,240 L90,270 L60,270 L60,240 Z M120,240 L150,240 L150,270 L120,270 L120,240 Z M0,240 L30,240 L30,270 L0,270 L0,240 Z M240,180 L270,180 L270,210 L240,210 L240,180 Z M60,180 L90,180 L90,210 L60,210 L60,180 Z M120,180 L150,180 L150,210 L120,210 L120,180 Z M0,180 L30,180 L30,210 L0,210 L0,180 Z M0,120 L30,120 L30,150 L0,150 L0,120 Z M240,60 L270,60 L270,90 L240,90 L240,60 Z M180,60 L210,60 L210,90 L180,90 L180,60 Z M60,60 L90,60 L90,90 L60,90 L60,60 Z M0,60 L30,60 L30,90 L0,90 L0,60 Z M180,0 L210,0 L210,30 L180,30 L180,0 Z M60,0 L90,0 L90,30 L60,30 L60,0 Z M0,0 L30,0 L30,30 L0,30 L0,0 Z" id="Blue" fill="#58ABEA"></path>
                    <rect id="Yellow" fill="#FFD200" x="180" y="120" width="30" height="30"></rect>
                </g>
            </g>
        </g>
    </svg>
</section>
`;

const template_proxy = `
<section data-id="{{= data.id }}" data-date="{{= data.date }}" data-index="{{= data.index }}" root>
    <div class="{{= data.class }}" style="{{= data.style }}" tap="attach">
        <div class="title" click="delegate:root">{{= data.title }}</div>
        <div class="content" click="delegate:foo">{{#= data.content }}</div>
        <div class="footer">{{= data.footer }}</div>
    </div>
</section>
`;

const template_keyed = `
<template id="keyed">
    <section key="data.id" data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{index}}" root>
        <div class="{{data.class}}" style="padding-right: 10px;" tap="attach">
            <div class="title" click="delegate:root">{{data.title}}</div>
            <div class="content" click="delegate:foo">{{#data.content}}</div>
            <div class="footer">{{data.footer}}</div>
        </div>
    </section>
</template>
`;

const template_inline = `
<main if="!data.hide" foreach="data.main">
    <div>
        <div if="data" foreach="data">
            <section data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{index}}" root>
                <div class="{{data.class}}" style="padding-right: 10px;" tap="attach">
                    <div class="title" click="delegate:root">{{data.title}}</div>
                    <div class="content" click="delegate:foo">{{#data.content}}</div>
                    <div class="footer">{{data.footer}}</div>
                </div>
            </section>
        </div>
        <div if="data" foreach="data">
            <section data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{index}}" root>
                <div class="{{data.class}}" style="padding-right: 10px;" tap="attach">
                    <div class="title" click="delegate:root">{{data.title}}</div>
                    <div class="content" click="delegate:foo">{{#data.content}}</div>
                    <div class="footer">{{data.footer}}</div>
                </div>
            </section>
        </div>
    </div>
</main>
`;

const template_include = `
<main if="!data.hide" foreach="data.main">
    <div>
        <div if="data" foreach="data" include="template"></div>
        <div if="data" foreach="data" include="template"></div>
    </div>
</main>
`;

const template_shadow = `
<component>
    <!-- optional styles/scripts/etc. -->
    <style>table{ width: 100%; opacity: 0.5 }</style>
    <script>window.footer = "foobar";</script>
    <!-- components requires the template tag -->
    <template>
        <!-- single outer root element: -->
        <section data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{index}}" root>
            <div class="{{data.class}}" style="padding-right: 10px;" tap="attach">
                <div class="title" click="delegate:root">{{data.title}}</div>
                <div class="content" click="delegate:foo">{{#data.content}}</div>
                <div class="footer" data-footer="{{ window.footer }}">{{data.footer}}</div>
            </div>
        </section>
    </template>
</component>
`;

const template_scope = `
<div>
    {{@ let value = 'test'; }}
    <div>{{ value }}</div>
    {{@ value += '|test' }}
    <div>{{
        value
    }}</div>
    {{@ value += (function(d){

        return '|' + d.test;

    }(data)); }}
    <div>{{ value }}</div>
</div>
`;

const template_full = `
<main cache="true" id="{{ data.view }}">
  <table>
    <thead>
      <tr>
        <th>Index</th>
        <th>Title</th>
        <th>Media</th>
        <th>Category</th>
        <th>Comment</th>
        <th>Date</th>
        <th include="pager"></th>
      </tr>
    </thead>
    <tbody foreach="data.entries">
      <script>{{@ const datestr = new Date(data.date).toLocaleString(); }}</script>
      <tr key="data.id" data-id="{{ data.id }}" root>
        <script>{{@ const datestr2 = datestr; }}</script>
        <td>{{ index + 1 }}</td>
        <td>{{= data.title }}</td>
        <td>{{# data.media }}</td>
        <td>{{? data.category }}</td>
        <td>{{! data.comment }}</td>
        <td>{{ datestr2 }}</td>
        <td style="opacity: {{ state.selected === data.id ? '1': '0.5' }}">
          <select change="select-active:root">
            <option value="on" selected="{{ data.mode === 'on' }}">Enabled</option>
            <option value="off" selected="{{ data.mode === 'off' }}">Disabled</option>
          </select>
        </td>
      </tr>
    </tbody>
    <tfoot if="!data.entries.length">
      <tr>
        <td colspan="7">No entries found.</td>
      </tr>
    </tfoot>
  </table>
</main>
`;

describe("Compile Template", function(){

    it("Should compile basic template properly", function(){

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template);
        const view = new Mikado(tpl, { mount: root_1 }).render(data);

        checkDOM(root_1.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should compile static template properly", function(){

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_static);
        const view = new Mikado(tpl).mount(root_1).render();

        expect(tpl.fn).to.equal(null);
        expect(view.length).to.equal(1);
        expect(root_1.childNodes.length).to.equal(1);

        view.clear().destroy();
    });

    it("Should compile keyed template properly", function(){

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_keyed);
        const view = new Mikado(tpl).mount(root_1);

        view.render(data);
        checkDOM(root_1.firstElementChild, data);

        root_1.firstElementChild._test = true;

        view.render(data);
        checkDOM(root_1.firstElementChild, data);
        expect(root_1.firstElementChild._test).to.be.true;

        view.clear().destroy();
    });

    it("Should compile svg template properly", function(){

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_svg);
        const view = new Mikado(tpl).mount(root_1).render();

        expect(view.length).to.equal(1);

        view.clear().destroy();
    });

    it("Should compile reactive template properly", function(){

        const store = copy(data.slice(0, 10));
        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_proxy);
        const view = new Mikado(tpl, { root: root_1 }).render(store);

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

    it("Should compile looped inline partials properly", function(){

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_inline);
        const view = new Mikado(tpl, { mount: root_1 });

        view.render({ main: [data] });

        let node = root_1.firstElementChild;

        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);
        expect(node.tagName.toLowerCase()).to.equal("main");

        node = node.firstElementChild.firstElementChild;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");
        checkDOM(node.firstElementChild, data);

        node = node.nextElementSibling;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");

        checkDOM(node.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should compile looped included partials properly", function(){

        Mikado.register(Mikado.compile(template));

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_include);
        const view = new Mikado(tpl, { mount: root_1 });

        view.render({ main: [data] });

        let node = root_1.firstElementChild;

        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);
        expect(node.tagName.toLowerCase()).to.equal("main");

        node = node.firstElementChild.firstElementChild;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");
        checkDOM(node.firstElementChild, data);

        node = node.nextElementSibling;

        expect(node.children.length).to.equal(data.length);
        expect(node.firstElementChild.tagName.toLowerCase()).to.equal("section");
        checkDOM(node.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should compile conditional properly (1)", function(){

        const root_1 = document.getElementById("root-1");

        // inline

        const tpl = Mikado.compile(template_inline);
        let view = new Mikado(tpl, { mount: root_1 });

        view.render({ main: [[]] });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(1);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(2);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        node = node.nextElementSibling;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();

        // extern include

        Mikado.register(Mikado.compile(template));
        const tpl2 = Mikado.compile(template_include);
        view = new Mikado(tpl2, { mount: root_1 });

        view.render({ main: [[]] });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(1);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(2);

        node = node.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        node = node.nextElementSibling;

        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();
    });

    it("Should compile conditional properly (2)", function(){

        const root_1 = document.getElementById("root-1");

        // inline

        const tpl = Mikado.compile(template_inline);
        let view = new Mikado(tpl, { mount: root_1 });

        view.render({ main: [data], hide: true });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();

        // extern include

        Mikado.register(Mikado.compile(template));
        const tpl2 = Mikado.compile(template_include);
        view = new Mikado(tpl2, { mount: root_1 });

        view.render({ main: [data], hide: true });
        expect(view.length).to.equal(1);
        expect(root_1.children.length).to.equal(1);

        node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(0);

        view.clear().destroy();
    });

    it("Should render web components properly (Runtime Compiler)", function(){

        const root_1 = document.getElementById("root-3");
        const tpl = Mikado.compile(template_shadow);
        const view = new Mikado(tpl, { mount: root_1 }).render(data);
        let tmp;

        expect(tmp = root_1.shadowRoot).to.exist;
        expect((tmp = tmp.firstElementChild).tagName).to.equal("STYLE");
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("SCRIPT");
        expect((tmp = tmp.nextElementSibling).tagName).to.equal("ROOT");
        expect(tmp).to.equal(view.root);
        checkDOM(tmp.firstElementChild, data);

        view.clear().destroy();
    });

    it("Should handle inline scripts properly", function(){

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_scope);
        const view = new Mikado(tpl, { mount: root_1 }).render({ test: "foobar" });
        let tmp;

        expect(view.length).to.equal(1);
        expect((tmp = root_1.firstElementChild.firstElementChild).textContent).to.equal("test");
        expect((tmp = tmp.nextElementSibling).textContent).to.equal("test|test");
        expect((tmp = tmp.nextElementSibling).textContent).to.equal("test|test|foobar");

        view.clear().destroy();
    });

    it("Should render a complex template properly", function(){

        // the named include "pager" needs to be registered before use
        const tpl_pager = Mikado.compile("<template name='pager'><div class='pager'></div></template>")
        Mikado.register(tpl_pager);

        const root_1 = document.getElementById("root-1");
        const tpl = Mikado.compile(template_full);
        const view = new Mikado(tpl, { mount: root_1 });

        view.render({
            view: "video",
            entries: [{
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
            }]
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
        tmp = tmp.firstElementChild.firstElementChild;
        expect(tmp.selected).to.equal(false);
        expect(tmp.nextElementSibling.selected).to.equal(true);

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

    // TODO not supported by inline compiler
    // it("Should compile repeated include structures properly", function(){
    //
    //     const tpl = Mikado.compile(template_include);
    //
    //     // template has 4 includes, 2 of them has same structure = 3 includes at total
    //     expect(tpl.fn.length).to.equal(3);
    // });
});
