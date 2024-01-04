const { expect, assert } = intern.getPlugin("chai");

export function checkDOM(root, data, skip_index){

    /*
    <section data-id="{{data.id}}" data-date="{{data.date}}" data-index="{{index}}" root>
        <div class="{{data.class}}" style="padding-right: 10px;" tap="attach">
            <div class="title" click="delegate:root">{{data.title}}</div>
            <div class="content" click="delegate:foo">{{#data.content}}</div>
            <div class="footer">{{data.footer}}</div>
        </div>
    </section>
    */

    for(let i = 0, node; i < data.length; i++){

        node = root;
        expect(node.tagName.toLowerCase()).to.equal("section");
        expect(node.getAttribute("data-id")).to.equal(data[i].id);
        expect(node.getAttribute("data-date")).to.equal(data[i].date);
        skip_index || expect(node.getAttribute("data-index")).to.equal(String(i));
        expect(node.getAttribute("root")).to.equal("");

        node = node.firstElementChild;
        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.className).to.equal(data[i].class);
        expect(node.style.cssText).to.equal("padding-right: 10px;");
        expect(node.getAttribute("tap")).to.equal("attach");

        node = node.firstElementChild;
        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.className).to.equal("title");
        expect(node.getAttribute("click")).to.equal("delegate:root");
        expect(node.textContent).to.equal(data[i].title);

        node = node.nextElementSibling;
        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.className).to.equal("content");
        expect(node.getAttribute("click")).to.equal("delegate:foo");
        expect(node.innerHTML).to.equal(data[i].content);
        expect(node.textContent).not.to.equal(data[i].content);

        node = node.nextElementSibling;
        expect(node.tagName.toLowerCase()).to.equal("div");
        expect(node.className).to.equal("footer");
        expect(node.textContent).to.equal(data[i].footer);

        // next component
        root = root.nextElementSibling;
    }
}