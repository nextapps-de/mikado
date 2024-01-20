import { generate } from "./data.js";

const DATA_SIZE = 100;
const DATA_SIZE_HALF = (DATA_SIZE / 2) | 0;

export let suite = {};
export const test = {};
export const root = document.getElementById("root");
const result = document.getElementById("result").appendChild(document.createTextNode("running..."));
let items = [];
export function store(data){ return (data && (items = data)) || items; }
let pos = 0;
export const queue = [];
const pathname = window.location.pathname;
const keyed = pathname.includes("keyed.html");
const strict = pathname.includes("strict.html");
const internal = (pathname.includes("internal.html")) ||
                 (pathname.includes("mode-array")) ||
                 (pathname.includes("mode-proxy")) ||
                 (pathname.includes("mode-array-proxy"));

const params = (function(){

    const obj = {};
    const pairs = window.location.search.substring(1).split('&');

    for(let i = 0, split; i < pairs.length; i++){
        split = pairs[i].split('=');
        obj[split[0]] = split[1];
    }

    return obj;
}());

// console.log((function(){
//     const array = new Array(DATA_SIZE_HALF);
//     for(let i = 0; i < DATA_SIZE_HALF; i++) array[i] = i;
//     for(let i = 0; i < 3; i++) shuffle(array);
//     return array;
// }()));

const rnd = [27, 36, 31, 21, 13, 5, 11, 0, 16, 8, 9, 28, 25, 49, 6, 26, 12, 29, 38, 1, 40, 35, 20, 23, 2, 7, 18, 48, 45, 17, 22, 39, 32, 37, 24, 4, 41, 44, 14, 34, 19, 47, 46, 10, 30, 15, 33, 3, 42, 43];
const duration = parseFloat(params["duration"] || 5) * 1000;

const hidden = params["hidden"] !== "false";
// const factory = strict ? null : [
//     generate(DATA_SIZE),
//     generate(DATA_SIZE),
//     generate(DATA_SIZE),
//     generate(DATA_SIZE),
//     generate(DATA_SIZE)
// ];

let clone;

if(hidden){

    root.hidden = hidden;
    root.style.position = "absolute";
    root.style.display = "none";
    root.style.overflow = "hidden";
    root.style.contain = "strict";
}

function next(){

    if(internal){

        copy(generate(DATA_SIZE), items);
    }
    else{

        items = generate(DATA_SIZE);
    }

    return items;
}

function copy(data, items){

    for(let i = 0; i < data.length; i++){

        items[i] = data[i];
    }

    return items;
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
    init: null,
    test: null,
    start: null,
    prepare: function(){
        // prepare data to render
        clone = next();
    },
    fn: null,
    end: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    },
    complete: null
});

