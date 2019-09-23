import { generate } from "./data.js";

export let suite = {};
export const test = {};
export const root = document.getElementById("root");
const result = document.getElementById("result").appendChild(document.createTextNode(""));
export const items = generate(100);
export const queue = [];
let clone;

queue.push({
    name: "create",
    warmup: true,
    loop: 5000,
    init: function(){
        //root.textContent = "";
    },
    test: null,
    start: function(){
        //root.textContent = "";
        clone = shuffle(items).slice(0);
    },
    fn: null,
    end: function(){
        this.fn([]);
        //root.textContent = "";
    },
    complete: function(){
        //root.textContent = "";
    }
});

queue.push({
    name: "update",
    warmup: true,
    loop: 20000,
    init: function(){
        //root.textContent = "";
        this.fn(items.slice(0));
    },
    test: null,
    start: function(){
        clone = shuffle(items).slice(0);
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
        //root.textContent = "";
    }
});

queue.push({
    name: "partial",
    warmup: true,
    loop: 20000,
    init: function(){
        //root.textContent = "";
        this.fn(items.slice(0));
    },
    test: null,
    start: function(index){
        clone = index % 5 ?
            shuffle(items).slice(0) :
            update(items, index).slice(0);
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
        //root.textContent = "";
    }
});

queue.push({
    name: "append",
    warmup: true,
    loop: 3000,
    init: null,
    test: null,
    start: function(){
        //root.textContent = "";
        clone = items.slice(0);
        this.fn(clone);
        clone = clone.concat(shuffle(items)).slice(0);
    },
    fn: null,
    end: function(){
        this.fn([]);
        //root.textContent = "";
    },
    complete: null
});

queue.push({
    name: "repaint",
    warmup: true,
    loop: 50000,
    init: function(){
        //root.textContent = "";
        this.fn(items.slice(0));
    },
    test: null,
    start: function(){
        clone = items.slice(0);
    },
    fn: null,
    complete: function(){
        this.fn([]);
        //root.textContent = "";
    }
});

queue.push({
    name: "reduce",
    warmup: true,
    loop: 1,
    init: null,
    test: null,
    start: function(){
        //root.textContent = "";
        this.fn(items.slice(0));
        clone = items.slice(0, 50);
    },
    fn: null,
    complete: function(){
        this.fn([]);
        //root.textContent = "";
    }
});

queue.push({
    name: "remove",
    warmup: true,
    loop: 1,
    init: null,
    test: null,
    start: function(){
        //root.textContent = "";
        this.fn(items.slice(0));
        clone = [];
    },
    fn: null,
    complete: function(){
        this.fn([]);
        //root.textContent = "";
    }
});

/*
let defer_test, defer_start, defer_duration, defer_count;

export function defer(){

    defer_duration += (perf.now() - defer_start);

    if(++defer_count < defer_test.loop){

        Promise.resolve().then(defer_test.defer);
    }
    else{

        console.log(defer_duration);
    }
}

queue.push({
    name: "click",
    warmup: true,
    defer: function(){
        defer_start = perf.now();
        root.firstElementChild.firstElementChild.firstElementChild.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    },
    loop: 200000,
    init: function(){
        //root.textContent = "";
        defer_duration = 0;
        defer_count = 0;
        this.fn(items.slice(0));
    },
    test: null,
    start: null,
    fn: null,
    complete: function(){
        this.fn([]);
        //root.textContent = "";
    }
});
*/

// #####################################################################################
// #####################################################################################

window.onload = function(){

    if(queue.length){

        const lib = Object.keys(suite)[0];

        for(let i = 0, item; i < queue.length; i++){

            item = queue[i];
            item.fn || (item.fn = suite[lib]);
            item.test || (item.test = suite[lib]);
        }

        setTimeout(perform, 200);
    }
};

// #####################################################################################
// #####################################################################################

function check(fn){

    fn([items[0]]);
    if(!validate(items[0])) return false;

    fn([items[1]]);
    if(!validate(items[1])) return false;

    fn([items[0]]);
    if(!validate(items[0])) return false;

    fn([]);
    return (root.children.length === 0) || (root.firstElementChild.children.length === 0);
}

