const { describe, it } = intern.getPlugin("interface.bdd");
const { registerSuite } = intern.getPlugin("interface.object");
const { expect, assert } = intern.getPlugin("chai");

import { checkDOM } from "../common.js";
import template from "../tpl/template.js";
import template_static from "../tpl/static.js";
import data from "../data.js";

describe("Routing & Event Delegation", function(){

    it("Should update a component properly", function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        checkDOM(root_1.firstElementChild, [data[0]]);

        view.update(root_1.firstElementChild, data[1])
        checkDOM(root_1.firstElementChild, [data[1]]);

        view.update(0, data[2])
        checkDOM(root_1.firstElementChild, [data[2]]);

        view.render([data[0], data[1]]);
        view.update(-1, data[3])
        checkDOM(root_1.firstElementChild, [data[3], data[1]]);

        view.clear().destroy();
    });

    it("Should have been routed events properly", async function(){

        Mikado.eventCache = true;
        Mikado.eventBubble = true;

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.firstElementChild.firstElementChild;

        await new Promise(function(resolve){

            let counter = 0;

            view.route("attach", function(target, event){

                expect(target).to.equal(node);
                expect(event).to.equal(window.event);

                if(++counter === 3){

                    view.clear().destroy();
                    resolve();
                }
            });

            node.click();
            node.click();
            node.click();
        });
    });

    it("Should have been manually call routes properly", async function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.firstElementChild.firstElementChild;

        await new Promise(function(resolve){

            let counter = 0;

            view.route("attach", function(target, event){

                if(++counter === 3){

                    view.clear().destroy();
                    resolve();
                }
            });

            view.dispatch("attach");
            view.dispatch("attach", node);
            view.dispatch("attach", node, window.event = new Event("click", {
                bubbles: true,
                cancelable: true
            }));
        });
    });

    it("Should have stop bubbling when target was not found", async function(){

        Mikado.eventCache = true;
        Mikado.eventBubble = true;

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.querySelector(".content");

        await new Promise(function(resolve){

            let counter = 0;

            view.route("delegate", function(target, event){

                expect(target).to.equal(node);
                expect(event).to.equal(window.event);

                ++counter;
            });

            node.click();
            node.click();
            node.click();

            //setTimeout(function(){

                if(counter === 0){

                    view.clear().destroy();
                    resolve();
                }
            //});
        });
    });

    it("Should have been bubble events properly", async function(){

        Mikado.eventCache = true;
        Mikado.eventBubble = true;

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.firstElementChild.firstElementChild;

        await new Promise(function(resolve){

            node.setAttribute("tap", "delegate");

            let counter = 0;

            view.route("delegate", function(target, event){

                if(++counter === 2){

                    view.clear().destroy();
                    resolve();
                }
            });

            node.firstElementChild.dispatchEvent(new Event("click", {
                bubbles: true,
                cancelable: true
            }));
        });
    });

    it("Should have been stop bubbling events properly", async function(){

        Mikado.eventCache = true;
        Mikado.eventBubble = true;

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.firstElementChild.firstElementChild;

        await new Promise(function(resolve){

            node.setAttribute("tap", "delegate");

            let counter = 0;

            view.route("delegate", function(target, event){

                if(!counter){

                    setTimeout(function(){

                        expect(counter).to.equal(1);

                        view.clear().destroy();
                        resolve();
                    });
                }

                counter++;

            }, { stop: true });

            node.firstElementChild.dispatchEvent(new Event("click", {
                bubbles: true,
                cancelable: true
            }));
        });
    });

    it("Should have been cancel bubbling events properly", async function(){

        Mikado.eventCache = true;
        Mikado.eventBubble = true;

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.firstElementChild.firstElementChild;

        await new Promise(function(resolve){

            node.setAttribute("tap", "delegate");

            let counter = 0;

            view.route("delegate", function(target, event){

                if(!counter){

                    setTimeout(function(){

                        expect(counter).to.equal(1);

                        view.clear().destroy();
                        resolve();
                    });
                }

                counter++;

            }, { cancel: true });

            node.firstElementChild.dispatchEvent(new Event("click", {
                bubbles: true,
                cancelable: true
            }));
        });
    });

    it("Should have been stopped listening properly", async function(){

        const root_1 = document.getElementById("root-1");
        const view = new Mikado(template, { root: root_1 }).render(data[0]);
        const node = root_1.firstElementChild.firstElementChild;

        await new Promise(function(resolve){

            let test = true;

            view.route("attach", function(){
                test = false;
            });

            view.unlisten("click");
            node.click();

            setTimeout(function(){
                setTimeout(function(){

                    expect(test).to.equal(true);
                    resolve();
                });
            });
        });
    });
});