queue.push({
    name: "replace",
    init: function(){
        //start pre-filled
        this.fn(next());
    },
    test: null,
    start: null,
    prepare: function(){
        // prepare data to render
        clone = next();
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

queue.push({
    name: "update",
    init: function(){
        //start pre-filled, cache data
        this.fn(clone = next());
    },
    test: null,
    start: null,
    prepare: function(index){
        // prepare updated data to render
        clone = update(enforce(clone), index);
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

queue.push({
    name: "arrange",
    init: function(){
        //start pre-filled, cache data
        this.fn(clone = next());
    },
    test: null,
    start: null,
    prepare: function(index){
        // prepare re-arranged data array to render
        index %= 3;
        if(index === 2){ // re-order (shortest path: 10)
            const div = (DATA_SIZE / 20) | 0;
            for(let i = 0; i < div; i++){
                clone.splice(div *  4 + i, 0, clone.splice(div * 16 + i, 1)[0]);
                clone.splice(div * 12 + i, 0, clone.splice(div * 8  + i, 1)[0]);
            }
        }
        else if(index){ // re-order (shortest path: 10)
            const div = (DATA_SIZE / 10) | 0;
            for(let i = 0; i < div; i += 2){
                clone.splice(div * 2 + i, 0, clone.splice(div * 8 + i, 1)[0]);
                clone.splice(div * 6 + i, 0, clone.splice(div * 4 + i, 1)[0]);
            }
        }
        else{ // re-order (shortest path: 10)
            const div = (DATA_SIZE / 5) | 0;
            for(let i = 0; i < div; i += 4){
                swap(clone, div * 1 + i, div * 3 + i);
            }
        }
        clone = enforce(clone);
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

queue.push({
    name: "repaint",
    init: function(){
        //start pre-filled
        this.fn(clone = next());
    },
    test: null,
    start: null,
    prepare: function(){
        // prepare unchanged data to render
        clone = enforce(clone);
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

let tmp;

queue.push({
    name: "append",
    init: function(){
        //create data
        clone = next();
    },
    test: null,
    start: function(){
        //divide data into 2 parts
        tmp = clone.splice(DATA_SIZE_HALF);
        //start pre-filled of first half data
        this.fn(clone);
    },
    prepare: function(){
        // prepare data to render by append the 2nd half
        clone = enforce(clone.concat(tmp));
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

queue.push({
    name: "remove",
    init: function(){
        //create data
        clone = next();
    },
    test: null,
    start: function(){
        //start pre-filled, cache data
        this.fn(clone);
    },
    prepare: function(){
        // prepare data to render by remove the 2nd half
        tmp = clone.splice(DATA_SIZE_HALF);
        clone = enforce(clone);
    },
    fn: null,
    end: function(){
        clone = enforce(clone.concat(tmp));
    },
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

queue.push({
    name: "toggle",
    init: function(index){
        //start pre-filled, cache data
        this.fn(clone = next());
    },
    test: null,
    start: null,
    prepare: function(index){
        // prepare data to render by either add or remove the 2nd half
        if(index % 2) clone = clone.concat(tmp);
        else tmp = clone.splice(DATA_SIZE_HALF);
        clone = enforce(clone);
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
    }
});

queue.push({
    name: "clear",
    init: null,
    test: null,
    start: function(){
        //start pre-filled, cache data
        this.fn(clone = next());
    },
    prepare: function(){
        // prepare empty data to render
        clone.splice(0);
    },
    fn: null,
    end: null,
    complete: function(){
        // removes everything (teardown)
        clone.splice(0);
        this.fn(clone);
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

        setTimeout(function(){

            const lib = Object.keys(suite)[0];

            for(let i = 0, item; i < queue.length; i++){

                item = queue[i];
                item.fn || (item.fn = suite[lib]);
                item.test || (item.test = suite[lib]);
            }

            perform();

        }, 200);
    }
};

// #####################################################################################
// #####################################################################################

function check(fn){

    const data = generate(2);

    items.push(data[0]);
    fn(enforce(items));
    if(!validate(data[0])) return false;

    items.pop();
    items.push(data[1]);
    fn(enforce(items));
    if(!validate(data[1])) return false;

    items.pop();
    items.push(data[0]);
    fn(enforce(items));
    if(!validate(data[0])) return false;

    // checks if libs updates contents on same key

    const tmp = enforce(items);
    tmp[0].title = "test";
    fn(tmp);
    if(!validate(tmp[0])) return false;

    let target = (root.shadow || root.shadowRoot || root);

    if(target.firstElementChild && target.firstElementChild.tagName.toLowerCase() !== "section"){
        target = target.firstElementChild;
    }

    if(target.firstElementChild && target.firstElementChild.tagName.toLowerCase() !== "section"){
        target = target.firstElementChild;
    }

    if(keyed){

        const node = target.firstElementChild.firstElementChild.firstElementChild;
        node._test = true;
        items.pop();
        items.push(data[1]);
        fn(enforce(items));
        if(target.firstElementChild.firstElementChild.firstElementChild._test){
            msg("lib '" + Object.keys(suite)[0] + "' does not run in keyed mode.");
            return false;
        }
        node._test = false;
    }
    else if(strict){

        items.pop();
        items.push(data[0]);
        fn(enforce(items));
        const node = target.firstElementChild.firstElementChild.firstElementChild;
        node._test = true;
        fn(enforce(items));
        if(target.firstElementChild.firstElementChild.firstElementChild._test){
            msg("lib '" + Object.keys(suite)[0] + "' does not run in strict mode.");
            return false;
        }
        node._test = false;
    }

    items.pop();
    fn(items);
    return target.children.length === 0;
}

function check_test(test){

    if(test.init) test.init();

    for(let i = 0; i < 3; i++){

        if(test.start) test.start(i);
        if(test.prepare) test.prepare(i);
        test.fn(clone);
        if(!check_loop(test.name)) return false;
        if(test.end) test.end(i);
    }

    if(test.complete) test.complete();

    let target = (root.shadow || root.shadowRoot || root);

    if(target.firstElementChild && target.firstElementChild.tagName.toLowerCase() !== "section"){
        target = target.firstElementChild;
    }

    if(target.firstElementChild && target.firstElementChild.tagName.toLowerCase() !== "section"){
        target = target.firstElementChild;
    }

    return target.children.length === 0;
}

function check_loop(name){

    let target = (root.shadow || root.shadowRoot || root);

    if(target.firstElementChild && target.firstElementChild.tagName.toLowerCase() !== "section"){
        target = target.firstElementChild;
    }

    if(target.firstElementChild && target.firstElementChild.tagName.toLowerCase() !== "section"){
        target = target.firstElementChild;
    }

    if(target.children.length !== clone.length) return msg("length", target.children.length + " should be " + clone.length);

    for(let i = 0; i < clone.length; i++){

        if(!validate(clone[i], i, clone.length)){

            return msg("test failed: " + name + ", index:" + i);
        }
    }

    return true;
}

function validate(item, index){

    let _root = root.shadow || root.shadowRoot || root;
    let section = _root.firstElementChild;
    if(!section) return msg("root.firstElementChild");
        (section.tagName.toLowerCase() === "section") || (section = section.firstElementChild);
        (section.tagName.toLowerCase() === "section") || (section = section.firstElementChild);

    index && (section = (section.parentElement || _root).children[index]);

    const dataset = section.dataset;
    if(dataset.id !== item.id) return msg("dataset.id", dataset.id + " should be " + item.id);
    if(dataset.date !== item.date) return msg("dataset.date", dataset.date + " should be " + item.date);
    if(dataset.index !== String(item.index)) return msg("dataset.index", dataset.index + " should be " + item.index);

    const wrapper = section.firstElementChild;
    if(wrapper.className !== item.classname) return msg("wrapper.className", wrapper.className + " should be " + item.classname);
    if(wrapper.style.paddingRight !== "10px") return msg("wrapper.style", wrapper.style.paddingRight + " should be " + "10px");

    const title = wrapper.firstElementChild;
    if(title.textContent !== item.title) return msg("title.textContent", title.textContent + " should be " + item.title);

    const content = title.nextElementSibling;
    if(content.textContent !== item.content) return msg("content.textContent", content.textContent + " should be " + item.content);

    const footer = content.nextElementSibling;
    if(footer.textContent !== item.footer) return msg("footer.textContent", footer.textContent + " should be " + item.footer);

    return true;
}

function msg(message, a){

    a ? console.error(message, a) : console.error(message);
    return false;
}

// #####################################################################################
// #####################################################################################

let str_results = "";
const perf = window.performance || {};
      perf.memory || (perf.memory = { usedJSHeapSize: 0 });
      perf.now || (perf.now = function(){ return Date.now() });

let current = 0;
let update_failed;

function perform(){

    const test = queue[current];
    let elapsed = 0, memory = 0;

    if(current === 0 && test.test) check(test.test) || msg("Main test failed: " + Object.keys(suite)[0]);
    let status = check_test(test) || msg("Test failed: " + test.name + ", " + Object.keys(suite)[0]);

    // Not allowed when update test fails
    if(update_failed && (test.name === "repaint")){
        status = false;
    }

    let loops = 0, now = 0;

    if(status){

        if(test.init) test.init();

        // if(test.defer){
        //     defer_test = test;
        //     if(test.start) test.start();
        //     test.defer();
        //     return;
        // }

        const end = perf.now() + duration;

        for(let start, mem_start, mem, tmp; now < end; loops++){

            if(test.start) test.start(loops);
            if(!internal && test.prepare) test.prepare(loops);
            if(!hidden) tmp = root.clientHeight;

            mem_start = perf.memory.usedJSHeapSize;
            start = perf.now();
            if(internal && test.prepare) test.prepare(loops);
            test.fn(clone);
            if(!hidden) tmp = root.clientHeight;
            now = perf.now();
            mem = perf.memory.usedJSHeapSize - mem_start;
            elapsed += (now - start);
            if(mem > 0) memory += mem;

            if(test.end) test.end(loops);
        }

        if(test.complete) test.complete();
    }
    else if(test.name === "update"){

        update_failed = true;
    }

    current++;

    if(window === window.top){

        result.nodeValue = (str_results += (status ? test.name.padEnd(12) + String(Math.floor(1000 / elapsed * loops)).padStart(8) + " op/s, Memory:\t" + (memory ? Math.ceil(memory / loops) : "-") : "- failed -") + "\n") + (current < queue.length ? "running..." : "");
    }
    else{

        window.top.postMessage(test.name + "," + (status ? Math.floor(1000 / elapsed * loops) : 0) + "," + (status ? Math.ceil(memory / loops) : 0), location.protocol + "//" + location.hostname) //"https://nextapps-de.github.io" "https://raw.githack.com"
    }

    if(current < queue.length){

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setTimeout(perform, 100);
            });
        });
    }
    else{

        current = 0;
    }
}

// function shuffle_rnd(items){
//
//     items || (items = factory[pos]);
//
//     for(let i = 0; i < DATA_SIZE_HALF; i++) {
//
//         swap(items, i, DATA_SIZE_HALF + rnd[i]);
//     }
//
//     return items;
// }

// function shuffle(items){
//
//     for(let i = items.length - 1; i > 0; i--) {
//
//         swap(items, i, (Math.random() * i) | 0);
//     }
//
//     return items;
// }

function swap(items, a, b){

    if(a !== b){

        const tmp = items[b];
        items[b] = items[a];
        items[a] = tmp;
    }
}

function update(items, index){

    for(let i = 0, current; i < DATA_SIZE_HALF; i++){

        current = i + index;

        (current % 29) || swap_value(items, current, "date");
        (current % 23) || swap_value(items, current, "classname");
        (current % 19) || swap_value(items, current, "months");
        (current % 17) || swap_value(items, current, "content");
        (current % 13) || swap_value(items, current, "title");
        (current % 11) || swap_value(items, current, "days");
        (current % 7 ) || swap_value(items, current, "footer");
    }

    return items;
}

function swap_value(items, a, prop, b){

    a %= DATA_SIZE_HALF;
    b = DATA_SIZE_HALF + rnd[a];

    if(a !== b){

        const tmp = items[b][prop];
        items[b][prop] = items[a][prop];
        items[a][prop] = tmp;
    }
}
