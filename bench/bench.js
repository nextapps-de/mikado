import { generate } from "./data.js";

export let suite = {};
export const test = {};
export const root = document.getElementById("root");
const result = document.getElementById("result").appendChild(document.createTextNode(""));
const items = generate(100);
const queue = [];
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
    finish: function(){
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
    finish: null,
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
    finish: null,
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
    finish: function(){
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

// #####################################################################################
// #####################################################################################

window.onload = function(){

    if(queue.length){

        const lib = Object.keys(suite)[0];

        for(let i = 0, item; i < queue.length; i++){

            item = queue[i];
            item.fn = suite[lib];
            item.test = suite[lib];
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
    if(!section) return false;
        section.dataset || (section = section.firstElementChild);
        section.dataset || (section = section.firstElementChild);
    const dataset = section.dataset;
    if(dataset.id !== item.id) return false;
    if(dataset.date !== item.date) return false;
    if(dataset.index !== String(item.index)) return false;

    const wrapper = section.firstElementChild;
    if(wrapper.className !== item.class) return false;
    if(wrapper.style.paddingRight !== "10px") return false;

    const title = wrapper.firstElementChild;
    if(title.textContent !== item.title) return false;

    const content = title.nextElementSibling;
    if(content.textContent !== item.content) return false;

    const footer = content.nextElementSibling;
    if(footer.textContent !== item.footer) return false;
    if(footer.getAttribute("href") !== "show-test") return false;

    return true;
}

// #####################################################################################
// #####################################################################################

let str_results = "";

function perform(warmup){

    const test = warmup || queue.shift();
    let start, duration = 0, memory = 0, mem_start;

    if(test.test) check(test.test) || console.warn("Test failed: " + test.name);

    if(test.warmup){

        test.warmup = false;
        queue.unshift(test);
        return perform(test);
    }

    if(test.init) test.init();

    for(let i = 0, loops = warmup ? test.loop / 10 : test.loop; i < loops; i++){

        if(test.start) test.start(i);

        mem_start = window.performance.memory.usedJSHeapSize;
        start = performance.now() ;
        test.fn(clone);
        duration += performance.now()  - start;
        memory += window.performance.memory.usedJSHeapSize - mem_start;

        if(test.finish) test.finish(i);
    }

    if(test.complete) test.complete();

    if(warmup){

        test.loop = 1000 / duration * (test.loop / 10) * 3;
    }
    else{

        result.nodeValue = str_results += ((1000 / duration * test.loop) | 0) + "\t" + test.name + "\t" + memory + /*"\t" + (test.loop * 3000 / duration) +*/ "\n";
    }
    //console.log(((1000 / duration * test.loop) | 0) + "\t" + test.name, test.loop * 3000 / duration);

    if(queue.length){

        setTimeout(perform, 200);
    }

    //root.textContent = "";
}

function shuffle(items){

    for(let i = items.length - 1, j, x; i > 0; i--) {

        j = (Math.random() * (i + 1)) | 0;
        x = items[i];
        items[i] = items[j];
        items[j] = x;
    }

    return items;
}

function update(items, index){

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