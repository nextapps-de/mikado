const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");
import { checkDOM, escape } from "../common.js";
import data from "../data.js";

describe("[SSR] Render Template", function(){

    it("Should render an array properly", function(){

        const template = fetch("/ssr/template/", data);
        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        checkDOM(root_1.firstElementChild, data);
    });

    it("Should render a single object properly", function(){

        const template = fetch("/ssr/template/", data[0]);
        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        checkDOM(root_1.firstElementChild, [data[0]], null);
    });

    it("Should not have been rendered", function(){

        const root_1 = document.getElementById("root-1");
        const template = fetch("/ssr/template/", []);
        root_1.innerHTML = template;

        expect(root_1.children.length).to.equal(0);
        expect(root_1.innerHTML).to.equal("");
    });

    it("Should render static templates properly", function(){

        const template = fetch("/ssr/static/");
        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        expect(root_1.childNodes.length).to.equal(1);
    });

    it("Should have been rendered SVG properly", function(){

        const template = fetch("/ssr/svg/");
        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        expect(root_1.childNodes.length).to.equal(1);
    });

    it("Should render a complex template properly", function(){

        let template = fetch("/ssr/full/", {
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

        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        expect(root_1.children.length).to.equal(1);
        expect(root_1.querySelector("tr th:last-child").children.length).to.equal(1);
        expect(root_1.querySelector("tbody").children.length).to.equal(3);
        expect(root_1.querySelector("tbody > tr").children.length).to.equal(7);
        expect(root_1.querySelector("tfoot").children.length).to.equal(0);

        let tmp = root_1.querySelector("tbody > tr > td");
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

        template = fetch("/ssr/full/", {
            view: "video",
            entries: []
        });
        root_1.innerHTML = template;

        expect(root_1.children.length).to.equal(1);
        expect(root_1.querySelector("thead th:last-child").children.length).to.equal(1);
        expect(root_1.querySelector("tbody").children.length).to.equal(0);
        expect(root_1.querySelector("tfoot").children.length).to.equal(1);
    });

    it("Should compile looped inline partials properly", function(){

        const template = fetch("/ssr/loop-inline/", { main: [data] });
        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        let node = root_1.firstElementChild;

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
    });

    it("Should compile conditional properly (1)", function(){

        const root_1 = document.getElementById("root-1");

        // inline

        let template = fetch("/ssr/loop-inline/", { main: [[]] });
        root_1.innerHTML = template;

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

        // extern include

        template = fetch("/ssr/loop-include/", { main: [[]] });
        root_1.innerHTML = template;


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
    });

    it("Should compile conditional properly (2)", function(){

        const root_1 = document.getElementById("root-1");

        // inline

        let template = fetch("/ssr/loop-inline/", { main: [data], hide: true });
        root_1.innerHTML = template;

        expect(root_1.children.length).to.equal(1);

        let node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(0);

        // extern include

        template = fetch("/ssr/loop-include/", { main: [data], hide: true });
        root_1.innerHTML = template;

        expect(root_1.children.length).to.equal(1);

        node = root_1.firstElementChild;

        expect(node.tagName.toLowerCase()).to.equal("main");
        expect(node.children.length).to.equal(0);
    });

    it("Should handle inline scripts properly", function(){

        const template = fetch("/ssr/scope/", { test: "foobar" });
        const root_1 = document.getElementById("root-1");
        root_1.innerHTML = template;

        let tmp;

        expect(root_1.children.length).to.equal(1);
        expect((tmp = root_1.firstElementChild.firstElementChild).textContent).to.equal("test");
        expect((tmp = tmp.nextElementSibling).textContent).to.equal("test|test");
        expect((tmp = tmp.nextElementSibling).textContent).to.equal("test|test|foobar");
    });
});

function fetch(url, data){

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(JSON.stringify(data));
    return xhr.responseText;
}