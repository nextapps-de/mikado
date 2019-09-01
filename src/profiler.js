const timers = window._timers = {};
const queue = [];

export function profiler_start(name){

    const current = timers[name] || (timers[name] = {

        count: 0,
        time: 0,
        start: 0,
        ops: 0
    });

    if(queue.length){

        const now = performance.now();

        for(let i = 0; i < queue.length; i++){

            const current = timers[queue[i]];
            const diff = now - current.start;
            current.time += diff;
        }
    }

    queue[queue.length] = name;

    current.start = performance.now();
}

export function profiler_end(name){

    const end = performance.now();
    const current = timers[name];

    current.count++;
    current.time += end - current.start; //format_number(end - current.start, 5, ",", ".");
    current.ops = format_number(1000 / current.time * current.count, 0, ",", ".");

    queue.pop();

    if(queue.length){

        timers[queue[queue.length - 1]].start = performance.now();
    }
}

function format_number(num, places, decimal, separator){

    if(places === 0){

        num = num | 0;
    }
    else{

        places = Math.pow(10, places || 2);

        if(places){

            num = ((num * places) | 0) / places;
        }
    }

    const parts = ("" + (num < 0 ? -num : num)).split(".");
    const s = parts[0];
    const f = parts[1];
    const L = s.length;
    let i = L;
    let o = "";

    while(i--){

        o = (i === 0 ? "" : ((L - i) % 3 ? "" : separator || ",")) + s.charAt(i) + o
    }

    return (num < 0 ? "-" : "") + o + (f ? (decimal || ".") + f : "");
}