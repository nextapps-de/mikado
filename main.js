(function(){

    "use strict";

    const Mikado = window.Mikado;
    const iframe = document.getElementById("iframe");
    const mikado_table = Mikado("row").mount(document.getElementById("result"));
    const mikado_list = Mikado("lib").mount(document.getElementById("lib"));

    Mikado.eventCache = true;
    //Mikado.unregister("row").unregister("lib");

    const modes = window.location.hash.indexOf("modes") !== -1;
    let strict;
    let internal;
    let keyed;
    let keep;
    let repeat;
    let index = -1;

    let lib = shuffle(modes ? [

        "mode-cross-shared", "mode-exclusive", "mode-keyed-noop",
        "mode-keyed-shared", "mode-non-keyed", "mode-proxy",
        "mode-array", "mode-array-proxy"
    ]:[
        "mikado", "mikado-proxy", "mikado-shadow", //"mikado-0.7.6", "mikado-proxy-0.7.6", "mikado-0.7.5", "mikado-0.7.4",
        "stage0", "solid", "domc", "inferno",
        "redom", "sinuous", "surplus",
        "innerHTML", "jquery", "mithril",
        "knockout", "lit-html", "ractive",
        "doohtml"
    ]);

    function init(hash){

        strict = hash.includes("strict");
        internal = hash.includes("internal");
        keyed = hash.includes("keyed");

        document.getElementsByTagName("h1")[0].firstChild.nodeValue = "Benchmark: Template Rendering Engines (" + (keyed ? "Keyed" : strict ? "Non-Recycle" : modes ? "Modes" : internal ? "Data-Driven" : "Recycle") + ")";

        if(modes){

            document.body.className = "modes";
        }

        mikado_list.render(lib, {"mode": (keyed ? "keyed.html" : strict ? "strict.html" : internal ? "internal.html" : "")});
    }

    init(window.location.hash || window.location.search);

    //document.getElementById("mode").options[keyed ? 2 : internal ? 3 : strict ? 0 : 1].selected = true;
    document.getElementById("mode").options[keyed ? 1 : internal ? 2 : 0].selected = true;

    if(modes){

        document.getElementById("mode").hidden = true;
    }

    const test = [

        /*"size",*/ "memory",
        "create", "replace", "update",
        "arrange", "repaint", "append",
        "remove", "toggle", "clear"
    ];

    const current = [];

    Mikado.route("start", function(target, event){

        if(target.value === "Start"){

            index = -1;
            repeat = document.getElementById("repeat").value;
            target.value = "Stop";
            setTimeout(runner, 200);

            const reflow = document.getElementById("reflow").checked;

            iframe.hidden = !reflow;
            iframe.style.position = "absolute";
            iframe.style.display = reflow ? "": "none";
            iframe.style.overflow = reflow ? "": "hidden";
            iframe.style.contain = reflow ? "": "strict";
        }
        else{

            current[index][test[2]] = "";
            target.value = "Start";
            iframe.src = "";
            index = lib.length;
        }
    })
    .route("mode", function(target, event){

        init(window.location.hash = "#" + target.value);
        reset();
    })
    .listen("click")
    .listen("change");

    function reset(){

        for(let x = 0; x < lib.length; x++){

            current[x] = {

                "name": lib[x],
                //"size": size[lib[x]],
                "memory": "",
                "score": "",
                "index": ""
            };

            for(let y = 1; y < test.length + 1; y++){

                current[x][test[y]] = "";
                current[x]["color_" + test[y]] = "transparent";
            }
        }

        document.body.className = "";
        mikado_table.render(current);
    }

    reset();

    function runner(){

        const reflow = document.getElementById("reflow").checked;
        const duration = document.getElementById("duration").value;
        keep = document.getElementById("keep").checked;

        index++;
        const tmp = Object.assign({}, current[index]);
        tmp[test[1]] = "run...";
        mikado_table.update(mikado_table.node(index), tmp);
        iframe.src = "./test/" + lib[index].toLowerCase() + "/" + (keyed ? "keyed.html" : strict ? "strict.html" : internal ? "internal.html" : "") + ("?duration=" + duration) + (reflow ? "&hidden=false" : "");
    }

    function get_score(){

        let max = [];
        let val = [];

        for(let y = 0; y < test.length; y++){

            max[y] = 0;
            val[y] = [];

            for(let x = 0; x < lib.length; x++){

                if(current[x][test[y]] && (current[x][test[y]] !== "-failed-")){

                    if(current[x][test[y]]){

                        val[y].push(current[x][test[y]]);
                    }

                    if(/*(test[y] === "size") ||*/ (test[y] === "memory")){

                        if((current[x][test[y]] < max[y]) || !max[y]){

                            max[y] = current[x][test[y]];
                        }
                    }
                    else{

                        if(current[x][test[y]] > max[y]){

                            max[y] = current[x][test[y]];
                        }
                    }
                }
            }
        }

        let score = [], index = [],length = [];
        let max_score = 0, max_index = 0;

        for(let x = 0; x < lib.length; x++){

            score[x] = 0;
            index[x] = 0;
            length[x] = 0;

            for(let y = 0; y < test.length; y++){

                if(current[x][test[y]] && (current[x][test[y]] !== "-failed-")){

                    length[x]++;

                    if(/*(test[y] === "size") ||*/ (test[y] === "memory")){

                        score[x] += Math.sqrt(median(val[y]) / current[x][test[y]]);
                        index[x] += Math.sqrt(max[y] / current[x][test[y]]);
                        current[x]["color_" + test[y]] = color(Math.sqrt(max[y]), Math.sqrt(current[x][test[y]]));
                    }
                    else{

                        score[x] += (current[x][test[y]] / median(val[y]));
                        index[x] += (current[x][test[y]] / max[y]);
                        current[x]["color_" + test[y]] = color(current[x][test[y]], max[y]);
                    }
                }
                else{

                    current[x]["color_" + test[y]] = "#ccc";
                }
            }

            current[x]["score"] = (score[x] / length[x] * 100 + 0.5) | 0;
            current[x]["index"] = (index[x] / length[x] * 100 + 0.5) | 0;
            if(max_score < current[x]["score"]) max_score = current[x]["score"];
            if(max_index < current[x]["index"]) max_index = current[x]["index"];
        }

        for(let x = 0; x < lib.length; x++){

            current[x]["color_score"] = color(current[x]["score"], max_score);
            current[x]["color_index"] = color(current[x]["index"], max_index);
        }
    }

    function color(current, max){

        const percent = current / max * 100;
        const r = percent < 50 ? 255 : (255 - (percent * 2 - 100) * 255 / 100) | 0;
        const g = percent > 50 ? 255 : ((percent * 2) * 255 / 100) | 0;

        return 'rgb(' + r + ', ' + g + ', 0)';
    }

    window.onmessage = function(event){

        if(index < lib.length){

            if(event.origin === location.protocol + "//" + location.hostname){ // "https://nextapps-de.github.io" "https://raw.githack.com"

                //console.log(event.data);

                const parts = event.data.split(",");

                let tmp = parseInt(parts[1], 10);

                if(keep){

                    if(!current[index][parts[0]] || (tmp > current[index][parts[0]])){

                        current[index][parts[0]] = tmp;
                    }
                }
                else{

                    if(current[index][parts[0]]){

                        current[index][parts[0]] += tmp;
                    }
                    else{

                        current[index][parts[0]] = tmp;
                    }
                }

                tmp = parseInt(parts[2], 10);

                if(current[index]["memory"]){

                    current[index]["memory"] += tmp;
                }
                else{

                    current[index]["memory"] = tmp;
                }

                if((repeat === 1) && (!current[index][parts[0]])){

                    current[index][parts[0]] = "-failed-";
                }

                if(parts[0] === "clear"){

                    if(index < lib.length - 1){

                        mikado_table.update(index, current[index]);
                        setTimeout(runner, 50);
                    }
                    else{

                        get_score();

                        current.sort(function(a, b){

                            return b["index"] - a["index"];
                        });

                        for(let i = 0; i < lib.length; i++){

                            lib[i] = current[i]["name"];
                        }

                        mikado_table.render(current);
                        document.body.className = "finished";

                        if(--repeat > 0){

                            index = -1;
                            setTimeout(runner, 50);
                        }
                        else{

                            Mikado.dispatch("start", document.getElementById("start"));
                        }
                    }
                }
                else{

                    const tmp = Object.assign({}, current[index]);
                    tmp[test[test.indexOf(parts[0]) + 1]] = "run...";
                    mikado_table.update(index, tmp);
                }
            }
        }
    };

    function shuffle(items){

        for(let i = items.length - 1, j, x; i > 0; i--) {

            j = (Math.random() * i) | 0;
            x = items[i];
            items[i] = items[j];
            items[j] = x;
        }

        return items;
    }

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

    /*
    function average(arr){

        const length = arr.length;
        let sum = 0;

        for(let i = 0; i < length; i++){

            sum += arr[i];
        }

        return sum / length;
    }
    */

}());