import { generate } from "./data.js";

export let suite = {};
export const test = {};
export const root = document.getElementById("root");
const result = document.getElementById("result").appendChild(document.createTextNode(""));
let items = generate(3);
let pos = -1;
export const queue = [];
const keyed = window.location.pathname.indexOf("/keyed.html") !== -1;
const strict = window.location.pathname.indexOf("/strict.html") !== -1;
const internal = window.location.search.indexOf("internal") !== -1;
const factory = strict ? [] : [generate(100), generate(100), generate(100), generate(100), generate(100)];
let clone;

function next(){

    if(strict){

        return items = generate(100);
    }

    if(++pos === factory.length){

        pos = 0;
    }

    return items = enforce(shuffle(factory[pos]));
}

function enforce(data){

    if(!internal){

        data = data.slice(0);

        for(let i = 0; i < data.length; i++){

            data[i] = Object.assign({}, data[i]);
        }
    }

    return data;
}

queue.push({
    name: "create",
    init: function(){
        this.fn([]);
    },
    test: null,
    start: function(){
        clone = next();
    },
    prepare: null,
    fn: null,
    end: function(){
        this.fn([]);
    },
    complete: null
});

queue.push({
    name: "replace",
    init: function(){
        this.fn(next());
    },
    test: null,
    start: function(){
        clone = next();
    },
    prepare: null,
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "update",
    init: function(){
        this.fn(next());
    },
    test: null,
    start: null,
    prepare: function(index){
        if(index % 5){
            clone = enforce(update(items, index));
        }
        else{
            clone = enforce(shuffle(items));
        }
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "arrange",
    init: function(){
        this.fn(next());
    },
    test: null,
    start: null,
    prepare: function(index){
        if(index % 2){ // swap
            items.splice(1, 0, items.splice(items.length - 2, 1)[0]);
            items.splice(items.length - 2, 0, items.splice(2, 1)[0]);
        }
        else{ // re-order
            for(let i = 80; i < 90; i++) items.splice(i, 0, items.splice(10, 1)[0]);
            for(let i = 30; i < 40; i++) items.splice(i, 0, items.splice(60, 1)[0]);
        }
        clone = enforce(items);
    },
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "repaint",
    init: function(){
        this.fn(next());
    },
    test: null,
    start: function(){
        clone = enforce(items);
    },
    prepare: null,
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "append",
    init: null,
    test: null,
    start: function(){
        this.fn(next().slice(0, 50));
        clone = enforce(items);
    },
    prepare: null,
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "remove",
    init: null,
    test: null,
    start: function(){
        this.fn(next());
        clone = enforce(items.slice(0, 50));
    },
    prepare: null,
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

let toggle = 0;

queue.push({
    name: "toggle",
    init: function(){
        this.fn(next());
    },
    test: null,
    start: function(){
        clone = enforce((toggle = !toggle) ? items.slice(0, 50) : items);
    },
    prepare: null,
    fn: null,
    end: null,
    complete: function(){
        this.fn([]);
    }
});

queue.push({
    name: "clear",
    init: null,
    test: null,
    start: function(){
        this.fn(next());
        clone = [];
    },
    prepare: null,
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

    fn(enforce([items[0]]));
    if(!validate(items[0])) return false;

    fn(enforce([items[1]]));
    if(!validate(items[1])) return false;

    fn(enforce([items[0]]));
    if(!validate(items[0])) return false;

    // checks if libs updates contents on same id

    const tmp = enforce([items[0]]);
    tmp[0].title = "test";
    fn(tmp);
    if(!validate(tmp[0])) return false;

    if(keyed){

        const node = root.firstElementChild.firstElementChild.firstElementChild;
        node._test = true;
        fn(enforce([items[1]])); // every keyed lib which fails this test are not explicit keyed
        if(root.firstElementChild.firstElementChild.firstElementChild._test){
            msg("lib does not run in keyed mode.");
            return false;
        }
        node._test = false;
    }
    else if(strict){

        fn(enforce([items[0]]));
        const node = root.firstElementChild.firstElementChild.firstElementChild;
        node._test = true;
        fn(enforce([items[0]]));
        if(root.firstElementChild.firstElementChild.firstElementChild._test){
            msg("lib does not run in strict mode.");
            return false;
        }
        node._test = false;
    }

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

    if((current === 0) && test.test) check(test.test) || console.warn("Test failed: " + test.name);

    const time = 5000;

    if(test.init) test.init();

    /*
    if(test.defer){

        defer_test = test;
        if(test.start) test.start();
        test.defer();
        return;
    }
    */

    let loops = 0, now = perf.now();
    const end = now + time;

    for(let start, mem_start, mem; now < end; loops++){

        if(test.start) test.start(loops);
        if(!internal && test.prepare) test.prepare(loops);

        mem_start = perf.memory.usedJSHeapSize;
        start = perf.now();
        if(internal && test.prepare) test.prepare(loops);
        test.fn(clone);
        now = perf.now();
        mem = perf.memory.usedJSHeapSize - mem_start;
        duration += now - start;
        if(mem > 0) memory += mem;

        if(test.end) test.end(loops);
    }

    //duration = 5000 + (now - end);

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

        j = (Math.random() * i) | 0;
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