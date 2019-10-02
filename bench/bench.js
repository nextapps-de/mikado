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
    slowdown: 1,
    init: null,
    test: null,
    start: function(){
        clone = shuffle(items).slice(0);
    },
    fn: null,
    end: function(){
        this.fn([]);
    },
    complete: null
});

queue.push({
    name: "update",
    slowdown: 1,
    init: function(){
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
    }
});

queue.push({
    name: "partial",
    slowdown: 1,
    init: function(){
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
    }
});

queue.push({
    name: "repaint",
    slowdown: 1,
    init: function(){
        this.fn(shuffle(items).slice(0));
    },
    test: null,
    start: function(){
        clone = items.slice(0);
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "append",
    slowdown: 1,
    init: null,
    test: null,
    start: function(){
        this.fn(shuffle(items).slice(0, 50));
        clone = items.slice(0);
    },
    fn: null,
    end: function(){
        this.fn([]);
    },
    complete: null
});

queue.push({
    name: "reduce",
    slowdown: 5,
    init: null,
    test: null,
    start: function(){
        this.fn(shuffle(items).slice(0));
        clone = items.slice(0, 50);
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

let toggle = 0;

queue.push({
    name: "toggle",
    slowdown: 1,
    init: function(){
        this.fn(shuffle(items).slice(0));
    },
    test: null,
    start: function(){
        clone = (toggle = !toggle) ? items.slice(0, 50) : items.slice(0);
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "remove",
    slowdown: 5,
    init: null,
    test: null,
    start: function(){
        this.fn(items.slice(0));
        clone = [];
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
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
    defer: function(){
        defer_start = perf.now();
        root.firstElementChild.firstElementChild.firstElementChild.dispatchEvent(new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true
        }));
    },
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

        setTimeout(perform, 500);
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
    if(wrapper.className !== item.classname) return msg("wrapper.className");
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

let current = 0;
let warmup = 0;

function perform(){

    const test = queue[current];
    let duration = 0, memory = 0;

    if(test.test) check(test.test) || console.warn("Test failed: " + test.name);

    let time;

    if(warmup < 3){

        if(!warmup){

            time = 300 / test.slowdown;
        }

        warmup++;
    }
    else{

        warmup = 0;
        time = 3000 / test.slowdown;
    }

    //const loops = test.loop;
    //const results = new Array(loops | 0);

    if(test.init) test.init();

    /*
    if(test.defer){

        defer_test = test;
        if(test.start) test.start();
        test.defer();
        return;
    }
    */

    //tmp = perf.now() - start;
    //results[i] = 1000 / tmp;

    let loops = 0;

    for(let start, mem_start, tmp; duration < time; loops++){

        if(test.start) test.start(loops);

        mem_start = perf.memory.usedJSHeapSize;
        start = perf.now();
        test.fn(clone);
        duration += perf.now() - start;
        tmp = perf.memory.usedJSHeapSize - mem_start;
        if(tmp > 0) memory += tmp;

        if(test.end) test.end(loops);
    }

    if(test.complete) test.complete();

    if(!warmup){

        if(window === window.top){

            result.nodeValue = str_results += test.name.padEnd(12) + String(Math.floor(1000 / duration * loops)).padStart(8) + " op/s, Memory:\t"  + (memory ? Math.floor(memory / loops) : "-") + "\n";
        }
        else{

            window.top.postMessage(test.name + "," + Math.floor(1000 / duration * loops) + "," + Math.floor(memory / loops), location.protocol + "//" + location.hostname) //"https://nextapps-de.github.io" "https://raw.githack.com"
        }

        current++;
    }

    if(current < queue.length){

        setTimeout(perform, warmup ? 50 : 500);
    }
    else{

        current = 0;
    }

    //root.textContent = "";
}

/*
function median(arr){

    arr.sort(function(a, b){

        return a - b;
    });

    const length = arr.length;
    const half = length / 2;

    return (

        length % 2 ?

            arr[half | 0]
        :
            (arr[half - 1] + arr[half]) / 2
    );
}

function normalize(arr){

    arr.sort(function(a, b){

        return a - b;
    });

    arr = arr.slice((arr.length / 4) | 0, (arr.length / 2) | 0);

    const length = arr.length;
    let sum = 0;

    for(let i = 0; i < length; i++){

        sum += arr[i];
    }

    return sum / length;
}
*/

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
            items[i]["classname"] = items[(Math.random() * length) | 0]["classname"];
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