function validate(item){

    let section = root.firstElementChild;
    if(!section) return msg("root.firstElementChild");
        (section.tagName.toLowerCase() === "section") || (section = section.firstElementChild);
        (section.tagName.toLowerCase() === "section") || (section = section.firstElementChild);
    const dataset = section.dataset;
    if(dataset.id !== item.id) return msg("dataset.id");
    if(dataset.date !== item.date) return msg("dataset.date");
    if(dataset.index !== String(item.index)) return msg("dataset.index");

    const wrapper = section.firstElementChild;
    if(wrapper.className !== item.class) return msg("wrapper.className");
    if(wrapper.style.paddingRight !== "10px") return msg("wrapper.style");

    const title = wrapper.firstElementChild;
    if(title.textContent !== item.title) return msg("title.textContent");

    const content = title.nextElementSibling;
    if(content.textContent !== item.content) return msg("content.textContent");

    const footer = content.nextElementSibling;
    if(footer.textContent !== item.footer) return msg("footer.textContent");

    return true;
}

function msg(message){

    console.error(message);
    return false;
}

// #####################################################################################
// #####################################################################################

let str_results = "";
const perf = window.performance;
      perf.memory || (perf.memory = { usedJSHeapSize: 0 });

function perform(warmup){

    const test = warmup || queue.shift();
    let duration = 0, memory = 0;

    if(test.test) check(test.test) || console.warn("Test failed: " + test.name);

    if(test.warmup){

        test.warmup = false;
        queue.unshift(test);
        return perform(test);
    }

    let loops = warmup ? test.loop / 10 : test.loop;

    if(test.init) test.init();

    /*
    if(test.defer){

        defer_test = test;
        if(test.start) test.start();
        test.defer();
        return;
    }
    */

    for(let i = 0, start, mem_start, tmp; i < loops; i++){

        if(test.start) test.start(i);

        mem_start = perf.memory.usedJSHeapSize;
        start = perf.now();
        test.fn(clone);
        duration += perf.now() - start;
        tmp = perf.memory.usedJSHeapSize - mem_start;
        if(tmp > 0) memory += tmp;

        if(test.end) test.end(i);
    }

    if(test.complete) test.complete();

    if(warmup){

        test.loop = 1000 / duration * (test.loop / 10) * 3;
    }
    else{

        if(window === window.top){

            result.nodeValue = str_results += test.name.padEnd(12) + String((1000 / duration * test.loop) | 0).padStart(8) + " op/s, Memory:\t"  + (memory ? ((memory / test.loop) | 0) : "-") + "\n";
        }
        else{

            window.top.postMessage(test.name + "," + ((1000 / duration * test.loop) | 0) + "," + ((memory / test.loop) | 0), location.protocol + "//" + location.hostname) //"https://nextapps-de.github.io" "https://raw.githack.com"
        }
    }

    if(queue.length){

        setTimeout(perform, 200);
    }

    //root.textContent = "";
}

export function shuffle(items){

    for(let i = items.length - 1, j, x; i > 0; i--) {

        j = (Math.random() * (i + 1)) | 0;
        x = items[i];
        items[i] = items[j];
        items[j] = x;
    }

    return items;
}

export function update(items, index){

    for(let i = 0, length = items.length; i < length; i++){

        if((i + index) % 15 === 0){
            items[i]["date"] = items[(Math.random() * length) | 0]["date"];
        }
        else if((i + index) % 10 === 0){
            items[i]["class"] = items[(Math.random() * length) | 0]["class"];
        }
        else if((i + index) % 5 === 0){
            items[i]["content"] = items[(Math.random() * length) | 0]["content"];
        }
        else if((i + index) % 3 === 0){
            items[i]["title"] = items[(Math.random() * length) | 0]["title"];
        }
    }

    return items;
}

export function set_clone(_clone){

    clone = _clone;
}